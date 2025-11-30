import Paciente from "../model/Paciente";
import { dbPromisse } from "../repository/bd";
import { atualizar_paciente, cadastrar_paciente } from "../repository/repo_paciente";

export async function ValidarCpf(cpf: string) {
    
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM paciente WHERE cpf = ?",
        cpf
    );
      return validador
}


export async function cadastrarPacienteService(paciente: Paciente) {
    
   
    const existe = await ValidarCpf(paciente.cpf);

    if (existe) {
        throw new Error("Já existe um paciente cadastrado com esse CPF.");
    }

    
    await cadastrar_paciente(paciente);
}


export async function atualizar_PacienteService(id:number, paciente: Paciente) {
    
   
    const existe = await ValidarCpf(paciente.cpf);

    if (existe) {
        throw new Error("Já existe um paciente cadastrado com esse CPF.");
    }

    
    await atualizar_paciente( paciente, id);

}