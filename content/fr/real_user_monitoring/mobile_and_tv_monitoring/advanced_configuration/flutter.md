---
aliases:
- /fr/real_user_monitoring/flutter/advanced_configuration
- /fr/real_user_monitoring/otel
- /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
- /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/otel
- /fr/real_user_monitoring/flutter/otel_support/
code_lang: flutter
code_lang_weight: 30
description: Découvrez comment configurer la surveillance Flutter.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Code source de dd-sdk-flutter
- link: network_monitoring/performance/guide/
  tag: Documentation
  text: Apprendre à explorer vos données RUM
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Surveiller les performances de votre application Flutter avec la solution
    Mobile RUM Datadog
kind: documentation
title: Configuration avancée de RUM pour Flutter
type: multi-code-lang
---
## Présentation

Si vous n'avez pas encore configuré le SDK Flutter Datadog pour RUM, suivez les [instructions de configuration intégrées à l'application][1] ou consultez la [documentation sur la configuration de Flutter pour RUM][2]. Découvrez comment configurer [OpenTelemetry avec RUM pour Flutter](#configuration-d-opentelemetry).

## Suivi automatique des vues

Si vous utilisez la version 2.0 du navigateur Flutter, votre configuration pour le suivi automatique des vues varie en fonction de votre middleware de routage. Cette page décrit comment l'intégrer avec les packages de routage les plus connus.

### go_router

Puisque [go_router][8] utilise la même interface d'observation que la version 1 du navigateur Flutter, l'observateur `DatadogNavigationObserver` peut être ajouté aux autres observateurs sous la forme d'un paramètre de `GoRouter`.

```dart
final _router = GoRouter(
  routes: [
    // Ajouter les informations sur les routes
  ],
  observers: [
    DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // Terminer la configuration
);
```

Si vous utilisez des ShellRoutes, vous devez spécifier un observateur différent pour chaque `ShellRoute`, comme affiché ci-dessous. Pour en savoir plus, consultez [ce bug][11].

```dart
final _router = GoRouter(
  routes: [
    ShellRoute(build: shellBuilder),
    routes: [
      // Routes supplémentaires
    ],
    observers: [
      DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
    ],
  ],
  observers: [
    DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // Terminer la configuration
);
```

En outre, si vous utilisez le paramètre `pageBuilder` de `GoRoute` par dessus son paramètre `builder`, veillez à passer les valeurs `state.pageKey` et `name` à votre `MaterialPage`.

```dart
GoRoute(
  name: 'My Home',
  path: '/path',
  pageBuilder: (context, state) {
    return MaterialPage(
      key: state.pageKey,       // Nécessaire pour que GoRouter puisse appeler les observateurs
      name: name,               // Requis pour que Datadog puisse obtenir le nom de route exact
      child: _buildContent(),
    );
  },
),
```

### AutoRoute

[AutoRoute][9] peut utiliser un `DatadogNavigationObserver` spécifié comme un des `navigatorObservers` dans le cadre de sa méthode `config`.

```dart
return MaterialApp.router(
  routerConfig: _router.config(
    navigatorObservers: () => [
      DatadogNavigationObserver(
        datadogSdk: DatadogSdk.instance,
      ),
    ],
  ),
  // Terminer la configuration
);
```

Cependant, si vous utilisez le routage d'onglets d'AutoRoute, vous devez étendre l'observateur par défaut de Datadog à l'aide de l'interface `AutoRouteObserver` d'AutoRoute.

```dart
class DatadogAutoRouteObserver extends DatadogNavigationObserver
    implements AutoRouterObserver {
  DatadogAutoRouteObserver({required super.datadogSdk});

  // Appliquer l'override uniquement vers les routes d'onglets de l'observateur
  @override
  void didInitTabRoute(TabPageRoute route, TabPageRoute? previousRoute) {
    datadogSdk.rum?.startView(route.path, route.name);
  }

  @override
  void didChangeTabRoute(TabPageRoute route, TabPageRoute previousRoute) {
    datadogSdk.rum?.startView(route.path, route.name);
  }
}
```

Ce nouvel objet remplace le plus simple `DatadogNavigationObserver` lors de la création de la configuration d'AutoRoute.

### Beamer

[Beamer][10] peut utiliser le `DatadogNavigationObserver` comme argument pour `BeamerDelegate` :

```dart
final routerDelegate = BeamerDelegate(
  locationBuilder: RoutesLocationBuilder(
    routes: {
      // Votre configuration de route
    },
  ),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ]
);
```

## Enrichissement des sessions utilisateur

Le service RUM pour Flutter effectue automatiquement le suivi d'attributs tels que l'activité utilisateur, les vues (avec le `DatadogNavigationObserver`), les erreurs, les crashs natifs et les requêtes réseau (avec le Datadog Tracking HTTP Client). Consultez la [documentation sur la collecte de données RUM][3] pour en savoir plus sur les événements RUM et les attributs par défaut. Vous pouvez enrichir les informations sur les sessions utilisateur et bénéficier d'un meilleur contrôle sur les attributs collectés en suivant des événements personnalisés.

### Ajouter vos propres mesures de temps pour les performances

En plus des attributs RUM par défaut, vous pouvez tirer profit de `DdRum.addTiming` pour découvrir combien de temps votre application consacre à chaque tâche. Les mesures de temps sont exprimées en fonction du début de la vue RUM actuelle.

Par exemple, vous pouvez mesurer le temps nécessaire pour afficher votre bannière :

```dart
void _onHeroImageLoaded() {
    DatadogSdk.instance.rum?.addTiming("hero_image");
}
```

Une fois la mesure définie, elle est représentée par `@view.custom_timings.<nom_mesure>`. Exemple : `@view.custom_timings.hero_image`.

Pour créer des visualisations dans vos dashboards, commencez par [créer une mesure][4].

### Suivi des actions de l'utilisateur

Vous pouvez suivre des actions spécifiques de l'utilisateur, telles que des touchers, des clics et des défilements via `DdRum.addAction`.

Pour enregistrer manuellement des actions RUM instantanées, comme `RumActionType.tap`, utilisez `DdRum.addAction()`. Pour enregistrer des actions RUM continues, comme `RumActionType.scroll`, utilisez `DdRum.startAction()` ou `DdRum.stopAction()`.

Par exemple :

```dart
void _downloadResourceTapped(String resourceName) {
    DatadogSdk.instance.rum?.addAction(
        RumActionType.tap,
        resourceName,
    );
}
```

Lorsque vous utilisez `DdRum.startAction` et `DdRum.stopAction`, l'action `type` doit être identique pour que le SDK Flutter Datadog puisse faire correspondre le début d'une action à sa fin.

### Suivre des ressources personnalisées

En plus du suivi automatique des ressources à l'aide du [Datadog Tracking HTTP Client][5], vous pouvez également effectuer le suivi de ressources personnalisées spécifiques, comme des requêtes réseau ou des API de fournisseurs tiers à l'aide des [méthodes suivantes][6] :

- `DdRum.startResource`
- `DdRum.stopResource`
- `DdRum.stopResourceWithError`
- `DdRum.stopResourceWithErrorInfo`

Par exemple :

```dart
// dans votre client réseau :

DatadogSdk.instance.rum?.startResource(
    "resource-key",
    RumHttpMethod.get,
    url,
);

// Ensuite

DatadogSdk.instance.rum?.stopResource(
    "resource-key",
    200,
    RumResourceType.image
);
```

La chaîne utilisée pour `resourceKey` dans les deux appels doit être unique à la ressource que vous appelez pour que le SDK Flutter Datadog puisse faire correspondre le début d'une ressource à sa fin.

### Suivre des erreurs personnalisées

Pour effectuer le suivi d'erreurs spécifiques, informez `DdRum` lorsqu'une erreur survient et transmettez le message, la source, l'exception et les attributs supplémentaires.

```dart
DatadogSdk.instance.rum?.addError("Ceci est un message d'erreur.");
```

## Suivi d'attributs globaux personnalisés

En plus des [attributs RUM par défaut][3] enregistrés automatiquement par le SDK Flutter Datadog, vous pouvez choisir d'ajouter à vos événements RUM des informations de contexte supplémentaires, comme des attributs personnalisés, afin d'améliorer votre observabilité dans Datadog.

Les attributs personnalisés vous permettent de filtrer et de regrouper des informations à propos du comportement de l'utilisateur observé (comme la valeur de son panier, le niveau de la boutique ou la campagne publicitaire) avec des informations au niveau du code (notamment les services backend, la chronologie de la session, les logs d'erreur et la santé du réseau).

