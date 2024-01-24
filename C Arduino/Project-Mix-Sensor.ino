int alcohol = D1;
int led_alcohol = D2;
int buzzer_alcohol = D3;
int led_object = D4;
int object = D5;
void setup() {
  // put your setup code here, to run once:
  pinMode(alcohol, INPUT);
  pinMode(led_alcohol, OUTPUT);
  pinMode(buzzer_alcohol, OUTPUT);
  pinMode(led_object, OUTPUT);  // sets the pin as output
  pinMode(object, INPUT); // sets the pin as input
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int water_val = digitalRead(alcohol);
  int ir_val = digitalRead(object);
  Serial.println(val);
  if (water_val == 0 ){
    digitalWrite(led_alcohol, LOW);
    digitalWrite(buzzer_alcohol, HIGH);
    Serial.println("No Water");
  }
  if (water_val == 1){
    digitalWrite(led_alcohol, HIGH);
    digitalWrite(buzzer_alcohol, LOW);
    Serial.println("Detected Water");
  }
  if (ir_val == 0){
    digitalWrite(led_object, HIGH); 
  }else{
    digitalWrite(led_object, LOW); 
  }
  delay(500);
}