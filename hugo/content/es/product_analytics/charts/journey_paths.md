---
description: Vea las rutas más comunes que siguen los usuarios entre dos eventos,
  incluidas las rutas de las sesiones que abandonaron antes de llegar al segundo evento.
title: Rutas de recorrido
---
Las rutas de recorrido muestran los caminos más comunes que siguen los usuarios entre eventos seleccionados.

Utilice las rutas de recorrido para:
- Vea cómo los usuarios navegan por recorridos clave y completan flujos de trabajo.
- Compruebe si los usuarios convierten de manera eficiente o toman desvíos inesperados.
- Investigue dónde y por qué los usuarios abandonan.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_conversion_chart.png" alt="Un gráfico de Rutas de recorrido renderizado que muestra las rutas principales que siguen los usuarios entre dos visualizar." style="width:100%;" >}}

## Cree un gráfico de rutas de recorrido {#create-a-journey-paths-chart}

1. En {{< ui >}}Product Analytics{{< /ui >}}, seleccione {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Journey Paths{{< /ui >}}.

2. Defina {{< ui >}}User steps{{< /ui >}} seleccionando al menos dos eventos entre los cuales desea analizar las rutas. 

   Para un paso determinado, haga clic en {{< ui >}}or...{{< /ui >}} para especificar varios eventos, o haga clic en el icono de filtro para filtrar el paso por propiedades específicas. 

3. (Opcional) Filtre los resultados del gráfico según propiedades como el país o el tipo de dispositivo utilizando criterios de {{< ui >}}Filter by{{< /ui >}}.

## Analice un gráfico de rutas de recorrido {#analyze-a-journey-paths-chart}

Después de definir los pasos en un recorrido, el gráfico muestra las rutas más comunes que siguieron los usuarios entre ellos.

Cada ruta muestra el porcentaje y el número de sesiones que siguieron esa ruta, así como el tiempo promedio dedicado a ella. Las rutas sin eventos enumerados representan sesiones que fueron directamente del evento inicial al evento final sin vistas o acciones intermedias.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_customization.png" alt="Un gráfico de Rutas de recorrido con llamadas numeradas para el selector de conversiones/abandonos, el selector de pasos, el rango de tiempo, los interruptores de tipo de evento, View more, el menú de opciones de ruta y los controles More Paths/Fewer Paths." style="width:100%;" >}}

Puede refinar los gráficos de rutas de recorrido de varias maneras para centrarse en las rutas que desea analizar.

1. Utilice el selector {{< ui >}}Converted{{< /ui >}} / {{< ui >}}Dropped{{< /ui >}} para cambiar entre las rutas que llegaron al paso final y aquellas que abandonaron. Las rutas de abandono no tienen un nodo final.

2. En recorridos con varios pasos, utilice el selector de pasos para elegir qué par de pasos analizar entre ellos.  

3. Utilice el selector de rango de tiempo para cambiar el período de datos que analiza el gráfico.

4. Utilice los interruptores {{< ui >}}Views{{< /ui >}} y {{< ui >}}Actions{{< /ui >}} para controlar qué tipos de eventos aparecen como nodos de ruta. Los "visualizar", las acciones y las acciones personalizadas se muestran con un color y un icono distintos en el diagrama, para que pueda identificar el tipo de evento en cada paso de una ruta.

5. Para rutas truncadas, haga clic en {{< ui >}}View more{{< /ui >}} para revelar los siguientes eventos en esa ruta. Haga clic en {{< ui >}}View less{{< /ui >}} para contraerlo de nuevo.

6. Haga clic en un evento para abrir un menú con opciones para visualizar las reproducciones de sesión o los usuarios asociados con esa ruta. O bien, mantenga presionada la tecla **Option** (macOS) o **Alt** (Windows/Linux) y haga clic en un evento para ocultarlo del diagrama.

7. Utilice {{< ui >}}More Paths{{< /ui >}} y {{< ui >}}Fewer Paths{{< /ui >}} para controlar cuántas rutas se muestran.