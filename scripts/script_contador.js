const release_date = "19/11/2026";

function computeRemaining(target){
    const now = new Date();
    const diffMs = target - now;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
    return { days, hours, months, diffMs };
}

function pluralize(value, singular, plural){
    return value === 1 ? singular : plural;
}

function updateClock(){
    const elHours = document.getElementById("Horas");
    const elDays = document.getElementById("Dias");
    const elMonths = document.getElementById("Meses");
    if (!elHours || !elDays || !elMonths) return;

    const [d, m, y] = release_date.split("/").map(p => parseInt(p, 10));
    const target = new Date(y, m - 1, d);
    const { days, hours, months, diffMs } = computeRemaining(target);

    // If past release date, freeze at zero
    const safeDays = days < 0 ? 0 : days;
    const safeHours = hours < 0 ? 0 : hours;
    const safeMonths = months < 0 ? 0 : months;

    const lang = localStorage.getItem('language') === 'spanish' ? 'spanish' : 'english';
    if (lang === 'spanish'){
        elHours.textContent = `${safeHours} ${pluralize(safeHours, 'Hora', 'Horas')}`;
        elDays.textContent = `${safeDays} ${pluralize(safeDays, 'Día', 'Días')}`;
        elMonths.textContent = `${safeMonths} ${pluralize(safeMonths, 'Mes', 'Meses')}`;
    } else {
        elHours.textContent = `${safeHours} ${pluralize(safeHours, 'Hour', 'Hours')}`;
        elDays.textContent = `${safeDays} ${pluralize(safeDays, 'Day', 'Days')}`;
        elMonths.textContent = `${safeMonths} ${pluralize(safeMonths, 'Month', 'Months')}`;
    }
}

window.addEventListener('load', () => {
    updateClock();
    setInterval(updateClock, 1000);
});

// Re-render countdown labels immediately after language change
window.addEventListener('languagechange', updateClock);
