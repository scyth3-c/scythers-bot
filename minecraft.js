const { on, captureRejectionSymbol } = require('events');
const { get } = require('http');
const https = require('https');
const { resolve } = require('path');

const searchProfile = (nombre) => new Promise((resolve, reject) =>{
   let APIurl = `https://api.mojang.com/users/profiles/minecraft/${nombre}`;
   let jsonResult;
   https.get(APIurl, (res) =>{
      let resConten = "";
      res.on('data', dato =>{
         resConten += dato;
      });
      res.on('end', () =>{
         jsonResult = JSON.parse(resConten);
         if(jsonResult == undefined){
            reject(new Error('jsonresult undefinido'));}  else{
            resolve(jsonResult.id)
          }
      }); 
      res.on('error', erry =>{
         console.log(erry);
      });   
   });
});
const getBase64 = (userUid) => new Promise((resolve,reject) =>{
   let APIurl = `https://sessionserver.mojang.com/session/minecraft/profile/${userUid}`;
   let jsonResult;
   let base64;
   https.get(APIurl, (res) =>{
      let resConten = "";
     res.on('data', dato =>{
         resConten += dato;
     });
     res.on('end', ()=>{
        jsonResult = JSON.parse(resConten);
        base64 = jsonResult.properties[0].value;
        if(base64 == undefined)
        {
           reject(new Error("base64 undefinida"));
        } else{
           resolve(base64);
        }
     });
     res.on('error', erry =>{
       console.log(erry);
     });
   });
}); 
const unBase64 = (base64) => new Promise((resolve, reject) =>{
    let uncode = Buffer.from(base64,'base64').toString();
    let json = JSON.parse(uncode);
    let skin = json.textures.SKIN.url
    if(skin == undefined) { reject(new Error('skin undefined'));}
    else {resolve(skin);}
});
const getTime = (base64) => new Promise((resolve, reject) =>{
   let uncode = Buffer.from(base64,'base64').toString();
   let json = JSON.parse(uncode);
   let time = json.timestamp;
   if(time == undefined) { reject(new Error('time undefined'));}
   else {resolve(time);}
});
const getBodyType = (base64) => new Promise((resolve, reject) =>{
   let uncode = Buffer.from(base64,'base64').toString();
   let json = JSON.parse(uncode);
   let type = json.textures.SKIN.metadata.model;
   if(type == undefined) { reject(new Error('TIMESTAMAP UNDEFINIEND'));}
   else {resolve(type);}
});
const getNames = (name) => new Promise((resolve, reject) =>{
   searchProfile(name).then(uid =>{
      let APIurl = `https://api.mojang.com/user/profiles/${uid}/names`;
      var conten;
      var json;
      https.get(APIurl, res =>{
        res.on('data',datos =>{
           conten += datos;
        });
        res.on('end', () =>{
         if(conten != undefined)
         {
            resolve(conten);
         } else { 
            reject(new Error('json names vacio'));
         }
        });
      });
   });
});
const getSkin = (user) => new Promise((resolve, reject) =>{
   searchProfile(user).then(uid => {
      getBase64(uid).then(base64 => {
         unBase64(base64).then(skin =>{
            if(skin == undefined)
               {
                  reject(new Error('skin esta indefinida'));
               }else{
                  resolve(skin);
               }
         });
      });
   });
});
const showAvatar = (nombre) => new Promise((resolve, reject) =>{
   searchProfile(nombre).then(uid =>{
       let APIurl = `https://crafatar.com/avatars/${uid}?size=100&default=MHF_Steve&overlay`;
       if(uid == undefined){reject(new Error('uid invalida'));} else {
       resolve(APIurl); }
   });
});
exports.getSkin = getSkin;
exports.showAvatar = showAvatar;
exports.searchProfile = searchProfile;
exports.getBase64 = getBase64;
exports.getTime = getTime;
exports.getBodyType = getBodyType;
exports.getNames = getNames;
