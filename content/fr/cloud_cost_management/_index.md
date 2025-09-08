---
aliases:
- /fr/infrastructure/cloud_cost_management
- /fr/integrations/cloudability
cascade:
  algolia:
    rank: 70
    subcategory: Cloud Cost Management
    tags:
    - cloud cost
    - cloud integrations
    - cloud cost management
    - cloud cost aws
    - cloud cost azure
    - cloud cost google cloud
    - cloud cost gcp
    - data collected aws
    - data collected azure
    - data collected google cloud
further_reading:
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: GitHub
  text: Bénéficiez d'une visibilité et d'un contrôle accrus sur vos dépenses cloud
    avec Datadog Cloud Cost Management (en anglais)
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: Blog
  text: Analysez vos dépenses liées à Kubernetes et ECS avec la solution Cloud Cost
    Management de Datadog
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Donner aux ingénieurs les moyens de prendre en main les coûts liés à Google
    Cloud avec Datadog (en anglais)
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analysez rapidement et de façon exhaustive les coûts cloud et SaaS associés
    à vos services
- link: /monitors/types/cloud_cost/
  tag: Documentation
  text: Créer un monitor Cloud Cost
- link: /cloud_cost_management/tag_pipelines/
  tag: Documentation
  text: En savoir plus sur les pipelines de tags
- link: /cloud_cost_management/tag_pipelines
  tag: Documentation
  text: Standardiser les tags dans Cloud Cost Management à l'aide des pipelines de
    tags
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: Blog
  text: Principaux enseignements de l'étude sur l'état des coûts cloud
- link: https://www.datadoghq.com/blog/unit-economics-ccm/
  tag: Blog
  text: Surveiller les coûts unitaires avec Datadog Cloud Cost Management (en anglais)
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Comment nous avons mis en place une pratique FinOps efficace chez Datadog
    (en anglais)
- link: https://www.datadoghq.com/blog/cloud-cost-management-saved-millions/
  tag: Blog
  text: Comment nous avons économisé 1,5 million de dollars par an avec Cloud Cost
    Management (en anglais)
title: Cloud Cost Management
---

{{< learning-center-callout header="Participez à un webinar de formation" hide_image="true" btn_title="Inscription" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
  Explorez les coûts de vos fournisseurs cloud et mettez-les en corrélation avec les données de télémétrie en temps réel. Obtenez des insights et des alertes exploitables sur l'origine de vos coûts cloud, leur évolution et les possibilités d'optimisation.
{{< /learning-center-callout >}}

## Présentation

Cloud Cost Management fournit des insights aux équipes d'ingénierie et de finance pour comprendre comment les changements d'infrastructure influent sur les coûts, répartir les dépenses au sein de votre organisation et identifier les inefficacités.

{{< img src="cloud_cost/summary.png" alt="Obtenez des insights sur tous les coûts et usages de votre fournisseur cloud depuis la page du résumé de Cloud Costs dans Datadog" style="width:100%;" >}}

Datadog ingère vos données de coûts cloud et les transforme en métriques que vous pouvez utiliser dans une requête de recherche sur la page [**Explorer**][1]. En cas d'augmentation des coûts, vous pouvez la corréler avec des métriques d'usage pour en déterminer la cause.

## Configuration

{{< whatsnext desc="Pour commencer à gérer vos coûts cloud avec Cloud Cost Management, consultez la documentation suivante." >}}
  {{< nextlink href="/cloud_cost_management/setup/aws">}}<u>AWS</u> : Configurez Cloud Cost Management pour votre facture AWS.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/azure">}}<u>Azure</u> : Configurez Cloud Cost Management pour votre facture Azure.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/google_cloud">}}<u>Google Cloud</u> : Configurez Cloud Cost Management pour votre facture Google Cloud.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/saas_costs">}}<u>Intégrations de coûts SaaS</u> : Envoyez les données de coûts d'un fournisseur SaaS compatible vers Datadog.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/custom">}}<u>Coûts personnalisés</u> : Téléversez toute source de données de coûts dans Datadog.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Coûts Datadog</u> : Visualisez les dépenses et les métriques d'utilisation quotidiennes de Datadog.{{< /nextlink >}}
 {{< /whatsnext >}}

## Utiliser les données de coûts cloud

Affichez les dépenses d'infrastructure en parallèle des métriques d'utilisation correspondantes, avec une rétention de 15 mois, pour détecter d'éventuelles inefficacités et opportunités d'économies.

Lors de la création d'un dashboard, sélectionnez **Cloud Cost** comme source de données pour votre requête de recherche.

{{< img src="cloud_cost/cloud_cost_data_source-1.png" alt="Cloud Cost disponible comme source de données lors de la création d'un widget de dashboard" style="width:80%;" >}}

Vous pouvez également exporter de manière programmatique un graphique de séries temporelles de vos données de coûts cloud à l'aide de l'[API Metrics][2].

