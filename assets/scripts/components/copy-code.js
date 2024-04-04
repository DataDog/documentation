// Script to add copy-clipboard functionality to copy buttons
// Script to add copy buttons to markdown fenced (```), and {{ highlight }} hugo function code blocks

function initCopyCode () {
    addCopyButton()

    // Add Event Listener
    const copyButtons = document.querySelectorAll('.js-copy-button');

    if (copyButtons.length) {
        copyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => copyCode(e, btn));
        });
    }

}


// Adds copy button to code examples that use the highlight hugo function or are fenced code blocks in markdown
function addCopyButton () {
    const fencedLang = ['shell', 'json', 'yaml'] // target specific fenced codeblocks by language
    const highlights = document.querySelectorAll("div.highlight")

    highlights.forEach(highlightEl => {
        const dl = highlightEl.querySelector('[data-lang]');
        const codeLang = dl ? dl.dataset.lang : "";
        const isNestedInAppendableContainer = highlightEl.parentElement.classList.contains('append-copy-btn') //
        const isFencedCodeExample = [...fencedLang].includes(codeLang) // markdown fenced code block

        const shouldAddCopyBtn = isFencedCodeExample || isNestedInAppendableContainer
        if(shouldAddCopyBtn){
            highlightEl.classList.add('code-snippet', 'js-appended-copy-btn')
            const copyBtn = `
            <div class="code-button-wrapper position-absolute">
                <button class="btn text-primary js-copy-button">Copy</button>
            </div>
            `
            highlightEl.insertAdjacentHTML('beforeend', copyBtn)
        }
    })
}

// EVENT FUNCTION for copy functionality
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

initCopyCode()

module.exports = {initCopyCode}
