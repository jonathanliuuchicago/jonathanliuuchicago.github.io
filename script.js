var today = new Date();

function displayTime() {
    document.getElementById("time").innerHTML = today;
}

function displayMinutes() {
    document.getElementById("minutes").innerHTML = today.getMinutes();
}

function hideVideo() {
    document.getElementById("video").style.visibility = "hidden";
}