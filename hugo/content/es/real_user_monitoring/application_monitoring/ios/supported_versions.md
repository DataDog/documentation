---
aliases:
- /es/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios
- /es/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/
- /es/real_user_monitoring/mobile_and_tv_monitoring/ios/supported_versions
description: Sistemas operativos y plataformas admitidos para el SDK de Datadog para
  iOS, incluidos iOS, iPadOS, tvOS, watchOS y visionOS.
further_reading:
- link: /real_user_monitoring/application_monitoring/ios/advanced_configuration/
  tag: Documentación
  text: Configuración avanzada de RUM para iOS
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente para dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentación
  text: Aprenda a explorar sus datos de RUM
- link: /real_user_monitoring/error_tracking/ios/
  tag: Documentación
  text: Aprenda a realizar el seguimiento de errores en iOS
- link: /real_user_monitoring/ios/swiftui/
  tag: Documentación
  text: Obtenga información sobre la instrumentación de aplicaciones SwiftUI
title: Versiones admitidas para la supervisión de plataformas Apple
---
## Descripción general {#overview}

El SDK de Datadog para iOS es el SDK único para instrumentar Real User Monitoring en todas las plataformas de Apple: iOS, iPadOS, tvOS, watchOS y visionOS. Utilice esta página para confirmar la versión mínima del SO, el gestor de dependencias y los módulos de Datadog disponibles para cada plataforma.

## Versiones admitidas {#supported-versions}

El SDK de RUM para iOS admite las siguientes plataformas y versiones:

| Plataforma | Versión | admitida | Notas |
|--------|-------------|---------|-------|
| iOS | {{< X >}} | 12+ | |
| iPadOS | {{< X >}} | 12+ | |
| tvOS | {{< X >}} | 12+ | |
| visionOS | {{< X >}} | 1.0+ | |
| watchOS | {{< X >}} | 7.0+ | |
| macOS (Diseñado para iPad) | {{< X >}} | 11+ | |
| macOS (Catalyst) | | 12+ | macOS (Catalyst) no es compatible oficialmente |
| macOS | | 12+ | macOS no es compatible oficialmente con el SDK de Datadog. Es posible que algunas funciones no funcionen completamente. **Nota**: `DatadogRUM`, `DatadogSessionReplay` y `DatadogObjc`, que dependen en gran medida de `UIKit`, no se compilan en macOS. |
| Linux | | n/a | |

### Soporte de módulo por plataforma {#module-support-by-platform}

  | Módulo | iOS | tvOS | watchOS | visionOS | Notas |
  |--------|-----|------|---------|----------|-------|
  | DatadogCore | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogLogs | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogTrace | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogCrashReporting | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogRUM | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | watchOS: el seguimiento automático de visualizar/acciones, el monitoreo de la frecuencia de cuadros y la detección de advertencias de memoria no están disponibles. |
  | DatadogFlags | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | |
  | DatadogProfiling | {{< X >}} | {{< X >}} | | {{< X >}} | No disponible en watchOS. El módulo de perfilado requiere APIs a nivel de sistema que watchOS no admite. |
  | DatadogSessionReplay | {{< X >}} | | | | No disponible en tvOS, watchOS y visionOS. SessionReplay requiere capacidades de renderizado que no están disponibles en estas plataformas. |
  | DatadogWebViewTracking | {{< X >}} | | | {{< X >}} | No disponible en tvOS y watchOS. WebViewTracking requiere capacidades de renderizado de navegador que no están disponibles en estas plataformas. |

## Plataformas compatibles {#supported-platforms}

### Xcode {#xcode}
El SDK está construido utilizando la versión más reciente de [Xcode][1], pero siempre es compatible con versiones anteriores con la [versión de Xcode mínima admitida][2] para el envío a la App Store.

### Administradores de dependencias {#dependency-managers}
El SDK de iOS es compatible con los siguientes administradores de dependencias:

- [Swift Package Manager][3]
- [CocoaPods][4]
- [Carthage][5]

### Idiomas {#languages}

| Idioma | Versión |
|----------|---------|
| UIKit | 5.* |
| Objective-C | 2.0 |

### Instrumentación del framework de UI {#ui-framework-instrumentation}

| Framework | Automático | Manual |
|--------|-------|-------|
| UIKit | {{< X >}} | {{< X >}} |
| SwiftUI | {{< X >}} | {{< X >}} |

### Compatibilidad de red {#network-compatibility}

| Framework | Automático | Manual |
|--------|-------|-------|
| URLSession | {{< X >}} | {{< X >}} |
| [Alamofire][6] | {{< X >}} | {{< X >}} |
| [Apollo GraphQL][7] | {{< X >}} | {{< X >}} |
| [SDWebImage][8] | {{< X >}} | {{< X >}} |
| [OpenAPI Generator][9] | {{< X >}} | {{< X >}} |
| SwiftNIO | | |

### Dependencias {#dependencies}

El SDK de Datadog RUM depende de la siguiente biblioteca de terceros:

- [KSCrash][10] 2.5.0

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/xcode/
[2]: https://developer.apple.com/news/?id=fxu2qp7b
[3]: /es/real_user_monitoring/application_monitoring/ios/setup/?tab=swiftpackagemanagerspm#declare-the-sdk-as-a-dependency
[4]: /es/real_user_monitoring/application_monitoring/ios/setup/?tab=cocoapods#declare-the-sdk-as-a-dependency
[5]: /es/real_user_monitoring/application_monitoring/ios/setup/?tab=carthage#declare-the-sdk-as-a-dependency
[6]: /es/real_user_monitoring/application_monitoring/ios/integrated_libraries/#alamofire
[7]: /es/real_user_monitoring/application_monitoring/ios/integrated_libraries/#apollo-graphql
[8]: /es/real_user_monitoring/application_monitoring/ios/integrated_libraries#sdwebimage
[9]: /es/real_user_monitoring/application_monitoring/ios/integrated_libraries#openapi-generator
[10]: https://github.com/kstenerud/KSCrash