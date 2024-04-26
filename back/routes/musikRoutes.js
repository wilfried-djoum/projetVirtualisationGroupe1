const express = require('express')
let router = express.Router()

const musikServ = require('../services/musik.service')
const multer = require('multer');
const path = require('path');
let photo
let cv

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ressources');
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/infosUser/:numero', async function (req, res, next) {
  try {
    res.json(await musikServ.getUser(req.params.numero))
  } catch (err) {
    console.error(`Error while getting user`, err.message);
    next(err)
  }
})

router.post('/login/:numero/:codeAuth', async (req, res, next) => {

  try {
    // const { numero, password } = req.body;
    // const elementLogin = {
    //   numero,
    //   password
    // }
    // console.log(elementLogin);
    res.json(await musikServ.login(req.params.numero, req.params.codeAuth))
    res.status(201).json(elementLogin)
  } catch (err) {
    console.log('Erreur de connexion a ce compte', err.message);
    next(err)
  }
})

router.post('/registrer', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), async (req, res, next) => {
  try {
    const { nom, prenom, numero, dateNaiss, email, codeAuth, confirmCodeAuth } = req.body;
    if (req.files['photo']) {
      photo = req.files['photo'][0].originalname;
    } else {
      photo = ""
    }
    if (req.files['cv']) {
      cv = req.files['cv'][0].originalname;
    } else {
      cv = ""
    }

    const resultatEnregistrement = {
      nom,
      prenom,
      numero,
      dateNaiss,
      email,
      codeAuth,
      confirmCodeAuth,
      photo,
      cv
    }
    res.json(await musikServ.register(resultatEnregistrement))
    res.status(201).json(resultatEnregistrement)
  } catch (error) {
    next(error)
  }
})

router.put('/reset/:numero/:codeAuth', async function (req, res, next) {
  try {
    // const { password } = req.body;
    // const resetPasswordUser = 
    //   {password}

    console.log("Modification du mot de passe")
    console.log(req.params.codeAuth, req.params.numero)
    res.json(await musikServ.resetPassword(req.params.numero, req.params.codeAuth))
  } catch (err) {
    console.error(`Error while updating user password`, err.message);
    next(err)
  }
})

module.exports = router