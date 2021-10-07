window.addEventListener('DOMContentLoaded', event => {

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          offset: 74,
      });
  };

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });

});


var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

$(function(){
  var getTxt = $('.content p').text();
  var realTxt = [getTxt]
  var textCol = [getTxt]
  var wordsCount = textCol[0].split(' ').length;
  var words = textCol[0].split(' ');
  var wordsLimit = 40;
  var limitCol;
  
  $('.readmore h3').click(function(){
  if ( $(this).text() === "show more") {
      $('.content p').text(realTxt.join(' '));
      $('.content').addClass('scroll');
      $(this).text('show less');
      $('.item').addClass('showfull');
    } else {
      $('.content p').text(limitCol);
       $(this).text('show more');
      $('.item').removeClass('showfull');
    }
});
  
  if (wordsLimit <= wordsCount) {
    words.splice(wordsLimit, wordsCount - wordsLimit);
    words = words.join(' ');
    $('.content p').text(words + '...');
    limitCol = $('.content p').text();
  }
  
  $('.like').click(function(){
    $(this).toggleClass('clicked');
  }); 
  
});

$('#bologna-list a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})