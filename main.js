


// -----------------------------------------------------
//           fungsi dari template child row
// -----------------------------------------------------

function format ( d ) {
    // `d` is the original data object for the row
    return '<div id="stock'+d.id+'"><table class="child-table" cellpadding="5" cellspacing="0" border="0" style="width:100%;padding-left:50px;">'+
        '<thead class="text-center">'+
          '<tr><th colspan="2">BTC/IDR</th><th colspan="2">'+d.id.toUpperCase()+'/BTC</th><th colspan="2">'+d.id.toUpperCase()+'/IDR</th><th rowspan="2">ROI</th></tr>'+
          '<tr><th>Jual</th><th>Beli</th><th>Jual</th><th>Beli</th><th>Jual</th><th>Beli</th></tr>'+
        '</thead><tbody>'+
        '<tr>'+
            '<td>'+d.btc_idr_sell+'</td>'+
            '<td>'+d.btc_idr_buy+'</td>'+

            '<td>'+d.alt_btc_sell+'</td>'+
            '<td>'+d.alt_btc_buy+'</td>'+

            '<td>'+d.alt_idr_sell+'</td>'+
            '<td>'+d.alt_idr_buy+'</td>'+
            '<td><div class="roi_a">'+d.a_roi+ '</div><div class="roi_a">' +d.b_roi+'</div></td>'+
        '</tr>'+
    '</tbody></table></id>';
}

// fungsi lanjutan dari child row, depth data

  // fungsi kalkulasi untuk depth
  function kalkulasi_a(modal,btcIdrSellPrice,altBtcSellPrice,altIdrBuyPrice) {
    // processing idr membeli btc, btc membeli alt, alt menjual ke idr

    getBtc = (modal - (modal * 0.003)) / btcIdrSellPrice;
    getAlt = (getBtc - (getBtc * 0.003)) / altBtcSellPrice;
    getIdr = (getAlt - (getAlt * 0.003)) * altIdrBuyPrice;
    roi = ((getIdr - modal) / modal) * 100;
    return numeral(roi).format('0.0');
  }
  function kalkulasi_b(modal,btcIdrBuyPrice,altBtcBuyPrice,altIdrSellPrice) {
    // processing idr membeli alt, alt jual ke btc, btc jual ke idr

    getAlt = (modal - (modal * 0.003)) / altIdrSellPrice;
    getBtc = (getAlt - (getAlt * 0.003)) * altBtcBuyPrice;
    getIdr = (getBtc - (getBtc * 0.003)) * btcIdrBuyPrice;
    roi = ((getIdr - modal) / modal) * 100;
    return numeral(roi).format('0.0');
  }



  // fungsi depth utama

