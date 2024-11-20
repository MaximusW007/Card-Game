document.getElementById('start-game').addEventListener('click', () => {
    console.log('Button Clicked');
    window.electronAPI.sayHello(); // Securely calls a function exposed by preload.js
});