---
aliases:
- /es/integrations/faq/what-standard-integrations-emit-custom-metrics/
further_reading:
- link: /observability_pipelines/guide/custom-metrics-governance
  tag: Documentación
  text: Usar pipelines de observabilidad para gestionar las métricas personalizadas
kind: documentación
title: Facturación de métricas personalizadas
---

Si una métrica no se envía desde una de las [más de {{< translate key="integration_count" >}} integraciones de Datadog][1], se considera una [métrica personalizada][2]<sup>[(1)](#standard-integrations)</sup>.

**Una métrica personalizada se identifica exclusivamente mediante un nombre de métrica y unos valores de etiquetas (entre las que se incluye host)**. En términos generales, cualquier métrica que envíes mediante [DogStatsD][3] o mediante un [check personalizado del Agent][4] será una métrica personalizada.

El count facturable mensual de métricas personalizadas (indicado en la página Usage) se calcula en función del total de métricas personalizadas diferentes para cada hora de un mes concreto y se divide entre el número de horas de ese mes para sacar la media.

Los usuarios de Metrics without Limits ven los volúmenes facturables mensuales de las métricas personalizadas _ingeridas_ e _indexadas_ en su página Usage. Obtén más información sobre las métricas personalizadas ingeridas e indexadas y [Metrics without Limits™][5]. 

## Contar las métricas personalizadas

La cantidad de métricas personalizadas asociadas a un nombre de métrica determinado depende del [tipo de envío][6] de la métrica. A continuación, encontrarás ejemplos de cómo contar tus métricas personalizadas en función de una serie de supuestos:

Supongamos que envías una métrica `request.Latency` desde dos hosts (`host:A`, `host:B`), y que esta mide la latencia de tus solicitudes endpoint. La envías con dos claves de etiqueta:

- `endpoint`, con el valor `endpoint:X` o `endpoint:Y`.
- `status`, con el valor `status:200` o `status:400`.

Supongamos que, en tus datos, `endpoint:X` es compatible con ambos hosts, pero falla para el `host:B`. Imaginemos también que las solicitudes a `endpoint:Y` siempre funcionan y aparecen únicamente para el `host:B`, como se muestra a continuación:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Solicitud de latencia" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, frecuencia"%}}

Se emplea la misma lógica para calcular el número de métricas personalizadas de [COUNT][1] y [FRECUENCIA][2].

Para una métrica de FRECUENCIA con el siguiente esquema de etiquetado, se envían **cuatro** combinaciones de valores únicos de etiquetas:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

De esta forma, la métrica `request.Latency` envía **cuatro métricas personalizadas**. 

### Consecuencias de añadir etiquetas

Añadir etiquetas **no necesariamente aumenta** el count de métricas personalizadas, que generalmente depende de la etiqueta más exhaustiva o detallada. Pongamos que quieres medir la temperatura en EE. UU. y que has etiquetado la métrica `temperature` por país (country) y región (region). Envías lo siguiente a Datadog:

| Nombre de la métrica   | Valores de la etiqueta                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Pongamos que quisieras añadir la etiqueta `city`, que tiene tres valores: `NYC`, `Miami` y `Orlando`. Al añadir esta etiqueta, aumenta el número de métricas personalizadas porque aporta más detalle y exhaustividad a tu conjunto de datos, como se indica a continuación:

| Nombre de la métrica   | Valores de la etiqueta                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

La cantidad de métricas personalizadas que envía la etiqueta `temperature` aumenta si se añade `city`, que es más exhaustiva.

Supongamos que también quisieras etiquetar tu métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). La temperatura se asociaría entonces a las etiquetas `country`, `region`, `state` y `city`. Ten en cuenta que añadir la etiqueta state no aumenta el nivel de exhaustividad que ya aporta la etiqueta city.

Para obtener la temperatura de Florida, puedes volver a combinar estas métricas personalizadas:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Cambiar el orden de los valores de las etiquetas no aporta especificidad. Las siguientes combinaciones pertenecen a la misma métrica personalizada:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurar etiquetas y agregaciones con Metrics without Limits™

