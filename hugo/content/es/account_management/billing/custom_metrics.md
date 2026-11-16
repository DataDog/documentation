---
algolia:
  tags:
  - custom metrics billing
aliases:
- /es/integrations/faq/what-standard-integrations-emit-custom-metrics/
further_reading:
- link: /account_management/billing/metric_name_pricing/
  tag: Documentación
  text: Precios por nombre de métrica para Custom Metrics
- link: /metrics/custom_metrics/
  tag: Documentación
  text: Más información sobre Custom Metrics
- link: /metrics/guide/custom_metrics_governance/
  tag: Guía
  text: Prácticas recomendadas para la gobernanza de Custom Metrics
title: Facturación de Custom Metrics
---
## Descripción general {#overview}

**Nota**: Esta página describe el modelo de facturación de Custom Metrics basado en la cardinalidad. Si su contrato utiliza SKU de precios de Metric Name, consulte [Precios de Metric Name para Custom Metrics][15] en su lugar.

Si una métrica no se envía desde una de las [más de {{< translate key="integration_count" >}} integraciones de Datadog][1], se considera una [métrica personalizada][2]. Ciertas integraciones estándar también pueden emitir métricas personalizadas. Para obtener más información, consulte [métricas personalizadas e integraciones estándar][14].

**Una métrica personalizada se identifica de forma única mediante una combinación de un nombre de métrica y valores de etiqueta (incluida la etiqueta de servidor)**. En general, cualquier métrica que envíe mediante [DogStatsD][3] o a través de una [comprobación personalizada del Agent][4] es una métrica personalizada.

Su uso mensual facturable de métricas personalizadas (reflejado en la página Usage) se calcula tomando el total de todas las métricas personalizadas distintas (también conocidas como series temporales) para cada hora en un mes determinado y dividiéndolo por la cantidad de horas en el mes para calcular un valor promedio mensual. Su uso facturable no se ve afectado por la frecuencia de envío de puntos de datos ni por la cantidad de consultas que ejecute sobre sus métricas.

Los usuarios de Metrics without Limits™ ven los volúmenes mensuales facturables de métricas personalizadas _ingeridas_ e _indexadas_ en su página de Usage. Obtenga más información sobre las métricas personalizadas ingeridas e indexadas y [Metrics without Limits™][5]. 

## Recuento de métricas personalizadas {#counting-custom-metrics}

La cantidad de métricas personalizadas asociadas con un nombre de métrica en particular depende de su [tipo de envío][6] de métrica. A continuación, se muestran ejemplos de cómo contar sus métricas personalizadas según el siguiente escenario:

Suponga que está enviando una métrica, `request.Latency`, desde dos servidores (`host:A`,`host:B`), la cual mide la latencia de las solicitudes de su punto de conexión. Está enviando esta métrica con dos claves de etiqueta:

- `endpoint`, que tiene el valor `endpoint:X` o `endpoint:Y`.
- `status`, que tiene el valor `status:200` o `status:400`.

Suponga que, en sus datos, `endpoint:X` es compatible con ambos servidores, pero solo falla en `host:B`. También asuma que las solicitudes a `endpoint:Y` siempre son exitosas y solo aparecen en `host:B`, como se muestra a continuación:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latencia de solicitud" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate"%}}

El número de métricas personalizadas de [COUNT][1] y [RATE][2] se calcula con la misma lógica.

El número de combinaciones únicas de valores de etiqueta enviadas para una métrica RATE con este esquema de etiquetado es **cuatro**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Esto hace que `request.Latency` reporte **cuatro métricas personalizadas**. 

### Efecto de agregar etiquetas {#effect-of-adding-tags}

Agregar etiquetas **no necesariamente** genera más métricas personalizadas. Su cantidad de métricas personalizadas generalmente depende de la etiqueta más granular o detallada. Suponga que está midiendo la temperatura en los EE. UU. y ha etiquetado su métrica `temperature` por país y región. Usted envía lo siguiente a Datadog:

| Metric Name   | Valores de etiqueta                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suponga que desea agregar la etiqueta `city` que tiene tres valores: `NYC`, `Miami` y `Orlando`. Agregar esta etiqueta aumenta el número de métricas personalizadas, ya que aporta más detalle y granularidad a su conjunto de datos, como se muestra a continuación:

| Metric Name   | Valores de etiqueta                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

La cantidad de métricas personalizadas que reporta `temperature` depende de la etiqueta más granular, `city`.

