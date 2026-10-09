// Display labels are owned by the source OpenAPI specification. Canonical names
// remain available for documentation URLs, anchors, and permission links.
const hasDisplayName = (obj) => typeof obj['x-displayName'] === 'string' && obj['x-displayName'].trim() !== '';

const originalTagName = (tag) => tag['x-docs-original-name'] || tag.name;

const forEachOperation = (spec, fn) => {
    Object.values(spec.paths || {}).forEach((path) => {
        Object.values(path).forEach((operation) => {
            if (operation && typeof operation === 'object' && !Array.isArray(operation)) fn(operation);
        });
    });
};

// v1 and v2 operations that share a first tag and summary are documented on one page,
// so an override in either version labels both.
const operationKey = (operation, tagOriginals) => {
    const tag = Array.isArray(operation.tags) ? operation.tags[0] : undefined;
    const summary = operation['x-docs-original-summary'] || operation.summary;
    return JSON.stringify([tagOriginals.get(tag) || tag, summary]);
};

const applyApiDisplayNames = (specs) => {
    const tagNames = new Map();
    const summaries = new Map();

    // Collect overrides from every spec first. Later specs win when versions disagree.
    specs.forEach((spec) => {
        const tagOriginals = new Map();
        (spec.tags || []).forEach((tag) => {
            tagOriginals.set(tag.name, originalTagName(tag));
            if (hasDisplayName(tag)) tagNames.set(originalTagName(tag), tag['x-displayName']);
        });
        forEachOperation(spec, (operation) => {
            if (hasDisplayName(operation)) summaries.set(operationKey(operation, tagOriginals), operation['x-displayName']);
        });
    });

    specs.forEach((spec) => {
        const tagOriginals = new Map();
        (spec.tags || []).forEach((tag) => {
            const original = originalTagName(tag);
            tagOriginals.set(tag.name, original);
            if (!tagNames.has(original)) return;
            tag['x-docs-original-name'] = original;
            tag.name = tagNames.get(original);
        });
        forEachOperation(spec, (operation) => {
            const summary = summaries.get(operationKey(operation, tagOriginals));
            if (Array.isArray(operation.tags)) {
                operation.tags = operation.tags.map((tag) => tagNames.get(tagOriginals.get(tag) || tag) || tag);
            }
            if (summary) {
                operation['x-docs-original-summary'] = operation['x-docs-original-summary'] || operation.summary;
                operation.summary = summary;
            }
        });
    });
    return specs;
};

module.exports = { applyApiDisplayNames };
