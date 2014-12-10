<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="images/favicon.png">
    <title>Place Your Face</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <style>
    body {
        margin-top:45px;
    }
    .btn, input {
        border-radius:2px;
    }
    .btn-primary {
        background-color:#4AA4BE;
        border-color:#4AA4BE;
    }
    .btn-primary:hover {
        background-color:#4AA4BE;
    }
    .btn-file {
    position: relative;
    overflow: hidden;
}
.btn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
}
h1, h2 {
    color:#2C3135;
}
.row {
    margin-bottom:45px;
}
#image-container {
    height:600px;
}
.preview, .unpreview {
    width:150px;
    margin-right:25px;
}
#finish {
    margin-right:8px;
}
.text-center {
    margin-bottom:45px;
    color:#666;
}
.background-options div {
    margin-top:25px;
}
.choose-background.chosen {
    border:2px solid #4AA4BE;
    border-radius:2px;
    text-decoration:none;
}
.choose-background img {
    margin-bottom:8px;
}
.choose-background .glyphicon {
    display:block;
    font-size:32px;
    text-decoration:none;
}
.choose-background:hover {
    color:#fff;
    text-decoration:none;
}
.choose-background {
    color:#fff;
}
.choose-background.chosen {
    color:#4AA4BE;
}
.badge-step {
    font-size:24px;
    border-radius:24px;
    width:48px;
    padding:12px;
    background-color:#4AA4BE;
}
.message-sent {
    margin-top:25px;
}
.resize-instructions {
    margin-left:58px;
    color:#666;
}
#lil {
    opacity:.8;
    /*margin-top:235px;*/
    margin-top:45px;
    font-size:13px;
    margin-bottom:25px;
}

#lil img{
    height:40px;
    margin-right:5px;
}   
#lil a, #lil a:hover {
    color:#333;
    text-decoration:none;
}
.thanks {
    font-size:13px;
    color:#333;
}
img {
    max-width:100%;
    max-height:500px;
}
.col-md-4 {
    height:500px;
    margin-bottom:25px;
}
</style>
  </head>
  <body>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <h1>Place your face</h1>
                <p class="lead">Here are some of the fantastic images that have been created. <a href="index.html">Create your own</a></p>
            </div>
        </div>
        <div class="row">
        <?php
        define('BASE_DIR', dirname(realpath(__FILE__)));
	$config = require_once(BASE_DIR . '/config.php');

	// Create connection
	$conn = new mysqli($config['servername'], $config['username'], $config['password'], $config['dbname']);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	
	if ($result = $conn->query("SELECT * from images")) {

while($row = $result->fetch_array())
  {
  echo '<div class="col-md-4"><img src="images/cards/' . $row['file_name'] . '"></div>';
  }



    /* free result set */
    $result->close();
}

	$conn->close();
	?>
        </div>
            <div id="lil">
     <a href="http://librarylab.law.harvard.edu" target="_blank"><img src="http://librarylab.law.harvard.edu/img/liblabstampmed.png"> Created by the Library Innovation Lab</a>
     </div>
     <div class="row">
     <div class="col-md-6">
     <p class="thanks">Images from the Harvard Library and the State Library of Massachusetts. Special thanks to the following folks.</p> 
     <p class="thanks">Sarah Hutcheon at Schlesinger Library</p>
     <p class="thanks">Laura Schaub at the State Library of Massachusetts
     <p class="thanks">Lesley Schoenfeld at the Harvard Law School Library</p>
     </div>
     </div>
    </div>
  </body>
</html>      