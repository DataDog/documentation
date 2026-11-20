---
description: Comprenda las advertencias de diagnóstico en Datadog Experiments y aprenda
  a resolver problemas comunes de datos y aleatorización.
further_reading:
- link: /experiments/reading_results/
  tag: Documentación
  text: Lectura de los resultados del experimento
- link: /experiments/troubleshooting/
  tag: Documentación
  text: Solución de problemas de experimentos
- link: /experiments/concepts/exposure_sql/
  tag: Documentación
  text: Modelos SQL de exposición
- link: /feature_flags/
  tag: Documentación
  text: Feature Flags
title: Diagnóstico de experimentos
---
## Descripción general {#overview}

Datadog ejecuta verificaciones de diagnóstico con el análisis de experimentos para ayudarle a identificar problemas de calidad de datos, aleatorización y configuración antes de tomar una decisión de implementación. Cuando una verificación encuentra un problema, Datadog lo muestra en la página de resultados del experimento como una advertencia, un mensaje de métrica o una verificación de diagnóstico fallida.

Comience con cualquier verificación de diagnóstico fallida o banner de advertencia antes de interpretar el lift, los intervalos de confianza o el lift global.

## Desequilibrio de tráfico {#traffic-imbalance}

Un desequilibrio de tráfico, también conocido como desajuste de la proporción de muestra (SRM, por sus siglas en inglés), significa que las asignaciones observadas entre las variantes difieren significativamente de las ponderaciones de asignación configuradas.

Datadog detecta el SRM con la prueba de bondad de ajuste chi-cuadrado de Pearson. La prueba compara los recuentos de variantes observados con los recuentos esperados a partir de las ponderaciones configuradas. El diagnóstico falla cuando el valor p está por debajo de `0.001`, lo que corresponde a un nivel de significancia (alfa) de `0.001`. Datadog no aplica un tamaño de muestra total mínimo ni un requisito de recuento esperado a esta verificación general.

Ejecutamos la prueba en el nivel más conservador α = 0.001 porque esta prueba no es secuencialmente válida; el nivel de significancia más conservador nos ayuda a evitar falsos positivos.

Trate el SRM como un bloqueador para interpretar los resultados. Indica que la aleatorización efectiva, el registro de exposición o la población de análisis del experimento están sesgados. Hasta que encuentre y solucione la causa raíz, el lift, los intervalos de confianza y el lift global no pueden respaldar una inferencia causal válida.

### Causas comunes {#common-causes}

Para los experimentos respaldados por Datadog Feature Flags, las causas comunes incluyen:

- La división del tráfico (los porcentajes relativos asignados a las variantes) cambió después del lanzamiento, por ejemplo de `90/10` a `50/50`, mientras que las asignaciones realizadas bajo la división anterior permanecen en la ventana de análisis.
- Los eventos de exposición se pierden a diferentes tasas por variante después de la asignación. Por ejemplo, una redirección o un bloqueo específico de una variante puede impedir que los eventos de exposición almacenados en búfer lleguen a Datadog.

Mantenga constante la división del tráfico entre variantes durante la duración del experimento. Para aumentar un experimento dividido equitativamente, incremente la [exposición al tráfico][1] proporcionalmente para ambas variantes. Por ejemplo, aumente la exposición al tráfico de una división de `10/10` a una división de `50/50`. Esto aumenta ambos porcentajes de variante proporcionalmente mientras preserva su división relativa.

Cambiar las reglas de segmentación, la clave de segmentación o la exposición al tráfico no causa SRM por sí solo. Tal cambio causa SRM solo si altera la población de asignación incluida de manera diferente según la variante. De lo contrario, cambia el volumen de tráfico o puede causar un diagnóstico diferente. Por ejemplo, un SDK inconsistente `targetingKey` puede causar **Datos de métricas faltantes** cuando las asignaciones y los eventos de métricas ya no se unen al mismo sujeto. Causa **Asignaciones mixtas** solo si el mismo sujeto registrado recibe más de una variante.

Para experimentos nativos de almacén, las causas comunes incluyen:

