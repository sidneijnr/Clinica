import promptSync from "prompt-sync";
import Acao from "../../model/Acao";
import Usuario from "../../model/Usuario";
import { cadastrar_usuario } from "../../repository/repo_usuario";
import bcrypt from "bcryptjs";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import { cadastrar_usuarioService } from "../../service/usuario_service";
import { usuario_existe } from "../../service/logService";

const prompt = promptSync({ sigint: true });

export async function controller_cadUsuario() {
    try {
        console.log("\n=== CADASTRO DE USUÁRIO ===");

        const nome = prompt("Nome: ");
        const email = prompt("Email: ");
        const senha = prompt("Senha: ");
        const id = Number(prompt("ID do usuário que fez a ação: "));

        usuario_existe(id);

        const usuario: Usuario = {
            nome,
            email,
            senha
        };

        const hash = await bcrypt.hash(usuario.senha, 10);
        usuario.senha = hash;

        await cadastrar_usuarioService(usuario);

        const log: Logs = {
            acao: Acao.CRIACAO,
            usuario: id
        };

        cadastrar_log(log);

        console.log("Usuario cadastrado com sucesso");
    }
    catch (error) {
        console.log("erro ao cadastrar usuario", error);
    }
}



