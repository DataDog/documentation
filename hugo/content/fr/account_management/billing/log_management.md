---
title: Facturation du service Log Management
---
## Tarification

À la fin du mois, Datadog calcule le nombre total d'événements de log indexés :

- Si le nombre total est inférieur à la limite de votre engagement, votre facture reste la même.
- Si vous dépassez votre quota, le prix de l'engagement est soustrait et le service est alors facturé **à la demande** avec une majoration de 50 %.

### À la demande

Avec Log management de Datadog, vous définissez un engagement mensuel pour les événements de log indexés. Toutefois, pendant les périodes difficiles, le nombre de logs peut augmenter et dépasser votre quota maximum. Comme il est essentiel de conserver une visibilité optimale sur la santé de votre infrastructure, vous n'êtes pas limité à votre engagement mensuel.

Les engagements sont mensuels : si vous générez des logs en grande quantité pendant un jour, cela n'entraînera pas de consommation excessive si le nombre moyen de logs par jour se rapproche du nombre prévu dans votre engagement.

## Suivi des événements de logs

Le nombre d'événements de log que vous avez envoyés à Datadog est visible à plusieurs endroits.

1. La [page Usage][1] affiche le nombre pour le mois en cours ainsi qu'un graphique intitulé `Indexed Logs`, qui représente le nombre d'événements de log indexés par heure :

2. Sur la page [Configuration][2], cliquez deux fois sur un index pour afficher le nombre d'événements de log indexés au cours des derniers jours.

    {{< img src="account_management/billing/log-events02.png" alt="Événements de log" >}}

3. Dans [Log Explorer][3], modifiez l'intervalle de temps et vérifiez le nombre total en haut de la liste :

    {{< img src="account_management/billing/log-events03.png" alt="Événements de log" >}}

Vous pouvez également utiliser les facettes pour filtrer le nombre de logs par attribut ou tag défini par vos événements de log. Cela vous permet d'identifier le host, le service, l'endpoint, etc. qui a généré le plus de données.

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][4].

Pour toute question concernant la facturation, contactez votre [chargé de compte][5].

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://app.datadoghq.com/logs/pipelines
[3]: https://app.datadoghq.com/logs
[4]: /fr/help/
[5]: mailto:success@datadoghq.com