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
  text: Créez un monitor Cloud Cost
- link: /cloud_cost_management/tags/
  tag: Documentation
  text: En savoir plus sur les tags dans Cloud Cost Management
- link: /cloud_cost_management/cloud_cost_skill/
  tag: Documentation
  text: Utilisez le Cloud Cost Skill dans Bits Chat
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: Blog
  text: Gagnez en visibilité et en contrôle sur vos dépenses cloud avec Datadog Cloud
    Cost Management
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Stimuler le retour sur investissement de l''IA : comment Datadog connecte
    les coûts, les performances et l''infrastructure pour vous permettre d''évoluer
    de manière responsable'
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: Blog
  text: Analysez vos dépenses liées à Kubernetes et ECS avec Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Permettez aux ingénieurs de prendre en charge les coûts Google Cloud avec
    Datadog
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analysez rapidement et de manière exhaustive les coûts cloud et SaaS liés
    à vos services
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: Blog
  text: Principaux enseignements de l'étude sur l'état des coûts cloud
- link: https://www.datadoghq.com/blog/unit-economics-ccm/
  tag: Blog
  text: Surveillez l'économie unitaire avec Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Comment nous avons créé une pratique FinOps réussie chez Datadog
- link: https://www.datadoghq.com/blog/cloud-cost-management-saved-millions/
  tag: Blog
  text: Comment nous avons économisé 1,5 million de dollars par an avec Cloud Cost
    Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci/
  tag: Blog
  text: Gérez et optimisez vos coûts OCI avec Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: Blog
  text: Comment Cambia Health Solutions a économisé 30 000 $ par mois grâce à Cloud
    Cost Management et au Datadog Resource Catalog
- link: https://www.datadoghq.com/blog/flexible-sheets-cloud-cost-management/
  tag: Blog
  text: Analysez les coûts du cloud avec des tableurs flexibles dans Datadog Sheets
title: Cloud Cost Management
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
  Explorez les coûts de votre fournisseur cloud et corrélez-les avec des données de télémétrie en temps réel. Obtenez des informations exploitables et des alertes sur l'origine de vos coûts cloud, leur évolution et les optimisations potentielles.
{{< /learning-center-callout >}}

## Présentation {#overview}

Cloud Cost Management fournit aux équipes d'ingénierie et de finance des informations pour comprendre comment les changements d'infrastructure influent sur les coûts, répartir les dépenses au sein de votre organisation et identifier les inefficacités.

{{< img src="cloud_cost/summary.png" alt="Obtenez des informations sur tous les coûts et l'utilisation de votre fournisseur cloud sur la page Résumé des coûts cloud dans Datadog" style="width:100%;" >}}

Datadog ingère vos données de coûts cloud et les transforme en métriques que vous pouvez utiliser dans une requête de recherche sur la page [**Explorer**][1]. Si les coûts augmentent, vous pouvez corréler cette hausse avec des métriques d'utilisation pour en déterminer la cause première.

## Configuration {#setup}

{{< whatsnext desc="Pour commencer à gérer vos coûts cloud avec Cloud Cost Management, consultez la documentation suivante.">}}
  {{< nextlink href="/cloud_cost_management/setup/aws">}}<u>AWS</u> : configurez Cloud Cost Management pour votre facture AWS.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/azure">}}<u>Azure</u> : configurez Cloud Cost Management pour votre facture Azure. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/google_cloud">}}<u>Google Cloud</u> : configurez Cloud Cost Management pour votre facture Google Cloud. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/oracle">}}<u>Oracle</u> : configurez Cloud Cost Management pour votre facture Oracle. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/saas_costs">}}<u>Coûts SaaS et IA</u> : envoyez des données de coût depuis un fournisseur de coûts SaaS pris en charge vers Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/custom">}}<u>Coûts personnalisés</u> : téléchargez n'importe quelle source de données de coût vers Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Coûts Datadog</u> : visualisez les dépenses quotidiennes Datadog et les métriques d'utilisation. {{< /nextlink >}}
 {{< /whatsnext >}}

## Utilisez les données de coût cloud {#use-cloud-cost-data}

Visualisez les dépenses d'infrastructure ainsi que les métriques d'utilisation associées avec une période de rétention de 15 mois pour identifier les inefficacités potentielles et les opportunités d'économies.

Lors de la création d'un dashboard, sélectionnez {{< ui >}}Cloud Cost{{< /ui >}} comme source de données pour votre requête de recherche.

{{< img src="cloud_cost/cloud_cost_data_source-1.png" alt="Cloud Cost disponible en tant que source de données lors de la création d'un widget de dashboard" style="width:80%;" >}}

Vous pouvez, de manière facultative, exporter par programmation un graphique de séries temporelles de vos données de coût cloud en utilisant l'[API Metrics][2].

## Utilisez les données de coût quotidiennes de Datadog {#use-daily-datadog-cost-data}

