import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  // Crear Usuarios
  if (req.method === "POST") {
    console.log(req.body);
    try {
      const usuario = await prisma.usuario.findUnique({
        where: {
          correo: req.body.correo,
        },
      });

      if (usuario) {
        const resultadoComparacion = await new Promise((resolve, reject) => {
          bcrypt.compare(
            req.body.password,
            usuario.password,
            function (err, result) {
              if (err) {
                console.log(usuario.password);
                console.error("Error al comparar contraseñas:", err);
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });

        let respuesta = 0;

        if (resultadoComparacion) {
          if (usuario.correo === "luisSantos@gmail.com") {
            respuesta = 3;
          } else {
            respuesta = 2;
          }
        } else {
          respuesta = 1;
        }
        res.json({ usuario, respuesta });
      } else {
        // Usuario no encontrado
        res.json(0);
      }
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } finally {
      await prisma.$disconnect();
    }
  }
}
