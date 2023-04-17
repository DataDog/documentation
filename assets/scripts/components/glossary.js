let menuSection = document.querySelectorAll('a.nav-link');

window.onscroll = (()=> {
  let mainSection = document.querySelectorAll('#mainContent h2');

  mainSection.forEach((v,i)=> {
    let distanceFromTop = v.getBoundingClientRect().top
    if(distanceFromTop < 100){
      menuSection.forEach(v=> v.classList.remove('active'))
      menuSection[i].classList.add('active')
    }
  })
})


const glossaryTerms = document.querySelectorAll('.glossary-term-container')

const handleFilter = (e, onload=false) => {
  // console.log(e.currentTarget.location.hash.replace('#filter-', ''))
  console.log(onload)
  const filterValue = onload ? e.currentTarget.location.hash.replace('#filter-', '') :  e.target.dataset.value
  console.log('filtering!', filterValue)

  unhideElements(glossaryTerms)

  if(filterValue === "all"){
    glossaryTerms.forEach(el => el.classList.remove('d-none'))
  }else{
    glossaryTerms.forEach(el => {
      const {coreProducts} = el.dataset
      const coreProductsArr = coreProducts.split(',').map(e => anchorize(e))
      
      if(!coreProductsArr.includes(filterValue)){
        el.classList.add('d-none')
      }
    })
  }
}

window.addEventListener('load', (e) => handleFilter(e, true))

const filterBtns = document.querySelectorAll('.filter-btn')
filterBtns.forEach(filterBtn => {
  filterBtn.addEventListener('click', handleFilter)
})


// HELPERS //
/**
 * Converts string to a slug
 * @param {string} str 
 * @returns {string} slugged param
 */
function anchorize(str){
  return str.toLowerCase().replace(' ', '-')
}

/**
 * removes `.d-none` from elements to display all items in arr
 * @param {element[]} arr 
 */
function unhideElements(arr){
  arr.forEach(el => el.classList.remove('d-none'))
}