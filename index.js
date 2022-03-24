const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express();
app.use(express.json());
const costumers = [];

app.post('/account', (req,res)=>{
    const { cpf, name } = req.body;
    const id = uuidv4();
    const userExistent = costumers.some((costumer)=>costumer.cpf ===cpf);
    if(userExistent){
        return res.status(400).json({error:"User already exists!"})
    } 
    costumers.push({
        cpf,
        name,
        id,
        statement: []
    })
    return res.status(201).send();
})

app.get('/statement', (req,res) =>{
    const { cpf } = req.headers;
    const costumer = costumers.find((costumer)=> costumer.cpf === cpf);
    if(!costumer){
        return res.status(400).json({error:"User don't found!"});
    }
    return res.json(costumer.statement);
})

app.listen(3000, () => console.log("server online"))