---
algolia:
  tags:
  - custom metrics billing
aliases:
- /es/integrations/faq/what-standard-integrations-emit-custom-metrics/
further_reading:
- link: /metrics/custom_metrics/
  tag: Documentación
  text: Aprende más sobre métricas personalizadas
- link: /metrics/guide/custom_metrics_governance/
  tag: Guía
  text: Mejores prácticas para la gobernanza de métricas personalizadas
title: Facturación de métricas personalizadas
---
## Descripción general {#overview}

Si una métrica no se envía desde una de las [más de {{< translate key="integration_count" >}} integraciones de Datadog][1], se considera una [métrica personalizada][2]. Ciertas integraciones estándar también pueden emitir métricas personalizadas. Para más información, consulta [métricas personalizadas e integraciones estándar][14].

**Una métrica personalizada se identifica de manera única por una combinación de un nombre de métrica y valores de etiqueta (incluyendo la etiqueta de host)**. En general, cualquier métrica que envíes utilizando [DogStatsD][3] o a través de un [Chequeo de Agente personalizado][4] es una métrica personalizada.

Tu uso mensual de métricas personalizadas facturables (reflejado en la página de Uso) se calcula tomando el total de todas las métricas personalizadas distintas (también conocidas como series de tiempo) para cada hora en un mes dado, y dividiéndolo por el número de horas en el mes para calcular un valor promedio mensual. Tu uso facturable no se ve afectado por la frecuencia de envío de puntos de datos o el número de consultas que realices sobre tus métricas.

Los usuarios de Metrics without Limits™ ven volúmenes facturables mensuales para _ingestadas_ y _indexadas_ métricas personalizadas en su página de Uso. Aprende más sobre métricas personalizadas ingestadas e indexadas y [Metrics without Limits™][5]. 

## Contando métricas personalizadas {#counting-custom-metrics}

El número de métricas personalizadas asociadas con un nombre de métrica particular depende de su [tipo de envío de métrica][6]. A continuación se presentan ejemplos de cómo contar tus métricas personalizadas basados en el siguiente escenario:

Supón que estás enviando una métrica, `request.Latency`, desde dos hosts (`host:A`,`host:B`), que mide la latencia de tus solicitudes de punto de conexión. Está enviando esta métrica con dos claves de etiqueta:

- `endpoint`, que tiene el valor `endpoint:X` o `endpoint:Y`.
- `status`, que tiene el valor `status:200` o `status:400`.

Supón que en tus datos, `endpoint:X` es compatible con ambos hosts, pero falla solo en `host:B`. También supón que las solicitudes a `endpoint:Y` son siempre exitosas y solo aparecen en `host:B` como se muestra a continuación:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latencia de solicitud" style="width:80%;">}}

{{< tabs >}}
{{% tab "Conteo, Tasa"%}}

El número de métricas personalizadas de [COUNT][1] y [RATE][2] se calcula con la misma lógica.

El número de combinaciones de valores de etiqueta únicas enviadas para una métrica de TASA con este esquema de etiquetado es **cuatro**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Esto resulta en `request.Latency` reportando **cuatro métricas personalizadas**. 

### Efecto de agregar etiquetas {#effect-of-adding-tags}

Agregar etiquetas **puede no** resultar en más métricas personalizadas. Su conteo de métricas personalizadas generalmente escala con la etiqueta más granular o detallada. Supongamos que estás midiendo la temperatura en los EE. UU., y has etiquetado tu métrica `temperature` por país y región. Usted envía lo siguiente a Datadog:

| Nombre de la métrica   | Valores de la etiqueta                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Supongamos que deseas agregar la etiqueta `city` que tiene tres valores: `NYC`, `Miami` y `Orlando`. Agregar esta etiqueta aumenta el número de métricas personalizadas, ya que proporciona más detalle y granularidad a tu conjunto de datos, como se muestra a continuación:

| Nombre de la métrica   | Valores de la etiqueta                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

El conteo de métricas personalizadas que reportan desde `temperature` se escala con la etiqueta más granular, `city`.

Supongamos que también deseas etiquetar tu métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). Esto significa que estás etiquetando la temperatura con las etiquetas: `country`, `region`, `state` y `city`. Agregar la etiqueta de estado no aumenta el nivel de granularidad ya presente en tu conjunto de datos proporcionado por la etiqueta de ciudad.

