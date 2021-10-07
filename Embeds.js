const Discord = require('discord.js');
const { coin, logo, slaps, gifs, serverData} = require('./config');

function texto(msg) {
    return  new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle(msg)
    .setThumbnail(coin);
}
function normalImg(img,titulo){
    return  new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle(titulo)
    .setImage(img);
}
function normal(msg, avatar) {
    return  new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle(msg)
    .setThumbnail(avatar);
}
function normalFooter(msg, avatar, footer) {
    return  new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle(msg)
    .setThumbnail(avatar)
    .setFooter(footer);
}
function registrado(tag, avatar, paykey, id) {

    return new Discord.MessageEmbed()
    .setAuthor(tag + ' se ha registrado')
    .setColor('#0000ff')
    .setThumbnail(avatar)
    .addField('_fondos actuales:_ ', ' 1024 unidades CC')
    .addField('direccion de cuenta: ', paykey)
    .setFooter(' ID: ' + id);
}
function cuenta(tag, username,avatar, fondos, paykey,id) {
    return  new Discord.MessageEmbed()
    .setAuthor(tag)
    .setColor('#0000ff')
    .setTitle(`tu cuenta ${username}`)
    .setThumbnail(avatar)
    .addField('_fondos actuales:_ ', fondos+" **CC**")
    .addField('direccion de cuenta: ',paykey)
    .setFooter(' ID: ' + id);
}

function pay(autor, paykey, cantidad, referencia) {
   return new Discord.MessageEmbed()
                        .setAuthor('Transferencia')
                        .setColor('#0000ff')
                        .setThumbnail(coin)
                        .addField('origen ', autor)
                        .addField("cuenta destino" , paykey)
                        .addField('cantidad', cantidad + ' _unidades CC_')
                        .addField('id tranferencia ', referencia)
                        .setFooter('usa !reg [id] para ver la ultima tranferncia en el sistema!');
}

function registros(id, avatar, origen, destino, cantidad, cuando) {
    return  new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setAuthor('Tranferencia ' + id)
    .setThumbnail(avatar)
    .addField('origen ',origen)
    .addField('destino ',destino)
    .addField('cantidad',cantidad + ' **unidades CC**')
    .addField('fecha ', cuando)
    .setFooter('usa !delete [id] para borrar una tranferencia');
}

function erase(avatar) {
    return new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle('todos tus fondos fueron borrados')
    .setThumbnail(avatar)
    .setImage('https://i.imgur.com/EBI8FEO.gif')
    .setFooter('tu cuenta no fue borrada solo esta en cero');
}

function getuno(paykey, nombre, autor) {
    return new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle(`la paykey solicitada es ${paykey}`)
    .addField('pertenece a ', nombre)
    .setThumbnail(coin)
    .setAuthor(autor)
    .setFooter('megalo by nonswave');
}

function invita(avatar) {
    return new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle('link de invitacion limitado ') 
    .setThumbnail(avatar)
    .addField('link 1', "https://discord.com/api/oauth2/authorize?client_id=832815877266997248&permissions=0&scope=bot");
}

function comandos() {
     var commandos = {icono: "```!icono @usuario   #envia la foto de perfil del usuario mencionado```",unbase64: "```!unbase64 <texto>  #convierte base64 a texto ```" ,base64: "```!base64 <frase> #traduce una cadena de texto a base64 ```" ,status: "```!estatus  #estado del server  ```",mcnames: "```!mcnames <usuario>    #todos los nombres de un usuario de minecraft```",mcinfo: "```!mcinfo <usuario>  #mucha informacion de un perfil de minecraft ```",skin: "```!skin <usuario>   #muestra la cabeza de tu skin en minecraft! ```",bait: "```!bait #dices que era bait!!!```",gif: "```!gif   #gif aleatorio ```",slap: "``` !slap <target> #abofetear un objetivo ```",start:"```!start    #te registra en la base de datos ``` ", paykey: "```!paykey   #devuelve tu direccion de cartera donde estan todas tus unidades y a donde te pueden pagar```",pay: "```!pay <unidades> <paykey>  #realiza la tranferencia de unidades la paykey es la direccion de la cartera y deja el id del registro```", cuenta: "```!cuenta   #devuelve informacion de la cuenta```", fondos: "```!fondos   #devuelve tus unidades disponibles```", getpaykey: "```!getpaykey <nombre#123>   #devuelve la direccion de cartera de un usuario registrado```", reg: "```!reg <id>  #visualizar un registro escribiendo su id que deja al hacer el !pay```", del: "```!del <id>  #borra un registro con su id que deja al hacer !pay```", borrame: "```!borrame   #borra todos tus fondos```", ccinfo: "```!ccinfo   #informacion y contacto```", help: "```!helpcc    #ayuda general de ccMegalo el cc es para que no salten los otros bots```", comandos: "```!comandos  #muestra informacion sobre comandos y parametros```"};
     return new Discord.MessageEmbed()
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
        .addField('Icono', commandos.icono)
        .addField('Base64', commandos.base64)
        .addField('Unbase64', commandos.unbase64)
        .addField('Borrame', commandos.borrame)
        .addField('Ccinfo', commandos.ccinfo)
        .addField('Helpcc', commandos.help)
        .addField('Comandos', commandos.comandos)
        .addField('Invita', '!invita  #genera el codigo de invitacion del bot')
       .setFooter('ccmegalo y nonswave_dev', logo);
}


