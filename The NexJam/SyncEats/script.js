let navbar = document.querySelector('.navbar')

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  loginForm.classList.remove('active');
  searchForm.classList.remove('active');
}


let searchForm = document.querySelector('.search-form')

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
  loginForm.classList.remove('active');
}

window.onscroll = () => {
  navbar.classList.remove('active');
  loginForm.classList.remove('active');
  searchForm.classList.remove('active');
}

var swiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
window.onload = () => {
  const listings = Array.from(document.getElementsByClassName('listings'))

  // loop through listings
  listings.forEach(listing => handleSlider(listing))
}

// define function to handle slider
const handleSlider = listing => {
  const listingsGrid = listing.getElementsByClassName('listings-grid')[0]
  const arrowLeft = listing.getElementsByClassName('left')[0]
  const arrowRight = listing.getElementsByClassName('right')[0]

  if (!listingsGrid || !arrowLeft || !arrowRight) {
    console.log(listing)
    return
  }

  arrowRight.addEventListener('click', e => {
    // prevent default button behaviour
    e.preventDefault()

    handleClassChange('right')

    listingsGrid.scrollTo({
      left: listingsGrid.offsetWidth,
      behaviour: 'smooth',
    })
  })

  arrowLeft.addEventListener('click', e => {
    e.preventDefault()

    handleClassChange('left')

    listingsGrid.scrollTo({
      left: 0,
      behaviour: 'smooth',
    })
  })

  const handleClassChange = direction => {
    if (direction == 'right') {
      arrowRight.classList.remove('darker')
      arrowLeft.classList.add('darker')
    } else if (direction == 'left') {
      arrowLeft.classList.remove('darker')
      arrowRight.classList.add('darker')
    }
  }
}

const fs = require('fs');
const keywordsData = JSON.parse(fs.readFileSync('keywords.json'));
const keywordsArray = keywordsData.keywords;

function recommendWebsite(searchQuery, keywordsArray) {
  const matchedKeywords = keywordsArray.filter(keyword =>
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return matchedKeywords.length > 0 ?
      "Your website might be relevant to users searching for: " + matchedKeywords.join(", ") :
      "No relevant recommendations found for the search query.";
}

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  const searchQuery = document.getElementById("searchInput").value;
  const recommendationElement = document.getElementById("recommendation");

  // Call the recommendation function
  const recommendation = recommendWebsite(searchQuery, keywordsArray);

  // Display recommendation on the page
  recommendationElement.textContent = recommendation;
});
