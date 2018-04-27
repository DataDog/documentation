---
title: Pourquoi une métrique de type counter est-elle affichée en tant que valeur décimale?
kind: faq
---

Les métriques counter soumises sont normalisées par défaut à un Tate par seconde. Les Rates (taux) ont un sens pour certains types de métriques, comme le nombre de requêtes, car ils suggèrent une valeur qui change constamment au fil du temps:

{{< img src="graphing/faq/CountsBlogImage1.png" alt="CountsBlogImage1" responsive="true" popup="true">}}

If you prefer to view the metric as a total count per time frame, you can append the .as_count() function to the query. Counts allow you to quickly see how many of a particular event happened in a short amount of time. Counts can also be a preferable visualization when there are gaps between occurrences of events:

{{< img src="graphing/faq/CountsBlogImage3.png" alt="CountsBlogImage3" responsive="true" popup="true">}}

To read more about counts and rates, check out [this blog post][1] on the topic.

Note: these functions are only available for statsd metrics.
Due to more complex and varying metadata information datadog-agent counters metrics cannot use the as_count/ as_rate functions at the moment.

[1]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing/
