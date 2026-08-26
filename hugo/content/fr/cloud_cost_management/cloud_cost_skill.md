---
algolia:
  rank: 75
  tags:
  - cloud cost
  - cloud cost management
  - ccm
  - finops
  - cloud cost skill
  - bits ai assistant
  - bits assistant
  - mcp
description: Utilisez la Cloud Cost skill dans Bits Chat pour enquêter, expliquer
  et partager les constats sur les coûts cloud.
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
title: Cloud Cost Skill in Bits Chat
---
## Aperçu {#overview}

La Cloud Cost skill est le workflow d'analyse de Cloud Cost Management dans [Bits Chat][1]. Elle est conçue pour les tâches FinOps, telles que l'analyse des causes profondes, le suivi des budgets et la réponse aux questions générales sur les coûts. Par exemple, vous pouvez demander à Bits Chat de :

- Enquêter sur [les alertes de surveillance des coûts][2], [les anomalies de coûts][3] et [les changements de coûts][4]
- Identifier les équipes, services, comptes, régions ou ressources générant des dépenses
- Répondre à des questions ad hoc sur les coûts cloud, SaaS, personnalisés ou Datadog
- Comparer les dépenses réelles et les prévisions par rapport aux [budgets][5]
- Corréler les changements de coûts avec des métriques d'observabilité, telles que le CPU, la mémoire, le volume de requêtes ou la taille de stockage.
- Créer des [Notebooks][15] qui capturent une enquête pour transmission ou référence future.

## Prérequis {#prerequisites}

Pour utiliser la Cloud Cost skill dans Bits Chat, vous devez :

- [Set up Cloud Cost Management][6] pour les sources de coûts que vous souhaitez analyser
- Avoir ces autorisations :
  - [Bits Chat Access][7] permission
  - [Cloud Cost Management permissions][8] for the data you ask about
  - (Optionnel) [Notebook permissions][9], si vous souhaitez créer ou modifier les [Notebooks][15] d'investigation

## Commencez une enquête avec la Cloud Cost skill {#start-an-investigation-with-the-cloud-cost-skill}

{{< img src="cloud_cost/cc_skill_anomalies.png" alt="Graphiques des anomalies de coût montrant le bouton Investiguer avec Bits AI dans chaque graphique." style="width:80%;" >}}

