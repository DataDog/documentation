---
further_reading:
- link: /dashboards/guide/graphing_json/
  tag: Guía
  text: Construir dashboards utilizando JSON
title: Widget Split Graph
widget_type: split_group
---

<div class="alert alert-info">Los widgets de gráfico dividido no son compatibles con los screenboards ni con <a href="https://docs.datadoghq.com/dashboards/sharing/#share-a-dashboard-by-public-url">dashboards públicos.</a></div>

## Información general

Un gráfico dividido permite desglosar una consulta en varios valores de etiquetado para identificar outliers y patrones. Utiliza esta función para investigar el rendimiento de métricas en múltiples facetas, comparar eventos en múltiples etiquetas o crear visualizaciones dinámicas. 

## Configurar

### Crear un widget de gráfico dividido

Busca el widget de gráfico dividido en la bandeja del widget, en la sección de grupos, y arrástralo a tu dashboard para crear un gráfico dividido desde cero. Esto te permite definir tanto la consulta como las dimensiones de división al mismo tiempo. Para más información sobre las opciones de configuración, consulta la sección [Configuration (configuración)](#configuration).

### Crear un gráfico dividido a partir de un widget existente

También puedes crear un gráfico dividido tomando un widget existente y dividiéndolo en un valor de etiqueta utilizando la pestaña **Split Graph**. Para abrir la pestaña **Split Graph**:
- Añade un nuevo widget a tu dashboard y haz clic en la pestaña **Split Graph** en la parte superior del editor de consultas.
- Para abrir un widget a pantalla completa, selecciona los iconos de edición o expansión en las opciones de control de widget y, a continuación, haz clic en la pestaña **Split Graph**.
- Abre el menú contextual de un widget en tu dashboard y selecciona **Split Graph**.

Desde la pestaña **Split Graph**, puedes configurar cómo se divide tu gráfico, establecer el límite en el número de gráficos y configurar el orden.
1. Realiza cambios de la configuración en la división editando la dimensión de la división, el número de gráficos mostrados o editando las opciones de visualización. Para más información sobre las opciones de configuración, consulta la sección [Configuración](#configuration).
2. Haz clic en **Save to Dashboard** (Guardar en dashboard) para crear un nuevo widget de gráfico dividido en la parte inferior de tu dashboard. Tu widget original permanece sin cambios en tu dashboard. 

### Crear un gráfico dividido a partir de otra parte de Datadog

Siempre que se muestre una división entre varios valores en la aplicación, puedes exportarla como widget a un dashboard.
1. Haz clic en **Export to Dashboard** (Exportar a dashboard).
1. Se abre un modal de exportación en el que puedes elegir entre buscar un dashboard existente al que exportar o crear un nuevo dashboard que contenga este widget.

## Configuración

Si creas un gráfico dividido desde cero o editas un gráfico dividido existente en tu dashboard, tienes la opción de configurar tanto el gráfico como la división. 

El editor de gráficos divididos se compone de dos secciones separadas: [**Edit Graph** (Editar gráfico)](#edit-graph) y [**Split Graph** (Dividir gráfico)](#edit-split). Para añadir un título widget, actualiza la entrada de texto en la parte superior del editor.

**Nota**: Si creas un gráfico dividido a partir de un widget, solo tienes la opción de configurar la división en la pestaña **Split Graph**. Siempre puedes hacer clic en la pestaña **Edit** (Editar) para editar la consulta.

{{< img src="dashboards/widgets/split_graph/split_graph_tab.png" alt="La pestaña de dividir gráfico muestra sus opciones de configuración" style="width:100%;" >}}

### Editar gráfico

Configura la consulta del gráfico antes de dividirlo. Elige cualquier tipo de visualización que admita la división y realiza cambios en la forma en que se muestran los gráficos. También puedes crear tu consulta desde cero, como en la experiencia estándar del editor de consultas. 

Para obtener más información sobre la configuración individual de estas visualizaciones, consulta la documentación correspondiente a los widgets compatibles en la página [widgets][1].

Tus cambios se reflejan inmediatamente en los gráficos divididos en la parte inferior del modal del editor de gráfico dividido.  

{{< img src="dashboards/widgets/split_graph/split_graph_editor.png" alt="El editor de gráficos divididos muestra la configuración de la consulta de gráficos y las opciones de configuración de los gráficos divididos." style="width:100%;" >}}

### Editar división

Hay varias entradas que te permiten configurar cómo dividir el gráfico, así como opciones de visualización específicas de la división.

| Entrada de configuración | Descripción    | 
| ---  | ----------- | 
| Un gráfico por | Este desplegable define la dimensión en la que se dividirá el gráfico original. |
| Limitar a | Opción para especificar el número de gráficos para mostrar y qué valores deben seleccionarse. Por defecto, el gráfico dividido widget selecciona dinámicamente los valores con valores medios más altos. |
| Ordenar por | Elige una métrica o un atributo/facet para ordenar tus gráficos. Si seleccionas **custom** (personalizado), podrás seleccionar manualmente etiquetas para mostrarlo. |
| Mostrar controles | Alternar para mostrar una barra lateral con todos los valores disponibles de etiqueta. Selecciona manualmente los valores de etiqueta para cambiar la división de dinámica a estática y mostrar solo los valores que hayas seleccionado. Para volver a un comportamiento dinámico, elimina la selección o haz clic en el botón **Custom** (Personalizar) y selecciona **Top** (Superior) o **Bottom** (Inferior) para volver a activar la clasificación.|
| Ajuste gráfico | Opciones de visualización específicas de los gráficos divididos</br>`Graph Size`: elige entre 4 tamaños diferentes para los gráficos individuales dentro del widget de gráfico dividido.</br>`Uniform Y-Axes`: selecciona si los gráficos en el widget muestran un eje Y consistente o si se ajustan independientemente para una máxima legibilidad.|

## API

Este widget puede utilizarse con la [API de dashboards][2]. Ve la siguiente tabla para la [definición del esquema JSON de widget][3]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/