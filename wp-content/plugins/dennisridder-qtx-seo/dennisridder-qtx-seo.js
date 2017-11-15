if ( typeof qtranxf_join === 'undefined' ) {
	function qtranxf_join( blocks )
	{
		var result = '';

		if ( !blocks || !Object.keys(blocks).length )
			return result;

		jQuery.each( blocks, function( lang, value ) {
			result = result + '[:' + lang + ']' + value;
		});

		return result;
	}
}

var DennisRidder_qTranslateX_Yoast_SEO = {};
DennisRidder_qTranslateX_Yoast_SEO.titles = {};
DennisRidder_qTranslateX_Yoast_SEO.metadescs = {};

DennisRidder_qTranslateX_Yoast_SEO.updateTitles = function(){
	setTimeout( function(){ jQuery('#yoast_wpseo_title').val( qtranxf_join( DennisRidder_qTranslateX_Yoast_SEO.titles ) ); }, 10 );
}

DennisRidder_qTranslateX_Yoast_SEO.updateMetaDescriptions = function(){
	setTimeout( function(){ jQuery('#yoast_wpseo_metadesc').val( qtranxf_join( DennisRidder_qTranslateX_Yoast_SEO.metadescs ) ); }, 10 );
}

DennisRidder_qTranslateX_Yoast_SEO.switchLanguage = function(lang_from, lang_to) {
	jQuery('#snippet_title').html( DennisRidder_qTranslateX_Yoast_SEO.titles[ lang_to ] );
	jQuery('#snippet_meta').html( DennisRidder_qTranslateX_Yoast_SEO.metadescs[ lang_to ] );
}

jQuery(document).ready(function($){
	jQuery(window).on( 'YoastSEO:ready', function(){
		
		DennisRidder_qTranslateX_Yoast_SEO.titles = qtranxj_split( jQuery('#yoast_wpseo_title').val() );
		DennisRidder_qTranslateX_Yoast_SEO.metadescs = qtranxj_split( jQuery('#yoast_wpseo_metadesc').val() );

		$(document).on('blur', '#snippet_title', function(){
			DennisRidder_qTranslateX_Yoast_SEO.titles[ qTranslateConfig.activeLanguage ] = $(this).text();
			DennisRidder_qTranslateX_Yoast_SEO.updateTitles();
		})

		$(document).on('blur', '#snippet_meta', function(){
			DennisRidder_qTranslateX_Yoast_SEO.metadescs[ qTranslateConfig.activeLanguage ] = $(this).text();
			DennisRidder_qTranslateX_Yoast_SEO.updateMetaDescriptions();
		})

		var qtx = qTranslateConfig.js.get_qtx();
		qtx.addLanguageSwitchBeforeListener( DennisRidder_qTranslateX_Yoast_SEO.switchLanguage );
		DennisRidder_qTranslateX_Yoast_SEO.switchLanguage('', qTranslateConfig.activeLanguage );
		
		// This is a very dirty fix, but it's the only thing I was able to make it do the trick (for now)
		setTimeout( function(){ DennisRidder_qTranslateX_Yoast_SEO.switchLanguage('', qTranslateConfig.activeLanguage ); }, 2000 );

	});
});