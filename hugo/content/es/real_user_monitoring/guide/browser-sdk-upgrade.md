---
description: Guía de actualización para migrar entre versiones principales del SDK
  de RUM para navegador con cambios importantes, nuevas funciones y actualizaciones
  de compatibilidad.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualice sus datos de RUM en el explorador
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: Blog
  text: Utilice Datadog Session Replay para visualizar los recorridos de usuario en
    tiempo real
title: Actualice el SDK de RUM para navegador
---
## Descripción general {#overview}

Siga esta guía para migrar entre versiones principales de los SDK de RUM para navegador y Logs para navegador. Consulte [la documentación del SDK][26] para obtener detalles sobre sus funciones y capacidades.

## De la v6 a la v7 {#from-v6-to-v7}

El SDK v7 mejora los valores predeterminados de privacidad, elimina opciones obsoletas y moderniza los componentes internos del SDK. La mayoría de los cambios requieren actualizaciones de configuración.

Tenga en cuenta los siguientes cambios importantes a medida que actualiza su SDK. Los cambios se agrupan por área de impacto.

<div class="alert alert-tip"> Si utiliza un asistente de programación con IA que admita habilidades de agente, puede aplicar la <a href="https://github.com/datadog-labs/agent-skills/blob/main/dd-browser-sdk/upgrade-v7/SKILL.md"><code>upgrade-browser-sdk-v7</code> habilidad</a> para automatizar la mayoría de los pasos de migración a continuación. </div>

### Core {#core}

#### Reescritura del administrador de sesiones {#session-manager-rewrite}

El sistema que rastrea las sesiones se ha reescrito para mejorar la confiabilidad de los datos y reducir las discrepancias en la facturación. Dependiendo de su configuración, es posible que note cambios en los recuentos de sesiones.

#### Decisiones de muestreo deterministas {#deterministic-sampling-decisions}

Anteriormente, la decisión de muestreo se tomaba una vez al crear la sesión y se mantenía. En la v7, se calcula bajo demanda a partir del ID de sesión y la tasa de muestreo, lo que la hace consistente independientemente de qué página inicialice el SDK. Si utiliza diferentes tasas de muestreo en las páginas, esas tasas se aplican de manera consistente.

<div class="alert alert-warning">La actualización a la v7 introduce el muestreo determinista para trazas distribuidas basadas en el ID de sesión de RUM. Como resultado, en RUM without Limits&trade;, la probabilidad de indexar sesiones que contuvieron trazas asociadas aumenta significativamente. Se conservan más trazas mediante sus filtros de retención entre productos existentes, incluso sin ningún cambio de configuración.<br><br>Si tiene filtros de retención entre productos (por ejemplo, trazas de APM vinculados a RUM), es posible que vea un <strong>aumento en el volumen de tramos indexados</strong>, lo que podría generar <strong>costos más altos</strong>. Revise la configuración de su filtro de retención y el volumen de tramos estimado después de la actualización.</div>

#### Clave de almacenamiento de sesión renombrada {#session-store-key-renamed}

La clave de almacenamiento de sesión ha cambiado de `_dd_s` a `_dd_s_v2` porque el nuevo administrador de sesiones utiliza un formato de almacenamiento incompatible. Al actualizar, las sesiones existentes se migran automáticamente desde `_dd_s`.

**Nota**: Si revierte a la v6 después de actualizar, el SDK de la v6 inicia una nueva sesión porque no lee la clave `_dd_s_v2`. Si tiene políticas de CSP o de cookies que incluyen nombres de cookies específicos en la lista de permitidos, agregue `_dd_s_v2`.

#### Actualice la URL del bundle de CDN {#update-the-cdn-bundle-url}

Si carga el SDK desde la CDN de Datadog, actualice el segmento de versión de la URL del bundle de `v6` a `v7`. Esto se aplica a todos los bundles:

| Bundle   | URL                                                                     |
| -------- | ----------------------------------------------------------------------- |
| RUM      | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-rum.js`      |
| RUM Slim | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-rum-slim.js` |
| Logs     | `https://www.datadoghq-browser-agent.com/<SITE>/v7/datadog-logs.js`     |

Reemplace `<SITE>` con su sitio de Datadog (por ejemplo, `us1`, `us3`, `us5`, `eu1`, `ap1`, `ap2` o `uk1`). Consulte la [documentación de configuración][26] para obtener la URL de su sitio.

#### Los bundles de CDN utilizan importaciones dinámicas ESM {#cdn-bundles-use-esm-dynamic-imports}

Los bundles de CDN utilizan importaciones dinámicas ESM en lugar de CommonJS, lo que reduce la sobrecarga de webpack y el tamaño total del bundle. Si utiliza el snippet de CDN, agregue el atributo `crossorigin` a la etiqueta script:

