<?php 

function getData($url) {
	$json = file_get_contents($url);
	$obj = json_decode($json);
	return $obj;
}

$modal = 100000;
if(isset($_GET["modal"])) {
	$modal = is_numeric($_GET["modal"]) ? $_GET["modal"] : $modal ;
};

$data = array();
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

$btc_idr_sell = $sum->tickers->btc_idr->sell;
$btc_idr_buy = $sum->tickers->btc_idr->buy;


foreach ($alt as $ini) {

	$a = $ini.'_btc';
	$b = $ini.'_idr';


	$alt_btc_sell = $sum->tickers->$a->sell;
	$alt_btc_buy = $sum->tickers->$a->buy;

	$alt_idr_sell = $sum->tickers->$b->sell;
	$alt_idr_buy = $sum->tickers->$b->buy;

	// processing idr -> btc(b) -> alt(b) -> idr(s)

	$a_get_btc = ($modal - ($modal * 0.003) ) / $btc_idr_sell; 
	$a_get_alt = ($a_get_btc - ($a_get_btc * 0.003) ) / $alt_btc_sell;
	$a_result = round( ($a_get_alt - ($a_get_alt * 0.003) ) * $alt_idr_buy,0);
	$a_roi = round(( ($a_result - $modal) / $modal ) * 100, 2);
	$a_untung = round($a_result - $modal, 0);

	// processing idr -> alt(b) -> btc(s) -> idr(s)
	$b_get_alt = ($modal - ($modal * 0.003) ) / $alt_idr_sell;
	$b_get_btc = ($b_get_alt - ($b_get_alt * 0.003) ) * $alt_btc_buy;
	$b_result = round( ($b_get_btc - ($b_get_btc * 0.003) )  * $btc_idr_buy,0 );
	$b_roi = round(( ($b_result - $modal) / $modal ) * 100, 2);
	$b_untung = round($b_result - $modal, 0);


	$a_state = ($a_roi > 0) ? 'positif' : 'negatif';
	$b_state = ($b_roi > 0) ? 'positif' : 'negatif';





	$array_temporary = array(
		'id' => $ini,
		'btc_idr_sell' => $btc_idr_sell,
		'btc_idr_buy' => $btc_idr_buy,
		'alt_btc_sell' => $alt_btc_sell,
		'alt_btc_buy' => $alt_btc_buy,
		'alt_idr_sell' => $alt_idr_sell,
		'alt_idr_buy' => $alt_idr_buy,
		'a_get_btc' => $a_get_btc,
		'a_get_alt' => $a_get_alt,
		'a_result' => $a_result,
		'a_roi' => $a_roi,
		'a_untung' => $a_untung,
		'b_get_alt' => $b_get_alt,
		'b_get_btc' => $b_get_btc,
		'b_result' => $b_result,
		'b_roi' => $b_roi,
		'b_untung' => $b_untung,
		'a_state' => $a_state,
		'b_state' => $b_state
	);
	array_push($data, $array_temporary);
}

$result['data'] = $data;

header('Content-Type: application/json');
echo json_encode($result);