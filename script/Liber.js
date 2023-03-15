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
            let lateplantnumdaysfix = deltaDate(lfrost,lateplantnumdays,0,0);
            let earlyplantindoorsnumdays = plants[i].earlyplantindoorsnumdays+1;
            let earlyplantindoorsnumdaysfix = deltaDate(ffrost,earlyplantindoorsnumdays,0,0);
            let earlyplantdirectnumdays = plants[i].earlyplantdirectnumdays+1;
            let earlyplantdirectnumdaysfix = deltaDate(ffrost,earlyplantdirectnumdays,0,0);
            if (plants[i].earlyplantindoorsnumdays !== null) {
                document.getElementById("earlyplantindoors").innerHTML = plants[i].earlyplantindoors + " (" + earlyplantindoorsnumdaysfix.toDateString() + ")";
            }            
            if (plants[i].earlyplantdirectnumdays !== null) {
                document.getElementById("earlyplantdirect").innerHTML = plants[i].earlyplantdirect + " (" + earlyplantdirectnumdaysfix.toDateString() + ")";
            }            
            if (plants[i].lateplantnumdays !== null) {
                document.getElementById("lateplant").innerHTML = plants[i].lateplant + " (" + lateplantnumdaysfix.toDateString() + ")";
            }

            //cd = new Date("2023-05-25");
            //fix this
            if (ffrost < cd && cd < lfrost) {
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
                var tempEvent = {"id": "",
                "name": "",
                "startdate": "2023-01-01",
                "color": "#000"}  ;   
                tempEvent.id = String(plants.length);
                tempEvent.name = "First frost.";     
                tempEvent.startdate = String(formatDate(ffrost));
                tempEvent.color = "#284b6d";
                eventslist["monthly"].push(tempEvent);
                //add last frost
                tempEvent.id = String(plants.length);
                tempEvent.name = "Last frost.";     
                tempEvent.startdate = String(formatDate(lfrost));
                tempEvent.color = "#284b6d";
                eventslist["monthly"].push(tempEvent);
                //add compost date
                tempEvent.id = String(plants.length);
                tempEvent.name = "Apply compost (Or when soil is ready).";     
                tempEvent.startdate = String(deltaDate(lfrost,-42,0,0));
                tempEvent.color = "#284b6d";
                eventslist["monthly"].push(tempEvent);


}
function hideAll(){
    //hide all initially
let x = document.querySelectorAll("[data-eventid]");
console.log(x);
            for (var i = 0; i < x.length; i++) {
               x[i].style.display="none";
            }
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
 

function onCalendarInput() {
    var plantSelected = document.getElementById("plantselect");
    for (var i = 0; i < plants.length; i++) {
        if (plants[i].commonname == plantSelected.value && isShown[i] == false) {
            isShown[i] = true;
            //document.getElementById("commonname").innerHTML = plants[i].commonname;
            var cd = new Date(); // current date
            container = document.createElement("button");
            container.onclick = function() {isShown[i] = false; this.style.display = "none";};
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