```html
<script src="https://www.datadoghq-browser-agent.com/..." crossorigin="anonymous"></script>
```

Consulte la [documentación de configuración][26] para ver ejemplos completos de snippets.

#### Línea base de navegador ES2020 {#es2020-browser-baseline}

Se ha eliminado la compatibilidad con navegadores anteriores a ES2020 para eliminar los shims y polyfills de compatibilidad, lo que reduce el tamaño del paquete. Las versiones mínimas compatibles son Chrome 80+, Firefox 78+ y Safari 14+. Impacto estimado: ~0.048% menos de cobertura.

Para seguir siendo compatible con navegadores más antiguos, continúe utilizando Browser SDK v6 o anterior.

#### Opciones eliminadas {#removed-options}

| Opción obsoleta (v6 o anterior) | Reemplazo (v7)                                       |
| --------------------------------- | ------------------------------------------------------ |
| `betaEncodeCookieOptions`         | La codificación de cookies siempre está habilitada.                     |
| `allowFallbackToLocalStorage`     | Utilice `sessionPersistence: ['cookie', 'local-storage']`. |

### RUM {#rum}

#### `propagateTraceBaggage` habilitado de forma predeterminada {#propagatetracebaggage-enabled-by-default}

El `propagateTraceBaggage` [parámetro de inicialización][28] tiene como valor predeterminado `true` en la v7. La propagación de baggage habilita el muestreo basado en el seguimiento de las últimas líneas y permite que las trazas accedan al contexto del usuario y de la cuenta.

Si utiliza distributed tracing en solicitudes de origen cruzado, establezca `propagateTraceBaggage: false` o añada `baggage` a sus encabezados de respuesta `Access-Control-Allow-Headers`:

```
Access-Control-Allow-Headers: traceparent, tracestate, baggage
```

#### Nuevo valor predeterminado para `defaultPrivacyLevel` {#new-default-for-defaultprivacylevel}

`defaultPrivacyLevel` tiene como valor predeterminado `mask-user-input` en la v7 (anteriormente `mask`). Esto proporciona un valor predeterminado de privacidad que enmascara la entrada del usuario sin las restricciones del enmascaramiento completo. El nuevo valor predeterminado enmascara la entrada del usuario mientras se recopila otro contenido.

Para conservar el enmascaramiento completo, establezca explícitamente `defaultPrivacyLevel: "mask"`.

#### `enablePrivacyForActionName` habilitado de forma predeterminada {#enableprivacyforactionname-enabled-by-default}

`enablePrivacyForActionName` tiene como valor predeterminado `true` en la v7. Los nombres de las acciones de clic siguen la configuración `defaultPrivacyLevel` de forma predeterminada. Configure `enablePrivacyForActionName: false` para optar por no participar.

#### `startDurationVital` y el cambio de API `stopDurationVital` {#startdurationvital-and-stopdurationvital-api-change}

El objeto `DurationVitalReference` ha sido reemplazado por una opción de cadena `vitalKey`. Esto alinea la API con `startResource`/`stopResource` y `startAction`/`stopAction`, y con el SDK móvil. Todavía se admiten múltiples signos vitales simultáneos con el mismo nombre:

```js
// Before
const ref = datadogRum.startDurationVital('myVital')
datadogRum.stopDurationVital(ref)

// After
datadogRum.startDurationVital('myVital', { vitalKey: 'uniqueKey' })
datadogRum.stopDurationVital('myVital', { vitalKey: 'uniqueKey' })
```

#### Nuevo `session_renewal`tipo de carga de visualización {#new-session-renewal-view-loading-type}

Cuando una sesión expira y se renueva, la nueva visualización se crea con `@view.loading_type:session_renewal` en lugar de `route_change`. Actualice cualquier panel o monitor que filtre por `@view.loading_type` si también deben incluir visualizaciones de sesión renovada.

#### El recurso de documento utiliza `PerformanceNavigationTiming` {#document-resource-uses-performancenavigationtiming}

El evento inicial del recurso de documento utilizaba anteriormente una entrada de tiempo sintética. Utiliza directamente el `PerformanceNavigationTiming` nativo del navegador en la v7, lo que puede producir valores de `resource.duration` ligeramente diferentes para el recurso de documento. El `initiatorType` para el recurso de documento cambia de `initial_document` a `navigation`.

Si utiliza complementos o controladores de contexto de dominio que inspeccionan `performanceEntry` para recursos de documento, actualícelos para que esperen un `PerformanceNavigationTiming` en lugar de `PerformanceResourceTiming`.

#### Se eliminó el First Input Delay (FID) {#first-input-delay-fid-removed}

