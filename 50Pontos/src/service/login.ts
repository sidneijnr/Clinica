import { dbPromisse } from "../repository/bd";
import bcrypt from "bcryptjs";

export async function login(email: string, senha: string) {
    const db = await dbPromisse;

    // 1. Buscar pelo email
    const usuario = await db.get(
        "SELECT * FROM usuario WHERE email = ?",
        email
    );

    if (!usuario) {
       console.log("Usuario não encontrado")
    }

    
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    

    if (!senhaCorreta) {
       console.log("senha incorreta")
    }

    let id = usuario.id
    
   console.log("Login realizado com sucesso")
   return id
}
