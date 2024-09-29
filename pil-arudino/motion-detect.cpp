#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "base";  
const char* password = "base_pwd";  

const char* serverURL = "http://localhost:3000/update"; 

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  int sensorValue = digitalRead(pirPin);  

  if (sensorValue == HIGH) {  
    if (!carDetected) {  
      Serial.println("Car Detected: Increase count");
      digitalWrite(ledPin, HIGH);  
      carDetected = true;  
      sendDataToServer(true);
    }
    Serial.println("Car is there");  
  } else {  
    if (carDetected) {  
      Serial.println("Car Left: Reduce count");
      digitalWrite(ledPin, LOW);   
      carDetected = false; 
      sendDataToServer(true);

    }
  }
    delay(10000); // Wait for 10 seconds before the next check

  }
  


void sendDataToServer(bool detected) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL); // Specify the URL
    
    http.addHeader("Content-Type", "application/json");
    
    // Create JSON payload
    String jsonPayload = "{\"detected\": " + String(detected ? "true" : "false") + "}";
    
    // Send the request
    int httpResponseCode = http.POST(jsonPayload);
    
    if (httpResponseCode > 0) {
      String response = http.getString(); 
      Serial.println(httpResponseCode);   
      Serial.println(response);           
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }
    
    http.end(); 
  } else {
    Serial.println("WiFi Disconnected");
  }
}
