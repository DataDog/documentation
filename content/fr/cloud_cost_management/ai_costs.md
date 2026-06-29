---
description: Obtenez une visibilité unifiée sur les dépenses en IA à travers les fournisseurs,
  normalisez les données de coût et attribuez l'utilisation aux utilisateurs et aux
  équipes.
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
  text: Moniteurs de coûts cloud
- link: /cloud_cost_management/planning/budgets
  tag: Documentation
  text: Budgets
- link: /cloud_cost_management/planning/forecasting
  tag: Documentation
  text: Prévisions
title: Coûts de l'IA
---
## Aperçu {#overview}

Les coûts de l'IA dans la gestion des coûts cloud offrent aux équipes FinOps et d'ingénierie une destination unifiée pour analyser les dépenses en IA à travers les fournisseurs, y compris Amazon Bedrock, Anthropic, Google Gemini, OpenAI, Vertex AI, GitHub Copilot et Cursor. Consultez les dépenses totales en IA aux côtés de vos coûts d'infrastructure cloud existants, analysez-les avec des étiquettes normalisées, suivez les anomalies de coût et attribuez l'utilisation aux utilisateurs spécifiques et aux clés API qui les génèrent.

## Conditions préalables {#prerequisites}

Pour utiliser les coûts de l'IA, vous devez avoir au moins un des fournisseurs pris en charge configuré pour [Cloud Cost Management][1] :

| Fournisseur d'IA | Méthode de configuration |
|---|---|
| Amazon Bedrock | [AWS integration][2] |
| Anthropic   | [SaaS integration][3] |
| Google Gemini  | [Google Cloud integration][4] |
| OpenAI     | [SaaS integration][5] |
| Vertex AI  | [Google Cloud integration][4] |
| GitHub Copilot | [GitHub Copilot][15] |
| Cursor | [Cursor][16] |

## Résumé des coûts de l'IA {#ai-cost-summary}

Après avoir connecté vos fournisseurs d'IA, naviguez vers [**Cloud Cost** > **Summarize** > **AI**][6] pour voir la page de résumé des coûts de l'IA.

{{< img src="cloud_cost/ai_costs/ccm-ai-costs-overview.png" alt="Le tableau de bord de résumé des coûts de l'IA, montrant les tendances de dépenses quotidiennes sur une période d'un mois, une liste des principaux moteurs de dépenses et un graphique d'anomalies." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

La page de résumé des coûts de l'IA fournit :

- **Coût total de l'IA** : Coût agrégé de l'IA et changement de coût sur la période sélectionnée.
- **Coût quotidien de l'IA** : Tendances des coûts quotidiens parmi les fournisseurs sélectionnés sur la période choisie. Utilisez le menu déroulant **Filter to** pour définir quels fournisseurs apparaissent dans le graphique.
- **Principaux moteurs de coûts** : Les modèles, projets, services et utilisateurs générant le plus de dépenses.
- **Anomalies de coût de l'IA actives** : Anomalies de coût [anomalies][7] mises en évidence de manière proactive parmi tous les fournisseurs connectés. Sélectionnez une anomalie pour ouvrir un panneau latéral avec plus de détails et des options pour des actions supplémentaires.
- **Tableaux de bord des coûts de l'IA** : Modèles de tableaux de bord prêts à l'emploi pour chaque fournisseur pris en charge, combinant des données de coût avec des signaux d'utilisation tels que la consommation de jetons, la distribution des modèles et l'analyse des utilisateurs.

## Tags normalisés de l'IA {#normalized-ai-tags}

Les données de coût de l'IA de tous les fournisseurs pris en charge sont normalisées à un ensemble cohérent de tags. Utilisez ces tags pour filtrer, regrouper, comparer et planifier les dépenses en IA à travers les tableaux de bord, [monitors][8], [budgets][9], [forecasts][10] et d'autres outils Datadog. Utilisez [Cloud Cost Explorer][11] pour interroger et comparer les dépenses entre les fournisseurs sans écrire de logique par fournisseur.

Les tags suivants sont disponibles pour tous les fournisseurs d'IA pris en charge :

| Nom du tag&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Description du tag |
|---|---|
| `providername` | Le fournisseur d'IA. |
| `model` | L'identifiant du modèle d'IA (par exemple, `claude-opus-4-6`, `gpt-4.1`). |
| `model_name` | Le nom du modèle lisible par l'homme (par exemple, `Claude Opus 4.6`). |
| `token_direction` | Indique si des jetons sont consommés (entrée) ou générés (sortie) dans un service ou une application. |
| `token_category` | La catégorie spécifique de jetons consommés, tels que les jetons d'entrée, les jetons de sortie ou les jetons liés aux opérations de mise en cache et de recherche (par exemple, `cached input`, `cache write`, `standard input`, `output`). |
| `project` | Le projet, l'espace de travail ou l'environnement auquel appartiennent les coûts de l'IA. |

## Attribuer les dépenses de l'IA aux sources {#attribute-ai-spend-to-sources}

[Les règles d'allocation prêtes à l'emploi (OOTB)][12] utilisent les données d'observabilité de Datadog pour attribuer les coûts de l'IA aux utilisateurs, aux clés API et à d'autres sources qui les ont générés. Les règles d'allocation OOTB ne nécessitent aucune configuration et sont disponibles pour Anthropic et OpenAI.

Les tags suivants sont disponibles via les règles d'allocation OOTB :

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

Configurer [Tag Pipelines][13] pour mapper les balises OOTB (telles que `user_email`) aux équipes, services ou unités commerciales pour des rapports agrégés :

{{< img src="cloud_cost/ai_costs/ccm-tag-pipeline-ai-costs.png" alt="La page de configuration des règles des pipelines de balises, montrant les valeurs user_email mappées aux valeurs d'équipe via une table de référence existante, et d'autres options de mappage de balises." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Après le mappage, les dépenses attribuées apparaissent dans les tableaux de bord spécifiques au fournisseur et dans les [Cost Reports][14] :

{{< img src="cloud_cost/ai_costs/ccm-anthropic-ai-cost-reporting.png" alt="Un tableau de bord spécifique au fournisseur avec un graphique à barres empilées montrant les dépenses quotidiennes du fournisseur attribuées par équipe et nom de modèle, ainsi qu'une liste récapitulative des attributions de dépenses." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

## Lectures complémentaires {#further-reading}

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