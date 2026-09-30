---
further_reading:
- link: monitors/types/composite/
  tag: Documentación
  text: Tipo de monitor compuesto
title: Casos de uso de monitores compuestos
---


## Información general

En esta guía se enumeran casos de uso no exhaustivos para monitores compuestos. En estos ejemplos se ilustra cómo se pueden configurar monitores compuestos para abordar diversos casos de uso en entornos de monitorización:

- [Tasas de errores](#error-rates)
- [Métricas frecuentes de monitores](#Monitor-frequent-metrics)
- [Monitor de pasos](#step-monitor)
- [Renotificación en la recuperación](#renotifying-on-recovery)
- [Retraso en la notificación](#delay-on-notificación)


## Tasas de errores

Alerta cuando la tasa de errores supera un umbral sólo cuando los aciertos superan un número determinado.

Crea dos monitores:

- **Monitor A**: Alerta cuando `trace.requests.request.errors / trace.requests.request.hits > X`
- **Monitor B**: Alerta cuando `trace.requests.request.hits > Y`

**Monitor compuesto C**: Alerta cuando el Monitor A y el Monitor B están en alerta (A && B).

| Monitor A | Monitor B | Monitor compuesto C |
|-----------|-----------|---------------------|
| **Alerta** Tasa de errores por encima del umbral | **Alerta** Aciertos por encima del umbral | **Alerta** |
| **Alerta** Tasa de errores por encima del umbral | **OK** Aciertos por debajo del umbral | **OK** Sólo se cumple una condición, no hay alerta. |
| **OK** Tasa de errores por debajo del umbral | **Alerta** Aciertos por encima del umbral | **OK** Sólo se cumple una condición, no hay alerta. |

Para más combinaciones de estados, consulta [Monitor compuesto](https://docs.datadoghq.com/monitors/create/types/composite/#computing-trigger-conditions).

## Métricas frecuentes de monitores

Latencia de monitores para servicios, que ignora los picos ocasionales debido al bajo tráfico. Por ejemplo, un periodo de tiempo durante la noche en el que los servicios informan de muy pocos valores.

Crea dos monitores:

- **Monitor A**: Alerta cuando `latency > X`
- **Monitor B**: Alerta cuando `sum:latency{*}.rollup(count) > Y` en la última 1 hora

**Monitor compuesto C**: Alerta cuando se cumplen ambas condiciones.

| Monitor A | Monitor B | Monitor compuesto C |
|-----------|-----------|---------------------|
| **Alerta** Latencia por encima del umbral | **Alerta** Más de Y métricas | **Alerta** |
| **Alerta** Latencia por encima del umbral | **OK** Menos de Y métricas | **OK** Métricas insuficientes |
| **OK** Latencia por debajo del umbral | **Alerta** Más de Y métricas | **OK** Latencia por debajo del umbral |

## Monitor de pasos

Activa una alerta si no hay una métrica emparejada. Por ejemplo, métricas de logs para enviado/recibido, abajo/arriba o crear/resolver. Puedes ajustar la ventana de evaluación para los monitores si se espera que las métricas emparejadas estén separadas por N minutos.

- **Monitor A**: Alerta cuando `action:create` es superior a 0
- **Monitor B**: Alerta cuando `action:resolve` es superior a 0

**Compuesto**: Alerta si `a && !b`.

| Monitor A | Monitor B | Monitor compuesto C |
|-----------|-----------|---------------------|
| **Alerta** Acción crear por encima de 0 | **Alerta** Acción resolver por encima de 0 | **OK** |
| **Alerta** Acción crear por encima de 0 | **OK** | **Alerta** Acción resolver ausente |
| **OK** | **Alerta** Acción resolver por encima de 0 | **OK** |

## Renotificación en la recuperación

Renotificar en la recuperación utilizando dos monitores con un `timeshift`.

- **Monitor A**: Estado de métricas actuales
- **Monitor B**: Estado de métricas del pasado utilizando `timeshift`

**Monitor compuesto**: La lógica es `!a && b`.

| Monitor A | Monitor B | Monitor compuesto C |
|-----------|-----------|---------------------|
| **Alerta** Métrica en tiempo real | **Alerta** Métrica del pasado | **OK** |
| **Alerta** Métrica en tiempo real | **OK** métrica no activada | **OK** |
| **OK** Métrica no activada | **Alerta** Métrica del pasado | **Alerta** |

## Retraso en la notificación

Alerta después de que los errores persisten durante un tiempo configurado. Por ejemplo, un conjunto de errores activados durante al menos 15 minutos.

- **Monitor A**: Métrica en tiempo real
- **Monitor B (diferido)**: métrica desplazada X minutos

**Monitor compuesto**: Alerta si `a && b`.

| Monitor A | Monitor B (diferido) | Monitor compuesto C |
|-----------|--------------------------|---------------------|
| **Alerta** Métrica en tiempo real | **Alerta** Métrica del pasado | **Alerta** |
| **Alerta** Métrica en tiempo real | **OK** métrica no activada | **OK** |
| **OK** métrica no activada | **Alerta** Métrica del pasado | **OK** |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}