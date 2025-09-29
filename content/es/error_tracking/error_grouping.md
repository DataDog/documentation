---
aliases:
- /es/logs/error_tracking/custom_grouping
- /es/logs/error_tracking/default_grouping
- /es/tracing/error_tracking/custom_grouping
- /es/real_user_monitoring/error_tracking/custom_grouping
- /es/real_user_monitoring/error_tracking/default_grouping
- /es/error_tracking/default_grouping
description: Entiende cómo se agrupan los errores en problemas.
title: Agrupación de errores
---

## Agrupación predeterminada

Error Tracking agrupa de forma inteligente errores similares en incidentes. Esta agrupación se basa en las siguientes propiedades de los errores:

- `service`: el servicio donde se ha producido el error.
- `error.type` o `error.kind`: la clase del error.
- `error.message`: descripción del error.
- `error.stack`: el nombre de archivo y el nombre de función del marco de stack tecnológico más significativo.

El stack trace de errores es la ruta de código seguida por un error que está entre ser lanzado y capturado por la instrumentación de Datadog. Error Tracking evalúa el marco de stack tecnológico superior (la **localización** del error) y lo utiliza para agrupar el error.

Si alguna de las propiedades del marco de stack tecnológico difiere para dos errores dados, los dos errores se agrupan en incidentes diferentes. Por ejemplo, Error Tracking no agrupa incidentes en servicios o tipos de error. Error Tracking también ignora números, signos de puntuación y todo lo que se encuentre entre comillas o paréntesis: sólo se utilizan símbolos similares a palabras.

<div class="alert alert-info">
<strong>Consejo:</strong> Para asegurar una agrupación óptima, encierra las variables de los mensajes de error entre comillas o paréntesis.
</div>

**Nota**: Para mejorar la precisión de la agrupación, Error Tracking elimina las propiedades variables del marco de stack tecnológico, como versiones, ids, fechas, etc.


## Agrupación personalizada

Error Tracking agrupa de forma inteligente errores similares en incidentes con una estrategia predeterminada. Al utilizar _huellas personalizadas_, puedes obtener un control total sobre la decisión de agrupación y personalizar el comportamiento de agrupación para tus tramos de errores.

