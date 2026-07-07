---
algolia:
  tags:
  - logs processors
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
aliases:
- /es/logs/processing/processors/
description: Analiza, enriquece y estructura tus registros utilizando procesadores
  en Log Management de Datadog.
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentación
  text: Descubre las canalizaciones de Datadog
- link: /logs/logging_without_limits/
  tag: Documentación
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus registros
- link: https://www.youtube.com/watch?v=OztSU3JzfC8&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=4&t=245s
  tag: Video
  text: 'Consejos y trucos: agrega datos comerciales a los registros desde puntos
    de conexión de comercio minorista'
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centro de aprendizaje
  text: Construye y gestiona canalizaciones de registros
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: Centro de aprendizaje
  text: Procesa registros de manera sencilla con canalizaciones de integración
title: Procesadores
---
## Resumen {#overview}

<div class="alert alert-info">Los procesadores descritos en esta documentación son específicos para entornos de registro basados en la nube. Para analizar, estructurar y enriquecer registros locales, consulta <a href="https://docs.datadoghq.com/observability_pipelines/processors/">Observability Pipelines</a>.</div>

Un procesador se ejecuta dentro de una [canalización][1] para completar una acción de estructuración de datos y generar atributos para enriquecer tus registros.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Procesadores" style="width:100%" >}}

En [configuraciones de registro][1], puedes configurar procesadores como el [Parser Grok][3] o el [remapeador de fechas][4] para ayudar a extraer, crear y remapear atributos para enriquecer tus registros y mejorar la búsqueda facetada.

**Notas**:

- Los registros estructurados deben enviarse en un formato válido. Si la estructura contiene caracteres no válidos para el parseo, estos deben eliminarse a nivel del Agente utilizando la función [mask_sequences][2].

- Como mejor práctica, se recomienda utilizar un máximo de 20 procesadores por canalización.

## Tipos de procesadores {#processor-types}

{{< whatsnext desc="Seleccione un tipo de procesador para aprender más:">}}
    {{< nextlink href="logs/log_configuration/processors/arithmetic_processor">}}<strong>Procesador Aritmético</strong>: Agregue un nuevo atributo a un registro con el resultado de una fórmula aplicada a atributos numéricos existentes.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/array_processor">}}<strong>Procesador de Arreglos</strong>: Extraiga, agregue o transforme valores de arreglos JSON en sus registros.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/remapper">}}<strong>Remapeador de Atributos</strong>: Remapee atributos o etiquetas de fuente a otro atributo o etiqueta de destino.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/category_processor">}}<strong>Procesador de Categorías</strong>: Agregue un nuevo atributo a un registro basado en una coincidencia de consulta de búsqueda, para agrupamiento y clasificación.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/decoder_processor">}}<strong>Procesador Decodificador</strong>: Traduce campos codificados de binario a texto (como Base64 o Hex) a su representación original.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/geoip_parser">}}<strong>Parser GeoIP</strong>: Extraiga información de continente, país, subdivisión o ciudad de un atributo de dirección IP.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/grok_parser">}}<strong>Parser Grok</strong>: Cree reglas de parseo personalizadas para extraer y estructurar datos de mensajes de registro o atributos específicos.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_date_remapper">}}<strong>Remapeador de Fechas de Registro</strong>: Asigne uno o más atributos como la marca de tiempo oficial para sus registros.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_message_remapper">}}<strong>Remapeador de Mensajes de Registro</strong>: Asigne uno o más atributos como el mensaje oficial para sus registros.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/log_status_remapper">}}<strong>Remapeador de Estado de Registro</strong>: Asigne uno o más atributos como el estado de severidad oficial para sus registros.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/lookup_processor">}}<strong>Procesador de Búsqueda</strong>: Mapee un atributo de registro a un valor legible por humanos de una Tabla de Referencia o tabla de mapeo.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/ocsf_processor">}}<strong>Procesador OCSF</strong>: Normalice los registros de seguridad al Marco de Esquema de Ciberseguridad Abierto (OCSF).{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/service_remapper">}}<strong>Remapeador de Servicios</strong>: Asigne uno o más atributos como el servicio oficial para sus registros.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/span_remapper">}}<strong>Remapeador de Tramos</strong>: Defina una correlación entre tramos de aplicación y registros.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/string_builder_processor">}}<strong>Procesador de Constructor de Cadenas</strong>: Construya un nuevo atributo a partir de una plantilla de atributos existentes y cadenas en bruto.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/threat_intel_processor">}}<strong>Procesador de Inteligencia de Amenazas</strong>: Enriquezca los registros con atributos de Inteligencia de Amenazas al hacer coincidir con una tabla de indicadores de compromiso (IoC).{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/trace_remapper">}}<strong>Remapeador de Trazas</strong>: Defina una correlación entre trazas de aplicación y registros.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/url_parser">}}<strong>Parser de URL</strong>: Extraiga parámetros de consulta y otros componentes de un atributo de URL.{{< /nextlink >}}
    {{< nextlink href="logs/log_configuration/processors/user_agent_parser">}}<strong>Parser de User-Agent</strong>: Analiza un atributo de User-Agent para extraer el sistema operativo, el navegador, el dispositivo y otros datos del usuario.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/pipelines/
[2]: /es/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[3]: /es/logs/log_configuration/processors/grok_parser/
[4]: /es/logs/log_configuration/processors/log_date_remapper/