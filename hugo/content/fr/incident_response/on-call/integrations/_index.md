---
description: Déclenchez des pages d'astreinte Datadog à partir d'outils de surveillance,
  d'alerte et d'incident tiers en utilisant des intégrations natives ou un webhook
  générique.
further_reading:
- link: /incident_response/on-call/
  tag: Documentation
  text: Datadog On-Call
- link: /incident_response/on-call/pages/
  tag: Documentation
  text: Pages
- link: /incident_response/on-call/routing_rules/
  tag: Documentation
  text: Règles de routage
title: Intégrations On-Call
---
## Présentation {#overview}

Datadog On-Call prend en charge plusieurs sources de déclenchement au-delà des moniteurs Datadog natifs. Utilisez des outils de surveillance, d'alerte et de gestion des incidents tiers pour envoyer des Pages directement à vos équipes On-Call. Les alertes provenant de n'importe quelle partie de votre pile atteignent ensuite les bons intervenants grâce à vos politiques d'escalade configurées. Pour plus d'informations, consultez [Trigger a Page][1].

Chaque intégration native répertoriée sur cette page inclut des instructions de configuration sur sa propre tuile d'intégration. Ces instructions couvrent la manière de configurer l'outil tiers pour envoyer une Page. Elles couvrent également la manière de mapper ses alertes à une équipe On-Call Datadog. Si votre outil ne dispose pas d'une intégration native, utilisez plutôt l'intégration [webhook générique](#generic-webhook-integration).

## Intégrations disponibles {#available-integrations}

Datadog On-Call inclut une prise en charge native des Pages pour les outils suivants :

{{< card-grid >}}
  {{< image-card href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" integration_id="amazon-sns" alt="Amazon SNS" title="Amazon SNS" style="catalog" >}}
  {{< image-card href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" integration_id="azure-monitor" alt="Azure Monitor" title="Azure Monitor" style="catalog" >}}
  {{< image-card href="/integrations/bugsnag/#page-a-datadog-on-call-team" integration_id="bugsnag" alt="Bugsnag" title="Bugsnag" style="catalog" >}}
  {{< image-card href="/integrations/catchpoint/#trigger-on-call-pages" integration_id="catchpoint" alt="Catchpoint" title="Catchpoint" style="catalog" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-microsoft-teams" integration_id="microsoft-teams" alt="Microsoft Teams" title="Microsoft Teams" style="catalog" >}}
  {{< image-card href="/integrations/nagios/?tab=host#trigger-on-call-pages" integration_id="nagios" alt="Nagios" title="Nagios" style="catalog" >}}
  {{< image-card href="/integrations/new-relic/#trigger-on-call-pages" integration_id="new-relic" alt="New Relic" title="New Relic" style="catalog" >}}
  {{< image-card href="/integrations/pingdom-v3/#page-a-datadog-on-call-team" integration_id="pingdom-v3" alt="Pingdom" title="Pingdom" style="catalog" >}}
  {{< image-card href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" integration_id="prometheus" alt="Alertmanager Prometheus" title="Alertmanager Prometheus" style="catalog" >}}
  {{< image-card href="/integrations/sentry/#page-a-datadog-on-call-team" integration_id="sentry" alt="Sentry" title="Sentry" style="catalog" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-slack" integration_id="slack" alt="Slack" title="Slack" style="catalog" >}}
  {{< image-card href="/integrations/sumo-logic/#trigger-on-call-pages" integration_id="sumo-logic" alt="Sumo Logic" title="Sumo Logic" style="catalog" >}}
  {{< image-card href="/integrations/zabbix/#trigger-on-call-pages" integration_id="zabbix" alt="Zabbix" title="Zabbix" style="catalog" >}}
{{< /card-grid >}}

## Intégrations en préversion {#preview-integrations}

Les intégrations suivantes sont disponibles en [préversion](https://www.datadoghq.com/product-preview/on-call-integrations/). Sélectionnez une tuile pour demander l'accès.

<!-- Tiles below use `integration_id` so the logo renders the same way as a published integration tile. For vendors without a published logo, integration_id falls back to a matching static/images/integrations_logos/<id>.svg — un avatar fictif généré (initiales sur la couleur de la marque du fournisseur). -->

{{< card-grid >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="bigpanda" alt="BigPanda" title="BigPanda" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="checkly" alt="Checkly" title="Checkly" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="chronosphere" alt="Chronosphere" title="Chronosphere" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="coralogix" alt="Coralogix" title="Coralogix" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="cronitor" alt="Cronitor" title="Cronitor" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="dynatrace-mcp" alt="Dynatrace" title="Dynatrace" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="grafana-mcp" alt="Grafana" title="Grafana" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="jenkins" alt="Jenkins" title="Jenkins" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="jira" alt="Jira" title="Jira" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="logicmonitor" alt="LogicMonitor" title="LogicMonitor" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="nodeping" alt="NodePing" title="NodePing" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="prtg-paessler" alt="PRTG (Paessler)" title="PRTG (Paessler)" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="servicenow" alt="ServiceNow" title="ServiceNow" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="site24x7" alt="Site24x7" title="Site24x7" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="splunk-mcp" alt="Splunk" title="Splunk" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="statuscake" alt="StatusCake" title="StatusCake" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptime" alt="uptime.com" title="uptime.com" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptimerobot" alt="UptimeRobot" title="UptimeRobot" style="catalog" >}}
{{< /card-grid >}}

## Intégration de webhook générique {#generic-webhook-integration}

Si votre outil n'est pas répertorié, utilisez l'[API Datadog Events][2] pour déclencher des Pages On-Call à partir de n'importe quelle source capable d'effectuer une requête HTTP.

Publiez un événement avec les paramètres suivants :

| Paramètre | Valeur |
|-----------|-------|
| <code style="white-space: nowrap;">aggregation_key</code> | Un identifiant unique défini par l'utilisateur pour l'alerte. Datadog utilise cette valeur pour la déduplication : si le `aggregation_key` d'une alerte entrante correspond à une Page déjà déclenchée, Datadog ne crée pas de Page. Datadog utilise également cette valeur pour lier un événement de rétablissement à sa Page ouverte. |
| <code style="white-space: nowrap;">category</code> | Le type d'événement. Réglez sur `alert` pour déclencher une Page. |
| <code style="white-space: nowrap;">text</code> | Le corps du message d'alerte. Incluez `@oncall-<TEAM_HANDLE>` pour acheminer la Page vers l'équipe On-Call appropriée. |
| <code style="white-space: nowrap;">title</code> | Un bref résumé de l'alerte. Affiché comme titre de la Page. |

La mention `@oncall-<TEAM_HANDLE>` dans `text` détermine quelle équipe On-Call reçoit la Page. Remplacez `<TEAM_HANDLE>` par l'identifiant de votre équipe tel qu'il est configuré dans Datadog.

{{% collapse-content title="Exemple : Corps de la requête" level="h4" %}}

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

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/on-call/pages/#trigger-a-page
[2]: https://docs.datadoghq.com/fr/api/latest/events/post-an-event/