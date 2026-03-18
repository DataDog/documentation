---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /es/logs/processing/processors/
description: Analiza tus registros con el procesador Grok
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Descubre Datadog Pipelines
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Tala sin límites*
- link: /logs/explorer/
  tag: Documentation
  text: Descubre cómo consultar tus registros
- link: https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s
  tag: Video
  text: 'Consejos y trucos: cómo añadir datos empresariales a los registros de los
    dispositivos de punto de venta'
title: Procesadores
---
## Resumen

<div class="alert alert-info">The processors outlined in this documentation are specific to cloud-based logging environments. To parse, structure, and enrich on-premises logs, see <a href="https://docs.datadoghq.com/observability_pipelines/processors/">Observability Pipelines</a>.</div>

Un procesador se ejecuta dentro de un [Pipeline][1] para llevar a cabo una acción de estructuración de datos y generar atributos que enriquecen tus registros.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Procesadores" style="width:100%" >}}

En [la configuración de los registros][1], puedes configurar procesadores como el [analizador Grok](#grokparser) o el [remapeador de fechas](#remapper) para ayudar a extraer, crear y reasignar atributos con el fin de enriquecer tus registros y mejorar la búsqueda por facetas.

**Notas**:

 Los registros estructurados deben enviarse en un formato válido. Si la estructura contiene caracteres no válidos para el análisis sintáctico, estos deben eliminarse a nivel del agente utilizando la función [mask_sequences][2].

 Como buena práctica, se recomienda utilizar un máximo de 20 procesadores por canalización.

## Analizador Grok

Crea reglas Grok personalizadas para analizar el mensaje completo o un atributo específico de tu evento sin procesar. Como buena práctica, limita tu analizador Grok a 10 reglas de análisis. Para obtener más información sobre la sintaxis y las reglas de análisis sintáctico de Grok, consulta [Análisis sintáctico][10].

{{< img src="/logs/processing/processors/define_parsing_rules_syntax_suggestions.png" alt="Sugerencias de sintaxis del analizador Grok en la interfaz de usuario" style="width:90%;" >}}

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador Grok en la página [**Pipelines**][1]. Para configurar las reglas de análisis de Grok:

1. Haz clic en **Analizar mis registros** para generar automáticamente un conjunto de tres reglas de análisis basadas en los registros que pasan por el canal.
   **Nota**: Esta función requiere que los registros correspondientes estén indexados y se estén recibiendo de forma activa. Puedes desactivar temporalmente los filtros de exclusión o reducir su nivel de filtrado para permitir que la función detecte los registros.
1. **Ejemplos de registros**: Añade hasta cinco ejemplos de registros (de hasta 5000 caracteres cada uno) para probar tus reglas de análisis.
1. **Definir reglas de análisis sintáctico**: Escribe tus reglas de análisis sintáctico en el editor de reglas. A medida que defines reglas, el analizador Grok te ofrece ayuda con la sintaxis:
    **Sugerencias de coincidencia**: Escribe el nombre de una regla seguido de `%{`. Aparece un menú desplegable con los filtros disponibles (como «palabra», «entero», «ip», «fecha»). Selecciona un comparador de la lista para insertarlo en tu regla.<br>
     ```
     MyParsingRule %{
     ```
    **Sugerencias de filtros**: Al añadir un filtro con `:`, aparece un menú desplegable con los filtros compatibles con el comparador seleccionado.
1. **Comprueba tus reglas**: selecciona una muestra haciendo clic en ella para que se evalúe según la regla de análisis sintáctico y se muestre el resultado en la parte inferior de la pantalla. Todas las muestras muestran un estado («coincide» o «no coincide»), que indica si alguna de las reglas del analizador Grok coincide con la muestra.

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON para el analizador Grok:

```json```
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
|||||
| `type`               | Cadena           | Sí      | Tipo del procesador.                                  |
| `nombre`               | Cadena           | No       | Nombre del procesador.                                  |
| `is_enabled`         | Booleano          | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`.  |
| `source`             | Cadena           | Sí      | Nombre del atributo de registro que se va a analizar. Valor predeterminado: `message`. |
| `samples`            | Matriz de cadenas | No       | Lista de (hasta 5) registros de muestra para este analizador Grok.     |
| `grok.support_rules` | Cadena           | Sí      | Lista de reglas de soporte para tu analizador Grok.             |
| `grok.match_rules`   | Cadena           | Sí      | Lista de reglas de coincidencia para tu analizador Grok.               |


[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador de fechas de registro

A medida que Datadog recibe los registros, les asigna una marca de tiempo utilizando los valores de cualquiera de estos atributos predeterminados:

* `marca de tiempo`
* `fecha`
* `_timestamp`
* `Marca de tiempo`
* `eventTime`
* `fecha_de_publicación`

Si tus registros contienen fechas en un atributo que no figuran en esta lista, utiliza el procesador de reasignación de fechas de registro para definir su atributo de fecha como la marca de tiempo oficial del registro:

<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

Si tus registros no tienen una marca de tiempo que se ajuste a los formatos indicados anteriormente, utiliza el procesador Grok para extraer la hora de época de la marca de tiempo y asignarla a un nuevo atributo. El remapeador de fechas utiliza el atributo recién definido.

Para saber cómo se puede analizar un formato personalizado de fecha y hora en Datadog, consulta [Análisis de fechas][3].

**Notas**:

* Los eventos de registro pueden enviarse con una antelación de hasta 18 horas y con una anticipación de hasta dos horas.
* Según la norma ISO 8601-1:2019, el formato básico es `T[hh][mm][ss]` y el formato ampliado es `T[hh]:[mm]:[ss]`. En versiones anteriores se omitía la T (que representa la hora) en ambos formatos.
* Si tus registros no contienen ninguno de los atributos predeterminados y no has definido tu propio atributo de fecha, Datadog les asigna una marca de tiempo con la fecha en que los recibió.
* Si se aplican varios procesadores de reasignación de fechas de registro a un registro concreto dentro del flujo de trabajo, se tiene en cuenta el último (según el orden del flujo de trabajo).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación de fechas de registro en la página [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="Definir un atributo de fecha" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="Fecha y hora en el panel lateral del Explorador de registros" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON para reasignar la fecha de los registros:

```json```
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official Date of the log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                           |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                |
| `nombre`       | Cadena           | no       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | no       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de cadenas | Sí      | Matriz de atributos de origen.                           |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapeador del estado de los registros

Utiliza el procesador de reasignación de estados para asignar atributos como estado oficial a tus registros. Por ejemplo, añade un nivel de gravedad a tus registros con el remapeador de estados.

Cada valor de estado entrante se asigna de la siguiente manera:

* Los números enteros del 0 al 7 se corresponden con los [estándares de gravedad de Syslog][4]
* Las cadenas que comienzan por **emerg** o **f** (sin distinción entre mayúsculas y minúsculas) se asignan a **emerg (0)**
* Las cadenas que comienzan por **a** (sin distinción entre mayúsculas y minúsculas) se asignan a **alert (1)**
* Las cadenas que empiezan por **c** (sin distinción entre mayúsculas y minúsculas) se asignan a **crítico (2)**
* Las cadenas que comienzan por **err** (sin distinción entre mayúsculas y minúsculas) se asignan a **error (3)**
* Las cadenas que comienzan por **w** (sin distinción entre mayúsculas y minúsculas) se asignan a **advertencia (4)**
* Las cadenas que comienzan por **n** (sin distinción entre mayúsculas y minúsculas) se asignan a **notice (5)**
* Las cadenas que empiezan por **i** (sin distinción entre mayúsculas y minúsculas) se asignan a **info (6)**
* Las cadenas que comienzan por **d**, **t**, **v**, **trace** o **verbose** (sin distinción entre mayúsculas y minúsculas) se asignan a **debug (7)**
* Las cadenas que empiecen por **o** o **s**, o que coincidan con **OK** o **Success** (sin distinción entre mayúsculas y minúsculas), se asignan a **OK**
* El resto se asigna a **info (6)**

**Nota**: Si se aplican varios procesadores de reasignación de estado de registros a un registro dentro de un canal, solo se tiene en cuenta el primero en el orden del canal. Además, para todos los flujos de trabajo que coincidan con el registro, solo se aplica el primer remapeador de estado que se encuentre (de entre todos los flujos de trabajo aplicables).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación de estados de registro en la página [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Reasignación de niveles de gravedad de los registros" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON para la reasignación del estado de los registros:

```json```
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official status of the log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                           |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                |
| `nombre`       | Cadena           | No       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de cadenas | Sí      | Matriz de atributos de origen.                           |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapper de servicios

El procesador de reasignación de servicios asigna uno o varios atributos a tus registros en calidad de servicio oficial.

**Nota**: Si se aplican varios procesadores de reasignación de servicios a un registro concreto dentro del flujo de trabajo, solo se tiene en cuenta el primero (según el orden del flujo de trabajo).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación del servicio de registro en la página [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="Procesador de reasignación de servicios" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del remapeador del servicio de registros:

```json```
{
  "type": "service-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official log service",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                           |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                |
| `nombre`       | Cadena           | No       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de cadenas | Sí      | Matriz de atributos de origen.                           |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador de mensajes de registro

«message» es un atributo clave en Datadog. Su valor se muestra en la columna **Contenido** del Explorador de registros para proporcionar contexto sobre el registro. Puedes utilizar la barra de búsqueda para encontrar un registro por su mensaje.

Utilice el procesador de reasignación de mensajes de registro para definir uno o varios atributos como mensaje de registro oficial. Defina más de un atributo para los casos en los que los atributos puedan no existir y haya una alternativa disponible. Por ejemplo, si los atributos de mensaje definidos son `attribute1`, `attribute2` y `attribute3`, y `attribute1` no existe, se utiliza `attribute2`. Del mismo modo, si «attribute2» no existe, se utiliza «attribute3».

Para definir los atributos de los mensajes, utiliza primero el [procesador de creación de cadenas](#stringbuilderprocessor) para crear un nuevo atributo de cadena para cada uno de los atributos que desees utilizar. A continuación, utiliza la herramienta de reasignación de mensajes de registro para reasignar los atributos de la cadena como mensaje.

**Nota**: Si se aplican varios procesadores de reasignación de mensajes de registro a un registro concreto dentro del flujo de trabajo, solo se tiene en cuenta el primero (según el orden del flujo de trabajo).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación de mensajes de registro en la página [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/message_processor.png" alt="Procesador de mensajes" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON para la reasignación de mensajes de registro:

```json```
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official message of the log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                           |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                |
| `nombre`       | Cadena           | No       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de cadenas | Sí      | Matriz de atributos de origen. Valor predeterminado: `msg`.            |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapper

El procesador de reasignación reasigna uno o varios atributos o etiquetas de origen a un atributo o etiqueta de destino diferente. Por ejemplo, puedes reasignar el atributo «user» a «firstname» para normalizar los datos de registro en el Explorador de registros.

Si el destino del remapper es un atributo, el procesador también puede intentar convertir el valor a un nuevo tipo (`String`, `Integer` o `Double`). Si la conversión falla, se conservan el valor y el tipo originales.

**Nota**: El separador decimal para los valores de tipo `Double` debe ser `.`.

### Restricciones de nomenclatura

Los caracteres «:» y «,» no están permitidos en el atributo «target» ni en los nombres de las etiquetas. Además, los nombres de las etiquetas y los atributos deben ajustarse a las convenciones descritas en [Atributos y alias][5].

### Atributos reservados

El procesador Remapper **no se puede utilizar para reasignar atributos reservados de Datadog**. 
 El atributo «host» no se puede reasignar.
 Los siguientes atributos requieren procesadores de reasignación específicos y no se pueden reasignar con el reasignador genérico. Para reasignar cualquiera de los atributos, utiliza en su lugar el reasignador o procesador especializado correspondiente.
    `message`: Remapeador de mensajes de registro
    `service`: Remapeador de servicios
    `status`: Remapeador del estado de registro
    `date`: Remapeador de la fecha de registro
    `trace_id`: Remapeador de trazas
    `span_id`: Remapeador de span

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación en la página [**Pipelines**][1]. Por ejemplo, reasigna «user» a «user.firstname».

{{< img src="logs/log_configuration/processor/remapper.png" alt="Procesador de reasignación de atributos" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON de Remapper:

```json```
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
|||||
| `type`                 | Cadena           | Sí      | Tipo del procesador.                                                         |
| `nombre`                 | Cadena           | No      | Nombre del procesador.                                                         |
| `is_enabled`           | Booleano          | No      | Indica si el procesador está habilitado o no. Valor predeterminado: `false`.                          |
| `source_type`          | Cadena           | No      | Define si las fuentes proceden del `atributo` o de la `etiqueta` del registro. Valor predeterminado: `attribute`. |
| `sources`              | Matriz de cadenas | Sí      | Matriz de atributos o etiquetas de origen                                             |
| `target`               | Cadena           | Sí      | Atributo final o nombre de etiqueta al que se reasignarán las fuentes.                           |
| `target_type`          | Cadena           | No      | Define si el destino es un `atributo` de registro o una `etiqueta`. Valor predeterminado: `attribute`.    |
| `target_format`        | Cadena           | No      | Define si el valor del atributo debe convertirse a otro tipo. Valores posibles: `auto`, `string` o `integer`. Valor predeterminado: `auto`. Cuando se establece en «auto», no se aplica ninguna conversión.  |
| `preserve_source`      | Booleano          | No      | Eliminar o conservar el elemento de origen reasignado. Valor predeterminado: `false`.               |
| `override_on_conflict` | Booleano          | No      | Si se debe anular o no el elemento de destino en caso de que ya esté definido. Valor predeterminado: `false`.            |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Analizador de URL

El procesador de análisis de URL extrae los parámetros de consulta y otros parámetros importantes de una URL. Una vez configurado, se generan los siguientes atributos:

{{< img src="logs/processing/processors/url_processor.png" alt="Procesador de URL" style="width:80%;" >}}

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de análisis de URL en la página [**Pipelines**][1]:

{{< img src="logs/processing/processors/url_processor.png" alt="Mosaico del procesador de URL" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json```
{
  "type": "url-parser",
  "name": "Parse the URL from http.url attribute.",
  "is_enabled": true,
  "sources": ["http.url"],
  "target": "http.url_details"
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                                                                                          |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                                                                               |
| `nombre`       | Cadena           | No       | Nombre del procesador.                                                                                               |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`.                                                                |
| `sources`    | Matriz de cadenas | No       | Matriz de atributos de origen. Valor predeterminado: `http.url`.                                                                      |
| `target`     | Cadena           | Sí      | Nombre del atributo principal que contiene todos los detalles extraídos de las `fuentes`. Valor predeterminado: `http.url_details`. |

{{% /tab %}}
{{< /tabs >}}

## Analizador de UserAgent

El procesador del analizador de useragent toma el atributo `useragent` y extrae datos sobre el sistema operativo, el navegador, el dispositivo y otros datos del usuario. Una vez configurado, se generan los siguientes atributos:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Procesador de User-Agent" style="width:80%;">}}

**Nota**: Si tus registros contienen agentes de usuario codificados (por ejemplo, los registros de IIS), configura este procesador para que **decodifique la URL** antes de analizarla.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de user-agent en la página [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="Mosaico del procesador de User-Agent" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del analizador de user-agent:

```json```
{
  "type": "user-agent-parser",
  "name": "Parses <SOURCE_ATTRIBUTE> to extract all its User-Agent information",
  "is_enabled": true,
  "sources": ["http.useragent"],
  "target": "http.useragent_details",
  "is_encoded": false
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                                                                                                 |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                                                                                      |
| `nombre`       | Cadena           | No       | Nombre del procesador.                                                                                                      |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`.                                                                      |
| `sources`    | Matriz de cadenas | No       | Matriz de atributos de origen. Valor predeterminado: `http.useragent`.                                                                      |
| `target`     | Cadena           | Sí      | Nombre del atributo principal que contiene todos los detalles extraídos de las `fuentes`. Valor predeterminado: `http.useragent_details`. |
| `is_encoded` | Booleano          | No       | Indica si el atributo de origen está codificado como URL o no. Valor predeterminado: `false`.                                                     |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de categorías

<div class="alert alert-danger">To update a category, you must delete the original category and recreate it. You cannot use the Category processor to update an existing category.</div>

Utiliza el procesador de categorías para añadir un nuevo atributo (sin espacios ni caracteres especiales en el nombre del nuevo atributo) a un registro que coincida con la consulta de búsqueda proporcionada. A continuación, utiliza categorías para crear grupos con fines analíticos (por ejemplo, grupos de URL, grupos de máquinas, entornos y intervalos de tiempo de respuesta).

**Notas**:

* La sintaxis de la consulta es la que aparece en la barra de búsqueda de [Log Explorer][6]. Esta consulta se puede realizar sobre cualquier atributo o etiqueta de registro, independientemente de si se trata de una faceta o no. También se pueden utilizar comodines dentro de la consulta.
* Una vez que el registro coincide con una de las consultas del procesador, este se detiene. Asegúrate de que estén ordenadas correctamente, por si un registro pudiera coincidir con varias consultas.
* Los nombres de las categorías deben ser únicos.
* Una vez definidas en el procesador de categorías, puedes asignar categorías a los estados de registro mediante el [remapeador de estados de registro](#logstatusremapper).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de categorías en la página [**Pipelines**][1]. Por ejemplo, para clasificar tus registros de acceso web en función del rango de códigos de estado (»OK« para códigos de respuesta entre 200 y 299, »Aviso« para códigos de respuesta entre 300 y 399, ...), añade este procesador:

{{< img src="logs/log_configuration/processor/category_processor.png" alt="procesador de categorías" style="width:80%;" >}}

Este procesador genera el siguiente resultado:

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="categoría, procesador, resultado" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de categorías:

```json```
{
  "type": "category-processor",
  "name": "Assign a custom value to the <TARGET_ATTRIBUTE> attribute",
  "is_enabled": true,
  "categories": [
    {"filter": {"query": "<QUERY_1>"}, "name": "<VALUE_TO_ASSIGN_1>"},
    {"filter": {"query": "<QUERY_2>"}, "name": "<VALUE_TO_ASSIGN_2>"}
  ],
  "target": "<TARGET_ATTRIBUTE>"
}
```

| Parámetro    | Tipo            | Obligatorio | Descripción                                                                                                |
|||||
| `type`       | Cadena          | Sí      | Tipo del procesador.                                                                                     |
| `nombre`       | Cadena          | No       | Nombre del procesador.                                                                                     |
| `is_enabled` | Booleano         | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`                                                      |
| `categories` | Matriz de objetos | Sí      | Matriz de filtros para determinar si un registro cumple o no los criterios, junto con su correspondiente `name`, para asignar un valor personalizado al registro. |
| `target`     | Cadena          | Sí      | Nombre del atributo de destino cuyo valor viene definido por la categoría correspondiente.                              |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador aritmético

Utiliza el procesador aritmético para añadir un nuevo atributo (sin espacios ni caracteres especiales en el nombre del nuevo atributo) a un registro con el resultado de la fórmula proporcionada. Esto reasigna diferentes atributos temporales con distintas unidades a un único atributo, o realiza operaciones de cálculo sobre los atributos dentro del mismo registro.

Una fórmula del procesador aritmético puede utilizar paréntesis y operadores aritméticos básicos: ``, `+`, `*`, `/`.

Por defecto, se omite un cálculo si falta algún atributo. Seleccione «Reemplazar los atributos que faltan por 0» para rellenar automáticamente con un 0 los valores de los atributos que faltan y garantizar así que se realice el cálculo.

**Notas**:

* Un atributo puede aparecer como «faltante» si no se encuentra entre los atributos del registro o si no se puede convertir en un número.
* Cuando utilices el operador ``, añade espacios a ambos lados, ya que los nombres de atributos como `starttime` pueden contener guiones. Por ejemplo, la siguiente fórmula debe incluir espacios a ambos lados del operador ``: `(endtime  starttime) / 1000`.
* Si el atributo de destino ya existe, se sobrescribe con el resultado de la fórmula.
* Los resultados se redondean al noveno decimal. Por ejemplo, si el resultado de la fórmula es `0.1234567891`, el valor real almacenado para el atributo es `0.123456789`.
* Si necesitas escalar una unidad de medida, utiliza el filtro de escala.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador aritmético en la página [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="Procesador aritmético" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del procesador aritmético:

```json```
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
|||||
| `type`               | Cadena  | Sí      | Tipo del procesador.                                                                                                                       |
| `name`               | Cadena  | No       | Nombre del procesador.                                                                                                                       |
| `is_enabled`         | Booleano | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`.                                                                                       |
| `expresión`         | Cadena  | Sí      | Operación aritmética entre uno o más atributos de registro.                                                                                     |
| `target`             | Cadena  | Sí      | Nombre del atributo que contiene el resultado de la operación aritmética.                                                                  |
| `is_replace_missing` | Booleano | No       | Si es `true`, sustituye todos los atributos que faltan en `expression` por 0; si es `false`, omite la operación si falta algún atributo. Valor predeterminado: `false`. |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de construcción de cadenas

Utiliza el procesador de cadenas para añadir un nuevo atributo (sin espacios ni caracteres especiales) a un registro con el resultado de la plantilla proporcionada. Esto permite agrupar diferentes atributos o cadenas sin procesar en un único atributo.

La plantilla se define mediante texto sin formato y bloques con la sintaxis `%{attribute_path}`.

**Notas**:

* Este procesador solo admite atributos con valores o una matriz de valores en el bloque (véanse los ejemplos en la sección de interfaz de usuario más abajo).
* Si no se puede utilizar un atributo (objeto o matriz de objetos), se sustituye por una cadena vacía o se omite toda la operación, según la opción que hayas seleccionado.
* Si un atributo de destino ya existe, se sobrescribe con el resultado de la plantilla.
* Los resultados de una plantilla no pueden superar los 256 caracteres.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de cadena en la página [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="Procesador de cadenas" style="width:80%;">}}

Con el siguiente registro, utiliza la plantilla «La solicitud %{http.method} %{http.url} se respondió con el código de estado %{http.status_code}» para obtener un resultado. Por ejemplo:


```json```
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

```texto
Request GET https://app.datadoghq.com/users was answered with response 200
```

**Nota**: `http` es un objeto y no se puede utilizar dentro de un bloque (`%{http}` da error), mientras que `%{http.method}`, `%{http.status_code}` o `%{http.url}` devuelven el valor correspondiente. Los bloques se pueden aplicar a matrices de valores o a un atributo específico dentro de una matriz.

* Por ejemplo, al añadir el bloque `%{array_ids}` se obtiene:

   ```texto
   123,456,789
   ```

* `%{array_users}` no devuelve ningún valor porque es una lista de objetos. Sin embargo, `%{array_users.first_name}` devuelve una lista de los nombres contenidos en la matriz:

  ```texto
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del procesador String Builder:

```json```
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
|||||
| `type`               | Cadena  | Sí      | Tipo del procesador.                                                                                                                            |
| `name`               | Cadena  | No       | Nombre del procesador.                                                                                                                            |
| `is_enabled`         | Booleano | No       | Indica si el procesador está habilitado o no; el valor predeterminado es `false`.                                                                                          |
| `plantilla`           | Cadena  | Sí      | Una fórmula con uno o más atributos y texto sin formato.                                                                                               |
| `target`             | Cadena  | Sí      | El nombre del atributo que contiene el resultado de la plantilla.                                                                               |
| `is_replace_missing` | Booleano | No       | Si es `true`, sustituye todos los atributos que faltan en `template` por una cadena vacía. Si es «false», se omite la operación para los atributos que faltan. Valor predeterminado: `false`. |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Analizador GeoIP

El analizador geoIP toma un atributo de dirección IP y extrae información sobre el continente, el país, la subdivisión o la ciudad (si está disponible) en la ruta del atributo de destino.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="Procesador GeoIP" style="width:80%;">}}

La mayoría de los elementos contienen los atributos «name» e «iso_code» (o «code» en el caso de los continentes). «subdivisión» es el primer nivel de subdivisión que utiliza el país, como «estados» en el caso de Estados Unidos o «departamentos» en el caso de Francia.

Por ejemplo, el analizador geoIP extrae la ubicación del atributo `network.client.ip` y la almacena en el atributo `network.client.geoip`:

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="Ejemplo de GeoIP" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del analizador geoIP:

```json```
{
  "type": "geo-ip-parser",
  "name": "Parse the geolocation elements from network.client.ip attribute.",
  "is_enabled": true,
  "sources": ["network.client.ip"],
  "target": "network.client.geoip"
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                                                                                               |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                                                                                    |
| `nombre`       | Cadena           | No       | Nombre del procesador.                                                                                                    |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`.                                                                     |
| `sources`    | Matriz de cadenas | No       | Matriz de atributos de origen. Valor predeterminado: `network.client.ip`.                                                                  |
| `target`     | Cadena           | Sí      | Nombre del atributo principal que contiene todos los detalles extraídos de las `fuentes`. Valor predeterminado: `network.client.geoip`.  |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de búsqueda

Utilice el procesador de búsqueda para definir una correspondencia entre un atributo de registro y un valor legible por el usuario guardado en una [tabla de referencia][7] o en la tabla de correspondencias del procesador.

Por ejemplo, puedes utilizar el procesador de búsqueda para asignar un identificador interno de servicio a un nombre de servicio legible para las personas. También puedes utilizarlo para comprobar si la dirección MAC que acaba de intentar conectarse al entorno de producción figura en tu lista de equipos robados.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

El procesador de búsqueda realiza las siguientes acciones:

* Comprueba si el registro actual contiene el atributo «source».
* Comprueba si el valor del atributo de origen existe en la tabla de correspondencias.
  * Si es así, crea el atributo «target» con el valor correspondiente en la tabla.
  * Opcionalmente, si no encuentra el valor en la tabla de correspondencias, crea un atributo de destino con el valor predeterminado establecido en el campo `fallbackValue`. En la pestaña **Asignación manual**, puedes introducir manualmente una lista de pares `clave_de_origen,valor_de_destino` o cargar un archivo CSV.

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Procesador de búsqueda" style="width:80%;">}}

    The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.

  * Opcionalmente, si no encuentra el valor en la tabla de correspondencias, crea un atributo de destino con el valor de la tabla de referencia. Puede seleccionar un valor para una [tabla de referencia][101] en la pestaña **Tabla de referencia**.

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Procesador de búsqueda"
    style="width:80%;">}}


[101]: /es/integraciones/guía/tablas-de-referencia/

{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de búsqueda:

```json```
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
|||||
| `type`           | Cadena           | Sí      | Tipo del procesador.                                                                                                                                                   |
| `nombre`           | Cadena           | No       | Nombre del procesador.                                                                                                                                                   |
| `is_enabled`     | Booleano          | Sí      | Indica si el procesador está habilitado o no. Valor predeterminado: `false`.                                                                                                                     |
| `source`         | Cadena           | Sí      | Atributo de origen utilizado para realizar la búsqueda.                                                                                                                             |
| `target`         | Cadena           | Sí      | Nombre del atributo que contiene el valor correspondiente en la lista de asignaciones o en `default_lookup` si no se encuentra en la lista de asignaciones.                                |
| `lookup_table`   | Matriz de cadenas | Sí      | Tabla de correspondencias entre los valores del atributo de origen y los valores del atributo de destino asociados, con el formato [ "clave_origen1,valor_destino1", "clave_origen2,valor_destino2" ]. |
| `default_lookup` | Cadena           | No       | Valor con el que se establece el atributo de destino si el valor de origen no se encuentra en la lista.                                                                                          |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapeador de trazas

Hay dos formas de definir la correlación entre los rastros de la aplicación y los registros:

1. Siga las instrucciones de la documentación sobre [cómo insertar un ID de seguimiento en los registros de la aplicación][8]. Por defecto, las integraciones de registros se encargan automáticamente de todos los pasos de configuración restantes.

2. Utilice el procesador de reasignación de trazas para definir un atributo de registro como su ID de traza asociado.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador de reasignación de trazas en la página [**Pipelines**][1]. Introduzca la ruta del atributo «Trace ID» en el mosaico del procesador de la siguiente manera:

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="Procesador de identificadores de traza" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del remapeador de trazas:

```json```
{
  "type": "trace-id-remapper",
  "name": "Define dd.trace_id as the official trace id associate to this log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                            |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                 |
| `nombre`       | Cadena           | No       | Nombre del procesador.                                 |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de cadenas | No       | Matriz de atributos de origen. Valor predeterminado: `dd.trace_id`.    |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

**Nota**: Los ID de rastreo y los ID de intervalo no aparecen en los registros ni en los atributos de los registros de la interfaz de usuario.

## Remapeador de intervalos

Hay dos formas de definir la correlación entre los intervalos de las aplicaciones y los registros:

1. Siga las instrucciones de la documentación sobre [cómo insertar un ID de Span en los registros de la aplicación][8]. Por defecto, las integraciones de registros se encargan automáticamente de todos los pasos de configuración restantes.

2. Utiliza el procesador de reasignación de intervalos para definir un atributo de registro como su ID de intervalo asociado.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación de intervalos en la página [**Pipelines**][1]. Introduzca la ruta del atributo Span ID en el mosaico del procesador de la siguiente manera:

{{< img src="logs/log_configuration/processor/span_id_remapper.png" alt="Procesador Span ID" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON para la reasignación de spans:

```json```
{
  "type": "span-id-remapper",
  "name": "Define dd.span_id as the official span id associate to this log",
  "is_enabled": true,
  "sources": ["dd.span_id"]
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                            |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                 |
| `nombre`       | Cadena           | No       | Nombre del procesador.                                 |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado. Valor predeterminado: `false`. |
| `sources`    | Matriz de cadenas | No       | Matriz de atributos de origen. Valor predeterminado: `dd.trace_id`.    |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

**Nota**: Los ID de rastreo y los ID de intervalo no aparecen en los registros ni en los atributos de los registros de la interfaz de usuario.

## Procesador de matrices

Utiliza el procesador de matrices para extraer, agregar o transformar valores de matrices JSON en tus registros.

Las operaciones compatibles son las siguientes:

 **Seleccionar el valor de un elemento coincidente**
 **Calcular la longitud de una matriz**
 **Añadir un valor a una matriz**

Cada operación se configura mediante un procesador específico.

Define el procesador de matrices en la página [**Pipelines**][1].


### Seleccionar el valor del elemento correspondiente

Extraer un valor concreto de un objeto dentro de una matriz cuando cumpla una condición.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/array_processor_select_value.png" alt="Procesador de matrices  Seleccionar valor del elemento" style="width:80%;" >}}

**Ejemplo de entrada:**

```json```
{
  "httpRequest": {
    "headers": [
      {"name": "Referrer", "value": "https://example.com"},
      {"name": "Accept", "value": "application/json"}
    ]
  }
}
```

**Pasos de configuración:**

 **Ruta de la matriz**: `httpRequest.headers`
 **Condición**: `name:Referrer`
 **Extraer el valor de**: `value`
 **Atributo de destino**: `referrer`

**Resultado:**

```json```
{
  "httpRequest": {
    "headers": [...]
  },
  "referrer": "https://example.com"
}
```

{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de matrices:

```json```
{
  "type": "array-processor",
  "name": "Extract Referrer URL",
  "is_enabled": true,
  "operation" : {
    "type" : "select",
    "source": "httpRequest.headers",
    "target": "referrer",
    "filter": "name:Referrer",
    "value_to_extract": "value"
  }
}
```

| Parámetro    | Tipo             | Obligatorio | Descripción                                                   |
|||||
| `type`       | Cadena           | Sí      | Tipo del procesador.                                        |
| `nombre`       | Cadena           | No       | Nombre del procesador.                                        |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado. Valor predeterminado: `false`.        |
| `operation.type`  | Cadena      | Sí      | Tipo de operación del procesador de matrices.                            |
| `operation.source`  | Cadena    | Sí      | Ruta de la matriz de la que se desea seleccionar.                    |
| `operation.target`  | Cadena    | Sí      | Atributo de destino.                                             |
| `operation.filter`  | Cadena    | Sí      | Expresión para buscar coincidencias en un elemento de la matriz. Se selecciona el primer elemento coincidente. |
| `operation.value_to_extract`  | Cadena | Sí | Atributo que se va a leer en el elemento seleccionado.                  |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

### Longitud de la matriz

Calcula el número de elementos de una matriz.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/array_processor_length.png" alt="Procesador matricial  Longitud" style="width:80%;" >}}

**Ejemplo de entrada:**

```json```
{
  "tags": ["prod", "internal", "critical"]
}
```

**Pasos de configuración:**

 **Atributo de matriz**: `tags`
 **Atributo de destino**: `tagCount`

**Resultado:**

```json```
{
  "tags": ["prod", "internal", "critical"],
  "tagCount": 3
}
```
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de matrices:

```json```
{
  "type": "array-processor",
  "name": "Compute number of tags",
  "is_enabled": true,
  "operation" : {
    "type" : "length",
    "source": "tags",
    "target": "tagCount"
  }
}
```

| Parámetro           | Tipo      | Obligatorio | Descripción                                                   |
|||||
| `type`              | Cadena    | Sí      | Tipo del procesador.                                        |
| `name`              | Cadena    | No       | Nombre del procesador.                                        |
| `is_enabled`        | Booleano   | No       | Indica si el procesador está habilitado. Valor predeterminado: `false`.        |
| `operation.type`    | Cadena    | Sí      | Tipo de operación del procesador de matrices.                            |
| `operation.source`  | Cadena    | Sí      | Ruta de la matriz de la que se va a extraer la longitud.                   |
| `operation.target`  | Cadena    | Sí      | Atributo de destino.                                             |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

### Añadir elementos al final de una matriz

Añade un valor de atributo al final de un atributo de matriz de destino en el registro.

**Nota**: Si el atributo de la matriz de destino no existe en el registro, se crea automáticamente.


{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/array_processor_append.png" alt="Procesador de matrices  Añadir" style="width:80%;" >}}

**Ejemplo de entrada:**

```json```
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1"]
}

```
**Pasos de configuración:**

 **Atributo que se va a añadir**: `"network.client.ip"`
 **Matriz a la que añadir**: `sourceIps`

**Resultado:**

```json```
{
  "network": {
    "client": {
      "ip": "198.51.100.23"
    }
  },
  "sourceIps": ["203.0.113.1", "198.51.100.23"]
}
```
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de matrices:

```json```
{
  "type": "array-processor",
  "name": "Append client IP to sourceIps",
  "is_enabled": true,
  "operation" : {
    "type" : "append",
    "source": "network.client.ip",
    "target": "sourceIps"
  }
}
```

| Parámetro                    | Tipo       | Obligatorio | Descripción                                                        |
|||||
| `type`                       | Cadena     | Sí      | Tipo del procesador.                                             |
| `name`                       | Cadena     | No       | Nombre del procesador.                                             |
| `is_enabled`                 | Booleano    | No       | Indica si el procesador está habilitado. Valor predeterminado: `false`.             |
| `operation.type`             | Cadena     | Sí      | Tipo de operación del procesador de matrices.                                 |
| `operation.source`           | Cadena     | Sí      | Atributo que se va a añadir.                                               |
| `operation.target`           | Cadena     | Sí      | Matriz a la que se va a añadir el atributo.                                      |
| `operation.preserve_source`  | Booleano    | No      | Indica si se debe conservar la fuente original tras la reasignación. Valor predeterminado: `false`.   |

[1]: /es/api/v1/logspipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador decodificador

El procesador Decoder convierte los campos de cadena codificados de «binarytotext» (como Base64 o Hex/Base16) a su representación original. Esto permite interpretar los datos en su contexto original, ya sea como una cadena UTF-8, un comando ASCII o un valor numérico (por ejemplo, un entero derivado de una cadena hexadecimal). El procesador Decoder resulta especialmente útil para analizar comandos codificados, registros de sistemas específicos o técnicas de evasión empleadas por los autores de amenazas.

**Notas**:

 Cadenas truncadas: el procesador gestiona correctamente las cadenas Base64/Base16 parcialmente truncadas, recortándolas o rellenándolas según sea necesario.

 Formato hexadecimal: Los datos introducidos en formato hexadecimal pueden decodificarse como una cadena (UTF-8) o como un número entero.

 Gestión de errores: si falla la decodificación (debido a una entrada no válida), el procesador omite la transformación y el registro permanece sin cambios

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

1. Configura el atributo «source»: indica la ruta del atributo que contiene la cadena codificada, como `encoded.base64`.
2. Selecciona la codificación de origen: elige la codificación de texto binario del origen: `base64` o `base16/hex`.
2. Para «Base16/Hex»: Elige el formato de salida: «cadena (UTF-8)» o «entero».
3. Configure el atributo de destino: introduzca la ruta del atributo donde se guardará el resultado descodificado.

{{< img src="logs/log_configuration/processor/decoder-processor.png" alt="Procesador decodificador  Añadir" style="width:80%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Procesador de inteligencia sobre amenazas

Añade el procesador de inteligencia sobre amenazas para evaluar los registros en función de la tabla utilizando una clave específica de indicador de compromiso (IoC), como una dirección IP. Si se encuentra una coincidencia, el registro se completa con los atributos pertinentes de inteligencia sobre amenazas (TI) de la tabla, lo que mejora la detección, la investigación y la respuesta.

Para obtener más información, consulte [Inteligencia sobre amenazas][9].

## Procesador OCSF

Utilice el procesador OCSF para normalizar sus registros de seguridad de acuerdo con el [Open Cybersecurity Schema Framework (OCSF)][11]. El procesador OCSF te permite crear asignaciones personalizadas que reasignan los atributos de tus registros a clases del esquema OCSF y a sus atributos correspondientes, incluidos los atributos enumerados (ENUM).

El procesador te permite:

 Asignar los atributos de origen del registro a los atributos de destino de OCSF
 Configurar los atributos ENUM con valores numéricos específicos
 Crear subpipelines para las diferentes clases de eventos de destino de OCSF
 Preprocesar los registros antes de la reasignación de OCSF

Para obtener instrucciones detalladas de instalación, ejemplos de configuración y orientación para la resolución de problemas, consulte [OCSF Processor][12].

## Lecturas recomendadas

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /es/logs/log_configuration/pipelines/
[2]: /es/agent/logs/advanced_log_collection/?tab=configurationfile#eliminar_datos_sensibles_de_tus_registros
[3]: /es/logs/log_configuration/parsing/?tab=matchers#parsingdates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /es/logs/log_configuration/convencion_de_denominacion_de_atributos/
[6]: /es/logs/search_syntax/
[7]: /es/integraciones/guía/tablas-de-referencia/
[8]: /es/rastreo/otra_telemetría/registros_de_conexión_y_rastreos/
[9]: /es/seguridad/inteligencia_sobre_amenazas/
[10]: /es/logs/log_configuration/parsing/?tab=matchers
[11]: /es/seguridad/siem_en_la_nube/ingesta_y_enriquecimiento/marco_de_esquemas_de_ciberseguridad_abierto/
[12]: /es/seguridad/cloud_siem/ingesta_y_enriquecimiento/marco_de_esquemas_de_ciberseguridad_abierto/procesador_ocsf/