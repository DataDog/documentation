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
## Resumen general

<div class="alert alert-info">Los procesadores descritos en esta documentación son específicos para entornos de registro basados en la nube. Para analizar, estructurar y enriquecer los registros locales, consulta <a href="https://docs.datadoghq.com/observability_pipelines/processors/">«Observability Pipelines</a>».</div>

Un procesador se ejecuta dentro de un [Pipeline][1] para llevar a cabo una acción de estructuración de datos y generar atributos que enriquecen tus registros.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Procesadores" style="width:100%" >}}

En [la configuración de los registros][1], puedes configurar procesadores como el [analizador ](#grok-parser)Grok o el [remapeador de fechas](#remapper) para ayudar a extraer, crear y reasignar atributos con el fin de enriquecer tus registros y mejorar la búsqueda por facetas.

**Notas**: Los registros

-  estructurados deben enviarse en un formato válido. Si la estructura contiene caracteres no válidos para el análisis sintáctico, estos deben eliminarse a nivel del agente mediante la función [mask_sequences][2]. 

- Como práctica recomendada, se aconseja utilizar un máximo de 20 procesadores por canalización. Analizador

##  Grok

Crea reglas Grok personalizadas para analizar el mensaje completo o un atributo específico de tu evento sin procesar. Como buena práctica, limita tu analizador Grok a 10 reglas de análisis. Para obtener más información sobre la sintaxis y las reglas de análisis sintáctico de Grok, consulta [Análisis sintáctico][10].

{{< img src="/logs/processing/processors/define_parsing_rules_syntax_suggestions.png" alt="Sugerencias de sintaxis del analizador Grok en la interfaz de usuario" style="width:90%;" >}}

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador Grok en la [página** **Pipelines][1]. Para configurar las reglas de análisis de Grok: Haga 

1. clic **en «Analizar mis registros»** para generar automáticamente un conjunto de tres reglas de análisis basadas en los registros que pasan por el canal. 
   **Nota**: Esta función requiere que los registros correspondientes estén indexados y se estén recibiendo de forma activa. Puede desactivar temporalmente o reducir la muestra de los filtros de exclusión para permitir que la función detecte los registros. Muestras
1. ** de registros**: añada hasta cinco registros de muestra (de hasta 5000 caracteres cada uno) para probar sus reglas de análisis. 
1. **Defina las reglas de análisis**: escriba sus reglas de análisis en el editor de reglas. A medida que defines reglas, el analizador Grok te ofrece ayuda sintáctica: Sugerencias
   - ** de **comparadores: escribe el nombre de una regla seguido de `%{`. Aparece un menú desplegable con los comparadores disponibles (como `word`, `integer`, `ip`, `date`). Selecciona un comparador de la lista para insertarlo en tu regla.<br>
     ```
     MyParsingRule %{
     ```
   - **Sugerencias de filtros**: al añadir un filtro con `:`, aparece un menú desplegable con los filtros compatibles con el comparador seleccionado. 
1. **Prueba tus reglas**: selecciona una muestra haciendo clic en ella para que se evalúe según la regla de análisis y se muestre el resultado en la parte inferior de la pantalla. Todas las muestras muestran un estado (`match` o `no match`), que indica si alguna de las reglas de análisis del analizador Grok coincide con la muestra.

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON para el analizador Grok:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo            |              |  |                                              |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               |            |       |  del procesador.                                  |
| `name`               |            |        | CadenaNoNombre del procesador.                                  |
| `is_enabled`         |           |        | BooleanoNoSi el procesador está habilitado o no. Valor predeterminado: `false`.  |
| `source`             |            |       | StringYesNombre del atributo de registro que se va a analizar. Por defecto: `message`. |
| `samples`            | Matriz de  |        | cadenasNoLista de (hasta 5) registros de ejemplo para este analizador Grok.     |
| `grok.support_rules` |            |       | CadenaSíLista de reglas de soporte para tu analizador Grok.             |
| `grok.match_rules`   |            |       | CadenaSíLista de reglas de coincidencia para tu analizador Grok.               |


[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador de fechas de registro

A medida que Datadog recibe los registros, les asigna una marca de tiempo utilizando los valores de cualquiera de estos atributos predeterminados: 

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si tus registros contienen fechas en un atributo que no figura en esta lista, utiliza el procesador de reasignación de fechas de registros para definir su atributo de fecha como la marca de tiempo oficial del registro:

<div class="alert alert-info">
Los formatos de fecha admitidos son: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (formato de milisegundos EPOCH) y <a href="https://www.ietf.org/rfc/rfc3164.txt"></a>RFC 3164</a>.
</div>

Si tus registros no tienen una marca de tiempo que se ajuste a los formatos indicados anteriormente, utiliza el procesador Grok para extraer la hora de época de la marca de tiempo y asignarla a un nuevo atributo. El remapeador de fechas utiliza el atributo recién definido.

Para saber cómo se puede analizar un formato personalizado de fecha y hora en Datadog, consulta [Análisis de fechas][3].

**Notas**:Los eventos

*  de registro se pueden enviar hasta 18 horas atrás y dos horas en el futuro.
* Según la norma ISO 8601-1:2019, el formato básico es`T[hh][mm][ss]`  y el formato ampliado es `T[hh]:[mm]:[ss]`. En versiones anteriores se omitía la «T» (que representa la hora) en ambos formatos. 
* Si tus registros no contienen ninguno de los atributos predeterminados y no has definido tu propio atributo de fecha, Datadog les asigna una marca de tiempo con la fecha en que los recibió. 
* Si se aplican varios procesadores de reasignación de fecha a un registro concreto dentro del canal, se tiene en cuenta el último (según el orden del canal).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador de reasignación de fechas de registro en la [página** **Pipelines][1]:

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="Definir un atributo de fecha" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="Fecha y hora en el panel lateral del Explorador de registros" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON para reasignar la fecha de los registros:

```json
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official Date of the log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                            |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       |            |       |  del procesador.                                |
| `name`       |            |        | CadenaNoNombre del procesador.                                |
| `is_enabled` |           |        | BooleanoNoSi el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de  |       | cadenasSíMatriz de atributos de origen.                           |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Reasignador de estado de registros

Utiliza el procesador de reasignación de estados para asignar atributos como estado oficial a tus registros. Por ejemplo, añade un nivel de gravedad a tus registros con el remapeador de estados.

Cada valor de estado entrante se asigna de la siguiente manera: 

* los números enteros del 0 al 7 se asignan a los [estándares de gravedad de Syslog][4]; 
* las cadenas que comienzan por **«emerg»** o **«f»** (sin distinción entre mayúsculas y minúsculas) se asignan a **«emerg» (0); **
* las cadenas que comienzan por **«a»** (sin distinción entre mayúsculas y minúsculas) se asignan a **«alert» (1). Las cadenas**
*  que comienzan por **«c»** (sin distinción entre mayúsculas y minúsculas) se asignan a **«critical» (2). Las cadenas**
*  que comienzan por **«err»** (sin distinción entre mayúsculas y minúsculas) se asignan a **«error» (3). Las cadenas**
*  que comienzan por **«w»** (sin distinción entre mayúsculas y minúsculas) se asignan a **«warning» (4). **
* Las cadenas que comienzan por **«n»** (sin distinción entre mayúsculas y minúsculas) se asignan a **«notice» (5). **
* Las cadenas que comienzan por **«i»** (sin distinción entre mayúsculas y minúsculas) se asignan a **«info» (6) **
* Las cadenas que comienzan por **d**, **t**, **v**, **trace **o **verbose** (sin distinción entre mayúsculas y minúsculas) se asignan a **«debug» (7) Las cadenas**
*  que comienzan por **o** o **s**, o que coinciden con **«OK»** o **«Success»** (sin distinción entre mayúsculas y minúsculas) se asignan a **«OK**
* ». Todas las demás se asignan a **«info» (6) **

**Nota**: Si se aplican varios procesadores de reasignación de estado de registro a un registro dentro de un canal, solo se tiene en cuenta el primero en el orden del canal. Además, para todos los flujos de trabajo que coincidan con el registro, solo se aplica el primer remapeador de estado que se encuentre (de entre todos los flujos de trabajo aplicables).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador de reasignación de estados de registro en la [página** **Pipelines][1]:

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Reasignación de niveles de gravedad de los registros" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON para la reasignación del estado de los registros:

```json
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official status of the log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                            |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       |            |       |  del procesador.                                |
| `name`       |            |        | CadenaNoNombre del procesador.                                |
| `is_enabled` |           |        | BooleanoNoSi el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de  |       | cadenasSíMatriz de atributos de origen.                           |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Servicio de reprogramación

El procesador de reasignación de servicios asigna uno o varios atributos a tus registros en calidad de servicio oficial. 

**Nota**: Si se aplican varios procesadores de reasignación de servicios a un registro concreto dentro del flujo de trabajo, solo se tiene en cuenta el primero (según el orden del flujo de trabajo).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación del servicio de registro en la [página** **Pipelines][1]:

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="Procesador de reasignación de servicios" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del remapeador del servicio de registros:

```json
{
  "type": "service-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official log service",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                            |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       |            |       |  del procesador.                                |
| `name`       |            |        | CadenaNoNombre del procesador.                                |
| `is_enabled` |           |        | BooleanoNoSi el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de  |       | cadenasSíMatriz de atributos de origen.                           |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## El remapeador de mensajes 

`message`de registro es una característica clave de Datadog. Su valor se muestra en la columna** **«Contenido» del Explorador de registros para proporcionar contexto sobre el registro. Puedes utilizar la barra de búsqueda para encontrar un registro por su mensaje.

Utilice el procesador de reasignación de mensajes de registro para definir uno o varios atributos como mensaje de registro oficial. Defina más de un atributo para los casos en los que los atributos puedan no existir y haya una alternativa disponible. Por ejemplo, si los atributos del mensaje definidos son `attribute1`, `attribute2`, y `attribute3`, y`attribute1`  no existe, entonces`attribute2`se utiliza . Del mismo modo, si`attribute2`  no existe, se`attribute3`utiliza .

Para definir los atributos de los mensajes, primero utiliza el procesador[ de cadenas](#string-builder-processor) para crear un nuevo atributo de cadena para cada uno de los atributos que desees utilizar. A continuación, utiliza el remapeador de mensajes de registro para reasignar los atributos de la cadena como mensaje. 

**Nota**: Si se aplican varios procesadores de remapeo de mensajes de registro a un registro concreto dentro del canal, solo se tiene en cuenta el primero (según el orden del canal).

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador de reasignación de mensajes de registro en la [página** **Pipelines][1]:

{{< img src="logs/log_configuration/processor/message_processor.png" alt="Procesador de mensajes" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON para la reasignación de mensajes de registro:

```json
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official message of the log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                            |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       |            |       |  del procesador.                                |
| `name`       |            |        | CadenaNoNombre del procesador.                                |
| `is_enabled` |           |        | BooleanoNoSi el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de  |       | cadenasSíMatriz de atributos de origen. Valor predeterminado: `msg`.            |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapper

El procesador de reasignación reasigna uno o varios atributos o etiquetas de origen a un atributo o etiqueta de destino diferente. Por ejemplo, puedes reasignar el`user`atributo a`firstname`para normalizar los datos de registro en el Explorador de registros.

Si el destino del remapeador es un atributo, el procesador también puede intentar convertir el valor a un nuevo tipo (`String`, `Integer`, o `Double`). Si la conversión falla, se conservan el valor y el tipo originales. 

**Nota**: El separador decimal de`Double`los valores debe ser `.`. 

### Restricciones de nomenclatura

Los caracteres`:`  y  no`,` están permitidos en el atributo «target» ni en los nombres de las etiquetas. Además, los nombres de las etiquetas y los atributos deben ajustarse a las convenciones descritas en [Atributos y alias][5]. 

### Atributos reservados

El procesador Remapper** no se puede utilizar para reasignar atributos reservados **de Datadog.  
- El`host`atributo no se puede reasignar. 
- Los siguientes atributos requieren procesadores Remapper específicos y no se pueden reasignar con el Remapper genérico. Para reasignar cualquiera de los atributos, utilice en su lugar el reasignador o 
   - `message`procesador especializado correspondiente: Reasignador de mensajes 
   - `service`de registro: Reasignador de servicios
   - `status`: Reasignador de estado de
   - `date` registro: 
   - `trace_id`Reasignador de fecha de registro: Reasignador 
   - `span_id`de trazas: Reasignador de tramos

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación en la [página** **Pipelines][1]. Por ejemplo, reasigna`user`  a `user.firstname`.

{{< img src="logs/log_configuration/processor/remapper.png" alt="Procesador de reasignación de atributos" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON de Remapper:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo              |              |  |                                                                     |
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 |            |       |  del procesador.                                                         |
| `name`                 |            |       | CadenaNoNombre del procesador.                                                         |
| `is_enabled`           |           |       | BooleanoNoSi el procesador está habilitado o no. Por defecto: `false`.                          |
| `source_type`          |            |       | StringNoDefines si las fuentes proceden del registro`attribute`o `tag`de . Valor predeterminado:`attribute` . |
| `sources`              | Matriz de  |       | cadenasSíMatriz de atributos o etiquetas de origenCadenaSíNombre                                              |
| `target`               |            |       | del atributo o etiqueta final al que se reasignarán los orígenes.                           |
| `target_type`          |            |       | CadenaNoDefine si el destino es un registro`attribute`o un `tag`. Valor predeterminado: `attribute`.    |
| `target_format`        |            |       | StringNoDefines indica si el valor del atributo debe convertirse a otro tipo. Valores posibles: `auto`, `string`, o `integer`. Valor predeterminado: `auto`. Cuando se establece en `auto`, no se aplica ninguna conversión.  |
| `preserve_source`      |           |       | BooleanNoRemove o conservar el elemento de origen reasignado. Por defecto: `false`.               |
| `override_on_conflict` |           |       | BooleanNoOverride o no se modifica el elemento de destino si ya está configurado. Valor predeterminado: `false`.            |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Analizador de URL

El procesador de análisis de URL extrae los parámetros de consulta y otros parámetros importantes de una URL. Una vez configurado, se generan los siguientes atributos:

{{< img src="logs/processing/processors/url_processor.png" alt="Procesador de URL" style="width:80%;" >}}

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador del analizador de URL en la [página** **Pipelines][1]:

{{< img src="logs/processing/processors/url_processor.png" alt="Mosaico del procesador de URL" style="width:80%;" >}}

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                                                                                           |
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       |            |       |  del procesador.                                                                                               |
| `name`       |            |        | CadenaNoNombre del procesador.                                                                                               |
| `is_enabled` |           |        | BooleanoNoSi el procesador está habilitado o no. Valor predeterminado: `false`.                                                                |
| `sources`    | Matriz de  |        | cadenasNoMatriz de atributos de origen. Por defecto: `http.url`.                                                                      |
| `target`     |            |       | StringYesNombre del atributo principal que contiene todos los detalles extraídos del `sources`. Valor predeterminado: `http.url_details`. |

{{% /tab %}}
{{< /tabs >}}

## Analizador de UserAgent

El procesador del analizador de user-agent toma un`useragent`atributo y extrae datos sobre el sistema operativo, el navegador, el dispositivo y otros datos del usuario. Una vez configurado, se generan los siguientes atributos:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Procesador de User-Agent" style="width:80%;">}}

**Nota**: Si tus registros contienen useragents codificados (por ejemplo, los registros de IIS), configura este procesador para que **descodifique la URL** antes de analizarla.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de user-agent en la [página** **Pipelines][1]:

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="Mosaico del procesador de User-Agent" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del analizador de user-agent:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                                                                                                  |
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       |            |       |  del procesador.                                                                                                      |
| `name`       |            |        | CadenaNoNombre del procesador.                                                                                                      |
| `is_enabled` |           |        | BooleanoNoSi el procesador está habilitado o no. Valor predeterminado: `false`.                                                                      |
| `sources`    | Matriz de  |        | cadenasNoMatriz de atributos de origen. Por defecto: `http.useragent`.                                                                      |
| `target`     |            |       | StringYesNombre del atributo principal que contiene todos los detalles extraídos del `sources`. Valor predeterminado: `http.useragent_details`. |
| `is_encoded` |           |        | BooleanNoDefine, que indica si el atributo de origen está codificado en URL o no. Valor predeterminado: `false`.                                                     |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de categorías

<div class="alert alert-danger">Para actualizar una categoría, debes eliminar la categoría original y volver a crearla. No se puede utilizar el procesador de categorías para actualizar una categoría existente.</div>

Utiliza el procesador de categorías para añadir un nuevo atributo (sin espacios ni caracteres especiales en el nombre del nuevo atributo) a un registro que coincida con la consulta de búsqueda proporcionada. A continuación, utiliza categorías para crear grupos con fines analíticos (por ejemplo, grupos de URL, grupos de máquinas, entornos y intervalos de tiempo de respuesta).

**Notas**: 

* La sintaxis de la consulta es la misma que la de la barra de búsqueda de [Log Explorer][6]. Esta consulta se puede realizar sobre cualquier atributo o etiqueta de registro, independientemente de si se trata de una faceta o no. También se pueden utilizar comodines dentro de la consulta. Una 
* vez que el registro coincide con una de las consultas del procesador, este se detiene. Asegúrate de que estén ordenadas correctamente, ya que un registro podría coincidir con varias consultas. 
* Los nombres de las categorías deben ser únicos. Una
*  vez definidas en el procesador de categorías, puedes asignar categorías a los estados de registro mediante el remapeador [de estados ](#log-status-remapper)de registro.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de categorías en la [página** **Pipelines][1]. Por ejemplo, para clasificar tus registros de acceso web según el rango de valores de los códigos de estado (`"OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...`), añade este procesador:

{{< img src="logs/log_configuration/processor/category_processor.png" alt="procesador de categorías" style="width:80%;" >}}

Este procesador genera el siguiente resultado:

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="categoría, procesador, resultado" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de categorías:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |             |  |                                                                                                 |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       |           |       |  del procesador.                                                                                     |
| `name`       |           |        | CadenaNoNombre del procesador.                                                                                     |
| `is_enabled` |          |        | BooleanoNoSi el procesador está habilitado o no. Por defecto: `false`                                                      |
| `categories` | Matriz de  |       | objetosSíMatriz de filtros para determinar si un registro cumple o no los criterios y sus correspondientes`name`valores para asignar un valor personalizado al registro. |
| `target`     |           |       | CadenaSíNombre del atributo de destino cuyo valor viene definido por la categoría que cumple los criterios.                              |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador aritmético

Utiliza el procesador aritmético para añadir un nuevo atributo (sin espacios ni caracteres especiales en el nombre del nuevo atributo) a un registro con el resultado de la fórmula proporcionada. Esto reasigna diferentes atributos temporales con distintas unidades a un único atributo, o realiza operaciones de cálculo sobre los atributos dentro del mismo registro.

Una fórmula del procesador aritmético puede utilizar paréntesis y operadores aritméticos básicos: `-`, `+`, `*`, `/`.

Por defecto, se omite un cálculo si falta algún atributo. Seleccione *«Sustituir el atributo que falta por 0»* para rellenar automáticamente con un 0 los valores de los atributos que faltan y garantizar así que se realice el cálculo. 

**Notas**: 

* Un atributo puede aparecer como «faltante» si no se encuentra entre los atributos del registro o si no se puede convertir en un número. 
* Al utilizar el operador `-`, añada espacios a ambos lados, ya que los nombres de los atributos, como ,`start-time` pueden contener guiones. Por ejemplo, la siguiente fórmula debe incluir espacios a ambos lados del`-`operador:`(end-time - start-time) / 1000` . 
* Si el atributo de destino ya existe, se sobrescribe con el resultado de la fórmula. 
* Los resultados se redondean al noveno decimal. Por ejemplo, si el resultado de la fórmula es `0.1234567891`, el valor real almacenado para el atributo es `0.123456789`. 
* Si necesitas escalar una unidad de medida, utiliza el filtro de escala.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador aritmético en la [página** **Pipelines][1]:

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="Procesador aritmético" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del procesador aritmético:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo            |     |  |                                                                                                                                   |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               |   |       |  del procesador.                                                                                                                       |
| `name`               |   |        | CadenaNoNombre del procesador.                                                                                                                       |
| `is_enabled`         |  |        | BooleanoNoSi el procesador está habilitado o no. Por defecto: `false`.                                                                                       |
| `expression`         | StringSíOperación  |       |  aritmética entre uno o más atributos de registro.                                                                                     |
| `target`             |   |       | StringSíNombre del atributo que contiene el resultado de la operación aritmética.                                                                  |
| `is_replace_missing` |  |        | BooleanNoSi `true`se selecciona «Sí», sustituye todos los atributos que faltan de`expression`  por 0; si se `false`selecciona «No», omite la operación si falta algún atributo. Valor predeterminado: `false`. |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de cadenas

Utiliza el procesador de cadenas para añadir un nuevo atributo (sin espacios ni caracteres especiales) a un registro con el resultado de la plantilla proporcionada. Esto permite agrupar diferentes atributos o cadenas sin procesar en un único atributo.

La plantilla se define mediante texto sin formato y bloques con la sintaxis `%{attribute_path}`.

**Notas**:

* Este procesador solo acepta atributos con valores o una matriz de valores en el bloque (véanse los ejemplos en la sección de la interfaz de usuario más abajo)
* . Si no se puede utilizar un atributo (objeto o matriz de objetos), se sustituye por una cadena vacía o se omite toda la operación, dependiendo de su selección. 
* Si ya existe un atributo de destino, se sobrescribe con el resultado de la plantilla. 
* Los resultados de una plantilla no pueden superar los 256 caracteres.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador String Builder en la [página** **Pipelines][1]:

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="Procesador de cadenas" style="width:80%;">}}

Con el siguiente registro, utiliza la plantilla`Request %{http.method} %{http.url} was answered with response %{http.status_code}`para obtener un resultado. Por ejemplo:


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

**Nota**:`http`  es un objeto y no se puede utilizar en un bloque (`%{http}`da error), mientras que `%{http.method}`,`%{http.status_code}` , o`%{http.url}`  devuelven el valor correspondiente. Los bloques se pueden aplicar a matrices de valores o a un atributo específico dentro de una matriz. 

* Por ejemplo, al añadir el bloque`%{array_ids}`se obtiene el siguiente resultado:

   ```text
   123,456,789
   ```

* `%{array_users}` no devuelve ningún resultado porque es una lista de objetos. Sin embargo,`%{array_users.first_name}`devuelve una lista de `first_name`los elementos que contiene la matriz:

  ```text
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga JSON del procesador String Builder:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo            |     |  |                                                                                                                                        |
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               |   |       |  del procesador.                                                                                                                            |
| `name`               |   |        | CadenaNoNombre del procesador.                                                                                                                            |
| `is_enabled`         | BooleanoNoIndica  |        | si el procesador está habilitado o no; el valor predeterminado es `false`.                                                                                          |
| `template`           | CadenaSíUna   |       | fórmula con uno o más atributos y texto sin formato.                                                                                               |
| `target`             |   |       | CadenaSíEl nombre del atributo que contiene el resultado de la plantilla.                                                                               |
| `is_replace_missing` |  |        | BooleanoNoSi `true`se establece en , sustituye todos los atributos que faltan de`template`  por una cadena vacía. Si `false`, omite la operación para los atributos que faltan. Valor predeterminado: `false`. |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Analizador GeoIP

El analizador geoIP toma un atributo de dirección IP y extrae información sobre el continente, el país, la subdivisión o la ciudad (si está disponible) en la ruta del atributo de destino.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="Procesador GeoIP" style="width:80%;">}}

La mayoría de los elementos contienen un `name`atributo  y`iso_code`  (o`code`  para los continentes). `subdivision` es el primer nivel de subdivisión que utiliza el país, como los «estados» en Estados Unidos o los «departamentos» en Francia.

Por ejemplo, el analizador geoIP extrae la ubicación del`network.client.ip`atributo  y la almacena en el`network.client.geoip`atributo:

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="Ejemplo de GeoIP" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del analizador geoIP:

```json
{
  "type": "geo-ip-parser",
  "name": "Parse the geolocation elements from network.client.ip attribute.",
  "is_enabled": true,
  "sources": ["network.client.ip"],
  "target": "network.client.geoip"
}
```

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                                                                                                |
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       |            |       |  del procesador.                                                                                                    |
| `name`       |            |        | CadenaNoNombre del procesador.                                                                                                    |
| `is_enabled` |           |        | BooleanoNoSi el procesador está habilitado o no. Valor predeterminado: `false`.                                                                     |
| `sources`    | Matriz de  |        | cadenasNoMatriz de atributos de origen. Por defecto: `network.client.ip`.                                                                  |
| `target`     |            |       | StringYesNombre del atributo principal que contiene todos los detalles extraídos del `sources`. Valor predeterminado: `network.client.geoip`.  |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador de búsqueda

Utilice el procesador de búsqueda para definir una correspondencia entre un atributo de registro y un valor legible por el usuario guardado en una [tabla de referencia][7] o en la tabla de correspondencias del procesador.

Por ejemplo, puedes utilizar el procesador de búsqueda para asignar un identificador interno de servicio a un nombre de servicio legible para las personas. También puedes utilizarlo para comprobar si la dirección MAC que acaba de intentar conectarse al entorno de producción figura en tu lista de equipos robados.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

El procesador de búsqueda realiza las siguientes acciones: 

* comprueba si el registro actual contiene el atributo de origen; 
* comprueba si el valor del atributo de origen existe en la tabla de asignación; 
  * si es así, crea el atributo de destino con el valor correspondiente en la tabla;
  *  opcionalmente, si no encuentra el valor en la tabla de asignación, crea un atributo de destino con el valor de reserva predeterminado establecido en el`fallbackValue`campo. En la pestaña ****«Asignación manual» puedes introducir manualmente una lista de`source_key,target_value`pares o cargar un archivo CSV.

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Procesador de búsqueda" style="width:80%;">}}

    The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.

  * Opcionalmente, si no encuentra el valor en la tabla de correspondencias, crea un atributo de destino con el valor de la tabla de referencia. Puede seleccionar un valor para una [tabla de referencia][101] en la pestaña ****«Tabla de referencia».

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Procesador de búsqueda"
    style="width:80%;">}}


[101]: /es/integrations/guide/reference-tables/

{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de búsqueda:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo        |              |  |                                                                                                                                                               |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           |            |       |  del procesador.                                                                                                                                                   |
| `name`           |            |        | CadenaNoNombre del procesador.                                                                                                                                                   |
| `is_enabled`     |           |       | BooleanoSíSi el procesador está habilitado o no. Valor predeterminado: `false`.                                                                                                                     |
| `source`         | StringSíAtributo       | de           |  origen utilizado para realizar la búsqueda.                                                                                                                             |
| `target`         |            |       | StringSíNombre del atributo que contiene el valor correspondiente en la lista de asignaciones o el`default_lookup`  si no se encuentra en la lista de asignaciones.                                |
| `lookup_table`   | Matriz de cadenasSíTabla  |       | de asignación de valores para el atributo de origen y sus valores de atributo de destino asociados, con el formato [ "clave_origen1,valor_destino1", "clave_origen2,valor_destino2" ]. |
| `default_lookup` |            |        | StringNoValor que se asignará al atributo de destino si el valor de origen no se encuentra en la lista.                                                                                          |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapeador de trazas

Hay dos formas de establecer una correlación entre los rastros de la aplicación y los registros: 

1. Siga las instrucciones de la documentación sobre [cómo insertar un ID de rastro en los registros de la aplicación][8]. Las integraciones de registros gestionan automáticamente todos los pasos de configuración restantes de forma predeterminada. 

2. Utilice el procesador de reasignación de trazas para definir un atributo de registro como su ID de traza asociado.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Defina el procesador de reasignación de trazas en la [página** **Pipelines][1]. Introduzca la ruta del atributo «Trace ID» en el mosaico del procesador de la siguiente manera:

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="Procesador de identificadores de traza" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del remapeador de trazas:

```json
{
  "type": "trace-id-remapper",
  "name": "Define dd.trace_id as the official trace id associate to this log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                             |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       |            |       |  del procesador.                                 |
| `name`       |            |        | CadenaNoNombre del procesador.                                 |
| `is_enabled` |           |        | BooleanoNoSi el procesador está habilitado o no. Valor predeterminado: `false`. |
| `sources`    | Matriz de  |        | cadenasNoMatriz de atributos de origen. Valor predeterminado: `dd.trace_id`.    |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**Nota**: Los ID de traza y los ID de span no se muestran en los registros ni en los atributos de registro de la interfaz de usuario. 

## Remapeador de span

Hay dos formas de definir la correlación entre los spans de la aplicación y los registros: 

1. sigue las instrucciones de la documentación sobre [cómo insertar un ID de span en los registros de la aplicación][8]. Las integraciones de registros se encargan automáticamente de todos los pasos de configuración restantes de forma predeterminada. 

2. Utiliza el procesador de reasignación de spans para definir un atributo de registro como su ID de span asociado.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

Define el procesador de reasignación de intervalos en la [página** **Pipelines][1]. Introduzca la ruta del atributo Span ID en el mosaico del procesador de la siguiente manera:

{{< img src="logs/log_configuration/processor/span_id_remapper.png" alt="Procesador Span ID" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON para la reasignación de spans:

```json
{
  "type": "span-id-remapper",
  "name": "Define dd.span_id as the official span id associate to this log",
  "is_enabled": true,
  "sources": ["dd.span_id"]
}
```

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                             |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       |            |       |  del procesador.                                 |
| `name`       |            |        | CadenaNoNombre del procesador.                                 |
| `is_enabled` |           |        | BooleanoNoIndica si el procesador está habilitado. Valor predeterminado: `false`. |
| `sources`    | Matriz de  |        | cadenasNoMatriz de atributos de origen. Valor predeterminado: `dd.trace_id`.    |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**Nota**: Los ID de traza y los ID de intervalo no se muestran en los registros ni en los atributos de registro de la interfaz de usuario. 

## Procesador de matrices

Utiliza el procesador de matrices para extraer, agregar o transformar valores de matrices JSON en tus registros.

Las operaciones compatibles incluyen: 

- **seleccionar un valor de un elemento coincidente**
- **, calcular la longitud de una matriz y**
- ** añadir un valor a una matriz**

. Cada operación se configura mediante un procesador específico.

Defina el procesador de matrices en la [página** **Pipelines][1]. 


### Seleccione el valor del elemento correspondiente

Extraer un valor concreto de un objeto dentro de una matriz cuando cumpla una condición.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/array_processor_select_value.png" alt="Procesador de matrices  Seleccionar valor del elemento" style="width:80%;" >}}

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

**Pasos de configuración: Ruta**

- ** de la **matriz: `httpRequest.headers`
- **Condición**: `name:Referrer`
- **Extraer el valor de**: `value`
- **Atributo de destino**: `referrer`

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

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de matrices:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo    |              |  |                                                    |
|--------------|------------------|----------|---------------------------------------------------------------|
| `type`       |            |       |  del procesador.                                        |
| `name`       |            |        | CadenaNoNombre del procesador.                                        |
| `is_enabled` |           |        | BooleanoNoSi el procesador está habilitado. Predeterminado: `false`.        |
| `operation.type`  |       |       | StringSíTipo de operación del procesador de matrices.                            |
| `operation.source`  |     |       | StringSíRuta de la matriz de la que se desea seleccionar.                    |
| `operation.target`  | StringSíAtributo      |  de     | destino.                                             |
| `operation.filter`  |     |       | StringSíExpresión para buscar coincidencias con un elemento de la matriz. Se selecciona el primer elemento coincidente.  |
| `operation.value_to_extract`  |  |  | StringYesAttribute para leer en el elemento seleccionado.                  |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

### Longitud de la matriz

Calcula el número de elementos de una matriz.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/array_processor_length.png" alt="Procesador matricial  Longitud" style="width:80%;" >}}

**Ejemplo de entrada:**

```json
{
  "tags": ["prod", "internal", "critical"]
}
```

**Pasos de configuración: **

- **Atributo de matriz**: `tags`
- **Atributo de destino**: `tagCount`

**Resultado:**

```json
{
  "tags": ["prod", "internal", "critical"],
  "tagCount": 3
}
```
{{% /tab %}}
{{% tab "API" %}}

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de matrices:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo           |       |  |                                                    |
|---------------------|-----------|----------|---------------------------------------------------------------|
| `type`              |     |       |  del procesador.                                        |
| `name`              |     |        | CadenaNoNombre del procesador.                                        |
| `is_enabled`        |    |        | BooleanoNoSi el procesador está habilitado. Valor predeterminado: `false`.        |
| `operation.type`    |     |       | StringSíTipo de operación del procesador de matrices.                            |
| `operation.source`  |     |       | StringSíRuta de la matriz de la que se va a extraer la longitud.                   |
| `operation.target`  | StringSíAtributo    |       |  de destino.                                             |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

### Añadir a la matriz

Añade un valor de atributo al final de un atributo de matriz de destino en el registro. 

**Nota**: Si el atributo de matriz de destino no existe en el registro, se crea automáticamente.


{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

{{< img src="logs/log_configuration/processor/array_processor_append.png" alt="Procesador de matrices  Añadir" style="width:80%;" >}}

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
**Pasos de configuración: **

- **Atributo que se va a añadir**: `"network.client.ip"`
- **Matriz a la que se va** a añadir: `sourceIps`

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

Utiliza el [punto final de la API de Datadog Log Pipeline][1] con la siguiente carga útil JSON del procesador de matrices:

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

| ParámetroTipoObligatorioDescripciónCadenaSíTipo                    |        |  |                                                         |
|------------------------------|------------|----------|--------------------------------------------------------------------|
| `type`                       |      |       |  del procesador.                                             |
| `name`                       |      |        | CadenaNoNombre del procesador.                                             |
| `is_enabled`                 |     |        | BooleanoNoSi el procesador está habilitado. Valor predeterminado: `false`.             |
| `operation.type`             |      |       | StringSíTipo de operación del procesador de matrices.                                 |
| `operation.source`           |      |       | StringSíAtributo que se va a añadir.                                               |
| `operation.target`           |      |       | StringSíMatriz a la que se va a añadir el atributo.                                      |
| `operation.preserve_source`  |     |       | BooleanNoSi se conserva la fuente original tras la reasignación. Valor predeterminado: `false`.   |

[1]: /es/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Procesador decodificador

El procesador Decoder convierte los campos de cadena codificados de «binarytotext» (como Base64 o Hex/Base16) a su representación original. Esto permite interpretar los datos en su contexto original, ya sea como una cadena UTF-8, un comando ASCII o un valor numérico (por ejemplo, un entero derivado de una cadena hexadecimal). El procesador Decoder resulta especialmente útil para analizar comandos codificados, registros de sistemas específicos o técnicas de evasión utilizadas por los autores de amenazas. 

**Notas**: Cadenas

-  truncadas: el procesador gestiona correctamente las cadenas Base64/Base16 parcialmente truncadas recortándolas o rellenándolas según sea necesario.Formato

-  hexadecimal: La entrada hexadecimal se puede decodificar en una cadena (UTF8) o en un entero. Gestión

-  de errores: Si la decodificación falla (debido a una entrada no válida), el procesador omite la transformación y el registro permanece sin cambios.

{{< tabs >}}
{{% tab "INTERFAZ DE USUARIO" %}}

1. Configure el atributo de origen: Indique la ruta del atributo que contiene la cadena codificada, como `encoded.base64`.
2. Seleccione la codificación de origen: Elija la codificación «binarytotext» del origen:`base64`  o `base16/hex`.
2. Para `Base16/Hex`: Elija el formato de salida:`string (UTF-8)`  o `integer`.
3. Configure el atributo de destino: Introduzca la ruta del atributo donde se almacenará el resultado descodificado.

{{< img src="logs/log_configuration/processor/decoder-processor.png" alt="Procesador decodificador  Añadir" style="width:80%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Procesador de información sobre amenazas

Añade el procesador de inteligencia sobre amenazas para evaluar los registros en función de la tabla utilizando una clave específica de indicador de compromiso (IoC), como una dirección IP. Si se encuentra una coincidencia, el registro se completa con los atributos pertinentes de inteligencia sobre amenazas (TI) de la tabla, lo que mejora la detección, la investigación y la respuesta.

Para obtener más información, consulte [Inteligencia sobre amenazas][9]. 

## Procesador OCSF

Utilice el procesador OCSF para normalizar sus registros de seguridad de acuerdo con el [Open Cybersecurity Schema Framework (OCSF)][11]. El procesador OCSF te permite crear asignaciones personalizadas que reasignan los atributos de tus registros a clases del esquema OCSF y a sus atributos correspondientes, incluidos los atributos enumerados (ENUM).

El procesador te permite: 

- asignar atributos de los registros de origen a atributos de 
- destino de OCSF; configurar atributos ENUM con valores numéricos específicos
- ; crear subcanales para diferentes clases 
- de eventos de destino de OCSF; y preprocesar los registros antes de la reasignación de OCSF.

Para obtener instrucciones detalladas de instalación, ejemplos de configuración y consejos para la resolución de problemas, consulte [OCSF Processor][12]. Lecturas

##  recomendadas

{{< partial name="whats-next/whats-next.html" >}}

<br>
*«Logging without Limits» es una marca comercial de Datadog, Inc.

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