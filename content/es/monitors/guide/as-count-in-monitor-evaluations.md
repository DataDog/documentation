---
aliases:
- /es/monitors/guide/as-count-monitor-evaluation
kind: guía
title: Evaluaciones as_count() en monitores
---

## Información general

Las consultas que utilizan modificadores **`as_count()`** y **`as_rate()`** se calculan de formas que pueden producir resultados diferentes en las evaluaciones de monitores. Los monitores que incluyen aritmética y al menos 1 modificador **`as_count()`** utilizan una ruta de evaluación independiente que cambia el orden en el que se realizan la aritmética y la agregación temporal.

## Ejemplo de tasa de error

Supongamos que quieres monitorizar una tasa de error durante 5 minutos utilizando las métricas `requests.error` y `requests.total`. Considera una única evaluación realizada con estos puntos de series temporales alineados para el marco temporal de 5 minutos:

**Numerador**: `sum:requests.error{*}`

```text
| Timestamp           | Value |
|:--------------------|:------|
| 2018-03-13 11:00:30 | 1     |
| 2018-03-13 11:01:30 | 2     |
| 2018-03-13 11:02:40 | 3     |
| 2018-03-13 11:03:30 | 4     |
| 2018-03-13 11:04:40 | 5     |
```

**Denominador**: `sum:requests.total{*}`

```text
| Timestamp           | Value |
|:--------------------|:------|
| 2018-03-13 11:00:30 | 10    |
| 2018-03-13 11:01:30 | 10    |
| 2018-03-13 11:02:40 | 10    |
| 2018-03-13 11:03:30 | 10    |
| 2018-03-13 11:04:40 | 10    |
```

### Existen 2 formas de cálculo

Haz referencia a esta consulta como **`classic_eval_path`**:

```text
sum(last_5m): sum:requests.error{*}.as_rate() / sum:requests.total{*}.as_rate()
```

Y a esta consulta como **`as_count_eval_path`**:

```text
sum(last_5m): sum:requests.error{*}.as_count() / sum:requests.total{*}.as_count()
```

Compara el resultado de la evaluación en función de la ruta:

| Ruta                     | Comportamiento                                       | Expresión ampliada                    | Resultado  |
|:-------------------------|:-----------------------------------------------|:---------------------------------------|:--------|
| **`classic_eval_path`**  | Función de agregación aplicada _después_ de la división  | **(1/10 + 2/10 + 3/10 + 4/10 + 5/10)** | **1.5** |
| **`as_count_eval_path`** | Función de agregación aplicada _antes_ de la división | **(1+2+3+4+5) / (10+10+10+10+10)**     | **0.3** |

Fíjate que las dos evaluaciones anteriores son matemáticamente correctas. Elige el método que mejor se adapte a tus intenciones.

Puede ser útil visualizar el **`classic_eval_path`** como:

```text
sum(last_5m):error/total
```

Y el **`as_count_eval_path`** como:

```text
sum(last_5m):error
-----------------
sum(last_5m):total
```

En general, la agregación temporal **`avg`** con **`.as_rate()`** es razonable, pero la agregación **`sum`** con **`.as_count()`** es la recomendada para las tasas de error. No tiene sentido utilizar los métodos de agregación distintos de **`sum`** con (y no pueden utilizarse con) **`.as_count()`**.

Si tienes alguna pregunta, [ponte en contacto con el equipo de asistencia de Datadog][1].

[1]: /es/help/