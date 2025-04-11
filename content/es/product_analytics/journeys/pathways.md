---
aliases:
- /es/real_user_monitoring/product_analytics/sankey
- /es/product_analytics/sankey
- /es/product_analytics/journeys/sankey
further_reading:
- link: /product_analytics/journeys
  tag: Documentación
  text: Recorridos
- link: /dashboards/widgets/sankey/
  tag: Documentación
  text: Crear widgets de Sankey en dashboards
title: Pathways
---

{{< callout url="http://datadoghq.com/private-beta/product-analytics" header="false" >}}
Todas las funciones de Análisis de productos tienen disponibilidad limitada. Para solicitar acceso, rellena el formulario.
{{< /callout >}}

## Información general

Puedes utilizar diagramas de Pathway para visualizar todos los recorridos de los usuarios en tu aplicación y analizar la ruta crítica.

{{< img src="/product_analytics/journeys/pathways/pathways-overview.png" alt="El diagrama de Pathways predeterminados para una aplicación" style="width:90%;" >}}

Cada nodo representa una vista visitada por el usuario. El grosor de cada nodo representa el recuento de sesiones de usuario en esa página. Una página con menos visitantes tiene un nodo más fino en el diagrama.

Si un usuario visita la misma página varias veces durante su sesión, esa página sólo se cuenta una vez.

Las acciones no se admiten en el diagrama de Pathways.

## Crear un diagrama de Pathways

### Ver el diagrama por defecto

1. Navega a [**Product Analytics > User Journeys**][1] (Análisis de productos > Recorridos de los usuarios).
2. Haz clic en **Pathways** si aún no está seleccionado. Esto muestra la visualización predeterminada que representa los recorridos de usuario más populares en tu aplicación.

### Iniciar o finalizar el diagrama en una vista determinada

Puedes utilizar el menú de la izquierda para personalizar este diagrama y su visualización:
- los pasos que dieron los usuarios *después* de visitar una vista determinada
- los pasos que dieron los usuarios *antes* de visitar una vista determinada

El siguiente ejemplo muestra los cuatro pasos que siguen los usuarios de Estados Unidos después de visitar `/department/lighting`:

{{< img src="/product_analytics/journeys/pathways/customized-pathways.png" alt="Un diagrama de Pathways personalizado para una una aplicación" style="width:90%;" >}}

### Graficar todas las vistas que contienen una frase dada

Los diagramas de Pathways admiten [comodines de Datadog][2], lo que permite crear un diagrama de todas las vistas que contengan una frase determinada.

Para que coincidan varias rutas, escribe un comodín en lugar de elegir un único nombre de vista. El siguiente ejemplo muestra los cinco pasos que siguen los usuarios después de visitar cualquier vista que coincida con `/department/*`:

{{< img src="/product_analytics/journeys/pathways/pathways-wildcard.png" alt="Un diagrama de Pathways que usa un comodín para unir varias rutas" style="width:90%;" >}}

## Analizar un diagrama de Pathways

Puedes pasar el ratón por encima de un nodo del diagrama para ver el número de sesiones que incluyeron visitas a esa vista.

Haz clic en un nodo para acceder a la lista de opciones de análisis, como la visualización de una muestra de [Session Replay][3] o la creación de un diagrama de Pathways que comience con esa vista.

{{< img src="/product_analytics/journeys/pathways/pathways-node.png" alt="El menú de acciones de un nodo de diagrama de Pathways" style="width:90%;" >}}

### Convertir el diagrama en un embudo

1. En la página del diagrama de Pathways, haz clic en el botón **Build Funnel** (Crear embudo).
2. En el diagrama de Pathways, haz clic en los nodos de las vistas que desees incluir en el embudo.
3. Haz clic en **Create Funnel from Selection** (Crear embudo desde la selección).

{{< img src="/product_analytics/journeys/pathways/pathways-build-funnel.png" alt="Un Pathway para convertir un embudo en el proceso" style="width:90%;" >}}

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey
[2]: /es/real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /es/real_user_monitoring/session_replay/