import { menuArray } from './data.js'

const menuEl = document.getElementById('menu')
const cartEl = document.getElementById('cart')
const paymentEl = document.getElementById('payment')
const paymentForm = document.getElementById('payment-form')
let itemsOrdered = []

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('plus')) {
    handleAddToCartClick(e.target.dataset.itemId)
  }
  if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove)
  }
  if (e.target.dataset.close) {
    closePaymentForm()
  }
  if (e.target.dataset.placeOrder) {
    showPaymentForm()
  }
  if (e.target.dataset.pay) {
    handlePayClick()
  }
})

renderMenu()

function renderMenu() {
  let menuHtml = ''
  menuArray.forEach(function (item) {
    menuHtml += `
  <div class="menu-item">
          <div class="item-img">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="item-info">
            <h3>${item.name} ${item.emoji}</h3>
            <p>${item.ingredients.join(', ')}</p>
            <p>$${item.price}</p>
          </div>
          <div class="item-action">
            <button class="plus" data-item-id="${item.id}">+</button>
            <p>Add to Cart</p>
          </div>
    </div>
    <div class="divider"></div>`
  })
  menuEl.innerHTML = menuHtml
}

function handleAddToCartClick(itemId) {
  const targetItemObj = menuArray.filter(function (item) {
    return item.id === Number(itemId)
  })[0]
  itemsOrdered.push(targetItemObj)
  renderCart()
}

function handleRemoveClick(itemId) {
  const isMatch = itemsOrdered.findIndex(function (item) {
    return item.id === Number(itemId)
  })
  itemsOrdered.splice(isMatch, 1)
  renderCart()
}

function renderCart() {
  let cartHtml = ''
  let orderTotal = 0
  itemsOrdered.forEach(function (item) {
    orderTotal += item.price
    cartHtml += `
      <li>
        <p>${item.name}</p>
            <button class="remove-item" data-remove="${item.id}">remove</button>
        <p>$ ${item.price}</p>
      </li>`
  })
  if (itemsOrdered.length >= 2) {
    orderTotal = (orderTotal * 0.85).toFixed(2)
  }
  cartEl.innerHTML = `
    <h2>Your Order</h2>
      <p class="discount">2 or more items get 15% off!</p>
      <ul class="cart-items">`
  cartEl.innerHTML += cartHtml

  cartEl.innerHTML += `
    <div class="divider-total"></div>
    <li>
      <p class="total-price">Total price</p>
      <p>$ ${orderTotal}</p>
    </li>
  </ul>
  <button class="big-button" data-place-order="complete">PLACE ORDER</button>`
}

function handlePayClick() {
  paymentForm.addEventListener('submit', function (e) {
    e.preventDefault()
    document.body.classList.remove('active-payment')
    paymentEl.style.display = 'none'
    const nameInput = document.getElementById('name')
    const customerName = nameInput.value
    showPaymentCompletion(customerName)
  })
}

function showPaymentCompletion(customerName) {
  cartEl.innerHTML = `
    <div class="thank-you-msg">
      <p>Thank you, ${customerName}! Your order is on its way!</p>
    </div>`
}

function closePaymentForm() {
  paymentEl.style.display = 'none'
  document.body.classList.remove('active-payment')
}

function showPaymentForm() {
  paymentEl.style.display = 'flex'
  document.body.classList.add('active-payment')
}
