// Script to add copy-clipboard functionality to code snippets within the code-block shortcode and fenced codeblocks


// Add copy button to fenced codeblocks of specific languages
const dataLangs = ['shell']
const highlights = document.querySelectorAll("div.highlight")

highlights.forEach(highlightEl => {
    const codeLang = highlightEl.querySelector('[data-lang]').dataset.lang
    const isNotInCodeBlockShortcode = !highlightEl.parentElement.classList.contains('code-snippet')

    const shouldAddCopyBtn = dataLangs.includes(codeLang) && isNotInCodeBlockShortcode
    if(shouldAddCopyBtn){
        highlightEl.classList.add('code-snippet','fenced')
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