### Définir un attribut global personnalisé

Pour définir un attribut global personnalisé, utilisez `DdRum.addAttribute`.

* Pour ajouter ou mettre à jour un attribut, utilisez `DdRum.addAttribute`.
* Pour supprimer la clé, utilisez `DdRum.removeAttribute`.

### Suivi des sessions utilisateur

L'ajout des informations utilisateur à vos sessions RUM facilite :

* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API Utilisateur dans l'interface RUM" style="width:90%" >}}

Les attributs suivants sont **facultatifs**, mais nous vous conseillons d'en spécifier **au moins un** :

| Attribut | Type   | Rôle                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | Chaîne | Identificateur d'utilisateur unique.                                                                                  |
| `usr.name`  | Chaîne | Nom courant de l'utilisateur, affiché par défaut dans l'interface RUM.                                                  |
| `usr.email` | Chaîne | Adresse e-mail de l'utilisateur, affichée dans l'interface RUM si le nom de l'utilisateur n'est pas connu. Elle sert également à récupérer des Gravatars. |

Pour identifier les sessions utilisateur, utilisez `DatadogSdk.setUserInfo`.

Par exemple :

```dart
DatadogSdk.instance.setUserInfo("1234", "John Doe", "john@doe.com");
```

## Modifier ou ignorer des événements RUM