Visualisez les dépenses quotidiennes Datadog ainsi que les métriques d'utilisation associées avec une période de rétention de 15 mois pour identifier les inefficacités potentielles et les opportunités d'économies. En savoir plus sur [Datadog Costs][8].

Lors de la création d'un dashboard, sélectionnez {{< ui >}}Cloud Cost{{< /ui >}} comme source de données, puis choisissez {{< ui >}}Datadog{{< /ui >}} parmi les types de coûts disponibles.

{{< img src="cloud_cost/datadog_costs/dashboard-updated.png" alt="Les coûts Datadog en tant qu'option pour la source de données Cloud Cost dans un dashboard" style="width:80%;" >}}

Vous pouvez, de manière facultative, exporter par programmation un graphique de séries temporelles de vos données de coût Datadog en utilisant l'[API Metrics][2].

## Étiquetage et répartition des coûts {#tagging-and-cost-allocation}

Apprenez comment les tags sont sourcés, enrichis et gérés dans Cloud Cost Management en lisant la [documentation sur les tags][5].

Vous pouvez créer des règles de tags pour corriger les tags manquants ou incorrects, et ajouter des tags inférés qui s'alignent sur la logique métier de votre organisation.

## Créez un monitor Cloud Cost {#create-a-cost-monitor}

Gérez et optimisez de manière proactive vos dépenses cloud en créant un [monitor Cloud Cost][3]. Choisissez parmi {{< ui >}}Cost Changes{{< /ui >}}, {{< ui >}}Cost Anomalies{{< /ui >}}, {{< ui >}}Cost Threshold{{< /ui >}}, {{< ui >}}Cost Forecast{{< /ui >}} ou {{< ui >}}Budget{{< /ui >}} types de monitors. Voir [Cloud Cost Monitors][3] pour plus de détails sur chaque type.

{{< img src="cloud_cost/monitor-2.png" alt="Créez un monitor Cloud Cost qui alerte en cas de changement de coût" style="width:100%;" >}}

## Allouer les coûts {#allocate-costs}

Utilisez les [métriques d'allocation des coûts de conteneur][4] pour découvrir les coûts associés aux clusters et aux charges de travail sur Kubernetes, Amazon ECS, Azure et Google Cloud. Vous pouvez obtenir une visibilité sur les coûts au niveau des pods, identifier les coûts des ressources inutilisées et analyser les coûts par type de ressource.

## Autorisations {#permissions}

Cloud Cost Management utilise les autorisations suivantes pour contrôler l'accès aux données de coût et à la plupart des configurations CCM :
- `cloud_cost_management_read`
- `cloud_cost_management_write`

Pour une ventilation détaillée des exigences par page, consultez [Permissions][9].

## Examiner l'historique des données {#review-data-history}

{{< img src="cloud_cost/ccm-data-history.png" alt="Consultez l'historique de vos données de Cloud Cost dans les paramètres de Cloud Cost." style="width:100%;" >}}

Surveillez la fraîcheur et le statut de traitement de vos données de coût cloud sur la page {{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Data History{{< /ui >}}.

- {{< ui >}}Last Bill Received{{< /ui >}} : date à laquelle Datadog a reçu pour la dernière fois des données de facturation de votre fournisseur cloud ou SaaS. Cet horodatage n'indique pas la date d'utilisation ou de coût la plus récente dans ces données.
- {{< ui >}}Last Processed{{< /ui >}} : date à laquelle Datadog a traité pour la dernière fois les données de facturation de votre fournisseur cloud, incluant :
  - Règles de pipeline de tags (traitent rétroactivement jusqu'à 3 mois de données historiques par défaut)
  - Règles d'allocation des coûts (traitent rétroactivement jusqu'à 1 mois de données historiques par défaut)

Utilisez cette page pour résoudre les retards de données ou confirmer que les récents pipelines de tags et les modifications d'allocation des coûts ont bien été pris en compte.

Les données de coût cloud ne peuvent être aussi récentes que les données fournies par votre fournisseur. Si des coûts sont manquants pour une date attendue, comparez la facture ou l'export de votre fournisseur avec CCM. Contactez votre fournisseur si la source ne contient pas les coûts pour la date attendue. Contactez le [support Datadog][11] si la source contient ces coûts mais que le CCM ne les contient pas.

## Utilisez l'IA pour l'analyse des coûts {#use-ai-for-cost-analysis}

Utilisez le [Cloud Cost Skill in Bits Chat][10] pour étudier les variations de coûts, identifier les propriétaires probables, comparer les dépenses aux budgets, corréler les coûts aux métriques d'observabilité et créer des carnets de transfert pour les équipes d'ingénierie.

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Résumé de l'enquête de Bits Chat montrant une analyse initiale." style="width:60%;" >}}

## Pour aller plus loin {#further-reading}

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
[11]: /fr/help/