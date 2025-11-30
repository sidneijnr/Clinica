import acao from "../../model/Acao.ts";
import Consulta from "../../model/Consulta.ts";
import Logs from "../../model/Logs.ts";
import { cadastrar_log } from "../../repository/repo_log.ts";
import { cadastrar_ConsultaService } from "../../service/consulta_service.ts";
import PromptSync from "prompt-sync";
import { usuario_existe } from "../../service/logService.ts";
const prompt = PromptSync();


export async function cadastrar_constulaController() {
    try {
        console.log("---------------------------------- CADASTRAR CONSULTA ----------------------------------")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const motivo: string = prompt("Motivo da consulta: ")
        const paciente: number = Number(prompt("ID do paciente: "))
        const medico: number = Number(prompt("ID do médico que realizara a consuta: "))
        const status: string = prompt("Status da consulta: ")
        const entradaData = prompt("Digite a data (formato: YYYY-MM-DD): ");
        const data_consulta: Date = new Date(entradaData);


        usuario_existe (id)

        const consulta: Consulta = {
            motivo,
            paciente,
            medico,
            status,
            data_consulta

        }

        await cadastrar_ConsultaService(consulta)

        const log: Logs = {
            acao: acao.CRIACAO,
            usuario: id
        }

        cadastrar_log(log)

        console.log("consulta cadastrado com sucesso")
    }
    catch (error) {
        console.log("errro ao consulta consulta", error)
    }
}