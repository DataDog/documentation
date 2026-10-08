---
further_reading:
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#measuring-the-impact-of-our-optimizations
  tag: Blog
  text: 'Optimisation de Datadog à grande échelle : une observabilité économique chez
    Zendesk'
title: Métriques d'estimation d'utilisation
---
<style>tbody code {word-break: break-word !important;}</style>

## Présentation {#overview}

Datadog calcule votre utilisation estimée actuelle en quasi temps réel. Les métriques d'utilisation estimée vous permettent de :

* Tracez un graphique de votre utilisation estimée
* Créez des [monitors][3] autour de votre utilisation estimée en fonction de seuils de votre choix
* Recevez des [monitor alerts][4] en cas de pics ou de chutes de votre utilisation
* Évaluez l'impact potentiel des modifications de code sur votre utilisation en quasi temps réel

**Remarque** : Ces métriques d'utilisation sont des estimations qui ne correspondent pas toujours à l'utilisation facturable en raison de leur nature en temps réel. Il existe une différence moyenne de 10 à 20 % entre l'utilisation estimée et l'utilisation facturable. En raison de la nature des estimations, la marge d'erreur est plus importante pour une faible utilisation.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Exemple de Dashboard" >}}

## Types d'utilisation {#types-of-usage}

Les métriques d'estimation de l'utilisation sont généralement disponibles pour les types d'utilisation suivants :

