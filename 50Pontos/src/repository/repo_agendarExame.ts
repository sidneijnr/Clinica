import { dbPromisse } from "./bd"
import Consulta_exame from "../model/Consulta_exame.ts"


export async function cadastrar_agendaExame(agenda: Consulta_exame) {
    const db = await dbPromisse
    await db.run(
        "insert into consulta_exame(id_consul, id_exame) values(?,?)",
        agenda.id_consul, agenda.id_exame
        
    )
}

export async function atualizar_consultaExame(agenda: Consulta_exame, id: number) {
    const db = await dbPromisse
    await db.run(
       `UPDATE consulta_exame 
         SET id_consul = ?, id_exame = ?
         WHERE id = ?`,
         agenda.id_consul, agenda.id_exame, id
    )
}

export async function deletar_consultaExame(id:number) {
    const db = await dbPromisse
    await db.run(
        "delete from consulta_exame where id = ?",
        id
    )
}

export async function listar_agendaExame(): Promise<Consulta_exame[]> {
    const db = await dbPromisse;
    return db.all<Consulta_exame[]>("SELECT * FROM consulta_exame");
}

export async function listar_agendaExameId(id:number): Promise<Consulta_exame[]> {
    const db = await dbPromisse;
    return db.all<Consulta_exame[]>("SELECT * FROM consulta_exame where id =?",
        id
    );
}