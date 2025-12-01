import Paciente from "../model/Paciente";
import { dbPromisse } from "../repository/bd";
import { atualizar_paciente, cadastrar_paciente, deletar_paciente } from "../repository/repo_paciente";

export async function ValidarCpf(cpf: string) {

    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM paciente WHERE cpf = ?",
        cpf
    );
    return validador
}


export async function verificar_id_paciente(id: number) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM paciente WHERE id = ?",
        id
    );
    return validador
}



export async function cadastrarPacienteService(paciente: Paciente) {


    const existe = await ValidarCpf(paciente.cpf);

    if (!paciente.nome || !paciente.cpf || !paciente.idade || !paciente.sexo) {
        throw new Error("TODOS OS CAMPOS DEVEM SER PREENCHIDOS")
    }

    else if (existe) {
        throw new Error("Já existe um paciente cadastrado com esse CPF.");
    }


    await cadastrar_paciente(paciente);
}


export async function atualizar_PacienteService(id: number, paciente: Paciente) {
    const atu_paciente = await verificar_id_paciente(id)

    const existe = await ValidarCpf(paciente.cpf);

    if (existe || existe.id != id) {
        throw new Error("Já existe um paciente cadastrado com esse CPF.");
    }

    paciente.nome = paciente.nome ? paciente.nome : atu_paciente.nome;
    paciente.idade = (paciente.idade == null) ? atu_paciente.idade : paciente.idade;
    paciente.cpf = paciente.cpf ? paciente.cpf : atu_paciente.cpf;
    paciente.sexo = paciente.sexo ? paciente.sexo : atu_paciente.sexo;

    await atualizar_paciente(paciente, id);

}

export async function excluir_PacienteService(id: number) {
    const existe = await verificar_id_paciente(id); 
    if (!existe) {
        throw new Error("PACIENTE NÃO ENCONTRADO");
    }   
    await deletar_paciente(id);
}