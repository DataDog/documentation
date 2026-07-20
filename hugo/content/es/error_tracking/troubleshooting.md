---
title: Solucionar problemas de Error Tracking
---

Si experimentas un comportamiento inesperado de Error Tracking, los pasos para la resolución de problemas que se indican a continuación pueden ayudarte a resolver el incidente rápidamente. Si sigues teniendo problemas, ponte en contacto con el [servicio de asistencia de Datadog][1].

Datadog recomienda actualizar regularmente a la última versión de las bibliotecas de rastreo de Datadog, los SDK para móviles y los SDK web, ya que cada versión contiene mejoras y correcciones.

## No se encuentran errores en Error Tracking

### Logs

Asegúrate de que el mensaje de error tiene los [atributos requeridos][2] y de que Error Tracking para logs está [activado][7].

Este [ejemplo de consulta][3] busca logs que cumplan los criterios de inclusión en Error Tracking.

### APM

Para ser procesado por Error Tracking, un tramo (span) debe tener estos atributos:

- `error.type`
- `error.message`
- `error.stack`

<div class="alert alert-info">
<strong>Nota:</strong> El stack tecnológico debe tener al menos dos líneas y un marco <em>significativo</em> (un marco con un nombre de función y un nombre de archivo en la mayoría de los lenguajes).
</div>

Este [ejemplo de consulta][5] busca tramos que cumplan los criterios de inclusión en Error Tracking.

### RUM

Error Tracking solo procesa errores que se envían con la fuente configurada como `custom`, `source`, `report` o `console` y contienen una traza de stack tecnológico. Los errores enviados con cualquier otra fuente (como `network`) o enviados desde extensiones del navegador no son procesados por Error Tracking.

Este [ejemplo de consulta][6] muestra los errores RUM que cumplen los criterios de inclusión en Error Tracking.

### Filtros de inclusión/exclusión

Asegúrate de que los errores que buscas coinciden con al menos un filtro de inclusión y ningún filtro de exclusión. Comprueba la configuración de tus filtros (más información en [Gestionar la recopilación de datos][8]).

## No se encontraron ejemplos de error de un incidente

Se procesan todos los errores, pero solo los errores retenidos están disponibles en el panel de incidentes como un ejemplo de error.

### APM

Los tramos asociados al error deben retenerse con un filtro de retención personalizado para que los ejemplos de ese error aparezcan en el panel de incidentes.

[1]: /es/help/
[2]: /es/logs/error_tracking/backend/?tab=serilog#attributes-for-error-tracking
[3]: https://app.datadoghq.com/logs?query=status%3A%28emergency%20OR%20alert%20OR%20critical%20OR%20error%29%20AND%20%28%40error.stack%3A%2A%20OR%20%40error.kind%3A%2A%29%20
[5]: https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20%40error.stack%3A%2A%20AND%20%40error.message%3A%2A%20AND%20error.type%3A%2A%20
[6]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aerror%20%40error.stack%3A%2A
[7]: https://app.datadoghq.com/error-tracking/settings
[8]: /es/error_tracking/manage_data_collection/