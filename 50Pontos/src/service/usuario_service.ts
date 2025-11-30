import Usuario from "../model/Usuario";
import { dbPromisse } from "../repository/bd";
import { atualizar_usuario, cadastrar_usuario, delete_usuario } from "../repository/repo_usuario";

export async function verificar_id_usuario(id: number) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM usuario WHERE id = ?",
        id
    );
    return validador
}

export function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export async function atualizar_usuarioService(idAtu: number, usuario: Usuario) {
    if (!validarEmail(usuario.email)) {
        throw new Error("Email inválido");
    }

    const atu_usuario = await verificar_id_usuario(idAtu)

    usuario.email = usuario.email ? usuario.email : atu_usuario.email;
    usuario.nome = usuario.nome ? usuario.nome : atu_usuario.nome;
    usuario.senha = usuario.senha ? usuario.senha : atu_usuario.senha
    atualizar_usuario(idAtu, usuario)

}

export async function cadastrar_usuarioService(usuario: Usuario) {
    if (!usuario.email || !usuario.nome || !usuario.senha) {
        throw new Error("TODOS OS CAMPOS DEVEM SER PREENCHIDOS");

    }
    else if (!validarEmail(usuario.email)) {
        throw new Error("Email inválido");
    }

    cadastrar_usuario(usuario)

}


export async function excluir_usuarioService(id: number) {
    const existe = await verificar_id_usuario(id);
    if (!existe) {
        throw new Error("USUÁRIO NÃO ENCONTRADO");
    }
    await delete_usuario(id);  
}

