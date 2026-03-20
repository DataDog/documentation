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
description: Analiza tus registros utilizando el Procesador Grok
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Descubre los Pipelines de Datadog
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Registro sin Límites*
- link: /logs/explorer/
  tag: Documentation
  text: Aprende cómo explorar tus registros
- link: https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s
  tag: Video
  text: 'Consejos y trucos: Agrega datos comerciales a los registros desde puntos
    finales de venta'
title: Procesadores
---
## Resumen

<div class="alert alert-info">Los procesadores descritos en esta documentación son específicos para entornos de registro basados en la nube. Para analizar, estructurar y enriquecer registros locales, consulta <a href="https://docs.datadoghq.com/observability_pipelines/processors/">Pipelines de Observabilidad</a>.</div>

Un procesador se ejecuta dentro de un [Pipeline][1] para completar una acción de estructuración de datos y generar atributos para enriquecer tus registros.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Procesadores" style="width:100%" >}}

En [configuraciones de registro][1], puedes configurar procesadores como el [parser Grok](#grok-parser) o [remapeador de fechas](#remapper) para ayudar a extraer, crear y remapear atributos para enriquecer tus registros y mejorar la búsqueda facetada.

**Notas**:

- Los registros estructurados deben ser enviados en un formato válido. Si la estructura contiene caracteres inválidos para el análisis, estos deben ser eliminados a nivel del Agente utilizando la función [mask_sequences][2].

- Como mejor práctica, se recomienda utilizar un máximo de 20 procesadores por pipeline.

## Parser Grok

Crea reglas grok personalizadas para analizar el mensaje completo o un atributo específico de tu evento en bruto. Como mejor práctica, limita tu parser grok a 10 reglas de análisis. Para más información sobre la sintaxis de Grok y las reglas de análisis, consulte [Análisis][10].

{{< img src="/logs/processing/processors/define_parsing_rules_syntax_suggestions.png" alt="Sugerencias de sintaxis del analizador Grok en la interfaz de usuario" style="width:90%;" >}}

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador Grok en la página [**Pipelines**][1]. Para configurar las reglas de análisis de Grok:

1. Haga clic en **Analizar mis registros** para generar automáticamente un conjunto de tres reglas de análisis basadas en los registros que fluyen a través del pipeline.
   **Nota**: Esta función requiere que los registros correspondientes estén indexados y fluyan activamente. Puede desactivar temporalmente o reducir los filtros de exclusión para permitir que la función detecte registros.
1. **Muestras de registros**: Agregue hasta cinco registros de muestra (de hasta 5000 caracteres cada uno) para probar sus reglas de análisis.
1. **Definir reglas de análisis**: Escriba sus reglas de análisis en el editor de reglas. A medida que define reglas, el analizador Grok proporciona asistencia de sintaxis:
   - **Sugerencias de coincidencia**: Escriba un nombre de regla seguido de `%{`. Aparece un menú desplegable con los matchers disponibles (como `word`, `integer`, `ip`, `date`). Seleccione un matcher de la lista para insertarlo en su regla.<br>
     ```
     MyParsingRule %{
     ```
   - **Sugerencias de filtro**: Al agregar un filtro con `:`, un menú desplegable muestra filtros compatibles para el matcher seleccionado.
1. **Pruebe sus reglas**: Seleccione una muestra haciendo clic en ella para activar su evaluación contra la regla de análisis y mostrar el resultado en la parte inferior de la pantalla. Todas las muestras muestran un estado (`match` o `no match`), que resalta si una de las reglas de análisis del analizador Grok coincide con la muestra.

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilice el [punto final de la API del Pipeline de Registros de Datadog][1] con la siguiente carga JSON del analizador Grok:

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

| Parámetro            | Tipo             | Requerido | Descripción                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | Cadena           | Sí      | Tipo del procesador.                                  |
| `name`               | Cadena           | No       | Nombre del procesador.                                  |
| `is_enabled`         | Booleano          | No       | Si el procesador está habilitado o no. Predeterminado: `false`.  |
| `source`             | Cadena           | Sí      | Nombre del atributo de registro a analizar. Predeterminado: `message`. |
| `samples`            | Arreglo de cadenas | No       | Lista de (hasta 5) registros de muestra para este analizador grok.     |
| `grok.support_rules` | Cadena           | Sí      | Lista de reglas de soporte para su analizador grok.             |
| `grok.match_rules`   | Cadena           | Sí      | Lista de reglas de coincidencia para su analizador grok.               |


[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapeador de fecha de registro

A medida que Datadog recibe registros, les asigna una marca de tiempo utilizando el/los valor(es) de cualquiera de estos atributos predeterminados:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si tus registros tienen fechas en un atributo que no están en esta lista, utiliza el procesador de remapeo de fechas de registro para definir su atributo de fecha como la marca de tiempo oficial del registro:

<div class="alert alert-info">
Los formatos de fecha reconocidos son: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (el formato de milisegundos EPOCH)</a>, y <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

Si tus registros no tienen una marca de tiempo que se ajuste a los formatos listados arriba, utiliza el procesador grok para extraer el tiempo epoch de la marca de tiempo a un nuevo atributo. El remapeador de fechas utiliza el nuevo atributo definido.

Para ver cómo se puede analizar un formato de fecha y hora personalizado en Datadog, consulta [Analizando fechas][3].

**Notas**:

* Los eventos de registro pueden ser enviados hasta 18 horas en el pasado y dos horas en el futuro.
* A partir de ISO 8601-1:2019, el formato básico es `T[hh][mm][ss]` y el formato extendido es `T[hh]:[mm]:[ss]`. Las versiones anteriores omitían la T (que representa el tiempo) en ambos formatos.
* Si tus registros no contienen ninguno de los atributos predeterminados y no has definido tu propio atributo de fecha, Datadog marca los registros con la fecha en que los recibió.
* Si se aplican múltiples procesadores de remapeo de fechas de registro a un registro dado dentro de la canalización, se toma en cuenta el último (de acuerdo con el orden de la canalización).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de remapeo de fechas de registro en la página [**Canalizaciones**][1]:

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="Define un atributo de fecha" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="Fecha y hora en el panel lateral del Explorador de Registros" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Canalización de Registros de Datadog][1] con la siguiente carga JSON del remapeador de fechas de registro:

```json
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official Date of the log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

| Parámetro    | Tipo             | Requerido | Descripción                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo del procesador.                                |
| `name`       | Cadena           | no       | Nombre del procesador.                                |
| `is_enabled` | Booleano         | no       | Si el procesador está habilitado o no. Predeterminado: `false`. |
| `sources`    | Arreglo de cadenas | Sí      | Arreglo de atributos de origen.                           |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapeador de estado de registro

Utilice el procesador remapeador de estado para asignar atributos como un estado oficial a sus registros. Por ejemplo, agregue un nivel de severidad de registro a sus registros con el remapeador de estado.

Cada valor de estado entrante se mapea de la siguiente manera:

* Enteros del 0 al 7 se mapean a los [estándares de severidad de Syslog][4]
* Cadenas que comienzan con **emerg** o **f** (sin importar mayúsculas o minúsculas) se mapean a **emerg (0)**
* Cadenas que comienzan con **a** (sin importar mayúsculas o minúsculas) se mapean a **alerta (1)**
* Cadenas que comienzan con **c** (sin importar mayúsculas o minúsculas) se mapean a **crítico (2)**
* Cadenas que comienzan con **err** (sin importar mayúsculas o minúsculas) se mapean a **error (3)**
* Cadenas que comienzan con **w** (sin importar mayúsculas o minúsculas) se mapean a **advertencia (4)**
* Cadenas que comienzan con **n** (sin importar mayúsculas o minúsculas) se mapean a **noticia (5)**
* Cadenas que comienzan con **i** (sin importar mayúsculas o minúsculas) se mapean a **info (6)**
* Cadenas que comienzan con **d**, **t**, **v**, **traza**, o **verbose** (sin importar mayúsculas o minúsculas) se mapean a **debug (7)**
* Cadenas que comienzan con **o** o **s**, o que coinciden con **OK** o **Éxito** (sin importar mayúsculas o minúsculas) se mapean a **OK**
* Todos los demás se mapean a **info (6)**

**Nota**: Si se aplican múltiples procesadores remapeadores de estado de registro a un registro dentro de un pipeline, solo se considera el primero en el orden del pipeline. Además, para todos los pipelines que coincidan con el registro, solo se aplica el primer remapeador de estado encontrado (de todos los pipelines aplicables).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador remapeador de estado del registro en la página de [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Remapeo de severidad del registro" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del remapeador de estado del registro:

```json
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official status of the log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parámetro    | Tipo             | Requerido | Descripción                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo del procesador.                                |
| `name`       | Cadena           | No       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | No       | Si el procesador está habilitado o no. Predeterminado: `false`. |
| `sources`    | Arreglo de cadenas | Sí      | Arreglo de atributos de origen.                           |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapeador de servicio

El procesador remapeador de servicio asigna uno o más atributos a tus registros como el servicio oficial.

**Nota**: Si se aplican múltiples procesadores remapeadores de servicio a un registro dado dentro del pipeline, solo se toma en cuenta el primero (según el orden del pipeline).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador remapeador de servicio del registro en la página de [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="Procesador remapeador de servicio" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del remapeador de servicio del registro:

```json
{
  "type": "service-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official log service",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parámetro    | Tipo             | Requerido | Descripción                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo del procesador.                                |
| `name`       | Cadena           | No       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | No       | Si el procesador está habilitado o no. Predeterminado: `false`. |
| `sources`    | Arreglo de cadenas | Sí      | Arreglo de atributos de origen.                           |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapeador de mensaje del registro

`message` es un atributo clave en Datadog. Su valor se muestra en la columna **Contenido** del Explorador de Registros para proporcionar contexto sobre el registro. Puedes usar la barra de búsqueda para encontrar un registro por el mensaje del registro.

Utiliza el procesador remapeador de mensaje del registro para definir uno o más atributos como el mensaje oficial del registro. Define más de un atributo para los casos en que los atributos pueden no existir y hay una alternativa disponible. Por ejemplo, si los atributos de mensaje definidos son `attribute1`, `attribute2` y `attribute3`, y `attribute1` no existe, entonces se utiliza `attribute2`. De manera similar, si `attribute2` no existe, entonces se utiliza `attribute3`.

Para definir atributos de mensaje, primero utiliza el [procesador generador de cadenas](#string-builder-processor) para crear un nuevo atributo de cadena para cada uno de los atributos que deseas usar. Luego, utiliza el remapeador de mensajes de registro para remapear los atributos de cadena como el mensaje.

**Nota**: Si se aplican múltiples procesadores de remapeo de mensajes de registro a un registro dado dentro de la canalización, solo se toma en cuenta el primero (según el orden de la canalización).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de remapeo de mensajes de registro en la página de [**Canalizaciones**][1]:

{{< img src="logs/log_configuration/processor/message_processor.png" alt="Procesador de mensajes" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Canalización de Registros de Datadog][1] con la siguiente carga JSON del remapeador de mensajes de registro:

```json
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official message of the log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| Parámetro    | Tipo             | Requerido | Descripción                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo del procesador.                                |
| `name`       | Cadena           | No       | Nombre del procesador.                                |
| `is_enabled` | Booleano          | No       | Si el procesador está habilitado o no. Predeterminado: `false`. |
| `sources`    | Array de cadenas | Sí      | Array de atributos de origen. Por defecto: `msg`.            |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapeador

El procesador de remapeo remapea uno o más atributo(s) o etiquetas de origen a un atributo o etiqueta de destino diferente. Por ejemplo, puedes remapear el atributo `user` a `firstname` para normalizar los datos de registro en el Explorador de Registros.

Si el destino del remapeo es un atributo, el procesador también puede intentar convertir el valor a un nuevo tipo (`String`, `Integer` o `Double`). Si la conversión falla, se preservan el valor y el tipo originales.

**Nota**: El separador decimal para los valores de `Double` debe ser `.`.

### Restricciones de nomenclatura

Los caracteres `:` y `,` no están permitidos en los nombres de atributos o etiquetas de destino. Además, los nombres de etiquetas y atributos deben seguir las convenciones descritas en [Atributos y Alias][5].

### Atributos reservados

El procesador de Remapeo **no puede ser utilizado para remapear atributos reservados de Datadog**. 
- El atributo `host` no puede ser reasignado.
- Los siguientes atributos requieren procesadores de reasignación dedicados y no pueden ser reasignados con el Reasignador genérico. Para reasignar cualquiera de los atributos, utiliza el reasignador o procesador especializado correspondiente.
   - `message`: Reasignador de mensajes de registro
   - `service`: Reasignador de servicio
   - `status`: Reasignador de estado de registro
   - `date`: Reasignador de fecha de registro
   - `trace_id`: Reasignador de trazas
   - `span_id`: Reasignador de intervalos

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación en la página [**Pipelines**][1]. Por ejemplo, reasigna `user` a `user.firstname`.

{{< img src="logs/log_configuration/processor/remapper.png" alt="Procesador de reasignación de atributos" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del Reasignador:

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

| Parámetro              | Tipo             | Requerido | Descripción                                                                    |
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 | Cadena           | Sí      | Tipo del procesador.                                                         |
| `name`                 | Cadena           | No      | Nombre del procesador.                                                         |
| `is_enabled`           | Booleano          | No      | Si el procesador está habilitado o no. Predeterminado: `false`.                          |
| `source_type`          | Cadena           | No      | Define si las fuentes son de registro `attribute` o `tag`. Predeterminado: `attribute`. |
| `sources`              | Array de cadenas | Sí      | Array de atributos o etiquetas de origen                                             |
| `target`               | Cadena           | Sí      | Nombre del atributo o etiqueta final para remapear las fuentes.                           |
| `target_type`          | Cadena           | No      | Define si el destino es un registro `attribute` o un `tag`. Predeterminado: `attribute`.    |
| `target_format`        | Cadena           | No      | Define si el valor del atributo debe ser convertido a otro tipo. Valores posibles: `auto`, `string` o `integer`. Predeterminado: `auto`. Cuando se establece en `auto`, no se aplica ninguna conversión.  |
| `preserve_source`      | Booleano          | No      | Eliminar o preservar el elemento de fuente remapeado. Predeterminado: `false`.               |
| `override_on_conflict` | Booleano          | No      | Sobrescribir o no el elemento de destino si ya está establecido. Predeterminado: `false`.            |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Analizador de URL

El procesador de analizador de URL extrae parámetros de consulta y otros parámetros importantes de una URL. Cuando se configura, se producen los siguientes atributos:

{{< img src="logs/processing/processors/url_processor.png" alt="Procesador de URL" style="width:80%;" >}}

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de análisis de URL en la página de [**Pipelines**][1]:

{{< img src="logs/processing/processors/url_processor.png" alt="Tile del procesador de URL" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "url-parser",
  "name": "Parse the URL from http.url attribute.",
  "is_enabled": true,
  "sources": ["http.url"],
  "target": "http.url_details"
}
```

| Parámetro    | Tipo             | Requerido | Descripción                                                                                                          |
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo del procesador.                                                                                               |
| `name`       | Cadena           | No       | Nombre del procesador.                                                                                               |
| `is_enabled` | Booleano          | No       | Si el procesador está habilitado o no. Predeterminado: `false`.                                                                |
| `sources`    | Array de cadenas | No       | Array de atributos de origen. Predeterminado: `http.url`.                                                                      |
| `target`     | Cadena           | Sí      | Nombre del atributo padre que contiene todos los detalles extraídos del `sources`. Predeterminado: `http.url_details`. |

{{% /tab %}}
{{< /tabs >}}

## Analizador de User-Agent

El procesador de análisis de user-agent toma un `useragent` atributo y extrae el sistema operativo, navegador, dispositivo y otros datos del usuario. Cuando esté configurado, se producen los siguientes atributos:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Procesador de Useragent" style="width:80%;">}}

**Nota**: Si tus registros contienen user-agents codificados (por ejemplo, registros de IIS), configura este procesador para **decodificar la URL** antes de analizarla.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de user-agent en la página de [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="Tile del procesador de Useragent" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Usa el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del analizador de user-agent:

```json
{
  "type": "user-agent-parser",
  "name": "Parses <SOURCE_ATTRIBUTE> to extract all its User-Agent information",
  "is_enabled": true,
  "sources": ["http.useragent"],
  "target": "http.useragent_details",
  "is_encoded": false
}
```

| Parámetro    | Tipo             | Requerido | Descripción                                                                                                                 |
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo del procesador.                                                                                                      |
| `name`       | Cadena           | No       | Nombre del procesador.                                                                                                      |
| `is_enabled` | Booleano          | No       | Si el procesador está habilitado o no. Predeterminado: `false`.                                                                      |
| `sources`    | Array de cadenas | No       | Array de atributos de origen. Predeterminado: `http.useragent`.                                                                      |
| `target`     | Cadena           | Sí      | Nombre del atributo padre que contiene todos los detalles extraídos del `sources`. Predeterminado: `http.useragent_details`. |
| `is_encoded` | Booleano          | No       | Define si el atributo de origen está codificado en URL o no. Predeterminado: `false`.                                                     |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de categorías

<div class="alert alert-danger">Para actualizar una categoría, debes eliminar la categoría original y recrearla. No puedes usar el procesador de categorías para actualizar una categoría existente.</div>

Utiliza el procesador de categorías para agregar un nuevo atributo (sin espacios ni caracteres especiales en el nombre del nuevo atributo) a un registro que coincida con una consulta de búsqueda proporcionada. Luego, utiliza categorías para crear grupos para una vista analítica (por ejemplo, grupos de URL, grupos de máquinas, entornos y cubos de tiempo de respuesta).

**Notas**:

* La sintaxis de la consulta es la que se encuentra en la barra de búsqueda de [Log Explorer][6]. Esta consulta se puede realizar en cualquier atributo o etiqueta de registro, ya sea un facet o no. Los comodines también se pueden usar dentro de tu consulta.
* Una vez que el registro ha coincidido con una de las consultas del procesador, se detiene. Asegúrate de que estén correctamente ordenados en caso de que un registro pueda coincidir con varias consultas.
* Los nombres de las categorías deben ser únicos.
* Una vez definido en el procesador de categorías, puedes mapear categorías al estado del registro utilizando el [remapeador de estado del registro](#log-status-remapper).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de categorías en la página de [**Pipelines**][1]. Por ejemplo, para categorizar tus registros de acceso web según el valor del rango de código de estado (`"OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...`), agrega este procesador:

{{< img src="logs/log_configuration/processor/category_processor.png" alt="procesador de categorías" style="width:80%;" >}}

Este procesador produce el siguiente resultado:

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="resultado del procesador de categorías" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del procesador de categorías:

```json
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

| Parámetro    | Tipo            | Requerido | Descripción                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | Cadena          | Sí      | Tipo del procesador.                                                                                     |
| `name`       | Cadena          | No       | Nombre del procesador.                                                                                     |
| `is_enabled` | Booleano         | No       | Si el procesador está habilitado o no. Por defecto: `false`                                                      |
| `categories` | Arreglo de Objetos | Sí      | Arreglo de filtros para coincidir o no con un registro y su correspondiente `name` para asignar un valor personalizado al registro. |
| `target`     | Cadena          | Sí      | Nombre del atributo objetivo cuyo valor está definido por la categoría coincidente.                              |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador aritmético

Utilice el procesador aritmético para agregar un nuevo atributo (sin espacios ni caracteres especiales en el nombre del nuevo atributo) a un registro con el resultado de la fórmula proporcionada. Esto remapea diferentes atributos de tiempo con diferentes unidades en un solo atributo, o calcula operaciones sobre atributos dentro del mismo registro.

Una fórmula de procesador aritmético puede usar paréntesis y operadores aritméticos básicos: `-`, `+`, `*`, `/`.

Por defecto, se omite un cálculo si falta un atributo. Seleccione *Reemplazar atributo faltante por 0* para llenar automáticamente los valores de atributos faltantes con 0 y asegurar que se realice el cálculo.

**Notas**:

* Un atributo puede ser listado como faltante si no se encuentra en los atributos del registro, o si no puede ser convertido a un número.
* Al usar el operador `-`, agregue espacios alrededor de él porque los nombres de atributos como `start-time` pueden contener guiones. Por ejemplo, la siguiente fórmula debe incluir espacios alrededor del operador `-`: `(end-time - start-time) / 1000`.
* Si el atributo objetivo ya existe, se sobrescribe con el resultado de la fórmula.
* Los resultados se redondean hasta la novena decimal. Por ejemplo, si el resultado de la fórmula es `0.1234567891`, el valor real almacenado para el atributo es `0.123456789`.
* Si necesitas escalar una unidad de medida, utiliza el filtro de escala.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador aritmético en la página [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="Procesador Aritmético" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API del Pipeline de Logs de Datadog][1] con la siguiente carga JSON del procesador aritmético:

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

| Parámetro            | Tipo    | Requerido | Descripción                                                                                                                                  |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | Cadena  | Sí      | Tipo del procesador.                                                                                                                       |
| `name`               | Cadena  | No       | Nombre del procesador.                                                                                                                       |
| `is_enabled`         | Booleano | No       | Si el procesador está habilitado o no. Predeterminado: `false`.                                                                                       |
| `expression`         | Cadena  | Sí      | Operación aritmética entre uno o más atributos de log.                                                                                     |
| `target`             | Cadena  | Sí      | Nombre del atributo que contiene el resultado de la operación aritmética.                                                                  |
| `is_replace_missing` | Booleano | No       | Si `true`, reemplaza todos los atributos faltantes de `expression` por 0, `false` omite la operación si falta un atributo. Por defecto: `false`. |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de construcción de cadenas

Utiliza el procesador de construcción de cadenas para agregar un nuevo atributo (sin espacios ni caracteres especiales) a un log con el resultado de la plantilla proporcionada. Esto permite la agregación de diferentes atributos o cadenas en bruto en un solo atributo.

La plantilla se define tanto por texto en bruto como por bloques con la sintaxis `%{attribute_path}`.

**Notas**:

* Este procesador solo acepta atributos con valores o un arreglo de valores en el bloque (ver ejemplos en la sección de UI a continuación.
* Si un atributo no puede ser utilizado (objeto o arreglo de objetos), se reemplaza por una cadena vacía o se omite toda la operación dependiendo de su selección.
* Si un atributo de destino ya existe, se sobrescribe con el resultado de la plantilla.
* Los resultados de una plantilla no pueden exceder 256 caracteres.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador de construcción de cadenas en la página [**Pipelines**][1]:

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="Procesador de construcción de cadenas" style="width:80%;">}}

Con el siguiente registro, use la plantilla `Request %{http.method} %{http.url} was answered with response %{http.status_code}` para devolver un resultado. Por ejemplo:


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
Request GET https://app.datadoghq.com/users was answered with response 200
```

**Nota**: `http` es un objeto y no puede ser utilizado en un bloque (`%{http}` falla), mientras que `%{http.method}`, `%{http.status_code}` o `%{http.url}` devuelven el valor correspondiente. Los bloques pueden ser utilizados en arreglos de valores o en un atributo específico dentro de un arreglo.

* Por ejemplo, agregar el bloque `%{array_ids}` devuelve:

   ```text
   123,456,789
   ```

* `%{array_users}` no devuelve nada porque es una lista de objetos. Sin embargo, `%{array_users.first_name}` devuelve una lista de `first_name`s contenidos en el arreglo:

  ```text
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilice el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del procesador de construcción de cadenas:

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

| Parámetro            | Tipo    | Requerido | Descripción                                                                                                                                       |
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | Cadena  | Sí      | Tipo del procesador.                                                                                                                            |
| `name`               | Cadena  | No       | Nombre del procesador.                                                                                                                            |
| `is_enabled`         | Booleano | No       | Si el procesador está habilitado o no, por defecto es `false`.                                                                                          |
| `template`           | Cadena  | Sí      | Una fórmula con uno o más atributos y texto sin procesar.                                                                                               |
| `target`             | Cadena  | Sí      | El nombre del atributo que contiene el resultado de la plantilla.                                                                               |
| `is_replace_missing` | Booleano | No       | Si `true`, reemplaza todos los atributos faltantes de `template` por una cadena vacía. Si `false`, omite la operación para atributos faltantes. Por defecto: `false`. |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Analizador GeoIP

El analizador GeoIP toma un atributo de dirección IP y extrae información de continente, país, subdivisión o ciudad (si está disponible) en la ruta del atributo de destino.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="Procesador GeoIP" style="width:80%;">}}

La mayoría de los elementos contienen un atributo `name` y `iso_code` (o `code` para continente). `subdivision` es el primer nivel de subdivisión que utiliza el país, como "Estados" para los Estados Unidos o "Departamentos" para Francia.

Por ejemplo, el analizador GeoIP extrae la ubicación del atributo `network.client.ip` y la almacena en el atributo `network.client.geoip`:

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="Ejemplo de GeoIP" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API del Pipeline de Logs de Datadog][1] con la siguiente carga útil JSON del analizador GeoIP:

```json
{
  "type": "geo-ip-parser",
  "name": "Parse the geolocation elements from network.client.ip attribute.",
  "is_enabled": true,
  "sources": ["network.client.ip"],
  "target": "network.client.geoip"
}
```

| Parámetro    | Tipo             | Requerido | Descripción                                                                                                               |
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo del procesador.                                                                                                    |
| `name`       | Cadena           | No       | Nombre del procesador.                                                                                                    |
| `is_enabled` | Booleano          | No       | Si el procesador está habilitado o no. Predeterminado: `false`.                                                                     |
| `sources`    | Array de cadenas | No       | Array de atributos de origen. Predeterminado: `network.client.ip`.                                                                  |
| `target`     | Cadena           | Sí      | Nombre del atributo padre que contiene todos los detalles extraídos del `sources`. Predeterminado: `network.client.geoip`.  |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de búsqueda

Utiliza el procesador de búsqueda para definir un mapeo entre un atributo de log y un valor legible por humanos guardado en una [Tabla de Referencia][7] o en la tabla de mapeo de procesadores.

Por ejemplo, puedes usar el procesador de búsqueda para mapear un ID de servicio interno a un nombre de servicio legible por humanos. Alternativamente, puedes usarlo para verificar si la dirección MAC que acaba de intentar conectarse al entorno de producción pertenece a tu lista de máquinas robadas.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

El procesador de búsqueda realiza las siguientes acciones:

* Verifica si el log actual contiene el atributo de origen.
* Verifica si el valor del atributo de origen existe en la tabla de mapeo.
  * Si lo tiene, crea el atributo de destino con el valor correspondiente en la tabla.
  * Opcionalmente, si no encuentra el valor en la tabla de mapeo, crea un atributo de destino con el valor predeterminado de reserva establecido en el campo `fallbackValue`. Puede ingresar manualmente una lista de `source_key,target_value` pares o cargar un archivo CSV en la pestaña **Mapeo Manual**.

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Procesador de búsqueda" style="width:80%;">}}

    The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.

  * Opcionalmente, si no encuentra el valor en la tabla de mapeo, crea un atributo de destino con el valor de la tabla de referencia. Puede seleccionar un valor para una [Tabla de Referencia][101] en la pestaña **Tabla de Referencia**.

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Procesador de búsqueda"
    style="width:80%;">}}


[101]: /es/integrations/guide/reference-tables/

{{% /tab %}}
{{% tab "API" %}}

Utilice el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de búsqueda:

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

| Parámetro        | Tipo             | Requerido | Descripción                                                                                                                                                              |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Cadena           | Sí      | Tipo del procesador.                                                                                                                                                   |
| `name`           | Cadena           | No       | Nombre del procesador.                                                                                                                                                   |
| `is_enabled`     | Booleano          | Sí      | Si el procesador está habilitado o no. Predeterminado: `false`.                                                                                                                     |
| `source`         | Cadena           | Sí      | Atributo de origen utilizado para realizar la búsqueda.                                                                                                                             |
| `target`         | Cadena           | Sí      | Nombre del atributo que contiene el valor correspondiente en la lista de mapeo o el `default_lookup` si no se encuentra en la lista de mapeo.                                |
| `lookup_table`   | Array de cadenas | Sí      | Tabla de mapeo de valores para el atributo de origen y sus valores de atributo de destino asociados, formateada como [ "source_key1,target_value1", "source_key2,target_value2" ]. |
| `default_lookup` | Cadena           | No       | Valor para establecer el atributo de destino si el valor de origen no se encuentra en la lista.                                                                                          |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapeador de trazas

Hay dos formas de definir la correlación entre trazas de aplicación y registros:

1. Siga la documentación sobre [cómo inyectar un ID de traza en los registros de la aplicación][8]. Las integraciones de registros manejan automáticamente todos los pasos de configuración restantes por defecto.

2. Utilice el procesador remapeador de trazas para definir un atributo de registro como su ID de traza asociado.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador remapeador de trazas en la página [**Pipelines**][1]. Ingrese la ruta del atributo de ID de traza en el cuadro del procesador de la siguiente manera:

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="Procesador de ID de traza" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilice el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del remapeador de trazas:

```json
{
  "type": "trace-id-remapper",
  "name": "Define dd.trace_id as the official trace id associate to this log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| Parámetro    | Tipo             | Requerido | Descripción                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo del procesador.                                 |
| `name`       | Cadena           | No       | Nombre del procesador.                                 |
| `is_enabled` | Booleano          | No       | Si el procesador está habilitado o no. Predeterminado: `false`. |
| `sources`    | Array de cadenas | No       | Array de atributos de origen. Predeterminado: `dd.trace_id`.    |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**Nota**: Los IDs de traza y los IDs de intervalo no se muestran en sus registros o atributos de registro en la interfaz de usuario.

## Remapeador de intervalos

Hay dos formas de definir la correlación entre los intervalos de la aplicación y los registros:

1. Siga la documentación sobre [cómo inyectar un ID de intervalo en los registros de la aplicación][8]. Las integraciones de registro manejan automáticamente todos los pasos de configuración restantes por defecto.

2. Utilice el procesador remapeador de intervalos para definir un atributo de registro como su ID de intervalo asociado.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador remapeador de intervalos en la página de [**Pipelines**][1]. Ingrese la ruta del atributo del ID de intervalo en el cuadro del procesador de la siguiente manera:

{{< img src="logs/log_configuration/processor/span_id_remapper.png" alt="Procesador de ID de intervalo" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilice el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del remapeador de intervalos:

```json
{
  "type": "span-id-remapper",
  "name": "Define dd.span_id as the official span id associate to this log",
  "is_enabled": true,
  "sources": ["dd.span_id"]
}
```

| Parámetro    | Tipo             | Requerido | Descripción                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                 |
| `name`       | Cadena           | No       | Nombre del procesador.                                 |
| `is_enabled` | Booleano          | No       | Indica si el procesador está habilitado. Predeterminado: `false`. |
| `sources`    | Array de cadenas | No       | Array de atributos de origen. Predeterminado: `dd.trace_id`.    |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**Nota**: Los IDs de traza y los IDs de intervalo no se muestran en sus registros o atributos de registro en la interfaz de usuario.

## Procesador de arreglos

Utiliza el procesador de arreglos para extraer, agregar o transformar valores de arreglos JSON dentro de tus registros.

Las operaciones soportadas incluyen:

- **Seleccionar valor de un elemento coincidente**
- **Calcular la longitud de un arreglo**
- **Agregar un valor a un arreglo**

Cada operación se configura a través de un procesador dedicado.

Define el procesador de arreglos en la página de [**Pipelines**][1].


### Seleccionar valor de un elemento coincidente

Extraer un valor específico de un objeto dentro de un arreglo cuando coincide con una condición.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/array_processor_select_value.png" alt="Procesador de arreglos - Seleccionar valor de un elemento" style="width:80%;" >}}

**Ejemplo de entrada:**

```json
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

- **Ruta del arreglo**: `httpRequest.headers`
- **Condición**: `name:Referrer`
- **Extraer valor de**: `value`
- **Atributo objetivo**: `referrer`

**Resultado:**

```json
{
  "httpRequest": {
    "headers": [...]
  },
  "referrer": "https://example.com"
}
```

{{% /tab %}}
{{% tab "API" %}}

Utilice el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del procesador de arreglos:

```json
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

| Parámetro    | Tipo             | Requerido | Descripción                                                   |
|--------------|------------------|----------|---------------------------------------------------------------|
| `type`       | Cadena           | Sí      | Tipo de procesador.                                        |
| `name`       | Cadena           | No       | Nombre del procesador.                                        |
| `is_enabled` | Booleano          | No       | Si el procesador está habilitado. Predeterminado: `false`.        |
| `operation.type`  | Cadena      | Sí      | Tipo de operación del procesador de arreglos.                            |
| `operation.source`  | Cadena    | Sí      | Ruta del arreglo del cual desea seleccionar.                    |
| `operation.target`  | Cadena    | Sí      | Atributo objetivo.                                             |
| `operation.filter`  | Cadena    | Sí      | Expresión para coincidir con un elemento del arreglo. Se selecciona el primer elemento que coincide. |
| `operation.value_to_extract`  | Cadena | Sí | Atributo a leer en el elemento seleccionado.                  |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

### Longitud del arreglo

Calcule el número de elementos en un arreglo.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/array_processor_length.png" alt="Procesador de arreglos - Longitud" style="width:80%;" >}}

**Ejemplo de entrada:**

```json
{
  "tags": ["prod", "internal", "critical"]
}
```

**Pasos de configuración:**

- **Atributo del arreglo**: `tags`
- **Atributo objetivo**: `tagCount`

**Resultado:**

```json
{
  "tags": ["prod", "internal", "critical"],
  "tagCount": 3
}
```
{{% /tab %}}
{{% tab "API" %}}

Utilice el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del procesador de arreglos:

```json
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

| Parámetro           | Tipo      | Requerido | Descripción                                                   |
|---------------------|-----------|----------|---------------------------------------------------------------|
| `type`              | Cadena    | Sí      | Tipo del procesador.                                        |
| `name`              | Cadena    | No       | Nombre del procesador.                                        |
| `is_enabled`        | Booleano   | No       | Si el procesador está habilitado. Predeterminado: `false`.        |
| `operation.type`    | Cadena    | Sí      | Tipo de operación del procesador de arreglos.                            |
| `operation.source`  | Cadena    | Sí      | Ruta del arreglo para extraer la longitud.                   |
| `operation.target`  | Cadena    | Sí      | Atributo objetivo.                                             |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

### Agregar al arreglo

Añadir un valor de atributo al final de un atributo de arreglo objetivo en el registro.

**Nota**: Si el atributo de arreglo objetivo no existe en el registro, se crea automáticamente.


{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/array_processor_append.png" alt="Procesador de arreglos - Agregar" style="width:80%;" >}}

**Ejemplo de entrada:**

```json
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

- **Atributo a agregar**: `"network.client.ip"`
- **Atributo de arreglo al que agregar**: `sourceIps`

**Resultado:**

```json
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

Utilice el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del procesador de arreglos:

```json
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

| Parámetro                    | Tipo       | Requerido | Descripción                                                        |
|------------------------------|------------|----------|--------------------------------------------------------------------|
| `type`                       | Cadena     | Sí      | Tipo del procesador.                                             |
| `name`                       | Cadena     | No       | Nombre del procesador.                                             |
| `is_enabled`                 | Booleano    | No       | Si el procesador está habilitado. Predeterminado: `false`.             |
| `operation.type`             | Cadena     | Sí      | Tipo de operación del procesador de arreglos.                                 |
| `operation.source`           | Cadena     | Sí      | Atributo a agregar.                                               |
| `operation.target`           | Cadena     | Sí      | Atributo de arreglo al que se va a agregar.                                      |
| `operation.preserve_source`  | Booleano    | No      | Si se debe preservar la fuente original después de la reconfiguración. Predeterminado: `false`.   |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador decodificador

El procesador decodificador traduce campos de cadenas codificadas en binario a texto (como Base64 o Hex/Base16) a su representación original. Esto permite que los datos sean interpretados en su contexto nativo, ya sea como una cadena UTF-8, un comando ASCII o un valor numérico (por ejemplo, un entero derivado de una cadena hexadecimal). El procesador decodificador es especialmente útil para analizar comandos codificados, registros de sistemas específicos o técnicas de evasión utilizadas por actores de amenazas.

**Notas**:

- Cadenas truncadas: El procesador maneja cadenas Base64/Base16 parcialmente truncadas de manera adecuada, recortando o completando según sea necesario.

- Formato hexadecimal: La entrada hexadecimal puede ser decodificada en una cadena (UTF-8) o en un entero.

- Manejo de fallos: Si la decodificación falla (debido a una entrada no válida), el procesador omite la transformación y el registro permanece sin cambios.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

1. Establecer el atributo de origen: Proporcione la ruta del atributo que contiene la cadena codificada, como `encoded.base64`.
2. Seleccionar la codificación de origen: Elija la codificación de binario a texto de la fuente: `base64` o `base16/hex`.
2. Para `Base16/Hex`: Elija el formato de salida: `string (UTF-8)` o `integer`.
3. Establezca el atributo de destino: Ingrese la ruta del atributo para almacenar el resultado decodificado.

{{< img src="logs/log_configuration/processor/decoder-processor.png" alt="Procesador de decodificación - Agregar" style="width:80%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Procesador de inteligencia de amenazas

Agregue el Procesador de Inteligencia de Amenazas para evaluar los registros contra la tabla utilizando una clave específica de Indicador de Compromiso (IoC), como una dirección IP. Si se encuentra una coincidencia, el registro se enriquece con atributos relevantes de Inteligencia de Amenazas (TI) de la tabla, lo que mejora la detección, investigación y respuesta.

Para más información, consulte [Inteligencia de Amenazas][9].

## Procesador OCSF

Utilice el procesador OCSF para normalizar sus registros de seguridad de acuerdo con el [Marco de Esquema de Ciberseguridad Abierto (OCSF)][11]. El procesador OCSF le permite crear mapeos personalizados que remapean sus atributos de registro a las clases de esquema OCSF y sus atributos correspondientes, incluidos los atributos enumerados (ENUM).

El procesador le permite:

- Mapear atributos de registro de origen a atributos de destino OCSF
- Configurar atributos ENUM con valores numéricos específicos
- Crear sub-pipelines para diferentes clases de eventos de destino OCSF
- Preprocesar registros antes del remapeo OCSF

Para instrucciones detalladas de configuración, ejemplos de configuración y orientación para solucionar problemas, consulte [Procesador OCSF][12].

## Lectura Adicional

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/log_configuration/pipelines/
[2]: /es/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[3]: /es/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /es/logs/log_configuration/attributes_naming_convention/
[6]: /es/logs/search_syntax/
[7]: /es/integrations/guide/reference-tables/
[8]: /es/tracing/other_telemetry/connect_logs_and_traces/
[9]: /es/security/threat_intelligence/
[10]: /es/logs/log_configuration/parsing/?tab=matchers
[11]: /es/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[12]: /es/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/ocsf_processor/