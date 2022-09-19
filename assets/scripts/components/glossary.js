export const initGlossaryJS = () => {
    const navButtons = document.querySelectorAll('.js-glossary-nav .nav-link')

    const setActiveLetter = () => {
        const hash = window.location.hash.toLowerCase()
    
        if (hash) {
            const navButtonContainer = document.querySelector('.js-glossary-nav')
            const navButton = navButtonContainer.querySelector(`a[href="${hash}"`)
    
            if (navButton) {
                navButton.click()
            }
        }
    }
    
    const handleNavClick = (event) => {
        navButtons.forEach(btn => {
            btn.classList.remove('active')
        })
    
        event.target.classList.add('active')
    }
    
    const registerEventListeners = () => {    
        navButtons.forEach(btn => {
            btn.addEventListener('click', handleNavClick)
        })
    }
    
    registerEventListeners()
    setActiveLetter()
}

window.addEventListener('DOMContentLoaded', () => {
    initGlossaryJS()
})