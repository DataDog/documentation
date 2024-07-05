---
aliases:
- /es/graphing/faq/what-is-the-granularity-of-my-graphs-am-i-seeing-raw-data-or-aggregates-on-my-graph
- /es/dashboards/faq/what-is-the-granularity-of-my-graphs-am-i-seeing-raw-data-or-aggregates-on-my-graph
title: ¿Cuál es la granularidad de mis gráficos? ¿Estoy viendo datos sin procesar
  o agregados en mi gráfico?
---

Los gráficos de Datadog suelen mostrar agregados locales, en lugar de los valores originales enviados.

## ¿Por qué?

Los datos se almacenan con una granularidad de 1 segundo, pero pueden agregarse cuando se visualizan.

Para un gráfico de un periodo de tiempo de 1 semana, sería necesario enviar cientos de miles de valores a tu navegador. No es posible representar gráficamente todos estos puntos en un widget que ocupa una pequeña parte de la pantalla. Por esta razón, los datos se agregan para enviar un número limitado de puntos a tu navegador a fin de generar un gráfico.

Por ejemplo, en una vista de un día con la visualización "líneas", hay un punto de datos cada 5 minutos. Datadog divide el intervalo de 1 día en 288 buckets de 5 minutos. En cada bucket, todos los datos realizan un rollup a un único valor. Por ejemplo, el punto de datos que aparece en tu gráfico con la marca de tiempo 07:00 es en realidad un agregado de todos los puntos de datos reales enviados entre las 07:00:00 y las 07:05:00 de ese día.

Por defecto, el agregado rollup se calcula promediando todos los valores reales, lo que tiende a [aplanar los gráficos a medida que se reduce un periodo de tiempo][1].

## ¿Qué puedes hacer?

La agregación de datos es necesaria, tanto si dispones de 1 como de 1000 orígenes, siempre que consideres una ventana temporal amplia.

Pero puedes controlar cómo se realiza esta agregación utilizando la [función rollup][2]:

* Las opciones .rollup(max)/.rollup(min) hacen que cada punto sea el MÁXIMO/MÍNIMO local del X minuto de datos que representa
* La opción .rollup(avg) es el valor por defecto: cada punto de tu gráfico es el valor PROMEDIO del X minuto de datos que representa
* La opción .rollup(suma) calcula la SUMA de todos los valores presentados durante el periodo X minuto.
* La opción .rollup(avg,60) determina que los puntos del gráfico deben ser promedios de 1 min, etc.

**Nota**: El backend de Datadog intenta mantener el número de intervalos por debajo de ~300. Así que si realizas el rollup(60) en un periodo de tiempo de 2 meses, no puedes tener la granularidad de un minuto solicitada.

## Ejemplo
{{< img src="metrics/guide/graph_granularity.png" alt="Granularidad del gráfico" >}}

El gráfico anterior es un gráfico de barras de las últimas 2 horas. El gráfico muestra un punto de datos por minuto. No se trata de los valores reales enviados, sino de agregados locales, cada uno de los cuales representa un minuto de los datos de tu métrica.

## ¿Es posible ver los datos reales enviados?

Sí, si se amplía lo suficiente, el gráfico muestra los valores originales. Por ejemplo, el Datadog Agent envía datos cada ~15 segundos. Si observas un periodo de tiempo de 45 minutos (o menos), los valores aparecen desagregados.

[1]: /es/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[2]: /es/dashboards/functions/rollup/