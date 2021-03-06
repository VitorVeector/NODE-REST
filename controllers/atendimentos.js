const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => Atendimento.list(res))

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.searchById(id, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const values = req.body
        Atendimento.alter(id, values, res)
    })

    app.post('/atendimentos', (req, res) => {
            const atendimento = req.body 
            Atendimento.add(atendimento, res)
        }
    )

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.delete(id, res)
    })
}
