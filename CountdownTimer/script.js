let endDate;
let intervalId; // Declare intervalId globally
const startDate = new Date().getTime(); // Initialize startDate to current time
initializeTimer();
function initializeTimer()
{
    document.getElementById("days").innerHTML = "0";
    document.getElementById("hours").innerHTML = "0";
    document.getElementById("minutes").innerHTML = "0";
    document.getElementById("seconds").innerHTML = "0";
}
document.getElementById("startTimer").addEventListener("click",()=>
{
    const userInput = document.getElementById("endDate").value;
    if(!userInput){
        alert("Please enter a valid date.");
        return;
    }
    endDate=new Date(userInput).getTime();
    if(isNaN(endDate))
    {
        alert("Invalid date format. Please enter a valid date.");
        return;
    }
    // Clear any existing interval before starting a new one
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = setInterval(updateTimer, 500);
});
function resetTimer()
{
    //reset the timer to the current time
    const now = new Date().getTime();
    const distancePending = endDate - now;
    if (distancePending <= 0) {
        document.getElementById("days").innerHTML = "0";
        document.getElementById("hours").innerHTML = "0";
        document.getElementById("minutes").innerHTML = "0";
        document.getElementById("seconds").innerHTML = "0";
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) {
            progressBar.style.width = "100%";
        }
    }
}
function updateTimer()
{ 
    const now=new Date().getTime();
    const distanceCovered=now-startDate;
    const distancePending=endDate-now;
    const totalDistance=endDate-startDate;
    // if(distancePending<=0)
    // {
    //     clearInterval();
    //     document.getElementsByTagName("h1").innerHTML="Countdown Finished!";
    // }
    //calculate days min hours sec left to display on the counter
    const days=Math.floor(distancePending/(1000*60*60*24));
    const hours=Math.floor((distancePending%(1000*60*60*24))/(1000*60*60));
    const minutes=Math.floor(distancePending%(1000*60*60)/(1000*60));
    const seconds=Math.floor((distancePending%(1000*60))/1000);

    //populate in ui
    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML=hours;
    document.getElementById("minutes").innerHTML=minutes;
    document.getElementById("seconds").innerHTML=seconds;

    //progress bar
    const percentageDistance=(distanceCovered/totalDistance)*100;
    //set width for progress bar
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        progressBar.style.width = percentageDistance + "%";
    }
    if(distancePending<=0)
    {
        clearInterval(intervalId);
        resetTimer();
        document.getElementsByTagName("h1")[0].innerHTML="Countdown Finished!";
    }
}
// Removed global setInterval to prevent multiple intervals running simultaneously