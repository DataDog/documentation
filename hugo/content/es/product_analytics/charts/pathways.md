---
aliases:
- /es/real_user_monitoring/product_analytics/sankey
- /es/product_analytics/sankey
- /es/product_analytics/journeys/sankey
- /es/product_analytics/journeys/pathways
further_reading:
- link: /product_analytics/journeys
  tag: Documentación
  text: Gráficos
- link: /dashboards/widgets/sankey/
  tag: Documentación
  text: Cree widgets de Sankey en los paneles
title: Pathways
---
## Descripción general {#overview}

Los diagramas de Pathways le permiten visualizar todos los recorridos de los usuarios a través de su aplicación para analizar la ruta crítica.

{{< img src="/product_analytics/journeys/pathways/ga_pathway_diagrams_page.png" alt="El diagrama de Pathways predeterminado para una aplicación" style="width:90%;" >}}

Cada nodo representa una visualizar que el usuario visitó. El grosor de cada nodo representa el recuento de sesiones de usuario en esa página. Una página con menos visitantes tiene un nodo más delgado en el diagrama.

Si un usuario visita la misma página varias veces durante su sesión, esa página solo se cuenta una vez.

Los eventos de acción no son compatibles con el diagrama de Pathways.

## Cree un diagrama de Pathways {#build-a-pathways-diagram}

### Visualice el diagrama predeterminado {#view-the-default-diagram}

1. Navegue a [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Charts{{< /ui >}}][1].
2. Haga clic en {{< ui >}}Pathways{{< /ui >}} si aún no está seleccionado. Esto muestra la visualización predeterminada que representa los recorridos de usuario más populares en su aplicación.

### Inicie o finalice el diagrama en una visualizar determinada {#start-or-end-the-diagram-at-a-given-view}

Puede usar el menú de la izquierda para personalizar este diagrama y mostrar:
- los pasos que siguieron los usuarios *después de* visitar una visualizar determinada
- los pasos que siguieron los usuarios *antes de* visitar una visualizar determinada

El ejemplo a continuación muestra los cuatro pasos que siguen los usuarios en los Estados Unidos después de visitar `/department/lighting`:

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img2.png" alt="Un diagrama de Pathways personalizado para una aplicación" style="width:90%;" >}}

### Graficar todas las visualizar que contienen una frase determinada {#graph-all-views-containing-a-given-phrase}

Los diagramas de Pathways admiten [comodines de Datadog][2], lo que le permite crear un diagrama de todas las visualizar que contienen una frase determinada.

Para hacer coincidir varias rutas, escriba un comodín en lugar de elegir un solo nombre de visualizar. El siguiente ejemplo muestra los cinco pasos que siguen los usuarios después de visitar cualquier visualizar que coincida con `/department/*`:

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img3.png" alt="Un diagrama de Pathways que utiliza un comodín para hacer coincidir varias rutas" style="width:90%;" >}}

## Analizar un diagrama de Pathways {#analyze-a-pathways-diagram}

Puede pasar el cursor sobre un nodo del diagrama para ver la cantidad de sesiones que incluyeron visitas a esa visualizar.

Haga clic en un nodo para obtener una lista de opciones de análisis, como ver una muestra de [Session Replay][3] o crear un diagrama de Pathways que comience con esa visualizar.

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img4.png" alt="El menú de acciones de un nodo de diagrama de Pathways" style="width:90%;" >}}

### Convertir el diagrama en un embudo {#convert-the-diagram-to-a-funnel}

1. Desde la página del diagrama de Pathways, haga clic en el botón {{< ui >}}Build Funnel{{< /ui >}}.
2. En el diagrama de Pathways, haga clic en los nodos de las visualizar que desea incluir en el embudo.
3. Haga clic en {{< ui >}}Create Funnel From Selection{{< /ui >}}.

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img5.png" alt="Una conversión de Pathways a embudo en proceso" style="width:90%;" >}}

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/pathways
[2]: /es/real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /es/session_replay/