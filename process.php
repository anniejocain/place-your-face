<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(!empty($_POST['img']) && !empty($_POST['toEmail'])) {
        $img = $_POST['img'];
        $toEmail = $_POST['toEmail'];
        echo $toEmail;
    }
}

?>