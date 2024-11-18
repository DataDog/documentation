---
title: Límites de tasa
type: documentación
---

{{< h2 >}}Límites de tasa{{< /h2 >}}

Muchos endpoints de la API tienen un límite de tasa. Una vez que se supera un determinado número de solicitudes en un periodo específico, Datadog devuelve un error.

Si tienes una tasa limitada, puedes ver un 429 en el código de respuesta. Puedes esperar el tiempo designado por `X-RateLimit-Period` antes de volver a realizar llamadas, o pasar a realizar llamadas a una frecuencia ligeramente mayor que `X-RateLimit-Limit` o `X-RateLimit-Period`.

Puedes aumentar los límites de tasa a partir de los valores predeterminados [poniéndote en contacto con el equipo de soporte de Datadog][1].

En cuanto a la política de límite de tasa de API:

- Datadog **no limita la tasa** de envío de puntos de datos/métricas (consulta la [sección de métricas][2] para más información sobre cómo se gestiona la tasa de envío de métricas). El cruce de límites depende de la cantidad de [métricas personalizadas][3] según tu acuerdo.
- La API para el envío de logs no tiene un límite de tasa.
- El límite de tasa para el envío de eventos es de `500,000` eventos por hora y organización.
- Los límites de tasa para los endpoints varían y se incluyen en los encabezados que se detallan a continuación. Estos pueden ampliarse bajo demanda.

<div class="alert alert-warning">
 La lista no incluye todos los límites de tasa de las API de Datadog. Si experimentas limitaciones de tasa, ponte en contacto con <a href="https://www.datadoghq.com/support/">el soporte</a> para obtener más información sobre las API que utilizas y sus límites.</div>

| Encabezados de límite de tasa      | Descripción                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | Número de solicitudes permitidas en un periodo.             |
| `X-RateLimit-Period`    | Duración en segundos de los reinicios (alineados con el calendario). |
| `X-RateLimit-Remaining` | Número de solicitudes permitidas que quedan en el periodo actual.  |
| `X-RateLimit-Reset`     | Tiempo en segundos hasta el próximo reinicio.                        |
| `X-RateLimit-Name`      | Nombre del límite de tasa para las solicitudes de aumento.             |

[1]: /es/help/
[2]: /es/api/v1/metrics/
[3]: /es/metrics/custom_metrics/