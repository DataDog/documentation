---
description: Recueillez des données RUM à partir de vos projets Flutter.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Surveiller les performances de votre application Flutter avec la solution
    Mobile RUM Datadog
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Code source de dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Apprendre à explorer vos données RUM
kind: documentation
title: Surveillance Flutter
---
## Présentation

Le Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application.

## Implémentation

### Ajouter les détails de l'application dans l'interface utilisateur

1. Dans l'[application Datadog][1], accédez à **UX Monitoring** > **RUM Applications** > **New Application**.
2. Choisissez le type d'application `Flutter`.
3. Indiquez le nom de votre application pour générer un ID d'application Datadog et un token client uniques.
4. Pour désactiver la collecte automatique des IP client ou des données de géolocalisation, décochez les cases correspondant à ces paramètres. Pour en savoir plus, consultez la section [Données RUM recueillies (Flutter)][7].

   {{< img src="real_user_monitoring/flutter/flutter-new-application.png" alt="Créer une application RUM pour Flutter dans Datadog" style="width:90%;">}}

Pour bien sécuriser vos données, vous devez utiliser un token client. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation pertinente][2].

### Instrumenter votre application

Pour initialiser le SDK Flutter Datadog pour RUM, consultez la rubrique [Configuration][3].

## Suivi automatique des vues

### Version 1 du navigateur Flutter

Le [plug-in Flutter Datadog][4] peut surveiller automatiquement les routes nommées à l'aide de `DatadogNavigationObserver` sur votre MaterialApp :

```dart
MaterialApp(
  home: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ],
);
```

Cette méthode fonctionne si vous utilisez des routes nommées ou si vous avez indiqué un nom pour le paramètre `settings` de votre `PageRoute`.

Si vous n'utilisez pas de routes nommées, vous pouvez vous servir de `DatadogRouteAwareMixin` et du widget `DatadogNavigationObserverProvider` pour lancer et arrêter automatiquement vos vues RUM. `DatadogRouteAwareMixin` vous permet de faire passer n'importe quelle logique de l'état `initState` à l'état `didPush`.

### Version 2 du navigateur Flutter

Si vous utilisez la version 2.0 du navigateur Flutter, qui repose sur le constructeur `MaterialApp.router`, la configuration varie selon le middleware de routing utilisé (le cas échéant). Puisque [go_router][11] utilise la même interface d'observation que la version 1 du navigateur Flutter, l'observateur `DatadogNavigationObserver` peut être ajouté aux autres observateurs sous la forme d'un paramètre de `GoRouter`.

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
)
```

Pour découvrir des exemples de routeurs autres que `go_router`, consultez la rubrique relative au [suivi automatique des vues][12].


### Renommer des vues

Pour toutes les configurations, vous pouvez renommer vos vues ou fournir des chemins personnalisés, en ajoutant un rappel [`viewInfoExtractor`][8]. Cette fonction peut adopter le comportement par défaut de l'observateur en appelant `defaultViewInfoExtractor`. Exemple :

```dart
RumViewInfo? infoExtractor(Route<dynamic> route) {
  var name = route.settings.name;
  if (name == 'my_named_route') {
    return RumViewInfo(
      name: 'MyDifferentName',
      attributes: {'extra_attribute': 'attribute_value'},
    );
  }

  return defaultViewInfoExtractor(route);
}

var observer = DatadogNavigationObserver(
  datadogSdk: DatadogSdk.instance,
  viewInfoExtractor: infoExtractor,
);
```

## Suivre automatiquement des ressources

Le package [Datadog Tracking HTTP Client][5] vous permet d'activer le suivi automatique des ressources et des appels HTTP depuis vos vues RUM.

Ajoutez le package à votre `pubspec.yaml`, puis ajoutez ce qui suit à votre fichier d'initialisation :

```dart
final configuration = DdSdkConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**Remarque** : le client HTTP de suivi Datadog apporte des modifications à [`HttpOverrides.global`][9]. Si vous utilisez votre propre `HttpOverrides`, vous devrez potentiellement configurer un héritage depuis [`DatadogHttpOverrides`][10]. Dans ce cas-là, il n'est pas nécessaire d'appeler `enableHttpTracking`. Les versions 1.3+ de `datadog_tracking_http_client` vérifient la valeur de `HttpOverrides.current` et s'en servent lors de la création du client. Vous devez donc simplement vous assurer d'initialiser `HttpOverrides.global` avant Datadog.

Pour activer le [tracing distribué][6] Datadog, vous devez définir la propriété `DdSdkConfiguration.firstPartyHosts` de votre objet de configuration sur un domaine prenant en charge le tracing distribué. Il est également possible de modifier le taux d'échantillonnage du tracing distribué : pour ce faire, définissez `tracingSamplingRate` dans votre `RumConfiguration`.

- `firstPartyHosts` n'accepte pas de wildcards, mais peut correspondre à n'importe quel sous-domaine d'un domaine donné. Par exemple, `api.example.com` correspond à `staging.api.example.com` et `prod.api.example.com`, mais pas à `news.example.com`.

- `RumConfiguration.tracingSamplingRate` définit un taux d'échantillonnage par défaut de 20 %. Si vous souhaitez que toutes les requêtes de ressource génèrent une trace distribuée complète, définissez cette valeur sur `100.0`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /fr/account_management/api-app-keys/#client-tokens
[3]: /fr/real_user_monitoring/flutter/#setup
[4]: https://pub.dev/packages/datadog_flutter_plugin
[5]: https://pub.dev/packages/datadog_tracking_http_client
[6]: /fr/serverless/distributed_tracing
[7]: /fr/real_user_monitoring/flutter/data_collected/
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[9]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[10]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[11]: https://pub.dev/packages/go_router
[12]: /fr/real_user_monitoring/flutter/advanced_configuration/#automatic-view-tracking