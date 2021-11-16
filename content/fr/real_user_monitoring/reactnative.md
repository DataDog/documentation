---
beta: true
dependencies:
  - 'https://github.com/DataDog/dd-sdk-reactnative/blob/main/README.md'
description: "Collectez des données RUM depuis vos projets React\_Native."
further_reading:
  - link: 'https://github.com/DataDog/dd-sdk-reactnative'
    tag: Github
    text: Code source dd-sdk-reactnative
  - link: real_user_monitoring/explorer/
    tag: Documentation
    text: Apprendre à explorer vos données RUM
  - link: 'https://www.datadoghq.com/blog/react-native-monitoring/'
    tag: Blog
    text: Surveiller des applications react-native
kind: documentation
title: "Collecte de données RUM pour React\_Native"
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta ouverte. Contactez l'<a href="https://docs.datadoghq.com/help/">assistance</a> si vous avez des questions ou des retours concernant cette fonctionnalité.
</div>

Le *Real User Monitoring (RUM)* de Datadog vous permet de visualiser et d'analyser en temps réel les performances et les parcours des utilisateurs de votre application.

## Configuration

Pour effectuer une installation avec NPM, exécutez :

```sh
npm install dd-sdk-reactnative
```

Pour effectuer une installation avec Yarn, exécutez :

```sh
yarn add dd-sdk-reactnative
```

### Ajouter les détails de l'application dans l'interface utilisateur

1. Dans l'[application Datadog][1], sélectionnez **UX Monitoring > RUM Applications > New Application**.
2. Choisissez `react-native` dans Application Type.
3. Indiquez le nom de votre nouvelle application pour générer un ID d'application Datadog et un token client uniques.

![image][2]

Pour assurer la sécurité de vos données, vous devez utiliser un token client. Vous ne pouvez pas vous contenter d'utiliser des [clés d'API Datadog][3] pour configurer la bibliothèque `dd-sdk-reactnative`, car elles risqueraient d'être exposées côté client. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][4].

### Initialiser la bibliothèque avec le contexte de l'application

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from 'dd-sdk-reactnative';


const config = new DdSdkReactNativeConfiguration(
    "<TOKEN_CLIENT>", 
    "<NOM_ENVIRONNEMENT>", 
    "<ID_APPLICATION_RUM>",
    true, // effectuer le suivi des interactions utilisateur (p. ex. : sélection de boutons)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
)
// Facultatif : sélectionnez votre site Web Datadog (US, EU ou GOV)
config.site = "US"
// Facultatif : activez ou désactivez les rapports de crash natifs
config.nativeCrashReportEnabled = true
// Facultatif : effectuer un échantillonnage des sessions RUM (ici, 80 % des sessions seront envoyées à Datadog. Valeur par défaut = 100 %)
config.sampleRate = 80

DdSdkReactNative.initialize(config)
```

## Suivre la navigation dans les vues

**Remarque** : le suivi automatique des vues repose sur le package [React Navigation](https://reactnavigation.org/). Si vous utilisez un autre package pour gérer la navigation dans votre application, utilisez la méthode d'instrumentation manuelle décrite ci-dessous.

Pour suivre les changements de navigation en tant que vues RUM, définissez le rappel `onready` de votre composant `NavigationContainer` :

```js
import * as React from 'react';
import { DdRumReactNavigationTracking } from 'dd-sdk-reactnative';

function App() {
  const navigationRef = React.useRef(null);
  return (
    <View>
      <NavigationContainer ref={navigationRef} onReady={() => {
        DdRumReactNavigationTracking.startTrackingViews(navigationRef.current)
      }}>
        // …
      </NavigationContainer>
    </View>
  );
}
```
**Remarque** : un seul `NavigationContainer` à la fois peut faire l'objet d'un suivi. Si vous devez effectuer le suivi d'un autre conteneur, arrêtez d'abord le suivi du conteneur précédent.

## Suivre des attributs personnalisés

Vous pouvez associer des informations utilisateur à chaque événement RUM pour obtenir des informations plus détaillées sur vos sessions RUM. 

### Informations utilisateur

Pour associer des informations propres à l'utilisateur, utilisez le code suivant n'importe où dans votre application (après l'initialisation du SDK). Les attributs `id`, `name` et `email` sont intégrés dans Datadog, et vous pouvez ajouter d'autres attributs selon vos besoins.

```js
DdSdkReactNative.setUser({
    id: "1337", 
    name: "John Smith", 
    email: "john@example.com", 
    type: "premium"
})
```

### Attributs globaux

Vous pouvez également conserver des attributs globaux pour effectuer le suivi d'informations concernant une session spécifique, telles que la configuration de test A/B, l'origine d'une campagne publicitaire ou le statut d'un panier.

```js
DdSdkReactNative.setAttributes({
    profile_mode: "wall",
    chat_enabled: true,
    campaign_origin: "example_ad_network"
})
```

## Instrumentation manuelle

Si l'instrumentation automatique ne répond pas à vos besoins, vous pouvez créer manuellement des événements et logs RUM :

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration, DdLogs, DdRum } from 'dd-sdk-reactnative';

// Initialiser le SDK
const config = new DdSdkReactNativeConfiguration(
    "<TOKEN_CLIENT>",
    "<NOM_ENVIRONNEMENT>",
    "<ID_APPLICATION_RUM>",
    true, // effectuer le suivi des interactions utilisateur (p. ex. : sélection de boutons)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
)
DdSdkReactNative.initialize(config);

// Envoyer les logs (utiliser la méthode debug, info, warn ou error)
DdLogs.debug("Lorem ipsum dolor sit amet…", 0, {});
DdLogs.info("Lorem ipsum dolor sit amet…", 0, {});
DdLogs.warn("Lorem ipsum dolor sit amet…", 0, {});
DdLogs.error("Lorem ipsum dolor sit amet…", 0, {});

// Effectuer manuellement le suivi des vues RUM
DdRum.startView('<view-key>', 'View Url', new Date().getTime(), {});
//…
DdRum.stopView('<view-key>', new Date().getTime(), { custom: 42});

// Effectuer manuellement le suivi des actions RUM
DdRum.addAction('TAP', 'button name', new Date().getTime(), {});

// Effectuer manuellement le suivi des erreurs RUM
DdRum.addError('<message>', 'source', '<stacktrace>', new Date().getTime(), {});


// Effectuer manuellement le suivi des ressources RUM
DdRum.startResource('<res-key>', 'GET', 'http://www.example.com/api/v1/test', new Date().getTime(), {} );
//…
DdRum.stopResource('<res-key>', 200, 'xhr', new Date().getTime(), {});
```
## Licence

[Licence Apache, v2.0](LICENSE)

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens