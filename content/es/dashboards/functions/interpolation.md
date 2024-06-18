---
aliases:
- /es/graphing/functions/interpolation/
further_reading:
- link: /dashboards/functions/
  tag: Documentación
  text: Otros tipos de funciones
- link: /metrics/guide/interpolation-the-fill-modifier-explained/
  tag: Documentación
  text: La interpolación y el modificador de relleno
title: Interpolación
---

## Rellenar

| Función | Descripción                                       | Ejemplo                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | Interpola los valores de métrica que faltan para la métrica. | `<METRIC_NAME>{*}.fill(<METHOD>, <LIMIT>)` |

La función `fill()` tiene dos parámetros:

* **`METHOD`**: la función que se utiliza como método de interpolación; elige entre:
    * **lineal**: te brinda una interpolación lineal entre el principio y el final del intervalo.
    * **último**: rellena el intervalo con su último valor.
    * **cero**: rellena el intervalo con un valor cero.
    * **nulo**: desactiva la interpolación.

* `LIMIT` [*optional*, *default*=**300**, *maximum*=**600**]: el límite de interpolación (en segundos) que representa el tamaño máximo de un intervalo que se quiere interpolar.

Lee la sección de [La interpolación y el modificador de relleno][1] para obtener una explicación detallada sobre la función `.fill()` y su efecto en la interpolación.

## Valor cero predeterminado

| Función         | Descripción                             | Ejemplo                          |
| ---------------- | --------------------------------------- | -------------------------------- |
| `default_zero()` | Añade un valor predeterminado a las métricas dispersas. | `default_zero(system.load.1{*})` |

La función `default_zero()` rellena los intervalos de tiempo vacíos con el valor 0 o, si la interpolación se encuentra habilitada, con la interpolación. **Nota**: La interpolación se encuentra habilitada por defecto para las métricas de tipo `GAUGE`. Como la mayoría de las funciones, `default_zero()` se aplica **después** de la [agregación temporal y espacial][2].

### Casos de uso

La función `default_zero()` está destinada a abordar los siguientes casos de uso (aunque también puede servir para otros):

- Alinear medidores como 0 al realizar aritmética en métricas dispersas (Nota: las métricas de tipo `COUNT` o `RATE` consultadas como `as_count()` o `as_rate()` _siempre_ están alineadas como 0, por lo que el uso de `default_zero()` no cambia la forma en que están alineadas; solo afecta las métricas de tipo `GAUGE`).
- Resolver monitores antes de que entren en una condición sin datos. Esto funciona tanto para las alertas simples como múltiples, pero el valor 0 no debe hacer que se active el monitor. Por ejemplo, esto no funcionaría para un monitor con la consulta `avg(last_10m):avg:system.cpu.idle{*} < 10`, porque este se activa (en lugar de resolverse) cuando se evalúa como 0. Evita el uso de esta función para monitores de tasa de error con consultas `as_count()`. Consulta la [guía de as_count() en las evaluaciones de monitores][3] para obtener más detalles.
- Rellenar intervalos vacíos en series dispersas (pero no vacías) por razones visuales o para afectar el mínimo/máximo/promedio de una serie temporal en una evaluación de monitores. Si el período de evaluación no contiene ningún punto de datos, `default_zero()` no tiene ningún efecto.
- Mostrar el valor 0 en el widget de serie temporal cuando no hay datos.

### Ejemplo

Con el fin de demostrar cómo se ejecuta la función `default_zero()`, considera este punto único creado para un métrica personalizada [mediante DogStatsD][4]:

```text
$ echo -n "custom_metric:1|g" | nc -4u -w0 127.0.0.1 8125
```

Cuando se consulta este métrica durante los últimos 30 minutos, hay una única marca de tiempo, porque solo uno de los intervalos de rollup de la consulta tiene un punto:

```text
avg:custom_metric{*}

+---------------------+---------------+
| Timestamp           | custom_metric |
+---------------------+---------------+
| ---------           | ---------     |
| 2019-04-17 17:45:00 | 1             |
+---------------------+---------------+
```

La función `default_zero()` interpola este punto cinco minutos hacia adelante en el tiempo (el límite de interpolación predeterminado para los medidores), luego rellena los intervalos vacíos restantes con ceros:

```text
default_zero(avg:custom_metric{*})

+---------------------+-----------------------------+
| Timestamp           | default_zero(custom_metric) |
+---------------------+-----------------------------+
| ---------           | ---------                   |
| 2019-04-17 17:30:00 | 0                           |
| 2019-04-17 17:31:00 | 0                           |
...
| 2019-04-17 17:44:00 | 0                           |
| 2019-04-17 17:45:00 | 1                           |
| 2019-04-17 17:46:00 | 1                           |
| 2019-04-17 17:47:00 | 1                           |
| 2019-04-17 17:48:00 | 1                           |
| 2019-04-17 17:49:00 | 1                           |
| 2019-04-17 17:50:00 | 1                           |
| 2019-04-17 17:51:00 | 0                           |
| 2019-04-17 17:52:00 | 0                           |
...
+---------------------+-----------------------------+
```

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/guide/interpolation-the-fill-modifier-explained/
[2]: /es/dashboards/functions/#add-a-function
[3]: /es/monitors/guide/as-count-in-monitor-evaluations/
[4]: /es/metrics/