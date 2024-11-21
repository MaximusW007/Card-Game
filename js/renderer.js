window.addEventListener('DOMContentLoaded', () => {
    const gameTitle = document.getElementById('game-title');
    const buttons = document.getElementById('buttons');
  
    // Add fade-in class to title immediately
    gameTitle.classList.add('fade-in');
  
    // Delay adding fade-in class to buttons
    setTimeout(() => {
      buttons.querySelectorAll('.btn').forEach(button => {
        button.classList.add('fade-in'); // Add animation to each button
      });
    }, 1500); // Delay of 1.5 seconds for buttons to fade in after the title
  });
  