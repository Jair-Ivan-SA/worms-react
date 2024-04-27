//declaracion de dependecias
const mosca = require('mosca')
//levantado de servido r en el puerto 9000
const broker = new mosca.Server({
    port: 9000
})
//Validacion del servidor levantado
broker.on('ready', () => {
    console.log('Mosca broker is ready!')
})
//Muestra la conexion de un publisher
broker.on('clientConnected', (client) => {
    console.log('New client' + client.id)
})

 broker.on('published', (packet) => {
     console.log(packet.payload.toString())
})