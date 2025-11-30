import { listar_exame, listar_exameId } from "../../repository/repo_exame"
import PromptSync from "prompt-sync";
const prompt = PromptSync();

export async function controller_listarExames() {
    try {
     console.log("---------------------------------- LISTAR EXAME ----------------------------------")
        const exames = await listar_exame()
        console.table(exames)
    } catch (error) {
        console.log("errro ao listar exames", error)
    }
}


export async function controller_selecionarExame() {
    try {
        console.log("---------------------------------- SELECIONAR EXAME POR NOME ----------------------------------")
        const nome: string = prompt("nome do médico que deseja pesquisar: ")
        const exame = await listar_exameId(nome)
        console.table(exame)
    } catch (error) {
        console.log("errro ao listar exame", error)
    }
}