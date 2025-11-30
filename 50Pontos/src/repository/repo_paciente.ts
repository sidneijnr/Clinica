import { dbPromisse } from "./bd"
import Paciente from "../model/Paciente"


export async function cadastrar_paciente(paciente: Paciente) {
    const db = await dbPromisse
    await db.run(
        "insert into paciente(nome, idade, sexo,cpf) values(?,?,?,?)",
        paciente.nome,paciente.idade, paciente.sexo, paciente.cpf
        
    )
}

export async function atualizar_paciente(paciente: Paciente, id: number) {
    const db = await dbPromisse
    await db.run(
       `UPDATE paciente 
         SET nome = ?, idade = ?, sexo = ?, cpf = ?
         WHERE id = ?`,
         paciente.nome, paciente.idade, paciente.sexo, paciente.cpf, id
    )
}

export async function deletar_paciente(id:number) {
    const db = await dbPromisse
    await db.run(
        "delete from paciente where id = ?",
        id
    )
}

export async function listar_paciente(): Promise<Paciente[]> {
    const db = await dbPromisse;
    return db.all<Paciente[]>("SELECT * FROM paciente");
}


export async function listar_pacienteNome(nome: string): Promise<Paciente[]> {
    const db = await dbPromisse;
    return db.all<Paciente[]>("SELECT * FROM paciente where nome LIKE  ?",
         [`%${nome}%`]
    );
}