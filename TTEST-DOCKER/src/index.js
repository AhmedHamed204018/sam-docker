const express = require('express');
// const { connection, connections } = require('mongoose');
// const mongoose = require('mongoose');
const { Client } = require('pg');
const redis = require('redis');


// init app
const PORT = process.env.PORT || 3000;
const app = express();
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

// connect redis
const redisclient = redis.createClient({

    url: `redis://${REDIS_HOST}:${REDIS_PORT}`

});
redisclient.on('error', (err) => console.error('Error connecting to redis:', err));
redisclient.on('connect', () => console.log('connected to redis successfully....'));
redisclient.connect();
// connect db mongo
// const DB_USERNAME = 'root';
// const DB_PASS = 'example';
// const DB_PORT = 27017;
// const DB_HOST = 'mongo';

// const URI = `mongodb://${DB_USERNAME}:${DB_PASS}@${DB_HOST}:${DB_PORT}`;
// mongoose.connect(URI).then(() => console.log('Connected to MongoDB successfully!'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

// connect db postgres

const DB_USERNAME = 'root';  // اسم المستخدم
const DB_PASS = 'example';   // كلمة المرور
const DB_PORT = 5432;        // البورت
const DB_HOST = 'postgres';  // المضيف (قد يكون localhost أو اسم الخدمة)
const DB_NAME = 'mydb';      // اسم قاعدة البيانات

const URI = `postgresql://${DB_USERNAME}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// تهيئة العميل باستخدام URI
const client = new Client({
  connectionString: URI, // استخدم connectionString هنا
});

// محاولة الاتصال
client
  .connect()
  .then(() => console.log('Connected to PostgreSQL successfully!'))
  .catch((err) => console.error('Error connecting to PostgreSQL:', err));
  
app.get('/', (req, res)=> {
    redisclient.set('products', 'product...');
    res.send('<h1>hello ahmed its produc new version with dev mode l :DDDD</h1>');
});


app.get('/data', async (req, res)=> {
    const products = await redisclient.get('products');
    res.send(`<h1>hello ahmed its me</h1> <h2>${products}</h2>`);
});

app.listen(PORT ,()=> console.log(`Server is running on port ${PORT}`));