		$( document ).on( "pagecreate", "#mypage", function() {
            $( document ).on( "swipeleft swiperight", "#mypage", function( e ) {
               if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
                  if ( e.type === "swipeleft" ) {
                     $( "#right-panel" ).panel( "open" );
                  } else if ( e.type === "swiperight" ) {
                     $( "#left-panel" ).panel( "open" );
                  }
               }
            });
        });