Configurar etiquetas y agregaciones con [Metrics without Limits™][3] puede influir en el número de métricas personalizadas, ya que desvincula los costes de indexación y los de ingestión. Esto te permite seguir enviando a Datadog todos tus datos (que se ingieren) y especificar una lista de autorización de etiquetas que quieras conservar para que Datadog las pueda usar como consultables. Como la cantidad de datos ingeridos por Datadog para las métricas que has configurado es diferente a la cantidad restante inferior que has indexado, verás dos números independientes en la página Usage (Uso) y en la página Metrics Summary (Resumen de las métricas). 

- **Métricas personalizadas ingeridas**: el volumen original de métricas personalizadas según las etiquetas ingeridas (enviadas por el código).
- **Métricas personalizadas indexadas**: el volumen de métricas personalizadas de tipo consultable que queda en la plataforma de Datadog (en función de la configuración de Metrics without Limits™).

**Nota: Solo las métricas configuradas contribuyen al volumen de métricas personalizadas ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se te factura por su volumen de métrica personalizada indexada.

#### ¿Cuándo se te cobra por las métricas personalizadas ingeridas y cuándo por las métricas personalizadas indexadas?
Si no utilizas Metrics without Limits™ para configurar las métricas, pagas por las métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(en función del número medio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas indexadas por host <br>- Enterprise: 200 métricas personalizadas por host                             |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato actual. |

Si usas Metrics without Limits™ para configurar tus métricas (etiquetas/agregaciones), pagas por las métricas personalizadas ingeridas y por las indexadas.

|                                      | Métricas personalizadas ingeridas                                                                           | Métricas personalizadas indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas ingeridas por host<br>- Enterprise: 200 métricas personalizadas ingeridas por host | - Pro: 100 métricas personalizadas indexadas por host<br>- Enterprise: 200 métricas personalizadas indexadas por host                               |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de la cuenta, pagas 0,10 $.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato actual. |

Pongamos que quisieras utilizar Metrics without Limits™ para reducir el tamaño de tu métrica `request.Latency` manteniendo únicamente las etiquetas `endpoint` y `status`. Obtendrías estas tres combinaciones únicas de etiquetas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Como resultado de la configuración de etiquetas, `request.Latency` envía un total de **3 métricas personalizadas indexadas**. Basándonos en las etiquetas enviadas inicialmente en esta métrica, el volumen de métricas personalizadas **ingeridas** en un principio para la métrica `request.Latency` es de **4 métricas personalizadas ingeridas**.

Por defecto, Datadog almacena la combinación de agregaciones que más se consulta en función del tipo de métrica para conservar la precisión matemática de la consulta asociada a la métrica que has configurado.

- Los counts/frecuencias de métricas se pueden consultar con agregaciones de tiempo/espacio de tipo `SUM`

Si lo necesitas, puedes añadir otras agregaciones para tus consultas, pero debes tener en cuenta que el número de métricas personalizadas indexadas aumenta en función de las agregaciones que actives.

Más información sobre [Metrics without Limits™][3].

[1]: /es/metrics/types/?tab=count#metric-types
[2]: /es/metrics/types/?tab=rate#metric-types
[3]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Gauge" %}}
Para una métrica de GAUGE con el siguiente esquema de etiquetado, se envían **cuatro** combinaciones de valores únicos de etiquetas:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

De esta forma, la métrica `request.Latency` envía **cuatro métricas personalizadas**. 

### Consecuencias de añadir etiquetas

Añadir etiquetas **no necesariamente aumenta** el count de métricas personalizadas, que generalmente depende de la etiqueta más exhaustiva o detallada. Pongamos que quieres medir la temperatura en EE. UU. y que has etiquetado la métrica `temperature` por país (country) y región (region). Envías lo siguiente a Datadog:

| Nombre de la métrica   | Valores de la etiqueta                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Pongamos que quisieras añadir la etiqueta `city`, que tiene tres valores: `NYC`, `Miami` y `Orlando`. Al añadir esta etiqueta, aumenta el número de métricas personalizadas porque aporta más detalle y exhaustividad a tu conjunto de datos, como se indica a continuación:

| Nombre de la métrica   | Valores de la etiqueta                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

La cantidad de métricas personalizadas que envía la etiqueta `temperature` aumenta si se añade `city`, que es más exhaustiva.

Supongamos que también quisieras etiquetar tu métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). La temperatura se asociaría entonces a `country`, `region`, `state` y `city`. Ten en cuenta que añadir la etiqueta state no aumenta el nivel de exhaustividad que ya aporta la etiqueta city.

