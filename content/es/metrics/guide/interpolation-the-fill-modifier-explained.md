---
aliases:
- /es/graphing/faq/interpolation-the-fill-modifier-explained
- /es/dashboards/faq/interpolation-the-fill-modifier-explained
further_reading:
- link: /dashboards/functions/interpolation/
  tag: Documentación
  text: Obtener más información sobre las funciones de interpolación
title: Interpolación y modificador fill
---

{{< img src="metrics/guide/graph_fill_example.png" alt="Función fill() en las opciones de gráficos" style="width:100%;" >}}

## ¿Por qué interpolar?

La interpolación no consiste en rellenar grandes huecos arbitrarios en una serie de métricas, sino en alinear varias series para poder realizar la agregación entre orígenes.

La mayor parte del tiempo crear gráficos en Datadog consiste en combinar datos de diferentes orígenes en una sola línea para tu gráfico. Sin embargo, es posible que los distintos orígenes no envíen datos al mismo tiempo ni con la misma frecuencia.

```text
net.bytes_rcvd    |  3:00:00  3:00:10  3:00:20  3:00:30  3:00:40 ...
------------------+-------------------------------------------------
1: host:A,env:prod|    15                         25
2: host:B,env:test|             10                         40
------------------+-------------------------------------------------
    sum (1+2)     |    15?      10?               25?      40?
```

El ejemplo anterior muestra que fusionar orígenes directamente produce resultados absurdos simplemente porque los orígenes no están alineados de forma natural. La interpolación resuelve este problema proporcionando valores relevantes sólo para los cálculos.

```text
net.bytes_rcvd    |  3:00:00  3:00:10  3:00:20  3:00:30  3:00:40 ...
------------------+-------------------------------------------------
1: host:A,env:prod|    15       18.3              25        X
2: host:B,env:test|     Y       10                30       40
------------------+-------------------------------------------------
    sum (1+2)     |   15 + Y    28.3              55       40 + X
```

Donde X e Y se interpolan utilizando datos anteriores y posteriores al intervalo mostrado.

## ¿En qué casos se produce la interpolación?

La interpolación se produce cuando, por ejemplo, más de un origen corresponde a tu consulta de gráfico:

* Con la agregación espacial (`avg:system.cpu.user{env:prod}`), si tienes dos o más hosts con la etiqueta (tag) `env:prod` , Datadog calcula la media en el tiempo utilizando la interpolación.
* Con las consultas de grupo (`net.bytes_rcvd{*} by {host}`, puede que no se realicen cálculos entre orígenes, pero proporcionar series alineadas facilita el paso del ratón por la línea del gráfico y las comparaciones.

La interpolación no es necesaria cuando se representa gráficamente una métrica enviada desde un origen, por ejemplo `avg:net.bytes_rcvd{host:a}`, suponiendo que `host:a` envía siempre la métrica `net.bytes_rcvd` con las mismas etiquetas.

La interpolación no se realiza, por ejemplo, en las consultas de varias partes: `avg:system.cpu.user{env:prod},avg:system.cpu.user{env:dev}`

## ¿Cómo controlar la interpolación?

La interpolación por defecto para todos los tipos de métricas es lineal y se realiza hasta cinco minutos después de las muestras reales. La interpolación se deshabilita mediante los modificadores `.as_count()` y `.as_rate()`, cuando se utiliza en cualquier [tipo de métrica][1], con la excepción del tipo de métrica Gauge (Indicador). Para obtener más información, consulta [Modificadores de tipos de métricas][2].

El modificador `.fill()` controla los parámetros de interpolación:

| Modificador          | Descripción                                                          |
|-------------------|----------------------------------------------------------------------|
| `fill(linear, X)` | Te ofrece una interpolación lineal hasta X segundos después de las muestras reales. |
| `fill(last, X)`   | Replica el último valor de muestra hasta X segundos.                       |
| `fill(zero, X)`   | Inserta 0 donde la interpolación es necesaria hasta X segundos.            |
| `fill(null, X)`   | Deshabilita la interpolación, el valor de X no importa.               |

## FAQ

### Hay una brecha métrica, fill(zero) no hace nada, todavía hay una larga línea recta en el gráfico
Debido a que los gráficos son sólo una serie de puntos de datos unidos por líneas, un largo periodo sin datos se traduce en una larga línea recta y no es necesario que la interpolación rellene los valores. La interpolación consiste en alinear series para hacer posible la agregación y los gráficos de varias líneas.

Por el contrario, un monitor utiliza un retroceso de un marco temporal para evaluar los valores interpolados y calcular los promedios.

### Elección del método de interpolación
El método de interpolación por defecto (que se elige en función del tipo de métrica) suele ser correcto, pero a veces es conveniente anularlo.

La interpolación lineal es muy adecuada para métricas que proceden de los mismos orígenes de forma constante. En el caso de métricas dispersas o de métricas procedentes de orígenes variables a lo largo del tiempo, suele ser más interesante deshabilitar la interpolación. Esto tiene sentido si envías puntos de datos sólo cuando cambia el valor de lo que mides.

Nada impide que los gráficos muestren valores interpolados 5 minutos después del último valor real.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/metrics/types/
[2]: /es/metrics/custom_metrics/type_modifiers/?tab=gauge#in-application-modifiers