import paho.mqtt.client as mqtt 
import time

port = 1883
#port = 8883
#ROOT_CA = "/Users/karolina/Desktop/final/rootCA.crt"

def on_connect(client, userdata, rc): 
	print("Connected with result code " +str(rc)) 
	client.subscribe("Client/+")

def on_message(client, userdata, msg): 
	print str(msg.payload)
	client = mqtt.Client() 
	#client.tls_set(ROOT_CA) 
	client.on_connect = on_connect 
	client.on_message = on_message
	client.connect("", port, 60) 
	client.loop_forever()
