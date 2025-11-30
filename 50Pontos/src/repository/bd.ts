import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const dbPromisse = open({
    filename: "database.sqlite",
    driver: sqlite3.Database
});

export async function dbInit() {
    const db = await dbPromisse;

    await db.exec(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS usuario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            senha TEXT,
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS paciente (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            idade INTEGER,
            sexo TEXT,
            cpf TEXT
        );

        CREATE TABLE IF NOT EXISTS medico (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            especialidade TEXT,
            crm TEXT
        );

        CREATE TABLE IF NOT EXISTS consulta (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            motivo TEXT,
            id_paci INTEGER,
            id_medi INTEGER,
            status TEXT,
            data_consulta TEXT,
            FOREIGN KEY (id_paci) REFERENCES paciente(id),
            FOREIGN KEY (id_medi) REFERENCES medico(id)
        );

        CREATE TABLE IF NOT EXISTS exame (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            descricao TEXT
        );

        CREATE TABLE IF NOT EXISTS consulta_exame (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_consul INTEGER,
            id_exame INTEGER,
            FOREIGN KEY (id_consul) REFERENCES consulta(id),
            FOREIGN KEY (id_exame) REFERENCES exame(id)
        );

        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            acao TEXT CHECK(acao IN ('CRIACAO', 'EXCLUSAO', 'ATUALIZACAO')) NOT NULL,
            data DATETIME DEFAULT CURRENT_TIMESTAMP,
            id_usuario INTEGER,
            FOREIGN KEY (id_usuario) REFERENCES usuario(id)
        );
    `);
}

async function start() {
    await dbInit(); 
   


}

start();



