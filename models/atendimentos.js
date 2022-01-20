const moment = require('moment')
const connection = require('../sql/connection')

class Atendimento {

    add(atendimento, res){
        const createDate = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const ifDateIsValid = moment(data).isSameOrAfter(createDate)
        const clientIsValid = atendimento.cliente.length >= 3 
        
        const validate = [
            {
                nome: 'data',
                valido: ifDateIsValid,
                mensagem: 'A data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clientIsValid,
                mensagem: 'O nome do cliente deve ter pelo menos três caracteres'
            }
        ]

        const error = validate.filter(e => !e.valido)

        const qtdErros = error.length

        if(qtdErros){
            res.status(400).json(error)
        } else {
            const atendimentoDatado = {...atendimento, createDate, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
            connection.query(sql, atendimentoDatado,(error, result) => {
                if(error){
                    res.status(400).json(error)
                } else {
                    res.status(201).json(result)
                }
        })
        } 
    }

    list(res){
        const sql = 'SELECT * FROM Atendimentos'

        connection.query(sql, (error, result) => {
            if(error){
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
    }

    searchById(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        
        connection.query(sql, (error, result) => {
            const atendimento = result[0]
            if(error){
                res.status(400).json(error)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    alter(id, values, res){
        
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

            const sql = `UPDATE Atendimentos SET ? WHERE id=?`

        connection.query(sql, [values, id], (error, result) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(result)
            }
        })
        }
    

    delete(id, res){
        const sql = `DELETE FROM Atendimentos WHERE id=?`

        connection.query(sql, id, (error, result) => {
            if(error){
                res.send(error)
            } else {
                res.send(`Id: ${id} deletado com sucesso!`)
            }
        })
    }
}
module.exports = new Atendimento