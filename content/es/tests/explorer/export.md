---
further_reading:
- link: /tests/search/
  tag: Documentación
  text: Buscar pruebas
- link: /tests/explorer/saved_views/
  tag: Documentación
  text: Información sobre Vistas guardadas
- link: /monitors/types/ci/
  tag: Documentación
  text: Más información sobre Monitores de pruebas de CI
kind: documentación
title: Exportar ejecuciones de prueba
---

## Información general

Puedes utilizar la consulta de búsqueda y los gráficos de visualización de Visibilidad de pruebas en dashboards, monitores y notebooks, o puedes buscar eventos mediante programación con el [endpoint Buscar eventos de pruebas][1]. 

## Exportar la consulta de búsqueda o visualización

Puedes copiar, exportar o descargar tu consulta de búsqueda agregada y los gráficos de visualización en el [Explorador de visibilidad de pruebas][2].

{{< img src="continuous_integration/explorer/test_export.png" alt="Vista de la exportación de ejecuciones de prueba en el Explorador de visibilidad de pruebas" style="width:100%;">}}

Haz clic en el botón **Export** (Exportar) de la esquina derecha y selecciona una opción del menú desplegable:

- Comparte tu [vista guardada][6] del [Explorador de visibilidad de pruebas][3].
- Exporta los resultados de tu búsqueda a un [monitor de pruebas de CI][4] que active alertas en función de umbrales predefinidos.
- Exporta los resultados de tu búsqueda a un [notebook existente][5] con fines de elaboración de informes o consolidación.
- Descarga los resultados de tu búsqueda como archivo CSV para eventos de pruebas individuales de visibilidad de CI y agregaciones específicas.

Las opciones disponibles para algunos tipos de visualización no son compatibles con otros. Por ejemplo, no se puede descargar un gráfico de distribución como archivo CSV.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/ci-visibility-tests/#search-tests-events
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /es/tests/explorer/
[4]: /es/monitors/types/ci/
[5]: /es/notebooks/
[6]: /es/tests/explorer/saved_views/