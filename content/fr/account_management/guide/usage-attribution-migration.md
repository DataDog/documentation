---
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentation
  text: Paramètres de formule et d'utilisation
title: Passer à des API d'attribution de l'utilisation horaire et mensuelle
---

## Résumé

Ce guide explique comment passer de la version 1 à la version 2 des API d'attribution de l'utilisation. Les API v1, désormais obsolètes, sont divisées en deux catégories : L'API d'utilisation mensuelle ([Récupérer l'attribution de l'utilisation][1]), et les API basées sur un fichier ([Récupérer la liste des rapports personnalisés journaliers disponibles][2], [Récupérer les rapports personnalisés journaliers spécifiés][3], [Récupérer la liste des rapports personnalisés mensuels disponibles][4] et [Récupérer les rapports personnalisés mensuels spécifiés][5]). Pour utiliser ce guide, accédez à la section correspondant aux API v1 que vous utilisez actuellement, et suivez les instructions pour passer aux API v2 correspondantes.

**Remarque** : Toute mention de v1 et v2 dans ce document ne fait pas référence à la version du chemin de lʼURL. Toutes les API de cette documentation sont les premières versions avec leurs chemins d'accès respectifs, et utilisent donc `v1` dans le chemin de l'URL.

## API d'utilisation mensuelle

### [Récupérer l'attribution de l'utilisation][6]

Cette API permet de connaître l'attribution de l'utilisation mensuelle.

La v2 de l'API, [Récupérer l'attribution de l'utilisation mensuelle][7], permet également de connaître l'attribution de l'utilisation mensuelle et accepte les combinaisons de tags dans les requêtes.

Consultez les sections ci-dessous pour connaître les différences entre la v1 et la v2 de l'API, et obtenir des recommandations pour passer à l'API v2.

#### Pagination

Dans l'API v1, la pagination est configurée via les paramètres de requête `offset` et `limit`. La valeur de `metadata.pagination.total_number_of_records` indique le nombre total d'entrées dans toutes les pages.

Dans l'API v2, la pagination est configurée via le paramètre de requête `next_record_id`. La valeur de début de la page suivante est renvoyée dans `metadata.pagination.next_record_id`. La réponse n'indique pas le nombre total d'entrées.

Pour migrer vers l'API v2, utilisez le paramètre `next_record_id` afin de parcourir les pages comme décrit dans la documentation de l'API.

#### Répartition par tag

Dans l'API v1, les données d'utilisation sont détaillées pour chaque tag séparément dans la même réponse. Certaines données sont par conséquent dupliquées, la même ressource étant comptabilisée par plusieurs tags distincts tels que `a`, `b`, et `c`.

Dans l'API v2, vous pouvez sélectionner le tag à utiliser pour filtrer les données à l'aide du paramètre `tag_breakdown_keys`. Vous pouvez spécifier un tag à la fois, ou plusieurs tags séparés par des virgules. Si vous spécifiez plusieurs tags, la réponse donnera l'utilisation filtrée en fonction de cette combinaison de tags.

Pour migrer vers l'API v2, spécifiez les tags à utiliser à l'aide du paramètre `tag_breakdown_keys`. Pour obtenir les mêmes données qu'avec l'API v1, envoyez une requête distincte pour chaque tag.

#### Données agrégées

Dans l'API v1, la section `aggregates` contient les sommes de toutes les entrées possibles, ce qui donne un résultat trois fois supérieur au total réel car les données sont répétées trois fois sur trois tags différents. Exemple :

```json
{
  "field": "infra_host_usage",
  "value": 293880,
  "agg_type": "sum"
},
```

Dans l'API v2, la section `aggregates` contient uniquement la somme des entrées pour la combinaison de tags utilisée. Exemple :

```
{
"field": "infra_host_usage",
"value": 97960,
"agg_type": "sum"
},
```

Pour migrer vers l'API v2, utilisez les agrégats, car ces valeurs représentent l'utilisation totale par l'organisation sur les mois demandés.

#### Valeurs décimales

Dans l'API v1, certaines données d'utilisation sont renvoyées avec une précision décimale. Exemple :
`"cws_containers_usage": 1105642.92`

