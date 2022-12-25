export interface product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
}
export interface cart{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  description:string,
  id:number| undefined,
  quantity:undefined | number,
  productId:number,
  userId:number
}
export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}

export interface order {
  email:string,
  address:string,
  contact:string,
  totalPrice:number,
  userId:string,
  id:number|undefined
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
