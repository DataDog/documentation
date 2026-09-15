---
description: Planifique, ejecute y analice experimentos aleatorios en toda su pila
  con Datadog Experiments.
further_reading:
- link: /feature_flags/
  tag: Documentación
  text: Feature Flags
- link: /product_analytics/
  tag: Documentación
  text: Product Analytics
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: Guía
  text: Configure el enriquecimiento de trazas de APM para Feature Flags
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: Blog
  text: La brecha de latencia de la señal del producto que ralentiza su crecimiento
- link: https://www.datadoghq.com/blog/ab-testing/
  tag: Blog
  text: Todos los equipos deberían realizar pruebas A/B
- link: https://www.datadoghq.com/blog/experiments
  tag: Blog
  text: Mida el impacto comercial de cada cambio de producto con Datadog Experiments
title: Experimentos
---
## Resumen {#overview}

Datadog Experiments es una plataforma componible para la experimentación de extremo a extremo. Un experimento en Datadog consta de dos componentes:

1. Una **asignación aleatoria** de [sujetos][18] (normalmente usuarios) a dos o más variaciones, ya sea desde un [Datadog Feature Flag][1] o desde su sistema de aleatorización preferido
2. Un conjunto de **métricas** para comparar entre variantes, calculadas dentro de Datadog o con análisis nativos de almacén de datos.

Para comenzar, seleccione un enlace de la tabla a continuación. De lo contrario, siga leyendo para obtener más información sobre Datadog Experiments.

| Enlaces rápidos | |
| :---- | :---- |
| [Conecte un almacén de datos][13] | Configure Snowflake, BigQuery, Redshift o Databricks para el análisis de experimentos nativo del almacén |
| [Cree una métrica nativa del almacén][14] | Defina Metric SQL Models y métricas de experimentos a partir de datos del almacén |
| [Cree una métrica a partir de datos de Product Analytics o Real User Monitoring][15] | Cree métricas de experimentos a partir de eventos de RUM del lado del cliente y Product Analytics |
| [Lance un experimento usando Datadog Feature Flags][16] | Planifique su hipótesis, configure la aleatorización con Datadog Feature Flags e inicie su experimento |
| [Estandarice experimentos con protocolos][21] | Defina valores predeterminados reutilizables para métricas, aleatorización, duración y análisis estadístico |
| [Analice un experimento que ya ha sido aleatorizado][17] | Defina datos de exposición en su almacén cuando la aleatorización se ejecute fuera de Datadog Feature Flags |
| [Comprenda los diagnósticos de experimentos][20] | Interprete las verificaciones automatizadas para exposiciones, métricas, aleatorización y estado del análisis |

## Aleatorización {#randomization}

Cada experimento necesita una forma de asignar sujetos a una variante de control o de tratamiento. Datadog admite dos enfoques.

### Datadog Feature Flags {#datadog-feature-flags}

[Datadog Feature Flags][1] es la forma predeterminada de aleatorizar experimentos. Cree un Feature Flag, impleméntelo con el [Feature Flags SDK][9] y pase un identificador de sujeto estable como `targetingKey` para que el mismo usuario siempre reciba la misma variante. Datadog utiliza hashing determinista para mantener las asignaciones consistentes entre sesiones y dispositivos.

Cuando [planifique y lance un experimento][16], vincúlelo a un Feature Flag para definir divisiones de tráfico, reglas de segmentación y comportamiento de despliegue. También puede crear un experimento directamente desde la página de detalles de un Feature Flag. Para aleatorizar por una unidad distinta al usuario (por ejemplo, una organización), consulte [Tipos de sujeto][18].

### Traiga su propia aleatorización {#bring-your-own-randomization}

Si aleatoriza sujetos fuera de Datadog (por ejemplo, con un sistema interno), utilice [Exposure SQL Models][17] para indicar a Datadog quién estuvo expuesto a cada experimento y cuándo. Los Exposure SQL Models consultan registros de exposición de su [almacén conectado][13] y los asignan a campos de Datadog como clave de sujeto, marca de tiempo, ID de experimento e ID de variante.

Datadog deduplica los datos de exposición automáticamente: si un usuario aparece en múltiples variantes para el mismo experimento, ese usuario se excluye del análisis. Cuando las exposiciones provienen de su almacén en lugar de Datadog Feature Flags, las métricas creadas a partir de eventos del SDK de Datadog no son compatibles; necesita [métricas nativas de almacén][14].

