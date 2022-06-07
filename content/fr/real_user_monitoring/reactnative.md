---
beta: true
dependencies:
  - https://github.com/DataDog/dd-sdk-reactnative/blob/main/README.md
description: "Collectez des données RUM depuis vos projets React\_Native."
further_reading:
  - link: https://github.com/DataDog/dd-sdk-reactnative
    tag: Github
    text: Code source dd-sdk-reactnative
  - link: real_user_monitoring/explorer/
    tag: Documentation
    text: Apprendre à explorer vos données RUM
  - link: https://www.datadoghq.com/blog/react-native-monitoring/
    tag: Blog
    text: Surveiller des applications react-native
kind: documentation
title: "Collecte de données RUM pour React\_Native"
---
## Présentation

La solution Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser en temps réel les performances et les parcours des utilisateurs de votre application.

Le SDK React Native Datadog prend en charge la version 0.63.4 et les versions ultérieures de React Native. La compatibilité avec les versions antérieures n'est pas garantie, et nécessite potentiellement des ajustements.

## Configuration

Pour effectuer une installation avec NPM, exécutez :

```sh
npm install @datadog/mobile-react-native
```

Pour effectuer une installation avec Yarn, exécutez :

```sh
yarn add @datadog/mobile-react-native
```

### Ajoutez les détails de l'application dans l'interface utilisateur

1. Dans l'[application Datadog][1], accédez à **UX Monitoring** > **RUM Applications** > **New Application**.
2. Choisissez `react-native` comme type d'application.
3. Indiquez le nom de votre application pour générer un ID d'application Datadog et un token client uniques.

{{< img src="real_user_monitoring/react_native/image_reactnative.png" alt="Créer une application RUM dans Datadog" style="width:90%;">}}

Pour assurer la sécurité de vos données, vous devez utiliser un token client. Si vous vous contentez d'utiliser des [clés d'API Datadog][3] pour configurer la bibliothèque `@datadog/mobile-react-native`, ces clés seront exposées côté client dans le code de l'application React Native.

Pour en savoir plus sur la configuration d'un token client, consultez [la documentation à ce sujet][4].

### Initialiser la bibliothèque avec le contexte de l'application

{{< site-region region="us" >}}
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<TOKEN_CLIENT>", 
    "<NOM_ENVIRONNEMENT>", 
    "<ID_APPLICATION_RUM>",
    true, // effectuer le suivi des interactions utilisateur (p. ex., toucher des boutons)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
)
config.site = "US1"
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true
// Facultatif : effectuer un échantillonnage des sessions (ici, 80 % des sessions sont envoyées à Datadog ; valeur par défaut = 100 %)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Une fois le SDK initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM.
```
{{< /site-region >}}

{{< site-region region="us3" >}}
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<TOKEN_CLIENT>", 
    "<NOM_ENVIRONNEMENT>", 
    "<ID_APPLICATION_RUM>",
    true, // effectuer le suivi des interactions utilisateur (p. ex., toucher des boutons)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
)
config.site = "US3"
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true
// Facultatif : effectuer un échantillonnage des sessions (ici, 80 % des sessions sont envoyées à Datadog ; valeur par défaut = 100 %)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Une fois le SDK initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM.
```
{{< /site-region >}}

{{< site-region region="us5" >}}
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<TOKEN_CLIENT>", 
    "<NOM_ENVIRONNEMENT>", 
    "<ID_APPLICATION_RUM>",
    true, // effectuer le suivi des interactions utilisateur (p. ex., toucher des boutons)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
)
config.site = "US5"
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true
// Facultatif : effectuer un échantillonnage des sessions (ici, 80 % des sessions sont envoyées à Datadog ; valeur par défaut = 100 %)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Une fois le SDK initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM.
```
{{< /site-region >}}

{{< site-region region="eu" >}}
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<TOKEN_CLIENT>", 
    "<NOM_ENVIRONNEMENT>", 
    "<ID_APPLICATION_RUM>",
    true, // effectuer le suivi des interactions utilisateur (p. ex., toucher des boutons)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
)
config.site = "EU1"
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true
// Facultatif : effectuer un échantillonnage des sessions (ici, 80 % des sessions sont envoyées à Datadog ; valeur par défaut = 100 %)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Une fois le SDK initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM.
```
{{< /site-region >}}

{{< site-region region="gov" >}}
```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';


const config = new DdSdkReactNativeConfiguration(
    "<TOKEN_CLIENT>", 
    "<NOM_ENVIRONNEMENT>", 
    "<ID_APPLICATION_RUM>",
    true, // effectuer le suivi des interactions utilisateur (p. ex., toucher des boutons)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
)
config.site = "US1_FED"
// Facultatif : activer ou désactiver les rapports de crash natifs
config.nativeCrashReportEnabled = true
// Facultatif : effectuer un échantillonnage des sessions (ici, 80 % des sessions sont envoyées à Datadog ; valeur par défaut = 100 %)
config.sampleRate = 80

await DdSdkReactNative.initialize(config)

// Une fois le SDK initialisé, vous devez configurer le suivi des vues pour pouvoir visualiser les données dans le dashboard RUM.
```
{{< /site-region >}}



### Suivi des interactions utilisateur

Si le suivi des interactions utilisateur est activé, comme dans l'exemple de code ci-dessus, le SDK accède à la hiérarchie des composants, en commençant par le composant qui a fait l'objet de l'action de toucher, à la recherche de la propriété `dd-action-name`. Une fois cette propriété trouvée, elle sert à nommer l'action recueillie.

