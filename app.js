const config = require('./config.json');

const {TransferReference, erry} = require('./functions');
const {start, insertUser, cuenta, forPaykey, updateid, registro, registros, delRegistros, erase, getkey} = require('./database');
const Mine = require('./minecraft.js');
const embs = require('./Embeds');
const compile = require('./compiler');


const Discord = require('discord.js');
const client = new Discord.Client();
let prefijo  = "!";


client.on('ready',() =>{  
  client.user.setPresence({
    activity: {
        name: "!comandos",
        type: "WATCHING" // & STREAMING, LISTENING, WATCHING
    },
    status: "online" // & idle, dnd, offline
  });
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
      if (mention.startsWith('!'))  {
        mention = mention.slice(1); }
        return client.users.cache.get(mention);}}


  if(commando === "start")
  {
    start(message.author.id).then(res => {
      if(res) {
           //
           message.channel.send(embs.normal("ya estas registrado usa !comandos o !ayuda",message.author.avatarURL()));
           message.react('😮');
           //
      }else{
          //
          insertUser(message.author.tag, message.author.id).then(res_paykey=>{
               //
                const embed = embs.registrado(message.author.tag,message.author.avatarURL(), res_paykey, message.author.id);
                message.channel.send({embed: embed});
                message.react('❤');
                message.react('🖐');
                //
          }).catch(err =>{console.log(err)});
      }
    }).catch(err=>{console.log(err)});
  }




  if(commando == "cuenta"){
     const id = message.author.id;
     cuenta(id).then(data=>{
        if(data) {
             //
             const embed = embs.cuenta(message.author.tag,message.author.username ,message.author.avatarURL(),data.fondos,data.paykey,message.author.id);
             message.channel.send({embed: embed});
             message.react('❤');
             //
        } else{
                //
                message.channel.send(embs.normal("el usuario no esta registrado, usa !start", message.author.avatarURL()));
                message.react('😦');
                //
        }
     }); 
  }


  
  if(commando === "fondos")
 {   
  cuenta(message.author.id).then(data=>{
      if(data) {
         //
          const embed = embs.normalFooter(`actualmente tines ${data.fondos} fondos disponibles`,message.author.avatarURL(),'usa !pay <paykey> para pagar! y !getpaykey para obtener su direccion!');
          message.channel.send(embed);
          message.react('❤');
          //
      }  else{
            //
            const embed  = embs.normal(`Error el usuario  ${message.author.username} no esta registrado, usa !start o !ayuda`, message.author.avatarURL());
            message.channel.send(embed);
            message.react('😦');
          //
      }
  }); 
 }






   if(commando === "pay"){

    var fondo1,fondo2;
    const paykey = parseInt(args[1]);
  
    cuenta(message.author.id).then(data=>{
      if(data) { 
        fondo1 = data.fondos;
        if(data.fondos > parseInt(args[0])) {
          if(!data.paykey != paykey) {
            forPaykey(paykey).then(extract => {
                if(extract) {
                  fondo2 = extract.fondos;
                  updateid(data.id,fondo1-parseInt(args[0])).catch(err=>{console.log(err)});
                  updateid(extract.id,fondo2+parseInt(args[0])).catch(err=>{console.log(err)});
                  var RID = TransferReference();
                        const embed = embs.pay(message.author,paykey,args[0], RID);
                        message.channel.send({embed: embed});
                        message.react('❤');
                        console.log(RID);
                        registro(message.author.tag,paykey, args[0], fondo1, fondo2, RID).catch(err=>{console.log(err);});
                }else{
                   // ARREGLAR ESTA PARTE
                   message.channel.send(embs.texto("la direccion no existe o fue cambiada"));
                   message.react('🌧');
                   // 
                }
            }).catch(err=>{ console.log(err); });         
          } else{
            //
            message.channel.send(embs.texto("no puedes pagarte a ti mismo!"));
            message.react('🌧');
            //
          }
        } else{
          //
              message.channel.send(embs.texto("no cuentas con fondos suficiente para hacer esta transaccion!"));
              message.react('🌧');
          //
        }   
     } else {
       //
        message.channel.send(embs.texto("Error el usuario "+ message.author.username + " no esta registrado, usa !start o !ayuda"));
        message.react('😦');
        //
     }
   }).catch(err=>{message.channel.send(embs.texto("error interno en la base de datos intente mas tarde"));message.react('🌧');})

   } //if de pay








   if(commando === "paykey"){
    cuenta(message.author.id)
      .then(data=>{
        if(data) {
             //
             const embed = embs.normalFooter(`TU direccion de pago es ${data.paykey}`,message.author.avatarURL(), 'usa !getpaykey @alguien para averiguar su direccion' );
             message.channel.send(embed);
             //
        } else{
          //
          const msg  = embs.normal("Error el usuario "+ message.author.username + " no esta registrado, usa !start o !ayuda", message.author.avatarURL());
          message.channel.send(msg);
          message.react('🌧');
          //
        }
      });
   }

  
   if(commando==="reg"){
    console.log(args[0]);

    if(parseInt(args[0]) != undefined) {  
      registros(parseInt(args[0])).then(data=>{
        if(data) {
          //
         const embed_1 = embs.registros(args[0], message.author.avatarURL(),data.origen,data.destino,data.cantidad, data.cuando);
          message.channel.send({embed: embed_1});
          message.react('😳');
          //
        } else{
            //
            const embed_mgs = embs.texto("la transferencia no esta o fue borrada");
            message.channel.send(embed_mg);
            message.react('🌧');
            //
        }
      });
    } else{
      //
      const embed_msg2  = embs.texto("debes poner un registro valido ejemplo  !reg 12345");
          message.channel.send(embed_msg2);
          message.react('🌧');
        //
    }    
  }


  if(commando === "del"){
     
    cuenta(message.author.id).then(data=>{
       if(data) {
         if(parseInt(args[0]) >= 0) {
           delRegistros(parseInt(args[0])).then(datas=>{
              //
              const embedd =  embs.texto("registro borrado, en caso de no existir ignorado!");
              message.channel.send(embedd);
              message.react('🌧');
              //
           });
         } else {
         //
          const msg = embs.texto("tienes que escribir un registro por ejemplo  !reg 123456");
          message.channel.send(msg);
         //
         }
        } else{
          //
         const msg = embs.texto("el usuario no esta registrado! usa !start");
         message.channel.send(msg);
         //
       }
    });

  }

  if(commando === "borrame"){
    cuenta(message.author.id).then(data=>{
      if(data) {
          erase(message.author.id).then(E=>{
            const borrame = embs.erase(message.author.displayAvatarURL());
             message.channel.send(borrame);
             message.react('😔');
             message.react('🌧');
          });
      } else{
        embs.texto("usuario no registrado, usa !start");
      }
    });
  }

   if(commando === "getpaykey"){
    if(args[0] != undefined) 
     {
      var target = getUserFromMention(args[0]);
      var tag;
      if(target) {tag=target.tag; } else {tag=args[0];}
      cuenta(message.author.id).then(data=>{
         if(data) {
              getkey(tag).then(extract=>{
                if(extract) {
                    //
                    const payemb = embs.getuno(extract.paykey,extract.nombre,message.author.username);
                    message.channel.send(payemb);
                    message.react('❤');
                    //
                } else{
                    //
                  const msg  = embs.texto("no se encontro ninguna direccion con nombre "+args[0]);
                  message.channel.send(msg);
                  message.react('😮');
                  //
                }
              })
         }else {
              //
              const msg  = embs.texto("usuario no registrado, usa !start para empezar");
              message.channel.send(msg);
              message.react('🌧');
              //
         }
      });
     } else{
        //
        const msg  = embs.texto("debes poner un nombre valido ejemp !getpaykey nonswave#1734  o !getpaykey @kevin");
        message.channel.send(msg);
        message.react('🌧');
        //
     }
     //fin if
   }

  if(commando === "ccinfo"){ 
    const msg = embs.texto("ccMegalo fue creado por kevin, en github como scyth3-c y en el mundo como nonswave_dev una tarde de abril de 2021, si necesitas soporte puedes escribir a este correo electronico kevintor2246@gmail.com ");
    message.channel.send(msg);
    message.react('❤');
  }
   
  if(commando === "invita") {
    const invita = embs.invita(message.author.avatarURL());
    message.channel.send(invita);
    message.react('❤');
  }

  if(commando === "comandos")
  {
       const ecomandos = embs.comandos(); 
       message.channel.send(ecomandos);
       message.react('🤓');
  }

   if(commando === "help" || commando === "ayuda" || commando === "helpcc") {
    const ayuda = embs.ayuda();   
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
     const emb = embs.slap(message.author.username, user.username)
     message.channel.send(emb);
    }  else{
      const error = embs.normal("¿donde esta el usuario que recibira la bofetada?",message.author.avatarURL());
      message.channel.send(error);
    } 
  }  
 }

 


 if(commando == "gif")
 {
   const gif = embs.gif();
   message.channel.send(gif); 
 }



  if(commando == "status")
  {
   const status = embs.status();
    message.channel.send(status);
    message.react('🤓');
  }


  if(commando == "bait")
  {
  const bait = embs.bait(message.author.username);
  message.channel.send(bait);
  message.react('🎣');
  }
   
   if(commando == "skin")
   {
      Mine.showAvatar(args[0].toString()).then(res=>{
        const skin = embs.normalImg(res, "skin");
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
              const mctotal = embs.mcinfo(skin,args[0],id,time,skinurl,base64,bodyType,message.author.username);
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
        var names = embs.nombres(message.author.username, avatar, res);
        message.channel.send(names);
      });
     });
   }

   if(commando == "unbase64") {
     let res = Buffer.from(args[0],'base64').toString();
      const base64 = embs.normal(res, message.author.avatarURL());
      message.channel.send(base64); 
    }
    if(commando == "base64") {
      
      let plain = "";
      for(let i=0; i<args.length; i++) {
        plain += args[i] + ' ';
      }

      let res = Buffer.from(plain).toString('base64');
      let base64 = embs.normal(res, message.author.avatarURL());
       message.channel.send(base64); 
     }


     if(commando == "icono") 
     {
       if(args[0] != undefined) {
       var target = getUserFromMention(args[0]);
        if(target) {
          const icono = embs.icono(target.avatar,target.id, target.tag);
       message.channel.send(icono);
       message.react('❤');
        } else{
          message.channel.send(embs.texto("se necesita un usuario valido!"));
        }
       } else{
         return;
       }
      }

      if(commando == "compile") {
        if(args[0] != undefined) {
          
          let raw = ` `;
          for(let i=0; i<args.length; i++) {
              raw += args[i] + ' ';
          }

          let precode = raw.replace("```", "");
          let code = precode.replace("```", "");

            compile.compile(code).then(res=>{

              message.channel.send(embs.output(res));

            }).catch(err=>{
              console.log(err);
              message.channel.send(embs.texto("error interno"));
            })

        }else{
         message.channel.send(embs.texto("codigo vacio"));
        }

      }

      if (commando == "github") {
        message.channel.send(embs.normal("https://github.com/scyth3-c/scyther-bot", message.author.avatarURL()));
      }

      if(commando == "cpp-example") {
        message.channel.send(embs.normal(`
        #include <iostream> 
        #include <functional>
           std::function<void(std::ostream&)> msg = [&](std::ostream& os) -> void {os<<"malloc_cizallas es bien GOD";};
        int main() {
          msg(std::cout);
        return 0;
        }
        `));
      }
      if(commando == "init-change") {
        if(args[0] != undefined) {
          message.channel.send(embs.normal(`prefijo cambiado de [ ${prefijo} ]  a  [ ${args[0]} ] , re reiniciara en el proximo shut del servidor`));
          prefijo = args[0].toString();
        } else {
          message.channel.send(embs.normal("tienes que asignar uno, por ejemplo !init-change @ "));
        }
      }
 
      
});


client.login(config.BOT_TOKEN);
//https://imgur.com/a/TTOYuK5



