const http = require('http');
const url = require('url');
const fs = require('fs');

const servidor = http.createServer((pedido, respuesta)=>{ 
  const objetourl = url.parse(pedido.url);
  let camino = 'public'+objetourl.pathname;
  if(camino=='public/'){
    camino = 'public/index.html'
   }
});

fs.stat((camino, error)=>{
  if(!error){
    fs.readFile(camino, (error, contenido)=>{
       if(error){
         respuesta.writeHead(500, {'Content-Type':'text/plain'});
         respuesta.write('Error interno. No puedes continuar');
         respuesta.end();
       }
      else{
         respuesta.writeHead(200, {'Content-Type':'text/html'});
         respuesta.write(contenido);
         respuesta.end();
       }
   });
  }
  else{
    respuesta.writeHead(404, {'Content-Type':'text/html'});
    respuesta.write('<!doctype html><html><head></head><body> Recurso Inexistente</body></html>');
    respuesta.end();
  }
});

servidor.listen(3000);
console.log('Servidor web iniciado');
