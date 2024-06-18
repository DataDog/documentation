---
title: Facturation des intégrations Azure
---

## Présentation

Datadog facture chaque [machine virtuelle Azure surveillée dans Datadog][1], que l'Agent Datadog y soit installé ou non. Vous n'êtes pas facturé en double si vous exécutez l'Agent sur une machine virtuelle Azure reconnue par l'intégration Azure. Datadog considère également les nœuds des plans Azure App Service comme des hosts facturables.

**Remarque** : les plans App Service partagés, dynamiques et gratuits n'ont pas de nœud associé et n'ont pas d'impact sur votre facture Datadog.

Lʼintégration Azure collecte des métriques pour toutes les autres ressources Azure (telles que Azure SQL DB, Azure Redis Cache, Azure Load Balancer, etc.) sans aucun impact sur votre facturation mensuelle. Pour obtenir une liste complète des métriques collectées, consultez la section [Métriques prises en charge avec Azure Monitor][6].

## Exclure des machines virtuelles Azure

Utilisez le carré d'intégration Datadog/Azure pour filtrer vos machines virtuelles surveillées par Datadog. Accédez à l'onglet Configuration et modifiez une Inscription d'application existante ou ajoutez-en une autre. Chaque filtre est contrôlé via l'option « Optionally limit metrics collection to hosts with tag: ».

Lorsque vous appliquez des limites à des locataires Azure existants depuis le carré d'intégration, les machines virtuelles précédemment identifiées peuvent rester dans la liste d'infrastructures jusqu'à 2 heures. Durant cette période de transition, les machines virtuelles affichent le statut `???`. Elles ne sont pas prises en compte dans votre facture.

Les machines virtuelles sur lesquelles un Agent est exécuté s'affichent toujours et sont prises en compte dans votre facture. L'application de limites concerne uniquement les machines virtuelles sur lesquelles aucun Agent n'est exécuté.

## Exclure des plans Azure App Service

Utilisez le carré d'intégration Datadog/Azure pour filtrer vos plans Azure App Service surveillés par Datadog. Accédez à l'onglet Configuration et modifiez une Inscription d'application existante ou ajoutez-en une autre. Le filtre est contrôlé via l'option « Optionally limit metrics collection to App Service Plans with tag: ».

**Remarque** : ce filtre s'applique aux métriques de l'ensemble des applications et fonctions incluses dans le plan App Service.

## Métriques custom App Insights

Si vous [activez la collecte de métriques custom][5], Datadog collecte toutes les métriques custom écrites sur toutes les instances dʼAzure App avec le contexte de lʼintégration. Ces métriques sont considérées comme des métriques custom dans Datadog et peuvent entraîner des frais supplémentaires. Consultez le [guide de facturation des métriques custom][4].

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][2].

Pour toute question concernant la facturation, contactez votre [chargé de compte][3].

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /fr/getting_started/tagging/using_tags/#integrations
[3]: /fr/infrastructure/
[4]: /fr/account_management/billing/custom_metrics/?tab=countrate
[5]: /fr/integrations/azure#configuration
[6]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported