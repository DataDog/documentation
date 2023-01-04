---
dependencies:
- https://github.com/DataDog/dd-sdk-reactnative/blob/main/docs/advanced_configuration.md
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

Si vous n'avez pas encore installé le SDK, consultez les [instructions de configuration intégrées à l'application][1] ou reportez-vous à la [documentation sur la configuration du RUM pour React Native][2].

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
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/reactnative
[3]: https://reactnative.dev/docs/interactionmanager#runafterinteractions