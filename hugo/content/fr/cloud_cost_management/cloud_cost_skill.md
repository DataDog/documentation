---
algolia:
  rank: 75
  tags:
  - cloud cost
  - cloud cost management
  - ccm
  - finops
  - cloud cost skill
  - savings analysis
  - savings opportunities
  - bits ai assistant
  - bits assistant
  - mcp
description: Utilisez la compétence Cloud Cost dans Bits Chat pour examiner, expliquer
  et partager les conclusions sur les coûts cloud, et pour trouver des opportunités
  d'économies.
further_reading:
- link: /bits_ai/bits_chat/
  tag: Documentation
  text: Bits Chat
- link: /mcp_server/
  tag: Documentation
  text: Datadog MCP Server
- link: /cloud_cost_management/reporting/explorer/
  tag: Documentation
  text: Cost Explorer
- link: /cloud_cost_management/planning/budgets/
  tag: Documentation
  text: Budgets
- link: /cloud_cost_management/recommendations/
  tag: Documentation
  text: Cloud Cost Recommendations
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: Blog
  text: Répondez plus rapidement à toute question sur les coûts avec la compétence
    Cloud Cost dans Bits Chat
title: Cloud Cost Skill dans Bits Chat
---
## Présentation {#overview}

La compétence Cloud Cost est le workflow d'analyse de Cloud Cost Management dans [Bits Chat][1]. Elle est conçue pour les tâches FinOps, telles que l'analyse des causes profondes, le suivi des budgets, la recherche d'économies et la réponse aux questions générales sur les coûts. Par exemple, vous pouvez demander à Bits Chat de :

- Examiner les [alertes de monitor de coûts][2], les [anomalies de coûts][3] et les [changements de coûts][4]
- Identifier les équipes, services, comptes, régions ou ressources qui génèrent des dépenses
- Répondre à des questions ponctuelles sur les coûts cloud, SaaS, personnalisés ou Datadog
- Comparer les dépenses réelles et les prévisions par rapport aux [budgets][5]
- Trouver des opportunités d'économies dans une équipe, un service ou un autre périmètre, chacune avec un responsable, des économies estimées et des preuves à l'appui
- Corréler les changements de coûts avec des métriques d'observabilité, telles que le CPU, la mémoire, le volume de requêtes ou la taille du stockage
- Créer des [Notebooks][15] qui consignent une investigation en vue de sa transmission ou d'une consultation ultérieure

## Prérequis {#prerequisites}

Pour utiliser la compétence Cloud Cost dans Bits Chat, vous devez :

- [Configurer Cloud Cost Management][6] pour les sources de coûts que vous souhaitez analyser
- Avoir ces autorisations :
  - Autorisation [Bits Chat Access][7]
  - Autorisations [Cloud Cost Management permissions][8] pour les données sur lesquelles vous posez des questions
  - (Facultatif) [Autorisations relatives aux notebooks][9], si vous souhaitez créer ou modifier des [Notebooks][15] d'investigation

## Démarrer une investigation avec la compétence Cloud Cost {#start-an-investigation-with-the-cloud-cost-skill}

{{< img src="cloud_cost/cc_skill_anomalies.png" alt="Graphiques d'anomalies de coûts montrant le bouton Investigate with Bits AI dans chaque graphique." style="width:80%;" >}}

