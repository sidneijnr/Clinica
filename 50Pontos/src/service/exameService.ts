import exame from "../model/Exame";
import { dbPromisse } from "../repository/bd";
import { atualizar_exame, cadastrar_exame } from "../repository/repo_exame";

export async function verificarExame(nome: string) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM exame WHERE nome = ?",
        nome
    );
    return validador
}



export async function verificar_id_Exame(id: number) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM exame WHERE id = ?",
        id
    );
    return validador
}


export async function cadastrar_exameService(exame: exame) {
    const existe = await verificarExame(exame.nome)

    if (!exame.descricao || !exame.nome) {
        throw new Error("TODOS OS CAMPOS DEVEM SER PREENCHIDOS");
    }

    else if (existe) {
        throw new Error("JÁ EXISTE UM EXAME COM ESSE NOME");
    }

    await cadastrar_exame(exame);
}


export async function atualizar_exameService(id: number, exame: exame) {
    const existe = await verificar_id_Exame(id);

    if (!existe) {
        throw new Error("EXAME NÃO ENCONTRADO");
    }

    exame.nome = exame.nome ? exame.nome : existe.nome;
    exame.descricao = exame.descricao ? exame.descricao : existe.descricao;

    await atualizar_exame(exame, id);
}

export async function excluit_exameService(id: number) {
    const existe = await verificar_id_Exame(id);

    if (!existe) {
        throw new Error("EXAME NÃO ENCONTRADO");
    }


}

