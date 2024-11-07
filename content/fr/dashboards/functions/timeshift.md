---
aliases:
- /fr/graphing/functions/timeshift/
further_reading:
- link: /dashboards/faq/how-can-i-graph-the-percentage-change-between-an-earlier-value-and-a-current-value/
  tag: FAQ
  text: Créez un graphique illustrant le changement de pourcentage entre une valeur
    passée et une valeur actuelle.
title: Décalage temporel
---

Voici un ensemble de fonctions pour l'expression `<PÉRIODE>_before()`. Ces fonctions permettent d'afficher les valeurs de la période correspondante sur le graphique. Utilisées seules, leur intérêt peut être limité ; toutefois, lorsqu'elles sont combinées avec les valeurs actuelles, elles peuvent apporter des statistiques utiles concernant les performances de votre application.

## Décalage temporel

| Fonction      | Description                                                                                    | Exemple                                          |
|:--------------|:-----------------------------------------------------------------------------------------------|:-------------------------------------------------|
| `timeshift()` | Créez un graphique des valeurs correspondant à un `<TEMPS_EN_SECONDES>` arbitraire avant le timestamp actuel de la métrique. | `timeshift(<NOM_MÉTRIQUE>{*}, -<TEMPS_EN_SECONDES>)` |

Par exemple, si vous souhaitez vous en servir pour comparer la charge système actuelle avec la charge de deux semaines plus tôt (60 \* 60 \* 24 \* 14 = 1 209 600), utilisez la requête suivante :

```text
timeshift(avg:system.load.1{*}, -1209600)
```

## Heure précédente

| Fonction        | Description                                                            | Exemple                         |
|:----------------|:-----------------------------------------------------------------------|:--------------------------------|
| `hour_before()` | Créez un graphique à partir des valeurs d'une heure avant le timestamp actuel de la métrique. | `hour_before(<NOM_MÉTRIQUE>{*})` |

Voici un exemple de `system.load.1` avec la valeur `hour_before()` représentée par une ligne pointillée. Dans cet exemple-ci, on peut voir que le système a été démarré à 6 h 30 et que les valeurs de l'heure précédente `hour_before()` sont affichées à la marque 7 h 30. Bien sûr, cet exemple a été spécialement pensé pour que les valeurs de `hour_before()` correspondent aux valeurs réelles.

{{< img src="dashboards/functions/timeshift/simple_hour_before_example.png" alt="Exemple simple d'heure précédente" style="width:80%;">}}

## Jour précédent

| Fonction       | Description                                                          | Exemple                        |
|:---------------|:---------------------------------------------------------------------|:-------------------------------|
| `day_before()` | Crée un graphique à partir des valeurs d'un jour avant le timestamp actuel de la métrique. | `day_before(<NOM_MÉTRIQUE>{*})` |

Voici un exemple de `nginx.net.connections` avec la valeur `day_before()` représentée par une ligne plus fine. Cet exemple inclut une semaine de données, ce qui permet d'identifier facilement les données de `day_before()`.

{{< img src="dashboards/functions/timeshift/simple_day_before_example.png" alt="Exemple simple de jour précédent" style="width:80%;">}}

## Semaine précédente

| Fonction        | Description                                                                    | Exemple                         |
|:----------------|:-------------------------------------------------------------------------------|:--------------------------------|
| `week_before()` | Crée un graphique à partir des valeurs d'une semaine (7 jours) avant le timestamp actuel de la métrique. | `week_before(<NOM_MÉTRIQUE>{*})` |

Voici un exemple de `cassandra.db.read_count` avec la valeur `week_before()` représentée par une ligne pointillée. Cet exemple inclut environ trois semaines de données, ce qui permet d'identifier facilement les données de `week_before()`.

{{< img src="dashboards/functions/timeshift/simple_week_before_example.png" alt="Exemple simple de semaine précédente" style="width:80%;">}}

### Mois précédent

| Fonction         | Description                                                                                | Exemple                          |
|:-----------------|:-------------------------------------------------------------------------------------------|:---------------------------------|
| `month_before()` | Crée un graphique à partir des valeurs d'un mois (28 jours/4 semaines) avant le timestamp actuel de la métrique. | `month_before(<NOM_MÉTRIQUE>{*})` |

Voici un exemple de `aws.ec2.cpuutilization` avec la valeur `month_before()` représentée par une ligne fine continue.

{{< img src="dashboards/functions/timeshift/simple_month_before_example.png" alt="Exemple simple de mois précédent" style="width:80%;">}}

## Autres fonctions

{{< whatsnext desc="Consultez les autres fonctions disponibles :" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}Exclusion : excluez certaines valeurs de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}