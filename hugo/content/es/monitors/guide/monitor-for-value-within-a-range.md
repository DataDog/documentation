---
title: Rangos de monitorización
---

## Información general

Si un monitor admite alertas cuando un valor dado está por encima o por debajo de un umbral dado, es posible que recibas una notificación si un valor dado está dentro o fuera de un rango.

## Ejemplos
### Métrica

La métrica `a` informa de valores discretos de `0` a `10` que representan un estado y deseas que se te notifique si la métrica no se encuentra entre `4` y `8`.
Matemáticamente, la diferencia entre la métrica y el centro del rango (6) nunca debe ser superior a 2.

```
8 > a > 4 <=> abs(6-a) < 2 <=> abs(6-a) - 2 < 0
```

- Para ser notificado si el valor está fuera del rango, la condición del monitor debe ser `abs(6-a) - 2 > 0`.
- Para ser notificado si el valor está dentro del rango, la condición del monitor debe ser `2 - abs(6-a) > 0`.

{{< img src="monitors/faq/monitor_range.png" alt="monitor de métrica en un rango" >}}

### Teoría

Un rango está definido por `x > a > y` siendo `a` la métrica en cuestión.

- Para ser notificado si el valor está fuera del rango, la condición del monitor debe ser: `abs(x - (x-y)/2 - a) - (x-y)/2 > 0`.
- Para ser notificado si el valor está dentro del rango, la condición del monitor debe ser: `(x-y)/2 - abs(x - (x-y)/2 - a) > 0`.

## Solucionar problemas

Necesitas ayuda? Contacta con [asistencia de Datadog][1].

[1]: /es/help/