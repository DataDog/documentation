---
aliases:
- /es/graphing/widgets/timeseries/
- /es/dashboards/widgets/network/
- /es/graphing/widgets/network/
description: Visualiza la evolución de una o más métricas, eventos de log, tramos
  (spans) indexados o métricas de proceso a lo largo del tiempo.
further_reading:
- link: https://www.datadoghq.com/blog/full-screen-graphs
  tag: Blog
  text: Explora tus datos en modo de gráfico a pantalla completa
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /dashboards/guide/slo_data_source
  tag: Guía
  text: Haz gráficos de datos históricos de SLO en dashboards
kind: documentación
title: Widget de series temporales
widget_type: series temporales
---

La visualización de series temporales te permite mostrar la evolución de una o varias métricas, eventos de log o tramos indexados a lo largo del tiempo. El intervalo de tiempo depende de lo que se seleccione en [timeboard][1] o [screenboard][2]:

{{< img src="dashboards/widgets/timeseries/timeseries.png" alt="Un widget de serie temporal que muestra average system.cpu.user para un host" style="width:90%;" >}}

## Configuración

### Configuración

{{< img src="dashboards/widgets/timeseries/timeseries_setup.png" alt="Configuración de serie temporal" style="width:90%;" >}}

1. Elige los datos para los que crear gráficas:
   * Métrica: consulta la [Documentación de consulta][3] para configurar una consulta de métrica.
   * Tramos indexados: consulta la [Documentación de búsqueda de trazas][4] para configurar una consulta de tramo indexado.
   * Eventos de log: consulta la [Documentación de búsqueda de log][5] para configurar una consulta de evento de log.

