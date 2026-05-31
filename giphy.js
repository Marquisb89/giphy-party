// Select Elements
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-term');
const gifArea = document.querySelector('#gif-area');
const removeBtn = document.querySelector('#remove-gifs');

// GIPHY API key 
const API_KEY = '6itz0O7HAl3aVhcAqpbjEqDAe9ERIpFB';

// Handle Form Submit
form.addEventListener('submit', async function (evt) {
  evt.preventDefault();

  const term = searchInput.value.trim();
  if (!term) return;

  await getAndDisplayGif(term);
  searchInput.value = '';
});

// Make API Request
async function getAndDisplayGif(searchTerm) {
  try {
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        q: searchTerm,
        api_key: API_KEY,
        limit: 25
      }
    });

    // Check the data
    // console.log(res.data);

    appendRandomGif(res.data);
  } catch (err) {
    console.error('Error fetching from Giphy:', err);
  }
}

// Append a Random GIF
function appendRandomGif(apiData) {
  const gifs = apiData.data;
  if (!gifs.length) return;

  const randomIdx = Math.floor(Math.random() * gifs.length);
  const gifUrl = gifs[randomIdx].images.original.url;

  const newImg = document.createElement('img');
  newImg.src = gifUrl;
  newImg.alt = 'Giphy gif';

  gifArea.appendChild(newImg);
}

// Remove All GIFs
removeBtn.addEventListener('click', function () {
  gifArea.innerHTML = '';
});





