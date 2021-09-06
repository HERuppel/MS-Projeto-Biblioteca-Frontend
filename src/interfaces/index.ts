export interface IBook {
  id?: string
  nome: string
  autor: string
  editora: string
  edicao: string
  paginas: number
  cdd: number
  qtdAtual: number
  qtdEstoque: number
}

export interface IBookList {
  values: IBook[];
  page: number;
}

export interface IResponse {
  success: boolean
  message: string
  data?: any
}

export interface IEmployee {
  situacao: number
  id?: string
  nome: string
  email: string
  telefone: string
  cpf: string
  nascimento: string
  grupousuario: string
  senha?: string
}

export interface IEmployeeList {
  values: IEmployee[];
  page: number;
}
