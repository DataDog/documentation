---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/improper-hook-call
- /static_analysis/rules/jsx-react/improper-hook-call
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Error Prone
  id: jsx-react/improper-hook-call
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: React hooks should be called correctly
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/improper-hook-call`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
This rule ensures proper usage of React hooks, a feature introduced in React version 16.8. Hooks are intended to simplify the state and lifecycle behavior between different components in your application. They should always be called at the top level of your React function to ensure they follow the same order of execution between multiple render phases.

Incorrect usage of hooks can lead to bugs that are difficult to track down. For example, calling hooks conditionally or inside loops, if statements, or nested functions can lead to inconsistent hook calls between renders, which can lead to unexpected behavior and bugs in your application. 

To avoid violating this rule, always ensure hooks are used at the top level of your React functions and not inside loops, conditions, or nested functions. This ensures that hooks are called in the same order on every render, which is crucial for their correct operation.

## Non-Compliant Code Examples
```jsx
function Name() {
  const [country, setCountry] = useState('US');
  if (country) {
    useEffect(function() {
      localStorage.setItem('country', country);
    });
  } else {
    useEffect();
  }

  return <div>{ displayFlag() }</div>
}
```

## Compliant Code Examples
```jsx
function Name() {
  const [country, setCountry] = useState('US');
  useEffect(function() {
    if (country) {
      localStorage.setItem('country', country);
    }
  });

  const [name] = useState('United States');
  return <div>{ name }</div>
}

// Custom hooks are fine
function useFoo() {
  const [foo, setfoo] = useState('');
  return { foo, setfoo };
}
```
