;(function (doc, win) {
  var docEI = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientataionchange" : "resize",
    recalc = function () {
      var clientWidth = docEI.clientWidth
      if (!clientWidth) return
      //100是字体大小，1536是开发时浏览器窗口的宽度，等比计算
      const size = 100 * (clientWidth / 1920)
      docEI.style.fontSize = `${size < 80 ? 80 : size}px`
    }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener("DOMContentLoaded", recalc, false)

  doc.addEventListener("DOMContentLoaded", (event) => {
    doc.addEventListener("contextmenu", (event) => {
      event.preventDefault()
    })
  })

})(document, window)