Suponga que también desea etiquetar su métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). Esto significa que está etiquetando la temperatura mediante las etiquetas: `country`, `region`, `state` y `city`. Agregar la etiqueta de estado no aumenta el nivel de granularidad que la etiqueta de ciudad ya aporta a su conjunto de datos.

Para obtener la temperatura en Florida, puede recombinar las métricas personalizadas de:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Reordenar los valores de las etiquetas no aporta unicidad. Las siguientes combinaciones corresponden a la misma métrica personalizada:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configure etiquetas con Metrics without Limits™ {#configure-tags-with-metrics-without-limits}

Los volúmenes de métricas personalizadas pueden verse afectados al configurar etiquetas mediante [Metrics without Limits™][3]. Metrics without Limits™ desacopla los costos de ingesta de los costos de indexación, por lo que puede seguir enviando a Datadog todos sus datos (todo se ingiere) y puede especificar una lista de permitidos de etiquetas que desea que permanezcan consultables en la plataforma de Datadog. Dado que el volumen de datos que Datadog ingiere para sus métricas configuradas ahora difiere del menor volumen restante que ha indexado, verá dos volúmenes distintos tanto en la página Usage como en la página Metrics Catalog. 
 
- **Métricas personalizadas ingeridas**: El volumen original de métricas personalizadas basado en todas las etiquetas ingeridas (enviadas mediante código)
- **Métricas personalizadas indexadas**: El volumen de métricas personalizadas que sigue pudiéndose consultar en la plataforma de Datadog (según las configuraciones de Metrics without Limits™) 

**Nota: Solo las métricas configuradas contribuyen al volumen de métricas personalizadas ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se le cobra por su volumen de métricas personalizadas indexadas.

#### ¿Cuándo se le cobra por las métricas personalizadas ingeridas y cuándo por las indexadas? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics}
Para las métricas no configuradas con Metrics without Limits™, usted paga por las métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(según el promedio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas indexadas por servidor <br>- Enterprise: 200 métricas personalizadas indexadas por servidor                             |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, usted paga el monto especificado en su contrato actual. |

Para las métricas configuradas con Metrics without Limits™ (las etiquetas están configuradas), usted paga por las métricas personalizadas ingeridas y las métricas personalizadas indexadas.

|                                      | Métricas personalizadas ingeridas                                                                           | Métricas personalizadas indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 métricas personalizadas ingeridas por servidor<br>- Enterprise: 200 métricas personalizadas ingeridas por servidor | - Pro: 100 métricas personalizadas indexadas por servidor<br>- Enterprise: 200 métricas personalizadas indexadas por servidor                               |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de la cuenta, usted paga $0.10.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, usted paga un monto que se especifica en su contrato actual. |

Suponga que desea utilizar Metrics without Limits™ para reducir el tamaño de su métrica `request.Latency` manteniendo solo las etiquetas `endpoint` y `status`. Esto resulta en las siguientes tres combinaciones de etiquetas únicas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Como resultado de la configuración de etiquetas, `request.Latency` reporta un total de **3 métricas personalizadas indexadas**. Según las etiquetas originales enviadas en esta métrica, el volumen original de métricas personalizadas **ingeridas** de `request.Latency` es de **4 métricas personalizadas ingeridas**.

Obtenga más información sobre [Metrics without Limits™][3].

[1]: /es/metrics/types/?tab=count#metric-types
[2]: /es/metrics/types/?tab=rate#metric-types
[3]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Gauge" %}}
El número de combinaciones de valores de etiqueta únicas enviadas para una métrica GAUGE con este esquema de etiquetado es **cuatro**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Como resultado, `request.Latency` reporta **cuatro métricas personalizadas**. 

### Efecto de agregar etiquetas {#effect-of-adding-tags-1}

Agregar etiquetas **puede no** resultar en más métricas personalizadas. Su cantidad de métricas personalizadas generalmente varía según la etiqueta más granular o detallada. Suponga que está midiendo la temperatura en los EE. UU. y ha etiquetado su métrica `temperature` por país y región. Usted envía lo siguiente a Datadog:

| Nombre de la métrica   | Valores de etiqueta                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suponga que desea agregar la etiqueta `city` que tiene tres valores: `NYC`, `Miami` y `Orlando`. Agregar esta etiqueta aumenta el número de métricas personalizadas, ya que proporciona más detalle y granularidad a su conjunto de datos, como se muestra a continuación:

| Nombre de la métrica   | Valores de etiqueta                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

La cantidad de métricas personalizadas que se generan a partir de `temperature` varía según la etiqueta más granular, `city`.

Suponga que también desea etiquetar su métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). Esto significa que está etiquetando la temperatura por `country`, `region`, `state` y `city`. Agregar la etiqueta de estado no aumenta el nivel de granularidad que la etiqueta de ciudad ya aporta a su conjunto de datos.

Para obtener la temperatura en Florida, puede recombinar las métricas personalizadas de:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Reordenar los valores de las etiquetas no genera una métrica distinta. Las siguientes combinaciones corresponden a la misma métrica personalizada:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configure etiquetas con Metrics without Limits™ {#configure-tags-with-metrics-without-limits-1}

El volumen de métricas personalizadas puede verse afectado por la configuración de etiquetas mediante [Metrics without Limits™][4]. Metrics without Limits™ desacopla los costos de ingesta de los costos de indexación, por lo que puede seguir enviando a Datadog todos sus datos (se ingieren todos) y especificar una lista de etiquetas permitidas que desea que sigan estando disponibles para consultas en la plataforma de Datadog. Dado que el volumen de datos que Datadog ingiere para sus métricas configuradas ahora difiere del volumen menor restante que ha indexado, verá dos volúmenes distintos en la página Usage y en la página Metrics Catalog. 
 
- **Ingested custom metrics**: El volumen original de métricas personalizadas basado en todas las etiquetas ingeridas (enviadas a través de código)
- **Indexed custom metrics**: El volumen de métricas personalizadas que permanece consultable en la plataforma Datadog (basado en cualquier configuración de Metrics without Limits™) 

**Nota: Solo las métricas configuradas contribuyen a su volumen de Ingested custom metrics.** Si una métrica no está configurada con Metrics without Limits™, solo se le cobra por su volumen de métricas personalizadas indexadas.

#### ¿Cuándo se le cobra por las métricas personalizadas ingeridas frente a las indexadas? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-1}
Para las métricas no configuradas con Metrics without Limits™, usted paga por las métricas personalizadas indexadas.

|                                      | Indexed custom metrics<br>(basado en el número promedio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 métricas personalizadas indexadas por servidor <br>- Enterprise: 200 métricas personalizadas indexadas por servidor                             |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, usted paga un monto que se especifica en su contrato actual. |

Para las métricas configuradas con Metrics without Limits™ (las etiquetas están configuradas), usted paga por las métricas personalizadas ingeridas y las métricas personalizadas indexadas.

|                                      | Ingested custom metrics                                                                           | Indexed custom metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 métricas personalizadas ingeridas por servidor<br>- Enterprise: 200 métricas personalizadas ingeridas por servidor | - Pro: 100 métricas personalizadas indexadas por servidor<br>- Enterprise: 200 métricas personalizadas indexadas por servidor                               |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de la cuenta, usted paga $0.10.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, usted paga un monto que se especifica en su contrato actual. |

De forma predeterminada, se pueden usar las siguientes agregaciones para realizar consultas:
- group by `SUM` & rollup by `AVG`
- group by `MAX` & rollup by `AVG`
- group by `MIN` & rollup by `AVG`
- group by `AVG` & rollup by `SUM`
- group by `SUM` & rollup by `SUM`
- group by `MAX` & rollup by `MAX`
- group by `MIN` & rollup by `MIN`
- group by `SUM` & rollup by `COUNT`

Su número de métricas personalizadas indexadas **no escala** con el número de agregaciones habilitadas.

Obtenga más información sobre [Metrics without Limits™][1].

[1]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histogram" %}}

**Una métrica HISTOGRAM genera de forma predeterminada cinco métricas personalizadas para cada combinación única de nombre de métrica y valores de etiqueta** para admitir las agregaciones del lado del Agent `max`, `median`, `avg`, `95pc` y `count`. [Obtenga más información sobre el tipo de métrica HISTOGRAM][1].

El número de combinaciones únicas de valores de etiqueta enviadas para una métrica HISTOGRAM con este esquema de etiquetado es **cuatro**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

De forma predeterminada, el Agent genera cinco Custom Metrics para cada una de las cuatro combinaciones únicas de valores de etiqueta originales para contabilizar [cada una de las agregaciones habilitadas en el Agent][2]: `avg`, `count`, `median`, `95percentile` y `max`. En consecuencia, `request.Latency` informa un total de **4\*5 = 20 Custom Metrics**.

**Nota**: Agregar agregaciones a sus métricas HISTOGRAM aumenta el número de Custom Metrics distintas informadas. Eliminar agregaciones disminuye el número de Custom Metrics informadas.

- Configure qué agregación desea enviar a Datadog con el parámetro `histogram_aggregates` en su [archivo de configuración datadog.yaml][3]. De forma predeterminada, solo se envían a Datadog las agregaciones `max`, `median`, `avg` y `count`. `sum` y `min` también están disponibles si lo desea.
- Configure qué agregación de percentil desea enviar a Datadog con el parámetro `histogram_percentiles` en su [archivo de configuración datadog.yaml][3]. De forma predeterminada, solo se envía a Datadog el `95percentile`, percentil 95.


[1]: /es/metrics/types/?tab=histogram#metric-types
[2]: /es/metrics/types/?tab=histogram#definition
[3]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribución" %}}

**Una métrica DISTRIBUTION genera de forma predeterminada cinco Custom Metrics para cada combinación única de nombre de métrica y valores de etiqueta** para representar la distribución estadística global de los valores. Estas cinco Custom Metrics representan agregaciones del lado del servidor de `count`, `sum`, `min`, `max` y `avg`. [Más información sobre el tipo de métrica DISTRIBUTION][1].

El número de combinaciones únicas de valores de etiquetas enviadas para una métrica DISTRIBUTION con este esquema de etiquetado es **cuatro**.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

El número de Custom Metrics de una [métrica DISTRIBUTION][1] es cinco veces el número de combinaciones únicas de nombre de métrica y valores de etiqueta. Esto hace que `request.Latency` registre un total de **5\*4 = 20 Custom Metrics**.

##### Agregar agregaciones de percentiles {#adding-percentile-aggregations}

Puede incluir agregaciones de percentiles (`p50`, `p75`, `p90`, `p95` y `p99`) en su métrica de distribución. Incluir estas agregaciones de percentiles adicionales genera un volumen adicional equivalente a cinco veces el número de combinaciones únicas de nombre de métrica y valores de etiqueta (**5\*4 = 20 Custom Metrics**). Por lo tanto, el número total de Custom Metrics emitidas por esta métrica de distribución con agregaciones de percentiles es **2 * (5\*4) = 40 Custom Metrics**.

Esta tabla resume el efecto de agregar agregaciones de percentiles a cualquier métrica de distribución. 

| Métricas                                                                                   | Número de Custom Metrics facturables |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Número de Custom Metrics de una distribución base (count, sum, min, max, avg)         | `5*(tag value combinations)`      |
| Número de Custom Metrics al incluir agregaciones de percentiles (p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| Total                                                                                     | `2*5(tag value combinations)`     |

### Configure etiquetas con Metrics without Limits™ {#configure-tags-with-metrics-without-limits-2}

El volumen de Custom Metrics puede verse afectado al configurar etiquetas y agregaciones mediante [Metrics without Limits™][2]. Metrics without Limits™ desacopla los costos de ingesta de los costos de indexación, por lo que puede seguir enviando a Datadog todos sus datos (todo se ingiere) y puede especificar una lista de permitidos de etiquetas que desea que permanezcan consultables en la plataforma de Datadog. Dado que el volumen de datos que Datadog ingiere para sus métricas configuradas ahora difiere del volumen menor restante que ha indexado, verá dos volúmenes distintos en la página Usage y en la página Metrics Catalog. 
 
- **Custom Metrics ingeridas**: El volumen original de Custom Metrics basado en todas las etiquetas ingeridas (enviadas mediante código)
- **Custom Metrics indexadas**: El volumen de Custom Metrics que permanece consultable en la plataforma de Datadog (basado en cualquier configuración de Metrics without Limits™) 

**Nota: Solo las métricas configuradas contribuyen a su volumen de Custom Metrics ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se le cobra por su volumen de Custom Metrics indexadas.

#### ¿Cuándo se le cobra por las Custom Metrics ingeridas frente a las indexadas? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-2}
Para las métricas no configuradas con Metrics without Limits™, usted paga por las Custom Metrics indexadas.

|                                      | Custom Metrics indexadas<br>(según el número promedio mensual de Custom Metrics por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 Custom Metrics indexadas por servidor <br>- Enterprise: 200 Custom Metrics indexadas por servidor                             |
| Uso superior a la asignación de la cuenta | Por cada 100 Custom Metrics indexadas por encima de la asignación de la cuenta, usted paga un monto que se especifica en su contrato actual. |

Para las métricas configuradas con Metrics without Limits™ (las etiquetas/agregaciones están configuradas), usted paga por las Custom Metrics ingeridas y las Custom Metrics indexadas.

|                                      | Custom Metrics ingeridas                                                                           | Custom Metrics indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 Custom Metrics ingeridas por servidor<br>- Enterprise: 200 Custom Metrics ingeridas por servidor | - Pro: 100 Custom Metrics indexadas por servidor<br>- Enterprise: 200 Custom Metrics indexadas por servidor                               |
| Uso superior a la asignación de la cuenta | Por cada 100 Custom Metrics ingeridas por encima de la asignación de la cuenta, usted paga $0.10.                   | Por cada 100 Custom Metrics indexadas por encima de la asignación de la cuenta, usted paga un monto que se especifica en su contrato actual. |

Suponga que desea conservar solo las etiquetas `endpoint` y `status` asociadas con la métrica `request.Latency`. Esto resulta en las siguientes tres combinaciones de etiquetas únicas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

El número de Custom Metrics de una [métrica DISTRIBUTION][1] es cinco veces el número de combinaciones únicas de nombre de métrica y valores de etiquetas. Como resultado de la personalización de etiquetas, `request.Latency` informa un total de **5\*3 = 15 Custom Metrics indexadas**. Según las etiquetas originales enviadas con esta métrica, el volumen original **ingerido** de Custom Metrics de `request.Latency` es de **20 Custom Metrics ingeridas**.

Obtenga más información sobre [Metrics without Limits™][2].

[1]: /es/metrics/types/?tab=distribution#definition
[2]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Seguimiento de Custom Metrics {#tracking-custom-metrics}

Los usuarios administrativos (aquellos con [roles de Datadog Admin][7]) pueden ver el número promedio mensual de Custom Metrics **ingeridas** e **indexadas** por hora. La tabla de las principales Custom Metrics también enumera el número promedio de Custom Metrics **indexadas** en la [página de detalles de uso][8]. Consulte la documentación de [Usage Details][9] para obtener más información.

Para hacer un seguimiento más en tiempo real del recuento de Custom Metrics de un nombre de métrica en particular, haga clic en el nombre de la métrica en la [página de Metrics Catalog][10]. Puede ver el número de Custom Metrics **ingeridas** y Custom Metrics **indexadas** en el panel lateral de detalles de la métrica. 

{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested_3142025.jpg" alt="Panel lateral de Metrics Catalog" style="width:80%;">}}


## Asignación {#allocation}

Se le asigna una cierta cantidad de Custom Metrics **ingeridas** y **indexadas** según su plan de precios de Datadog:

- Pro: 100 Custom Metrics ingeridas por servidor y 100 Custom Metrics indexadas por servidor
- Enterprise: 200 Custom Metrics ingeridas por servidor y 200 Custom Metrics indexadas por servidor

Estas asignaciones se contabilizan en toda su infraestructura. Por ejemplo, si tiene el plan Pro y licencia para tres servidores, se le asignan 300 Custom Metrics indexadas. Las 300 Custom Metrics indexadas se pueden dividir equitativamente entre los servidores, o un solo servidor puede utilizar las 300 Custom Metrics indexadas. Usando este ejemplo, el gráfico a continuación muestra escenarios que no exceden la cantidad de Custom Metrics asignadas:

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Asignaciones para Custom Metrics" >}}

El número facturable de Custom Metrics indexadas se basa en el número promedio de Custom Metrics (de todos los servidores de pago) por hora durante un mes determinado. El número facturable de Custom Metrics ingeridas solo aumenta si ha utilizado Metrics without Limits™ para configurar su métrica. Comuníquese con [Sales][11] o con su gerente de [Customer Success][12] para hablar sobre las Custom Metrics de su cuenta o para comprar un paquete adicional de Custom Metrics.

## Solución de problemas {#troubleshooting}

Para preguntas técnicas, comuníquese con el [soporte de Datadog][13].

Para preguntas sobre facturación, comuníquese con su gerente de [Customer Success][12].

[1]: /es/integrations/
[2]: /es/metrics/custom_metrics/
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /es/metrics/custom_metrics/agent_metrics_submission/
[5]: /es/metrics/metrics-without-limits
[6]: /es/metrics/types/#metric-types
[7]: /es/account_management/users/default_roles/
[8]: https://app.datadoghq.com/billing/usage
[9]: /es/account_management/plan_and_usage/usage_details/
[10]: https://app.datadoghq.com/metric/catalog
[11]: mailto:sales@datadoghq.com
[12]: mailto:success@datadoghq.com
[13]: /es/help/
[14]: /es/metrics/custom_metrics/#standard-integrations
[15]: /es/account_management/billing/metric_name_pricing/