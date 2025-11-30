import { listar_usuario, listar_usuarioId } from "../../repository/repo_usuario";
import PromptSync from "prompt-sync";
const prompt = PromptSync()
export async function controller_listarUsuario() {
    try {
        console.log("---------------------------------- SLISTA DE USUARIOS ----------------------------------")
        const usuarios = await listar_usuario()
        console.table(usuarios)
    } catch (error) {
        console.log("errro ao listar usuarios", error)
    }
}


export async function controller_selecionarUsuario(){
    try{
        console.log("-- Listar Usuário Pelo nome --")
        const nome: string = prompt("nome do usuário que deseja pesquisar: ")
        const usuario = await listar_usuarioId(nome)
        console.table(usuario)
    } catch (error){
         console.log("errro ao listar usuario", error)
    }
}