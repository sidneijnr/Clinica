import Acao from "../../model/Acao";
import Usuario from "../../model/Usuario";
import { atualizar_usuario, cadastrar_usuario, listar_usuarioId } from "../../repository/repo_usuario";
import bcrypt from "bcryptjs";
import Logs from "../../model/Logs";
import { cadastrar_log } from "../../repository/repo_log";
import { atualizar_usuarioService } from "../../service/usuario_service";
import PromptSync from "prompt-sync";
import { usuario_existe } from "../../service/logService";

const prompt = PromptSync();

export async function controller_atualizarUsuario() {
    try{
       
        console.log("\n--- ATUALIZAÇÃO DE USUÁRIO ---");
        console.log("OBS: PARA NÃO ALTERAR UM CAMPO, DEIXE-0 EM BRANCO")
        const idAtu: number = Number(prompt("ID do usuário que será atualizado: "));
        const id: number = Number(prompt("ID do usuário que esta realizando o processo: "));

        usuario_existe (id);

        const nome = prompt("Nome: ");
        const email = prompt("Email: ");
        const senha = prompt("Senha: ");
        
        

        const usuario: Usuario = {
         nome,
         email,
         senha
        }

       
        const hash = await bcrypt.hash(usuario.senha, 10);
        
               
        usuario.senha = hash;

        
         await atualizar_usuarioService(idAtu,usuario)

         const log: Logs={
            acao: Acao.ATUALIZACAO,
            usuario:id
         }

        cadastrar_log(log)


        console.log("Usuario atualizado com sucesso")
    }
    catch(error){
           console.log("errro ao atualizar usuario", error)
    }
}