// Display labels are owned by the source OpenAPI specification. Canonical names
// remain available for documentation URLs, anchors, and permission links.
const applyApiDisplayNames = (spec) => {
    const names = new Map();
    (spec.tags || []).forEach((tag) => {
        if (typeof tag['x-displayName'] !== 'string' || !tag['x-displayName'].trim()) return;
        const original = tag['x-docs-original-name'] || tag.name;
        names.set(original, tag['x-displayName']);
        tag['x-docs-original-name'] = original;
        tag.name = tag['x-displayName'];
    });
    Object.values(spec.paths || {}).forEach((path) => {
        Object.values(path).forEach((operation) => {
            if (!operation || typeof operation !== 'object') return;
            if (Array.isArray(operation.tags)) {
                operation.tags = operation.tags.map((tag) => names.get(tag) || tag);
            }
            if (typeof operation['x-displayName'] === 'string' && operation['x-displayName'].trim()) {
                operation['x-docs-original-summary'] = operation['x-docs-original-summary'] || operation.summary;
                operation.summary = operation['x-displayName'];
            }
        });
    });
    return spec;
};

module.exports = { applyApiDisplayNames };
