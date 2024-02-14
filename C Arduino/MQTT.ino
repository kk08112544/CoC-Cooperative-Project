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

const char* ssid = "กากด๋อยยย";
const char* password = "12345678";
const char* LINE_TOKEN = "NOpjDTUyVYmTWcupEn7Dn6mTBzMwQ7rF0u6CW0LrJly";
const char* mqtt_server = "broker.mqtt-dashboard.com";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];
int value = 0;


int irPin = 16;
int lqPin = 2;
int buzzer = 15;
bool notified = false; // Flag to track if notification has been sent

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
      client.publish("Alcohol/Zone", "MQTT Connected");
      // ... and resubscribe
      client.subscribe("Alcohol/Val");
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
 // pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  pinMode(irPin, INPUT);
  pinMode(lqPin, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);Serial.println();
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

  int irVal = digitalRead(irPin);
  int lqVal = digitalRead(lqPin);
  Serial.print("IR Value : ");
  Serial.print(irVal);
  Serial.print
  int i=0;
  if(irVal == 0 && lqVal == 0){
    //digitalWrite(ledPin,HIGH);
    digitalWrite(buzzer,LOW);
    //Serial.print("Have user used alcohol");
  }else if(lqVal == 1 && !notified){
    LINE.notify("NO Alcohol in Zone A");
    notified = true; // Set flag to true to indicate notification has been sent
    digitalWrite(buzzer, HIGH);
    Serial.println("Notified");
  }else if(irVal == 1){
    Serial.print("Sleep");
   // digitalWrite(ledPin,LOW);
    digitalWrite(buzzer,LOW);
  }else if(lqVal == 0){
    Serial.print("Sleep");
  //   digitalWrite(ledPin,LOW);
    digitalWrite(buzzer,LOW);
  }
  Serial.println("\n");
  if (lqVal != 1) {
    notified = false; // Reset notified flag if lqVal is not equal to 1
  }
 // delay(5000);
  client.publish("Alcohol/Zone", ("IR Value: " + String(irVal) + ", Liquid Value: " + String(lqVal)).c_str());
}

