import Alpine from 'alpinejs'
 
window.Alpine = Alpine

Alpine.store('integrationsModal', {
    isOpen: false,
    activeSlide: null,
    openModal(activeSlide) {
        this.isOpen = true
        this.activeSlide = activeSlide

    },
    closeModal() {
        this.isOpen = false
    },
    playVideo (refs) {
        // Plays active video
        const {iframe, playBtn, playOverlay} = refs
        const player = new Vimeo.Player(iframe);

        playBtn.classList.add('d-none');
        playOverlay.classList.add('d-none');
        iframe.classList.remove('d-none');

        player.play()
    },
    pauseVideo (refs) {
        // Pauses active video
        const {iframe, playBtn, playOverlay} = refs
        if(iframe?.parentElement.classList.contains('active')){
            const player = new Vimeo.Player(iframe);
            player.pause().then(() => {
                playBtn.classList.remove('d-none');
                playOverlay.classList.remove('d-none');
                iframe.classList.add('d-none');
            }).catch((err) => {
                console.log(err)
            })
        }
    }
})
 
Alpine.start()