Google reemplazó FID con Interaction to Next Paint (INP) como una métrica Core Web Vital. FID se ha eliminado del SDK para reducir el tamaño del paquete. Utilice INP en su lugar.

#### API de complementos: `strategy` eliminado {#plugin-api-strategy-removed}

El campo `strategy` se ha eliminado de la API de complementos. Si utiliza `rum-react` u otras integraciones, actualícelas a la v7 junto con el SDK principal.

#### Cálculo mejorado del nombre de la acción {#improved-action-name-computation}

En la v7, el SDK utiliza una nueva estrategia para calcular los nombres de las acciones que considera la estructura del DOM para aplicar los niveles de privacidad de los elementos con mayor precisión y mejorar el manejo del contenido del shadow DOM. Los nombres de las acciones pueden cambiar ligeramente. Se ha eliminado la opción `betaTrackActionsInShadowDom`.

#### Las navegaciones BFCache siempre se rastrean {#bfcache-navigations-always-tracked}

Las restauraciones de Back/Forward Cache se rastrean como visualizaciones distintas con `@view.loading_type:bf_cache`, incluyendo el tiempo de carga preciso y los Core Web Vitals. Se ha eliminado la opción `trackBfCacheViews`.

#### Las solicitudes tempranas siempre se recopilan {#early-requests-always-collected}

Los recursos y las solicitudes que ocurrieron antes de que el SDK se inicializara se capturan automáticamente. Algunos de esos recursos iniciales pueden carecer de propiedades como el código de estado. Se ha eliminado la opción `trackEarlyRequests`.

#### Los nombres de archivos de fragmentos asíncronos tienen el prefijo `datadog` {#async-chunk-file-names-prefixed-with-datadog}

Los nombres de archivos de fragmentos asíncronos incluyen un prefijo `datadog` (por ejemplo, `datadog-rum-recorder.js`). Si tiene reglas de CSP o de almacenamiento en caché que coincidan con los nombres antiguos, actualícelas en consecuencia.

### Registros {#logs}

#### Logs requieren un administrador de sesiones {#logs-require-a-session-manager}

Los Logs siempre utilizan un administrador de sesiones, por lo que los eventos de Logs se asocian de manera consistente con un ID de sesión. Cuando no hay cookies ni almacenamiento local disponibles, el SDK no envía datos y registra una advertencia. Anteriormente, los Logs aún se iniciaban sin almacenamiento.

Para habilitar explícitamente las sesiones respaldadas por memoria, utilice `sessionPersistence: 'memory'`. En entornos de trabajo, esta alternativa es automática.

#### `forwardErrorsToLogs` y `forwardConsoleLogs` son {#forwarderrorstologs-and-forwardconsolelogs-are-independent} independientes

Anteriormente, habilitar `forwardErrorsToLogs` también reenviaba silenciosamente las llamadas `console.error`. En la v7, estas opciones son totalmente independientes. Usted tiene un control preciso sobre lo que se reenvía. `forwardErrorsToLogs` controla solo los errores no controlados.

Para preservar el comportamiento anterior, agregue `error` a su matriz `forwardConsoleLogs`:

```js
DD_LOGS.init({
  forwardConsoleLogs: ['error', 'warn'],
})
```

#### Los errores de red para solicitudes canceladas se descartan {#network-errors-for-canceled-requests-are-dropped}

Las solicitudes canceladas por la aplicación (fetch o XHR abortado) ya no generan un registro de red. Esto reduce el ruido en el seguimiento de errores.

#### Opciones eliminadas {#removed-options-1}

| Opción obsoleta (v6 o anterior) | Reemplazo (v7)                                                           |
| --------------------------------- | -------------------------------------------------------------------------- |
| `usePciIntake`                    | La ingesta estándar cumple con PCI. Actualice su [CSP][18] si es necesario. |

### Session Replay {#session-replay}

#### Nuevo formato de datos {#new-data-format}

En la v7, Session Replay utiliza un formato de datos nuevo y más compacto que reduce significativamente el uso de ancho de banda. Los datos de Session Replay no se exponen directamente a través de las API del SDK del navegador, por lo que no se requiere ninguna acción para adoptar este cambio.

## De la v5 a la v6 {#from-v5-to-v6}

La principal mejora que ofrece la v6 es la reducción del tamaño del paquete. Al eliminar la compatibilidad con IE11 y aprovechar la carga diferida, el tamaño del paquete RUM se ha reducido en un 10% y el paquete de Logs en casi un 9%.
Además, hemos cambiado algunos parámetros de inicialización predeterminados y nos hemos preparado para futuras mejoras.

Tenga en cuenta los siguientes cambios importantes a medida que actualiza su SDK.

### Cambios importantes {#breaking-changes}

