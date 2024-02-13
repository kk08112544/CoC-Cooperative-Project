int irPin = 16;
int lqPin = 2;
int buzzer = 15;
int irVal = 0;
int lqVal = 0;


void setup() {
  // put your setup code here, to run once:
//  pinMode(ledPin, OUTPUT);
  pinMode(irPin, INPUT);
  pinMode(lqPin, INPUT_PULLUP);
  pinMode(buzzer, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  irVal = digitalRead(irPin);
  lqVal = digitalRead(lqPin);

  // Serial.print("IR value = ");
  // Serial.println(irVal);
  // Serial.println("\n");
  // Serial.print("Liquid value = ");
  // Serial.println(lqVal);
  // Serial.println("\n");
  // Serial.println("\n");
  if(irVal == 0 && lqVal == 0){
    //digitalWrite(ledPin,HIGH);
    digitalWrite(buzzer,LOW);
    Serial.print("Have user and alcohol");
  }else if(lqVal == 1){
    digitalWrite(buzzer,HIGH);
    Serial.print("No user and alcohol");
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
