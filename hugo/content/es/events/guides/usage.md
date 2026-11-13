---
aliases:
- /es/service_management/events/usage
- /es/service_management/events/guides/usage/
further_reading:
- link: /logs/log_configuration/processors/
  tag: Documentación
  text: Obtenga más información sobre los pipelines de procesamiento
- link: /events/explorer/
  tag: Documentación
  text: Clasifique eventos con Events Explorer
title: Uso de eventos
---
## Métricas personalizadas {#custom-metrics}

[Generar métricas][5] con retención de 15 meses a partir de cualquier consulta de búsqueda de eventos para crear eventos históricos y alertas, y hacer un seguimiento de ellos. Los eventos ingeridos con una marca de tiempo dentro de los últimos 20 minutos se consideran para la agregación. Para obtener más información, consulte [Event Analytics][6].

{{< img src="events/guides/usage/generate-metrics.png" alt="Imagen de métricas con la consulta de búsqueda de eventos." >}}

## Ejemplos de qué hacer con los eventos {#examples-of-what-to-do-with-events}

### Características de clasificación {#triage-features}

Utilice [Events Explorer][7] para agregar y visualizar los eventos que llegan a Datadog. Agrupe o filtre eventos por atributo y represéntelos gráficamente con análisis de eventos. Utilice la sintaxis de búsqueda de consultas para filtrar eventos mediante operadores booleanos y comodines.

### Dashboards {#dashboards}

{{< img src="events/guides/usage/events-dashboard.mp4" alt="Un widget de gráfico que utiliza eventos como fuente" video=true >}}

Puede utilizar eventos como fuente de datos en [graph widgets][8] para crear widgets de series temporales, tablas y listas principales de sus consultas de búsqueda de eventos. Por ejemplo, el Dashboard [Monitor Notifications Overview][9] analiza las tendencias de los eventos de alerta de seguimiento para ayudarle a mejorar su configuración y reducir la fatiga por alertas.

#### Superposiciones {#overlays}

{{< img src="events/guides/usage/event_overlays.png" alt="Opción para visualizar superposiciones de eventos en un Dashboard de ejemplo" style="width:100%;" >}}

Las superposiciones visualizan los eventos correspondientes sobre sus gráficos. Utilice la función [Event Overlays][10] del Dashboard para identificar cuándo un cambio reciente está causando problemas de rendimiento en su aplicación o servicios y encontrar la fuente del problema. 

### Crear un seguimiento {#create-a-monitor}

Envíe alertas y notificaciones de seguimiento basadas en consultas de eventos significativos. Para configurar una alerta, consulte la documentación de [Event Monitor][11].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/integrations/guide/reference-tables/
[3]: https://app.datadoghq.com/event/settings/pipelines
[4]: /es/help/
[5]: https://app.datadoghq.com/event/configuration/generate-metrics
[6]: /es/events/explorer/analytics
[7]: /es/events/explorer/
[8]: /es/dashboards/widgets/alert_graph/
[9]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[10]: /es/dashboards/change_overlays/
[11]: /es/monitors/types/event/