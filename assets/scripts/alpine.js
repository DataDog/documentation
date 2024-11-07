import Alpine from 'alpinejs'
 
window.Alpine = Alpine

/**
 * A global store for the integrations carousel modal
 */
Alpine.store('integrationsModal', {
    isOpen: false,
    activeSlide: null, // a seperate tracker from the main carousel
    openModal(activeSlide) {
        // Opens modal with selected(active) slide 
        this.isOpen = true
        this.activeSlide = activeSlide
    },
    playVideo (refs) {
        // Plays active video. shared between modal and main carousel
        const {iframe, playBtn, playOverlay} = refs
        const player = new Vimeo.Player(iframe);

        playBtn.classList.add('d-none')
        playOverlay.classList.add('invisible')
        iframe.classList.remove('d-none'); 

        player.play()
    },
    pauseVideo (refs) {
        // Pauses active video. shared between modal and main carousel
        const {iframe, playBtn, playOverlay} = refs
        if(iframe?.parentElement.classList.contains('active')){
            const player = new Vimeo.Player(iframe);
            player.pause().then(() => {
                playBtn.classList.remove('d-none')
                playOverlay.classList.remove('invisible')
                iframe.classList.add('d-none');
            }).catch((err) => {
                console.log(err)
            })
        }
    }
})
 
Alpine.start()