var today = new Date();

function displayTime() {
    if (document.getElementById("time").innerHTML=="Show Current Date and Time") {
        document.getElementById("time").innerHTML = "Hide Current Date and Time";
        document.getElementById("time_text").innerHTML = today;

    } else {
        document.getElementById("time").innerHTML = "Show Current Date and Time";
        document.getElementById("time_text").innerHTML= "";
    }
}

function displayMinutes() {
    if (document.getElementById("minute").innerHTML=="Show Minutes") {
        document.getElementById("minute").innerHTML = "Hide Minutes";
        document.getElementById("minute_text").innerHTML = today.getMinutes();

    } else {
        document.getElementById("minute").innerHTML = "Show Minutes";
        document.getElementById("minute_text").innerHTML= "";
    }
}

function hideVideo() {
    if (document.getElementById("hide").innerHTML=="Hide Video") {
        document.getElementById("video").style.visibility = "hidden";
        document.getElementById("hide").innerHTML= "Show Video";

    } else {
        document.getElementById("video").style.visibility = "visible";
        document.getElementById("hide").innerHTML= "Hide Video";
    }
}