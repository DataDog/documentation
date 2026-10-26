---
aliases:
- /es/product_analytics/experimentation/cumulative_impact/
- /es/experiments/cumulative_impact
- /es/experiments/cumulative_impact/
description: Agregue el efecto ajustado por ruido de cada experimento que un equipo
  ha ejecutado contra una métrica para estimar el movimiento total a lo largo del
  tiempo.
further_reading:
- link: /experiments/reading_results
  tag: Documentación
  text: Lectura de los resultados del experimento
- link: /experiments/statistics/minimum_detectable_effect
  tag: Documentación
  text: Efectos mínimos detectables
- link: /experiments/statistics/analysis_methods
  tag: Documentación
  text: Métodos de análisis
- link: https://www.datadoghq.com/blog/two-ways-to-measure-cumulative-impact/
  tag: Blog
  text: Dos formas de medir el impacto acumulativo de los experimentos
title: Impacto acumulativo
---
## Descripción general {#overview}

Teams que ejecutan experimentos necesitan entender cuánto han movido acumulativamente una métrica a lo largo del tiempo. Sumar los aumentos observados de experimentos exitosos puede parecer la forma natural de hacer esto, pero sobreestima sistemáticamente el impacto real. Las estimaciones infladas erosionan la confianza en la experimentación y dificultan la evaluación honesta del progreso.

Impacto acumulativo es una vista a nivel de métrica que agrega el efecto de cada experimento que un equipo ha ejecutado contra una sola métrica y produce una estimación ajustada por ruido del movimiento total. Está disponible en la página de descripción general de la métrica junto a la tendencia de la métrica existente, e incluye dos componentes nuevos: un gráfico de impacto acumulativo y una distribución de efectos.

## Uso del impacto acumulativo {#using-cumulative-impact}

### Por qué la agregación ingenua sobreestima el impacto {#why-naive-aggregation-overstates-impact}

El desafío de agregar resultados de experimentos se conoce como la *maldición del ganador*: la tendencia sistemática de los resultados estadísticamente significativos a sobreestimar el efecto real. Debido a que los experimentos con grandes aumentos medidos tienen más probabilidades de alcanzar significancia y ser implementados, una lista de experimentos "ganadores" está sesgada hacia mediciones que terminaron por encima de la realidad. Sumar esas mediciones agrava el sesgo.

Históricamente, corregir la maldición del ganador requería que los Teams de datos construyeran modelos estadísticos personalizados o dependieran de reglas generales. Datadog Experiments realiza esta corrección automáticamente ajustando un modelo estadístico en todos los experimentos de su equipo sobre una métrica y produciendo una estimación corregida del impacto acumulativo.

### Lectura del gráfico de impacto acumulativo {#reading-the-cumulative-impact-chart}

El gráfico de impacto acumulativo muestra cómo se ha movido la métrica a lo largo del período de tiempo seleccionado. Establezca el selector de **Time frame** en la ventana que desea evaluar, por ejemplo el último trimestre, y el gráfico se completará con los experimentos que concluyeron durante esa ventana.

El gráfico informa dos números de manera destacada:

1. La cantidad de experimentos que se ejecutaron durante la ventana y cuántos de ellos implementaron una variante de tratamiento.
2. El impacto acumulativo en la métrica, expresado como una mejora relativa o absoluta.

{{< img src="/product_analytics/experiment/cumulative_impact/cumulative_impact_overview.png" alt="La página de descripción general de la métrica que muestra la sección de Impacto acumulativo con un selector de Time frame configurado para los últimos 6 meses, un valor de impacto acumulativo de +5.58% etiquetado con el número de experimentos ganadores y el gráfico de impacto acumulativo trazado a lo largo del tiempo." style="width:90%;" >}}

Haga clic en **Incluyendo X experimentos ganadores** para ver los experimentos utilizados en el cálculo del impacto acumulado. Seleccionar un experimento de la lista abre su página de resultados, donde puede ver el aumento medido original, la decisión de envío y la estimación corregida utilizada en el cálculo acumulativo. Esto hace posible rastrear cualquier contribución individual hasta su fuente, lo cual es útil al comunicar el impacto al liderazgo o auditar las afirmaciones a nivel de programa.

