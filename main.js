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
      
      prices: [],
      totalPrice: 0,

      // untuk menampung data dari form
      form: {
        selected: {},
        count: 0,
      },

    }
  },

  methods: {
    countPrices(){
      if (this.selectedShoes.length > 0){
        this.prices = this.selectedShoes.map((s) => s.price);

        console.log(this.prices)
        
        let unique = [...new Set(this.prices)]
        .sort()
        .reverse();
        console.log("count price di jalankan");
        
        const len = unique.length;
        if (len > 2) {
          this.totalPrice = unique[1];
        } 
        this.totalPrice = unique[0];
      } else {
        this.totalPrice = 0;
      }
    },

    addNewCartItem(){
      // validasi data
      if (this.form.count > 0 ) {

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
        }
      }
      this.countPrices();
    },

    addCartItem(name){
      const idx = this.selectedShoes.findIndex(s => s.name === name);
      if (idx != -1){
        this.selectedShoes[idx].count += 1;
      }
      this.countPrices();
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
      this.countPrices();
    },

    deleteCartItem(name){
      const idx = this.selectedShoes.findIndex(s => s.name === name);
      if (idx != -1){
        this.selectedShoes.splice(idx);
      }
      this.countPrices();
    },
  },

  computed: {
    countTotal(){
      let total = 0;
      let counts = this.selectedShoes.map(s => s.count);
      counts.forEach(c => total+=c);
      return total;
    },
  }

}).mount('#app')
