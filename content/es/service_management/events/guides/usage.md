---
aliases:
- /es/service_management/events/usage
further_reading:
- link: /logs/log_configuration/processors/
  tag: Documentación
  text: Más información sobre pipelines de procesamiento
- link: /service_management/events/explorer/
  tag: Documentación
  text: Clasificar eventos con Events Explorer
title: Uso de eventos
---

## Métricas personalizadas

[Genera métricas][5] con una retención de 15 meses a partir de cualquier consulta de búsqueda de eventos para crear y monitorizar eventos históricos y alertas. Para la agregación, se tienen en cuenta los eventos ingeridos con una marca de tiempo dentro de los últimos 20 minutos. Para obtener más información, consulta [Event Analytics][6].

{{< img src="service_management/events/guides/usage/generate-metrics.png" alt="Imagen de métricas con la consulta de búsqueda de eventos." >}}

## Ejemplos de qué hacer con eventos

### Características de clasificación

Utilice el [eventos Explorador][7] para agregar y ver eventos que entran en Datadog. Agrupe o filtre eventos por atributo y representarlos gráficamente con evento analytics. Utilice la sintaxis de consulta Buscar para filtrar eventos utilizando operadores booleanos y comodines.

### Dashboards

{{< img src="service_management/eventos/guides/usage/eventos-dashboard.mp4" alt="Un gráfico widget que utiliza eventos como fuente" vídeo=true >}}

Puedes utilizar eventos como fuente de datos en los [widgets de gráficos][8] para crear widgets de series temporales, tablas y listas principales de tus consultas de búsqueda de eventos. Por ejemplo, el dashboard [Monitor Notifications Overview][9] (Información general sobre las notificaciones del monitor) analiza las tendencias de los eventos de alerta del monitor para ayudarte a mejorar la configuración y reducir la fatiga de las alertas.

#### Superposiciones 

{{< img src="service_management/events/guides/usage/event_overlays.png" alt="Opción para ver superposiciones de eventos en un dashboard de ejemplo" style="width:100%;" >}}

Las superposiciones permiten visualizar eventos sobre tus gráficos. Utiliza la característica del dashboard [Event Overlays][10] (Superposiciones de eventos) para identificar cuándo un cambio reciente está generando problemas de rendimiento en tu aplicación o servicios y encontrar el origen del problema.

### Crear un monitor

Envía alertas de monitor y notificaciones basadas en consultas de eventos significativos. Para configurar una alerta, consulta la documentación [Monitor de eventos][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: /es/integrations/guide/reference-tables/
[3]: https://app.datadoghq.com/event/pipelines
[4]: /es/help/
[5]: https://app.datadoghq.com/event/configuration/generate-metrics
[6]: /es/service_management/events/explorer/analytics
[7]: /es/service_management/events/explorer/
[8]: /es/dashboards/widgets/alert_graph/
[9]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[10]: /es/dashboards/change_overlays/
[11]: /es/monitors/types/event/