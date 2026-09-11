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
- link: /monitors/types/cloud_cost/
  tag: Documentation
  text: Créez un moniteur Cloud Cost
- link: /cloud_cost_management/tags/
  tag: Documentation
  text: Découvrez les tags dans Cloud Cost Management
- link: /cloud_cost_management/cloud_cost_skill/
  tag: Documentation
  text: Utilisez la compétence Cloud Cost dans Bits Chat
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: Blog
  text: Obtenez de la visibilité et du contrôle sur vos dépenses cloud avec Datadog
    Cloud Cost Management
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Stimuler le retour sur investissement de l''IA : comment Datadog relie coût,
    performance et infrastructure pour que vous puissiez évoluer de manière responsable'
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: Blog
  text: Analysez vos dépenses liées à Kubernetes et ECS avec la solution Cloud Cost
    Management de Datadog
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Donnez aux ingénieurs le pouvoir de prendre en charge les coûts Google Cloud
    avec Datadog
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analysez rapidement et de manière exhaustive les coûts Cloud et SaaS derrière
    vos services
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: Blog
  text: Principaux enseignements de l'étude State of Cloud Costs
- link: https://www.datadoghq.com/blog/unit-economics-ccm/
  tag: Blog
  text: Surveillez l'économie unitaire avec Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Comment nous avons créé une pratique FinOps réussie chez Datadog
- link: https://www.datadoghq.com/blog/cloud-cost-management-saved-millions/
  tag: Blog
  text: Comment nous avons économisé 1,5 million de dollars par an avec Datadog Cloud
    Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci/
  tag: Blog
  text: Gérez et optimisez vos coûts OCI avec Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: Blog
  text: Comment Cambia Health Solutions a économisé 30 000 dollars par mois avec Datadog
    Cloud Cost Management et le Datadog Resource Catalog
title: Cloud Cost Management
---
{{< learning-center-callout header="Participez à une session de webinaire d'habilitation" hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
  Explorez les coûts de votre fournisseur Cloud et corrélez-les avec des données de télémétrie en temps réel. Obtenez des informations exploitables et des alertes sur l'origine de vos coûts Cloud, comment ils évoluent et où trouver des optimisations potentielles.
{{< /learning-center-callout >}}

## Aperçu {#overview}

Datadog Cloud Cost Management fournit des informations aux équipes d'ingénierie et de finance pour comprendre comment les changements d'infrastructure impactent les coûts, allouer les dépenses dans votre organisation et identifier les inefficacités

{{< img src="cloud_cost/summary.png" alt="Obtenez des informations sur tous les coûts et l'utilisation de votre fournisseur Cloud sur la page Cloud Costs Summary dans Datadog" style="width:100%;" >}}

Datadog ingère vos données de coûts Cloud et les transforme en métriques que vous pouvez utiliser dans une requête de recherche sur la page [**Explorer**][1] Si les coûts Cloud augmentent, vous pouvez corréler l'augmentation avec les métriques d'utilisation pour déterminer la cause profonde.

## Configuration {#setup}

{{< whatsnext desc="Pour commencer à gérer vos coûts Cloud avec Datadog Cloud Cost Management, consultez la documentation suivante">}}
  {{< nextlink href="/cloud_cost_management/setup/aws">}}<u>AWS</u> : Configurez Datadog Cloud Cost Management pour votre facture AWS{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/azure">}}<u>Azure</u> : Configurez Datadog Cloud Cost Management pour votre facture Azure {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/google_cloud">}}<u>Google Cloud</u> : Configurez Datadog Cloud Cost Management pour votre facture Google Cloud {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/oracle">}}<u>Oracle</u> : Configurez Datadog Cloud Cost Management pour votre facture Oracle {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/saas_costs">}}<u>Coûts SaaS et IA</u> : Envoyez les données de coûts d'un fournisseur SaaS pris en charge à Datadog {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/custom">}}<u>Coûts personnalisés</u> : Téléchargez toute source de données de coûts sur Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Coûts Datadog</u> : Visualisez les dépenses quotidiennes de Datadog et les métriques d'utilisation. {{< /nextlink >}}
 {{< /whatsnext >}}

## Utilisez les données de coûts Cloud {#use-cloud-cost-data}

Visualisez les dépenses d'infrastructure aux côtés des métriques d'utilisation connexes avec une période de conservation de 15 mois pour repérer les inefficacités potentielles et les opportunités d'économies.

Lors de la création d'un tableau de bord, sélectionnez {{< ui >}}Cloud Cost{{< /ui >}} comme source de données pour votre requête de recherche.

{{< img src="cloud_cost/cloud_cost_data_source-1.png" alt="Cloud Cost disponible en tant que source de données lors de la création de widgets de tableau de bord" style="width:80%;" >}}