- La fracción de exposición esperada para cada variante configurada en Datadog no coincide con la probabilidad de asignación utilizada por el sistema de aleatorización ascendente.
- El [Modelo SQL de exposición][2] filtra, une, agrega o aplica restricciones de marca de tiempo de una manera que descarta sujetos de asignación de una variante con más frecuencia que de otra.
- El registro de asignación ascendente pierde o registra incorrectamente las asignaciones a diferentes tasas según la variante, como la pérdida de telemetría dependiente del tratamiento o la asignación de una variante a la clave de variante incorrecta.
- El análisis incluye sujetos basados en el comportamiento que ocurre después de la asignación y que puede verse afectado por la variante. Por ejemplo, un evento de elegibilidad dependiente del tratamiento o un filtro de bots puede excluir una variante a una tasa más alta.

### Cómo resolver {#how-to-resolve}

1. Detenga la toma de decisiones para el experimento hasta que identifique la fuente del SRM.
2. Para experimentos respaldados por Datadog Feature Flags, revise el [{{< ui >}}Version history{{< /ui >}}][3] del Feature Flag para cambios en la división de tráfico o variantes, verifique si hay asignaciones mixtas y confirme que los eventos de exposición lleguen a Datadog a la misma tasa para cada variante.
3. Para experimentos nativos de almacén, compare la fracción de exposición esperada para cada variante en Datadog con las probabilidades de asignación ascendentes. Compare los conteos de asignación sin procesar por variante antes y después de que el Modelo SQL de Exposición aplique uniones, filtros, agregación y restricciones de marca de tiempo.
4. Verifique si el desequilibrio está localizado en segmentos o ventanas de tiempo específicos. Un SRM específico del segmento o del momento del lanzamiento puede ayudar a reducir la causa raíz.
5. Corrija la fuente del desequilibrio y luego vuelva a ejecutar el análisis del experimento.

## Asignaciones faltantes {#missing-assignments}

Si Datadog no tiene datos de asignación para un experimento, los resultados no se pueden calcular. Esto puede suceder cuando un Feature Flag no se está evaluando, el tráfico no llega a la regla de segmentación del experimento o un Modelo SQL de Exposición de almacén no devuelve filas en la ventana de análisis para los valores especificados de **ID de experimento** y **ID de variante**.

Para experimentos respaldados por Feature Flags de Datadog que utilizan métricas de almacén, Datadog puede registrar asignaciones antes de haber sincronizado esas exposiciones con la tabla `g_exposures` en su almacén. Los resultados de las métricas de almacén permanecen no disponibles hasta que se complete la sincronización.

### Cómo resolver {#how-to-resolve-1}

- Para experimentos respaldados por Datadog Feature Flags, confirme que el Feature Flag esté habilitado en el entorno correcto y que la aplicación esté evaluando el Feature Flag para los sujetos esperados. Revise el {{< ui >}}Real-time metric overview{{< /ui >}} del Feature Flag para eventos de exposición.
- Para experimentos nativos de almacén, verifique que el Modelo SQL de Exposición devuelva filas con los valores esperados de **Clave de sujeto**, **Marca de tiempo**, **ID de experimento** y **ID de variante**.
- Si el experimento se acaba de lanzar, espere a la siguiente ejecución de análisis o haga clic en {{< ui >}}Run an update now{{< /ui >}}.

## Asignaciones mixtas {#mixed-assignments}

Si el mismo sujeto está asignado a más de una variante en el mismo experimento, Datadog excluye a ese sujeto del análisis. Datadog calcula el porcentaje por separado para cada fuente de asignación, utilizando sujetos únicos de esa fuente como denominador. El diagnóstico se aprueba al 5% o menos, advierte por encima del 5% y por debajo del 20%, y falla al 20% o más. A medida que crece la proporción excluida, los resultados se vuelven menos representativos y menos confiables.

### Cómo resolver {#how-to-resolve-2}

