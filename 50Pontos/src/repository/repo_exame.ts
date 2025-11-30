import { dbPromisse } from "./bd"
import Exame from "../model/Exame.ts"


export async function cadastrar_exame(exame: Exame) {
    const db = await dbPromisse
    await db.run(
        "insert into exame(nome, descricao) values(?,?)",
       exame.nome, exame.descricao
        
    )
}

export async function atualizar_exame(exame: Exame, id: number) {
    const db = await dbPromisse
    await db.run(
       `UPDATE exame 
         SET nome = ?, descricao = ?
         WHERE id = ?`,
         exame.nome, exame.descricao, id
    )
}

export async function deletar_exame(id:number) {
    const db = await dbPromisse
    await db.run(
        "delete from exame where id = ?",
        id
    )
}

export async function listar_exame(): Promise<Exame[]> {
    const db = await dbPromisse;
    return db.all<Exame[]>("SELECT * FROM exame");
}


export async function listar_exameId(nome: string): Promise<Exame[]> {
    const db = await dbPromisse;
    return db.all<Exame[]>("SELECT * FROM exame where nome LIKE ?",
        [`%${nome}%`]
    );
}