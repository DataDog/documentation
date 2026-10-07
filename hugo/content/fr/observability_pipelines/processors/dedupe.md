---
description: Apprenez à utiliser le processeur Deduplicate pour supprimer les copies
  de données de logs et réduire le volume et le bruit.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Deduplicate
---
{{< product-availability >}}

## Présentation {#overview}

Le processeur Deduplicate supprime les copies de données pour réduire le volume et le bruit. Il met en cache les messages et compare votre trafic de logs entrants aux messages mis en cache. Par exemple, ce processeur peut être utilisé pour ne conserver que les logs d'avertissement uniques dans le cas où plusieurs logs d'avertissement identiques sont envoyés successivement.

## Configuration {#setup}

Pour configurer le processeur Deduplicate :

1. Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Logs Search Syntax][1] pour plus d'informations.
   - Seuls les logs qui correspondent à la requête de filtre spécifiée sont traités.
   - Tous les logs, qu’ils correspondent ou non à la requête de filtrage, sont envoyés à l’étape suivante du pipeline.
1. Dans le menu déroulant {{< ui >}}Type of deduplication{{< /ui >}}, sélectionnez si vous souhaitez `Match` sur ou `Ignore` les champs spécifiés ci-dessous.
    - Si `Match` est sélectionné, alors après le passage d'un log, les futurs logs ayant les mêmes valeurs pour tous les champs que vous spécifiez ci-dessous sont supprimés.
    - Si `Ignore` est sélectionné, alors après le passage d'un log, les futurs logs ayant les mêmes valeurs pour tous leurs champs, *à l'exception de* ceux que vous spécifiez ci-dessous, sont supprimés.
1. Saisissez les champs sur lesquels vous souhaitez effectuer une correspondance ou que vous souhaitez ignorer. Au moins un champ est requis, et vous pouvez spécifier un maximum de trois champs.
    - Utilisez la notation de chemin `<OUTER_FIELD>.<INNER_FIELD>` pour faire correspondre les sous-champs. Voir l'exemple de [notation de chemin](#path-notation-example) ci-dessous.
1. Cliquez sur {{< ui >}}Add field{{< /ui >}} pour ajouter des champs supplémentaires sur lesquels vous souhaitez filtrer.

### Paramètres optionnels {#optional-settings}

#### Taille du cache {#cache-size}

La taille de cache par défaut est de 5 000 messages (recommandé). Les messages mis en cache sont conservés en mémoire pour déterminer si les messages entrants sont des doublons. Vous pouvez augmenter la taille du cache pour répondre à vos besoins.

**Remarques** :
- L'augmentation de la taille du cache accroît l'utilisation de la mémoire.
- Le cache est pris en charge par un cache LRU, dont la taille est identique à celle du cache configuré.
- Comme le cache n'est pas partagé entre les Workers, seuls les événements dupliqués traités par le même Worker sont supprimés.

### Exemple de notation de chemin {#path-notation-example}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

[1]: /fr/observability_pipelines/search_syntax/logs/