//bookmarkify:
//  $ npm install
//  $ node_modules/.bin/uglify rearrange-pick-ticket.js | sed -e 's/^/javascript:(/' -e 's/;*$/)();/'
(window.fixpickticket = function() {
  var mkarr = function(coll) { return Array.prototype.slice.call(coll) }
  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  var strongs = mkarr(document.getElementsByTagName("strong"))
  var customerStrongs = strongs.filter(function(e) { return "Customer:" == e.innerText })
  var orders = customerStrongs.map(function(e) { return {cust: e} })
  var orderContainer = undefined;
  orders.forEach(function(order) {
    var orderEl = order.cust.parentElement.parentElement
    var custNumEl = order.cust.nextElementSibling
    var orderStrongs = mkarr(orderEl.getElementsByTagName("strong"))
    var productEl = orderStrongs.filter(function(e) { return "Product:" == e.innerText })[0]
    if (orderContainer === undefined) orderContainer = orderEl.parentElement
    custNumEl.style.cssText = "font-weight: bold; font-size: large; border: solid 1px black"
    order.html = orderEl.outerHTML
    order.custNum = parseInt(custNumEl.innerText)
    order.product = productEl === undefined ? "unknown" : productEl.nextSibling.textContent
    orderEl.remove()
  })
  var ordersByProduct = groupBy(orders, "product")
  var newHtml = []
  Object.keys(ordersByProduct).forEach(function(k) {
    newHtml.push("<h2>" + k + "</h2>")
    ordersByProduct[k].sort(function(a,b){return a.custNum - b.custNum}).forEach(function(order) {
      newHtml.push(order.html.replace(/&amp;#9634/, "&#9634;"))
    })
  })
  orderContainer.innerHTML += newHtml.join("")
//  window.mab = {obp: ordersByProduct, pel: orderContainer}
})
