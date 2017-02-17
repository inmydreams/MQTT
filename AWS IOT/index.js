var five = require("johnny-five");
var awsIot = require('aws-iot-device-sdk'); 
var moment = require('moment');

var device = awsIot.device({
	keyPath: '/home/pi/Desktop/node/privateKey.pem',
	certPath: '/home/pi/Desktop/node/cert.pem',
	caPath: '/home/pi/Desktop/node/aws-iot-rootCA.pem',
	clientId: 'Raspberry-pi', region: 'us-west-2'
});

var topic = 'sensors/temperature';

five.Board().on("ready", function() {
	var temperature = new five.Thermometer({
		pin: "A0",
		toCelsius: function(raw) {
			return (5 * raw * 100)/1024
	},
		freq: 1000
	});

	temperature.on("change", function(){
		var payload = JSON.stringify({
			temperature: this.C,
			time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
		});
		device.publish(topic, payload);
	});
});

device.on('connect', function() { 
	console.log('connected');
	device.subscribe(topic); 
});

device.on('message', function(topic, payload){ 
	console.log(payload.toString());
});