- Para experimentos respaldados por Datadog Feature Flags, revise el [{{< ui >}}Version history{{< /ui >}}][3] del Feature Flag en busca de cambios inesperados después del lanzamiento, especialmente cambios en la regla de segmentación del experimento, la división de tráfico o las variantes.
- Para experimentos nativos de almacén, asegúrese de que la columna asignada a **ID de experimento** en el [Modelo SQL de exposición][2] identifique solo la exposición al experimento, como un experimento específico o una clave de asignación de flag, no la clave de flag más amplia.
- Si el [Modelo SQL de exposición][2] nativo de almacén lee intencionalmente registros de evaluación de flags, filtre las evaluaciones que no sean exposiciones al experimento. Por ejemplo, si el modelo captura todas las evaluaciones de un flag, una rampa de exposición puede registrar la experiencia de control pre-experimento de un sujeto antes de que sea elegible para el experimento, y luego registrar una exposición de tratamiento aleatorizada después de que se vuelva elegible. La evaluación del flag pre-experimento no es parte del experimento y no debe capturarse como una exposición.
- Para experimentos nativos de warehouse, realice una verificación de registros de variantes en conflicto en los datos de asignación.
- Corrija la fuente de las asignaciones en conflicto y luego vuelva a ejecutar el análisis.

## Desequilibrio de asignación dimensional {#dimensional-assignment-imbalance}

Datadog puede marcar un experimento cuando la probabilidad de ser asignado a una variante difiere significativamente entre los valores de dimensión. Por ejemplo, un tipo de dispositivo, país, plan o nivel de cliente podría recibir variantes en una división diferente a la del resto del experimento.

Para cada dimensión de asignación, Datadog ejecuta la prueba de chi-cuadrado de Pearson de independencia entre la variante y el valor de la dimensión. Para tener en cuenta la prueba de múltiples dimensiones, Datadog aplica una corrección de Bonferroni: una dimensión falla cuando su valor p está por debajo de `0.001 / n`, donde `n` es el número de dimensiones elegibles probadas. Datadog excluye un valor de dimensión cuando cualquier recuento de variantes esperado para ese valor es inferior a 5, omite dimensiones con más de 100 valores y requiere al menos dos valores de dimensión restantes y dos variantes con recuentos marginales positivos. Las dimensiones omitidas no contribuyen a `n`. Si ninguna dimensión es elegible, el diagnóstico se aprueba sin ejecutar una prueba dimensional.

Al igual que la verificación general de SRM, la prueba dimensional no es secuencialmente válida en ejecuciones de análisis repetidas. La corrección de Bonferroni controla las dimensiones probadas en una ejecución, no las verificaciones repetidas a medida que se acumulan los datos del experimento.

Este diagnóstico es independiente del desequilibrio de tráfico general o del desajuste de la relación de muestra (SRM): el desequilibrio global por sí solo no lo activa. Cuando ambos diagnósticos fallan, los valores de dimensión afectados pueden ayudar a localizar la causa del SRM general. Por ejemplo, el desequilibrio dimensional por tipo de dispositivo puede señalar un error específico del dispositivo en la entrega de variantes, la evaluación del SDK, las redirecciones, el rendimiento de la página, los bloqueos o la telemetría de exposición.

Datadog utiliza el valor de dimensión del primer registro de asignación del sujeto. Los cambios posteriores en el valor de dimensión del sujeto no deberían causar este diagnóstico.

### Cómo resolver {#how-to-resolve-3}

- Revise los valores de dimensión afectados y compárelos con el diagnóstico general de desequilibrio de tráfico.
- Investigue las diferencias específicas del segmento en la evaluación de Feature Flags, la entrega de variantes, el comportamiento de la aplicación y la telemetría de exposición.
- Para experimentos nativos de almacén, confirme que el modelo SQL de exposición asigne las columnas de propiedad de tiempo de asignación previstas y no filtre las exposiciones de manera diferente por segmento.
- Corrija la fuente del desequilibrio localizado y luego vuelva a ejecutar el análisis.

## Datos de métrica faltantes {#missing-metric-data}