### Lectura de la distribución del efecto {#reading-the-effect-distribution}

A la derecha del gráfico de impacto acumulativo se encuentra la distribución del efecto. Esta es una visualización de los efectos reales del equipo en la métrica. El centro de la distribución describe el tamaño del efecto que el equipo produce en un experimento promedio, y la dispersión describe qué tan variables tienden a ser esos efectos.

{{< img src="/product_analytics/experiment/cumulative_impact/effect_distribution.png" alt="El panel de Distribución del efecto del experimento que muestra un tamaño de efecto promedio de +0.55% en 10 experimentos concluidos, una desviación estándar de 0.15% y una curva en forma de campana centrada sobre cero entre -1% y +1%." style="width:80%;" >}}

La distribución está ajustada por ruido: los resultados ruidosos no amplían la distribución más de lo que los datos respaldan.

La distribución del efecto ayuda con dos decisiones:

- **Dónde invertir.** Un equipo cuya distribución se sitúa muy por encima de cero en una métrica particular está produciendo aumentos confiables y es posible que desee seguir invirtiendo en esta área. Un equipo cuya distribución se sitúa alrededor de cero es posible que desee redirigir sus esfuerzos a otra parte.
- **Cómo dimensionar futuros experimentos.** Si un equipo habitualmente potencia los experimentos para un [efecto mínimo detectable][1] del 5%, pero la distribución sugiere que sus efectos reales suelen estar dentro de más o menos 3%, es probable que los experimentos tengan poca potencia. Considere aumentar los tamaños de muestra, ampliar la segmentación o centrarse en oportunidades con un mayor impacto esperado.

### Qué experimentos se incluyen {#which-experiments-are-included}

El impacto acumulativo considera cada experimento en la ventana de tiempo seleccionada que se dirige a la métrica y ha producido resultados. Algunas reglas deciden cómo contribuye cada experimento:

- **Ajuste del modelo:** cada experimento con diagnósticos que no fallan contribuye al ajuste del modelo estadístico.
- **Agregación:** solo los experimentos que lanzaron una variante que no es de control contribuyen al total acumulativo. Los experimentos que lanzaron la variante de control, o que terminaron sin una decisión de lanzamiento, no se suman.
- **Diagnósticos:** los experimentos con diagnósticos fallidos se excluyen por completo del ajuste. Los experimentos sin diagnósticos, o con diagnósticos aprobados o de advertencia, se incluyen.

### Visualización local y global {#local-and-global-views}

Para algunas métricas, puede cambiar entre una *vista local* y una *vista global* del impacto acumulativo.

La vista local responde a la pregunta: "¿cuánto se movió esta métrica para los usuarios que estuvieron expuestos a cada experimento?" Es la vista correcta al comparar el tamaño de los efectos entre equipos o superficies, porque no se diluye por el tamaño de la exposición.

La vista global responde a la pregunta: "¿cuánto se movió esta métrica en toda la base de usuarios?" Pondera la estimación corregida de cada experimento según la proporción de usuarios expuestos a ese experimento, produciendo una estimación a nivel de programa del movimiento total. La visualizar global es la correcta al comunicar el impacto en toda la organización, porque un aumento fuerte en una audiencia pequeña se descuenta correctamente en relación con un aumento menor en una audiencia mucho más grande.

Ambas visualizar utilizan las mismas estimaciones corregidas y solo difieren en cómo se combinan esas estimaciones.

### Elección de un Time frame{#choosing-a-time-frame}

El selector de Time frame controla qué experimentos se incluyen. Una ventana más larga incluye más experimentos, lo que fortalece el ajuste del modelo y produce una distribución de efectos más fluida, pero también puede mezclar diferentes estrategias de equipo si el equipo ha cambiado de dirección.

