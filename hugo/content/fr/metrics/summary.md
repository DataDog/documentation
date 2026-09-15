---
aliases:
- /fr/graphing/faq/how-can-i-set-up-custom-units-for-custom-metrics
- /fr/graphing/metrics/summary/
description: Consultez la liste complète des métriques transmises à Datadog.
further_reading:
- link: /metrics/explorer/
  tag: Documentation
  text: Metrics Explorer
- link: /metrics/distributions/
  tag: Documentation
  text: Distributions de métriques
title: Metrics Summary
---
## Présentation {#overview}

La [page Metrics Summary][1] affiche la liste des métriques transmises à Datadog pendant un intervalle précis, à savoir l'heure précédente, le jour précédent ou la semaine précédente. 

Recherchez vos métriques par nom de métrique ou par tag en utilisant les champs de recherche {{< ui >}}Metric{{< /ui >}} ou {{< ui >}}Tag{{< /ui >}} :

{{< img src="metrics/summary/tag_advanced_filtering.png" alt="La page de résumé des métriques avec NOT team:* saisi dans la barre de recherche de tags" style="width:75%;">}}

**Remarque** : Les valeurs de tag sont conservées dans le champ de recherche {{< ui >}}Tag{{< /ui >}} pendant 28 heures. Les valeurs non soumises au cours des 28 dernières heures n'apparaissent pas comme options de recherche, même si elles restent visibles dans le panneau latéral des détails de la métrique.

Vous pouvez également découvrir des métriques pertinentes en utilisant la prise en charge améliorée de la recherche approximative (fuzzy matching) dans le champ de recherche Metrics :

{{< img src="metrics/summary/metric_advanced_filtering_fuzzy.png" alt="La page de résumé des métriques avec une recherche approximative sur shopist checkout" style="width:75%;">}}

Le filtrage par tag prend en charge la syntaxe booléenne et les caractères génériques afin que vous puissiez identifier : 
* Les métriques marquées avec une clé de tag particulière, par exemple, `team` : `team:*`
* Les métriques auxquelles il manque une clé de tag particulière, par exemple, `team` : `NOT team:*`

## Panneau de facettes {#facet-panel}

Les barres de recherche offrent l'ensemble d'actions le plus complet pour filtrer la liste des métriques. Mais les facettes peuvent également filtrer vos métriques par :

