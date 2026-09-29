---
aliases:
- /fr/dashboards/ddsql_editor/
- /fr/ddsql_editor/getting_started/
description: Interrogez les ressources d'infrastructure et les données de télémétrie
  à l'aide du langage naturel ou de la syntaxe DDSQL, avec prise en charge des tags
  en tant que colonnes de tableau.
further_reading:
- link: mcp_server
  tag: Documentation
  text: Datadog MCP Server
- link: ddsql_reference/ddsql_default
  tag: Documentation
  text: Référence DDSQL
- link: https://learn.datadoghq.com/courses/getting-started-ddsql-editor
  tag: Centre d'apprentissage
  text: Prise en main de l'éditeur DDSQL
- link: https://www.datadoghq.com/blog/metrics-natural-language-queries/
  tag: Blog
  text: Explorer les métriques Datadog avec des requêtes en langage naturel
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explorez vos données avec Sheets, l'éditeur DDSQL et les Notebooks pour une
    analyse avancée dans Datadog
title: Éditeur DDSQL
---
{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="Sources de données avancées">}}
Si vous souhaitez interroger des sources de données non encore disponibles, utilisez le formulaire suivant pour soumettre votre demande. Pour une liste complète des sources de données prises en charge, consultez le <a href="/ddsql_reference/data_directory/">Data Directory</a>.
{{< /callout >}}

## Présentation {#overview}

Avec [DDSQL Editor][1], vous pouvez obtenir une visibilité plus approfondie sur votre télémétrie en interrogeant vos ressources en langage naturel ou avec [DDSQL](#use-sql-syntax-ddsql), un dialecte SQL qui prend également en charge l'interrogation des tags.

Vous pouvez également exporter les résultats d'une requête DDSQL pour les visualiser dans un Dashboard ou un Notebook, ou pour les automatiser dans un Datadog Workflow via [DDSQL Action](#save-and-share-queries).

Vous pouvez exécuter des requêtes DDSQL depuis des agents IA en utilisant la boîte à outils [Datadog MCP Server][9] `ddsql` (en avant-première).

{{< img src="/ddsql_editor/query-results-avg-cpu-usage-by-host.png" alt="Résultat d'une requête SQL affichant l'utilisation moyenne du processeur par host sur la page DDSQL dans Datadog" style="width:100%;" >}}

## Requête en langage naturel {#query-in-natural-language}

Saisissez votre question dans la barre de recherche et Datadog génère la requête SQL pour vous. Vous pouvez accepter ou rejeter les modifications, et fournir des commentaires pour aider à améliorer la fonctionnalité.

{{< img src="ddsql_editor/natural-language-query-2.png" alt="Une requête saisie dans la barre de recherche en langage naturel" style="width:90%;" >}}

## Utilisez la syntaxe SQL (DDSQL) {#use-sql-syntax-ddsql}

[DDSQL][6] est un langage de requête pour les données Datadog. Il implémente plusieurs opérations SQL standard, telles que `SELECT`, et permet d'effectuer des requêtes sur des données non structurées, telles que les [tags][2]. Obtenez exactement les données que vous souhaitez en écrivant votre propre instruction `SELECT`. Interrogez les tags comme s'il s'agissait de colonnes de tableau standard. Pour plus d'informations, consultez le [DDSQL Reference][6].

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

## Explorez votre télémétrie {#explore-your-telemetry}

Affichez, filtrez et créez des requêtes dans le Data Explorer.

Cliquez sur un nom de tableau pour afficher ses colonnes et ses relations :

{{< img src="ddsql_editor/data-tab.png" alt="L'onglet de données affichant les informations de tableau pour aws.ec2_instance" style="width:70%;" >}}

Pour les sources de données telles que les Logs, utilisez le générateur de requêtes pour générer des fonctions de tableau.

## Enregistrez et partagez des requêtes {#save-and-share-queries}

Enregistrez les requêtes utiles pour référence ultérieure ou téléchargez les données au format CSV. Parcourez et réexécutez les requêtes récentes ou enregistrées dans le panneau latéral.

{{< img src="/ddsql_editor/save-and-actions.png" alt="Interface du DDSQL Editor affichant les résultats de requête avec le menu déroulant d'enregistrement et d'actions mis en surbrillance." style="width:90%;" >}}

Exportez les résultats d'une requête enregistrée vers :
- Un Dashboard ou un Notebook pour la visualisation et le reporting
- Automatisez à l'aide d'une [DDSQL Action](https://app.datadoghq.com/actions/action-catalog#com.datadoghq.dd/com.datadoghq.dd.ddsql/com.datadoghq.dd.ddsql.tableQuery) dans un Datadog Workflow, avec lequel vous pouvez :
  - [Créer une métrique personnalisée à partir d'une requête DDSQL](https://app.datadoghq.com/workflow/blueprints/create-a-metric-from-a-ddsql-query)
  - [Exporter par programmation les résultats d'une requête DDSQL](https://app.datadoghq.com/workflow/blueprints/export-ebs-volumes-not-in-ddsql-as-s3-csv)
  - [Planifier un message Slack pour vérifier la conformité des ressources](https://app.datadoghq.com/workflow/blueprints/idle-compute-check-via-ddsql-with-slack-updates)
- [Générer une alerte pour une requête DDSQL][8] (Logs, Metrics, RUM, Spans et Product Analytics uniquement)

{{< img src="/ddsql_editor/queries-tab-recent-queries.png" alt="Panneau latéral affichant l'onglet Queries avec une liste de requêtes enregistrées et récentes dans le DDSQL Editor." style="width:70%;" >}}

## Autorisations {#permissions}

Pour accéder à l'application DDSQL Editor, les utilisateurs ont besoin de l'autorisation `ddsql_editor_read`. Cette autorisation est incluse par défaut dans le rôle Datadog Read Only. Si votre organisation utilise des rôles personnalisés, ajoutez cette autorisation au rôle approprié. Pour plus d'informations sur la gestion des autorisations, consultez la [documentation RBAC][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /fr/ddsql_reference/ddsql_default/#tags
[3]: /fr/account_management/rbac/
[4]: /fr/bits_ai
[5]: /fr/help/
[6]: /fr/ddsql_reference/ddsql_default/
[7]: https://docs.datadoghq.com/fr/ddsql_editor/#save-and-share-queries
[8]: /fr/monitors/types/analysis/
[9]: /fr/mcp_server/