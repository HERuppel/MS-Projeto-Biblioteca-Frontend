export interface IBook {
  id: string
  nome: string
  autor: string
  editora: string
  edicao: string
  paginas: number
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

export interface IClient {

}
