---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/list-component-no-index
- /static_analysis/rules/jsx-react/list-component-no-index
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Code Style
  id: jsx-react/list-component-no-index
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Do not use array indexes for a list component's key
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/list-component-no-index`

**Language:** JavaScript

**Severity:** Warning

**Category:** Code Style

## Description
In JavaScript, particularly when using libraries like React, it's common to map over arrays and create components for each item. The `key` prop is necessary for React's diffing algorithm to identify each component uniquely. Using array indexes as keys in list components is a bad practice because it can lead to unpredictable behavior.

This is especially true when the list can change dynamically (items added, removed, or reordered), as React uses the keys to determine which items have changed, are added, or are removed. Using indexes as keys can lead to bugs and performance degradation because the index does not uniquely identify the data item; it only reflects the item's position in the array.

To avoid this, use unique and stable identifiers from your data as keys whenever possible. If your data items have an `id` field, for example, you should use that for the key. This ensures that the key remains consistent across different renders, helping React maintain and update the component state correctly. For instance, `user.id` is used as a key in the compliant code sample provided.

## Non-Compliant Code Examples
```jsx
function UserList(props) {
    return (
        <ul>
            {props.users.map((user, index) => (
                <li key={index}>
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
