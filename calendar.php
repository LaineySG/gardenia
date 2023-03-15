<?php

session_start();
if(!isset($_SESSION['user'])){
    header("location: login.php"); exit;
}
if(isset($_GET['logout'])){
    unset($_SESSION['user']);
    header("location: login.php"); exit();
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
	<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script> <!-- Cookie get/set -->
    <script type="text/javascript" src="plants.js"></script>
    <script src="script/Liber.js"></script> 
    <title>Calendar</title> 

    <script src="/node_modules/jquery/dist/jquery.min.js"></script>

	<link rel="stylesheet" href="/Monthly-master/css/monthly.css">

</head>
<body onload="ListFiller(); CalendarStartUp();">
<div id="bgimg">
    <div class="divbox"> <div id="loggedintext">Logged in as <?php echo $_SESSION['user'];?>. <a href="?logout">Log out</a> <a href="LiberHerbarum.php"> - Go to Liber Herbarum</a></div> 
    <h1 id="title">Calendar</h1></div>

        <div class="divbox">
        <div id="flexbox-row">

        <form id="calendarlookupform">
            <label for="plantselect">Select Plant:</label>
            <input list="lookupplants" id="plantselect" name="plantselect" size="15" autocomplete="off" oninput="onCalendarInput()" value="" onfocus="this.value=''" onchange="this.blur();" />
            <datalist id="lookupplants">
            </datalist><br>
            <label for="showall">Show all on calendar:</label>
            <input type="checkbox" id="showall">
        </form>
        <div id="selectedItems"></div>
        </div> 

    <div class="monthly" id="mycalendar"></div>
<script type="text/javascript" src="/Monthly-master/js/jquery.js"></script>
<script type="text/javascript" src="/Monthly-master/js/monthly.js"></script>
<script type="text/javascript">

/*red #692222 blue #284b6d green #455e44 yellow #634f09*/



	$(window).load( function() {
		var myCalendar = $('#mycalendar').monthly({
			mode: 'event',
			dataType: 'json',
			jsonUrl: '/Monthly-master/events.json',
			eventList: true
		});
	});
</script>

</div>
</div>


</body>
</html>