const fetch = require('node-fetch')
const fs = require('fs');
var tbheaders = require('trollbox-headers').headers()
var io = require('socket.io-client')
var tbheaders = require('trollbox-headers').headers()
const socket = io('http://www.windows93.net:8081', tbheaders)
const bot = new socket.Client();
socket.on('_connected', function(data) { 
    socket.emit('user joined', 'DracoBot V2', "#f0f0f0","","","")
    socket.emit('message', 'Hello, I am here to test!')
})

socket.on('message', function(data) {
    
})

const Timer = new Map();
const petresponses = require('./Petresponses.json');
const insideofdragon = require('./insideofdragon.json');
const bannedusers = require('./bannedusers.json');
const config = require("./config.json");

const utils = {
  banned: bannedusers,
  config: config,
  motd: '',
  insideofdragon: insideofdragon,
  petresponses: petresponses,
  timer: Timer,
  fetch: fetch,
  random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

socket.commands = {};

socket.triggers = {};

config.commands.forEach(cmd => {
  socket.commands[cmd] = require(`./commands/${cmd}.js`);
});

function send(msg) {
  socket.emit('message', msg);
}

socket.on('message', data => {
  let message = data.msg.toLowerCase().substr(0,80);
  let command = message.split(/ +/)[0].slice(config.prefix.length);
  let args = message.split(/ +/).splice(1);
  let flags = message.match(/-{2}\w\S+/gm);
  let mainArg = args.join('');
  let splitArgs = args.join(' ').substr(0,80);
  let nick = data.nick.toLowerCase();
  let homes = data.home.toLowerCase(); 
  let capnicks = data.nick;
  
  if (utils.banned.includes(homes)) return send("You are banned, please appeal to Flawed#8230 on disc.");
  
  if (!message.startsWith(config.prefix)) return;
  
  if (message.includes('fortnite' || 'sonic' || '*hugs*')) return;

  if(nick.includes("fortnite")) return;
  if(nick.includes("sonic")) return;
  if(nick.includes("hugs")) return;

  if (flags) flags = flags.map(flag => flag.slice(2));

  message.flags = flags || [];

  for (let cmd in bot.commands) {
    if (command === cmd || bot.commands[cmd].aliases.includes(command)) {
      bot.commands[cmd].run(socket, data, message, args, utils);
      break;
    }
  }

  /*if(message === 'd!help') send('Help here: https://pastebin.com/0ap6RGds');
  */
});

socket.on('update users',n=>console.log(n));