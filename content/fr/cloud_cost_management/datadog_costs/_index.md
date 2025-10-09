---
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: En savoir plus Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentation
  text: Mieux comprendre votre facture AWS
- link: /cloud_cost_management/setup/azure
  tag: Documentation
  text: Mieux comprendre votre facture Azure
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentation
  text: Mieux comprendre votre facture Google Cloud
- link: /cloud_cost_management/setup/oracle
  tag: Documentation
  text: Mieux comprendre votre facture Oracle
- link: /cloud_cost_management/setup/saas_costs
  tag: Documentation
  text: En savoir plus sur les intégrations de coûts du SaaS
- link: /cloud_cost_management/setup/custom
  tag: Documentation
  text: Mieux comprendre vos coûts de personnalisation
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analysez rapidement et de façon exhaustive les coûts cloud et SaaS associés
    à vos services
- link: https://www.datadoghq.com/blog/datadog-costs/
  tag: Blog
  text: Comprendre et gérer vos dépenses Datadog grâce aux données de coûts Datadog
    dans Cloud Cost Management
title: Coûts Datadog
---

## Présentation

Les coûts quotidiens Datadog vous donnent de la visibilité sur les dépenses quotidiennes Datadog dans les dashboards, notebooks, [monitors de coût][1] et Cloud Cost Explorer, ainsi que sur l'ensemble des coûts liés au cloud et au [SaaS][2] de votre organisation.

Vous pouvez consulter les coûts quotidiens Datadog dans [Cloud Cost Management][3] (CCM), et accéder à des fonctionnalités supplémentaires liées aux coûts Datadog comme le [résumé des coûts][5] et la [refacturation des coûts][6] depuis la [page **Plan & Usage**][7].

Il n'y a **aucun coût supplémentaire** pour Datadog Costs, et cette fonctionnalité est disponible aussi bien pour les clients CCM que pour les clients non-CCM disposant d'un contrat direct avec Datadog ou d'un contrat de consommation via une Marketplace externe.

## Autorisations requises

Datadog Costs nécessite des autorisations différentes selon que vous activez la fonctionnalité ou que vous consultez les données :

### Pour activer Datadog Costs (opt-in)
Pour activer Datadog Costs pour votre organisation, vous devez disposer des autorisations suivantes :

| Autorisation | Rôle | Rôles disponibles |
|------------|-------------|-----------------|
| `billing_read` | Accès en lecture aux informations de facturation. | • Admin Datadog |
| `usage_read` | Accès en lecture aux données d'utilisation. | • Admin Datadog |
| `cloud_cost_management_read` | Accès en lecture à Cloud Cost Management. | • Admin Datadog<br>- Read-Only Datadog (par défaut) |

### Pour consulter Datadog Costs dans Cloud Cost Management
Après l'activation de Datadog Costs, les utilisateurs doivent disposer des autorisations suivantes pour consulter les données :

| Autorisation | Rôle | Rôles disponibles |
|------------|-------------|-----------------|
| `cloud_cost_management_read` | Accès en lecture à Cloud Cost Management. **Nécessaire pour visualiser les données de Datadog Costs dans Cloud Cost Management.** | • Admin Datadog<br>- Read-Only Datadog (par défaut) |

## Activer Datadog Costs

Pour activer Datadog Costs, accédez à la [page **Plan & Usage**][7] et cliquez sur **Get Started** dans la fenêtre contextuelle "View Datadog Costs in Cloud Cost Management". Vous pouvez également contacter votre représentant de compte ou [l'assistance Datadog][8].

Après avoir activé Datadog Costs, un message de confirmation s'affiche et les données de coûts commencent à apparaître dans le CCM Explorer sous 2 à 3 heures.

## Disponibilité des données pour les sous-organisations

Les données des coûts de Datadog sont disponibles au niveau de l'organisation parent. L'accès aux sous-organisations est disponible de façon limitée. Pour demander un accès aux sous-organisations, contactez votre représentant de compte ou [l'assistance Datadog][8].

## Visualiser et analyser les coûts

Les coûts dans Cloud Cost Management peuvent différer des coûts estimés du mois en cours (MTD) affichés sur la [page **Plan & Usage**][7], car les coûts de Plan & Usage sont cumulatifs et calculés au prorata mensuel. Seul Cloud Cost Management fournit des calculs de coûts quotidiens.

Les données sur les coûts de Datadog sont disponibles pour les 15 derniers mois et peuvent être utilisées dans les dashboards et notebooks via la source de données **Cloud Cost**. Créez des dashboards pour suivre les coûts quotidiens, identifier les tendances et optimiser l'utilisation des ressources.

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="Coûts Datadog comme option de la source de données Cloud Cost dans un dashboard" style="width:100%;" >}}

Vous pouvez utiliser des tags prêts à l'emploi pour analyser et répartir vos données sur les coûts de Datadog.

| Nom du tag | Description de tag |
|---|---|
| organization | Le nom de l'organisation mère ou de la sous-organisation. |
| dimension_name/dimension | `dimension_name` est le nom du produit facturé individuellement (par exemple, `Indexed Logs (15 Day Retention)`). </br></br> `dimension` est la version en snake case du nom du produit, optimisée pour une utilisation programmatique et une recherche plus simple (par exemple, `logs_indexed_15day`). |
| product_name/datadog_product | `product_name` est le nom de regroupement de haut niveau des produits Datadog (par exemple, `Logs`). </br></br> `datadog_product` est la version en snake case du nom de regroupement, optimisée pour une utilisation programmatique et une recherche plus simple (par exemple, `logs`). |
| `<Usage Attribution tags>` | Vous pouvez ajouter jusqu'à trois clés de tags, configurées dans [l'attribution de l'utilisation][9], avec leurs valeurs associées (par exemple, `team` ou `service`). |
| cost_type | Le type de frais couverts par ce poste (par exemple, `usage` ou `adjustment`). |
| pricing_category | Le type spécifique de frais couverts par ce poste (par exemple, `committed` ou `on-demand`). |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/monitors
[2]: /fr/cloud_cost_management/setup/saas_costs
[3]: /fr/cloud_cost_management/
[4]: /fr/account_management/plan_and_usage/cost_details/
[5]: /fr/account_management/plan_and_usage/cost_details/#cost-summary
[6]: /fr/account_management/plan_and_usage/cost_details/#cost-chargebacks
[7]: https://app.datadoghq.com/billing/usage
[8]: /fr/help/
[9]: /fr/account_management/billing/usage_attribution/