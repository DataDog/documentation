---
title: Schema JSON des requètes
kind: documentation
further_reading:
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
  - link: graphing/graphing_json/widget_json/
    tag: Documentation
    text: Schéma JSON des Widgets
---
Le format général du `REQUEST_SCHEMA` est un tableau d'une ou plusieurs `requests` :

```
"requests": [
  {
    "q": "function(aggregation method:metric{scope} [by {group}])"
  }
]
```

Si votre paramètre `requests` a plusieurs `requests`, le widget les affiche toutes :

```
"requests": [
  {
    "q": "<METRIC_1>{<SCOPE_1>}"
  },
  {
    "apm_query": "<METRIC_2>{<SCOPE_2>}"
  },
  {
    "log_query": "<METRIC_3>{<SCOPE_3>}"
  }
]
```

{{< img src="graphing/graphing_json/multi-lines.png" alt="plusieurs lignes" responsive="true" >}}

## Fonctions

Vous pouvez appliquer des fonctions au résultat de chaque requête.

Pour en savoir plus sur les fonctions expliquées par une série d'exemples, consultez la [page d'exemples][1].

#### Méthode d'agrégation

Dans la plupart des cas, le nombre de points de données disponibles dépasse le nombre maximum pouvant être affiché à l'écran. Pour contourner cela, les données sont agrégées en utilisant l'une des quatre méthodes disponibles : moyenne, max, min et somme.

#### Métriques

Les métriques sont le point focal des graphiques. Vous trouverez la liste des métriques disponibles dans le [Résumé des métriques][2]. Cliquez sur une métrique pour plus de détails sur cette métrique, y compris le type de données recueillies, les unités, les tags, les hosts et davantage.

## Contexte

Un contexte vous permet de filtrer une série. Il peut s'agir d'un host, d'un appareil ou d'un tag quelconque contenant des caractères alphanumériques uniquement, plus des deux-points et des underscrores (`[a-zA-Z0-9:_]+`).

Exemples de contextes et leurs significations :

| Contexte | Signification |
| --- | --- |
| `host:my_host` | Relatif à un host donné. |
| `host:my_host, device:my_device` | Relatif à un appareil donné sur un host donné. |
| `source:my_source` | Relatif à une source donnée. |
| `my_tag` | Relatif à un groupe de hosts tagué. |
| `my:tag` | Comme précédent. |
| `*` | Wildcard pour tout. |

#### Groupes

Pour n'importe quelle métrique donnée, les données peuvent provenir de plusieurs hosts. Les données sont normalement agrégées à partir de tous ces hosts en une seule valeur pour chaque intervalle de temps. Vous pouvez les décomposer par tag quelconque. Pour inclure un point de données séparé par chaque host, utilisez [host] pour votre groupe.

#### Opérations arithmétiques

Vous pouvez appliquer des opération arithmétiques simples à une série (+, -, * et /).

L'exemple suivant représente le graphique de charge de 5 minutes et son double :

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "system.load.5{intake} * 2"
    },
    {
      "q": "system.load.5{intake}"
    }
  ]
}
```

Vous pouvez également additionner, soustraire, multiplier et diviser une série. Notez que Datadog n'impose pas la cohérence à ce niveau. Vous *pouvez* donc diviser des pommes par des oranges.

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "metric{apples} / metric{oranges}"
    }
  ]
}
```

## Séries empilées

{{< img src="graphing/graphing_json/slice-n-stack.png" alt="filtrer et empiler" responsive="true" >}}

Dans le cas de séries temporelles liées, vous pouvez les représenter en zones empilées en utilisant la syntaxe suivante :

```
"requests": [
  {
    "q": "metric1{scope}, metric2{scope}, metric3{scope}"
  }
]
```

Au lieu d'une requête par graphique, vous pouvez agréger toutes les requêtes en une seule et concaténer les requêtes.

## Filtrer et empiler

Vous pouvez représenter une métrique partagée sur plusieurs hosts et empiler les résultats. Par exemple, si vous sélectionnez un tag qui s'applique à plusieurs hosts, vous voyez que le trafic d'entrée et de sortie est proprement empilé pour vous donner la somme ainsi que la décomposition par host. Cela est utile pour identifier des variations inattendues de la distribution du trafic réseau.

Voici comment le faire pour une métrique quelconque :

```
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag, device:eth0} by {host}"
  }
]
```

Notez que dans ce cas, vous ne pouvez avoir qu'une seule requête. Mais vous pouvez également filtrer par appareil ou une combinaison des deux :

```
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag} by {host,device}"
  }
]
```

Pour obtenir le trafic de tous les hosts  tagués, filtrez par host et appareil réseau.

#### Exemples

Voici un exemple qui utilise la fonction `rate()`, qui prend une seule métrique comme paramètre. Les autres fonctions, à l'exception de `top()` et `top_offset()`, ont une syntaxe identique.

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "rate(sum:system.load.5{role:intake-backend2} by {host})",
      "stacked": false
    }
  ]
}
```

Voici un exemple qui utilise la fonction `top()` :

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "top(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc')",
      "stacked": false
    }
  ]
}
```

Affiche le graphique des cinq séries ayant le pic de valeurs `system.cpu.iowait` le plus élevé dans la fenêtre de requête.

Pour afficher les hosts avec les 6e à 10e valeurs les plus élevées (par exemple), utilisez `top_offset` à la place :

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "top_offset(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc', 5)",
      "stacked": false
    }
  ]
}
```

Voici un exemple qui utilise la fonction `week_before()` :

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "sum:haproxy.count_per_status{status:available} - week_before(sum:haproxy.count_per_status{status:available})"
    }
  ]
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/functions
[2]: https://app.datadoghq.com/metric/summary