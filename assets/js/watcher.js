(function (window, WsRpc) {
  var cli = new WsRpc()

  cli.export({
    'reload': function (result) {
      result()
      console.log('Reload should happen')
      window.location.reload()
    }
  })
  cli.connect('ws://' + window.location.host + '/.httpServe/_reload/ws')
  cli.onopen = function () {
    cli.call('watch', window.location.pathname).then(function (res) {
      console.log('Watching:', res)
    })
    // Find all src and request a watch too
    var elList = document.querySelectorAll('img[src]')
    for (var i = 0; i < elList.length; i++) {
      var toWatch = window.location.pathname
      toWatch = toWatch.substring(0, toWatch.lastIndexOf('/'))
      toWatch += '/' + elList[i].getAttribute('src')
      cli.call('watch', toWatch).then(function (res) {
        console.log('Watching:', toWatch)
      })
    }
  }
})(window, WsRpc)
