---
title: Métriques d'estimation d'utilisation
kind: documentation
---
## Présentation

Datadog calcule quasiment en temps réel une estimation de votre utilisation actuelle. Grâce aux métriques d'estimation de l'utilisation, vous pouvez :

* Représenter graphiquement l'estimation de votre utilisation
* Créer des monitors sur l'estimation de votre utilisation, en fonction des seuils de votre choix
* Obtenir des alertes en cas de pics ou de chutes d'utilisation
* Évaluer quasiment en temps réel l'impact potentiel des modifications de code sur votre utilisation

**Remarque** : ces métriques d'utilisation sont des estimations qui ne correspondront pas toujours à l'utilisation facturable, en raison de leur publication en quasi temps réel. En moyenne, une différence de 10 à 20 % peut être notée entre l'utilisation estimée et l'utilisation facturable.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Exemple de dashboard" >}}

## Types d'utilisation

Les métriques d'estimation de l'utilisation sont généralement disponibles pour les types d'utilisation suivants :

| Type d'utilisation           | Métrique                                   |
|----------------------|------------------------------------------|
| Hosts d'infrastructure | `datadog.estimated_usage.hosts`          |
| Conteneurs           | `datadog.estimated_usage.containers`     |
| Métriques custom       | `datadog.estimated_usage.metrics.custom` |
| Octets de log ingérés  | `datadog.estimated_usage.logs.ingested_bytes`          |
| Événements de log ingérés | `datadog.estimated_usage.logs.ingested_events`   |
| Hosts d'APM            | `datadog.estimated_usage.apm_hosts`      |
| Spans indexées de l'APM   | `datadog.estimated_usage.logs.apm.indexed_spans` |
| Octets ingérés de l'APM   | `datadog.estimated_usage.logs.apm.ingested_bytes` |
| Spans ingérées de l'APM   | `datadog.estimated_usage.logs.apm.ingested_spans` |
| Fonctions Lambda sans serveur | `datadog.estimated_usage.serverless.aws_lambda_functions` |

Les métriques d'utilisation reposant sur des logs doivent être activées manuellement depuis la page [Generate Metrics][1].

{{< img src="account_management/billing/usage-metrics-02.png" alt="Noms des métriques" >}}

## Utilisation pour plusieurs organisations

Pour les comptes disposant de plusieurs organisations, vous pouvez combiner l'estimation de l'utilisation des organisations enfant à l'aide du champ `from`. Cela vous permet de surveiller l'ensemble de l'utilisation de votre compte.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Utilisation multi-organisations" >}}

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][2].

Pour toute question concernant la facturation, contactez votre [chargé de compte][3].

[1]: /fr/logs/logs_to_metrics/#recommended-usage-metrics
[2]: /fr/help/
[3]: mailto:success@datadoghq.com