import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import { deletar_consulta } from "../../repository/repo_consulta";
import { cadastrar_log } from "../../repository/repo_log";
import PromptSync from "prompt-sync";
import { excluir_ConsultaService } from "../../service/consulta_service";
import { usuario_existe } from "../../service/logService";
const prompt = PromptSync();




export async function controller_excluirConsulta() {
    try {
        console.log("---------------------------------- DELETAR CONSULTA ----------------------------------")
        const id: number = Number(prompt("ID do usuário que esta realizando a operação: "))
        const idExclu: number = Number(prompt("ID da consulta que será deletada: "))

        usuario_existe(id)
        await excluir_ConsultaService(idExclu)

      

        console.log("Consulta deletado com sucesso")
        const log: Logs = {
            acao: Acao.EXCLUSAO,
            usuario: id
        }

        await cadastrar_log(log)
    } catch (error) {
        console.log("Erro ao deletar consulta", error)
    }
}