function ayuda() {
    var help = { p1: "```ccMegalo acepeta sugerencias para añadir al bot```", p2: "```cada usuario al abrir su cuenta con !start contara con 1024 CC disponibles```", p3: "```con !pay se realizan transacciones y no importa el servidor, es la misma base de datos```", p4: "```usa !comandos para ver la lista de comandos```"};
    return new Discord.MessageEmbed()
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
}

function slap(autor, target) {
    return  new Discord.MessageEmbed()
     .setColor('#0000ff')
     .setTitle(autor + " ha dado una cachetada a " + target)
     .setImage(slaps[Math.floor(Math.random()* slaps.length)]);
}
function gif() {
    return new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setTitle("gif")
    .setImage(gifs[Math.floor(Math.random()* gifs.length)]);  
}

function status() {
    return new Discord.MessageEmbed()
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
}
function bait(autor) {
    return new Discord.MessageEmbed()
    .setColor('#0000ff ')
    .setTitle(`${autor} ha dicho es bait!`)
    .addField('contexto', `el usuario ${autor} ha confirmado que lo anterior dicho era bait, asi que queda exonerado totalmente de las acusaciones o situaciones correspondientes`)
    .setImage('https://i.imgur.com/hEaHv6M.jpg');
}

function mcinfo(skin,nombre, id, time,skinurl,base64,bodyType, autor) {
    return new Discord.MessageEmbed()
              .setColor('#0000ff')
              .setTitle('Minecraft Info')
              .setThumbnail(skin)
              .addField('nombre', '```'+nombre+'```')
              .addField('uid','```'+id+'```')
              .addField('timestamp','```'+time+'```')
              .addField('skin url', '```'+skinurl+'```')
              .addField('base64 perfil', '```'+base64+'```')
              .addField('tipo cuerpo', '```'+bodyType+'```')
              .setAuthor(autor)
              .setDescription('informacion del perfil en minecraft')
              .setFooter('minecraft.js by nonswave');
}
function icono(avatar, id, tag) {
    return  new Discord.MessageEmbed()
    .setTitle(`icono de perfil de ${tag}`)
    .setImage(`https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=256`)
    .setFooter('ccMegalo by nonswave');
}
function nombres(autor, avatar, res){
    return new Discord.MessageEmbed()
    .setColor('#0000ff')
    .setAuthor(autor)
    .setDescription('registro de nombres y su timestamp')
    .setThumbnail(avatar)
    .addField('json', res.replace('undefined','nombres: '));
}
exports.icono = icono;
exports.nombres=nombres;
exports.normal = normal;
exports.registrado = registrado;
exports.cuenta = cuenta;
exports.normalFooter = normalFooter;
exports.texto = texto;
exports.pay = pay;
exports.registros = registros;
exports.erase = erase;
exports.getuno = getuno;
exports.invita = invita;
exports.comandos = comandos;
exports.ayuda = ayuda;
exports.slap = slap;
exports.gif = gif;
exports.status = status;
exports.bait = bait;
exports.normalImg =normalImg;
exports.mcinfo = mcinfo;