Para obtener la temperatura en Florida, puedes recombinar las métricas personalizadas de:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Reordenar los valores de las etiquetas no añade unicidad. Las siguientes combinaciones son la misma métrica personalizada:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configura etiquetas con Métricas sin Límites™ {#configure-tags-with-metrics-without-limits}

Los volúmenes de métricas personalizadas pueden verse afectados al configurar etiquetas utilizando [Métricas sin Límites™][3]. Métricas sin Límites™ desacopla los costos de ingestión de los costos de indexación, por lo que puedes seguir enviando a Datadog todos tus datos (todo se ingesta) y puedes especificar una lista de etiquetas que deseas que permanezcan consultables en la plataforma de Datadog. Dado que el volumen de datos que Datadog está ingiriendo para tus métricas configuradas ahora difiere del volumen más pequeño que has indexado, verás dos volúmenes distintos en tu página de Uso, así como en la página de Resumen de Métricas. 
 
- **Métricas personalizadas ingeridas**: El volumen original de métricas personalizadas basado en todas las etiquetas ingeridas (enviadas a través de código)
- **Métricas personalizadas indexadas**: El volumen de métricas personalizadas que permanece consultable en la plataforma de Datadog (basado en cualquier configuración de Métricas sin Límites™) 

**Nota: Solo las métricas configuradas contribuyen a tu volumen de métricas personalizadas ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se te cobrará por su volumen de métricas personalizadas indexadas.

#### ¿Cuándo se te cobra por métricas personalizadas ingeridas vs indexadas? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics}
Para métricas no configuradas con Metrics without Limits™, pagas por métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(basado en el número promedio mensual de métricas personalizadas por hora) |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta | - Pro: 100 métricas personalizadas indexadas por host <br>- Empresa: 200 métricas personalizadas indexadas por host |
| Uso mayor que la asignación de cuenta | Por cada 100 métricas personalizadas indexadas sobre la asignación de cuenta, pagas un monto que se especifica en tu contrato actual. |

Para métricas configuradas con Metrics without Limits™ (las etiquetas están configuradas), pagas por métricas personalizadas ingeridas y métricas personalizadas indexadas.

|                                      | Métricas personalizadas ingeridas | Métricas personalizadas indexadas |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 métricas personalizadas ingeridas por host<br>- Empresa: 200 métricas personalizadas ingeridas por host | - Pro: 100 métricas personalizadas indexadas por host<br>- Empresa: 200 métricas personalizadas indexadas por host                               |
| Uso mayor que la asignación de cuenta | Por cada 100 métricas personalizadas ingeridas sobre la asignación de cuenta, pagas $0.10.                   | Por cada 100 métricas personalizadas indexadas sobre la asignación de cuenta, pagas un monto que se especifica en tu contrato actual. |

Supongamos que deseas usar Metrics without Limits™ para reducir el tamaño de tu `request.Latency` métrica manteniendo solo las etiquetas `endpoint` y `status`. Esto resulta en las siguientes tres combinaciones únicas de etiquetas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Como resultado de la configuración de etiquetas, `request.Latency` reportando un total de **3 métricas personalizadas indexadas**. Basado en las etiquetas originales enviadas en esta métrica, el volumen original de métricas personalizadas **ingeridas** de `request.Latency` es **4 métricas personalizadas ingeridas**.

Aprende más sobre [Metrics without Limits™][3].

[1]: /es/metrics/types/?tab=count#metric-types
[2]: /es/metrics/types/?tab=rate#metric-types
[3]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "gauge" %}}
El número de combinaciones únicas de valores de etiquetas enviadas para una métrica GAUGE con este esquema de etiquetado es **cuatro**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Esto resulta en `request.Latency` reportando **cuatro métricas personalizadas**. 

### Efecto de agregar etiquetas {#effect-of-adding-tags-1}

Agregar etiquetas **puede no** resultar en más métricas personalizadas. Su conteo de métricas personalizadas generalmente escala con la etiqueta más granular o detallada. Suponga que mide la temperatura en EE. UU., y ha etiquetado su métrica `temperature` por país y región. Usted envía lo siguiente a Datadog:

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

El conteo de métricas personalizadas reportado desde `temperature` aumenta en función de la etiqueta más granular, `city`.

Suponga que también desea etiquetar su métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). Esto significa que está etiquetando la temperatura por `country`, `region`, `state` y `city`. Agregar la etiqueta de estado no aumenta el nivel de granularidad ya presente en su conjunto de datos proporcionado por la etiqueta de ciudad.

