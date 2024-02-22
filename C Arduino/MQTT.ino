#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <TridentTD_LineNotify.h>
#include <time.h>

// Update these with values suitable for your network.

const char* ssid = "กากด๋อยยย";
const char* password = "12345678";
const char* LINE_TOKEN = "NOpjDTUyVYmTWcupEn7Dn6mTBzMwQ7rF0u6CW0LrJly";
const char* mqtt_server = "broker.hivemq.com";//broker.mqtt-dashboard.com
const char* mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

char dates[11]; // "YYYY-MM-DD\0"
char times[9];  // "HH:MM:SS\0"


int irPin = 16;
int lqPin = 5;
int buzzer = 15;
bool notified = false; // Flag to track if notification has been sent

int timezone = 7 * 3600; //ตั้งค่า TimeZone ตามเวลาประเทศไทย
int dst = 0; //กำหนดค่า Date Swing Time


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
  configTime(timezone, dst, "pool.ntp.org", "time.nist.gov"); //ดึงเวลาจาก Server
  Serial.println("\nLoading time");
  while (!time(nullptr)) {
    Serial.print("*");
    delay(1000);
  }
  Serial.println("");
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

  int irVal = digitalRead(irPin);
  int lqVal = digitalRead(lqPin);

  time_t now = time(nullptr);
  struct tm* p_tm = localtime(&now);


  sprintf(dates, "%04d-%02d-%02d", p_tm->tm_year + 1900, p_tm->tm_mon + 1, p_tm->tm_mday);
  sprintf(times, "%02d:%02d:%02d", p_tm->tm_hour, p_tm->tm_min, p_tm->tm_sec);

    // แสดงผลลัพธ์
  printf("Date: %s\n", dates);
  printf("Time: %s\n", times);

  Serial.print("IR Value : ");
  Serial.print(irVal);
  Serial.println();
  Serial.print("Liquid Value : ");
  Serial.print(lqVal);
  
  client.publish("Alcohol/Zone", ("IR Value: " + String(irVal) + ", Liquid Value: " + String(lqVal) + ", Date: " + String(dates) + ", Time: " + String(times)).c_str());

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

  Serial.println();
  Serial.println("\n");
  if (lqVal != 1) {
    notified = false; // Reset notified flag if lqVal is not equal to 1
  }
 // delay(5000);
 // client.publish("Alcohol/Zone", ("IR Value: " + String(irVal) + ", Liquid Value: " + String(lqVal) + ", Date: " + String(dates) + ", Time: " + String(times)).c_str());
}