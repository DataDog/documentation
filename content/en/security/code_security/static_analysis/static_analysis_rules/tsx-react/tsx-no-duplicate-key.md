---
aliases:
- /continuous_integration/static_analysis/rules/tsx-react/tsx-no-duplicate-key
- /static_analysis/rules/tsx-react/tsx-no-duplicate-key
dependencies: []
disable_edit: true
group_id: tsx-react
meta:
  category: Error Prone
  id: tsx-react/tsx-no-duplicate-key
  language: TypeScript
  severity: Error
  severity_rank: 1
title: Ensures unique key prop
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `tsx-react/tsx-no-duplicate-key`

**Language:** TypeScript

**Severity:** Error

**Category:** Error Prone

## Description
Duplicate JSX element keys can lead to unexpected behavior. Keys are meant to be always unique.

## Non-Compliant Code Examples
```typescript
[<Hello key="one" />, <Hello key="one">foo</Hello>, <Hello key="one" />];
[<Hello key={"foo"} />, <Hello key={`foo`}>foo</Hello>];
[<Hello key={a} />, <Hello key={a} />];
data.map(x => <Hello key="a" />);
data.map(x => <Hello key={1}>{x}</Hello>);
data.map(x => <Hello key={"1" + "2"}>{x}</Hello>);
data.map(x => { return <Hello key={true}>{x}</Hello>});
data.map(function(x) { return <Hello key={[]}>{x}</Hello>});
Array.from([1, 2, 3], (x) => <Hello key={{}}>{x}</Hello>);
```

## Compliant Code Examples
```typescript
[<Hello key="first" />, <Hello key="second">foo</Hello>, <Hello key="thrid" />];
data.map(x => { return <Hello key={`prefix-${x}`}>{x}</Hello>});
```