Dans l'API v2, les données d'utilisation sont renvoyées sous forme d'entiers. Exemple :
`"cws_containers_usage": 1105643`

Il n'est pas possible de convertir les entiers en valeurs décimales. Les entiers correspondent aux valeurs décimales arrondies.

#### Familles de produits

Dans l'API v1, l'utilisation de la surveillance sans serveur est obtenue via :

* `lambda_functions_usage`
* `lambda_functions_percentage`
* `lambda_invocations_usage`
* `lambda_invocations_percentage`

Dans l'API v2, l'utilisation de la surveillance sans serveur est obtenue via :

* `functions_usage`
* `functions_percentage`
* `invocations_usage`
* `invocations_percentage`

Ces types d'utilisation fonctionnent de la même façon ; la seule différence est que les noms ont été mis à jour.

## API basées sur des fichiers

Cette série d'API fournit des liens pour télécharger les données d'attribution de l'utilisation sous forme de fichiers zippés, avec granularité quotidienne et mensuelle.

### [Récupérer la liste des rapports personnalisés journaliers disponibles][2]

Cette API génère une liste de téléchargements disponibles. Les téléchargements de fichiers étant obsolètes, cette API n'a pas été remplacée.

### [Récupérer les rapports personnalisés journaliers spécifiés][3]

Cette API renvoie un lien permettant de télécharger un fichier zippé contenant les données d'attribution de l'utilisation de tous les produits pour un jour donné. Le fichier zippé contient un fichier TSV (valeurs séparées par des tabulations) pour chaque produit.

L'API [Récupérer l'attribution de l'utilisation horaire][8] renvoie les mêmes données.

Consultez les sections ci-dessous pour connaître les différences entre la v1 et la v2 de l'API, et obtenir des recommandations pour passer à l'API v2.

#### Format de la réponse

Dans l'API v1, la réponse contient un lien vers un fichier zippé, qui contient un fichier TSV par produit.

Dans l'API v2, la réponse renvoie les données d'attribution de l'utilisation au format JSON.

Pour migrer vers l'API v2, vos processus doivent pouvoir traiter les données au format JSON. Si nécessaire, vous pouvez appliquer des transformations aux données JSON pour obtenir le format qui convient le mieux à vos besoins.

#### Répartition par tag

Dans l'API v1, les données d'utilisation sont réparties selon tous les tags choisis.

Dans l'API v2, vous pouvez sélectionner la répartition par tag en spécifiant les tags dans `tag_breakdown_keys` sous forme de liste séparée par des virgules.

Pour passer à l'API v2, spécifiez tous les tags choisis via le paramètre de requête `tag_breakdown_keys`.

#### Clés de tag

Dans l'API v1, les clés de tag choisies sont affichées sous forme d'en-têtes dans le fichier TSV. Exemple :

```
public_id       formatted_timestamp     env     service total_usage
abc123          2022-01-01 00:00:00     prod    web     100
...
```

Dans l'API v2, les tags choisis sont des clés dans l'objet `tags` de chaque élément du tableau d'utilisation de la réponse. Exemple :

```
...
  "tags": {
    "service": [
      "web"
    ],
    "env": [
      "prod"
    ]
  },
...
```

Pour passer à l'API v2, récupérez les clés depuis l'objet `tags` sur chaque ligne de la réponse.

#### Valeurs de tag

Dans l'API v1, si une ressource possède plusieurs fois le même tag, les valeurs sont affichées sous forme de chaîne séparée par des barres verticales (`|`) dans la colonne du tag.

Exemple :

```
public_id       formatted_timestamp     env     service               total_usage
abc123          2022-01-01 00:00:00     prod    authentication|web    100
...
```

Dans l'API v2, la valeur correspondant à chaque clé de tag dans l'objet `tags` est un tableau. Si une ressource possède plusieurs fois le même tag, la liste contient alors plusieurs éléments.

Exemple :

```
...
  "tags": {
    "service": [
      "authentication",
      "web"
    ],
    "env": [
      "prod"
    ]
  },
...
```

