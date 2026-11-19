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
À compter du **2027-01-31**, DORA Metrics n'ingère plus de nouveaux incidents. Cela affecte les éléments suivants :

- La vue de suivi des incidents DORA, qui est supprimée
- Les API d'ingestion et de suppression des échecs et incidents DORA, qui sont désactivées et renvoient une erreur 4xx
- La source de données **PagerDuty** dans [DORA Metrics settings][1], qui cesse de transférer les incidents
- La source de données **Datadog Incidents** dans DORA Metrics settings, qui cesse d'importer de nouveaux incidents dans DORA Metrics

Datadog supprime également les configurations d'incident de [DORA Metrics settings][1].

Les incidents ingérés avant cette date restent disponibles dans les tableaux de bord personnalisés, et vous pouvez toujours les interroger avec les endpoints [list][5] et [get][9] de l'API DORA.

Cela n'affecte pas le calcul de Change Failure Rate et de Failed Deployment Recovery Time. Depuis janvier 2026, ces métriques utilisent [Change Failure Detection][2], et non les événements d'incident.

Si vous avez des incidents et un historique des incidents dans [Datadog Incident Management][3], ils ne sont pas non plus affectés. Vous pouvez les déclarer, les gérer et créer des rapports à leur sujet indépendamment de DORA Metrics.

## Actions par source de données {#actions-by-data-source}

Les actions à entreprendre dépendent du fait que votre organisation envoie ou consulte des données d'incident dans DORA Metrics par l'un des moyens suivants :

- La source de données **Datadog Incidents** dans les paramètres de DORA Metrics
- La source de données **PagerDuty** dans les paramètres de DORA Metrics
- La **DORA failure API** (`POST /api/v2/dora/failure`) ou la **DORA incident API** obsolète (`POST /api/v2/dora/incident`)

### Source de données Datadog Incidents {#datadog-incidents-data-source}

Les incidents provenant de la source de données **Datadog Incidents** dans les paramètres de DORA Metrics sont stockés dans Datadog Incident Management, et non dans DORA Metrics. Votre historique d'incidents reste disponible dans Incident Management.

Si des tableaux de bord, des notebooks ou des requêtes enregistrées font référence à la vue de suivi des incidents DORA, mettez-les à jour pour utiliser [Incident Management Analytics][4] avant le 2027-01-31. Sinon, aucune action n'est requise.

### Source de données PagerDuty ou API d'échec et d'incident DORA {#pagerduty-data-source-or-dora-failure-and-incident-apis}

Avant le 2027-01-31 :

1. Supprimez les appels aux endpoints suivants de vos scripts et pipelines CI/CD. Après cette date, ils seront désactivés et renverront une erreur 4xx.
   - `POST /api/v2/dora/failure` et `POST /api/v2/dora/incident`
   - `DELETE /api/v2/dora/failure/{failure_id}`
1. Transférez la production continue de vos rapports d'incidents vers l'une des [alternatives](#alternatives-for-incident-reporting) pour éviter toute lacune dans vos données d'incident.

Vous n'avez pas besoin d'exporter votre historique d'incidents. Les incidents ingérés avant cette date restent disponibles dans les tableaux de bord personnalisés et via les endpoints [list][5] et [get][9] de l'API DORA.

## Alternatives pour les rapports d'incidents {#alternatives-for-incident-reporting}

| Source des incidents | Utilisez à la place |
| --- | --- |
| Datadog Incident Management | [Incident Management Analytics][4] |
| PagerDuty | L'[intégration Datadog PagerDuty][6], qui importe les événements déclenchés et résolus dans l'Events Explorer. Cette intégration est distincte de la source de données PagerDuty dans DORA Metrics. |
| Événements d'incident personnalisés envoyés via l'API | L'[API Datadog Events][7], pour envoyer des événements vers l'Events Explorer afin de les interroger et de créer des dashboards. Pour déclarer et gérer des incidents dans Datadog, utilisez [Datadog Incident Management][3]. |

<div class="alert alert-info">Ces alternatives permettent uniquement de produire des rapports d'incidents. Elles n'alimentent pas les métriques de stabilité DORA, qui utilisent <a href="/delivery_performance/dora_metrics/change_failure_detection/">Change Failure Detection</a>.</div>

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
[9]: /fr/api/latest/dora-metrics/get-an-incident-event/