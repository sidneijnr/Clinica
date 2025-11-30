import { dbPromisse } from "./bd"
import Logs from "../model/Logs"


export async function cadastrar_log(logs: Logs) {
    const db = await dbPromisse
    await db.run(
        "insert into logs(acao, id_usuario) values(?,?)",
        logs.acao, logs.usuario
        
    )
}

