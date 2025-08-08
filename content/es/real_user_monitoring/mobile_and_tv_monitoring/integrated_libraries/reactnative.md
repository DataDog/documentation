---
aliases:
- /es/real_user_monitoring/reactnative/integrated_libraries/
code_lang: reactnative
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente de dd-sdk-reactnative
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentación
  text: Bibliotecas integradas
title: Bibliotecas de React Native para RUM
type: multi-code-lang
---

Esta página enumera las bibliotecas integradas que puedes utilizar para las aplicaciones React Native.

## Navegación de React

### Configuración

**Nota**: Este paquete es una integración para la biblioteca [`react-navigation`][1], asegúrate de instalar y configurar primero el SDK central de `mobile-react-native`.

Para instalar con NPM, ejecuta:

```sh
npm install @datadog/mobile-react-navigation
```

Para instalar con Yarn, ejecuta:

```sh
yarn add @datadog/mobile-react-navigation
```

### Rastrear la navegación de la vista
Para realizar un rastreo de los cambios en la navegación como Vistas de RUM, configura la devolución de llamada `onReady` de tu componente `NavigationContainer` como se indica a continuación. Puedes utilizar el parámetro opcional `ViewNamePredicate` para sustituir el nombre de la vista detectada automáticamente por algo más relevante para tu caso de uso.

Si se vuelve a `null` en `ViewNamePredicate` se impide la creación de la nueva Vista de RUM. La vista de RUM anterior permanece activa.

```js
import * as React from 'react';
import { DdRumReactNavigationTracking, ViewNamePredicate } from '@datadog/mobile-react-navigation';
import { Route } from "@react-navigation/native";

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(route: Route<string, any | undefined>, trackedName: string) {
  return "My custom View Name"
}

function App() {
  const navigationRef = React.useRef(null);
  return (
    <View>
      <NavigationContainer ref={navigationRef} onReady={() => {
        DdRumReactNavigationTracking.startTrackingViews(navigationRef.current, viewNamePredicate)
      }}>
        // ...
      </NavigationContainer>
    </View>
  );
}
```

**Nota**: Solo se puede rastrear un `NavigationContainer` a la vez. Si necesitas rastrear otro contenedor, deja de rastrear el anterior primero, utilizando `DdRumReactNavigationTracking.stopTrackingViews()`.

## Navegación de React Native

**Nota**: Este paquete es una integración para la biblioteca `react-native-navigation`. Asegúrate de instalar y configurar primero el SDK central de `mobile-react-native`.

### Configuración

Para instalar con NPM, ejecuta:

```sh
npm install @datadog/mobile-react-native-navigation
```

Para instalar con Yarn, ejecuta:

```sh
yarn add @datadog/mobile-react-native-navigation
```

### Rastrear la navegación de la vista

Para empezar a rastrear tus eventos de navegación, añade las siguientes líneas antes de configurar tu navegación. Puedes utilizar la devolución de llamada opcional `ViewNamePredicate` para reemplazar el nombre de Vista detectado automáticamente por uno más relevante para tu caso de uso, basado en [`ComponentDidAppearEvent`][2].

Devolver null (nulo) en `ViewNamePredicate` impide que se cree la nueva vista de RUM. La vista de RUM anterior permanece activa.

```sh
import { DdRumReactNativeNavigationTracking, ViewNamePredicate }  from '@datadog/mobile-react-native-navigation';
import { ComponentDidAppearEvent } from 'react-native-navigation';

const viewNamePredicate: ViewNamePredicate = function customViewNamePredicate(event: ComponentDidAppearEvent, trackedName: string) {
  return "My custom View Name"
}

DdRumReactNativeNavigationTracking.startTracking(viewNamePredicate);
```

## Apollo Client

**Nota**: Este paquete es una integración para la biblioteca `@apollo/client`. Asegúrate de instalar y configurar primero el SDK central de `mobile-react-native`.

### Configuración

Para instalar con NPM, ejecuta:

```sh
npm install @datadog/mobile-react-native-apollo-client
```

Para instalar con Yarn, ejecuta:

```sh
yarn add @datadog/mobile-react-native-apollo-client
```

### Migrar a HttpLink

Si inicializas tu `ApolloClient` con el parámetro `uri`, inicialízalo con un `HttpLink`:

```javascript
import { ApolloClient, HttpLink } from '@apollo/client';

// before
const apolloClient = new ApolloClient({
    uri: 'https://my.api.com/graphql'
});

// after
const apolloClient = new ApolloClient({
    link: new HttpLink({ uri: 'https://my.api.com/graphql' })
});
```

### Utiliza el enlace de Datadog Apollo Client para recopilar información

Importa `DatadogLink` de `@datadog/mobile-react-native-apollo-client` y utilízalo en tu inicialización de `ApolloClient`:

```javascript
import { ApolloClient, from, HttpLink } from '@apollo/client';
import { DatadogLink } from '@datadog/mobile-react-native-apollo-client';

const apolloClient = new ApolloClient({
    link: from([
        new DatadogLink(),
        new HttpLink({ uri: 'https://my.api.com/graphql' }) // always in last position
    ])
});
```

Para más información sobre enlaces de Apollo Client, consulta la [documentación oficial][3].

### Eliminación de la información de GraphQL

Utiliza un `resourceEventMapper` en tu configuración de Datadog para eliminar los datos confidenciales de las variables de GraphQL:

```javascript
const datadogConfiguration = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);

datadogConfiguration.resourceEventMapper = event => {
    // Variables are stored in event.context['_dd.graphql.variables'] as a JSON string when present
    if (event.context['_dd.graphql.variables']) {
        const variables = JSON.parse(event.context['_dd.graphql.variables']);
        if (variables.password) {
            variables.password = '***';
        }
        event.context['_dd.graphql.variables'] = JSON.stringify(variables);
    }

    return event;
};
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://reactnavigation.org/
[2]: https://wix.github.io/react-native-navigation/api/events/#componentdidappear
[3]: https://www.apollographql.com/docs/react/api/link/introduction/