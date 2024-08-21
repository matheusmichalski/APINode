import express from "express";

const app = express();

app.get('/usuarios', (request, response) => {
    response.send(
        "Ok, deu certo!"
    )
});

app.listen(3000)


/*
    1- Tipos de Rota / Método HTTP
    2- Endereço / URL

    Objetivo: Criar nossa API de Usuários

    -Criar um usuário;
    -Listar todos os usuários;
    -Editar um usuário;
    -Deletar um usuário;
*/