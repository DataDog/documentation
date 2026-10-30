---
description: 'Descontinuación de la ingesta y generación de informes de incidentes
  en DORA Metrics: cronograma, quiénes se ven afectados y cómo migrar sus informes
  de incidentes'
further_reading:
- link: /delivery_performance/dora_metrics/change_failure_detection/
  tag: Documentación
  text: Conozca la detección de fallos en cambios.
- link: /incident_response/incident_management/analytics_and_reporting/
  tag: Documentación
  text: Genere informes sobre incidentes con Incident Management Analytics
- link: /delivery_performance/dora_metrics/
  tag: Documentación
  text: Obtenga información sobre DORA Metrics
private: true
title: Descontinuación de la ingesta y generación de informes de incidentes en DORA
  Metrics
---
A partir del **2026-12-31**, DORA Metrics no ingiere ni muestra datos de incidentes y, a partir del **2027-03-31**, los incidentes almacenados en DORA Metrics son inaccesibles. Esto afecta lo siguiente:

- Las vistas de incidentes en DORA Metrics
- Las API de incidentes de DORA
- Las fuentes de datos de incidentes de PagerDuty y Datadog en la [configuración de DORA Metrics][1]
- Cualquier panel, notebook o consulta guardada que utilice datos de incidentes de DORA

Esto no afecta la forma en que se calculan Change Failure Rate y Failed Deployment Recovery Time, ya que utilizan [Change Failure Detection][2], no eventos de incidentes.

Si tiene incidentes y un historial de incidentes en [Datadog Incident Management][3], estos tampoco se verán afectados. Puede declararlos, gestionarlos y generar informes sobre ellos independientemente de DORA Metrics.

## Acciones por fuente de datos {#actions-by-data-source}

Las acciones que debe realizar dependen de si su organización envía o lee datos de incidentes en DORA Metrics a través de cualquiera de los siguientes medios:

- La fuente de datos **Datadog Incidents** en la configuración de DORA Metrics
- La fuente de datos **PagerDuty** en la configuración de DORA Metrics
- La **API de incidentes de DORA** (`POST /api/v2/dora/incident`)

### Fuente de datos Datadog Incidents {#datadog-incidents-data-source}

Los incidentes de la fuente de datos **Datadog Incidents** en la configuración de DORA Metrics se almacenan en Datadog Incident Management, no en DORA Metrics. Su historial de incidentes permanece disponible en Incident Management, por lo que la fecha límite de exportación del 2027-03-31 no aplica.

Si alguno de sus dashboards, notebooks o consultas guardadas hace referencia a datos de incidentes de DORA, actualícelo para usar [Incident Management Analytics][4] antes del 2026-12-31. De lo contrario, no se requiere ninguna acción.

### Fuente de datos de PagerDuty o API de incidentes de DORA {#pagerduty-data-source-or-dora-incident-api}

Los incidentes de la fuente de datos **PagerDuty** en la configuración de DORA Metrics o de la **API de incidentes de DORA** se almacenan en DORA Metrics, por lo que ambas fechas se aplican. Para mantener sus informes e historial de incidentes:

1. Antes del 2026-12-31:
   - Elimine las llamadas al punto de conexión de ingesta de incidentes (`POST /api/v2/dora/incident`) y al punto de conexión de eliminación de incidentes.
   - Traslade la generación continua de informes de incidentes a una de las [alternativas](#alternatives-for-incident-reporting) para evitar una interrupción en sus datos de incidentes.
1. Antes del 2027-03-31:
   - Exporte cualquier historial de incidentes que desee conservar con la [API de eventos de incidentes][5], o descargue los datos de su dashboard como CSV.
   - Actualice o retire cualquier dashboard, notebook o consulta guardada que haga referencia a datos de incidentes de DORA.

## Alternativas para la generación de informes de incidentes {#alternatives-for-incident-reporting}

| Fuente de incidentes | Usar en su lugar |
| --- | --- |
| Datadog Incident Management | [Incident Management Analytics][4] |
| PagerDuty | La [integración de Datadog con PagerDuty][6], que incorpora los eventos activados y resueltos a Events Explorer (explorador de eventos). Esta integración es independiente de la fuente de datos de PagerDuty en DORA Metrics. |
| Eventos de incidentes personalizados enviados a través de la API | La [Datadog Events API][7], para enviar eventos a Events Explorer (explorador de eventos) y usarlos en consultas y dashboards. Para declarar y gestionar incidentes en Datadog, use [Datadog Incident Management][3]. |

<div class="alert alert-info">Estas alternativas solo admiten la generación de informes de incidentes. No alimentan las métricas de estabilidad de DORA, que utilizan <a href="/delivery_performance/dora_metrics/change_failure_detection/">Change Failure Detection</a>.</div>

## Línea de tiempo {#timeline}

| Fecha | Cambio |
| --- | --- |
| 2026-12-31 | DORA Metrics deja de aceptar incidentes: <br>- Las API de ingesta y eliminación de incidentes están deshabilitadas.<br>- La fuente de datos de PagerDuty en DORA Metrics deja de reenviar incidentes.<br>- Los datos de Datadog Incidents no se muestran en DORA Metrics.<br>Los incidentes ingeridos antes de esta fecha permanecen disponibles para su visualización y exportación hasta el 2027-03-31. Datadog elimina las configuraciones de incidentes de la [configuración de DORA Metrics][1]. |
| 2027-03-31 | Los incidentes enviados anteriormente a través de DORA Metrics no se pueden ver ni exportar. |

## Obtener ayuda {#get-help}

Para obtener ayuda para evaluar el impacto o actualizar sus informes de incidentes, comuníquese con [Datadog Support][8].

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /es/delivery_performance/dora_metrics/change_failure_detection/
[3]: /es/incident_response/incident_management/
[4]: /es/incident_response/incident_management/analytics_and_reporting/
[5]: /es/api/latest/dora-metrics/get-a-list-of-incident-events/
[6]: /es/integrations/pagerduty/
[7]: /es/api/latest/events/post-an-event/
[8]: /es/help/