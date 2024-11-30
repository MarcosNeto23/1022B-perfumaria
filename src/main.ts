console.log(" Olá Mundo")

//
/*1 - Para construir um servidor back-end e responder 
Vamos utilizar o EXPRESS */
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
//Criar o Objeto do tipo express 
const app = express ()

//incluir para ele receber json
app.use(express.json())//Middleware

/*incluir o CORS -> Quando a Gente tem outra porta fazendo */
app.use(cors())




//Parte do Felipe:

app.get("/perfumes", async(req,res)=>{
    
   // ok PASSO 1: Criar um banco de dados 

   // PASSO 2: Usar a lib mysql2 para conectar o banco
   try{
    const conexao = await mysql.createConnection({
        /*OPERADOR TERNÁRIO*/
        host: process.env.dbhost?process.env.dbhost: "localhost",
        user: process.env.dbuser?process.env.dbuser: "root",
        password: process.env.dbpassword?process.env.dbpassword: "",
        database: process.env.dbname?process.env.dbname: "banco1022b",
        port: process.env.dbport?parseInt(process.env.dbport): 3306
    })
     // PASSO 3: QUERY -> SELECT * FROM perfumes
   const [result,filds] = await conexao.query("SELECT * from perfumes")
   
   await conexao.end()

    res.send(result)
}catch(e){
    res.status(500).send(e)
}
  

   // PASSO 4: Colocar os dados do banco no response
 

   
   
})


// Parte do Mateus - Listagem dos clientes e Inserindo eles:
//Listando os clientes:
app.get("/clientes", async (req, res) => {
    try {
        const conexao = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022b",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        });

        // Query para selecionar usuários
        const [result, fields] = await conexao.query("SELECT * FROM clientes");
        
        await conexao.end();
        res.send(result);
    } catch (e) {
        res.status(500).send("Erro do servidor");
    }
});


//Inserindo clientes:
// Parte para inserir um cliente no Back-end:
app.post("/clientes", async (req, res) => {
    try {
        const conexao = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022b",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        });

        const { id, nome, sobrenome, idade, email } = req.body;

        const [result, fields] = await conexao.query("INSERT INTO clientes (id, nome, sobrenome, idade, email ) VALUES (?, ?, ?, ?, ?)", [id, nome, sobrenome, idade, email ]);

        await conexao.end();

        res.send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro do servidor");
    }
});





/*-----------------------------------------------------------*/




// Parte do Marcos Antonio:
// Inserindo um perfume no Back-end:


app.post("/perfumes", async(req,res)=>{
    
    // ok PASSO 1: Criar um banco de dados 
 
    // PASSO 2: Usar a lib mysql2 para conectar o banco
    try{
     const conexao = await mysql.createConnection({
         /*OPERADOR TERNÁRIO*/
         host: process.env.dbhost?process.env.dbhost: "localhost",
         user: process.env.dbuser?process.env.dbuser: "root",
         password: process.env.dbpassword?process.env.dbpassword: "",
         database: process.env.dbname?process.env.dbname: "banco1022b",
         port: process.env.dbport?parseInt(process.env.dbport): 3306
     })
      // PASSO 3: QUERY -> SELECT * FROM perfumes
      const {id,nome,marca,fragancia,volume,preco,imagem} = req.body 
    const [result,filds] = await conexao.query("INSERT INTO perfumes VALUES (?,?,?,?,?,?,?)", [id,nome,marca,fragancia,volume,preco,imagem])
    
    await conexao.end()
 
     res.send(result)
 }catch(e){
    console.log(e)
     res.status(500).send("Erro do servidor")
 }
   
 
    // PASSO 4: Colocar os dados do banco no response
 
     
    
 })








//INICIAR o Servidor 
app.listen(8000,()=>{
    console.log("SERVIDOR INICIADO NA PORTA 8000")
})