---
aliases:
- /es/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/unity
description: Aprende a solucionar problemas de monitorización con Unity.
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: Código fuente
  text: Código fuente de dd-sdk-unity
- link: https://github.com/DataDog/unity-package
  tag: Código fuente
  text: URL del paquete del SDK de Unity
- link: real_user_monitoring/unity/
  tag: Documentación
  text: Más información sobre la monitorización de Unity
title: Solucionar problemas del SDK de Unity
---

## Información general

Si experimentas un comportamiento inesperado con Datadog RUM, utiliza esta guía para solucionar esos problemas. Si sigues teniendo problemas, ponte en contacto con el [Equipo de soporte técnico de Datadog][1] para obtener más ayuda.

## Configurar sdkVerbosity para facilitar la depuración

Si puedes ejecutar tu aplicación, pero no ves los datos que esperas en el sitio de Datadog, intenta añadir lo siguiente a tu código como parte de la inicialización:

{{< code-block lang="cs" >}}
DatadogSdk.Instance.SetSdkVerbosity(CoreLoggerLevel.Debug);
{{< /code-block >}}

Esto hace que el SDK genere información adicional sobre lo que está haciendo y los errores que está encontrando, lo que puede ayudarlos a ti y al equipo de soporte técnico de Datadog a reducir el problema.

## El SDK no envía datos

<div class="alert alert-info">Datadog no admite el envío de datos desde el editor de Unity, solo desde simuladores, emuladores y dispositivos iOS y Android.</div>

Si no ves ningún dato en Datadog:

1. Asegúrate de que estás ejecutando tu aplicación en un simulador, emulador o dispositivo iOS o Android, y no desde el editor.
2. Comprueba que has establecido el `TrackingConsent` como parte de tu inicialización. El consentimiento de seguimiento se establece en `TrackingConsent.Pending` durante la inicialización
y debe configurarse en `TrackingConsent.Granted` antes de que Datadog envíe cualquier información.

   {{< code-block lang="cs" >}}
DatadogSdk.Instance.SetTrackingConsent(TrackingConsent.Granted);
{{< /code-block >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help