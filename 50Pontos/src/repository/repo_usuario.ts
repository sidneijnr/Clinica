import { dbPromisse } from "./bd"
import Usuario from "../model/Usuario"

export async function cadastrar_usuario(usuario: Usuario) {
    const db = await dbPromisse
    await db.run(
        "insert into usuario(nome, email,senha) values(?,?,?)",
        usuario.nome,usuario.email, usuario.senha
        
    )
}

export async function atualizar_usuario(idAtu: number,usuario: Usuario) {
    const db = await dbPromisse
    await db.run(
       `UPDATE usuario 
         SET nome = ?, email = ?, senha = ?
         WHERE id = ?`,
         usuario.nome, usuario.email, usuario.senha, idAtu
    )
}

export async function delete_usuario(id:number) {
    const db = await dbPromisse
    await db.run(
        "delete from usuario where id = ?",
        id
    )
}

export async function listar_usuario(): Promise<Usuario[]> {
    const db = await dbPromisse;
    return db.all<Usuario[]>("SELECT * FROM usuario");
}

export async function listar_usuarioId(nome:string): Promise<Usuario[]> {
    const db = await dbPromisse;
    return db.all<Usuario[]>("SELECT * FROM usuario WHERE nome LIKE ?",
        [`%${nome}%`]

    );
}