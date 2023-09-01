---
description: Découvrez les options de configuration avancées disponibles pour votre
  configuration React Native.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: Code source dd-sdk-reactnative
- link: real_user_monitoring/reactnative/
  tag: Documentation
  text: En savoir plus sur la surveillance React Native
kind: documentation
title: Configuration avancée du RUM pour React Native
---
## Présentation

Si vous n'avez pas encore installé le SDK, consultez les [instructions de configuration dans l'application][1] ou reportez-vous à la [documentation sur la configuration du RUM pour React Native][2].

## Tests avec Jest

Pour tester des applications avec `'@datadog/mobile-react-native'`, vous devrez potentiellement suivre des étapes supplémentaires. En effet, les environnements de testing ne comportent pas de modules Native.

Datadog propose des simulations du package `'@datadog/mobile-react-native'`. Pour les utiliser avec [Jest][4], ajoutez ce qui suit dans le fichier de configuration de Jest :

```javascript
jest.mock('@datadog/mobile-react-native', () => {
    return require('@datadog/mobile-react-native/jest/mock');
});
```

Si vous initialisez le SDK avec le composant `DatadogProvider`, le suivi automatique des interactions, erreurs et ressources est désactivé dans vos tests.

Toutes les méthodes de SDK sont simulées à l'aide de `jest.fn()`. Vous pouvez donc vérifier si une méthode de SDK Datadog a été appelée :

```javascript
import { DdLogs } from '@datadog/mobile-react-native';

describe('App', () => {
    it('calls DdLogs.debug on mount', () => {
        renderer.create(<App />);
        expect(DdLogs.debug).toHaveBeenCalledWith('app started');
    });
});
```

Si vous n'utilisez pas Jest comme lanceur de test, vous devez créer les simulations pour votre lanceur.

## Instrumentation manuelle

Si l'instrumentation automatique ne répond pas à vos besoins, vous pouvez créer manuellement des événements et logs RUM :

```javascript
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration,
    DdLogs,
    ErrorSource,
    RumActionType,
    DdRum
} from '@datadog/mobile-react-native';

// Initialiser le SDK
const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true, // effectuer le suivi des interactions utilisateur (p. ex., toucher des boutons)
    true, // effectuer le suivi des ressources XHR
    true // effectuer le suivi des erreurs
);
DdSdkReactNative.initialize(config);

// Envoyer des logs (utiliser les méthodes debug, info, warn ou error)
DdLogs.debug('Lorem ipsum dolor sit amet...', {});
DdLogs.info('Lorem ipsum dolor sit amet...', {});
DdLogs.warn('Lorem ipsum dolor sit amet...', {});
DdLogs.error('Lorem ipsum dolor sit amet...', {});

// Effectuer le suivi manuel des vues RUM
DdRum.startView('<clé-vue>', 'Nom de la vue', {}, Date.now());
//...
DdRum.stopView('<clé-vue>', { custom: 42 }, Date.now());

// Effectuer le suivi manuel des actions RUM
DdRum.addAction(RumActionType.TAP, 'nom de l'action', {}, Date.now());
// Ou pour une action continue
DdRum.startAction(RumActionType.TAP, 'nom de l'action', {}, Date.now());
// Pour arrêter l'action ci-dessus
DdRum.stopAction({}, Date.now());

// Ajouter des durées personnalisées
DdRum.addTiming('<nom-durée>');

// Effectuer le suivi manuel des erreurs RUM
DdRum.addError('<message>', ErrorSource.SOURCE, '<stacktrace>', {}, Date.now());

// Effectuer le suivi manuel des ressources RUM
DdRum.startResource(
    '<clé-ressource>',
    'GET',
    'http://www.example.com/api/v1/test',
    {},
    Date.now()
);
//...
DdRum.stopResource('<clé-ressource>', 200, 'xhr', (size = 1337), {}, Date.now());

// Envoyer manuellement des spans
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
```

## Modifier ou ignorer des événements RUM

