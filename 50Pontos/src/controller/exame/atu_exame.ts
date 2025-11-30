import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import Exame from "../../model/Exame";
import { atualizar_exame } from "../../repository/repo_exame";
import PromptSync from "prompt-sync";
import { atualizar_exameService } from "../../service/exameService";
import { usuario_existe } from "../../service/logService";
const prompt = PromptSync();

export async function controller_atualizarExame() {
    try {
        console.log("---------------------------------- ATUALIZAR EXAME ----------------------------------")
        console.log("OBS: PARA NÃO ALTERAR UM CAMPO, DEIXE-0 EM BRANCO")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const idAtu: number = Number(prompt("ID do exame que sera atualizado: "))
        const nome: string = prompt("Nome do exame: ")
        const descricao: string = prompt("descricão do exame: ")

        usuario_existe(id)

        const exame: Exame = {
            nome,
            descricao
        }


        await atualizar_exameService(idAtu, exame)

        const log: Logs = {
            acao: Acao.ATUALIZACAO,
            usuario: id
        }

        cadastrar_log(log)


        console.log("Exame atualizado com sucesso")
    }
    catch (error) {
        console.log("errro ao atualizar Exame", error)
    }
}