---
aliases:
- /es/real_user_monitoring/ios/integrated_libraries/
- /es/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/ios/
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
title: Bibliotecas de iOS y tvOS para RUM
---

En esta página se enumeran bibliotecas integradas que puedes utilizar para aplicaciones de iOS y tvOS.

## Alamofire

A partir de la versión `2.5.0`, el SDK de RUM para iOS puede realizar un rastreo automático de las solicitudes de [Alamofire][1].

1. Configura la monitorización de RUM siguiendo la guía de [Configuración][2].
2. Activa `URLSessionInstrumentation` para `Alamofire.SessionDelegate`:

```swift
import Alamofire
import DatadogRUM

URLSessionInstrumentation.enable(with: .init(delegateClass: Alamofire.SessionDelegate.self))
```
Para obtener información adicional sobre la frecuencia de muestreo, el rastreo distribuido y la adición de atributos personalizados a los recursos de RUM rastreados, consulta [Configuración avanzada > Rastrear automáticamente solicitudes de red ][4].

## Apollo GraphQL

A partir de la versión `2.5.0`, el SDK de RUM para iOS puede realizar un rastreo automático de las solicitudes de [Apollo GraphQL][3].

1. Configura la monitorización de RUM siguiendo la guía de [Configuración][2].
2. Activa `URLSessionInstrumentation` para `Apollo.URLSessionClient`:

```swift
import Apollo
import DatadogRUM

URLSessionInstrumentation.enable(with: .init(delegateClass: Apollo.URLSessionClient.self))
```
Para obtener información adicional sobre la frecuencia de muestreo, el rastreo distribuido y la adición de atributos personalizados a los recursos de RUM rastreados, consulta [Configuración avanzada > Rastrear automáticamente solicitudes de red ][4].

## SDWebImage

A partir de la versión `2.5.0`, el SDK de RUM para iOS puedes realizar un rastreo automático de las solicitudes de [SDWebImage][5].

1. Configura la monitorización de RUM siguiendo la guía de [Configuración][2].
2. Activa `URLSessionInstrumentation` para `SDWebImageDownloader`:

```swift
import SDWebImage
import DatadogRUM

URLSessionInstrumentation.enable(with: .init(delegateClass: SDWebImageDownloader.self as! URLSessionDataDelegate.Type))
```
Para obtener información adicional sobre la frecuencia de muestreo, el rastreo distribuido y la adición de atributos personalizados a los recursos de RUM rastreados, consulta [Configuración avanzada > Rastrear automáticamente solicitudes de red ][4].

[1]: https://github.com/Alamofire/Alamofire
[2]: https://docs.datadoghq.com/es/real_user_monitoring/mobile_and_tv_monitoring/ios/setup
[3]: https://github.com/apollographql/apollo-ios
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration/#automatically-track-network-requests
[5]: https://github.com/SDWebImage/SDWebImage