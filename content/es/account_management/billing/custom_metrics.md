---
algolia:
  tags:
  - facturación de métricas personalizadas
aliases:
- /es/integrations/faq/what-standard-integrations-emit-custom-metrics/
title: Facturación de métricas personalizadas
---

Si una métrica no se envía desde una de las [más de {{< translate key="integration_count" >}} integraciones de Datadog][1], se considera una [métrica personalizada][2]<sup>[(1)](#standard-integrations)</sup>.

**Una métrica personalizada se identifica de manera exclusiva mediante un nombre de métrica y valores de etiqueta (incluido la etiqueta de host)**. En términos generales, cualquier métrica que envías mediante [DogStatsD][3] o un [check personalizado del Agent][4] es una métrica personalizada.

El conteo facturable mensual de las métricas personalizadas (que se indica en la página de uso) se calcula en función del total de métricas personalizadas diferentes para cada hora de un mes concreto, que se divide entre el número de horas de ese mes para sacar el promedio.

Los usuarios de Metrics without LimitsTM ven volúmenes facturables mensuales para las métricas personalizadas _ingeridas_ e _indexadas_ en su página de uso. Más información sobre las métricas personalizadas ingeridas e indexadas y [Metrics without LimitsTM][5]. 

## Conteo de las métricas personalizadas

La cantidad de métricas personalizadas asociadas a un nombre de métrica determinado depende del [tipo de envío][6] de la métrica. A continuación encontrarás ejemplos de cómo contar tus métricas personalizadas en función de una serie de supuestos:

Supongamos que envías la métrica `request.Latency`, desde dos hosts (`host:A`,`host:B`), que mide la latencia de tus solicitudes de endpoint. Y la envías con dos claves de etiqueta:

- `endpoint`, con el valor `endpoint:X` o `endpoint:Y`.
- `status`, con el valor `status:200` o `status:400`.

Ahora supongamos que en tus datos, `endpoint:X` es compatible con ambos hosts, pero solo falla para `host:B`. Imaginemos también que las solicitudes a `endpoint:Y` siempre funcionan de manera correcta y solo aparecen para `host:B`, como se muestra a continuación:

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latencia de la solicitud" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate"%}}

Se emplea la misma lógica para calcular la cantidad de métricas personalizadas de [COUNT][1] y [RATE][2].

Para una métrica RATE con el siguiente esquema de etiquetado se envían **cuatro** combinaciones de valores únicos de etiqueta:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

De esta forma, la métrica `request.Latency` envía **cuatro métricas personalizadas**. 

### Consecuencias de añadir etiquetas

Añadir etiquetas **puede no** aumentar la cantidad de métricas personalizadas, que generalmente escala en función de la etiqueta más granular o de la que aporta más detalle. Supongamos que quieres medir la temperatura en EE. UU., y que has etiquetado la métrica `temperature` por país y región. Envías lo siguiente a Datadog:

| Nombre de la métrica   | Valores de etiqueta                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Supongamos que quisieras añadir la etiqueta `city`, que tiene tres valores: `NYC`, `Miami` y `Orlando`. Añadir esta etiqueta aumenta la cantidad de métricas personalizadas porque aporta más detalle y granularidad a tu conjunto de datos como se indica a continuación:

| Nombre de la métrica   | Valores de etiqueta                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

La cantidad de métricas personalizadas que envía `temperature` aumenta si se añade la etiqueta `city`, que es más granular.

Supongamos que también quieres etiquetar tu métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). De esta manera, la temperatura se asociaría a las etiquetas `country`, `region`, `state` y `city`. Ten en cuenta que añadir la etiqueta state (estado) no aumenta el nivel de granularidad que ya aporta la etiqueta city (ciudad).

Para obtener la temperatura en Florida, puedes volver a combinar las métricas personalizadas de:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Cambiar el orden de los valores de las etiquetas no aporta especificidad. Las siguientes combinaciones pertenecen a la misma métrica personalizada:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurar etiquetas y agregaciones con Metrics without LimitsTM

Configurar etiquetas y agregaciones con [Metrics without LimitsTM][3] puede influir en el número de métricas personalizadas ya que desvincula los costes de indexación e ingesta. Esto te permite seguir enviando a Datadog todos tus datos (que se ingieren) y especificar una lista de autorización de etiquetas que quieres conservar como consultables en la plataforma de Datadog. Como la cantidad de datos ingeridos por Datadog para tus métricas configuradas es diferente de la cantidad restante inferior que has indexado, verás dos números independientes en las páginas de uso y resumen de métricas. 

