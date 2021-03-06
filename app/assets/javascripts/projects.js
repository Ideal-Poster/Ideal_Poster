// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/
jQuery(document).ready(function ($) {
  $('.horizontal-form').validate();
  $('.pageselectcolor, .nav-right i').css('color', '#6A9FC9');
  $('.home').css('color', '#C34A80');

//angularjs
  angular.module('Ideal_Poster', [])
    .controller('mainController', function($scope) {
  });
    //initialise Stellar.js
    $(window).stellar();

    //Cache some variables
    var links = $('.navigation').find('li');
    var links2 = $('.nav li').find('a');

    slide = $('.slide');
    mywindow = $(window);
    htmlbody = $('html,body');

    //Setup waypoints plugin
    me = $('.me');
    me.waypoint(function (direction){
      if (direction == 'down') {
        me.addClass('js-me-animate');
      }
    }, { offset: '100%'});

    slide.waypoint(function (direction) {
      dataslide = $(this).attr('data-slide');
      if (direction === 'up') {
        $('.navigation li[data-slide="' + (dataslide - 1 ) + '"]').addClass('active').next().removeClass('active');
      }
      if (direction === 'down') {
        $('.navigation li[data-slide="' + dataslide + '"]').addClass('active').prev().removeClass('active');
        $(".pageselectcolor").mouseover();
        $(".pageselectcolor").mouseout();
      }
    }, { offset: '5%'});

    //waypoints doesnt detect the first slide when user scrolls back up to the top so we add this little bit of code, that removes the class
    //from navigation link slide 2 and adds it to navigation link slide 1.

    mywindow.ready(function() {
      var wHeight = ($('.inside1').height() * 1.1) ;
      setInterval(function() {
          $('#slide1').css( 'height', ($('.inside1').height() * 1.1));
          $('#slide3').css( 'height', ($(window).height() * 1.1) );
      }, 300);

      $('.slide')
        .height(wHeight)
          .scrollie({
            scrollOffset : -600,
            scrollingInView : function(elem) {

              var bgColor = elem.data('background');
              var navrightColor = elem.data('navright');
              var logobackgroundColor = elem.data('logobackground');
              var logoColor = elem.data('logo');
              var pageSelectColor = elem.data('pageselectcolor');
              var highlightLeftColor = elem.data('highlightleft');
              var highlightRightColor = elem.data('highlightright');

                $('body').css('background-color', bgColor);
                $('.nav-right i, .small-social-media a i').css('color', navrightColor);
                $('#sidebar li a#logo').css('background-color', logobackgroundColor);
                $('#sidebar li a#logo').css('color', logoColor);
                $('.pageselectcolor').css('color', pageSelectColor);
                $('.active').css('color', highlightLeftColor)

              $(".nav-right i, .small-social-media a i").mouseover(function(){
                $(this).css("color", highlightRightColor);
              });
              $(".nav-right i, .small-social-media a i").mouseout(function(){
                $(this).css("color", navrightColor);
              });
              $(".navigation li").mouseover(function(){
                $(this).css("color", highlightLeftColor);
              });
              $(".navigation li").mouseout(function(){
                if ( !($( this ).hasClass( "active" )) ) {
                  $(this).css("color", pageSelectColor);
                } else {
                  $(this).css("color", highlightLeftColor);
                }
              });
            }
          });
    });

    //Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
    //easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }

    //When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    links.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });
    links2.click(function (e) {
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });


});
