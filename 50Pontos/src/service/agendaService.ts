import Consulta_exame from "../model/Consulta_exame";
import exame from "../model/Exame";
import { dbPromisse } from "../repository/bd";
import { atualizar_consultaExame, cadastrar_agendaExame, deletar_consultaExame } from "../repository/repo_agendarExame";

export async function verificar_consulta(id: number) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM consulta WHERE id = ?",
        id
    );
    return validador
}


export async function verificar_exame(id: number) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM exame WHERE id = ?",
        id
    );
    return validador
}

export async function verificar_id_agenda(id: number) {
    const db = await dbPromisse;
    const validador = await db.get(
        "SELECT * FROM consulta_exame WHERE id = ?",
        id
    );
    return validador
}





export async function cadastrar_agendaService(agenda: Consulta_exame) {
    const vali_consulta = await verificar_consulta(agenda.id_consul)
    const vali_exame = await verificar_exame(agenda.id_exame)
    if (!agenda.id_consul || !agenda.id_exame) {
        throw new Error("TODOS OS CAMPOS DEVEM SER PREENCHIDOS");
    }

    else if (!vali_consulta) {
        throw new Error("NÃO EXISTE ESSA CONSULTA");
    }

    else if (!vali_exame) {
        throw new Error("NÃO EXISTE ESSE EXAME");
    }

    else {
        cadastrar_agendaExame(agenda)
    }
}


export async function atualizar_agendaService(idAtu: number, agenda: Consulta_exame) {

    const vali_consulta_exame = await verificar_id_agenda(idAtu);

    if (!vali_consulta_exame) {
    throw new Error("ESSA AGENDA NÃO EXISTE");
}


    agenda.id_consul = (agenda.id_consul === 0 || agenda.id_consul == null) ? vali_consulta_exame.id_consul : agenda.id_consul
    agenda.id_exame =   ( agenda.id_exame == null || agenda.id_exame== 0)? vali_consulta_exame.id_exame : agenda.id_exame
    const vali_consulta = await verificar_consulta(agenda.id_consul);

    const vali_exame = await verificar_exame(agenda.id_exame);

    await atualizar_consultaExame(agenda, idAtu)

}



export async function excluir_agendaService(id: number) {
    const existe = await verificar_id_agenda(id);
    if (!existe) {
        throw new Error("AGENDA NÃO ENCONTRADA");
    }
    await deletar_consultaExame(id);
}