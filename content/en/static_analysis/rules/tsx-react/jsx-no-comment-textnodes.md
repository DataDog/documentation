---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: tsx-react/jsx-no-comment-textnodes
  language: TypeScript
  severity: Warning
title: Avoid comments from being inserted as text nodes
---
## Metadata
**ID:** `tsx-react/jsx-no-comment-textnodes`

**Language:** TypeScript

**Severity:** Warning

**Category:** Error Prone

## Description
As JSX mixes HTML and JavaScript together, comments in text nodes must be in brackets to be evaluated as JavaScript instead of HTML. This rule prevents you from accidentally leaving comments as HTML text.

## Non-Compliant Code Examples
```typescript
var Hello = createReactClass({
  render: function() {
    return (
        <div>
            asd /* empty div */
        </div>
    );
  }
});

var Hello = createReactClass({
  render: function() {
    return (
      <div>
        /* empty div */
      </div>
    );
  }
});
```

## Compliant Code Examples
```typescript
var Hello = createReactClass({
  displayName: 'Hello',
  render: function() {
    return <div>{/* empty div */}</div>;
  }
});

var Hello = createReactClass({
  displayName: 'Hello',
  render: function() {
    return <div /* empty div */></div>;
  }
});

var Hello = createReactClass({
  displayName: 'Hello',
  render: function() {
    return <div className={'foo' /* temp class */}></div>;
  }
});
```
