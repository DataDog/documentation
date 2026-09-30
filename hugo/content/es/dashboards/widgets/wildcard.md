---
further_reading:
- link: /dashboards/guide/using_vega_lite_in_wildcard_widgets/
  tag: Documentación
  text: Más información sobre el uso de Vega-Lite con widgets comodín
- link: https://vega.github.io/vega-lite/tutorials/getting_started.html
  tag: Tutorial de Vega
  text: Introducción a Vega-Lite
- link: https://vega.github.io/vega-lite/tutorials/explore.html
  tag: Tutorial de Vega
  text: Exploración de datos
title: Widget comodín
widget_type: comodín
---

{{< callout url="https://forms.gle/tLdC1AqhVizD3wCp7" btn_hidden="false" header="Access the Preview!">}}
Los widgets comodín están en Fase previa. Inscríbete para obtener acceso.
{{< /callout >}}

## Información general

El widget comodín de Datadog amplía la flexibilidad del lenguaje [de código abierto Vega-Lite][1] "Gramática de los gráficos" y lo integra en la plataforma Datadog. El widget comodín permite crear gráficos que no están disponibles en los widgets y sistemas de consulta nativos de Datadog.

Utiliza el widget comodín en [dashboards][2] y [notebooks][3].

## Prácticas recomendadas

