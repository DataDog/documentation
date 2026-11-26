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

**Nota**: Esta página describe el modelo de facturación de Custom Metrics basado en la cardinalidad. Si su contrato utiliza SKU de precios por nombre de métrica, consulte [Precios por nombre de métrica para Custom Metrics][15] en su lugar.

Si una métrica no se envía desde una de las [más de {{< translate key="integration_count" >}} Integrations de Datadog][1], se considera una [métrica personalizada][2]. Ciertas Integrations estándar también pueden emitir Custom Metrics. Para obtener más información, consulte [Custom Metrics e Integrations estándar][14].

**Una métrica personalizada se identifica de forma única mediante una combinación de un nombre de métrica y valores de etiqueta (incluida la etiqueta del servidor)**. En general, cualquier métrica que envíe mediante [DogStatsD][3] o a través de una [comprobación personalizada del Agent][4] es una métrica personalizada.

Su uso mensual facturable de Custom Metrics (reflejado en la página Usage) se calcula tomando el total de todas las Custom Metrics distintas (también conocidas como series temporales) para cada hora en un mes determinado y dividiéndolo por la cantidad de horas en el mes para calcular un valor promedio mensual. Su uso facturable no se ve afectado por la frecuencia de envío de puntos de datos ni por la cantidad de consultas que ejecute sobre sus métricas.

Los usuarios de Metrics without Limits™ ven los volúmenes mensuales facturables de Custom Metrics _ingresadas_ y _indexadas_ en su página de Usage. Obtenga más información sobre las Custom Metrics ingresadas e indexadas y [Metrics without Limits™][5]. 

## Recuento de Custom Metrics {#counting-custom-metrics}

La cantidad de Custom Metrics asociadas con un nombre de métrica en particular depende del [tipo de envío][6] de la métrica. A continuación, se muestran ejemplos de cómo contar sus Custom Metrics según el siguiente escenario:

Suponga que está enviando una métrica, `request.Latency`, desde dos servidores (`host:A`,`host:B`), la cual mide la latencia de las solicitudes a su punto de conexión. Está enviando esta métrica con dos claves de etiqueta:

- `endpoint`, que tiene el valor `endpoint:X` o `endpoint:Y`.
- `status`, que tiene el valor `status:200` o `status:400`.

Suponga que, en sus datos, `endpoint:X` es compatible con ambos servidores, pero solo falla en `host:B`. También asuma que las solicitudes a `endpoint:Y` siempre son exitosas y solo aparecen en `host:B` como se muestra a continuación:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latencia de solicitud" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate"%}}

El número de Custom Metrics de [COUNT][1] y [RATE][2] se calcula con la misma lógica.

El número de combinaciones únicas de valores de etiqueta enviadas para una métrica RATE con este esquema de etiquetado es **cuatro**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Esto hace que `request.Latency` registre **cuatro Custom Metrics**. 

### Efecto de agregar etiquetas {#effect-of-adding-tags}

Agregar etiquetas **no necesariamente** genera más Custom Metrics. Su conteo de Custom Metrics generalmente aumenta en función de la etiqueta más granular o detallada. Suponga que está midiendo la temperatura en los EE. UU. y ha etiquetado su métrica `temperature` por país y región. Usted envía lo siguiente a Datadog:

| Nombre de la métrica   | Valores de etiqueta                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suponga que desea agregar la etiqueta `city` que tiene tres valores: `NYC`, `Miami` y `Orlando`. Agregar esta etiqueta aumenta el número de Custom Metrics, ya que proporciona más detalle y granularidad a su conjunto de datos, como se muestra a continuación:

| Nombre de la métrica   | Valores de etiqueta                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

El conteo de Custom Metrics registradas por `temperature` aumenta en función de la etiqueta más granular, `city`.

Suponga que también desea etiquetar su métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). Esto significa que está etiquetando la temperatura mediante las etiquetas: `country`, `region`, `state` y `city`. Agregar la etiqueta de estado no aumenta el nivel de granularidad que la etiqueta de ciudad ya aporta a su conjunto de datos.