Para obtener la temperatura de Florida, puedes volver a combinar estas métricas personalizadas:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Cambiar el orden de los valores de las etiquetas no aporta especificidad. Las siguientes combinaciones pertenecen a la misma métrica personalizada:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurar etiquetas y agregaciones con Metrics without Limits™

Configurar etiquetas y agregaciones con [Metrics without Limits™][4] puede influir en el número de métricas personalizadas, ya que desvincula los costes de indexación y los de ingestión. Esto te permite seguir enviando a Datadog todos tus datos (que se ingieren) y especificar una lista de autorización de etiquetas que quieras conservar para que Datadog las pueda usar como consultables. Como la cantidad de datos ingeridos por Datadog para las métricas que has configurado es diferente a la cantidad restante inferior que has indexado, verás dos números independientes en la página Usage (Uso) y en la página Metrics Summary (Resumen de las métricas). 

- **Métricas personalizadas ingeridas**: el volumen original de métricas personalizadas según las etiquetas ingeridas (enviadas por el código).
- **Métricas personalizadas indexadas**: el volumen de métricas personalizadas de tipo consultable que queda en la plataforma de Datadog (en función de la configuración de Metrics without Limits™).

**Nota: Solo las métricas configuradas contribuyen al volumen de métricas personalizadas ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se te factura por su volumen de métrica personalizada indexada.

