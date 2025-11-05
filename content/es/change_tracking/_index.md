---
further_reading:
- link: /monitors/status/
  tag: Documentación
  text: Página de estado del monitor
- link: /dashboards/
  tag: Documentación
  text: Dashboards
- link: /tracing/services/service_page/
  tag: Documentación
  text: Página de servicios
- link: /api/latest/events/
  tag: Documentación
  text: API de gestión de eventos
- link: /tracing/services/deployment_tracking/
  tag: Documentación
  text: Rastreo de despliegue
- link: /integrations/launchdarkly/#feature-flag-tracking-integration/
  tag: Documentación
  text: LaunchDarkly
- link: /watchdog/
  tag: Documentación
  text: Watchdog
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /data_streams/
  tag: Documentación
  text: Data Streams Monitoring
- link: https://www.datadoghq.com/blog/change-tracking/
  tag: Blog
  text: Unificar la visibilidad de los cambios en tus servicios y dependencias
title: Rastreo de cambios
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Change Tracking no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}})</div>
{{< /site-region >}}

## Información general

El rastreo de cambios agiliza solucionar problemas y la respuesta a incidencias al mostrar los cambios relevantes en tu servicio y sus dependencias, lo que permite una detección y corrección más rápidas cuando surgen problemas.

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="Los detalles de un cambio en la cronología de Cambios recientes en el Resumen del servicio" style="width:100%;" >}}

El rastreo de cambios admite la monitorización de una serie de modificaciones en tu servicio y sus dependencias, entre ellas:
- Despliegues
- [Indicadores de características][14]
- Cambios de configuración
- Modificaciones de la base de datos
- Cambios de esquema
- Ajustes de escala
- Ajustes de Kubernetes
- Fallas del pod de Kubernetes
- Alertas de Watchdog

Para obtener más información sobre los tipos específicos de cambios admitidos y los requisitos de configuración, consulta la sección [Cambios rastreados](#tracked-changes).

## Uso del rastreo de cambios

El rastreo de cambios está disponible en varias páginas de Datadog:

### Página de estado del monitor

Ve y analiza los cambios desde la [página de estado del monitor][1].

{{< img src="/change_tracking/change-tracking-monitor-status-page-2.png" alt="Change Tracking en la Página de estado del monitor" style="width:100%;" >}}

#### Requisitos previos

Para utilizar el rastreo de cambios en la página de estado del monitor, asegúrate de que el servicio correcto:
- Se ha especificado en la consulta del monitor.
- Se ha seleccionado como parte de un grupo.
- Se ha añadido como etiqueta `service` en el monitor.

#### Para analizar los cambios desde la página de estado del monitor:

1. Ve a la página de estado del monitor para el monitor que estás analizando.
1. Localiza la cronología de rastreo de cambios en la parte superior de la página.
   - Para monitores con múltiples gráficos (dictados por el grupo en la consulta del monitor), filtra un grupo individual.
1. Utiliza la cronología junto con los gráficos de evento para correlacionar los eventos de cambio con la alerta.
1. Haz clic en el indicador de cambios en la cronología para ver más detalles sobre el cambio en el panel lateral.
1. En el panel lateral, puedes investigar más detalles sobre el cambio y realizar las siguientes acciones:
   - Visualizar el despliegue en tu sistema CI/CD.
   - Ver las últimas confirmaciones en tu repositorio.
   - Comparar los cambios entre despliegues para identificar posibles problemas.
   - Configura enlaces personalizados adicionales en el panel lateral de despliegue para acceder rápidamente a otros recursos relevantes para ti.

### Servicios

Visualizar y analizar los cambios desde la [página de servicios][2].

{{< img src="/change_tracking/change-tracking-service-page.png-2" alt="Componentes de cambios recientes dentro de la sección Resumen del servicio que muestra los cambios de dependencias" style="width:100%;" >}}

#### Para analizar los cambios desde la página de servicios:

1. Navega hasta la página de servicios que deseas investigar.
1. Localiza la cronología de cambios en la sección **Service Summary** (Resumendel servicio).
1. Utiliza las pestañas de servicios y dependencias para ver cualquiera de ellos:
   - Cambios limitados al servicio específico (**Cambios por servicio**)
   - Cambios en el servicio específico y los servicios dependientes que podrían afectar a este servicio (**Cambios por servicio + dependencias**)
1. Haz clic en el indicador de cambio para ver información detallada y tomar medidas correctoras.

### Dashboards

Visualiza y analiza los cambios desde cualquier [dashboard][3].

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="Change Tracking mostrado en el dashboard" style="width:100%;" >}}

