module.exports = ({data: {order, address}, template: {name}}) => ({
  params: {
    email: {
      to: address,
      from: 'support@example.com',
      subject: `Please confirm your order (${order.orderNumber})`
    }
  },
  htmlToText: {
    format: {
      heading: function (node, fn, options) {
          var h = fn(elem.children, options);
          return '====\n' + h.toUpperCase() + '\n====';
      }
    }
  },
  directives: {
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
})
