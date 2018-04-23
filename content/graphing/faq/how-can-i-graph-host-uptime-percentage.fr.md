---
title: Comment puis-je représenter le pourcentage de disponibilité de l'host?
kind: faq
---

Les deux définitions de graphique suivantes généreront les graphiques sur le dashboard dans l'image ci-dessous. Count renvoie la quantité de séries temporelles correspondant à la requête. La façon dont fonctionnent ces requêtes consiste à vérifier si une métrique donnée (dans ce cas, system.load.1) a été reportée à un moment spécifique en utilisant count. Si la métrique a été signalée, la requête renvoie 1, sinon 0. L'utilisation de ce binaire en moyenne sur une période de temps donnera la fraction de temps que la métrique elle-même a été reportée. Ainsi, vous obtiendrez le temps de disponibilité de l'host!

## Hosts with Lowest % of Uptime for Scope (Toplist)

```json
{
  "viz": "toplist",
  "requests": [
    {
      "q": "top((count:system.load.1{$scope} by {host} + count:system.load.1{*} * 0) / 1, 10, 'mean', 'asc')",
      "style": {
        "palette": "dog_classic"
      },
      "conditional_formats": []
    }
  ]
}
```

## Overall % of Uptime for Scope

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "( count:system.load.1{$scope} + ( count:system.load.1{*} / count:system.load.1{*} ) * 0 ) / ( count:system.load.1{$scope} + ( count:system.load.1{*} / count:system.load.1{*} ) * 0 )",
      "style": {
        "palette": "dog_classic"
      },
      "conditional_formats": [], 
      "type": "line",
      "aggregator": "avg"
    }
  ],
  "autoscale": true
}
```

{{< img src="graphing/faq/up_time.png" alt="up time" responsive="true" popup="true">}}

