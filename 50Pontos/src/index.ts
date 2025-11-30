import { cadastrar_exameController } from "./controller/exame/cad_exame";
import { cadastrar_pacienteController } from "./controller/paciente/cad_paciente";
import Consulta from "./model/Consulta";
import Usuario from "./model/Usuario";
import exame from "./model/Exame";
import Paciente from "./model/Paciente";

import { controller_cadUsuario } from "./controller/usuario/cad_usuario";
import { login } from "./service/login";
import { cadastrar_medicoController } from "./controller/medico/cad_medico";
import Medico from "./model/Medico";
import { cadastrar_constulaController } from "./controller/consulta/cad_consulta";
import Consulta_exame from "./model/Consulta_exame";
import { cadastrar_agendaController } from "./controller/agenda/cad_agenda";
import { controller_atualizarUsuario } from "./controller/usuario/atu_usuario";
import { controller_atualizarPaciente } from "./controller/paciente/atu_paciente";
import { controller_atualizarMedico } from "./controller/medico/atu_medico";
import { controller_atualizarExame } from "./controller/exame/atu_exame";
import { atualizar_ConsultaService } from "./service/consulta_service";
import { controller_atualizarConsulta } from "./controller/consulta/atu_consulta";
import { controller_atualizarAgenda } from "./controller/agenda/atu_agenda";
import { controller_listarUsuario, controller_selecionarUsuario } from "./controller/usuario/sele_usuario";
import { controller_listarPaciente, controller_selecionarPaciente } from "./controller/paciente/sele_paciente";
import { controller_listarMedicos, controller_selecionarMedico } from "./controller/medico/sele_medico";
import { controller_listarExames, controller_selecionarExame } from "./controller/exame/sele_exame";
import { controller_listarConsultas, controller_selecionarConsulta } from "./controller/consulta/sele_consulta";
import { controller_excluirUsuario } from "./controller/usuario/dele_usuario";
import { controller_excluirPaciente } from "./controller/paciente/dele_paciente";
import { controller_excluirMedico } from "./controller/medico/dele_medico";
import { controller_excluirExame } from "./controller/exame/dele_exame";
import { controller_excluirConsulta } from "./controller/consulta/dele_constulta";
import { cadastrar_consulta } from "./repository/repo_consulta";
import { controller_listarAgendas, controller_selecionarAgenda } from "./controller/agenda/sele_agenda";
import { controller_excluirAgenda } from "./controller/agenda/dele_agenda";
import PromptSync from "prompt-sync";
const prompt = PromptSync();








