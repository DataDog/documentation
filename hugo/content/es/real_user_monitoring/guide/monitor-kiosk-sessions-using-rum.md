---
description: Guía para la monitorización de sesiones Kiosk con RUM.
further_reading:
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentación
  text: Dashboards RUM
title: Monitorización de sesiones Kiosk con RUM
---

## Información general
Las aplicaciones Kiosk, como las máquinas de pedidos de comida rápida y las terminales de check-in de las aerolíneas, suelen atender a varios usuarios en rápida sucesión. Por ese motivo, activar el final de una sesión basándose en una acción del usuario en lugar de esperar a que caduque automáticamente (como luego de 15 minutos de inactividad o de 4 horas de duración total) es vital para recopilar datos y métricas precisas de la sesión para cada usuario. Con el SDK RUM de Datadog puedes utilizar esta función para una experiencia de seguimiento de sesión mejorada.

## Uso de `stopSession()` cuando los usuarios terminan su interacción

Utiliza el método `stopSession()` del SDK para detener la sesión cuando el usuario finalice su interacción con la aplicación, como por ejemplo cuando vuelve a la pantalla de inicio o cierra la sesión. Se creará una nueva sesión en cuanto el usuario vuelva a interactuar con la aplicación o cuando se inicie una nueva vista (sólo para dispositivos móviles).

Si se identifica un usuario dentro de la sesión, es posible que quieras borrar la información del usuario después de llamar a `stopSession()` para empezar de nuevo. Consulta la documentación basada en el marco de tu aplicación: [Navegador][1], [iOS][2], [Android][3], [Flutter][4], [React Native][5].

### Navegador

Esta función requiere el SDK del Navegador RUM versión 4.37.0 o posterior. Consulta las instrucciones de instalación [aquí][6]. 

El método `stopSession()` varía en función de tu método de instalación.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
datadogRum.stopSession()
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

```javascript
DD_RUM.onReady(function() {
    DD_RUM.stopSession()
})
```

{{% /tab %}}
{{% tab "CDN síncrono" %}}

```javascript
window.DD_RUM &&
  window.DD_RUM.stopSession()
```

{{% /tab %}}
{{< /tabs >}}

Si la aplicación está abierta en **varias pestañas del navegador**, al detener la sesión RUM esta se cierra en todas las pestañas.

Si la aplicación utiliza el **SDK de logs**, al detener la sesión RUM también se cierra la sesión Logs.

### Móvil

El método `stopSession()` varía en función de tu marco del SDK móvil.

{{< tabs >}}
{{% tab "iOS" %}}

Esta función requiere el SDK iOS RUM versión 1.18.0 o posterior. Consulta las instrucciones de instalación [aquí][1]. 

```swift
RUMMonitor.shared().stopSession()
```

[1]: https://docs.datadoghq.com/es/real_user_monitoring/ios/

{{% /tab %}}
{{% tab "Android" %}}

Esta función requiere el SDK Android RUM versión 1.19.0 o posterior. Consulta las instrucciones de instalación [aquí][1]. 

```kotlin
GlobalRumMonitor.get().stopSession()
```

[1]: https://docs.datadoghq.com/es/real_user_monitoring/android/

{{% /tab %}}
{{% tab "Flutter" %}}

Esta función requiere el SDK Flutter RUM versión 1.4.0 o posterior. Consulta las instrucciones de instalación [aquí][1].

```dart
DatadogSdk.instance.rum?.stopSession();
```

[1]: https://docs.datadoghq.com/es/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup/

{{% /tab %}}
{{% tab "React Native" %}}

Esta función requiere el SDK React Native RUM versión 1.6.0 o posterior. Consulta las instrucciones de instalación [aquí][1].

```javascript
DdRum.stopSession()
```

[1]: https://docs.datadoghq.com/es/real_user_monitoring/reactnative/

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/advanced_configuration/?tab=cdnsync#clear-user-session-property
[2]: /es/real_user_monitoring/ios/advanced_configuration/?tab=swift
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tab=kotlin#track-user-sessions
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/flutter/advanced_configuration/#track-user-sessions
[5]: /es/real_user_monitoring/reactnative/#user-information
[6]: /es/real_user_monitoring/browser/