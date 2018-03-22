// Add Sprite //
  fetch('./img/sprite.svg')
  .then(function (response) {return response.text()})
  .then(function (svg) {
    var tag = document.createElement('div');
    tag.hidden = true;
    tag.insertAdjacentHTML("afterbegin", svg);
    document.body.insertBefore(tag, document.body.childNodes[0]);
  });

// Contacts Map //
  function initMaps() {
    var map_center = {lat: 46.9125609, lng: 28.9954971};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,center: map_center,disableDefaultUI: true,
      //draggable: false,scrollwheel: false
    });

    var image = 'img/marker.png';
    var marker = new google.maps.Marker({
      position: {lat: 46.9135609, lng: 28.9854971},
      map: map,
      icon: image
    });

    /*map.addListener('center_changed', function() {
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
      }, 100);
    });*/
  };

$(document).ready(function() {
  $('select').niceSelect();

  // Index page Slider //
  if($(".fp--slider").length) {
    var fpSwiper = new Swiper('.fp--slider', {
      speed: 0,
      effect: 'fade',
      loop: true,
      //navigation: {nextEl: '.swiper-next',prevEl: '.swiper-prev'},
      autoplay: true,
      delay: 3000,
    });
    
    $(window).resize(function(){
      fpSwiper.update()
    });

    $( ".fp--slider" ).mouseover(function() {
      fpSwiper.autoplay.stop();
    }).mouseout(function() {
      fpSwiper.autoplay.start();
    });
  }
  // Image to backgionds //
  $.each( $('[data-background]'),function(){
    var cssValues = {
      "background":"url(" + $(this).attr("src") + ") no-repeat center bottom scroll",
      "background-size":"cover"
    }
    $(this).parent().css(cssValues)
  });

  // mobile menu //
  $('[data-toggle=menu]').click(function (event) {
    event.stopPropagation();
    $(this).toggleClass('active');
    $(this).parent().toggleClass('open');
    event.preventDefault();
    return false; 
  });

  $(document).click(function() { 
    $('[data-toggle=menu]').removeClass('active');
    $('nav.main--nav').parent().removeClass('open');
  }); 
  // Animated Scroll //
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
  
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
  });

  // Poll page Slider //
  var pollSwiper = new Swiper('.poll--slider', {
    speed: 0,
    //effect: 'fade',
    pagination: {
      el: '.steps--indicator',
      clickable: true,
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        if (current == total) {var w = '100%';}
        if (current == 1) {var w = '0';}
        if (current != 1 && current != total) {var w = ((current) / total) * 100 + '%';}
        return '<div class="pager">' + current + ' / ' + total + '</div>'+'<div class="progress"><div class="range" style="width:' + w + '"></div></div>';
      }
    },

  });
  pollSwiper.allowTouchMove = false;

  $('[data-next]').click(function () {
    if ($(this).attr('disabled')) {return true}
    pollSwiper.slideNext();
  })
  $('[data-prev]').click(function () {pollSwiper.slidePrev();})

  $('.step--form').each(function() {
    var btn = $(this).find('[data-next]');
    $(this).keyup(function() {
      var inp = $("input").val();
      if (!(inp == "")) {btn.removeAttr('disabled');}
    });
  });
  $('#segment').change(function(){
    var sel = $("#segment:checked").val();
    if (!(sel == "")) {
      $(this).parents('.step--form').find('[data-next]').removeAttr('disabled');
    }
  });
  $('.star-rating__icon, .radio-group label, .checkbox-group label').click(function(){
    $(this).parents('.step--form').find('[data-next]').removeAttr('disabled');
  });
});



