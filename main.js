;'use strict';

window.smallUrl = 'http://zenkeistudiodebug.blob.core.windows.net/takaryoudebug/media/carimages/small/';
window.largeUrl = 'http://zenkeistudiodebug.blob.core.windows.net/takaryoudebug/media/carimages/large/';

window.timer = null;

window.onload = function() {
  loadImages();

  $(window).scroll(function(event) {
    var scrolltop = $(window).scrollTop();
    if (scrolltop < 0 || scrolltop > 19250) {
      return;
    }

    var num = ('00000' + (Math.floor(scrolltop/50) + 816)).slice(-5);
    var url = window.smallUrl + 'img_' + num + '.jpg';
    $('#video-holder > img').attr({'src': url});

    if (window.timer !== null) {
      window.clearTimeout(window.timer);
      window.timer = null;
    }
    window.timer = window.setTimeout(function() {
      window.timer = null;
      var scrolltop = $(window).scrollTop();
      if (scrolltop < 0 || scrolltop > 19250) {
        return;
      }
      var num = ('00000' + (Math.floor(scrolltop/50) + 816)).slice(-5);
      var url = window.largeUrl + 'img_' + num + '.jpg';
      $('#video-holder > img').attr({'src': url});
    }, 500);

    event.preventDefault();
  });

  $('html, body').on('dblclick', function() {
    var target = 0;
    if ($(window).scrollTop() < 9625) {
      target = 19250;
    }
    $(this).animate({
      scrollTop: target 
    }, 5000);
  });

  $(window).scrollTop(0);
};

window.loadImages = function() {
  // インスタンスを作成
  var manager = new LoadManager();

  // 読み込みたい画像を登録
  var url = '';
  var num = 0;
  for (var i = 816; i <= 1200; i++) {
    num = ('00000' + i).slice(-5);
    url = window.smallUrl + 'img_' + num + '.jpg';
    manager.add(url);
  }

  // 読み込み進行中
  manager.onProgress = function (event) {
    // パーセンテージが取得できる
    $('#progress').text(Math.floor(manager.getPercent() * 100) + '%');
  };

  // 読み込み完了
  manager.onComplete = function(event){
    $('<img></img>')
      .attr({
        'src': (window.smallUrl + 'img_00816.jpg'),
        'width': 1280,
        'height': 720
      })
    .css({
      'position': 'fixed',
      'width': '1280px',
      'height': '720px'
    })
    .appendTo('#video-holder');
    $('#progress').remove();
  }

  manager.start();

};

