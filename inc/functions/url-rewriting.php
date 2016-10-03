<?php

// Make styles and scripts paths relative
add_filter( 'script_loader_src', 'tna_styles_scripts_relative' );
add_filter( 'style_loader_src', 'tna_styles_scripts_relative' );
function tna_styles_scripts_relative( $url ) {
    return str_replace( site_url(), '', $url );
}
// Make template URLs relative
function make_path_relative( $url ) {
    global $pre_path;
    return str_replace( site_url(), $pre_path, $url );
}
// Make template URLs relative without the $pre_path
function make_path_relative_no_pre_path( $url ) {
	return str_replace( site_url(), '', $url );
}
// Fix URLs in wp_head
function tna_wp_head() {
    ob_start();
    wp_head();
    $wp_head = ob_get_contents();
    ob_end_clean();
    global $pre_path;
    $wp_head = str_replace( site_url(), 'http://www.nationalarchives.gov.uk' . $pre_path, $wp_head );
    echo $wp_head;
}
// Make content URLs relative
function make_content_urls_relative( $content ) {
	return str_replace( site_url(), '', $content );
}
add_filter( 'the_content', 'make_content_urls_relative' );

// WP Super Cache DONOTCACHEPAGE
function do_not_cache_page_if_internal() {
    if ( !is_admin() ) {
        if ( substr( $_SERVER['REMOTE_ADDR'], 0, 3 ) === '10.' ) {
            // Internal TNA
            define( 'DONOTCACHEPAGE', true );
        }
    }
}
add_action( 'wp_loaded', 'do_not_cache_page_if_internal' );

function bypass_cache_button( $wp_admin_bar ) {
    $args = array(
        'id' => 'bypass-cache',
        'title' => 'Bypass Cache',
        'href' => get_permalink() . '?donotcachepage=ca591738f861477a7f5fcb49757676b5',
        'meta' => array(
            'class' => 'bypass-cache'
        )
    );
    $wp_admin_bar->add_node( $args );
}
add_action('admin_bar_menu', 'bypass_cache_button', 50);