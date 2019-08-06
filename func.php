<?php

function getData($url) {
	$json = file_get_contents($url);
	$obj = json_decode($json);
	return $obj;
}

function getResult($modal) {

	$alt = array (
		'bts',
		'drk',
		'doge',
		'eth',
		'ltc',
		'nxt',
		'sumo',
		'ten',
		'nem',
		'str',
		'xrp'
	);

	$sum = getData('https://indodax.com/api/summaries');

	echo '<table class="table"><th>Alt</th><th>Modal</th><th>Hasil</th><th>ROI</th><th>Untung</th>';

	foreach ($alt as $ini) {

		$a = $ini.'_btc';
		$b = $ini.'_idr';

		$btc_idr_sell = $sum->tickers->btc_idr->sell;
		$alt_btc_sell = $sum->tickers->$a->sell;
		$alt_idr_buy = $sum->tickers->$b->buy;


		// processing
		$get_btc = $modal / $btc_idr_sell; 
		$get_alt = $get_btc/ $alt_btc_sell;
		$result = $get_alt * $alt_idr_buy;
		$roi = ($result - $modal) / $modal;
	?>
		<tr>
			<td><strong><?php echo $ini;?><strong></td>
			<td><?php echo $modal;?></td>
			<td><?php echo $result;?></td>
			<td><?php echo $roi;?> %</td>
			<td>Rp. <?php echo intval($result - $modal);?></td>
		</tr>
	<?php
	}
	echo '</table>';

}