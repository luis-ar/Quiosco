import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  //Crear Usuarios
  if (req.method === "POST") {
    const usuario = await prisma.usuario.create({
      data: {
        nombre: req.body.nombre,
        password: req.body.passwordEncriptado,
        correo: req.body.correo,
        mensajes: [],
      },
    });
    res.json(usuario);
  }
}
