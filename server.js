import express, { request, response } from "express";
import { PrismaClient } from '@prisma/client';
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();


const prisma = new PrismaClient();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function getVersion(){
    prisma.$connect
}

app.post('/usuarios', async (request, response) => {
    try{
        await prisma.$connect();
        await prisma.user.create({
            data: {
                name: request.body.name,
                age: request.body.age,
                email: request.body.email
            }
        });
        response.status(201).send(request.body)
    }
    catch(error){
        response.status(500).json({error: error})
    }
});

app.get('/usuarios', async (request, response) => {
    try {
        await prisma.$connect();
        let users;

        if (request.query) {
            users = await prisma.user.findMany({
                where: {
                    name: request.query.name,
                    age: request.query.age,
                    email: request.query.email,
                }
            });
        } else {
            users = await prisma.user.findMany();
        }
        response.status(200).json({ users: users });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
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

app.listen(3000, () => {
    getVersion()
    console.log('Servidor rodando!')
});

/*
    1- Tipos de Rota / Método HTTP
    2- Endereço / URL

    Objetivo: Criar nossa API de Usuários

    -Criar um usuário;
    -Listar todos os usuários;
    -Editar um usuário;
    -Deletar um usuário;
*/