Datadog informa **Datos de métrica faltantes** cuando existen asignaciones pero el análisis del experimento no encuentra valores de métrica utilizables. Para métricas simples y de proporción, al menos un valor contribuyente antes del manejo de valores anómalos debe ser distinto de cero. Si todos los valores contribuyentes son cero o nulos, el diagnóstico falla para una métrica primaria y advierte para una métrica secundaria o de protección. Para métricas de percentiles, cero es un resultado válido; solo los resultados nulos cuentan como faltantes. Si Datadog no puede determinar si una métrica es primaria, trata los datos faltantes como un error.

Este diagnóstico no significa necesariamente que el evento de origen nunca se haya activado. Los eventos pueden existir pero no cumplir con los filtros de la métrica, no unirse a las asignaciones del experimento o producir solo valores de métrica cero o nulos.

### Causas comunes {#common-causes-1}

- El nombre del evento, la agregación, los filtros o la fuente de datos de la definición de la métrica no coinciden con los datos que se están emitiendo.
- El evento de origen no se está activando, o se activa solo antes de la primera asignación del sujeto y, por lo tanto, se excluye de la atribución posterior a la asignación.
- Los eventos de métrica y las asignaciones de experimento identifican al mismo sujeto de manera diferente. Esta discrepancia en el identificador del sujeto es una causa común de datos de métrica faltantes:
  - Para métricas de Product Analytics o RUM en experimentos respaldados por Datadog Feature Flags, el [atributo de tipo de sujeto][4] configurado debe coincidir con el SDK `targetingKey`.
  - Para métricas de almacén, la columna de sujeto asignada en el [modelo SQL de métrica][5] debe contener los mismos valores que la columna de sujeto de asignación. Para experimentos respaldados por Datadog Feature Flags, esos valores deben coincidir con el SDK `targetingKey`. Para experimentos nativos de almacén, deben coincidir con la columna de sujeto de asignación configurada en el [modelo SQL de exposición][2].
- Un modelo SQL de métrica de almacén no devuelve filas coincidentes en la ventana de análisis o filtra los eventos esperados.

### Cómo resolver {#how-to-resolve-4}

1. Abra la métrica y confirme que el nombre del evento, la agregación, los filtros y la fuente de datos sean correctos. Verifique el gráfico de volumen de eventos de métrica para ver datos coincidentes recientes.
2. Compare el identificador de un sujeto asignado con el identificador en sus eventos de métrica. Confirme que el atributo de tipo de sujeto configurado o la columna de almacén asignada contenga el mismo valor que el SDK `targetingKey` o la columna de sujeto de asignación configurada en el modelo SQL de exposición.
3. Confirme que los eventos de métrica ocurran después de la primera asignación del sujeto y dentro de la ventana de análisis del experimento.
4. Para un experimento respaldado por Datadog Feature Flags, si la [integración de código fuente][6] está configurada, haga clic en [{{< ui >}}Ask Bits{{< /ui >}}][7] para un error de **Faltan datos de métricas** en la métrica principal. Bits puede inspeccionar las ubicaciones de fuente donde se evalúa el Feature Flags y ayudarle a verificar la instrumentación de métricas cercana. Una búsqueda de código vacía no es concluyente y no demuestra que falte el SDK o el Feature Flags en la aplicación.
5. Para métricas de almacén, ejecute el modelo SQL de métrica o consulte su tabla de origen directamente.
6. Corrija la definición de la métrica, la asignación de identidad, el tiempo del evento o el problema de instrumentación, luego vuelva a ejecutar el análisis del experimento.

## Métrica winsorizada a cero {#metric-winsorized-to-zero}

El manejo de valores anómalos limita los valores métricos extremos para reducir la varianza. Datadog advierte cuando el manejo de valores anómalos deja el resultado general de cada variante en cero o nulo, aunque al menos un valor sin procesar no fuera cero antes del manejo de valores anómalos. Para métricas de proporción, Datadog verifica el numerador y el denominador por separado. Este diagnóstico no tiene un porcentaje ni un umbral de muestra mínima y no hace que un experimento falle.

