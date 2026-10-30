---
description: Active Datadog On-Call Pages desde herramientas de seguimiento, alertas
  e incidentes de terceros mediante integraciones nativas o un webhook genérico.
further_reading:
- link: /incident_response/on-call/
  tag: Documentación
  text: Datadog On-Call
- link: /incident_response/on-call/pages/
  tag: Documentación
  text: Pages
- link: /incident_response/on-call/routing_rules/
  tag: Documentación
  text: Reglas de enrutamiento
title: On-Call Integrations
---
## Descripción general {#overview}

Datadog On-Call admite múltiples fuentes de activación más allá de los seguimientos nativos de Datadog. Utilice herramientas de seguimiento, alertas y gestión de incidentes de terceros para enviar Pages directamente a sus On-Call Teams. Las alertas de cualquier parte de su stack llegan entonces a los responsables adecuados a través de sus políticas de escalamiento configuradas. Para obtener más información, consulte [Activar una Page][1].

Cada integración nativa enumerada en esta página incluye instrucciones de configuración en su propio mosaico de integración. Estas instrucciones cubren cómo configurar la herramienta de terceros para enviar una Page. También cubren cómo asignar sus alertas a un Datadog On-Call Team. Si su herramienta no tiene una integración nativa, utilice la [integración de webhook genérico](#generic-webhook-integration) en su lugar.

## Integraciones disponibles {#available-integrations}

Datadog On-Call ofrece soporte nativo para enviar Pages desde las siguientes herramientas:

{{< card-grid >}}
  {{< image-card href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" integration_id="amazon-sns" alt="Amazon SNS" title="Amazon SNS" style="catalog" >}}
  {{< image-card href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" integration_id="azure-monitor" alt="Azure Monitor" title="Azure Monitor" style="catalog" >}}
  {{< image-card href="/integrations/bugsnag/#page-a-datadog-on-call-team" integration_id="bugsnag" alt="Bugsnag" title="Bugsnag" style="catalog" >}}
  {{< image-card href="/integrations/catchpoint/#trigger-on-call-pages" integration_id="catchpoint" alt="Catchpoint" title="Catchpoint" style="catalog" >}}
  {{< image-card href="https://cronitor.io/docs/using-datadog-on-call-with-cronitor" integration_id="cronitor-v2" alt="Cronitor" title="Cronitor" style="catalog" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-microsoft-teams" integration_id="microsoft-teams" alt="Microsoft Teams" title="Microsoft Teams" style="catalog" >}}
  {{< image-card href="/integrations/nagios/?tab=host#trigger-on-call-pages" integration_id="nagios" alt="Nagios" title="Nagios" style="catalog" >}}
  {{< image-card href="/integrations/new-relic/#trigger-on-call-pages" integration_id="new-relic" alt="New Relic" title="New Relic" style="catalog" >}}
  {{< image-card href="/integrations/pingdom-v3/#page-a-datadog-on-call-team" integration_id="pingdom-v3" alt="Pingdom" title="Pingdom" style="catalog" >}}
  {{< image-card href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" integration_id="prometheus" alt="Prometheus Alertmanager" title="Prometheus Alertmanager" style="catalog" >}}
  {{< image-card href="/integrations/sentry/#page-a-datadog-on-call-team" integration_id="sentry" alt="Sentry" title="Sentry" style="catalog" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-slack" integration_id="slack" alt="Slack" title="Slack" style="catalog" >}}
  {{< image-card href="/integrations/sumo-logic/#trigger-on-call-pages" integration_id="sumo-logic" alt="Sumo Logic" title="Sumo Logic" style="catalog" >}}
  {{< image-card href="/integrations/zabbix/#trigger-on-call-pages" integration_id="zabbix" alt="Zabbix" title="Zabbix" style="catalog" >}}
{{< /card-grid >}}

## Integraciones en Preview {#preview-integrations}

Las siguientes integraciones están disponibles en [Preview](https://www.datadoghq.com/product-preview/on-call-integrations/). Seleccione un mosaico para solicitar acceso.

<!-- Tiles below use `integration_id` so the logo renders the same way as a published integration tile. For vendors without a published logo, integration_id falls back to a matching static/images/integrations_logos/<id>.svg — un avatar de marcador de posición generado (iniciales en el color de marca del proveedor). -->

{{< card-grid >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="bigpanda" alt="BigPanda" title="BigPanda" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="checkly" alt="Checkly" title="Checkly" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="chronosphere" alt="Chronosphere" title="Chronosphere" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="coralogix" alt="Coralogix" title="Coralogix" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="dynatrace-mcp" alt="Dynatrace" title="Dynatrace" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="grafana-mcp" alt="Grafana" title="Grafana" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="jenkins" alt="Jenkins" title="Jenkins" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="jira" alt="Jira" title="Jira" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="logicmonitor" alt="LogicMonitor" title="LogicMonitor" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="nodeping" alt="NodePing" title="NodePing" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="prtg-paessler" alt="PRTG (Paessler)" title="PRTG (Paessler)" style="catalog" >}}
  {{< image-card href="/incident_response/on-call/integrations/servicenow/" integration_id="servicenow" alt="ServiceNow" title="ServiceNow" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="site24x7" alt="Site24x7" title="Site24x7" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="splunk-mcp" alt="Splunk" title="Splunk" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="statuscake" alt="StatusCake" title="StatusCake" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptime" alt="uptime.com" title="uptime.com" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptimerobot" alt="UptimeRobot" title="UptimeRobot" style="catalog" >}}
{{< /card-grid >}}

## Integración de webhook genérico {#generic-webhook-integration}

Si su herramienta no aparece en la lista, utilice la [Datadog Events API][2] para activar On-Call Pages desde cualquier fuente que pueda realizar una solicitud HTTP.

Publique un evento con los siguientes parámetros:

| Parámetro | Valor |
|-----------|-------|
| <code style="white-space: nowrap;">aggregation_key</code> | Un identificador único definido por el usuario para la alerta. Datadog utiliza este valor para la deduplicación: si el `aggregation_key` de una alerta entrante coincide con una Page ya activada, Datadog no crea otra Page. Datadog también utiliza este valor para vincular un evento de recuperación a su Page abierta. |
| <code style="white-space: nowrap;">category</code> | El tipo de evento. Establezca en `alert` para activar una Page. |
| <code style="white-space: nowrap;">text</code> | El cuerpo del mensaje de alerta. Incluya `@oncall-<TEAM_HANDLE>` para dirigir la Page al On-Call Team correcto. |
| <code style="white-space: nowrap;">title</code> | Un resumen breve de la alerta. Se muestra como el título de la Page. |

La mención `@oncall-<TEAM_HANDLE>` en `text` determina qué On-Call Team recibe la Page. Reemplace `<TEAM_HANDLE>` con el identificador de su equipo tal como está configurado en Datadog.

{{% collapse-content title="Ejemplo: cuerpo de la solicitud" level="h4" %}}

```json
{
  "data": {
    "attributes": {
      "aggregation_key": "alert_unique_identifier",
      "attributes": {
        "priority": "1",
        "status": "error"
      },
      "category": "alert",
      "message": "@oncall-database Something is broken!",
      "title": "High memory usage"
    },
    "type": "event"
  }
}
```

{{% /collapse-content %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/on-call/pages/#trigger-a-page
[2]: https://docs.datadoghq.com/es/api/latest/events/post-an-event/