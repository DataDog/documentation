---
description: Découvrez comment utiliser l'interrogation de sources multiples pour
  analyser les coûts de plusieurs fournisseurs dans Cloud Cost Management.
further_reading:
- link: https://www.datadoghq.com/blog/focus-cost-data/
  tag: Blog
  text: Surveiller les coûts de vos différents clouds avec Cloud Cost Management et
    FOCUS (en anglais)
- link: /cloud_cost_management/
  tag: Documentation
  text: En savoir plus Cloud Cost Management
- link: /cloud_cost_management/container_cost_allocation
  tag: Documentation
  text: En savoir plus sur l'allocation des coûts liés aux conteneurs
is_beta: true
title: Interrogation de sources multiples
---

## Présentation

Après avoir configuré l'ingestion de vos coûts [AWS][1], [Azure][2], [Google Cloud][3], [Oracle][15], [SaaS][4], ou [Datadog][5] dans [Cloud Cost Management][6], vous pouvez interroger vos coûts de façon flexible pour l'ensemble de vos fournisseurs. La fonctionnalité d'interrogation de sources multiples vous permet d'analyser les coûts de plusieurs fournisseurs en vous basant sur des tags cohérents et standardisés, au lieu d'avoir à rédiger plusieurs requêtes pour chaque fournisseur.

Utilisez la fonctionnalité d'interrogation de sources multiples pour concevoir des vues sur vos coûts, déterminer le coût total de possession de services et configurer des alertes pour les changements et les tendances en matière de coûts sur la [page **Explorer** Page][6], les [dashboards][7], les [notebooks][8] et les [moniteurs de coûts][9].

## Configuration

Pour utiliser l'interrogation de sources multiples, assurez-vous d'avoir configuré [Cloud Cost Management][10] et d'ingérer activement des coûts dans Datadog. Plusieurs devises sont prises en charge : vos coûts sont automatiquement convertis et affichés en USD.

## Interroger vos données de coûts

Vous pouvez sélectionner plusieurs fournisseurs dans le champ **Provider** de la [page **Explorer**[6].

{{< img src="cloud_cost/multisource_querying/provider.png" alt="Le champ Provider sous la requête de recherche sur la page Cloud Cost Explorer" style="width:40%;" >}}

Les filtres déroulants, comme **Provider** et **Team**, vous permettent de gagner en flexibilité et de rationaliser le processus de création d'une requête de recherche, afin d'affiner les données liées à vos coûts. Pour ajouter un filtre, cliquez sur **+ Filter**.

{{< img src="cloud_cost/multisource_querying/filters_2.png" alt="Une requête de recherche utilisant le filtre Team et regroupant les rapports par service sur la page Cloud Cost Explorer" style="width:100%;" >}}

Cliquez sur **Refine Results** pour accéder aux options suivantes et filtrer vos données de coûts.

Usage Charges Only
: Examinez les coûts relatifs à vos équipes d'ingénierie, en ignorant les crédits, frais et taxes.

Complete Days Only
: Excluez les deux derniers jours de données sur les coûts, qui ne sont pas complets.

Total Cost
: Filtrez les données pour afficher les coûts respectant une certaine plage.

Dollar Change
: Affichez uniquement les changements de coûts qui se trouvent dans une plage spécifique exprimée en dollars.

Percent Change
: Affichez uniquement les changements de coûts qui se trouvent dans une plage spécifique exprimée en pourcentages.

{{< img src="cloud_cost/multisource_querying/refine_results_1.png" alt="Options supplémentaires permettant d'affiner les données liées à vos coûts sur la page Cloud Cost Explorer" style="width:100%;" >}}

## Visualiser vos données de coûts

Grâce à l'interrogation de sources multiples, vous pouvez créer des visualisations dans vos [dashboards][11] reposant sur les données de coûts de plusieurs fournisseurs.

{{< img src="cloud_cost/multisource_querying/cost_overview.png" alt="Un dashboard dans Datadog affichant des données Cloud Cost Management de plusieurs fournisseurs, comme Snowflake, Azure, Google Cloud, AWS et plus encore" style="width:100%;" >}}

## Données recueillies

### Métrique sur les coûts

L'interrogation de sources multiples utilise la métrique `all.cost`, qui combine toutes les métriques individuelles relatives aux coûts cloud et SaaS au sein d'une vue unifiée sur la page **Analytics**.

**Remarque** : la métrique `all.cost` n'inclut pas les tags au niveau des ressources. Pour visualiser les coûts par ressource, utilisez les métriques de coûts spécifiques de chaque fournisseur (comme `aws.cost.amortized`). Lorsque vous appliquez un filtre sur un fournisseur spécifique dans la requête de recherche, Datadog bascule automatiquement vers la métrique propre au fournisseur, ce qui permet d'interroger plus précisément vos données de coûts. 

### Tags par défaut

Cloud Cost Management recueille des tags pour les intégrations AWS, Azure, Google Cloud et Oracle Cloud. Ce tableau comprend une liste non exhaustive des tags par défaut partagés avec chaque intégration. 

| Nom du tag | Description du tag |
|---|---|
| `allocated_resource` | Le type de ressource utilisé par un workload de conteneur (par exemple, `cpu` ou `mem`). |
| `allocated_spend_type` | Les coûts liés aux conteneurs sont répartis en trois types de dépenses : les ressources utilisées par un workload (`usage`), les ressources réservées par un workload, mais non utilisées (`workload_idle`), et les ressources qui ne sont ni réservées ni utilisées par un workload (`cluster_idle`). |
| `ecs_cluster_name` | Le nom du cluster ECS hébergeant un workload. |
| `kube_cluster_name` | Le nom du cluster Kubernetes hébergeant un workload. |
| `orchestrator` | L'orchestrateur de conteneurs (par exemple, `kubernetes` ou `ecs`). |

### Ajout de tags

Cloud Cost Management enrichit toutes les données de coûts des fournisseurs en leur ajoutant des tags qui respectent la [spécification FOCUS FinOps][12]. FOCUS™ est une spécification technique qui normalise les données de facturation des coûts et de l'utilisation entre les fournisseurs cloud.

Les tags FOCUS vous permettent d'interroger des concepts similaires pour l'ensemble des fournisseurs. Par exemple, si vous souhaitez connaître le coût par compte sur AWS et Azure, il n'est pas nécessaire de créer deux requêtes (une pour les coûts AWS avec un regroupement selon `aws_member_account_name`, et une autre pour les coûts Azure avec un regroupement selon `subscriptionname`). Vous pouvez utiliser une seule requête de recherche qui filtre les coûts AWS et Azure avec un regroupement selon `subaccountname`.

Cloud Cost Management ajoute à toutes les métriques de coûts des versions en minuscules des ID de colonne de la spécification.

Les tags FOCUS suivants sont disponibles dans la solution Cloud Cost Management :

| Nom du tag | Description du tag |
|---|---|
| `providername` | Le nom de l'entité ayant mis les ressources ou services à disposition pour l’achat. |
| `servicename` | Une offre qui peut être achetée auprès d'un fournisseur (par exemple, une machine virtuelle dans le cloud, une base de données SaaS ou encore des services professionnels d'un intégrateur de systèmes). |
| `billingaccountid` | L'identifiant attribué à un compte de facturation par le fournisseur. |
| `billingaccountname` | Le nom d'affichage attribué à un compte de facturation. |
| `billingcurrency` | La devise dans laquelle une facture cloud a été payée. |
| `subaccountid` | Un identifiant attribué à un groupe de ressources ou de services, souvent utilisé pour gérer l'accès ou les coûts. |
| `subaccountname` | Un nom attribué à un groupe de ressources ou de services, souvent utilisé pour gérer l'accès ou les coûts. |
| `regionname` | Le nom d'une zone géographique isolée au sein de laquelle une ressource est provisionnée ou un service est fourni. |
| `availabilityzone` | Un identifiant attribué par un fournisseur pour une zone physiquement isolée et distincte au sein d'une région qui fournit une haute disponibilité et une tolérance aux pannes. |
| `pricingunit` | Une unité de mesure spécifiée par un fournisseur pour déterminer les prix unitaires. Elle indique comment le fournisseur facture l'utilisation mesurée et les quantités achetées, après avoir appliqué des règles de tarification telles que la tarification par blocs. |

