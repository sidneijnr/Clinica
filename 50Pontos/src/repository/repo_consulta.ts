import { dbPromisse } from "./bd"
import Consulta from "../model/Consulta"


export async function cadastrar_consulta(consulta: Consulta) {
    const db = await dbPromisse
    await db.run(
        "insert into consulta(motivo, id_paci, id_medi, status, data_consulta) values(?,?,?,?,?)",
        consulta.motivo, consulta.paciente, consulta.medico, consulta.status, consulta.data_consulta
        
    )
}

export async function atualizar_consulta(consulta: Consulta, id: number) {
    const db = await dbPromisse
    await db.run(
       `UPDATE consulta 
         SET motivo = ?,id_paci =?, id_medi =?, status = ?, data_consulta = ?
         WHERE id = ?`,
     consulta.motivo, consulta.paciente, consulta.medico, consulta.status, consulta.data_consulta, id
    )
}

export async function deletar_consulta(id:number) {
    const db = await dbPromisse
    await db.run(
        "delete from consulta where id = ?",
        id
    )
}

export async function listar_consulta(): Promise<Consulta[]> {
    const db = await dbPromisse;
    return db.all<Consulta[]>("SELECT * FROM consulta");
}


export async function listar_consultaId(id:number): Promise<Consulta[]> {
    const db = await dbPromisse;
    return db.all<Consulta[]>("SELECT * FROM consulta where id = ?",
        id
    );
}