Pour modifier les attributs d'un événement RUM avant de l'envoyer à Datadog, ou pour ignorer complètement un événement, utilisez l'API Event Mappers lors de la configuration du SDK RUM React Native :

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true, // surveiller les interactions utilisateur (comme les boutons touchés)
    true, // surveiller les ressources XHR
    true // surveiller les erreurs
);
config.logEventMapper = event => event;
config.errorEventMapper = event => event;
config.resourceEventMapper = event => event;
config.actionEventMapper = event => event;
```

Chaque mapper correspond à une fonction dotée d'une signature `(T) -> T?`, où `T` est un type d'événement RUM concret. Cela permet de modifier des parties de l'événement avant son envoi, ou de l'ignorer complètement.

Par exemple, pour censurer des informations sensibles du `message` d'une erreur RUM, implémentez une fonction `redacted` personnalisée et utilisez-la dans `errorEventMapper` :

```javascript
config.errorEventMapper = event => {
    event.message = redacted(event.message);
    return event;
};
```

Lorsque le mapper d'erreur, de ressource ou d'action renvoie la valeur `null`, l'événement est complètement ignoré et n'est donc pas envoyé à Datadog.

Selon le type de l'événement, seules certaines propriétés peuvent être modifiées :

| Type d'événement    | Clé d'attribut            | Description                        |
| ------------- | ------------------------ | ---------------------------------- |
| LogEvent      | `logEvent.message`       | Le message du log.                |
|               | `logEvent.context`       | Les attributs personnalisés du log.      |
| ActionEvent   | `actionEvent.context`    | Les attributs personnalisés de l'action.   |
| ErrorEvent    | `errorEvent.message`     | Message d'erreur.                     |
|               | `errorEvent.source`      | La source de l'erreur.               |
|               | `errorEvent.stacktrace`  | Stacktrace de l'erreur.           |
|               | `errorEvent.context`     | Les attributs personnalisés de l'erreur.    |
|               | `errorEvent.timestampMs` | Le timestamp de l'erreur.            |
| ResourceEvent | `resourceEvent.context`  | Les attributs personnalisés de la ressource. |

Les événements incluent des éléments de contexte supplémentaires :

| Type d'événement    | Clé de l'attribut de contexte                            | Description                                                             |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| LogEvent      | `logEvent.additionalInformation.userInfo`        | Contient les informations globales sur l'utilisateur définies par `DdSdkReactNative.setUser`.        |
|               | `logEvent.additionalInformation.attributes`      | Contient les attributs globaux définis par `DdSdkReactNative.setAttributes`. |
| ActionEvent   | `actionEvent.actionContext`                      | [GestureResponderEvent][5] correspond à l'action ou à `undefined`.  |
|               | `actionEvent.additionalInformation.userInfo`     | Contient les informations globales sur l'utilisateur définies par `DdSdkReactNative.setUser`.        |
|               | `actionEvent.additionalInformation.attributes`   | Contient les attributs globaux définis par `DdSdkReactNative.setAttributes`. |
| ErrorEvent    | `errorEvent.additionalInformation.userInfo`      | Contient les informations globales sur l'utilisateur définies par `DdSdkReactNative.setUser`.        |
|               | `errorEvent.additionalInformation.attributes`    | Contient les attributs globaux définis par `DdSdkReactNative.setAttributes`. |
| ResourceEvent | `resourceEvent.resourceContext`                  | [XMLHttpRequest][6] correspond à la ressource ou à `undefined`.       |
|               | `resourceEvent.additionalInformation.userInfo`   | Contient les informations globales sur l'utilisateur définies par `DdSdkReactNative.setUser`.        |
|               | `resourceEvent.additionalInformation.attributes` | Contient les attributs globaux définis par `DdSdkReactNative.setAttributes`. |

## Durées des ressources

Grâce au suivi des ressources, vous pouvez recueillir les durées suivantes :

-   `First Byte` : la durée entre la requête planifiée et la réception du premier octet de la réponse. Cette durée prend en compte le temps passé à la préparation de la requête au niveau natif, la latence du réseau et le temps passé à la préparation de la réponse par le serveur.
-   `Download` : le temps passé avant de recevoir une réponse.

## Initialisation asynchrone

Si votre application inclut de nombreuses animations au démarrage, l'exécution de code durant ces dernières peut retarder leur lancement sur certains appareils. Pour que le SDK React Native Datadog pour RUM s'exécute une fois toutes les animations actives lancées, définissez le paramètre `initializationMode` sur `InitializationMode.ASYNC` dans votre configuration :

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration,
    InitializationMode
} from '@datadog/mobile-react-native';

const datadogConfiguration = new DatadogProviderConfiguration(
    '<TOKEN_CLIENT>',
    '<NOM_ENVIRONNEMENT>',
    '<ID_APPLICATION_RUM>',
    true,
    true,
    true
);
datadogConfiguration.initializationMode = InitializationMode.ASYNC;

export default function App() {
    return (
        <DatadogProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogProvider>
    );
}
```

