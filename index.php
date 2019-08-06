<?php

require('func.php');

$modal = 100000;

?>

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
</head>
<body>

<div class="jumbotron text-center">
  <h1>Selamat Menikmati</h1>
</div>
  
<div class="container">
  <div class="row justify-content-md-center">
    <div class="col-sm-8">
		<?php getResult($modal); ?>
    </div>
  </div>
</div>

</body>
</html>



