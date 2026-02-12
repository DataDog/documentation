---
further_reading:
- link: /continuous_integration/search/
  tag: Documentación
  text: Buscar tus pipelines
- link: /continuous_integration/explorer/saved_views
  tag: Documentación
  text: Información sobre las vistas guardadas
- link: /monitors/types/ci
  tag: Documentación
  text: Más información sobre los monitores de CI Pipeline
title: Exportar ejecuciones de pipelines
---

## Información general

Puedes utilizar tus consultas de búsqueda y gráficas de visualización de CI Visibility en dashboards, monitores y notebooks, o programáticamente buscar eventos utilizando el [endpoint Buscar eventos de pipeline][1]. 

## Exportar la consulta de búsqueda o visualización

Puedes copiar, exportar o descargar tu consulta agregada de búsqueda y las gráficas de visualización en el [CI Visibility Explorer][2].

{{< img src="continuous_integration/explorer/pipeline_export.png" alt="Exporta tu vista de pipelines view en el CI Visibility Explorer" style="width:100%;">}}

Haz clic en el botón **Export** (Exportar) de la esquina derecha y selecciona una opción del menú desplegable:

- Comparte tu [vista guardada][7] del [CI Visibility Explorer][3].
- Exporta los resultados de búsqueda a un [monitor de CI Pipeline][5] que active alertas en función de umbrales predefinidos.
- Exporta tus resultados de búsqueda a un [notebook existente][6] con fines de elaboración de informes o consolidación.
- Descarga tus resultados de búsqueda como archivo CSV para tests individuales de CI Visibility o eventos de pipeline y agregaciones específicas.

Las opciones disponibles para algunos tipos de visualización no son compatibles con otros. Por ejemplo, no se puede descargar un gráfico de distribución como archivo CSV.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/ci-visibility-pipelines/#search-pipelines-events
[2]: https://app.datadoghq.com/ci/pipeline-executions
[3]: /es/continuous_integration/explorer/
[4]: /es/api/latest/
[5]: /es/monitors/types/ci/
[6]: /es/notebooks/
[7]: /es/continuous_integration/explorer/saved_views/