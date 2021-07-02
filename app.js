const Discord = require('discord.js');
const config = require('./config.json');
const mongo = require('mongodb');
const os = require('os');
const MongoClient = require('mongodb').MongoClient;

const { copyFileSync, access } = require('fs');
const { measureMemory } = require('vm');
const { setFlagsFromString } = require('v8');
const { match, rejects } = require('assert');
const { memory } = require('console');
const Mine = require('./minecraft.js');
const { join, resolve } = require('path');

const uri = " ---- - - -- - MONGO DB CLUSTER URL  ------ - -- - ";


const database = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, native_parser: true  });


const client = new Discord.Client();
const prefijo  = "!";


class Usuario{
  constructor(nombre, id, fondos, paykey) {
  this.nombre = nombre;
  this.id = id;
  this.fondos = fondos;
  this.paykey = paykey;
  }
};

class Registro {
  constructor(origen, destino, cantidad, cuando, fondo1,fondo2,id){
    this.origen = origen;
    this.destino = destino;
    this.cantidad = cantidad;
    this.cuando = cuando;
    this.fondo1 = fondo1;
    this.fondo2 = fondo2;
    this.id = id;
  }
}
function erry(args){console.log(args)};

var Servertime = new Date();
var serverData = {
  
  cluster: "```Abis```",
  tipo: "```NoSQL```",
  database: "```online```",
  timeServer: "```"+ Servertime+"```",
  server: "```"+os.type()+"```",
  upTime: "```"+os.uptime()+"```",
  serverVersion: "```"+os.version()+"```",
  serverTotalMem: "```"+os.totalmem()+"```",
  serverFreeMem: "```"+os.freemem()+"```",
  serverMem: "```"+(os.freemem() * 100 / os.totalmem()).toFixed(1)+"%```"
}

var gifs = ["https://i.imgur.com/MsfUw8Z.gif", "https://i.imgur.com/XE6olcA.gif", "https://i.imgur.com/Qi6wCf4.gif", "https://i.imgur.com/EtNjSRH.gif", "https://i.imgur.com/EBI8FEO.gif", "https://i.imgur.com/9sV7tPU.gif", "https://i.imgur.com/YfPcwX7.gif", "https://i.imgur.com/dc4T5yP.gif"];
var slaps = ["https://i.imgur.com/N8DPIBM.gif", "https://i.imgur.com/46c0wyE.gif", "https://i.imgur.com/pTsTrez.gif"];

function RandKey(){
  var max = 99999;
  var min = 1000;
  let time = new Date();
  var rand = Math.floor(Math.random() * (max - min)) + min;
  rand = rand - Math.floor(Math.random() * (100-10)) + min;
  rand = rand + time.getSeconds();
  return rand;
}
function TransferReference(){
  var max = 999484459;
  var min = 100454750;
  let time = new Date();
  var rand = Math.floor(Math.random() * (max - min)) + min;
  rand = rand - Math.floor(Math.random() * (1002-130)) + min;
  rand = rand + time.getSeconds();
  return rand;
}

var coin = "https://imgur.com/IR79jXT.png";
var logo = "https://i.imgur.com/SpY4ouW.png";


client.on('ready',() =>{  
  client.user.setPresence({activity: {  name: "!comandos", type: "WATCHING"  },  status: "online"});
});