Esto puede suceder cuando solo una pequeña cantidad de sujetos realiza el evento de métrica y el manejo de valores anómalos limita todos los valores observados a cero. Por ejemplo, si una métrica tiene un límite superior de winsorización del percentil 99 y menos del 1% de los sujetos tiene un valor distinto de cero, el límite superior es cero. Cada valor distinto de cero se trata entonces como un valor anómalo y se limita a cero.

Para la winsorización de percentiles, Datadog puede calcular los límites utilizando todos los sujetos asignados o solo los valores distintos de cero. Excluir los ceros del cálculo puede evitar que los ceros estructurales establezcan un límite de cero para una métrica dispersa. Esta estrategia no elimina a los sujetos con valor cero del análisis; solo excluye los ceros al calcular los límites de percentiles, que Datadog luego aplica a cada sujeto.

### Cómo resolver {#how-to-resolve-5}

1. Abra la métrica.
2. Revise {{< ui >}}Outlier handling{{< /ui >}} en {{< ui >}}Experiment settings{{< /ui >}}. Para una métrica dispersa con winsorización de percentiles, calcule los límites solo a partir de valores distintos de cero.
3. Puede ser tentador resolver la advertencia cambiando el percentil de winsorización o desactivando el manejo de valores anómalos. Sin embargo, las métricas que activan este diagnóstico tienden a tener un bajo poder estadístico. Utilice la [calculadora de tamaño de muestra][8] para estimar la duración del experimento y el efecto mínimo detectable antes de confiar en la métrica para tomar una decisión.
4. Vuelva a ejecutar el análisis del experimento después de actualizar la métrica.

## Desequilibrio de la métrica previo al experimento {#pre-experiment-metric-imbalance}

Cuando CUPED está habilitado, Datadog utiliza los valores de la métrica previos al experimento para reducir la varianza. Antes de la exposición, el experimento debe comportarse como una prueba A/A: el tratamiento no puede afectar el comportamiento que ocurrió antes de la asignación. Un desequilibrio detectado puede ocurrir por casualidad, o su causa raíz puede indicar una selección correlacionada con el tratamiento, una fuga de datos o un problema de aleatorización. Esos problemas subyacentes pueden violar las suposiciones de CUPED o invalidar más que solo el ajuste de CUPED.

Datadog calcula secuencias de confianza de mezcla normal secuencial de dos lados para la diferencia entre el tratamiento y el control en las medias de los componentes previos al experimento. Las métricas simples prueban la media de la métrica; las métricas de proporción prueban las medias del numerador y del denominador de forma independiente; y las métricas de percentil prueban sus componentes internos S y N. Datadog comienza con un nivel de significancia familiar (alfa) de `0.05` y aplica una corrección de comparaciones múltiples en las verificaciones elegibles de métricas, variantes de tratamiento y componentes. El diagnóstico falla cuando una secuencia de confianza ajustada excluye estrictamente el cero; un intervalo que toca el cero pasa. Las secuencias de confianza siguen siendo válidas a medida que el análisis se repite sobre los datos acumulados. La prueba requiere observaciones con varianza positiva, pero no tiene un tamaño de muestra mínimo explícito.

### Causas comunes {#common-causes-2}

- Vinculación de identidad dependiente del tratamiento. Por ejemplo, un experimento aleatoriza identificadores anónimos pero analiza las compras a nivel de cuenta, y se crea una asignación de anónimo a cuenta solo después del inicio de sesión. Si el inicio de sesión posterior a la exposición incluye o vuelve a codificar retrospectivamente el historial de compras anterior, un tratamiento que aumenta el inicio de sesión puede hacer que aparezca más historial previo al experimento en el tratamiento.
- Truncamiento de marca de tiempo o granularidad de tiempo no coincidente. Por ejemplo, la exposición tiene una marca de tiempo de evento, pero los datos de la métrica se consolidan por día y se representan a la medianoche, lo que hace que los eventos posteriores a la exposición en ese día parezcan preceder a la exposición.
- Manejo inconsistente de la zona horaria o del horario de verano que almacena o compara un evento posterior con una marca de tiempo anterior.
- Una regla de asignación correlacionada con resultados previos al tratamiento o tratamientos anteriores. Por ejemplo, asignar variantes directamente desde rangos de identificadores o reutilizar el mismo mapeo de bucket en experimentos puede preservar una relación entre la asignación y la exposición a experimentos anteriores.
- Un problema de aleatorización, segmentación, identidad del sujeto o procesamiento de datos que hace que la disponibilidad de datos previos al experimento difiera entre las variantes.

