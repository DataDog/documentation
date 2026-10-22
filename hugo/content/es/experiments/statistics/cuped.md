---
aliases:
- /es/experiments/cuped
- /es/experiments/cuped/
description: Aprenda cómo CUPED utiliza datos previos al experimento para reducir
  la varianza de las métricas y llegar a conclusiones más rápidamente.
further_reading:
- link: /experiments/statistics/analysis_methods
  tag: Documentación
  text: Métodos de análisis
- link: /experiments/reading_results
  tag: Documentación
  text: Lectura de los resultados del experimento
- link: /experiments/plan_and_launch_experiments
  tag: Documentación
  text: Planifique y lance experimentos
- link: https://www.datadoghq.com/blog/cuped-adjustments-visualization/
  tag: Blog
  text: Visualice cómo CUPED ajusta los resultados de los experimentos con Datadog
- link: https://www.datadoghq.com/blog/how-we-built-datadog-experiments/
  tag: Blog
  text: Cómo creamos Datadog Experiments
title: 'CUPED: Técnica de reducción de varianza'
---
## Descripción general {#overview}

La precisión de los resultados de los experimentos, incluida la amplitud del intervalo de confianza, depende de la varianza de las métricas. Una forma de mejorar la precisión es recopilar más datos, pero eso aumenta el tiempo necesario para llegar a una decisión.

Controlled-experiment Using Pre-Experiment Data (CUPED), presentado originalmente en [Improving the Sensitivity of Online Controlled Experiments by Utilizing Pre-Experiment Data][1] de Deng et al., reduce la varianza de las métricas directamente mediante el uso de datos capturados antes de la exposición al experimento.

El análisis de experimentos estándar compara los datos de las métricas de los sujetos expuestos a un tratamiento con los datos de las métricas de los sujetos en un grupo de control. Todos los datos utilizados en esa comparación se recopilan durante el experimento. Teams a menudo tienen información sobre los sujetos desde antes de que comenzara el experimento, especialmente datos históricos de métricas. CUPED utiliza estos datos previos al experimento para controlar parte de la varianza de las métricas que proviene de asignar variantes a los sujetos al azar. Por ejemplo, una variante podría tener más sujetos activos que otra por puro azar. CUPED reduce el efecto de esta variación aleatoria al controlar los diferentes niveles de actividad entre las variantes.

CUPED está habilitado de forma predeterminada. Con CUPED habilitado, el incremento y los valores de las métricas mostrados pueden diferir de las estimaciones sin ajustar calculadas a partir de los datos sin procesar. Los datos sin procesar no cambian; CUPED solo modifica el estimador utilizado para el análisis. Esta diferencia es esperada y es el mecanismo que impulsa la reducción de la varianza. Puede activar o desactivar CUPED en el [plan de análisis estadístico][2] del experimento.

## Cómo funciona CUPED {#how-cuped-works}

La implementación de Datadog se basa en el documento original de CUPED y en el marco de aumento de métricas descrito en [From Augmentation to Decomposition: A New Look at CUPED in 2023][3] de Deng et al.

CUPED toma la estimación de incremento sin procesar (sin CUPED) para una métrica y la *aumenta* con una serie de ajustes. Dada una estimación de incremento absoluto sin procesar `Δ` (la diferencia entre el tratamiento y el control sin CUPED para la métrica), el incremento ajustado por CUPED es:

```
CUPED lift = Δ + adjustment_1 + adjustment_2 + ... + adjustment_n
```

Para evitar introducir sesgos, los términos de ajuste deben elegirse cuidadosamente. Específicamente, deben tener *esperanza cero*. Si el experimento se ejecutara muchas veces, cada una con una muestra diferente de usuarios en las variantes de control y tratamiento, el promedio de los ajustes en esas muestras sería igual a cero. Debido a que los ajustes tienen esperanza cero, el incremento de CUPED apunta al mismo objetivo que el incremento sin CUPED. Con coeficientes elegidos cuidadosamente, lo hace con menos varianza de muestreo.

Cada ajuste tiene la forma:

```
adjustment_i = -theta_i * (avg. covariate in treatment - avg. covariate in control)
```

