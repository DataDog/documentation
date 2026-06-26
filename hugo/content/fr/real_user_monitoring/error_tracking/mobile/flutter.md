---
aliases:
- /fr/real_user_monitoring/error_tracking/flutter
code_lang: flutter
code_lang_weight: 50
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/error_tracking.md
description: Découvrez comment suivre les erreurs Flutter avec Error Tracking.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Code source
  text: Code source dd-sdk-flutter
- link: real_user_monitoring/error_tracking/
  tag: Documentation
  text: En savoir plus sur le suivi des erreurs
title: Signalement de pannes Flutter et suivi des erreurs
type: multi-code-lang
---
## Section Overview

Activez les rapports de crash et le suivi des erreurs afin d'accéder à des rapports de crash complets et à des tendances sur les erreurs via la solution Real User Monitoring.

Vos rapports de crash sont disponibles dans l'interface [**Error Tracking**][1].

## Configuration

Si vous n'avez pas encore configuré le SDK Flutter Datadog, suivez les [instructions de configuration intégrées à l'application][2] ou consultez la [documentation sur la configuration de Flutter][3].

### Ajouter le suivi des erreurs Dart

Si vous utilisez `DatadogSdk.runApp`, le SDK Flutter Datadog suit et signale automatiquement les exceptions Dart non capturées.

Si vous n'utilisez **pas** `DatadogSdk.runApp`, vous devez configurer le suivi des erreurs Dart manuellement avec le code suivant avant d'initialiser Datadog :

```dart
final originalOnError = FlutterError.onError;
FlutterError.onError = (details) {
  DatadogSdk.instance.rum?.handleFlutterError(details);
  originalOnError?.call(details);
};
final platformOriginalOnError = PlatformDispatcher.instance.onError;
PlatformDispatcher.instance.onError = (e, st) {
  DatadogSdk.instance.rum?.addErrorInfo(
    e.toString(),
    RumErrorSource.source,
    stackTrace: st,
  );
  return platformOriginalOnError?.call(e, st) ?? false;
};
```

### Ajouter des rapports de crash natifs

Mettez à jour votre extrait d'initialisation afin d'activer les rapports de crash natifs pour iOS et Android en définissant `nativeCrashReportEnabled` sur `true`.

Exemple :

```dart
final configuration = DatadogConfiguration(
  clientToken: '<TOKEN_CLIENT_DD>'
  env: '<ENV_DD>'
  site: DatadogSite.us1,
  nativeCrashReportEnabled: true, // Set this flag
  loggingConfiguration: DatadogLoggingConfiguration(),
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<ID_APP_DD>',
  ),
);
```

Si votre application subit un crash fatal, le SDK Flutter Datadog importe un rapport de crash dans Datadog *après* le redémarrage de votre application. Pour les erreurs non fatales, le SDK Flutter Datadog importe ces erreurs avec d'autres données du RUM.

## Récupérer les stack traces désobfusquées

Les fichiers de mappage sont utilisés pour désobfusquer les stack traces, ce qui facilite le débogage des erreurs. À l'aide d'un identifiant de build unique qui est généré, Datadog fait automatiquement correspondre les stack traces avec les fichiers de mappage correspondants. Cela garantit que, quel que soit le moment où le fichier de mappage a été téléchargé (que ce soit lors des builds de pré-production ou de production), les informations correctes sont disponibles pour assurer un processus de contrôle qualité efficace lors de l'examen des pannes et des erreurs signalées dans Datadog.

Pour les applications Flutter, la correspondance entre les stack traces et les source maps repose sur les champs `service`, `version`, `variant` et `architecture`.

### Importer des fichiers de symboles sur Datadog

Les rapports de crash iOS natifs sont recueillis dans un format brut et contiennent principalement des adresses mémoire. Pour convertir ces adresses en informations symboliques lisibles, Datadog nécessite que vous importiez des fichiers .dSYM, qui sont générés lors du processus de build de votre application.

Les rapports de crash et les erreurs envoyés par les applications iOS et Android Flutter construites avec l'ensemble d'options `--split-debug-info` ou l'ensemble d'options `--obfuscate` seront également dans un format brut ou obfusqué. Pour ces applications, vous devez importer leur fichier de mappage Proguard pour Android et les fichiers de symboles Dart générés par le processus de build de Flutter.

