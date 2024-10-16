---
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

Sigue esta guía para migrar entre las principales versiones de los SDKs de navegador RUM y los SDKs de logs de navegador. Consulta [la documentación del SDK][26] para obtener información detallada sobre sus características y capacidades.

## De v4 a v5

V5 introduce los siguientes cambios y más:

- Nuevas configuraciones y valores predeterminados de privacidad para Session Replay
- Recopilación automática de señales de frustración
- Métricas de rendimiento actualizadas
- APIs y parámetros del SDK actualizados

Ten en cuenta los siguientes cambios más recientes al actualizar tu SDK. Los cambios están agrupados por área de impacto.

### General

#### Parámetros de inicialización del SDK

**Acción a realizar**: sustituir los parámetros obsoletos por los nuevos parámetros equivalentes en v5. Los antiguos nombres de parámetros ya no están disponibles en v5.

| Nombre de parámetro obsoleto (v4 o anterior) | Nuevo nombre del parámetro (v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | proxy |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### APIs públicas

**Acción a realizar**: sustituir las APIs obsoletas por las nuevas APIs equivalentes. Las APIs antiguas ya no están disponibles en v5.

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

#### Dominios de entrada
La V5 envía datos a dominios de entrada distintos de los de las versiones anteriores.

**Acción a realizar**: actualiza cualquier entrada `connect-src` de la [Política de seguridad de contenido (CSP)][18]  para utilizar el nuevo dominio.

| Sitio de Datadog | Dominio |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |

#### Eventos de confianza
Para evitar recopilar datos incorrectos o ilegítimos, v5 solo escucha eventos generados por acciones del usuario, ignorando eventos creados por scripts. Consulta [eventos de confianza][19] para más detalles.

**Acción a realizar**: si dependes de algún evento programático y deseas que el SDK lo tenga en cuenta, añádele el atributo `__ddIsTrusted`, como se indica a continuación:

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**Acción a realizar**: si dependes en gran medida de eventos programáticos, por ejemplo, en un entorno de test de interfaz de usuario automatizado, puedes permitir todos los eventos no fiables configurando `allowUntrustedEvents: true`.

#### Tipo de devolución `beforeSend`
Las funciones de devolución de llamadas `beforeSend` deben devolver un valor booleano:

```javascript
beforeSend(event: any, context?: any) => boolean
```

La implementación no ha cambiado. Si no se devuelve ningún valor, no se descarta el evento.

**Acción a realizar**: asegúrate de que `beforeSend` devuelve `true` para mantener el evento y `false` para descartarlo. Esto resuelve los errores de compilación de TypeScript relacionados.

### Session Replay

#### Enmascaramiento de Session Replay

El ajuste predeterminado de enmascaramiento de Session Replay `defaultPrivacyLevel` ha cambiado de `mask-user-input` a `mask`. Esto oculta todos los datos de las grabaciones de Session Replay por defecto, haciendo que las grabaciones sean menos sensibles a la vista. Para más información, consulta [Opciones de privacidad del navegador de Session Replay][20].

**Acción a realizar**: si deseas ver más datos sin enmascarar en Session Replay, como contenido HTML no confidencial o texto introducido por el usuario, configura `defaultPrivacyLevel` como `mask-user-input` o `allow`.

#### Grabación automática de sesiones muestreadas para Session Replay
Las sesiones que se muestrean para Session Replay con [`sessionReplaySampleRate`][21] se graban automáticamente al inicio de la sesión. Esto significa que no tienes que llamar al método [`startSessionReplayRecording()`][22] para capturar una grabación. En otras palabras, no se perderá accidentalmente ninguna grabación.

**Acción a realizar**: si quieres seguir utilizando el comportamiento de grabación antiguo y personalizar cuándo se inicia la grabación, configura `startSessionReplayRecordingManually` en `true`.

#### Solo se paga por Session Replay cuando la sesión captura una grabación
En versiones anteriores del SDK, las sesiones se determinan como sesiones de Session Replay a través del mecanismo de muestreo. En v5, las sesiones solo se cuentan como sesiones de Session Replay si se captura una grabación durante la sesión. Esto facilita el seguimiento del uso de Session Replay.

**No es necesaria ninguna acción**: este comportamiento entra en vigor automáticamente en v5.

#### Frecuencia de muestreo predeterminada de Session Replay
En v5, el valor predeterminado de `sessionReplaySampleRate` es 0 en lugar de 100. Si no incluyes una frecuencia de muestreo, no se registra ninguna repetición.

**Acción a realizar**: para utilizar Session Replay, establece una frecuencia de muestreo explícitamente con `sessionReplaySampleRate: 100` (u otra frecuencia de muestreo).

### RUM

### Integración de APM

Para fomentar la compatibilidad y el uso de OpenTelemetry, se han modificado los tipos de propagadores por defecto para incluir `tracecontext` además de `datadog`.

**Acción a realizar**: si aún no estás especificando el propagador deseado en el parámetro de inicialización `allowedTracingUrls`, configura tus encabezados de permisos de control y acceso del servidor para aceptar también el encabezado `traceparent`. Para más información, consulta [Conectar RUM y trazas][25].

### Campo Plan de sesión

En relación con los cambios en Session Replay, el campo `session.plan` solo está disponible para los eventos de sesión.

**Acción a realizar**: actualiza cualquier consulta de monitor o dashboard que hayas guardado para excluir el campo `session.plan` para eventos que no sean una sesión.

#### Las señales de frustración se recopilan automáticamente
Solo tienes que configurar `trackUserInteractions: true` para recopilar todas las interacciones del usuario, incluidas las señales de frustración. Ya no es necesario configurar el parámetro `trackFrustrations` por separado.

**Acción a realizar**: para rastrear las señales de frustración, configura `trackUserInteractions: true`. El parámetro `trackFrustrations` puede eliminarse.

#### La duración de los recursos se omite en las páginas congeladas
La recopilación de recursos omite las duraciones de los recursos que se prolongaron debido a que la página pasó a segundo plano, por ejemplo, cuando el usuario hace clic en otra pestaña mientras se carga la página.

**No es necesaria ninguna acción**: este comportamiento entra en vigor automáticamente en v5.

#### Recursos y seguimiento de tareas largas
Cuando se utiliza `sessionReplaySampleRate` en lugar de `replaySampleRate` o `premiumSampleRate` (ambos obsoletos), debes configurar recursos y tareas largas explícitamente.

**Acción a realizar**: para recopilar estos eventos, asegúrate de que `trackResources` y `trackLongTasks` están configurados en `true`.

#### Los nombres de los métodos de los recursos están en mayúsculas
Con el fin de evitar tener diferentes valores para el mismo nombre de método según el caso (POST vs post), los nombres de los métodos se envían ahora consistentemente en mayúsculas.

**Acción a realizar**: actualiza las consultas de monitor o dashboard para utilizar el campo `resource.method` con valores en mayúsculas.

#### Evento de acción `beforeSend`
La API `beforeSend` permite acceder a información contextual de los eventos recopilados (consulta [Mejorar y controlar los datos RUM][23]).

Con la introducción de las señales de frustración, un evento de acción puede asociarse a varios eventos DOM.

Junto con esta actualización, se ha eliminado el atributo `context.event` en favor del atributo `context.events`.

**Acción a realizar**: actualizar el código `beforeSend` para utilizar `context.events` en lugar de `context.event`.

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // acceso a eventos de navegador relacionados con el evento
    // antes, evento único: context.event
    // ahora, eventos múltiples: context.events
  }
}
```

#### `beforeSend` en periodos de primer plano
El atributo `view.in_foreground_periods` se calcula directamente desde el backend, no es enviado por el SDK.

**Acción a realizar**: elimina `view.in_foreground_periods` del código `beforeSend`. Si dependías de este atributo para un caso de uso específico, ponte en contacto con [Soporte][24] para obtener ayuda.

#### Entrada de rendimiento `beforeSend`
El atributo `performanceEntry` del contexto `beforeSend` se ha actualizado a partir de la representación JSON para incluir directamente el objeto de entrada de rendimiento.

Se ha eliminado el tipo exportado `PerformanceEntryRepresentation` en favor del tipo estándar `PerformanceEntry`.

**Acción a realizar**: en el código `beforeSend`, utiliza directamente el tipo `PerformanceEntry` en lugar del tipo `PerformanceEntryRepresentation`.

### Logs
#### Eliminar el prefijo de error de la consola
Se ha suprimido el prefijo "`console error:`" en los mensajes de log. Esta información puede encontrarse en el atributo `origin`.

**Acción a realizar**: actualiza las consultas de monitor o dashboard que utilizan el prefijo `"console error:"` para utilizar `@origin:console` en su lugar.

#### Eliminar `error.origin`

Desde la introducción del atributo `origin` en todos los logs, `error.origin` era redundante y se ha suprimido.

**Acción a realizar**: actualiza las consultas de monitor o dashboard que utilicen `error.origin` para que utilicen `origin` en su lugar.

#### Desacoplar el registrador principal
Cuando el SDK recopila errores en tiempo de ejecución o logs de red, informe o consola, no añade el contexto específico al registrador principal (`DD_LOGS.logger`), y no utiliza el nivel o manejador establecido para ese registrador.

**Acción a realizar**: si confiaste en el nivel principal del registrador para excluir los logs de no registrador, utiliza los parámetros dedicados de la inicialización en su lugar.

**Acción a realizar**: si confiaste en el contexto del registrador principal para añadir contexto a los logs de no registrador, utiliza el contexto global en su lugar.

## De v3 a v4

Con la versión v4 se han introducido varios cambios de última hora en el SDK del navegador RUM y logs.

### Cambios

#### URLs de entrada

Las URLs a las que se envían los datos del SDK del navegador RUM han cambiado. Asegúrate de que tu [Política de Seguridad de contenido está actualizada][1].

#### Compatibilidad mínima de la versión Typescript

El SDK de navegador RUM v4 no es compatible con TypeScript anterior a v3.8.2. Si utilizas TypeScript, asegúrate de que la versión es al menos v3.8.2.

#### Sintaxis de etiquetas

Los parámetros de inicialización `version`, `env` y `service` se envían como etiquetas (tags) a Datadog. El SDK del navegador RUM los depura levemente para asegurarse de que no generan múltiples etiquetas, e imprime una advertencia si esos valores no cumplen con la sintaxis de los requisitos de etiqueta.

#### Tipos de parámetros de inicialización más estrictos

Los tipos de TypeScript que representan parámetros de inicialización son más estrictos y pueden rechazar parámetros no compatibles previamente aceptados. Si obtienes errores de comprobación de tipos, asegúrate de que estás proporcionando parámetros de inicialización compatibles.

#### Prioridad de las opciones de privacidad

Cuando se especifican varias opciones de privacidad en el mismo elemento, Datadog aplica la opción más restrictiva para evitar la filtración inesperada de datos sensibles. Por ejemplo, si se especifican las clases `dd-privacy-allow` y `dd-privacy-hidden` en el mismo elemento, se oculta en lugar de permitirse.

#### Cálculo de nombres de acciones

Al calcular los nombres de las acciones, el SDK del navegador RUM elimina el texto de los elementos secundarios con el atributo `data-dd-action-name` del texto interior.

Por ejemplo, para el siguiente elemento `container`, donde anteriormente el nombre de acción calculado sería `Container sensitive data`, en v4, el nombre de acción calculado es `Container`:
```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### Eliminaciones

