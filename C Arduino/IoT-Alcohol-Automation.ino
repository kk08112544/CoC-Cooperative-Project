#include<ESP8266WiFi.h>
#include<TridentTD_LineNotify.h>
#include<ESP8266HTTPClient.h>


const char* ssid = "kk";
const char* password = "123456789" 
const char* LINE_TOKEN = "Pnp7lAzvEOR1cguZR1Zg3lV3N8gzXBrBDTonSIdotoc";

const char* postUrl = "http://localhost:3000/api/dashboard/addNotify";
const char* putUrl = "http://localhost:3000/api/alcohol/updateDetectDataAlcohol/1";


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
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);  // หน่วงเวลา 1 วินาที
    Serial.println("Connecting to WiFi...");  // พิมพ์ข้อความ "Connecting to WiFi..."
  }
  Serial.println("Connected to the WiFi network");
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
    int alcohol_id = 1;
    postData(alcohol_id);
  }else if(lqVal == 1){
    digitalWrite(buzzer,HIGH);
    LINE.notify("No Alcohol in this Zone!!!");
    putData(lqVal);
  }else if(lqVal == 1 && irVal == 0){
    digitalWrite(buzzer,HIGH);
    Serial.print("No Water and have user want to used alcohol Now!!!!");
    LINE.notify("No Alcohol in this Zone and user want to used alcohol Now!!!");
    putData(lqVal);
  }else if(irVal == 1){
    Serial.print("Sleep");
    digitalWrite(ledPin,LOW);
    digitalWrite(buzzer,LOW);
  }else if(lqVal == 0){
    Serial.print("Sleep");
    digitalWrite(ledPin,LOW);
    digitalWrite(buzzer,LOW);
  }
}

void postData(int alcohol_id){
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;  // สร้างอ็อบเจ็กต์ HTTPClient

    http.begin(postUrl);  // เริ่มต้นการเชื่อมต่อ HTTP กับเว็บเซิร์ฟเวอร์ที่ระบุ

    http.addHeader("Content-Type", "application/json");  // เพิ่ม header ใน request สำหรับรูปแบบ JSON

    // สร้างข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์เป็น JSON โดยใช้ค่าของเซ็นเซอร์
    String requestBody = "{\"alcohol_id\":" + String(alcohol_id) + "}";

    // ส่ง HTTP POST request พร้อมกับข้อมูลที่สร้างไว้
    int httpResponseCode = http.POST(requestBody);

    // ตรวจสอบการตอบกลับจากเซิร์ฟเวอร์
    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);  // พิมพ์รหัสการตอบกลับ HTTP
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);  // พิมพ์รหัสข้อผิดพลาด (ถ้ามี)
    }

    http.end();  // สิ้นสุดการใช้งาน HTTPClient
  }
}

void putData(int lqVal){
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;  // สร้างอ็อบเจ็กต์ HTTPClient

    http.begin(putUrl);  // เริ่มต้นการเชื่อมต่อ HTTP กับเว็บเซิร์ฟเวอร์ที่ระบุ

    http.addHeader("Content-Type", "application/json");  // เพิ่ม header ใน request สำหรับรูปแบบ JSON

    // สร้างข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์เป็น JSON โดยใช้ค่าของเซ็นเซอร์
    String requestBody = "{\"detect\":" + String(lqVal) + "}";

    // ส่ง HTTP POST request พร้อมกับข้อมูลที่สร้างไว้
    int httpResponseCode = http.POST(requestBody);

    // ตรวจสอบการตอบกลับจากเซิร์ฟเวอร์
    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);  // พิมพ์รหัสการตอบกลับ HTTP
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);  // พิมพ์รหัสข้อผิดพลาด (ถ้ามี)
    }

    http.end();  // สิ้นสุดการใช้งาน HTTPClient
  }
}



