---
beta: true
code_lang: ios
code_lang_weight: 20
description: Liste des systèmes d'exploitation et des plateformes pris en charge par
  le SDK iOS du RUM.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
  tag: Documentation
  text: Configuration avancée du RUM sur iOS
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Code source
  text: Code source de dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentation
  text: Apprendre à explorer vos données RUM
- link: /real_user_monitoring/error_tracking/ios/
  tag: Documentation
  text: Apprendre à suivre les erreurs iOS
- link: /real_user_monitoring/ios/swiftui/
  tag: Documentation
  text: En savoir plus sur l'instrumentation des applications SwiftUI
title: Versions prises en charge du suivi iOS et tvOS du RUM
type: multi-code-lang
---


## Versions prises en charge

Le SDK iOS du RUM prend en charge les versions iOS suivantes :

| Plateforme | Prise en charge | Version | Remarques |
|--------|-------------|---------|-------|
| iOS | {{< X >}} | 11+ | |
| tvOS | {{< X >}} | 11+ | |
| iPadOS | {{< X >}} | 11+ | |
| macOS (Conçu pour iPad) | {{< X >}} | 11+ | |
| macOS (Catalyst) | prise en charge partielle | 12+ | Catalyst n'est pris en charge qu'en mode build, ce qui signifie que le build des cibles macOS est effectué, mais que les fonctionnalités du SDK peuvent ne pas fonctionner pour ces cibles. |
| macOS | | 12+ | macOS n'est pas officiellement pris en charge par le SDK Datadog. Certaines fonctionnalités peuvent ne pas fonctionner pleinement. **Remarque** :  `DatadogRUM` `DatadogSessionReplay` et `DatadogObjc`, qui dépendent fortement de `UIKit`, ne sont pas compatibles avec macOS. |
| visionOS | | 1.0+ | visionOS n'est pas officiellement pris en charge par le SDK Datadog. Certaines fonctionnalités peuvent ne pas fonctionner pleinement. **Remarque** : `DatadogCrashReporting` n'est pas pris en charge par visionOS en raison d'un manque de support du côté de [PLCrashreporter][1]. |
| watchOS | | S.O. | |
| Linux | | non applicable | |

## Plateformes prises en charge

### Xcode
Le SDK est créé en utilisant la version la plus récente de [Xcode][2], mais il est toujours rétrocompatible avec la [version la plus ancienne de Xcode][3] pour les soumission sur l'AppStore.

### Gestionnaires de dépendances
Nous prenons actuellement en charge l'intégration du SDK en utilisant les gestionnaires de dépendances suivants :

- [Swift Package Manager][4]
- [Cocoapods][5]
- [Carthage][6]

### Langages

| Langage | Version |
|----------|---------|
| UIKit | 5.* |
| Objective-C | 2.0 |

### Instrumentation du framework de l'interface

| Framework | Configuration automatique | Configuration manuelle |
|--------|-------|-------|
| UIKit | {{< X >}} | {{< X >}} |
| SwiftUI | | {{< X >}} |

### Compatibilité des réseaux

| Framework | Configuration automatique | Configuration manuelle |
|--------|-------|-------|
| URLSession | {{< X >}} | {{< X >}} |
| [AlamoFire 5+][7] | | {{< X >}} |
| SwiftNIO | | | 

**Remarque** : les bibliothèques de réseaux tierces peuvent être instrumentées en implémentant des `DDURLSessionDelegate` personnalisés.

### Dépendances

Le SDK RUM Datadog dépend des bibliothèques tierces suivantes :

- [PLCrashReporter][8] 1.11.1

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/microsoft/plcrashreporter/issues/288
[2]: https://developer.apple.com/xcode/
[3]: https://developer.apple.com/news/?id=jd9wcyov
[4]: /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=swiftpackagemanagerspm#declare-the-sdk-as-a-dependency
[5]: /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=cocoapods#declare-the-sdk-as-a-dependency
[6]: /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=carthage#declare-the-sdk-as-a-dependency
[7]: https://github.com/DataDog/dd-sdk-ios/tree/develop/DatadogExtensions/Alamofire
[8]: https://github.com/microsoft/plcrashreporter