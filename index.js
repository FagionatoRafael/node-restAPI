const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('conectouuuu')
        
        Tabelas.init(conexao);

        const app = customExpress();

        app.listen(8080, () => {
            console.log('Servidor rodando no serivdor: localhost:8080');
        });
    }
});