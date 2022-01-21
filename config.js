const os = require('os');
const Servertime = new Date();
const serverData = {
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
const gifs = ["https://i.imgur.com/MsfUw8Z.gif", "https://i.imgur.com/Qi6wCf4.gif", "https://i.imgur.com/EtNjSRH.gif", "https://i.imgur.com/EBI8FEO.gif", "https://i.imgur.com/9sV7tPU.gif", "https://i.imgur.com/YfPcwX7.gif","https://i.imgur.com/6gQfXEx.gif", "https://i.imgur.com/BuLdL1M.gif", "https://i.imgur.com/YkPGLfL.gif", "https://i.imgur.com/5oerEfR.gif", "https://i.imgur.com/N3LreOW.gifv", "https://i.imgur.com/6Rp12Vf.gifv" ];
const slaps = ["https://i.imgur.com/N8DPIBM.gif", "https://i.imgur.com/46c0wyE.gif", "https://i.imgur.com/pTsTrez.gif", "https://i.imgur.com/1jL899y.gif", "https://i.imgur.com/mXDvcqX.gif", "https://i.imgur.com/kYYhjqc.gif", "https://i.imgur.com/o6nA77F.gif", "https://i.imgur.com/r3htcd9.gif"];

const coin = "https://imgur.com/IR79jXT.png";
const logo = "https://i.imgur.com/lEtx2Cl.png"; 

module.exports = {serverData, gifs, slaps, coin, logo};
