// Script to add copy-clipboard functionality to copy buttons within code-block shortcodes, fenced codeblocks and highlight hugo functions

function initCopyCode () {
    // Add copy button to certain codeblocks of specific languages
    const fencedLang = ['shell']
    const pulledLang = ['java', 'go', 'python', 'ruby', 'typescript', 'java'] // using the highlight hugo function
    const highlights = document.querySelectorAll("div.highlight")

    highlights.forEach(highlightEl => {
        const codeLang = highlightEl.querySelector('[data-lang]').dataset.lang
        const isNotInCodeBlockShortcode = !highlightEl.parentElement.classList.contains('code-snippet')

        const shouldAddCopyBtn = [...fencedLang, ...pulledLang].includes(codeLang) && isNotInCodeBlockShortcode
        if(shouldAddCopyBtn){
            highlightEl.classList.add('code-snippet', 'fenced')
            const copyBtn = `
            <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            `
            highlightEl.insertAdjacentHTML('beforeend', copyBtn)
        }
    })



    // Add Event Listener
    const copyButtons = document.querySelectorAll('.js-copy-button');

    if (copyButtons.length) {
        copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => copyCode(e, btn));
        });
    }



    // EVENT FUNCTION
    function copyCode (event, btn){
        const codeSnippetElement = event.target
        .closest('.code-snippet')
        .querySelector('.chroma');
        
        // Create a range object
        const range = document.createRange();
        // Select the node
        range.selectNode(codeSnippetElement);
        // create system clipboard object
        const Clipboard = navigator.clipboard
        // write code snippet text
        Clipboard.writeText(codeSnippetElement.innerText).then(() => {
            btn.textContent = "Copied!";
            setTimeout(function() {
                btn.textContent = "Copy"
            }, 1000)
        })
    }
}

initCopyCode()

module.exports = {initCopyCode}