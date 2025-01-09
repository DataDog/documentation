---
title: Métriques d'estimation d'utilisation
---

## Présentation

Datadog calcule quasiment en temps réel une estimation de votre utilisation actuelle. Grâce aux métriques d'estimation de l'utilisation, vous pouvez :

* Représenter graphiquement l'estimation de votre utilisation
* Créer des [monitors][3] sur l'estimation de votre utilisation, en fonction des seuils de votre choix
* Envoyer des [alertes de monitor][4] en cas de pics ou de chutes d'utilisation
* Évaluer quasiment en temps réel l'impact potentiel des modifications de code sur votre utilisation

**Remarque** : ces métriques d'utilisation constituent des estimations qui ne correspondent pas toujours à l'utilisation facturable, puisqu'elles sont fournies quasiment en temps réel. En moyenne, une différence de 10 à 20 % est constatée entre l'utilisation estimée et l'utilisation facturable. En raison du mode de calcul de ces estimations, la marge d'erreur est plus importante pour une utilisation peu intense. 

{{< img src="account_management/billing/usage-metrics-01.png" alt="Exemple de dashboard" >}}

## Types d'utilisation

Les métriques d'estimation de l'utilisation sont généralement disponibles pour les types d'utilisation suivants :

| Type d'utilisation                    | Métrique                                   | Description |
|-------------------------------|------------------------------------------| ----------- |
| Hosts d'infrastructure          | `datadog.estimated_usage.hosts`          | Hosts uniques détectés individuellement au cours de l'heure précédente. |
| Conteneurs                    | `datadog.estimated_usage.containers`     | Conteneurs uniques détectés lors de l'heure précédente. |
| Tâches Fargate                 | `datadog.estimated_usage.fargate_tasks`  | Tâches Fargate uniques détectées lors des cinq dernières minutes. |
| Métriques custom indexées        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` | Métriques custom indexées uniques détectées lors de l'heure précédente. |
| Métriques custom ingérées       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` | Métriques custom ingérées uniques détectées lors de la dernière heure. |
| Octets de log ingérés           | `datadog.estimated_usage.logs.ingested_bytes` | Total des logs ingérés en octets. |
| Événements de log ingérés          | `datadog.estimated_usage.logs.ingested_events` | Nombre total d'événements ingérés, y compris les logs exclus. |
| Nombre de logs ignorés               | `datadog.estimated_usage.logs.drop_count` | Nombre total d'événements ignorés lors de l'ingestion. |
| Nombre de logs tronqués          | `datadog.estimated_usage.logs.truncated_count` | Nombre total d'événements tronqués lors de l'ingestion. |
| Octets de logs tronqués          | `datadog.estimated_usage.logs.truncated_bytes` | Volume d'événements tronqués en octets. |
| Logs analysés (sécurité)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Volume total d'ingestion des logs Clouds SIEM en octets. |
| Hosts APM                     | `datadog.estimated_usage.apm_hosts` | Hosts APM uniques détectés lors de l'heure précédente. N'inclut pas les hosts Azure App Services.  |
| Spans indexées APM             | `datadog.estimated_usage.apm.indexed_spans` | Nombre total de spans indexées. |
| Octets ingérés APM            | `datadog.estimated_usage.apm.ingested_bytes` | Volume de spans ingérées en octets. |
| Spans ingérées APM            | `datadog.estimated_usage.apm.ingested_spans` | Nombre total de spans ingérées. |
| Tâches Fargate APM             | `datadog.estimated_usage.apm.fargate_tasks` | Tâches Fargate APM uniques détectées lors des cinq dernières minutes. |
| Sessions RUM                  | `datadog.estimated_usage.rum.sessions` | Nombre total de sessions RUM. |
| Fonctions Lambda sans serveur   | `datadog.estimated_usage.serverless.aws_lambda_functions` | Fonctions sans serveur uniques détectées lors de l'heure précédente. |
| Invocations sans serveur        | `datadog.estimated_usage.serverless.invocations`| Somme des invocations sans serveur lors de l'heure précédente. |
| Exécutions de test API                 | `datadog.estimated_usage.synthetics.api_test_runs` | Utilisation estimée des tests API. |
| Exécutions de test Browser             | `datadog.estimated_usage.synthetics.browser_test_runs`| Utilisation estimée des tests Browser. |
| Slots de tests parallèles        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Utilisation estimée des slots de tests parallèles. |
| Hosts réseau                 | `datadog.estimated_usage.network.hosts` | Hosts NPM uniques détectés lors de l'heure précédente. |
| Périphériques réseau               | `datadog.estimated_usage.network.devices` | Périphériques NDM uniques détectés lors de l'heure précédente. |
| Hosts profilés                | `datadog.estimated_usage.profiling.hosts` | Hosts de profiling uniques détectés lors de l'heure précédente. |
| Conteneurs profilés           | `datadog.estimated_usage.profiling.containers` | Conteneurs de profiling uniques détectés lors des cinq dernières minutes. |
| Tâches Fargate du profileur        | `datadog.estimated_usage.profiling.fargate_tasks` | Tâches Fargate de profiling uniques détectés lors des cinq dernières minutes. |
| Hosts CSPM                    | `datadog.estimated_usage.cspm.hosts` | Hosts CSPM uniques détectés lors de l'heure précédente. |
| Conteneurs CSPM               | `datadog.estimated_usage.cspm.containers` | Conteneurs CSPM uniques détectés lors des cinq dernières minutes. |
| Hosts CWS                     | `datadog.estimated_usage.cws.hosts` | Hosts CWS uniques détectés lors de l'heure précédente. |
| Conteneurs CWS                | `datadog.estimated_usage.cws.containers` | Conteneurs CWS uniques détectés lors des cinq dernières minutes. |
| Hosts de base de données                | `datadog.estimated_usage.dbm.hosts` | Hosts Database Monitoring uniques détectés lors de l'heure précédente. |
| Hosts ASM                     | `datadog.estimated_usage.asm.hosts` | Hosts ASM uniques détectés lors de l'heure précédente. |
| Tâches ASM                     | `datadog.estimated_usage.asm.tasks` | Tâches Fargate ASM uniques détectées lors des cinq dernières minutes. |
| Incident Management (utilisateurs actifs)   | `datadog.estimated_usage.incident_management.active_users` | Utilisateurs Incident Management actifs détectés durant le mois (calendaire) en cours. |
| Responsables de commit de pipeline CI Visibility | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Responsables de commit de pipeline détectés durant le mois (calendaire) en cours. |
| Responsables de commit de test CI Visibility | `datadog.estimated_usage.ci_visibility.test.committers` | Responsables de commit de test détectés durant le mois (calendaire) en cours. |
| Appareils IoT                   | `datadog.estimated_usage.iot.devices` | Appareils IoT uniques détectés lors de l'heure précédente. |
| Octets ingérés par les pipelines d'observabilité | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volume de données ingérées par les pipelines d'observabilité. |


{{< img src="account_management/billing/usage-metrics-02.png" alt="Noms des métriques" >}}

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