**Remarque** : cette fonctionnalité n'est pas encore disponible pour les applications Web Flutter.

Pour modifier les attributs d'un événement RUM avant de l'envoyer à Datadog, ou pour ignorer complètement un événement, utilisez l'API Event Mappers lors de la configuration du SDK Flutter pour RUM :

```dart
final config = DatadogConfiguration(
    // autre configuration…
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<ID_APPLICATION>',
        rumViewEventMapper = (event) => event,
        rumActionEventMapper = (event) => event,
        rumResourceEventMapper = (event) => event,
        rumErrorEventMapper = (event) => event,
        rumLongTaskEventMapper = (event) => event,
    ),
);
```

Chaque mapper correspond à une fonction dotée d'une signature `(T) -> T?`, où `T` est un type d'événement RUM concret. Cela permet de modifier des parties de l'événement avant son envoi, ou de l'ignorer complètement.

Par exemple, pour effacer des informations sensibles de l'`url` d'une ressource RUM, implémentez une fonction `redacted` personnalisée et utilisez-la dans `rumResourceEventMapper` :

```dart
    rumResourceEventMapper = (event) {
        var resourceEvent = resourceEvent
        resourceEvent.resource.url = redacted(resourceEvent.resource.url)
        return resourceEvent
    }
```

Si le mapper d'action, de ressource ou d'erreur renvoie `null`, l'événement est ignoré dans son intégralité et n'est donc pas envoyé à Datadog. La valeur renvoyée par le mapper d'événement de vue doit être différente de `null`.

Selon le type de l'événement, seules certaines propriétés peuvent être modifiées :

| Type d'événement       | Clé d'attribut                     | Rôle                                   |
|------------------|-----------------------------------|-----------------------------------------------|
| RumViewEvent     | `viewEvent.view.url`              | URL de la vue.                              |
|                  | `viewEvent.view.referrer`         | Référent de la vue.                         |
| RumActionEvent   | `actionEvent.action.target?.name` | Nom de l'action.                           |
|                  | `actionEvent.view.referrer`       | Référent de la vue associée à cette action.   |
|                  | `actionEvent.view.url`            | URL de la vue associée à cette action.        |
| RumErrorEvent    | `errorEvent.error.message`        | Message d'erreur.                                |
|                  | `errorEvent.error.stack`          | Stacktrace de l'erreur.                      |
|                  | `errorEvent.error.resource?.url`  | URL de la ressource associée à l'erreur.      |
|                  | `errorEvent.view.referrer`        | Référent de la vue associée à cette action.   |
|                  | `errorEvent.view.url`             | URL de la vue associée à cette erreur.         |
| RumResourceEvent | `resourceEvent.resource.url`      | URL de la ressource.                          |
|                  | `resourceEvent.view.referrer`     | Référent de la vue associée à cette action.   |
|                  | `resourceEvent.view.url`          | URL de la vue associée à cette ressource.      |

## Activer le consentement au suivi (conformité au RGPD et au CCPA)

Pour répondre aux exigences du règlement général sur la protection des données, le SDK RUM pour Flutter nécessite la valeur de consentement au suivi à son initialisation.

Le paramètre `trackingConsent` peut prendre l'une des valeurs suivantes :