Lorsque vous souhaitez démarrer une investigation, par exemple pour une [anomalie de coût][3], cliquez sur {{< ui >}}Investigate{{< /ui >}} ou {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (l'icône des étoiles scintillantes) pour ouvrir la compétence Cloud Cost.

Alternativement, vous pouvez cliquer sur {{< ui >}}Ask Bits{{< /ui >}} en haut à droite de la barre de navigation sur n'importe quelle page Datadog pour ouvrir Bits Chat et poser une question sur les coûts.

Pour trouver des opportunités d'économies, cliquez sur {{< ui >}}Optimize{{< /ui >}} sur la page [Cloud Cost Recommendations][17]. Pour plus d'informations, consultez la section [Analyse des économies](#savings-analysis).

Exemples de prompts :

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which teams are responsible for the highest S3 storage costs this month?`
- `Why is the infrastructure budget projected to go over this month?`
- `Show total cloud cost by provider for the last 30 complete days.`
- `Find savings opportunities for team:payments.`

### Investigations sur les variations de coûts {#cost-change-investigations}

Lorsque vous enquêtez sur une variation de coût avec la compétence Cloud Cost, Bits Chat fournit un résumé concis, puis vous demande ce que vous souhaitez explorer ensuite. L'analyse initiale comprend généralement :

- Un graphique des coûts quotidiens pour les périodes de référence et d'investigation
- La période de référence, la période d'investigation, le montant total en dollars et le pourcentage de variation, ainsi que l'impact annuel projeté le cas échéant
- Des éléments de contexte sur les tarifs et l'utilisation pour aider à distinguer les variations de prix des variations de consommation
- Une attribution par propriétaire ou par équipe basée sur vos tags de coût

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Résumé de l'enquête de Bits Chat montrant une analyse initiale." style="width:60%;" >}}

Après le résumé initial, Bits Chat peut :

- Trouver les principaux services, comptes, régions, ressources ou tags à l'origine du changement
- Corréler la variation de coût avec des métriques telles que les requêtes CPU, les requêtes mémoire, le nombre de requêtes, la taille des buckets ou l'utilisation de la base de données
- Trouver les budgets associés et comparer les dépenses réelles ou prévues aux objectifs des budgets
- Créer un notebook Datadog pour que l'équipe responsable du service puisse confirmer les résultats et agir en conséquence
- Consigner l'investigation dans un notebook pour vos archives

### Budgets et prévisions {#budgets-and-forecasting}

Après avoir configuré [Budgets][5], utilisez la compétence Cloud Cost dans Bits Chat pour expliquer l'état du budget et les dépenses. Bits Chat peut aider à résumer :

- Dépenses réelles par rapport au montant du budget
- Dépenses prévues par rapport au montant du budget
- Quel périmètre de coût un budget couvre, en fonction des filtres du budget
- Quels postes du budget, équipes, services ou fournisseurs contribuent à un dépassement

Après le résumé initial, Bits Chat peut :

- Trouver les principaux services, comptes, régions, ressources ou tags à l'origine des dépenses
- Identifier les équipes responsables des ressources contribuant à la variation des coûts
- Mettre à jour votre budget
- Consigner l'investigation dans un notebook pour vos archives

### Analyse des économies {#savings-analysis}

Demandez à Bits Chat de trouver des opportunités d'économies au sein d'une équipe, d'un service ou d'un autre périmètre, ou cliquez sur {{< ui >}}Optimize{{< /ui >}} dans la barre de filtre de la page [Cloud Cost Recommendations][17]. Bits Chat examine les données de coût et d'utilisation du périmètre, puis résume les opportunités d'économies qu'il identifie. Le résumé comprend généralement :

- Le coût annuel actuel du périmètre et le total des économies annuelles estimées
- Un tableau des opportunités d'économies, chacune avec une équipe responsable, les économies annuelles estimées et les évaluations **Effort**, **Risk** et **Confidence**
- Éléments de travail [Work Management][18] existants, tickets Jira et Cloud Cost Recommendations associés pour le périmètre

Après le résumé initial, Bits Chat peut :

- Expliquer les éléments justifiant chaque opportunité d'économie
- Créer un élément de travail ou un [notebook][15] avec une description détaillée pour chaque équipe responsable
- Afficher les descriptions complètes dans la conversation

## Utilisez le Datadog MCP Server pour l'analyse des coûts {#use-the-datadog-mcp-server-for-cost-analysis}

Le [Datadog MCP Server][10] permet aux agents IA externes d'interroger les données Datadog. Ceci est utile lorsque vous souhaitez poser des questions sur les coûts depuis un IDE, un assistant basé sur un terminal ou un workflow IA personnalisé.

Pour utiliser un agent IA externe, [configurez le Datadog MCP Server][11]. Si votre client MCP filtre les ensembles d'outils, vous devez activer l'ensemble d'outils pertinent avant que l'agent puisse appeler ses outils :

- Activez l'ensemble d'outils `cost` pour lister les recommandations d'économies avec [`cost_recommendations`][16].
- Activez l'ensemble d'outils `core` pour interroger les métriques de Cloud Cost Management avec les outils de métriques.

### Lister les recommandations d'économies {#list-cost-saving-recommendations}

L'ensemble d'outils `cost` fournit l'outil [`cost_recommendations`][16], qui liste les recommandations d'économies de votre organisation classées par économies quotidiennes potentielles estimées (les plus élevées en premier). Il prend en charge le filtrage par fournisseur cloud, type de recommandation, statut, seuil d'économie et tags de ressources. Cet outil nécessite l'autorisation `Cloud Cost Management Read`.

Exemples d'invites pour l'ensemble d'outils `cost` :

- `What are my top cloud cost-saving recommendations?`
- `How much could I save per day, and how many open recommendations do I have?`
- `Show me open AWS recommendations for my Kubernetes clusters.`

### Interroger les métriques de Cloud Cost Management {#query-cloud-cost-management-metrics}

L'ensemble d'outils `core` fournit les outils de métriques qui peuvent interroger les données de Cloud Cost Management :

| Outil MCP                          | Utilisation                                 |
| --------------------------------- | ------------------------------------- |
| [`get_datadog_metric`][12]         | Interrogez les métriques de coût, comparez les périodes et regroupez les coûts par fournisseur, service, équipe, compte, ressource ou tag. |
| [`get_datadog_metric_context`][13] | Découvrez les métadonnées, les clés de tag disponibles et les valeurs de tag pour une métrique de coût avant de l'interroger.               |

Demandez à votre agent de définir `use_cloud_cost` sur `true` pour les métriques Cloud Cost Management, telles que `all.cost`, `aws.cost.*`, `azure.cost.*`, `gcp.cost.*`, `oci.cost.*`, `custom.cost.*` ou `datadog.cost.*`. Pour les métriques d'observabilité qui expliquent une variation de coût, telles que le CPU Kubernetes ou la taille d'un bucket S3, utilisez le comportement de requête de métrique standard.

Exemples de prompts pour l'ensemble d'outils `core` :

- `Use Datadog MCP to query cloud cost data. Set use_cloud_cost=true and show daily all.cost grouped by provider for the last 30 complete days.`
- `Use get_datadog_metric_context with use_cloud_cost=true to find available tags for aws.cost.net.amortized.shared.resources.allocated, then group EC2 costs by team.`
- `Compare this week's complete EC2 cost to the previous week and explain which teams or accounts changed the most.`

Pour les instructions de connexion, les clients pris en charge et la configuration de l'ensemble d'outils, consultez [Configurer le Datadog MCP Server][11]. Pour la référence complète des outils MCP, consultez [Outils du Datadog MCP Server][14].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/bits_chat/
[2]: https://app.datadoghq.com/cost/monitor/monitors
[3]: https://app.datadoghq.com/cost/monitor/anomalies
[4]: https://app.datadoghq.com/cost/summarize/overview
[5]: https://app.datadoghq.com/cost/plan/budgets
[6]: /fr/cloud_cost_management/setup/
[7]: /fr/account_management/rbac/permissions/#bits-assistant
[8]: /fr/cloud_cost_management/setup/permissions/
[9]: /fr/account_management/rbac/permissions/#notebooks
[10]: /fr/mcp_server/
[11]: /fr/mcp_server/setup/
[12]: /fr/mcp_server/tools/#get_datadog_metric
[13]: /fr/mcp_server/tools/#get_datadog_metric_context
[14]: /fr/mcp_server/tools/
[15]: /fr/notebooks/
[16]: /fr/mcp_server/tools/#cost_recommendations
[17]: https://app.datadoghq.com/cost/optimize/recommendations
[18]: /fr/incident_response/work_management/