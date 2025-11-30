import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import { delete_usuario } from "../../repository/repo_usuario";
import PromptSync from "prompt-sync";
import { excluir_usuarioService } from "../../service/usuario_service";
import { usuario_existe } from "../../service/logService";

const prompt = PromptSync();

export async function controller_excluirUsuario() {
    try {
        console.log("---------- DELETAR USUÁRIO ----------")
        const id: number = Number(prompt("ID do usuário que esta realizando a operação: "))
        const idExclu: number = Number(prompt("ID do usuário que será deletado: "))
        await excluir_usuarioService(idExclu)

        usuario_existe(id)

        console.log("Usuario deletado com sucesso")
            const log: Logs={
            acao: Acao.EXCLUSAO,
            usuario:id
         }

        await cadastrar_log(log)
    } catch (error) {
        console.log("Erro ao deletar usuario", error)
    }
}

