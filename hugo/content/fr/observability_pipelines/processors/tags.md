---
aliases:
- /fr/observability_pipelines/processors/tag_control/logs/
description: Apprenez à utiliser le processeur de tags pour exclure ou inclure des
  tags spécifiques dans le tableau de tags Datadog pour les logs provenant du Datadog
  Agent.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur de tags
---
{{< product-availability >}}

## Présentation {#overview}

Pour les logs provenant du Datadog Agent, utilisez ce processeur pour exclure ou inclure des tags spécifiques dans le tableau de tags Datadog (`ddtags`). Les tags exclus ou non inclus sont supprimés et peuvent réduire votre volume de logs sortants.

## Configuration {#setup}

Pour configurer le processeur :

1. Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Logs Search Syntax][2] pour plus d'informations.
   - Seuls les logs correspondant au filtre sont traités.
   - Tous les logs, qu'ils correspondent ou non à la requête de filtrage, sont envoyés à l'étape suivante du pipeline.
1. Facultatif : saisissez un tableau de tags Datadog pour la section {{< ui >}}Configure tags{{< /ui >}}. Les formats pris en charge sont `["key:value", "key"]`. Consultez [Define Tags][1] pour plus d'informations sur le format `key:value`.
1. Dans la section {{< ui >}}Configure tags{{< /ui >}}, choisissez si vous souhaitez {{< ui >}}Exclude tags{{< /ui >}} ou {{< ui >}}Include tags{{< /ui >}}. Si vous avez fourni un tableau de tags à l'étape précédente, sélectionnez les clés de tag que vous souhaitez configurer. Vous pouvez également ajouter manuellement des clés de tag. **Remarque**: Vous pouvez sélectionner jusqu'à 100 tags.

[1]: /fr/getting_started/tagging/#define-tags
[2]: /fr/observability_pipelines/search_syntax/logs/