#### Requisitos previos
Para ver los cambios relevantes dentro de la cronología y como superposiciones en tu dashboard, asegúrate de haber configurado al menos un widget de serie temporal.

#### Para analizar los cambios de los dashboards:

1. Ve a tu dashboard.
2. Haz clic en **Show Overlays** (Mostrar superposiciones) en la parte superior de la página para activar la cronología de cambios y las superposiciones de cambio en widgets compatibles.
3. Pasa el ratón por encima de cualquier indicador de cambio o superposición para ver un resumen del cambio.
4. Haz clic en el indicador de cambio o en la superposición para ver información detallada y tomar medidas correctoras.

## Rastreo de los cambios
Rastreo de cambios realiza un seguimiento de este tipo de cambios en tu infraestructura:

| Tipo de cambio                                                                      | Requisitos de rastreo                                                                                                                                                                   |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Despliegues de código (APM)                                                           | APM y [rastreo del despliegue][4]. Debe haber una versión disponible en el servicio.                                                                                                             |
| Actualizaciones del manifiesto de despliegue de Kubernetes                                           | Datadog Agent configurado para Kubernetes (si es posible, añade la etiqueta (label) de servicio al archivo yaml de Kubernetes).                                                                                             |
| Indicadores de características                                                                    | Utiliza la integración de LaunchDarkly o envía eventos personalizados utilizando la API Events. Consulta la [documentación de Feature Flag Tracking][14] para la configuración y las opciones avanzadas.                          |
| Eventos de cambio de configuración personalizados                                               | [API de Event Management][6].                                                                                                                                                               |
| Alertas de Watchdog (picos de tasa de error, picos de latencia, interrupciones de la nube y de la API, etc.). | Consulta la documentación de [Watchdog][7] para obtener más información sobre los requisitos de las alertas de Watchdog específicas.                                                                                          |
| Fallas de pods de Kubernetes CrashLoopBackOff                                          | Integración de Kubernetes (si es posible, añade la etiqueta (label) de servicio al archivo yaml de Kubernetes).                                                                                                          |
| Cambio de tablas (esquemas) de bases de datos PostgreSQL, SQL Server y MySQL                 | Consulta la documentación [Exploración de esquemas de bases de datos][12] para obtener más información sobre el seguimiento de esquemas mediante DBM y [Correlacionar Database Monitoring y trazas][10] para configurar la correlación de APM y DBM. |
| Cambios en MongoDB Index y SearchIndex                                              | [Database Monitoring (DBM)][8], [Correlacionar Database Monitoring y trazas][10].                                                                                                          |
| Cambio de la configuración de la base de datos PostgreSQL                                              | [Database Monitoring (DBM)][8], [Correlacionar Database Monitoring y trazas][10].                                                                                                          |
| Cambio de la configuración de la base de datos de SQL Server                                              | [Database Monitoring (DBM)][8], [Correlacionar Database Monitoring y trazas][10].                                                                                                          |
| Actualizaciones del esquema Kafka                                                             | [Data Streams Monitoring (DSM)][9].                                                                                                                                                      |
| Eventos de escala de despliegue manual de Kubernetes                                        | Registro de auditoría de Kubernetes                                                                                                                                                               |
| Cambios en los recursos de infraestructura de nube ({{< tooltip text="en Vista previa" tooltip="Esta característica está en Vista previa y está limitada actualmente a una muestra pequeña de cambios de recursos en la nube. Para solicitar acceso, consulta la documentación de Cambios de recursos vinculada en Requisitos de seguimiento." >}}) | [Cambios en los recursos][13]: activa la recopilación de recursos y, opcionalmente, el reenvío de eventos del proveedor de la nube.       

## Referencias adicionales

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
[11]: /es/service_management/workflows/connections/#work-with-connections
[12]: /es/database_monitoring/schema_explorer
[13]: /es/infrastructure/resource_catalog/resource_changes/
[14]: /es/change_tracking/feature_flags