(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    $('.email').each(function(index) {
      $(this).attr('href', $(this).attr('href').replace(' małpka ','@'))
      $(this).text($(this).text().replace(' małpka ','@'))
    });

    //offer houses
    var source   = $("#offer-houses-template").html();
    var template = Handlebars.compile(source);
    Papa.parse("/offer_houses.csv", {
    	download: true,
      header: true,
      skipEmptyLines: true,
    	complete: function(results) {
    		console.log(results);
        var html = template(results);
        $("#offer_houses").html(html);
    	}
    });
    // var data = {
    //   houses: [
    //     {
    //       numer: "1-L",
    //       powierzchnia: 137,
    //       cena: "559,900",
    //       status: "SPRZEDANY"
    //     },
    //     {
    //       numer: "1-P",
    //       powierzchnia: 137,
    //       cena: "559,999",
    //       status: "DOSTĘPNY"
    //     },
    //     {
    //       numer: "2-L",
    //       powierzchnia: 137,
    //       cena: "559,900",
    //       status: "SPRZEDANY"
    //     },
    //     {
    //       numer: "2-P",
    //       powierzchnia: 137,
    //       cena: "559,999",
    //       status: "DOSTĘPNY"
    //     }
    //   ]
    // };


})(jQuery); // End of use strict
