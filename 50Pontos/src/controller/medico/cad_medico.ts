import Medico from "../../model/Medico"
import Logs from "../../model/Logs"
import { cadastrar_medico } from "../../repository/repo_medico"
import acao from "../../model/Acao"
import { cadastrar_log } from "../../repository/repo_log"
import { cadastrarMedicoService } from "../../service/medico_service"
import PromptSync from "prompt-sync";
const prompt = PromptSync();


export async function cadastrar_medicoController() {
    try {
        console.log("---------------------------------- CADASTRAR MEDICO ----------------------------------")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const nome: string = prompt("Nome do Medico: ")
        const email: string = prompt("email do medico: ")
        const especialidade: string = prompt("Especialidade do Medico: ")
        const crm: string = prompt("CRM do Médico: ")
        const medico: Medico = {
            nome,
            email,
            especialidade,
            crm
        }
        await cadastrarMedicoService(medico)
        const log: Logs = {
            acao: acao.CRIACAO,
            usuario: id
        }

        cadastrar_log(log)
        console.log("medico cadastrado com sucesso")
    }
    catch (error) {
        console.log("errro ao cadastrar medico", error)
    }
}