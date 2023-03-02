---
kind: documentation
title: Métriques d'estimation d'utilisation
---

## Présentation

Datadog calcule quasiment en temps réel une estimation de votre utilisation actuelle. Grâce aux métriques d'estimation de l'utilisation, vous pouvez :

* Représenter graphiquement l'estimation de votre utilisation
* Créer des monitors sur l'estimation de votre utilisation, en fonction des seuils de votre choix
* Obtenir des alertes en cas de pics ou de chutes d'utilisation
* Évaluer quasiment en temps réel l'impact potentiel des modifications de code sur votre utilisation

**Remarque** : ces métriques d'utilisation constituent des estimations qui ne correspondent pas toujours à l'utilisation facturable, puisqu'elles sont fournies quasiment en temps réel. En moyenne, une différence de 10 à 20 % est constatée entre l'utilisation estimée et l'utilisation facturable. En raison du mode de calcul de ces estimations, la marge d'erreur est plus importante pour une utilisation peu intense. 

{{< img src="account_management/billing/usage-metrics-01.png" alt="Exemple de dashboard" >}}

## Types d'utilisation

Les métriques d'estimation de l'utilisation sont généralement disponibles pour les types d'utilisation suivants :

| Type d'utilisation                    | Métrique                                   |
|-------------------------------|------------------------------------------|
| Hosts d'infrastructure          | `datadog.estimated_usage.hosts`          |
| Conteneurs                    | `datadog.estimated_usage.containers`     |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` |
| Métriques custom ingérées       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` |
| Octets de log ingérés           | `datadog.estimated_usage.logs.ingested_bytes`    |
| Événements de log ingérés          | `datadog.estimated_usage.logs.ingested_events`   |
| Logs analysés (sécurité)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes`   |
| Hosts d'APM                     | `datadog.estimated_usage.apm_hosts` (n'inclut pas les hosts d'Azure App Service)      |
| Spans indexées de l'APM             | `datadog.estimated_usage.apm.indexed_spans` |
| Octets ingérés de l'APM            | `datadog.estimated_usage.apm.ingested_bytes` |
| Spans ingérées de l'APM            | `datadog.estimated_usage.apm.ingested_spans` |
| RUM Sessions                  | `datadog.estimated_usage.rum.sessions`  |
| Fonctions Lambda sans serveur   | `datadog.estimated_usage.serverless.aws_lambda_functions` |
| Serverless Invocations        | `datadog.estimated_usage.serverless.invocations`|
| Exécutions de test API                 | `datadog.estimated_usage.synthetics.api_test_runs` |
| Exécutions de test Browser             | `datadog.estimated_usage.synthetics.browser_test_runs`|
| Network Hosts                 | `datadog.estimated_usage.network.hosts` |
| Network Devices               | `datadog.estimated_usage.network.devices` |
| Profiled Hosts                | `datadog.estimated_usage.profiling.hosts` |
| Profiled Containers           | `datadog.estimated_usage.profiling.containers` |
| Hosts CSPM                    | `datadog.estimated_usage.cspm.hosts` |
| Conteneurs CSPM               | `datadog.estimated_usage.cspm.containers` |
| Hosts CWS                     | `datadog.estimated_usage.cws.hosts` |
| Conteneurs CWS                | `datadog.estimated_usage.cws.containers` | 
| Hosts de base de données                | `datadog.estimated_usage.dbm.hosts` |
| Hosts ASM                     | `datadog.estimated_usage.asm.hosts` |
| Incident Management (utilisateurs actifs)   | `datadog.estimated_usage.incident_management.active_users` |
| CI Visibility                 | `datadog.estimated_usage.ci_visibility.pipeline.committers`, `datadog.estimated_usage.ci_visibility.test.committers` |


{{< img src="account_management/billing/usage-metrics-02.png" alt="Noms des métriques" >}}

## Utilisation pour plusieurs organisations

Pour les comptes disposant de plusieurs organisations, vous pouvez combiner l'estimation de l'utilisation des organisations enfant à l'aide du champ `from`. Cela vous permet de surveiller l'ensemble de l'utilisation de votre compte.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Utilisation multi-organisations" >}}

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][1].

Pour toute question concernant la facturation, contactez votre [chargé de compte][2].

[1]: /fr/help/
[2]: mailto:success@datadoghq.com