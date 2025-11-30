import { listar_paciente, listar_pacienteNome } from "../../repository/repo_paciente";
import { listar_usuario, listar_usuarioId } from "../../repository/repo_usuario";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

export async function controller_listarPaciente() {
    try {
    console.log("---------------------------------- LISTA DE PACIENTES ----------------------------------")
        const pacientes = await listar_paciente()
        console.table(pacientes)
    } catch (error) {
        console.log("errro ao listar pacientes", error)
    }
}


export async function controller_selecionarPaciente(){
    try{
        console.log("---------------------------------- SELECIONAR PACIENTE POR NOME ----------------------------------")
        const nome: string = prompt("nome do paciente que deseja pesquisar: ")
        const paciente = await listar_pacienteNome(nome)
        console.table(paciente)
    } catch (error){
         console.log("errro ao listar paciente", error)
    }
}