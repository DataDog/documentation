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
  text: Crear widgets de Sankey en dashboards
title: Diagramas de rutas
---

## Información general

Los diagramas de rutas te permiten visualizar todos los recorridos del usuario en tu aplicación para analizar la ruta crítica.

{{< img src="/product_analytics/journeys/pathways/ga_pathway_diagrams_page.png" alt="Diagrama de rutas por defecto para una aplicación" style="width:90%;" >}}

Cada nodo representa una vista visitada por el usuario. El grosor de cada nodo representa el recuento de sesiones de usuario en esa página. Una página con menos visitantes tiene un nodo más fino en el diagrama.

Si un usuario visita la misma página varias veces durante su sesión, esa página sólo se cuenta una vez.

Los eventos de acciones no son compatibles con el diagrama de rutas.

## Crear un diagrama de rutas

### Ver el diagrama por defecto

1. Ve a [**Product Analytics > Charts** (Análisis de productos > Gráficos)][1].
2. Haz clic en **Pathways** (Rutas) si aún no está seleccionado. Esto muestra la visualización predeterminada que representa los recorridos de usuario más populares en tu aplicación.

### Iniciar o finalizar el diagrama en una vista determinada

Puedes utilizar el menú de la izquierda para personalizar este diagrama y su visualización:
- los pasos que dieron los usuarios *después* de visitar una vista determinada
- los pasos que dieron los usuarios *antes* de visitar una vista determinada

El siguiente ejemplo muestra los cuatro pasos que siguen los usuarios de Estados Unidos después de visitar `/department/lighting`:

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img2.png" alt="Diagrama de rutas personalizado para una aplicación" style="width:90%;" >}}

### Graficar todas las vistas que contienen una frase dada

Los diagramas de rutas admiten [comodines de Datadog][2], lo que permite crear un diagrama de todas las vistas que contengan una frase determinada.

Para que coincidan varias rutas, escribe un comodín en lugar de elegir un único nombre de vista. El siguiente ejemplo muestra los cinco pasos que siguen los usuarios después de visitar cualquier vista que coincida con `/department/*`:

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img3.png" alt="Diagrama de rutas que utiliza un comodín para emparejar varias rutas" style="width:90%;" >}}

## Analizar un diagrama de rutas

Puedes pasar el ratón por encima de un nodo del diagrama para ver el número de sesiones que incluyeron visitas a esa vista.

Haz clic en un nodo para acceder a la lista de opciones de análisis, como la visualización de una muestra de [Session Replay][3] o la creación de un diagrama de rutas que comience con esa vista.

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img4.png" alt="Menú de acciones del nodo de un diagrama de rutas" style="width:90%;" >}}

### Convertir el diagrama en un embudo

1. En la página del diagrama de rutas, haz clic en el botón **Build Funnel** (Crear embudo).
2. En el diagrama de rutas, haz clic en los nodos de las vistas que desees incluir en el embudo.
3. Haz clic en **Create Funnel From Selection** (Crear embudo a partir de la selección).

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img5.png" alt="Ruta al embudo de conversión en curso" style="width:90%;" >}}

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/pathways
[2]: /es/real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /es/product_analytics/session_replay/