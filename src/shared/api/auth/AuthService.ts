import { Product } from "../../../types/product";
import { IUser } from "../../../types/user";
import { Api } from "../axios-config";

interface IAuth {
  
    token: string;
}

const validateToken = async (token: IAuth) => {
  const { data } = await Api.post('/validate', { token });
  return data;
}
const getAll = async () => {
  const { data } = await Api.get('/product');
  return data as Product[];
}
const signUp = async (user: IUser) => {
  const { userType, name, email, password, profilePicture } = user;
  const { data } = await Api.post('/user',  { userType, name, email, profilePicture, password } );
  console.log(data);
  
  return data;
}
const resgisterProduct = async (product: Product) => {
  const { title, description, quantity, price, picture } = product;
  const { data } = await Api.post('/product',  { title, description, quantity, price, picture } );
  console.log(data);
  
  return data;
}
const removeProduct = async (id: number) => {
  const { data } = await Api.delete(`/product/${id}/delete`);
  console.log(data);
}
const updateProduct = async (product: Product) => {
  const { id, title, description } = product;
  const { data } = await Api.put(`/product/${id}/update`, { title, description });
  console.log(data);
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post('/login', { email: email, password: password });

    if (data){
  console.log(data)

      return data;
    }

    return new Error('Erro no login.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
}

export const AuthService = {
  auth,
  validateToken,
  getAll,
  signUp,
  resgisterProduct,
  removeProduct,
  updateProduct,
};