## Métricas {#metrics}

Las métricas de experimento definen lo que usted mide para decidir si un cambio tuvo éxito. Cree al menos una métrica principal antes de lanzar un experimento y agregue métricas secundarias como salvaguardas para efectos no deseados en el rendimiento, la participación o los ingresos.

### Modo nativo de almacén {#warehouse-native-mode}

En el modo nativo de almacén, Datadog ejecuta el análisis de experimentos directamente en Snowflake, BigQuery, Redshift o Databricks. Después de [conectar su almacén][13], cree un **Metric SQL Model** que asigne tablas de almacén a Datadog, luego defina métricas a partir de ese modelo. Asigne cada modelo a uno o más [tipos de sujeto][18] y especifique una columna de marca de tiempo para que Datadog pueda unir eventos de métricas con exposiciones de experimentos.

El modo de almacén es necesario cuando utiliza [Exposure SQL Models][17] para la aleatorización. También es adecuado para equipos cuya fuente de información para las métricas de negocio ya reside en el almacén.

### Product Analytics y RUM {#product-analytics-and-rum}

Para experimentos del lado del cliente, cree métricas a partir de eventos recopilados por los SDK de [Real User Monitoring (RUM)][2] y [Product Analytics][3]. Defina métricas a partir de acciones, visualizaciones, sesiones y otros tipos de eventos, luego elija un método de agregación como recuento de eventos, recuento de usuarios únicos o suma de una propiedad.

Esta ruta funciona cuando la aleatorización se ejecuta a través de [Datadog Feature Flags][1] y desea medir el comportamiento de los usuarios, la conversión del embudo o el rendimiento de la aplicación sin consultar un almacén. Las métricas de Product Analytics y RUM están disponibles casi en tiempo real a medida que se lanzan los experimentos.

## Estadísticas {#statistics}

Datadog aplica análisis estadístico para comparar variantes y estimar el incremento. Cuando configure un experimento, elija un [método de análisis][11] (frecuentista secuencial, frecuentista de muestra fija o bayesiano) y, opcionalmente, ejecute un [cálculo de tamaño de muestra][8] para estimar cuánto tiempo debe ejecutarse el experimento. Una vez obtenidos los resultados, utilice [Global Lift][19] para comprender cómo se traduce un incremento de experimento dirigido en un impacto en el total de métricas de toda su empresa, y [Cumulative Impact][12] para agregar efectos ajustados por ruido en muchos experimentos sobre la misma métrica.

{{< img src="/product_analytics/experiment/overview_metrics_view-1.png" alt="La visualización de métricas de Experimentos que muestra métricas de negocio, de embudo y de rendimiento con valores de control y variante, además del incremento relativo para cada métrica. Se muestra un tooltip en la métrica Revenue que presenta los valores Non-CUPED para Revenue per User, Total Revenue y User Assignment Count en los grupos de control y variante." style="width:90%;" >}}

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/
[2]: /es/real_user_monitoring/
[3]: /es/product_analytics/#getting-started
[4]: /es/experiments/defining_metrics
[5]: /es/experiments/plan_and_launch_experiments
[6]: /es/getting_started/feature_flags/#create-your-first-feature-flag
[7]: /es/experiments/plan_and_launch_experiments#step-3---launch-your-experiment
[8]: /es/experiments/plan_and_launch_experiments/#run-a-sample-size-calculation-optional
[9]: /es/getting_started/feature_flags/#feature-flags-sdks
[10]: /es/experiments/guide/
[11]: /es/experiments/statistics/analysis_methods
[12]: /es/experiments/concepts/cumulative_impact
[13]: /es/experiments/guide/connecting_a_data_warehouse/
[14]: /es/experiments/defining_metrics/?tab=warehouse
[15]: /es/experiments/defining_metrics/?tab=productanalyticsorum
[16]: /es/experiments/plan_and_launch_experiments/
[17]: /es/experiments/concepts/exposure_sql/
[18]: /es/experiments/concepts/subject_types/
[19]: /es/experiments/statistics/global_lift
[20]: /es/experiments/diagnostics/
[21]: /es/experiments/protocols/