const customExpress = require('./config/customExpress')
const connection = require('./sql/connection')
const Tables = require('./sql/tables')

// respond with "Ola mundo" when a GET request is made to the homepage

connection.connect(error => {
    if(error){
        console.log(error)
    } else {
        console.log('Conectado com sucesso')
        Tables.init(connection)
        const app = customExpress()
        app.listen(3000, () => console.log(`Servidor rodando na porta: 3000`))
    }
})

