const { User } = require("../models");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");
const bcrypt = require("bcryptjs");

const AuthController = {
  async login(req, res) {
    const { email, senha } = req.body;

    const usuario = await User.findOne({
      where: {
        email,
      },
    });

    if (!usuario) {
      return res.status(400).json("Email não cadastrado");
    }

    if (!bcrypt.compareSync(senha, usuario.senha)) {
      return res.status(401).json("Senha invalida!");
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      },
      secret.key
    );

    return res.json({ token });
  },
};

module.exports = AuthController;
