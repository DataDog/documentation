---
description: Apprenez à utiliser le processeur Edit Tags pour ajouter ou renommer
  des tags dans vos métriques.
disable_toc: false
products:
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Processeur Edit Tags
---
{{< product-availability >}}

## Présentation {#overview}

Le processeur Edit Tags peut ajouter ou renommer des tags dans vos métriques. Utilisez ce processeur pour enrichir vos métriques avec un contexte supplémentaire et uniformiser le nommage des attributs importants.

Les tags et préfixes de tags suivants ne peuvent pas être renommés car ils fournissent une fonctionnalité spécifique à la plateforme :

- `host`
- `service`
- `ddsource`
- `function_arn`
- `datadog_*`
- `_dd.*`

## Configuration {#setup}

### Ajouter un tag {#add-tag}

Utilisez **Add tag** pour ajouter une nouvelle paire clé-valeur à votre métrique.

Pour configurer l'action **Add tag** :

1. Sélectionnez **Add tag** dans le menu déroulant **Action**.
1. Définissez une requête de filtre. Consultez [Syntaxe de recherche de métriques][1] pour plus d'informations sur la création de requêtes.
    - Seules les métriques correspondant au filtre sont traitées.
    - Toutes les métriques, qu'elles correspondent ou non à la requête de filtrage, sont envoyées à l'étape suivante du pipeline.
1. Saisissez la clé et la valeur du tag que vous souhaitez ajouter aux métriques. **Remarque** : Si le tag que vous souhaitez ajouter existe déjà, le Worker enregistre une erreur et le tag existant reste inchangé.

### Renommer le tag {#rename-tag}

Utilisez **Rename tag** pour renommer un tag dans votre métrique.

Pour configurer l'action **Rename tag** :

1. Sélectionnez **Rename tag** dans le menu déroulant **Action**.
1. Définissez une requête de filtre. Consultez [Syntaxe de recherche de métriques][1] pour plus d'informations sur la création de requêtes.
    - Seules les métriques correspondant au filtre sont traitées.



    - Toutes les métriques, qu'elles correspondent ou non à la requête de filtrage, sont envoyées à l'étape suivante du pipeline.
1. Saisissez le nom de la clé de tag que vous souhaitez renommer dans le champ **From**.
1. Dans le champ **To**, saisissez la nouvelle clé de tag qui remplacera celle d'origine. **Remarque** : Si le nom de tag dans le champ **To** existe déjà, le Worker enregistre une erreur et ne renomme pas la clé de tag dans le champ **From**.

[1]: /fr/observability_pipelines/search_syntax/metrics/