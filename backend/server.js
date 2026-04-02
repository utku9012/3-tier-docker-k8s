const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Tabloyu otomatik oluştur (İlk çalıştırmada)
pool.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, task TEXT)');

// Görevleri Getir
app.get('/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  res.json(result.rows);
});

// Görev Ekle
app.post('/todos', async (req, res) => {
  const { task } = req.body;
  await pool.query('INSERT INTO todos (task) VALUES ($1)', [task]);
  res.send('Başarıyla eklendi');
});

app.listen(3000, () => console.log('Backend 3000 portunda hazır!'));