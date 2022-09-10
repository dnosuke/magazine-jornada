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
  const { data } = await Api.get('/api/');
  return data;
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

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post('/user/login', { email, password });

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
};