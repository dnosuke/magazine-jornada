import create from 'zustand';
import { devtools, persist } from 'zustand/middleware'



interface IUserState {
  email: string;
  userLogin: (email: string) => void;
  userLogout: () => void;
}

const userRegister = create<IUserState>()(
  devtools(
    persist((set) => ({
      email: '',
      userLogin: (email) => {
        set((_state) => ({
          email: email
        }));
      },     
      userLogout: () => {
        set((_state) => ({
          email: ""
        }));
      },     
    })
    )
  )
);

export default userRegister;