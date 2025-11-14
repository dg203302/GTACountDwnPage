async function cargarMensajes(){
    const btn = document.getElementById('btnRefresh');
    const contenedor = document.getElementById('mensajes');
    const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('language') === 'spanish') ? 'spanish' : 'english';
    const loadingText = lang === 'spanish' ? 'Cargando...' : 'Loading...';
    try{
        if (btn){
            btn.classList.add('loading');
            btn.setAttribute('aria-busy', 'true');
            btn.disabled = true;
        }
        if (contenedor){
            contenedor.textContent = loadingText;
        }
        const res = await fetch('/api/obtener_mensajes');
        const data = await res.json();
        renderizarMensajes(data);
    } catch (error) {
        console.error('Error fetching messages:', error);
        if (contenedor){
            contenedor.textContent = lang === 'spanish' ? 'Error al cargar' : 'Error loading';
        }
    } finally {
        if (btn){
            btn.classList.remove('loading');
            btn.removeAttribute('aria-busy');
            btn.disabled = false;
        }
    }
}

window.onload = function() {
    cargarMensajes();
    const btn = document.getElementById('btnRefresh');
    if (btn) btn.addEventListener('click', cargarMensajes);

    // Enable/disable Send button based on input content
    const input = document.getElementById('input_enviar_msg');
    const btnSend = document.querySelector('.accion_usuario button[data-i18n="forum.send"]');
    function updateSendState(){
        if (!input || !btnSend) return;
        const len = input.value.trim().length;
        btnSend.disabled = len < 3; // require 3+ chars
    }
    if (input) {
        input.addEventListener('input', updateSendState);
        updateSendState();
    }
}

async function renderizarMensajes(mensajes){
    const contenedor = document.getElementById('mensajes');
    contenedor.innerHTML = '';
    mensajes.forEach(msg => {
        const p = document.createElement('p');
        p.textContent = formatearFecha(msg.F_creacion) + " - " + msg.mensaje_enviado;
        contenedor.appendChild(p);
    });
}

function formatearFecha(fecha) {
    if (!fecha) return '';
    const s = String(fecha).trim();
    const re = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})(\.(\d+))?([+-]\d{2}:?\d{2}|Z|[+-]\d{2})?$/;
    let iso = null;
    const m = s.match(re);
    if (m) {
        const datePart = m[1];
        const timePart = m[2];
        const frac = (m[4] || '').slice(0, 3).padEnd(3, '0'); // milliseconds
        let offset = m[5] || 'Z';
        if (offset === '+00' || offset === '+0000' || offset === '+00:00') offset = 'Z';
        else if (/^[+-]\d{2}$/.test(offset)) offset = offset + ':00';
        else if (/^[+-]\d{4}$/.test(offset)) offset = offset.slice(0, 3) + ':' + offset.slice(3);
        iso = `${datePart}T${timePart}${frac ? '.' + frac : ''}${offset}`;
    }
    const d = iso ? new Date(iso) : new Date(s.replace(' ', 'T'));
    if (isNaN(d)) return s; // fallback if unparseable
    const lang = (typeof localStorage !== 'undefined' && localStorage.getItem('language') === 'spanish') ? 'es-ES' : undefined;
    const opts = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat(lang, opts).format(d);
}

async function enviarMSG(){
    const btnSend = document.querySelector('.accion_usuario button[data-i18n="forum.send"]');
    const input = document.getElementById('input_enviar_msg');
    if (!input) return;
    const text = input.value.trim();
    if (text.length < 3){
        alert(lang === 'spanish' ? 'Escribe al menos 3 caracteres' : 'Type at least 3 characters');
        return;
    }
    try{
        if (btnSend){
            btnSend.classList.add('loading');
            btnSend.setAttribute('aria-busy','true');
            btnSend.disabled = true;
        }
        const res = await fetch('/api/enviar_mensaje', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mensaje_enviado: text })
        });
        if (!res.ok) throw new Error('Failed');
        input.value = '';
        await cargarMensajes();
    } catch (e){
        console.error('Error sending message:', e);
        alert(lang === 'spanish' ? 'Error al enviar el mensaje' : 'Failed to send message');
    } finally {
        if (btnSend){
            btnSend.classList.remove('loading');
            btnSend.removeAttribute('aria-busy');
            btnSend.disabled = !input || input.value.trim().length < 3;
        }
    }
}
window.enviarMSG = enviarMSG;