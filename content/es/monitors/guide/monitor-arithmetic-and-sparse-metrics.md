---
kind: guía
title: Aritmética del monitor y métricas dispersas
---

## Información general

Crear una alerta basada en una consulta con aritmética es una práctica común. Hay algunas herramientas y comportamientos que deben tenerse en cuenta para asegurar que la configuración del monitor sea adecuada para evaluar estas consultas según lo previsto.

## Métricas dispersas

En el caso de las métricas dispersas o _0_ en el denominador, algunos resultados pueden ser rechazados.

Considera los siguientes valores de métrica:

* `A = (10, 10, 10)`
* `B = (0, 1, -)`

Para la fórmula `a/b`, el monitor evaluaría:

```text
10/0 + 10/1 + 10/NaN = 10
```

Si la ventana de evaluación incluye muchos buckets "nulos" (**10/NaN + 10/Nan + ... + 10/Nan**) se "omitirán" las evaluaciones, por lo que es posible que tengas que realizar ajustes en tu métrica o utilizar una de las soluciones que se indican a continuación.

## Soluciones para las métricas dispersas o mal alineadas

### `.fill()`

Puedes aplicar una función `.fill()` para asegurarte de que todos los buckets temporales tienen valores válidos. Para los tipos de métrica **gauge**, la interpolación por defecto es lineal o `.fill(linear)` durante 5 minutos. Para los tipos de métrica **count** y **rate**, el valor por defecto es `.fill(null)`, que desactiva la interpolación. Datadog recomienda generalmente no utilizar la interpolación para métricas count/rate en monitores.

**Original**: `sum:my_metric.has_gaps.gauge{env:a} by {timer,env}`

```text
| Timestamp           | timer:norm,env:a | timer:offset,env:a |
|:--------------------|:-----------------|:-------------------|
| 2019-03-29 12:00:00 | 1                |                    |
| 2019-03-29 12:05:00 |                  | 1                  |
| 2019-03-29 12:10:00 | 0                |                    |
| 2019-03-29 12:15:00 |                  | 1                  |
| 2019-03-29 12:20:00 | 1                |                    |
| 2019-03-29 12:25:00 |                  | 1                  |
| 2019-03-29 12:30:00 | 1                |                    |
```

Supongamos que `my_metric.has_gaps.gauge` es un tipo de métrica **gauge** por lo que hay interpolación lineal durante 5 minutos por defecto, pero la métrica informa una vez cada 10 minutos. Considera esta consulta:

```text
sum(last_30m):sum:my_metric.has_gaps.gauge{timer:norm,env:a} / sum:my_metric.has_gaps.gauge{timer:offset,env:a}
```

Se verían sobre todo evaluaciones "omitidas".

| Ruta                | Evaluación                              | Resultado |
|:--------------------|:----------------------------------------|:-------|
| `classic_eval_path` | **1/Nan + Nan/1 + ... + 1/Nan + Nan/1** | N/D    |

Ajustando la interpolación, puedes asegurarte que haya métricas en cada intervalo de tiempo.

**Modificado**: `sum:my_metric.has_gaps.gauge{env:a} by {timer,env}.fill(last,900)`

```text
| Timestamp           | timer:norm,env:a | timer:offset,env:a |
|:--------------------|:-----------------|:-------------------|
| 2019-03-29 12:00:00 | 1                | (1)                |
| 2019-03-29 12:05:00 | 1                | 1                  |
| 2019-03-29 12:10:00 | 0                | 1                  |
| 2019-03-29 12:15:00 | 0                | 1                  |
| 2019-03-29 12:20:00 | 1                | 1                  |
| 2019-03-29 12:25:00 | 1                | 1                  |
| 2019-03-29 12:30:00 | 1                | 1                  |
```

Consulta modificada:

```text
sum(last_30m):sum:my_metric.has_gaps.gauge{timer:norm,env:a}.fill(last,900) / sum:my_metric.has_gaps.gauge{timer:offset,env:a}.fill(last,900)
```

Con `.fill(last,900)`, el nuevo resultado es:

| Ruta                | Evaluación                                    | Resultado |
|:--------------------|:----------------------------------------------|:-------|
| `classic_eval_path` | **(1)/1 + 1/1 + 0/1 + 0/1 + 1/1 + 1/1 + 1/1** | 5      |

### Intervalos de evaluación cortos

Es posible tener problemas de sincronización en monitores con la división en intervalos cortos evaluación. Si tu consulta de monitor requiere la división en un intervalo de evaluación de un minuto, el numerador y el denominador representan intervalos del orden de unos pocos segundos. Si las métricas para el numerador y el denominador no están disponibles en el momento de la consulta, podrías obtener valores de evaluación no deseados.

```
| Timestamp             | sum:my_num{*}       | sum:my_denom{*}     |
| :-------------------- | :------------------ | :------------------ |
| ...                   | ...                 | ...                 |
| 2019-03-29 13:30:50   | 900                 | 1000                |
| 2019-03-29 13:30:52   | 900                 | 1000                |
| 2019-03-29 13:30:54   | 900                 | 1000                |
| 2019-03-29 13:30:56   | 120 (inc)           | 850 (inc)           |
```

En el caso de una consulta como `min(last_1m):sum:my_num{*}/sum:my_denom{*}`, el valor mínimo podría estar sesgado y podría activar tu monitor involuntariamente.

Por lo tanto, debería considerarse la posibilidad de añadir un breve retraso de evaluación de 30-60 segundos para ajustar los problemas de tiempo en las consultas con división en intervalos cortos de evaluación. Alternativamente, también puedes cambiar a un intervalo de evaluación de cinco minutos.

Si tienes alguna pregunta sobre esta lógica, [ponte en contacto con el equipo de asistencia de Datadog][1].

[1]: /es/help/