- **Métricas personalizadas ingeridas**: el volumen inicial de métricas personalizadas en función de las etiquetas ingeridas (enviadas a través de código)
- **Métricas personalizadas indexadas**: el volumen de métricas personalizadas de tipo consultable que queda en la plataforma de Datadog (en función de las configuraciones de Metrics without LimitsTM) 

**Nota: Solo las métricas configuradas contribuyen al volumen de métricas personalizadas ingeridas.** Si una métrica no se ha configurado con Metrics without LimitsTM, solo se te factura por su volumen de métricas personalizadas indexadas.

#### ¿Cuándo se te cobra por las métricas personalizadas ingeridas frente a las indexadas?
Si no utilizas Metrics without LimitsTM para configurar las métricas, pagas por las métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(en función de la cantidad promedio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas indexadas por host <br>- Enterprise: 200 métricas personalizadas por host                             |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato. |

Si utilizas Metrics without LimitsTM para configurar tus métricas (etiquetas/agregaciones configuradas), pagas por las métricas personalizadas ingeridas e indexadas.

|                                      | Métricas personalizadas ingeridas                                                                           | Métricas personalizadas indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas ingeridas por host<br>- Enterprise: 200 métricas personalizadas ingeridas por host | - Pro: 100 métricas personalizadas indexadas por host<br>- Enterprise: 200 métricas personalizadas indexadas por host                               |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de la cuenta, pagas 0,10 $.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato. |

Supongamos que quieres utilizar Metrics without LimitsTM para reducir el tamaño de tu métrica `request.Latency` manteniendo solo las etiquetas `endpoint` y `status`. Obtendrías estas tres combinaciones únicas de etiquetas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Como resultado de la configuración de etiquetas, `request.Latency` envía un total de **3 métricas personalizadas indexadas**. Basándonos en las etiquetas enviadas inicialmente en esta métrica, el volumen de métricas personalizadas **ingeridas** en un principio para la métrica `request.Latency` es de **4 métricas personalizadas ingeridas**.

De manera predeterminada, Datadog almacena la combinación de agregaciones que más se consulta en función del tipo de métrica para conservar la precisión matemática de consulta asociada a la métrica que has configurado.

- Los conteos/tasas de métricas se pueden consultar con agregaciones de tiempo/espacio de tipo `SUM`

Puedes añadir otras agregaciones si lo necesitas para tus consultas, pero debes tener en cuenta que la cantidad de métricas personalizadas indexadas aumenta en función de las agregaciones que habilites.

Más información sobre [Metrics without LimitsTM][3].

[1]: /es/metrics/types/?tab=count#metric-types
[2]: /es/metrics/types/?tab=rate#metric-types
[3]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Gauge" %}}
Para una métrica GAUGE con el siguiente esquema de etiquetado se envían **cuatro** combinaciones de valores únicos de etiqueta:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

De esta forma, la métrica `request.Latency` envía **cuatro métricas personalizadas**. 

### Consecuencias de añadir etiquetas

Añadir etiquetas **puede no** aumentar la cantidad de métricas personalizadas, que generalmente escala en función de la etiqueta más granular o de la que aporta más detalle. Supongamos que quieres medir la temperatura en EE. UU., y que has etiquetado la métrica `temperature` por país y región. Envías lo siguiente a Datadog:

| Nombre de la métrica   | Valores de etiqueta                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Supongamos que quieres añadir la etiqueta `city`, que tiene tres valores: `NYC`, `Miami` y `Orlando`. Añadir esta etiqueta aumenta la cantidad de métricas personalizadas porque aporta más detalle y granularidad a tu conjunto de datos como se indica a continuación:

| Nombre de la métrica   | Valores de etiqueta                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

La cantidad de métricas personalizadas que envía `temperature` aumenta si se añade la etiqueta `city`, que es más granular.

Supongamos que también quieres etiquetar tu métrica de temperatura por `state` (que tiene dos valores: `NY` y `Florida`). De esta manera, la temperatura se asociaría a `country`, `region`, `state` y `city`. Ten en cuenta que añadir la etiqueta state (estado) no aumenta el nivel de granularidad que ya aporta la etiqueta city (ciudad).

Para obtener la temperatura en Florida, puedes volver a combinar las métricas personalizadas de:

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Nota**: Cambiar el orden de los valores de las etiquetas no aporta especificidad. Las siguientes combinaciones pertenecen a la misma métrica personalizada:

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurar etiquetas y agregaciones con Metrics without LimitsTM

Configurar etiquetas y agregaciones con [Metrics without LimitsTM][4] puede influir en el número de métricas personalizadas ya que desvincula los costes de indexación e ingesta. Esto te permite seguir enviando a Datadog todos tus datos (que se ingieren) y especificar una lista de autorización de etiquetas que quieres conservar como consultables en la plataforma de Datadog. Como la cantidad de datos ingeridos por Datadog para tus métricas configuradas es diferente de la cantidad restante inferior que has indexado, verás dos números independientes en las páginas de uso y resumen de métricas. 

- **Métricas personalizadas ingeridas**: el volumen inicial de métricas personalizadas en función de las etiquetas ingeridas (enviadas a través de código)
- **Métricas personalizadas indexadas**: el volumen de métricas personalizadas de tipo consultable que queda en la plataforma de Datadog (en función de las configuraciones de Metrics without LimitsTM) 

**Nota: Solo las métricas configuradas contribuyen al volumen de métricas personalizadas ingeridas.** Si una métrica no se ha configurado con Metrics without LimitsTM, solo se te factura por su volumen de métricas personalizadas indexadas.

#### ¿Cuándo se te cobra por las métricas personalizadas ingeridas frente a las indexadas?
Si no utilizas Metrics without LimitsTM para configurar tus métricas, pagas por las métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(en función de la cantidad promedio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas indexadas por host <br>- Enterprise: 200 métricas personalizadas por host                             |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato. |

Si utilizas Metrics without LimitsTM para configurar tus métricas (etiquetas/agregaciones configuradas), pagas por las métricas personalizadas ingeridas e indexadas.

|                                      | Métricas personalizadas ingeridas                                                                           | Métricas personalizadas indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas ingeridas por host<br>- Enterprise: 200 métricas personalizadas ingeridas por host | - Pro: 100 métricas personalizadas indexadas por host<br>- Enterprise: 200 métricas personalizadas indexadas por host                               |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de la cuenta, pagas 0,10 $.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato. |

De manera predeterminada, Datadog almacena la combinación de agregaciones que más se consulta en función del tipo de métrica para conservar la precisión matemática de consulta asociada a la métrica que has configurado según se indica a continuación:

- Los medidores configurados son consultables en agregaciones de tiempo/espacio de `AVG/AVG`

Puedes añadir otras agregaciones si lo necesitas para tus consultas, pero debes tener en cuenta que la cantidad de métricas personalizadas indexadas aumenta en función de las agregaciones que habilites.

Más información sobre [Metrics without LimitsTM][1].

[1]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histogram" %}}

**Una métrica HISTOGRAM genera de manera predeterminada cinco métricas personalizadas para cada una de las combinaciones únicas de nombre de métrica y valores de etiqueta** para las agregaciones del Agent `max`, `median`, `avg`, `95pc` y `count`. [Más información sobre el tipo de métrica HISTOGRAM][1].

Para una métrica HISTOGRAM con el siguiente esquema de etiquetado se envían **cuatro** combinaciones de valores únicos de etiqueta:

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

De manera predeterminada, el Agent genera cinco métricas personalizadas para cada una de las cuatro combinaciones de valores únicos de etiqueta; [una para cada agregación habilitada en el Agent][2]: `avg`, `count`, `median`, `95percentile` y `max`. Por lo tanto, `request.Latency` envía un total de **4 x 5 = 20 métricas personalizadas**.

**Nota**: Añadir agregaciones a la métrica HISTOGRAM aumenta la cantidad de métricas personalizadas que se envían. Por el contrario, si se eliminan, disminuye dicha cantidad.

- Configura qué agregación quieres enviar a Datadog con el parámetro `histogram_aggregates` en tu [archivo de configuración datadog.yaml][3]. De manera predeterminada, solo las agregaciones `max`, `median`, `avg` y `count` se envían a Datadog. Si quieres, también puedes utilizar `sum` y `min`.
- Configura qué agregación de percentil quieres enviar a Datadog con el parámetro `histogram_percentiles` en tu [archivo de configuración datadog.yaml][3]. De manera predeterminada, solo se envía el percentil 95 (`95percentile`) a Datadog.


[1]: /es/metrics/types/?tab=histogram#metric-types
[2]: /es/metrics/types/?tab=histogram#definition
[3]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribution" %}}

**Una métrica DISTRIBUTION genera de manera predeterminada cinco métricas personalizadas para cada una de las combinaciones únicas de nombre de métrica y valores de etiqueta** para representar la distribución estadística general de los valores. Estas cinco métricas personalizadas representan las agregaciones del Agent `count`, `sum`, `min`, `max` y `avg`. [Más información sobre el tipo de métrica DISTRIBUTION][1].

Para una métrica DISTRIBUTION con el siguiente esquema de etiquetado se envían **cuatro** combinaciones de valores únicos de etiqueta.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

La cantidad de métricas personalizadas que envía una [métrica DISTRIBUTION][1] corresponde a cinco veces la combinación única de nombre de métrica y valores de etiqueta. Por lo tanto, la métrica `request.Latency` envía un total de **5 x 4 = 20 métricas personalizadas**.

##### Adición de agregaciones de percentil

Puedes incluir agregaciones de percentil (`p50`, `p75`, `p90`, `p95` y `p99`) en tu métrica de distribución. Al hacerlo, obtendrás un volumen adicional de cinco veces la combinación única de nombre de métrica y valores de etiqueta (**5 x 4 = 20 métricas personalizadas**). Por lo tanto, la cantidad total de métricas personalizadas que genera esta métrica con agregaciones de percentil es de **2 x (5 x 4) = 40 métricas personalizadas**.

En esta tabla se resume el impacto de añadir agregaciones de percentil a una métrica de distribución. 

| Métricas                                                                                   | Cantidad de métricas personalizadas facturables |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Cantidad de métricas personalizadas enviadas desde una distribución de base (count, sum, min, max, avg)         | `5*(tag value combinations)`      |
| Cantidad de métricas personalizadas enviadas después de incluir agregaciones de percentil (p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| Total                                                                                     | `2*5(tag value combinations)`     |

### Configurar etiquetas con Metrics without LimitsTM

Configurar etiquetas y agregaciones con [Metrics without LimitsTM][2] puede influir en el número de métricas personalizadas ya que desvincula los costes de indexación e ingesta. Esto te permite seguir enviando a Datadog todos tus datos (que se ingieren) y especificar una lista de autorización de etiquetas que quieres conservar como consultables en la plataforma de Datadog. Como la cantidad de datos ingeridos por Datadog para tus métricas configuradas es diferente de la cantidad restante inferior que has indexado, verás dos números independientes en las páginas de uso y resumen de métricas. 

- **Métricas personalizadas ingeridas**: el volumen inicial de métricas personalizadas en función de las etiquetas ingeridas (enviadas a través de código)
- **Métricas personalizadas indexadas**: el volumen de métricas personalizadas de tipo consultable que queda en la plataforma de Datadog (en función de las configuraciones de Metrics without LimitsTM) 

**Nota: Solo las métricas configuradas contribuyen al volumen de métricas personalizadas ingeridas.** Si una métrica no se ha configurado con Metrics without LimitsTM, solo se te factura por su volumen de métricas personalizadas indexadas.

#### ¿Cuándo se te cobra por las métricas personalizadas ingeridas frente a las indexadas?
Si no utilizas Metrics without LimitsTM para configurar tus métricas, pagas por las métricas personalizadas indexadas.

|                                      | Métricas personalizadas indexadas<br>(en función de la cantidad promedio mensual de métricas personalizadas por hora)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas indexadas por host <br>- Enterprise: 200 métricas personalizadas por host                             |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato. |

Si utilizas Metrics without LimitsTM para configurar tus métricas (etiquetas/agregaciones configuradas), pagas por las métricas personalizadas ingeridas e indexadas.

|                                      | Métricas personalizadas ingeridas                                                                           | Métricas personalizadas indexadas                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Asignación de la cuenta                    | - Pro: 100 métricas personalizadas ingeridas por host<br>- Enterprise: 200 métricas personalizadas ingeridas por host | - Pro: 100 métricas personalizadas indexadas por host<br>- Enterprise: 200 métricas personalizadas indexadas por host                               |
| Uso superior a la asignación de la cuenta | Por cada 100 métricas personalizadas ingeridas por encima de la asignación de la cuenta, pagas 0,10 $.                   | Por cada 100 métricas personalizadas indexadas por encima de la asignación de la cuenta, pagas la cantidad que se especifica en tu contrato. |

Supongamos que solo quieres mantener las etiquetas `endpoint` y `status` asociadas a la métrica `request.Latency`. Obtendrías estas tres combinaciones únicas de etiquetas:

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

La cantidad de métricas personalizadas que envía una [métrica DISTRIBUTION][1] es cinco veces el número de combinaciones únicas de nombre de métrica y valores de etiqueta. Como resultado de la configuración de etiquetas, `request.Latency` envía un total de **5 x 3 = 15 métricas personalizadas indexadas**. Basándonos en las etiquetas enviadas inicialmente en esta métrica, el volumen de métricas personalizadas **ingeridas** en un principio para la métrica `request.Latency` es de **20 métricas personalizadas ingeridas**.

Más información sobre [Metrics without LimitsTM][2].

[1]: /es/metrics/types/?tab=distribution#definition
[2]: /es/metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Seguimiento de las métricas personalizadas

Los usuarios administradores (los que tienen [roles de administración de Datadog][7]) pueden ver la cantidad promedio mensual de métricas personalizadas **ingeridas** e **indexadas** por hora. La tabla de métricas personalizadas principales también incluye la cantidad promedio de métricas personalizadas **indexadas** de la [página de detalles de uso][8]. Consulta la documentación sobre los [detalles de uso][9] para obtener más información.

Si quieres realizar un seguimiento en tiempo real de la cantidad de métricas personalizadas de un nombre de métrica en particular, haz clic en el nombre de la métrica en la [página de resumen de métricas][10]. Podrás ver la cantidad de métricas personalizadas **ingeridas** e **indexadas** en el panel lateral de detalles de la métrica. 
{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested.jpg" alt="Panel lateral de resumen de métricas" style="width:80%;">}}


## Asignación

Se te asigna una cantidad determinada de métricas personalizadas **ingeridas** e **indexadas** en función de tu plan de precios de Datadog:

- Pro: 100 métricas personalizadas ingeridas y 100 métricas personalizadas indexadas por host.
- Enterprise: 200 métricas personalizadas ingeridas y 200 métricas personalizadas indexadas por host.

Estas asignaciones se calculan para el conjunto completo de tu infraestructura. Por ejemplo, si tienes un plan Pro con licencia para tres hosts, tendrás una asignación de 300 métricas personalizadas indexadas que se podrán dividir de forma equitativa entre los hosts o asignarse a uno solo. Tomando este ejemplo, en la siguiente gráfica se muestran ejemplos que no superan la cantidad de métricas personalizadas asignada:

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Asignaciones para métricas personalizadas" >}}

La cantidad facturable de métricas personalizadas indexadas se basa en la cantidad promedio de métricas personalizadas (de todos los hosts de pago) por hora durante un mes determinado. La cantidad facturable de métricas personalizadas ingeridas solo aumenta si has utilizado Metrics without LimitsTM para configurar tu métrica. Ponte en contacto con [Ventas][11] o con tu [asesor de clientes][12] para hablar sobre las métricas personalizadas de tu cuenta o comprar un paquete de métricas adicional.

## Integraciones estándar

Las siguientes integraciones estándar podrían generar métricas personalizadas.

| Tipo de integraciones                           | Integraciones                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Límite predeterminado de 350 métricas personalizadas.      | [ActiveMQ XML][13] / [Go-Expvar][14] / [Java-JMX][15]                              |
| Sin límite predeterminado para la recopilación de métricas personalizadas. | [Nagios][16] /[Check de PDH][17] /[OpenMetrics][18] /[Contadores de rendimiento de Windows][19] /[WMI][20] /[Prometheus][21] |
| Se puede configurar para recopilar métricas personalizadas.   | [MySQL][22] /[Oracle][23] /[Postgres][24] /[SQL Server][25]                        |
| Las métricas personalizadas se envían desde integraciones en la nube.    | [AWS][26]                                                                          |

## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][27].

Si tienes alguna pregunta sobre la facturación, ponte en contacto con tu [asesor de clientes][12].

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