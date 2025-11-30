import Consulta from "../model/Consulta";
import { dbPromisse } from "../repository/bd";
import { atualizar_consulta, cadastrar_consulta, deletar_consulta } from "../repository/repo_consulta";

export async function validarData(data: Date) {

    const hoje = new Date();


    if (data.getTime() < hoje.getTime()) {
        throw new Error("A data da consulta não pode ser no passado.");
    }

    const db = await dbPromisse;

    const validador = await db.get(
        "SELECT * FROM consulta WHERE data_consulta = ?",
        data
    );

    return validador;
}




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


export async function verificar_id_consulta(id: number) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM consulta WHERE id = ?",
        id
    );
    return validador
}



export async function cadastrar_ConsultaService(consulta: Consulta) {

    const existe = await validarData(new Date(consulta.data_consulta));
    const paciente = await verificarPaciente(consulta.paciente);
    const medico = await verificarPaciente(consulta.medico);

    if (!consulta.motivo || consulta.paciente == null || consulta.medico == null || !consulta.status || !consulta.data_consulta) {
        throw new Error("TODOS OS CAMPOS DEVEM SER PREENCHIDOS");

    }
    else if (!paciente) {
        throw new Error("Não exite esse paciente");
    }

    else if (!medico) {
        throw new Error("Não exite esse medico");
    }

    else if (existe) {
        throw new Error("Já existe uma consulta marcada para essa data.");
    }


    consulta.data_consulta = new Date(consulta.data_consulta)
        .toISOString()
        .split("T")[0];

    await cadastrar_consulta(consulta);
}


export async function atualizar_ConsultaService(id: number, consulta: Consulta) {

    const existe = await validarData(new Date(consulta.data_consulta));
    const atu_consulta = await verificar_id_consulta(id);

    if (!atu_consulta) {
        throw new Error("Não existe essa consulta");
    }

    consulta.motivo = consulta.motivo ? consulta.motivo : atu_consulta.motivo;
    consulta.paciente = (consulta.paciente == null) ? atu_consulta.paciente : consulta.paciente;
    consulta.medico = (consulta.medico == null) ? atu_consulta.medico : consulta.medico;
    consulta.status = consulta.status ? consulta.status : atu_consulta.status;
    consulta.data_consulta = consulta.data_consulta ? consulta.data_consulta : atu_consulta.data_consulta;

    if (existe) {
        throw new Error("Já existe uma consulta marcada para essa data.");
    }




    consulta.data_consulta = new Date(consulta.data_consulta)
        .toISOString()
        .split("T")[0];

    await atualizar_consulta(consulta, id);
}


export async function excluir_ConsultaService(id: number) {
    const existe = await verificar_id_consulta(id); 
    if (!existe) {
        throw new Error("CONSULTA NÃO ENCONTRADA");
    }
    await deletar_consulta(id);
}