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

The React renderer enables users to create fully custom UI components using the language and libraries they already know. This component gives builders access to [React APIs][1] so they can create flexible, dynamic, and visually impactful apps in App Builder.

This page provides an example of how to use the React renderer component. For a full reference to all of the fields in the React renderer, see [Components][2].

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://react.dev/reference/react/apis
[2]: /actions/app_builder/components/#general-11