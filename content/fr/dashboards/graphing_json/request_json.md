---
title: Schéma JSON des requêtes
kind: documentation
aliases:
  - /fr/graphing/graphing_json/request_json/
further_reading:
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
  - link: /dashboards/graphing_json/widget_json/
    tag: Documentation
    text: Schéma JSON des widgets
---
Le format global du `REQUEST_SCHEMA` est un array composé d'une ou de plusieurs `requests` :

```text
"requests": [
  {
    "q": "function(aggregation method:metric{scope} [by {group}])"
  }
]
```

Si votre paramètre `requests` comporte plusieurs `requests`, le widget les affiche toutes :

```text
"requests": [
  {
    "q": "<MÉTRIQUE_1>{<CONTEXTE_1>}"
  },
  {
    "apm_query": "<MÉTRIQUE_2>{<CONTEXTE_2>}"
  },
  {
    "log_query": "<MÉTRIQUE_3>{<CONTEXTE_3>}"
  }
]
```

{{< img src="dashboards/graphing_json/multi-lines.png" alt="lignes multiples"  >}}

## Fonctions

Vous pouvez appliquer des fonctions au résultat de chaque requête.

Si vous souhaitez en savoir plus sur les fonctions, des séries d'exemples sont disponibles depuis la [page Fonctions][1].

#### Méthode d'agrégation

Dans la plupart des cas, le nombre de points de données disponibles dépasse le nombre maximum pouvant être affiché à l'écran. Pour remédier à ce problème, les données sont agrégées selon l'une des quatre méthodes disponibles : moyenne, max, min et somme.

#### Métriques

Les métriques sont le point focal des graphiques. Vous trouverez la liste des métriques disponibles sur la page [Résumé des métriques][2]. Cliquez sur une métrique pour l'examiner plus en détail et visualiser le type de données recueillies, les unités, les tags, les hosts et plus encore.

## Contexte

Définissez un contexte pour filtrer une série. Il peut s'agir d'un host, d'un appareil sur un host ou d'un tag quelconque composé de caractères alphanumériques, de deux-points et de tirets bas (`[a-zA-Z0-9:_]+`).

Exemples de contextes et leurs significations :

| Contexte                            | Signification                                    |
|----------------------------------|--------------------------------------------|
| `host:my_host`                   | Relatif à un host donné.                   |
| `host:my_host, device:my_device` | Relatif à un appareil donné sur un host donné. |
| `source:my_source`               | Relatif à une source donnée.                 |
| `my_tag`                         | Relatif à un groupe de hosts tagué.        |
| `my:tag`                         | Identique à ci-dessus.                             |
| `*`                              | Wildcard pour tout.                   |

#### Groupes

Les données pour une même métrique peuvent provenir de plusieurs hosts différents. Les données issues de tous les hosts sont généralement agrégées de façon à obtenir une seule valeur pour chaque intervalle de temps. Vous pouvez les décomposer en spécifiant un tag quelconque. Pour obtenir un point de données distinct pour chaque host, utilisez [host] au sein de votre groupe.

#### Opérations arithmétiques

Vous pouvez appliquer des opérations arithmétiques simples à une série (+, -, * et /).

L'exemple suivant permet de représenter graphiquement la charge mesurée sur 5 minutes ainsi que son double :

```json
{
  "viz": "timeseries",
  "requests": [
    {"q": "system.load.5{intake} * 2"},
    {"q": "system.load.5{intake}"}
  ]
}
```

Vous pouvez également additionner, soustraire, multiplier et diviser une série. Notez qu'aucune cohérence n'est ici imposée par Datadog : vous pouvez donc diviser une métrique apples par une métrique oranges.

```json
{"viz": "timeseries", "requests": [{"q": "metric{apples} / metric{oranges}"}]}
```

## Superposer des séries

{{< img src="dashboards/graphing_json/slice-n-stack.png" alt="filtrer et empiler" >}}

Si vous souhaitez représenter plusieurs séries temporelles connexes, vous pouvez les superposer en zones distinctes avec la syntaxe suivante :

```text
"requests": [
  {
    "q": "metric1{scope}, metric2{scope}, metric3{scope}"
  }
]
```

Au lieu de créer un graphique par requête, vous pouvez ainsi rassembler plusieurs requêtes en les saisissant les unes à la suite des autres.

## Filtrer et superposer

Vous pouvez représenter une métrique partagée par plusieurs hosts et superposer les résultats. Par exemple, lorsque vous sélectionnez un tag qui s'applique à plusieurs hosts, le trafic d'entrée et de sortie est empilé de façon à visualiser clairement le trafic total et le trafic associé à chaque host. Cette fonctionnalité est utile pour identifier des variations inattendues de la distribution du trafic réseau.

Voici comment procéder pour n'importe quelle métrique :

```text
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag, device:eth0} by {host}"
  }
]
```

Notez que dans ce cas, vous ne pouvez définir qu'une seule requête. Mais vous pouvez également fractionner les données par appareil ou par host et appareil à la fois :

```text
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag} by {host,device}"
  }
]
```

Pour visualiser le trafic de tous les hosts tagués, fractionnez les données par host et par appareil réseau.

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

Cet exemple permet de visualiser les cinq séries ayant le pic de valeurs `system.cpu.iowait` le plus élevé dans la fenêtre de requête.

Pour visualiser les positions 6 à 10 des hosts affichant les valeurs les plus élevées (par exemple), utilisez plutôt `top_offset` :

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

[1]: /fr/dashboards/functions
[2]: https://app.datadoghq.com/metric/summary