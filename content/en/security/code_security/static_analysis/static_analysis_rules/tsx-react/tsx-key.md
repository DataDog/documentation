---
aliases:
- /continuous_integration/static_analysis/rules/tsx-react/tsx-key
- /static_analysis/rules/tsx-react/tsx-key
dependencies: []
disable_edit: true
group_id: tsx-react
meta:
  category: Error Prone
  id: tsx-react/tsx-key
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Prevent missing key props in iterators/collection literals
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `tsx-react/tsx-key`

**Language:** TypeScript

**Severity:** Error

**Category:** Error Prone

## Description
In JSX you need to specify a `key` prop for each item of a list. A missing `key` prop can lead to unexpected renders or stale UI. This rule checks for possible JSX lists and warns if the `key` prop is missing.

## Non-Compliant Code Examples
```typescript
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
```typescript
[<Hello key="first" test="foo" />, <Hello key="second" />, <Hello key="third" />];
data.map((x) => <Hello key={x.id}>{x}</Hello>);
Array.from([1, 2, 3], (x) => <Hello key={x.id}>{x}</Hello>);
<Hello key={id} {...{ id, caption }} />
```
