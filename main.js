const shoeData = [
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
];

const purchaseForm = document.getElementById('purchaseForm');
const shoeSelect = document.getElementById('shoeSelect');
const selectedShoesContainer = document.getElementById('selectedShoes');
const topPricesList = document.getElementById('topPricesList');
const selectedShoes = [];

// Menampilkan daftar harga sepatu
function showShoePrices() {
  const priceListElement = document.getElementById('priceList');

  // Menghapus konten sebelumnya
  priceListElement.innerHTML = '';

  shoeData.forEach(shoe => {
    const listItem = document.createElement('li');
    listItem.textContent = `${shoe.name} - Rp ${shoe.price.toLocaleString('id-ID')}`;
    priceListElement.appendChild(listItem);

    // Menambahkan opsi sepatu ke form pembelian
    const option = document.createElement('option');
    option.value = shoe.price;
    option.textContent = shoe.name;
    shoeSelect.appendChild(option);
  });
}

// Memperbarui pilihan sepatu pada form pembelian
function updateShoeOptions(options) {
  shoeSelect.innerHTML = '';

  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.price;
    optionElement.textContent = option.name;
    shoeSelect.appendChild(optionElement);
  });
}

// Menampilkan sepatu yang telah dipilih
function showSelectedShoes() {
  selectedShoesContainer.innerHTML = '';

  selectedShoes.forEach((shoe, index) => {
    const selectedShoeDiv = document.createElement('div');
    selectedShoeDiv.classList.add('selected-shoe');

    const selectedShoeName = document.createElement('div');
    selectedShoeName.classList.add('selected-shoe-name');
    selectedShoeName.textContent = shoe.name;

    const selectedShoePrice = document.createElement('div');
    selectedShoePrice.classList.add('selected-shoe-price');
    selectedShoePrice.textContent = `Rp ${shoe.price.toLocaleString('id-ID')}`;

    const removeButton = document.createElement('div');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = '&#10060;';
    removeButton.addEventListener('click', () => {
      selectedShoes.splice(index, 1);
      showSelectedShoes();
    });

    selectedShoeDiv.appendChild(selectedShoeName);
    selectedShoeDiv.appendChild(selectedShoePrice);
    selectedShoeDiv.appendChild(removeButton);

    selectedShoesContainer.appendChild(selectedShoeDiv);
  });
}

// Memperbarui tampilan harga 2 terbesar
function updateTopPrices() {
  if (selectedShoes.length >= 4) {
    const topPrices = selectedShoes
      .sort((a, b) => b.price - a.price)
      .slice(1, 3);

    topPricesList.innerHTML = '';

    // penerapan perulangan berdasarkan anggota dari topPrices
    topPrices.forEach(price => {
      const listItem = document.createElement('li');
      listItem.textContent = `Rp ${price.price.toLocaleString('id-ID')}`;
      topPricesList.appendChild(listItem);
    });
  } else {
    topPricesList.innerHTML = '';
  }
}

// Memperbarui pilihan sepatu saat halaman dimuat
window.addEventListener('load', function () {
  showShoePrices();
});

// Menangani submit form pembelian
purchaseForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const selectedShoeIndex = shoeSelect.selectedIndex;
  const selectedShoe = shoeData[selectedShoeIndex];

  selectedShoes.push(selectedShoe);
  showSelectedShoes();

  // Menampilkan pilihan sepatu gratis yang tersisa
  const remainingOptions = shoeData.filter(shoe => !selectedShoes.includes(shoe));
  updateShoeOptions(remainingOptions);

  updateTopPrices();

  // Mereset form pembelian
  purchaseForm.reset();
});
