

function getHashFilter() {
  var hash = location.hash;
  // get filter=filterName
  var matches = location.hash.match( /filter=([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}
$( function() {

  var $grid = $('.isotope');

  // bind filter button click
  var $filters = $('#filters').on( 'click', 'li', function() {
    var filterAttr = $( this ).attr('data-filter');
    // set filter in hash
    location.hash = 'filter=' + encodeURIComponent( filterAttr );
  });

  var isIsotopeInit = false;

  function onHashchange() {
    var hashFilter = getHashFilter();
    if ( !hashFilter && isIsotopeInit ) {
      return;
    }
    isIsotopeInit = true;
    console.log(hashFilter);
    // filter isotope
    $grid.isotope({
      // itemSelector: '.selector.col-md-6.col-lg-4',
      filter: hashFilter
    });
    // set selected class on button
    if ( hashFilter ) {
      $filters.find('.active').removeClass('active');
      console.log($filters.find('.active'));
      $filters.find('[data-filter="' + hashFilter + '"]').addClass('active');
    }
  }

  $(window).on( 'hashchange', onHashchange );

  // trigger event handler to init Isotope
  onHashchange();
});