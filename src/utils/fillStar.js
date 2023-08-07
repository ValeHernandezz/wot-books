// Definio la función que calcula y aplica las clases
function fillStars(avgRating) {
  // const stars = document.querySelectorAll(".star-container svg");
  // console.log(stars)


  // stars.forEach((star, index) => {
  //   if (index < filledStars) {
  //     star.classList.add("text-yellow-300");
  //   } else {
  //     star.classList.add("text-gray-500");
  //   }
  // });
  const stars = document.querySelectorAll(".star-container");
  const filledStars = Math.round(avgRating);

  stars.forEach((star, index) => {
    if (index < filledStars) {
      star.classList.add("text-yellow-300");
    } else {
      star.classList.add("text-gray-500");
    }
  });
}

// Exporto la función
export { fillStars };
