import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validationResultsExpress } from "../middlewares/validationResultsExpress.js";

const router = Router();

router.post(
  "/register",
  [
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
  ],
  validationResultsExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "Ingrese un email válido").trim().isEmail().normalizeEmail(),
    body("password", "Contraseña mínimo 6 carácteres")
      .trim()
      .isLength({ min: 6 }),
  ],
  validationResultsExpress,
  login
);

export default router;