En esta fórmula, los promedios son las medias de las covariables observadas en los grupos de tratamiento y control. El valor `theta_i` es un coeficiente discutido en [Selección de los coeficientes](#selecting-the-coefficients). Dada esta forma, requerir que cada ajuste tenga esperanza cero es equivalente a requerir que cada covariable sea igual en esperanza en los grupos de control y tratamiento.

<div class="alert alert-info">
<p><strong>Intuición para "esperanza cero":</strong> Una forma de entender el requisito de CUPED es comparar los ajustes con los incrementos observados en pruebas A/A repetidas.</p>
<p>En una prueba A/A, los usuarios se asignan aleatoriamente al grupo de tratamiento y al de control, pero la experiencia es idéntica en ambos grupos. Con una aleatorización adecuada, el incremento promedio en muchas pruebas es cero porque los grupos no son sistemáticamente diferentes, pero el incremento no es necesariamente cero en ninguna prueba A/A individual debido al ruido de muestreo. La suposición fundamental de CUPED es que los ajustes se comportan de la misma manera que el incremento en una prueba A/A. De manera equivalente, los promedios de las covariables por variante se comportan de la misma manera que los promedios de las métricas por variante en una prueba A/A.</p>
</div>

## Covariables predeterminadas {#default-covariates}

De forma predeterminada, Datadog Experiments incluye las siguientes covariables:

Agregaciones previas a la exposición
: Observaciones por sujeto capturadas en un período de 30 días antes de la exposición al experimento.

Valores de las propiedades del sujeto
: Propiedades del sujeto basadas en el registro de asignación inicial.

A menos que existan problemas de calidad de datos, ambas categorías de covariables cumplen con los supuestos de CUPED. No existe una diferencia sistemática en la experiencia de los sujetos de tratamiento y de control antes del momento de la exposición al experimento, por lo que las agregaciones previas a la exposición imitan el comportamiento de las observaciones métricas en una prueba A/A. De manera similar, los valores de propiedad del sujeto capturados en el momento de la primera exposición no pueden verse influenciados por la exposición al tratamiento.

Datadog también ejecuta comprobaciones de diagnóstico de forma regular para detectar violaciones de estos supuestos, como el desequilibrio previo al experimento y la discrepancia en la proporción de muestras dimensionales.

### Manejo de valores faltantes {#handling-missing-values}

Se esperan datos faltantes en la práctica: los usuarios nuevos a menudo no tienen observaciones previas al experimento, y algunos sujetos no tienen un valor registrado para una propiedad. CUPED maneja ambos casos sin descartar al sujeto, siguiendo el enfoque de la Sección 4.2 del [artículo original de CUPED][1].

- **Agregaciones previas a la exposición faltantes:** Cuando un sujeto no tiene datos previos al experimento para una métrica, el valor se establece en cero. Cuando los datos faltan solo parcialmente, también se agrega una covariable de *indicador de falta de datos* separada. Esto ayuda a que CUPED controle el hecho de que un valor faltaba en lugar de permitir que el cero imputado distorsione el ajuste.
- **Valores de propiedad faltantes:** Un valor faltante para una propiedad se trata como su propio valor de categoría en lugar de descartarse, por lo que los sujetos sin un valor de propiedad registrado aún se incluyen.

### Cuántas covariables se incluyen {#how-many-covariates-are-included}

Las covariables se crean a partir de agregaciones, y una agregación no es lo mismo que una métrica. Una métrica de promedio es una sola agregación, pero una métrica de razón se divide en dos agregaciones: un numerador y un denominador. Cada agregación aporta una covariable, además de un indicador de falta de datos cuando los datos faltan parcialmente. Cada propiedad del sujeto aporta una covariable por valor, incluido un valor para los datos faltantes.

Considere un experimento con dos métricas y una propiedad:

- **Ingresos por usuario** (una métrica de promedio)
- **Tasa de clics** (una métrica de razón, clics divididos por vistas de página)
- **Tipo de dispositivo** (una propiedad que es `Desktop` o `Mobile`)

Debido a que la métrica de razón se divide en un numerador y un denominador, estas dos métricas producen tres agregaciones previas a la exposición. Suponiendo que cada uno tiene algunos datos parcialmente faltantes, contribuyen con las siguientes covariables:

| Fuente | Covariables |
| --- | --- |
| Ingresos por usuario (media) | Ingresos por usuario previos a la exposición, más su indicador de falta de datos |
| Tasa de clics (razón) | Clics previos a la exposición y vistas de página previas a la exposición, más un indicador de falta de datos para cada uno |
| Tipo de dispositivo (propiedad) | `Desktop`, `Mobile` y `Missing` |

En total, este experimento incluye 9 covariables: 6 de las tres agregaciones previas a la exposición y 3 de la propiedad de tipo de dispositivo.

Para mantener el ajuste estable, solo se incluyen los valores más comunes de una propiedad. Los 10 valores más comunes en cada variante se combinan en un único conjunto compartido de covariables que se aplica a todas las variantes, y los valores más raros no se incluyen. También se excluye una covariable que no tiene variación, como un indicador de falta de datos cuando a ningún sujeto le falta ese valor.

## Selección de los coeficientes {#selecting-the-coefficients}

Una vez establecidas las covariables, Datadog elige los coeficientes (los valores `theta_i`) que *minimizan aproximadamente la varianza* del incremento ajustado por CUPED. Este ajuste elimina la mayor parte del ruido mientras mantiene una expectativa de cero. Se estima un único conjunto de coeficientes agrupando los datos de todas las variantes, por lo que el mismo ajuste se aplica a cada variante y a los segmentos analizados posteriormente, los cuales se definen mediante las propiedades del sujeto registradas en la asignación.

Una pequeña penalización L2 mantiene los coeficientes estables cuando las covariables están correlacionadas entre sí. Esta penalización no introduce sesgo en el estimador de lift, porque CUPED es insesgado para cualquier conjunto fijo de coeficientes de ajuste. Esto es diferente a la regresión de cresta, que aplica su penalización L2 a un coeficiente sobre el efecto del tratamiento en sí y, por lo tanto, puede sesgar el estimador.

Aunque en la práctica los coeficientes se estiman a partir de los datos del experimento, CUPED los trata como fijos al calcular los resultados. Esto sigue el enfoque del documento original de CUPED, y la teoría sugiere que la contribución a la varianza de la estimación de los coeficientes es generalmente insignificante en los tamaños de muestra requeridos en la experimentación digital.

CUPED a menudo se interpreta como una forma de ajuste de regresión, y ambos están estrechamente relacionados. Para una métrica de media, los coeficientes que minimizan la varianza son exactamente aquellos obtenidos al ajustar la métrica en función de las covariables mediante mínimos cuadrados ordinarios.

Sin embargo, CUPED es fundamentalmente libre de modelo. Se basa únicamente en el hecho de que las diferencias pre-experimento entre grupos aleatorizados son cero en esperanza, y no hace ninguna suposición sobre la forma de la relación entre las covariables y la métrica. Enmarcar CUPED como un complemento en lugar de una regresión proporciona un marco general que se extiende de forma natural a tipos de métricas avanzadas, como las métricas de razón y percentil. En todos los casos, la forma general es la misma: comience desde una estimación de lift sin CUPED y añada términos de ajuste de esperanza cero.

## Reducción de varianza para todos los tipos de métricas {#variance-reduction-for-all-metric-types}

CUPED en Datadog no se limita a métricas basadas en medias. El mismo marco reduce la varianza para métricas de media, razón y percentil, incluidas aquellas que se dirigen al seguimiento de las últimas líneas de una distribución, como el percentil 95 del tiempo de carga de la página. Esta es una ventaja sobre las implementaciones de CUPED basadas en regresión, las cuales no se extienden naturalmente a métricas de percentil. CUPED puede producir intervalos más estrechos con menos muestras, incluyendo para mediciones de latencia y Core Web Vitals que se expresan naturalmente como percentiles.

## Supuestos e interpretación {#assumptions-and-interpretation}

### Supuestos de modelado {#modeling-assumptions}

CUPED no asume relaciones lineales, homocedasticidad ni la ausencia de interacciones. Su supuesto principal es que las medias de las covariables entre variantes son iguales en esperanza. Los otros supuestos son comunes a la experimentación digital en general, como la ausencia de confusión mediante una aleatorización adecuada y muestras lo suficientemente grandes para que los estimadores sean aproximadamente normales según el teorema del límite central.

### Por qué las estimaciones de lift de CUPED difieren de las estimaciones sin CUPED {#why-cuped-lift-estimates-differ-from-non-cuped-estimates}

CUPED no produce las mismas estimaciones de lift con intervalos de confianza más estrechos. Si las estimaciones de CUPED y sin CUPED fueran siempre idénticas, su varianza, y por lo tanto sus intervalos de confianza, también serían idénticos. La diferencia entre los resultados de CUPED y sin CUPED es el mecanismo exacto que impulsa la varianza reducida de CUPED.

### Elegir entre los resultados de CUPED y sin CUPED {#choosing-between-cuped-and-non-cuped-results}

Utilice los resultados de CUPED cuando se cumplan las suposiciones de CUPED. Tienen la misma expectativa que los resultados sin CUPED, pero con una varianza menor. Las prácticas adecuadas de gestión de datos reducen el riesgo de violaciones de las suposiciones, y las comprobaciones de diagnóstico pueden detectar el desequilibrio previo al experimento y el desajuste dimensional en la proporción de la muestra.

<div class="alert alert-info">Antes de que comience el experimento, decida si basará su decisión en el resultado de CUPED o en el resultado sin CUPED. Esto evita seleccionar el resultado que mejor respalde un resultado preferido.</div>

### CUPED y experimentos aleatorizados incorrectamente {#cuped-and-improperly-randomized-experiments}

CUPED no corrige el sesgo causado por una aleatorización incorrecta. Supone que el experimento está correctamente aleatorizado, por lo que no puede recuperar estimaciones estadísticamente válidas de experimentos sistemáticamente sesgados. Los desequilibrios aleatorios de las covariables aún surgen en experimentos correctamente aleatorizados, y CUPED los corrige: las estimaciones ajustadas por CUPED son *condicionalmente* insesgadas para un desequilibrio de covariables observado específico.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.exp-platform.com/Documents/2013-02-CUPED-ImprovingSensitivityOfControlledExperiments.pdf
[2]: /es/experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan
[3]: https://arxiv.org/abs/2312.02935