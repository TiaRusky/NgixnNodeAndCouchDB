const express = require('express');
const request = require('request');
const PORT = 3000;
const app = express();

const admin = "mattia";
const password = "password";

//http://admin:password@couchdb:5984/mydb

app.get("/",(req,res)=>{

    var url = "http://"+admin+":"+password+"@couchdb:5984/info/visite"; //richiesta per il documento visite nel db info
    request(url,(error,response,body)=>{
        if(error)console.log("Errore nella request del documento visite: "+error);
        else{
            const nodo = process.env.ISTANCE;
            var info = JSON.parse(body);
            res.end("Ciao, sono il nodo "+nodo.toString()+"; le visite sono: "+info.count);
            const rev = info._rev;
            var count = info.cont +1;
            console.log(rev+":"+count);
        }
    });
});

app.listen(PORT,()=>{
    console.log("Applicazione in ascolto sulla porta "+PORT);
});