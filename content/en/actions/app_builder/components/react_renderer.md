---
title: React Renderer
description: Render custom React components by defining component code, input props, and the initial component state.
disable_toc: false
further_reading:
- link: "/actions/app_builder/components/"
  tag: "Documentation"
  text: "Components"
- link: "/actions/app_builder/build/"
  tag: "Documentation"
  text: "Build Apps"
---

This page provides an example of how to use the React renderer component in your App Builder apps.

## Example component definition

```js
const App = (props) => {
  // Local component state
  const [localState, setLocalState] = React.useState(0);
  
  // Access shared state from props
  const { count = 0 } = props.state;
  
  const incrementShared = () => {
  // Update shared state that persists outside component
        
props.setComponentState({...props.state, count: count + 1});
};
  
  return (
    <div>
      <h3>Shared Count: {count}</h3>
      <button onClick={incrementShared}>Increment Shared</button>
    </div>
);
}
return App;
```

### Example component input props 
```json
${{
  queryData: query0.outputs,
  name: global?.user?.name,
  state: self.state,
}}
```

### Example initial component state 
```json
${{
  count: 0,
  items: [],
  isLoading: false,
  selectedId: null,
}}
```