---
disable_toc: false
further_reading:
- link: /dashboards/functions/smoothing
  tag: Documentation
  text: Lissage
title: Comment fonctionne weighted() ?
---

Chaque requête de métriques possède un ordre d'évaluation standard (consultez la section [Anatomie d'une requête][1] pour un bref aperçu). Par exemple, la requête suivante est calculée comme suit : 
`sum:kubernetes.cpu.requests{*} by {kube_container_name}.rollup(avg, 10)`

1. Agrégation temporelle -- Additionner les valeurs de chaque série temporelle (définie par une combinaison unique de valeurs de tags) dans le temps pour chaque intervalle de cumul de 10 secondes. Le nombre de combinaisons uniques de valeurs de tags est déterminé par le tag doté de la granularité la plus volatile/élevée, disons `container_id`, sur ce métrique. 
2. Ensuite, par `kube_container_name` (agrégation d'espace), prenez la somme de toutes les valeurs moyennes comme valeur représentative unique. Les valeurs additionnées pour chaque `kube_container_name` dépendent du nombre de `container_id`uniques qu'il y a pour chaque intervalle de cumul.

La fonction `weighted()` tient compte de la courte durée de vie des valeurs du tag `container_id` lorsqu'il est additionné par `kube_container_name` pour cette métrique de type gauge.

#### Exemple
Considérons cette requête avec les hypothèses suivantes : <br>
`sum:kubernetes_state.pod.uptime{*} by {version}.rollup(avg, 10)`

- L'intervalle dʼenvoi de la métrique de type gauge est défini sur 10 secondes. 
- Un point de données est représenté toutes les 60 secondes.
- Il existe à tout moment un pod Kubernetes avec 2 versions. Chaque version est étiquetée avec une application et il n'y a toujours qu'une seule version par application.

Les données brutes sur 60 secondes pourraient ressembler à ce qui suit : 

| Time                 | 0s  |  10 s |  20 s |  30s |  40s |  50s |
| ---                  | --  | ---  | ---  | ---  |  --- |  --- |
| `app:a`, `version:1`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `app:b`, `version:1`   | NAN | 12   | 12   | 12   | NAN  | NAN  |
| `app:c`, `version:1`   | NAN | NAN  | NAN  | NAN  | 12   | 12   |
| `app:d`, `version:2`   | 12  | NAN  | NAN  | NAN  | NAN  | NAN  |
| `app:e`, `version:2`   | NAN | 16   | 16   | 16   | NAN  | NAN  |
| `app:f`, `version:2`   | NAN | NAN  | NAN  | NAN  | 18   | 18   |


1. _Agrégation temporelle - Cumul de données_
Avec l'agrégation temporelle, nous cumulons les données avec `avg` (sans pondération), ou avec la moyenne `weighted` proposée : 
| Agrégation temporelle | .rollup(avg) | Avec .weighted() |
| ----------------   | ------------ | ---------------- |
| `app:a`, `version:1` | 12           | 2.0              |
| `app:b`, `version:1` | 12           | 6.0              |
| `app:c`, `version:1` | 12           | 4.0              |
| `app:d`, `version:2` | 12           | 2.0              |
| `app:e`, `version:2` | 16           | 8.0              |
| `app:f`, `version:2` | 18           | 6.0              |

2. _Agrégation spatiale_ 
Enfin, la métrique est agrégée par version pour obtenir les valeurs finales ci-dessous : 
| Agrégation spatiale par version | .rollup(avg) | Avec .weighted() |
| ------------------------   | ------------ | ---------------- |
| `version:1`                  | 36           | 12               |
| `version:2`                  | 46           | 16               |


La fonction `weighted()` remédie à tout comportement incohérent avec les tags éphémères en pondérant les valeurs par rapport à leur débit dʼenvoi

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/#anatomy-of-a-metric-query