client.on("message", (message)=>{
  
   if(!message.content.startsWith(prefijo)) return; 
   const command_body = message.content.slice(prefijo.length);
   const args = command_body.split(' ');
   const commando = args.shift().toLowerCase();

   function getUserFromMention(mention) {
    if (!mention) return;
  
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
  
      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }
        return client.users.cache.get(mention);
    }
  }

  
  if(commando === "start")
  {
      database.connect(err=>{
        var query = {id: message.author.id }
        var projection = { _id: 0, nombre: 0, id: 1, fondos: 0 };
        database.db("discord").collection("usuario").findOne(query, projection)
        .then ( result =>{
                  if(result){
                    //asad
                    const msg  = new Discord.MessageEmbed()
                  .setColor('#0000ff')
                  .setTitle("ya estas registrado usa !comandos o !ayuda")
                  .setThumbnail(message.author.avatarURL);
                  message.channel.send(msg);
                  message.react('😮');
                  } else{
                    var paykey = RandKey();
                    var usuario = new Usuario(message.author.tag, message.author.id, 1024, paykey);
                    database.db("discord").collection("usuario").insertOne(usuario)
                    .then(result =>{
                         
                      const embed = new Discord.MessageEmbed()
                      .setAuthor(message.author.tag + ' se ha registrado')
                      .setColor('#0000ff')
                      .setThumbnail(message.author.avatarURL())
                      .addField('_fondos actuales:_ ', ' 1024 unidades CC')
                      .addField('direccion de cuenta: ', usuario.paykey)
                      .setFooter(' ID: ' + message.author.id)
                      message.channel.send({embed: embed});
                        message.react('❤');
                        message.react('🖐');
                    })
                    .catch(err =>{
                       console.error("error fatal al insertar usuario");
                    })
                  }
        })
        .catch (err =>{
          console.error("no se encontro nada");
        })
    })}
  if(commando == "cuenta"){

     var id = message.author.id;
     database.connect(err =>{
       
           database.db("discord").collection("usuario").findOne({id: id},{_id: 1, nombre: 0, id: 1, fondos: 1, paykey: 1})
           .then(result =>{
              if(result){
                const embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag)
                .setColor('#0000ff')
                .setTitle(`tu cuenta ${message.author.username}`)
                .setThumbnail(message.author.avatarURL())
                .addField('_fondos actuales:_ ', result.fondos.toString()+" **CC**")
                .addField('direccion de cuenta: ', result.paykey)
                .setFooter(' ID: ' + message.author.id)
                message.channel.send({embed: embed});
                message.react('❤');
              }
              else {

                const msg  = new Discord.MessageEmbed()
                  .setColor('#0000ff')
                  .setTitle(`Error el usuario  ${message.author.username} no esta registrado, usa !start o !ayuda`)
                  .setThumbnail(message.author.avatarURL);
                  message.channel.send(msg);
                message.react('😦');
              }
             })
            .catch(err =>{
             message.reply("error fatal, no se encontro **nada**, ya tienes una cuenta?");
           })
     })
  }

  if(commando === "fondos")
 {

  var id = message.author.id;
  database.connect(err =>{
    
        database.db("discord").collection("usuario").findOne({id: id},{fondos:1})
        .then(result =>{
           if(result){

            const payemb = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle(`actualmente tines ${result.fondos} fondos disponibles`)
            .setImage(message.author.displayAvatarURL())
            .setFooter('usa !pay <paykey> para pagar! y !getpaykey para obtener su direccion! ');
            message.channel.send(payemb);


             message.react('❤');
           }
           else {
            const msg  = new Discord.MessageEmbed()
            .setColor('#0000ff')
            .setTitle(`Error el usuario  ${message.author.username} no esta registrado, usa !start o !ayuda`)
            .setThumbnail(message.author.avatarURL);
            message.channel.send(msg);
          message.react('😦');
           }
          })
         .catch(err =>{
          message.reply("error fatal, no se encontro **nada**, ya tienes una cuenta?");
        })
  })
 }

   if(commando === "pay"){
    var fondo1,fondo2;
    database.connect(err=>{
        database.db("discord").collection("usuario").findOne({id:message.author.id}, {id:1})
        .then(res=>{
            if(res){
            if(res.fondos > parseInt(args[0]))   {
              database.db("discord").collection("usuario").findOne({id:message.author.id},{paykey: 1})
              .then(res =>{
                if(res.paykey.toString()===args[1]){
                  message.reply("```no puedes pagarte a ti mismo :c ```");
                  message.react('😜');
                }   // fase ___8 
                else {
                  var paykey =  parseInt(args[1]);
                  database.db("discord").collection("usuario").findOne({paykey:paykey}, { id: 1, fondos: 1, paykey: 1})
                  .then(result =>{
                    if(result){
                      fondo1 = result.fondos;
                      database.db("discord").collection("usuario").findOne({id:message.author.id},{id: 1, fondos: 1, paykey: 1})
                      .then(result =>{
                        fondo2 = result.fondos;
                         if(result.paykey === args[1]){ message.reply("no puedes pagarte a ti mismo! :C"); return; }
                         database.db("discord").collection("usuario").updateOne({id:result.id},{$set:{fondos:fondo2-parseInt(args[0])}});
                         database.db("discord").collection("usuario").updateOne({paykey:paykey},{$set:{fondos:fondo1+parseInt(args[0])}});
                         var rid = TransferReference();
                         const embed = new Discord.MessageEmbed()
                        .setAuthor('Transferencia')
                        .setColor('#0000ff')
                        .setThumbnail(coin)
                        .addField('origen ', message.author)
                        .addField('cuenta destino ', args[1])
                        .addField('cantidad', args[0] + ' _unidades CC_')
                        .addField('id tranferencia ', rid)
                        .setFooter('usa !reg [id] para ver la ultima tranferncia en el sistema!');
                        message.channel.send({embed: embed});
                        message.react('❤');
                        var time = new Date();
                        var registro = new Registro(message.author.tag, args[1],args[0],time, fondo1,fondo2, rid.toString());
                          database.db("discord").collection("registros").insertOne(registro)
                          .then(result =>{
                              console.log("registro enviado");
                          })
                          .catch(err =>{
                            console.error("error fatal al enviar el registro");
                          })
                      })
                      .catch(err =>{
                        const msg  = new Discord.MessageEmbed()
                  .setColor('#0000ff')
                  .setTitle("La direccion no existe o fue actualizada 1")
                  .setThumbnail(message.author.avatarURL);
                  message.channel.send(msg);
                message.react('😦');
                      
                      })        
                    }
                    else{
                      const msg  = new Discord.MessageEmbed()
                      .setColor('#0000ff')
                      .setTitle("La direccion no existe o fue actualizada 1")
                      .setThumbnail(message.author.avatarURL);
                      message.channel.send(msg);
                    message.react('😦');
                    }
                  })
                  .catch(err =>{
                    const msg  = new Discord.MessageEmbed()
                    .setColor('#0000ff')
                    .setTitle("La direccion no existe o fue actualizada 1")
                    .setThumbnail(message.author.avatarURL);
                    message.channel.send(msg);
                  message.react('😦');
                  })       
              
                }
        
              })
              .catch(err =>{
                message.reply("error al conectar con la base de datos, prueba cambiar sintaxis o usa !comandos");
              })
            }
            else {       
              const msg  = new Discord.MessageEmbed()
              .setColor('#0000ff')
              .setTitle("no cuentas con suficientes fondos para reaizar esta transaccion :c")
              .setThumbnail(message.author.avatarURL);
              message.channel.send(msg);
              message.react('🌧');
            }

            }
            else {
              const msg  = new Discord.MessageEmbed()
              .setColor('#0000ff')
              .setTitle("Error el usuario "+ message.author.username + " no esta registrado, usa !start o !ayuda")
              .setThumbnail(message.author.avatarURL);
              message.channel.send(msg);
              message.react('🌧');

            }
        })
        .catch(err =>{
             message.reply("error al conectar con la base de datos");
        })
    })

   }

   if(commando === "paykey"){
     database.connect(erry =>{
       database.db("discord").collection("usuario").findOne({id:message.author.id},{id:1})
       .then(res=>{
         if(res){
         
             const payemb = new Discord.MessageEmbed()
             .setColor('#0000ff')
             .setTitle(`TU direccion de pago es ${res.paykey}`)
             .setImage(message.author.displayAvatarURL())
             .setFooter('usa !getpaykey @alguien para averiguar su direccion');
             message.channel.send(payemb);
         }
         else{
          const msg  = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle("Error el usuario "+ message.author.username + " no esta registrado, usa !start o !ayuda")
          .setThumbnail(message.author.avatarURL);
          message.channel.send(msg);
          message.react('🌧');
         }
       })
       .catch(err =>{
        const msg  = new Discord.MessageEmbed()
              .setColor('#0000ff')
              .setTitle("Error el usuario "+ message.author.username+ " no esta registrado, usa !start o !ayuda")
              .setThumbnail(message.author.avatarURL);
              message.channel.send(msg);
              message.react('🌧');
       })
     })
   }
   if(commando==="reg"){
    if(args[0] != undefined){
      database.connect(erry =>{
        database.db("discord").collection("registros").findOne({id:args[0]}, {id:1})
        .then(res=>{
         if(res){
           const embed = new Discord.MessageEmbed()
         .setColor('#0000ff')
         .setAuthor('Tranferencia ' + args[0])
         .setThumbnail(message.author.displayAvatarURL())
         .addField('origen ', res.origen)
         .addField('destino ', res.destino)
         .addField('cantidad', res.cantidad + ' **unidades CC**')
         .addField('fecha ', res.cuando)
         .setFooter('usa !delete [id] para borrar una tranferencia');
         message.channel.send({embed: embed});
         message.react('😳');
         }
         else {
          const msg  = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle("la transferencia no existe o fue borrada")
          .setThumbnail(message.author.avatarURL);
          message.channel.send(msg);
          message.react('🌧');
         }
        })
        .catch(erry =>{
 
        })
     })
    }else{
      const msg  = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle("debes poner un registro valido ejem  !reg 12345")
          .setThumbnail(message.author.avatarURL);
          message.channel.send(msg);
          message.react('🌧');
    }
    
   }

  if(commando === "del"){
     
    database.connect(err =>{
       database.db("discord").collection("usuario").findOne({id:message.author.id},{id:1})
       .then(res =>{
         if(res){
          database.db("discord").collection("registros").deleteOne({id:args[0]})
          .then(res =>{
                if(args[0] != undefined){
                  
                  const msg  = new Discord.MessageEmbed()
                  .setColor('#0000ff')
                  .setTitle("la transferencia fue borrada, en caso de no existir solo sera ignorada")
                  .setThumbnail(message.author.avatarURL);
                  message.channel.send(msg);
                  message.react('😮');
                }
                else{
                  const msg  = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle("debes poner un id valido por ejemplo !del 1345543")
          .setThumbnail(message.author.avatarURL);
          message.channel.send(msg);
          message.react('🌧');
                }
          })
          .catch(err =>{})
         }
         else{
          const msg  = new Discord.MessageEmbed()
          .setColor('#0000ff')
          .setTitle("el usuario no esta registrado usa !start o !ayuda")
          .setThumbnail(message.author.displayAvatarURL())
          .setThumbnail(message.author.avatarURL);
          message.channel.send(msg);
          message.react('🌧');
         }
       })
       .catch(err =>{ })

    })

  }

  if(commando === "borrame"){
    database.connect(erry =>{
      database.db("discord").collection("usuario").updateOne({id:message.author.id},{$set:{fondos:0}})
      .then(res =>{
         
        const borrame = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle('todos tus fondos fueron borrados')
        .setThumbnail(message.author.displayAvatarURL())
        .setImage('https://i.imgur.com/EBI8FEO.gif')
        .setFooter('tu cuenta no fue borrada solo esta en cero');
         message.channel.send(borrame);
           message.react('😔');
           message.react('🌧');
      })
      .catch(err =>{
        const msg  = new Discord.MessageEmbed()
                  .setColor('#0000ff')
                  .setTitle("errro desconocido")
                  .addField("error: ", err)
                  .setThumbnail(message.author.avatarURL);
                  message.channel.send(msg);
                  message.react('😮');
      })
    })
  }

   if(commando === "getpaykey"){
     
    if(args[0] != undefined){
      var target = getUserFromMention(args[0]);
      database.connect(erry =>{
        database.db("discord").collection("usuario").findOne({id:message.author.id},{id:1})
        .then(res=>{
            if(res){
              database.db("discord").collection("usuario").findOne({nombre:target.tag || args[0]},{paykey:1,nombre:1})
              .then(res=>{
                  if(res){
                    const payemb = new Discord.MessageEmbed()
                    .setColor('#0000ff')
                    .setTitle(`la paykey solicitada es ${res.paykey}`)
                    .setThumbnail(coin)
                    .setAuthor(message.author.tag)
                    .setFooter('megalo by nonswave');
                    message.channel.send(payemb);
                    message.react('❤');
                  }
                  else {
                    const msg  = new Discord.MessageEmbed()
                  .setColor('#0000ff')
                  .setTitle(`no se econtro ninguna direccion relacionada con el nombre ${args[0]}`)
                  .setThumbnail(message.author.avatarURL);
                  message.channel.send(msg);
                  message.react('😮');
                  }
              })
              .catch(err =>{
                message.reply("error desconocido");
              })
            
            }else {
              const msg  = new Discord.MessageEmbed()
              .setColor('#0000ff')
              .setTitle("el usuario no esta registrado usa !start o !ayuda")
              .setThumbnail(message.author.displayAvatarURL())
              .setThumbnail(message.author.avatarURL);
              message.channel.send(msg);
              message.react('🌧');
            }
        })
        .catch(err =>{
          message.channel.send(`hola ${message.author} hubo un error en el sistema`);
        })
      })
    }
    else{
      const msg  = new Discord.MessageEmbed()
      .setColor('#0000ff')
      .setTitle("debes poner un nombre valido ejemp !getpaykey nonswave#1734  o !getpaykey @kevin")
      .setThumbnail(message.author.displayAvatarURL())
      .setThumbnail(message.author.avatarURL);
      message.channel.send(msg);
      message.react('🌧');
    }

   }


  if(commando === "ccinfo"){ 
    
    const msg  = new Discord.MessageEmbed()
                  .setColor('#0000ff')
                  .setTitle("ccMegalo fue creado por kevin, en github como scyth3-c y en el mundo como nonswave_dev una tarde de abril de 2021, si necesitas soporte puedes escribir a este correo electronico kevintor2246@gmail.com  ")
                  .setThumbnail(message.author.avatarURL);
                  message.channel.send(msg);
    message.react('❤');
  }
   
  if(commando === "invita") {
     const invita = new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle('link de invitacion limitado ') 
    .setImage(message.author.displayAvatarURL())
    .addField('link 1', "https://discord.com/api/oauth2/authorize?client_id=832815877266997248&permissions=0&scope=bot");
    message.channel.send(invita);
    message.react('❤');
  }

  if(commando === "comandos")
  {
    var commandos = {status: "```!estatus  #estado del server  ```",mcnames: "```!mcnames <usuario>    #todos los nombres de un usuario de minecraft```",mcinfo: "```!mcinfo <usuario>  #mucha informacion de un perfil de minecraft ```",skin: "```!skin <usuario>   #muestra la cabeza de tu skin en minecraft! ```",bait: "```!bait #dices que era bait!!!```",gif: "```!gif   #gif aleatorio ```",slap: "``` !slap <target> #abofetear un objetivo ```",start:"```!start    #te registra en la base de datos ``` ", paykey: "```!paykey   #devuelve tu direccion de cartera donde estan todas tus unidades y a donde te pueden pagar```",pay: "```!pay <unidades> <paykey>  #realiza la tranferencia de unidades la paykey es la direccion de la cartera y deja el id del registro```", cuenta: "```!cuenta   #devuelve informacion de la cuenta```", fondos: "```!fondos   #devuelve tus unidades disponibles```", getpaykey: "```!getpaykey <nombre#123>   #devuelve la direccion de cartera de un usuario registrado```", reg: "```!reg <id>  #visualizar un registro escribiendo su id que deja al hacer el !pay```", del: "```!del <id>  #borra un registro con su id que deja al hacer !pay```", borrame: "```!borrame   #borra todos tus fondos```", ccinfo: "```!ccinfo   #informacion y contacto```", help: "```!helpcc    #ayuda general de ccMegalo el cc es para que no salten los otros bots```", comandos: "```!comandos  #muestra informacion sobre comandos y parametros```"};

    const ecomandos = new Discord.MessageEmbed()
       .setColor('#572364')
       .setTitle('Ayuda')
       .setURL('https://pastebin.com/tiHiKdFC')
       .setAuthor('ccMegalo guia', logo, 'https://pastebin.com/tiHiKdFC')
       .setDescription('ccMegalo')
       .setThumbnail(coin)
        .addField('Start',commandos.start)
        .addField('Paykey',commandos.paykey)
        .addField('Pay',commandos.pay)
        .addField('Cuenta',commandos.cuenta)
        .addField('Fondos', commandos.fondos)
        .addField('Getpaykey', commandos.getpaykey)
        .addField('Reg', commandos.reg)
        .addField('Del', commandos.del)
        .addField('Status', commandos.status)
        .addField('Slap',commandos.slap)
        .addField('Gif', commandos.gif)
        .addField('Skin', commandos.skin)
        .addField('Bait',commandos.bait)
        .addField('Mcinfo', commandos.mcinfo)
        .addField('Mcnames', commandos.mcnames)
        .addField('Borrame', commandos.borrame)
        .addField('Ccinfo', commandos.ccinfo)
        .addField('Helpcc', commandos.help)
        .addField('Comandos', commandos.comandos)
        .addField('Invita', '!invita  #genera el codigo de invitacion del bot')

       .setFooter('ccmegalo y nonswave_dev', logo);
       message.channel.send(ecomandos);
       message.react('🤓');
  }
   if(commando === "help" || commando === "ayuda" || commando === "helpcc") {
  

     var help = { p1: "```ccMegalo acepeta sugerencias para añadir al bot```", p2: "```cada usuario al abrir su cuenta con !start contara con 1024 CC disponibles```", p3: "```con !pay se realizan transacciones y no importa el servidor, es la misma base de datos```", p4: "```usa !comandos para ver la lista de comandos```"};
     const ayuda = new Discord.MessageEmbed()
       .setColor('#572364')
       .setTitle('Ayuda')
       .setURL('https://pastebin.com/tiHiKdFC')
       .setAuthor('CCmegalo guia', logo, 'https://pastebin.com/tiHiKdFC')
       .setDescription('ccMegalo multi proposito')
       .setThumbnail(coin)
        .addField('Parte 1',help.p1)
        .addField('Parte 2',help.p2)
        .addField('Parte 3',help.p3)
        .addField('Parte 4',help.p4)
        .addField('Parte 5', 'hay otras funciones con las que puedes divertirte')
       .setFooter('ccmegalo by nonswave_dev', logo);
       message.channel.send(ayuda);


    message.react('❤');
   }

 if(commando == "slap")
 {
  
  if(args[0])
  {
    const user = getUserFromMention(args[0]);
    if(user)
    {
     const emb = new Discord.MessageEmbed()
     .setColor('#0000ff')
     .setTitle(message.author.username + " ha dado una noble cachetada a " + user.username)
     .setImage(slaps[Math.floor(Math.random()* slaps.length)]);
     message.channel.send(emb);
    }  else{
      const error = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('donde esta el usuario para darle una bofetada?')
      .setThumbnail(message.author.displayAvatarURL());
      message.channel.send(error);
    } 
  }  
 }

 


 if(commando == "gif")
 {
   const gif = new Discord.MessageEmbed()
   .setColor('#0000ff')
   .setTitle("gif")
   .setImage(gifs[Math.floor(Math.random()* gifs.length)]);  
   message.channel.send(gif); 
 }

  if(commando == "status")
  {
    const status = new Discord.MessageEmbed()
    .setColor('#572364')
    .setTitle('status')
    .setURL('https://pastebin.com/tiHiKdFC')
    .setAuthor('ccMegalo status', logo, 'https://pastebin.com/tiHiKdFC')
    .setDescription('cluster Abis')
    .setThumbnail("https://i.imgur.com/wVtCI0n.png")
     .addField('Cluster',serverData.cluster)
     .addField('Tipo:',serverData.tipo)
     .addField('database',serverData.database)
     .addField('Server',serverData.server)
     .addField('Server time', serverData.timeServer)
     .addField('Server uptime',serverData.upTime )
     .addField('Server Version',serverData.serverVersion)
     .addField('Server Mem', serverData.serverMem) 
    .setFooter('ccMegalo by nonswave_dev', logo);
    message.channel.send(status);
    message.react('🤓');
  }

  if(commando == "bait")
  {
  const bait = new Discord.MessageEmbed()
  .setColor('#0000ff ')
  .setTitle(`${message.author.username} ha dicho es bait!`)
  .addField('contexto', `el usuario ${message.author.username} ha confirmado que lo anterior dicho era bait, asi que queda exonerado totalmente de las acusaciones o situaciones correspondientes`)
  .setImage('https://i.imgur.com/hEaHv6M.jpg');
  message.channel.send(bait);
  message.react('🎣');
  }
   
   if(commando == "skin")
   {
      Mine.showAvatar(args[0].toString()).then(res=>{
        
        const skin = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setTitle(message.author.username + " avatar skin")
        .setImage(res);
        message.channel.send(skin);

      }).catch(err => {
        console.log(err);
      });
   }


   if(commando == "mcinfo")
   {
   let id;
   let skin;
   let skinurl;  
   let base64;
   let time;
   let bodyType;

   var args_ = args[0].toString();
   Mine.searchProfile(args_).then(uid => { id = uid; 
         Mine.getBase64(uid).then(base => {base64 = base;
          Mine.getTime(base).then(time_ =>{time = time_;}).catch(err => {erry(err);});
          Mine.getBodyType(base).then(type =>{bodyType = type;
            Mine.getSkin(args_).then(skinU => { skinurl = skinU; 
              const mctotal = new Discord.MessageEmbed()
              .setColor('#0000ff')
              .setTitle('Minecraft Info')
              .setThumbnail(skin)
              .addField('nombre', '```'+args[0]+'```')
              .addField('uid','```'+id+'```')
              .addField('timestamp','```'+time+'```')
              .addField('skin url', '```'+skinurl+'```')
              .addField('base64 perfil', '```'+base64+'```')
              .addField('tipo cuerpo', '```'+bodyType+'```')
              .setAuthor(message.author.username)
              .setDescription('informacion del perfil en minecraft')
              .setFooter('minecraft.js by nonswave');
              message.channel.send(mctotal);
            }).catch(err => {erry(err);});
           
          }).catch(err => {erry(err);});  
        }).catch(err => {erry(err);});
  }).catch(err => {erry(err);});
   Mine.showAvatar(args_).then(url => {skin = url;}).catch(err => {erry(err);});
   }

   if(commando == "mcnames")
   {
     Mine.showAvatar(args[0].toString()).then(avatar =>{
      Mine.getNames(args[0].toString()).then(res =>{
        let aux = res.replace('{', ' \n')
        var names = new Discord.MessageEmbed()
        .setColor('#0000ff')
        .setAuthor(message.author.username)
        .setDescription('registro de nombres y su timestamp')
        .setThumbnail(avatar)
        .addField('json', res.replace('undefined','nombres: '));
        message.channel.send(names);
      });
     });
   }
   if(commando == "unbase64") {
     let res = Buffer.from(args[0],'base64').toString();
     let base64 = new Discord.MessageEmbed()
     .setColor('#0000ff')
     .setAuthor(message.author.username)
     .setThumbnail(message.author.displayAvatarURL())
     .setTitle(res);
      message.channel.send(base64); 
    }

    if(commando == "base64") {
      let res = Buffer.from(args[0]).toString('base64');
      let base64 = new Discord.MessageEmbed()
      .setColor('#0000ff')
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      .setTitle(res);
       message.channel.send(base64); 
     }

     if(commando == "icono") 
     {
       if(args[0] != undefined) {
       var target = getUserFromMention(args[0]);
       const icono = new Discord.MessageEmbed()
       .setTitle(`icono de perfil de ${target.tag}`)
       .setImage(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png?size=256`)
       .setFooter('ccMegalo by nonswave');
       message.channel.send(icono);
       message.react('❤');
       } else{
         return;
       }
      }
      if(commando == "send")
      {
         message.channel.send(args[0]);
      }
});
client.login(config.BOT_TOKEN);