Pour passer à l'API v2, vos processus doivent pouvoir traiter les ressources qui possèdent plusieurs fois le même tag. L'ordre des valeurs des tags dans le tableau de la réponse v2 est identique à celui dans la chaîne séparée par des barres verticales de la réponse v1. Vous pouvez donc joindre le tableau avec des barres verticales pour produire les mêmes valeurs de tags que dans la réponse v1.

#### Utilisation totale

Dans l'API v1, l'utilisation totale correspond à `total_usage` dans l'en-tête du CSV.

Dans l'API v2, l'utilisation totale correspond à `total_usage_sum` et prend la forme d'une clé dans chaque objet du tableau d'utilisation.

Pour passer à l'API v2, utilisez la clé `total_usage_sum` pour récupérer la valeur de l'utilisation.

#### Utilisation totale : type de données

L'API v1 utilise le format CSV, qui n'offre aucun moyen de spécifier les types de données (bien que l'utilisation totale soit toujours un nombre).

Dans l'API v2, l'utilisation totale est un entier.

Pour passer à l'API v2, traitez l'utilisation totale en tant que nombre entier.

#### Format de temps

Dans l'API v1, le temps est affiché au format `AAAA-MM-JJ hh:mm:ss`.

Dans l'API v2, le temps est affiché au format `AAAA-MM-JJThh`.

Les données au format v1 ont toujours la valeur `0` pour les minutes et les secondes (les données sont calculées à l'heure près). Les données au format v2 peuvent être parsées et traitées de la même façon que les données au format v1 parsées.

#### Organisations enfant

Dans l'API v1, le fichier contient uniquement des données pour la configuration de tags définie sur l'organisation parent. Cela inclut toutes les organisations enfant du parent, car les configurations de tags sont également appliquées aux organisations enfant.

Dans l'API v2, si le paramètre `include_descendants=true` est fourni (c'est le cas par défaut), alors la réponse contient des données pour l'organisation parent et tous les enfants du parent. Cela inclut toutes les données des configurations de tags héritées de l'organisation parent par les organisations enfant, ainsi que toutes les configurations de tags définies directement sur ces organisations enfant. L'origine d'une configuration de tags donnée peut être identifiée à l'aide du champ `tag_config_source`.

Pour migrer vers l'API v2, passez le paramètre `include_descendants=true`. Pour obtenir les mêmes valeurs que dans la réponse v1, filtrez les entrées dans la réponse qui ne correspondent pas au champ `tag_config_source` de la configuration de tags de l'organisation parent.

#### Intervalle de données

Dans l'API v1, les données sont renvoyées pour un jour à la fois. La date est spécifiée dans le paramètre `record_id` de la requête.

Dans l'API v2, vous pouvez récupérer les données pour des intervalles arbitraires, jusqu'à 24 heures à la fois, à l'aide des paramètres `start_hr` et `end_hr`.

Pour passer à l'API v2, récupérez les données en définissant `start_hr` sur minuit (`00` heure) le jour souhaité et `end_hr` sur minuit le jour suivant.

#### Pagination

Dans l'API v1, les données ne sont pas paginées. Cela peut donner lieu à des fichiers très volumineux.

Dans l'API v2, les données sont paginées. Si une réponse s'étend sur plus d'une page, l'identifiant permettant d'accéder à la page suivante est spécifié dans le champ `metadata.pagination.next_record_id`. Cet identifiant peut être utilisé dans le paramètre de requête `next_record_id` pour récupérer la page suivante.

Pour passer à l'API v2, récupérez toutes les pages correspondant à un jour donné.

#### Cardinalité des données

Dans l'API v1, les données sont décomposées selon chacun des trois tags.

Dans l'API v2, les données sont décompensées selon les tags spécifiés dans le paramètre de requête `tag_breakdown_keys`.

Pour passer à l'API v2, spécifiez tous les tags choisis via le paramètre `tag_breakdown_keys`.

#### Noms des types d'utilisation

Dans l'API v1, les fichiers sont nommés `daily_<produit>_<date>.tsv`.

Dans l'API v2, les types d'utilisation présentent toujours le suffixe `_usage`.

Pour passer à l'API v2, spécifiez le suffixe `_usage` pour tous les types d'utilisation.

#### Types d'utilisation renommés

L'API v1 contient des fichiers pour :

* `apm`
* `infra`
* `lambda_invocations`
* `lambda_functions`
* `profiled_containers`
* `npm`
* `profiled_hosts`

Dans l'API v2, les types d'utilisation correspondants sont :

* `apm_host_usage`
* `infra_host_usage`
* `invocations_usage`
* `functions_usage`
* `profiled_container_usage`
* `npm_host_usage`
* `profiled_host_usage`

Pour passer à l'API v2, mappez les types d'utilisation spécifiés avec les nouveaux noms.

#### Type d'utilisation Série temporelle

Dans l'API v1, le fichier des séries temporelles contient l'utilisation associée aux séries temporelles standard et personnalisées.

Dans l'API v2, un type d'utilisation `custom_timeseries_usage` est proposé.

Datadog facture uniquement l'utilisation des séries temporelles personnalisées. L'utilisation des séries temporelles standard n'est donc pas nécessaire.

#### Type d'utilisation Synthetics

Dans l'API v1, le fichier Synthetics contient l'utilisation associée aux tests API et aux tests Browser.

Dans l'API v2, il existe deux types d'utilisation pour Synthetics, à savoir `api_usage` et `browser_usage`.

Pour passer à l'API v2, utilisez les nouveaux types d'utilisation pour récupérer l'utilisation de Synthetics.

### [Récupérer la liste des rapports personnalisés mensuels disponibles](https://docs.datadoghq.com/api/latest/usage-metering/#recuperer-la liste-des-rapports-personnalises-mensuels-disponibles)

Cette API génère une liste de téléchargements disponibles. Les téléchargements de fichiers étant obsolètes, cette API n'a pas été remplacée.

### [Récupérer les rapports personnalisés mensuels spécifiés][5]

Cette API renvoie un lien permettant de télécharger un fichier zippé contenant les données d'attribution de l'utilisation de tous les produits sur un mois donné. Le fichier zippé contient un fichier TSV pour chaque produit, ainsi qu'un fichier récapitulatif pour chaque tag. Les marches à suivre pour répliquer ces deux types de fichiers sont décrites ci-dessous.

### Fichiers de données horaires par produit

Les noms des fichiers de données horaires respectent le format `monthly_<produit>_<date>.tsv`. Chaque fichier de produit rassemble les fichiers zippés quotidiens disponibles via l'API [Récupérer les rapports personnalisés journaliers spécifiés][3].

L'API [Récupérer l'attribution de l'utilisation horaire][8] renvoie les mêmes données.

Les fichiers de données horaires étant très similaires aux fichiers disponibles via l'API [Récupérer les rapports personnalisés journaliers spécifiés][3], la méthode à suivre est la même, à l'exception des intervalles recommandés. Pour effectuer la migration depuis les fichiers mensuels v1, récupérez toutes les pages pour chaque jour du mois. Les requêtes sont limitées à 24 heures à la fois dans l'API v2.

### Fichiers de récapitulatif mensuel par tag

Les noms des fichiers de récapitulatif mensuel respectent le format `summary_<tag>_<date>.tsv`. Ils contiennent l'utilisation cumulée sur le mois entier pour chaque tag. L'API [Récupérer l'attribution de l'utilisation mensuelle][7] renvoie les mêmes données.

Consultez les sections ci-dessous pour connaître les différences entre l'API v1 et l'API v2, et obtenir des recommandations pour passer à l'API v2.

#### Format de la réponse

Dans l'API v1, la réponse contient un lien vers un fichier zippé, qui contient un fichier TSV pour chaque tag choisi.

Dans l'API v2, la réponse renvoie les données d'attribution de l'utilisation au format JSON.

Pour migrer vers l'API v2, vos processus doivent pouvoir traiter les données au format JSON. Si nécessaire, vous pouvez appliquer des transformations aux données JSON pour obtenir le format qui convient le mieux à vos besoins.

#### Répartition par tag

Dans l'API v1, un fichier TSV séparé est fourni pour chaque tag choisi.

Dans l'API v2, vous pouvez sélectionner la répartition par tag en spécifiant les tags dans `tag_breakdown_keys` sous forme de liste séparée par des virgules.

Pour passer à l'API v2, formulez vos requêtes en spécifiant chaque tag individuel dans `tag_breakdown_keys`.

#### Valeurs de tag

Dans l'API v1, si une ressource possède plusieurs fois le même tag, les valeurs sont affichées sous forme de chaîne séparée par des barres verticales (`|`) dans la colonne du tag.

Exemple :

```
month   public_id       team        infra_host_usage ....
2022-01 abc123          billing|sre 100
...
```

Dans l'API v2, la valeur correspondant à chaque clé de tag dans l'objet `tags` est un tableau. Si une ressource possède plusieurs fois le même tag, la liste contient alors plusieurs éléments.

Exemple :

```
...
  "tags": {
    "team": [
      "billing",
      "sre"
    ]
  },
...
```

Pour passer à l'API v2, vos processus doivent pouvoir traiter les ressources qui possèdent plusieurs fois le même tag. L'ordre des valeurs des tags dans le tableau de la réponse v2 est identique à celui dans la chaîne séparée par des barres verticales de la réponse v1. Vous pouvez donc joindre le tableau avec des barres verticales pour produire les mêmes valeurs de tags que dans la réponse v1.

#### Utilisation totale

Dans l'API v1, la deuxième ligne du fichier contient l'utilisation agrégée pour l'ensemble des tags.

Dans l'API v2, la section `metadata.aggregates` de la réponse contient l'utilisation agrégée pour l'ensemble des tags.

Pour passer à l'API v2, récupérez l'utilisation totale depuis la section `metadata.aggregates`.

#### Type de données d'utilisation

Dans l'API v1, certaines données d'utilisation sont renvoyées avec une précision décimale. Exemple :

```
container_usage
55.4
```

Dans l'API v2, les données d'utilisation sont renvoyées sous forme d'entiers. Exemple :
`"container_usage": 55`

Il n'est pas possible de convertir les entiers en valeurs décimales. Les entiers correspondent aux valeurs décimales arrondies.

#### Organisations enfant

Dans l'API v1, le fichier contient uniquement des données pour la configuration de tags définie sur l'organisation parent. Cela inclut toutes les organisations enfant du parent, car les configurations de tags sont également appliquées aux organisations enfant.

Dans l'API v2, si le paramètre `include_descendants=true` est fourni (c'est le cas par défaut), alors la réponse contient des données pour l'organisation parent et tous les enfants du parent. Cela inclut toutes les données des configurations de tags héritées de l'organisation parent par les organisations enfant, ainsi que toutes les configurations de tags définies directement sur ces organisations enfant. L'origine d'une configuration de tags donnée peut être identifiée à l'aide du champ `tag_config_source`.


