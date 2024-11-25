
USE defaultdb;
CREATE TABLE IF NOT EXISTS perfumes(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    marca VARCHAR(40),
    fragrancia VARCHAR(50),
    volume VARCHAR(40),
    preco DECIMAL(10,2),
    imagem VARCHAR(300)
);

INSERT INTO perfumes VALUES (100,'Malbec Ultra Bleu','oBoticário','Amadeirado', '100 ml', 209.90,'https://fraguru.com/mdimg/perfume/375x500.75487.jpg');



/*USE defaultdb;
CREATE TABLE IF NOT EXISTS produtos(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    descricao VARCHAR(50),
    preco DECIMAL(10,2),
    imagem VARCHAR(300)
);
INSERT INTO produtos VALUES (1,'Iphone','Celular RUIM',5000.50,'SEM IMAGEM');


USE defaultdb;
CREATE TABLE IF NOT EXISTS usuarios(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    email VARCHAR(100),
    created_at timestamp(4),
    updated_at timestamp(4)
);

INSERT INTO `defaultdb`.`usuarios` (`id`, `nome`, `email`, `created_at`, `updated_at`) VALUES ('1', 'Mateus', 'mateus@gmail.com', '2024-10-21 07:40', '2024-11-22 07:41');

INSERT INTO `defaultdb`.`usuarios` (`id`, `nome`, `email`, `created_at`, `updated_at`) VALUES ('2', 'Felipe Brito', 'felipe@gmail.com', '2024-10-22 07:45', '2024-10-24 07:31');

INSERT INTO `defaultdb`.`usuarios` (`id`, `nome`, `email`, `created_at`, `updated_at`) VALUES ('3', 'Marcos Neto', 'Marcos.neto@gmail.com', '2024-10-23 10:50', '2024-12-25 14:20');
*/