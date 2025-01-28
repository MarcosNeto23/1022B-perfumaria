import mysql, { Connection } from 'mysql2/promise';

class BancoMysql {
    // Propriedade
    private conexao: Promise<Connection>;

    // Métodos
    constructor() {
        this.conexao = mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022b",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        });
    }

    async getConnection() {
        const conn = await this.conexao; 
        return conn;
    }

    async end() {
        const conn = await this.conexao; 
        await conn.end();
    }

    async listar(){
        const conn = await this.getConnection()
        const [result, fields] = await conn.query("SELECT * from produtos");
        return result
    }
    async inserir(produto:{id:string,nome:string,descricao:string,preco:string,imagem:string}){
        const conn = await this.getConnection()
        const sqlQuery = "INSERT INTO produtos (id,nome,descricao,preco,imagem) VALUES (?,?,?,?,?)"
        const parametro = [produto.id,produto.nome,produto.descricao,produto.preco,produto.imagem]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async excluir(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "DELETE FROM produtos WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async alterar(id:string,produto:{id?:string,nome:string,descricao:string,preco:string,imagem:string}){
        const conn = await this.getConnection()
        const sqlQuery = "UPDATE produtos SET nome=?,descricao=?,preco=?,imagem=? WHERE id = ?"
        const parametro = [produto.nome,produto.descricao,produto.preco,produto.imagem,id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }




    //Parte dos Clientes
    async listarClientes(){
        const conn = await this.getConnection()
        const [result, fields] = await conn.query("SELECT * from clientes");
        return result
    }
    async inserirClientes(cliente:{id:number,nome:string,sobrenome:string,idade:string,email:string}){
        const conn = await this.getConnection()
        const sqlQuery = "INSERT INTO clientes (id,nome,sobrenome,idade,email) VALUES (?,?,?,?,?)"
        const parametro = [cliente.id,cliente.nome,cliente.sobrenome,cliente.idade,cliente.email]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async excluirClientes(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "DELETE FROM clientes WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async alterarClientes(id:string,cliente:{id?:string,nome:string,sobrenome:string,idade:string,email:string}){
        const conn = await this.getConnection()
        const sqlQuery = "UPDATE clientes SET nome=?,sobrenome=?,idade=?,email=? WHERE id = ?"
        const parametro = [cliente.nome,cliente.sobrenome,cliente.idade,cliente.email,id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
}

export default BancoMysql;