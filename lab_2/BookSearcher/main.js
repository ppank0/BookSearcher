const apiKey = 'AIzaSyCQsP5yJPRPIIBBZ-3SJd412hhwFmWMvVM'; 
const searchInput = document.getElementById('search-input');
const booksContainer = document.getElementById('books-container');
const notFoundElement = document.getElementById('not-found-message');
const searchIcon = document.getElementById('search-icon');


function displayBook(book) {
  const { title, imageLinks } = book.volumeInfo;

  const cardElement = document.createElement('div');
  cardElement.classList.add('card');

  const imgElement = document.createElement('img');
  imgElement.src = imageLinks ? imageLinks.thumbnail : '/BookSearcher/img/book.jpg';
  imgElement.alt = '';

  const titleElement = document.createElement('h2');
  titleElement.classList.add('book_name');
  titleElement.textContent = title;

  cardElement.appendChild(imgElement);
  cardElement.appendChild(titleElement);
  booksContainer.appendChild(cardElement);
}
const crossIconSrc ='/BookSearcher/img/icons/cross.png';
searchInput.addEventListener('click', () =>{
  console.log('Stop!');
  searchIcon.src= crossIconSrc;
})
searchIcon.addEventListener('click',()=>{
  if(searchIcon.src = crossIconSrc){
    searchInput.value = '';
    searchIcon.src='/BookSearcher/img/icons/icons-search.svg';
  }
})
searchInput.addEventListener('unclick', ()=>{
  
})
function showBooksContainer() {
  booksContainer.style.display = 'grid';
}

function hideBooksContainer() {
  booksContainer.style.display = 'none';
}

function showNotFoundMessage() {
  notFoundElement.style.display = 'block';
}

function hideNotFoundMessage() {
  notFoundElement.style.display = 'none';
}

hideBooksContainer();
hideNotFoundMessage();
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const searchQuery = searchInput.value;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
       
        booksContainer.innerHTML = '';

        if (data.items && data.items.length > 0) {
          data.items.forEach(book => {
            displayBook(book);
          });

          hideNotFoundMessage();
          showBooksContainer();
        } else {
          showNotFoundMessage();
          hideBooksContainer();
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showNotFoundMessage();
        hideBooksContainer();
      });
  }
});