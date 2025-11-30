import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import { deletar_consultaExame } from "../../repository/repo_agendarExame";
import { deletar_exame } from "../../repository/repo_exame";
import { cadastrar_log } from "../../repository/repo_log";
import PromptSync from "prompt-sync";
import { excluir_agendaService } from "../../service/agendaService";
import { usuario_existe } from "../../service/logService";
const prompt = PromptSync();



export async function controller_excluirAgenda() {
    try {
        console.log("---------------------------------- DELETAR AGENDA EXAME ----------------------------------")
        const id: number = Number(prompt("ID do usuário que esta realizando a operação: "))
        const idExclu: number = Number(prompt("ID da consulta que será deletada: "))    
          
        usuario_existe(id)

        await excluir_agendaService(idExclu)

        console.log("agenda deletada com sucesso")
        const log: Logs = {
            acao: Acao.EXCLUSAO,
            usuario: id
        }

        await cadastrar_log(log)
    } catch (error) {
        console.log("Erro ao deletar agenda", error)
    }
}

