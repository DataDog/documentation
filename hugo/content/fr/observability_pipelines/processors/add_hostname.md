---
description: Apprenez à utiliser le processeur Add Hostname pour ajouter un champ
  contenant le nom du host qui a envoyé le log.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Add Hostname
---
{{< product-availability >}}

## Présentation {#overview}

Ce processeur ajoute un champ contenant le nom du host qui a envoyé le log. Par exemple, `hostname: 613e197f3526`. **Remarque** : Si le `hostname` existe déjà, le Worker génère une erreur et ne remplace pas le `hostname` existant.

## Configuration {#setup}

Pour configurer ce processeur :
- Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Logs Search Syntax][1] pour plus d'informations.
  - Seuls les logs qui correspondent à la requête de filtre spécifiée sont traités.
  - Tous les logs, qu'ils correspondent ou non à la requête de filtrage, sont envoyés à l'étape suivante du pipeline.

[1]: /fr/observability_pipelines/search_syntax/logs/