javascript: (function () {
    const hiddenElements = document.getElementsByClassName('markdoc__hidden');
    for (let i = 0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.backgroundColor = 'lightgray';
        hiddenElements[i].classList.remove('markdoc__hidden');
    }
})();
