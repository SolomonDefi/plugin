import { reactive, computed, watch } from 'vue';

const storeName = 'solomon-cart-store';

const state = reactive(
  localStorage.getItem(storeName)
    ? JSON.parse(localStorage.getItem(storeName))
    : {
      items: [],
      checkoutStatus: null,
    },
);

watch(state, value => localStorage.setItem(storeName, JSON.stringify(value)));

export default () => ({
  items: computed(() => (
    [...state.items]
  )),
  quantity: computed(() => (
    state.items.length
  )),
  totalPrice: computed(() => (
    state.items.reduce((total, product) => (
      total + (product.price * product.quantity)
    ), 0)
  )),
  checkout: (_products) => {
    // const savedCartItems = [...state.items];
    state.checkoutStatus = null;
    // empty cart
    // state.items('setItems', { items: [] })
    // TODO -- make purchase
  },
  addItem: (item, product) => {
    state.checkoutStatus = null;
    if(product.stock > 0) {
      const cartItem = state.items.find(item => item.id === product.id);
      if(!cartItem) {
        state.items = [{ quantity: 1, ...item }, ...state.items];
      } else {
        cartItem.quantity += 1;
      }
    }
  },
  setQuantity: (id, quantity) => {
    state.checkoutStatus = null;
    if(quantity === 0) {
      state.items = state.items.filter(item => item.id !== id);
    } else {
      const cartItem = state.items.find(item => item.id === id);
      if(cartItem) {
        cartItem.quantity = quantity;
      }
    }
  },
});
