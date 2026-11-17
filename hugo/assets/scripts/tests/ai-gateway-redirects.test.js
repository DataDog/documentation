const fs = require('fs');
const path = require('path');
const vm = require('vm');
const yaml = require('js-yaml');

const root = path.resolve(__dirname, '../../..');
const template = fs.readFileSync(path.join(root, 'layouts/partials/ai-gateway-redirects.html'), 'utf8');
const overview = fs.readFileSync(path.join(root, 'content/en/ai_gateway/_index.md'), 'utf8');
const { legacy_anchors: anchors } = yaml.safeLoad(overview.split('---')[1]);

function redirect(hash, search = '', base = 'https://docs.datadoghq.com/') {
    const destinations = Object.fromEntries(
        Object.entries(anchors).map(([anchor, destination]) => [anchor, new URL(destination.slice(1), base).href])
    );
    const script = template.match(/<script>([\s\S]*?)<\/script>/)[1]
        .replace('{{ $redirects | jsonify | safeJS }}', JSON.stringify(destinations));
    const replace = jest.fn();
    vm.runInNewContext(script, {
        URL,
        window: { location: { hash, search, href: `${base}ai_gateway/${search}${hash}`, replace } }
    });
    return replace;
}

describe('AI Gateway legacy section bookmarks', () => {
    it('sends the former quickstart bookmark to the new quickstart', () => {
        expect(redirect('#get-started')).toHaveBeenCalledWith('https://docs.datadoghq.com/ai_gateway/getting_started/');
    });

    it('keeps the query string and selects the destination section', () => {
        expect(redirect('#set-budgets', '?site=eu')).toHaveBeenCalledWith(
            'https://docs.datadoghq.com/ai_gateway/spend_controls/?site=eu#set-budgets'
        );
    });

    it('keeps the preview branch prefix', () => {
        expect(redirect('#error-codes', '', 'https://docs-staging.datadoghq.com/test/gateway-structure/')).toHaveBeenCalledWith(
            'https://docs-staging.datadoghq.com/test/gateway-structure/ai_gateway/troubleshooting/#error-codes'
        );
    });

    it.each(['', '#unknown-section', '#further-reading', '#constructor', '#__proto__'])(
        'leaves the overview in place for %s', (hash) => {
            expect(redirect(hash)).not.toHaveBeenCalled();
        }
    );
});
