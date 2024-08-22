import express, { request, response } from "express";
import { PrismaClient } from '@prisma/client'
import e from "express";

const prisma = new PrismaClient()
const app = express();
app.use(express.json())


app.post('/usuarios', async (request, response) => {

    await prisma.user.create({
        data: {
            name: request.body.name,
            age: request.body.age,
            email: request.body.email
        }
    });

    response.status(201).json(request.body)
});

app.get('/usuarios', async (request, response) => {
    
    let users1 =  [];

    if (request.query) {
        users1 = await prisma.user.findMany({
            where: {
                name: request.query.name,
                age: request.query.age,
                email: request.query.email,
            }
        })
    } else {

    }

    console.log(request)

    const users = await prisma.user.findMany()
    response.status(200).json(users)
});

app.put('/usuarios/:id', async (request, response) => {

    await prisma.user.update({
        where: {
            id: request.params.id,
        },
        data: {
            name: request.body.name,
            age: request.body.age,
            email: request.body.email
        }
    });

    response.status(201).json(request.body)
});

app.delete(('/usuarios/:id'), async (request, response) => {

    await prisma.user.delete({
        where: {
            id: request.params.id
        }
    })

    response.status(200).json({ message: "Usuário deletado com sucesso!" })
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