---
description: Configure los ajustes del SDK de RUM de forma remota para aplicaciones
  de navegador, iOS y Android.
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Real User Monitoring
title: Remote Configuration de RUM
---
## Descripción general {#overview}

A medida que su aplicación evoluciona, es posible que necesite ajustar los datos que recopila el SDK de RUM y su frecuencia de recopilación. La configuración remota de RUM le permite actualizar los ajustes compatibles del SDK para navegador, iOS y Android desde Datadog sin necesidad de implementar una nueva versión de su aplicación.

{{< img src="/real_user_monitoring/remote_configuration/rum_remote_configuration_menu.png" alt="La página de configuración del SDK que enumera los ajustes de RUM para navegador disponibles para Remote Configuration." >}}

## Requisitos previos {#prerequisites}

[Remote Configuration][2] debe estar habilitada en su organización y requiere las siguientes versiones del SDK de RUM:

- Versión 7.13.0+ del SDK para navegador
- Versión 3.17.0+ del SDK para iOS
- Versión 3.14.1+ del SDK para Android

<div class="alert alert-danger">Si su red o proxy utiliza una lista de permitidos, añada <code>*.browser-intake-&lt;DC_REGION&gt;-datadoghq.com</code> para su aplicación. Esta entrada cubre tanto la ingesta de datos de RUM como las solicitudes de Remote Configuration del SDK, que utilizan el <code>sdk-configuration.</code> subdominio. Para aplicaciones de navegador, añada también este dominio a su Política de Seguridad de Contenido.
<br><br> Si este dominio está bloqueado, el SDK no puede recuperar los ajustes remotos y, en su lugar, continúa utilizando su configuración local, sin ningún error visible.</div>

## Cómo funciona {#how-it-works}

Cada aplicación de RUM tiene un ID de Remote Configuration que el SDK utiliza para recuperar sus ajustes remotos.

Cuando el SDK se inicializa, aplica los ajustes remotos almacenados en caché. Si no hay ajustes almacenados en caché disponibles, utiliza los ajustes definidos en su aplicación. El SDK verifica actualizaciones en segundo plano y almacena los cambios para la siguiente inicialización. Si la verificación falla, el SDK conserva su caché existente o continúa utilizando sus ajustes locales. La verificación no retrasa la inicialización del SDK ni interrumpe la recopilación de eventos de RUM.

<div class="alert alert-danger">Los ajustes remotos publicados anulan los ajustes correspondientes en su aplicación. Los ajustes que no habilite de forma remota seguirán utilizando sus valores locales. Habilite solo los ajustes que desee gestionar desde Datadog.</div>

Una Remote Configuration se aplica a todos los usuarios y sesiones inicializados con su ID. No puede dirigirse a usuarios o sesiones individuales. Si cambia el ID, el SDK lo trata como una nueva Remote Configuration y no utiliza los ajustes almacenados en caché con el ID anterior.

<div class="alert alert-warning">El SDK recupera los ajustes de Remote Configuration desde un punto de conexión (CDN) público. No incluya secretos ni información personal en los valores de configuración.</div>

## Permisos {#permissions}

La configuración remota utiliza los mismos permisos que las aplicaciones de RUM. Para habilitar, editar o publicar una configuración, necesita el permiso `RUM Apps Write`. Para obtener más información, consulte [Real User Monitoring permissions][1].

## Configuración {#setup}

Para configurar los ajustes remotos de una aplicación:

1. Instale un SDK de RUM compatible en una aplicación nueva o actualice el SDK en una aplicación existente.
2. Vaya a {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}, seleccione una aplicación y haga clic en {{< ui >}}SDK Configuration{{< /ui >}}.
3. Habilite la configuración remota para generar un ID de configuración remota.
   **Nota**: Datadog guarda la configuración como borrador, por lo que sus valores no anulan los ajustes existentes del SDK antes de que usted la publique.
4. Agregue el ID de Remote Configuration a la inicialización de su SDK.

   {{< tabs >}}
   {{% tab "Navegador" %}}

   Agregue un objeto `remoteConfiguration` a su llamada `datadogRum.init()` existente:

   ```javascript
   remoteConfiguration: {
       id: '<REMOTE_CONFIGURATION_ID>',
   },
   ```

   {{% /tab %}}
   {{% tab "iOS" %}}

   Agregue `remoteConfiguration` a su `Datadog.Configuration`:

   ```swift
   remoteConfiguration: .init(id: "<REMOTE_CONFIGURATION_ID>")
   ```

   {{% /tab %}}
   {{% tab "Android" %}}

   Llame a `setRemoteConfigurationId()` en su `Configuration.Builder`:

   ```kotlin
   .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
   ```

   {{% /tab %}}
   {{< /tabs >}}
 
