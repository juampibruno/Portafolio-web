let carouselContainer = document.querySelector('.carousel-container');
let cards = document.querySelectorAll('.proyect-card');
let currentIndex = 0;
let totalCards = cards.length;
let cardWidth = cards[0].clientWidth;

function slideNext() {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  updateSlide();
}

function slidePrev() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalCards - 1;
  }
  updateSlide();
}

function updateSlide() {
  let newPosition = -currentIndex * (cardWidth + 20); // por 10 de margen de cada lado
  carouselContainer.style.transform = `translateX(${newPosition}px)`;
}

// Agregar eventos de click a los botones de navegación si los tienes
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

console.log(nextButton);
console.log(prevButton);

nextButton.addEventListener('click', slideNext);
prevButton.addEventListener('click', slidePrev);


// O puedes agregar un temporizador para que el carrusel cambie automáticamente
// setInterval(slideNext, 5000); // Cambia cada 5 segundos (5000 milisegundos)
