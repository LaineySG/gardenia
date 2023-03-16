function ListFiller () {
    for (var i = 0; i < plants.length; i++) {
        var plant = plants[i];
        const plantlistlookup = document.getElementById("lookupplants");
        const plantlistentry = document.createElement("option");
        plantlistentry.value = plant.commonname;
        plantlistlookup.appendChild(plantlistentry,plantlistlookup.firstElementChild)
    }
}

function deltaDate(input, days, months, years) {
    return new Date(
      input.getFullYear() + years, 
      input.getMonth() + months, 
      Math.min(
        input.getDate() + days,
        new Date(input.getFullYear() + years, input.getMonth() + months + 1, 0).getDate()
      )
    );
}
function onInput() {
    var plantSelected = document.getElementById("plantselect");
    for (var i = 0; i < plants.length; i++) {
        if (plants[i].commonname == plantSelected.value) {
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
            var cd = new Date(); // current date

            var hzone = Cookies.get('hardiness_zone');
            ffrost = new Date(Cookies.get('first_frost'));
            lfrost = new Date(Cookies.get('last_frost'));

            let lateplantnumdays = plants[i].lateplantnumdays+1; // add 1 to fix result
            let lateplantnumdaysfix = deltaDate(ffrost,lateplantnumdays,0,0);
            let earlyplantindoorsnumdays = plants[i].earlyplantindoorsnumdays+1;
            let earlyplantindoorsnumdaysfix = deltaDate(lfrost,earlyplantindoorsnumdays,0,0);
            let earlyplantdirectnumdays = plants[i].earlyplantdirectnumdays+1;
            let earlyplantdirectnumdaysfix = deltaDate(lfrost,earlyplantdirectnumdays,0,0);
            if (plants[i].earlyplantindoorsnumdays !== null) {
                document.getElementById("earlyplantindoors").innerHTML = plants[i].earlyplantindoors + " (" + earlyplantindoorsnumdaysfix.toDateString() + ")";
            } else { document.getElementById("earlyplantindoors").innerHTML =""}            
            if (plants[i].earlyplantdirectnumdays !== null) {
                document.getElementById("earlyplantdirect").innerHTML = plants[i].earlyplantdirect + " (" + earlyplantdirectnumdaysfix.toDateString() + ")";
            } else { document.getElementById("earlyplantindoors").innerHTML =""}                
            if (plants[i].lateplantnumdays !== null) {
                document.getElementById("lateplant").innerHTML = plants[i].lateplant + " (" + lateplantnumdaysfix.toDateString() + ")";
            } else { document.getElementById("earlyplantindoors").innerHTML =""}    
            cd = new Date(); // current date
            if ((cd > earlyplantindoorsnumdaysfix || cd > earlyplantdirectnumdaysfix) && (cd < lateplantnumdaysfix )) {
                document.getElementById("canbeplanted").innerHTML = "Yes."
            } else {
                document.getElementById("canbeplanted").innerHTML = "No."
            }

            return;

        }
    }
}

function CalendarStartUp() {
    isShown = [];
    for (var i=0; i<plants.length; i++) {
        isShown[i] = false;
    }

    eventslist = {
        "monthly": [
          
        ]
      }

    for (var i = 0; i < plants.length; i++) {
            //add all events
            var hzone = Cookies.get('hardiness_zone');
            ffrost = new Date(Cookies.get('first_frost'));
            console.log(ffrost);
            lfrost = new Date(Cookies.get('last_frost'));
            let lateplantnumdays = plants[i].lateplantnumdays+1; // add 1 to fix result
            let lateplantnumdaysfix = deltaDate(ffrost,lateplantnumdays,0,0);
            let earlyplantindoorsnumdays = plants[i].earlyplantindoorsnumdays+1;
            let earlyplantindoorsnumdaysfix = deltaDate(lfrost,earlyplantindoorsnumdays,0,0);
            let earlyplantdirectnumdays = plants[i].earlyplantdirectnumdays+1;
            let earlyplantdirectnumdaysfix = deltaDate(lfrost,earlyplantdirectnumdays,0,0);   


            if (plants[i].earlyplantindoorsnumdays !== null) {
                var tempEvent = {"id": "0",
                "name": "",
                "startdate": "2023-01-01",
                "color": "#000"}  ;       
                tempEvent.id = String(i);
                tempEvent.name = "Can start " + plants[i].commonname + " indoors.";   
                tempEvent.startdate = String(formatDate(earlyplantindoorsnumdaysfix));
                tempEvent.color = "#634f09";
                eventslist["monthly"].push(tempEvent);
            }            
            if (plants[i].earlyplantdirectnumdays !== null) {
                var tempEvent = {"id": "0",
                "name": "",
                "startdate": "2023-01-01",
                "color": "#000"}  ;      
                tempEvent.id = String(i);
                tempEvent.name = "Can plant " + plants[i].commonname + " outdoors."; 
                tempEvent.startdate = String(formatDate(earlyplantdirectnumdaysfix));
                tempEvent.color = "#455e44";  
                eventslist["monthly"].push(tempEvent);
            }            
            if (plants[i].lateplantnumdays !== null) {
                var tempEvent = {"id": "0",
                "name": "",
                "startdate": "2023-01-01",
                "color": "#000"}  ;   
                tempEvent.id = String(i);
                tempEvent.name = "planting " + plants[i].commonname + " not recommended past this date.";     
                tempEvent.startdate = String(formatDate(lateplantnumdaysfix));
                tempEvent.color = "#692222";
                eventslist["monthly"].push(tempEvent);
            }
}
                //add first frost
                var tempEvent = {}  ;   
                tempEvent.id = String(-1);
                tempEvent.name = "First frost.";     
                tempEvent.startdate = String(formatDate(ffrost));
                tempEvent.color = "#284b6d";
                eventslist["monthly"].push(tempEvent);
                //add last frost
                var tempEvent = {}  ;   
                tempEvent.id = String(-1);
                tempEvent.name = "Last frost.";     
                tempEvent.startdate = String(formatDate(lfrost));
                tempEvent.color = "#284b6d";
                eventslist["monthly"].push(tempEvent);
                //add compost date
                var tempEvent = {}  ;   
                tempEvent.id = String(-1);
                tempEvent.name = "Apply compost (Or when soil is ready).";     
                tempEvent.startdate = String(formatDate(deltaDate(lfrost,-42,0,0)));
                tempEvent.color = "#284b6d";
                eventslist["monthly"].push(tempEvent);


}



