---
description: Apprenez à utiliser le processeur Edit Fields pour ajouter, supprimer
  ou renommer des champs dans vos logs.
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/remap_reserved_attributes/
  tag: Documentation
  text: Remappez les attributs réservés
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Edit Fields Processor
---
{{< product-availability >}}

## Présentation {#overview}

Le processeur Edit Fields peut ajouter, supprimer ou renommer des champs au sein de vos logs. Utilisez ce processeur pour enrichir vos logs avec un contexte supplémentaire, supprimer les champs à faible valeur pour réduire le volume et normaliser le nommage des attributs importants. Sélectionnez {{< ui >}}add field{{< /ui >}}, {{< ui >}}drop field{{< /ui >}} ou {{< ui >}}rename field{{< /ui >}} dans le menu déroulant pour commencer.

Consultez le guide [Remap Reserved Attributes][1] sur la façon d'utiliser le processeur Edit Fields pour remapper des attributs.

## Configuration {#setup}

### Ajouter un champ {#add-field}
Utilisez {{< ui >}}add field{{< /ui >}} pour ajouter un nouveau champ clé-valeur à vos logs.

Pour configurer le processeur d'ajout de champ :
1. Définissez un {{< ui >}}filter query{{< /ui >}}. Seuls les logs qui correspondent à la requête de filtrage spécifiée sont traités. Tous les logs, qu'ils correspondent ou non à la requête de filtre, sont envoyés à l'étape suivante du pipeline. Consultez [Search Syntax][2] pour plus d'informations.
1. Saisissez le champ et la valeur que vous souhaitez ajouter. Pour spécifier un champ imbriqué pour votre clé, utilisez la [notation de chemin](#path-notation-example-remap) : `<OUTER_FIELD>.<INNER_FIELD>`. Toutes les valeurs sont stockées sous forme de chaînes de caractères.
    **Remarque** : Si le champ que vous souhaitez ajouter existe déjà, le Worker enregistre une erreur et le champ existant reste inchangé.

### Supprimer le champ {#drop-field}

Utilisez {{< ui >}}drop field{{< /ui >}} pour supprimer un champ dans vos logs correspondant au filtre que vous spécifiez ci-dessous. Il peut supprimer des objets, vous pouvez donc utiliser le processeur pour supprimer des clés imbriquées.

Pour configurer le processeur de suppression de champ :
1. Définissez un {{< ui >}}filter query{{< /ui >}}. Seuls les logs qui correspondent à la requête de filtrage spécifiée sont traités. Tous les logs, qu'ils correspondent ou non à la requête de filtre, sont envoyés à l'étape suivante du pipeline. Consultez [Search Syntax][2] pour plus d'informations.
1. Saisissez la clé du champ que vous souhaitez supprimer. Pour spécifier un champ imbriqué pour votre clé spécifiée, utilisez la [notation de chemin](#path-notation-example-remap) : `<OUTER_FIELD>.<INNER_FIELD>`.
    **Remarque** : Si votre clé spécifiée n'existe pas, vos logs ne sont pas affectés.

### Renommer le champ {#rename-field}

Utilisez {{< ui >}}rename field{{< /ui >}} pour renommer un champ dans vos logs.

Pour configurer le processeur de renommage de champ :
1. Définissez un {{< ui >}}filter query{{< /ui >}}. Seuls les logs qui correspondent à la requête de filtrage spécifiée sont traités. Tous les logs, qu'ils correspondent ou non à la requête de filtre, sont envoyés à l'étape suivante du pipeline. Consultez [Search Syntax][2] pour plus d'informations.
1. Saisissez le nom du champ que vous souhaitez renommer dans le {{< ui >}}Source field{{< /ui >}}. Pour spécifier un champ imbriqué pour votre clé, utilisez la [notation de chemin](#path-notation-example-remap) : `<OUTER_FIELD>.<INNER_FIELD>`. Une fois renommé, votre champ d'origine est supprimé sauf si vous cochez la case {{< ui >}}Preserve source tag{{< /ui >}} décrite ci-dessous.<br>**Remarque** : Si la clé source que vous spécifiez n'existe pas, une valeur `null` par défaut est appliquée à votre cible.
1. Dans le {{< ui >}}Target field{{< /ui >}}, saisissez le nom que vous souhaitez donner au champ source renommé. Pour spécifier un champ imbriqué pour votre clé spécifiée, utilisez la [notation de chemin](#path-notation-example-remap) : `<OUTER_FIELD>.<INNER_FIELD>`.<br>**Remarque** : Si le champ cible que vous spécifiez existe déjà, le Worker enregistre une erreur et ne remplace pas le champ cible existant.
1. Optionnellement, cochez la case {{< ui >}}Preserve source tag{{< /ui >}} si vous souhaitez conserver le champ source d'origine et dupliquer les informations de votre clé source vers votre clé cible spécifiée. Si cette case n'est pas cochée, la clé source est supprimée après avoir été renommée.

### Exemple de notation de chemin {#path-notation-example-remap}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## Métriques de santé {#health-metrics}

Pour les [métriques de composant][3] et les [métriques de tampon de processeur][4] émises par tous les processeurs, consultez la documentation sur les [Métriques d'utilisation des pipelines][5]. Pour filtrer ou regrouper les métriques du processeur Edit Fields, utilisez le tag `component_type:add_fields`, `component_type:remove_fields` ou `component_type:rename_fields`, selon l'action configurée.

[1]: /fr/observability_pipelines/guide/remap_reserved_attributes
[2]: /fr/observability_pipelines/search_syntax/logs/
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}