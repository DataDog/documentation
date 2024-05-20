---
kind: guide
title: Surveillance de plages
---

## Présentation

Pour les monitors qui prennent en charge l'envoi d'alertes lorsqu'une valeur donnée dépasse un certain seuil, il est également possible d'envoyer une notification lorsqu'une valeur donnée est comprise ou non dans une plage spécifique.

## Exemples
### Métrique

La métrique `a` transmet des valeurs discrètes allant de `0` à `10` qui correspondent à un statut. Vous souhaitez recevoir une notification lorsque la valeur de la métrique n'est pas comprise entre `4` et `8`.
Mathématiquement parlant, la différence entre la valeur de la métrique et le centre de la plage (6) ne doit jamais dépasser 2.

```
8 > a > 4 <=> abs(6-a) < 2 <=> abs(6-a) - 2 < 0
```

- Pour recevoir une notification lorsque la valeur n'est pas comprise dans la plage, le monitor doit avoir pour condition `abs(6-a) - 2 > 0`.
- Pour recevoir une notification lorsque la valeur est comprise dans la plage, le monitor doit avoir pour condition `2 - abs(6-a) > 0`.

{{< img src="monitors/faq/monitor_range.png" alt="monitor de métrique basé sur une plage" >}}

### Raisonnement théorique

Une plage est définie par l'expression `x > a > y`, où `a` correspond à la métrique concernée.

- Pour recevoir une notification lorsque la valeur nʼest pas comprise dans la plage, le monitor doit avoir pour condition `abs((x-y/2) - a) - (x-y)/2 > 0`.
- Pour recevoir une notification lorsque la valeur est comprise dans la plage, le monitor doit avoir pour condition `(x-y)/2 - abs((x-y/2) - a) > 0`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: /fr/help/