- {{< ui >}}Configuration{{< /ui >}} : Métriques avec configurations de tags
- {{< ui >}}Percentiles{{< /ui >}} : Métriques de distribution activées par des centiles/capacités de requête avancées
- {{< ui >}}Historical Metrics{{< /ui >}} : Métriques pour lesquelles l'ingestion de métriques historiques est activée 
- {{< ui >}}Query Activity{{< /ui >}} : Métriques non interrogées dans Datadog ou par l'API au cours des 30, 60 ou 90 derniers jours
- {{< ui >}}Related Assets{{< /ui >}} : Métriques utilisées dans des dashboards, notebooks, monitors et SLOs.
- {{< ui >}}Metric Type{{< /ui >}} : Différencier les métriques de distribution des métriques non liées à la distribution (comptes, jauges, taux)
- {{< ui >}}Metric Origin{{< /ui >}} : Le produit dont provient la métrique (par exemple, les métriques générées à partir de Logs ou d'APM Spans). Pour en savoir plus sur les différents types d'origine des métriques, consultez [Définitions de l'origine des métriques][12]

### Définitions {#definitions}

Une métrique est **non interrogée** si elle n'a pas fait l'objet d'un accès dans des moniteurs, des SLO, des notebooks exécutés, des tableaux de bord ouverts, utilisée dans des requêtes Metrics Explorer ou accédée via des appels API au cours des 30, 60 ou 90 derniers jours.

Une métrique est considérée comme **utilisée** tant qu'elle existe sur une ressource, indépendamment du fait qu'elle ait été activement interrogée.

{{< img src="metrics/summary/facet_panel_2025-02-26.png" alt="Panneau de facettes des métriques" style="width:75%;">}}

## Configuration de plusieurs métriques {#configuration-of-multiple-metrics}

Cliquer sur {{< ui >}}Configure Metrics{{< /ui >}} vous donne plusieurs options pour configurer plus d'une métrique à la fois : 

{{< img src="metrics/summary/configurationbuttons10-11-2024.png" alt="Boutons de configuration groupée" style="width:100%;">}}

* {{< ui >}}Manage tags{{< /ui >}} : Configurer des tags sur plusieurs métriques personnalisées correspondant à un espace de noms en utilisant Metrics without Limits™.

{{< img src="metrics/summary/tags-bulk-config.mp4" alt="Configuration groupée des tags de métrique" video="true" style="width:100%;" >}}

* {{< ui >}}Enable or disable percentiles{{< /ui >}} : Gérer les agrégations de centiles sur plusieurs métriques de distribution. Consultez la [page Distributions][31] pour plus d'informations.

{{< img src="metrics/summary/percentile_aggregations_toggle_2025-04-16.png" alt="Basculer pour gérer les agrégations de centiles" style="width:100%;">}}

* {{< ui >}}Enable or disable historical metrics ingestion{{< /ui >}} : Gérer l'ingestion de données de métriques historiques. Consultez la [page Ingestion de métriques historiques][30] pour plus d'informations.

## Panneau latéral des détails de la métrique {#metric-details-sidepanel}

Cliquez sur un nom de métrique pour afficher dans son volet latéral des détails concernant les métadonnées et les tags de cette métrique : 

{{< img src="metrics/summary/mwl_sidepanel.jpg" alt="Volet de métrique" style="width:75%;">}}

### Nom de la métrique {#metric-name}

Le nom de votre métrique dans le [Metrics Explorer][2], les [dashboards][3], etc.

### Métriques personnalisées ingérées {#ingested-custom-metrics}

Un nom de métrique peut émettre plusieurs métriques personnalisées ingérées en fonction de ses combinaisons de valeurs de tags associées. Les métriques personnalisées ingérées représentent toutes les données soumises à l'origine avec le code.

Pour en savoir plus, consultez la documentation relative aux [métriques custom][4].

### Métriques personnalisées indexées {#indexed-custom-metrics}

Contrairement aux métriques personnalisées ingérées, les métriques personnalisées indexées représentent celles qui restent interrogeables sur l'ensemble de la plateforme Datadog. Ce nombre peut être impacté par l'ajout ou la suppression d'agrégations de centiles ou par l'utilisation de Metrics without Limits™. En savoir plus dans la documentation [Metrics without Limits™][0].

### Hôtes {#hosts}

Le nombre total de hosts qui transmettre une métrique.

### Valeurs de tag {#tag-values}

Le nombre total de valeurs de tag uniques associées à une métrique.

[En savoir plus sur le tagging][5].

### Métadonnées de métrique {#metrics-metadata}

Les métadonnées associées à votre métrique. La plupart des métadonnées peuvent être modifiées sur la page de résumé des métriques ou avec la [Datadog API][6].

#### Unité de métrique {#metric-unit}

L'unité de votre métrique (octet, seconde, requête, interrogation, etc.). Consultez la page [metric unit][7] pour plus de détails.

Lors de l'envoi de métriques custom à Datadog, vous pouvez modifier l'[unité de mesure][1] affichée lorsque vous passez votre curseur sur une métrique dans un graphique.

**Remarque** : cela ne modifie pas la façon dont un graphique de métrique est affiché. Cela modifie uniquement les unités de mesure considérées pour les valeurs brutes lorsque vous survolez une métrique. Le formatage est automatiquement appliqué pour la lisibilité. Par exemple, les octets (`B`) peuvent être affichés en kilo-octets (`KiB`).

#### Type de métrique {#metric-type}

Le type de votre métrique (jauge, taux, compte, distribution). Consultez la page [metric type][8] pour plus de détails.

**Avertissement** : La modification du type de métrique change le comportement de cette métrique pour **TOUS** vos dashboards et monitors.

#### Nom de l'intégration {#integration-name}

Si la métrique provient d'une [intégration][9] prise en charge, les métadonnées indiquent le nom de l'intégration. Ces informations ne peuvent pas être modifiées.

#### Intervalle {#interval}

L'intervalle de collecte pour la métrique en secondes.

#### Description de la métrique {#metric-description}

La description de la métrique vous aide à comprendre ce qu'elle représente, pourquoi elle existe et comment elle est généralement utilisée. Utilisez ce champ pour générer une vue et mettre à jour les descriptions de vos [métriques personnalisées][4]. Les descriptions sont pré-remplies pour les métriques provenant d'[intégrations][9] prises en charge.

#### Description générée par IA {#ai-generated-description}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Les descriptions de métriques générées par IA ne sont pas disponibles pour le site Datadog sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Pour les métriques personnalisées, Datadog peut générer automatiquement des descriptions en utilisant le contexte disponible, notamment le nom de la métrique, les tags pertinents, l'activité des requêtes et le code source associé. Pour utiliser le code source comme contexte supplémentaire, installez l'intégration [GitHub][36], [GitLab][37] ou [Azure DevOps][38] de Datadog et connectez vos [dépôts][39].

{{< img src="metrics/summary/metric_ai_generated_descriptions_03062026.png" alt="Descriptions générées par IA dans le panneau latéral des métriques" style="width:80%;">}}


## Code source {#source-code}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Le code source de la métrique n'est pas disponible pour le site Datadog sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

La section Code source du panneau latéral des métriques offre une vue centralisée de chaque métrique personnalisée et de son contexte sous-jacent.

Utilisez la section Code source du panneau latéral des métriques pour identifier le code source d'une métrique, comprendre comment elle est générée et déterminer qui en est responsable. Elle offre une visibilité sur le contexte et la responsabilité, ce qui vous aide à résoudre les problèmes et à optimiser plus rapidement en établissant un lien direct vers le fichier source, l'historique des commits et les données de blame de la métrique.

{{< img src="metrics/summary/metric_source_code_03262026.png" alt="Exemple de code source dans le panneau latéral des métriques" style="width:80%;">}}

### Dépannage des métriques manquantes {#troubleshooting-missing-metrics}

Si une métrique n'apparaît pas dans le code source, cela peut être dû à la manière dont elle est définie.

Datadog détecte mieux les métriques lorsque les noms sont écrits sous forme de chaînes explicites. Les métriques créées à l'aide de variables, de constantes ou d'assistants personnalisés peuvent ne pas être détectées.

Raisons courantes pour lesquelles des métriques sont manquantes :
- Le nom de la métrique est généré dynamiquement  
- La métrique est émise via des wrappers personnalisés  
- Le dépôt n'est pas entièrement indexé  

Bonne pratique :
- Définissez les noms de métriques sous forme de chaînes explicites lorsque cela est possible  

Exemple :

Envoi d'une métrique à l'aide d'une variable (non recommandé)

```java
public static final String METRIC_NAME = "my.metric.name";
statsEmitter.distribution(METRIC_NAME, value, tags);
```

Envoi d'une métrique sous forme de chaîne explicite (recommandé) :

```java
timer = meterRegistry.timer("my.metric.name");
```

Pour garantir une couverture complète du code source de votre métrique, assurez-vous d'avoir installé l'intégration Datadog [GitHub][36], [GitLab][37] ou [Azure DevOps][38] et que tous vos [dépôts][39] sont connectés.

### Tableau des tags {#tags-table}

Le tableau des tags vous permet d'explorer de plusieurs façons toutes les clés et toutes les valeurs des tags qui sont activement transmises dans les données de votre métrique.

Grâce au tableau des tags, vous pouvez accomplir les actions suivantes :

- Triez les clés de tag par la colonne {{< ui >}}Count{{< /ui >}} (nombre de valeurs de tag uniques).
- Recherchez une clé de tag particulière dans le tableau paginé des tags.
- Exportez le tableau des tags sous forme de fichier CSV téléchargeable.
- Basculez entre les tags que vous avez configurés sur votre métrique et les tags soumis à l'origine pour la métrique

Pour chaque clé de tag spécifique, vous pouvez également effectuer les opérations suivantes :

- Inspectez toutes les valeurs de tag de cette clé de tag.
- Utilisez un tag spécifique `key:value` pour filtrer davantage la liste des métriques affichées sur la page Metrics Summary.
- Ouvrez un graphique de cette métrique filtré par votre paire `key:value` de tags dans Metrics Explorer.
- Copiez n'importe quel tag `key:value` pour filtrer dans l'ensemble de l'application.

{{< img src="metrics/summary/updated_tags_table.mp4" alt="Tableau des tags" video=true style="width:75%;">}}

[En savoir plus sur le tagging][5].

### Ressources associées aux métriques {#metrics-related-assets}

{{< img src="metrics/summary/related_assets_dashboards_08_05_2025.png" alt="Ressources associées pour un nom de métrique spécifié" style="width:80%;">}}

Pour déterminer la valeur de n'importe quel nom de métrique pour votre organisation, utilisez les Ressources associées aux métriques. Les ressources associées aux métriques désignent tout dashboard, notebook, monitor ou SLO qui interroge une métrique particulière. 

1. Faites défiler jusqu'au bas du panneau latéral des détails de la métrique vers la section {{< ui >}}Related Assets{{< /ui >}}.
2. Cliquez sur le bouton déroulant pour afficher le type de ressource associée qui vous intéresse (tableaux de bord, monitors, notebooks, SLO). Vous pouvez également utiliser la barre de recherche pour valider des ressources spécifiques.
3. La colonne {{< ui >}}Tags{{< /ui >}} indique exactement quelles balises sont utilisées dans chaque ressource.
   
## Custom Metrics Tags Cardinality Explorer {#custom-metrics-tags-cardinality-explorer}

{{< img src="metrics/tagsexplorer.png" alt="Custom Metrics Tags Cardinality Explorer pour un nom de métrique en pic" style="width:80%;">}}
Pour déterminer pourquoi un nom de métrique particulier émet un grand nombre de métriques personnalisées, ou présente un pic, utilisez Custom Metrics Tags Cardinality Explorer. Cela vous aide à identifier les clés de tags à l'origine du pic, que vous pouvez immédiatement exclure en utilisant Metrics without Limits™ pour réaliser des économies.

## Metrics without Limits™ {#metrics-without-limits}
Metrics without Limits™ vous permet de contrôler la taille de vos métriques personnalisées sans nécessiter de modifications au niveau de l'agent ou du code. 

**Remarque** : Metrics without Limits™ est uniquement disponible pour les métriques personnalisées.

Vous pouvez [configurer des balises en masse](#configuration-of-multiple-metrics) en accédant à {{< ui >}}Configure Metrics{{< /ui >}} > {{< ui >}}Manage tags{{< /ui >}} sur la [page Métriques][34], ou en cliquant sur le bouton {{< ui >}}Manage Tags{{< /ui >}} dans le panneau latéral des détails d'une métrique. 

{{< img src="metrics/distributions/managetags.png" alt="Configuration des balises sur une distribution" style="width:80%;">}}

1. Cliquez sur le nom de votre métrique de distribution personnalisée dans le tableau {{< ui >}}Metrics Summary{{< /ui >}} pour ouvrir le panneau latéral des détails des métriques.
2. Cliquez sur le bouton {{< ui >}}Manage Tags{{< /ui >}} pour ouvrir la modale de configuration des tags.
3. Sélectionnez {{< ui >}}Include tags...{{< /ui >}} ou {{< ui >}}Exclude tags...{{< /ui >}} pour personnaliser les tags que vous souhaitez ou ne souhaitez pas interroger. Pour plus d'informations sur la configuration des tags, consultez la documentation [Metrics without Limits][10].
4. Prévisualisez les effets de votre configuration de tags proposée avec l'estimateur de cardinalité avant de sélectionner {{< ui >}}Save{{< /ui >}}.

**Remarque** : L'estimateur de cardinalité nécessite que la métrique date de plus de 48 heures.

### Tags interrogeables {#queryable-tags}

Une fois votre métrique configurée avec Metrics without Limits™, vous pouvez voir quels tags restent interrogeables, c'est-à-dire ceux qui contribuent au volume d'_Indexed Custom Metrics_. Et vous pouvez revenir à tous les tags initialement soumis et ingérés qui contribuent à votre volume d'_Ingested Custom Metrics_. 

### Définitions de l'origine des métriques {#metric-origin-definitions}

Ce tableau présente la correspondance entre l'origine de la métrique telle qu'elle apparaît dans la facette et sa source d'envoi :

| Origine de la métrique           | Envoyé depuis                                                                |
| ------------------------| ----------------------------------------------------------------------------- |
| API Catalog             | Séries temporelles envoyées par le produit [API Catalog][13] de Datadog depuis l'endpoint APIM.
| APM                     | Séries temporelles envoyées par le produit Datadog APM pour les métriques générées à partir de traces et de métriques de span.
| Agent                   | Séries temporelles envoyées par le Datadog Agent, collectées à partir des [Agent integrations][10], des [built-in integrations][9], de [DogStatsD][32] ou des [custom Agent checks][33].
| Cloud Security                     | Séries temporelles envoyées par le produit [Cloud Security][14] de Datadog.
| Cloud Integrations      | Séries temporelles collectées auprès de fournisseurs cloud comme AWS, Azure et Google Cloud, etc., à partir de leurs intégrations respectives. 
| DBM                     | Séries temporelles envoyées par le produit [Database Monitoring][15] de Datadog, incluant des informations sur les activités/requêtes/verrous MySQL, Oracle et Postgres.
| DSM                     | Séries temporelles envoyées par le produit [Data Streams Monitoring][16] de Datadog, pour les métriques générées à partir des spans et traces DSM.
| Datadog Exporter        | Séries temporelles envoyées par le [OpenTelemetry Collector][17] ou par le [Datadog Exporter][18].
| Datadog Platform        | Séries temporelles envoyées par l'ingestion de métriques qui sont utilisées pour [signaler l'utilisation des métriques][11].
| Events                  | Séries temporelles générées à partir de la Datadog Events platform.
| Agent Observability       | Séries temporelles émises par le produit Agent Observability utilisant le `lmobs_to_metrics` service.
| Logs                    | Séries temporelles générées à partir de la plateforme [Logs][28] de Datadog.
| Metrics API             | Séries temporelles envoyées via le [OTLP Ingestion endpoint][21] de Datadog et le récepteur OTel avec des équivalents d'intégration Datadog ou des points pour les métriques d'utilisation estimées ou le Datadog API Client.
| CNM                     | Séries temporelles envoyées par le produit [Cloud Network Monitoring][19] de Datadog.
| Observability Pipelines | Séries temporelles envoyées par le produit [Observability Pipelines][20] de Datadog, incluant les métriques d'erreur et de performance.
| Autre                   | Séries temporelles qui n'ont pas d'équivalent d'intégration DD.
| Processes               | Séries temporelles générées à partir du produit [Processes][22] de Datadog.
| RUM                     | Séries temporelles générées à partir du produit [Real User Monitoring][23] de Datadog.
| SAAS Integrations       | Séries temporelles collectées à partir de plateformes SaaS populaires telles que Slack, Docker, PagerDuty, etc.
| Serverless              | Séries temporelles envoyées par la plateforme [Serverless][24] de Datadog, incluant les métriques de Function, App Services, Cloud Run et Container App Metrics.
| Catalog         | Séries temporelles envoyées par le produit [Catalog][25] de Datadog, incluant les métriques [Scorecard][29].
| Synthetic Monitoring    | Métriques de surveillance synthétique et de tests continus générées à partir du produit [Synthetic Monitoring][26] de Datadog. 
| USM                     | Séries temporelles générées à partir du produit [Universal Service Monitoring][27] de Datadog. 

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: /fr/metrics/metrics-without-limits
[1]: https://app.datadoghq.com/metric/summary
[2]: /fr/metrics/explorer/
[3]: /fr/dashboards/
[4]: /fr/metrics/custom_metrics/
[5]: /fr/getting_started/tagging/
[6]: /fr/api/v1/metrics/#edit-metric-metadata
[7]: /fr/metrics/units/
[8]: /fr/metrics/types/
[9]: /fr/integrations/
[10]: /fr/integrations/agent_metrics/
[11]: /fr/account_management/billing/usage_metrics/
[12]: /fr/metrics/summary/#metric-origin-definitions
[13]: /fr/internal_developer_portal/catalog/endpoints/
[14]: /fr/security/cloud_security_management/
[15]: /fr/database_monitoring/
[16]: /fr/data_streams/
[17]: /fr/opentelemetry/setup/collector_exporter/
[18]: /fr/opentelemetry/collector_exporter/
[19]: /fr/network_monitoring/cloud_network_monitoring/
[20]: /fr/observability_pipelines/
[21]: /fr/opentelemetry/setup/otlp_ingest_in_the_agent/
[22]: /fr/integrations/process/
[23]: /fr/monitors/types/real_user_monitoring/
[24]: /fr/serverless/
[25]: /fr/internal_developer_portal/catalog/
[26]: /fr/synthetics/
[27]: /fr/universal_service_monitoring/
[28]: /fr/logs/
[29]: /fr/internal_developer_portal/scorecards/
[30]: /fr/metrics/custom_metrics/historical_metrics/#bulk-configuration-for-multiple-metrics
[31]: /fr/metrics/distributions/#bulk-configuration-for-multiple-metrics
[32]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[33]: /fr/metrics/custom_metrics/agent_metrics_submission/
[34]: https://app.datadoghq.com/metric/overview
[35]: https://app.datadoghq.com/integrations?category=Source%20Control
[36]: https://app.datadoghq.com/integrations/github/configuration
[37]: https://app.datadoghq.com/integrations/gitlab-source-code
[38]: https://app.datadoghq.com/integrations/azure-devops-source-code?subPath=configuration
[39]: https://app.datadoghq.com/source-code/repositories
[40]: https://www.datadoghq.com/product-preview/metrics-source-code-attribution/