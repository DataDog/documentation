---
description: Guía de actualización para migrar entre versiones principales de SDK
  de navegador RUM con los últimos cambios, nuevas funciones y actualizaciones de
  compatibilidad.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualizar tus datos RUM en el Explorer
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utiliza Datadog Session Replay para ver en tiempo real los recorridos de los
    usuarios.
title: Actualizar el SDK del navegador RUM
---

## Información general

Sigue esta guía para migrar entre las principales versiones de los SDK de Navegador RUM y los SDK de logs de navegador. Consulta [la documentación del SDK][26] para obtener información detallada sobre sus características y capacidades.

## De v5 a v6

La principal mejora de la versión 6 es la reducción del tamaño de los paquetes. Al eliminar la compatibilidad con IE11 y aprovechar la carga diferida, el tamaño del paquete RUM se ha reducido en un 10% y el del paquete de logs en casi un 9%.
Además, hemos cambiado algunos parámetros de inicialización por defecto y nos hemos preparado para futuras mejoras.

Ten en cuenta los siguientes cambios de última hora al actualizar tu SDK.

### Cambios de última hora

#### Compatibilidad con navegadores

Se ha interrumpido la compatibilidad con IE11 y otros navegadores antiguos. Los navegadores ahora deben ser compatibles al menos con ES2018.
Para utilizar Datadog en navegadores antiguos, puedes seguir utilizando Browser SDK v5 o anteriores.

#### Añadir encabezados tracestate cuando se utilizan propagadores de rastreo en el contexto

El propagador por defecto `tracecontext` envía ahora un nuevo encabezado `tracestate` con metadatos adicionales que permiten una mejor atribución de tus trazas (traces). Si utilizas este propagador, deberás permitir este nuevo encabezado para todos los endpoints rastreados, además del encabezado `traceparent` existente:

```
Access-Control-Allow-Headers: traceparent, tracestate
```

#### Opción de tipo `site` más fuerte

La opción `site` ahora tiene una definición de tipo más fuerte. Si utilizas TypeScript, podrías obtener un error si utilizas un valor no estándar. Recomendamos utilizar un [proxy][27] para enviar datos RUM a una URL no estándar.

#### El Seguimiento de acciones, los Recursos y las Tareas de larga duración están ahora activados por defecto.

Las interacciones de los usuarios, los recursos y las tareas de larga duración ahora se rastrean por defecto. Este cambio no afecta a la facturación. Para excluirlos, configura los [parámetros de inicialización][28]`trackUserInteractions`, `trackResources` y `trackLongTasks` como `false`.

#### Recopilar fotogramas de animación largos como tareas de larga duración

En los navegadores compatibles, ahora se recopilan [fotogramas de animación largos][35] en lugar de tareas largas. El tipo de evento en el Explorador RUM sigue siendo `long_task`, pero contendrá información sobre el fotograma de animación largo.

#### Aumento de la fecha de caducidad de las cookies

Para permitir el seguimiento anónimo del usuario, la caducidad de la cookie de sesión (`_dd_s`) se amplía a 1 año. Para excluirla, configura los [parámetros de inicialización][28] `trackAnonymousUser` como `false`.

#### Eliminar el parámetro de inicialización useCrossSiteSessionCookie

`useCrossSiteSessionCookie` era obsoleto y ya no es compatible. En su lugar, utiliza [parámetros de inicialización][28] `usePartitionedCrossSiteSessionCookie`.

#### Carga diferida de Session Replay

El módulo de Session Replay se carga ahora de forma diferida utilizando [importaciones dinámicas][30]. Esto carga el módulo sólo para las sesiones muestreadas para Session Replay, reduciendo el tamaño de paquete de los demás.

**Si estás utilizando el SDK a través de NPM**, asegúrate de que tu empaquetador admite importaciones dinámicas. La mayoría de los empaquetadores modernos admiten esta característica predefinida, pero algunos pueden requerir cambios en la configuración. Para obtener más información, consulta la documentación de tu empaquetador: [Webpack][31], [Esbuild][32], [Rollup][33], [Parcel][34].

**Si estás utilizando el SDK a través de una CDN**, no hay cambios de última hora. Sin embargo, ten en cuenta que además de cargar el script principal (por ejemplo, 
`datadog-rum.js`), el SDK cargará dinámicamente un fragmento adicional cuando sea necesario (por ejemplo, 
`recorder-d7628536637b074ddc3b-datadog-rum.js`).

#### No inyectar contextos de rastreo para trazas no muestreadas

El valor predeterminado del parámetro de inicialización `traceContextInjection` se ha actualizado a `sampled` para garantizar que las decisiones de muestreo de servicios backend se aplican cuando las trazas no se muestrean en el SDK del navegador. Para obtener más información, consulta la [documentación Conectar RUM y trazas[29].

**Nota**: Si estás utilizando un `traceSampleRate` de 100% (por defecto), este cambio no tiene ningún impacto para ti.



### Futuros cambios de última hora

#### Activación de la compresión de solicitudes de admisión en Datadog 

La compresión de solicitudes de admisión en Datadog se activará por defecto en una futura versión mayor.
Datadog recomienda activar la compresión ahora utilizando el [parámetro de inicialización][28]`compressIntakeRequests`. 
Dado que la compresión se realiza en un subproceso del worker, es necesario configurar la Política de seguridad de contenidos. Para obtener más información, consulta las [directivas CSP][18].

## De v4 a v5

La v5 introduce los siguientes cambios y más:

- Nuevas configuraciones y valores predeterminados de privacidad para Session Replay
- Recopilación automática de señales de frustración
- Métricas de rendimiento actualizadas
- Parámetros de SDK y API actualizados

Ten en cuenta los siguientes cambios de última hora al actualizar tu SDK. Los cambios están agrupados por área de impacto.

### General

#### Parámetros de inicialización del SDK

**Acción a realizar**: Sustituye los parámetros obsoletos por los nuevos parámetros equivalentes en la v5. Los antiguos nombres de parámetros ya no están disponibles en la v5.

| Nombre de parámetro obsoleto (v4 o anterior) | Nuevo nombre del parámetro (v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | proxy |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### API públicas

**Acción a realizar**: Sustituye las API obsoletas por las nuevas API equivalentes. Las API antiguas ya no están disponibles en la v5.

| Nombre de parámetro obsoleto (v4 o anterior) | Nuevo nombre del parámetro (v5) |
|-------------------------------------------|-------------------------|
| DD_RUM.removeUser | [DD_RUM.clearUser][7] |
| DD_RUM.addRumGlobalContext | [DD_RUM.setGlobalContextProperty][8] |
| DD_RUM.removeRumGlobalContext | [DD_RUM.removeGlobalContextProperty][9] |
| DD_RUM.getRumGlobalContext | [DD_RUM.getGlobalContext][10] |
| DD_RUM.setRumGlobalContext | [DD_RUM.setGlobalContext][11] |
| DD_LOGS.addLoggerGlobalContext | [DD_LOGS.setGlobalContextProperty][8] |
| DD_LOGS.removeLoggerGlobalContext | [DD_LOGS.removeGlobalContextProperty][9] |
| DD_LOGS.getLoggerGlobalContext | [DD_LOGS.getGlobalContext][12] |
| DD_LOGS.setLoggerGlobalContext | [DD_LOGS.setGlobalContext][13] |
| logger.addContext | [logger.setContextProperty][14] |
| logger.removeContext | [logger.removeContextProperty][15] |

#### Dominios de admisión
La v5 envía datos a dominios de admisión distintos de los de las versiones anteriores.

**Acción a realizar**: Actualiza cualquier entrada `connect-src` de la [Política de seguridad de contenidos (CSP)][18] para el nuevo dominio.

| Sitio Datadog | Dominio |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| UE1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |

#### Eventos de confianza
Para evitar la recopilación de datos incorrectos o ilegítimos, la v5 sólo escucha los eventos generados por acciones del usuario, ignorando los eventos creados por scripts. Para ver más detalles, consulta los [eventos de confianza][19].

**Acción a realizar**: Si dependes de cualquier evento programático y quieres que el SDK lo tenga en cuenta, añádale el atributo `__ddIsTrusted`, como se indica a continuación:

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**Acción a realizar**: Si dependes en gran medida de eventos programáticos, como en un entorno de test de interfaz de usuario automatizado, por ejemplo, puedes permitir todos los eventos que no son de confianza configurando `allowUntrustedEvents: true`.

#### Tipo de devolución `beforeSend`
Las funciones de callback `beforeSend` deben devolver un valor booleano:

```javascript
beforeSend(event: any, context?: any) => boolean
```

La implementación no ha cambiado. Si no se devuelve ningún valor, no se descarta el evento.

**Acción a realizar**: Asegúrate de que `beforeSend` devuelve `true` para conservar el evento y `false` para descartarlo. Esto resuelve los errores de compilación de TypeScript relacionados.

### Session Replay

#### Enmascaramiento de Session Replay

El parámetro predeterminado de enmascaramiento de Session Replay `defaultPrivacyLevel` se ha cambiado de `mask-user-input` a `mask`. Esto oculta todos los datos de las grabaciones de Session Replay por defecto, haciendo que las grabaciones sean menos sensibles a la vista. Para obtener más información, consulta [Opciones de privacidad del navegador de Session Replay][20].

**Acción a realizar**: Si quieres ver más datos no enmascarados en Session Replay, como contenido HTML no sensible o texto introducido por el usuario, configura `defaultPrivacyLevel` como `mask-user-input` o `allow`.

#### Grabación automática de sesiones muestreadas para Session Replay
Las sesiones que se muestrean para Session Replay utilizando [`sessionReplaySampleRate`][21] se graban automáticamente al inicio de la sesión. Esto significa que no tienes que llamar al método [`startSessionReplayRecording()`][22] para capturar una grabación. En otras palabras, no se perderá accidentalmente ninguna grabación.

**Acción a realizar**: Si quieres seguir utilizando el comportamiento de grabación antiguo y personalizar cuándo se inicia la grabación, configura `startSessionReplayRecordingManually` como `true`.

#### Sólo pagar Session Replay cuando la sesión captura una grabación
En versiones anteriores del SDK, las sesiones se determinan como sesiones de Session Replay a través del mecanismo de muestreo. En la v5, las sesiones sólo se cuentan como sesiones de Session Replay si se captura una grabación durante la sesión. Esto facilita el seguimiento del uso de Session Replay.

**No es necesaria ninguna acción**: Este comportamiento se activa automáticamente en la v5.

#### Frecuencia de muestreo predeterminada de Session Replay
En la v5, el valor predeterminado de `sessionReplaySampleRate` es 0 en lugar de 100. Si no incluyes una frecuencia de muestreo, no se registra ninguna repetición.

**Acción a realizar**: Para utilizar Session Replay, define una frecuencia de muestreo explícitamente con `sessionReplaySampleRate: 100` (u otra frecuencia de muestreo).

### RUM

### Integración APM

Para promover la compatibilidad y el uso de OpenTelemetry, se han modificado los tipos de propagadores por defecto para incluir `tracecontext` además de `datadog`.

**Acción a realizar**: Si aún no estás especificando el propagador deseado en el parámetro de inicialización `allowedTracingUrls`, configura los encabezados Access-Control-Allow-de tu servidor para aceptar también el encabezado `traceparent`. Para obtener más información, consulta [Conectar RUM y trazas][25].

### Campo del plan de sesión

En relación con los cambios en Session Replay, el campo `session.plan` sólo está disponible para eventos de sesión.

**Acción a realizar**: Actualiza cualquier consulta de monitor o dashboard que hayas guardado para excluir el campo `session.plan` para eventos que no pertenezcan a una sesión.

#### Las señales de frustración se recopilan automáticamente
Sólo tienes que configurar `trackUserInteractions: true` para recopilar todas las interacciones del usuario, incluidas las señales de frustración. Ya no es necesario configurar el parámetro `trackFrustrations` por separado.

**Acción a realizar**: Para realizar un seguimiento de las señales de frustración, configura `trackUserInteractions: true`. El parámetro `trackFrustrations` puede eliminarse.

#### La duración de los recursos se omite en las páginas congeladas
La recopilación de recursos omite las duraciones de los recursos que se prolongaron debido a que la página pasó a segundo plano, por ejemplo, cuando el usuario hace clic en otra pestaña mientras se carga la página.

**No es necesaria ninguna acción**: Este comportamiento se activa automáticamente en la v5.

#### Seguimiento de recursos y tareas de larga duración
Cuando utilizas `sessionReplaySampleRate` en lugar de `replaySampleRate` o `premiumSampleRate` (ambos obsoletos), debes configurar los recursos y las tareas de larga duración explícitamente.

**Acción a realizar**: Para recopilar estos eventos, asegúrate de que `trackResources` y `trackLongTasks` están configurados como `true`.

#### Los nombres de los métodos de los recursos están en mayúsculas
Para evitar tener diferentes valores para el mismo nombre de método dependiendo del caso (POST en lugar de post), ahora los nombres de los métodos se envían siempre en mayúsculas.

**Acción a realizar**: Actualiza las consultas de monitor o dashboard para utilizar el campo `resource.method` con valores en mayúsculas.

#### Evento de acción `beforeSend`
La API `beforeSend` permite acceder a la información contextual de los eventos recopilados (consulta [Enriquecer y controlar datos RUM][23]).

Con la introducción de las señales de frustración, un evento de acción puede asociarse a varios eventos DOM.

Junto con esta actualización, se ha eliminado el atributo `context.event` en favor del atributo `context.events`.

**Acción a realizar**: Actualiza el código `beforeSend` para utilizar `context.events` en lugar de `context.event`.

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // accessing browser events related to the action event
    // before, single event: context.event
    // now, multiple events: context.events
  }
}
```

#### `beforeSend` en periodos de primer plano
El atributo `view.in_foreground_periods` se calcula directamente desde el backend, no es enviado por el SDK.

**Acción a realizar**: Elimina `view.in_foreground_periods` del código `beforeSend`. Si dependías de este atributo para un caso de uso específico, ponte en contacto con el [Servicio de asistencia][24] para obtener ayuda.

#### Entrada de rendimiento `beforeSend`
El atributo `performanceEntry` del contexto `beforeSend` se ha actualizado a partir de la representación JSON para incluir directamente el objeto de entrada de rendimiento.

Se ha eliminado el tipo `PerformanceEntryRepresentation` exportado en favor del tipo `PerformanceEntry` estándar.

**Acción a realizar**: En el código `beforeSend`, utiliza directamente el tipo `PerformanceEntry` en lugar del tipo `PerformanceEntryRepresentation`.

### Logs
#### Eliminar el prefijo de error de la consola
Se ha eliminado el prefijo "`console error:`" en los mensajes de logs. Esta información puede encontrarse en el atributo `origin`.

**Acción a realizar**: Actualiza las consultas de monitor o dashboard que utilizan el prefijo `"console error:"` para utilizar `@origin:console` en su lugar.

#### Eliminar `error.origin`

Desde la introducción del atributo `origin` en todos los logs, `error.origin` era redundante y se ha eliminado.

**Acción a realizar**: Actualiza las consultas de monitor o dashboard que utilizan `error.origin` para que utilicen `origin` en su lugar.

#### Desvincular el generador de logs principal
Cuando el SDK recopila errores en tiempo de ejecución, informes de red o logs de la consola, no añade el contexto específico al generador de logs principal (`DD_LOGS.logger`) y no utiliza el nivel o controlador definido para ese generador de logs.

**Acción a realizar**: Si dependías del nivel del generador de logs principal para excluir logs que no pertenecen al generador de logs, utiliza los parámetros de inicialización exclusivos en su lugar.

**Acción a realizar**: Si dependías del contexto del generador de logs principal para añadir contexto a los logs que no pertenecen al generador de logs, utiliza el contexto global en su lugar.

## De v3 a v4

Con la versión v4 se han introducido varios cambios de última hora en el SDK del Navegador RUM y de logs.

### Cambios

#### URL de admisión

Las URL a las que se envían los datos del SDK del Navegador RUM han cambiado. Asegúrate de que tu [política de seguridad de contenidos está actualizada][1].

#### Compatibilidad mínima de la versión de Typescript

La v4 del SDK del Navegador RUM no es compatible con versiones de TypeScript anteriores a v3.8.2. Si utilizas TypeScript, asegúrate de tener al menos la v3.8.2.

#### Sintaxis de etiquetas (tags)

Los parámetros de inicialización `version`, `env` y `service` se envían como etiquetas a Datadog. El SDK del Navegador RUM los desinfecta ligeramente para asegurarse de que no generan múltiples etiquetas e imprime una advertencia si esos valores no cumplen con la sintaxis de los requisitos de etiquetado.

#### Tipos de parámetros de inicialización más estrictos

Los tipos TypeScript que representan parámetros de inicialización son más estrictos y pueden rechazar parámetros no compatibles que eran previamente aceptados. Si obtienes errores de comprobación de tipos, asegúrate de que estás proporcionando parámetros de inicialización compatibles.

#### Prioridad de las opciones de privacidad

Cuando se especifican varias opciones de privacidad en el mismo elemento, Datadog aplica la opción más restrictiva para evitar la filtración inesperada de datos confidenciales. Por ejemplo, si se especifican las clases `dd-privacy-allow` y `dd-privacy-hidden` en el mismo elemento, éste se oculta en lugar de permitirse.

#### Cálculo de los nombres de las acciones

Al calcular los nombres de las acciones, el SDK del Navegador RUM elimina el texto de los elementos secundarios con el atributo `data-dd-action-name` del texto interno.

Por ejemplo, para el siguiente elemento `container`, donde anteriormente el nombre de acción calculado era `Container sensitive data`, en v4, el nombre de acción calculado es `Container`:
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### Eliminaciones

#### Campo XHR `_datadog_xhr` 

El SDK del Navegador RUM utilizaba anteriormente una propiedad `_datadog_xhr` en los objetos `XMLHttpRequest` que representaba su estado interno. Esta propiedad se ha eliminado sin reemplazo, ya que no estaba destinada a ser utilizada externamente.

#### Parámetro de inicialización `proxyHost`

Se ha eliminado el parámetro de inicialización `proxyHost`. Utiliza en su lugar el parámetro de inicialización `proxyUrl`.

#### Compatibilidad de opciones de privacidad

Las opciones de privacidad `input-ignored` y `input-masked` ya no son válidas. En su lugar, utiliza la opción de privacidad `mask-user-input`.

Específicamente, sustituye:

* los nombres de clases `dd-privacy-input-ignored` y `dd-privacy-input-masked` por `dd-privacy-mask-user-input`
* los valores de atributos `dd-privacy="input-masked"` y `dd-privacy="input-ignored"` por `dd-privacy="mask-user-input"`

## De v2 a v3

La versión v3 del SDK del Navegador introduce [Session Replay][2]. Con esta importante actualización de la versión, se han introducido varios cambios de última hora en los SDK del Navegador RUM y de logs.

### Cambios
#### Errores RUM

El SDK del Navegador RUM ya no emite [errores RUM][3] para las llamadas XHR y Fetch fallidas. Estas solicitudes de red fallidas se siguen recopilando como [recursos RUM][4], que contienen el atributo de código de estado.

Para seguir viendo las solicitudes de red fallidas como errores RUM, Datadog recomienda interceptar el recurso con la [API beforeSend][5], comprobar la propiedad `status_code` y enviar manualmente un error con la [API addError][6].

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### Atributo de fuente de error RUM

El SDK del Navegador RUM ya no permite especificar el origen de un error recopilado utilizando la [API addError][6]. Todos los errores recopilados con esta API tienen su atributo fuente configurado como `custom`. La [API addError][6] acepta un objeto de contexto como segundo parámetro, que debe utilizarse para mostrar contexto adicional sobre el error.

### Eliminaciones
#### API RUM

| API antigua       | Nueva API   |
| ------------- | --------- |
| addUserAction | addAction |

#### Opciones de inicialización

| Opciones antiguas        | Nuevas opciones |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| centro de datos         | sitio        |
| resourceSampleRate | NINGUNO        |

#### Tipos de TypeScript

| Tipos antiguos                    | Nuevos tipos                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/faq/content_security_policy
[2]: /es/real_user_monitoring/session_replay
[3]: /es/real_user_monitoring/browser/collecting_browser_errors/
[4]: /es/real_user_monitoring/browser/monitoring_resource_performance/
[5]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: /es/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[7]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#clear-user-session-property
[8]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context-property
[9]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#remove-global-context-property
[10]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#read-global-context
[11]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#replace-global-context
[12]: /es/api/latest/rum/
[13]: /es/api/latest/rum/
[14]: /es/api/latest/rum/
[15]: /es/api/latest/rum/
[16]: /es/api/latest/rum/
[17]: /es/api/latest/rum/
[18]: /es/integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[20]: /es/real_user_monitoring/session_replay/browser/privacy_options/#configuration
[21]: /es/real_user_monitoring/guide/sampling-browser-plans/#setup
[22]: /es/real_user_monitoring/session_replay/browser/#usage
[23]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[24]: /es/help/
[26]: /es/real_user_monitoring/browser/
[25]: /es/real_user_monitoring/correlate_with_other_telemetry/apm#opentelemetry-support
[27]: /es/real_user_monitoring/guide/proxy-rum-data
[28]: /es/real_user_monitoring/browser/setup/#initialization-parameters
[29]: /es/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#:~:text=configure%20the%20traceContextInjection
[30]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[31]: https://webpack.js.org/guides/code-splitting/#dynamic-imports
[32]: https://esbuild.github.io/api/#splitting
[33]: https://rollupjs.org/tutorial/#code-splitting
[34]: https://parceljs.org/features/code-splitting
[35]: https://developer.chrome.com/docs/web-platform/long-animation-frames#long-frames-api