### Cómo resolver {#how-to-resolve-6}

1. Confirme que los datos previos al experimento estén disponibles y sean representativos para cada variante, y verifique si la definición de la métrica cambió durante la ventana previa al experimento.
2. Compare las marcas de tiempo sin procesar de la asignación y de la métrica en su granularidad original y en una zona horaria consistente. Verifique si una consolidación diaria, una conversión de marca de tiempo o una transición de horario de verano pueden mover eventos posteriores a la exposición a la ventana previa al experimento.
3. Revise los mapeos de identidad del sujeto. Asegúrese de que el comportamiento posterior a la exposición, como iniciar sesión, no pueda determinar qué sujetos tienen historial previo al experimento disponible para su análisis.
4. Verifique que la asignación sea independiente de los resultados previos al tratamiento, los atributos del sujeto y los tratamientos anteriores. Para experimentos respaldados por Datadog Feature Flags, mantenga el SDK `targetingKey` estable; Datadog utiliza la flag key y `targetingKey` para mantener a un sujeto en el mismo rollout bucket. Para experimentos nativos de almacén de datos, utilice un método de asignación determinista que combine el identificador del sujeto con una sal o clave específica del experimento. Esto mantiene a un sujeto en la misma variante dentro de un experimento sin reutilizar el mismo patrón de asignación en todos los experimentos.
5. Corrija el problema de identidad, marca de tiempo, aleatorización o procesamiento de datos, luego vuelva a ejecutar el análisis. Deshabilitar CUPED no hace que el experimento sea válido cuando el desequilibrio proviene de un sesgo de selección, una fuga de datos posterior a la exposición o una aleatorización rota.

## Distribución previa inverosímil {#implausible-prior}

Para el análisis bayesiano, Datadog ejecuta una verificación previa predictiva de dos colas sobre el aumento relativo. La verificación tiene en cuenta tanto la dispersión de la distribución previa como la incertidumbre de muestreo de la estimación. Datadog advierte cuando, bajo la distribución predictiva previa, existe menos de un 1% de probabilidad de observar un aumento al menos tan extremo en cualquier dirección como el aumento estimado en el experimento. Datadog prueba cada comparación métrica-tratamiento elegible sin una corrección de pruebas múltiples. La verificación requiere un error estándar positivo y finito, pero no tiene un tamaño de muestra mínimo explícito. Una advertencia indica que el efecto observado es sorprendente bajo la distribución previa seleccionada.

Por ejemplo, muchos experimentos de tasa de conversión tienen aumentos reales inferiores al 5%, por lo que la distribución previa normal predeterminada con media 0 y desviación estándar 0.05 puede ser una opción razonable. Si un experimento corrige una página de pago rota que impide que la mayoría de los usuarios realicen conversiones, un aumento mucho mayor puede ser plausible. En ese caso, la distribución previa predeterminada puede ser demasiado conservadora y reducir demasiado el efecto estimado.

### Cómo resolver {#how-to-resolve-7}

- Compare el aumento estimado con los efectos históricos para la métrica y con el efecto que la intervención podría producir de manera plausible.
- Revise el plan de análisis estadístico del experimento y la configuración previa.
- Si el aumento estimado es plausible pero la configuración previa asigna muy poca probabilidad a efectos de ese tamaño, actualice la configuración previa para reflejar el conocimiento relevante del dominio y vuelva a ejecutar el análisis.

## Degradación a nivel de segmento {#segment-level-degradation}

