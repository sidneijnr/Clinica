import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import Cons from "../../model/Exame";
import { atualizar_exame } from "../../repository/repo_exame";
import { atualizar_ConsultaService } from "../../service/consulta_service";
import Consulta from "../../model/Consulta";
import PromptSync from "prompt-sync";
import { usuario_existe } from "../../service/logService";
const prompt = PromptSync();



export async function controller_atualizarConsulta() {
    try {
        console.log("---------------------------------- ATUALIZAR CONSULTA ----------------------------------")
        console.log("OBS: PARA NÃO ALTERAR UM CAMPO, DEIXE-0 EM BRANCO")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const idAtu: number = Number(prompt("ID da que esta realizando a atualização: "))
        const motivo: string = prompt("Motivo da consulta: ")
        const paciente: number = Number(prompt("ID do paciente: "))
        const medico: number = Number(prompt("ID do médico que realizara a consuta: "))
        const status: string = prompt("Status da consulta: ")
        const entradaData = prompt("Digite a data (formato: YYYY-MM-DD): ");
        const data_consulta: Date = new Date(entradaData);

        usuario_existe(id)


        const consulta: Consulta = {
            motivo,
            paciente,
            medico,
            status,
            data_consulta

        }
        await atualizar_ConsultaService(idAtu, consulta)

        const log: Logs = {
            acao: Acao.ATUALIZACAO,
            usuario: id
        }

        cadastrar_log(log)


        console.log("Consulta atualizado com sucesso")
    }
    catch (error) {
        console.log("errro ao atualizar Consulta", error)
    }
}