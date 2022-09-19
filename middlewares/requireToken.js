import jwt from "jsonwebtoken";
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw new Error(`Token doesn't exists (use Bearer)`);
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(uid);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    const TokenVerificationErrors = {
      ["invalid signature"]: "La firma del JWT no es valida",
      ["jwt expired"]: "JWT Expirado",
      ["invalid token"]: "Token no valido",
      ["No Bearer"]: "Utiliza el formato Bearer",
      ["jwt malformed"]: "JWT Formato Invalido",
    };
    return res
      .status(401)
      .send({ error: TokenVerificationErrors[error.message] });
  }
};
