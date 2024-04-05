const conn = require("../services/db");
require("dotenv").config();
const crypto = require("crypto");

var VX_USUARIO = "";
var VX_CONTRASENA = "";
var VX_ECONTRASENA = "";

const buscar_user_sql =
  "SELECT * FROM srp_usuarios_tbl WHERE user_name = ? AND password = ?";

//const buscarUsuario = async (req, res = response) => {

async function buscarUsuario (req, res = response) {

  const { USUARIO, CONTRASENA } = req.body;

  VX_USUARIO = USUARIO;
  VX_ECONTRASENA = await validaruser("E", USUARIO, CONTRASENA);
  VX_CONTRASENA = VX_ECONTRASENA;

  try {
    
    conn.query(buscar_user_sql, [VX_USUARIO, VX_CONTRASENA], function (err, result) {
      if (err) throw err;
            if (result.length == 0) {
              res.json({
                ok: false,
                message: "Usuario Invalido.",
              });
            } else {
              const data = result;

              res.json({
                ok: true,
                data,
                message: "Usuario Correcto.",
              });
            }
  });
  } catch (err) {
    res.status(500).json({
      ok: false,
      err: err,
      msg: "Error inesperado",
    });
  }
};

async function validaruser(p_action, p_clave, p_valor_encriptado) {
  let valor_salida = "";

  try {
    let ENC_KEY = crypto
      .createHash("md5")
      .update(p_clave, "utf-8")
      .digest("hex")
      .toUpperCase();
    var IV = new Buffer.alloc(16);

    var encrypt = (val) => {
      let cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, IV);
      let encrypted = cipher.update(val, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    };

    var decrypt = (encrypted) => {
      let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, IV);
      let decrypted = decipher.update(encrypted, "hex", "utf8");
      return decrypted + decipher.final("utf8");
    };

    if (p_action == "E") {
      valor_salida = encrypt(p_valor_encriptado);
    } else {
      valor_salida = decrypt(p_valor_encriptado);
    }
  } catch {
    valor_salida = "Error";
  }
  return valor_salida;
}

module.exports = {
  buscarUsuario,
};