<?php
/*
Template Name: Level 1 landing
*/
get_header(); ?>
<?php get_template_part( 'breadcrumb' ); ?>

	<div id="primary" class="level-one">
		<?php while ( have_posts() ) : the_post(); ?>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<article class="banner" <?php
					if ( has_post_thumbnail() ) {
						$thumbnail_src = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full-page-width' ); ?>
						style="background: url(<?php echo make_path_relative( $thumbnail_src[0] ); ?>) center center;background-size: cover;"
					<?php } ?>>
						<div class="entry-header">
							<h1><?php the_title(); ?></h1>
						</div>
							<?php if( empty( $post->post_content) ) {
								// Do nothing
							} else { ?>
								<div class="entry-content">
									<div class="col-md-9">
										<?php the_content(); ?>
									</div>
								<?php
								$buttonTitle = get_post_meta( $post->ID, 'action_button_title', true );
								$buttonUrl = get_post_meta( $post->ID, 'action_button_url', true );
								if ( $buttonTitle ) { ?>
									<div class="col-md-3 text-right call-to-action-button">
										<a href="<?php echo $buttonUrl; ?>" title="<?php echo $buttonTitle; ?>" class="ghost-button">
											<?php echo $buttonTitle; ?>
										</a>
									</div>
								<?php } ?>
								</div>
							<?php } ?>
					</article>
				</div>
			</div>
			<main id="main" role="main">
				<div class="row equal-heights">
						<?php
						$n = get_post_meta( $post->ID, 'number_of_boxes', true );
						for ($i = 1; $i <= $n; $i++) {
							$title = get_post_meta( $post->ID, 'box_title_'.$i, true );
							$url = get_post_meta( $post->ID, 'box_title_url_'.$i, true );
							$content = get_post_meta( $post->ID, 'box_content_'.$i, true );
							$display = get_post_meta( $post->ID, 'box_width_'.$i, true );
							if ( $display == 'At a half' ) {
								$col = '6';
							} else {
								$col = '4';
							}
							if ( !empty( $title ) && $display != 'Disabled' ) {
								?>
								<div class="col-md-<?php echo $col ?>">
									<article>
										<div class="entry-header">
											<h2>
												<?php if ( !empty( $url ) ) { ?>
												<a href="<?php echo $url ?>">
													<?php echo $title . $display . $col ?>
												</a>
												<?php } else { echo $title; } ?>
											</h2>
										</div>
										<div class="entry-content">
											<?php echo $content ?>
										</div>
									</article>
								</div>
							<?php } else {
								// do nothing
							}
						} ?>
				</div>
			</main>
		</div>
		<?php endwhile; ?>
	</div>

<?php get_footer(); ?>