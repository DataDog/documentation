---
aliases:
- /fr/dashboards/ddsql_editor/
- /fr/ddsql_editor/getting_started/
description: Interrogez les ressources d'infrastructure et les données de télémétrie
  en langage naturel ou avec la syntaxe DDSQL, avec prise en charge des tags en tant
  que colonnes de table.
further_reading:
- link: ddsql_reference/ddsql_default
  tag: Documentation
  text: Référence DDSQL
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explorer vos données avec Sheets, DDSQL Editor et Notebooks pour des analyses
    avancées dans Datadog
title: Éditeur DDSQL
---

{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="Sources de données avancées">}}
Si vous souhaitez interroger des sources de données qui ne sont pas encore disponibles, utilisez le formulaire suivant pour soumettre votre demande. Pour obtenir la liste complète des sources de données prises en charge, consultez la section <a href="/ddsql_reference/data_directory/">Répertoire des données</a>.
{{< /callout >}}

## Présentation

Avec le [DDSQL Editor][1], obtenez une visibilité plus approfondie sur vos données de télémétrie en interrogeant vos ressources en langage naturel ou avec [DDSQL](#utiliser-la-syntaxe-sql-ddsql), un dialecte SQL offrant une prise en charge étendue pour l'interrogation des tags.

Exportez également les résultats d'une requête DDSQL pour les visualiser dans un dashboard ou un Notebook, ou pour les automatiser dans un Datadog workflow via une [action DDSQL](#enregistrer-et-partager-des-requêtes).

{{< img src="/ddsql_editor/query-results-avg-cpu-usage-by-host.png" alt="Le résultat d'une requête SQL affichant l'utilisation moyenne du CPU par Host sur la page DDSQL dans Datadog" style="width:100%;" >}}

## Interroger en langage naturel

Saisissez votre question dans le champ de recherche ; Datadog génère la requête SQL pour vous. Acceptez ou ignorez les modifications, et fournissez des commentaires pour aider à améliorer la fonctionnalité.

{{< img src="ddsql_editor/natural-language-query-2.png" alt="Une requête saisie dans le champ de recherche en langage naturel" style="width:90%;" >}}

## Utiliser la syntaxe SQL (DDSQL)

[DDSQL][6] est un langage de requête pour les données Datadog. Il implémente plusieurs opérations SQL standard, telles que `SELECT`, et permet d'interroger des données non structurées, comme les [tags][2]. Obtenez exactement les données souhaitées en rédigeant votre propre instruction `SELECT`. Interrogez les tags comme s'ils étaient des colonnes de table standard. Pour en savoir plus, consultez la section [Référence DDSQL][6].

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region est un tag, pas une colonne
GROUP BY instance_type
{{< /code-block >}}

## Explorer vos données de télémétrie

Consultez, filtrez et créez des requêtes dans le Data Explorer.

Cliquez sur un nom de table pour afficher ses colonnes et ses relations :

{{< img src="ddsql_editor/data-tab.png" alt="L'onglet Data affichant les informations de la table aws.ec2_instance" style="width:70%;" >}}

Pour les sources de données telles que Logs, utilisez le générateur de requêtes pour créer des fonctions de table.

## Enregistrer et partager des requêtes

Enregistrez des requêtes utiles pour référence ultérieure ou téléchargez les données au format CSV. Parcourez et réexécutez les requêtes récentes ou enregistrées dans le panneau latéral.

{{< img src="/ddsql_editor/save-and-actions.png" alt="Interface DDSQL Editor affichant les résultats de requête avec le menu déroulant Enregistrer et Actions mis en évidence" style="width:90%;" >}}

Exporter les résultats d'une requête enregistrée vers :
- Un dashboard ou un Notebook pour la visualisation et la génération de rapports
- Automatiser à l'aide d'une [action DDSQL](https://app.datadoghq.com/actions/action-catalog#com.datadoghq.dd/com.datadoghq.dd.ddsql/com.datadoghq.dd.ddsql.tableQuery) dans un Datadog workflow, avec laquelle vous pouvez :
  - [Créer une métrique custom à partir d'une requête DDSQL](https://app.datadoghq.com/workflow/blueprints/create-a-metric-from-a-ddsql-query)
  - [Exporter par programmation les résultats d'une requête DDSQL](https://app.datadoghq.com/workflow/blueprints/export-ebs-volumes-not-in-ddsql-as-s3-csv)
  - [Programmer un message Slack pour vérifier la conformité des ressources](https://app.datadoghq.com/workflow/blueprints/idle-compute-check-via-ddsql-with-slack-updates)
- Créer une alerte sur une requête DDSQL en version Preview (Logs, Metrics, RUM, Spans et Product Analytics uniquement ; [contacter l'assistance][8] pour y accéder)

{{< img src="/ddsql_editor/queries-tab-recent-queries.png" alt="Panneau latéral affichant l'onglet Requêtes avec une liste de requêtes enregistrées et récentes dans le DDSQL Editor" style="width:70%;" >}}

## Autorisations

Pour accéder à l'application DDSQL Editor, les utilisateurs doivent disposer de l'autorisation `ddsql_editor_read`. Cette autorisation est incluse par défaut dans le rôle Datadog Read Only. Si votre organisation utilise des rôles personnalisés, ajoutez cette autorisation au rôle approprié. Pour en savoir plus sur la gestion des autorisations, consultez la section [documentation RBAC][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /fr/ddsql_reference/ddsql_default/#tags
[3]: /fr/account_management/rbac/
[4]: /fr/bits_ai
[5]: /fr/help/
[6]: /fr/ddsql_reference/ddsql_default/
[7]: https://docs.datadoghq.com/fr/ddsql_editor/#save-and-share-queries
[8]: /fr/help/