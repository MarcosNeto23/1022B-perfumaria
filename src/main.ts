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



import BancoMysql from './db/bancoMysql'




//Parte do Felipe e do Marcos:

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
















 /// Parte de Configuração dos Clientes feito por Mateus do Prado:
 
// Parte do Mateus - Listagem dos clientes e Inserindo eles:
//Listando os clientes:
app.get("/clientes", async (req, res) => {
    try{
        const banco = new BancoMysql();
        const result = await banco.listarClientes()
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})




//Inserindo clientes:
// Parte para inserir um cliente no Back-end:
app.post("/clientes", async (req, res) => {
   
   
    try{
        const {id,nome,sobrenome,idade,email} = req.body
        
        const banco = new BancoMysql();
        
        const cliente = {id:parseInt(id),nome,sobrenome,idade,email}
        const result = await banco.inserirClientes(cliente)
        console.log(result)
        
        await banco.end()
        
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
   
   

});

app.delete("/clientes/:id",async (req,res) =>{
    try{
        const banco = new BancoMysql();

        const sqlQuery = "DELETE FROM clientes WHERE id = ?"
        const parametro = [req.params.id]

        const result = await banco.excluirClientes(req.params.id)
        

        res.status(200).send(result)
    }catch(e){
          console.log(e)
        res.status(500).send("Erro do servidor")
    }  

    console.log("Tentando excluir o cliente de id:", req.params.id)
    
})


app.put("/clientes/:id", async (req,res) =>{
    try{
        const {nome,sobrenome,idade,email} = req.body
        const banco = new BancoMysql();

        //const sqlQuery = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem = ? WHERE id = ?"
        const cliente = {nome, sobrenome, idade, email}

        const result = await banco.alterarClientes(req.params.id, cliente)
        res.status(200).send(result)


    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
    console.log("Tentando alterar o cliente de id:",  req.params.id)
   
})







//INICIAR o Servidor 
app.listen(8000,()=>{
    console.log("SERVIDOR INICIADO NA PORTA 8000")
})