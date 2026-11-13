---
aliases:
- /es/graphing/metrics/explorer/
description: Explore todas sus métricas y realice análisis.
further_reading:
- link: /metrics/summary/
  tag: Documentación
  text: Metrics Summary
- link: /metrics/distributions/
  tag: Documentación
  text: Distribución de métricas
- link: /dashboards/guide/quick-graphs/
  tag: Documentación
  text: Quick Graphs
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: Blog
  text: Administre el volumen de métricas y las etiquetas en su entorno con Observability
    Pipelines
- link: https://www.datadoghq.com/blog/metrics-natural-language-queries/
  tag: Blog
  text: Explore las métricas de Datadog con consultas en lenguaje natural
title: Metrics Explorer
---
## Descripción general {#overview}

El [Metrics Explorer][1] es una interfaz básica para examinar sus métricas en Datadog. Para opciones más avanzadas, cree un [notebook][2] o un [Dashboard] ([screenboard][3] o [timeboard][4]).

## Consultas en lenguaje natural {#natural-language-queries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Las Natural Language Queries para Metrics Explorer no están disponibles para su sitio de Datadog seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utilice Natural Language Queries (NLQ) para describir lo que busca en inglés sencillo. Datadog traduce automáticamente su solicitud a una consulta de métricas estructurada, entendiendo el contexto como sus servicios, atributos y etiquetas. Esto facilita la exploración de métricas sin necesidad de escribir sintaxis compleja.

Para acceder a esta función, haga clic en {{< ui >}}Ask{{< /ui >}} en el campo de búsqueda y escriba su consulta.

{{< img src="/metrics/explorer/metrics_nlq_example_10152025.mp4" alt="Consulta en lenguaje natural en Metrics Explorer que muestra cómo buscar métricas mediante frases en inglés sencillo" video=true >}}

Para deshabilitar NLQ para su organización, debe tener [org_management permissions][11]. Navegue a {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Preferences{{< /ui >}} y desactive la función de Natural Language Queries.

## Sessions {#sessions}

Metrics Explorer mantiene automáticamente un historial de sus investigaciones recientes, lo que facilita explorar y compartir diferentes preguntas sin tener que volver a realizar el trabajo anterior.

Utilice sesiones para:

- **Inicie una investigación independiente:** Haga clic en {{< ui >}}New Session{{< /ui >}} para explorar otra pregunta sin perder su trabajo actual.
- **Regrese a su trabajo anterior:** Seleccione o busque una sesión reciente para continuar una investigación.
- **Conserve una investigación importante:** Fije y cambie el nombre de una sesión para facilitar su reconocimiento y su localización posterior.
- **Explore una alternativa:** Duplique una sesión y modifique la copia mientras conserva la original.
- **Comparta una investigación:** Copie un enlace de sesión para compartirlo con otro usuario.
- **Eliminar una sesión no utilizada:** Elimine una sesión que ya no necesite.

{{< img src="metrics/explorer/09282026_metric_explorer_sessions.png" alt="Ejemplo de sesiones de Metrics Explorer" style="width:80%;" >}}

## Graphing {#graphing}

Utilice el editor de consultas para personalizar el gráfico que se muestra en la página de Metrics Explorer.

Puede especificar el marco de tiempo en la esquina superior derecha de la página. El valor predeterminado es {{< ui >}}Past 1 Hour{{< /ui >}}.

{{< img src="metrics/explorer/metrics_explorer.png" alt="Metrics Explorer mostrando dos consultas en un gráfico de barras" style="width:80%;" >}}

Las métricas que no se han reportado en las últimas 24 horas no aparecen en el editor de consultas. Puede agregar estas métricas a sus gráficos manualmente ingresando el nombre de la métrica o la consulta completa.

### Contexto {#scope}

Defina un contexto de filtrado con el cuadro de texto {{< ui >}}from{{< /ui >}} seleccionando o buscando valores de etiquetas. Por ejemplo, puede usar el cuadro de texto {{< ui >}}from{{< /ui >}} para filtrar valores de métricas de un servidor, clúster, entorno o región específicos.

### Desglose espacial {#space-aggregation}

Defina el [desglose espacial][5] utilizado para combinar los valores de una métrica.

Las opciones posibles son:

* Promedio de los valores reportados (predeterminado)
* Máximo de los valores reportados
* Mínimo de los valores reportados
* Suma de los valores reportados

**Nota**: Las opciones pueden variar según el tipo de métrica seleccionado.

### Funciones y fórmulas {#functions-and-formulas}

Opcionalmente, puede agregar funciones a su consulta usando el botón de funciones. No todas las funciones están disponibles para todos los tipos de métricas. Para obtener más información, consulte la [documentación de querying][6]. 

### Gráfico dividido {#split-graph}

Utilice el botón {{< ui >}}Split Graph{{< /ui >}} para visualizar los datos divididos en gráficos individuales por valores de etiquetas como región, servicio o entorno.

### Exportar {#export}

Utilice el botón {{< ui >}}Export{{< /ui >}} (<i class="icon-export"></i>) para exportar su gráfico:

- Copie un enlace al gráfico para compartirlo
- Agregue un [incidente][8]
- Cree un [monitor][9]
- Guárdelo en un [Dashboard][10]
- Guárdelo en un [notebook][2] 

### Quick Graphs {#quick-graphs}

Con Quick Graphs, tiene más opciones para visualizar sus datos, sin necesidad de crear un [Dashboard][4] o un [Notebook][2]. Estos gráficos son útiles para comprender y solucionar problemas sin crear Dashboards permanentes o configuraciones de visualización complejas.

Para obtener más información, consulte la [documentación de Quick Graphs][7].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /es/notebooks/
[3]: /es/dashboards/#screenboards
[4]: /es/dashboards/#get-started
[5]: /es/metrics/introduction/#space-aggregation
[6]: /es/dashboards/querying/#advanced-graphing
[7]: /es/dashboards/guide/quick-graphs/
[8]: /es/incident_response/incident_management/
[9]: /es/monitors/
[10]: /es/dashboards/
[11]: /es/account_management/rbac/permissions/#access-management