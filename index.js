const mysql = require('mysql');
require('dotenv').config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dataBase = process.env.DB_DATABASE;

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: dataBase
});

//Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }

  console.log('Conexão bem-sucedida ao banco de dados');

  // Consulta SQL para atualizar o campo e remover o caractere "?"
  const updateQuery = `UPDATE import_upload SET imu_content = CONCAT(SUBSTRING(imu_content, 1, INSTR(imu_content, '?') - 1), SUBSTRING(imu_content, INSTR(imu_content, '?') + 1)) WHERE imu_id = ?`;

  // Executar a consulta
  connection.query(updateQuery, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return;
    }

    console.log('Campo atualizado com sucesso');

    // Fechar a conexão com o banco de dados
    connection.end((err) => {
      if (err) {
        console.error('Erro ao fechar a conexão com o banco de dados:', err);
        return;
      }

      console.log('Conexão fechada');
    });
  });
});


