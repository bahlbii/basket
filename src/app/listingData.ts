export interface product {
  productId: undefined | number;
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: undefined | number;
}
export interface cart{
  id: number,
  name: string,
  price: number,
  image: string,
  quantity:undefined | number,
  productId:number,
  userId:number,
  currency: string,
}
export interface calculateTotalPrice{
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number
}

export interface order {
  email:string,
  address:string,
  contact:string,
  user_id: string,
  order_id: number,
}
export interface signUp {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: string;
  password: string;
}