1. `TrackingConsent.pending` : le SDK RUM pour Flutter commence à recueillir les données et à les regrouper par lots, mais ne les envoie pas à Datadog. Il attend d'obtenir la nouvelle valeur de consentement au suivi pour déterminer ce qu'il doit faire de ces lots de données.
2. `TrackingConsent.granted` : le SDK RUM pour Flutter commence à recueillir les données et les envoie à Datadog.
3. `TrackingConsent.notGranted` : le SDK RUM pour Flutter ne recueille aucune donnée. Aucun log, aucun événement, ni aucune trace n'est envoyé à Datadog.

Pour modifier la valeur de consentement au suivi après l'initialisation du SDK RUM pour Flutter, utilisez l'appel d'API `DatadogSdk.setTrackingConsent`. Le SDK modifie son comportement en tenant compte de la nouvelle valeur.

Par exemple, si la valeur de consentement de suivi actuel est `TrackingConsent.pending` et que vous la remplacez par la valeur `TrackingConsent.granted`, le SDK RUM pour Flutter envoie toutes les données enregistrées précédemment ainsi que les données futures à Datadog.

De la même façon, si la valeur est `TrackingConsent.pending` et que vous la remplacez par `TrackingConsent.notGranted`, le SDK RUM pour Flutter efface toutes les données et ne recueille plus aucune donnée par la suite.

## Métriques de performance spécifiques à Flutter

Pour activer la collecte des métriques de performance spécifiques à Flutter, définissez `reportFlutterPerformance: true` dans `DatadogRumConfiguration`. Les données de création des widgets et les durées de raster sont affichées dans [Signaux mobiles][17].

## Envoi de données lorsque l'appareil est hors ligne

La fonction RUM s'assure que les données restent disponibles, même lorsque l'appareil de l'utilisateur est hors ligne. Lorsque la connexion réseau est mauvaise ou que la batterie de l'appareil est trop faible, tous les événements RUM sont d'abord stockés en local sur l'appareil sous forme groupée. Ils sont envoyés dès que le réseau est disponible, et dès que la batterie est suffisamment élevée pour que le SDK Flutter pour RUM n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de logs est conservé jusqu'à ce qu'il puisse être envoyé.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

**Remarque** : les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK RUM pour Flutter.

## Configuration OpenTelemetry

Le package [Datadog Tracking HTTP Client][12] et le package [gRPC Interceptor][13] prennent tous les deux en charge le tracing distribué tant via la génération automatique d'en-tête que via l'ingestion d'en-tête. Cette section explique comment utiliser OpenTelemetry avec RUM pour Flutter.

### Génération d'en-tête Datadog

Lors de la configuration de votre client de suivi ou du gRPC Interceptor, vous pouvez indiquer les types d'en-têtes de tracing que vous souhaitez que Datadog génère. Par exemple, si vous voulez envoyer des en-têtes `b3` à `example.com` et des en-têtes `tracecontext` pour `myapi.names`, vous pouvez le faire avec le code suivant :

```dart
final hostHeaders = {
    'example.com': { TracingHeaderType.b3 },
    'myapi.names': { TracingHeaderType.tracecontext}
};
```

Vous pouvez utiliser cet objet lors de la configuration initiale :

```dart
// Pour le tracing HTTP Datadog par défaut :
final configuration = DatadogConfiguration(
    // configuration
    firstPartyHostsWithTracingHeaders: hostHeaders,
);
```

Vous pouvez alors activer le tracing comme à votre habitude.

Ces informations sont fusionnées avec les hosts définis sur `DatadogConfiguration.firstPartyHosts`. Les hosts spécifiés dans `firstPartyHosts` génèrent les en-têtes de tracing Datadog par défaut.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter#setup
[3]: /fr/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[4]: /fr/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[5]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[7]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogNavigationObserver-class.html
[8]: https://pub.dev/packages?q=go_router
[9]: https://pub.dev/packages/auto_route
[10]: https://pub.dev/packages/beamer
[11]: https://github.com/flutter/flutter/issues/112196
[12]: https://pub.dev/packages/datadog_tracking_http_client
[13]: https://pub.dev/packages/datadog_grpc_interceptor
[14]: https://github.com/openzipkin/b3-propagation#single-headers
[15]: https://github.com/openzipkin/b3-propagation#multiple-headers
[16]: https://www.w3.org/TR/trace-context/#tracestate-header
[17]: /fr/real_user_monitoring/mobile_and_tv_monitoring/mobile_vitals/?tab=flutter