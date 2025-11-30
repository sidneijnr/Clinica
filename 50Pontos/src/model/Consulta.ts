export default interface Consulta{
    id?: number,
    motivo: string,
    paciente: number,
    medico: number,
    status: string,
    data_consulta: Date | string

}