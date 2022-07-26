import mysql from 'mysql2';
import database from '../config/connection.js';

// MySQL query function
export default function databaseQuery(sql) {
    return new Promise((resolve, reject) => {
        database.query(sql, (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
};