La commande [InteractionManager.runAfterInteractions][3] de React Native est utilisée pour retarder les animations.

Toutes les interactions avec le SDK RUM (suivi des vues, actions, suivi des ressources, etc.) sont tout de même enregistrées et conservées dans une file d'attente dans la limite de 100 événements.

Les logs ne sont pas enregistrés et l'appel d'une méthode `DdLogs` avant l'actualisation effective risque de compromettre le logging.

## Retarder l'initialisation

Dans certaines situations, il est préférable d'attendre avant d'initialiser le SDK, par exemple, lorsque vous voulez utiliser une configuration différente selon le rôle de l'utilisateur ou récupérer la configuration depuis l'un de vos serveurs.

Dans ce cas, vous pouvez instrumenter automatiquement votre application dès le démarrage (collecter automatiquement les interactions utilisateur, les ressources XHR et les erreurs) et enregistrer jusqu'à 100 événements RUM et de span avant d'initialiser le SDK.

```js
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

const datadogAutoInstrumentation = {
    trackErrors: true,
    trackInteractions: true,
    trackResources: true,
    firstPartyHosts: [''],
    resourceTracingSamplingRate: 100
};

const initializeApp = async () => {
    const configuration = await fetchDatadogConfiguration(); // Récupère la configuration depuis l'un de vos serveurs
    await DatadogProvider.initialize(configuration);
};

export default function App() {
    useEffect(() => initializeApp(), []);

    return (
        <DatadogProvider configuration={datadogAutoInstrumentation}>
            <Navigation />
        </DatadogProvider>
    );
}
```

Où votre configuration contient les clés suivantes :

```js
import {
    ProxyConfig,
    SdkVerbosity,
    TrackingConsent
} from '@datadog/mobile-react-native';

const configuration = {
    clientToken: '<TOKEN_CLIENT>',
    env: '<NOM_ENVIRONNEMENT>',
    applicationId: '<ID_APPLICATION_RUM>',
    sessionSamplingRate: 80, // Facultatif : échantillonner les sessions RUM (ici, un échantillon de 80 % de la session sera envoyé à Datadog). Valeur par défaut = 100 %
    site: 'US1', // Facultatif : indiquer le site Datadog. Valeur par défaut = 'US1'
    verbosity: SdkVerbosity.WARN, // Facultatif : permettre au SDK d'afficher les logs internes (événements supérieurs ou égaux au niveau indiqué). Valeur par défaut = non définie (aucun log)
    serviceName: 'com.myapp', // Facultatif : définir le nom du service indiqué. Valeur par défaut = nom du package / bundleIdentifier de votre application Android / iOS, respectivement
    nativeCrashReportEnabled: true, // Facultatif : activer les rapports de crash natifs. Valeur par défaut = false
    version: '1.0.0', // Facultatif : voir la documentation relative au remplacement de la version indiquée. Valeur par défaut = VersionName / Version de votre application Android / iOS, respectivement
    versionSuffix: 'codepush.v3', // Facultatif : voir la documentation relative au remplacement de la version indiquée. Valeur par défaut = non définie
    trackingConsent: TrackingConsent.GRANTED, // Facultatif : désactiver la collecte si l'utilisateur ne donne pas son consentement pour le suivi. Valeur par défaut = TrackingConsent.GRANTED
    nativeViewTracking: true, // Facultatif : active le suivi des vues natives. Valeur par défaut = false
    proxyConfig: new ProxyConfig() // Facultatif : envoyer les requêtes via un proxy. Valeur par défaut = non définie
};
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /fr/real_user_monitoring/reactnative
[3]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[4]: https://jestjs.io/
[5]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/v0.70/index.d.ts#L548
[6]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest