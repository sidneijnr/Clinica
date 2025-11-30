import { listar_agendaExame, listar_agendaExameId } from "../../repository/repo_agendarExame"
import { listar_consulta, listar_consultaId } from "../../repository/repo_consulta"
import { listar_exame, listar_exameId } from "../../repository/repo_exame"
import PromptSync from "prompt-sync";
const prompt = PromptSync();

export async function controller_listarAgendas() {
    try {
        console.log("---------------------------------- LISTAR AGENDA EXAME ----------------------------------")
        const agendas = await listar_agendaExame()
        console.table(agendas)
    } catch (error) {
        console.log("errro ao listar agendas de exame", error)
    }
}


export async function controller_selecionarAgenda() {
    try {
        console.log("---------------------------------- SELECIONAR AGENDA EXAME POR ID ----------------------------------")
        const id: number = Number(prompt("id da consulta que deseja pesquisar: "))
        const agenda = await listar_agendaExameId(id)
        console.table(agenda)
    } catch (error) {
        console.log("errro ao listar agendas de exame", error)
    }
}