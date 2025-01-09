---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/no-nested-components
- /static_analysis/rules/jsx-react/no-nested-components
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Best Practices
  id: jsx-react/no-nested-components
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid nested components
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/no-nested-components`

**Language:** JavaScript

**Severity:** Warning

**Category:** Best Practices

## Description
In JavaScript, particularly when using React, it's important to avoid nesting components inside other components. Components are meant to be reusable, independent, and encapsulated.

When components are nested, it could lead to unnecessary re-rendering and performance degradation, as the nested component is re-created every time the parent component renders.

To avoid this, define your components at the top level of your module and then use them inside other components by referencing their names. This way, the components are only created once and reused, leading to better performance and easier code management.

## Non-Compliant Code Examples
```jsx
function Foo() {
  function Bar() {
    return <h1> heading </h1>;
  }

  return (
    <>
      <Bar />
    </>
  );
}

function Test() {
  return (
    <div>
      <InnerTest footer={ () => <div /> } /> { }
    </div>
  );
}

class View extends React.Component {
  render() {
    function Nested() {
      return <h2> nested heading </h2>;
    }

    return (
      <div>
        <Nested />
      </div>
    );
  }
}
```

## Compliant Code Examples
```jsx
function Bar(props) {
  return <h1> heading </h1>;
}

function Foo() {
  return (
    <>
      <Bar />
    </>
  );
}

function Test() {
  return <InnerTest footer={ <div /> } />;
}

class View extends React.Component {
  render() {
    return (
      <div>
        <Nested />
      </div>
    );
  }
}
```