## Utiliser les données de coûts Datadog quotidiennes

Affichez les dépenses quotidiennes de Datadog en parallèle des métriques d'utilisation associées, avec une période de rétention de 15 mois, pour identifier d'éventuelles inefficacités et opportunités d'économies.

Lors de la création d'un dashboard, sélectionnez **Cloud Cost** comme source de données pour votre requête de recherche.

{{< img src="cloud_cost/datadog_costs/dashboard-updated.png" alt="Sélection des coûts Datadog comme source de données Cloud Cost lors de la création d'un dashboard" style="width:80%;" >}}

Vous pouvez également exporter de manière programmatique un graphique de séries temporelles de vos données de coûts Datadog à l'aide de l'[API Metrics][2].

## Créer des règles de tags

Utilisez les [pipelines de tags][5] pour garantir un suivi complet des coûts en standardisant les tags sur l'ensemble des ressources cloud. Cela permet d'éviter que certaines données de coût ne soient ignorées.

{{< img src="cloud_cost/tags_addnew.png" alt="Créer une règle de tag dans les pipelines de tags pour garantir l'utilisation de tags standard sur vos ressources cloud" style="width:60%;" >}}

Vous pouvez créer des règles de tags pour corriger les tags manquants ou incorrects, et ajouter des tags déduits en fonction de la logique métier de votre organisation.

## Créer un monitor de coûts

Gérez et optimisez proactivement vos dépenses cloud en créant un [monitor Cloud Cost][3]. Vous pouvez choisir **Cost Changes** ou **Cost Threshold** pour surveiller vos dépenses cloud.

{{< img src="cloud_cost/monitor.png" alt="Créer un monitor Cloud Cost qui déclenche une alerte en cas de variation des coûts" style="width:100%;" >}}

## Répartir les coûts

Utilisez les [métriques Container Cost Allocation][4] pour identifier les coûts associés aux clusters et aux workloads sur Kubernetes, Amazon ECS, Azure et Google Cloud. Bénéficiez d'une visibilité sur les coûts au niveau des pods, identifiez les ressources inactives et analysez les coûts par type de ressource.

## Autorisations
Deux autorisations sont disponibles :
1. Cloud Cost Management Read (`cloud_cost_management_read`)
2. Cloud Cost Management Write (`cloud_cost_management_write`)

Le tableau ci-dessous décrit l'impact de ces autorisations dans Cloud Cost Management et les pages associées.

| Page ou fonctionnalité                | Autorisation Cloud Cost Management Read       | Autorisation Cloud Cost Management Write            |
|-----------------------------------|---------------------------------------------|---------------------------------------------------|
| Page de résumé de CCM                  | Autorisation requise                         | S. O.                                               |
| Page des conteneurs de CCM               | Autorisation requise                         | S. O.                                               |
| Page des recommandations de CCM              | Autorisation requise                         | S. O.                                               |
| Page de l'explorer de CCM                     | Autorisation requise                         | S. O.                                               |
| Page des offres de CCM                         | Autorisation requise                         | Autorisation requise pour consulter les budgets               |
| Page des paramètres de CCM - Coûts personnalisés      | Autorisation requise                         | Autorisation requise pour télécharger des coûts personnalisés        |
| Page des paramètres de CCM - Pipelines de tags     | Autorisation requise                         | Autorisation requise pour créer des pipelines de tags       |
| Page des paramètres de CCM - Intégrations Saas | Autorisation requise                         | Autorisation requise pour activer l'intégration avec CCM |
| Page des paramètres de CCM - Comptes          | Autorisation requise                         | Autorisation requise pour modifier ou créer des comptes  |
| Page des paramètres de CCM - Configurer les recommandations          | Autorisation requise                         | Autorisation requise pour personnaliser les recommandations  |
| Dashboards/Notebooks (externes)   | Autorisation requise pour créer et consulter des données | S. O.                                               |
| Monitors (externe)               | Autorisation requise pour créer des monitors CCM  | S. O.                                               |
| Service Catalog (externe)        | Autorisation requise pour consulter les données sur les coûts       | S. O.                                               |
| Resource Catalog (externe)       | Autorisation requise pour consulter les données sur les coûts       | S. O.                                               |
| Requêtes API pour les données de coûts     | Autorisation requise                           | S. O.                                               |

### Aperçu du contrôle d'accès aux données
Des restrictions plus granulaires au niveau des tags sont disponibles dans le cadre de l'[aperçu du contrôle d'accès aux données][6]. Pour demander l'accès à l'aperçu,
veuillez remplir [ce formulaire][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/explorer
[2]: /fr/api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /fr/monitors/types/cloud_cost/
[4]: /fr/cloud_cost_management/container_cost_allocation
[5]: /fr/cloud_cost_management/tag_pipelines
[6]: /fr/account_management/rbac/data_access/
[7]: https://www.datadoghq.com/product-preview/data-access-control/