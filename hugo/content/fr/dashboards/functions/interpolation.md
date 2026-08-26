---
aliases:
- /fr/graphing/functions/interpolation/
description: Remplir les valeurs de métrique manquantes en utilisant des méthodes
  d'interpolation linéaire, dernière valeur, zéro ou nulle dans les données de séries
  temporelles.
further_reading:
- link: /dashboards/functions/
  tag: Documentation
  text: Autres types de fonctions
- link: /metrics/guide/interpolation-the-fill-modifier-explained/
  tag: Documentation
  text: Interpolation et le modificateur Fill
title: Interpolation
---

## Fill

| Fonction | Rôle                                       | Exemple                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | Permet d'interpoler les valeurs manquantes d'une métrique. | `<METRIC_NAME>{*}.fill(<METHOD>, <LIMIT>)` |

La fonction `fill()` comprend deux paramètres :

* **`MÉTHODE`** : la fonction à utiliser comme méthode d'interpolation. Valeurs autorisées :
    * **linear** : renvoie une interpolation linéaire entre le début et la fin de l'intervalle manquant.
    * **last** : remplace l'intervalle manquant par la dernière valeur de celui-ci.
    * **zero** : remplace l'intervalle manquant par un zéro.
    * **null** : désactive l'interpolation.

* `LIMITE` [*facultatif*, *défaut*=**300**, *maximum*=**600**] : la limite d'interpolation (en secondes), c'est-à-dire la taille maximale d'un intervalle manquant que vous souhaitez interpoler.

Consultez [Interpolation et le modificateur Fill][1] pour une explication détaillée de la fonction `.fill()` et de son impact sur l'interpolation.

## Default zero

| Fonction         | Rôle                             | Exemple                          |
| ---------------- | --------------------------------------- | -------------------------------- |
| `default_zero()` | Ajoute une valeur par défaut aux métriques creuses. | `default_zero(system.load.1{*})` |

La fonction `default_zero()` remplit les intervalles vides avec la valeur 0 ou par interpolation, si cette dernière est activée. **Remarque** : l'interpolation est activée par défaut pour les métriques de type `GAUGE`. Comme la plupart des fonctions, la fonction `default_zero()` est appliquée **après** l'[agrégation temporelle et spatiale][2].

### Cas d'utilisation

La fonction `default_zero()` peut notamment être utilisée pour :

- Aligner des gauges sur la valeur 0 lors de la réalisation d'opérations arithmétiques sur des métriques creuses. Remarque : les métriques de type `COUNT` ou `RATE` traitées via `as_count()` ou `as_rate()` sont _toujours_ alignées sur la valeur 0. L'utilisation de `default_zero()` ne modifie pas leur alignement : seules les métriques de type `GAUGE` sont affectées.
- Résoudre les monitors avant qu'ils n'entrent dans une condition de non-données. Cela fonctionne pour les alertes simples et multiples, mais la valeur 0 ne doit pas déclencher le monitor. Par exemple, cela ne fonctionnerait pas pour un monitor avec la requête `avg(last_10m):avg:system.cpu.idle{*} < 10` car ce monitor se déclenche (au lieu de se résoudre) lorsqu'il s'évalue à 0. Évitez d'utiliser cette fonction pour les monitors de taux d'erreur avec des requêtes `as_count()`. Consultez la section [Guide as_count() dans les évaluations de monitor][3] pour plus de détails.
- Remplir les intervalles vides dans des séries partielles (mais non vides) pour des raisons visuelles ou pour affecter le min/max/moyenne d'une série temporelle dans une évaluation de monitor. Si la fenêtre d'évaluation ne contient aucun point de données, `default_zero()` n'a aucun effet.
- Afficher la valeur 0 sur le widget Série temporelle en l'absence de données.

### Exemple

Pour illustrer le fonctionnement de la fonction `default_zero()`, prenons ce point de données unique créé pour une métrique custom [avec DogStatsD][4] :

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

La fonction `default_zero()` permet d'interpoler ce point de données cinq minutes en avant dans le temps (la limite d'interpolation par défaut pour les gauges), puis de remplir les intervalles vides restant avec des zéros :

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/guide/interpolation-the-fill-modifier-explained/
[2]: /fr/dashboards/functions/#add-a-function
[3]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[4]: /fr/metrics/