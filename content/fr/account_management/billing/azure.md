---
title: Facturation des intégrations Azure
---
## Présentation

Datadog facture chaque [machine virtuelle Azure surveillée dans Datadog][1], que l'Agent Datadog y soit installé ou non. Vous n'êtes pas facturé en double si vous exécutez l'Agent sur une machine virtuelle Azure reconnue par l'intégration Azure.

En outre, les nœuds associés à vos plans Azure App Service sont également considérés comme des hosts facturables par Datadog. **Remarque** : les plans App Service Partage, Dynamique et Gratuit n'incluent pas de nœuds et n'ont donc aucune incidence sur votre facturation Datadog.
L'intégration Azure recueille des métriques à partir de toutes les autres ressources Azure (Azure SQL DB, Azure Redis Cache, Azure Load Balancer, etc.) sans frais supplémentaires.

## Exclure des machines virtuelles Azure

Utilisez le carré d'intégration Datadog/Azure pour filtrer vos machines virtuelles surveillées par Datadog. Accédez à l'onglet Configuration et modifiez une Inscription d'application existante ou ajoutez-en une autre. Chaque filtre est contrôlé via l'option « Optionally limit metrics collection to hosts with tag: ».

Lorsque vous appliquez des limites à des locataires Azure existants depuis le carré d'intégration, les machines virtuelles précédemment identifiées peuvent rester dans la liste d'infrastructures jusqu'à 2 heures. Durant cette période de transition, les machines virtuelles affichent le statut `???`. Elles ne sont pas prises en compte dans votre facture.

Les machines virtuelles sur lesquelles un Agent est exécuté s'affichent toujours et sont prises en compte dans votre facture. L'application de limites concerne uniquement les machines virtuelles sur lesquelles aucun Agent n'est exécuté.

## Exclure des plans Azure App Service

Utilisez le carré d'intégration Datadog/Azure pour filtrer vos plans Azure App Service surveillés par Datadog. Accédez à l'onglet Configuration et modifiez une Inscription d'application existante ou ajoutez-en une autre. Le filtre est contrôlé via l'option « Optionally limit metrics collection to App Service Plans with tag: ».

**Remarque** : ce filtre s'applique aux métriques de l'ensemble des applications et fonctions incluses dans le plan App Service.

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][2].

Pour toute question concernant la facturation, contactez votre [chargé de compte][3].

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /fr/getting_started/tagging/using_tags/#integrations
[3]: /fr/infrastructure/