---
description: Comprenda los valores y los detalles de evaluación devueltos por los
  SDK de Feature Flags de Datadog.
further_reading:
- link: /feature_flags/concepts/evaluation_context
  tag: Documentación
  text: Contexto de evaluación
- link: /feature_flags/concepts/targeting_rules
  tag: Documentación
  text: Reglas y filtros de segmentación
- link: /feature_flags/concepts/evaluation_tester
  tag: Documentación
  text: Probador de evaluación
title: Resultados de la evaluación de Feature Flags
---
## Descripción general {#overview}

Los SDK de Feature Flags de Datadog utilizan la [API de evaluación de OpenFeature][1]. Cada evaluación de Feature Flags requiere que su aplicación proporcione un valor predeterminado. Si el proveedor no puede resolver la Feature Flags, el SDK devuelve ese valor. Los métodos de evaluación detallados también devuelven información como la variante resuelta, la razón de la resolución y el código de error.

## Feature Flags deshabilitadas {#disabled-flags}

OpenFeature define [`FLAG_NOT_FOUND`][3] para evaluaciones donde el proveedor no puede encontrar la Feature Flags solicitada en su configuración disponible. Datadog aplica esta condición cuando falta la Feature Flags en la configuración de tiempo de ejecución entregada para el entorno seleccionado.

Cuando deshabilita la Feature Flags en un entorno de Datadog, Datadog la omite de la configuración de tiempo de ejecución entregada a los SDK del lado del cliente y del servidor. Por lo tanto, el proveedor no puede distinguir una Feature Flags deshabilitada de una clave de Feature Flags desconocida. Ambas condiciones producen el siguiente resultado de evaluación detallado:

| Campo | Resultado |
|---|---|
| Valor | El valor predeterminado proporcionado por su aplicación |
| Razón | `ERROR` |
| Código de error | `FLAG_NOT_FOUND` |
| Variante | Ninguna |

OpenFeature también define [`DISABLED`][2] como una razón de resolución para los proveedores que reciben una Feature Flags marcada como deshabilitada. Debido a que los proveedores de Datadog no reciben Feature Flags deshabilitadas en las configuraciones de tiempo de ejecución entregadas por Datadog, devuelven `FLAG_NOT_FOUND` en lugar de `DISABLED`.

El valor devuelto es el valor predeterminado de la llamada de evaluación, no la variante predeterminada configurada en Datadog. No se resuelve ninguna variante de Datadog para una Feature Flags deshabilitada.

### Manejar los resultados de Feature Flags deshabilitadas {#handle-disabled-flag-results}

- Proporcionar un valor predeterminado seguro para cada evaluación.
- Evitar escribir un registro de error para cada resultado `FLAG_NOT_FOUND`. Las Feature Flags deshabilitadas pueden devolver este código durante la operación normal; en su lugar, agregue, muestree o limite la tasa de estos registros.
- Si su aplicación debe distinguir una Feature Flags inactiva de una clave desconocida, mantenga la Feature Flags habilitada y sirva una variante de control explícita o desactivada. Inspeccione la variante devuelta para identificar ese estado.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/sections/flag-evaluation/
[2]: https://openfeature.dev/specification/types/#resolution-reason
[3]: https://openfeature.dev/specification/types/#error-code