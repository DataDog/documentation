---
description: 'Descontinuación de la ingesta y generación de informes de incidentes
  en DORA Metrics: cronograma, quiénes se ven afectados y cómo migrar sus informes
  de incidentes.'
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
A partir del **31 de enero de 2027**, DORA Metrics no ingiere nuevos incidentes. Esto afecta lo siguiente:

- La vista de seguimiento de incidentes DORA, que se elimina
- Las API de ingesta y eliminación de fallas e incidentes DORA, que se desactivan y devuelven un error 4xx
- La fuente de datos **PagerDuty** en [DORA Metrics settings][1], que deja de reenviar incidentes
- La fuente de datos **Datadog Incidents** en la configuración de DORA Metrics, que deja de extraer nuevos incidentes hacia DORA Metrics

Datadog también elimina las configuraciones de incidentes de [DORA Metrics settings][1].

Los incidentes ingeridos antes de esta fecha permanecen disponibles en paneles personalizados, y usted aún puede consultarlos con los endpoints [list][5] y [get][9] de la API de DORA.

Esto no afecta la forma en que se calculan Change Failure Rate y Failed Deployment Recovery Time. Desde enero de 2026, estas métricas utilizan [Change Failure Detection][2], no eventos de incidentes.

Si usted tiene incidentes e historial de incidentes en [Datadog Incident Management][3], estos tampoco se ven afectados. Usted puede declararlos, gestionarlos e informar sobre ellos independientemente de DORA Metrics.

## Acciones por fuente de datos {#actions-by-data-source}

Las acciones que usted necesita realizar dependen de si su organización envía o lee datos de incidentes en DORA Metrics a través de cualquiera de los siguientes:

- La fuente de datos **Datadog Incidents** en la configuración de DORA Metrics
- La fuente de datos **PagerDuty** en la configuración de DORA Metrics
- La **DORA failure API** (`POST /api/v2/dora/failure`) o la **DORA incident API** (`POST /api/v2/dora/incident`), que está descontinuada

### Fuente de datos de Datadog Incidents {#datadog-incidents-data-source}

Los incidentes de la fuente de datos **Datadog Incidents** en la configuración de DORA Metrics se almacenan en Datadog Incident Management, no en DORA Metrics. Su historial de incidentes permanece disponible en Incident Management.

Si algún panel, notebook o consulta guardada hace referencia a la vista de seguimiento de incidentes de DORA, actualice ese recurso para usar [Incident Management Analytics][4] antes del 31 de enero de 2027. De lo contrario, no se requiere ninguna acción.

### Fuente de datos de PagerDuty o API de fallas e incidentes de DORA {#pagerduty-data-source-or-dora-failure-and-incident-apis}

Antes del 31 de enero de 2027:

1. Elimine las llamadas a los siguientes endpoints de sus scripts y pipelines de CI/CD. Después de esta fecha, se desactivan y devuelven un error 4xx.
   - `POST /api/v2/dora/failure` y `POST /api/v2/dora/incident`
   - `DELETE /api/v2/dora/failure/{failure_id}`
1. Traslade la generación continua de informes a una de las [alternativas](#alternatives-for-incident-reporting) para evitar una brecha en sus datos de incidentes.

No necesita exportar su historial de incidentes. Los incidentes ingeridos antes de esta fecha permanecen disponibles en paneles personalizados y a través de los endpoints [list][5] y [get][9] de la API de DORA.

## Alternativas para la generación de informes de incidentes {#alternatives-for-incident-reporting}

| Fuente de incidentes | Usar en su lugar |
| --- | --- |
| Datadog Incident Management | [Incident Management Analytics][4] |
| PagerDuty | La [integración de Datadog con PagerDuty][6], que lleva los eventos activados y resueltos a Events Explorer. Esta integración es independiente de la fuente de datos de PagerDuty en DORA Metrics. |
| Eventos de incidentes personalizados enviados a través de la API | La [Datadog Events API][7], para enviar eventos a Events Explorer para realizar consultas y crear paneles. Para declarar y gestionar incidentes en Datadog, utilice [Datadog Incident Management][3]. |

<div class="alert alert-info">Estas alternativas solo permiten generar informes de incidentes. No alimentan las métricas de estabilidad de DORA, que utilizan <a href="/delivery_performance/dora_metrics/change_failure_detection/">Change Failure Detection</a>.</div>

## Obtenga ayuda {#get-help}

Para obtener ayuda para evaluar el impacto o actualizar la generación de informes de incidentes, comuníquese con [Datadog Support][8].

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /es/delivery_performance/dora_metrics/change_failure_detection/
[3]: /es/incident_response/incident_management/
[4]: /es/incident_response/incident_management/analytics_and_reporting/
[5]: /es/api/latest/dora-metrics/get-a-list-of-incident-events/
[6]: /es/integrations/pagerduty/
[7]: /es/api/latest/events/post-an-event/
[8]: /es/help/
[9]: /es/api/latest/dora-metrics/get-an-incident-event/