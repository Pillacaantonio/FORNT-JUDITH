export interface BaseResponse<T> {
  [x: string]: any;
  Success: any;
  Data(arg0: string, Data: any): unknown;
  Mensaje(arg0: string, Mensaje: any): unknown;

  isSucces: false,
  data: T,
  mensaje: string,
  innerExeption: any
}
