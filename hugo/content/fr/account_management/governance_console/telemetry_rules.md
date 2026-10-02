---
description: Utilisez des règles de télémétrie pour régir les tags, l'indexation et
  d'autres caractéristiques de vos métriques, logs et spans.
further_reading:
- link: /api/latest/tag-rules/
  tag: Documentation
  text: API de règles de visibilité et d'application des tags
- link: /account_management/governance_console/
  tag: Documentation
  text: Governance Console
- link: /account_management/governance_console/controls
  tag: Documentation
  text: Governance Console Controls
- link: /metrics/guide/tag-indexing-rules/
  tag: Documentation
  text: Règles d'indexation des tags
- link: /metrics/guide/agent-filtering-for-custom-metrics
  tag: Documentation
  text: Agent Filtering pour Custom Metrics
is_beta: true
private: true
title: Règles de télémétrie
---
{{< beta-callout url="#" btn_hidden="true" header="faux" >}}
Les règles de télémétrie sont en version préliminaire. Si vous constatez un problème ou souhaitez proposer une nouvelle fonctionnalité, utilisez le bouton Give Feedback dans l'interface utilisateur du produit.
{{< /beta-callout >}}

## Présentation {#overview}

Les règles de télémétrie aident les administrateurs à régir les caractéristiques de leurs métriques, logs et spans depuis la Governance Console, afin de réduire les coûts associés à la télémétrie indésirable. Les règles de télémétrie peuvent aider à standardiser l'ajout de tags, à gérer le volume ingéré et indexé, et à minimiser la télémétrie inutilisée ou redondante.

## Prérequis {#prerequisites}

Vous avez besoin de l'autorisation `governance_console_read` pour afficher les règles de télémétrie. Pour créer, modifier ou supprimer des règles, vous avez besoin de l'autorisation `telemetry_rules_write` ou du rôle Datadog Admin. Pour activer le filtrage sur une règle, vous avez besoin de l'autorisation `telemetry_rules_enforcement_write`.

<div class="alert alert-info">Certains types de règles peuvent nécessiter des autorisations supplémentaires ou des versions d'Agent spécifiques. Consultez les pages dédiées à chaque type de règle pour plus d'informations.</div>

## Types de règles de télémétrie {#telemetry-rule-types}

| Type de règle | Type(s) de télémétrie | Appliqué au niveau de | Description |
|---|---|---|---|
| Visibilité et application des tags | Métriques, logs, spans | Ingestion | Détermine si les tags et les valeurs de télémétrie sont conformes, et supprime éventuellement la télémétrie non conforme lors de l'ingestion. |
| Indexation des tags | Métriques | Ingestion | Détermine les tags de métriques personnalisées qui doivent être indexés pour une métrique donnée. |
| Filtrage par nom de métrique | Métriques | Agent | Supprime les métriques personnalisées d'un nom donné directement dans le Datadog Agent, avant l'ingestion. |

## Visibilité des tags et règles d'application {#tag-visibility-and-enforcement-rules}

### Créer une règle de visibilité de tag {#create-a-tag-visibility-rule}