Para obtener la temperatura en Florida, puede recombinar las Custom Metrics de:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Reordenar los valores de las etiquetas no añade unicidad. Las siguientes combinaciones corresponden a la misma métrica personalizada:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configure etiquetas con Metrics without Limits™ {#configure-tags-with-metrics-without-limits}

Los volúmenes de Custom Metrics pueden verse afectados al configurar etiquetas mediante [Metrics without Limits™][3]. Metrics without Limits™ desacopla los costos de ingesta de los costos de indexación, por lo que puede seguir enviando a Datadog todos sus datos (todo se ingiere) y especificar una lista de etiquetas permitidas que desea que sigan siendo consultables en la plataforma de Datadog. Debido a que el volumen de datos que Datadog ingiere para sus métricas configuradas difiere del volumen menor restante que usted ha indexado, puede ver dos volúmenes distintos en la página Usage y en la página Metrics Catalog.
 
- **Custom Metrics ingeridas**: El volumen original de Custom Metrics basado en todas las etiquetas ingeridas (enviadas mediante código)
- **Custom Metrics indexadas**: El volumen de Custom Metrics que permanece disponible para consultas en la plataforma de Datadog (según las configuraciones de Metrics without Limits™) 

**Nota: Solo las métricas configuradas contribuyen a su volumen de Custom Metrics ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se le cobra por su volumen de Custom Metrics indexadas.

#### ¿Cuándo se le cobra por las Custom Metrics ingeridas y cuándo por las indexadas? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics}
Para las métricas no configuradas con Metrics without Limits™, usted paga por las Custom Metrics indexadas.

|                                      | Custom Metrics indexadas<br>(según el promedio mensual de Custom Metrics por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 Custom Metrics indexadas por servidor <br>- Enterprise: 200 Custom Metrics indexadas por servidor                             |
| Uso superior a la asignación de la cuenta | Por cada 100 Custom Metrics indexadas que superen la asignación de la cuenta, usted paga el importe especificado en su contrato actual. |

Para las métricas configuradas con Metrics without Limits™ (las etiquetas están configuradas), usted paga por las Custom Metrics ingeridas y las Custom Metrics indexadas.

|                                      | Custom Metrics ingeridas                                                                           | Custom Metrics indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 Custom Metrics ingeridas por servidor<br>- Enterprise: 200 Custom Metrics ingeridas por servidor | - Pro: 100 Custom Metrics indexadas por servidor<br>- Enterprise: 200 Custom Metrics indexadas por servidor                               |
| Uso superior a la asignación de la cuenta | Por cada 100 Custom Metrics ingeridas que superen la asignación de la cuenta, usted paga $0.10.                   | Por cada 100 Custom Metrics indexadas que superen la asignación de la cuenta, usted paga el importe especificado en su contrato actual. |

Suponga que desea utilizar Metrics without Limits™ para reducir el tamaño de su métrica `request.Latency` manteniendo solo las etiquetas `endpoint` y `status`. Esto resulta en las siguientes tres combinaciones de etiquetas únicas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Como resultado de la configuración de etiquetas, `request.Latency` reporta un total de **3 Custom Metrics indexadas**. Según las etiquetas originales enviadas en esta métrica, el volumen original de Custom Metrics **ingeridas** de `request.Latency` es **4 Custom Metrics ingeridas**.

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

Como resultado, `request.Latency` reporta **cuatro Custom Metrics**. 

### Efecto de agregar etiquetas {#effect-of-adding-tags-1}

Agregar etiquetas **puede no** resultar en más Custom Metrics. Su número de Custom Metrics generalmente depende de la etiqueta más granular o detallada. Suponga que está midiendo la temperatura en los EE. UU. y ha etiquetado su métrica `temperature` por país y región. Usted envía lo siguiente a Datadog:

| Nombre de la métrica   | Valores de etiqueta                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Suponga que desea agregar la etiqueta `city` que tiene tres valores: `NYC`, `Miami` y `Orlando`. Agregar esta etiqueta aumenta el número de Custom Metrics, ya que proporciona más detalle y granularidad a su conjunto de datos, como se muestra a continuación:

| Nombre de la métrica   | Valores de etiqueta                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

El número de Custom Metrics reportadas desde `temperature` depende de la etiqueta más granular, `city`.

Suponga que también desea etiquetar su métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). Esto significa que está etiquetando la temperatura por `country`, `region`, `state` y `city`. Agregar la etiqueta de estado no aumenta el nivel de granularidad que la etiqueta de ciudad ya aporta a su conjunto de datos.

Para obtener la temperatura en Florida, puede recombinar las Custom Metrics de:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Cambiar el orden de los valores de las etiquetas no crea una métrica distinta. Las siguientes combinaciones corresponden a la misma Custom Metric:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configure etiquetas con Metrics without Limits™ {#configure-tags-with-metrics-without-limits-1}

Los volúmenes de Custom Metrics pueden verse afectados al configurar etiquetas mediante [Metrics without Limits™][4]. Metrics without Limits™ desacopla los costos de ingesta de los costos de indexación, por lo que puede seguir enviando a Datadog todos sus datos (todo se ingiere) y especificar una lista de etiquetas permitidas que desea que sigan siendo consultables en la plataforma de Datadog. Debido a que el volumen de datos que Datadog ingiere para sus métricas configuradas difiere del volumen menor que usted ha indexado, puede ver ambos volúmenes en las páginas Usage y Metrics Catalog.
 
- **Custom Metrics ingeridas**: El volumen original de Custom Metrics basado en todas las etiquetas ingeridas (enviadas mediante código)
- **Custom Metrics indexadas**: El volumen de Custom Metrics que sigue siendo consultable en la plataforma de Datadog (según las configuraciones de Metrics without Limits™) 

**Nota: Solo las métricas configuradas contribuyen a su volumen de Custom Metrics ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se le cobra por su volumen de Custom Metrics indexadas.

#### ¿Cuándo se le cobra por las Custom Metrics ingeridas y cuándo por las indexadas? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-1}
Para las métricas no configuradas con Metrics without Limits™, usted paga por las Custom Metrics indexadas.

|                                      | Custom Metrics indexadas<br>(basadas en el promedio mensual de Custom Metrics por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 Custom Metrics indexadas por servidor <br>- Enterprise: 200 Custom Metrics indexadas por servidor                             |
| Uso superior a la asignación de la cuenta | Por cada 100 Custom Metrics indexadas que superen la asignación de la cuenta, usted paga el monto especificado en su contrato vigente. |

Para las métricas configuradas con Metrics without Limits™ (con etiquetas configuradas), usted paga por las Custom Metrics ingeridas y las Custom Metrics indexadas.

|                                      | Custom Metrics ingeridas                                                                           | Custom Metrics indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 Custom Metrics ingeridas por servidor<br>- Enterprise: 200 Custom Metrics ingeridas por servidor | - Pro: 100 Custom Metrics indexadas por servidor<br>- Enterprise: 200 Custom Metrics indexadas por servidor                               |
| Uso superior a la asignación de la cuenta | Por cada 100 Custom Metrics ingeridas que superen la asignación de la cuenta, usted paga $0.10.                   | Por cada 100 Custom Metrics indexadas que superen la asignación de la cuenta, usted paga el monto especificado en su contrato vigente. |

De forma predeterminada, se pueden utilizar las siguientes agregaciones para realizar consultas:
- agrupar por `SUM` y consolidar por `AVG`
- agrupar por `MAX` y consolidar por `AVG`
- agrupar por `MIN` y consolidar por `AVG`
- agrupar por `AVG` y consolidar por `SUM`
- agrupar por `SUM` y consolidar por `SUM`
- agrupar por `MAX` y consolidar por `MAX`
- agrupar por `MIN` y consolidar por `MIN`
- agrupar por `SUM` y consolidar por `COUNT`

Su cantidad de Custom Metrics indexadas **no escala** con la cantidad de agregaciones habilitadas.

Obtenga más información sobre [Metrics without Limits™][1].

[1]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histograma" %}}

**Una métrica HISTOGRAM genera de forma predeterminada cinco Custom Metrics por cada combinación única de nombre de métrica y valores de etiqueta** para admitir las agregaciones del lado del Agent `max`, `median`, `avg`, `95pc` y `count`. [Obtenga más información sobre el tipo de métrica HISTOGRAM][1].

La cantidad de combinaciones únicas de valores de etiqueta enviadas para una métrica HISTOGRAM con este esquema de etiquetado es **cuatro**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

De forma predeterminada, el Agent genera cinco métricas personalizadas para cada una de las cuatro combinaciones únicas de valores de etiqueta originales para tener en cuenta [cada una de las agregaciones habilitadas del lado del Agent][2]: `avg`, `count`, `median`, `95percentile` y `max`. En consecuencia, `request.Latency` informa un total de **4\*5 = 20 métricas personalizadas**.

**Nota**: Agregar agregaciones a sus métricas HISTOGRAM aumenta la cantidad de métricas personalizadas distintas informadas. Eliminar agregaciones disminuye la cantidad de métricas personalizadas informadas.

- Configure qué agregación desea enviar a Datadog con el parámetro `histogram_aggregates` en su [archivo de configuración datadog.yaml][3]. De forma predeterminada, solo se envían a Datadog las agregaciones `max`, `median`, `avg` y `count`. `sum` y `min` también están disponibles si lo desea.
- Configure qué agregación de percentil desea enviar a Datadog con el parámetro `histogram_percentiles` en su [archivo de configuración datadog.yaml][3]. De forma predeterminada, solo se envía a Datadog el `95percentile`, percentil 95.


[1]: /es/metrics/types/?tab=histogram#metric-types
[2]: /es/metrics/types/?tab=histogram#definition
[3]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribución" %}}

**Una métrica DISTRIBUTION genera de forma predeterminada cinco métricas personalizadas para cada combinación única de nombre de métrica y valores de etiqueta** para representar la distribución estadística global de los valores. Estas cinco métricas personalizadas representan agregaciones del lado del servidor de `count`, `sum`, `min`, `max` y `avg`. [Más información sobre el tipo de métrica DISTRIBUTION][1].

El número de combinaciones únicas de valores de etiqueta enviadas para una métrica DISTRIBUTION con este esquema de etiquetado es **cuatro**.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

El número de métricas personalizadas de una [métrica DISTRIBUTION][1] es cinco veces el número de combinaciones únicas de nombre de métrica y valores de etiqueta. Como resultado, `request.Latency` informa un total de **5\*4 = 20 métricas personalizadas**.

##### Adición de agregaciones de percentiles {#adding-percentile-aggregations}

Puede incluir agregaciones de percentiles (`p50`, `p75`, `p90`, `p95` y `p99`) en su métrica de distribución. Incluir estas agregaciones de percentiles adicionales genera un volumen adicional equivalente a cinco veces el número de combinaciones únicas de nombre de métrica y valores de etiqueta (**5\*4 = 20 métricas personalizadas**). Por lo tanto, el número total de métricas personalizadas emitidas por esta métrica de distribución con agregaciones de percentiles es **2 * (5\*4) = 40 métricas personalizadas**.

Esta tabla resume el efecto de añadir agregaciones de percentiles a cualquier métrica de distribución. 

| Métricas                                                                                   | Número de métricas personalizadas facturables |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Número de métricas personalizadas de una distribución base (count, sum, min, max, avg)         | `5*(tag value combinations)`      |
| Número de métricas personalizadas al incluir agregaciones de percentiles (p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| Total                                                                                     | `2*5(tag value combinations)`     |

### Configure etiquetas con Metrics without Limits™ {#configure-tags-with-metrics-without-limits-2}

El volumen de métricas personalizadas puede verse afectado al configurar etiquetas y agregaciones mediante [Metrics without Limits™][2]. Metrics without Limits™ desacopla los costos de ingesta de los costos de indexación, por lo que puede seguir enviando a Datadog todos sus datos (todo se ingiere) y especificar una lista de permitidos de las etiquetas que desea que sigan siendo consultables en la plataforma de Datadog. Debido a que el volumen de datos que Datadog ingiere para sus métricas configuradas difiere del volumen menor restante que usted ha indexado, puede ver dos volúmenes distintos en la página Usage, así como en la página Metrics Catalog.
 
- **Métricas personalizadas ingeridas**: El volumen original de métricas personalizadas basado en todas las etiquetas ingeridas (enviadas a través del código)
- **Métricas personalizadas indexadas**: El volumen de métricas personalizadas que permanece consultable en la plataforma Datadog (basado en cualquier configuración de Metrics without Limits™) 

**Nota: Solo las métricas configuradas contribuyen a su volumen de métricas personalizadas ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se le cobra por su volumen de métricas personalizadas indexadas.

#### ¿Cuándo se le cobra por las métricas personalizadas ingeridas frente a las indexadas? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-2}
Para las métricas no configuradas con Metrics without Limits™, usted paga por las métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(basado en el número promedio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas indexadas por servidor <br>- Enterprise: 200 métricas personalizadas indexadas por servidor                             |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, usted paga un monto que se especifica en su contrato actual. |

Para las métricas configuradas con Metrics without Limits™ (las etiquetas/agregaciones están configuradas), usted paga por las métricas personalizadas ingeridas y las métricas personalizadas indexadas.

|                                      | Métricas personalizadas ingeridas                                                                           | Métricas personalizadas indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas ingeridas por servidor<br>- Enterprise: 200 métricas personalizadas ingeridas por servidor | - Pro: 100 métricas personalizadas indexadas por servidor<br>- Enterprise: 200 métricas personalizadas indexadas por servidor                               |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de la cuenta, usted paga $0.10.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, usted paga un monto que se especifica en su contrato actual. |

Suponga que desea conservar solo las etiquetas `endpoint` y `status` asociadas con la métrica `request.Latency`. Esto da como resultado las siguientes tres combinaciones únicas de etiquetas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

El número de métricas personalizadas de una [métrica DISTRIBUTION][1] es cinco veces el número de combinaciones únicas de nombre de métrica y valores de etiquetas. Como resultado de la personalización de etiquetas, `request.Latency` reporta un total de **5\*3 = 15 métricas personalizadas indexadas**. Según las etiquetas originales enviadas en esta métrica, el volumen original de métricas personalizadas **ingeridas** de `request.Latency` es **20 métricas personalizadas ingeridas**.

Obtenga más información sobre [Metrics without Limits™][2].

[1]: /es/metrics/types/?tab=distribution#definition
[2]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Seguimiento de métricas personalizadas {#tracking-custom-metrics}

Los usuarios administrativos (aquellos con [roles de Datadog Admin][7]) pueden ver el número promedio mensual de métricas personalizadas **ingeridas** y **indexadas** por hora. La tabla de las principales métricas personalizadas también enumera el número promedio de métricas personalizadas **indexadas** en la [página de detalles de uso][8]. Consulte la documentación de [Usage Details][9] para obtener más información.

Para hacer un seguimiento más inmediato de la cantidad de métricas personalizadas de una métrica específica, haga clic en el nombre de la métrica en la [página de Metrics Catalog][10]. Puede ver el número de métricas personalizadas **ingeridas** y métricas personalizadas **indexadas** en el panel lateral de detalles de la métrica.

{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested_3142025.jpg" alt="Panel lateral de detalles de métricas en la página de Metrics Catalog que muestra las métricas personalizadas ingeridas e indexadas." style="width:80%;">}}


## Asignación {#allocation}

Se le asigna una cierta cantidad de métricas personalizadas **ingeridas** y **indexadas** según su plan de precios de Datadog:

- Pro: 100 métricas personalizadas ingeridas por servidor y 100 métricas personalizadas indexadas por servidor
- Enterprise: 200 métricas personalizadas ingeridas por servidor y 200 métricas personalizadas indexadas por servidor

Estas asignaciones se contabilizan en toda su infraestructura. Por ejemplo, si tiene el plan Pro y licencia para tres servidores, se asignan 300 métricas personalizadas indexadas. Las 300 métricas personalizadas indexadas pueden dividirse equitativamente entre los servidores, o un solo servidor puede usar las 300 métricas indexadas. Usando este ejemplo, el gráfico a continuación muestra escenarios que no exceden el conteo de métricas personalizadas asignadas:

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Asignaciones para métricas personalizadas" >}}

El número facturable de métricas personalizadas indexadas se basa en el promedio de métricas personalizadas (de todos los servidores de pago) por hora durante un mes determinado. El número facturable de métricas personalizadas ingeridas solo aumenta si ha utilizado Metrics without Limits™ para configurar su métrica. Comuníquese con [Sales][11] o con su gerente de [Customer Success][12] para analizar las métricas personalizadas de su cuenta o para comprar un paquete adicional de métricas personalizadas.

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