Para obtener la temperatura en Florida, puede recombinar las métricas personalizadas de:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Reordenar los valores de las etiquetas no añade unicidad. Las siguientes combinaciones son la misma métrica personalizada:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configure etiquetas con Metrics without Limits™ {#configure-tags-with-metrics-without-limits-1}

Los volúmenes de métricas personalizadas pueden verse afectados al configurar etiquetas usando [Metrics without Limits™][4]. Metrics without Limits™ desacopla los costos de ingestión de los costos de indexación, por lo que puedes seguir enviando a Datadog todos tus datos (todo es ingerido) y puedes especificar una lista de etiquetas que deseas que permanezcan consultables en la plataforma de Datadog. Dado que el volumen de datos que Datadog está ingiriendo para tus métricas configuradas ahora difiere del volumen más pequeño que has indexado, verás dos volúmenes distintos en tu página de Usage, así como en la página de Metrics Summary. 
 
- **Métricas personalizadas ingeridas**: El volumen original de métricas personalizadas basado en todas las etiquetas ingeridas (enviadas a través de código)
- **Métricas personalizadas indexadas**: El volumen de métricas personalizadas que permanece consultable en la plataforma de Datadog (basado en cualquier configuración de Metrics without Limits™) 

**Nota: Solo las métricas configuradas contribuyen a su volumen de métricas personalizadas ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se le cobrará por su volumen de métricas personalizadas indexadas.

#### ¿Cuándo se le cobra por métricas personalizadas ingeridas vs indexadas? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-1}
Para métricas no configuradas con Metrics without Limits™, se paga por métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(basado en el número promedio mensual de métricas personalizadas por hora) |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta | - Pro: 100 métricas personalizadas indexadas por host <br>- Empresa: 200 métricas personalizadas indexadas por host |
| Uso mayor que la asignación de cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de cuenta, se paga un monto que se especifica en su contrato actual. |

Para métricas configuradas con Metrics without Limits™ (las etiquetas están configuradas), se paga por métricas personalizadas ingeridas y métricas personalizadas indexadas.

|                                      | Métricas personalizadas ingeridas | Métricas personalizadas indexadas |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 métricas personalizadas ingeridas por host<br>- Empresa: 200 métricas personalizadas ingeridas por host | - Pro: 100 métricas personalizadas indexadas por host<br>- Empresa: 200 métricas personalizadas indexadas por host                               |
| Uso mayor que la asignación de cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de cuenta, se paga $0.10.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de cuenta, se paga un monto que se especifica en su contrato actual. |

Por defecto, se pueden usar las siguientes agregaciones para consultar:
- agrupado por `SUM` y rollup por `AVG`
- agrupado por `MAX` y rollup por `AVG`
- agrupado por `MIN` y rollup por `AVG`
- agrupado por `AVG` y rollup por `SUM`
- agrupado por `SUM` y rollup por `SUM`
- agrupado por `MAX` y rollup por `MAX`
- agrupado por `MIN` y rollup por `MIN`
- agrupado por `SUM` y rollup by `COUNT`

Su número de métricas personalizadas indexadas **no escala** con el número de agregaciones habilitadas.

Aprenda más sobre [Metrics without Limits™][1].

[1]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histograma" %}}

**Una métrica de HISTOGRAMA genera por defecto cinco métricas personalizadas para cada combinación única de nombre de métrica y valores de etiqueta** para soportar las agregaciones del lado del Agente `max`, `median`, `avg`, `95pc` y `count`. [Aprenda más sobre el tipo de métrica HISTOGRAMA][1].

El número de combinaciones únicas de valores de etiqueta enviadas para una métrica de HISTOGRAMA con este esquema de etiquetado es **cuatro**:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Por defecto, el Agente genera cinco métricas personalizadas para cada una de las cuatro combinaciones únicas de valores de etiqueta originales para contabilizar [cada una de las agregaciones habilitadas del lado del Agente][2]: `avg`, `count`, `median`, `95percentile` y `max`. En consecuencia, `request.Latency` informa un total de **4\*5 = 20 métricas personalizadas**.

**Nota**: Agregar agregaciones a sus métricas de HISTOGRAMA aumenta el número de métricas personalizadas distintas reportadas. Eliminar agregaciones disminuye el número de métricas personalizadas reportadas.

- Configure qué agregación desea enviar a Datadog con el parámetro `histogram_aggregates` en su [archivo de configuración datadog.yaml][3]. Por defecto, solo se envían a Datadog las agregaciones `max`, `median`, `avg` y `count`. `sum` y `min` también están disponibles si se desea.
- Configure qué agregación de percentiles desea enviar a Datadog con el parámetro `histogram_percentiles` en su [archivo de configuración datadog.yaml][3]. Por defecto, solo se envía a Datadog el percentil `95percentile`, el percentil 95.


[1]: /es/metrics/types/?tab=histogram#metric-types
[2]: /es/metrics/types/?tab=histogram#definition
[3]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribución" %}}

**Una métrica de DISTRIBUCIÓN genera por defecto cinco métricas personalizadas para cada combinación única de nombre de métrica y valores de etiqueta** para representar la distribución estadística global de valores. Estas cinco métricas personalizadas representan agregaciones del lado del servidor de `count`, `sum`, `min`, `max` y `avg`. [Aprenda más sobre el tipo de métrica DISTRIBUCIÓN][1].

El número de combinaciones únicas de valores de etiqueta enviadas para una métrica de DISTRIBUCIÓN con este esquema de etiquetado es **cuatro**.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

El número de métricas personalizadas de una [métrica de DISTRIBUCIÓN][1] es cinco veces la combinación única de nombre de métrica y valores de etiqueta. Esto resulta en `request.Latency` reportando un total de **5\*4 = 20 métricas personalizadas**.

##### Agregar agregaciones de percentiles {#adding-percentile-aggregations}

Puede incluir agregaciones de percentiles (`p50`, `p75`, `p90`, `p95` y `p99`) en su métrica de distribución. Incluir estas agregaciones percentiles adicionales resulta en un volumen adicional de cinco veces la combinación única de nombre de métrica y valores de etiqueta (**5\*4 = 20 métricas personalizadas**). Por lo tanto, el número total de métricas personalizadas emitidas desde esta métrica de distribución con agregaciones percentiles es **2 * (5\*4) = 40 métricas personalizadas**.

Esta tabla resume el efecto de agregar agregaciones percentiles a cualquier métrica de distribución. 

| Métricas                                                                                   | Número de métricas personalizadas facturables |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Número de métricas personalizadas de una distribución base (conteo, suma, mínimo, máximo, promedio)         | `5*(tag value combinations)`      |
| Número de métricas personalizadas al incluir agregaciones percentiles (p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| Total                                                                                     | `2*5(tag value combinations)`     |

### Configure etiquetas con Metrics without Limits™ {#configure-tags-with-metrics-without-limits-2}

Los volúmenes de métricas personalizadas pueden verse afectados al configurar etiquetas y agregaciones utilizando [Metrics without Limits™][2]. Metrics without Limits™ desacopla los costos de ingestión de los costos de indexación, por lo que puede seguir enviando a Datadog todos sus datos (todo se ingiere) y puede especificar una lista de etiquetas que desea que permanezcan consultables en la plataforma de Datadog. Dado que el volumen de datos que Datadog está ingiriendo para sus métricas configuradas ahora difiere del volumen más pequeño que ha indexado, verá dos volúmenes distintos en su página de Uso, así como en la página de Metrics Summary. 
 
- **Métricas personalizadas ingeridas**: El volumen original de métricas personalizadas basado en todas las etiquetas ingeridas (enviadas a través de código)
- **Métricas personalizadas indexadas**: El volumen de métricas personalizadas que permanece consultable en la plataforma de Datadog (basado en cualquier configuración de Metrics without Limits™) 

**Nota: Solo las métricas configuradas contribuyen a su volumen de métricas personalizadas ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se le cobra por su volumen de métricas personalizadas indexadas.

#### ¿Cuándo se le cobra por métricas personalizadas ingeridas vs indexadas? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-2}
Para métricas no configuradas con Metrics without Limits™, usted paga por métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(basado en el número promedio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 métricas personalizadas indexadas por host <br>- Enterprise: 200 métricas personalizadas indexadas por host                             |
| Uso mayor que la asignación de cuenta | Por cada 100 métricas personalizadas indexadas sobre la asignación de cuenta, paga un monto que se especifica en su contrato actual. |

Para las métricas configuradas con Metrics without Limits™ (las etiquetas/agregaciones están configuradas), usted paga por las métricas personalizadas ingeridas y las métricas personalizadas indexadas.

|                                      | Métricas personalizadas ingeridas                                                                           | Métricas personalizadas indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de cuenta                    | - Pro: 100 métricas personalizadas ingeridas por host<br>- Enterprise: 200 métricas personalizadas ingeridas por host | - Pro: 100 métricas personalizadas indexadas por host<br>- Enterprise: 200 métricas personalizadas indexadas por host                               |
| Uso mayor que la asignación de cuenta | Por cada 100 métricas personalizadas ingeridas que excedan la asignación de cuenta, usted paga $0.10. | Por cada 100 métricas personalizadas indexadas que excedan la asignación de cuenta, usted paga un monto que se especifica en su contrato actual. |

Suponga que desea conservar solo las etiquetas `endpoint` y `status` asociadas con la métrica `request.Latency`. Esto resulta en las siguientes tres combinaciones únicas de etiquetas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

El número de métricas personalizadas de una [métrica de DISTRIBUCIÓN][1] es cinco veces la combinación única de nombre de métrica y valores de etiqueta. Como resultado de la personalización de etiquetas, `request.Latency` reporta un total de **5\*3 = 15 métricas personalizadas indexadas**. Basado en las etiquetas originales enviadas en esta métrica, el volumen original de métricas personalizadas **ingeridas** de `request.Latency` es **20 métricas personalizadas ingeridas**.

Aprenda más sobre [Metrics without Limits™][2].

[1]: /es/metrics/types/?tab=distribution#definition
[2]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Seguimiento de métricas personalizadas {#tracking-custom-metrics}

Los usuarios administrativos (aquellos con [Datadog Admin roles][7]) pueden ver el número promedio mensual de métricas personalizadas **ingeridas** y **indexadas** por hora. La tabla de métricas personalizadas principales también lista el número promedio de métricas personalizadas **indexadas** en la [Usage Details page][8]. Consulte la documentación de [Usage Details][9] para obtener más información.

Para un seguimiento más en tiempo real del conteo de métricas personalizadas para un nombre de métrica particular, haga clic en el nombre de la métrica en la [Metrics Summary page][10]. Puede ver el número de métricas personalizadas **ingeridas** y métricas personalizadas **indexadas** en el panel lateral de detalles de la métrica. 

{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested_3142025.jpg" alt="Panel lateral de Metrics Summary" style="width:80%;">}}


## Asignación {#allocation}

Account Allotment                    - Pro: 100 métricas personalizadas ingeridas por host- Enterprise: 200 métricas personalizadas ingeridas por host - Pro: 100 métricas personalizadas indexadas por host- Enterprise: 200 métricas personalizadas indexadas por host                               
Se le asigna un cierto número de métricas personalizadas **ingeridas** y **indexadas** según su plan de precios de Datadog:

- Pro: 100 métricas personalizadas ingeridas por host y 100 métricas personalizadas indexadas por host
- Enterprise: 200 métricas personalizadas ingeridas por host y 200 métricas personalizadas indexadas por host

Estas asignaciones se cuentan en toda su infraestructura. Por ejemplo, si está en el plan Pro y cuenta con licencia para tres hosts, se asignan 300 métricas personalizadas indexadas. Las 300 métricas personalizadas indexadas se pueden dividir equitativamente entre cada host, o las 300 métricas indexadas pueden ser utilizadas por un solo host. Usando este ejemplo, el gráfico a continuación muestra escenarios que no superan el número de métricas personalizadas asignadas:

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Asignaciones para métricas personalizadas" >}}

El número facturable de métricas personalizadas indexadas se basa en el número promedio de métricas personalizadas (de todos los hosts pagados) por hora durante un mes determinado. El número facturable de métricas personalizadas ingeridas solo aumenta si ha utilizado Metrics without Limits™ para configurar su métrica. Contacte a [Sales][11] o a su [Customer Success][12] Manager para discutir métricas personalizadas para su cuenta o para comprar un paquete adicional de métricas personalizadas.

## Resolución de problemas {#troubleshooting}

Para preguntas técnicas, contacte a [Datadog support][13].

Para preguntas de facturación, contacte a su [Customer Success][12] Manager.

[1]: /es/integrations/
[2]: /es/metrics/custom_metrics/
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /es/metrics/custom_metrics/agent_metrics_submission/
[5]: /es/metrics/metrics-without-limits
[6]: /es/metrics/types/#metric-types
[7]: /es/account_management/users/default_roles/
[8]: https://app.datadoghq.com/billing/usage
[9]: /es/account_management/plan_and_usage/usage_details/
[10]: https://app.datadoghq.com/metric/summary
[11]: mailto:sales@datadoghq.com
[12]: mailto:success@datadoghq.com
[13]: /es/help/
[14]: /es/metrics/custom_metrics/#standard-integrations