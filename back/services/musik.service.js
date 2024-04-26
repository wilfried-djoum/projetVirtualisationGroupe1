const db = require('../services/db.service')
const helper = require('../helper')
const config = require('../config')
const multer = require('multer');
const path = require('path');


//fonction recuperer toutes les chansons
async function getUser(numero) {
    const rows = await db.query(
        `SELECT * FROM user WHERE numero=${numero}`
    );
    const data = helper.emptyOrRows(rows)

    return {
        data
    }
}

//fonction de register un user
async function register(user) {
    const rows = await db.query(
        `INSERT INTO user ( nom, prenom, numero, dateNaiss, email, codeAuth, confirmCodeAuth, photo, cv) VALUE ( '${user.nom}', '${user.prenom}', '${user.numero}' ,'${user.dateNaiss}', '${user.email}', '${user.codeAuth}', '${user.confirmCodeAuth}', '${user.photo}', '${user.cv}')`
    )
    return {
        rows
    }
}


async function resetPassword(numero, codeAuth) {
    const rows = await db.query(
        `UPDATE user SET codeAuth = '${codeAuth}', confirmCodeAuth = '${codeAuth}' WHERE numero = ${numero};`
    )
    // const data = helper.emptyOrRows(rows)

    return {
        rows
    }
}


async function login(numero, codeAuth) {
    const rows = await db.query(
        `SELECT * FROM user WHERE numero= ${numero} AND codeAuth = ${codeAuth}`
    )
    return {
        rows
    }
}
module.exports = {
    getUser,
    login,
    register,
    // deleteSong,
    resetPassword
}