2. Personaliza tu gráfico con las [opciones] disponibles(#display-options).

## Opciones de visualización

Los gráficos pueden mostrarse como líneas, áreas y barras. Los gráficos de líneas contienen parámetros adicionales:

| Parámetro | Opciones               |
|-----------|-----------------------|
| Estilo     | Sólido, discontinuo o punteado |
| Trazos    | Normal, fino o grueso   |

### Color

Para todos los tipos de gráficos, Datadog ofrece varias opciones de color para diferenciar varias métricas mostradas en el mismo gráfico:

| Paleta     | Descripción                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------|
| Clásico     | Los colores simples azul claro, azul oscuro, morado claro, morado, amarillo claro y amarillo (los colores se repiten).    |
| Uniforme | Mediante un conjunto de 16 colores, aplica un color uniforme para cada serie de datos en todos los widgets para cada grupo de etiqueta. |

Para los gráficos de líneas, se pueden asignar paletas específicas a diferentes métricas separando las consultas en JSON. Para obtener más información, consulta la guía de [Selección de los colores adecuados para tus gráficos][6].

### Alias de métricas

Cada consulta o fórmula, junto con cualquier [etiqueta de filtro][7], puede tener un alias. El alias anula la visualización en el gráfico y la leyenda, lo que resulta útil para nombres largos de métrica o listas largas de filtros. Al final de tu consulta o fórmula, haz clic en **as...** (como...) e introduce tu alias de métrica:

{{< img src="dashboards/widgets/timeseries/metric_alias.png" alt="Añadir un alias para una consulta de búsqueda en el editor de widget de serie temporal" style="width:100%;" >}}

### Superposición de eventos

La superposición de eventos es compatible con todas las fuentes de datos. Esto permite una correlación más fácil entre los eventos empresariales y los datos de cualquier servicio de Datadog.

Con la superposición de eventos, puedes ver cómo las acciones dentro de la organización afectan al rendimiento de las aplicaciones y la infraestructura. Estos son algunos ejemplos de casos de uso:
- Tasas de error de RUM con eventos de despliegue superpuestos
- Correlación del uso de la CPU con eventos relacionados con el suministro de servidores adicionales
- Correlación del tráfico de salida con actividades sospechosas de inicio de sesión
- Correlación de los datos de las series temporales con las alertas de monitor para garantizar que Datadog se ha configurado con las alertas adecuadas

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widgets de serie temporal que muestra tasas de error de RUM con eventos de despliegue superpuestos" style="width:100%;" >}}

Puedes añadir eventos de sistemas relacionados para sumar contexto a tu gráfico, como registros commits de GitHub, despliegues de Jenkins y eventos de creación de Docker. Haz clic en **Add Event Overlay** (Añadir superposición de evento) en la sección **Event Overlays** (Superposiciones de evento) e introduce una consulta para mostrar esos eventos.

Utiliza el mismo formato de consulta que para [Event Explorer][8], por ejemplo:

| Consulta                       | Descripción                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Muestra todos los eventos de la fuente Jenkins.                  |
| `tag:role:web`              | Muestra todos los eventos con la etiqueta `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Muestra todos los eventos de la [variable de plantilla][9] seleccionada. |

### Marcadores

Para añadir marcadores para conjuntos de datos adicionales, haz clic en **Add Marker** (Añadir marcador) en la sección **Markers** (Marcadores).

1. Selecciona una Línea o Rango e introduce un valor o un rango o valores.
2. En el campo **Show as** (Mostrar como), selecciona un estado/color de alerta y elige entre una línea horizontal continua, en negrita o discontinua.
3. Para añadir una etiqueta que se muestre en la parte inferior izquierda del widget de serie temporal, define un valor para el eje Y y haz clic en la casilla **Label** (Etiqueta).

### Controles del eje Y

Los controles del eje Y están disponibles en la interfaz de usuario y en el editor JSON. Puedes establecer el valor y el tipo del eje y en:

* Recorta el eje y a rangos específicos.
* Cambia automáticamente los límites del eje Y en función de un umbral de valor absoluto. Este umbral puede aplicarse a uno o ambos extremos del gráfico (inferior y superior) para eliminar la serie "outlier".
* Cambia la escala del eje Y de linear a log, pow, o sqrt.

Están disponibles las siguientes opciones de configuración:

| Opción                | Obligatorio | Descripción                                                                                                                                                                                                               |
|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`                 | No       | Especifica el valor mínimo a mostrar en el eje Y. Toma un número o `Auto` como valor por defecto.                                                                                                                |
| `Max`                 | No       | Especifica el valor máximo a mostrar en el eje Y. Toma un número o `Auto` como valor por defecto.                                                                                                                        |
| `Scale`               | No       | Especifica el tipo de escala. Los valores posibles son:<br>- *linear*: una escala lineal (por defecto).<br>- *log*: una escala logarítmica.<br>- *pow*: una potencia de escala 2 (2 es el valor por defecto, modifícalo en JSON).<br>- *sqrt*: una escala de raíz cuadrada. |
| `Always include zero` | No       | Incluye siempre cero o ajusta el eje Y al rango de datos. El valor predeterminado es incluir siempre cero.                                                                                                                             |

Dado que la función matemática de log no acepta valores negativos, la escala de log de Datadog solo funciona si los valores son del mismo signo (todo > 0 o todo < 0). En caso contrario, se devuelve un gráfico vacío.

### Configuración de leyenda

Puedes añadir leyendas configurables a tus tableros seleccionando una de las siguientes opciones en la sección **Legend** (Leyenda):

* Automático (por defecto)
* Compacto
* Ampliado: columnas configurables para valor, media, suma, mín. y máx.
* Ninguna

Para timeboards, las leyendas se muestran automáticamente cuando un dashboard se ajusta a L o XL.

### Enlaces contextuales

Para añadir un enlace contextual en el menú desplegable que aparece al hacer clic en un widget de dashboard, haz clic en **Add a Context Link** (Añadir un enlace contextual) en la sección **Context Links** (Enlaces contextuales).

Para obtener más información sobre la edición y eliminación de enlaces contextuales, consulta [Enlaces contextuales][10].

### Pantalla completa

Además de las [opciones estándar de pantalla completa][11], puedes aplicar funciones rápidas, comparar con periodos anteriores, ajustar la escala Y, guardar los cambios o guardarlos como un nuevo gráfico.

Para obtener más información, consulta [Explorar tus datos en modo de gráfico a pantalla completa][12].

## API

Este widget se puede utilizar con la **[API de dashboards][13]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget][14]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/#timeboards
[2]: /es/dashboards/#screenboards
[3]: /es/dashboards/querying/
[4]: /es/tracing/trace_explorer/query_syntax/#search-bar
[5]: /es/logs/search_syntax/
[6]: /es/dashboards/guide/widget_colors/
[7]: /es/dashboards/querying/#filter
[8]: /es/events/
[9]: /es/dashboards/template_variables/
[10]: /es/dashboards/guide/context-links/
[11]: /es/dashboards/widgets/#full-screen
[12]: https://www.datadoghq.com/blog/full-screen-graphs
[13]: /es/api/latest/dashboards/
[14]: /es/dashboards/graphing_json/widget_json/