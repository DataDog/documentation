---
aliases:
- /continuous_integration/static_analysis/rules/tsx-react/jsx-no-comment-textnodes
- /static_analysis/rules/tsx-react/jsx-no-comment-textnodes
dependencies: []
disable_edit: true
group_id: tsx-react
meta:
  category: Error Prone
  id: tsx-react/jsx-no-comment-textnodes
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Avoid comments from being inserted as text nodes
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


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
<Paragraph>
    lorem ipsum
    <InlineCode>http://localhost:8126</InlineCode> lorem ipsum
</Paragraph>
```

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
