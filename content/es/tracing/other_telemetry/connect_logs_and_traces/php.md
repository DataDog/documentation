---
aliases:
- /es/tracing/connect_logs_and_traces/php
code_lang: php
code_lang_weight: 70
description: Conecta tus logs y trazas (traces) de PHP para correlacionarlos en Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentación
  text: Instrumenta tu aplicación de forma manual para crear trazas.
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Correlacionar automáticamente logs de solicitud con trazas
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilita la solución de problemas con una correlación entre productos.
kind: documentación
title: Correlación de logs y trazas de PHP
type: multi-code-lang
---

## Inyección automática

A partir de la versión `0.89.0`, el rastreador PHP inyecta automáticamente identificadores de correlación de traza en los logs de aplicación. Para activar la inyección automática, establece la variable de entorno `DD_logs_INJECTION` (configuración INI `datadog.logs_injection`) en `true`.

El rastreador PHP admite registradores compatibles con PSR-3, como [Monolog][4] o [Laminas Log][5].

<div class="alert alert-warning">
 <strong>Nota</strong>: Configura tu biblioteca de registro para que produzca logs en formato JSON de forma que:
  <ul>
    <li>No necesites <a href="/logs/log_configuration/parsing">reglas personalizadas de parseo</a>.</li>
    <li>Las stack traces se envuelven correctamente en el evento de log.</li>
  </ul>
</div>

### Configuración de la inyección en logs

Si aún no lo has hecho, configura el rastreador de PHP con `DD_ENV`, `DD_SERVICE` y `DD_VERSION`. Esto proporcionará la mejor experiencia para añadir `env`, `service` y `version` a tus logs (ve [etiquetado de servicios unificado][1] para obtener más detalles).

El rastreador PHP proporciona varias formas de configurar la inyección de identificadores de correlación de traza en tus logs:
- [Añadir los identificadores de correlación de traza al contexto de log](##add-the-trace-correlation-identifiers-to-the-log-context)
- [Usar parámetros en tu mensaje](#use-placeholders-in-your-message)

#### Añadir los identificadores de correlación de traza al contexto de log {#add-the-trace-correlation-identifiers-to-the-log-context}

El comportamiento predeterminado del rastreador PHP es añadir los identificadores de correlación de traza al contexto del log.

Por ejemplo, si estás utilizando la biblioteca de [Monolog][4] en una aplicación Laravel de la siguiente manera:

```php
use Illuminate\Support\Facades\Log;
# ...
Log::debug('Hello, World!');
```

El rastreador PHP añade los identificadores de correlación de traza disponibles al contexto del log. El mensaje registrado anteriormente podría transformarse en:

```
[2022-12-09 16:02:42] production.DEBUG: Hello, World! {"dd.trace_id":"1234567890abcdef","dd.span_id":"1234567890abcdef","dd.service":"laravel","dd.version":"8.0.0","dd.env":"production","status":"debug"}
```

**Nota**: Si hay un parámetro en tu mensaje o si un ID de traza ya está presente en el mensaje, el rastreador PHP **no** añade los identificadores de correlación de traza al contexto del log.

#### Usar parámetros en tu mensaje {#use-placeholders-in-your-message}

Puedes utilizar parámetros en tu mensaje para inyectar automáticamente identificadores de correlación de traza en tus logs. El rastreador PHP admite los siguientes parámetros:
- `%dd.trace_id%`: el ID de traza
- `%dd.span_id%`: el ID de tramo (span)
- `%dd.service%`: el nombre de servicio 
- `%dd.version%`: la versión de servicio 
- `%dd.env%`: el entorno de servicio

Los parámetros distinguen entre mayúsculas y minúsculas y deben ir encerrados entre `%`.

Por ejemplo, si estás utilizando la biblioteca de [Monolog][4] en una aplicación Laravel, puedes configurar la inyección en un mensaje de log de la siguiente manera:

```php
use Illuminate\Support\Facades\Log;
# ...
Log::info('Hello, World! [%dd.trace_id% %dd.span_id% %status%]');
```

El rastreador PHP sustituye los parámetros por los valores correspondientes. Por ejemplo, el mensaje registrado anteriormente podría transformarse en:

```
[2022-12-09 16:02:42] production.INFO: Hello, World! [dd.trace_id="1234567890abcdef" dd.span_id="1234567890abcdef" status="info"]
```

**Nota**: Los corchetes son obligatorios si planeas utilizar las reglas de parseo por defecto proporcionadas en el [pipeline de log][7] de PHP. Si utilizas una regla de parseo personalizada, puedes omitir los corchetes si es necesario.


## Inyección manual

<div class="alert alert-warning">
<strong>Nota:</strong> La función <code>\DDTrace\current_context()</code> ha sido introducida en la versión <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a> y devuelve identificadores de traza decimales.
</div>

Para conectar tus logs y trazas entre sí, tus logs deben contener los atributos `dd.trace_id` y `dd.span_id` que incluyen respectivamente tu ID de traza y tu ID de tramo.

Si no estás utilizando una [integración de log de Datadog][1] para analizar tus logs, las reglas personalizadas de parseo de log deben asegurar que `dd.trace_id` y `dd.span_id` se analizan como cadenas y se reasignan gracias al [Reasignador de traza][2]. Encontrarás más información en [Los logs correlacionados no aparecen en el panel de ID de traza][3].

Por ejemplo, podrías añadir esos dos atributos a tus logs con:

```php
  <?php
  $append = sprintf(
      ' [dd.trace_id=%s dd.span_id=%s]',
      \DDTrace\logs_correlation_trace_id(),
      \dd_trace_peek_span_id()
  );
  my_error_logger('Error message.' . $append);
?>
```

Si el registrador despliega la [biblioteca **monolog/monolog**][4], utiliza `Logger::pushProcessor()` para añadir automáticamente los identificadores a todos los mensajes de log. Para monolog v1, añade la siguiente configuración:

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['message'] .= sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      );
      return $record;
  });
?>
```

Para monolog v2, añade la siguiente configuración:

```php
<?php
  $logger->pushProcessor(function ($record) {
      return $record->with(message: $record['message'] . sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      ));
    });
  ?>
```

Si tu aplicación utiliza el formato de logs JSON, puedes añadir una clave de primer nivel `dd` que contenga los mensajes `trace_id` y `span_id`, en lugar de añadir `trace_id` y `span_id` al mensaje de log:

```php
<?php
  $logger->pushProcessor(function ($record) use ($context) {
      $record['dd'] = [
          'trace_id' => \DDTrace\logs_correlation_trace_id(),
          'span_id'  => \dd_trace_peek_span_id()
      ];

      return $record;
  });
?>
```

Para monolog v3, añade la siguiente configuración:

```php
<?php
  $logger->pushProcessor(function ($record) {
        $record->extra['dd'] = [
            'trace_id' => \DDTrace\logs_correlation_trace_id(),
            'span_id'  => \dd_trace_peek_span_id()
        ];
        return $record;
    });
?>
```

Si ingieres tus logs como JSON, ve a [Preprocessing for JSON logs][8] (Preprocesamiento para logs de JSON) y añade `extra.dd.trace_id` al campo **Trace Id Attributes** (Atributos de ID de traza).

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_collection/php/
[2]: /es/logs/log_configuration/processors/#trace-remapper
[3]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[4]: https://github.com/Seldaek/monolog
[5]: https://github.com/laminas/laminas-log
[6]: /es/getting_started/tagging/unified_service_tagging
[7]: /es/logs/log_configuration/pipelines
[8]: https://app.datadoghq.com/logs/pipelines/remapping