#### Compatibilidad con navegadores {#browser-support}

Se ha discontinuado la compatibilidad con IE11 y otros navegadores más antiguos. Los navegadores ahora deben admitir al menos ES2018.
Para usar Datadog en navegadores más antiguos, puede seguir usando el SDK de navegador v5 o anterior.

#### Agregar encabezado tracestate al usar el propagador tracecontext {#add-tracestate-header-when-using-tracecontext-propagator}

El propagador `tracecontext` predeterminado ahora envía un nuevo encabezado `tracestate` con metadatos adicionales que permiten una mejor atribución de sus trazas. Si utiliza este propagador, debe permitir este nuevo encabezado para todos los puntos de conexión que generan trazas, además del encabezado `traceparent` existente:

```
Access-Control-Allow-Headers: traceparent, tracestate
```

#### Tipado estricto `site` de la opción {#strongly-type-site-option}

La `site` opción ahora tiene una definición de tipo más estricta. Si usa TypeScript, es posible que tenga un error si utiliza un valor no estándar. Recomendamos usar [proxy][27] para enviar datos de RUM a una URL no estándar.

#### El seguimiento de acciones, recursos y tareas largas ahora está habilitado de forma predeterminada {#tracking-actions-resources-and-longtask-are-now-enabled-by-default}

Las interacciones de usuario, los recursos y las tareas largas ahora se rastrean de forma predeterminada. Este cambio no afecta la facturación. Para optar por no participar, establezca los [parámetros de inicialización][28] `trackUserInteractions`, `trackResources` y `trackLongTasks` en `false`.

#### Recopilar marcos de animación largos como tareas largas {#collect-long-animation-frames-as-long-tasks}

En los navegadores compatibles, ahora se recopilan [marcos de animación largos][35] en lugar de tareas largas. El tipo de evento en el Explorador de RUM sigue siendo `long_task`, pero contendrán información sobre el marco de animación largo.

#### Fecha de vencimiento de cookies aumentada {#increased-cookies-expiration-date}

Para admitir el seguimiento de usuarios anónimos, la expiración de la cookie de sesión (`_dd_s`) se extiende a 1 año. Para optar por no participar, establezca los `trackAnonymousUser` [parámetros de inicialización][28] en `false`.

#### Se eliminó el parámetro de inicialización useCrossSiteSessionCookie {#removed-usecrosssitesessioncookie-initialization-parameter}

`useCrossSiteSessionCookie` quedó obsoleto y ahora no es compatible. Utilice los `usePartitionedCrossSiteSessionCookie` [parámetros de inicialización][28] en su lugar.

#### Carga diferida de Session Replay {#lazy-load-session-replay}

El módulo Session Replay ahora se carga de forma diferida mediante [importaciones dinámicas][30]. Esto carga el módulo solo para las sesiones muestreadas para Session Replay, lo que reduce el tamaño del paquete para las demás.

**Si utiliza el SDK a través de NPM**, asegúrese de que su empaquetador admita importaciones dinámicas. La mayoría de los empaquetadores modernos admiten esta función de forma predeterminada, pero algunos pueden requerir cambios en la configuración. Consulte la documentación de su empaquetador para obtener orientación: [Webpack][31], [Esbuild][32], [Rollup][33], [Parcel][34].

**Si utiliza el SDK a través de una CDN**, no hay cambios importantes. Sin embargo, tenga en cuenta que además de la carga del script principal (por ejemplo, 
`datadog-rum.js`), el SDK cargará dinámicamente un fragmento adicional cuando sea necesario (por ejemplo, 
`recorder-d7628536637b074ddc3b-datadog-rum.js`).

#### No inyectar contexto de traza para trazas no muestreadas {#do-not-inject-trace-context-for-non-sampled-traces}

El valor predeterminado para el `traceContextInjection` parámetro de inicialización se ha actualizado a `sampled` para garantizar que las decisiones de muestreo de los servicios de backend se apliquen cuando las trazas no se muestrean en el SDK del navegador. Consulte la [documentación de Conectar RUM y trazas][29] para obtener más información.

**Nota**: Si utiliza un `traceSampleRate` del 100% (predeterminado), este cambio no tiene ningún impacto para usted.



### Futuros cambios importantes {#future-breaking-changes}

#### Habilitación de la compresión para las solicitudes de ingesta de Datadog {#enabling-compression-for-datadog-intake-requests}

La compresión para las solicitudes de ingesta de Datadog se habilitará de forma predeterminada en una futura versión principal.
Datadog recomienda que opte por la compresión ahora utilizando el `compressIntakeRequests` [parámetro de inicialización][28].
Dado que la compresión se realiza en un hilo de trabajo (Worker thread), es necesario configurar la Política de Seguridad de Contenido (CSP). Consulte las [directrices de CSP][18] para obtener más información.

