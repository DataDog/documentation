---
algolia:
  tags:
  - custom metrics billing
  - metric name pricing
further_reading:
- link: /account_management/billing/custom_metrics/
  tag: Documentación
  text: Facturación de Custom Metrics (precios por cardinalidad)
- link: /metrics/custom_metrics/
  tag: Documentación
  text: Más información sobre Custom Metrics
- link: /metrics/metrics-without-limits/
  tag: Documentación
  text: Metrics without Limits™
- link: /metrics/guide/custom_metrics_governance/
  tag: Guía
  text: Prácticas recomendadas para la gobernanza de Custom Metrics
- link: https://www.datadoghq.com/blog/infinite-cardinality-metrics/
  tag: Blog
  text: 'Métricas de cardinalidad infinita: Custom Metrics creadas para sistemas modernos'
title: Precios por nombre de métrica para Custom Metrics
---
## Descripción general {#overview}

Los precios por nombre de métrica facturan las Custom Metrics según la cantidad de nombres de métricas únicos que envíe y el volumen de puntos de datos que produzcan esos nombres. Reemplaza el modelo de [Facturación de Custom Metrics][1] basado en cardinalidad para las organizaciones que deciden participar.

**Nota**: Esta página se aplica si su contrato utiliza SKUs de precios de nombres de métricas. Estas SKUs son mutuamente excluyentes con las SKUs de precios de series temporales (cardinalidad). Si su contrato utiliza precios de series temporales en su lugar, consulte [Facturación de Custom Metrics][1].

Datadog distingue los puntos de datos ingeridos de los puntos de datos indexados. Los puntos de datos **ingeridos** son todos los puntos de datos de métricas que envían sus servicios. Los puntos de datos **indexados** son los puntos que permanecen consultables. De forma predeterminada, cada punto de datos ingerido también se indexa. [Metrics without Limits™][4] opcionalmente reduce su volumen indexado al excluir las etiquetas que no necesita, por lo que solo se le factura por los puntos de datos que permanecen consultables. El volumen indexado siempre es menor o igual que el volumen ingerido.

## SKUs {#skus}

Los precios por nombre de métrica introducen tres SKUs:

| SKU             | Qué factura                                                                      |
|-----------------|------------------------------------------------------------------------------------|
| Metric Name     | Cada nombre de métrica único enviado en un mes con más de 100 puntos de datos indexados |
| Puntos indexados  | Puntos de datos indexados por encima de la línea base de 10 M por nombre de métrica                          |
| Puntos ingeridos | Puntos de datos ingeridos por encima de 5 veces su volumen indexado                                   |

Estos SKUs son mutuamente incompatibles con los SKUs de precios de series temporales (cardinalidad).

## Estructura de precios {#pricing-structure}

Tanto los nombres de las métricas como los puntos de datos indexados tienen un precio con descuentos marginales basados en el volumen en 5 niveles. Los niveles de mayor volumen tienen tarifas por unidad más bajas. A medida que aumenta su uso, la parte que cruza a cada nivel superior se factura a la tarifa de ese nivel. El uso facturado anteriormente nunca se vuelve a calcular.

{{< img src="account_management/billing/metric_name_pricing/marginal-pricing-tiers.png" alt="Diagrama que ilustra cómo funciona la fijación de precios marginal, simplificado a cinco niveles de volumen. Cada nivel tiene una tarifa por unidad, visualizada como la altura de una barra; los niveles de mayor volumen (lado derecho) tienen barras progresivamente más cortas, lo que indica tarifas por unidad más bajas que los niveles de menor volumen (lado izquierdo)." style="width:100%;" >}}

Las tarifas por unidad varían según el tipo de contrato:

| Tipo de contrato   | Tarifa en relación con la línea base anual |
|-----------------|----------------------------------|
| Anual          | Línea base                         |
| Mes a mes  | +20%                             |
| Bajo demanda       | +40%                             |

Las tarifas específicas y los límites de los niveles se definen en su contrato. Comuníquese con [Sales][2] o con su [Customer Success][3] Manager para obtener más detalles.

## Uso mensual y por hora {#monthly-and-hourly-usage}

El uso de precios por nombre de métrica se rastrea por hora y se factura, ya sea por hora o mensualmente, según su contrato. Cada nombre de métrica único se cuenta una vez al mes, en la hora en que se envían por primera vez puntos de datos indexados. Cada nombre de métrica facturado incluye 10 millones de puntos de datos indexados. Los puntos de datos que exceden esa asignación se acumulan en un único depósito de excedentes mensual en todas sus métricas.

Al final del período de facturación, la factura mensual total es la suma de:

- El cargo por niveles de nombres de métrica para los nombres de métrica únicos del mes
- El cargo por niveles de puntos de datos indexados para los puntos de datos excedentes del mes

Los contadores mensuales se restablecen para el siguiente ciclo de facturación.

La facturación por hora produce el mismo total que la facturación mensual. El procesamiento por hora afecta cuándo se cruzan los límites de los niveles, no el cargo final.

### Ejemplo {#example}

Suponga que, durante un solo mes, su uso por hora se ve así:

| Hora | Nuevos nombres de métrica esta hora | Nombres de métrica acumulados | Nuevos puntos de datos excedentes esta hora | Puntos de datos excedentes acumulados |
|------|----------------------------|-------------------------|-----------------------------------|--------------------------------|
| 1-5  | +6                         | 6                       | +18M                              | 18M                            |
| 6    | +100                       | 106                     | +5M                               | 23M                            |
| 7    | +150                       | 256                     | +10M                              | 33M                            |
| 8    | +200                       | 456                     | +15M                              | 48M                            |
| 9    | +100                       | 556                     | +10M                              | 58M                            |

