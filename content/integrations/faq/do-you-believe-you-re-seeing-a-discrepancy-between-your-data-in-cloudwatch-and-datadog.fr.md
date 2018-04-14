---
title: Croyez-vous constater un écart entre vos données dans CloudWatch et Datadog?
kind: faq
---

Il y a deux distinctions importantes à connaître:

1. Dans AWS pour les compteurs, un graphique défini sur 'sum' '1minute' indique le nombre total d'occurrences dans une minute jusqu'à ce point, c'est-à-dire le taux par minute. Datadog affiche les données brutes à partir des valeurs AWS normalisées par seconde, quelle que soit la période sélectionnée dans AWS, ce qui explique pourquoi notre valeur sera probablement inférieure.
2. Overall, min/max/avg have a different meaning within AWS than in Datadog. In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog pulls metrics from AWS Cloudwatch, we only get the average latency as a single time series per ELB. Within Datadog, when you are selecting 'min', 'max', or 'avg', you are controlling how multiple time series are combined. For example, requesting system.cpu.idle without any filter would return one series for each host that reports that metric and those series need to be combined to be graphed. On the other hand, if you requested system.cpu.idle from a single host, no aggregation would be necessary and switching between average and max would yield the same result.

How do I conform my data on Datadog to what I am seeing on CloudWatch? Can I use Rollup()?

1. Using the example above, AWS CloudWatch reports metrics at 1 minute granularity normalized to per minute data, so it is as easy as multiplying by 60 because we report metrics at 1 minute granularity normalized to per second data.
2. Les Rollups ne présentent pas de résultats similaires. La tentative d'appel de Rollups serait le rollup(sum, 60) où le serveur regroupe tous les points de données dans des buckets de 1 minute et renvoie la somme de chaque bucket comme point de données. Cependant, la granularité des métriques AWS est de 1 minute, il n'y a donc qu'un seul point de données par bucket ce qui ne provoque aucun changement.

