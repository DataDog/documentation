---
aliases:
- /fr/graphing/functions/interpolation/
title: Interpolation
---

## Fill

| Fonction | Description                                       | Exemple                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | Permet d'interpoler les valeurs manquantes d'une métrique. | `<NOM_MÉTRIQUE>{*}.fill(<MÉTHODE>, <LIMITE>)` |

La fonction `fill()` comprend deux paramètres :

* **`MÉTHODE`** : la fonction à utiliser comme méthode d'interpolation. Valeurs autorisées :
    * **linear** : renvoie une interpolation linéaire entre le début et la fin de l'intervalle manquant.
    * **last** : remplace l'intervalle manquant par la dernière valeur de celui-ci.
    * **zero** : remplace l'intervalle manquant par un zéro.
    * **null** : désactive l'interpolation.

* `LIMITE` [*facultatif*, *défaut*=**300**, *maximum*=**600**] : la limite d'interpolation (en secondes), c'est-à-dire la taille maximale d'un intervalle manquant que vous souhaitez interpoler.

## Default zero

| Fonction         | Description                             | Exemple                          |
| ---------------- | --------------------------------------- | -------------------------------- |
| `default_zero()` | Ajoute une valeur par défaut aux métriques creuses. | `default_zero(system.load.1{*})` |

La fonction `default_zero()` remplit les intervalles vides avec la valeur 0 ou par interpolation, si cette dernière est activée. **Remarque** : l'interpolation est activée par défaut pour les métriques de type `GAUGE`. Comme la plupart des fonctions, la fonction `default_zero()` est appliquée **après** l'[agrégation temporelle et spatiale][1].

### Cas d'utilisation

La fonction `default_zero()` peut notamment être utilisée pour :

- Aligner des gauges sur la valeur 0 lors de la réalisation d'opérations arithmétiques sur des métriques creuses. Remarque : les métriques de type `COUNT` ou `RATE` traitées via `as_count()` ou `as_rate()` sont _toujours_ alignées sur la valeur 0. L'utilisation de `default_zero()` ne modifie pas leur alignement : seules les métriques de type `GAUGE` sont affectées.
- Rétablir l'état des monitors depuis l'état no-data. Cela fonctionne pour les alertes simples et multiples, mais la valeur 0 ne doit pas causer le déclenchement du monitor. Par exemple, la fonction ne pourrait pas rétablir l'état d'un monitor utilisant la requête `avg(last_10m):avg:system.cpu.idle{*} < 10`, car ce monitor se déclenche (au lieu de rétablir son état) lorsqu'il détecte la valeur 0. Évitez d'utiliser cette fonction pour les monitors de taux d'erreur utilisant une requête `as_count()`. Consultez la section [as_count() dans les évaluations de monitors][2] pour en savoir plus.
- Remplir des intervalles vides dans des séries de métriques creuses (mais non vides) pour des raisons visuelles ou pour ajuster la valeur min/max/moyenne d'une série temporelle dans une évaluation de monitor.
- Afficher la valeur 0 sur le widget Série temporelle en l'absence de données.

### Exemple

Pour illustrer le fonctionnement de la fonction `default_zero()`, prenons ce point de données unique créé pour une métrique custom [avec DogStatsD][3] :

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

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/getting_started/from_the_query_to_the_graph/#proceed-to-space-aggregation
[2]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[3]: /fr/metrics/