Al final del mes:

- Los 556 nombres de métrica se facturan según los niveles marginales en los que se encuentren.
- Los 58 millones de puntos de datos de excedente se facturan según los niveles marginales en los que se encuentren.

## Comportamiento de ingesta {#ingestion-behavior}

Bajo los precios por nombre de métrica, cada punto de datos que sus servicios envían a Datadog se cuenta como ingesta, independientemente de la configuración de [Metrics without Limits™][4]. De forma predeterminada, todos los puntos de datos ingeridos se indexan. Configurar Metrics without Limits™ reduce su volumen indexado.

Su asignación de ingesta gratuita cubre los puntos de datos ingeridos hasta cinco veces su volumen indexado. Se le cobra por los puntos de datos ingeridos solo por encima de ese umbral en un mes determinado.

{{< img src="account_management/billing/metric_name_pricing/ingestion-billing.png" alt="Diagrama que ilustra la relación de facturación de ingesta bajo los precios por nombre de métrica. El volumen ingerido se divide en una zona de ingesta gratuita (hasta cinco veces el volumen indexado) y una zona de excedente facturable por encima de ese umbral. El volumen indexado se sitúa debajo como una medición independiente equivalente a un segmento de la zona de ingesta gratuita." style="width:100%;" >}}

**Nota**: Este es un cambio respecto al modelo basado en cardinalidad, en el que solo las métricas configuradas con Metrics without Limits™ contribuyen al volumen ingerido.

### Métricas de distribución {#distribution-metrics}

Para [Métricas de distribución][5], se aplica un multiplicador tanto a los puntos de datos ingeridos como a los indexados, independientemente de si la métrica está configurada con Metrics without Limits™. El multiplicador es **cinco veces** de forma predeterminada (uno por cada una de las agregaciones de recuento, suma, mínimo, máximo y promedio que genera Datadog). Cuando las agregaciones de percentiles (p50, p75, p90, p95, p99) están habilitadas, el multiplicador es **diez veces**.

- Para las métricas de distribución no configuradas, los volúmenes ingeridos e indexados son iguales después de aplicar el multiplicador.
- Para las métricas de distribución configuradas, el multiplicador se aplica al volumen ingerido, mientras que el volumen indexado puede ser menor dependiendo de la configuración de etiqueta y las reglas de indexación.

#### Ejemplo {#example-1}

Una métrica de distribución que envía 100 puntos de datos con agregaciones predeterminadas se factura como 500 puntos de datos (100 × 5). Con las agregaciones de percentiles habilitadas, los mismos envíos se facturan como 1 000 puntos de datos (100 × 10).

## Ingesta de métricas históricas {#historical-metric-ingestion}

El uso de [Ingesta de métricas históricas][6] se calcula en función del tiempo de ingesta, no de la marca de tiempo original de la métrica. Cada punto de datos de HMI contribuye tanto al volumen ingerido como al indexado.

{{< img src="account_management/billing/metric_name_pricing/ingestion-billing-hmi.png" alt="Diagrama que ilustra la facturación de HMI bajo los precios por nombre de métrica. La barra de volumen ingerido y la barra de volumen indexado tienen el mismo ancho, unidas por una anotación de relación 1:1. Para las métricas de HMI, el volumen ingerido siempre es igual al volumen indexado." style="width:100%;" >}}

## Adopción comprometida {#committed-adoption}

Usted puede comprometerse a un volumen de uso de forma independiente para los nombres de métrica y para los puntos de datos. Cada compromiso tiene un precio según el nivel de precios marginal en el que cae el volumen comprometido. El volumen total comprometido se factura a la tarifa de ese nivel, y el descuento marginal no se aplica dentro del rango comprometido. El uso por encima de la cantidad comprometida sigue el horario marginal, comenzando en el límite del nivel inmediatamente superior al volumen comprometido.

Por ejemplo, si usted se compromete a 15,000 nombres de métricas que caen dentro del Nivel 3, los 15,000 se facturan a la tarifa del Nivel 3. Si su uso real alcanza los 150,000 nombres de métricas, los 135,000 adicionales siguen el horario marginal desde el Nivel 3 hasta el Nivel 4.

## Atribución de uso {#usage-attribution}

Para la fase inicial de la fijación de precios por Nombre de métrica, la [Atribución de uso][7] es compatible con los puntos de datos indexados. El costo de los nombres de métricas se atribuye en proporción a la parte de cada etiqueta en el total de puntos de datos. A un grupo definido por etiquetas que contribuye con el 20% de los puntos de datos se le atribuye el 20% del costo de los nombres de métricas.

La Atribución de uso para la ingesta no es compatible en la fase inicial.

## Custom Metrics y métricas estándar {#custom-and-standard-metrics}

La fijación de precios por Nombre de métrica utiliza la misma definición de Custom Metrics y métricas estándar que la fijación de precios por cardinalidad. Para obtener información sobre lo que se considera una métrica personalizada, consulte [Custom Metrics][8].

## Solución de problemas {#troubleshooting}

Para preguntas técnicas, comuníquese con el [soporte de Datadog][9].

Para preguntas sobre facturación, comuníquese con su gerente de [Customer Success][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/billing/custom_metrics/
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: /es/metrics/metrics-without-limits/
[5]: /es/metrics/types/?tab=distribution#metric-types
[6]: /es/metrics/custom_metrics/historical_metrics/
[7]: /es/account_management/billing/usage_attribution/
[8]: /es/metrics/custom_metrics/
[9]: /es/help/