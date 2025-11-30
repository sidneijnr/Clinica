import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import { deletar_exame } from "../../repository/repo_exame";
import { cadastrar_log } from "../../repository/repo_log";
import PromptSync from "prompt-sync";
import { excluit_exameService } from "../../service/exameService";
import { usuario_existe } from "../../service/logService";
const prompt = PromptSync();


export async function controller_excluirExame() {
    try {
        console.log("---------------------------------- DELETAR EXAME ----------------------------------")
        const id: number = Number(prompt("ID do usuário que esta realizando a operação: "))
        const idExclu: number = Number(prompt("ID do exame que será deletado: "))

        usuario_existe(id)

        await excluit_exameService(idExclu)

        console.log("Exame deletado com sucesso")
            const log: Logs={
            acao: Acao.EXCLUSAO,
            usuario:id
         }

        await cadastrar_log(log)
    } catch (error) {
        console.log("Erro ao deletar Exame", error)
    }
}

