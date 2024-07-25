javascript: (function () {
    const hiddenElements = document.querySelectorAll('.markdoc__hidden');

    hiddenElements.forEach(function (element) {
        element.classList.remove('markdoc__hidden');
        element.style.backgroundColor = 'lightgray';
    });
})();
