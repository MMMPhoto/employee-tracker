// Import Modules and files
import express from 'express';
import mysql from 'mysql2';

const PORT = process.env.PORT || 3001;
const app = express();

// Set express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'my$qlPennyroyal13'    
}, console.log('Connected to company database.')
);

// Set listening on PORT
app.listen(PORT, () => 
    console.log(`App listening on ${PORT}`)
);
