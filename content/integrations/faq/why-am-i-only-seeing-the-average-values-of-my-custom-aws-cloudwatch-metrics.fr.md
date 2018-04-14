---
title: Pourquoi ne vois-je que les valeurs moyennes de mes métriques custom AWS / Cloudwatch ?
kind: faq
---

Par défaut, Datadog collecte uniquement les valeurs moyennes de vos métriques personnalisées AWS / Cloudwatch. Cependant, des valeurs supplémentaires peuvent être collectées sur demande. Celles-ci incluent le min, le max, la somme et le nombre d'échantillons.

En ce qui concerne les conventions de nommage, la valeur moyenne est représentée uniquement par le nom de la métrique, les valeurs supplémentaires étant indiquées par une annexe ajoutée au nom de la métrique.

Par exemple, vos noms de métriques AWS / Cloudwatch personnalisés ressembleront à ceci dans Datadog.

```
custom.aws.metric (average)
custom.aws.metric.minimum
custom.aws.metric.maximum
custom.aws.metric.sum
custom.aws.metric.samplecount
```

Une requête au support de Datadog est requise pour activer la collecte des métriques AWS / Cloudwatch personnalisées autres que des moyennes. Contactez [nous][1] pour obtenir de l'aide.

[1]: /help
