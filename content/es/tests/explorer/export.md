---
further_reading:
- link: /tests/explorer/
  tag: Documentación
  text: Buscar tests
- link: /tests/explorer/saved_views/
  tag: Documentación
  text: Información sobre Vistas guardadas
- link: /monitors/types/ci/
  tag: Documentación
  text: Más información sobre Monitores de tests de CI
title: Exportar ejecuciones de tests
---

## Información general

Puedes utilizar tus gráficos de consulta y visualización de Test Optimization en dashboards, monitores y notebooks o buscar mediante programación eventos utilizando el [endpoint de eventos de tests de búsqueda][1].

## Exportar la consulta de búsqueda o visualización

Puedes copiar, exportar o descargar tus gráficos agregados de consulta y visualización en el [Test Optimization Explorer][2].

{{< img src="/tests/explorer/export.png" text="Descargar la lista de resultados de tests consultados en Test Optimization como un archivo CSV" style="width:100%" >}}

Haz clic en el botón **Export** (Exportar) de la esquina derecha y selecciona una opción del menú desplegable:

- Comparte tu [vista guardada][6] del [Test Optimization Explorer][3].
- Exporta los resultados de tu búsqueda a un [monitor de tests de CI][4] que active alertas en función de umbrales predefinidos.
- Exporta los resultados de tu búsqueda a un [notebook existente][5] con fines de elaboración de informes o consolidación.
- Descarga los resultados de tu búsqueda como archivo CSV para eventos de tests individuales de CI Visibility y agregaciones específicas.

Las opciones disponibles para algunos tipos de visualización no son compatibles con otros. Por ejemplo, no se puede descargar un gráfico de distribución como archivo CSV.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/ci-visibility-tests/#search-tests-events
[2]: https://app.datadoghq.com/ci/test-runs
[3]: /es/tests/explorer/
[4]: /es/monitors/types/ci/
[5]: /es/notebooks/
[6]: /es/tests/explorer/saved_views/