Datadog recomienda utilizar un [widget de dashboard][4] existente para satisfacer tu caso de uso. Todos los widgets nativos tienen optimizaciones de diseño y rendimiento que no están disponibles en el widget comodín. Para conocer las limitaciones conocidas, consulta la sección [Información adicional](#additional-information).

Sin embargo, si ninguno de los Datadog widgets satisface tus necesidades de visualización, un widget comodín es una forma rápida de añadir una nueva capacidad a tus dashboards sin esperar a que se añada una nueva función o tipo de gráfico.

1. **No empieces de cero**. Vega-Lite ofrece una galería pública con más de [150 ejemplos oficiales][5]. Si no sabes qué tipo de gráfico quieres utilizar, bifurca un ejemplo existente para probar la visualización. Utiliza Vega-Lite en lugar de Vega para simplificar y facilitar la depuración.
1. **Prueba el widget comodín**. La flexibilidad del widget comodín conlleva el riesgo de crear visualizaciones lentas, poco atractivas o incoherentes. Prueba el widget comodín en un bloc de notas o en un dashboard vacío antes de añadir widgets comodín a la producción.
1. **Confirma tu consulta**. Los widgets Datadog garantizan que las visualizaciones de datos están semánticamente alineadas con la consulta, lo que asegura que configuración construirá el gráfico esperado. Con el widget comodín, estás añadiendo una especificación Vega-Lite personalizada que define cómo se asigna la solicitud a los elementos visuales. Esto crea la posibilidad de obtener un campo de datos que no se utiliza en la visualización. Para depurar las disparidades, utiliza la [Vista previa de datos](#data-preview).

## Configuración

Después de crear un widget comodín, puedes configurar el widget como una [nueva configuración](#configure-a-new-wildcard-widget) o [importando una configuración de un widget existente](#import-data-from-an-existing-widget). 

### Configurar un nuevo widget comodín

1. [Comprueba los widgets nativos][4]. Comprueba si un widget de Datadog puede satisfacer tus necesidades.
1. Si ningún widget de Datadog cumple tus requisitos, en un dashboard nuevo o preexistente, haz clic en **Add Widgets** (Añadir widgets).
1. Haz clic y arrastra el icono Widget comodín desde la bandeja de widgets.
1. Selecciona de la lista desplegable **Tipo de Solicitud**. Para obtener más información sobre los tipos Escalar y Series temporales, consulta la sección [Fórmulas escalares vs. Fórmulas con series temporales](#formulas-scalar-vs-formulas-timeseries) de esta página.
1. Copia una definición Vega-Lite de la [galería pública][5] para encontrar una especificación Vega-Lite inicial.
1. Abre el [editor a pantalla completa][6] del widget comodín y haz clic en **Define Visual** (Definir Visual).
1. Pega la definición Vega-Lite copiada.
1. Haz clic en **Run** (Ejecutar) para aplicar los cambios de configuración, ver una vista previa de la visualización e iterar sobre tu diseño.
   **Nota**: Debes hacer clic en **Run** (Ejecutar) para añadir tus cambios. Ten en cuenta que esto no guarda tu configuración.
1. (Opcional) Depura las disparidades de especificaciones Vega-Lite con la [Vista previa de datos](#data-preview). Asegúrate de que la consulta en tu especificación Vega-Lite se corresponde con la consulta de Datadog.
1. Haz clic en **Save** (Guardar).

#### Fórmulas escalares vs. Fórmulas con series temporales

En los dashboards de Datadog, las visualizaciones se alimentan de múltiples _tipos de solicitud_, incluyendo escalares y series temporales. Cada _tipo de solicitud_ cambia el número y el tipo de campos disponibles para los datos en un widget comodín.

**Series temporales**
: Este formato de datos está diseñado para mostrar cómo cambian los datos a lo largo del tiempo.
   - **Casos de uso**: Es ideal para las métricas de monitorización que fluctúan, como el uso de CPU, el consumo de memoria o la frecuencia de solicitud. Ayuda a identificar tendencias, patrones y anomalías en un intervalo de tiempo específico.

**Escalar**
: Este formato de datos agrega los datos produciendo 1 valor por "grupo". El formato escalar se utiliza para la lista principal, el mapa de árbol, el gráfico circular y el widget de tabla, donde cada grupo se refiere a una forma (barra, rectángulo, rebanada o fila, respectivamente) del gráfico.
   - **Casos prácticos**: Es la mejor opción para mostrar indicadores clave de rendimiento (KPI) o estadísticas resumidas como promedios, sumas o percentiles. Proporciona una vista resumida del estado actual o de una métrica específica. Si no estás describiendo cambios a lo largo del tiempo, utiliza la opción escalar.

El formato de datos con series temporales hace hincapié en las tendencias de los datos a lo largo del tiempo, mientras que el formato escalar se centra en la presentación de valores únicos y calculados para evaluaciones rápidas. Elige el series temporales si necesitas visualizar el tiempo en un eje o si necesitas buckets de tiempo individuales. Si no visualizas teniendo en cuenta el tiempo, selecciona el tipo escalar para aumentar el rendimiento. 

**Nota**: El prefijo "Fórmulas" se utiliza específicamente para los formatos Escalar y Series temporales, ya que son compatibles con las [funciones de API][18]. Los demás formatos, como Histograma y Lista no son compatibles con esta API.

### Importar datos de un widget existente

1. Copia de un widget de Datadog existente utilizando `cmd+c`.
1. Abre el [editor a pantalla completa][6] del widget comodín.
1. Pega lo copiado utilizando `cmd+v`.
1. Haz clic en **Save** (Guardar).

## Paleta de comandos

{{< img src="/dashboards/widgets/wildcard/command_palette.png" alt="Modal Paleta de comandos que muestra la posibilidad de buscar comandos y gráficos de selección automática" style="width:100%;" >}}

La paleta de comandos proporciona acceso rápido a las herramientas del widget comodín. Actívala con `cmd + shift + p` o haz clic en el icono de información de la parte superior de la página.

## Vista previa de datos

{{< img src="/dashboards/widgets/wildcard/data_preview_arrow_icon.png" alt="Panel Vista previa de datos" style="width:100%;" >}}

La tabla Vista previa de datos muestra la respuesta, los campos y los valores de tu solicitud de datos, disponibles para utilizar en tu especificación Vega-lite. Para acceder, haz clic en la flecha situada en la parte inferior del editor de widgets comodín para *Mostrar la vista previa de datos*. Hay tres tipos de tablas en la vista previa:
- Solicitar filas: Muestra tus datos reales.
- Solicitar columnas: Muestra estadísticas de resumen de columnas y tipos de datos. 
- Tablas internas: Muestra los datos transformados almacenados por Vega-Lite.

## Asignar datos de Datadog a las especificaciones Vega-Lite

Los widgets nativos de Datadog asignan automáticamente los resultados de la consulta a los elementos de visualización, pero el widget comodín requiere que se añada una especificación Vega-Lite personalizada que defina cómo se asigna la consulta de Datadog a los elementos visuales. Esto crea la posibilidad de una disparidad. Con la [Vista previa de datos](#data-preview), puedes comprobar que la especificación Vega-Lite se corresponde con la respuesta de la consulta correcta.

Para ver cómo se corresponden los valores de Datadog con la especificación Vega-Lite, comienza con el ejemplo de la consulta de métricas de `system.cpu.user` promediada por `env`:

{{< img src="/dashboards/widgets/wildcard/example_configuration_query.png" alt="Ejemplo de consulta de métricas de configuración del widget para system.cpu.user agrupadas por ent" style="width:100%;" >}}

Haz clic en la pestaña **Definir visual** para ver cómo se asigna esta consulta a Vega-Lite. Abre el panel Vista previa de datos y observa los campos **consulta1** y **ent** coincidentes, mostrados en la especificación Vega-Lite y en la columna Vista previa de datos. 

{{< highlight json "hl_lines=8 12" >}}
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
      "name": "table1"
    },
    "encoding": {
      "x": {
        "field": "env",
        "type": "nominal"
      },
      "y": {
        "field": "query1",
        "type": "quantitative"
      }
    },
    "mark": {
      "type": "rect",
      "tooltip": {
        "content": "data"
      }
    }
  }
{{< /highlight >}}

| Seleccionar la configuración de datos  | Definir la especificación visual |
| ---  | ----------- |
|{{< img src="/dashboards/widgets/wildcard/example_configuration_no_alias.png" alt="Ejemplo de configuración del widget, que muestra la vista previa de datos abierta" style="width:100%;" >}} | {{< img src="/dashboards/widgets/wildcard/define_visual_run_button.png" alt="Especificación Vega asignando el campo de configuración del widget consulta1 al campo Vega" style="width:100%;" >}}|

Para demostrar una disparidad entre los datos de Datadog y la especificación Vega-Lite, añade un alias a la consulta. La visualización no funciona porque la especificación Vega-lite sigue apuntando a "consulta1", pero la columna Vista previa de datos muestra que la nueva consulta es ahora el nuevo alias de "ejemplo". Para corregir esta visualización, debes sustituir `field:"query1"` por `field:"example"`.

| Seleccionar la configuración de datos  | Definir la especificación visual |
| ---  | ----------- |
|{{< img src="/dashboards/widgets/wildcard/example_config_with_alias.png" alt="Configuración del widget de ejemplo donde la consulta tiene un alias" style="width:100%;" >}} | {{< img src="/dashboards/widgets/wildcard/define_visual_example_run_button.png" alt="Asignación dispar entre la configuración del widget y la especificación Vega" style="width:100%;" >}}|

## Formatos de datos compatibles

El widget comodín admite solicitudes de datos de todas las fuentes de datos admitidas en widgets nativos:
| Tipo de solicitud | Widgets que utilizan este tipo de solicitud |
|-----------------------|-------------------------------------------------------------------------------------------------------------|
| Solicitudes escalares: Cambio, Gráfico circular, Valor de consulta, Gráfico de dispersión, Tabla, Mapa de árbol, Lista principal, Distribución (de grupos), Geomapa |.
| Solicitudes con series temporales | Series temporales | Mapa de calor.
| Distribución de solicitudes | Distribución (de puntos)
| Enumerar solicitudes | Todos los datos orientados a "eventos" en el widget de lista |

## Información adicional
### Elegir entre Vega y Vega-Lite
Para una mayor simplicidad y brevedad, opte por Vega-Lite. El sistema es compatible con la versión 5.18.1 de Vega-Lite. Reserva Vega para necesidades de visualización más complejas o avanzadas.

### Integración Terraform
Utiliza el recurso `datadog_dashboard_json` cuando trabajes con widgets comodín en dashboards de Terraform.

### Limitaciones conocidas
Evita utilizar widgets comodín en los siguientes casos:
- Visualizaciones con alta cardinalidad. Si tus visualizaciones tienen más de 5000 filas por solicitud, considera la posibilidad de agregar los datos previamente en el backend antes de crear gráficas.
- Visualizaciones de red o jerárquicas.
- Visuales que requieren diseños basados en la física.
- Asignación geográfica avanzada.
- Representaciones gráficas en 3D.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vega.github.io/vega-lite/
[2]: /es/dashboards/
[3]: /es/notebooks/
[4]: /es/dashboards/widgets/
[5]: https://vega.github.io/vega-lite/examples/
[6]: /es/dashboards/widgets/#full-screen
[16]: /es/api/latest/dashboards/
[17]: /es/dashboards/graphing_json/widget_json/
[18]: /es/dashboards/functions/