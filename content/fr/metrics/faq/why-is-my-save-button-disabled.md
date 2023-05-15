---
is_beta: false
kind: faq
title: Pourquoi mon bouton « Save » est-il grisé lorsque je configure des tags de
  métriques ?
---
Il arrive parfois qu'une configuration suggérée génère un volume de métriques custom indexées plus élevé que le volume initial de métriques ingérées. Le bouton « Save » est intentionnellement grisé dans les cas peu fréquents où il est plus rentable de ne pas du tout configurer une métrique et de ne pas utiliser Metrics Without Limits™.

Avec [Metrics without Limits™][1], vous pouvez continuer à transmettre à Datadog le volume de métriques initialement envoyées sans aucune modification du code, et définir une configuration de tags afin de ne conserver qu'un petit sous-ensemble de métriques custom à indexer.

Si vous utilisez Metrics without Limits™, vos données de métriques brutes d'origine doivent être recombinées et ré-agrégées, puis stockées avec ce volume inférieur de métriques custom indexées afin de garantir des résultats de requête mathématiquement corrects. Aussi, pour chacune des métriques custom indexées restantes, Datadog conserve votre nombre défini d'agrégations temporelles/spatiales.

Le nombre de métriques custom indexées obtenues pour votre configuration Metrics without Limits™ est calculé comme suit : (`nombre de combinaisons de valeurs de tag restantes` spécifié par votre configuration de tags) X (`nombre d'agrégations temporelles/spatiales` spécifié dans la section Customize Aggregations)

**Exemple**
Supposons que vous souhaitiez utiliser Metrics without Limits™ pour réduire la cardinalité de la métrique `shopist.basket.size`. 

{{< img src="metrics/faq/all-tags.jpg" alt="Configuration « All tags »">}}

En partant du principe que `shopist.basket.size` transmet des valeurs pour quatre combinaisons de valeurs de tag, par exemple {host: a, region: us, env: prod}, cela signifie que `shopist.basket.size` émet initialement **quatre métriques custom**, comme le montre le schéma suivant :

{{< img src="metrics/faq/all-tags-diagram.jpg" alt="Répartition des métriques custom avec la configuration « All Tags »">}}

Si on utilise Metrics without Limits™ pour configurer uniquement les tags `{region, env}`, il ne reste que trois combinaisons de valeurs de tag :
* `{region:us, env:prod}`
* `{region:eu, env:prod}`
* `{region:us, env:dev}`

{{< img src="metrics/faq/disabled-save.png" alt="Bouton « Save Configuration » grisé">}}

Le nombre de métriques custom obtenues pour cette configuration suggérée est calculé comme suit : (`nombre de combinaisons de valeurs de tag restantes`) X (`nombre d'agrégations temporelles/spatiales`) = `(3) X (2)` = **6 métriques custom**.

{{< img src="metrics/faq/mwl-diagram.jpg" alt="Répartition des métriques custom avec la configuration MWL">}}

Il peut ainsi arriver qu'une configuration suggérée donne lieu à un volume plus élevé de métriques custom indexées (6 métriques custom) que le volume initial ingéré (4 métriques custom). **Dans ces cas-là, il est préférable de ne pas configurer cette métrique avec l'option All Tags afin d'optimiser le coût de cette métrique.**

[1]: /fr/metrics/metrics-without-limits/