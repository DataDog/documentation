---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/setstate-same-var
- /static_analysis/rules/jsx-react/setstate-same-var
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Error Prone
  id: jsx-react/setstate-same-var
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid using the initial state variable in setState
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/setstate-same-var`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
This rule in React prevents the state from never re-rending. React only re-renders a component when the value passed in is different from the current value.

If you pass in the state variable to the state setter function, the component is never re-rendered when this is called, which leads to subtle UI bugs that might be hard to track down. Ensure that you do not use the setter function with the state variable itself, and use another variable instead.

## Non-Compliant Code Examples
```jsx
import { useState } from "react";

function SetLimit() {
    const [limit, setLimit] = useState(500);
    return (
      <section>
        <h1>Select a limit</h1>
        <button onClick={() => setLimit(1000)}></button>{}
        <button onClick={() => setLimit(limit)}></button>{}
      </section>
    );
};
```

## Compliant Code Examples
```jsx
import { useState } from "react";

function SetLimit() {
    const [limit, setLimit] = useState(500);
    return (
      <section>
        <h1>Select a limit</h1>
        <button onClick={() => setLimit(1000)}></button>{}
        <button onClick={() => setLimit(500)}></button>{}
      </section>
    );
};
```
