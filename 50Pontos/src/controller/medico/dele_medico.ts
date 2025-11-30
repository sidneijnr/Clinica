import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import { deletar_medico } from "../../repository/repo_medico";
import PromptSync from "prompt-sync";
import { excluir_MedicoService } from "../../service/medico_service";
const prompt = PromptSync();


export async function controller_excluirMedico() {
    try {
        console.log("---------------------------------- DELETAR Medico ----------------------------------")
        const id: number = Number(prompt("ID do usuário que esta realizando a operação: "))
        const idExclu: number = Number(prompt("ID do medico que será deletado: "))
        await excluir_MedicoService(idExclu)

        console.log("Medico deletado com sucesso")
        const log: Logs = {
            acao: Acao.EXCLUSAO,
            usuario: id
        }

        await cadastrar_log(log)
    } catch (error) {
        console.log("Erro ao deletar Medico", error)
    }
}

