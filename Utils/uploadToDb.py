import pandas as pd
from pymongo import MongoClient

df = pd.read_excel('../parkingData.xlsx')

client = MongoClient('mongodb+srv://singhyatee123:RR40xwjyygMXpwli@cluster0.mraea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
try:
    client.admin.command('ping') #test pingy ping
    print("Connected to MongoDB!")
except Exception as e:
    print("Could not connect to MongoDB:", e)
db = client['test']  
collection = db['parkingData']  

data = df.to_dict(orient='records')
result = collection.insert_many(data)


print("CSV uploaded successfully")
