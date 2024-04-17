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


    it('should get code snippet text for markdown fenced code blocks', () => {
        document.body.innerHTML = `
            <div class="highlight code-snippet">
                <pre><code>some code</code></pre>
                <button>a copy button</button>
            </div>
        `;
        const code = document.querySelector('code');
        const btn = document.querySelector('button');
        expect(cc.getCode(btn)).toBe(code);
    })
    
    it('should get code snippet text for try-rule modal', () => {
        document.body.innerHTML = `
            <div class="highlight">
                <table>
                    <tr>
                        <td><code>some code not returned</code></td>
                        <td><code>some code returned</code></td>
                    </tr>
                </table>
            </div>
            <button>a copy button</button>
        `;
        const code = document.querySelector('td:last-child code');
        const btn = document.querySelector('button');
        expect(cc.getCode(btn)).toBe(code);
    })


    it('should update copy button text after copying code snippet', () => {
        
        document.body.innerHTML = `
            <button class="js-copy-button">Copy</button>
        `;

        const btn = document.querySelector('.js-copy-button');
        
        cc.updateCopyBtnText(btn);
        expect(btn.textContent).toBe('Copied!');
    })


    it('should copy code snippet text to clipboard with the writeText method', () => {
        document.body.innerHTML = `
            <div class="highlight code-snippet">
                <pre><code>some code</code></pre>
                <button class="js-copy-button">Copy</button>
            </div>
        `;
        const btn = document.querySelector('.js-copy-button');
        
        const clipboardMock = {
            writeText: jest.fn(() => Promise.resolve())
        };
        Object.defineProperty(document, 'createRange', {
            value: jest.fn(() => ({
                selectNode: jest.fn(),
            }))
        })
        navigator.clipboard = clipboardMock;
        
        cc.copyCode(btn);
        expect(clipboardMock.writeText).toHaveBeenCalledTimes(1);
    })
})