async function system() {
    let escolha: number = 0;

    while (escolha != 7) {
        console.log("------------Sistema de clínica médica--------------");
        console.log(
            "1 - USUÁRIOS\n" +
            "2 - PACIENTES\n" +
            "3 - MÉDICOS\n" +
            "4 - EXAMES\n" +
            "5 - CONSULTAS\n" +
            "6 - AGENDAS EXAMES\n" +
            "7 - SAIR"
        );

        escolha = Number(prompt("> "));
        if (escolha == 1) {
            console.log("------------CONTROLE DE USUÁRIO--------------");
            console.log(
                "1 - CADASTRAR USUÁRIO\n" +
                "2 - ATUALIZAR USUÁRIO\n" +
                "3 - EXCLUIR USUÁRIO\n" +
                "4 - LISTAR TODOS USUÁRIO\n" +
                "5 - PESQUISAR USUÁRIO PELO NOME\n" +
                "6 - SAIR"
            );

            let mov: number = Number(prompt("> "));

            switch (mov) {
                case 1: await controller_cadUsuario(); break;
                case 2: await controller_atualizarUsuario(); break;
                case 3: await controller_excluirUsuario(); break;
                case 4: await controller_listarUsuario(); break;
                case 5: await controller_selecionarUsuario(); break;
                case 6: console.log("voltando para o menu"); break;
            }
            const pergunta = prompt("Deseja continuar no menu de usuários? (s/n): ").toLowerCase();

            if (pergunta == "n") {
                console.log("Encerrando o sistema");
                break;
            }
        } else if (escolha == 2) {
            console.log("------------CONTROLE DE PACIENTE--------------");
            console.log(
                "1 - CADASTRAR PACIENTE\n" +
                "2 - ATUALIZAR PACIENTE\n" +
                "3 - EXCLUIR PACIENTE\n" +
                "4 - LISTAR TODOS PACIENTES\n" +
                "5 - PESQUISAR PACIENTE PELO NOME\n" +
                "6 - SAIR"
            );

            let mov: number = Number(prompt("> "));



            switch (mov) {
                case 1: await cadastrar_pacienteController(); break;
                case 2: await controller_atualizarPaciente(); break;
                case 3: await controller_excluirPaciente(); break;
                case 4: await controller_listarPaciente(); break;
                case 5: await controller_selecionarPaciente(); break;
                case 6: console.log("voltando para o menu"); break;
            }
            const pergunta = prompt("Deseja continuar no menu de usuários? (s/n): ").toLowerCase();

            if (pergunta == "n") {
                console.log("Encerrando o sistema");
                break;
            }
        }
        else if (escolha == 3) {
            console.log("------------CONTROLE DE MÉDICO--------------");
            console.log(
                "1 - CADASTRAR MEDICO\n" +
                "2 - ATUALIZAR MEDICO\n" +
                "3 - EXCLUIR MEDICO\n" +
                "4 - LISTAR TODOS MEDICOS\n" +
                "5 - PESQUISAR MEDICO PELO NOME\n" +
                "6 - SAIR"
            );

            let mov: number = Number(prompt("> "));



            switch (mov) {
                case 1: await cadastrar_medicoController(); break;
                case 2: await controller_atualizarMedico(); break;
                case 3: await controller_excluirMedico(); break;
                case 4: await controller_listarMedicos(); break;
                case 5: await controller_selecionarMedico(); break;
                case 6: console.log("voltando para o menu"); break;
            }
            const pergunta = prompt("Deseja continuar no menu de usuários? (s/n): ").toLowerCase();
            if (pergunta == "n") {
                console.log("Encerrando o sistema");
                break;
            }

        }
        else if (escolha == 4) {
            console.log("------------CONTROLE DE EXAME--------------");
            console.log(
                "1 - CADASTRAR EXAME\n" +
                "2 - ATUALIZAR EXAME\n" +
                "3 - EXCLUIR EXAME\n" +
                "4 - LISTAR TODOS EXAMES\n" +
                "5 - PESQUISAR EXAMES PELO NOME\n" +
                "6 - SAIR"
            );

            let mov: number = Number(prompt("> "));



            switch (mov) {
                case 1: await cadastrar_exameController(); break;
                case 2: await controller_atualizarExame(); break;
                case 3: await  controller_excluirExame(); break;
                case 4: await controller_listarExames(); break;
                case 5: await controller_selecionarExame(); break;
                case 6: console.log("voltando para o menu"); break;
            }
            const pergunta = prompt("Deseja continuar no menu de usuários? (s/n): ").toLowerCase();
            if (pergunta == "n") {
                console.log("Encerrando o sistema");
                break;
            }

        }
        else if (escolha == 5) {
            console.log("------------CONTROLE DE CONSULTA--------------");
            console.log(
                "1 - CADASTRAR CONSULTA\n" +
                "2 - ATUALIZAR CONSULTA\n" +
                "3 - EXCLUIR CONSULTA\n" +
                "4 - LISTAR TODAS CONSULTAS\n" +
                "5 - PESQUISAR CONSULTA PELO ID\n" +
                "6 - SAIR"
            );

            let mov: number = Number(prompt("> "));



            switch (mov) {
                case 1: await cadastrar_constulaController(); break;
                case 2: await controller_atualizarConsulta(); break;
                case 3: await controller_excluirConsulta(); break;
                case 4: await controller_listarConsultas(); break;
                case 5: await controller_selecionarConsulta(); break;
                case 6: console.log("voltando para o menu"); break;
            }
            const pergunta = prompt("Deseja continuar no menu de usuários? (s/n): ").toLowerCase();
            if (pergunta == "n") {
                console.log("Encerrando o sistema");
                break;
            }
        }

        else if (escolha == 6) {
            console.log("------------ CONTROLE DE HISTORICO EXAMES --------------");
            console.log(
                "1 - MARCAR EXAME\n" +
                "2 - ATUALIZAR MARCAÇÃO DE EXAME\n" +
                "3 - EXCLUIR EXAME MARCADO\n" +
                "4 - LISTAR TODOS EXAMES MARCADOS\n" +
                "5 - PESQUISAR EXAMES MARCADOS PELO ID\n" +
                "6 - SAIR"
            );
            
            let mov: number = Number(prompt("> "));
            

            switch (mov) {
                case 1: await cadastrar_agendaController(); break;
                case 2: await controller_atualizarAgenda(); break;
                case 3: await controller_excluirAgenda(); break;
                case 4: await controller_listarAgendas(); break;
                case 5: await controller_selecionarAgenda(); break;
                case 6: console.log("voltando para o menu"); break;
            }
            const pergunta = prompt("Deseja continuar no menu de usuários? (s/n): ").toLowerCase();
            if (pergunta == "n") {
                console.log("Encerrando o sistema");
                break;
            }
        }
    }
}

system();