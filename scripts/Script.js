const fecha_lanz = "26/06/2026"
function act_reloj(){
    let conteo_horas = document.getElementById("Horas");
    let conteo_dias = document.getElementById("Dias");
    let conteo_meses = document.getElementById("Meses");
    let fecha_act = new Date()
    let partes = fecha_lanz.split("/");
    let dia = parseInt(partes[0]);
    let mes = parseInt(partes[1]) - 1;
    let anio = parseInt(partes[2]);
    
    let fecha_objetivo = new Date(anio, mes, dia);

    let diff_ms = fecha_objetivo - fecha_act;

    let dias_restantes = Math.floor(diff_ms / (1000 * 60 * 60 * 24));
    let horas_restantes = Math.floor(diff_ms / (1000 * 60 * 60));
    let meses_restantes = (anio - fecha_act.getFullYear()) * 12 + (mes - fecha_act.getMonth());

    conteo_horas.textContent = horas_restantes+" Horas"
    conteo_dias.textContent = dias_restantes+" Dias"
    conteo_meses.textContent = meses_restantes+" Meses"
}
window.onload = function(){
    setInterval(act_reloj,1000)
}