Un punto de partida razonable es el período durante el cual la estrategia de experimentación de su equipo ha sido más o menos consistente, a menudo un trimestre o medio año. Comparar ventanas también puede ser informativo: un equipo cuya distribución de efectos se ha desplazado hacia arriba con el tiempo está produciendo efectos reales más grandes, no solo más decisiones de lanzamiento.

## Detalles estadísticos {#statistical-details}

Esta sección describe el modelo que produce las estimaciones corregidas y la distribución de efectos. Está destinado a científicos de datos y estadísticos que desean comprender, auditar o reproducir los resultados.

### El modelo jerárquico {#the-hierarchical-model}

Datadog utiliza un modelo normal-normal jerárquico, una formulación estándar para el meta-análisis empírico de Bayes. Sea θ_i el efecto verdadero latente del experimento i sobre la métrica objetivo, y sea y_i el lift estimado a partir de ese experimento, con error estándar conocido σ_i. El modelo es:

```
y_i | θ_i  ~ Normal(θ_i, σ_i²)     (sampling distribution)
θ_i        ~ Normal(μ, τ²)         (population distribution of true effects)
```

La primera línea dice que cada experimento proporciona una medición ruidosa de su propio efecto verdadero, con un nivel de ruido determinado por el error estándar del experimento. La segunda línea dice que los efectos verdaderos del equipo se extraen a su vez de una distribución compartida con media μ y varianza τ². Esta distribución compartida es lo que la interfaz de usuario muestra como la *distribución del efecto*.

Marginalizando sobre el θ_i latente, la verosimilitud marginal para los lifts observados es:

```
y_i ~ Normal(μ, τ² + σ_i²)
```

Esto es lo que ajusta el optimizador.

### Priors{#priors}

Datadog utiliza priors débilmente informativos sobre los parámetros de la población. En los datos reescalados (ver más abajo), los valores predeterminados son:

```
μ ~ Normal(0, 1)
τ ~ HalfCauchy(0, 0.25)
```

El prior normal sobre μ es lo suficientemente amplio como para no ser informativo en la mayoría de escalas métricas tras el reescalado. El prior half-Cauchy sobre τ es una opción común para los parámetros de escala jerárquicos. Tiene soporte en los números reales no negativos y concentra masa cerca de cero, lo que significa que el modelo favorece la homogeneidad cuando los datos son ambiguos. Su cola pesada permite una gran heterogeneidad cuando los datos la respaldan.

### Reescalado para estabilidad numérica {#rescaling-for-numerical-stability}

Antes del ajuste, los lifts observados y los errores estándar se reescalan a media cero y varianza unitaria. Sea ȳ la media muestral de los lifts y s_y su desviación estándar muestral. El optimizador trabaja con las cantidades reescaladas:

```
ỹ_i = (y_i − ȳ) / s_y
σ̃_i = σ_i      / s_y
```

Esto significa que un solo conjunto de hiperparámetros previos funciona en métricas cuyas escalas naturales difieren por muchos órdenes de magnitud. Después del ajuste, las estimaciones de μ y τ se transforman de nuevo a la escala original:

```
μ̂ = μ̃ · s_y + ȳ
τ̂ = τ̃ · s_y
```

### Ajuste del modelo {#fitting-the-model}

Los parámetros del modelo (μ, τ) se estiman mediante la estimación de máximo a posteriori (MAP). Para mantener τ positivo durante la optimización, el modelo se reparametriza como τ = exp(η) y el optimizador busca sobre (μ, η).

El objetivo es el registro negativo de la posterior de (μ, η) dado los lifts observados:

```
−log p(μ, η | data) = −[Σ_i log Normal(y_i | μ, τ² + σ_i²)]
                     − log Normal(μ | μ_prior_mean, μ_prior_sd²)
                     − log HalfCauchy(τ | τ_prior_scale)
                     − η                          (Jacobian of τ = exp(η))
```

La optimización utiliza Nelder-Mead, un método simplex sin gradiente. Esta es una opción robusta para un problema bidimensional y evita problemas con gradientes de diferencia finita cerca de τ = 0.

