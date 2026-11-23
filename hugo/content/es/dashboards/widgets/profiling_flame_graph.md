---
aliases:
- /es/video-categories/flamegraph/
description: Visualización del consumo de recursos en las rutas de código perfiladas.
further_reading:
- link: /profiler/profile_visualizations/
  tag: Documentación
  text: Obtenga más información sobre las visualizaciones de perfil.
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de Dashboards mediante JSON
title: Widget de gráfico de llama de perfilado
widget_type: flame_graph
---
## Descripción general {#overview}

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_2.png" alt="Gráfico de llama de perfilado" >}}

El [gráfico de llama de perfilado][1] visualiza los seguimientos de pila recopilados por Continuous Profiler. Cada marco representa una unidad de código, como un método o una línea. El ancho de un marco representa su parte de la métrica de perfil seleccionada, y los marcos en la fila siguiente representan el código llamado por el marco superior. Utilice el widget para identificar rutas de código que consumen muchos recursos en sus aplicaciones perfiladas.

## Configuración {#setup}
 
 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config_2.png" alt="Sección Graph your data en la configuración del widget de gráfico de llama de perfilado" style="width:100%;" >}}

### Graph your data {#graph-your-data}

1. En el campo de búsqueda, establezca el contexto de sus datos de perfilado mediante etiquetas. Por ejemplo, `host`, `container_name`, `service`, `env` o `version`.
2. En el menú {{< ui >}}Show{{< /ui >}}, seleccione un tipo de perfil. Los [tipos de perfil disponibles][2] dependen del lenguaje.
3. En el menú {{< ui >}}by{{< /ui >}}, seleccione la granularidad de los marcos, como método o línea.
4. Utilice los menús {{< ui >}}color by{{< /ui >}} y {{< ui >}}sort{{< /ui >}} para seleccionar cómo se sombrean y ordenan los marcos.
5. Utilice las secciones de contexto para refinar el gráfico de llama:
   - {{< ui >}}Scope to methods{{< /ui >}}: Seleccione los métodos que desea incluir. El nombre de esta sección cambia según la granularidad seleccionada en el menú {{< ui >}}by{{< /ui >}}.
   - {{< ui >}}Scope to endpoints{{< /ui >}}: Filtre a un punto de conexión específico. Seleccione `per Minute by Endpoint` para ver el consumo total de recursos o `per Endpoint Call` para ver el consumo de recursos por solicitud.

### Establezca las preferencias de tiempo {#set-time-preferences}

Seleccione {{< ui >}}Global dashboard time{{< /ui >}} para usar el marco de tiempo de los tableros, o seleccione {{< ui >}}Custom time{{< /ui >}} para establecer un marco de tiempo para el widget.

**Nota**: Los notebooks conservan los datos del gráfico de llama durante un año cuando el widget utiliza un rango {{< ui >}}Custom time{{< /ui >}} fijo. El rango debe estar dentro del [período de retención de datos de perfilado de 8 días][5] cuando cree el widget.

### Agregue un título y una descripción {#add-a-title-and-description}

Asigne un título a su gráfico o deje el cuadro en blanco para el título sugerido. También puede agregar una descripción opcional. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Interactúe con el widget {#interact-with-the-widget}

Pase el cursor sobre un marco para ver sus valores de perfil. Seleccione un marco para enfocarse en su ruta de código. Para investigar el perfil con más detalle, haga clic en el icono de abrir en página completa en la esquina superior derecha del gráfico de llama.

## API {#api}

Este widget se puede utilizar con el **[Dashboards API][3]**. Consulte la [definición del esquema JSON del widget][4].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/profiler/profile_visualizations/#flame-graph
[2]: /es/profiler/profile_types/
[3]: /es/api/latest/dashboards/
[4]: /es/dashboards/graphing_json/widget_json/
[5]: /es/data_security/data_retention_periods/