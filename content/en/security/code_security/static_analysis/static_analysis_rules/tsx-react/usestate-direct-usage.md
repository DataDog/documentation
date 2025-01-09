---
aliases:
- /continuous_integration/static_analysis/rules/tsx-react/usestate-direct-usage
- /static_analysis/rules/tsx-react/usestate-direct-usage
dependencies: []
disable_edit: true
group_id: tsx-react
meta:
  category: Performance
  id: tsx-react/usestate-direct-usage
  language: TypeScript
  severity: Error
  severity_rank: 1
title: React's useState should not be directly called
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `tsx-react/usestate-direct-usage`

**Language:** TypeScript

**Severity:** Error

**Category:** Performance

## Description
This rule prevents infinite rendering loop bugs in React. The bug occurs when a hook setter function is called directly in the body of a component, because this changes the component's state. When a component's state is changed, re-rendering occurs.

Ensure that you do not directly call hook setter functions in components, and instead call them from an event handler.

## Non-Compliant Code Examples
```typescript
import { useState, useEffect } from "react";

function ShowTime() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    setTime(new Date().toLocaleTimeString());

    return (
      <section>
        <h1>The current time is {time}</h1>
        <button onClick={() => setTime(new Date().toLocaleTimeString())}>Update Time</button>
      </section>
    );
}
```

## Compliant Code Examples
```typescript
import { useState, useEffect } from "react";

function ShowTime() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
      <section>
        <h1>The current time is {time}</h1>
        <button onClick={() => setTime(new Date().toLocaleTimeString())}>Update Time</button>
      </section>
    );
}
```
