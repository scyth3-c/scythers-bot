const axios = require('axios');
const fs = require('fs');
const state = {
    time: {
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds()
    } ,
    seed: Math.floor(Math.random()*(12323-102)) + 10,
    standar: "c++17",
    optimizar: "1",
    API: "https://radiant-dusk-88409.herokuapp.com/"
};
const compile = (code)=> new Promise(async (resolve,reject)=>{
    console.log("iniciando...");
    const res = await axios.post(`${state.API}addon/compile`, code , {
        headers: {
          "Content-Type": "text/plain",
          title: `temp_file_${state.seed}_${(state.time.hour,
          state.time.min,
          state.time.sec)}`,
          standar: state.standar,
          o: state.optimizar,
        },
      });
      let output = res.data.toString();
      if(output.length >= 256) {
        resolve("salida extensa (error o no) para mostrar, revise y vuelva a compilar")
      }  
      else if(output == "" || output ==  " ") { resolve("hecho, no output") }
      else {
      resolve(output);
      }

});
const assembly = (code, message) => new Promise(async (resolve,reject)=>{
  const res = await axios.post(`${state.API}addon/assembly`, code , {
    headers: {
      "Content-Type": "text/plain",
      title: `temp_file_${state.seed}_${(state.time.hour,
      state.time.min,
      state.time.sec)}`,
      standar: state.standar,
      o: state.optimizar,
    },
  });
   const title = `./temp/${state.time.sec}${state.time.min}file.asm`;
    let stream = fs.createWriteStream(title, { encoding: "utf-8" });
    stream.write(res.data);
    stream.end();
    stream.addListener("close", async () => {
        try {
          await message.channel.send({
            files: [title]
          });
        resolve(title);
      } catch (error) {
        resolve(false);
      }
    });
}); 
exports.assembly = assembly;
exports.compile = compile;
