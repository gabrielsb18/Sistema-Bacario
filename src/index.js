const express = require("express");
//instalamos uma nova biblioteca chamada UUID
const {v4: uuidv4} = require("uuid");

const app = express();
app.use(express.json());

const customers =[];

//FUNÇÃO RESPONSÁVEL POR CRIAR CONTA
app.post("/account", (request, response) => {
    const {cpf, name} = request.body;

    // Irá verificar se minha variavel é igual e se o valor é igual a um cpf ja existente

    const customerAlreadyExists =
        customers.some((customer) => customer.cpf === cpf );

    // Se já existir um cpf ele vai retornar um erro e não vai permitir a adição de uma nova conta
    //Se não exisitir ele irá permitir

    if(customerAlreadyExists) {
        return response.status(400).json({error: "Customer already exists! "});
    }

    //Definimos as informações que nossa conta terá atráves do customers

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return response.status(201).send();
});

//FUNÇÃO RESPONSÁVEL POR TIRAR EXTRATO
app.get("/statement/:cpf",(request, response)=> {
    const {cpf} = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    // Verifica se o customer existe
    if(!customer) {
        return response.status(400).json({error: "Customer not found"});
    }

    return response.json(customer.statement);
});

app.listen(3333);