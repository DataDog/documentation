// Controls highlighting glossary letters in the glossary nav
const menuSection = document.querySelectorAll('a.nav-link');

window.onscroll = (()=> {
  const mainSection = document.querySelectorAll('#mainContent h2.glossary-letter');
  const glossaryNavHeight = document.querySelector('#glossary-nav').getBoundingClientRect().height - 25
  mainSection.forEach((v,i)=> {
    const letterDistanceFromTop = v.getBoundingClientRect().top
    if(letterDistanceFromTop < glossaryNavHeight){
      // glossary letter header is directly under glossary nav
      menuSection.forEach(v=> v.classList.remove('active'))
      menuSection[i].classList.add('active')
    }
  })
})