En option, vous pouvez exporter de manière programmatique un graphique de séries temporelles de vos données de coûts Cloud en utilisant l'[Metrics API][2]

## Utilisez les données de coûts Datadog quotidiennes {#use-daily-datadog-cost-data}

Visualisez les dépenses quotidiennes de Datadog aux côtés des métriques d'utilisation connexes avec une période de conservation de 15 mois pour repérer les inefficacités potentielles et les opportunités d'économies. En savoir plus sur [Datadog Costs][8]

Lors de la création d'un tableau de bord, sélectionnez {{< ui >}}Cloud Cost{{< /ui >}} comme source de données, puis choisissez {{< ui >}}Datadog{{< /ui >}} parmi les types de coûts disponibles.

{{< img src="cloud_cost/datadog_costs/dashboard-updated.png" alt="Datadog Costs en tant qu'option pour la source de données Cloud Cost dans un tableau de bord" style="width:80%;" >}}

En option, vous pouvez exporter de manière programmatique un graphique de séries temporelles de vos données de coûts Datadog en utilisant l'[Metrics API][2]

## Étiquetage et allocation des coûts {#tagging-and-cost-allocation}

Apprenez comment les tags sont sourcés, enrichis et gérés dans Cloud Cost Management en lisant la [documentation sur les tags][5]

Vous pouvez créer des règles de tags pour corriger les tags manquants ou incorrects, et ajouter des tags inférés qui s'alignent avec la logique métier de votre organisation

## Créer un moniteur Cloud Cost {#create-a-cost-monitor}

Gérez et optimisez proactivement vos dépenses cloud en créant un [Cloud Cost Monitor][3] Vous pouvez choisir {{< ui >}}Cost Changes{{< /ui >}} ou {{< ui >}}Cost Threshold{{< /ui >}} pour surveiller vos dépenses cloud.

{{< img src="cloud_cost/monitor.png" alt="Créez un moniteur Cloud Cost qui alerte sur les variations de coûts" style="width:100%;" >}}

## Allouer des coûts {#allocate-costs}

Utilisez les [Container Cost Allocation metrics][4] pour découvrir les coûts associés aux clusters et aux charges de travail sur Kubernetes, Amazon ECS, Azure et Google Cloud Vous pouvez obtenir une visibilité sur les coûts au niveau des pods, identifier les coûts des ressources inactives et analyser les coûts par type de ressource.

## Permissions {#permissions}

Datadog Cloud Cost Management utilise les permissions suivantes pour contrôler l'accès aux données de coût et à la plupart des configurations CCM :
- `cloud_cost_management_read`
- `cloud_cost_management_write`

Pour une répartition détaillée des exigences par page, voir [Permissions][9].

## Examiner l'historique des données {#review-data-history}

{{< img src="cloud_cost/ccm-data-history.png" alt="Consultez l'historique de vos données de coûts Cloud dans Cloud Cost settings" style="width:100%;" >}}

Surveillez la fraîcheur et l'état de traitement de vos données de coûts Cloud sur la page {{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Data History{{< /ui >}}

- {{< ui >}}Last Bill Received{{< /ui >}} : Lorsque votre fournisseur Cloud ou SaaS a généré les données de facturation visibles dans CCM
- {{< ui >}}Last Processed{{< /ui >}} : Lorsque Datadog a traité pour la dernière fois les données de facturation de votre fournisseur Cloud, y compris :
  - Règles de pipeline d'étiquetage (traitent rétroactivement jusqu'à 3 mois de données historiques par défaut)
  - Règles d'allocation des coûts (traitent rétroactivement jusqu'à 1 mois de données historiques par défaut)

Utilisez cette page pour résoudre les retards de données ou confirmer que les récents pipelines de tags et les changements d'allocation des coûts ont pris effet

## Utilisez l'IA pour l'analyse des coûts {#use-ai-for-cost-analysis}

Utilisez la [Cloud Cost Skill in Bits Chat][10] pour enquêter sur les changements de coûts, identifier les propriétaires probables, comparer les dépenses par rapport aux budgets, corréler les coûts avec les métriques d'observabilité et créer des handoff notebooks pour les équipes d'ingénierie

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Résumé d'enquête de Bits Chat montrant une analyse initiale." style="width:60%;" >}}

## Lectures complémentaires : {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/explorer
[2]: /fr/api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /fr/monitors/types/cloud_cost/
[4]: /fr/cloud_cost_management/container_cost_allocation
[5]: /fr/cloud_cost_management/tags/
[6]: /fr/account_management/rbac/data_access/
[7]: https://www.datadoghq.com/product-preview/data-access-control/
[8]: /fr/cloud_cost_management/datadog_costs
[9]: /fr/cloud_cost_management/setup/permissions
[10]: /fr/cloud_cost_management/cloud_cost_skill/