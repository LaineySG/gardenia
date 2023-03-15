<?php

session_start();
if(!isset($_SESSION['user'])){
    header("location: login.php"); exit;
}
if(isset($_GET['logout'])){
    unset($_SESSION['user']);
    header("location: login.php"); exit();
}

include 'Calendarscript.php';
if (isset($_COOKIE["datecookie"])) {
    $date = date($_COOKIE["datecookie"]);
} else {
    $date = date('Y-m-d H:i:s');
}
$calendar = new Calendar($date);
$calendar->add_event('Plant snow peas', '2023-03-14', 1, 'green');
$calendar->add_event('Direct sow asparagus', '2023-03-18', 1, 'red');
$calendar->add_event('Harvest pumpkins', '2023-03-16', 3, 'blue');
$calendar->add_event('Apply compost', '2023-03-16', 7);
$calendar->add_event('first frost', $_COOKIE['first_frost'] , 1);
$calendar->add_event('last frost', $_COOKIE['last_frost'] , 1);
if(isset($_POST["fwdbtn"])) { 
    $date = date(date( "Y-m-d", strtotime( $date . "+1 month")));
    setcookie("datecookie", $date, time() + (86400));
    header("location: calendar.php"); exit();
 }
if(isset($_POST["backbtn"])) { 
    $date = date(date( "Y-m-d", strtotime( $date . "-1 month")));
    setcookie("datecookie", $date, time() + (86400));
    header("location: calendar.php"); exit();
 }


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preload" as="image" href="/resource/kenrick-mills-RWsRztYTRec-unsplash.jpg">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/reset.css">
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="style/calendarstyle.css">
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script> <!-- Cookie get/set -->
    <script src="script/calendarScript.js"></script>    
    <script type="text/javascript" src="plants.js"></script>
    <script src="script/Liber.js"></script>  
    <title>Calendar</title>
</head>
<body onload="ListFiller(); CalendarStartUp();">
<div id="bgimg">
    <div class="divbox"> <div id="loggedintext">Logged in as <?php echo $_SESSION['user'];?>. <a href="?logout">Log out</a> <a href="LiberHerbarum.php"> - Go to Liber Herbarum</a></div> 
    <h1 id="title">Calendar</h1></div>

<div id="flexbox">   
       <div class="divbox" id="flexboxrow">
        <form id="calendarlookupform">
                <label for="plantselect">Select Plant:</label>
                <input list="lookupplants" id="plantselect" name="plantselect" size="20" autocomplete="off" oninput="onCalendarInput()" value="" onfocus="this.value=''" onchange="this.blur();" />
            <datalist id="lookupplants">
            </datalist>
        </form>
     <div class="divbox" id="selectedplantlist"></div>
     </div> 


   <div class="divbox"> <!-- class content home  -->
   <div id="calendarbtns">
    <form method="post">
    <button id="backmonth" name="backbtn"
   ><</button>
   <button id="fwdmonth" name="fwdbtn"
   >></button></form></div>
        
			<?=$calendar?>
    </div>
</div>
</body>
</html>