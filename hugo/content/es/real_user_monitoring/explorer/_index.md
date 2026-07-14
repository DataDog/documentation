---
aliases:
- /es/real_user_monitoring/rum_explorer
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Más información sobre la búsqueda en el Explorador RUM
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: Blog
  text: Monitorización de las métricas de Core Web Vitals con RUM
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: Blog
  text: Para empezar a monitorizar aplicaciones de una sola página
title: Explorador RUM
---

## Información general

El [Explorador Real User Monitoring (RUM)][1] te permite examinar datos recopilados de tus aplicaciones e información específica de tus eventos RUM.

Podrás:

- Navegar por las sesiones de usuario
- Investigar problemas de rendimiento que afecten a vistas, recursos o acciones
- Solucionar errores de aplicación y tareas prolongadas

{{< img src="real_user_monitoring/explorer/rum-explorer-2.png" alt="RUM Explorer" style="width:95%;" >}}

## Vista por aplicación

Utiliza el selector de aplicaciones en las opciones de navegación superiores para seleccionar y ver todos los datos RUM de una aplicación concreta.

{{< img src="real_user_monitoring/explorer/application-selector-2.png" alt="Haz clic en el selector de aplicaciones para ver todos los datos RUM de una aplicación específica" style="width:95%;" >}}

## Buscar y filtrar

Busca y filtra tus eventos RUM escribiendo en la barra de búsqueda y seleccionando un tipo de visualización en el [Explorador RUM][1]. Puedes limitar, ampliar y cambiar tu enfoque en subconjuntos de eventos que te interesen.
Utiliza las sugerencias de autocompletar para ver facetas y consultas recientes.

## Agrupar

Agrupa los eventos RUM que hayas consultado en entidades de nivel superior que puedan ayudarte a derivar o consolidar información sobre un tema. Para identificar patrones de eventos y agregar eventos por subconjuntos, consulta [Agrupar eventos RUM][2]. 

Para empezar a crear consultas y utilizar facetas, consulta [Sintaxis de búsqueda][3]. 

## Visualizar

Selecciona una visualización para tus filtros y agregaciones que muestre tus eventos RUM en una perspectiva útil para descubrir información decisiva.

Por ejemplo, puedes ver eventos RUM en listas, organizar los datos RUM en columnas y ver los datos RUM en un gráfico de series temporales que muestre tu telemetría RUM a lo largo del tiempo. 

Para empezar a visualizar datos RUM en el Explorador RUM, consulta [Crear visualizaciones RUM][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/sessions
[2]: /es/real_user_monitoring/explorer/group
[3]: /es/real_user_monitoring/explorer/search_syntax
[4]: /es/real_user_monitoring/explorer/visualize