function depth (d,modal) {
    var idr = '0,0';
    alt = d;
    var altIdrJson = $.ajax({ 
      dataType: "json",
      url: "https://indodax.com/api/"+alt+"_idr/depth",
      async: true,
      success: function(result) {}                     
    });

    var altBtcJson = $.ajax({ 
      dataType: "json",
      url: "https://indodax.com/api/"+alt+"_btc/depth",
      async: true,
      success: function(result) {}                     
    });

    var btcIdrJson = $.ajax({ 
      dataType: "json",
      url: "https://indodax.com/api/btc_idr/depth",
      async: true,
      success: function(result) {}                     
    });

    $.when(altIdrJson,altBtcJson,btcIdrJson).done(function(altIdr,altBtc,btcIdr){

      var a;
      for (i=0;i < 4; i++) {

        btcIdrSellPrice = btcIdr[0].sell[i][0];
        btcIdrSellStock =  btcIdr[0].sell[i][1] * btcIdrSellPrice ;
        btcIdrBuyPrice = btcIdr[0].buy[i][0];
        btcIdrBuyStock =  btcIdr[0].buy[i][1] * btcIdrBuyPrice ;

        altBtcSellPrice = altBtc[0].sell[i][0];
        altBtcSellStock =  btcIdrSellPrice * ( altBtc[0].sell[i][1] * altBtcSellPrice ) ;
        altBtcBuyPrice = altBtc[0].buy[i][0];
        altBtcBuyStock =  btcIdrBuyPrice * (altBtc[0].buy[i][1] * altBtcBuyPrice ) ;

        altIdrSellPrice = altIdr[0].sell[i][0];
        altIdrSellStock =  altIdr[0].sell[i][1] * altIdrSellPrice ;
        altIdrBuyPrice = altIdr[0].buy[i][0];
        altIdrBuyStock =  altIdr[0].buy[i][1] * altIdrBuyPrice ;

        // kalkulasi

        a = a + '<tr>';
        a = a + '<td><div class="price tipe-a">'+btcIdrSellPrice+ '</div><div class="stock">Rp '+numeral(btcIdrSellStock).format(idr)+'</div></td><td><div class="price tipe-b">'+btcIdrBuyPrice+'</div><div class="stock">Rp '+numeral(btcIdrBuyStock).format(idr)+'</div></td>';
        a = a + '<td><div class="price tipe-a">'+altBtcSellPrice+ '</div><div class="stock">Rp '+numeral(altBtcSellStock).format(idr)+'</div></td><td><div class="price tipe-b">'+altBtcBuyPrice+'</div><div class="stock">Rp '+numeral(altBtcBuyStock).format(idr)+'</div></td>';
        a = a + '<td><div class="price tipe-b">'+altIdrSellPrice+ '</div><div class="stock">Rp '+numeral(altIdrSellStock).format(idr)+'</div></td><td><div class="price tipe-a">'+altIdrBuyPrice+'</div><div class="stock">Rp '+numeral(altIdrBuyStock).format(idr)+'</div></td><td><div class="roi_a tipe-a">'+kalkulasi_a(modal,btcIdrSellPrice,altBtcSellPrice,altIdrBuyPrice)+ '</div><div class="roi_a tipe-b">' +kalkulasi_b(modal,btcIdrBuyPrice,altBtcBuyPrice,altIdrSellPrice)+'</div></td>';
        a = a + '</tr>';
      }

      $("#stock"+alt+' .child-table').append(a);
    })
}

// mematikan reload ketika child di buka
function checkshown(table1) {
  if ($('.child-table').length) {
    clearInterval(tickReload);
    console.log('AutoReload Mati');
  } else {
    tickReload = setInterval( function () {
        table1.ajax.reload();
    }, 10000 );
    console.log('AutoReload Hidup');
  }
}

$(document).ready(function() {

  var modal = $('#banyak-modal').val();

  $('#banyak-modal').change(function(){
    modal = $('#banyak-modal').val();
    table1.ajax.url( 'http://bandar.test/trik-indodax/api.php?modal=' + modal ).load();
    console.log(modal);
  });
  

// -----------------------------------------------------
//      Script Untuk Tabel Utama with datatables
// -----------------------------------------------------
  
  var table1 = $('#mytable').DataTable( {
      ajax: {
          url: 'http://bandar.test/trik-indodax/api.php?modal=' + modal ,
          type: 'GET'
      },
      paging: false,
      searching: false,
      order : [[4, 'desc'],[7, 'desc']],
      columns: [ 
        {
          "className":      'details-control',
          "orderable":      false,
          "data":           null,
          "defaultContent": ''
        },
        { data : 'id'},
        { data : 'a_result'},
        { data : 'a_untung'},
        { data : 'a_roi'},
        { data : 'b_result'},
        { data : 'b_untung'},
        { data : 'b_roi'}
      ]
  } );





  // tabel child
  $('#mytable tbody').on('click', 'td.details-control', function () {
      var tr = $(this).closest('tr');
      var row = table1.row( tr );
      if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
      }
      else {
          // Open this row
          row.child( format(row.data()) ).show();
          tr.addClass('shown');
          depth(row.data().id, modal);
      }
      checkshown(table1);
  } );


// -----------------------------------------------------
//           SCRIPT AUTO RELOAD
// -----------------------------------------------------

  // autoreload ajax
  console.log('AutoReload Hidup');
  tickReload = setInterval( function () {
      table1.ajax.reload();
  }, 5000 );

  // reload check positif roi
  setInterval( function () {
      $('#mytable > tbody > tr > td:nth-child(5), #mytable > tbody > tr > td:nth-child(8)').each(function(){
        if ($(this).text() > 3 ){
          $(this).addClass('super-sekali');
        } else if ($(this).text() > 1 ){
          $(this).addClass('super');
        } else if ($(this).text() > 0 ){
          $(this).addClass('positif');
        } 
      }); 
  }, 1000 );

});
