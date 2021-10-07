
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
   
  



  function erry(args){console.log(args)};  
  
  module.exports = {RandKey, TransferReference, erry};