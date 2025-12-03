import requests
import json

url = "http://localhost:11434/api/chat"

payload = {
    "model": "llama3.2",
    "messages": [
        {"role": "user", "content": "Hello LLaMA, how are you?"}
    ]
}

response = requests.post(url, json=payload, stream =True)
final_message = "" 
for item in response.iter_lines(): 
    if item: 
        data = json.loads(item.decode('utf-8')) 

    if "message" in data:
            
            final_message += data["message"]["content"]

print(final_message)


