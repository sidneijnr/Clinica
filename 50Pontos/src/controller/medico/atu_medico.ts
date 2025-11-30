import Acao from "../../model/Acao";
import bcrypt from "bcryptjs";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import { atualizar_MedicoService } from "../../service/medico_service";
import Medico from "../../model/Medico";
import { atualizar_medico } from "../../repository/repo_medico";
import PromptSync from "prompt-sync";
const prompt = PromptSync();


export async function controller_atualizarMedico() {
    try {
        console.log("---------------------------------- ATUALIZAR MEDICO ----------------------------------")
        console.log("OBS: PARA NÃO ALTERAR UM CAMPO, DEIXE-0 EM BRANCO")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const idAtu: number = Number(prompt("ID do Médico que sera atualizado: "))
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
        await atualizar_MedicoService(id, medico)

        const log: Logs = {
            acao: Acao.ATUALIZACAO,
            usuario: id
        }

        cadastrar_log(log)


        console.log("medico atualizado com sucesso")
    }
    catch (error) {
        console.log("errro ao atualizar medico", error)
    }
}