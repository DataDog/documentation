---
aliases:
- /es/video-categories/flamegraph/
description: Gráfico de desglose de las líneas de código que más consumen (CPU, Memoria,
  ...)
further_reading:
- link: /profiler/profile_visualizations/
  tag: Documentación
  text: Más información sobre las visualizaciones de perfiles
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget gráfico de llamas de perfiles
widget_type: flame_graph
---

## Información general

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph.png" alt="Gráfico de llamas de perfiles" >}}

La [profiling flame graph visualization (visualización de gráfico de llamas de perfiles)][1] representa un desglose de las líneas de código que más consumen, como CPU y Memory. Añade este widget para visualizar la stack traces de tus aplicaciones perfiladas e identificar con precisión las solicitudes frecuentes de recursos. 

## Configuración

 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config.png" alt="Grafica tu sección de datos en la configuración del widget del gráfico de llamas de perfiles" style="width:100%;" >}}

### Configuración

1. Contextualiza tus datos de perfiles con etiquetas (tags). Por ejemplo, `host`, `container_name`, `servicio`, `env` o `versión`.
2. Para seleccionar el recurso, haz clic en el menú desplegable situado junto a **Show** (Mostrar). Las opciones pueden incluir `Tiempo de CPU`, `Memoria asignada`, o `Excepciones lanzadas`.
3. Haz clic en el menú desplegable junto a **por** y **para** para seleccionar la granularidad del marco y la procedencia del código, respectivamente.
4. Dale un título a tu gráfico o deja la casilla en blanco para el título sugerido.
5. Haz clic en **Save** (Guardar).

### Opciones

#### Opciones avanzadas y filtrado

Haz clic en la elipsis de tres puntos para abrir las Opciones avanzadas para especificar el color y la resolución.

Personaliza tu gráfico de llamas. Añade acciones o filtros de crear gráficas en el campo *Filter flame graph* (Filtro del gráfico de llamas).

#### Contexto a los endpoints

Filtro sobre un endpoint específico, por consumo total (`por minuto por endpoint`) o por solicitud (`por llamada de endpoint`).

#### Contexto a funciones

Filtra por otros criterios como `Método`, `Paquete`, `Nombre del hilo` u `Operación de rastreo`.

#### Hora mundial

Elige si tu widget tiene un marco temporal personalizado o el marco temporal global del dashboard.

## API

Este widget puede utilizarse con la **[API de dashboards][2]**. Ve la [definición de esquema de JSON  de widget][3].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/profiler/profile_visualizations/#flame-graph
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/