/**
* budgetDatabase.js
*
* @author Edwin Cotto <cottosoftwaredevelopment@gmail.com>
* @copyright Edwin Cotto, All rights reserved.
*
* @version 2024-May-14 initial version
*/

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

class LoginDatabase {
    constructor() {
        const connectionConfig = {
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.DB_PORT
        };
        this.connection = mysql.createConnection(connectionConfig);
        this.connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to login database!');
        });
    }

    async getUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";
                this.connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    async logIntoSystem(username, password) {
        console.log('Attempting login for user:', username)
	    try {
            const user = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM users WHERE userName = ?';
                this.connection.query(query, [username], (err, results) => {
                    if (err) {
                        console.error('Error in login query:', err);
                        return reject(new Error('Error in login'));
                    }
                    if (results.length === 0) {
                        return reject(new Error('User not found'));
                    }
                    resolve(results[0]);
                });
            });
    
            // Compare passwords (assuming passwords are stored in plaintext, not recommended)
            if (password === user.password) {
                return { message: 'Login successful'}; // Return user data along with the success message
            } else {
                throw new Error('Invalid password');
            }
        } catch (err) {
            console.error('Login error:', err);
            throw err; // Re-throw the error to handle it in the caller
        }
    }

	// Configure session middleware to store session data in MySQL
	const sessionStore = new MySQLStore({
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions'
    },
    expiration: 86400000, // Session expires after 24 hours (in milliseconds)
    clearExpired: true // Automatically clear expired sessions
	}, this.connection);


}
module.exports = new LoginDatabase();
