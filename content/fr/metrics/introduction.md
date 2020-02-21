---
title: Présentation des métriques
kind: documentation
description: 'En savoir plus sur les données, l''agrégation et la représentation graphique des métriques'
aliases:
  - /fr/graphing/metrics/introduction/
further_reading:
  - link: /metrics/explorer
    tag: Documentation
    text: Metrics Explorer
  - link: /metrics/summary
    tag: Documentation
    text: Metrics Summary
  - link: /metrics/distributions
    tag: Documentation
    text: Distributions de métriques
---
### Données des métriques

Dans Datadog, les données des métriques sont ingérées et stockées sous forme de points de données avec une valeur et un timestamp :

```text
[ 17.82,  22:11:01 ]
```

Une séquence de points de données est stockée sous la forme d'une série temporelle :

```text
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

Datadog est capable de stocker un point de métriques par seconde, mais nous vous conseillons d'envoyer vos points de métriques toutes les 15 secondes seulement. Toutes les métriques dont le timestamp est composé de fractions d'une seconde sont arrondies à la seconde la plus proche. Si plusieurs points partagent le même timestamp, le dernier point remplace les précédents.

### Requête

Une requête extrait une série temporelle stockée et transmet les points de données d'une plage temporelle donnée. Voici le graphique représentant 15 minutes d'une série temporelle :

{{< img src="metrics/introduction/query.png" alt="Requête" >}}

Lorsque la plage temporelle est limitée, tous les points de données s'affichent. Toutefois, lorsqu'elle s'élargit, il devient impossible d'afficher des milliers de points de données brutes dans un seul pixel.

### Agrégation temporelle

Datadog utilise l'agrégation temporelle pour résoudre le problème d'affichage. Les points de données sont placés dans des compartiments de temps avec des points de début et de fin prédéfinis. Par exemple, pour une période de quatre heures, les points de données sont combinés dans des compartiments de cinq minutes. Cette combinaison de points de données porte le nom de **rollup** :

{{< img src="metrics/introduction/time-aggregation.png" alt="Agrégation temporelle" >}}

Datadog essaie de renvoyer environ 150 points par intervalle donné, de sorte que vous observerez une granularité de moins en moins précise à mesure que la durée demandée augmente. Cette agrégation temporelle repose sur un système de moyennes.

### Combiner des séries temporelles

Les séries temporelles sont souvent combinées de façon à en représenter une seule. Imaginez par exemple que vous souhaitez consulter le volume moyen de données reçu par les serveurs Web de votre infrastructure.

Prenons deux hosts qui envoient la même métrique à Datadog :

{{< img src="metrics/introduction/adding-by-host.png" alt="Deux hosts envoient des métriques à Datadog" style="width:35%;">}}

Lorsqu'on examine les données réparties par host, on remarque que l'envoi de la métrique `net.bytes_rcvd` est légèrement décalé.

{{< img src="metrics/introduction/mismatched-time-series.png" alt="Séries temporelles décalées" >}}

### Agrégation spatiale

Pour combiner les deux séries temporelles, les données doivent être synchronisées dans le temps. Datadog utilise l'une des méthodes suivantes :

  1. Si aucune agrégation temporelle n'est appliquée, les points de données doivent être interpolés. Il faut convenir d'un timestamp commun. La valeur de chaque série temporelle est alors estimée à ce moment-là.

    {{< img src="metrics/introduction/interpolation.png" alt="Interpolation"  style="width:80%;">}}

  2. En cas d'application d'une agrégation temporelle, on utilise une fonction de rollup pour créer des compartiments temporels qui partagent les points de début et de fin de chacune des séries temporelles :

    {{< img src="metrics/introduction/rollup.png" alt="Rollup"  style="width:80%;">}}

Une fois les points alignés temporellement, une agrégation spatiale est appliquée sur les séries temporelles de façon à générer une seule série temporelle représentant la moyenne des deux :

{{< img src="metrics/introduction/combined-series.png" alt="Interpolation" >}}

### Décomposition de la requête de la métrique

Dans Datadog, la requête de la métrique ressemble à ce qui suit :

{{< img src="metrics/introduction/ui-query.png" alt="Requête via l'interface"  style="width:70%;">}}

D'après le JSON, la requête peut être divisée en plusieurs sections, à savoir l'agrégation spatiale, le nom de la métrique, le contexte et le regroupement :

{{< img src="metrics/introduction/color-query.png" alt="Requête expliquée" style="width:70%;">}}

* Le **contexte** désigne l'ensemble des tags utilisés pour choisir les séries temporelles associées à la requête.
* Le **regroupement** désigne l'ensemble des tags sur lesquels l'agrégation spatiale est appliquée.
* L'**agrégation temporelle** est effectuée de manière implicite. Toutefois, elle peut être définie manuellement à l'aide de la fonction de rollup :

{{< img src="metrics/introduction/color-query2.png" alt="Requête expliquée" style="width:70%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}