1. Accédez à [Governance Console > Telemetry](https://app.datadoghq.com/governance/telemetry) et cliquez sur **+ Create New Rule**.
2. Sélectionnez le type de signal (**Métriques**, **APM** ou **Logs**) et le type de règle **Tag Visibility and Enforcement**.
3. Sélectionnez le périmètre. Choisissez **All [Spans/Metrics/Logs]** pour appliquer la règle à toute la télémétrie du type sélectionné. Choisissez **Selected [Spans/Metrics/Logs]** pour limiter la règle à un sous-ensemble, puis saisissez une requête de tag, par exemple, `service:web-store` ou `env:prod AND team:payments`. La même syntaxe de requête utilisée dans les monitors et dashboards Datadog s'applique ici.
4. Définissez la clé de tag. Saisissez la clé de tag que vous souhaitez faire respecter (par exemple, `env` ou `team`). Sélectionnez **Tag key must be present** pour signaler la télémétrie dépourvue de cette clé comme non conforme.

   <div class="alert alert-info">Si <strong>La clé de tag doit être présente</strong> n'est pas sélectionné, une règle évalue uniquement la télémétrie qui possède déjà la clé de tag spécifiée. La télémétrie sans cette clé n'est pas évaluée et est considérée comme conforme.</div>
5. Spécifiez les valeurs de tag. Sélectionnez **Valeurs de tag autorisées** pour définir une liste d'autorisation, ou **Valeurs de tag interdites** pour définir une liste d'exclusion. Saisissez les valeurs sous forme de liste séparée par des virgules ; les wildcards sont pris en charge (par exemple, `us*` correspond à `us-east-1` et `us-west-2`).
6. Nommez votre règle. Saisissez une description expliquant ce que la règle applique, par exemple, *Exiger un tag d'équipe sur toutes les ressources*.

   <div class="alert alert-info">Vous ne pouvez pas activer <strong>Filter data at ingest</strong> tant que vous n'avez pas créé la règle.</div>
7. Cliquez sur **Create Rule**.

{{< img src="account_management/governance_console/telemetry_rules/creating_telemetry_rule.mp4" alt="Création d'une règle de Tag Visibility dans Governance Console" video="true" style="width:100%;" >}}

### Examiner la conformité de la règle de Tag Visibility {#review-tag-visibility-rule-compliance}

Après avoir créé une règle de Tag Visibility, Datadog commence à suivre la conformité sur toute la télémétrie correspondante. Ouvrez une règle pour voir :

- **Score de conformité** : Le pourcentage de spans, métriques ou événements de log concernés qui satisfont à la règle, calculé sur la période sélectionnée. Un score de conformité de 100 % signifie que toute la télémétrie correspondante est conforme à la règle. Un score de conformité de 0 % signifie qu'aucune télémétrie correspondante n'est conforme à la règle.
- **Score dans le temps** : Un graphique montrant l'évolution de la conformité. Utilisez le sélecteur de temps pour afficher la tendance sur la période de votre choix. Ce graphique n'est pas disponible pour les métriques, et l'historique des métriques est limité aux 8 dernières heures.
- **Télémétrie non conforme** : Un tableau présentant les spans, métriques ou événements de log individuels qui enfreignent la règle, avec le nom du service, la ressource et des détails supplémentaires spécifiques au signal. Cliquez sur une ligne pour afficher plus de détails sur la télémétrie en question. Pour les règles sur les spans, cliquez sur **View in Trace** pour ouvrir les spans non conformes directement dans le Trace Explorer.

### Appliquer la conformité des tags par filtrage {#enforce-tag-compliance-through-filtering}

Après avoir créé et examiné une règle de visibilité de tag, vous pouvez l'appliquer en filtrant la télémétrie non conforme lors de l'ingestion.

<div class="alert alert-warning">Les règles de filtrage peuvent entraîner une perte de données permanente en cas de mauvaise configuration. Un temps d'attente obligatoire de 5 minutes est requis entre la création d'une règle de visibilité de tag et l'activation du filtrage.</div>

Pour activer le filtrage :

1. Accédez à la règle de visibilité de tag concernée et ouvrez-la.
2. Examinez attentivement la description de la règle, le score de conformité et la télémétrie non conforme.
3. Appliquez la règle en activant **Filter data at ingest** sous **Action de la règle**.
4. Confirmez l'application du filtrage en saisissant et en soumettant le texte requis.

La règle commence immédiatement à filtrer la télémétrie non conforme lors de l'ingestion. Des échantillons de télémétrie non conforme sont enregistrés dans la [Audit Trail](/account_management/audit_trail/). Vous pouvez afficher ces échantillons en accédant à la règle, puis en faisant défiler le tableau ou en cliquant sur **View in Audit Trail**.

{{< img src="account_management/governance_console/telemetry_rules/enforcing_telemetry_rule.mp4" alt="Application d'une règle de Tag Visibility et affichage de la télémétrie filtrée." video="true" style="width:100%;" >}}

## Modifier ou supprimer une règle {#edit-or-delete-a-rule}

Cliquez sur le menu **⋮** sur n'importe quelle ligne de règle pour la modifier ou la supprimer. Les modifications prennent effet immédiatement, même si une règle filtre ou supprime activement de la télémétrie, et les données de conformité de la règle précédente ne sont pas conservées.

## Autres règles {#other-rules}

Vous pouvez créer et gérer des règles spécifiques pour les métriques depuis la Governance Console. Alternativement, vous pouvez gérer ces règles depuis Metrics Settings. Pour des détails spécifiques aux règles, consultez la documentation de référence ci-dessous :

- [Indexation des tags](/metrics/guide/tag-indexing-rules/)
- [Metric Name Filtering](/metrics/guide/agent-filtering-for-custom-metrics)

## Limitations {#limitations}

- Vous pouvez créer jusqu'à 10 règles par type de signal (les spans, les métriques et les logs ont chacun une limite distincte de 10).
- Une règle de Tag Visibility and Enforcement peut spécifier jusqu'à 30 valeurs de tag.
- Les règles de télémétrie ne sont pas disponibles pour les types de télémétrie autres que les métriques, les logs et les spans.

Si votre stratégie de taggage nécessite davantage de règles ou de valeurs de tag, contactez votre équipe de compte Datadog pour demander une limite plus élevée.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}