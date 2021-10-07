const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const uri = require('./config.json').DATABASE;
const database = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, native_parser: true  });
const {Usuario, Registro} = require('./clases');
const {RandKey} = require('./functions');


const start = (id) => new Promise((resolve, reject)=> {
    database.connect(err => {
      if(err) throw err;
      const query = {id: id};
      const projection = {_id: 0, nombre: 0, id: 1, fondos: 0 };
      database.db("discord").collection("usuario").findOne(query, projection).then(res => {
        resolve(res);
      }).catch(err => { reject(new Error('error al buscar en la base de datos')); });
    });
}); 
const insertUser = (tag,id) => new Promise((resolve, reject) => {
    var paykey = RandKey();
    var usuario = new Usuario(tag,id, 1024, paykey);
    database.connect(err => {
        if(err) throw err;
        database.db('discord').collection('usuario').insertOne(usuario).then(res=>{
          resolve(usuario.paykey);
        }).catch(err => { reject(new Error('error al insertar usuario pruebe mas tarde')); });
    });
});
//{id: id},{_id: 1, nombre: 0, id: 1, fondos: 1, paykey: 1}
const cuenta = (id) => new Promise((resolve, reject)=> {
  
  const query = {id: id};
  const projection = {_id: 1, nombre: 0, id: 1, fondos: 1, paykey: 1};
  database.connect(err => {
    if(err) throw err;
    database.db('discord').collection('usuario').findOne(query, projection).then(res=>{
      resolve(res);
    }).catch(err => { reject(new Error('error al buscar usuario intente mas tarde')); });
  });
}); 

const forPaykey= (paykey) => new Promise((resolve, reject)=> {
  const query = {paykey: paykey};
  const projection = {_id: 1, nombre: 1, id: 1, fondos: 1, paykey: 1};
  database.connect(err => {
    if(err) throw err;
    database.db('discord').collection('usuario').findOne(query, projection).then(res=>{
      resolve(res);
    }).catch(err => { reject(new Error('error al buscar usuario intente mas tarde')); });
  });

}); 


const updateid = (id,update_parameter) => new Promise((resolve, reject)=> {
   
  const query = {id: id};
  const update = {$set:{fondos: update_parameter }};
  database.connect(err => {
   if(err) { reject(new Error('error al actualizar usuario')); throw err;}
   database.db('discord').collection('usuario').updateOne(query, update);
   resolve(true);
  });
  
});

//message.author.tag, args[1],args[0],time, fondo1,fondo2, rid.toString()
const registro = (autor, paykey, cantidad, fondo1, fondo2, rid) => new Promise((resolve, reject) => {

  var tiempo = new Date();
  var registro = new Registro(autor, paykey, cantidad, tiempo, fondo1, fondo2, rid);
   
  database.connect(err=>{
    if(err) throw err;
    
  database.db('discord').collection('registros').insertOne(registro).then(res=>{ resolve(true);})
  .catch(err=>{reject(new Error('error al enviar el registro'));});
  })
   
});

const registros = (id) => new Promise((resolve, reject)=>{
  database.connect(err=>{
    if(err) throw err;
    database.db("discord").collection("registros").findOne({id: id},{id:1}).then(data=>{
      resolve(data);
    }).catch(err=>{reject(new Error('error al buscar el registro'))});
  });
}); 

const delRegistros = (id) => new Promise((resolve, reject)=>{
   database.connect(err=> {
   if(err) throw err;
   database.db("discord").collection('registros').deleteOne({id: id}).then(res=>{
     resolve(res);
   }).catch(err=>{reject(new Error('error al borrar registro'));});
  });
});

const erase = (id) => new Promise((resolve, reject)=>{
  database.connect(err=>{ 
    if(err) throw err;
    database.db('discord').collection('usuario').updateOne({id: id},{$set:{fondos:0}}) 
  })
  resolve(true);
});

const getkey = (tag) => new Promise((resolve, reject)=>{
   database.connect(err=>{
      if(err) throw err;
      database.db('discord').collection('usuario').findOne({nombre: tag},{paykey: 1, nombre: 1}).then(key=>{
        resolve(key);
      }).catch(err=>{reject(new Error('error al buscar paykey'));});
   });
});

module.exports = {database, start, insertUser, cuenta, forPaykey, updateid, registro, registros, delRegistros, erase, getkey};
