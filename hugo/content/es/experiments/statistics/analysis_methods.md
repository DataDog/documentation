---
aliases:
- /es/experiments/analysis_methods
- /es/experiments/analysis_methods/
description: Elija cómo Datadog calcula las estimaciones de incremento y los intervalos
  de confianza para los resultados de los experimentos.
further_reading:
- link: /experiments/plan_and_launch_experiments
  tag: Documentación
  text: Planifique y lance experimentos
- link: /experiments/reading_results
  tag: Documentación
  text: Lectura de los resultados del experimento
- link: /experiments/statistics/minimum_detectable_effect
  tag: Documentación
  text: Efectos mínimos detectables
- link: /experiments/statistics/cuped
  tag: Documentación
  text: 'CUPED: Técnica de reducción de varianza'
- link: /experiments/statistics/multiple_testing_correction
  tag: Documentación
  text: Corrección de pruebas múltiples
- link: https://www.datadoghq.com/blog/two-ways-to-measure-cumulative-impact/
  tag: Blog
  text: Dos formas de medir el impacto acumulativo de los experimentos
title: Métodos de análisis
---
## Descripción general {#overview}

Datadog Experiments proporciona varios métodos para estimar el incremento del experimento y calcular el intervalo alrededor de esa estimación. El mejor método depende de cuánta flexibilidad necesite mientras el experimento está en ejecución, qué tamaño de muestra espera y cómo su equipo desea tomar decisiones de lanzamiento.

