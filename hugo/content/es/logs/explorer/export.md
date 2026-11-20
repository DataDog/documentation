---
aliases:
- /es/logs/export
description: Exporte su vista del Explorador de registros para reutilizarla más tarde
  o en diferentes contextos.
further_reading:
- link: logs/explorer/search
  tag: Documentación
  text: Aprenda a filtrar registros
- link: logs/explorer/analytics
  tag: Documentación
  text: Aprenda a agrupar registros
- link: logs/explorer/visualize
  tag: Documentación
  text: Cree visualizaciones a partir de registros
title: Exportar registros
---
## Descripción general {#overview}

En cualquier momento, y dependiendo de su agregación actual, **exporte** o **guarde** su exploración de registros como:

- [{{< ui >}}Saved View{{< /ui >}}][1] para usar como punto de partida de investigación para su yo futuro o para sus compañeros de equipo.
- [{{< ui >}}Dashboard widget{{< /ui >}}][2] o [{{< ui >}}Notebooks widget{{< /ui >}}][8] para fines de informes o consolidación.
- [{{< ui >}}Monitor{{< /ui >}}][3] para activar alertas en umbrales predefinidos.
- [{{< ui >}}Metric{{< /ui >}}][4] para agrupar sus registros en KPIs a largo plazo, a medida que se ingieren en Datadog.
- {{< ui >}}cURL command{{< /ui >}} para probar sus consultas en el Explorador de registros y luego crear informes personalizados usando las API de Datadog [Datadog APIs][5].
- {{< ui >}}CSV{{< /ui >}} (para registros y transacciones individuales). Puede exportar hasta 100,000 registros a la vez para registros individuales, 300 para Patrones y 500 para Transacciones. También puede descargar series temporales, una lista principal o una vista de tabla como un archivo CSV.
- {{< ui >}}Share{{< /ui >}} Vista: Comparta un enlace a la vista actual con sus compañeros de equipo a través de correo electrónico, Slack y más. Vea todas las [integraciones de notificaciones de Datadog][6] disponibles para esta función.

{{< img src="logs/explorer/export3.png" alt="Filtro de búsqueda" style="width:100%;" >}}

También puede guardar registros individuales en un notebook seleccionando {{< ui >}}Save to notebook{{< /ui >}} en el panel lateral del evento de registro. Los registros guardados en notebooks se muestran en un formato fácil de leer, y esta visualización se guarda en el notebook incluso después de que el evento de registro haya superado el periodo de retención.

{{< img src="logs/explorer/save_logs_to_notebooks.png" alt="Guardar registros en notebooks" style="width:80%;" >}}

Para recuperar una lista de registros superior al límite máximo de 1000 registros devuelto por la API de Logs, utilice [la función de paginación][7].

## Formato de exportación CSV{#csv-export-formatting}

Para que los registros exportados sean compatibles con las aplicaciones de hoja de cálculo, Datadog limpia las exportaciones CSV. Por lo tanto, los valores exportados y los nombres de las columnas pueden diferir de los registros originales. Datadog realiza los siguientes cambios:

- **Elimina los saltos de línea** (`\n`, `\r\n`, `\r`) sin insertar espacios. Por ejemplo, `foo\nbar` se convierte en `foobar`.
- **Reemplaza los espacios consecutivos** con un solo espacio.
- **Antepone un apóstrofo (`'`) a los caracteres de fórmula** que comienzan con `=`, `+`, `-`, `@`, una tabulación o un retorno de carro para evitar que las aplicaciones de hoja de cálculo los interpreten como fórmulas.
- **Agrega sufijos numéricos a los nombres de columna duplicados**, como `message(1)`.

Datadog también encierra los valores entre comillas dobles y escapa las comillas dobles dentro de los valores como `""`, siguiendo las reglas estándar de CSV.

Para recuperar registros sin estos cambios de formato CSV, utilice la [Log Search API][5] o [Log Archives][9].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/explorer/saved_views/
[2]: /es/dashboards/
[3]: /es/monitors/types/log/
[4]: /es/logs/logs_to_metrics
[5]: /es/api/latest/logs/
[6]: /es/integrations/#cat-notification
[7]: /es/logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
[8]: /es/notebooks/
[9]: /es/logs/log_configuration/archives/