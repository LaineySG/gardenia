function ListFiller () { // Fills datalist choices with all plant values in plants.js
    for (var i = 0; i < plants.length; i++) {
        var plant = plants[i];
        const plantlistlookup = document.getElementById("lookupplants");
        const plantlistentry = document.createElement("option");
        plantlistentry.value = plant.commonname;
        plantlistlookup.appendChild(plantlistentry,plantlistlookup.firstElementChild)
    }
}

function deltaDate(input, days, months, years) { // Returns difference or sum between dates
    return new Date(
        input.getFullYear() + years, 
        input.getMonth() + months, 
        Math.min(
            input.getDate() + days,
            new Date(input.getFullYear() + years, input.getMonth() + months + 1, 0).getDate()
        )
    );
}

function onInput() { // changes the LiberHerbarum info and picture to the selected plant.
    var plantSelected = document.getElementById("plantselect");
    for (var i = 0; i < plants.length; i++) { // For each plant in plants.js
        if (plants[i].commonname == plantSelected.value) { // if that plant is selected
            document.getElementById("commonname").innerHTML = plants[i].commonname;
            document.getElementById("scientificname").innerHTML = plants[i].scientificname;
            document.getElementById("alsocalled").innerHTML = plants[i].alsocalled;
            document.getElementById("perennial").innerHTML = plants[i].perennial;
            document.getElementById("daystogerminate").innerHTML = plants[i].daystogerminate;
            document.getElementById("maturationtime").innerHTML = plants[i].maturationtime;
            document.getElementById("yield").innerHTML = plants[i].yield;
            document.getElementById("plantdepth").innerHTML = plants[i].plantdepth;
            document.getElementById("plantspace").innerHTML = plants[i].plantspace;
            document.getElementById("plantheight").innerHTML = plants[i].plantheight;
            document.getElementById("howtoharvest").innerHTML = plants[i].howtoharvest;
            document.getElementById("special").innerHTML = plants[i].special;
            document.getElementById("soil").innerHTML = plants[i].soil;
            document.getElementById("description").innerHTML = plants[i].description;
            document.getElementById("rockfact").innerHTML = plants[i].rockfact;
            document.getElementById("infopic").src = plants[i].srcimage;

            var hzone = Cookies.get('hardiness_zone');
            ffrost = new Date(Cookies.get('first_frost'));
            lfrost = new Date(Cookies.get('last_frost'));

            let lateplant_days_num = plants[i].lateplantnumdays+1; // add 1 to fix result
            let lateplant_days_num_delta = deltaDate(ffrost,lateplant_days_num,0,0);
            let earlyplant_indoor_days_num = plants[i].earlyplantindoorsnumdays+1;
            let earlyplant_indoor_days_num_delta = deltaDate(lfrost,earlyplant_indoor_days_num,0,0);
            let earlyplant_direct_days_num = plants[i].earlyplantdirectnumdays+1;
            let earlyplant_direct_days_num_delta = deltaDate(lfrost,earlyplant_direct_days_num,0,0);

            if (plants[i].earlyplantindoorsnumdays !== null) {
                document.getElementById("earlyplantindoors").innerHTML = plants[i].earlyplantindoors + " (" + earlyplant_indoor_days_num_delta.toDateString() + ")";
            } else { 
                document.getElementById("earlyplantindoors").innerHTML ="";
            }       

            if (plants[i].earlyplantdirectnumdays !== null) {
                document.getElementById("earlyplantdirect").innerHTML = plants[i].earlyplantdirect + " (" + earlyplant_direct_days_num_delta.toDateString() + ")";
            } else { 
                document.getElementById("earlyplantdirect").innerHTML ="";
            }    

            if (plants[i].lateplantnumdays !== null) {
                document.getElementById("lateplant").innerHTML = plants[i].lateplant + " (" + lateplant_days_num_delta.toDateString() + ")";
            } else { 
                document.getElementById("lateplant").innerHTML ="";
            }    

            current_date = new Date(); 
            if ((current_date > earlyplant_indoor_days_num_delta || current_date > earlyplant_direct_days_num_delta) && (current_date < lateplant_days_num_delta )) {
                document.getElementById("canbeplanted").innerHTML = "Yes.";
            } else {
                document.getElementById("canbeplanted").innerHTML = "No.";
            }

            return;

        }
    }
}

