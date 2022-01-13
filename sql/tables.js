class Tables {
    init(connection){
        this.connection = connection
        this.criarAtendimentos()
    }
    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(30), serviço varchar(30) NOT NULL, status varchar(20) NOT NULL, observações TEXT, PRIMARY KEY(id))'

        this.connection.query(sql, error => {
            if(error){
                console.log(error)
            } else {
                console.log('tabela criada com sucesso')
            }
        })
    }
}

module.exports = new Tables