---
aliases:
- /es/synthetics/apm
description: APM y rastreo distribuido con la monitorización Synthetic
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: /tracing/
  tag: Documentación
  text: APM y rastreo distribuido
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilita la solución de problemas gracias a la correlación entre productos.
title: APM Synthetic
---

{{< img src="synthetics/apm/synthetics-apm.mp4" alt="APM and monitorización Synthetic" video="true" >}}

## Información general

Gracias a la integración de APM con la monitorización Synthetic, puedes ir desde un test potencialmente fallido a la causa de la falla analizando la traza (trace) generada al ejecutar el test.

Contar con datos específicos de la red (gracias al test), además de información sobre backend, infraestructura y logs (gracias a la traza), cote permitirá conocer con mucho más detalle cómo se comportan tu aplicación, tal como lo experimentan tus usuarios.

## Uso

Las indicaciones de esta página se aplican a todos los [tests de API HTTP][1], [tests de API de varios pasos][2] y [tests de navegador][3] para APM.

### Requisitos previos

* Tu servicio y el endpoint en el que se ejecuta tu test, se [rastrean en APM][4].
* Tu servicio utiliza un servidor HTTP.
* Tu servidor HTTP utiliza una biblioteca compatible con el rastreo distribuido.

Crea un test que alcance a tu servidor HTTP rastreado y Datadog vinculará automáticamente la traza generada por tu servidor con el resultado de test correspondiente.

Para vincular resultados de tests de navegador, permite las URL a las que quieres añadir las cabeceras de integración APM. Puedes hacerlo en los [Parámetros de Synthetic][5]. Utiliza `*` para los comodines:

```text
https://*.datadoghq.com/*
```

## Bibliotecas compatibles

Las siguientes bibliotecas de rastreo de Datadog son compatibles:

| Biblioteca                             | Versión mínima                                                                                                             |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Python][6]                  | [0.50.4][7]                |
| [Go][8]                  | [1.10.0][9]                |
| [Java][10]                  | [0.24.1][11]                |
| [Ruby][12]                  | [0.20.0][13]                |
| [Node.js][14]                  | [0.10.0][15]                |
| [PHP][16]                  | [0.33.0][17]                |
| [.NET][18]                  | [1.18.2][19]                |

### ¿Cómo se vinculan las trazas con los tests?

Datadog utiliza el protocolo de rastreo distribuido y configura las siguientes cabeceras HTTP:


{{< tabs >}}
{{% tab "Datadog" %}}
`x-datadog-trace-id`
: Generado a partir del backend de monitorización Synthetic. Permite a Datadog vincular la traza con el resultado del test.

`x-datadog-parent-id: 0`
: Para tener tests Synthetic como tramo (span) raíz de la traza generada.

`x-datadog-origin: synthetics`
: Para identificar las trazas generados a partir de tus tests de API. Los tramos de estas trazas están etiquetados (tag) con `ingestion_reason:synthetics`.

`x-datadog-origin: synthetics-browser`
: Para identificar las trazas generadas a partir de tus tests de navegador. Estas trazas están etiquetadas con `ingestion_reason:synthetics-browser`.

`x-datadog-sampling-priority: 1`
: Para asegurarte de que el Agent conserva la traza.
{{% /tab %}}
{{% tab "Contexto de rastreo W3C" %}}
`traceparent: [version]-[trace id]-[parent id]-[trace flags]`
: `version`: La especificación asume que la versión se configura en `00`.
: `trace id`: ID de traza de 128 bits, hexadecimal en 32 caracteres. El ID de traza de origen es de 64 bits para conservar la compatibilidad con APM.
: `parent id`: ID de tramo de 64 bits, hexadecimal en 16 caracteres.
: `trace flags`: Muestreado (`01`) o no muestreado (`00`)

**Ejemplo**:
: `traceparent: 00-00000000000000008448eb211c80319c-b7ad6b7169203331s-01`
{{% /tab %}}
{{< /tabs >}}

### ¿Durante cuánto tiempo se conservan las trazas?

Estas trazas se conservan durante 15 días con el filtro de conservación `Synthetics Default`, [igual que tus clásicas trazas APM][20].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: /es/synthetics/api_tests/http_tests/?tab=requestoptions
[2]: /es/synthetics/multistep?tab=requestoptions
[3]: /es/synthetics/browser_tests/
[4]: /es/tracing/
[5]: https://app.datadoghq.com/synthetics/settings/integrations
[6]: /es/tracing/trace_collection/dd_libraries/python/
[7]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.50.4
[8]: /es/tracing/trace_collection/dd_libraries/go/
[9]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.10.0
[10]: /es/tracing/trace_collection/dd_libraries/java/
[11]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.1
[12]: /es/tracing/trace_collection/dd_libraries/ruby/
[13]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.20.0
[14]: /es/tracing/trace_collection/dd_libraries/nodejs/
[15]: https://github.com/DataDog/dd-trace-js/releases/tag/v0.10.0
[16]: /es/tracing/trace_collection/dd_libraries/php/
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/0.33.0
[18]: /es/tracing/trace_collection/dd_libraries/dotnet-core/
[19]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v1.18.2
[20]: /es/tracing/trace_pipeline/trace_retention/