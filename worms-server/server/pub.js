//Declaracion de dependencias
const mqtt = require('mqtt');
const SerialPort= require('serialport').SerialPort;
const { DelimiterParser } = require('@serialport/parser-delimiter');
const { read } = require('fs');

//Puerto donde se conecta el esp32
const port = new SerialPort({
    path:'COM3',
    baudRate: 9600
});

// Crear un parser para dividir los datos en líneas
const parser = port.pipe(new DelimiterParser ({ delimiter: '\n' }))

//conexion al servidor 
const pub = mqtt.connect('mqtt://localhost:9000');

//recepcion y tratado de mnesaje  y publicacion del grupo
pub.on('connect', () => {
    parser.on('data', function(data){
        var enc = new TextDecoder();
        var arr = new  Uint8Array(data);
        ready = enc.decode(arr)
        console.log(ready);
        pub.publish('topic test', ready)
    });
//validacion de conexion en el puerto
port.on('error',function(err){
    console.log(err);
});

});