function formatDate(date) {
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
 
function submitregisterform() {
    var lfrost = document.getElementById("lastfrost").value;
    var ffrost = document.getElementById("firstfrost").value;
    var hzone = document.getElementById("hzone").value;
    console.log(lfrost,ffrost,hzone);
    if (lfrost !== null && ffrost !== null && hzone !== null) {
    Cookies.set("last_frost", lfrost,  { expires: 7 });
    Cookies.set("first_frost", ffrost,  { expires: 7 });
    Cookies.set("hardiness_zone", hzone,  { expires: 7 });
    window.location.href = "LiberHerbarum.html";
    }

}

function onCalendarInput() {
    var plantSelected = document.getElementById("plantselect");
    for (var i = 0; i < plants.length; i++) {
        if (plants[i].commonname == plantSelected.value && isShown[i] == false) {
            isShown[i] = true;
            console.log(i);

            let z = document.querySelectorAll(`[data-eventid="${i}"]`);
            for (var j = 0; j<z.length; j++) {
                z[j].style.display="block";
            }
                
            
            //document.getElementById("commonname").innerHTML = plants[i].commonname;
            var cd = new Date(); // current date
            container = document.createElement("button");
            container.onclick = function() {isShown[i] = false; this.style.display = "none"; hideAll();};
            container.classList.add("smallbtn");
            plantname = document.createTextNode("X " + plants[i].commonname);
            container.appendChild(plantname);
            document.getElementById("selectedItems").appendChild(container);
            //add new events



            var hzone = Cookies.get('hardiness_zone');
            ffrost = new Date(Cookies.get('first_frost'));
            lfrost = new Date(Cookies.get('last_frost'));
            let lateplantnumdays = plants[i].lateplantnumdays+1; // add 1 to fix result
            let lateplantnumdaysfix = deltaDate(lfrost,lateplantnumdays,0,0);
            let earlyplantindoorsnumdays = plants[i].earlyplantindoorsnumdays+1;
            let earlyplantindoorsnumdaysfix = deltaDate(ffrost,earlyplantindoorsnumdays,0,0);
            let earlyplantdirectnumdays = plants[i].earlyplantdirectnumdays+1;
            let earlyplantdirectnumdaysfix = deltaDate(ffrost,earlyplantdirectnumdays,0,0);
            var tempEvent = {"id": "0",
            "name": "",
            "startdate": "2023-01-01",
            "enddate": "2023-01-01",
            "color": "#000"}

            if (plants[i].earlyplantindoorsnumdays !== null) {
                tempEvent.id = String(i);
                tempEvent.name = "Can start " + plants[i].commonname + " indoors.";   
                tempEvent.startdate = String(formatDate(earlyplantindoorsnumdaysfix));
                tempEvent.enddate = String(formatDate(earlyplantindoorsnumdaysfix));  
                tempEvent.color = "#634f09";
            }            
            if (plants[i].earlyplantdirectnumdays !== null) {   
                tempEvent.id = String(i);
                tempEvent.name = "Can plant " + plants[i].commonname + " outdoors."; 
                tempEvent.startdate = String(formatDate(earlyplantdirectnumdaysfix));
                tempEvent.enddate = String(formatDate(earlyplantdirectnumdaysfix));   
                tempEvent.color = "#455e44"; 
            }            
            if (plants[i].lateplantnumdays !== null) {
                tempEvent.id = String(i);
                tempEvent.name = "planting " + plants[i].commonname + " not recommended past this date.";     
                tempEvent.startdate = String(formatDate(lateplantnumdaysfix));
                tempEvent.enddate = String(formatDate(lateplantnumdaysfix));  
                tempEvent.color = "#692222";
            }
            return;
        }}}

function hideAll(){
    //hide all initially
    let x = document.querySelectorAll("[data-eventid]");
    console.log(eventslist);
    for (var i = 0; i < x.length; i++) {
        x[i].style.display="none";
    }


    for (var i = 0; i < plants.length; i++) {
        let z = document.querySelectorAll(`[data-eventid="${i}"]`);
        if (isShown[i]) { // if it's meant to be shown
            for (var j = 0; j<z.length; j++) {
                z[j].style.display="block";
            }
        }
    }

    //unhide compost/lfrost/ffrost
    let y = document.querySelectorAll("[data-eventid='-1']")
    for (var i = 0; i<y.length; i++) {
        y[i].style.display="block";
    }
}
function showAll(){
    var check_if_checked = document.getElementById('showallbox');
    if(check_if_checked.checked){
        for (var i = 0; i < plants.length; i++) {
            isShown[i] = true;
    }
    hideAll(); 
} else {
    for (var i = 0; i < plants.length; i++) {
        isShown[i] = false;
}
hideAll();

var button_elements = document.getElementsByClassName("smallbtn")
for (var i=0; i < button_elements.length; i++) {
    button_elements[i].style.display="none";
}

}
}