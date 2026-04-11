const mysql = require('mysql2/promise');
require('dotenv').config();

async function test() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    // Verificar si tabla users existe
    const [tables] = await pool.query("SHOW TABLES LIKE 'users'");
    if (tables.length === 0) {
      console.log('❌ Tabla users NO existe');
    } else {
      console.log('✅ Tabla users existe');
    }

    // Verificar estructura de users
    const [columns] = await pool.query("DESCRIBE users");
    console.log('Columnas de users:', columns.map(c => c.Field));

    await pool.end();
  } catch (error) {
    console.error('Error BD:', error.message);
  }
}
test();