### Estimaciones corregidas (medias posteriores) {#corrected-estimates-posterior-means}

Después de ajustar (μ̂, τ̂), cada experimento recibe una estimación corregida igual a la media posterior de su efecto real bajo la distribución previa ajustada. La actualización conjugada normal-normal es un promedio ponderado por precisión del incremento observado y la media poblacional:

```
θ̂_i = (y_i / σ_i² + μ̂ / τ̂²) / (1 / σ_i² + 1 / τ̂²)
```

De manera equivalente, θ̂_i = (1 − w_i) · μ̂ + w_i · y_i donde w_i = τ̂² / (τ̂² + σ_i²) es el peso asignado al incremento observado. Los experimentos con intervalos estrechos (σ_i pequeño) mantienen la mayor parte de su incremento observado; los experimentos con intervalos amplios son atraídos hacia la media poblacional μ̂. Este es el paso de contracción que corrige la maldición del ganador.

### Agregación al impacto acumulativo {#aggregating-to-cumulative-impact}

Las estimaciones contraídas se combinan dependiendo de si la métrica es naturalmente aditiva o multiplicativa.

Para métricas de incremento relativo, el impacto acumulativo se calcula de forma multiplicativa:

```
Cumulative relative impact = ∏ (1 + θ̂_i) − 1
```

Para métricas de diferencia absoluta, el impacto acumulativo es la suma de las estimaciones contraídas:

```
Cumulative absolute impact = Σ θ̂_i
```

Solo se incluyen en la suma o el producto los experimentos que lanzaron una variante distinta a la de control. El gráfico en la interfaz de usuario traza una versión continua de esta suma o producto, ordenada por la fecha de finalización del experimento, para que pueda ver cómo se acumuló el impacto con el tiempo.

### Ponderación de cobertura (vista global) {#coverage-weighting-global-view}

La vista global utiliza las mismas estimaciones reducidas, pero pondera cada una según la *cobertura* del experimento, la proporción de la base de usuarios elegibles que estuvo expuesta a él. Sea c_i la cobertura del experimento i:

```
Global relative impact = ∏ (1 + c_i · θ̂_i) − 1
Global absolute impact = Σ c_i · θ̂_i
```

La ponderación de cobertura es lo que convierte una estimación por usuario expuesto en una estimación a nivel de programa. Los experimentos sin un valor de cobertura registrado se omiten de la vista global, pero aún contribuyen a la vista local y al ajuste del modelo.

### Elegibilidad de diagnóstico {#diagnostic-eligibility}

Antes de ajustar el modelo, cada experimento se verifica con sus diagnósticos. Los diagnósticos señalan problemas con la calidad del experimento, como un desequilibrio grave en la asignación, asignaciones mixtas entre variantes o falta de datos de métricas. Un experimento es *elegible* si su estado de diagnóstico consolidado es cualquier otro que no sea FAIL. Los experimentos sin filas de diagnóstico se consideran elegibles.

Los experimentos fallidos se excluyen por completo del ajuste del modelo y de la agregación acumulativa. No se ajustan hacia la media de la población para luego sumarse; se descartan. Esto evita que las mediciones poco confiables contaminen el total acumulado o la distribución del efecto.

### Tamaño de muestra mínimo {#minimum-sample-size}

El modelo requiere al menos cinco experimentos elegibles. Con menos experimentos, la estimación MAP de τ es inestable y la contracción resultante no es confiable. Cuando no se cumple este umbral, no se muestra ningún valor de impacto acumulado ni distribución de efectos.

## Solución de problemas {#troubleshooting}

### Gráficos no se muestran {#charts-not-showing}

El impacto acumulado requiere al menos cinco experimentos con diagnósticos que no fallen para ajustar el modelo. Si hay menos de cinco experimentos elegibles disponibles, Datadog no muestra un valor de impacto acumulativo. Amplíe el marco temporal o ejecute más experimentos contra la métrica para resolver esto.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/experiments/statistics/minimum_detectable_effect/