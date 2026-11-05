DROP DATABASE IF EXISTS db_retro_games
CREATE DATABASE IF NOT EXISTS db_retro_games
USE db_retro_games

CREATE TABLE IF NOT EXISTS jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    criador VARCHAR(100) NOT NULL,
    imagem_url TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO discos (nome, criador, genero, imagem_url, preco) VALUES
('Pacman', 'Toru Iwatani / Namco', 'Labirinto', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3tZ9B5_vnNd1OieuGoGRjK4s-eWRHjCJrOpF3AOsgXcqNpupwDXsKTxuz&s=10', 15.50),
('Street Fighter II', 'Capcom', 'Luta', 'https://br.web.img3.acsta.net/c_310_420/pictures/23/06/12/20/49/0661420.png', 56.70),
('Tetris', ' Alexey Pajitnov', 'quebra-cabeça', 'https://www.datocms-assets.com/145957/1744284280-tetris-mobile.png?auto=format&fit=max&w=1200', 10.00);