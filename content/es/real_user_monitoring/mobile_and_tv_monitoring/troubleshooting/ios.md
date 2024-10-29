---
code_lang: ios
code_lang_weight: 20
description: Aprende a solucionar problemas con la monitorización de iOS.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentación
  text: Datadog Real User Monitoring (RUM)
title: Solucionar problemas con el SDK de iOS
type: multi-code-lang
---

## Información general

Si experimentas un comportamiento inesperado con Datadog RUM, utiliza esta guía para solucionar los problemas rápidamente. Si sigues teniendo problemas, ponte en contacto con el [Equipo de soporte técnico de Datadog][1] para obtener más ayuda.

## Haz un check si el SDK de Datadog está correctamente inicializado

Después de configurar el SDK de Datadog y ejecutar la aplicación por primera vez, haz un check de tu consola de depuración en Xcode. El SDK implementa varios checks de la coherencia y emite las advertencias pertinentes si algo está mal configurado.

## Depuración
Al escribir tu aplicación, puedes activar los logs de desarrollo configurando el valor `verbosityLevel`. Los mensajes pertinentes del SDK con una prioridad igual o superior al nivel proporcionado se emiten en la consola del depurador en Xcode:

```swift
Datadog.verbosityLevel = .debug
```

Entonces deberías ver una salida similar a la siguiente, lo cual indica que un lote de datos de RUM se ha cargado correctamente:
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Cargando lote...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) aceptado, no se retransmitirá: éxito
```

**Recomendación:** Utiliza `Datadog.verbosityLevel` en la configuración `DEBUG`y desactívala en `RELEASE`.

## Utilización de `DDURLSessionDelegate` con tu propio delegado de sesión

Si deseas [realizar un rastreo automático de las solicitudes de red ][2] con `DDURLSessionDelegate`, pero tu aplicación ya implementa su propio delegado de sesión, puedes utilizar los patrones _inheritance_ o _composition_ y reenviar las llamadas a `DDURLSessionDelegate`.

Cuando utilices un patrón de _inheritance_, utiliza `DDURLSessionDelegate` como clase base para tu delegado personalizado y asegúrate de llamar a la implementación de `super` desde tus métodos sustituidos. Por ejemplo:

```swift
clase YourCustomDelegateURLSessionDelegate: DDURLSessionDelegate {
    sustituir func urlSession(_ sesión: URLSession, tarea: URLSessionTask, didCompleteWithError error: ¿Error?) {
        super.urlSession(session, tarea: tarea, didCompleteWithError: error) // reenviar al delegado de Datadog
        /* tu lógica personalizada */
    }
}
```

Cuando utilices un patrón de _composition_, aprovecha el protocolo `__URLSessionDelegateProviding` de Datadog para mantener una instancia interna de `DDURLSessionDelegate` y reenviar las llamadas a `ddURLSessionDelegate`. Por ejemplo:

```swift
clase privada YourCustomDelegateURLSessionDelegate: NSObject, URLSessionTaskDelegate, URLSessionDataDelegate, __URLSessionDelegateProviding {
    // MARCA: - __URLSessionDelegateProviding conformidad

    supongamos que ddURLSessionDelegate = DDURLSessionDelegate()

    // MARCA: - __URLSessionDelegateProviding manipulación

    func urlSession(_ sesión: URLSession, tarea: URLSessionTask, didFinishCollecting métricas: URLSessionTaskMetrics) {
        ddURLSessionDelegate.urlSession(session, tarea: tarea, didFinishCollecting: métricas) // reenviar al delegado de Datadog
        /* tu lógica personalizada */
    }

    func urlSession(_ session: URLSession, tarea: URLSessionTask, didCompleteWithError error: ¿Error?) {
        ddURLSessionDelegate.urlSession(session, tarea: tarea, didCompleteWithError: error) // reenviar al delegado de Datadog
        /* tu lógica personalizada */
    }

    func urlSession(_ sesión: URLSession, dataTask: URLSessionDataTask, didReceive datos: Datos) {
        ddURLSessionDelegate.urlSession(session, dataTask: dataTask, didReceive: datos) // reenviar al delegado de Datadog
        /* tu lógica personalizada */
    }
}
```
**Nota**: Si utilizas _composition_, `ddURLSessionDelegate` debes recibir todas las llamadas necesarias enumeradas en [comentarios del protocolo de `__URLSessionDelegateProviding`][3]. Tu delegado necesita:
* implementar `URLSessionTaskDelegate` y reenviar:
  * [`urlSession(_:task:didFinishCollecting:)`][4]
  * [`urlSession(_:task:didCompleteWithError:)`][5]
* implementar `URLSessionDataDelegate` y reenviar:
  * [`urlSession(_:dataTask:didReceive:)`][6]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
[2]: /es/real_user_monitoring/ios/advanced_configuration/?tab=swift#automatically-track-network-requests
[3]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogInternal/Sources/NetworkInstrumentation/URLSession/DatadogURLSessionDelegate.swift#L14
[4]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1643148-urlsession
[5]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1411610-urlsession
[6]: https://developer.apple.com/documentation/foundation/urlsessiondatadelegate/1411528-urlsession