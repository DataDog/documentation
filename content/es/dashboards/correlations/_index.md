---
aliases:
- /es/graphing/correlations/
further_reading:
- link: /dashboards/
  tag: Documentación
  text: Dashboards de Datadog
- link: /notebooks/
  tag: Documentación
  text: Notebooks de Datadog
- link: /tracing/services/service_page/
  tag: Documentación
  text: Página de servicios de APM
- link: /watchdog/
  tag: Documentación
  text: Watchdog
title: Correlaciones de métricas
---

## Información general

<div class="alert alert-info">Las correlaciones de métricas se encuentran disponible para los <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">widgets de serie temporal</a> con la fuente de datos de la <strong>métrica</strong>.</div>

Las correlaciones de métricas pueden ayudarte a encontrar las posibles causas de un problema observado mediante la búsqueda de otras métricas que mostraron un comportamiento irregular aproximadamente al mismo tiempo. Las correlaciones escanean tus métricas de diferentes fuentes, como dashboards, integraciones, APM y métricas personalizadas.

## Buscar

Puedes iniciar tu exploración de correlaciones de métricas desde cualquiera de tus dashboards, notebooks, APM, alertas de Watchdog o páginas de estado del monitor.

* Haz clic izquierdo en cualquier gráfica y selecciona **Find correlated metrics** (Buscar métricas correlacionadas).
* En una gráfica a pantalla completa, haz clic en la pestaña **Correlations** (Correlaciones).

{{< img src="dashboards/correlations/find_correlated_metrics.png" alt="Opción de menú de la gráfica del dashboard para buscar métricas correlacionadas" style="width:80%;">}}

{{< img src="dashboards/correlations/correlations_tab.png" alt="Búsqueda del dashboard" style="width:80%;">}}

Las correlaciones *intentan* detectar de manera automática el área de interés (comportamiento anómalo) de tu métrica. Si el área de interés no se selecciona de manera automática o se debe ajustar, puedes establecer de forma manual el área de interés desde la opción de [editar búsqueda](#edit). Datadog busca otras métricas que muestren un comportamiento anómalo en momentos que coincidan con el área de interés.

**Nota**: Las búsquedas de correlación se encuentran disponibles para una única métrica. En el caso de las gráficas con varias métricas, selecciona la serie de interés. En una gráfica a pantalla completa, selecciona una serie en la leyenda de la gráfica y, a continuación, haz clic en la pestaña **Correlations** (Correlaciones).

### Editar

Puedes personalizar los parámetros de búsqueda predeterminados de las correlaciones. En una gráfica a pantalla completa, en la pestaña *Correlations* (Correlaciones), haz clic en el botón **Edit Search** (Editar búsqueda), o haz clic directamente en la gráfica.

* Haz clic y arrastra sobre la gráfica para establecer el período de tiempo de la búsqueda de correlaciones. Si un área ya está seleccionada (recuadro rosa), puedes mover o redimensionar la selección.
* Define las fuentes desde las que quieres buscar correlaciones (servicios de APM, integraciones, dashboards o métricas personalizadas).
* `Auto-select` (Selección automática) o `Custom select` (Selección personalizada) de categorías específicas. En el caso de las métricas personalizadas, se requiere al menos una selección.
* La categoría de métricas personalizadas es la única que no se selecciona de manera predeterminada. Elige espacios de nombres de métricas o métricas individuales para buscar correlaciones.
* Utiliza el cuadro de filtro de etiquetas para delimitar la búsqueda por etiqueta.

### Resultados

Debajo de la gráfica de búsqueda se muestra una lista de resultados de búsqueda con lo siguiente:

* **Type** (Tipo): gráfica que representa el tipo de fuente (servicio de APM, integración, dashboard, o métrica personalizada).
* **Source** (Fuente): el nombre de la fuente de las métricas correlacionadas.
* **Correlations** (Correlaciones): la cantidad de métricas correlacionadas encontradas.
* **Preview** (Vista previa): gráfica de previsualización de las métricas correlacionadas.

{{< img src="dashboards/correlations/search_results.png" alt="Resultados de la búsqueda" style="width:80%;">}}

A medida que se cargan los resultados, puedes explorar los detalles sin esperar a tener todos los resultados. Cuando finaliza la búsqueda, aparece el mensaje «Search completed!» (¡Búsqueda completada!).

## Investigar

En la [lista de resultados](#results), selecciona una fila para investigar los detalles de esa correlación.

* De forma similar a los dashboards, al pasar el mouse por encima de una gráfica se crea una línea sincronizada con el tiempo en todas las demás gráficas.
* Para ver todas las fuentes, elimina el filtro en el menú.
* Las fuentes de cada métrica se encuentran enlazadas por nombre. Por ejemplo, los nombres de dashboard se enlazan con el dashboard.
* Utiliza el icono de exportación para exportar la gráfica al dashboard o notebook, o copiar la consulta.

{{< img src="dashboards/correlations/correlated_metric_source_details.png" alt="Vista detallada de la fuente de la métrica correlacionada" style="width:90%;">}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}