La métrique `all.cost` inclut [des coûts alloués liés aux conteneurs][13] pour les coûts AWS, Azure et Google Cloud. Cela vous permet d'interroger vos coûts en utilisant des [tags de conteneur pertinents][14].

<div class="alert alert-danger">Si votre organisation utilise l'un de ces tags FOCUS, Datadog recommande de définir votre clé de tag sur l'infrastructure sous-jacente afin d'éviter tout conflit avec les valeurs des tags FOCUS dans Cloud Cost Management.</div>

## Conversion des devises
Cloud Cost Management récupère la devise de facturation à partir de la facture de chaque fournisseur cloud. Lors du traitement des coûts de plusieurs fournisseurs, si les coûts sont exprimés dans différentes devises, ils sont convertis en USD. Cette conversion est effectuée à l'aide du taux de change mensuel moyen, qui est mis à jour quotidiennement. Ainsi, Cloud Cost Management peut représenter de manière cohérente et précise toutes les données relatives aux coûts, quelle que soit leur devise d'origine. Pour afficher vos coûts dans la devise de facturation d'origine, appliquez un filtre sur un seul fournisseur.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/setup/aws
[2]: /fr/cloud_cost_management/setup/azure
[3]: /fr/cloud_cost_management/setup/google_cloud
[4]: /fr/cloud_cost_management/setup/saas_costs
[5]: /fr/cloud_cost_management/datadog_costs
[6]: https://app.datadoghq.com/cost/explorer
[7]: /fr/dashboards
[8]: /fr/notebooks
[9]: /fr/cloud_cost_management/cost_changes/monitors
[10]: /fr/cloud_cost_management
[11]: https://app.datadoghq.com/dashboard/lists
[12]: https://focus.finops.org/#obtain
[13]: /fr/cloud_cost_management/container_cost_allocation
[14]: /fr/cloud_cost_management/container_cost_allocation/?tab=aws#applying-tags
[15]: /fr/cloud_cost_management/setup/oracle