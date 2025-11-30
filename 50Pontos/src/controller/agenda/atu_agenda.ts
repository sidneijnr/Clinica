import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import Cons from "../../model/Exame";
import { atualizar_exame } from "../../repository/repo_exame";
import { atualizar_ConsultaService } from "../../service/consulta_service";
import Consulta_exame from "../../model/Consulta_exame";
import { atualizar_consultaExame } from "../../repository/repo_agendarExame";
import PromptSync from "prompt-sync";
import { atualizar_agendaService } from "../../service/agendaService";
import { usuario_existe } from "../../service/logService";
const prompt = PromptSync();


export async function controller_atualizarAgenda() {
    try {
        console.log("---------------------------------- ATUALUIZAR AGENDA EXAMES ----------------------------------")
        console.log("OBS: PARA NÃO ALTERAR UM CAMPO, DEIXE-0 EM BRANCO")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const idAtu: number = Number(prompt("ID da agenda consulta: "))
        const id_consul: number = Number(prompt("Id da consulta: "))
        const id_exame: number = Number(prompt("ID do exame: "))

        usuario_existe(id)

        const agenda: Consulta_exame = {
            id_consul,
            id_exame,
        }


        await atualizar_agendaService(idAtu, agenda)



        const log: Logs = {
            acao: Acao.ATUALIZACAO,
            usuario: id
        }

        cadastrar_log(log)


        console.log("Agenda atualizada com sucesso")
    }
    catch (error) {
        console.log("errro ao atualizar agenda", error)
    }
}