Lorsque vous souhaitez commencer une enquête, par exemple pour une [anomalie de coût][3], cliquez sur {{< ui >}}Investigate{{< /ui >}} ou {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (l'icône des étoiles scintillantes) pour ouvrir la Cloud Cost skill.

Alternativement, vous pouvez cliquer sur {{< ui >}}Ask Bits{{< /ui >}} en haut à droite de la barre de navigation sur n'importe quelle page Datadog pour ouvrir Bits Chat et poser une question sur les coûts.

Exemples de demandes :

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which teams are responsible for the highest S3 storage costs this month?`
- `Why is the infrastructure budget projected to go over this month?`
- `Show total cloud cost by provider for the last 30 complete days.`
- `Find optimization opportunities for idle or over-provisioned cloud infrastructure.`

### Enquêtes sur les changements de coût {#cost-change-investigations}

Lorsque vous enquêtez sur un changement de coût avec la Cloud Cost skill, Bits Chat fournit un résumé concis, puis demande ce que vous souhaitez explorer ensuite. L'analyse initiale comprend généralement :

- Un graphique des coûts quotidiens pour les périodes de référence et d'enquête
- La période de référence, la période d'enquête, le montant total en dollars et le pourcentage de changement, ainsi que l'impact annuel projeté le cas échéant
- Contexte tarifaire par rapport à l'utilisation pour aider à distinguer les changements de prix des changements de consommation
- Attribution du propriétaire ou de l'équipe basée sur vos étiquettes de coût

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Résumé de l'enquête de Bits Chat montrant une analyse initiale." style="width:60%;" >}}

Après le résumé initial, Bits Chat peut :

- Trouver les principaux services, comptes, régions, ressources ou étiquettes à l'origine du changement
- Corrélez le changement de coût avec des métriques telles que les requêtes CPU, les requêtes mémoire, le nombre de requêtes, la taille du bucket ou l'utilisation de la base de données
- Trouvez des budgets connexes et comparez les dépenses réelles ou prévisionnelles par rapport aux objectifs budgétaires
- Créez un Datadog Notebook pour l'équipe qui possède le service afin de confirmer et d'agir sur les résultats.
- Capturez l'enquête pour vos dossiers dans un Notebook

### Budgets et prévisions {#budgets-and-forecasting}

Après avoir configuré [Budgets][5], utilisez la compétence Cloud Cost dans Bits Chat pour expliquer l'état du budget et les dépenses. Bits Chat peut aider à résumer :

- Dépenses réelles par rapport au montant budgété
- Dépenses prévues par rapport au montant budgété
- Quel périmètre de coût un budget couvre, en fonction des filtres du budget
- Quelles entrées de budget, équipes, services ou fournisseurs contribuent à un dépassement

Après le résumé initial, Bits Chat peut :

- Trouvez les principaux services, comptes, régions, ressources ou étiquettes qui entraînent des dépenses
- Identifiez les équipes qui possèdent les ressources contribuant au changement de coût
- Mettez à jour votre budget
- Capturez l'enquête pour vos dossiers dans un Notebook

## Utilisez le Datadog MCP Server pour l'analyse des coûts {#use-the-datadog-mcp-server-for-cost-analysis}

Le [Datadog MCP Server][10] permet aux agents IA externes d'interroger les données Datadog. Ceci est utile lorsque vous souhaitez poser des questions sur les coûts depuis un IDE, un assistant basé sur terminal ou un flux de travail IA personnalisé.

Pour utiliser un agent IA externe, [set up the Datadog MCP Server][11]. Si votre client MCP filtre les toolsets, incluez le toolset `core` pour utiliser les outils de métriques qui peuvent interroger les données de Cloud Cost Management.

Les données de Cloud Cost Management sont disponibles via les outils de métriques principaux :

| MCP tool                          | Usage                                 |
| --------------------------------- | ------------------------------------- |
| [`get_datadog_metric`][12]         | Interrogez les métriques de coût, comparez les périodes et regroupez les coûts par fournisseur, service, équipe, compte, ressource ou étiquette. |
| [`get_datadog_metric_context`][13] | Découvrez les métadonnées, les clés d'étiquette disponibles et les valeurs d'étiquette pour une métrique de coût avant de l'interroger.               |

Demandez à votre agent de définir `use_cloud_cost` sur `true` pour les métriques de Cloud Cost Management, telles que `all.cost`, `aws.cost.*`, `azure.cost.*`, `gcp.cost.*`, `oci.cost.*`, `custom.cost.*` ou `datadog.cost.*`. Pour les métriques d'observabilité qui expliquent un changement de coût, telles que le CPU Kubernetes ou la taille du bucket S3, utilisez le comportement standard de requête de métriques.

Exemples de requêtes pour les agents connectés à MCP :

- `Use Datadog MCP to query cloud cost data. Set use_cloud_cost=true and show daily all.cost grouped by provider for the last 30 complete days.`
- `Use get_datadog_metric_context with use_cloud_cost=true to find available tags for aws.cost.net.amortized.shared.resources.allocated, then group EC2 costs by team.`
- `Compare this week's complete EC2 cost to the previous week and explain which teams or accounts changed the most.`

Pour les instructions de connexion, les clients pris en charge et la configuration de l'ensemble d'outils, consultez [Set Up the Datadog MCP Server][11]. Pour la référence complète des outils MCP, consultez [Datadog MCP Server Tools][14].

## Lectures complémentaires {#further-reading}

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