#### Utilisation de la surveillance sans serveur

Dans l'API v1, l'utilisation de la surveillance sans serveur utilise les noms suivants :

* `lambda_functions_usage`
* `lambda_functions_percentage`
* `lambda_invocations_usage`
* `lambda_invocations_percentage`

Dans l'API v2, l'utilisation de la surveillance sans serveur utilise les noms suivants :

* `functions_usage`
* `functions_percentage`
* `invocations_usage`
* `invocations_percentage`

Pour passer à l'API v2, récupérez l'utilisation de la surveillance sans serveur à l'aide des nouveaux noms de champs. Ces types d'utilisation fonctionnent de la même façon ; la seule différence est que les noms ont été mis à jour.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/api/latest/usage-metering/#get-usage-attribution
[2]: /fr/api/latest/usage-metering/#get-the-list-of-available-daily-custom-reports
[3]: /fr/api/latest/usage-metering/#get-specified-daily-custom-reports
[4]: /fr/api/latest/usage-metering/#get-the-list-of-available-monthly-custom-reports
[5]: /fr/api/latest/usage-metering/#get-specified-monthly-custom-reports
[6]: /fr/api/latest/usage-metering/#get-usage-attribution
[7]: /fr/api/latest/usage-metering/#get-monthly-usage-attribution
[8]: /fr/api/latest/usage-metering/#get-hourly-usage-attribution