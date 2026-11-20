---
description: Renderice componentes de React personalizados definiendo el código del
  componente, las props de entrada y el estado inicial del componente.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: Documentación
  text: Componentes
- link: /actions/app_builder/build/
  tag: Documentación
  text: Crear aplicaciones
title: Renderizador de React
---
El renderizador de React permite a los usuarios crear componentes de interfaz de usuario totalmente personalizados utilizando el lenguaje y las bibliotecas que ya conocen. Este componente brinda a los builders acceso a [React APIs][1] para que puedan crear aplicaciones flexibles, dinámicas y visualmente impactantes en App Builder.

Esta página proporciona un ejemplo de cómo utilizar el componente del renderizador de React. Para obtener una referencia completa de todos los campos en el renderizador de React, consulte [Components][2].

## Ejemplo de definición del componente {#example-component-definition}

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

### Ejemplo de props de entrada del componente {#example-component-input-props}

```json
${{
  queryData: query0.outputs,
  name: global?.user?.name,
  state: self.state,
}}
```

### Ejemplo de estado inicial del componente {#example-initial-component-state}

```json
${{
  count: 0,
  items: [],
  isLoading: false,
  selectedId: null,
}}
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://react.dev/reference/react/apis
[2]: /es/actions/app_builder/components/#general-11