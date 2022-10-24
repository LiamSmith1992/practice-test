let kittens = []
let kittenHistory = []
loadKittens()
drawKittens()



 /**
  * Called when submitting the new Kitten Form
  * This method will pull data from the form
  * use the provided function to give the data an id
  * then add that data to the kittens list.
  * Then reset the form
  */
 function addKitten(event) {
  debugger
  event.preventDefault()
  let form = event.target
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
  }
  

  let kittenName = form.name.value;

  if (kittenName == "") {alert("please enter name")
}
  else if(kittenHistory.includes(kittenName)){
  alert("name already exists")
}
   else {
    kittens.push(kitten)
    kittenHistory.push(kittenName)
    saveKittens()
    form.reset()
    drawKittens()
  
   } 
 }

 /**
  * Converts the kittens array to a JSON string then
  * Saves the string to localstorage at the key kittens 
  */
 function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
  window.localStorage.setItem("kittenHistory", JSON.stringify(kittenHistory))
  drawKittens()  
  
 }

 

 /**
  * Attempts to retrieve the kittens string from localstorage
  * then parses the JSON string into an array. Finally sets
  * the kittens array to the retrieved array
  */
 function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if(storedKittens) {
    kittens = storedKittens
  }
  let pleaseWork = JSON.parse(window.localStorage.getItem("kittenHistory"))
  if(pleaseWork) {
    kittenHistory = pleaseWork
  }
 }

 /**
  * Draw all of the kittens to the kittens element
  */
 function drawKittens() {
   let kittensTemplet = ""
   kittens.forEach( kitten => {
     kittensTemplet += `
     <div class=" col-2 mx-2 mt-2 card kitten ${kitten.mood}">
     <i class="action" onclick = " removeKitten('${kittens.id}')">X</i>
     <img class="kitten img" src="https://thiscatdoesnotexist.com" alt="">
     <p>${kitten.name}<p>
     <p>${kitten.mood}<p>
     <p>${kitten.affection}<p>
     <button onclick="pet('${kitten.id}')">Pet</button>
     <button onclick = "catnip('${kitten.id}')">CatNip</button>
     </div>
     `
     let kittenListElement = document.getElementById("kitten-list")
     kittenListElement.innerHTML = kittensTemplet

                                 //<!-NOTE no clue here
 })

 }


 //**
  //* Find the kitten in the array by its id
  //  @param {string} id 
  //  @return {Kitten}
  
 function findKittenById(id) {
  return kittens.find(k => k.id == id);
 }


 /**
  * Find the kitten in the array of kittens
  * Generate a random Number
  * if the number is greater than .5 
  * increase the kittens affection
  * otherwise decrease the affection
  * @param {string} id 
  */
 function pet(id) {
  let cat = findKittenById(id)
  let random = Math.random()
  if (random > .6) {
    cat.affection ++
  }
  else {
   
cat.affection --

  }
setKittenMood(cat)
drawKittens()
saveKittens()
 }

 /**
  * Find the kitten in the array of kittens
  * Set the kitten's mood to tolerant
  * Set the kitten's affection to 5
  * @param {string} id
  */
 function catnip(id) {
  let cat = findKittenById(id)
  cat.mood = "tolerant"
  cat.affection = 5;
  saveKittens()
 }

 /**
  * Sets the kittens mood based on its affection
  * @param {Kitten} kitten 
  */
 function setKittenMood(kitten) {
  document.getElementById("kittens").classList.remove(kitten.mood)
  if (kitten.affection >= 6) {kitten.mood = "happy"}
  if (kitten.affection <= 5) {kitten.mood = "tolerant"}
  if (kitten.affection <= 2) {kitten.mood = "angry"}
  if (kitten.affection <= 0) {kitten.mood = "gone"}
  
 }
 //document.getElementById("kittens").classList.add(kitten.mood)

 /**
  * Removes all of the kittens from the array
  * remember to save this change
  */
 function clearKittens(kittenId) {
  kittens = []
  window.localStorage.removeItem('kittens')
  saveKittens()
  
  drawKittens()
  
 }

 function removeKitten(kittenId){
  debugger
  let index = kittens.findIndex(kitten => kitten.id == kittenId)
  
  kittens.splice(index, 1)
  saveKittens()
  drawKittens()
 }

 

 function getStarted() {
   document.getElementById("welcome").remove();

   loadKittens()
   drawKittens()
 }



 /**
  * Defines the Properties of a Kitten
  * @typedef {{name: string, mood: string, affection: number}} Kitten
  */


 /**
  * Used to generate a random string id for mocked
  * database generated Id
  * @returns {string}
  */
 function generateId() {
   return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
 }

 loadKittens();

 