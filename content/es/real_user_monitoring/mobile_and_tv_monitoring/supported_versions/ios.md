---
beta: true
code_lang: ios
code_lang_weight: 20
description: Lista de sistemas operativos y plataformas compatibles con el SDK de
  RUM iOS.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
  tag: Documentación
  text: Configuración avanzada de RUM iOS
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentación
  text: Aprende a explorar tus datos de RUM
- link: /real_user_monitoring/error_tracking/ios/
  tag: Documentación
  text: Aprende a rastrear los errores de iOS
- link: /real_user_monitoring/ios/swiftui/
  tag: Documentación
  text: Aprende a instrumentar aplicaciones de SwiftUI
title: Versiones compatibles de monitorización de RUM iOS y tvOS
type: multi-code-lang
---


## Versiones compatibles

El SDK de RUM iOS es compatible con las siguientes versiones de iOS:

| Plataforma | Compatible | Versión | Notas |
|--------|-------------|---------|-------|
| iOS | {{< X >}} | 11+ | |
| tvOS | {{< X >}} | 11+ | |
| iPadOS | {{< X >}} | 11+ | |
| macOS (diseñado para iPad) | {{< X >}} | 11+ | |
| macOS (Catalyst) | compatibilidad parcial | 12+ | Catalyst solo es compatible en modo de compilación, lo que significa que los objetivos de macOS se compilan, pero las funcionalidades del SDK podrían no funcionar para este objetivo. |
| macOS | | 12+ | macOS no es compatible oficialmente con el SDK de Datadog. Algunas características pueden no ser completamente funcionales. **Nota**:  `DatadogRUM` `DatadogSessionReplay` y `DatadogObjc`, que dependen en gran medida de `UIKit`, no se compilan en macOS. |
| visionOS | | 1.0+ | visionOS no es compatible oficialmente con el SDK de Datadog. Algunas características pueden no ser completamente funcionales. **Nota**: `DatadogCrashReporting` no es compatible con visionOS debido a la falta de soporte por parte de [PLCrashreporter][1]. |
| watchOS | | n/a | |
| Linux | | n/a | |

## Plataformas compatibles

### Xcode
El SDK se compila utilizando la versión más reciente de [Xcode][2], pero siempre es compatible con la [versión mínima compatible anterior de Xcode][3] para la presentación de AppStore.

### Administradores de dependencias
Actualmente admitimos la integración del SDK utilizando los siguientes administradores de dependencias:

- [Swift Package Manager][4]
- [Cocoapods][5]
- [Carthage][6]

### Lenguajes

| Lenguaje | Versión |
|----------|---------|
| UIKit | 5.* |
| Objective-C | 2.0 |

### Instrumentación del marco de la interfaz de usuario

| Marco | Automático | Manual |
|--------|-------|-------|
| UIKit | {{< X >}} | {{< X >}} |
| SwiftUI | | {{< X >}} |

### Compatibilidad de red

| Marco | Automático | Manual |
|--------|-------|-------|
| URLSession | {{< X >}} | {{< X >}} |
| [AlamoFire 5+][7] | | {{< X >}} |
| SwiftNIO | | | 

**Nota**: Las bibliotecas de redes de terceros se pueden instrumentar implementando `DDURLSessionDelegate` personalizado.

### Dependencias

El SDK de Datadog RUM depende de la biblioteca de terceros:

- [PLCrashReporter][8] 1.11.1

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/microsoft/plcrashreporter/issues/288
[2]: https://developer.apple.com/xcode/
[3]: https://developer.apple.com/news/?id=jd9wcyov
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=swiftpackagemanagerspm#declare-the-sdk-as-a-dependency
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=cocoapods#declare-the-sdk-as-a-dependency
[6]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/ios/?tab=carthage#declare-the-sdk-as-a-dependency
[7]: https://github.com/DataDog/dd-sdk-ios/tree/develop/DatadogExtensions/Alamofire
[8]: https://github.com/microsoft/plcrashreporter