---
description: Optimice la resolución de problemas con Change Tracking al hacer un seguimiento
  de los despliegues, las Feature Flags, los cambios de configuración y otras modificaciones
  de sus servicios.
further_reading:
- link: https://www.datadoghq.com/blog/change-tracking/
  tag: Blog
  text: Unifique la visibilidad de los cambios en sus servicios y dependencias
- link: https://www.datadoghq.com/blog/ai/investigate-production-alerts/
  tag: Blog
  text: Cómo enseñar a un modelo de 9B a investigar alertas de producción
- link: /monitors/status/
  tag: Documentación
  text: Monitor Status Page
- link: /dashboards/
  tag: Documentación
  text: Dashboards
- link: /tracing/services/service_page/
  tag: Documentación
  text: Página de servicio
title: Seguimiento de cambios
---
## Descripción general {#overview}

Change Tracking optimiza la resolución de problemas y la respuesta ante incidentes al mostrar cambios relevantes en su servicio y sus dependencias, lo que permite detectarlos y corregirlos más rápidamente cuando surgen problemas.

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="Los detalles de un cambio en la línea de tiempo de Recent Changes en el resumen de servicios" style="width:100%;" >}}

Change Tracking permite hacer un seguimiento de diversas modificaciones en su servicio y sus dependencias, entre ellas:
- Despliegues
- Feature Flags
- Picos de tráfico
- Cambios en la configuración
- Modificaciones en la base de datos
- Cambios en el esquema
- Ajustes de escala
- Ajustes de Kubernetes
- Bloqueos de pods de Kubernetes
- Alerts de Watchdog

Para obtener detalles sobre tipos específicos de cambios admitidos y requisitos de configuración, consulte [Tipos de cambios con seguimiento][16].

## Uso de Change Tracking {#using-change-tracking}

Change Tracking está disponible en varias páginas de Datadog:

### Monitor Status Page {#monitor-status-page}

Visualice y analice los cambios desde la [página de estado del seguimiento][1].

{{< img src="/change_tracking/change-tracking-monitor-status-page-2.png" alt="Change Tracking mostrado en Monitor Status Page" style="width:100%;" >}}

#### Requisitos previos {#prerequisites}

Para usar Change Tracking en Monitor Status Page, asegúrese de que el servicio correspondiente haya sido:
- Especificado en la consulta del seguimiento.
- Seleccionado como parte de un grupo.
- Agregado como una etiqueta `service` en el seguimiento.

#### Para analizar los cambios desde la página de estado del seguimiento: {#to-analyze-changes-from-the-monitor-status-page}

1. Vaya a la página de estado del seguimiento que está analizando.
1. Ubique la línea de tiempo de seguimiento de cambios en la parte superior de la página.
   - Para los seguimientos con múltiples gráficos (determinados por el group by de la consulta del seguimiento), filtre por un grupo individual.
1. Utilice la línea de tiempo junto con los gráficos de eventos para correlacionar los eventos de cambio con la alerta.
1. Haga clic en el indicador de cambio en la línea de tiempo para ver más detalles sobre el cambio en el panel lateral.
1. Desde el panel lateral, puede investigar más detalles sobre el cambio y realizar las siguientes acciones:
   - Visualice el despliegue en su sistema de CI/CD.
   - Visualice los commits más recientes en su repositorio.
   - Compare los cambios entre despliegues para identificar posibles problemas.
   - Configure enlaces personalizados adicionales en el panel lateral del despliegue para acceder rápidamente a otros recursos relevantes para usted.

### Servicios {#services}

Visualice y analice los cambios desde la [página de servicio][2].

{{< img src="/change_tracking/change-tracking-service-page-2.png" alt="Componente Recent Changes en la sección de resumen de servicios que muestra los cambios en las dependencias" style="width:100%;" >}}

#### Para analizar cambios desde la página del servicio: {#to-analyze-changes-from-the-service-page}

1. Navegue a la página del servicio que desea investigar.
1. Ubique la línea de tiempo de cambios en la sección {{< ui >}}Service Summary{{< /ui >}}.
1. Use las pestañas de servicio y dependencias para visualizar:
   - Cambios limitados al servicio específico ({{< ui >}}Changes by Service{{< /ui >}})
   - Cambios al servicio específico y servicios dependientes que podrían impactar este servicio ({{< ui >}}Changes by Service + Dependencies{{< /ui >}})
