function set_description_table(table_template, typ_budynku, strona, poziom) {
  Papa.parse("T_" + typ_budynku + "_" + strona + "_" + poziom + ".csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      // console.log(results);
      var table_html = table_template(results);
      $("." + "T_" + typ_budynku + "_" + strona + "_" + poziom).html(table_html);
    }
  });
}

function set_description_tables(table_template) {
  var typy_budynkow = ['A1', 'A2', 'A3', 'B1', 'C1']
  var strony = ['L', 'P']
  var poziomy = ['1', '2']
  $(typy_budynkow).each(function(typ_budynku_idx, typ_budynku) {
    $(strony).each(function(strona_idx, strona) {
      $(poziomy).each(function(poziom_idx, poziom) {
        set_description_table(table_template, typ_budynku, strona, poziom);
      });
    });
  });
}

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


    //offer houses templates
    var offer_houses_template_source   = $("#offer-houses-template").html();
    var offer_houses_template = Handlebars.compile(offer_houses_template_source);
    var offer_houses_modals_template_source   = $("#offer-houses-modals-template").html();
    var offer_houses_modals_template = Handlebars.compile(offer_houses_modals_template_source);

    //offer houses - description tables template
    var offer_houses_table_template_source   = $("#offer-houses-table-template").html();
    var offer_houses_table_template = Handlebars.compile(offer_houses_table_template_source);

    var status_type_map = {
      'Dostępny': 'success',
      'Rezerwacja': 'warning',
      'Sprzedany': 'danger'
    };

    Papa.parse("offer_houses.csv", {
    	download: true,
      header: true,
      skipEmptyLines: true,
    	complete: function(results) {
        $(results.data).each(function(idx, element) {
          element.typ_statusu = status_type_map[element.status];
        });
        var offer_houses_html = offer_houses_template(results);
        $("#offer_houses").html(offer_houses_html);
        var offer_houses_modals_html = offer_houses_modals_template(results);
        $("#offer_modals").html(offer_houses_modals_html);

        set_description_tables(offer_houses_table_template);
    	}
    });


})(jQuery); // End of use strict
