---
aliases:
- /es/graphing/functions/interpolation/
description: Rellene los valores faltantes de las métricas en datos de series temporales
  mediante interpolación lineal, del último valor, de cero o nula.
further_reading:
- link: /dashboards/functions/
  tag: Documentación
  text: Otros tipos de funciones
- link: /metrics/guide/interpolation-the-fill-modifier-explained/
  tag: Documentación
  text: Interpolación y el modificador Fill
title: Interpolación
---
## Fill {#fill}

| Función | Descripción                                       | Ejemplo                                    |
| :----    | :-------                                          | :---------                                 |
| `fill()` | Interpole los valores faltantes de la métrica. | `<METRIC_NAME>{*}.fill(<METHOD>, <LIMIT>)` |

La función `fill()` tiene dos parámetros:

* **`METHOD`**: La función que se utilizará como método de interpolación; elija entre:
    * `linear`: Le proporciona una interpolación lineal entre el principio y el final del intervalo.
    * `last`: Rellena el intervalo con el último valor del intervalo.
    * `zero`: Rellena el intervalo con un valor cero.
    * `null`: Desactiva la interpolación.

* `LIMIT` [*opcional*, *predeterminado*=**300**, *máximo*=**600**]: El límite de interpolación (en segundos) que representa el tamaño máximo de un intervalo que desea interpolar.

Lea [Interpolación y el modificador Fill][1] para obtener una explicación detallada de la función `.fill()` y su impacto en la interpolación.

## Default zero {#default-zero}

| Función         | Descripción                             | Ejemplo                          |
| ---------------- | --------------------------------------- | -------------------------------- |
| `default_zero()` | Agrega un valor predeterminado a las métricas dispersas. | `default_zero(system.load.1{*})` |

La función `default_zero()` completa los intervalos de tiempo vacíos usando el valor 0 o, si la interpolación está habilitada, con interpolación. **Nota**: La interpolación está habilitada de forma predeterminada para las métricas de tipo `GAUGE`. Como la mayoría de las funciones, `default_zero()` se aplica **después** de la [agregación temporal y el desglose espacial][2].

### Casos de uso {#use-cases}

La función `default_zero()` está diseñada para abordar los siguientes casos de uso (aunque también puede funcionar para otros casos de uso):

- Alinear indicadores como 0 al realizar operaciones aritméticas en métricas dispersas (nota: las métricas de tipo `COUNT` o `RATE` consultadas `as_count()` o `as_rate()` _siempre_ se alinean como 0, por lo que usar `default_zero()` no cambia cómo se alinean; solo afecta a las métricas de tipo `GAUGE`).
- Resolver los seguimientos antes de que entren en un estado sin datos. Esto funciona tanto para alertas simples como múltiples, pero el valor 0 no debe hacer que el seguimiento se active. Por ejemplo, esto no funcionaría para un seguimiento con la consulta `avg(last_10m):avg:system.cpu.idle{*} < 10` porque este seguimiento se activa (en lugar de resolverse) cuando se evalúa en 0. Evite usar esta función para seguimientos de tasa de error con consultas `as_count()`. Consulte la [guía de as_count() en Monitor Evaluations][3] para obtener más detalles.
- Completar intervalos vacíos en series dispersas por razones visuales o para afectar el mínimo/máximo/promedio de una serie temporal durante una evaluación de seguimiento.
- Mostrar el valor 0 en el widget de series temporales cuando no hay datos.

### Ejemplo {#example}

Para demostrar cómo funciona la función `default_zero()`, considere este punto único creado para una métrica personalizada [usando DogStatsD][4]:

```text
$ echo -n "custom_metric:1|g" | nc -4u -w0 127.0.0.1 8125
```

Cuando esta métrica se consulta durante los últimos 30 minutos, hay una única marca de tiempo, porque solo uno de los intervalos de rollup de la consulta tiene un punto:

```text
avg:custom_metric{*}

+---------------------+---------------+
| Timestamp           | custom_metric |
+---------------------+---------------+
| ---------           | ---------     |
| 2019-04-17 17:45:00 | 1             |
+---------------------+---------------+
```

La función `default_zero()` interpola este punto cinco minutos hacia adelante en el tiempo (el límite de interpolación predeterminado para los indicadores), luego completa los intervalos vacíos restantes con ceros:

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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/guide/interpolation-the-fill-modifier-explained/
[2]: /es/dashboards/functions/#add-a-function
[3]: /es/monitors/guide/as-count-in-monitor-evaluations/
[4]: /es/metrics/