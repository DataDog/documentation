---
aliases:
- /es/observability_pipelines/reference/processing_language/
title: (LEGACY) Lenguaje de procesamiento de Datadog / Lenguaje de reasignación vectorial
---

El Lenguaje de procesamiento de Datadog (DPL), o Lenguaje de reasignación vectorial (VRL), es un lenguaje específico del dominio, orientado a expresiones, diseñado para transformar logs. Presenta una sintaxis sencilla y [funciones integradas][1], adaptadas a casos de uso de observabilidad.

El Lenguaje de procesamiento de Datadog es compatible con la transformación `remap`.

Las transformaciones Remap actúan sobre un único evento y pueden utilizarse para transformarlos o especificar condiciones de enrutamiento y filtrado. Puedes utilizar el DPL de las siguientes maneras:

- Manipula [matrices][2], [cadenas][3] y otros tipos de datos.
- Codifica y descodifica valores utilizando [Codec][4].
- [Encripta][5] y [desencripta][6] valores.
- [Fuerza][7] un tipo de datos a otro tipo de datos (por ejemplo, de un entero a una cadena).
- [Convierte valores syslog][8] en valores legibles.
- Enriquece los valores utilizando [tablas de enriquecimiento][9].
- [Manipula valores IP][10].
- [Analiza][11] valores con reglas personalizadas (por ejemplo, grok, regex, etc.) y funciones predefinidas (por ejemplo, syslog, apache, logs de flujo VPC, etc.).
- Manipula [metadatos][12] y [rutas][13] de eventos.

[1]: /es/observability_pipelines/legacy/reference/processing_language/functions/
[2]: /es/observability_pipelines/legacy/reference/processing_language/functions/#array
[3]: /es/observability_pipelines/legacy/reference/processing_language/functions/#string
[4]: /es/observability_pipelines/legacy/reference/processing_language/functions/#codec
[5]: /es/observability_pipelines/legacy/reference/processing_language/functions/#encrypt
[6]: /es/observability_pipelines/legacy/reference/processing_language/functions/#decrypt
[7]: /es/observability_pipelines/legacy/reference/processing_language/functions/#coerce
[8]: /es/observability_pipelines/legacy/reference/processing_language/functions/#convert
[9]: /es/observability_pipelines/legacy/reference/processing_language/functions/#enrichment
[10]: /es/observability_pipelines/legacy/reference/processing_language/functions/#ip
[11]: /es/observability_pipelines/legacy/reference/processing_language/functions/#parse
[12]: /es/observability_pipelines/legacy/reference/processing_language/functions/#event
[13]: /es/observability_pipelines/legacy/reference/processing_language/functions/#path