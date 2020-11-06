const fetch = require('node-fetch')
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("still a secret");
const fs = require('fs');
var tbheaders = require('trollbox-headers').headers()
var io = require('socket.io-client')
var tbheaders = require('trollbox-headers').headers()
const socket = io('http://www.windows93.net:8081', tbheaders)
socket.on('_connected', function(data) { 
    console.log('ready~')
    socket.emit('user joined', 'Draco [dr!]', "#f0f0f0","","","")
    socket.emit('message', 'Hewwo friends!~ <3')
})

const Timer = new Map();
const Suggestcooldown = new Map(); //for heavy cooldowns
const petresponses = require('./Petresponses.json');
const insideofdragon = require('./insideofdragon.json');
const bannedusers = require('./bannedusers.json');
const config = require("./config.json");
//utility stuff brrrrrrrrrr

const bannedwords = ['hugs', 'sonic', 'fortnite', 'roblox', 'discord', '/r']

const utils = {
  banned: bannedusers,
  config: config,
  insideofdragon: insideofdragon,
  petresponses: petresponses,
  timer: Timer,
  htimer: Suggestcooldown, //heavytimer
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
const suggested = config.suggestion
const blockedprefixes = config.blockedprefixes

socket.on('message', data => {//on message
  let message = data.msg.toLowerCase().substr(0,80);
  let command = message.split(/ +/)[0].slice(config.prefix.length);
  let args = message.split(/ +/).splice(1);
  let testargs = args.join(' ');
  let nick = data.nick.toLowerCase();
  let homes = data.home.toLowerCase(); 
  let capnicks = data.nick;
  //cooldown stuff
  let cooldowns = utils.timer.get(homes);

  if (Date.now() - cooldowns <= 2500) return;
  
  if (utils.banned.includes(homes)) return;

  //pet draco
  if (message == 'pet draco') {pet(utils, message, args, data, homes);
  return utils.timer.set(homes, Date.now())};

  //add commands here to do stuff, Case: "command name": commandfunctionname(); timeout code; break
  if (!message.startsWith(config.prefix)) return;

  let found = false

  bannedwords.forEach(word => {
    if(nick.includes(word)) found = true;
  });

  bannedwords.forEach(word => {
    if(message.includes(word)) found = true; 
  });

  blockedprefixes.forEach(pref => {
    if(testargs.includes(pref)) found = true; 
  });


  if (found == true) return;

    switch (command) {
      case 'help': send('[DracoBot Version 2.1.1] Help here: https://pastebin.com/0ap6RGds');
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
      case 'insideofwyvern': insideofwyvern(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
        break;
      case 'suggest': suggest(utils, message, args, data, homes);
      utils.htimer.set(homes, Date.now());
          break;
      case 'say': say(utils, message, args, data, homes);
      utils.timer.set(homes, Date.now());
          break;
    };
});
//console users moment
//socket.on('update users',n=>console.log(n));

//functions here

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
  send(`(${args}) has been banned`)
  utils.banned.push(args);
  saveBanStuff();
}

function puke(utils, message, args, data, homes) {
  if (!Adminhomes.includes(homes)) return;
  send(`Wyvern spit ${args} out, UwU`)
  utils.insideofdragon.splice(utils.insideofdragon.indexOf(args),1);
  saveDedStuff();
}

function unban(utils, message, args, data, homes) {
  if (!Adminhomes.includes(homes)) return;
  send(`(${args}) has been unbanned`);
  utils.banned.splice(utils.banned.indexOf(args),1);
  saveBanStuff();
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


function insideofwyvern(utils, message, args, data, homes) {
  if(!utils.insideofdragon.length) return send('Wyvern\'s belly is empty.');
  send(utils.insideofdragon.join(", ") + ' are inside of the wyvern.');
}

function saveDedStuff() {
  fs.writeFile(__dirname + '/insideofdragon.json', JSON.stringify(insideofdragon), err => {});
}

function saveBanStuff() {
  fs.writeFile(__dirname + '/bannedusers.json', JSON.stringify(bannedusers), err => {});
}

function suggest(utils, message, args, data, homes) {
  let heavycd = utils.htimer.get(homes);
  let CooldowntimeH = (Date.now() - heavycd) / 1000
  if (Date.now() - heavycd <= 60000) {send(`you have ${CooldowntimeH} Seconds Left before you can suggest again`); utils.timer.set(homes, Date.now()); return};
  send(suggested[utils.random(0, suggested.length - 1)]);
  hook.send(args.join(" "))
}

function say(utils, message, args, data, homes) {
  send(args.join(" "));
}


//
