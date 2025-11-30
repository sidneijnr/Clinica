import Consulta from "../model/Consulta";
import { dbPromisse } from "../repository/bd";
import { cadastrar_consulta } from "../repository/repo_consulta";

export async function verificarPaciente(paciente: number) {
    const db = await dbPromisse;
    const validadorPaci = await db.get(
        "SELECT * FROM paciente WHERE id = ?",
        paciente);

    return validadorPaci

}


export async function verificarMedico(medico: number) {
    const db = await dbPromisse;
    const validadorMedi = await db.get(
        "SELECT * FROM medico WHERE id = ?",
        medico);

    return validadorMedi

}


export async function cadastrar_consultaService(consulta: Consulta) {


    const paciente = await verificarPaciente(consulta.paciente);
    const medico = await verificarPaciente(consulta.medico);

    if (!consulta.motivo || consulta.paciente  == null || consulta.medico == null || !consulta.status || !consulta.data_consulta) {
        throw new Error("TODOS OS CAMPOS DEVEM SER PREENCHIDOS");

    }
    else if (!paciente) {
        throw new Error("Não exite esse paciente");
    }

    else if (!medico) {
        throw new Error("Não exite esse medico");
    }


    await cadastrar_consulta(consulta);
}


