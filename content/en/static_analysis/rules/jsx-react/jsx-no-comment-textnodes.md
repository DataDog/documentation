---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Error Prone
  id: jsx-react/jsx-no-comment-textnodes
  language: JavaScript
  severity: Warning
title: Avoid comments from being inserted as text nodes
---
## Metadata
**ID:** `jsx-react/jsx-no-comment-textnodes`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
As JSX mixes HTML and JavaScript together, it's easy to mistake text nodes and add comments to them. This rule prevents you from accidentally leaving comments as HTML text.

## Non-Compliant Code Examples
```jsx
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
```jsx
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
