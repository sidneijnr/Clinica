import acao from "../../model/Acao.ts";
import Exame from "../../model/Exame.ts";
import Logs from "../../model/Logs.ts";
import { cadastrar_exame } from "../../repository/repo_exame.ts";
import { cadastrar_log } from "../../repository/repo_log.ts";
import PromptSync from "prompt-sync";
import { cadastrar_exameService } from "../../service/exameService.ts";
import { verificar_id_usuario } from "../../service/usuario_service.ts";
import { usuario_existe } from "../../service/logService.ts";
const prompt = PromptSync();

export async function cadastrar_exameController() {
    try {
        console.log("---------------------------------- CADASTRAR EXAME ----------------------------------")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const nome: string = prompt("Nome do exame: ")
        const descricao: string = prompt("descricão do exame: ")
        
        usuario_existe(id)

        const exame: Exame = {
            nome,
            descricao
        }
        await cadastrar_exameService(exame)
        const log: Logs = {
            acao: acao.CRIACAO,
            usuario: id
        }

        cadastrar_log(log)
        console.log("exame cadastrado com sucesso")
    }
    catch (error) {
        console.log("errro ao cadastrar exame", error)
    }
}