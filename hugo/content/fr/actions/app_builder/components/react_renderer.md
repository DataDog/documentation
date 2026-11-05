---
description: Rendez des composants React personnalisés en définissant le code du composant,
  les propriétés d'entrée et l'état initial du composant.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: Documentation
  text: Composants
- link: /actions/app_builder/build/
  tag: Documentation
  text: Créer des applications
title: Rendu React
---
Le rendu React permet aux utilisateurs de créer des composants d'interface utilisateur entièrement personnalisés en utilisant le langage et les bibliothèques qu'ils connaissent déjà. Ce composant donne aux créateurs accès aux [API React][1] afin qu'ils puissent créer des applications flexibles, dynamiques et visuellement percutantes dans App Builder.

Cette page fournit un exemple d'utilisation du composant React Renderer. Pour une référence complète de tous les champs du React Renderer, consultez [Components][2].

## Exemple de définition de composant {#example-component-definition}

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

### Exemple de propriétés d'entrée du composant {#example-component-input-props}

```json
${{
  queryData: query0.outputs,
  name: global?.user?.name,
  state: self.state,
}}
```

### Exemple d'état initial du composant {#example-initial-component-state}

```json
${{
  count: 0,
  items: [],
  isLoading: false,
  selectedId: null,
}}
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://react.dev/reference/react/apis
[2]: /fr/actions/app_builder/components/#general-11