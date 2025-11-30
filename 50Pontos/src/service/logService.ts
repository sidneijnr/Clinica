import Logs from "../model/Logs";
import { dbPromisse } from "../repository/bd";
import { cadastrar_log } from "../repository/repo_log";


export async function verificar_id_usuario(id: number) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM usuario WHERE id = ?",
        id
    );
    return validador
}

export async function usuario_existe(id: number) {  
    const existe = await verificar_id_usuario(id);
    if (!existe) {
        throw new Error("USUÁRIO NÃO ENCONTRADO");
    }
}