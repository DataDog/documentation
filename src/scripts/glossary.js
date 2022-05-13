const setActiveLetter = () => {
    const hash = window.location.hash.toLowerCase()

    if (hash) {
        const navButtonContainer = document.querySelector('.glossary-nav')
        const navButton = navButtonContainer.querySelector(`a[href="${hash}"`)

        if (navButton) {
            navButton.click()
        }
    }
}

const handleNavClick = (event) => {
    const navButtons = document.querySelectorAll('.glossary-nav .btn')

    navButtons.forEach(btn => {
        btn.classList.remove('active')
    })

    event.target.classList.add('active')
}

const registerEventListeners = () => {
    const navButtons = document.querySelectorAll('.glossary-nav .btn')

    navButtons.forEach(btn => {
        btn.addEventListener('click', handleNavClick)
    })
}

window.addEventListener('DOMContentLoaded', () => {
    registerEventListeners()
    setActiveLetter()
})