---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur d'échantillonnage
---
{{< product-availability >}}

## Présentation {#overview}

Ce processeur échantillonne vos logs pour obtenir un sous-ensemble représentatif au taux que vous définissez, en supprimant les événements restants. Par exemple, vous pouvez utiliser ce processeur pour échantillonner 20 % des événements provenant d'un service bruyant non critique.

L'échantillonnage s'applique uniquement aux événements qui correspondent à votre requête de filtrage et n'a pas d'impact sur les autres événements. Si un événement est supprimé au niveau de ce processeur, il n'est pas envoyé aux processeurs suivants.

## Configuration {#setup}

Pour configurer le processeur d'échantillonnage :
1. Définissez une {{< ui >}}filter query{{< /ui >}}. Consultez la [Syntaxe de recherche de logs][1] pour plus d'informations.
    - Seuls les événements qui correspondent à la requête de filtrage spécifiée sont échantillonnés au taux de rétention spécifié.
    - Les événements échantillonnés et les événements qui ne correspondent pas à la requête de filtrage sont envoyés à l'étape suivante du pipeline.
1. Saisissez le taux d'échantillonnage souhaité dans le champ {{< ui >}}Retain{{< /ui >}}. Par exemple, saisir `2` signifie que 2 % des événements sont conservés parmi tous les événements qui correspondent à la requête de filtrage.
1. Optionnellement, saisissez un champ {{< ui >}}Group By{{< /ui >}} pour créer des groupes d'échantillonnage distincts pour chaque valeur unique de ce champ. Par exemple, `status:error` et `status:info` sont deux valeurs de champ uniques. Chaque bucket d'événements avec le même champ est échantillonné indépendamment. Cliquez sur {{< ui >}}Add Field{{< /ui >}} si vous souhaitez ajouter d'autres champs pour le partitionnement. Consultez l'exemple [group-by](#group-by-example).

### Group-by example {#group-by-example}

Si vous disposez de la configuration suivante pour le processeur d'échantillonnage :
- Requête de filtrage : `env:staging`
- Conserver : `40%` des événements correspondants
- Group by : `status` et `service`

{{< img src="observability_pipelines/processors/group-by-example-service.png" alt="Le processeur d'échantillonnage avec des exemples de valeurs" style="width:40%;" >}}

Ensuite, 40 % des événements pour chaque combinaison unique de `status` et `service` à partir de `env:staging` sont conservés. Exemple :

- 40 % des événements avec `status:info` et `service:networks` sont conservés.
- 40 % des événements avec `status:info` et `service:core-web` sont conservés.
- 40 % des événements avec `status:error` et `service:networks` sont conservés.
- 40 % des événements avec `status:error` et `service:core-web` sont conservés.

[1]: /fr/observability_pipelines/search_syntax/logs/