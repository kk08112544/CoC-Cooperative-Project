int sensor = D1;
int led = D2;
int buzzer = 2;
int val = 0;
 
void setup() {
  Serial.begin(9600);
  pinMode(sensor, INPUT);
  pinMode(led, OUTPUT);
  pinMode(buzzer, OUTPUT);
}
 
void loop() {
  val = digitalRead(sensor);
  Serial.println(val);
  if (val == 0 ){
    digitalWrite(led, LOW);
    digitalWrite(buzzer, HIGH);
    Serial.println("No Water");
  }
  if (val == 1){
    digitalWrite(led, HIGH);
    digitalWrite(buzzer, LOW);
    Serial.println("Detected Water");
  }
  delay(500);
}