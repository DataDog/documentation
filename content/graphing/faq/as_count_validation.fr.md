---
title: as_count dans les monitors
kind: faq
---

Les graphiques de Datadog utilisent [l'agrégation de temps][1] pour réduire le le nombre de points sur une période donnée; Ceci est fait pour des raisons de performances mais aussi car une granularité supérieure à 350 points de données dans un graphique ne fournit pas d'informations supplémentaires.

#### Qu'est ce qui a changé?
Auparavant, nous autorisions la création de monitors utilisant l'agrégation de moniteur `average` /` min` / `max` avec la [fonction][2] ` as_count`.

Maintenant, la seule requête disponible est `sum`, qui est la seule fonction mathématique précise avec un tel comportement. Ce comportement s'applique à la création de nouveaux monitors uniquement et n'affecte pas la modification des monitors existants.

#### Exemple

Quand une agrégation `avg` est appliquée sur une métrique de count, elle effectue AVG ([5,1,2,1]) au lieu de AVG ([5,1,2, Null, Null, Null, 1]). Cela signifie que nous additionnons tous les nombres valides et que nous les divisons par un nombre arbitraire de buckets avec une valeur non nulle.

Si vous effectuez un zoom arrière - vous obtiendrez une moyenne de [6,2,1] qui produirait un résultat différent - si nous considérons le nombre de buckets entre le zoom avant / arrière, nous pouvons noter que le zoom influe sur le résultat.

Pour contourner le problème, modifiez ce monitor pour alerter sur le  `as_rate ()` de cette métrique.

[1]: /graphing/faq/what-is-the-granularity-of-my-graphs-am-i-seeing-raw-data-or-aggregates-on-my-graph
[2]: /graphing/miscellaneous/functions
