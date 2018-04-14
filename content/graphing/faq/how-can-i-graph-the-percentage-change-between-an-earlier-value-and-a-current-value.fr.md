---
title: Comment puis-je représenter graphiquement le pourcentage de changement entre une valeur antérieure et une valeur actuelle?
kind: faq
---

Si vous voulez visualiser comment les valeurs d'une métrique ont changé par rapport à une période antérieure, faites-le en utilisant les fonctions Timeshift [détaillées ici][1]. Actuellement, vous pouvez capturer la valeur d'une mesure d'une heure, d'un jour, d'une semaine ou d'un mois auparavant.

Pour calculer cela, vous pouvez créer une requête comme celle-ci:
```
((current_value - old_value) / old_value) * 100
```

Voici un exemple où nous pouvons voir le pourcentage de changement d'une métrique du système d'un jour à l'instant présent:

{{< img src="graphing/faq/percentage_timeshift.png" alt="percentage timeshift" responsive="true" popup="true">}}

[1]: /graphing/miscellaneous/functions/#timeshift
