import acao from "../../model/Acao.ts";
import Consulta_exame from "../../model/Consulta_exame.ts";
import Logs from "../../model/Logs.ts";
import { cadastrar_agendaExame } from "../../repository/repo_agendarExame.ts";
import { cadastrar_log } from "../../repository/repo_log.ts";
import { cadastrar_agendaService } from "../../service/agendaService.ts";
import { cadastrar_ConsultaService } from "../../service/consulta_service.ts";
import PromptSync from "prompt-sync";
import { usuario_existe } from "../../service/logService.ts";
const prompt = PromptSync();


export async function cadastrar_agendaController() {
    try {

        console.log("---------------------------------- CADASTRAR AGENDA EXAMES ----------------------------------")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const id_consul: number = Number(prompt("Id da consulta: "))
        const id_exame: number = Number(prompt("ID do exame: "))

        usuario_existe(id)

        const agenda: Consulta_exame = {
            id_consul,
            id_exame,
        }
        await cadastrar_agendaService(agenda)

        const log: Logs = {
            acao: acao.CRIACAO,
            usuario: id
        }

        cadastrar_log(log)

        console.log("agenda do exame cadastrado com sucesso")
    }
    catch (error) {
        console.log("errro ao consulta agenda exame", error)
    }
}