function CalendarStartUp() { //On startup, add all events.
    isShown = [];
    for (var i=0; i<plants.length; i++) {
        isShown[i] = false;
    }
    eventslist = {"monthly": []} // Creates empty event array

    for (var i = 0; i < plants.length; i++) {
        //add all events
        var hzone = Cookies.get('hardiness_zone');
        ffrost = new Date(Cookies.get('first_frost'));
        lfrost = new Date(Cookies.get('last_frost'));

        let lateplantnumdays = plants[i].lateplantnumdays+1; // add 1 to fix result
        let lateplantnumdaysdelta = deltaDate(ffrost,lateplantnumdays,0,0);
        let earlyplantindoorsnumdays = plants[i].earlyplantindoorsnumdays+1;
        let earlyplantindoorsnumdaysdelta = deltaDate(lfrost,earlyplantindoorsnumdays,0,0);
        let earlyplantdirectnumdays = plants[i].earlyplantdirectnumdays+1;
        let earlyplantdirectnumdaysdelta = deltaDate(lfrost,earlyplantdirectnumdays,0,0);   
        //Gets the new dates based on the integer difference from first and last frost date for plantings.

        if (plants[i].earlyplantindoorsnumdays !== null) { // If data exists for date to plant, create & push event
            var tempEvent = {"id": "0", "name": "", "startdate": "2023-01-01", "color": "#000"};       
            tempEvent.id = String(i);
            tempEvent.name = "Can start " + plants[i].commonname + " indoors.";   
            tempEvent.startdate = String(formatDate(earlyplantindoorsnumdaysdelta));
            tempEvent.color = "#634f09";
            eventslist["monthly"].push(tempEvent);
        }            
        if (plants[i].earlyplantdirectnumdays !== null) { // If data exists for date to plant, create & push event
            var tempEvent = {"id": "0", "name": "", "startdate": "2023-01-01", "color": "#000"};  
            tempEvent.id = String(i);
            tempEvent.name = "Can plant " + plants[i].commonname + " outdoors."; 
            tempEvent.startdate = String(formatDate(earlyplantdirectnumdaysdelta));
            tempEvent.color = "#455e44";  
            eventslist["monthly"].push(tempEvent);
        }            
        if (plants[i].lateplantnumdays !== null) { // If data exists for date to plant, create & push event
            var tempEvent = {"id": "0", "name": "", "startdate": "2023-01-01", "color": "#000"};  
            tempEvent.id = String(i);
            tempEvent.name = "Planting " + plants[i].commonname + " not recommended past this date.";     
            tempEvent.startdate = String(formatDate(lateplantnumdaysdelta));
            tempEvent.color = "#692222";
            eventslist["monthly"].push(tempEvent);
        }
    }
        //add first frost
        var tempEvent = {};   
        tempEvent.id = String(-1);
        tempEvent.name = "First frost.";     
        tempEvent.startdate = String(formatDate(ffrost));
        tempEvent.color = "#284b6d";
        eventslist["monthly"].push(tempEvent);
        //add last frost
        var tempEvent = {};   
        tempEvent.id = String(-1);
        tempEvent.name = "Last frost.";     
        tempEvent.startdate = String(formatDate(lfrost));
        tempEvent.color = "#284b6d";
        eventslist["monthly"].push(tempEvent);
        //add compost date
        var tempEvent = {};   
        tempEvent.id = String(-1);
        tempEvent.name = "Apply compost (Or when soil is ready).";     
        tempEvent.startdate = String(formatDate(deltaDate(lfrost,-42,0,0)));
        tempEvent.color = "#284b6d";
        eventslist["monthly"].push(tempEvent);
}

function formatDate(date) { // formats dates.
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
function submitregisterform() { // Creates cookies based on registration values, changes page to liber herbarum.
    var lfrost = document.getElementById("lastfrost").value;
    var ffrost = document.getElementById("firstfrost").value;
    var hzone = document.getElementById("hzone").value;

    if (lfrost !== null && ffrost !== null && hzone !== null) {
        Cookies.set("last_frost", lfrost);
        Cookies.set("first_frost", ffrost);
        Cookies.set("hardiness_zone", hzone);
        window.location.href = "liberherbarum.html";
    }

}

function onCalendarInput() { // On calendar plant selection, shows event if hidden, creates clickable button.
    var plantSelected = document.getElementById("plantselect");
    for (var i = 0; i < plants.length; i++) {
        if (plants[i].commonname == plantSelected.value && isShown[i] == false) {
            //For each plant i, if the name is the selected name and it's not shown then proceed.
            isShown[i] = true; // Set shown to true
            let z = document.querySelectorAll(`[data-eventid="${i}"]`);
            //z is set to all events with the ID matching the plant's ID (ID being numerical value in the plants.js array.)
            for (var j = 0; j<z.length; j++) { // Make it visible.
                z[j].style.display="block";
            }
            
            //Adds a button for each selected value
            var current_date = new Date(); // current date
            container = document.createElement("button");
            container.onclick = function() {
                isShown[i] = false; this.style.display = "none"; hideAll();
            }; // allows for clicking to hide it, mark it as hidden, and run hideAll function to refresh values.
            container.classList.add("smallbtn");
            plantname = document.createTextNode("X " + plants[i].commonname);
            container.appendChild(plantname);
            document.getElementById("selectedItems").appendChild(container);
            return;
        }
    }
}

function hideAll(){ // Hides all events unless "isShown" is true for that event. Also keeps compost and frost events shown.
    //hides all events initially
    let x = document.querySelectorAll("[data-eventid]");
    for (var i = 0; i < x.length; i++) {
        x[i].style.display="none";
    }

    // Unhides it if it's meant to be shown
    for (var i = 0; i < plants.length; i++) {
        let z = document.querySelectorAll(`[data-eventid="${i}"]`);
        if (isShown[i]) { 
            for (var j = 0; j < z.length; j++) {
                z[j].style.display="block";
            }
        }
    }

    //unhide compost/lfrost/ffrost
    let y = document.querySelectorAll("[data-eventid='-1']")
    for (var i = 0; i < y.length; i++) {
        y[i].style.display="block";
    }
}

function showAll(){ //Shows or hides all events based on checkbox state.
    var check_if_checked = document.getElementById('showallbox');
    if(check_if_checked.checked){
        for (var i = 0; i < plants.length; i++) { // if checked, for all plants set isShown to true
            isShown[i] = true;
        }
        } else {
        for (var i = 0; i < plants.length; i++) {
            isShown[i] = false;
        }
        //And hide all event buttons when unchecked.
        var button_elements = document.getElementsByClassName("smallbtn")
        for (var i=0; i < button_elements.length; i++) {
            button_elements[i].style.display="none";
        }
        }
hideAll(); //refreshes values for hidden and shown events given new checked or unchecked state.
}