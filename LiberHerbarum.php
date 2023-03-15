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
    <title>Liber Herbarum</title> 
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script> <!-- Cookie get/set -->
    <script type="text/javascript" src="plants.js"></script>
    <script src="script/Liber.js"></script>  
</head>
<body onload="ListFiller(); onInput();">
<div id="bgimg">  
    <div class="divbox"> <div id="loggedintext">Logged in as <?php echo $_SESSION['user'];?>. <a href="?logout">Log out</a> <a href="Calendar.php"> - Go to calendar</a></div> 
    <h1 id="title">Liber Herbarum</h1></div>
    <div id="flexbox">   
       <div class="divbox" id="lookup">
        <form id="lookupform">
                <label for="plantselect">Select Plant:</label>
                <input list="lookupplants" id="plantselect" name="plantselect" size="20" autocomplete="off" oninput="onInput()" value="Chives" onfocus="this.value=''" onchange="this.blur();" />
            <datalist id="lookupplants">
            </datalist>
        </form>
        </div>   
        <div class="divbox" id="info">
            <img class="infopic" id="infopic" src="./resource/plants/alliumschoenoprasum.jpg">
            <h4><span><b id="commonname">Chives</b></span></h4> 
            <em><span id="scientificname">Allium Schoenoprasum.</span></em>
            <hr>
            <p class="infotext"><b>Also called: </b><span id="alsocalled"></span></p> 
            <p class="infotext"><b>Perennial(zone): </b><span id="perennial">Yes (Z3-Z9)</span></p>
            <p class="infotext"><b>Yield per plant: </b><span id="yield">3-4 oz/plant/year</span></p>
            <p class="infotext"><b>Full-grown Plant Height: </b><span id="plantheight">10-15"</span></p>
            <p class="infotext"><b>Planting depth: </b><span id="plantdepth">1/4"</span></p>
            <p class="infotext"><b>Plant Spacing (radius): </b><span id="plantspace">4"</span></p>
            <p class="infotext"><b>Days to Germinate: </b><span id="daystogerminate">7-21 days.</span></p>
            <p class="infotext"><b>Earliest planting time (from Indoors): </b><span id="earlyplantindoors">6-8 weeks before last frost.</span></p>
            <p class="infotext"><b>Earliest planting time (Direct): </b><span id="earlyplantdirect">Last frost</span></p>
            <p class="infotext"><b>Latest planting time: </b><span id="lateplant">60 days prior to first frost.</span></p>
            <p class="infotext"><b>Can be planted now in your area: </b><span id="canbeplanted"></span></p>
            <p class="infotext"><b>Time to Harvest (from seed): </b><span id="maturationtime">60 days.</span></p>
            <p class="infotext"><b>Soil Conditions: </b><span id="soil">moist, well-draining</span></p>
            <p class="infotext"><b>How to Harvest: </b><span id="howtoharvest">Harvest when ~6" tall, it will regrow. Cut leaves to within 1-2 inches of soil.</span></p>
            <p class="infotext"><b>Special Considerations: </b><span id="special"></span></p>
            <hr>
            <p class="infotext"><span id="description">Attracts Butterflies. Full Sun. Cold Hardy Herb. Remove flowers after they bloom if you don't want seeds spread over your garden. Flowers are edible. If grown as a perennial, divide every 3-4 years.</p>
            <hr>
            <p class="infotext"><b>Rock fact: </b><span id="rockfact">Chives are the smallest member of the onion family.</span></p>
    </div>

</div>
</div>
</body>
</html>