## De la v4 a la v5 {#from-v4-to-v5}

La v5 introduce los siguientes cambios y más:

- Nuevas configuraciones y valores predeterminados de privacidad para Session Replay
- Recopilación automática de señales de frustración
- Métricas de rendimiento actualizadas
- Parámetros y API del SDK actualizados

Tenga en cuenta los siguientes cambios importantes a medida que actualiza su SDK. Los cambios se agrupan por área de impacto.

### General {#general}

#### Parámetros de inicialización del SDK {#sdk-initialization-parameters}

**Acción a realizar**: Reemplace los parámetros obsoletos con los nuevos parámetros equivalentes en la v5. Los nombres de los parámetros antiguos ya no están disponibles en la v5.

| Nombre del parámetro obsoleto (v4 o anterior) | Nombre del nuevo parámetro (v5) |
|-------------------------------------------|-------------------------|
| proxyUrl | proxy |
| sampleRate | sessionSampleRate |
| allowedTracingOrigins | allowedTracingUrls |
| tracingSampleRate | traceSampleRate |
| trackInteractions | trackUserInteractions |
| premiumSampleRate | sessionReplaySampleRate |
| replaySampleRate | sessionReplaySampleRate |

#### APIs públicas {#public-apis}

**Acción a realizar**: Reemplace las APIs obsoletas con las nuevas APIs equivalentes. Las APIs antiguas ya no están disponibles en la v5.

| Nombre del parámetro obsoleto (v4 o anterior) | Nombre del nuevo parámetro (v5) |
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

#### Dominios de ingesta {#intake-domains}
V5 envía datos a dominios de ingesta diferentes a los de versiones anteriores.

**Acción a realizar**: Actualice cualquier entrada de [Content Security Policy (CSP)][18] `connect-src` para usar el nuevo dominio.

| Sitio de Datadog | Dominio |
|--------------|--------|
| US1 | `connect-src https://browser-intake-datadoghq.com` |
| US3 | `connect-src https://browser-intake-us3-datadoghq.com` |
| US5 | `connect-src https://browser-intake-us5-datadoghq.com` |
| EU1 | `connect-src https://browser-intake-datadoghq.eu` |
| US1-FED | `connect-src https://browser-intake-ddog-gov.com` |
| US2-FED | `connect-src https://browser-intake-us2-ddog-gov.com` |
| AP1 | `connect-src https://browser-intake-ap1-datadoghq.com` |
| UK1 | `connect-src https://browser-intake-uk1-datadoghq.com` |

#### Eventos confiables {#trusted-events}
Para evitar la recopilación de datos incorrectos o ilegítimos, v5 solo escucha los eventos generados por acciones del usuario, ignorando los eventos creados por scripts. Consulte [eventos confiables][19] para obtener más detalles.

**Acción a realizar**: Si depende de algún evento programático y desea que el SDK los tome en cuenta, agregue el atributo `__ddIsTrusted` a ellos, como se muestra a continuación:

```javascript
const click = new Event('click')
click.__ddIsTrusted = true
document.dispatchEvent(click)
```

**Acción a realizar**: Si depende en gran medida de eventos programáticos, como en un entorno de prueba de interfaz de usuario automatizado, por ejemplo, puede permitir todos los eventos no confiables configurando `allowUntrustedEvents: true`.

#### `beforeSend` tipo de retorno {#beforesend-return-type}
`beforeSend` las funciones de devolución de llamada deben devolver un valor booleano:

```javascript
beforeSend(event: any, context?: any) => boolean
```

La implementación no ha cambiado. Si no se devuelve ningún valor, el evento no se descarta.

**Acción a realizar**: Asegúrese de que `beforeSend` devuelva `true` para mantener el evento y `false` para descartarlo. Esto resuelve errores de compilación de TypeScript relacionados.

### Session Replay {#session-replay-1}

#### Enmascaramiento de Session Replay {#session-replay-masking}

La configuración predeterminada de enmascaramiento de Session Replay `defaultPrivacyLevel` ha cambiado de `mask-user-input` a `mask`. Esto oculta todos los datos en las grabaciones de Session Replay de forma predeterminada, lo que hace que las grabaciones sean menos sensibles al verlas. Para obtener más información, consulte [Session Replay Browser Privacy Options][20].

**Acción a realizar**: Si desea ver más datos sin enmascarar en Session Replay, como contenido HTML no sensible o texto ingresado por el usuario, establezca `defaultPrivacyLevel` en `mask-user-input` o `allow`.

