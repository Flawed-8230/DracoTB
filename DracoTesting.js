const io = require('socket.io-client')
const socket = io('http://www.windows93.net:8081', { 
    path: '/socket.io', // these few lines are just for other important things
    transportOptions: {
        polling: {
            extraHeaders: {
                'Origin': 'http://www.windows93.net',
                'Referer': 'http://www.windows93.net/trollbox/index.php'
            }
        }
    }
})
socket.on('_connected', function(data){ // and once we're connected...
    socket.emit('user joined', 'DracoT', "#f5f5f5") // ...our bot can join!
})

socket.on('message',function(data){

if (data.msg === "draco") {
    socket.emit("message", "yes?")
  }
  



let responses = [
  '*affectionate dragon sounds*',
  'mnghhhh more please',
  'I like you <3',
  '*kisses you*',
  '*nuzzles you lovingly*',
  'please don\'t stop',
  '*heavy breathing*',
  '*rolls over*',
  'dat feels so gooood',
  '*rests head in your lap*',
  'thank u ^w^',
  '*licks your face*',
  '*playfully pounces*',
  '*curls tail around you*',
  'lets have some fun',
  '*nuzzles*',
  '*murrs*',
  '"K-keep going"',
  '*tail thumping on the ground*',
  '"Hehe~"',
  '"I love this!"',
  '*Gazes cutely*'
];

  if (data.msg === "dr!pet") {
    socket.emit("message", responses[Math.round(Math.random()*responses.length-1)])
  }

})

