module.exports = {
  order: {
    items: {
      item: {
        name: function () { return this.name },
        price: function () { return this.price },
        quantity: function () { return this.quantity }
      }
    }
  }
}
