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
