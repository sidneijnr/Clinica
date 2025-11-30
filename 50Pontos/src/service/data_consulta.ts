import Consulta from "../model/Consulta";
import { dbPromisse } from "../repository/bd";
import { atualizar_consulta, cadastrar_consulta } from "../repository/repo_consulta";

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


export async function cadastrar_ConsultaService(consulta: Consulta) {

    const existe = await validarData(new Date(consulta.data_consulta));


    if (existe) {
        throw new Error("Já existe uma consulta marcada para essa data.");
    }

    
    consulta.data_consulta = new Date(consulta.data_consulta)
        .toISOString()
        .split("T")[0];

    await cadastrar_consulta(consulta);
}


export async function atualizar_ConsultaService(id:number, consulta: Consulta) {

    const existe = await validarData(new Date(consulta.data_consulta));


    if (existe) {
        throw new Error("Já existe uma consulta marcada para essa data.");
    }

    
    consulta.data_consulta = new Date(consulta.data_consulta)
        .toISOString()
        .split("T")[0];

    await atualizar_consulta(consulta, id);
}