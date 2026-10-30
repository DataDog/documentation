---
aliases:
- /es/product_analytics/experimentation/reading_results/
description: Lea y comprenda los resultados de sus experimentos.
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: Documentación
  text: Explorador de Analytics
- link: /experiments/diagnostics/
  tag: Documentación
  text: Diagnóstico de experimentos
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Tome decisiones de diseño basadas en datos con Product Analytics
title: Lectura de los resultados del experimento
---
## Descripción general {#overview}

Después de [lanzar un experimento][1], la página de resultados del experimento es el lugar central para analizarlo. Desde esta página, usted puede:

- **Mida las métricas**: Revise los cuadros de mando que comparan el rendimiento del control y el tratamiento en sus métricas de decisión.
- **Analice los resultados más a fondo**: Desglose el aumento de la métrica por segmentos de usuario o grafique el aumento a lo largo del tiempo para comprender cómo funcionó su cambio en los diferentes grupos.
- **Inspeccione las repeticiones de sesión**: Abra las repeticiones de sesiones de usuarios individuales para ver cómo experimentó cada usuario cada variante.
- **Documente los aprendizajes**: Registre las conclusiones y los puntos clave para su equipo.

Las siguientes secciones explican el cuadro de mando de métricas y cómo explorar los resultados.

## Diagnóstico de experimentos {#experiment-diagnostics}

Datadog ejecuta [diagnósticos de experimentos][9] con el análisis de experimentos para verificar los datos de exposición, los datos de métricas, la aleatorización y el estado del análisis. Revise las advertencias de diagnóstico antes de interpretar los resultados, especialmente cuando falte una métrica, sea inesperadamente cero o esté marcada con una advertencia.

## Cuadro de mando de métricas {#metric-scorecard}

La página de resultados del experimento muestra un cuadro de mando para cada métrica de decisión. Cada fila resume cómo se comparó una métrica entre las variantes de tratamiento y control.

{{< img src="/product_analytics/experiment/exp_reading_exps_scorecard.png" alt="La descripción general de los resultados del experimento que muestra una tabla de métricas de decisión con valores de control y tratamiento, aumento relativo y barras de intervalo de confianza para tres métricas." style="width:90%;" >}}

### Qué muestra el cuadro de mando {#what-the-scorecard-shows}

Para cada métrica, el cuadro de mando muestra:

- **Valores de control y tratamiento**: El valor promedio de la métrica por sujeto en cada variante.
- **Elevación relativa**: El cambio porcentual en ese promedio entre el tratamiento y el control.
- **Intervalo de confianza**: Un rango de valores de elevación consistentes con los datos observados, que se muestra como una barra centrada en la estimación de la elevación relativa.

La amplitud y la interpretación del intervalo de confianza dependen del [método de análisis][2] configurado para el experimento.

{{% collapse-content title="Cómo se calculan las métricas" level="h4" expanded=false id="how-metrics-are-calculated" %}}

Datadog analiza los experimentos a nivel de **sujeto**: la unidad que configuró al establecer el experimento, generalmente un usuario. Datadog calcula un valor métrico para cada sujeto inscrito (por ejemplo, ingresos por usuario o si el usuario completó un registro). Estos valores por sujeto forman una distribución para cada variante. Luego, el motor estadístico de Datadog compara estas distribuciones entre el control y el tratamiento.

**El lift relativo** mide cuánto cambió el tratamiento el valor métrico promedio por sujeto en comparación con el control:

```
Relative lift = (Treatment − Control) / Control
```

Un lift relativo del 10% significa que el valor promedio por sujeto del grupo de tratamiento es un 10% mayor que el promedio del grupo de control. Un lift negativo significa que el tratamiento tuvo un desempeño peor en promedio.

{{% /collapse-content %}}

### Intervalos de confianza{#confidence-intervals}

El intervalo de confianza es un rango de valores de lift que son consistentes con los datos observados. El lift real podría caer fuera de este rango, pero los valores dentro del intervalo son más consistentes con lo que midió el experimento.

- Si el **intervalo completo está por encima de cero**, el resultado es estadísticamente significativo en la dirección positiva. Es poco probable que ocurra una mejora al menos tan grande si no hay un efecto real.
- Si el **intervalo completo está por debajo de cero**, el resultado es estadísticamente significativo en la dirección negativa. Es probable que el tratamiento haya reducido la métrica.
- Si el **intervalo cruza el cero**, el resultado no es estadísticamente significativo. El resultado es consistente con un efecto real de cero.

