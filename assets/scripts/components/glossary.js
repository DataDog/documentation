// Controls highlighting glossary letters in the glossary nav
const menuSection = document.querySelectorAll('a.nav-link');
const mainSection = document.querySelectorAll('#mainContent h2.glossary-letter');
const glossaryNavHeight = document.querySelector('#glossary-nav').getBoundingClientRect().height - 25

window.onscroll = (()=> {
  mainSection.forEach((v,i)=> {
    const letterDistanceFromTop = v.getBoundingClientRect().top
    if(letterDistanceFromTop < glossaryNavHeight){
      // glossary letter header is directly under glossary nav
      menuSection.forEach(v=> v.classList.remove('active'))
      menuSection[i].classList.add('active')
    }
  })
})
