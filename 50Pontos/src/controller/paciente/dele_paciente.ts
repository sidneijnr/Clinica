import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import { deletar_paciente } from "../../repository/repo_paciente";
import PromptSync from "prompt-sync";
import { excluir_PacienteService } from "../../service/paciente_service";
import { usuario_existe } from "../../service/logService";
const prompt = PromptSync();


export async function controller_excluirPaciente() {
    try {
        console.log("---------------------------------- DELETAR PACIENTE ----------------------------------")
        const id: number = Number(prompt("ID do usuário que esta realizando a operação: "))
        const idExclu: number = Number(prompt("ID do paciente que será deletado: "))

        usuario_existe(id)

        await excluir_PacienteService(idExclu)

        

        console.log("Paciente deletado com sucesso")
            const log: Logs={
            acao: Acao.EXCLUSAO,
            usuario:id
         }

        await cadastrar_log(log)
    } catch (error) {
        console.log("Erro ao deletar paciente", error)
    }
}

