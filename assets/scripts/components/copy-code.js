import Tooltip from 'bootstrap/js/dist/tooltip';

// Script to add copy-clipboard functionality to copy buttons
// Script to add copy buttons to markdown fenced (```), and {{ highlight }} hugo function code blocks

function initCopyCode () {
    addCopyButton(['shell', 'json', 'yaml'])

    // Add Event Listener
    const copyButtons = document.querySelectorAll(['.js-copy-button', '#tryRuleModal .copy-icon']);

    if (copyButtons.length) {
        copyButtons.forEach(btn => {
            btn.addEventListener('click', () => copyCode(btn));
        });
    }

}

/**
 * Adds copy button to code examples that use the highlight hugo function or are fenced code blocks in markdown 
 * @param {Array} fencedLangs - Array of languages to target specific fenced codeblocks
 */
function addCopyButton (fencedLangs) {
    const highlights = document.querySelectorAll("div.highlight")

    highlights.forEach(highlightEl => {
        const dl = highlightEl.querySelector('[data-lang]');
        const codeLang = dl ? dl.dataset.lang : "";
        const isNestedInAppendableContainer = highlightEl.parentElement.classList.contains('append-copy-btn') //
        const isFencedCodeExample = [...fencedLangs].includes(codeLang) // markdown fenced code block

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
function copyCode (btn){
    const code = getCode(btn)
    // Create a range object
    const range = document.createRange();
    // Select the node
    range.selectNode(code);
    // create system clipboard object
    const Clipboard = navigator.clipboard
    // write code snippet text
    Clipboard.writeText(code.innerText).then(() => {
        updateCopyBtnText(btn)
    })
}

function getCode (btn){
    return btn.closest('.code-snippet')?.querySelector('code')  // for markdown fenced code blocks
    || btn.previousElementSibling.querySelector('td:last-child code'); // for try-rule modal code examples on the static analysis rule pages
}

function updateCopyBtnText(btn){
    if(btn?.classList.contains('js-copy-button')){
        // if copy button clicked, change the button text to "copied" for 1 second
        btn.textContent = "Copied!";
        setTimeout(function() {
            btn.textContent = "Copy"
        }, 1000)
    }else{
        // if copy icon clicked in the try-rule modal, change the tooltip
        const copyTooltip = Tooltip.getInstance(btn);
        copyTooltip.setContent({'.tooltip-inner': "Copied!!"});
        setTimeout(function() {
            copyTooltip.setContent({'.tooltip-inner': "Copy"});
        }, 2000)
    }
}

initCopyCode()

// Export the functions for testing
module.exports = {initCopyCode, getCode, copyCode, addCopyButton, updateCopyBtnText}
