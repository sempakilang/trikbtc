<!DOCTYPE html>
<html lang="en">
<head>
  <title>Trik</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
  <link rel="stylesheet" type="text/css" href="main.css">
  <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
  <script src="main.js"></script>
</head>
<body>

<div class="jumbotron text-center">
  <h1>Test Table</h1>
</div>
  
<div class="container">
  <div class="row justify-content-md-center">

    <div class="col-sm-12">
        <div class="form-group row">
          <label for="banyak-modal" class="col-2 col-form-label">Modal (Rp)</label>
          <div class="col-10">
            <input class="form-control" type="number" value="100000" id="banyak-modal">
          </div>
        </div>
        <table id="mytable"  class="table table-striped table-bordered" >
          <thead class="text-center">
            <tr>
                <th rowspan="2"></th>
                <th rowspan="2">ID</th>
                <th colspan="3">BTC</th>
                <th colspan="3">ALT</th>
            </tr>
            <tr>
              <th>Hasil</th>
              <th>Laba</th>
              <th>Roi</th>
              <th>Hasil</th>
              <th>Laba</th>
              <th>Roi</th>

            </tr> 
          </thead>

          <tfoot>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Hasil</th>
              <th>Laba</th>
              <th>Roi</th>
              <th>Hasil</th>
              <th>Laba</th>
              <th>Roi</th>
            </tr> 
          </tfoot>

        </table>

      </div>

    </div>

  </div>

</div>

</body>
</html>

