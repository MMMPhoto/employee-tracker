import express from 'express';
import mysql from 'mysql2';
// import database from '../server.js';

// Get list of Departments in database
export default function getDepartments() {
    return new Promise((resolve, reject) => {
        database.query('SELECT name FROM department', (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
};
