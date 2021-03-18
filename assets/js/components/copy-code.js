// Script to add copy-clipboard functionality to blog post code snippetss

const copyButtons = document.querySelectorAll('.js-copy-button');

if (copyButtons.length) {
    copyButtons.forEach(elem => {
        elem.addEventListener('click', function(event) {

            const codeSnippetElement = event.target
                .closest('.code-snippet')
                .querySelector('.chroma');

            const windowSelection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(codeSnippetElement);
            windowSelection.removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            windowSelection.removeAllRanges();

            elem.textContent = "Copied!";
            setTimeout(function() {
                elem.textContent = "Copy"
            }, 1000)

        });
    });
}
