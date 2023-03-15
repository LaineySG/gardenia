<?php require("register.class.php")?>
<?php 
if(isset($_POST['submit'])){
    $user = new RegisterUser($_POST['username'], $_POST['password'], $_POST['hzone'], $_POST['lastfrost'], $_POST['firstfrost']);
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
    <title>Register</title>
</head>
<body>
<div id="bgimg">
   <div class="divbox" id="mainbox">
        <p>"Welcome to Gardenia. To get started, we need some information from you to determine how best to create your personalized gardening calendar."</p>
        <div id="form">
            <form method="post" action="" autocomplete="off" enctype="multipart/form-data"> 
            <fieldset id="getstarted" name="Get Started">
            <label for="hzone">To begin with, please select your region's hardiness zone.</label><br>
            <select id="hzone" name="hzone">
                <option value="0a">0a</option>
                <option value="0b">0b</option>
                <option value="1a">1a</option>
                <option value="1b">1b</option>
                <option value="2a">2a</option>
                <option value="2b">2b</option>
                <option value="3a">3a</option>
                <option value="3b">3b</option>
                <option value="4a">4a</option>
                <option value="4b">4b</option>
                <option value="5a">5a</option>
                <option value="5b">5b</option>
                <option value="6a">6a</option>
                <option value="6b">6b</option>
                <option value="7a">7a</option>
                <option value="7b">7b</option>
                <option value="8a">8a</option>
                <option value="8b">8b</option>
                <option value="9a">9a</option>
                <option value="9b">9b</option>
                <option value="10a">10a</option>
                <option value="10b">10b</option>
                <option value="11a">11a</option>
                <option value="11b">11b</option>
                <option value="12a">12a</option>
                <option value="12b">12b</option>
                <option value="13a">13a</option>
                <option value="13b">13b</option>
            </select><br>
            <label for="lastfrost">Next, please enter the average date of last frost in your region.</label><br>
            <input type="date" id="lastfrost" name="lastfrost"
               value="2023-04-29"
               min="2023-01-01" max="2023-12-31"><br>
               <label for="firstfrost">Please enter the average date of first frost in your region.</label><br>
               <input type="date" id="firstfrost" name="firstfrost"
                  value="2023-10-14"
                  min="2023-01-01" max="2023-12-31"><br>
            <label for="username">Please enter a username.</label><br>
            <input type="text" name="username"><br>
            <label for="username">Please enter a password.</label><br>
            <input type="text" name="password"><br>
            <button type="submit" value="submit" name="submit">Create account</button><br>
            <p class="error"><?php echo @$user->error ?></p>
            <p class="success"><?php echo @$user->success ?></p>
            </form>
            </div>
        <br><a href="login.php"><p class="logintext">Or click here to login.</p></a>
    </div>
</div>
</body>
</html>