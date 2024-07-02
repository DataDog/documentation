---
aliases:
- /es/logs/languages/python
further_reading:
- link: https://www.datadoghq.com/blog/python-logging-best-practices/
  tag: Blog
  text: Cómo recopilar, personalizar y centralizar logs de Python
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: Documentación
  text: Guía para solucionar problemas relacionados con la recopilación de logs
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
kind: documentación
title: Recopilación de logs de Python
---

## Información general

Para enviar tus logs de Python a Datadog, configura un registrador de Python para loguear un archivo en tu host y luego [supervisa][12] ese archivo con el Datadog Agent.

## Configurar tu logger

Los logs de Python pueden ser complejos de manejar debido a los "tracebacks". Los tracesbacks hacen que los logs se dividan en varias líneas, lo que dificulta su asociación con el evento de log original. Para solucionar este problema, Datadog recomienda encarecidamente el uso de un formateador JSON al realizar el registro, de modo que puedas:

* Asegúrarte de que cada stack trace está envuelta en el log correcto.
* Asegúrarte de que todos los atributos de un evento de log se extraen correctamente (gravedad, nombre del registrador, nombre del subproceso, etc.).

Consulta los ejemplos de configuración de las siguientes bibliotecas de registro:

* [JSON-log-formatter][1]
* [Python-json-logger][2]
* [django-datadog-logger][3]*

*El [registrador de Python][6] tiene un parámetro `extra` para añadir atributos personalizados. Utiliza `DJANGO_Datadog_LOGGER_EXTRA_INCLUDE` para especificar una expresión regular que coincida con el nombre de los registradores para los que deseas añadir el parámetro `extra`.

## Configurar el Datadog Agent

Una vez activada la [recopilación de logs][7], configura la [recopilación de logs personalizada][8] para supervisar tus archivos de log y enviarlos a Datadog haciendo lo siguiente:

1. Crea una carpeta `python.d/` en el directorio de configuración del Agent `conf.d/`.
2. Crea un archivo `conf.yaml` en el directorio `conf.d/python.d/` con el siguiente contenido:
    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<PATH_TO_PYTHON_LOG>.log"
        service: "<SERVICE_NAME>"
        source: python
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. [Reinicia el Agent][5].
4. Ejecuta el [subcomando de estado del Agent][7] y busca `python` en la sección `Checks` para confirmar que los logs se han enviado correctamente a Datadog.

Si los logs están en formato JSON, Datadog [parsea los mensajes del log][7] de forma automática para extraer sus atributos. Utiliza el [Log Explorer][8] para ver tus logs y solucionar problemas relacionados.

## Conectar tus servicios al conjunto de logs y trazas (traces)

Si tienes APM activado para esta aplicación, conecta tus logs y trazas añadiendo automáticamente los ID de traza (trace) y los ID de tramo (span), `env`, `service` y `version` a tus logs mediante [las siguientes instrucciones de APM para Python][4].

**Nota**: Si el rastreador APM inyecta `service` en tus logs, este reemplazará al valor definido en la configuración del Agent.

Una vez hecho esto, el log debe tener el siguiente formato:

```xml
2019-01-07 15:20:15,972 DEBUG [flask.app] [app.py:100] [dd.trace_id=5688176451479556031 dd.span_id=4663104081780224235] - this is an example
```

Si los logs están en formato JSON, los valores de traza se extraen automáticamente si los valores están en el nivel superior o en los bloques de nivel superior `extra` o `record.extra`. A continuación, se muestran ejemplos de logs de JSON válidos en los que los valores de traza se analizan automáticamente.

```json
{
  "message":"Hello from the private method",
  "dd.trace_id":"18287620314539322434",
  "dd.span_id":"8440638443344356350",
  "dd.env":"dev",
  "dd.service":"logs",
  "dd.version":"1.0.0"
}
```

```json
{
  "message":"Hello from the private method",
  "extra":{
    "dd.trace_id":"18287620314539322434",
    "dd.span_id":"8440638443344356350",
    "dd.env":"dev",
    "dd.service":"logs",
    "dd.version":"1.0.0"
  }
}
```

```json
{
"message":"Hello from the private method",
  "record":{
    "extra":{
      "dd.trace_id":"1734396609740561719",
      "dd.span_id":"17877262712156101004",
      "dd.env":"dev",
      "dd.service":"logs",
      "dd.version":"1.0.0"
    }
  }
}
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.python.org/pypi/JSON-log-formatter/
[2]: https://github.com/madzak/python-json-logger
[3]: https://pypi.org/project/django-datadog-logger/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/python
[5]: /es/agent/configuration/agent-commands/
[6]: https://docs.python.org/3/library/logging.html#logging
[7]: /es/agent/logs/?tab=tailfiles#activate-log-collection
[8]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[9]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /es/logs/log_configuration/parsing/
[11]: /es/logs/explorer/#overview
[12]: /es/glossary/#tail