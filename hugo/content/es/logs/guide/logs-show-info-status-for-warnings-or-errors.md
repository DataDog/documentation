---
algolia:
  tags:
  - grok
  - analizador grok
  - análisis de logs
  - Extracción de atributos
  - Reasignación de atributos
  - análisis
aliases:
- /es/logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors
further_reading:
- link: /logs/guide/remap-custom-severity-to-official-log-status/
  tag: Documentación
  text: Aprender a reasignar valores de gravedad personalizados al estado de logs
    oficial
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprender a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Aprender sobre los análisis
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: Documentación
  text: Aprender a investigar un problema de análisis de logs
title: Los logs muestran el estado de la información de advertencias o errores
---

## Información general

Por defecto, cuando la API de entrada de Datadog recibe un log, se genera un estado `INFO` y se agrega como el atributo `status`.

{{<img src="logs/guide/original_log.png" alt="Panel de logs que muestra un log con el estado de la información, pero el mensaje muestra una advertencia." style="width:50%;">}}

Este `status` por defecto puede no reflejar siempre el estado real contenido en el propio log. En esta guía se explica cómo sustituir el valor por defecto por el estado real.

## Logs sin procesar

Si tus logs sin procesar no muestran el estado correcto en Datadog, [extrae](#extract-the-status-value-with-a-parser) el estado correcto de los logs sin procesar y [reasígnalo] (#define-a-log-status-remapper) al estado correcto.

### Extraer el valor de estado con un analizador

Utiliza un analizador Grok para definir una regla con el comparador [`word()`][1] y extrae el estado real del log.

1. Ve a [Pipelines de logs][2] y haz clic en el pipeline que procesa los logs.
2. Haz clic en **Add Processor** (Agregar procesador).
3. Selecciona el tipo de procesador **Grok Parser** (Analizador Grok).
4. Utiliza el [comparador `word()`][1] para extraer el estado y pasarlo a un atributo `log_status` personalizado.

Por ejemplo, el log puede tener este aspecto:

```
WARNING: John disconnected on 09/26/2017
```

Agrega una regla como:

```
MyParsingRule %{word:log_status}: %{word:user.name} %{word:action}.*
```

El resultado de la extracción de `MyParsingRule`:

```
{
  "action": "disconnected",
  "log_status": "WARNING",
  "user": {
    "name": "John"
  }
}
```

### Definir un reasignador de estado de log 

El atributo `log_status` contiene el estado correcto. Añade un [reasignador de estado de log][3] para asegurarte de que el valor de estado del atributo `log_status` sustituya al estado del log por defecto.

1. Ve a [Pipelines de logs][2] y haz clic en el pipeline que procesa los logs.
2. Haz clic en **Add Processor** (Agregar procesador).
3. Selecciona el reasignador de estado como el tipo de procesador.
4. Introduce un nombre para el procesador.
5. Agrega **log_status** a la sección Set status attribute(s) (Establecer atributo(s) de estado).
6. Haz clic en **Crear**.

{{< img src="logs/guide/log_post_processing.png" alt="Panel de logs que muestra un log con un estado de advertencia que coincide con el valor de advertencia del atributo de gravedad" style="width:50%;">}}

Las modificaciones de un pipeline afectan a los logs nuevos sólo porque todo el procesamiento se realiza en el proceso de entrada.

## Logs de JSON

Los logs JSON se analizan automáticamente en Datadog. Dado que el atributo `status` del log es un [atributo reservado][4], pasa por operaciones de preprocesamiento para los logs JSON. 

En este ejemplo, el estado real del log es el valor del atributo `logger_severity`, no el estado del log de `INFO` por defecto.

{{< img src="logs/guide/new_log.png" alt="Panel de logs que muestra un log con el estado de información, pero el valor del atributo de logger_severity es un error" style="width:50%;">}}

Para asegurarte de que el valor del atributo `logger_severity` sustituye al estado de log por defecto, agrega `logger_severity` a la lista de los atributos de estado.

1. Ve a [Pipelines de logs][2] y haz clic en el pipeline que procesa los logs.
2. Sitúate sobre Preprocessing for JSON Logs (Preprocesamiento para logs JSON) y haz clic en el icono del lápiz.
3. Agrega `logger_severity` a la lista de atributos de estados. El reasignador de estados busca cada atributo reservado en el orden en que aparecen en la lista. Para asegurarte de que el estado procede del atributo de `logger_severity`, colócalo en primer lugar en la lista.
4. Haz clic en **Guardar**.

{{< img src="logs/guide/new_log_remapped.png" alt="Panel de logs que muestra un log con un estado de error que coincide con el valor del atributo de logger_severity de error" style="width:50%;">}}

Las modificaciones de un pipeline sólo afectan a los logs nuevos porque todo el procesamiento se realiza durante el proceso de consumo. Los logs nuevos se configuran correctamente con el valor del atributo `logger_severity`.

Para que la reasignación funcione, respeta los formatos de estado especificados en la [documentación sobre procesadores][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/parsing
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /es/logs/log_configuration/processors/#log-status-remapper
[4]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes