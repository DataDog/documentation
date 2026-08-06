---
aliases:
- /fr/graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
- /fr/dashboards/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
further_reading:
- link: /metrics/introduction/#combining-time-series
  tag: Documentation
  text: Agrégation spatiale
title: Le fait de basculer entre les agrégateurs sum/min/max/avg nʼentraîne pas de
  modification de la valeur
---

Lorsque vous utilisez les agrégateurs `sum`/`min`/`max`/`avg`, vous les appliquez sur plusieurs séries, et non sur des points au sein dʼune seule série. Cela signifie que si la requête est très précise, il est possible que le fait de basculer entre ces agrégateurs nʼentraîne pas de modification des valeurs affichées.

Par exemple, si vous décomposez des requêtes Web en isolant `host` et `path`, pour lesquels vous obtenez une série pour chaque combinaison, les données à un moment précis peuvent ressembler à ceci :

| Nom de la métrique  | Tags                      | Valeur |
| ------------ | ------------------------- | ----- |
| web.requests | `host: a`, `path: /test1` | 5     |
| web.requests | `host: a`, `path: /test2` | 3     |
| web.requests | `host: b`, `path: /test1` | 2     |
| web.requests | `host: b`, `path: /test2` | 8     |

Lorsque vous effectuez un regroupement par `host`, vous obtenez différents résultats en fonction du mode dʼagrégation, car il y a deux séries par `host` devant être combinées.

| Requête                           | host: a | host: b |
| ------------------------------- | ------- | ------- |
| `sum:web.requests(*) by {host}` | 8       | 10      |
| `min:web.requests(*) by {host}` | 3       | 2       |
| `max:web.requests(*) by {host}` | 5       | 8       |
| `avg:web.requests(*) by {host}` | 4       | 5       |

Si vous effectuez un regroupement par `host` **et** `path` dans cet exemple, vous aurez pour résultat quatre séries avec les mêmes `sum`/`min`/`max`/`avg` pour chacune dʼentre elles, car il sʼagit du niveau le plus précis pour ces données.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}