#include <TridentTD_LineNotify.h>
#include<ESP8266WiFi.h>

#define SSID "kk";
#define PASSWORD "123456789";
#define LINE_TOKEN "Pnp7lAzvEOR1cguZR1Zg3lV3N8gzXBrBDTonSIdotoc";

int ledPin = 15;
int irPin = 5;
int lqPin = 2;
int buzzer = 15;
int irVal = 0;
int lqVal = 0;

void setup() {
  // put your setup code here, to run once:
  pinMode(ledPin, OUTPUT);
  pinMode(irPin, INPUT);
  pinMode(lqPin, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
  Serial.begin(LINE.getVersion());
  WiFi.begin(SSID,PASSWORD);
  Serial.print("WiFi Connecting ", SSID);
  while (WIFI.status() != WL_CONNECTED){
    Serial.print(".");
    delay(500);
  }
  Serial.print("\nWiFi connected\nIP:");
  Serial.println(WiFi.localIP());
  Line.setToken(LINE_TOKEN);
}

void loop() {
  // put your main code here, to run repeatedly:
  irVal = digitalRead(irPin);
  lqVal = digitalRead(lqPin);
  Serial.print("IR value = ");
  Serial.println(irVal);
  Serial.print("Liquid value = ");
  Serial.println(lqVal);

  if(irVal == 0 && lqVal == 0){
    digitalWrite(ledPin,HIGH);
    digitalWrite(buzzer,LOW);
  }else if(lqVal == 1){
    digitalWrite(buzzer,HIGH);
    LINE.notify("No Alcohol in this Zone!!!");
  }else if(lqVal == 1 && irVal == 0){
    digitalWrite(buzzer,HIGH);
    Serial.print("No Water and have user want to used alcohol Now!!!!");
    LINE.notify("No Alcohol in this Zone and user want to used alcohol Now!!!");
  }else if(irVal == 1){
    Serial.print("Sleep");
    digitalWrite(ledPin,LOW);
    digitalWrite(buzzer,LOW);
  }
}
