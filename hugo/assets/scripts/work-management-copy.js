// Presentation-only terminology. Keep the source specification and API identifiers intact.
const tagNames = {
    'Case Management': 'Work Management',
    'Case Management Attribute': 'Work Management Attribute',
    'Case Management Type': 'Work Management Type'
};

const renameText = (text) =>
    text.replace(
        /(`+)[\s\S]*?\1|https?:\/\/[^\s)]+|\]\([^)]*\)|\/[^\s)<>]+|\b[Cc]ase [Mm]anagement\b|\b[Cc]ases?\b/g,
        (match, ticks, offset) => {
            if (match.toLowerCase() === 'case management') return 'Work Management';
            const word = { Case: 'work item', case: 'work item', Cases: 'work items', cases: 'work items' }[match];
            if (!word) return match;
            return /^[A-Z]/.test(match) && offset === 0 ? word[0].toUpperCase() + word.slice(1) : word;
        }
    );

// Work on the in-memory documentation copy before dereferencing. Following references
// updates the descriptions shown in request/response tables, without touching examples.
const applyWorkManagementCopy = (spec) => {
    const visited = new WeakSet();
    const visit = (node) => {
        if (!node || typeof node !== 'object' || visited.has(node)) return;
        visited.add(node);
        if (typeof node.description === 'string') node.description = renameText(node.description);
        if (node.$ref && node.$ref.startsWith('#/')) {
            const target = node.$ref
                .slice(2)
                .split('/')
                .reduce((value, key) => value && value[key.replace(/~1/g, '/').replace(/~0/g, '~')], spec);
            visit(target);
        }
        Object.entries(node).forEach(([key, value]) => {
            if (!['example', 'examples', 'default', 'enum', 'x-given'].includes(key)) visit(value);
        });
    };
    (spec.tags || []).forEach((tag) => {
        if (!tagNames[tag.name]) return;
        tag['x-docs-original-name'] = tag.name;
        tag.name = tagNames[tag.name];
        // Explain the deliberately unchanged wire terminology without retaining the old product name.
        if (tag['x-docs-original-name'] === 'Case Management') {
            tag.description =
                'View and manage work items and projects within Work Management. ' +
                'The API uses `case` in paths, resource types, and permission names. ' +
                'For more information, see [Work Management](https://docs.datadoghq.com/incident_response/work_management/).';
        } else if (tag.description) {
            tag.description = renameText(tag.description);
        }
    });
    Object.values(spec.paths || {}).forEach((path) => {
        Object.values(path).forEach((operation) => {
            if (!operation || !operation.tags || !operation.tags.some((tag) => tagNames[tag])) return;
            operation.tags = operation.tags.map((tag) => tagNames[tag] || tag);
            if (operation.summary) {
                operation['x-docs-original-summary'] = operation.summary;
                operation.summary = renameText(operation.summary);
            }
            visit(operation);
        });
    });
    return spec;
};

module.exports = { applyWorkManagementCopy, renameText };
