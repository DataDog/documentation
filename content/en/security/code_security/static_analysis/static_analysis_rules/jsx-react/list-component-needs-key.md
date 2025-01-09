---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/list-component-needs-key
- /static_analysis/rules/jsx-react/list-component-needs-key
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Code Style
  id: jsx-react/list-component-needs-key
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: A list component should have a key to prevent re-rendering
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/list-component-needs-key`

**Language:** JavaScript

**Severity:** Warning

**Category:** Code Style

## Description
In JavaScript, particularly when dealing with React, it's important to provide a unique `key` prop for each child in a list. This rule ensures that each item in a list has a unique key. Keys help React identify which items have changed, are added, or are removed, and help in efficient re-rendering of the component.

Not having a unique key can lead to issues with the component's state and inefficient re-rendering. Without keys, React has to fall back to a slower, less efficient default diffing algorithm.

To avoid violating this rule, always provide a unique key when mapping over an array to create a list of React elements.

## Non-Compliant Code Examples
```jsx
function UserList(props) {
    return (
        <ul>
            {props.users.map(user => (
                <li>
                    {user.name} - {user.email}
                </li>
            ))}
        </ul>
    );
}
```

## Compliant Code Examples
```jsx
function UserList(props) {
    return (
        <ul>
            {props.users.map((user) => (
                <li key={user.id}>
                    {user.name} - {user.email}
                </li>
            ))}
        </ul>
    );
}
```
