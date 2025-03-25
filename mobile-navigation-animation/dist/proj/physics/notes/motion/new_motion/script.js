( function( window, $, undefined ) {

    'use strict';

    ////////////// Begin jQuery and grab the $ ////////////////////////////////////////

    $(document).ready(function() {

      function is_scrolling() {

        var $element = $('.site-header'),
            $nav_height = $element.outerHeight( true );
  
        if ($(this).scrollTop() >= $nav_height ) { //if scrolling is equal to or greater than the nav height add a class
      
          $element.addClass( 'is-scrolling');
    
        } else { //is back at the top again, remove the class
       
          $element.removeClass( 'is-scrolling');
        }
        
      }//end is_scrolling();

    $( window ).scroll(_.throttle(is_scrolling, 200));
      
      
  }); //* end ready


})(this, jQuery);