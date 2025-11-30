import { dbPromisse } from "./bd"
import Medico from "../model/Medico"


export async function cadastrar_medico(medico: Medico) {
    const db = await dbPromisse
    await db.run(
        "insert into medico(nome, email, especialidade,crm) values(?,?,?,?)",
        medico.nome, medico.email, medico.especialidade, medico.crm
        
    )
}

export async function atualizar_medico(medico: Medico, id: number) {
    const db = await dbPromisse
    await db.run(
       `UPDATE medico 
         SET nome = ?, email = ?, especialidade = ?, crm = ?
         WHERE id = ?`,
        medico.nome, medico.email, medico.especialidade, medico.crm, id
    )
}

export async function deletar_medico(id:number) {
    const db = await dbPromisse
    await db.run(
        "delete from medico where id = ?",
        id
    )
}

export async function listar_medico(): Promise<Medico[]> {
    const db = await dbPromisse;
    return db.all<Medico[]>("SELECT * FROM medico");
}

export async function listar_medicoNome(nome: string): Promise<Medico[]> {
    const db = await dbPromisse;
    return db.all<Medico[]>("SELECT * FROM medico where nome LIKE ?",
        [`%${nome}%`]
    );
}