#### Grabación automática de sesiones muestreadas para Session Replay {#automatic-recording-of-sessions-sampled-for-session-replay}
Las sesiones que se muestrean para Session Replay mediante [`sessionReplaySampleRate`][21] se graban automáticamente al inicio de la sesión. Esto significa que no tiene que llamar al método [`startSessionReplayRecording()`][22] para capturar una grabación. En otras palabras, no perderá ninguna grabación accidentalmente.

**Acción a realizar**: Si desea seguir utilizando el comportamiento de grabación anterior y personalizar cuándo comienza su grabación, establezca `startSessionReplayRecordingManually` en `true`.

#### Solo pague por Session Replay cuando la sesión capture una grabación {#only-pay-for-session-replay-when-the-session-captures-a-recording}
En versiones anteriores del SDK, las sesiones se determinan como sesiones de Session Replay a través del mecanismo de muestreo. En la v5, las sesiones solo se cuentan como sesiones de Session Replay si se captura una grabación durante la sesión. Esto facilita el seguimiento de su uso de Session Replay.

**No se requiere ninguna acción**: Este comportamiento entra en vigor automáticamente en la v5.

#### Tasa de muestreo predeterminada de Session Replay {#default-session-replay-sampling-rate}
En la v5, el `sessionReplaySampleRate` predeterminado es 0 en lugar de 100. Si no incluye una tasa de muestreo, no se grabará ninguna reproducción.

**Acción a realizar**: Para usar Session Replay, establezca una tasa de muestreo explícitamente con `sessionReplaySampleRate: 100` (u otra tasa de muestreo).

### RUM {#rum-1}

### Integración de APM {#apm-integration}

Para promover el soporte y el uso de OpenTelemetry, los tipos de propagadores predeterminados se han cambiado para incluir `tracecontext` además de `datadog`.

**Acción a realizar**: Si aún no está especificando el propagador deseado en el parámetro de inicialización `allowedTracingUrls`, configure su servidor Access-Control-Allow-Headers para que también acepte el encabezado `traceparent`. Para obtener más información, consulte [Conectar RUM y trazas][25].

### Campo de plan de sesión {#session-plan-field}

En relación con los cambios de Session Replay, el campo `session.plan` solo está disponible para eventos de sesión.

**Acción a realizar**: Actualice cualquier consulta de monitor o panel que haya guardado para excluir el campo `session.plan` para eventos que no sean de sesión.

#### Las señales de frustración se recopilan automáticamente {#frustration-signals-are-collected-automatically}
Solo necesita configurar `trackUserInteractions: true` para recopilar todas las interacciones del usuario, incluidas las señales de frustración. Ya no necesita configurar el parámetro `trackFrustrations` por separado.

**Acción a realizar**: Para realizar un seguimiento de las señales de frustración, configure `trackUserInteractions: true`. El parámetro `trackFrustrations` se puede eliminar.

#### Se omiten las duraciones de los recursos para las páginas congeladas {#resource-durations-are-omitted-for-frozen-pages}
La recopilación de recursos omite las duraciones de los recursos que se extendieron debido a que la página pasó a segundo plano, por ejemplo, cuando el usuario hace clic en una pestaña separada mientras la página se está cargando.

**No se requiere ninguna acción**: Este comportamiento entra en vigor automáticamente en la v5.

#### Seguimiento de recursos y tareas largas {#resources-and-long-task-tracking}
Al usar `sessionReplaySampleRate` en lugar de `replaySampleRate` o `premiumSampleRate` (ambos obsoletos), debe configurar los recursos y las tareas largas explícitamente.

**Acción a realizar**: Para recopilar estos eventos, asegúrese de que `trackResources` y `trackLongTasks` estén configurados en `true`.

#### Los nombres de los métodos de recursos están en mayúsculas {#resource-method-names-are-in-uppercase}
Para evitar tener valores diferentes para el mismo nombre de método dependiendo de las mayúsculas o minúsculas (POST vs post), los nombres de los métodos ahora se envían de forma consistente en mayúsculas.

**Acción a realizar**: Actualice las consultas de seguimiento o del tablero para usar el campo `resource.method` con valores en mayúsculas.

#### `beforeSend` evento de acción {#beforesend-action-event}
La API `beforeSend` permite el acceso a información contextual de los eventos recopilados (consulte [Enriquecer y controlar datos de RUM][23]).

Con la introducción de señales de frustración, un evento de acción puede asociarse con varios eventos DOM.

Junto con esta actualización, el atributo `context.event` se ha eliminado en favor del atributo `context.events`.

**Acción a realizar**: Actualice el código `beforeSend` para usar `context.events` en lugar de `context.event`.

```javascript
beforeSend: (event, context) => {
  if (event.type === 'action' && event.action.type === 'click') {
    // accessing browser events related to the action event
    // before, single event: context.event
    // now, multiple events: context.events
  }
}
```