1. Haga clic en el indicador de cambio para visualizar información detallada y tomar medidas correctivas.

### Dashboards {#dashboards}

Visualice y analice los cambios desde cualquier [Dashboard][3].

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="Change Tracking mostrado en el Dashboard" style="width:100%;" >}}

#### Requisitos previos {#prerequisites-1}
Para ver los cambios relevantes en la línea de tiempo y como superposiciones en su Dashboard, asegúrese de haber configurado al menos un widget de series temporales.

#### Para analizar los cambios desde los Dashboards: {#to-analyze-changes-from-dashboards}

1. Navegue a su Dashboard.
2. Haga clic en {{< ui >}}Show Overlays{{< /ui >}} en la parte superior de la página para habilitar la línea de tiempo de cambios y las superposiciones de cambios en los widgets compatibles.
3. Pase el cursor sobre cualquier indicador o superposición de cambio para visualizar un resumen del cambio.
4. Haga clic en el indicador o la superposición de cambio para visualizar información detallada y tomar medidas correctivas.

### Widgets {#widgets}

Además de las integraciones listas para usar, Change Tracking está disponible como fuente de datos para widgets en todo Datadog, incluidos Dashboards y Notebooks.

{{< img src="/change_tracking/change-tracking-datasource-examples.png" alt="Ejemplos de fuente de datos de Change Tracking" style="width:100%;" >}}

Para configurar un widget con datos de Change Tracking:

1.	En un Dashboard o notebook, agregue o edite un tipo de widget compatible (Timeseries, Query Value, Table, Tree Map, Top List, Pie, Change o Bar Chart).
3.	En el menú desplegable {{< ui >}}data source{{< /ui >}}, seleccione {{< ui >}}Change Tracking{{< /ui >}}.
4.	Configure sus filtros ({{< ui >}}Service{{< /ui >}} es obligatorio).
5.	(Opcional) Para los widgets que admiten agrupación, use {{< ui >}}Group by{{< /ui >}} para dividir los resultados.

{{< img src="/change_tracking/change-tracking-datasource-edit-widget.png" alt="Widgets de fuente de datos de Change Tracking" style="width:100%;" >}}

Para los widgets de series temporales, también puede habilitar Change Tracking como una {{< ui >}}Event Overlay{{< /ui >}}, que muestra los cambios sobre las series temporales para ayudar a correlacionarlos con el comportamiento de las métricas.

{{< img src="/change_tracking/change-tracking-datasource-edit-overlay.png" alt="Fuente de datos de Change Tracking como Event Overlay" style="width:100%;" >}}


#### Visualizar detalles del cambio {#view-change-details}

Para visualizar información sobre un cambio o un conjunto de cambios, haga clic en un punto de datos en el widget y seleccione {{< ui >}}View Changes{{< /ui >}}. Esto abre el panel lateral de Change Tracking con detalles adicionales.

## Tipos de cambios que puede rastrear {#change-types-you-can-track}

Change Tracking cubre despliegues, Feature Flags, cambios en bases de datos, streaming y comportamiento de las aplicaciones, cambios en la infraestructura y cualquier cambio personalizado que usted mismo envíe.

Para obtener la lista completa de tipos de cambios, la función de Datadog de la que proviene cada uno y lo que necesita para habilitarlo, consulte [Tipos de cambios con seguimiento][16].
  

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/status/
[2]: /es/tracing/services/service_page/
[3]: /es/dashboards/
[4]: /es/tracing/services/deployment_tracking/
[5]: /es/integrations/launchdarkly/#feature-flag-tracking-integration/
[6]: /es/api/latest/events/
[7]: /es/watchdog/
[8]: /es/database_monitoring/
[9]: /es/data_streams/
[10]: /es/database_monitoring/connect_dbm_and_apm/
[11]: /es/actions/connections/#work-with-connections
[12]: /es/database_monitoring/schema_explorer
[13]: /es/infrastructure/resource_catalog/resource_changes/
[15]: /es/tracing
[16]: /es/change_tracking/change_types/