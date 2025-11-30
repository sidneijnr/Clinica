import { listar_consulta, listar_consultaId } from "../../repository/repo_consulta"
import { listar_exame, listar_exameId } from "../../repository/repo_exame"
import { listar_medico } from "../../repository/repo_medico"
import PromptSync from "prompt-sync";
const prompt = PromptSync();


export async function controller_listarConsultas() {
    try {
        console.log("---------------------------------- LISTAR CONSULTA ----------------------------------")
        const consultas = await listar_consulta()
        console.table(consultas)
    } catch (error) {
        console.log("errro ao listar consultas", error)
    }
}


export async function controller_selecionarConsulta() {
    try {
        console.log("---------------------------------- SELECIONAR CONSULTA POR ID ----------------------------------")
        const id: number = Number(prompt("id da consulta que deseja pesquisar: "))
        const consulta = await listar_consultaId(id)

        console.table(consulta)
    } catch (error) {
        console.log("errro ao listar consulta", error)
    }
}