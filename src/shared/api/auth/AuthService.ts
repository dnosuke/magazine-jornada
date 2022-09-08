import { Api } from "../axios-config";

interface IAuth {
  data : {
    Token: string;
  }
}

const validateToken = async (token: IAuth) => {
  const { data } = await Api.post('/validate', { data: token });
  return data;
}
const getAll = async () => {
  const { data } = await Api.get('/api/Tourist?page=2');
  return data;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post('/api/authaccount/login', { email, password });

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
};