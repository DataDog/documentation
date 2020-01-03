---
title: Métriques d'estimation d'utilisation
kind: faq
---
## Présentation

Datadog calcule quasiment en temps réel une estimation de votre utilisation actuelle. Grâce aux métriques d'estimation de l'utilisation, vous pouvez :

* Représenter graphiquement l'estimation de votre utilisation
* Créer des monitors sur l'estimation de votre utilisation, en fonction des seuils de votre choix
* Obtenir des alertes en cas de pics ou de chutes d'utilisation
* Évaluer quasiment en temps réel l'impact potentiel des modifications de code sur votre utilisation

**Remarque** : ces métriques d'utilisation sont des estimations qui ne correspondront pas toujours à l'utilisation facturable, en raison de leur publication en quasi temps réel. En moyenne, une différence de 10 à 20 % peut être notée entre l'utilisation estimée et l'utilisation facturable.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Exemple de dashboard" >}}

### Types d'utilisation

Les métriques d'estimation de l'utilisation sont généralement disponibles pour les types d'utilisation suivants :

| Type d'utilisation         | Métrique                                                                                              |
|--------------------|-----------------------------------------------------------------------------------------------------|
| Hosts d'infrastructure       | `datadog.estimated_usage.hosts`                                                                     |
| Conteneurs         | `datadog.estimated_usage.containers`                                                                |
| Métriques custom     | `datadog.estimated_usage.metrics.custom`                                                            |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Noms des métriques" >}}


### Utilisation multi-organisations

Pour les comptes disposant de plusieurs organisations, vous pouvez combiner l'estimation de l'utilisation des organisations enfant à l'aide du champ `from`. Cela vous permet de surveiller l'ensemble de l'utilisation de votre compte.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Utilisation multi-organisations" >}}

## Dépannage
Pour toute question technique, contactez [l'assistance Datadog][1].

Pour toute question concernant la facturation, contactez votre [chargé de compte][2].

[1]: /fr/help
[2]: mailto:success@datadoghq.com