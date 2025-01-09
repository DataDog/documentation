---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/jsx-key
- /static_analysis/rules/jsx-react/jsx-key
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Error Prone
  id: jsx-react/jsx-key
  language: JavaScript
  severity: Error
  severity_rank: 1
title: Prevent missing key props in iterators/collection literals
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/jsx-key`

**Language:** JavaScript

**Severity:** Error

**Category:** Error Prone

## Description
In JSX you need to specify a key prop for each item of a list because if it's missing it could lead to unexpected renders or stale UI. This rule checks for possible JSX lists and warns if the key prop is missing.

## Non-Compliant Code Examples
```jsx
[<></>];
[<Hello a="foo" />, <Hello>foo</Hello>, <Hello />];
[<Hello />, <Hello a="">foo</Hello>, <Hello />];
data.map(x => <Hello a="" />);
data.map(x => <Hello>{x}</Hello>);
data.map(x => <Hello a="">{x}</Hello>);
data.map(x => { return <Hello>{x}</Hello>});
data.map(x => { return <Hello a="">{x}</Hello>});
data.map(function(x) { return <Hello>{x}</Hello>});
data.map(function(x) { return <Hello>{x}</Hello>});
Array.from([1, 2, 3], (x) => <Hello>{x}</Hello>);
```

## Compliant Code Examples
```jsx
[<Hello key="first" test="foo" />, <Hello key="second" />, <Hello key="third" />];
data.map((x) => <Hello key={x.id}>{x}</Hello>);
Array.from([1, 2, 3], (x) => <Hello key={x.id}>{x}</Hello>);
<Hello key={id} {...{ id, caption }} />
```