Les erreurs envoyées par les applications Web Flutter envoient des numéros de fichiers et de lignes JavaScript non mappés, qui doivent l'être avec des numéros de fichiers et de lignes Dart. Pour ces applications, vous devez importer la source map JavaScript générée par le processus de build de Flutter.

L'outil de ligne de commande [@Datadog/Datadog-ci][4] permet d'importer tous les fichiers nécessaires (dSYM, mappage Proguard pour Android et fichiers de symboles Dart) avec une seule commande.

Commencez par installer l'outil `datadog-ci` en suivant les instructions ci-dessus et créez un fichier `datadog-ci.json` à la racine de votre projet, contenant votre clé d'API et (éventuellement) votre site Datadog :
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // Facultatif si vous utilisez datadoghq.com
}
```

Comme ce fichier contient votre clé d'API, il ne doit pas être vérifié dans le contrôle de version.

Vous pouvez également définir les variables d'environnement `DATADOG_API_KEY` et `DATADOG_SITE`.

Ensuite, vous pouvez utiliser la commande suivante pour importer tous les fichiers nécessaires à la symbolisation et à la désobfuscation de vos rapports de crash :
```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms
```

**Remarque** : la réimportation d'une source map ne remplace pas lʼancienne si la version n'a pas changé.

Pour obtenir la liste complète des options, consultez la [documentation relative aux symboles Flutter][5] `datadog-ci`.

## Limites

{{< site-region region="us,us3,us5,eu,gov" >}}
Les source maps et fichiers dSYM sont limités à **500** Mo chacun.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Les source maps et fichiers dSYM sont limités à **500** Mo chacun.
{{< /site-region >}}

## Tester votre implémentation

Pour vérifier la configuration des fonctionnalités de rapport de crash et de suivi des erreurs pour Flutter, générez une erreur dans votre application et confirmez que l'erreur s'affiche dans Datadog.

1. Exécutez votre application sur un simulateur, un émulateur ou un véritable appareil. Si vous utilisez iOS, assurez-vous que l'outil de debugging n'est pas connecté, sans quoi Xcode capturera le crash avant le SDK Datadog.
2. Exécutez du code contenant une erreur ou un crash. Par exemple :

   ```dart
   void throwError() {
    throw Exception("My Exception")
   }
   ```

3. Pour les rapports d'erreur obfusqués qui ne génèrent pas de crash, vous pouvez vérifier le décodage et la désobfuscation dans la section [**Error Tracking**][8].
4. Après le crash, redémarrez votre application et patientez le temps que le SDK Flutter importe le rapport de crash dans l'interface [**Error Tracking**][8].

### Flavors et numéros de builds

Datadog utilise l'association de `service-name`, `version` et `flavor` pour localiser les symboles corrects pour la désobfuscation. Pour que vos rapports de crash contiennent des informations complètes, les paramètres envoyés à la commande `datadog-ci` et les paramètres définis dans [DatadogConfiguration][6] doivent correspondre exactement.

Si vous utilisez des [flavors][7] d'app dans Flutter, vous devez définir le nom de la flavor dans [DatadogConfiguration.flavor][8] car nous ne pouvons pas la détecter automatiquement. Vous pouvez ensuite transmettre ce nom au paramètre `--flavor` de la commande `datadog-ci` :

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <emplacement_de_symboles_dart> --android-mapping --ios-dsyms --flavor my_flavor
```

Le SDK Datadog détecte automatiquement le numéro de version de votre application spécifié dans votre `pubspec.yaml` jusqu'au numéro de build, sans l'inclure. Si vous utilisez des numéros de build pour les versions de votre application et que vous devez importer des symboles pour chaque build, vous devez ajouter la version à [DatadogConfiguration.version][9]. Vous pouvez ensuite la transmettre au paramètre `--version` de la commande `datadog-ci` :

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <emplacement_de_symboles_dart> --android-mapping --ios-dsyms --version 1.2.3+22
```

**Remarque** : Datadog utilise des tags pour les versions qui n'autorisent pas `+`. Tous les outils remplacent automatiquement `+` par `-` afin que les tags de version soient consultable dans Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/flutter-symbols
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[7]: https://docs.flutter.dev/deployment/flavors
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/flavor.html
[9]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/version.html