window.onload = function() {
    try{
        fetch('/api/obtener_mensajes')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}