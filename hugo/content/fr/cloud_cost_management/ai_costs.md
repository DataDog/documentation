---
description: Obtenez une visibilité unifiée sur les dépenses liées à l'IA chez tous
  les fournisseurs, normalisez les données de coûts et attribuez l'utilisation aux
  utilisateurs et aux équipes.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/saas_costs
  tag: Documentation
  text: Coûts SaaS et IA
- link: /cloud_cost_management/allocation/custom_allocation_rules
  tag: Documentation
  text: Règles d'allocation personnalisées
- link: /cloud_cost_management/allocation/tag_pipelines
  tag: Documentation
  text: Pipelines de tags
- link: /cloud_cost_management/reporting
  tag: Documentation
  text: Rapports
- link: /cloud_cost_management/cost_changes/monitors
  tag: Documentation
  text: Monitors Cloud Cost
- link: /cloud_cost_management/planning/budgets
  tag: Documentation
  text: Budgets
- link: /cloud_cost_management/planning/forecasting
  tag: Documentation
  text: Prévisions
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: Blog
  text: Répartissez les coûts de l'IA entre les fournisseurs avec Datadog Cloud Cost
    Management
- link: https://www.datadoghq.com/blog/making-agentic-token-costs-visible-in-production/
  tag: Blog
  text: Rendre visibles les coûts des jetons agentiques en production
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: Blog
  text: Répondez plus rapidement à toute question sur les coûts avec la compétence
    Cloud Cost dans Bits Chat
- link: https://www.datadoghq.com/blog/how-datadog-saves-money-by-optimizing-ai-usage/
  tag: Blog
  text: Comment Datadog économise plus d'un million de dollars chaque mois en optimisant
    l'utilisation de l'IA
- link: https://www.datadoghq.com/blog/federal-agencies-ai-spend-cloud-cost-management/
  tag: Blog
  text: 'Au-delà de l''ère de l''IA à 1 $ : comment les agences fédérales peuvent
    constituer les preuves pour les renouvellements de l''exercice 2027'
- link: https://www.datadoghq.com/blog/cursor-cloud-cost-management/
  tag: Blog
  text: Gérez les coûts de Cursor avec Datadog Cloud Cost Management
title: Coûts de l'IA
---
## Présentation {#overview}

Les coûts de l'IA dans Cloud Cost Management offrent aux équipes FinOps et d'ingénierie une destination unifiée pour analyser les dépenses liées à l'IA chez les fournisseurs, notamment Amazon Bedrock, Anthropic, Google Gemini, OpenAI, Vertex AI, GitHub Copilot et Cursor. Visualisez les dépenses totales liées à l'IA parallèlement à vos coûts d'infrastructure cloud existants, analysez-les avec des balises normalisées, suivez les anomalies de coûts, identifiez les opportunités d'optimisation et attribuez l'utilisation aux utilisateurs et aux clés d'API spécifiques qui en sont à l'origine.

## Prérequis {#prerequisites}

Pour utiliser les coûts de l'IA, vous devez avoir configuré au moins l'un des fournisseurs pris en charge suivants pour [Cloud Cost Management][1] :

| Fournisseur d'IA | Méthode de configuration |
|---|---|
| Amazon Bedrock | [Intégration AWS][2] |
| Amazon SageMaker | [Intégration AWS][2] |
| Anthropic   | [Intégration SaaS][3] |
| Azure Foundry   | [Intégration Azure][18] |
| Google Gemini  | [Intégration Google Cloud][4] |
| OpenAI     | [Intégration SaaS][5] |
| Vertex AI  | [Intégration Google Cloud][4] |
| GitHub Copilot | [GitHub Copilot][15] |
| Cursor | [Cursor][16] |

## Résumé des coûts IA {#ai-cost-summary}

Après avoir connecté vos fournisseurs d'IA, accédez à [**Cloud Cost** > **Summarize** > **AI**][6] pour afficher la page de résumé des coûts IA.

