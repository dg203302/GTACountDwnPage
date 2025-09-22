const release_date = "26/06/2026";
function updateClock(){
    const elHours = document.getElementById("Horas");
    const elDays = document.getElementById("Dias");
    const elMonths = document.getElementById("Meses");
    const now = new Date();
    const parts = release_date.split("/");
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // zero-based
    const year = parseInt(parts[2]);

    const target = new Date(year, month, day);
    const diffMs = target - now;

    const daysRemaining = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(diffMs / (1000 * 60 * 60));
    const monthsRemaining = (year - now.getFullYear()) * 12 + (month - now.getMonth());

    if (elHours) elHours.textContent = hoursRemaining + " Hours";
    if (elDays) elDays.textContent = daysRemaining + " Days";
    if (elMonths) elMonths.textContent = monthsRemaining + " Months";
}
window.onload = function(){
    setInterval(updateClock, 1000);
}
