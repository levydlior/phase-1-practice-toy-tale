let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
const toyCollection = document.querySelector('#toy-collection')
const addNewToyForm = document.querySelector('form')

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
 
  });



const toysURL = 'http://localhost:3000/toys'

fetch(toysURL)
  .then(response => response.json())
  .then(toys => toys.forEach(toy => renderToy(toy)))




function renderToy(toy){
  const divCard = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const button = document.createElement('button')

  divCard.className = 'card'
  h2.textContent = toy.className
  img.src = toy.image
  img.alt = toy.name
  img.className = "toy-avatar"
  p.textContent = toy.likes + ' Likes'
  button.className = 'like-btn' 
  button.id = `${toy.id}`
  button.textContent = "Like <3"



  button.addEventListener('click', ()=> {
    const updateLikes = parseInt(p.textContent) + 1
    
    fetch(`${toysURL}/${toy.id}`,{
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        likes: updateLikes
      })
    }).then(response => response.json())
    .then(p.textContent = updateLikes + " Likes" )
  }) 



  divCard.append(h2, img, p, button)
  toyCollection.appendChild(divCard)
}

addNewToyForm.addEventListener('submit', e => {
  e.preventDefault()
  const newToyFormData = new FormData(e.target)

  const toyName = newToyFormData.get('name')
  const toyImage = newToyFormData.get('image')

  const newToyObject = {
    name: toyName,
    image: toyImage,
    likes: 0,
  }

  addNewToyForm.reset()
  fetch(toysURL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToyObject)
  }).then(response => response.json())
    .then(toys => renderToy(toys))
})










});
