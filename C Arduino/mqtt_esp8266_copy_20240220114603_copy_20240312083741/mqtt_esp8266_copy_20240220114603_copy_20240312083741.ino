/*
 Basic ESP8266 MQTT example
 This sketch demonstrates the capabilities of the pubsub library in combination
 with the ESP8266 board/library.
 It connects to an MQTT server then:
  - publishes "hello world" to the topic "outTopic" every two seconds
  - subscribes to the topic "inTopic", printing out any messages
    it receives. NB - it assumes the received payloads are strings not binary
  - If the first character of the topic "inTopic" is an 1, switch ON the ESP Led,
    else switch it off
 It will reconnect to the server if the connection is lost using a blocking
 reconnect function. See the 'mqtt_reconnect_nonblocking' example for how to
 achieve the same result without blocking the main loop.
 To install the ESP8266 board, (using Arduino 1.6.4+):
  - Add the following 3rd party board manager under "File -> Preferences -> Additional Boards Manager URLs":
       http://arduino.esp8266.com/stable/package_esp8266com_index.json
  - Open the "Tools -> Board -> Board Manager" and click install for the ESP8266"
  - Select your ESP8266 in "Tools -> Board"
*/

#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <TridentTD_LineNotify.h>

// Update these with values suitable for your network.
//กากด๋อยยย
const char* ssid = "Kk";
const char* password = "123456789";
const char* mqtt_server = "broker.hivemq.com";
const char* LINE_TOKEN = "NOpjDTUyVYmTWcupEn7Dn6mTBzMwQ7rF0u6CW0LrJly";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];

int irPin = 16;
int lqPin = 13;
int buzzer = 4;

const int pingPin = 0;
int inPin = 12;



void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  LINE.setToken(LINE_TOKEN);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("Alcohol/Notify/258", "Connected 1");
      client.publish("Alcohol/Have/258", "Connected 2");
      client.publish("Alcohol/NotHave/258", "Connected 3");
      // ... and resubscribe
      client.subscribe("Alcohol/NotifyZone/258");
      client.subscribe("Alcohol/HaveZone/258");
      client.subscribe("Alcohol/NotHaveZone/258");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  pinMode(irPin,INPUT);
  pinMode(lqPin,INPUT_PULLUP);
  pinMode(buzzer,OUTPUT);
  Serial.begin(9600);Serial.println();
  Serial.setDebugOutput(true);
  Serial.println(LINE.getVersion());
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  int lqVal = digitalRead(lqPin);

  static bool notified = 0;
  static bool publishNotify = 0;

  static bool update = 0;
  static bool publishUpdate = 0;

 // bool notified = 0;
  if(lqVal == 0){
    int irVal = digitalRead(irPin);
    static bool user = false; // เริ่มต้นด้วยค่าเป็น false
    static bool publishedOnce = false; // เริ่มต้นด้วยค่าเป็น false

    long duration, cm;

    pinMode(pingPin,OUTPUT);
    digitalWrite(pingPin,LOW);
    delayMicroseconds(2);
    digitalWrite(pingPin,HIGH);
    delayMicroseconds(5);
    digitalWrite(pingPin,LOW);
    pinMode(inPin,INPUT);

    duration = pulseIn(inPin,HIGH);
    cm = microsecondsToCentimeters(duration);

    if (irVal == 0 && !user && !publishedOnce) {
      client.publish("Alcohol/Notify/258", ("IR Value: " + String(irVal)).c_str());
      user = true;
      publishedOnce = true; // เมื่อ publish แล้วให้เปลี่ยนค่า publishedOnce เป็น true
      digitalWrite(buzzer, LOW);
    } else if (irVal == 1) {
      digitalWrite(buzzer, LOW);
    }
    if(irVal == 1){
      user = false;
      publishedOnce = false;
    }
  }else if(lqVal == 1 && !notified && !publishNotify) {
    digitalWrite(buzzer,HIGH);
    //delay(5);
    client.publish("Alcohol/NotHave/258", ("Liquid Value: " + String(lqVal)).c_str());
    LINE.notify("258 room No Alcohol");
    notified = true;
    publishNotify = true;
  }
  if(lqVal == 0){
    notified = false;
    publishNotify = false;
  }
  if(lqVal == 0 && !update && !publishUpdate){
    client.publish("Alcohol/Have/258", ("Liquid Value: " + String(lqVal)).c_str());
    update = true;
    publishUpdate = true;
  }
  if(lqVal == 1){
    update = false;
    publishUpdate = false;
  }
}

long microsecondsToCentimeters(long microseconds){
  return microseconds / 29 / 2;
}
