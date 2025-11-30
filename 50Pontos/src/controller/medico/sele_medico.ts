import { listar_medico, listar_medicoNome } from "../../repository/repo_medico"
import PromptSync from "prompt-sync";
const prompt = PromptSync();
export async function controller_listarMedicos() {
    try {
        console.log("---------------------------------- LISTAR MÉDICO ----------------------------------")
        const medicos = await listar_medico()
        console.table(medicos)
    } catch (error) {
        console.log("errro ao listar medicos", error)
    }
}


export async function controller_selecionarMedico() {
    try {
        console.log("---------------------------------- SELECIONAR MÉDICO POR NOME ----------------------------------")
        const nome: string = prompt("nome do médico que deseja pesquisar: ")
        const medico = await listar_medicoNome (nome)
        console.table(medico)
    } catch (error) {
        console.log("errro ao listar medico", error)
    }
}