Vous avez également la possibilité d'utiliser la propriété de l'élément `accessibilityLabel` pour nommer l'action de toucher. Sinon, le type de l'élément est transmis. Vous pouvez consulter notre prototype d'application pour découvrir des exemples d'utilisation.

### Suivre la navigation dans les vues

React Native propose un large choix de bibliothèques pour créer une navigation d'écran. Pour cette raison, seul le suivi manuel des vues est pris en charge. Pour que les sessions RUM s'affichent dans Datadog, vous devez implémenter le suivi des vues.

Vous pouvez démarrer et arrêter manuellement une vue à l'aide des méthodes `startView()` et `stopView` suivantes.

```js
import { DdSdkReactNative, DdSdkReactNativeConfiguration, DdLogs, DdRum } from '@datadog/mobile-react-native';


// Démarrer une vue avec un identifiant de vue unique, une URL de vue personnalisée et un objet permettant d'ajouter des attributs supplémentaires à la vue
DdRum.startView('<clé-vue>', '/url/vue', { 'custom.foo': "something" }, Date.now());
// Arrêter la vue démarrée précédemment avec le même identifiant unique de vue et un objet permettant d'ajouter des attributs supplémentaires à la vue
DdRum.stopView('<clé-vue>', { 'custom.bar': 42 }, Date.now());
```

Si vous utilisez l'une des bibliothèques suivantes, tirez profit de l'une des intégrations Datadog pour effectuer automatiquement le suivi des vues :

- Si vous utilisez la bibliothèque [`react-native-navigation`][5], ajoutez le package `@datadog/mobile-react-native-navigation` et suivez les [instructions de configuration][6].
- Si vous utilisez la bibliothèque [`react-navigation`][7], ajoutez le package `@datadog/mobile-react-navigation` et suivez les [instructions de configuration][8].

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
import { DdSdkReactNative, DdSdkReactNativeConfiguration, DdLogs, DdRum } from '@datadog/mobile-react-native';

// Initialiser le SDK
const config = new DdSdkReactNativeConfiguration(
    "<TOKEN_CLIENT>",
    "<NOM_ENVIRONNEMENT>",
    "<ID_APPLICATION_RUM>",
    true, // effectuer le suivi des interactions utilisateur (p. ex., toucher des boutons)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
)
DdSdkReactNative.initialize(config);

// Envoyer des logs (utiliser les méthodes debug, info, warn ou error)
DdLogs.debug("Lorem ipsum dolor sit amet...", {});
DdLogs.info("Lorem ipsum dolor sit amet...", {});
DdLogs.warn("Lorem ipsum dolor sit amet...", {});
DdLogs.error("Lorem ipsum dolor sit amet...", {});

// Effectuer le suivi manuel des vues RUM
DdRum.startView('<clé-vue>', 'URL de la vue', {}, Date.now());
//...
DdRum.stopView('<clé-vue>', { 'custom': 42 }, Date.now());

// Effectuer le suivi manuel des actions RUM
DdRum.addAction('TAP', 'nom du bouton', {}, Date.now());
// ou pour une action continue
DdRum.startAction('TAP', 'nom du bouton', {}, Date.now());
// pour arrêter l'action ci-dessus
DdRum.stopAction({}, Date.now());

// Ajouter des durées personnalisées
DdRum.addTiming('<nom-durée>');

// Effectuer le suivi manuel des erreurs RUM
DdRum.addError('<message>', 'source', '<stacktrace>', {}, Date.now());

// Effectuer le suivi manuel des ressources RUM
DdRum.startResource('<clé-ressource>', 'GET', 'http://www.example.com/api/v1/test', {}, Date.now());
//...
DdRum.stopResource('<clé-ressource>', 200, 'xhr', {}, Date.now());

// Envoyer manuellement des spans
const spanId = await DdTrace.startSpan("foo", { 'custom': 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { 'custom': 21 }, Date.now());
```

## Durées des ressources

Grâce au suivi des ressources, vous pouvez recueillir les durées suivantes :

* `First Byte` :  la durée entre la requête planifiée et la réception du premier octet de la réponse. Cette durée prend en compte le temps passé à la préparation de la requête au niveau natif, la latence du réseau et le temps passé à la préparation de la réponse par le serveur.
* `Download` : le temps passé avant de recevoir une réponse.

## Mode développement

Avec le mode développement, votre application peut envoyer des événements supplémentaires associés à l'outil React Native, notamment les erreurs de transformation du code, les requêtes transmises à un serveur de développement local, etc.

Pour éviter que ces événements s'affichent dans le dashboard, vous pouvez désactiver le suivi des erreurs et des ressources en mode développement à l'aide du flag `__DEV__` :

```
const config = new DdSdkReactNativeConfiguration(
    CLIENT_TOKEN,
    ENVIRONMENT,
    APPLICATION_ID,
    true,
    !__DEV__  /* trackResources prendra pour valeur false en mode DEV, et true dans les autres cas */,
    !__DEV__  /* trackErrors prendra pour valeur false en mode DEV, et true dans les autres cas */,
    trackingConsent
)
```

## Licence

Pour en savoir plus, consultez la [licence Apache v2.0][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-reactnative/main/docs/image_reactnative.png
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[5]: https://github.com/wix/react-native-navigation
[6]: https://www.npmjs.com/package/@datadog/mobile-react-native-navigation
[7]: https://github.com/react-navigation/react-navigation
[8]: https://www.npmjs.com/package/@datadog/mobile-react-navigation
[9]: https://github.com/DataDog/dd-sdk-reactnative/blob/main/LICENSE