{{< img src="cloud_cost/ai_costs/ccm-ai-costs-overview.png" alt="Le dashboard de résumé des coûts IA, affichant les tendances des dépenses quotidiennes sur une période d'un mois, une liste des principaux facteurs de dépenses et un graphique des anomalies." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

La page de résumé des coûts IA fournit :

- **Coût total de l'IA** : coût IA agrégé et variation des coûts sur la période sélectionnée.
- **Coût quotidien de l'IA** : tendances des coûts quotidiens chez les fournisseurs sélectionnés sur la période sélectionnée. Utilisez la liste déroulante **Filter to** pour définir quels fournisseurs apparaissent dans le graphique.
- **Principaux facteurs de coût** : les modèles, projets, services et utilisateurs générant le plus de dépenses.
- **Anomalies de coût IA actives** : [anomalies][7] de coût détectées de manière proactive chez tous les fournisseurs connectés. Sélectionnez une anomalie pour ouvrir un panneau latéral contenant plus de détails et d'options pour une action ultérieure.
- **Recommandations de coût de l'IA** : [recommandations][17] de coût et opportunités d'optimisation détectées chez tous les fournisseurs connectés. Sélectionnez une recommandation pour ouvrir un panneau latéral contenant plus de détails et d'options pour une action ultérieure.
- **dashboards de coût de l'IA** : modèles de dashboards prêts à l'emploi pour chaque fournisseur pris en charge, combinant les données de coûts avec des signaux d'utilisation tels que la consommation de jetons, la répartition des modèles et les analyses des utilisateurs.

## Balises IA normalisées {#normalized-ai-tags}

Les données de coût de l'IA de tous les fournisseurs pris en charge sont normalisées selon un ensemble cohérent de balises. Utilisez ces balises pour filtrer, regrouper, comparer et planifier les dépenses de l'IA dans les dashboards, [monitors][8], [budgets][9], [prévisions][10] et autres outils Datadog. Utilisez [Cloud Cost Explorer][11] pour interroger et comparer les dépenses entre les fournisseurs sans avoir à écrire de logique spécifique par fournisseur.

Les balises suivantes sont disponibles pour tous les fournisseurs d'IA pris en charge :

| Nom de la balise&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description de la balise |
|---|---|
| `providername` | Le fournisseur d'IA. |
| `model` | L'identifiant du modèle d'IA (par exemple, `claude-opus-4-6`, `gpt-4.1`). |
| `model_name` | Le nom du modèle lisible par l'homme (par exemple, `Claude Opus 4.6`). |
| `token_direction` | Si les jetons sont consommés (entrée) ou générés (sortie) au sein d'un service ou d'une application. |
| `token_category` | La catégorie spécifique de jetons consommés, telle que les jetons d'entrée, les jetons de sortie ou les jetons liés aux opérations de mise en cache et de recherche (par exemple, `cached input`, `cache write`, `standard input`, `output`). |
| `project` | Le projet, l'espace de travail ou l'environnement auquel appartiennent les coûts d'IA. |

## Attribuer les dépenses d'IA aux sources {#attribute-ai-spend-to-sources}

[Les règles d'allocation prêtes à l'emploi (OOTB)][12] utilisent les données d'observabilité Datadog pour attribuer les coûts d'IA aux utilisateurs, aux clés d'API et aux autres sources qui les ont générés. Les règles d'allocation OOTB ne nécessitent aucune configuration et sont disponibles pour Anthropic et OpenAI. L'allocation au niveau de l'utilisateur est également prise en charge pour Cursor.


Les balises suivantes sont disponibles via les règles d'allocation OOTB :

{{< tabs >}}
{{% tab "Anthropic" %}}

- `api_key_id`
- `api_key_name`
- `context_window`
- `model`
- `model_id`
- `org_id`
- `org_name`
- `service_tier`
- `user_email`
- `user_id`
- `user_name`
- `workspace_id`
- `workspace_name`

{{% /tab %}}
{{% tab "OpenAI" %}}

- `account_id`
- `account_name`
- `api_key_id`
- `batch`
- `endpoint`
- `model`
- `org_id`
- `project_id`
- `project_name`
- `user_email`
- `user_id`

{{% /tab %}}
{{< /tabs >}}

Configurez les [Tag Pipelines][13] pour mapper les balises OOTB (telles que `user_email`) aux équipes, services ou unités commerciales pour des rapports agrégés :

{{< img src="cloud_cost/ai_costs/ccm-tag-pipeline-ai-costs.png" alt="La page de configuration des règles de Tag Pipelines, affichant les valeurs user_email mappées aux valeurs d'équipe via une tableau de référence existant, ainsi que des options de mappage de balises supplémentaires." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Après le mappage, les dépenses attribuées apparaissent dans les dashboards spécifiques au fournisseur et dans les [Cost Reports][14] :

{{< img src="cloud_cost/ai_costs/ccm-anthropic-ai-cost-reporting.png" alt="Un dashboard spécifique au fournisseur avec un graphique à barres empilées montrant les dépenses quotidiennes du fournisseur attribuées par équipe et par nom de modèle, ainsi qu'une liste récapitulative des attributions de dépenses." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/
[2]: /fr/cloud_cost_management/setup/aws
[3]: /fr/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts
[4]: /fr/cloud_cost_management/setup/google_cloud
[5]: /fr/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[6]: https://app.datadoghq.com/cost/summarize/ai-costs
[7]: /fr/cloud_cost_management/cost_changes/anomalies/
[8]: /fr/cloud_cost_management/cost_changes/monitors
[9]: /fr/cloud_cost_management/planning/budgets
[10]: /fr/cloud_cost_management/planning/forecasting
[11]: https://app.datadoghq.com/cost/explorer
[12]: /fr/cloud_cost_management/allocation/custom_allocation_rules/?tab=even
[13]: /fr/cloud_cost_management/allocation/tag_pipelines
[14]: /fr/cloud_cost_management/reporting
[15]: /fr/cloud_cost_management/setup/saas_costs/?tab=github#configure-your-saas-accounts
[16]: /fr/cloud_cost_management/setup/saas_costs/?tab=cursor#configure-your-saas-accounts
[17]: /fr/cloud_cost_management/recommendations
[18]: /fr/cloud_cost_management/setup/azure/?tab=terraform