---
description: 'Fin de prise en charge de l''ingestion des incidents et des rapports
  d''incidents dans DORA Metrics : calendrier, personnes concernées et procédure de
  migration de vos rapports d''incidents.'
further_reading:
- link: /delivery_performance/dora_metrics/change_failure_detection/
  tag: Documentation
  text: En savoir plus sur la détection des échecs de changement
- link: /incident_response/incident_management/analytics_and_reporting/
  tag: Documentation
  text: Créez des rapports d'incidents avec Incident Management Analytics
- link: /delivery_performance/dora_metrics/
  tag: Documentation
  text: En savoir plus sur DORA Metrics
private: true
title: Fin de prise en charge de l'ingestion des incidents et des rapports d'incidents
  dans DORA Metrics
---
À partir du **2026-12-31**, DORA Metrics n'ingérera ni n'affichera plus de données d'incident et, à partir du **2027-03-31**, les incidents stockés dans DORA Metrics ne seront plus accessibles. Cela affecte les éléments suivants :

- Les vues d'incident dans DORA Metrics
- Les API d'incidents DORA
- Les sources de données PagerDuty et Datadog Incidents dans les [paramètres de DORA Metrics][1]
- Tout dashboard, notebook ou requête enregistrée qui utilise des données d'incident DORA

Cela n'affecte pas le calcul des métriques Change Failure Rate et Failed Deployment Recovery Time, car elles utilisent [Change Failure Detection][2], et non les événements d'incident.

Si vous avez des incidents et un historique des incidents dans [Datadog Incident Management][3], ils ne sont pas non plus affectés. Vous pouvez les déclarer, les gérer et créer des rapports à leur sujet indépendamment de DORA Metrics.

## Actions par source de données {#actions-by-data-source}

Les actions à entreprendre dépendent du fait que votre organisation envoie ou consulte des données d'incident dans DORA Metrics par l'un des moyens suivants :

- La source de données **Datadog Incidents** dans les paramètres de DORA Metrics
- La source de données **PagerDuty** dans les paramètres de DORA Metrics
- L'**API d'incidents DORA** (`POST /api/v2/dora/incident`)

### Source de données Datadog Incidents {#datadog-incidents-data-source}

Les incidents provenant de la source de données **Datadog Incidents** dans les paramètres de DORA Metrics sont stockés dans Datadog Incident Management, et non dans DORA Metrics. Votre historique d'incidents reste disponible dans Incident Management ; la date limite d'exportation du 2027-03-31 ne s'applique donc pas.

Si des dashboards, des notebooks ou des requêtes enregistrées font référence à des données d'incident DORA, mettez-les à jour pour utiliser [Incident Management Analytics][4] avant le 2026-12-31. Sinon, aucune action n'est requise.

### Source de données PagerDuty ou API d'incidents DORA {#pagerduty-data-source-or-dora-incident-api}

Les incidents provenant de la source de données **PagerDuty** dans les paramètres de DORA Metrics ou de l'**API d'incidents DORA** sont stockés dans DORA Metrics ; les deux dates s'appliquent donc. Pour conserver vos rapports et votre historique d'incidents :

1. Avant le 2026-12-31 :
   - Supprimez les appels vers l'endpoint d'ingestion d'incidents (`POST /api/v2/dora/incident`) et l'endpoint de suppression d'incidents.
   - Transférez la production continue de vos rapports d'incidents vers l'une des [alternatives](#alternatives-for-incident-reporting) pour éviter toute lacune dans vos données d'incident.
1. Avant le 2027-03-31 :
   - Exportez tout historique d'incidents que vous souhaitez conserver avec l'[API des événements d'incident][5], ou téléchargez les données de votre dashboard au format CSV.
   - Mettez à jour ou retirez les dashboards, notebooks ou requêtes enregistrées qui font référence à des données d'incident DORA.

## Alternatives pour les rapports d'incidents {#alternatives-for-incident-reporting}

| Source des incidents | Utilisez à la place |
| --- | --- |
| Datadog Incident Management | [Incident Management Analytics][4] |
| PagerDuty | L'[intégration Datadog PagerDuty][6], qui importe les événements déclenchés et résolus dans l'Events Explorer. Cette intégration est distincte de la source de données PagerDuty dans DORA Metrics. |
| Événements d'incident personnalisés envoyés via l'API | L'[API Datadog Events][7], pour envoyer des événements vers l'Events Explorer afin de les interroger et de créer des dashboards. Pour déclarer et gérer des incidents dans Datadog, utilisez [Datadog Incident Management][3]. |

<div class="alert alert-info">Ces alternatives permettent uniquement de produire des rapports d'incidents. Elles n'alimentent pas les métriques de stabilité DORA, qui utilisent <a href="/delivery_performance/dora_metrics/change_failure_detection/">Change Failure Detection</a>.</div>

## Calendrier {#timeline}

| Date | Modification |
| --- | --- |
| 2026-12-31 | DORA Metrics cesse d'accepter les incidents : <br>- Les API d'ingestion et de suppression d'incidents sont désactivées.<br>- La source de données PagerDuty dans DORA Metrics cesse de transférer les incidents.<br>- Les données Datadog Incidents ne sont plus affichées dans DORA Metrics.<br>Les incidents ingérés avant cette date restent disponibles pour consultation et exportation jusqu'au 2027-03-31. Datadog supprime les configurations d'incidents des [paramètres de DORA Metrics][1]. |
| 2027-03-31 | Les incidents précédemment envoyés via DORA Metrics ne peuvent être ni consultés ni exportés. |

## Obtenir de l'aide {#get-help}

Pour obtenir de l'aide concernant l'évaluation de l'impact ou la mise à jour de vos rapports d'incidents, contactez [Datadog Support][8].

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /fr/delivery_performance/dora_metrics/change_failure_detection/
[3]: /fr/incident_response/incident_management/
[4]: /fr/incident_response/incident_management/analytics_and_reporting/
[5]: /fr/api/latest/dora-metrics/get-a-list-of-incident-events/
[6]: /fr/integrations/pagerduty/
[7]: /fr/api/latest/events/post-an-event/
[8]: /fr/help/