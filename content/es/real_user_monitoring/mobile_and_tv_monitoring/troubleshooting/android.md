---
code_lang: android
code_lang_weight: 10
description: Aprende a solucionar problemas con la monitorización de Android.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: /real_user_monitoring
  tag: Documentación
  text: Explora Real User Monitoring (RUM)
title: Solucionar problemas con el SDK de Android
type: multi-code-lang
---

## Información general

Si experimentas un comportamiento inesperado con Datadog RUM, utiliza esta guía para solucionar los problemas rápidamente. Si sigues teniendo problemas, ponte en contacto con el [Equipo de soporte técnico de Datadog][1] para obtener más ayuda.

## Comprueba si Datadog RUM está inicializado
Utiliza el método de utilidad `isInitialized` para comprobar si el SDK está correctamente inicializado:

```kotlin
si (Datadog.isInitialized()) {
    // tu código aquí
}
```

## Depuración
Al escribir tu aplicación, puedes activar los logs de desarrollo llamando al método `setVerbosity`. Todos los mensajes internos de la biblioteca con una prioridad igual o superior al nivel proporcionado se loguean en Logcat de Android:

```kotlin
Datadog.setVerbosity(Log.INFO)
```

## Configurar el consentimiento de rastreo (cumplimiento del RGPD)

Para cumplir con la normativa del Reglamento general de protección de datos (RGPD), el SDK requiere el valor del consentimiento de rastreo en la inicialización.
El consentimiento de rastreo puede ser uno de los siguientes valores:

- `TrackingConsent.PENDING`: (Predeterminado) El SDK comienza a recopilar los datos y a procesarlos por lotes, pero no los envía al
 endpoint de recopilación. El SDK espera el nuevo valor del consentimiento de rastreo para decidir qué hacer con los datos procesados por lotes.
- `TrackingConsent.GRANTED`: el SDK comienza a recopilar los datos y los envía al endpoint de recopilación de datos.
- `TrackingConsent.NOT_GRANTED`: El SDK no recopila ningún dato. No puedes enviar manualmente ningún log, traza ni
 evento de RUM.

Para actualizar el consentimiento de rastreo después de inicializar el SDK, llama a `Datadog.setTrackingConsent(<NEW CONSENT>)`. El SDK cambia de comportamiento de acuerdo con el nuevo consentimiento. Por ejemplo, si el consentimiento de rastreo actual es `TrackingConsent.PENDING` y lo actualizas a:

- `TrackingConsent.GRANTED`: el SDK envía todos los datos actuales procesados por lotes y los datos futuros directamente al endpoint de recopilación de datos.
- `TrackingConsent.NOT_GRANTED`: el SDK borra todos los datos procesados por lotes y no recopila datos futuros.

## Migración a la versión 2.0.0

Si has estado utilizando el SDK v1, se introdujeron algunos cambios de última hora en la versión `2.0.0`. Consulta la [guía para la migración][2] para obtener más información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/MIGRATION.MD