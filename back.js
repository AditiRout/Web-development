var http=require("http");
var gh=require("./tutorial")
console.log(gh);
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write("Hi there");
    response.end();
    
}).listen(8080);
console.log("runnning on server");

