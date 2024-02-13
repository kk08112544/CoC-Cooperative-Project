#include <ESP8266WiFi.h>
const char* ssid     = "กากด๋อยยย";
const char* password = "12345678";

void setup() 
{
   Serial.begin(9600);
   Serial.println("Starting...");

   WiFi.begin(ssid, password);
   while (WiFi.status() != WL_CONNECTED) 
   {
      delay(250);
      Serial.print(".");
   }

   Serial.println("WiFi connected");  
   Serial.println("IP address: ");
   Serial.println(WiFi.localIP());
}

void loop() 
{
}