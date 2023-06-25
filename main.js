import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data(){
    return {
      shoesData: [
        { name: 'Nike Air Max', price: 1200000 },
        { name: 'Adidas Ultraboost', price: 1500000 },
        { name: 'Puma RS-X', price: 900000 },
        { name: 'Reebok Classic', price: 800000 },
        { name: 'Vans Old Skool', price: 700000 },
        { name: 'Converse Chuck Taylor', price: 600000 },
        { name: 'New Balance 574', price: 950000 },
        { name: 'Under Armour HOVR', price: 1100000 },
        { name: 'Skechers D\'Lites', price: 750000 },
        { name: 'ASICS Gel-Kayano', price: 1300000 }
      ],
      
      // [{name: shoeName, count:shoeCount, price:pricePerPcs}]
      selectedShoes: [],

      // priceTotal: 0,

      // required for handle form
      form: {
        selected: {},
        count: 0,
      },

      prices: [],
    }
  },

  methods: {
    addNewCartItem(){
      // jika count != 0
      if (this.form.count != 0 || this.form.count != "" ) {
        const idx = this.selectedShoes.findIndex((s) => s.name === this.form.selected.name);
        if (idx != -1){
          this.selectedShoes[idx].count += this.form.count;
        } else if (this.form.selected.name !== undefined) {
          this.selectedShoes.push(
            {
              count: this.form.count, 
              name: this.form.selected.name, 
              price: this.form.selected.price}
          );
          console.log(this.selectedShoes)
        }
      } else {
        // ketika count < 1
      }
    },

    addCartItem(name){
      const idx = this.selectedShoes.findIndex(s => s.name === name);
      if (idx != -1){
        this.selectedShoes[idx].count += 1;
      }
    },

    reduceCartItem(name){
      const idx = this.selectedShoes.findIndex(s => s.name === name);
      if (idx != -1){
        if (this.selectedShoes[idx].count > 1){
          this.selectedShoes[idx].count -= 1;
        } else {
          this.selectedShoes.splice(idx);
        }
      }
    },

    deleteCartItem(name){
      const idx = this.selectedShoes.findIndex(s => s.name === name);
      if (idx != -1){
        this.selectedShoes.splice(idx);
      }
    }
  },

  computed: {
    totalPrice(){
      if (this.selectedShoes.length > 0){
        this.prices = this.selectedShoes.map((s) => s.price)
          .sort()
          .reverse();
        
        const len = this.prices.length;
        if (len > 2) {
          return this.prices[1];
        } 
        return this.prices[0];
      }
      return 0;
    }
  }
}).mount('#app')