#### ¿Cuándo se te cobra por las métricas personalizadas ingeridas y cuándo por las métricas personalizadas indexadas?
Si no utilizas Metrics without Limits™ para configurar tus métricas, pagas por las métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(en función del número medio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas indexadas por host <br>- Enterprise: 200 métricas personalizadas por host                             |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato actual. |

Si usas Metrics without Limits™ para configurar tus métricas (etiquetas/agregaciones), pagas por las métricas personalizadas ingeridas y por las indexadas.

|                                      | Métricas personalizadas ingeridas                                                                           | Métricas personalizadas indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas ingeridas por host<br>- Enterprise: 200 métricas personalizadas ingeridas por host | - Pro: 100 métricas personalizadas indexadas por host<br>- Enterprise: 200 métricas personalizadas indexadas por host                               |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de la cuenta, pagas 0,10 $.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato actual. |

Por defecto, Datadog almacena la combinación de agregaciones que más se consulta en función del tipo de métrica para conservar la precisión matemática de la consulta asociada a la métrica que has configurado, como se muestra a continuación:

- Los gauges configurados se pueden consultar en agregaciones de tiempo/espacio de tipo `AVG/AVG`

Si lo necesitas, puedes añadir otras agregaciones para tus consultas, pero debes tener en cuenta que el número de métricas personalizadas indexadas aumenta en función de las agregaciones que actives.

Más información sobre [Metrics without Limits™][1].

[1]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histograma" %}}

**Una métrica de HISTOGRAMA genera por defecto cinco métricas personalizadas para cada una de las combinaciones únicas de nombre de métrica y valor de etiqueta** para las agregaciones del Agent `max`, `median`, `avg`, `95pc` y `count`. [Más información sobre el tipo de métrica de HISTOGRAMA][1].

Para una métrica de HISTOGRAMA con el siguiente esquema de etiquetado, se envían **cuatro** combinaciones de valores únicos de etiquetas:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Por defecto, el Agent genera cinco métricas personalizadas para cada una de las cuatro combinaciones de valores únicos de etiquetas, es decir, [una para cada agregación activada en el Agent][2]: `avg`, `count`, `median`, `95percentile` y `max`. Por tanto, `request.Latency` envía un total de **4 × 5 = 20 métricas personalizadas**.

**Nota**: Añadir agregaciones a la métrica de HISTOGRAMA aumenta la cantidad de métricas personalizadas diferentes que se envían. Por el contrario, si se eliminan, disminuye dicha cantidad.

- Configura qué agregación quieres enviar a Datadog con el parámetro `histogram_aggregates` en tu [archivo de configuración datadog.yaml][3]. Por defecto, solo las agregaciones `max`, `median`, `avg` y `count` se envían a Datadog. Si quieres, también puedes usar `sum` y `min`.
- Configura qué agregación de percentil quieres enviar a Datadog con el parámetro `histogram_percentiles` en tu [archivo de configuración datadog.yaml][3]. Por defecto, solo se envía el percentil 95 (`95percentile`).


[1]: /es/metrics/types/?tab=histogram#metric-types
[2]: /es/metrics/types/?tab=histogram#definition
[3]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribución" %}}

**Una métrica de DISTRIBUCIÓN genera por defecto cinco métricas personalizadas para cada una de las combinaciones únicas de nombre de métrica y de valor de etiqueta** para representar la distribución estadística de valores. Estas cinco métricas personalizadas representan las agregaciones del Agent `count`, `sum`, `min`, `max` y `avg`. [Más información sobre el tipo de métrica de DISTRIBUCIÓN][1].

Para una métrica de DISTRIBUCIÓN con el siguiente esquema de etiquetado, se envían **cuatro** combinaciones de valores únicos de etiquetas.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

La cantidad de métricas personalizadas que envía una [métrica de DISTRIBUCIÓN][1] corresponde a cinco veces la combinación única de nombre de métrica y valor de etiqueta. Por tanto, la métrica `request.Latency` envía un total de **5 × 4 = 20 métricas personalizadas**.

##### Añadir agregaciones de percentil

Puedes incluir agregaciones de percentil (`p50`, `p75`, `p90`, `p95` y `p99`) en tu métrica de DISTRIBUCIÓN. Al hacerlo, obtendrás cinco veces más combinaciones únicas de nombre de métrica y valor de etiqueta (**5 × 4 = 20 métricas personalizadas**). Por tanto, la cantidad total de métricas personalizadas generada por esta métrica con agregaciones de percentil es de **2 × (5 × 4) = 40 métricas personalizadas**.

Esta tabla resume el impacto producido al añadir agregaciones de percentil a una métrica de DISTRIBUCIÓN. 

| Métricas                                                                                   | Número de métricas personalizadas facturables |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Número de métricas personalizadas enviadas desde una distribución de base (count, sum, min, max, avg)         | `5*(tag value combinations)`      |
| Número de métricas personalizadas enviadas después de incluir agregaciones de percentil (p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| Total                                                                                     | `2*5(tag value combinations)`     |

### Configurar etiquetas con Metrics without Limits™

Configurar etiquetas y agregaciones con [Metrics without Limits™][2] puede influir en el número de métricas personalizadas, ya que desvincula los costes de indexación y los de ingestión. Esto te permite seguir enviando a Datadog todos tus datos (que se ingieren) y especificar una lista de autorización de etiquetas que quieras conservar para que Datadog las pueda usar como consultables. Como la cantidad de datos ingeridos por Datadog para las métricas que has configurado es diferente a la cantidad restante inferior que has indexado, verás dos números independientes en la página Usage (Uso) y en la página Metrics Summary (Resumen de las métricas). 

- **Métricas personalizadas ingeridas**: el volumen original de métricas personalizadas según las etiquetas ingeridas (enviadas por el código).
- **Métricas personalizadas indexadas**: el volumen de métricas personalizadas de tipo consultable que queda en la plataforma de Datadog (en función de la configuración de Metrics without Limits™).

**Nota: Solo las métricas configuradas contribuyen al volumen de métricas personalizadas ingeridas.** Si una métrica no está configurada con Metrics without Limits™, solo se te factura por su volumen de métrica personalizada indexada.

#### ¿Cuándo se te cobra por las métricas personalizadas ingeridas y cuándo por las métricas personalizadas indexadas?
Si no utilizas Metrics without Limits™ para configurar tus métricas, pagas por las métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(en función del número medio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas indexadas por host <br>- Enterprise: 200 métricas personalizadas por host                             |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato actual. |

Si usas Metrics without Limits™ para configurar tus métricas (etiquetas/agregaciones), pagas por las métricas personalizadas ingeridas y por las indexadas.

|                                      | Métricas personalizadas ingeridas                                                                           | Métricas personalizadas indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas ingeridas por host<br>- Enterprise: 200 métricas personalizadas ingeridas por host | - Pro: 100 métricas personalizadas indexadas por host<br>- Enterprise: 200 métricas personalizadas indexadas por host                               |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de la cuenta, pagas 0,10 $.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato actual. |

Supongamos que solo quieres mantener las etiquetas `endpoint` y `status` asociadas a la métrica `request.Latency`. Obtendrías estas tres combinaciones únicas de etiquetas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

El número de métricas personalizadas que envía una [métrica de DISTRIBUCIÓN][1} es cinco veces el número de combinaciones únicas de nombres de métrica y valores de etiqueta. Como resultado de la configuración de etiquetas, `request.Latency` envía un total de **5 × 3 = 15 métricas personalizadas indexadas**. Basándonos en las etiquetas enviadas inicialmente en esta métrica, el volumen de métricas personalizadas **ingeridas** en un principio para la métrica `request.Latency` es de **20 métricas personalizadas ingeridas**.

Más información sobre [Metrics without Limits™][2].

[1]: /es/metrics/types/?tab=distribution#definition
[2]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Mantener un seguimiento de las métricas personalizadas

Los usuarios con permisos de administración (es decir, los que tienen [roles de administrador de Datadog][7]) pueden ver el número medio mensual de métricas personalizadas **ingeridas** e **indexadas** por hora. La tabla de métricas personalizadas principales también incluye la media de métricas personalizadas **indexadas** de la [página de detalles de uso][8]. Consulta la documentación [sobre los detalles de uso][9] para obtener más información.

Si quieres hacer un seguimiento en tiempo real del count de métricas personalizadas para un nombre de métrica concreto, haz clic en el nombre de la métrica en la página [Metrics Summary][10]. Podrás ver el número de métricas personalizadas **ingeridas** e **indexadas** en el panel lateral de información de la métrica. 
{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested.jpg" alt="Panel lateral de Metrics Summary" style="width:80%;">}}


## Asignación

Se te asigna un número determinado de métricas personalizadas **ingeridas** e **indexadas** en función de tu plan de precios de Datadog:

- - Pro: 100 métricas personalizadas ingeridas y 100 métricas personalizadas indexadas por host.
- - Enterprise: 200 métricas personalizadas ingeridas y 200 métricas personalizadas indexadas por host.

Estas asignaciones se contabilizan en toda tu infraestructura. Por ejemplo, si tienes un plan Pro con licencia para 3 hosts, tendrás una asignación de 300 métricas personalizadas indexadas que podrán dividirse de forma equitativa entre todos los hosts o bien asignarse a uno solo. Tomando este ejemplo, la gráfica que aparece a continuación muestra ejemplos que no superan el count de métricas personalizadas asignado:

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Asignaciones para métricas personalizadas" >}}

La cantidad facturable de métricas personalizadas indexadas se basa en la cantidad media de métricas personalizadas (de todos los hosts de pago) por hora durante un mes determinado. La cantidad facturable de métricas personalizadas ingeridas solo aumenta si has utilizado Metrics without Limits™ para configurar tu métrica. Ponte en contacto con [Ventas][11] o con tu [asesor de clientes][12] para hablar sobre las métricas personalizadas de tu cuenta o comprar un paquete adicional de métricas.

## Integraciones estándar

Las siguientes integraciones estándar pueden generar métricas personalizadas.

| Tipo de integraciones                           | Integraciones                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Con límite predeterminado de 350 métricas personalizadas.      | [ActiveMQ XML][13] / [Go-Expvar][14] / [Java-JMX][15]                              |
| Sin límite predeterminado para la recopilación de métricas personalizadas. | [Nagios][16] /[PDH Check][17] /[OpenMetrics][18] /[Contadores de rendimiento de Windows][19] /[WMI][20] /[Prometheus][21] |
| Se puede configurar para recopilar métricas personalizadas.   | [MySQL][22] /[Oracle][23] /[Postgres][24] /[SQL Server][25]                        |
| Las métricas personalizadas se envían desde integraciones en la nube.    | [AWS][26]                                                                          |

## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][27].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu [asesor de clientes][12].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

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
[13]: /es/integrations/activemq/#activemq-xml-integration
[14]: /es/integrations/go_expvar/
[15]: /es/integrations/java/
[16]: /es/integrations/nagios/
[17]: /es/integrations/pdh_check/
[18]: /es/integrations/openmetrics/
[19]: /es/integrations/windows_performance_counters/
[20]: /es/integrations/wmi_check/
[21]: /es/integrations/prometheus
[22]: /es/integrations/mysql/
[23]: /es/integrations/oracle/
[24]: /es/integrations/postgres/
[25]: /es/integrations/sqlserver/
[26]: /es/integrations/amazon_web_services/
[27]: /es/help/