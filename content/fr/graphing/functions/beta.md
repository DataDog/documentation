---
title: Fonctions Bêta
kind: documentation
---
Des fonctions Bêta sont disponibles lorsque vous modifiez directement une requête JSON.

## Default Zero

| Fonction         | Description                             | Exemple                          |
| ---------------- | --------------------------------------- | -------------------------------- |
| `default_zero()` | Ajoute une valeur par défaut aux métriques creuses. | `default_zero(system.load.1{*})` |

La fonction `default_zero` remplit les intervalles vides par interpolation (si l'interpolation est activée ; elle est activée par défaut pour les métriques de type `GAUGE`) ou avec la valeur 0. Comme la plupart des fonctions, elle est évaluée **après** [l'agrégation spatiale et temporelle][1].

### Cas d'utilisation

La fonction `default_zero` peut notamment être utilisée pour :

- Aligner des gauges sur la valeur 0 lors de la réalisation d'opérations arithmétiques sur des métriques creuses. Remarque : les métriques de type `COUNT` ou `RATE` traitées via `as_count()` ou `as_rate()` sont _toujours_ alignées sur la valeur 0. L'utilisation de `default_zero` ne modifie pas leur alignement : seules les métriques de type `GAUGE` sont affectées.
- Résoudre des monitors depuis l'état no-data. Cela fonctionne pour les alertes simples et multiples, mais la valeur 0 ne doit pas causer le déclenchement du monitor. Par exemple, la fonction ne pourrait pas résoudre un monitor utilisant la requête `avg(last_10m):avg:system.cpu.idle{*} < 10` car ce monitor se déclenche (au lieu de se résoudre) lorsqu'il détecte la valeur 0. Évitez d'utiliser cette fonction pour les monitors de taux d'erreur utilisant une requête `as_count()` (consultez [cet article][2] pour en savoir plus).
- Remplir des intervalles vides dans des séries de métriques creuses (mais non vides) pour des raisons visuelles ou pour ajuster la valeur min/max/moyenne d'une série temporelle dans une évaluation de monitor.
- Afficher la valeur 0 sur le widget Valeur de requête en cas d'absence de données.

### Exemple

Pour illustrer le fonctionnement de la fonction `default_zero`, prenons ce point de données unique créé pour une métrique custom [avec DogStatsD][3] :

```
$ echo -n "custom_metric:1|g" | nc -4u -w0 127.0.0.1 8125
```

Lorsque cette métrique est interrogée sur les 30 dernières minutes, un seul timestamp est enregistré, car un seul des intervalles de cumul de la requête présente un point de données :

```
avg:custom_metric{*}

+---------------------+---------------+
| Timestamp           | custom_metric |
+---------------------+---------------+
| ---------           | ---------     |
| 2019-04-17 17:45:00 | 1             |
+---------------------+---------------+
```

La fonction `default_zero` permet d'interpoler ce point de données cinq minutes en avant dans le temps (la limite d'interpolation par défaut pour les gauges), puis de remplir les intervalles vides restant avec des zéros :

```
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

## Exclure les valeurs null

| Fonction         | Description                                    | Exemple                                        |
|------------------|------------------------------------------------|------------------------------------------------|
| `exclude_null()` | Supprime les groupes sans valeur de votre graphique ou de votre Top List. | `exclude_null(avg:system.load.1{*} by {host})` |

## Moyenne mobile

| Fonction          | Description                                    | Exemple                           |
|-------------------|------------------------------------------------|-----------------------------------|
| `rollingavg_5()`  | Calcule la moyenne mobile sur un intervalle de 5 points de données.   | `rollingavg_5(system.load.1{*})`  |
| `rollingavg_13()` | Calcule la moyenne mobile sur un intervalle de 13 points de données.  | `rollingavg_13(system.load.1{*})` |
| `rollingavg_21()` | Calcule la moyenne mobile sur un intervalle de 21 points de données.  | `rollingavg_21(system.load.1{*})` |
| `rollingavg_29()` | Calcule la moyenne mobile sur un intervalle de 29 points de données.  | `rollingavg_29(system.load.1{*})` |

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Total : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/getting_started/from_the_query_to_the_graph/#proceed-to-space-aggregation
[2]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[3]: /fr/developers/metrics/datagram_shell/#sending-metrics