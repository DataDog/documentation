---
title: Il y a trop de lignes sur mon graphique, puis-je afficher uniquement les plus importantes?
kind: faq
---

## Problème

Lorsque vous utilisez une requête groupée, il y a parfois trop de lignes affichées sur le graphique, et vous pourriez vous retrouver avec quelque chose qui n'est pas facile à lire, par exemple:

{{< img src="graphing/faq/too_many_metrics_1.png" alt="too_many_metrics_1" responsive="true" popup="true">}}

... where you only need to focus on the hosts with high load values here.

## Solution

The top function is a good fit to display only the few relevant lines on the graph:

{{< img src="graphing/faq/too_many_metrics_2.png" alt="too_many_metrics_2" responsive="true" popup="true">}}

[Find more documentation about the top function, its parameters and its aliases][1]

[1]: /graphing/miscellaneous/functions
