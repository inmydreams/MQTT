import paho.mqtt.client as paho 
import time
import string
import random
import json
from threading import Thread

#ROOT_CA = "/Users/karolina/Desktop/final/rootCA.crt"

def str_generator(size = 50, chars=string.ascii_letters + string.digits): 
	return ''.join(random.choice(chars) for _ in range(size))

def createClient(i):
	broker = ""
	#port = 80
	#port = 443
	port = 1883
	#port = 8883
	#client_uniq = "pubclient80_"+str(i)
	#client_uniq = "pubclient443_"+str(i)
	client_uniq = "pubclient1883_"+str(i)
	#client_uniq = "pubclient8883_"+str(i)
	#mqttc = paho.Client(client_uniq, False, transport = "websockets") 
	mqttc = paho.Client(client_uniq, False)
	#mqttc.tls_set(ROOT_CA)
	mqttc.connect(broker, port, 60) 
	randomStr = str_generator() 

	while True:
		data = {'data':randomStr,'timestamp':str(int(round(time.time()*1000)))}
		data_string = json.dumps(data) 
		mqttc.publish("Client/"+str(i),data_string,0) 
		time.sleep(1)
		pass

def main():
	for i in range(10):
		t = Thread(target=createClient, args=(i,)) 
		t.deamon = True
		time.sleep(0.1)
		t.start()

if __name__ == '__main__': 
	main()