#### `beforeSend` en periodos de primer plano {#beforesend-in-foreground-periods}
El atributo `view.in_foreground_periods` se calcula directamente desde el backend, no lo envía el SDK.

**Acción a realizar**: Elimine `view.in_foreground_periods` del código `beforeSend`. Si dependía de este atributo para un caso de uso específico, comuníquese con [Soporte][24] para obtener ayuda.

#### `beforeSend` entrada de rendimiento {#beforesend-performance-entry}
El atributo de contexto `beforeSend` `performanceEntry` se ha actualizado de la representación JSON para incluir directamente el objeto de entrada de rendimiento.

El tipo exportado `PerformanceEntryRepresentation` se ha eliminado en favor del tipo estándar `PerformanceEntry`.

**Acción a realizar**: En el código `beforeSend`, utilice el tipo `PerformanceEntry` directamente en lugar del tipo `PerformanceEntryRepresentation`.

### Registros {#logs-1}
#### Eliminar prefijo de error de consola {#remove-console-error-prefix}
Se ha eliminado el prefijo \"`console error:`\" en los registros. Esta información se puede encontrar en el atributo `origin`.

**Acción a realizar**: Actualice las consultas de seguimiento o del tablero que usan el prefijo `"console error:"` para usar `@origin:console` en su lugar.

#### Elimine `error.origin` {#remove-errororigin}

Desde la introducción del atributo `origin` en todos los registros, `error.origin` era redundante y ha sido eliminado.

**Acción a realizar**: Actualice las consultas de seguimiento o del tablero que usan `error.origin` para usar `origin` en su lugar.

#### Desacoplar el logger principal {#decouple-main-logger}
Cuando el SDK recopila errores de tiempo de ejecución o registros de red, informes o consola, no añade el contexto específico del logger principal (`DD_LOGS.logger`), y no utiliza el nivel o controlador configurado para ese logger.

**Acción a realizar**: Si dependía del nivel del logger principal para excluir registros que no son del logger, utilice parámetros de inicialización dedicados en su lugar.

**Acción a realizar**: Si dependía del contexto del logger principal para agregar contexto a registros que no son del logger, utilice el contexto global en su lugar.

## De v3 a v4{#from-v3-to-v4}

Se realizaron varios cambios importantes en el SDK de RUM y Logs Browser con la versión v4.

### Cambios {#changes}

#### URLs de ingesta {#intake-urls}

Las URLs a donde se envían los datos del SDK de RUM Browser han cambiado. Asegúrese de que su [Content Security Policy esté actualizada][1].

#### Soporte mínimo de versión de TypeScript {#minimal-typescript-version-support}

El SDK de RUM Browser v4 no es compatible con versiones de TypeScript anteriores a la v3.8.2. Si usa TypeScript, asegúrese de que la versión sea al menos la v3.8.2.

#### Sintaxis de etiquetas {#tags-syntax}

Los parámetros de inicialización `version`, `env` y `service` se envían como etiquetas a Datadog. El SDK de RUM Browser los sanitiza ligeramente para asegurar que no generen múltiples etiquetas, y muestra una advertencia si esos valores no cumplen con la sintaxis de los requisitos de etiquetas.

#### Tipado más estricto de los parámetros de inicialización {#stricter-initialization-parameters-typing}

Los tipos de TypeScript que representan los parámetros de inicialización son más estrictos y pueden rechazar parámetros no admitidos que antes se aceptaban. Si obtiene errores de verificación de tipos, asegúrese de proporcionar parámetros de inicialización admitidos.

#### Precedencia de opciones de privacidad {#privacy-options-precedence}

Cuando se especifican varias opciones de privacidad en el mismo elemento, Datadog aplica la opción más restrictiva para evitar la filtración inesperada de datos confidenciales. Por ejemplo, si se especifican las clases `dd-privacy-allow` y `dd-privacy-hidden` en el mismo elemento, este se oculta en lugar de permitirse.

#### Cálculo de nombres de acción {#action-names-computation}

Al calcular los nombres de acción, el SDK de RUM Browser elimina el texto de los elementos secundarios con el atributo `data-dd-action-name` del texto interno.

Por ejemplo, para el siguiente elemento `container`, donde anteriormente el nombre de acción calculado sería `Container sensitive data`, en la v4, el nombre de acción calculado es `Container`:

```html
<div id="container">
  Container
  <div data-dd-action-name="sensitive">sensitive data</div>
</div>
```

### Eliminaciones {#removals}

#### XHR `_datadog_xhr` campo {#xhr-datadog-xhr-field}

El SDK de RUM Browser utilizaba anteriormente una propiedad `_datadog_xhr` en los objetos `XMLHttpRequest` que representaban su estado interno. Esta propiedad se ha eliminado sin reemplazo, ya que no estaba destinada a ser utilizada externamente.

