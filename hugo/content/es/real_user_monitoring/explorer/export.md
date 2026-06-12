---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Búsqueda de tus eventos
- link: /dashboards
  tag: Documentación
  text: Más información sobre dashboards
- link: /notebooks
  tag: Documentación
  text: Más información sobre notebooks
- link: /monitors
  tag: Documentación
  text: Más información sobre monitores
title: Exportar eventos y gráficos RUM
---

## Información general

Puedes utilizar tus gráficos de consulta y visualización RUM en dashboards, monitores y notebooks. También puedes buscar eventos programáticamente utilizando el [endpoint de búsqueda de eventos RUM][1]. 

## Exportar la consulta o visualización de búsqueda

Puedes copiar, exportar o descargar tu consulta de búsqueda agregada y los gráficos de visualización en el [Explorador RUM][2].

{{< img src="real_user_monitoring/explorer/export/rum-explorer-export-5.png" alt="Botón Exportar, en la esquina derecha del Explorador RUM" width="100%" >}}

Haz clic en el botón **Más** de la esquina derecha y selecciona una opción del menú desplegable:

- Copia tu consulta como un comando cURL para probarla en el [Explorador RUM][3] y crea informes personalizados utilizando las [API de Datadog][4].
- Exporta los resultados de tu búsqueda a un [monitor][6] que active alertas en función de umbrales predefinidos.
- Exporta los resultados de tu búsqueda a un [notebook existente][7] con fines de elaboración de informes o consolidación.
- Descarga los resultados de tus búsquedas como archivos CSV para eventos RUM individuales y agregaciones específicas. Puedes exportar hasta eventos 5.000 RUM individuales con listas y hasta 500 agregaciones para series temporales, listas principales y gráficos de tablas.
- Genera una [nueva métrica][5] utilizando los resultados de tus búsquedas, que podrás ver en el Explorador de métricas.

Las opciones disponibles para algunos tipos de visualización no son compatibles con otras. Por ejemplo, no se puede descargar un gráfico de distribución en un archivo CSV.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/latest/rum/#search-rum-events
[2]: https://app.datadoghq.com/rum/explorer
[3]: /es/real_user_monitoring/explorer/
[4]: https://docs.datadoghq.com/es/api/latest/rum/
[5]: /es/metrics/explorer/
[6]: /es/monitors/types/real_user_monitoring/
[7]: /es/notebooks/