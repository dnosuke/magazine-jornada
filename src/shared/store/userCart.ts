import create from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { Product } from '../../types/product';

export type CartItemType = {
  item: Product;
  quantity: number;
}

interface ICartState {
  cart: CartItemType[];
  addProduct: (item: CartItemType) => void;
  remove: (productId:number) => void;
  increase: (productId:number) => void;
  decrease: (productId:number) => void;
}

const userCartStore = create<ICartState>()(
  devtools(
    persist((set) => ({
      cart: [],
      addProduct: (product) => {
        set((state) => ({
          cart: [...state.cart, product]
        }))
      },
      remove: (productId) => {
        set((state) => ({
            cart: state.cart.filter((c) => c.item.id !== productId)
        }))
      },
      increase: (productId) => {
        set((state) => ({
          cart: state.cart.map(item => {
          if(productId === item.item.id){
            return {...item, quantity: item.quantity + 1}
          }else{
            return {...item}
          } 
          })
        }));
      },
      decrease: (productId) => {
        set((state) => ({
          cart: state.cart.map(item => {
          if(productId === item.item.id && item.quantity > 1){
            return {...item, quantity: item.quantity - 1}
          }else{
            return {...item}
          } 
          })
        }));
      },
    })
    )
  )
);

export default userCartStore;
