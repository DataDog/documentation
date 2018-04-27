---
title: Comment supprimer la balise de l'host lors de la soumission des métriques via dogstatsD
kind: faq
---

Dans certains cas, vous voudrez peut-être tirer parti des fonctionnalités disponibles avec dogstatsD, mais vous n'aurez pas nécessairement besoin d'afficher les métriques décomposées par un tag d'host ou de réduire le nombre de tags sur une métrique donnée.

Pour supprimer le tag de l'host à appliquer lors de la soumission de métriques via dogstatsD, vous pouvez définir le tag host à rien comme vu ici:

```python

from datadog import statsd
from random import randint

statsd.gauge('metric.test', randint(0,100), tags=['host:', 'box:vagrant'])
```

This results in `metric.test` being reported without a host tag and only box:vagrant as the only tag.

The following article have more information about [custom metrics][1]:

* [Getting Started on custom metrics][2]

And as always, feel free to reach out to [us][3] if you are looking for help with your [custom metrics][1].

**DISCLAIMER**: When removing the host tag you are removing a unique identifier for the submission of [custom metrics][1]. When two datapoints are submitted with the same timestamp/metric/tag combination and do not have unique identifiers the last received/processed value overwrites the value stored. To avoid this edge case, ensure that no host is submitting the same exact metric/tag combination at any given timestamp

[1]: /getting_started/custom_metrics/
[2]: /getting_started/custom_metrics
[3]: /help
