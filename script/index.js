document.getElementById("getstartedbutton").onmousedown = function mainButtonFunction () {
    let mainbox = document.getElementById("mainbox");
    mainbox.removeChild(mainbox.firstElementChild);
    mainbox.removeChild(mainbox.firstElementChild); 
    const enterInformation = document.createElement("p");
    const linebreak = document.createElement("br");
    let welcomeMsg = document.createTextNode("Welcome to Gardenia. To get started, we need some information from you to determine how best to create your personalized gardening calendar."); // Text Node for the current date/time.
    enterInformation.appendChild(welcomeMsg);
    mainbox.insertBefore(linebreak,mainbox.firstElementChild);
    mainbox.insertBefore(enterInformation,mainbox.firstElementChild);
    document.getElementById("form").style.display = "block";
}