---
aliases:
- /es/graphing/dashboards/widgets
- /es/graphing/faq/widgets
- /es/graphing/widgets
further_reading:
- link: /dashboards/guide/context-links/
  tag: Documentación
  text: Enlaces personalizados
kind: documentación
title: Widgets
---

## Información general

Los widgets son componentes básicos de tus dashboards. Te permiten visualizar y correlacionar los datos en tu infraestructura.

### Gráficos
{{< whatsnext desc="Widgets genéricos para graficar datos de productos de Datadog: ">}}
    {{< nextlink href="/dashboards/widgets/change" 
        img="dashboards/widgets/icons/change_light_large.png">}} Cambio {{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution"
        img="dashboards/widgets/icons/distribution_light_large.png">}} Distribución{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/funnel"
        img="dashboards/widgets/icons/funnel_light_large.png">}} Embudo{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" 
        img="dashboards/widgets/icons/geomap_light_large.png">}} Mapa geográfico{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map"
        img="dashboards/widgets/icons/heatmap_light_large.png">}} Mapa de calor{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/pie_chart"
        img="dashboards/widgets/icons/pie_light_large.png">}} Gráfico circular{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value"
        img="dashboards/widgets/icons/query-value_light_large.png">}} Valor de consulta{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot"
        img="dashboards/widgets/icons/scatter-plot_light_large.png">}} Gráfico de dispersión{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table"
        img="dashboards/widgets/icons/table_light_large.png">}} Tabla{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/treemap"
        img="dashboards/widgets/icons/treemap_light_large.png">}} Gráfico de rectángulos{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries"
        img="dashboards/widgets/icons/timeseries_light_large.png">}} Serie temporal{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list"
        img="dashboards/widgets/icons/top-list_light_large.png">}} Lista de principales{{< /nextlink >}}
{{< /whatsnext >}}

### Groups (grupos)
{{< whatsnext desc="Muestra tus widgets en grupos: ">}}
    {{< nextlink href="/dashboards/widgets/group"
        img="dashboards/widgets/icons/group_default_light_large.svg">}} Grupo{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/powerpack"
        img="dashboards/widgets/icons/group_powerpack_light_large.svg">}} Powerpack{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/split_graph"
        img="dashboards/widgets/icons/group-split_light_small.svg">}} Gráfica dividida{{< /nextlink >}}
{{< /whatsnext >}}

### Anotaciones y embeds
{{< whatsnext desc="Widgets de decoración para estructurar y comentar dashboards de manera visual: ">}}
    {{< nextlink href="/dashboards/widgets/free_text" 
        img="dashboards/widgets/icons/free-text_light_large.png">}} Texto libre{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" 
        img="dashboards/widgets/icons/iframe_light_large.png">}} Iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" 
        img="dashboards/widgets/icons/image_light_large.png">}} Imagen{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" 
        img="dashboards/widgets/icons/notes_light_large.png">}} Notas y enlaces{{< /nextlink >}}
{{< /whatsnext >}}

### Listas y flujos
{{< whatsnext desc="Muestra una lista de eventos y problemas provenientes de diferentes fuentes: ">}}
    {{< nextlink href="/dashboards/widgets/list"
        img="dashboards/widgets/icons/change_light_large.png">}} Lista{{< /nextlink >}}
{{< /whatsnext >}}

### Alerta y respuesta
{{< whatsnext desc="Widgets de resumen para mostrar información de monitorización: ">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" 
        img="dashboards/widgets/icons/alert-graph_light_large.png">}} Gráfica de alertas{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" 
        img="dashboards/widgets/icons/alert-value_light_large.png">}}Valor de alerta{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" 
        img="dashboards/widgets/icons/check-status_light_large.png">}} Estado del check{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" 
        img="dashboards/widgets/icons/monitor-summary_light_large.png">}} Resumen de monitores{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/run_workflow" 
        img="dashboards/widgets/icons/run-workflow_light_small.svg">}} Ejecutar flujo de trabajo{{< /nextlink >}}
{{< /whatsnext >}}