| Type d'utilisation                    | Métrique                                   | Description |
|-------------------------------|------------------------------------------| ----------- |
| Infrastructure Hosts          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | Hosts uniques observés au cours de la dernière heure. |
| Containers                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | Conteneurs uniques observés au cours de la dernière heure. |
| Fargate Tasks                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | Tâches Fargate uniques observées au cours des 5 dernières minutes.<br/><br/>**Remarque** : Cette métrique suit l'utilisation d'ECS Fargate et d'EKS Fargate. |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | Custom Metrics indexées uniques observées au cours de la dernière heure. |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | Custom Metrics ingérées uniques observées au cours de la dernière heure. |
| (Aperçu) Indexed Custom Metric Points | `datadog.estimated_usage.metrics.points.indexed`, `datadog.estimated_usage.metrics.points.indexed.by_tag`, `datadog.estimated_usage.metrics.points.indexed.hourly` | Points indexés estimés pour les métriques personnalisées. |
| (Aperçu) Ingested Custom Metric Points | `datadog.estimated_usage.metrics.points.ingested`, `datadog.estimated_usage.metrics.points.ingested.hourly` | Points ingérés estimés pour les métriques personnalisées. |
| (Aperçu) Billable Metric Names | `datadog.estimated_usage.billable.metrics` | Nombre de noms de métriques avec plus de 100 points indexés, depuis le début du mois. S'applique aux organisations sur la [tarification par nom de métrique][7]. |
| (Aperçu) Billable Indexed Points | `datadog.estimated_usage.billable.points` | Somme des points indexés au-delà des 10 M de points inclus par nom de métrique, depuis le début du mois. S'applique aux organisations sur la [tarification par nom de métrique][7]. |
| (Aperçu) Ingested-to-Indexed Points Ratio | `datadog.estimated_usage.metrics.points.ratio` | Comparaison du nombre total de points ingérés par rapport au nombre total de points indexés. S'applique aux organisations sur la [tarification par nom de métrique][7]. |
| Logs Ingested Bytes           | `datadog.estimated_usage.logs.ingested_bytes` | Ingestion totale de logs en octets. |
| Logs Ingested Events          | `datadog.estimated_usage.logs.ingested_events` | Nombre total d'événements ingérés, y compris les logs exclus. |
| Logs Pipelines Bytes           | `datadog.estimated_usage.logs.pipelines.ingested_bytes` | Nombre de logs correspondant aux pipelines en octets. |
| Logs Pipelines Events          | `datadog.estimated_usage.logs.pipelines.ingested_events` | Nombre d'événements correspondant aux pipelines, y compris les logs exclus. |
| Logs Drop Count               | `datadog.estimated_usage.logs.drop_count` | Nombre total d'événements supprimés lors de l'ingestion. |
| Logs Truncated Count          | `datadog.estimated_usage.logs.truncated_count` | Nombre total d'événements tronqués lors de l'ingestion. |
| Logs Truncated Bytes          | `datadog.estimated_usage.logs.truncated_bytes` | Volume d'événements tronqués en octets. |
| Error Tracking Logs Events    | `datadog.estimated_usage.error_tracking.logs.events` | Volume de logs d'erreur ingérés dans Error Tracking. |
| Analyzed Logs (security)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Ingestion totale de logs Cloud SIEM en octets. |
| APM Hosts                     | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | Hosts APM uniques observés au cours de la dernière heure. N'inclut pas les hosts Azure App Services. |
| APM Indexed Spans             | `datadog.estimated_usage.apm.indexed_spans` | Nombre total de spans indexés par les filtres de rétention basés sur les tags. |
| APM Ingested Bytes            | `datadog.estimated_usage.apm.ingested_bytes` | Volume de spans ingérés en octets. |
| APM Ingested Spans            | `datadog.estimated_usage.apm.ingested_spans` | Nombre total de spans ingérés. |
| APM Fargate Tasks             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | Tâches Fargate APM uniques observées au cours des 5 dernières minutes. |
| RUM Sessions                  | `datadog.estimated_usage.rum.sessions` | Nombre total de sessions RUM. |
| RUM Ingested Sessions         | `datadog.estimated_usage.rum.ingested_sessions` | Nombre total de sessions RUM ingérées.<br /><br />**Remarque** : S'applique à RUM without Limits. |
| RUM Indexed Sessions          | `datadog.estimated_usage.rum.indexed_sessions` | Nombre total de sessions RUM indexées par les filtres de rétention.<br /><br />**Remarque** : S'applique à RUM without Limits. |
| Serverless Lambda Functions   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | Fonctions sans serveur uniques observées au cours de la dernière heure. |
| Serverless Invocations        | `datadog.estimated_usage.serverless.invocations`| Somme des invocations sans serveur au cours de la dernière heure. |
| API test runs                 | `datadog.estimated_usage.synthetics.api_test_runs` | Utilisation estimée pour les tests API. |
| Browser test runs             | `datadog.estimated_usage.synthetics.browser_test_runs`| Utilisation estimée pour les tests de navigateur. |
| Parallel Testing Slots        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Utilisation estimée pour les emplacements de test parallèle. |
| Network Hosts                 | `datadog.estimated_usage.network.hosts`, `datadog.estimated_usage.network.hosts.by_tag` | Hosts CNM uniques observés au cours de la dernière heure. |
| Network Devices               | `datadog.estimated_usage.network.devices`, `datadog.estimated_usage.network.devices.by_tag` | Périphériques NDM uniques observés au cours de la dernière heure. |
| Profiled Hosts                | `datadog.estimated_usage.profiling.hosts`, `datadog.estimated_usage.profiling.hosts.by_tag` | Hosts profilés uniques observés au cours de la dernière heure. |
| Profiled Containers           | `datadog.estimated_usage.profiling.containers`, `datadog.estimated_usage.profiling.containers.by_tag` | Conteneurs profilés uniques observés au cours des 5 dernières minutes. |
| Profiler Fargate Tasks        | `datadog.estimated_usage.profiling.fargate_tasks`, `datadog.estimated_usage.profiling.fargate_tasks.by_tag` | Tâches Fargate profilées uniques observées au cours des 5 dernières minutes. |
| CSPM Hosts                    | `datadog.estimated_usage.cspm.hosts`, `datadog.estimated_usage.cspm.hosts.by_tag` | Hosts CSPM uniques observés au cours de la dernière heure. |
| CSPM Containers               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | Conteneurs CSPM uniques observés au cours des 5 dernières minutes. |
| CWS Hosts                     | `datadog.estimated_usage.cws.hosts`, `datadog.estimated_usage.cws.hosts.by_tag` | Hosts CWS uniques observés au cours de la dernière heure. |
| CWS Containers                | `datadog.estimated_usage.cws.containers`, `datadog.estimated_usage.cws.containers.by_tag` | Conteneurs CWS uniques observés au cours des 5 dernières minutes. |
| Database Hosts                | `datadog.estimated_usage.dbm.hosts`, `datadog.estimated_usage.dbm.hosts.by_tag` | Hosts DBM uniques observés au cours de la dernière heure. |
| AAP Hosts                     | `datadog.estimated_usage.asm.hosts`, `datadog.estimated_usage.asm.hosts.by_tag` | Hosts AAP uniques observés au cours de la dernière heure. |
| AAP Tasks                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | Tâches Fargate AAP uniques observées au cours des 5 dernières minutes. |
| CI Visibility Pipeline Committers | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Contributeurs au pipeline observés depuis le début du mois (calendaire). |
| CI Visibility Test Committers | `datadog.estimated_usage.ci_visibility.test.committers` | Contributeurs aux tests observés depuis le début du mois (calendaire). |
| Code Coverage Committers | `datadog.estimated_usage.code_coverage.committers` | Contributeurs à la couverture de code observés depuis le début du mois (calendaire). |
| IOT devices                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | Appareils IoT uniques observés au cours de la dernière heure. |
| Observability Pipelines Ingested Bytes | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volume de données ingérées par Observability Pipelines. |
| Custom Events                 | `datadog.estimated_usage.events.custom_events` | Volume d'événements personnalisés soumis. |
| Events Ingested               | `datadog.estimated_usage.events.ingested_events` | Volume de données ingérées par les événements. |
| Code Security SAST Committers | `datadog.estimated_usage.code_security.sast.committers` | Contributeurs SAST observés depuis le début du mois (calendaire). |
| Code Security SCA Committers  | `datadog.estimated_usage.code_security.sca.committers`  | Contributeurs SCA observés depuis le début du mois (calendaire).  |
| Code Security SCA Hosts       | `datadog.estimated_usage.asm.vulnerability_oss_host`, `datadog.estimated_usage.asm.vulnerability_oss_host.by_tag` | Hosts SCA uniques observés au cours de la dernière heure. |
| Code Security Secret Scanning Committers  | `datadog.estimated_usage.code_security.secrets.committers`  | Contributeurs Secret Scanning observés depuis le début du mois (calendaire).  |
| Code Security IaC Committers  | `datadog.estimated_usage.code_security.iac.committers`  | Contributeurs à l'infrastructure en tant que code (IaC) observés depuis le début du mois (calendaire).  |
| Incident Management Seats  | `datadog.estimated_usage.incident_management.seats`  | Licences utilisateur pour Incident Management autonome.  |
| Incident Management Monthly Active Users  | `datadog.estimated_usage.incident_management.monthly_active_users`  | Utilisateurs actifs uniques d'Incident Management observés depuis le début du mois (calendaire) (facturation héritée). |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Noms des métriques" >}}

## Définition des tags pour vos métriques d'utilisation estimée by_tag {#setting-tags-for-your-by-tag-estimated-usage-metrics}
Pour définir des ventilations par tag dans vos métriques d'utilisation estimée by_tag, configurez les tags souhaités (tels que team ou env) sur la page [Usage Attribution][6] (si vous disposez d'un forfait PRO, vous pouvez demander l'accès à cette fonctionnalité auprès de votre [Customer Success Manager][2]). Les modifications prennent effet dès le prochain 00:00 UTC.

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="Configuration des tags EUM by_tag dans Usage Attribution" >}}

## Dashboards {#dashboards}

Des dashboards d'utilisation estimée prêts à l'emploi sont disponibles, offrant des requêtes utiles avec ces métriques. Vous pouvez cloner ces dashboards pour vous aider à démarrer avec les métriques d'utilisation. Pour trouver ces dashboards, accédez à [Dashboards preset lists][5] et recherchez « Estimated Usage ».

## Utilisation multi-organisation {#multi-org-usage}

Pour les comptes avec plusieurs organisations, vous pouvez agréger l'utilisation estimée des organisations enfants en utilisant le champ `from` pour surveiller l'ensemble de votre compte.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Multi-Org Usage" >}}

## Dépannage {#troubleshooting}

Pour des questions techniques, contactez [l'assistance Datadog][1].

Pour toute question concernant la facturation, contactez votre [chargé de compte][2].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: mailto:success@datadoghq.com
[3]: /fr/monitors/types/metric/?tab=threshold
[4]: /fr/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /fr/account_management/billing/usage_attribution/
[7]: /fr/account_management/billing/metric_name_pricing/