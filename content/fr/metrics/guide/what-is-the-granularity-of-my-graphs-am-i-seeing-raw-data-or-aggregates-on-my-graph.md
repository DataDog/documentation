---
aliases:
- /fr/graphing/faq/what-is-the-granularity-of-my-graphs-am-i-seeing-raw-data-or-aggregates-on-my-graph
- /fr/dashboards/faq/what-is-the-granularity-of-my-graphs-am-i-seeing-raw-data-or-aggregates-on-my-graph
kind: guide
title: Quel est le niveau de granularité de mes graphiques ? Présentent-ils des données
  brutes ou agrégées ?
---

De manière générale, les graphiques Datadog ne présentent pas les données réelles envoyées, mais plutôt des agrégats locaux.

## Pourquoi ?

Bien que les données soient stockées selon une granularité de 1 seconde, il arrive qu'elles soient agrégées lorsque vous visualisez un graphique.

Pour un graphique avec un intervalle d'une semaine, il faudrait envoyer des centaines de milliers de valeurs à votre navigateur. Tous ces points ne pourraient pas être représentés sur un widget occupant une petite partie de votre écran. Aussi, les données sont agrégées de manière à ce qu'un nombre limité de points soient envoyés à votre navigateur pour afficher un graphique.

Par exemple, pour un graphique représentant une journée donnée avec affichage par lignes, chaque point de données représente 5 minutes. Le backend de Datadog divise l'intervalle d'un jour en 288 compartiments de 5 minutes. Pour chaque compartiment, toutes les données sont cumulées en une seule valeur. Par exemple, le point de données représenté sur votre graphique avec le timestamp 07:00 est en fait un agrégat de tous les points de données réels envoyés entre 07:00:00 et 07:05:00 ce jour-là.

Par défaut, les données agrégées et cumulées sont calculées en faisant la moyenne de toutes les valeurs réelles, ce qui a tendance à [lisser les graphiques lorsque vous effectuez un zoom arrière][1].

## Que pouvez-vous faire ?

Que vous ayez 1 ou 1 000 sources, l'agrégation des données est nécessaire lorsque vous consultez les données d'un intervalle de temps conséquent.

Toutefois, vous pouvez contrôler les paramètres de cette agrégation à l'aide de la [fonction rollup][2] :

* .rollup(max)/ .rollup(min) permet de définir chaque point comme la valeur locale MAXIMUM/MINIMUM des X minutes de données qu'il représente.
* .rollup(avg) correspond à la valeur par défaut : chaque point de votre graphique représente la valeur MOYENNE des X minutes de données qu'il représente.
* .rollup(sum) calcule la SOMME de toutes les valeurs envoyées pendant un intervalle de X minutes.
* .rollup(avg,60) applique la règle selon laquelle les points du graphique représentent les données moyennes sur un intervalle d'une minute, etc.

**Remarque** : le backend de Datadog essaie de maintenir le nombre d'intervalles en dessous d'une valeur proche de 300. Si vous utilisez la fonction rollup(60) sur une période de deux mois, vous ne pourrez donc pas obtenir la granularité d'une minute demandée.

## Exemple
{{< img src="metrics/guide/graph_granularity.png" alt="granularité d'un graphique" >}}

La visualisation ci-dessus est un graphique à barres présentant les données des deux dernières heures, avec un point de données pour chaque minute. Il ne s'agit pas des valeurs réelles envoyées, mais bien d'agrégats locaux, chacun représentant une minute de vos données de métriques.

## Est-il possible de consulter les valeurs réelles envoyées ?

Oui. Dès lors que vous zoomez suffisamment, le graphique affiche les valeurs d'origine. Par exemple, l'Agent Datadog envoie des données selon un intervalle proche de 15 secondes. Si vous appliquez un intervalle de temps de 45 minutes (ou moins), les valeurs ne sont pas agrégées.

[1]: /fr/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[2]: /fr/dashboards/functions/rollup/