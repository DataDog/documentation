---
aliases:
- /fr/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios
- /fr/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/ios/supported_versions
description: Systèmes d'exploitation et plateformes pris en charge pour le SDK iOS
  Datadog, incluant iOS, iPadOS, tvOS, watchOS et visionOS.
further_reading:
- link: /real_user_monitoring/application_monitoring/ios/advanced_configuration/
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
title: Versions prises en charge pour la surveillance des plateformes Apple
---
## Présentation {#overview}

Le SDK iOS Datadog est le SDK unique pour instrumenter le Real User Monitoring sur toutes les plateformes Apple : iOS, iPadOS, tvOS, watchOS et visionOS. Utilisez cette page pour confirmer la version minimale de l'OS, le gestionnaire de dépendances et les modules Datadog disponibles pour chaque plateforme.

## Versions prises en charge {#supported-versions}

Le SDK RUM iOS prend en charge les plateformes et versions suivantes :

| Plateforme | Version | prise en charge | Notes |
|--------|-------------|---------|-------|
| iOS | {{< X >}} | 12+ | |
| iPadOS | {{< X >}} | 12+ | |
| tvOS | {{< X >}} | 12+ | |
| visionOS | {{< X >}} | 1.0+ | |
| watchOS | {{< X >}} | 7.0+ | |
| macOS (conçu pour iPad) | {{< X >}} | 11+ | |
| macOS (Catalyst) | | 12+ | macOS (Catalyst) n'est pas officiellement pris en charge |
| macOS | | 12+ | macOS n'est pas officiellement pris en charge par le SDK Datadog. Certaines fonctionnalités peuvent ne pas être entièrement fonctionnelles. **Note** : `DatadogRUM`, `DatadogSessionReplay` et `DatadogObjc`, qui dépendent fortement de `UIKit`, ne se compilent pas sur macOS. |
| Linux | | n/a | |

### Support du module par plateforme {#module-support-by-platform}

  | Module | iOS | tvOS | watchOS | visionOS | Notes |
  |--------|-----|------|---------|----------|-------|
  | DatadogCore | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogLogs | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogTrace | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogCrashReporting | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogRUM | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | watchOS : le suivi automatique des vues/actions, la surveillance du taux de rafraîchissement et la détection des avertissements de mémoire ne sont pas disponibles. |
  | DatadogFlags | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogProfiling | {{< X >}} | {{< X >}} | | {{< X >}} | Non disponible sur watchOS. Le module de profilage nécessite des API au niveau du système que watchOS ne prend pas en charge. |
  | DatadogSessionReplay | {{< X >}} | | | | Non disponible sur tvOS, watchOS et visionOS. SessionReplay nécessite des capacités de rendu qui ne sont pas disponibles sur ces plateformes. |
  | DatadogWebViewTracking | {{< X >}} | | | {{< X >}} | Non disponible sur tvOS et watchOS. WebViewTracking nécessite des capacités de rendu de navigateur qui ne sont pas disponibles sur ces plateformes. |

## Plateformes prises en charge {#supported-platforms}

### Xcode {#xcode}
Le SDK est construit à l'aide de la version la plus récente de [Xcode][1], mais il reste toujours rétrocompatible avec la [version de Xcode la plus basse prise en charge][2] pour la soumission sur l'App Store.

### Gestionnaires de dépendances {#dependency-managers}
Le SDK iOS prend en charge les gestionnaires de dépendances suivants :

- [Swift Package Manager][3]
- [Cocoapods][4]
- [Carthage][5]

### Langues {#languages}

| Langue | Version |
|----------|---------|
| UIKit | 5.* |
| Objective-C | 2.0 |

### Instrumentation du UI framework {#ui-framework-instrumentation}

| Framework | Automatique | Manuel |
|--------|-------|-------|
| UIKit | {{< X >}} | {{< X >}} |
| SwiftUI | {{< X >}} | {{< X >}} |

### Compatibilité réseau {#network-compatibility}

| Framework | Automatique | Manuel |
|--------|-------|-------|
| URLSession | {{< X >}} | {{< X >}} |
| [Alamofire][6] | {{< X >}} | {{< X >}} |
| [Apollo GraphQL][7] | {{< X >}} | {{< X >}} |
| [SDWebImage][8] | {{< X >}} | {{< X >}} |
| [OpenAPI Generator][9] | {{< X >}} | {{< X >}} |
| SwiftNIO | | |

### Dépendances {#dependencies}

Le SDK RUM Datadog dépend des bibliothèques tierces suivantes :

- [KSCrash][10] 2.5.0

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/xcode/
[2]: https://developer.apple.com/news/?id=fxu2qp7b
[3]: /fr/real_user_monitoring/application_monitoring/ios/setup/?tab=swiftpackagemanagerspm#declare-the-sdk-as-a-dependency
[4]: /fr/real_user_monitoring/application_monitoring/ios/setup/?tab=cocoapods#declare-the-sdk-as-a-dependency
[5]: /fr/real_user_monitoring/application_monitoring/ios/setup/?tab=carthage#declare-the-sdk-as-a-dependency
[6]: /fr/real_user_monitoring/application_monitoring/ios/integrated_libraries/#alamofire
[7]: /fr/real_user_monitoring/application_monitoring/ios/integrated_libraries/#apollo-graphql
[8]: /fr/real_user_monitoring/application_monitoring/ios/integrated_libraries#sdwebimage
[9]: /fr/real_user_monitoring/application_monitoring/ios/integrated_libraries#openapi-generator
[10]: https://github.com/kstenerud/KSCrash