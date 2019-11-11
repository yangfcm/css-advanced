const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

let slideIndex = 1;
const showSlides = (n) => { // Show the n th slide
  slideIndex = n;
  let slides = document.querySelectorAll(".carousel__img-container");
  if(n > slides.length) {
    slideIndex = 1;
  }
  if(n < 1) {
    slideIndex = slides.length;
  }
  for(var i=0; i<slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

const showNextSlide = () => { // Show next slide (animation)
  let slides = document.querySelectorAll(".carousel__img-container");
  let slideToLeave = slides[slideIndex-1];  // The current slide is about to move away
  slideIndex++;
  if(slideIndex > slides.length) {
    slideIndex = 1;
  }
  for(var i=0; i<slides.length; i++) {
    slides[i].style.display = "none";
  }

  let slideToEnter = slides[slideIndex-1];  // The next slide is about to enter in
  
  slideToEnter.style.display = 'block';
  slideToLeave.style.display = 'block';
  
  slideToEnter.style.left = document.documentElement.clientWidth + 'px';
  slideToLeave.style.left = '0px';

  
  let left = 0;
  const intervalId = setInterval(() => {
    if(left <= -document.documentElement.clientWidth ) {
      clearInterval(intervalId);
      
      slideToEnter.style.left = 0 + 'px';
      next.addEventListener('click', showNextSlide);
    } else {
      left = left-10;
      slideToLeave.style.left = left + 'px';
      slideToEnter.style.left = document.documentElement.clientWidth + left + 'px';
      next.removeEventListener('click', showNextSlide);
    }
  }, 1);
}

const showPrevSlide = () => {   // Show previous slide(animation)
  let slides = document.querySelectorAll(".carousel__img-container");  
  let slideToLeave = slides[slideIndex-1];  // The current slide is about to move away
  
  slideIndex--;   // Caculate the next slide's index
  if(slideIndex < 1) {
    slideIndex = slides.length;
  }
  for(var i=0; i<slides.length; i++) {
    slides[i].style.display = "none";
  }

  let slideToEnter = slides[slideIndex-1];  // The previous slide is about to enter in

  slideToEnter.style.display = 'block';
  slideToLeave.style.display = 'block';
  slideToEnter.style.left = -document.documentElement.clientWidth + 'px';
  slideToLeave.style.left = '0px';

  
  let left = 0;
  const intervalId = setInterval(() => {
    if(left >= document.documentElement.clientWidth) {
      clearInterval(intervalId);
      slideToEnter.style.left = 0 + 'px';
      prev.addEventListener('click', showPrevSlide);
    } else {
      left = left+10;
      slideToLeave.style.left = left + 'px';
      slideToEnter.style.left = left-document.documentElement.clientWidth + 'px';
      prev.removeEventListener('click', showPrevSlide);
    }
  }, 1);

}

showSlides(1);

prev.addEventListener('click', showPrevSlide);

next.addEventListener('click', showNextSlide);