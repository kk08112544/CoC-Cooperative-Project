#include <ESP8266WiFi.h>
#include <TridentTD_LineNotify.h>

const char* ssid     = "กากด๋อยยย";
const char* password = "12345678";
const char* LINE_TOKEN = "NOpjDTUyVYmTWcupEn7Dn6mTBzMwQ7rF0u6CW0LrJly";

int irPin = 16;
int lqPin = 2;
int buzzer = 15;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); Serial.println();
  Serial.println(LINE.getVersion());
  
  WiFi.begin(ssid, password);
  Serial.printf("WiFi connecting to %s\n",  ssid);
  while(WiFi.status() != WL_CONNECTED) { Serial.print("."); delay(400); }
  Serial.printf("\nWiFi connected\nIP : ");
  Serial.println(WiFi.localIP());  

  // กำหนด Line Token
  LINE.setToken(LINE_TOKEN);

  pinMode(irPin, INPUT);
  pinMode(lqPin, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int irVal = digitalRead(irPin);
  int lqVal = digitalRead(lqPin);

  if(irVal == 0 && lqVal == 0){
    //digitalWrite(ledPin,HIGH);
    digitalWrite(buzzer,LOW);
    Serial.print("Have user used alcohol");
  }else if(lqVal == 1){
    digitalWrite(buzzer,HIGH);
    LINE.notify("NO Alcohol in Zone A");
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
  delay(5000);

}