| Método | Descripción | Fortalezas | Compensaciones |
| --- | --- | --- | --- |
| [**Frecuentista de muestra fija**](#fixed-sample-frequentist-analysis) | Elija un tamaño de muestra o una duración antes de lanzar el experimento, espere hasta ese punto y luego tome una decisión. | Proporciona la mayor potencia para un tamaño de muestra fijo. | Requiere un plan inicial y puede perder sus garantías estadísticas si se detiene antes de tiempo o extiende el experimento basándose en los resultados observados. |
| [**Frecuentista secuencial**](#sequential-frequentist-analysis) | Haga un seguimiento de los resultados mientras se ejecuta el experimento y tome una decisión cuando esté listo. | Admite una toma de decisiones flexible mientras controla la tasa de falsos positivos. | Tiene menos potencia que el análisis de muestra fija, por lo que puede requerir más muestras para detectar el mismo efecto. |
| [**Bayesiano**](#bayesian-analysis) | Combine los datos del experimento con una creencia previa sobre incrementos plausibles, luego tome decisiones a partir de la distribución posterior. | Admite decisiones matizadas, especialmente cuando los tamaños de muestra son pequeños. | Requiere confianza en la distribución previa y alineación sobre cómo interpretar las probabilidades. |

El análisis frecuentista secuencial es el predeterminado porque le permite hacer un seguimiento de los resultados y tomar decisiones de lanzamiento o reversión sin aumentar la tasa de falsos positivos. El análisis de muestra fija puede ser más potente cuando todo sale según lo planeado, pero requiere un proceso de decisión más estricto. El análisis bayesiano admite flujos de trabajo de toma de decisiones más especializados.

Configure el método de análisis en el [plan de análisis estadístico][1] del experimento.

## Análisis frecuentista de muestra fija {#fixed-sample-frequentist-analysis}

El análisis frecuentista de muestra fija es la forma más directa de analizar los resultados de un experimento. Antes de lanzar el experimento, elija cuándo evaluará los resultados. Este punto de decisión puede ser una duración fija o un tamaño de muestra objetivo. Cuando el experimento llegue a ese punto, compare cada variante de tratamiento con el control y decida si lanzar, revertir o continuar con un nuevo experimento.

Utilice el análisis de muestra fija cuando el tamaño de la muestra sea escaso y su equipo pueda comprometerse con los criterios de decisión antes de que comience el experimento.

El desafío principal es elegir el punto de decisión. Si evalúa demasiado pronto, es posible que el experimento no tenga suficiente potencia para detectar un efecto real. Si evalúa demasiado tarde, es posible que exponga a los usuarios a una experiencia inferior durante más tiempo del necesario. El punto de decisión debe estar fundamentado en un análisis de potencia, el cual ayuda a los equipos de experimentación a elegir una duración que le dé al experimento suficiente potencia para detectar un [efecto mínimo detectable][2] determinado, mientras se adhiere a las restricciones del producto, del negocio o operativas.

<div class="alert alert-warning">Para el análisis de muestra fija, evite cambiar la duración o el tamaño de la muestra basándose en resultados provisionales. Detenerse antes de tiempo porque los resultados parecen inusualmente buenos o malos, o extender el experimento porque los resultados están cerca de ser significativos, puede sesgar la estimación del incremento y aumentar la tasa de falsos positivos.</div>

## Análisis frecuentista secuencial {#sequential-frequentist-analysis}

El análisis frecuentista secuencial le permite hacer un seguimiento de los resultados del experimento de forma continua y tomar una decisión sin preseleccionar un tamaño de muestra final. Esto es útil cuando necesita reaccionar ante resultados positivos o negativos contundentes, o cuando las suposiciones detrás de un plan de muestra fija pueden cambiar mientras el experimento está en curso.

El análisis secuencial controla la tasa de falsos positivos mientras permite verificaciones repetidas de los resultados. La contrapartida es la potencia: para el mismo número de sujetos, el análisis secuencial tiene menos probabilidades que el análisis de muestra fija de detectar un efecto real. Para alcanzar la misma potencia, es posible que el experimento deba ejecutarse durante más tiempo.

Utilice el análisis secuencial cuando la flexibilidad sea más importante que maximizar la potencia para un tamaño de muestra predeterminado. Es una buena opción predeterminada para muchos experimentos porque le permite:

- Hacer un seguimiento de los resultados mientras el experimento está activo.
- Detenerse antes de tiempo ante grandes mejoras o degradaciones.
- Continuar recopilando datos sin invalidar el análisis.
- Evitar reiniciar el experimento cuando las suposiciones originales sobre el tamaño de la muestra eran incorrectas.

## Análisis bayesiano {#bayesian-analysis}

El análisis bayesiano utiliza los datos del experimento para actualizar una creencia previa sobre los valores de incremento plausibles. El resultado es una distribución posterior que describe qué valores de incremento son más compatibles con la distribución previa y los datos observados.

Los métodos frecuentistas preguntan qué tan probables serían los datos observados si el tratamiento y el control no tuvieran una diferencia real. Los métodos bayesianos, en cambio, toman los datos observados y la distribución previa como dados, y luego estiman la probabilidad de diferentes valores de incremento. Esto puede hacer que los resultados sean más fáciles de discutir con las partes interesadas, ya que afirmaciones como "es probable que el tratamiento sea mejor que el control" se corresponden más directamente con el resultado del análisis.

Utilice el análisis bayesiano cuando:

- Necesita tomar una decisión con datos limitados.
- La decisión depende de la probabilidad de que un incremento supere un umbral comercial, no solo de si el intervalo excluye el cero.
- Las partes interesadas prefieren pensar en términos de probabilidades de éxito en lugar de en términos de valores p frecuentistas.

La distribución previa importa más cuando los tamaños de muestra son pequeños. Con suficientes datos, la distribución posterior está determinada principalmente por el comportamiento observado del experimento, pero las distribuciones previas fundamentadas empíricamente suelen ser lo suficientemente sólidas como para afectar los resultados incluso con tamaños de muestra grandes. Una distribución a priori mal especificada puede influir en la estimación del lift y en el intervalo lo suficiente como para cambiar la decisión.

### Elegir una distribución a priori {#choosing-a-prior}

Ambas distribuciones a priori reducen las estimaciones de lift ruidosas hacia la media a priori. Cada distribución a priori aplica
la reducción de una manera diferente:

- **Distribución a priori normal**: Para una distribución a priori fija, el factor de reducción depende del error estándar de la estimación del lift, no de su magnitud. Las estimaciones con alta certeza se reducen menos, mientras que las estimaciones con alta incertidumbre se reducen más. La media y la varianza posteriores tienen expresiones de forma cerrada, lo que hace que esta distribución a priori sea sencilla de usar.
- **Distribución a priori t de Student**: La reducción depende tanto del error estándar de la estimación del lift como de su magnitud. Los efectos pequeños se reducen de forma similar al modelo normal, mientras que los efectos grandes se reducen de forma menos agresiva. Este enfoque está motivado por la posibilidad de efectos raros y grandes discutidos en [A/B Testing with Fat Tails][5].

<div class="alert alert-info">Los intervalos bayesianos son técnicamente intervalos de credibilidad, aunque Datadog puede presentarlos junto con intervalos de confianza en la interfaz de usuario de resultados del experimento. A diferencia de los intervalos frecuentistas, los intervalos bayesianos no ofrecen la misma garantía de tasa de falsos positivos.</div>

## Configuraciones relacionadas {#related-settings}

Los métodos de análisis son solo una parte del plan de análisis estadístico. Datadog Experiments también permite modificar las siguientes [configuraciones][1]:

[CUPED][4]
: Utiliza datos previos al experimento de cada sujeto para reducir la varianza de las métricas y mejorar la sensibilidad del experimento. Con CUPED habilitado, los valores de lift y de las métricas mostrados pueden diferir de las estimaciones ingenuas calculadas a partir de los datos sin procesar.

Corrección de pruebas múltiples
: Ajusta por la mayor tasa de error familiar que resulta de evaluar múltiples métricas y comparaciones de variantes de tratamiento. Esto produce resultados más conservadores y no está disponible con el análisis bayesiano. Para obtener más información, consulte [Corrección de pruebas múltiples][3].

Nivel de confianza
: Controla el ancho del intervalo alrededor de la estimación del lift. Los niveles de confianza más altos producen intervalos más amplios y requieren más datos para alcanzar significancia estadística.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/experiments/plan_and_launch_experiments/#choose-a-statistical-analysis-plan
[2]: /es/experiments/statistics/minimum_detectable_effect
[3]: /es/experiments/statistics/multiple_testing_correction
[4]: /es/experiments/statistics/cuped
[5]: https://doi.org/10.1086/710607