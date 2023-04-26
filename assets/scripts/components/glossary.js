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


export const handleGlossaryFilter = (e) => {
  window.scroll(0, 0);
  const glossaryTerms = document.querySelectorAll('.glossary-term-container')
  const glossaryLetters = document.querySelectorAll('.glossary-letter')
  const glossaryNavLetters = document.querySelectorAll('#glossary-nav .nav-item')
  
  // if no event (e), get filter value from 'product' query param
  let filterValue = ""
  if(e){
    const { value } = e.target.dataset
    const newParam = `?product=${value}`
    // pushState adds the filter query param to url without loading/refreshing the url/page
    window.history.pushState({param: newParam },'',newParam)
    filterValue = value
  }else{
    filterValue = window.location.search?.replace('?product=', '')
  }

  unhideElements([...glossaryTerms, ...glossaryLetters, ...glossaryNavLetters])

  if(filterValue === "all" || filterValue === ""){
    [...glossaryTerms, ...glossaryLetters, ...glossaryNavLetters].forEach(el => el.classList.remove('d-none'))
  }else{
    glossaryTerms.forEach(el => {
      const {coreProducts} = el.dataset
      const coreProductsArr = coreProducts.split(',').map(e => anchorize(e))
      if(!coreProductsArr.includes(filterValue)){
        el.classList.add('d-none')
      }
    })
  }

  // form an object of arrays. 
  // each array is a group of terms (.glossary-term-container) with the same first char
  const termsGroupedByFirstChar = [...glossaryTerms].reduce((acc, curr) => {
    const currElLetter = curr.dataset.letter
    if(!acc[currElLetter]){
      acc[currElLetter] = []
    }

    acc[currElLetter].push(curr)
    return acc
  }, {})

  // iterate over each group in the object.
  // if each .glossary-term-container in an array is hidden
  for(const firstChar in termsGroupedByFirstChar){
    const group = termsGroupedByFirstChar[firstChar]
    const isHidden = group.every(el => el.classList.contains('d-none'))
    if(isHidden){
      document.querySelector(`h2#${firstChar}.glossary-letter`).classList.add('d-none') // hide glossary letter headers
      document.querySelector(`#glossary-nav .nav-item[data-letter=${firstChar}]`).classList.add('d-none') // hide glossary nav letters
    }
  } 
}



// ON CLICK
export const addGlossaryFilterClickEvnt = () => {
  const filterBtns = document.querySelectorAll('.filter-btn')
  filterBtns.forEach(filterBtn => {
    filterBtn.addEventListener('click', handleGlossaryFilter)
  })
};

if(window.location.pathname === '/glossary/'){
  // Load handler when sharing filtered view
  window.addEventListener('load', () => handleGlossaryFilter(null) )
  addGlossaryFilterClickEvnt()
}

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
  arr.forEach(el => {
    if(el.classList.contains('d-none')) {
      el.classList.remove('d-none')
    }
  })
}