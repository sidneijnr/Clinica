import Medico from "../model/Medico";
import Paciente from "../model/Paciente";
import { dbPromisse } from "../repository/bd";
import { atualizar_medico, cadastrar_medico, deletar_medico } from "../repository/repo_medico";
import { cadastrar_paciente } from "../repository/repo_paciente";

export async function Validarcrm(crm: string) {

    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM medico WHERE crm = ?",
        crm
    );
    return validador
}

export async function verificar_id_medico(id: number) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM medico WHERE id = ?",
        id
    );
    return validador
}





export async function cadastrarMedicoService(medico: Medico) {


    const existe = await Validarcrm(medico.crm);
    if (!medico.nome || !medico.email || !medico.crm || !medico.especialidade) {
        throw new Error("TODOS OS CAMPOS DEVEM SER PREENCHIDOS");
    }

    else if (existe) {
        throw new Error("Já existe um paciente cadastrado com esse crm.");
    }


    await cadastrar_medico(medico);
}


export async function atualizar_MedicoService(id: number, medico: Medico) {

    const atu_medico = await verificar_id_medico(id)
    const existe = await Validarcrm(medico.crm);

    if (!atu_medico) {
        throw new Error("Não existe essse médico");
    }

    else if (existe && existe.id != id) {
        throw new Error("Já existe um medico cadastrado com esse crm.");
    }




    medico.nome = medico.nome ? medico.nome : atu_medico.nome
    medico.crm = medico.crm ? medico.crm : atu_medico.crm
    medico.email = medico.email ? medico.email : atu_medico.email
    medico.especialidade = medico.especialidade ? medico.especialidade : atu_medico.especialidade


    await atualizar_medico(medico, id);
}

export async function excluir_MedicoService(id: number) {
    const existe = await verificar_id_medico(id);   
    if (!existe) {
        throw new Error("MÉDICO NÃO ENCONTRADO");
    }
    await deletar_medico(id);

}