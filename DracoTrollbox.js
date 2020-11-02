const fetch = require('node-fetch')
const fs = require('fs');
var tbheaders = require('trollbox-headers').headers()
var io = require('socket.io-client')
var tbheaders = require('trollbox-headers').headers()
const socket = io('http://www.windows93.net:8081', tbheaders)
socket.on('_connected', function(data) { 
    socket.emit('user joined', 'DracoBot V2', "#f0f0f0","","","")
    socket.emit('message', 'Hello, I am here to test!')
})

socket.on('message', function(data) {
    
})

function saveDedStuff() {
  fs.writeFile(__dirname + '/insideofdragon.json', JSON.stringify(insideofdragon), err => {});
}

function saveBanStuff() {
  fs.writeFile(__dirname + '/bannedusers.json', JSON.stringify(bannedusers), err => {});
}

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

function send(msg) {
  socket.emit('message', msg);
}

const Adminhomes = config.Adminhomes

socket.on('message', data => {
  let message = data.msg.toLowerCase().substr(0,80);
  let command = message.split(/ +/)[0].slice(config.prefix.length);
  let args = message.split(/ +/).splice(1);
  let mainArg = args.join('');
  let splitArgs = args.join(' ').substr(0,80);
  let nick = data.nick.toLowerCase();
  let homes = data.home.toLowerCase(); 
  let capnicks = data.nick;
  
  let cooldowns = utils.timer.get(homes); 
  if (Date.now() - cooldowns <= 2500) return;
  if (utils.banned.includes(homes)) return send("You are banned, please appeal to Flawed#8230 on disc.");
  
  if (message == 'pet draco') {pet(utils, message, args, data, homes);
  return utils.timer.set(homes, Date.now())};

  if (!message.startsWith(config.prefix)) return;
    switch (command) {
      case 'help': send('Help here: https://pastebin.com/0ap6RGds');
      utils.timer.set(homes, Date.now());
        break;
      case 'pet': pet(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'pat': pat(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'vore': vore(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'puke': puke(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'ban': ban(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'unban': unban(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'stab': stab(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'nuzzle': nuzzle(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'kiss': kiss(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'hug': hug(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'bap': bap(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'rolldie': rolldie(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'coinflip': coinflip(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'bored': bored(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'shutdown': shutdown(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
    };
});

socket.on('update users',n=>console.log(n));


function pet(utils, message, args, data, homes) {
  send(utils.petresponses[utils.random(0, utils.petresponses.length - 1)])
}

function pat(utils, message, args, data, homes) {
  if (args == 'draco') return send('hehehe~ *curls my tail around you*')
  send(`${data.nick} gives ${args} a headpat`)
}

function vore(utils, message, args, data, homes) {
  if (!Adminhomes.includes(homes)) return;
  send(`Wyvern swallows ${args} whole, mmmm~`)
  utils.insideofdragon.push(args);
  saveDedStuff();
}

function ban(utils, message, args, data, homes) {
  if (!Adminhomes.includes(homes)) return;
  send(`${data.nick} (${homes}) has been banned`)
  utils.banned.push(homes);
  savebanStuff();
}

function puke(utils, message, args, data, homes) {
  if (!Adminhomes.includes(homes)) return;
  send(`Wyvern spit ${data.nick} out, UwU`)
  utils.insideofdragon.splice(utils.insideofdragon.indexOf(args),1);
  saveDedStuff();
}

function unban(utils, message, args, data, homes) {
  if (!Adminhomes.includes(homes)) return;
  send(`${data.nick} (${homes}) has been banned`);
  utils.banned.splice(utils.banned.indexOf(homes),1);
  savebanStuff();
}

function hug(utils, message, args, data, homes) {
  if (args == 'draco') return send('awww <3 *holds you in the hug and purrs*')
  send(`${data.nick} gives ${args} a hug, awww!~`)
}

function kiss(utils, message, args, data, homes) {
  if (args == 'draco') return send('MMM?~ mrrrrrh~')
  send(`${data.nick} gives ${args} a kiss, how cute!~`)
}

function bap(utils, message, args, data, homes) {
  if (args == 'draco') return send('ow! w-what did i do wrong?? .m.')
  send(`${data.nick} baps ${args}, *bap*`)
}

function nuzzle(utils, message, args, data, homes) {
  if (args == 'draco') return send('awww <3 *nuzzles back lovingly*')
  send(`${data.nick} nuzzles ${args}, how nice :3`)
}

function stab(utils, message, args, data, homes) {
  if (args == 'draco') return send('*it doesnt work on draco*')
  send(`${data.nick} stabs ${args}, ouch!`)
}

function rolldie(utils, message, args, data, homes) {
  let num = (Math.floor(Math.random() * (20 - 0 + 1)) + 1);
  send(`${data.nick} rolls a 20 sided die and it lands on ${num}`)
}

function coinflip(utils, message, args, data, homes) {
  let ht = ((Math.floor(Math.random() * (2 - 1 + 1)) + 1) === 1 ? 'Heads' : 'Tails');
  send(`${data.nick} flips a coin and it lands on ${ht}`)
}

function bored(utils, message, args, data, homes) {
  fetch('http://www.boredapi.com/api/activity/')
      .then(raw => raw.json())
      .then(json => send(json.activity));
}

function shutdown(utils, message, args, data, homes) {
  if (!Adminhomes.includes(homes)) return;
  send(`Goodbye for now <3`);
  process.exit();
}