#### `proxyHost` parámetro de inicialización {#proxyhost-initialization-parameter}

El `proxyHost`parámetro de inicialización ha sido eliminado. Utilice el `proxyUrl`parámetro de inicialización en su lugar.

#### Soporte para opciones de privacidad {#privacy-options-support}

Las opciones de privacidad `input-ignored` y `input-masked` ya no son válidas. En su lugar, utilice la `mask-user-input`opción de privacidad.

Específicamente, reemplace:

* `dd-privacy-input-ignored` y `dd-privacy-input-masked` nombres de clase con `dd-privacy-mask-user-input`
* `dd-privacy="input-masked"` y `dd-privacy="input-ignored"` valores de atributo con `dd-privacy="mask-user-input"`

## De la v2 a la v3 {#from-v2-to-v3}

El SDK de navegador v3 introduce [Session Replay][2]. Con esta actualización principal, se realizaron varios cambios incompatibles en el RUM Browser SDK y en el Logs Browser SDK.

### Cambios {#changes-1}
#### Errores de RUM {#rum-errors}

El SDK de RUM Browser ya no emite [errores de RUM][3] para llamadas XHR y Fetch fallidas. Estas solicitudes de red fallidas aún se recopilan como [recursos de RUM][4], los cuales contienen el atributo de código de estado.

Para seguir viendo las solicitudes de red fallidas como errores de RUM, Datadog recomienda interceptar el recurso con la [API beforeSend][5], verificar la propiedad `status_code` y enviar manualmente un error con la [API addError][6].

```javascript
beforeSend: (event) => {
    if (event.type === 'resource' && event.resource.status_code >= 500) {
        datadogRum.addError(`${event.resource.method} ${event.resource.url} ${event.resource.status_code}`); // "GET https://www.example.com/ 504"
    }
}
```

#### Atributo de fuente de error de RUM {#rum-error-source-attribute}

El SDK de RUM Browser ya no le permite especificar la fuente de un error recopilado con la [API addError][6]. Todos los errores recopilados con esta API tienen su atributo de fuente establecido en `custom`. La [API addError][6] acepta un objeto de contexto como su segundo parámetro, el cual debe usarse para pasar contexto adicional sobre el error.

### Eliminaciones {#removals-1}
#### API DE RUM {#rum-api}

| API antigua       | API nueva   |
| ------------- | --------- |
| addUserAction | addAction |

#### Opciones de inicialización {#initialization-options}

| Opciones antiguas        | Opciones nuevas |
| ------------------ | ----------- |
| publicApiKey       | clientToken |
| centro de datos         | sitio        |
| resourceSampleRate | NONE        |

#### Tipos de TypeScript {#typescript-types}

| Tipos antiguos                    | Tipos nuevos                    |
| ---------------------------- | ---------------------------- |
| RumUserConfiguration         | RumInitConfiguration         |
| RumRecorderUserConfiguration | RumRecorderInitConfiguration |
| LogsUserConfiguration        | LogsInitConfiguration        |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/faq/content_security_policy
[2]: /es/session_replay/
[3]: /es/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/
[4]: /es/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[5]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[6]: /es/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[7]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#clear-user-session-property
[8]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#add-global-context-property
[9]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#remove-global-context-property
[10]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#read-global-context
[11]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#replace-global-context
[12]: /es/api/latest/rum/
[13]: /es/api/latest/rum/
[14]: /es/api/latest/rum/
[15]: /es/api/latest/rum/
[16]: /es/api/latest/rum/
[17]: /es/api/latest/rum/
[18]: /es/integrations/content_security_policy_logs/?tab=firefox#use-csp-with-real-user-monitoring-and-session-replay
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted
[20]: /es/session_replay/privacy_options?platform=browser#configuration
[21]: /es/real_user_monitoring/guide/sampling-browser-plans/#setup
[22]: /es/session_replay/
[23]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[24]: /es/help/
[26]: /es/real_user_monitoring/application_monitoring/browser/
[25]: /es/real_user_monitoring/correlate_with_other_telemetry/apm#opentelemetry-support
[27]: /es/real_user_monitoring/guide/proxy-rum-data
[28]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html
[29]: /es/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum#:~:text=configure%20the%20traceContextInjection
[30]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import
[31]: https://webpack.js.org/guides/code-splitting/#dynamic-imports
[32]: https://esbuild.github.io/api/#splitting
[33]: https://rollupjs.org/tutorial/#code-splitting
[34]: https://parceljs.org/features/code-splitting
[35]: https://developer.chrome.com/docs/web-platform/long-animation-frames#long-frames-api