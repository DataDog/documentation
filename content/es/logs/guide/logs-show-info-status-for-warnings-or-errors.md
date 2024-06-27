---
aliases:
- /es/logs/FAQ/por-qué-mis-logs-aparecen-con-un-estado-de-información-incluso-para-advertencias-o-errores
further_reading:
- link: /logs/guía/reasignar-gravedad-personalizada-al-estado-de-log-oficial/
  tag: Documentación
  text: Aprende cómo reasignar valores de gravedad personalizados al estado de log
    oficial
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende cómo procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Aprende sobre parseo
- link: /logs/FAQ/cómo-investigar-un-problema-de-parseo-de-log/
  tag: Documentación
  text: Aprende a investigar un problema de parseo de log
kind: errores
title: Los logs muestran el estado de información para la guía de advertencias o
---

## Información general

Por defecto, cuando la API de entrada de Datadog recibe un log, se genera un estado `INFO` y se agrega como el atributo `status`.

{{<img src="logs/guide/original_log.png" alt="el panel de logs muestra un log con el estado de info, pero el mensaje muestra una advertencia". style="width:50%;">}}

Este valor `status` por defecto puede no reflejar siempre el estado real contenido en el propio log. En esta guía se explica cómo reemplazar el valor por defecto por el estado real.

## Logs sin procesar

Si tus logs sin procesar no muestran el estado correcto en Datadog, [extrae](#extraer-el-valor-de-estado-con-un-analizador) el estado correcto de los logs sin procesar y [reasígnalo](#definir-un-remapper-de-estado-de-log) al estado correcto.

### Extrae el valor de estado con un analizador sintáctico

Utiliza un analizador Grok para definir una regla con el comparador [`word()`][1] y extrae el estado real del log.

1. Navega a [pipelines de logs][2] y haz clic en el pipeline que procesa los logs.
2. Haz clic en **Agregar procesador**.
3. Selecciona **analizador Grok** para el tipo de procesador.
4. Utiliza el [comparador`word()`][1] para extraer el estado y pasarlo a un atributo personalizado de `log_status`. 

Por ejemplo, el log puede tener este aspecto:

```
ADVERTENCIA: John se desconectó el 26/09/2017
```

Agrega una regla como:

```
MyParsingRule %{word:log_status}: %{word:user.name} %{word:action}.*
```

El resultado de la extracción de `MyParsingRule`

```
{
  "action": "disconnected",
  "log_status": "WARNING",
  "user": {
    "name": "John"
  }
}
```

### Define un reasignador de estado de log 

El atributo `log_status` contiene el estado correcto. Agrega un [reasignador de estado de log][3] para asegurarte de que el valor de estado del atributo `log_status` reemplace al estado del log por defecto.

1. Navega a [pipelines de logs][2] y haz clic en el pipeline que procesa los logs.
2. Haz clic en **Agregar procesador**.
3. Selecciona el reasignador de estado como el tipo de procesador.
4. Ingresa un nombre para el procesador.
5. Agrega **log_status** a la sección Establecer atributo(s) de estado.
6. Haz clic en **Create**.

{{< img src="logs/guide/log_post_processing.png" alt="el panel de logs muestra un log con un estado de advertencia que coincide con el valor de advertencia del atributo de gravedad" style="width:50%;">}}

Las modificaciones de un pipeline afectan a los logs nuevos solo porque todo el procesamiento se realiza en el proceso de entrada.

## Logs JSON

Los logs JSON se analizan automáticamente en Datadog. Dado que el atributo `status` del log es un [atributo reservado][4], pasa por operaciones de procesamiento previo para los logs JSON. 

En este ejemplo, el estado real del log es el valor del atributo `logger_severity`, no el estado del log `INFO` por defecto.

{{< img src="logs/guide/new_log.png" alt="el panel de logs muestra un log con estado de info, pero el valor del atributo de logger_severity es error" style="width:50%;">}}

Para asegurarte de que el valor del atributo `logger_severity` reemplace al estado de log por defecto, agrega `logger_severity` a la lista de los atributos de estado.

1. Navega a [pipelines de logs][2] y haz clic en el pipeline que procesa los logs.
2. Pasa el puntero sobre Preprocesamiento para logs JSON y haz clic en el icono del lápiz.
3. Agrega `logger_severity` a la lista de atributos de estado. El reasignador de estado busca cada atributo reservado en el orden en que aparecen en la lista. Para asegurarte de que el estado procede del atributo `logger_severity`, colócalo en primer lugar en la lista lista.
4. Haz clic en **Guardar**.

{{< img src="logs/guide/new_log_remapped.png" alt="el panel de logs muestra un log con un estado de error que coincide con el valor del atributo logger_severity de error" style="width:50%;">}}

Las modificaciones de un pipeline solo afectan a los logs nuevos porque todo el procesamiento se realiza en el proceso de ingestión. Los logs nuevos se configuran correctamente con el valor del atributo `logger_severity`.

Para que la reasignación funcione, respeta los formatos de estado especificados en la [Documentación de procesadores][3].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/parsing
[2]: https://app.datadoghq.com/logs/pipelines/
[3]: /es/logs/log_configuration/processors/#log-status-remapper
[4]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes