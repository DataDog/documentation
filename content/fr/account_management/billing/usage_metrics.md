---
title: Métriques d'estimation d'utilisation
---

<style>tbody code {word-break: break-word !important;}</style>

## Section Overview

Datadog calcule quasiment en temps réel une estimation de votre utilisation actuelle. Grâce aux métriques d'estimation de l'utilisation, vous pouvez :

* Représenter graphiquement l'estimation de votre utilisation
* Créez des [monitors][3] autour de votre utilisation estimée en fonction des seuils de votre choix.
* Recevoir des [alertes de monitor][4] en cas de pic ou de chute de votre utilisation
* Évaluer quasiment en temps réel l'impact potentiel des modifications de code sur votre utilisation

**Remarque** : ces métriques d'utilisation constituent des estimations qui ne correspondent pas toujours à l'utilisation facturable, puisqu'elles sont fournies quasiment en temps réel. En moyenne, une différence de 10 à 20 % est constatée entre l'utilisation estimée et l'utilisation facturable. En raison du mode de calcul de ces estimations, la marge d'erreur est plus importante pour une utilisation peu intense. 

{{< img src="account_management/billing/usage-metrics-01.png" alt="Exemple de dashboard" >}}

## Types d'utilisation

Les métriques d'estimation de l'utilisation sont généralement disponibles pour les types d'utilisation suivants :

| Type d'utilisation                    | Métrique                                   | Rôle |
|-------------------------------|------------------------------------------| ----------- |
| Hosts d'infrastructure          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | Hosts uniques observés au cours de la dernière heure. |
| Conteneurs                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | Containers uniques observés au cours de la dernière heure. |
| Tâches Fargate                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | Tâches Fargate uniques observées au cours des 5 dernières minutes.<br/><br/>**Remarque** : cette métrique suit l'utilisation de Fargate sur ECS et EKS.  |
| Métriques custom indexées        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | Métriques custom indexées uniques observées au cours de la dernière heure. |
| Métriques custom ingérées       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | Métriques custom ingérées uniques observées au cours de la dernière heure. |
| Octets de log ingérés           | `datadog.estimated_usage.logs.ingested_bytes` | Volume total d'ingestion de logs en octets. |
| Événements de log ingérés          | `datadog.estimated_usage.logs.ingested_events` | Nombre total d'événements ingérés, y compris les logs exclus. |
| Nombre de logs ignorés               | `datadog.estimated_usage.logs.drop_count` | Nombre total d'événements ignorés lors de l'ingestion. |
| Nombre de logs tronqués          | `datadog.estimated_usage.logs.truncated_count` | Nombre total d'événements tronqués à l'ingestion. |
| Logs tronqués en octets          | `datadog.estimated_usage.logs.truncated_bytes` | Volume d'événements tronqués en octets. |
| Événements de logs pour Error Tracking    | `datadog.estimated_usage.error_tracking.logs.events` | Volume de logs d'erreurs ingérés dans Error Tracking. |
| Logs analysés (sécurité)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Volume total de logs Cloud SIEM ingérés en octets. |
| Hosts APM                     | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | Hosts APM uniques observés au cours de la dernière heure. N'inclut pas les hosts Azure App Services. |
| Spans APM indexées             | `datadog.estimated_usage.apm.indexed_spans` | Nombre total de spans APM indexées par des filtres de rétention basés sur les tags. |
| Spans APM ingérées (octets)            | `datadog.estimated_usage.apm.ingested_bytes` | Volume de spans APM ingérées en octets. |
| Spans APM ingérées            | `datadog.estimated_usage.apm.ingested_spans` | Nombre total de spans ingérées. |
| Tâches Fargate APM             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | Tâches Fargate APM uniques observées au cours des 5 dernières minutes. |
| RUM Sessions                  | `datadog.estimated_usage.rum.sessions` | Nombre total de sessions RUM. |
| Fonctions Lambda sans serveur   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | Fonctions serverless uniques observées au cours de la dernière heure. |
| Serverless Invocations        | `datadog.estimated_usage.serverless.invocations`| Total des invocations serverless au cours de la dernière heure. |
| Exécutions de test API                 | `datadog.estimated_usage.synthetics.api_test_runs` | Utilisation estimée pour les tests d'API. |
| Exécutions de test Browser             | `datadog.estimated_usage.synthetics.browser_test_runs`| Utilisation estimée pour les tests de navigateur. |
| Slots de tests parallèles        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Utilisation estimée pour les slots de tests parallèles. |
| Network Hosts                 | `datadog.estimated_usage.network.hosts`, `datadog.estimated_usage.network.hosts.by_tag` | Hosts CNM uniques observés au cours de la dernière heure. |
| Network Devices               | `datadog.estimated_usage.network.devices`, `datadog.estimated_usage.network.devices.by_tag` | Périphériques NDM uniques observés au cours de la dernière heure. |
| Profiled Hosts                | `datadog.estimated_usage.profiling.hosts`, `datadog.estimated_usage.profiling.hosts.by_tag` | Hosts de profiling uniques observés au cours de la dernière heure. |
| Profiled Containers           | `datadog.estimated_usage.profiling.containers`, `datadog.estimated_usage.profiling.containers.by_tag` | Conteneurs de profiling uniques observés au cours des 5 dernières minutes.  |
| Tâches Fargate de profiling        | `datadog.estimated_usage.profiling.fargate_tasks`, `datadog.estimated_usage.profiling.fargate_tasks.by_tag` | Tâches Fargate de profiling uniques observées au cours des 5 dernières minutes. |
| Hosts CSPM                    | `datadog.estimated_usage.cspm.hosts`, `datadog.estimated_usage.cspm.hosts.by_tag` | Hosts CSPM uniques observés au cours de la dernière heure. |
| Conteneurs CSPM               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | CSPM uniques observés au cours des 5 dernières minutes. |
| Hosts CWS                     | `datadog.estimated_usage.cws.hosts`, `datadog.estimated_usage.cws.hosts.by_tag` | Hosts CWS uniques observés au cours de la dernière heure. |
| Conteneurs CWS                | `datadog.estimated_usage.cws.containers`, `datadog.estimated_usage.cws.containers.by_tag` | Conteneurs CWS uniques observés au cours des 5 dernières minutes. |
| Hosts de base de données                | `datadog.estimated_usage.dbm.hosts`, `datadog.estimated_usage.dbm.hosts.by_tag` | Hosts DBM uniques observés au cours de la dernière heure. |
| Hosts AAP                     | `datadog.estimated_usage.asm.hosts`, `datadog.estimated_usage.asm.hosts.by_tag` | Hosts AAP uniques observés au cours de la dernière heure. |
| Tâches AAP                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | Tâches AAP uniques observées au cours des 5 dernières minutes. |
| Contributeurs CI Visibility (pipelines) | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Contributeurs aux pipelines CI observés depuis le début du mois calendaire. |
| Contributeurs CI Visibility (tests) | `datadog.estimated_usage.ci_visibility.test.committers` | Contributeurs aux tests observés depuis le début du mois calendaire. |
| Périphériques IoT                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | Périphériques IoT uniques observés au cours de la dernière heure. |
| Volume de données ingérées par Observability Pipelines en octets | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volume de données ingérées par Observability Pipelines. |
| Événements personnalisés                   | `datadog.estimated_usage.events.custom_events` | Volume d'événements personnalisés soumis. |
| Événements ingérés                        | `datadog.estimated_usage.events.ingested_events` | Volume de données ingérées par les événements. |
| Contributeurs Code Security SAST | `datadog.estimated_usage.code_security.sast.committers` | Contributeurs SAST observés depuis le début du mois calendaire. |
| Contributeurs Code Security SCA  | `datadog.estimated_usage.code_security.sca.committers`  | Contributeurs SCA observés depuis le début du mois calendaire.  |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Noms des métriques" >}}

## Définir des tags pour vos métriques d'utilisation estimée by_tag
Pour définir des ventilations par tag dans vos métriques d'utilisation estimée by_tag, configurez les tags souhaités (comme team ou env) sur la page [Usage Attribution][6] (Si vous êtes sur une offre PRO, vous pouvez demander l'accès à cette fonctionnalité via votre [Customer Success Manager][2]). Les modifications prennent effet au prochain jour UTC.

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="Définir les tags EUM by_tag dans Usage Attribution" >}}

## Dashboards

Des dashboards d'estimation de l'utilisation sont disponibles par défaut, avec des requêtes utiles basées sur ces métriques. Vous pouvez cloner ces dashboards pour démarrer plus facilement avec les métriques d'utilisation. Pour les trouver, accédez aux [listes de dashboards préconfigurés][5] et recherchez « Estimated Usage ».

## Utilisation pour plusieurs organisations

Pour les comptes disposant de plusieurs organisations, vous pouvez combiner l'estimation de l'utilisation des organisations enfant à l'aide du champ `from`. Cela vous permet de surveiller l'ensemble de l'utilisation de votre compte.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Utilisation multi-organisations" >}}

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][1].

Pour toute question concernant la facturation, contactez votre [chargé de compte][2].

[1]: /fr/help/
[2]: mailto:success@datadoghq.com
[3]: /fr/monitors/types/metric/?tab=threshold
[4]: /fr/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /fr/account_management/billing/usage_attribution/