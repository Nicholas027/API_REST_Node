import { validationResult, body } from "express-validator";

export const validationResultsExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const bodyRegisterValidator = [
  body("email", "Ingrese un email válido").trim().isEmail().normalizeEmail(),
  body("password", "Contraseña mínimo 6 carácteres")
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coinciden las contraseñas");
      }
      return value;
    }),
  validationResultsExpress,
];

export const bodyLoginValidator = [
  body("email", "Ingrese un formato de e-mail válido")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Contraseña mínimo 6 carácteres")
    .trim()
    .isLength({ min: 6 }),
  validationResultsExpress,
];
