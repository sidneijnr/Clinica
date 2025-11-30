import Acao from "../../model/Acao";
import { atualizar_usuario, cadastrar_usuario } from "../../repository/repo_usuario";
import bcrypt from "bcryptjs";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import { atualizar_usuarioService } from "../../service/usuario_service";
import Paciente from "../../model/Paciente";
import { atualizar_PacienteService } from "../../service/paciente_service";

import PromptSync from "prompt-sync";
import { usuario_existe } from "../../service/logService";
const prompt = PromptSync();


export async function controller_atualizarPaciente() {
    try {
        console.log("---------------------------------- ATUALIZAR PACIENTE ----------------------------------")
        console.log("OBS: PARA NÃO ALTERAR UM CAMPO, DEIXE-0 EM BRANCO")
        const id: number = Number(prompt("ID do usuario que esta realizando a operação: "))
        const idAtu: number = Number(prompt("ID do paciente que sera atualizado: "))
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


        await atualizar_PacienteService(idAtu, paciente)

        const log: Logs = {
            acao: Acao.ATUALIZACAO,
            usuario: id
        }

        cadastrar_log(log)


        console.log("paciente atualizado com sucesso")
    }
    catch (error) {
        console.log("errro ao atualizar paciente", error)
    }
}