class Tabelas {
    init(conexao) {
        this.conexao = conexao;
    
        this.criaAtendimento();
    }

    criaAtendimento() {
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                    cliente VARCHAR(50) NOT NULL,
                    pet VARCHAR(20),
                    servicos VARCHAR(20) NOT NULL,
                    status VARCHAR(20) NOT NULL,
                    observacoes TEXT,
                    data datetime NOT NULL,
                    dataCriacao datetime NOT NULL)`;

        this.conexao.query(sql, error => {
            if(error) {
                console.log(error);
            }
        });
    }
}

module.exports = new Tabelas;