Utilice el ancho del intervalo como indicador de precisión: un intervalo más estrecho significa una estimación más precisa del lift; un intervalo más amplio significa mayor incertidumbre, a menudo porque la muestra es más pequeña o la métrica es ruidosa.

Si la [corrección de pruebas múltiples][8] está habilitada, los intervalos de confianza son más amplios porque Datadog controla la tasa de error familiar en todas las comparaciones de métricas y variantes de tratamiento del experimento.

### Lift global {#global-lift}

Los experimentos generalmente inscriben solo a un subconjunto de usuarios elegibles. Cambie a la {{< ui >}}Global lift{{< /ui >}} pestaña en el cuadro de mando de métricas para estimar cómo afectaría a los totales generales de sus métricas el implementar el tratamiento a todos los usuarios elegibles. Consulte [Lift global][7] para conocer la metodología completa.

{{< img src="/product_analytics/experiment/exp_reading_global_lift.png" alt="La pestaña de Lift global del cuadro de mando del experimento que muestra los valores promedio de las métricas de control y tratamiento, la cobertura y el lift global para cada métrica de decisión." style="width:90%;" >}}

Para cada métrica, la {{< ui >}}Global lift{{< /ui >}} pestaña muestra:

- **Valores de control y tratamiento**: El valor promedio de la métrica por sujeto en cada variante; los mismos valores que se muestran en la pestaña principal del cuadro de mando.
- **Cobertura**: La proporción estimada del total de su métrica global asociada con la población elegible del experimento (excluyendo el efecto del experimento).
- **Lift global**: El cambio estimado en los totales generales de sus métricas si el tratamiento se lanzara a todos los usuarios elegibles. Datadog calcula el lift global como el producto de la cobertura y el lift local (relativo) del experimento.

## Exploración de resultados {#exploring-results}

Desde el cuadro de mando de métricas, pase el cursor sobre el nombre de una métrica para visualizar las opciones de exploración. Las opciones disponibles dependen de la fuente de su métrica.

### Gráfico {#chart}

Haga clic en {{< ui >}}Chart{{< /ui >}} en cualquier métrica para abrir una visualización interactiva de cómo se desempeñó una métrica durante el experimento. Dentro del gráfico, usted puede:

- **Dividir por propiedades de segmentación**: Compare el lift entre cohortes como el tipo de dispositivo o el nivel de usuario. Las propiedades reflejan los atributos del sujeto en el momento inicial de la exposición.
- **Evolución del lift a lo largo del tiempo**: Vea cómo evolucionan las tendencias del lift durante el experimento, graficadas por fecha de calendario o por días desde la primera exposición de cada sujeto al experimento.
- **Agregar filtros**: limite el gráfico a un subconjunto específico de sujetos.
- **Cambie tipos de lift**: Alterne entre lift relativo y lift absoluto (Tratamiento − Control).

El siguiente ejemplo muestra un desglose a nivel de segmento por país. Utilice esta vista para comprender cuándo ciertos grupos reaccionaron de manera diferente a la nueva experiencia.

{{< img src="/product_analytics/experiment/exp_segment_view.png" alt="Vista a nivel de segmento de una métrica dividida por código ISO de país, que muestra un gráfico de barras de lift relativo y una tabla con valores de control y tratamiento por país." style="width:90%;" >}}

### Copiar SQL {#copy-sql}

Para [métricas nativas de almacén][3], haga clic en {{< ui >}}Copy SQL{{< /ui >}} para copiar una versión simplificada de la lógica de canalización que Datadog utilizó para calcular el resultado. Pegue la consulta en su almacén para auditar el resultado o realizar un análisis de seguimiento.

{{< img src="/product_analytics/experiment/exposure-sql/copy-sql.png" alt="La página de resultados del experimento con el botón Copiar SQL resaltado en una métrica de almacén." style="width:90%;" >}}

### Reproducciones{#replays}

Para métricas basadas en datos de [RUM][4] o [Product Analytics][5], haga clic en {{< ui >}}Replays{{< /ui >}} para ver las [reproducciones de sesión][6] de los usuarios inscritos en el experimento. Revise cómo los sujetos de cada variante experimentaron el producto.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/experiments/plan_and_launch_experiments
[2]: /es/experiments/statistics/analysis_methods
[3]: /es/experiments/guide/connecting_a_data_warehouse/
[4]: /es/real_user_monitoring/
[5]: /es/product_analytics/
[6]: /es/session_replay/
[7]: /es/experiments/global_lift/
[8]: /es/experiments/statistics/multiple_testing_correction
[9]: /es/experiments/diagnostics/