Puedes personalizar la agrupación proporcionando una `error.fingerprint` para el error. La huella digital se proporciona en un atributo o en una etiqueta, dependiendo de la fuente del error (consulta [Configuración](#setup) para más detalles). Aunque el valor de `error.fingerprint` no tiene ningún formato o requisito en particular, el contenido debe ser una cadena.

Si se proporciona `error.fingerprint`, el comportamiento de agrupación sigue estas reglas:

* La agrupación personalizada tiene prioridad sobre la estrategia por defecto.
* La agrupación personalizada puede aplicarse sólo a un subconjunto de tus errores y puede coexistir con la estrategia por defecto.
* El contenido de `error.fingerprint` se utiliza tal cual, sin ninguna modificación (aunque se convierte a un formato de huella digital normalizado).
* Los errores del mismo servicio y con el mismo atributo `error.fingerprint` se agrupan en el mismo incidente.
* Los errores con diferentes atributos `servicio` se agrupan en diferentes incidentes.

## Configuración

### APM
La agrupación personalizada sólo necesita un tramo de error y una etiqueta de tramo de cadena `error.fingerprint`.

Si aún no estás recopilando trazas de APM con Datadog, consulta la [documentación de APM][1] para configurar APM.

#### Ejemplo

Si ya estás enviando tramos de APM, añade una nueva etiqueta `error.fingerprint` a tu tramo de error.

He aquí un ejemplo en Python:

```python
with tracer.trace("throws.an.error") as span:
  span.set_tag('error.fingerprint', 'my-custom-grouping-material')
  raise Exception("Something went wrong")
```

La información de la excepción se captura y se adjunta a un tramo si hay uno activo cuando se produce la excepción.
En este caso, `my-custom-grouping-material` se utiliza para agrupar estos tramos de error en un único
incidente en Error Tracking.

### Gestión de Logs
La agrupación personalizada sólo necesita un log de error y un atributo de cadena `error.fingerprint`.

Si aún no estás recopilando logs con Datadog, consulta la [documentación de Log Management][2] para configurar logs.

Asegúrate de que la etiqueta `source` (que especifica el lenguaje) está correctamente configurada.

#### Ejemplo

Si ya estás recopilando logs en formato JSON, añade un nuevo atributo `error.fingerprint` a tu log de error.

He aquí un ejemplo en Python para un registrador con formato JSON:

```python
import logging
import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.error('Error processing request', extra={'error.fingerprint': 'my-custom-grouping-material'})
```

En este caso, `my-custom-grouping-material` se utiliza para agrupar estos logs de errores en un único
incidente en Error Tracking.

#### Ejemplo de móvil

En los SDKs móviles de Datadog, puedes añadir una huella digital de error personalizada cuando registras un error al añadir
un atributo predefinido a la llamada de log:

{{< tabs >}}

{{% tab "Android" %}}
Para utilizar la agrupación personalizada, necesita el Datadog Android SDK `2.7.0` o superior.

```kotlin
val errorFingerprint = "my-custom-grouping-material"
val attributes = mapOf(LogAttributes.ERROR_FINGERPRINT to errorFingerprint)
logger.e("My error message", error, attributes)
```
{{% /tab %}}

{{% tab "Flutter" %}}
Para utilizar la agrupación personalizada, necesita Datadog Flutter SDK `2.4.0` o superior.

```dart
final errorFingerprint = "my-custom-grouping-material";
logger.error(
  'My error message',
  errorStackTrace: st,
  attributes {
    DatadogAttributes.errorFingerprint: "my-custom-grouping-material",
  }
);
```
{{% /tab %}}

{{% tab "iOS" %}}
Para utilizar la agrupación personalizada, necesita el Datadog iOS SDK `2.8.1` o superior.

```swift
let errorFingerprint = "my-custom-grouping-material"
logger.error(
  "My error message",
  error: error,
  attributes: [
    Logs.Attributes.errorFingerprint: errorFingerprint
  ]
)
```
{{% /tab %}}

{{% tab "React Native" %}}
Para usar la agrupación personalizada, necesitas el SDK de Datadog RUM `2.4.2` o posterior.
```dart
DdLogs.error(
  'message',
  'my-error-type',
  'my-error-message',
  'my-stack-trace',
  { my: 'context' },
  'my-custom-fingerprint'
);
```
{{% /tab %}}
{{< /tabs >}}

O bien, puedes añadir o ajustar la huella digital en el asignador de logs:

{{< tabs >}}

{{% tab "Android" %}}
Para utilizar la agrupación personalizada, necesita el Datadog Android SDK `2.7.0` o superior.

```kotlin
val mapper = object : EventMapper<LogEvent> {
    override fun map(event: LogEvent): LogEvent {
        event.fingerprint = "my-custom-grouping-material"
        return event
    }
}
val logsConfiguration = LogsConfiguration.Builder()
    .setEventMapper(mapper)
    .build()
Logs.enable(logsConfiguration)
```
{{% /tab %}}

{{% tab "Flutter" %}}
Para utilizar la agrupación personalizada, necesita Datadog Flutter SDK `2.4.0` o superior.

```dart
LogEvent? mapLogEvent(LogEvent event) {
  event.error?.fingerprint = "my-custom-grouping-material";
  return event;
}

final loggingConfiguration = DatadogLoggingConfiguration(
  eventMapper: mapLogEvent,
);

final configuration = DatadogConfiguration(
    // ...
    loggingConfiguration: loggingConfiguration,
);
```
{{% /tab %}}

{{% tab "iOS" %}}
Para utilizar la agrupación personalizada, necesita el Datadog iOS SDK `2.8.1` o superior.

```swift
let logsConfiguration = Logs.Configuration(
  eventMapper: { log in
      var log = log
      log.error?.fingerprint = "my-custom-grouping-material"
      return log
  }
)
Logs.enable(
  with: logsConfiguration
)
```
{{% /tab %}}

{{% tab "React Native" %}}
Para utilizar la agrupación personalizada, necesitas el SDK de Datadog RUM `2.4.2` o posterior.

```dart
configuration.errorEventMapper = event => {
  event.fingerprint = 'my-custom-fingerprint'
  return event;
};
```
{{% /tab %}}

{{< /tabs >}}

### RUM

#### Ejemplo
Si aún no estás recopilando eventos de navegador de RUM con Datadog, consulta la [Documentación de configuración de la Monitorización del navegador RUM][3] o la [Documentación de configuración de la Monitorización de RUM Mobile y TV][4].

{{< tabs >}}

{{% tab "Android" %}}
Para utilizar la agrupación personalizada, necesita el Datadog Android SDK `2.7.0` o superior.

Para añadir una huella personalizada al notificar errores manualmente, puedes añadir un atributo predefinido al llamar a `addError`:

```kotlin
GlobalRumMonitor.get().addError(
  "My error message",
  RumErrorSource.SOURCE,
  exception,
  mapOf(
    RumAttributes.ERROR_CUSTOM_FINGERPRINT to "my-custom-grouping-fingerprint"
  )
)
```

También puedes utilizar `errorEventMapper`:

```kotlin
val rumConfiguration = RumConfiguration.Builder("rum-application-id")
  .setErrorEventMapper(object : EventMapper<ErrorEvent> {
    override fun map(event: ErrorEvent): ErrorEvent {
        event.error.fingerprint = "my-custom-grouping-fingerprint"
        return event
    }
  }).build()
RUM.enable(rumConfiguration)
```

{{% /tab %}}

{{% tab "Browser" %}}
Para utilizar la agrupación personalizada, necesitas el SDK del navegador de Datadog [v4.42.0 o posterior][2], un [error RUM del navegador][1] y un atributo de cadena adicional.

Si ya estás [recopilando errores del navegador][1], es posible añadir el atributo mediante:

* Añadir un atributo `dd_fingerprint` al objeto de error:

```javascript
import { datadogRum } from '@datadog/browser-rum';
// Send a custom error with context
const error = new Error('Something went wrong');
error.dd_fingerprint = 'my-custom-grouping-fingerprint'
datadogRum.addError(error);
```

* O bien, utilizando la devolución de llamada `beforeSend` con un atributo `error.fingerprint`:

```javascript
DD_RUM.init({
  ...
  beforeSend: () => {
    if (event.type === 'error') {
      event.error.fingerprint = 'my-custom-grouping-fingerprint'
    }
  },
})
```

En ambos casos, se utiliza `my-custom-grouping-material` para agrupar los errores del navegador RUM en un único incidente en Error Tracking.

[1]: /es/real_user_monitoring/browser/collecting_browser_errors/
[2]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0
{{% /tab %}}

{{% tab "Flutter" %}}
Para utilizar la agrupación personalizada, necesita Datadog Flutter SDK `2.4.0` o superior.

Para añadir una huella personalizada al notificar errores manualmente, puedes añadir un atributo predefinido al llamar a `addError`:

```dart
final rum = DatadogSdk.instance.rum;
rum?.addErrorInfo("My error message",
  RumErrorSource.source,
  attributes: {
    DatadogAttributes.errorFingerprint: 'my-custom-grouping-fingerprint',
  },
);
```

También puedes utilizar `errorEventMapper`:

```dart
RumErrorEvent? mapRumErrorEvent(RumErrorEvent event) {
  event.error.fingerprint = "my-custom-grouping-fingerprint";
  return event;
}

final rumConfiguration = DatadogRumConfiguration(
  // ...
  errorEventMapper: mapRumErrorEvent,
);

final configuration = DatadogConfiguration(
    // ...
    rumConfiguration: rumConfiguration,
);
```
{{% /tab %}}

{{% tab "iOS" %}}
Para utilizar la agrupación personalizada, necesita el Datadog iOS SDK `2.8.1` o superior.

Para añadir una huella personalizada al notificar errores manualmente, puedes añadir un atributo predefinido al llamar a `addError`:

```swift
RUMMonitor.shared().addError(
  message: "My error message",
  source: .source,
  attributes: [
    RUM.Attributes.errorFingerprint: "my-custom-grouping-fingerprint"
  ]
)
```

También puedes utilizar `errorEventMapper`:

```swift
var config = RUM.Configuration(applicationID: "rum-application-id")
config.errorEventMapper = { errorEvent in
  var errorEvent = errorEvent
  errorEvent.error.fingerprint = "my-custom-grouping-fingerprint"
  return errorEvent
}
RUM.enable(with: config)
```

{{% /tab %}}


{{% tab "React Native" %}}
Para utilizar la agrupación personalizada, necesitas el SDK de Datadog RUM `2.4.2` o posterior.

```dart
DdRum.addError(
  'message',       
  'my-source',       
  'my-stack-trace',  
  { my: 'context' },
  Date.now(), 
  'my-custom-fingerprint'        
);
```
También puedes utilizar `errorEventMapper`:

```dart
configuration.errorEventMapper = event => {
  event.fingerprint = 'my-custom-fingerprint'
  return event;
};
```

{{% /tab %}}
{{< /tabs >}}

[1]: /es/tracing/
[2]: /es/logs/log_collection/
[3]: /es/real_user_monitoring/browser/
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/#get-started