#### Campo `_datadog_xhr` de XHR

El SDK del navegador RUM utilizaba anteriormente una propiedad `_datadog_xhr` en los objetos `XMLHttpRequest` que representaba su estado interno. Esta propiedad se ha eliminado sin reemplazo, ya que no estaba destinada a ser utilizada externamente.

#### Parámetro de inicialización `proxyHost`

Se ha eliminado el parámetro de inicialización `proxyHost`. Utiliza en su lugar el parámetro de inicialización `proxyUrl`.

#### Compatibilidad de opciones de privacidad

Las opciones de privacidad `input-ignored` y `input-masked` ya no son válidas. En su lugar, utiliza la opción de privacidad `mask-user-input`.

Específicamente, reemplaza:

* Los nombres de clase `dd-privacy-input-ignored` y `dd-privacy-input-masked` con `dd-privacy-mask-user-input`
* Los valores de atributo `dd-privacy="input-masked"` y `dd-privacy="input-ignored"` con `dd-privacy="mask-user-input"`

## De v2 a v3

El SDK del navegador v3 introduce [Session Replay][2]. Con esta importante actualización de la versión, se han introducido varios cambios de última hora en los SDK de navegador RUM y logs.

### Cambios
#### Errores RUM

El SDK del navegador RUM ya no emite [errores RUM][3] para las llamadas XHR y Fetch fallidas. Estas solicitudes fallidas de red se siguen recopilando como [recursos RUM][4], que contienen el atributo de código de estado.

Para seguir viendo las solicitudes de red fallidas como errores RUM, Datadog recomienda interceptar el recurso con la [API beforeSend][5], comprobar la propiedad `status_code` y enviar manualmente un error con la [API addError][6].

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### Atributo de fuente de error RUM

El SDK del navegador RUM ya no permite especificar la fuente de un error recopilado con la [API addError][6]. Todos los errores recopilados con esta API tienen su atributo de fuente establecido en `custom`. La [API addError][6] acepta un objeto de contexto como segundo parámetro, que debe utilizarse para pasar contexto adicional sobre el error.

### Eliminaciones
#### API RUM

| API antigua       | Nueva API   |
| ------------- | --------- |
| addUserAction | addAction |

#### Opciones de inicialización

| Opciones antiguas        | Nuevas opciones |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| datacenter         | site        |
| resourceSampleRate | NONE        |

#### Tipos TypeScript

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
[25]: /es/real_user_monitoring/platform/connect_rum_and_traces#opentelemetry-support