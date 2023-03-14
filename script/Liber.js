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

            //cd = new Date("2023-05-25");
            if (ffrost < cd && cd < lfrost) {
                document.getElementById("canbeplanted").innerHTML = "Yes."
            } else {
                document.getElementById("canbeplanted").innerHTML = "No."
            }

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
            return;
        }
    }
}