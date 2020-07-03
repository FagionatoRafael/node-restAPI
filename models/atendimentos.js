const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;
        
        const validacao = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou iqual a data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos 5 caracteres.'
            }
        ];

        const erros = validacao.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros) {
            res.status(400).json(erros);
        
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};

            const sql = 'INSERT INTO atendimentos set ?';

            conexao.query(sql, atendimentoDatado, (error, resultados) => {
                if(error) {
                    res.status(400).json(error);
                } else {
                    res.status(200).json(atendimentoDatado);
                }
            });
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM atendimentos';

        conexao.query(sql, (error, resultados) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;

        conexao.query(sql, (error, resultados) => {
            const atendimento = resultados[0];

            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id = ?';

        conexao.query(sql, [valores, id], (error, resultados) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    deleta(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?';

        conexao.query(sql, id, (error, resultados) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

}

module.exports = new Atendimento;