### Arquitectura
{{< whatsnext desc="Visualiza los datos de la infraestructura y la arquitectura: ">}}
    {{< nextlink href="/dashboards/widgets/hostmap" 
        img="dashboards/widgets/icons/host-map_light_large.png">}} Mapa de host{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/topology_map" 
        img="dashboards/widgets/icons/service-map_light_large.png">}} Mapa de topología{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" 
        img="dashboards/widgets/icons/service-summary_light_large.png">}} Resumen de servicio{{< /nextlink >}}
{{< /whatsnext >}}

### Rendimiento y fiabilidad
{{< whatsnext desc="Visualizaciones de fiabilidad del sitio: ">}}
    {{< nextlink href="/dashboards/widgets/profiling_flame_graph"
        img="dashboards/widgets/icons/profiling_flame_graph.svg">}} Gráfica de llamas de perfiles{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo" 
        img="dashboards/widgets/icons/slo-summary_light_large.png">}} Resumen de objetivos de nivel de servicio (SLOs){{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo_list" 
        img="dashboards/widgets/icons/slo-list_light_large.png">}} Objetivo de nivel de servicio (SLO){{< /nextlink >}}
{{< /whatsnext >}}

## Pantalla completa

Puedes ver la mayoría de los widgets en el modo de pantalla completa y hacer lo siguiente:

* Cambiar los períodos
* Retroceder o avanzar en función del período de tiempo seleccionado
* Pausar la gráfica en el momento actual o visualizar la gráfica en directo
* Restablecer el período de tiempo
* Exportar la gráfica a un dashboard o notebook, o copiar la consulta
* Descargar los datos que producen la gráfica en formato CSV

Para acceder directamente a la vista general del widget, haz clic en el botón de pantalla completa en la esquina superior derecha del widget.

Hay opciones adicionales disponibles para los [widgets de serie temporal][1].

## Enlaces personalizados

Los enlaces personalizados conectan valores de datos a URLs, como una página de Datadog o tu consola de AWS.

Para personalizar las interacciones con los datos en línea de tus widgets genéricos, consulta la sección de [Enlaces personalizados][2].

## Anulación de unidad

Personaliza los valores de las unidades que se muestran en los widgets para añadir contexto a tus datos. Para obtener más información y casos de uso, consulta la sección de [Personalizar las visualizaciones con anulaciones de unidades][3].
- **Anulación de unidad**: elige mostrar unidades en la familia de la «memoria» y haz que Datadog se encargue de mostrar la escala adecuada en función de los datos (como megabytes o gigabytes).
- **Anulación de unidad y escala**: fija las unidades en una sola escala (muestra los datos en megabytes independientemente del valor).
- **Definir unidades personalizadas**: define unidades completamente personalizadas (como «pruebas» en lugar de un recuento genérico).

Esta no es una alternativa para asignar unidades a tus datos.
{{< whatsnext desc="Establece unidades a nivel de la organización: ">}}
    {{< nextlink href="/metrics/units/">}} Establecer unidades de métricas{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} Establecer unidades para consultas basadas en eventos{{< /nextlink >}}
{{< /whatsnext >}}

## Selector de hora global

Para utilizar el selector de hora global, al menos un widget basado en la hora debe tener configurado el uso de `Global Time`. Para ello, selecciona el widget en el editor de widgets, en **Set display preferences** (Configurar las preferencias de visualización), o añade un widget (la configuración de hora por defecto es la hora global).

El selector de tiempo general establece el mismo período de tiempo para todos los widgets mediante la opción `Global Time` en el mismo dashboard. Selecciona un intervalo móvil en el pasado (por ejemplo, `Past 1 Hour` o `Past 1 Day`) o un período fijo con la opción `Select from calendar...`, o [ingresa un período de tiempo personalizado][11]. Si se elige un intervalo móvil, los widgets se actualizan para moverse junto con dicho intervalo.

Los widgets no vinculados a la hora global muestran los datos de su periodo de tiempo local aplicados a la ventana global. Por ejemplo, si el selector de hora global está configurado del 1 de enero de 2019 al 2 de enero de 2019, un widget configurado con el marco de hora local para `Past 1 Minute` muestra el último minuto del 2 de enero de 2019 a partir de las 23:59.

