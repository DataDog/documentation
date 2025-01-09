---
aliases:
- /continuous_integration/static_analysis/rules/jsx-react/no-deprecated
- /static_analysis/rules/jsx-react/no-deprecated
dependencies: []
disable_edit: true
group_id: jsx-react
meta:
  category: Error Prone
  id: jsx-react/no-deprecated
  language: JavaScript
  severity: Warning
  severity_rank: 2
title: Avoid deprecated methods
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `jsx-react/no-deprecated`

**Language:** JavaScript

**Severity:** Warning

**Category:** Error Prone

## Description
As React evolves, methods are deprecated over time. This rule warns you about deprecated methods.

## Non-Compliant Code Examples
```jsx
React.render(<MyComponent />, root);
React.unmountComponentAtNode(root);
React.findDOMNode(this.refs.foo);
React.renderToString(<MyComponent />);
React.renderToStaticMarkup(<MyComponent />);
React.createClass({ /* Class object */ });

//Any factories under React.DOM
React.DOM.div();

import React, { PropTypes } from 'react';

// old lifecycles (since React 16.9)
componentWillMount() { }
componentWillReceiveProps() { }
componentWillUpdate() { }

// React 18 deprecations
import { render } from 'react-dom';
ReactDOM.render(<div></div>, container);

import { hydrate } from 'react-dom';
ReactDOM.hydrate(<div></div>, container);

import { unmountComponentAtNode } from 'react-dom';
ReactDOM.unmountComponentAtNode(container);

import { renderToNodeStream } from 'react-dom/server';
ReactDOMServer.renderToNodeStream(element);
```

## Compliant Code Examples
```jsx
import { PropTypes } from 'prop-types';

UNSAFE_componentWillMount() { }
UNSAFE_componentWillReceiveProps() { }
UNSAFE_componentWillUpdate() { }

ReactDOM.createPortal(child, container);

import { createRoot } from 'react-dom/client';
const root = createRoot(container);
root.unmount();

import { hydrateRoot } from 'react-dom/client';
const root = hydrateRoot(container, <App/>);
```
