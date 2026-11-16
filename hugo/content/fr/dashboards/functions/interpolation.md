---
aliases:
- /fr/graphing/functions/interpolation/
description: Remplissez les valeurs de métrique manquantes dans les données de séries
  temporelles à l'aide des méthodes d'interpolation linéaire, par dernière valeur,
  par zéro ou par valeur nulle.
further_reading:
- link: /dashboards/functions/
  tag: Documentation
  text: Autres types de fonctions
- link: /metrics/guide/interpolation-the-fill-modifier-explained/
  tag: Documentation
  text: Interpolation et modificateur Fill
title: Interpolation
---
## Fill {#fill}

| Fonction | Description                                       | Exemple                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | Interpolez les valeurs de métrique manquantes pour la métrique. | `<METRIC_NAME>{*}.fill(<METHOD>, <LIMIT>)` |

La fonction `fill()` a deux paramètres :

* **`METHOD`** : La fonction à utiliser comme méthode d'interpolation ; choisissez parmi :
    * `linear` : Fournit une interpolation linéaire entre le début et la fin de l'intervalle.
    * `last` : Remplit l'intervalle avec la dernière valeur connue.
    * `zero` : Remplit l'intervalle avec une valeur zéro.
    * `null` : Désactive l'interpolation.

* `LIMIT` [*facultatif*, *par défaut*=**300**, *maximum*=**600**] : La limite d'interpolation (en secondes) qui représente la taille maximale d'un intervalle que vous souhaitez interpoler.

Lisez [Interpolation et modificateur Fill][1] pour une explication détaillée de la fonction `.fill()` et de son impact sur l'interpolation.

## Zéro par défaut {#default-zero}

| Fonction         | Description                             | Exemple                          |
| ---------------- | --------------------------------------- | -------------------------------- |
| `default_zero()` | Ajoute une valeur par défaut aux métriques éparses. | `default_zero(system.load.1{*})` |

La fonction `default_zero()` remplit les intervalles de temps vides avec la valeur 0 ou, si l'interpolation est activée, par interpolation. **Remarque** : L'interpolation est activée par défaut pour les métriques de type `GAUGE`. Comme la plupart des fonctions, `default_zero()` est appliquée **après** [l'agrégation temporelle et spatiale][2].

### Cas d'utilisation {#use-cases}

La fonction `default_zero()` est destinée à répondre aux cas d'utilisation suivants (bien qu'elle puisse également fonctionner pour d'autres cas d'utilisation) :

- Alignement des jauges sur 0 lors de l'exécution d'opérations arithmétiques sur des métriques éparses (remarque : les métriques de type `COUNT` ou `RATE` interrogées `as_count()` ou `as_rate()` sont _toujours_ alignées sur 0, donc l'utilisation de `default_zero()` ne change pas la façon dont elles sont alignées ; cela affecte uniquement les métriques de type `GAUGE`).
- Retour à l'état normal des monitors avant qu'ils ne se retrouvent sans données. Cela fonctionne aussi bien pour les alertes simples que pour les alertes multiples, mais la valeur 0 ne doit pas déclencher le monitor. Par exemple, cela ne fonctionnerait pas pour un monitor utilisant la requête `avg(last_10m):avg:system.cpu.idle{*} < 10`, car ce monitor se déclenche (au lieu de revenir à l'état normal) lorsque le résultat de son évaluation est égal à 0. Évitez d'utiliser cette fonction pour les monitors de taux d'erreur utilisant des requêtes `as_count()`. Consultez le [guide as_count() dans les évaluations de monitors][3] pour plus de détails.
- Remplissage des intervalles vides dans les séries éparses à des fins de visualisation ou pour modifier le minimum, le maximum ou la moyenne d'une série temporelle lors de l'évaluation d'un monitor.
- Affichage de la valeur 0 dans le widget de série temporelle lorsqu'il n'y a pas de données.

### Exemple {#example}

Pour montrer comment fonctionne la fonction `default_zero()`, prenons l'exemple de ce point unique créé pour une métrique personnalisée [à l'aide de DogStatsD][4] :

```text
$ echo -n "custom_metric:1|g" | nc -4u -w0 127.0.0.1 8125
```

Lorsque cette métrique est interrogée sur les 30 dernières minutes, un seul timestamp est enregistré, car un seul des intervalles de cumul de la requête présente un point de données :

```text
avg:custom_metric{*}

+---------------------+---------------+
| Timestamp           | custom_metric |
+---------------------+---------------+
| ---------           | ---------     |
| 2019-04-17 17:45:00 | 1             |
+---------------------+---------------+
```

La fonction `default_zero()` interpole ce point sur les cinq minutes suivantes (la limite d'interpolation par défaut pour les jauges), puis remplit les intervalles vides restants avec des zéros :

```text
default_zero(avg:custom_metric{*})

+---------------------+-----------------------------+
| Timestamp           | default_zero(custom_metric) |
+---------------------+-----------------------------+
| ---------           | ---------                   |
| 2019-04-17 17:30:00 | 0                           |
| 2019-04-17 17:31:00 | 0                           |
...
| 2019-04-17 17:44:00 | 0                           |
| 2019-04-17 17:45:00 | 1                           |
| 2019-04-17 17:46:00 | 1                           |
| 2019-04-17 17:47:00 | 1                           |
| 2019-04-17 17:48:00 | 1                           |
| 2019-04-17 17:49:00 | 1                           |
| 2019-04-17 17:50:00 | 1                           |
| 2019-04-17 17:51:00 | 0                           |
| 2019-04-17 17:52:00 | 0                           |
...
+---------------------+-----------------------------+
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/guide/interpolation-the-fill-modifier-explained/
[2]: /fr/dashboards/functions/#add-a-function
[3]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[4]: /fr/metrics/