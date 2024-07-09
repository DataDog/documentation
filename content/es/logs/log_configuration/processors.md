---
aliases:
- /es/logs/processing/processors/
description: Analizar tus logs con el procesador Grok
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentación
  text: Descubrir los pipelines de Datadog
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
kind: documentación
title: Procesadores
---

## Información general

Un procesador se ejecuta dentro de un [pipeline][1] para completar una acción de estructuración de datos y generar atributos para enriquecer tus logs.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Procesadores" style="width:100%" >}}

En la sección de [configuración de parámetros de logs][1], puedes configurar procesadores como el [Analizador Grok](#grok-parser) o el [reasignador de datos(#remapper) para extraer, crear y reasignar atributos para enriquecer tus logs y mejorar las búsquedas con facetas.

**Notas**:

- Los logs estructurados deben enviarse en un formato válido. Si la estructura contiene caracteres no válidos para el análisis, deben eliminarse en el nivel del Agent utilizando la función [mask_sequences][2].

- Una práctica recomendada es utilizar como máximo 20 procesadores por pipeline.

## Analizador Grok

Crea reglas grok personalizadas para analizar el mensaje completo o un atributo específico de tu evento sin procesar. Para obtener más información, consulta la [sección Análisis][2]. Una práctica recomendada es utilizar como máximo 10 reglas de análisis en un procesador grok.

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador Grok en la [página **Pipelines**][1]:

{{< img src="logs/log_configuration/processor/grok_parser.png" alt="Analizador Grok" style="width:80%;" >}}

Haz clic en **Parse my logs** (Analizar mis logs) para configurar un conjunto de tres reglas de análisis para los logs que circulan a través del pipeline subyacente. A partir de ahí, refina los nombres de los atributos y, si es necesario, añade nuevas reglas para otros tipos de logs. Esta función requiere que los logs correspondientes se indexen y fluyan. Puedes desactivar temporalmente o reducir los filtros de exclusión para que esto funcione correctamente.

Selecciona una muestra haciendo clic en ella para activar su evaluación con la regla de análisis y mostrar el resultado en la parte inferior de la pantalla.

Se pueden guardar hasta cinco muestras con el procesador y cada muestra puede tener hasta 5000 caracteres de longitud. Todas las muestras presentan un estado (`match` o `no match`), que destaca si una de las reglas de análisis del analizador grok coincide con la muestra.

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del analizador Grok:

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

| Parámetro            | Tipo             | Obligatorio | Descripción                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | Cadena           | Sí      | Tipo de procesador.                                  |
| `name`               | Cadena           | No       | Nombre del procesador.                                  |
| `is_enabled`         | Booleano          | No       | Si los procesadores están habilitados o no. Por defecto: `false`.  |
| `source`             | Cadena           | Sí      | Nombre del atributo de log a analizar. Por defecto: `message`. |
| `samples`            | Matriz de cadenas | No       | Lista de (hasta 5) muestras de logs para este analizador grok.     |
| `grok.support_rules` | Cadena           | Sí      | Lista de reglas de compatibilidad para tu analizador grok.             |
| `grok.match_rules`   | Cadena           | Sí      | Lista de reglas de coincidencia para tu analizador grok.               |


[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador de fechas de logs

A medida que Datadog recibe logs, les coloca una marca de tiempo utilizando el valor o los valores de cualquiera de estos atributos predeterminados:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si tus logs tienen fechas en un atributo que no están en este lista, utiliza el procesador del reasignador de fechas de logs para definir la marca de tiempo oficial del log como su atributo de fecha:

<div class="alert alert-info">
Los formatos de fecha reconocidos son: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (formato EPOCH en milisegundos)</a> y <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

Si tus logs no tienen una marca de tiempo que se ajuste a los formatos enumerados anteriormente, utiliza el procesador de Grok para extraer la hora epoch de la marca de tiempo para un atributo nuevo. El reasignador de fechas utiliza el atributo recién definido.

Para ver cómo se puede analizar un formato personalizado de fecha y hora en Datadog, consulta [Análisis de fechas][3].

**Notas**:

* Los eventos de logs pueden enviarse dentro de las 18 horas pasadas y las 2 futuras.
* A partir de la norma ISO 8601-1:2019, el formato básico es `T[hh][mm][ss]` y el formato ampliado es `T[hh]:[mm]:[ss]`. Las versiones anteriores omitían la T (que representa la hora) en ambos formatos.
* Si tus logs no contienen ninguno de los atributos predeterminados y no has definido su propio atributo de fecha, Datadog coloca una marca de tiempo con la fecha de recepción en los logs.
* Si se aplican varios procesadores de reasignación de fechas de logs a un determinado log del pipeline, se tiene en cuenta el último (según el orden del pipeline).

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador de reasignación de fechas de logs en la [página **Pipelines**][1]:

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="Definir un atributo de fecha" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="Hora y fecha en el panel lateral del Explorador de logs" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del reasignador de fechas de logs:

```json
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> como fecha oficial del log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                |
| `name`       | Cadena           | no       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | no       | Si los procesadores están habilitados o no. Por defecto: `false`. |
| `sources`    | Matriz de cadenas | Sí      | Matriz de atributos de origen.                           |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador de estados de logs

Utiliza el procesador de reasignación de estados para asignar atributos como estado oficial a tus logs. Por ejemplo, añade un nivel de gravedad de log a tus logs con el reasignador de estado.

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="Nivel de gravedad del log tras la reasignación" style="width:40%;" >}}

Cada valor de estado entrante se asigna de la siguiente manera:

* Los números enteros de 0 a 7 asignan según las [normas de gravedad de syslog][4].
* Las cadenas que empiezan por **emerg** o **f** (sin distinción entre mayúsculas y minúsculas) asignan a **emerg (0)**.
* Las cadenas que empiezan por **a** (sin distinción entre mayúsculas y minúsculas) asignan a **alert (1)**.
* Las cadenas que empiezan por **c** (sin distinción entre mayúsculas y minúsculas) asignan a **critical (2)**.
* Las cadenas que empiezan por **e** (sin distinción entre mayúsculas y minúsculas) que no coinciden con `emerg` asignan a **error (3)**
* Las cadenas que empiezan por **w** (sin distinción entre mayúsculas y minúsculas) asignan a **warning (4)**.
* Las cadenas que empiezan por **n** (sin distinción entre mayúsculas y minúsculas) asignan a **notice (5)**.
* Las cadenas que empiezan por **i** (sin distinción entre mayúsculas y minúsculas) asignan a **info (6)**.
* Las cadenas que empiezan por **d**, **t**, **v**, **trace** o **verbose** (sin distinción entre mayúsculas y minúsculas) asignan a **debug (7)**.
* Las cadenas que empiezan por **o** o **s**, o que coinciden con **OK** o **Success** (sin distinción entre mayúsculas y minúsculas) asignan a **OK**.
* Todos los demás se asignan a **info (6)**.

**Nota**: Si se aplican varios procesadores de reasignación de estado de log a un determinado log del pipeline, sólo se tendrá en cuenta el primero (según el orden del pipeline).

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador de reasignación de estados de logs en la [página **Pipelines**][1]:

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Reasignación de la gravedad de logs" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del reasignador de estados de logs:

```json
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> como el estado oficial del log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                |
| `name`       | Cadena           | No       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | No       | Si los procesadores están habilitados o no. Por defecto: `false`. |
| `sources`    | Matriz de cadenas | Sí      | Matriz de atributos de origen.                           |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador de servicios

El procesador de reasignación de servicios asigna uno o más atributos a tus logs como servicio oficial.

**Nota**: Si se aplican varios procesadores de reasignación de servicios a un determinado log del pipeline, sólo se tendrá en cuenta el primero (según el orden del pipeline).

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador de reasignación de servicios de logs en la [página **Pipelines**][1]:

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="Procesador de reasignación de servicios" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del reasignador de servicios de logs:

```json
{
  "tipo": "servicio-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> como servicio oficial del log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                |
| `name`       | Cadena           | No       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | No       | Si los procesadores están habilitados o no. Por defecto: `false`. |
| `sources`    | Matriz de cadenas | Sí      | Matriz de atributos de origen.                           |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador de mensajes de logs

`message` es un atributo clave en Datadog. Su valor se muestra en la columna **Content** (Contenido) del Explorador de los para proporcionar contexto sobre el log. Puedes utilizar la barra de búsqueda para encontrar un log mediante el mensaje del log. 

Utiliza el procesador de reasignación de mensajes de logs para definir uno o más atributos como mensaje oficial del log. Define más de un atributo para los casos en los que los atributos no existan y haya una alternativa disponible. Por ejemplo, si los atributos de mensaje definidos son `attribute1`, `attribute2` y `attribute3`, y `attribute1` no existe, se utiliza `attribute2`. Del mismo modo, si `attribute2` no existe, se utiliza `attribute3`.

Para definir los atributos de los mensajes, utiliza primero el [procesador de creación de cadenas](#string-builder-processor) para crear un nuevo atributo de cadena para cada uno de los atributos que quieras utilizar. A continuación, utiliza el reasignador de mensajes de logs para reasignar los atributos de cadena como mensaje.

**Nota**: Si se aplican varios procesadores de reasignación de mensajes de logs a un determinado log del pipeline, sólo se tendrá en cuenta el primero (según el orden del pipeline).

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador de reasignación de mensajes de logs en la [página **Pipelines**][1]:

{{< img src="logs/log_configuration/processor/message_processor.png" alt="Procesador de mensajes" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del reasignador de mensajes de logs:

```json
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> como mensaje oficial del log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                |
| `name`       | Cadena           | No       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | No       | Si los procesadores están habilitados o no. Por defecto: `false`. |
| `sources`    | Matriz de cadenas | Sí      | Matriz de atributos de origen. Por defecto: `msg`.            |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador

El procesador de reasignación reasigna cualquier atributo o etiqueta de origen a otro atributo u otra etiqueta de destino. Por ejemplo, reasigna `user` por `firstname` para dirigir tus logs en el Explorador de logs:

{{< img src="logs/procesar/processors/attribute_post_remapping.png" alt="Atributo tras la reasignación" style="width:60%;">}}

Las restricciones de nombre de etiquetas/atributos se explican en la [documentación sobre atributos y etiquetas][5]. Algunas restricciones adicionales, aplicadas como `:` o `,`, no están permitidas en los nombres de etiquetas/atributos de destino.

Si el objetivo del reasignador es un atributo, el reasignador también puede intentar convertir el valor a un nuevo tipo (`String`, `Integer` o `Double`). Si la conversión no es posible, se conserva el tipo original.

**Nota**: El separador decimal para `Double` debe ser `.`.

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador de reasignación en la [página de **Pipelines**][1]. Por ejemplo, reasigna `user` a `user.firstname`.

{{< img src="logs/log_configuration/processor/remapper.png" alt="Procesador de reasignación de atributos" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del reasignador:

```json
{
  "type": "attribute-remapper",
  "name": "Remap <SOURCE_ATTRIBUTE> to <TARGET_ATTRIBUTE>",
  "is_enabled": true,
  "source_type": "attribute",
  "sources": ["<SOURCE_ATTRIBUTE>"],
  "target": "<TARGET_ATTRIBUTE>",
  "target_type": "tag",
  "target_format": "integer",
  "preserve_source": false,
  "override_on_conflict": false
}
```

| Parámetro              | Tipo             | Obligatorio | Descripción                                                                    |
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 | Cadena           | Sí      | Tipo de procesador.                                                         |
| `name`                 | Cadena           | No      | Nombre del procesador.                                                         |
| `is_enabled`           | Booleano          | No      | Si los procesadores están habilitados o no. Por defecto: `false`.                          |
| `source_type`          | Cadena           | No      | Define si la fuente es el `attribute` o la `tag` del log. Por defecto: `attribute`. |
| `sources`              | Matriz de cadenas | Sí      | Matriz de atributos o etiquetas de origen                                             |
| `target`               | Cadena           | Sí      | Nombre final de atributo o etiqueta al que reasignar las fuentes.                           |
| `target_type`          | Cadena           | No      | Define si el objetivo es el `attribute` o la `tag` del log. Por defecto: `attribute`.    |
| `target_format`        | Cadena           | No      | Define si el valor del atributo debe convertirse a otro tipo. Valores posibles: `auto`, `string` o `integer`. Valor por defecto: `auto`. Si se configura como `auto`, no se aplica ninguna conversión.  |
| `preserve_source`      | Booleano          | No      | Elimina o conserva el elemento de origen reasignado. Por defecto: `false`.               |
| `override_on_conflict` | Booleano          | No      | Anula o no el elemento de destino, si ya está configurado. Por defecto: `false`.            |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Analizador de URL

El procesador del analizador de URL extrae los parámetros de consulta y otros parámetros importantes de una URL. Cuando está configurado, se generan los siguientes atributos:

{{< img src="logs/procesar/processors/url_processor.png" alt="Procesador de URL" style="width:80%;" >}}

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador del analizador de URL en la [página **Pipelines**][1]:

{{< img src="logs/procesar/processors/url_processor.png" alt="Cuadro del procesador de URL" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "url-parser",
  "name": "Analiza la URL del atributo http.url.",
  "is_enabled": true,
  "sources": ["http.url"],
  "target": "http.url_details"
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                                                                                          |
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                                                                               |
| `name`       | Cadena           | No       | Nombre del procesador.                                                                                               |
| `is_enabled` | Booleano          | No       | Si los procesadores están habilitados o no. Por defecto: `false`.                                                                |
| `sources`    | Matriz de cadenas | No       | Matriz de atributos de origen. Por defecto: `http.url`.                                                                      |
| `target`     | Cadena           | Sí      | Nombre del atributo principal que contiene todos los detalles extraídos de `sources`. Por defecto: `http.url_details`. |

{{% /tab %}}
{{< /tabs >}}

## Analizador del agente de usuario

El procesador del analizador del agente de usuario toma un atributo `useragent` y extrae datos del sistema operativo, del navegador, del dispositivo y otros datos del usuario. Cuando está configurado, se generan los siguientes atributos:

{{< img src="logs/procesar/processors/useragent_processor.png" alt="Procesador de agente de usuario" style="width:80%;">}}

**Nota**: Si tus logs contienen agentes de usuario codificados (por ejemplo, logs IIS), configura este procesador para **decodificar la URL** antes del análisis.

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador del agente de usuario en la [página **Pipelines**][1]:

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="Cuadro del procesador de agente de usuario" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del analizador de agente de usuario:

```json
{
  "type": "user-Agent-parser",
  "name": "Analiza <SOURCE_ATTRIBUTE> para extraer toda su información de agente de usuario",
  "is_enabled": true,
  "sources": ["http.useragent"],
  "target": "http.useragent_details",
  "is_encoded": false
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                                                                                                 |
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                                                                                      |
| `name`       | Cadena           | No       | Nombre del procesador.                                                                                                      |
| `is_enabled` | Booleano          | No       | Si los procesadores están habilitados o no. Por defecto: `false`.                                                                      |
| `sources`    | Matriz de cadenas | No       | Matriz de atributos de origen. Por defecto: `http.useragent`.                                                                      |
| `target`     | Cadena           | Sí      | Nombre del atributo principal que contiene todos los detalles extraídos de `sources`. Por defecto: `http.useragent_details`. |
| `is_encoded` | Booleano          | No       | Define si el atributo de origen está codificado con URL o no. Por defecto: `false`.                                                     |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de categorías

Utiliza el procesador de categorías para añadir un nuevo atributo (sin espacios ni caracteres especiales en el nombre del nuevo atributo) a un log que coincida con una consulta de búsqueda proporcionada. A continuación, utiliza categorías para crear grupos para una vista analítica (por ejemplo, grupos de URL, grupos de máquinas, entornos, y buckets de tiempos de respuesta).

**Notas**:

* La sintaxis de la consulta es la que aparece en la barra de búsqueda del [Explorador de logs][6]. Esta consulta puede hacerse sobre cualquier atributo o etiqueta de log, sea o no una faceta. También se pueden utilizar comodines en la consulta.
* Una vez que el log ha coincidido con una de las consultas del procesador, se detiene. Asegúrate de que estén bien ordenados, en caso de que un log pueda coincidir con varias consultas.
* Los nombres de las categorías deben ser únicos.
* Una vez definidas las categorías en el procesador de categorías, puedes asignarlas al estado del log utilizando el [Reasignador de estados de logs](#log-status-remapper).

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador de categorías en la [página **Pipelines**][1]. Por ejemplo, para categorizar tus logs de acceso web basándote en el valor del rango de código de estado (`"OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...`), añade este procesador:

{{< img src="logs/log_configuration/processor/category_processor.png" alt="Procesador de categorías" style="width:80%;" >}}

Este procesador genera el siguiente resultado:

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="Resultado del procesador de categorías" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del procesador de categorías:

```json
{
  "tipo": "category-processor",
  "name": "Asigna un valor personalizado al atributo <TARGET_ATTRIBUTE>",
  "is_enabled": true
  "categories": [
    {"filter": {"query": "<QUERY_1>"}, "name": "<VALUE_TO_ASSIGN_1>"},
    {"filter": {"query": "<QUERY_2>"}, "name": "<VALUE_TO_ASSIGN_2>"}
  ],
  "target": "<TARGET_ATTRIBUTE>"
}
```

| Parámetro    | Tipo            | Obligatorio | Descripción                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | Cadena          | Sí      | Tipo de procesador.                                                                                     |
| `name`       | Cadena          | No       | Nombre del procesador.                                                                                     |
| `is_enabled` | Booleano         | No       | Si los procesadores están habilitados o no. Por defecto: `false`                                                      |
| `categories` | Matriz de objetos | Sí      | Matriz de filtros para hacer coincidir o no un log y su `name` correspondiente, para asignar un valor personalizado al log. |
| `target`     | Cadena          | Sí      | Nombre del atributo de destino cuyo valor está definido por la categoría coincidente.                              |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador aritmético

Utiliza el procesador aritmético para añadir un nuevo atributo (sin espacios ni caracteres especiales en el nombre del nuevo atributo) a un log con el resultado de la fórmula proporcionada. Esto reasigna diferentes atributos de tiempo con diferentes unidades en un único atributo, o computa operaciones en atributos del mismo log.

Una fórmula de procesador aritmético puede utilizar paréntesis y operadores aritméticos básicos: `-`, `+`, `*`, `/`.

Por defecto, si falta un atributo se omite un cálculo. Selecciona *Replace missing attribute by 0* (Sustituir atributo omitido por 0) para rellenar automáticamente los valores de atributos omitidos con 0 y asegurarte de que se realiza el cálculo.

**Notas**:

* Un atributo puede aparecer como ausente, si no se encuentra en los atributos del log o si no puede convertirse en un número.
* Cuando se utiliza el operador `-`, añade espacios antes y después, ya que los nombres de atributos como `start-time` pueden contener guiones. Por ejemplo, la siguiente fórmula debe incluir espacios espacios antes y después del operador `-`: `(end-time - start-time) / 1000`.
* Si el atributo de destino ya existe, se sobrescribe con el resultado de la fórmula.
* Los resultados se redondean al noveno decimal. Por ejemplo, si el resultado de la fórmula es `0.1234567891`, el valor real almacenado para el atributo es `0.123456789`.
* Si necesitas escalar una unidad de medida, utiliza el filtro para escalas.

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador aritmético en la [página **Pipelines**][1]:

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="Procesador aritmético" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del procesador aritmético:

```json
{
  "type": "arithmetic-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "expression": "<ARITHMETIC_OPERATION>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": false
}
```

| Parámetro            | Tipo    | Obligatorio | Descripción                                                                                                                                  |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | Cadena  | Sí      | Tipo de procesador.                                                                                                                       |
| `name`               | Cadena  | No       | Nombre del procesador.                                                                                                                       |
| `is_enabled`         | Booleano | No       | Si los procesadores están habilitados o no. Por defecto: `false`.                                                                                       |
| `expression`         | Cadena  | Sí      | Operación aritmética entre uno o varios atributos de logs.                                                                                     |
| `target`             | Cadena  | Sí      | Nombre del atributo que contiene el resultado de la operación aritmética.                                                                  |
| `is_replace_missing` | Booleano | No       | Si `true`, sustituye todos los atributos que faltan de `expression` por 0, `false` omite la operación si falta un atributo. Por defecto: `false`. |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador del creador de cadenas

Utilice el procesador del creador de cadenas para añadir un nuevo atributo (sin espacios ni caracteres especiales) a una log con el resultado de la plantilla proporcionada. Esto permite agregar diferentes atributos o cadenas sin procesar en un único atributo.

La plantilla está definida tanto por texto sin formato como por bloques con la sintaxis `%{attribute_path}`.

**Notas**:

* Este procesador sólo acepta atributos con valores o una matriz de valores en el bloque (consulta los ejemplos de la sección de la interfaz de usuario a continuación).
* Si no se puede utilizar un atributo (objeto o matriz de objetos), se sustituye por una cadena vacía o se omite toda la operación en función de tu selección.
* Si ya existe un atributo de destino, se sobrescribe con el resultado de la plantilla.
* Los resultados de una plantilla no pueden superar los 256 caracteres.

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador del creador de cadenas en la [página **Pipelines**][1]:

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="Procesador del creador de cadenas" style="width:80%;">}}

Con el siguiente log, utiliza la plantilla `Request %{http.method} %{http.url} was answered with response %{http.status_code}` para devolver un resultado. Por ejemplo:


```json
{
  "http": {
    "method": "GET",
    "status_code": 200,
    "url": "https://app.datadoghq.com/users"
  },
  "array_ids": [123, 456, 789],
  "array_users": [
    {"first_name": "John", "last_name": "Doe"},
    {"first_name": "Jack", "last_name": "London"}
  ]
}
```

Devuelve lo siguiente:

```text
La solicitud GET https://app.datadoghq.com/users ha sido respondida con 200
```

**Nota**: `http` es un objeto y no puede utilizarse en un bloque (`%{http}` falla), mientras que `%{http.method}`, `%{http.status_code}` o `%{http.url}` devuelven el valor correspondiente. Los bloques pueden utilizarse en matrices de valores o en un atributo específico de una matriz. 

* Por ejemplo, añadir el bloque `%{array_ids}` devuelve:

   ```text
   123,456,789
   ```

* `%{array_users}` no devuelve nada porque es una lista de objetos. Sin embargo, `%{array_users.first_name}` devuelve una lista de los `first_name` contenidos en la matriz:

  ```text
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del procesador del creador de cadenas:

```json
{
  "type": "string-builder-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "template": "<STRING_BUILDER_TEMPLATE>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": true
}
```

| Parámetro            | Tipo    | Obligatorio | Descripción                                                                                                                                       |
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | Cadena  | Sí      | Tipo de procesador.                                                                                                                            |
| `name`               | Cadena  | No       | Nombre del procesador.                                                                                                                            |
| `is_enabled`         | Booleano | No       | Si el procesador está habilitado o no, por defecto es `false`.                                                                                          |
| `template`           | Cadena  | Sí      | Una fórmula con uno o más atributos y texto sin formato.                                                                                               |
| `target`             | Cadena  | Sí      | El nombre del atributo que contiene el resultado de la plantilla.                                                                               |
| `is_replace_missing` | Booleano | No       | Si es `true`, sustituye todos los atributos que faltan de `template` por una cadena vacía. Si es `false`, omite la operación para los atributos que faltan. Por defecto: `false`. |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Analizador GeoIP

El analizador GeoIP toma un atributo de una dirección IP y extrae información de continente, país, subdivisión o ciudad (si está disponible) en la ruta del atributo de destino.

{{< tabs >}}
{{% tab "UI" (IU) %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="Procesador GeoIP" style="width:80%;">}}

La mayoría de los elementos contienen un atributo `name` y `iso_code` (o `code` para continente). `subdivision` es el primer nivel de subdivisión que utiliza el país, como "Estados" para Estados Unidos o "Departamentos" para Francia.

Por ejemplo, el analizador GeoIP extrae una localización del atributo `network.client.ip` y lo almacena en el atributo `network.client.geoip`:

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="Ejemplo de GeoIP" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del analizador GeoIP:

```json
{
  "type": "geo-ip-parser",
  "name": "Analiza los elementos de geolocalización del atributo network.client.ip",
  "is_enabled": true,
  "sources": ["red.client.ip"],
  "target": "red.client.geoip"
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                                                                                               |
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                                                                                    |
| `name`       | Cadena           | No       | Nombre del procesador.                                                                                                    |
| `is_enabled` | Booleano          | No       | Si los procesadores están habilitados o no. Por defecto: `false`.                                                                     |
| `sources`    | Matriz de cadenas | No       | Matriz de atributos de origen. Por defecto: `network.client.ip`.                                                                  |
| `target`     | Cadena           | Sí      | Nombre del atributo principal que contiene todos los detalles extraídos de `sources`. Por defecto: `network.client.geoip`.  |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de búsqueda

Utiliza el procesador de búsqueda para definir una reasignación entre un atributo de log y un valor legible por el ser humano guardado en una [tabla de referencia][1] o en la tabla de asignación de procesadores.

Por ejemplo, puedes utilizar el procesador de búsqueda para asignar un ID interno de servicio a un nombre de servicio legible por el ser humano. También puedes utilizarlo para comprobar si la dirección MAC que acaba de intentar conectarse al entorno de producción pertenece a tu lista de máquinas robadas.

{{< tabs >}}
{{% tab "UI" (IU) %}}

El procesador de búsqueda realiza las siguientes acciones:

* Comprueba si el log actual contiene el atributo de origen.
* Comprueba si el valor del atributo de origen existe en la tabla de asignación.
  * Si existe, crea el atributo de destino con el valor correspondiente en la tabla.
  * Opcionalmente, si no encuentra el valor en la tabla de asignación, crea un atributo de destino con el valor auxiliar predeterminado, configurado en el campo `fallbackValue`. Puedes introducir manualmente una lista de pares `source_key,target_value` o cargar un archivo CSV en la pestaña **Manual Mapping** (Asignación manual).

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Procesador de búsqueda" style="width:80%;">}}

    El límite de tamaño de la tabla de asignaciones es de 100 Kb. Este límite se aplica a todos los procesadores de consulta de la plataforma. Sin embargo, las tablas de referencia admiten archivos de mayor tamaño.

  * Opcionalmente, si no encuentra el valor en la tabla de asignaciones, crea un atributo de destino con el valor de la tabla de referencia. Puedes seleccionar un valor para una [tabla de referencias][101] en la pestaña **Reference Table** (Tabla de referencias).

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Procesador de búsqueda" 
    style="width:80%;">}}


[101]: /es/integrations/guide/reference-tables/

{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del procesador de búsqueda:

```json
{
  "type": "lookup-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "source": "<SOURCE_ATTRIBUTE>",
  "target": "<TARGET_ATTRIBUTE>",
  "lookup_table": ["key1,value1", "key2,value2"],
  "default_lookup": "<DEFAULT_TARGET_VALUE>"
}
```

| Parámetro        | Tipo             | Obligatorio | Descripción                                                                                                                                                              |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Cadena           | Sí      | Tipo de procesador.                                                                                                                                                   |
| `name`           | Cadena           | No       | Nombre del procesador.                                                                                                                                                   |
| `is_enabled`     | Booleano          | Sí      | Si el procesador está habilitado o no. Por defecto: `false`.                                                                                                                     |
| `source`         | Cadena           | Sí      | Atributo de origen utilizado para realizar la búsqueda.                                                                                                                             |
| `target`         | Cadena           | Sí      | Nombre del atributo que contiene el valor correspondiente en la lista de asignaciones o la `default_lookup` si no se encuentra en la lista de asignaciones.                                |
| `lookup_table`   | Matriz de cadenas | Sí      | Tabla de asignación de valores para el atributo de origen y sus valores de atributo de destino asociados, con el formato [ "source_key1,target_value1", "source_key2,target_value2" ]. |
| `default_lookup` | Cadena           | No       | Valor para configurar el atributo de destino, si no se encuentra el valor de origen en la lista.                                                                                          |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador de trazas

Existen dos formas de mejorar la correlación entre trazas y logs de aplicaciones:

1. Sigue la documentación sobre [cómo inyectar un ID de rastreo en logs de aplicaciones][8]. Por defecto, las integraciones de logs se encargan del resto de la configuración.

2. Utilice el procesador del reasignador de trazas para definir un atributo de log como su ID de rastreo asociado.

{{< tabs >}}
{{% tab "UI" (IU) %}}

Define el procesador del reasignador de trazas en la [página **Pipelines**][1]. Introduce la ruta de atributo del ID de rastreo en el cuadro del procesador, de la siguiente manera:

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="Procesador del ID de rastreo" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [endpoint de API de pipeline para logs de Datadog][1] con la siguiente carga útil JSON del reasignador de trazas:

```json
{
  "type": "rastrear-id-remapper",
  "name": "Define dd.trace_id como id de rastreo oficial asociado a este log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                 |
| `name`       | Cadena           | No       | Nombre del procesador.                                 |
| `is_enabled` | Booleano          | No       | Si los procesadores están habilitados o no. Por defecto: `false`. |
| `sources`    | Matriz de cadenas | No       | Matriz de atributos de origen. Por defecto: `dd.trace_id`.    |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**Nota**: rastrear Los ID de rastreo y de tramo (span) no se muestran en tus logs o en tus atributos de logs en la interfaz de usuario.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/log_configuration/pipelines/
[2]: /es/logs/log_configuration/parsing/
[3]: /es/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /es/logs/log_collection/?tab=host#attributes-and-tags
[6]: /es/logs/search_syntax/
[7]: /es/integrations/guide/reference-tables/
[8]: /es/tracing/other_telemetry/connect_logs_and_traces/