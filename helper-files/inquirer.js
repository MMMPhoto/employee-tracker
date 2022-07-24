// Import core modules
import fs from 'fs';
import inquirer from 'inquirer';
import express from 'express';
import mysql from 'mysql2';

// Import Questions
import questions from './questions.js';

// CLI input
export default function userInput(questions) {
    return inquirer.prompt(questions);
};