## Copiar y pegar widgets

<div class="alert alert-warning">Debes contar con los permisos <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#dashboards"><code>dashboard_public_share</code></a> y habilitar el <a href="https://app.datadoghq.com/organization-settings/public-sharing/settings"><strong>uso compartido de datos públicos estáticos</strong></a> en los parámetros de organización para utilizar esta característica.</div>

Los widgets se pueden copiar en [dashboards][4], [notebooks][5], [servicios de APM][6] y la página de [recursos de APM][7] con `Ctrl + C` (`Cmd + C` para Mac), o al seleccionar el icono de compartir y elegir «Copy» (Copiar).

Los widgets copiados se pueden pegar dentro de Datadog con `Ctrl + V` (`Cmd + V` para Mac) en:

* **Dashboards**: añade un widget nuevo ubicado debajo del cursor del mouse.
* **Notebooks**: añade una celda nueva al final del notebook.

También puedes pegar el widget en tu programa de chat favorito que muestre previsualizaciones de enlaces (como Slack o Microsoft Teams). Esto muestra una imagen snapshot de tu gráfica junto con un enlace directo al widget.

### Grupos de widgets

Los widgets del grupo del timeboard se pueden copiar al colocar el cursor por encima de la zona del widget del grupo y al utilizar `Ctrl + C` (`Cmd + C` para Mac) o seleccionar el icono de compartir y elegir «Copy» (Copiar).

**Nota**: Al pegar gráficas en screenboards o notebooks, se pegan widgets individuales en el grupo.

Para copiar varios widgets de screenboard (solo en el modo de edición), pulsa `shift + click` en los widgets y utiliza `Ctrl + C` (`Cmd + C` para Mac).

**Nota**: Esto solo funciona cuando se comparte dentro de Datadog. No genera una imagen de vista previa.

## Gráficas de widget

### Sensitive Data Scanner

| Formato | Instrucciones            |
| -----  | ----------------------- |
| PNG    | Para descargar un widget en formato PNG, haz clic en el botón de exportación en la parte superior derecha del widget y selecciona **Download as PNG** (Descargar como PNG). |
| CSV    | Para descargar los datos de un widget de lista de principales, serie temporal o tabla en formato CSV, haz clic en el botón de exportación en la parte superior derecha del widget y selecciona **Download as CSV** (Descargar como CSV).|

### Menú de gráficos

Haz clic en cualquier gráfico del dashboard para abrir un menú de opciones:

| Opción                 | Descripción                                                        |
|------------------------|--------------------------------------------------------------------|
| Send snapshot (Enviar snapshot)          | Crea y envía un snapshot de tu gráfico.                          |
| Find correlated metrics (Encontrar métricas correlacionadas)| Encuentra correlaciones de servicios de APM, integraciones y dashboards. |
| View in full screen (Ver en pantalla completa)    | Visualiza el gráfico en [modo pantalla completa][5].                           |
| Lock cursor (Bloquear el cursor)            | Bloquea el cursor en la página.                              |
| View related processes (Ver procesos relacionados) | Accede a la página [Live Processes][6] que se corresponde con tu gráfico.         |
| View related hosts (Ver hosts relacionados)     | Accede a la página [Mapa del host][7] que se corresponde con tu gráfico.               |
| View related logs (Ver logs relacionados)      | Accede a la página [Navegador de logs][8] que se corresponde con tu gráfico.           |
| View related traces (Ver trazas relacionadas)    | Rellena un panel de [Trazas][9] que se corresponde con tu gráfico.                 |
| View related profiles (Ver perfiles relacionados)  | Accede a la página [Elaboración de perfiles][7] que se corresponde con tu gráfico.             |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/timeseries/#full-screen
[2]: /es/dashboards/guide/context-links/
[3]: /es/dashboards/guide/unit-override
[4]: /es/dashboards/
[5]: /es/notebooks/
[6]: /es/tracing/services/service_page/
[7]: /es/tracing/services/resource_page/
[8]: /es/logs/explorer/
[9]: /es/tracing/trace_explorer/
[10]: /es/profiler/profile_visualizations/
[11]: /es/dashboards/guide/custom_time_frames/