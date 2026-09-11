---
description: Apprenez à utiliser le processeur Reduce pour regrouper plusieurs événements
  de log en un seul log en fonction de champs et de stratégies de fusion spécifiés.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Reduce
---
{{< product-availability >}}

## Présentation {#overview}

Le processeur Reduce regroupe plusieurs événements de log en un seul log en fonction des champs spécifiés et des stratégies de fusion sélectionnées. Les logs sont regroupés par intervalles de 10 secondes. Une fois l'intervalle écoulé pour le groupe, le log réduit pour ce groupe est envoyé à l'étape suivante du pipeline.

## Configuration {#setup}

Pour configurer le processeur Reduce :
1. Définissez un {{< ui >}}filter query{{< /ui >}}. Seuls les logs qui correspondent à la requête de filtrage spécifiée sont traités. Les logs réduits et les logs qui ne correspondent pas à la requête de filtre sont envoyés à l'étape suivante du pipeline. Consultez [Search Syntax][1] pour plus d'informations.
2. Dans la section {{< ui >}}Group By{{< /ui >}}, saisissez le champ selon lequel vous souhaitez regrouper les logs.
3. Cliquez sur {{< ui >}}Add Group by Field{{< /ui >}} pour ajouter des champs supplémentaires.
4. Dans la section {{< ui >}}Merge Strategy{{< /ui >}} :
   - Dans {{< ui >}}On Field{{< /ui >}}, saisissez le nom du champ sur lequel vous souhaitez fusionner les logs.
   - Sélectionnez la stratégie de fusion dans le menu déroulant {{< ui >}}Apply{{< /ui >}}. Il s'agit de la stratégie utilisée pour combiner les événements. Consultez la section [Stratégies de fusion](#merge-strategies) pour obtenir des descriptions des stratégies disponibles.
   - Cliquez sur {{< ui >}}Add Merge Strategy{{< /ui >}} pour ajouter des stratégies supplémentaires.

### Stratégies de fusion {#merge-strategies}

Voici les stratégies de fusion disponibles pour combiner les événements de log.


| Nom           | Description                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| Tableau          | Ajoute chaque valeur à un tableau.                                                                                    |
| Concat         | Concatène les valeurs textuelles en les séparant par un espace.                                                            |
| Concat saut de ligne | Concatène les valeurs textuelles en les séparant par un retour à la ligne.                                                          |
| Concat raw     | Concatène les valeurs textuelles sans les séparer par un délimiteur.                                                               |
| Ignorer        | Ignore toutes les valeurs à l’exception de la première valeur reçue..                                                      |
| Aplati    | Crée un tableau aplati contenant toutes les values uniques reçues.                                                 |
| Tableau le plus long | Conserve le tableau le plus long reçu.                                                                         |
| Max            | Conserve la valeur numérique maximale ayant été reçue.                                                                 |
| Min            | Conserve la valeur numérique minimale ayant été reçue.                                                                 |
| Conserver         | Ignore toutes les valeurs, à l'exception de la dernière valeur reçue. Fonctionne comme un mécanisme de coalescence en ne conservant pas \`null\`. |
| Tableau le plus court | Conserve le tableau le plus court reçu.                                                                        |
| Somme            | Additionne toutes les valeurs numériques reçues.                                                                        |

## Métriques de santé {#health-metrics}

Pour les [métriques de composants][2] et les [métriques de tampon de processeur][3] émises par tous les processeurs, consultez la documentation sur les [Métriques d'utilisation des pipelines][4].

### Réduire les métriques{#reduce-metrics}

- Utilisez le tag `component_id` pour filtrer ou regrouper par composants individuels.
- Le tag `component_type` est `reduce` pour ces métriques.

`pipelines.stale_events_flushed_total`
: **Description**: Le nombre d'événements obsolètes que le processeur a vidés.
: **Type de métrique** : count

[1]: /fr/observability_pipelines/search_syntax/logs/
[2]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/