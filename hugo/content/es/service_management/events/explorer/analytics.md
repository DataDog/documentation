---
title: Análisis
---

## Información general

Event Analytics amplía la página de Events Explorer con vistas, agregación de datos y funcionalidades de agrupación para solucionar problemas y monitorizar. Puedes controlar:

- La consulta que filtra el conjunto de vistas que se va a analizar.
- Las dimensiones sobre las que se van a agrupar los datos.
- El método de visualización de los agregados y grupos.

Puedes exportar visualizaciones de análisis para crear widgets en un dashboard o notebook.

### Crear una consulta de análisis

Utiliza la consulta para controlar lo que se muestra en Events Analytics:

1. Elige un atributo o etiqueta para graficarlo, y añádelo como una faceta. Al crear gráficas de una faceta se muestra el conteo único de la variable.
    {{< img src="service_management/events/explorer/facet-to-graph.png" alt="Se muestra la lista de facetas que se pueden graficar." style="width:100%;" >}}
2. Utiliza una faceta para agrupar tu gráfica. Debes añadir un atributo como faceta para poder utilizarlo aquí.
    {{< img src="service_management/events/explorer/split-graph.png" alt="Se muestra la lista de facetas por las que puedes agrupar datos." style="width:100%;" >}}
3. Elige el intervalo de tiempo de tu gráfica. Cambiar el período de tiempo general modifica la lista de los valores de intervalo de tiempo disponibles. Puedes mostrar los resultados en forma de serie temporal, tabla o lista principal.
    {{< img src="service_management/events/explorer/time-interval.png" alt="Se muestra la lista de posibles intervalos de tiempo, incluido el predeterminado, 5 segundos." style="width:100%;" >}}
4. Elige mostrar los valores superiores o inferiores en función de la medida seleccionada.
    {{< img src="service_management/events/explorer/display-values.png" alt="Elige mostrar los valores desde la parte superior o inferior." style="width:100%;" >}}