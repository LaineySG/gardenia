<?php require("login.class.php")?>
<?php 
if(isset($_POST['submit'])){
    $user = new LoginUser($_POST['username'], $_POST['password']);
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
    <title>Login</title>
</head>
<body>
<div id="bgimg">
   <div class="divbox" id="mainbox">
        <h1>Login</h1>
        <div id="form">
            <form method="post" action="" autocomplete="off" enctype="multipart/form-data"> 
            <fieldset id="login" name="login">
            <label for="username">Username: </label>
            <input type="text" name="username"><br>
            <label for="username">Password: </label>
            <input type="text" name="password"><br>
            <button type="submit" value="submit" name="submit">Login</button><br>
            <p class="error"><?php echo @$user->error ?></p>
            <p class="success"><?php echo @$user->success ?></p>
            </form>
        </div>
        <br><a href="register.php"><p class="logintext">Or click here to register.</p></a>
    </div>
</div>
</body>
</html>