Datadog advierte cuando la estimación puntual de un segmento es opuesta al cambio deseado de la métrica y el segmento tiene un rendimiento significativamente peor que los segmentos comparables. Para una métrica en la que es deseable un aumento, el aumento del segmento debe estar por debajo de cero. Para una métrica en la que es deseable una disminución, el aumento del segmento debe estar por encima de cero.

Para cada métrica, variante de tratamiento y dimensión, Datadog compara cada aumento de segmento con el promedio ponderado por la varianza inversa de los aumentos de segmento válidos en esa misma combinación. Un segmento advierte solo cuando una secuencia de confianza secuencial para su diferencia con respecto al promedio ponderado se encuentra completamente en la dirección peor y su estimación puntual es opuesta al cambio deseado.

Datadog aplica una corrección de Bonferroni dividiendo el nivel de significancia familiar (alfa) de `0.05` por el número de comparaciones de segmentos que pasan la validación inicial de estadísticas resumidas. Las comparaciones omitidas durante las comprobaciones posteriores permanecen en el denominador, lo que hace que el umbral sea más conservador. La verificación requiere al menos dos segmentos con varianza positiva para la misma métrica, variante de tratamiento y dimensión. La degradación a nivel de segmento produce una advertencia, no un diagnóstico fallido.

### Cómo resolverlo {#how-to-resolve-8}

- Revise los gráficos a nivel de segmento para las dimensiones afectadas, como país, plan, dispositivo o nivel de cliente.
- Verifique si el segmento afectado corresponde a un problema real del producto o de la instrumentación.
- Considere desviar el tráfico del segmento afectado fuera del experimento mientras investiga los segmentos de alto impacto.

## Error en la canalización de análisis {#analysis-pipeline-failure}

El análisis de experimentos puede utilizar datos de Product Analytics y RUM en Datadog o en el modo nativo del almacén. **Error en la canalización de análisis** se aplica solo a los experimentos que utilizan métricas. Datadog informa este diagnóstico cuando falla una consulta del almacén del cliente, por lo que no se pueden calcular los resultados actuales del almacén. Datadog no informa sobre fallas internas de Product Analytics o análisis de RUM con este diagnóstico.

El SQL que defina depende de cómo se aleatorice el experimento. Para experimentos respaldados por Datadog Feature Flags, Datadog sincroniza las asignaciones a la tabla `g_exposures` y usted define los modelos SQL de métricas. Para experimentos nativos de almacén, usted define tanto el modelo SQL de exposición como los modelos SQL de métricas. Datadog genera el SQL del pipeline restante.

### Cómo resolver {#how-to-resolve-9}

1. Haga clic en [{{< ui >}}Ask Bits{{< /ui >}}][7] en el diagnóstico fallido. Bits revisa el error del pipeline, las consultas de almacén fallidas y cualquier modelo SQL configurado para el experimento. Identifica la causa más probable y sugiere una solución específica.
2. Para un experimento respaldado por Datadog Feature Flags, confirme que las exposiciones se hayan sincronizado con `g_exposures`, luego revise la consulta fallida, los modelos SQL de métricas, la conexión y los permisos del almacén, y la disponibilidad de la tabla fuente.
3. Para un experimento nativo de almacén, revise la consulta fallida, el modelo SQL de exposición, los modelos SQL de métricas, la conexión y los permisos del almacén, y la disponibilidad de la tabla fuente.
4. Aplique la corrección y luego vuelva a ejecutar el análisis del experimento.
5. Si la misma falla persiste, comuníquese con [soporte de Datadog][9] con la URL del experimento y los detalles de la falla.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/experiments/plan_and_launch_experiments/#schedule-a-staged-rollout
[2]: /es/experiments/concepts/exposure_sql/
[3]: /es/feature_flags/concepts/flag_history/#individual-flag-history
[4]: /es/experiments/concepts/subject_types/#product-analytics-and-rum-metrics
[5]: /es/experiments/concepts/subject_types/#warehouse-metrics
[6]: /es/source_code/
[7]: /es/bits_ai/bits_chat/usage/#web-application
[8]: /es/experiments/plan_and_launch_experiments/#run-a-sample-size-calculation-optional
[9]: /es/help/