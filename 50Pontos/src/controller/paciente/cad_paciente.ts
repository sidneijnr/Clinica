import Acao from "../../model/Acao";
import Logs from "../../model/Logs";
import Paciente from "../../model/Paciente";
import Usuario from "../../model/Usuario";
import { cadastrar_log } from "../../repository/repo_log";
import { usuario_existe } from "../../service/logService";
import { cadastrarPacienteService } from "../../service/paciente_service";
import PromptSync from "prompt-sync";
const prompt = PromptSync();

export async function cadastrar_pacienteController() {
    try {
        console.log("---------------------------------- CADASTRAR PACIENTE ----------------------------------")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const nome: string = prompt("Nome do Paciente: ")
        const idade: number = Number(prompt("Idade do paciente: "))
        const sexo: string = prompt("Sexo do paciente: ")
        const cpf: string = prompt("CPF do paciente: ")

         usuario_existe(id)

        const paciente: Paciente = {
            nome,
            idade,
            sexo,
            cpf
        }

       

        await cadastrarPacienteService(paciente)
        console.log("paciente cadastrado com sucesso")

        const log: Logs = {
            acao: Acao.CRIACAO,
            usuario: id
        }

        cadastrar_log(log)
    }
    catch (error) {
        console.log("errro ao cadastrar paciente", error)
    }
}