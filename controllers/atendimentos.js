module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Bem vindo ao portal de atendimento'))

    app.post('/atendimentos', (req, res) => {
            console.log(req.body) 
            res.send('Bem vindo ao portal de atendimento e voce esta fazendo um  POST')
        }
    )
}