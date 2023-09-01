---
description: Découvrez comment résoudre les problèmes liés à la surveillance Flutter.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Code source de dd-sdk-flutter
- link: real_user_monitoring/flutter/
  tag: Documentation
  text: En savoir plus sur la surveillance Flutter
kind: documentation
title: Dépannage
---
## Problèmes relatifs à Cocoapods

Si vous ne parvenez pas à builder votre application iOS après avoir ajouté le SDK Datadog à cause d'erreurs renvoyées par Cocoapods, examinez l'erreur que vous recevez. L'erreur la plus courante est liée à la récupération de la dernière version de la bibliothèque native de Cocoapods. Pour la résoudre, exécutez la commande suivante dans votre répertoire `ios` :

```bash
pod install --repo-update
```

Il existe une autre erreur courante causée par un problème de chargement de la bibliothèque FFI sur les Mac dotés d'un processeur Apple Silicon. Si vous voyez une erreur de ce type :

```bash
LoadError - dlsym(0x7fbbeb6837d0, Init_ffi_c): symbol not found - /Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi_c.bundle
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:6:in `rescue in <top (required)>'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:3:in `<top (required)>'
```

Suivez les instructions détaillées dans la [documentation Flutter][1] relative à l'utilisation de Flutter sur les ordinateurs dotés d'un processeur Apple Silicon.

## Définir sdkVerbosity

Si vous pouvez exécuter votre application mais que vous ne voyez pas les données prévues sur le site Datadog, essayez d'ajouter ce qui suit à votre code avant d'appeler `DatadogSdk.initialize` :

```dart
DatadogSdk.instance.sdkVerbosity = Verbosity.verbose;
```

Cela oblige le SDK à fournir des informations supplémentaires relatives à son activité et aux erreurs qu'il a rencontrées, ce qui peut vous aider, vous et l'assistance Datadog, à cerner plus précisément le problème.

## Aucune erreur visible

Si vous ne voyez aucune erreur dans RUM, il est probable qu'aucune vue n'ait été démarrée. Assurez-vous d'avoir démarré une vue avec `DatadogSdk.instance.rum?.startView`. Si vous utilisez `DatadogRouteObserver`, vérifiez qu'un nom a été attribué à la route actuelle.

## Problèmes liés au suivi automatique des ressources et au tracing distribué

Le package du [client de suivi HTTP Datadog][2] fonctionne avec la plupart des packages réseau Flutter courants basés sur `dart:io`, notamment [`http`][3] et [`Dio`][4].

Si vous voyez des ressources dans vos sessions RUM, alors le client de suivi HTTP fonctionne, mais d'autres étapes peuvent être requises pour utiliser le tracing distribué.

Par défaut, le SDK RUM Datadog pour Flutter ne conserve que 20 % des traces distribuées des requêtes de ressources. Afin de déterminer si le problème se situe au niveau de votre configuration, nous vous conseillons de définir cette valeur sur 100 % des traces en modifiant votre initialisation à l'aide des lignes suivantes :
```dart
final configuration = DdSdkConfiguration(
   //
   rumConfiguration: RumConfiguration(
    applicationId: '<ID_APPLICATION_RUM>',
    tracingSamplingRate: 100.0
   ),
);
```

Si le problème persiste, vérifiez que votre propriété `firstPartyHosts` est correctement définie. Elle ne doit contenir que des hosts, sans schémas ni chemins, et elle ne prend pas en charge les expressions régulières ni les wildcards. Par exemple :

    ✅ Correct - 'example.com', 'api.example.com', 'us1.api.sample.com'
    ❌ Incorrect - 'https://example.com', '*.example.com', 'us1.sample.com/api/*', 'api.sample.com/api'

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon
[2]: https://pub.dev/packages/datadog_tracking_http_client
[3]: https://pub.dev/packages/http
[4]: https://pub.dev/packages/dio