import * as cc from '../components/copy-code';

describe('initCopyCode', () => {
    it('should add copy button to specified languages of fenced code blocks in markdown', () => {
        document.body.innerHTML = `
            <div class="highlight">
                <pre><code data-lang="python">some code</code></pre>
            </div>
            <div class="highlight">
                <pre><code data-lang="js">some code</code></pre>
            </div>
            <div class="highlight">
                <pre><code data-lang="yaml">some code</code></pre>
            </div>
            <div class="highlight">
                <pre><code data-lang="html">some code</code></pre>
            </div>
        `;
        
        cc.addCopyButton(['python', 'js', 'yaml']);
        const codeSnippets = document.querySelectorAll('.code-snippet');
        expect(codeSnippets.length).toBe(3);
    })

    it('should add copy button to code blocks nested in appendable container', () => {
        document.body.innerHTML = `
            <div class="append-copy-btn">
                <div class="highlight">
                    <pre><code data-lang="python">some code</code></pre>
                </div>
            </div>
        `;
        
        // should add copy button regardless of provided fenced language
        cc.addCopyButton(['js', 'yaml']);
        const codeSnippets = document.querySelectorAll('.code-snippet');
        expect(codeSnippets.length).toBe(1);
    })

    it('should not add copy button to code blocks that are not nested in appendable container or are not fenced code blocks', () => {
        document.body.innerHTML = `
            <div class="highlight">
                <pre><code data-lang="python">some code</code></pre>
            </div>
            <div class="highlight">
                <pre><code data-lang="html">some code</code></pre>
            </div>
            <div class="highlight">
                <pre><code data-lang="shell">some code</code></pre>
            </div>
        `;
        
        cc.addCopyButton(['js', 'yaml']);
        const codeSnippets = document.querySelectorAll('.code-snippet');
        expect(codeSnippets.length).toBe(0);
    })


    // it('should copy code to clipboard when copy button is clicked', () => {
        
    //     document.body.innerHTML = `
    //     <div class="highlight">
    //         <pre><code>some code</code></pre>
    //         <div class="code-button-wrapper position-absolute">
    //             <button class="btn text-primary js-copy-button">Copy</button>
    //         </div>
    //     </div>
    //     `;
        
    //     const highlight = document.querySelector('.highlight');
    //     const copyBtn = document.querySelector('.js-copy-button');
    //     const code = document.querySelector('code');
        
    //     // mock closest method
    //     const mockClosest = jest.fn(() => {
    //         querySelector: jest.fn(() => code)
    //     });

    //     // mock previousElementSibling property
    //     Object.defineProperty(Element.prototype, 'previousElementSibling', {
    //         get() {
    //             return highlight;
    //         }
    //     });

    //     // mock navigator.clipboard.writeText
    //     Object.assign(navigator, {
    //         clipboard: {
    //             writeText: jest.fn((text) => {
    //                 Promise.resolve()
    //             })
    //         }
    //     });

    //     Object.assign(document, {
    //         createRange: jest.fn(() => ({
    //             selectNode: jest.fn()
    //         }))
    //     });

    //     // spyOn document methods: `closest` and `previousElementSibling`
    //     jest.spyOn(Element.prototype, 'closest').mockImplementation(mockClosest);
    //     jest.spyOn(Element.prototype, 'previousElementSibling', 'get')

    //     // spyOn getCode function
    //     jest.spyOn(cc, 'getCode').mockImplementation(() => code);

    //     // spyOn createRange method
    //     const createRangeSpy = jest.spyOn(document, "createRange")
        
    //     // spyOn writeText method
    //     const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');
    //     cc.copyCode({currentTarget: copyBtn}, copyBtn);
        
    //     expect(createRangeSpy).toHaveBeenCalled();
    //     expect(createRangeSpy).toHaveBeenCalledWith(code);
        
    //     expect(writeTextSpy).toHaveBeenCalled();
    //     expect(writeTextSpy).toHaveBeenCalledWith(code.innerText);

    //     // cleanup
    //     jest.restoreAllMocks();
    // })
})