5. Actualice la configuración como se describe en la sección [Cambiar la configuración del SDK con Remote Configuration](#change-sdk-settings-with-remote-configuration).
6. Publique la configuración para aplicar sus ajustes habilitados.

## Cambiar la configuración del SDK con Remote Configuration {#change-sdk-settings-with-remote-configuration}

La Remote Configuration no anula ninguna configuración del SDK de forma predeterminada. Para administrar una configuración de forma remota, habilite explícitamente su anulación en Datadog y luego configure su valor. Las configuraciones sin una anulación habilitada continúan usando los valores configurados en el SDK.

1. Habilite la anulación para una configuración que desee administrar de forma remota. Elija entre las configuraciones enumeradas en la sección [Configuraciones configurables](#configurable-settings) para su plataforma.

   <div class="alert alert-danger">Ciertas configuraciones requieren las importaciones de módulos correspondientes en los SDK de iOS y Android. Si su aplicación no importa estos módulos, Remote Configuration no funcionará para Session Replay, la traza distribuida o la generación de perfiles.</div>

2. Configure el ajuste seleccionando un estado, cambiando su tasa de muestreo o agregando datos.
3. Guarde sus cambios.

## Configuraciones configurables {#configurable-settings}

{{< tabs >}}
{{% tab "Navegador" %}}

**Tasas de muestreo**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Tasa de muestreo de Session Replay | `rum.sessionReplaySampleRate` |
| Tasa de muestreo de traza | `rum.traceSampleRate` |
| Tasa de muestreo de generación de perfiles | `profiling.sampleRate` |

**Privacidad**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Nivel de privacidad predeterminado | `rum.defaultPrivacyLevel` |
| Privacidad para nombres de acción | `rum.enablePrivacyForActionName` |

**Seguimiento de eventos**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Rastrear usuarios anónimos | `rum.trackAnonymousUser` |
| Rastrear interacciones de usuario | `rum.trackUserInteractions` |
| Rastrear recursos | `rum.trackResources` |
| Rastrear tareas largas | `rum.trackLongTasks` |
| Rastrear sesiones en subdominios | `rum.trackSessionAcrossSubdomains` |

**Atributos de la aplicación**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Atributo de nombre de acción | `rum.actionNameAttribute` |
| Inyección de contexto de traza | `rum.traceContextInjection` |
| URL de traza permitidas | `rum.allowedTracingUrls` |
| Orígenes de seguimiento permitidos | `rum.allowedTrackingOrigins` |

{{% /tab %}}
{{% tab "iOS" %}}

**Tasas de muestreo**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Tasa de muestreo de Session Replay | `sessionReplay.sampleRate` |
| Tasa de muestreo de perfilado continuo | `profiling.continuousSampleRate` |
| Tasa de muestreo de perfilado de inicio de aplicación | `profiling.applicationLaunchSampleRate` |
| Frecuencia de muestreo de trazas | `trace.sampleRate` |

**Privacidad**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Privacidad de texto y entrada | `sessionReplay.textAndInputPrivacy` |
| Privacidad de imágenes | `sessionReplay.imagePrivacy` |
| Privacidad táctil | `sessionReplay.touchPrivacy` |

**Seguimiento de eventos**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Rastrear usuarios anónimos | `rum.trackAnonymousUser` |
| Rastrear interacciones de usuario | `rum.trackUserInteractions` |
| Rastrear recursos | `rum.trackResources` |
| Rastrear eventos en segundo plano | `rum.trackBackgroundEvents` |
| Rastrear señales de frustración | `rum.trackFrustrations` |
| Rastrear tareas largas | `rum.longTask.enabled` |
| Umbral de tarea larga | `rum.longTask.threshold` |
| Frecuencia de actualización de indicadores vitales | `rum.vitalsUpdateFrequency` |
| Rastrear fotogramas lentos | `rum.trackSlowFrames` |
| Rastrear bloqueos de la aplicación | `rum.appHang.enabled` |
| Umbral de bloqueo de la aplicación | `rum.appHang.threshold` |
| Rastrear terminaciones del watchdog | `rum.trackWatchdogTerminations` |
| Rastrear advertencias de memoria | `rum.trackMemoryWarnings` |

**Atributos de la aplicación**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Inyección de contexto de traza | `trace.traceContextInjection` |
| URL de traza permitidas | `trace.tracedHosts` |

{{% /tab %}}
{{% tab "Android" %}}

**Tasas de muestreo**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Tasa de muestreo de perfilado | `rum.profilingSampleRate` |
| Tasa de muestreo de Session Replay | `sessionReplay.sampleRate` |
| Tasa de muestreo de perfilado continuo | `profiling.continuousSampleRate` |
| Tasa de muestreo de perfilado de inicio de aplicación | `profiling.applicationLaunchSampleRate` |
| Frecuencia de muestreo de trazas | `trace.sampleRate` |

**Privacidad**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Privacidad de texto y entrada | `sessionReplay.textAndInputPrivacy` |
| Privacidad de imágenes | `sessionReplay.imagePrivacy` |
| Privacidad táctil | `sessionReplay.touchPrivacy` |

**Seguimiento de eventos**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Rastrear usuarios anónimos | `rum.trackAnonymousUser` |
| Rastrear interacciones de usuario | `rum.trackUserInteractions` |
| Rastrear eventos en segundo plano | `rum.trackBackgroundEvents` |
| Rastrear señales de frustración | `rum.trackFrustrations` |
| Rastrear tareas largas | `rum.longTask.enabled` |
| Umbral de tarea larga | `rum.longTask.threshold` |
| Frecuencia de actualización de indicadores vitales | `rum.vitalsUpdateFrequency` |
| Rastrear fotogramas lentos | `rum.trackSlowFrames` |
| Reporte de fallo | `rum.crashReportsEnabled` |
| Rastrear ANR no fatales | `rum.trackNonFatalAnrs` |

**Atributos de la aplicación**

| Etiqueta de la interfaz de usuario | Nombre del parámetro |
|----------|----------------|
| Inyección de contexto de traza | `trace.traceContextInjection` |
| URL de traza permitidas | `trace.tracedHosts` |

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/#real-user-monitoring
[2]: /es/remote_configuration/