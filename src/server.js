const pool = require('./db');

async function testarConexao() {
    try {
        const resultado = await pool.query(
            'SELECT * FROM equipamentos ORDER BY id'
        );

        console.log('Conexão realizada com sucesso!');
        console.table(resultado.rows);
    } catch (erro) {
        console.error('Erro ao consultar o banco:', erro.message);
    } finally {
        await pool.end();
    }
}

testarConexao();