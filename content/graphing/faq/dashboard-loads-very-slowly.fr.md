---
title: Le dashboard se charge très lentement / n'affiche aucune donnée, mais j'envoie correctement les données à Datadog
kind: faq
---

Votre dashboard ou graphique prend-il beaucoup de temps à charger? Lorsque vous regardez une période de temps plus longue, cela lui prend-il plus de temps à charger, ou même il ne se charge pas complétement?

Cela signifie probablement que vous soumettez plusieurs tags différents pour les métriques de votre graphique.

## La cause

For a given metric, and for each unique combination of tags with which you send data to Datadog, we create a new record on our backend to store things separately. We do this so that we are able to exactly identify the data you asked for when you query a metric for any specific tag combination.

With a large number of unique tag combinations, it takes a longer time to query and aggregate data on our end. This causes a delay in populating your graph with data. Within a wider time-window, it's likely that there is even more unique tag combinations, resulting in a longer delay before you see metrics. You may even see no visualization at all when the delay hits the time out.

### Plus d'informations

You may find information and examples about unique tag combinations in [this article][1]

## Recommendation

As a consequence, we encourage you to tag your metrics with fewer than 1000 tags for querying purposes. You can review the number of tags for any specific metric on your [Metric Summary page][4].

## Billing impact

The number of [custom metrics][2] (where a custom metric refers to a single, unique combination of a metric name, host, and any tags) may count towards your billing. We usually offer a soft limit of `100 custom metrics * # hosts monitored via Datadog.`

## Questions?

If you plan on continuing to submit more [custom metrics][2] than the billing limit in the future, or if you have any questions, reach out to [us directly][3]

[1]: /getting_started/custom_metrics
[2]: /getting_started/custom_metrics/
[3]: /help
[4]: https://app.datadoghq.com/metric/summary
