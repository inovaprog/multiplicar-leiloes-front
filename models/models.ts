export interface Imovel {
    id: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    valor1: number;
    valor2: number;
    data1: string;
    data2: string;
    tipo: string;
}

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    chave: string;
    contador: number;
    imoveis: string[];
}
