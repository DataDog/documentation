---
aliases:
- /es/account_management/billing/profiler/
- /es/account_management/billing/apm_distributed_tracing/
- /es/account_management/billing/apm_tracing_profiling/
title: Facturación de APM
---
APM está disponible a través de tres niveles: APM, APM Pro y APM Enterprise. APM le brinda una visibilidad profunda de sus aplicaciones, con capacidades de trazado distribuido, correlación fluida entre trazas, registros y otra telemetría, y paneles de rendimiento listos para usar para su servicio. Con Continuous Profiler en APM Enterprise, puede identificar los métodos más lentos y de mayor consumo de recursos, de forma agregada a nivel de servicio y punto de conexión, así como para cada traza distribuida. Con Data Streams Monitoring (DSM) en APM Pro y APM Enterprise, puede monitorear fácilmente el rendimiento integral de sus canalizaciones de transmisión de datos y aplicaciones impulsadas por eventos que utilizan Kafka, SQS y RabbitMQ.


| Parámetro de facturación  | Precio                                      | Tramos ingeridos e indexados                                                                 | Facturación                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [APM host][5]      | $31 per underlying [APM host][5] per month | 1 millón de tramos indexados y 150 GB de tramos ingeridos incluidos por mes con cada [APM host].   | Datadog registra la cantidad de [APM hosts][5] que monitorea simultáneamente en el servicio de Datadog APM una vez por hora. En un plan de marca de agua alta (HWMP), estas mediciones por hora se ordenan de mayor a menor al final del mes, y Datadog realiza el cobro basándose en la novena medición más alta. El mes de febrero es una excepción y Datadog realiza el cobro basándose en la octava medición más alta. [Más información sobre precios de APM.][5] |
| APM Pro (APM host with Data Streams Monitoring) | $35 per underlying [APM host][5]. Incluye Data Streams Monitoring. | Igual que [APM host] | Datadog registra la cantidad de [APM hosts] únicos en el servicio de Datadog APM y los [DSM hosts] únicos que monitorea simultáneamente una vez por hora. Las mediciones por hora y la facturación de APM Pro se realizan de la misma manera que para [APM hosts].  |
| APM Enterprise (APM host with Data Streams Monitoring y [Continuous Profiler])[6] | $40 per underlying [APM host][5]. Incluye Data Streams Monitoring y [Continuous Profiler][6] con cuatro contenedores perfilados por [APM host] al mes. | Igual que [APM host] | Datadog registra la cantidad de [APM hosts] únicos en el servicio de APM, [DSM hosts] únicos y [Continuous Profiler hosts] únicos que monitorea simultáneamente una vez por hora. Las mediciones por hora y la facturación de APM Enterprise se realizan de la misma manera que para [APM hosts]. |
| [Fargate][4]       | $6 per concurrent task per month              | 195,000 tramos indexados y 30 GB de tramos ingeridos incluidos en el precio.              | Datadog registra la cantidad de instancias de tareas que está monitoreando en el servicio Datadog APM en intervalos de cinco minutos. Datadog agrega las mediciones basadas en intervalos al final del mes y le cobra según la cantidad promedio de horas que se ejecutaron y monitorearon sus aplicaciones. [Más información sobre precios de Fargate.][16]              |
| [Tramo indexado][5] | $1.70 per million Indexed Spans per month | Se factura cuando el uso excede los tramos indexados incluidos con cada [APM host] | Un tramo indexado es una solicitud individual contra un servicio individual en su stack. Datadog cobra según la cantidad total de tramos indexados con filtros de retención o tramos analizados heredados en el servicio Datadog APM al final del mes. [Más información sobre precios de APM.][5]                                                                                          |
| [Tramo ingerido][5] | $0.10 por GB de tramos ingeridos al mes | Se factura cuando el uso excede los tramos ingeridos incluidos con cada [APM host] | Un tramo ingerido es una solicitud individual contra un servicio individual en su stack. Datadog cobra según la cantidad total de gigabytes de tramos ingeridos a Datadog al final del mes. [Más información sobre precios de APM.][5]                                                                                          |

**Notas**:  
   - Si utiliza un entorno basado en contenedores que no sea Fargate, se le facturará por el [APM host] subyacente que implementa el Datadog Agent.
   - Un contenedor perfilado es un contenedor que ejecuta el servicio Continuous Profiler. Esto no incluye los contenedores que no se están perfilando. Por ejemplo, un contenedor de servicio DNS que NO está perfilado, ejecutándose simultáneamente con su contenedor de aplicación que SÍ está perfilado, no se cuenta para la asignación de cuatro contenedores de perfilador.
   - [Universal Service Monitoring][15] está incluido en todos los niveles de APM (APM, APM Pro, APM Enterprise) sin costo adicional.

Para obtener más información, consulte la [página de precios][7].

## Database Monitoring {#database-monitoring}

| Parámetro de facturación  | Consultas normalizadas                | Facturación                                          |
|--------------------|-----------------------------------|--------------------------------------------------|
| Servidor de base de datos      | Se incluyen 200 consultas normalizadas por mes con cada servidor de base de datos. | Datadog registra la cantidad de servidores de base de datos que monitorea simultáneamente con Database Monitoring una vez por hora. En un plan de marca de agua alta (HWMP), estas mediciones por hora se ordenan de mayor a menor al final del mes, y Datadog realiza el cobro basándose en la novena medición más alta. El mes de febrero es una excepción y Datadog realiza el cobro basándose en la octava medición más alta. |
| Consultas normalizadas | Se factura cuando el umbral configurado excede las consultas normalizadas que se incluyen con cada servidor de base de datos. | Una _consulta normalizada_ representa un agregado de consultas con estructura similar, que solo difieren en los parámetros de consulta. Datadog cobra según la cantidad total de consultas normalizadas configuradas que se rastrean en cualquier momento dado. |

Para obtener más información, consulte la [página de precios][7].

## Escenarios de implementación {#deployment-scenarios}

**Los casos de muestra ilustran las tasas de facturación anual con la retención predeterminada de 15 días de Indexed Span. Comuníquese con [Ventas][8] o con su gerente de [Éxito del cliente][9] para analizar los descuentos por volumen para su cuenta.**

### [APM hosts], tramos indexados y tramos ingeridos adicionales {#apm-hosts-indexed-spans-and-extra-ingested-spans}

Uso de 5 [APM hosts] y envío de 30 millones de tramos indexados, con 900 GB de tramos ingeridos en total.

| Unidad facturable  | Cantidad   | Precio                                                                                           | Fórmula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| [APM hosts]      | 5          | $31 per host                                                                                    | 5 * $31       | $155                  |
| Tramos indexados | 30 millones | 5 millones incluidos con 5 [APM hosts]. $1.70 por millón para 25 millones adicionales de tramos indexados | 25 * $1.70    | $42.50                |
| Tramos ingeridos | 900 GB          | 750 GB incluidos con 5 [APM hosts]. $.10 por GB para 150 GB adicionales de tramos ingeridos.                                                                                 | 150 * $.10      | $15                  |
| Total          |            |                                                                                                 | $155 + $42.50 + $15 | **$212.50 por mes** |

### [APM Pro hosts], tramos indexados y tramos ingeridos adicionales {#apm-pro-hosts-indexed-spans-and-extra-ingested-spans}

Uso de cinco servidores de APM Pro y envío de 30 millones de spans indexados, con 900 GB de spans ingeridos en total.

| Unidad facturable  | Cantidad   | Precio                                                                                           | Fórmula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Servidores de APM Pro      | 5          | $35 por host                                                                                    | 5 * $35       | $175                  |
| Tramos indexados | 30 millones | 5 millones incluidos con 5 [APM hosts]. $1.70 por millón para 25 millones adicionales de tramos indexados | 25 * $1.70    | $42.50                |
| Tramos ingeridos | 900 GB          | 750 GB incluidos con 5 [APM hosts]. $.10 por GB para 150 GB adicionales de tramos ingeridos.                                                                                 | 150 * $.10      | $15                  |
| Total          |            |                                                                                                 | $175 + $42.50 + $15 | **$232.50 por mes** |

### Servidores de APM Enterprise con seis contenedores perfilados por servidor {#apm-enterprise-hosts-with-six-profiled-containers-per-host}

Uso de cinco servidores de APM Enterprise con seis aplicaciones ejecutándose en contenedores separados por cada servidor.

| Unidad facturable  | Cantidad   | Precio                                                                                           | Fórmula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Servidores de APM Enterprise       | 5          | $40 por host                                                                                    | 5 * $40       | $200                  |
| Contenedores perfilados  | 6 por host | $2 por contenedor adicional por host. En este caso hay 6 - 4 = 2 contenedores adicionales por cada servidor        | 2  * $2 * 5 servidores         | $20                   |
| Total          |            |                                                                                                 | $200 + $20      | **$220 por mes**    |

### Servidores de APM, Fargate y spans indexados {#apm-hosts-fargate-and-indexed-spans}

Uso de cinco servidores de APM, envío de 20 millones de spans indexados y despliegue de APM en un promedio de 20 tareas de Fargate durante el mes.

| Unidad facturable  | Cantidad   | Precio                                                                                           | Fórmula             | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| Servidores de APM      | 5          | $31 por servidor                                                                                    | 5 * $31             | $155                  |
| Tareas de Fargate  | 20         | $6 por tarea                                                                                     | 20 * $6             | $120                   |
| Spans indexados | 20 millones | 5 millones incluidos con 5 hosts de APM. 1.3 millones incluidos con 20 tareas de Fargate. $1.70 por millón por 13.7 millones de Spans indexados adicionales | 13.7 * $1.70          | $23.29                |
| Total          |            |                                                                                                 | $155 + $120 + $23.29 | **$298.29 por mes** |

### Servidores de APM Enterprise, servicios, contenedores y spans indexados {#apm-enterprise-hosts-services-containers-and-indexed-spans}

APM Enterprise para el servicio 1 ejecutándose en el contenedor 1, servicio 2 ejecutándose en el contenedor 2. Ambos contenedores se ejecutan en un servidor y envían 20 millones de spans indexados en App Analytics. 

| Unidad facturable  | Cantidad   | Precio                                                                                          | Fórmula      | Subtotal             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| Servidores de APM Enterprise      | 1          | $40 por servidor                                                                                   | 1 * $40      | $40                  |
| Contenedores perfilados  | 2 | $0 ya que los contenedores perfilados están dentro de la asignación de 4 por servidor de APM.
| Spans indexados | 20 millones | 1 millón incluido con 1 servidor de APM. $1.70 por millón por 19 millones de Spans indexados adicionales | 19 * $1.70   | $32.30               |
| Total          |            |                                                                                                | $40 + $32.30 | **$72.30 por mes** |

### Servidores de APM con escalado dinámico, contenedores, Fargate y sin spans indexados {#apm-hosts-with-dynamic-scaling-containers-fargate-and-no-indexed-spans}

App 1 ejecutándose en 20-40 contenedores que están implementados en 4-8 instancias de servidor, app 2 ejecutándose en 10-30 tareas de Fargate. Suponiendo que el uso del percentil 99 de las instancias de EC2 es 7, y el promedio de tareas de Fargate durante el mes es 28.

| Unidad facturable | Cantidad | Precio        | Fórmula    | Subtotal           |
|---------------|----------|--------------|------------|--------------------|
| Servidores de APM     | 7        | $31 por host | 7 * $31    | $217               |
| Tareas de Fargate | 28       | $6 por tarea  | 28 * $6    | $168                |
| Total         |          |              | $217 + $168 | **$385 por mes** |

**Nota**: El recuento de contenedores no importa si el Agent implementado está en las instancias EC2.

### Servidores de APM Enterprise con nodos de Kubernetes y spans indexados {#apm-enterprise-hosts-with-kubernetes-nodes-and-indexed-spans}

APM Enterprise para aplicaciones con un Datadog Agent ejecutándose en 20 nodos trabajadores en Kubernetes que envían 20 millones de spans indexados. 10 de estos nodos trabajadores tienen ocho pods cada uno con un contenedor por pod, los otros 10 tienen dos pods cada uno con un contenedor por pod. 

| Unidad facturable     | Cantidad   | Precio                                                                       | Fórmula   | Subtotal           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Servidores de APM Enterprise (nodos) | 20         | $40 por host                                                                | 20 * $40 | $800               |
| Contenedores perfilados  | 100 en total | $2 por contenedor adicional. En este caso, 20 servidores permitirían hasta 80 contenedores, pero hay 100 contenedores sumados en dos servidores: 100-80 = 20 contenedores adicionales        | $2 * 20 servidores        | $40                    |
| Spans indexados    | 20 millones | 20 millones incluidos con 20 servidores (nodos) de APM. Sin spans indexados adicionales | 0 * $1.70 | 0                  |
| Total             |            |                                                                             | $800 + $40 | **$840 por mes** |

Para Kubernetes, APM y Continuous Profiler se cobran por nodos, no por pods.

### Funciones Lambda y spans indexados {#lambda-functions-and-indexed-spans}

Una aplicación sin servidor basada en AWS-Lambda que se invoca 10 millones de veces al mes mientras envía 10 millones de spans indexados.

| Unidad facturable                  | Cantidad   | Precio                                                                       | Fórmula   | Subtotal           |
|--------------------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Invocaciones de funciones Lambda    | 10 millones | [$5 por mes][10]                                                           | 10 * $5  | $50               |
| Spans indexados                  | 10 millones | 150,000 Spans indexados incluidos con cada 1 millón de invocaciones de Lambda. $1.70 por millón de Spans indexados adicionales | 8.5 * $1.70 | $14.45               |
| Total                          |            |                                                                             | $50 + $14.45 | **$64.45 por mes** |

## APM Edge Devices {#apm-edge-devices}

APM Edge Devices es una opción de facturación para monitorear dispositivos Edge y dispositivos IoT con APM, como sistemas de punto de venta (POS), dispositivos médicos, vehículos autónomos y sistemas industriales. APM Edge Devices es el mismo producto de APM que la facturación de APM estándar, con un modelo de facturación diseñado para flotas del dispositivo Edge y del dispositivo IoT. Para conocer los precios, comuníquese con [Sales][8] o con su [Customer Success Manager][9].

APM Edge Devices requiere la versión 7.75.0 o posterior del Datadog Agent estándar. El [Datadog IoT Agent][17] no es compatible con APM.

Para identificar un dispositivo como un dispositivo APM Edge, configure el Datadog Agent para que se ejecute en modo APM Edge con uno de los siguientes métodos:

- Establezca la variable de entorno `DD_APM_MODE` en `edge`:

  ```shell
  DD_APM_MODE=edge
  ```

- Agregue lo siguiente al archivo de configuración `datadog.yaml` del Agent:

  ```yaml
  apm_config:
    mode: edge
  ```

**Nota**: APM Edge Devices no es compatible con OpenTelemetry. Comuníquese con [Sales][8] o con su [Customer Success Manager][9] si sus dispositivos Edge o dispositivos IoT requieren instrumentación de OpenTelemetry.

## PREGUNTAS FRECUENTES {#faq}

**1. ¿Qué se clasifica como un servidor de APM para la facturación?**

Un [servidor][4] es una instancia de sistema operativo física o virtual. Datadog registra la cantidad de servidores que está monitoreando simultáneamente en el servicio Datadog Infrastructure una vez por hora. Para la facturación de APM, la cantidad de servidores con [APM instalado][12] y que envían trazas se calcula cada hora. Al final del mes, se le factura según su uso en el percentil 99 para [servidores APM][5].

**2. ¿Cómo se calcula la facturación al implementar un Agent por contenedor?**

Se recomienda que configure _un Agent por servidor subyacente_ para la implementación de contenedores. Si elige en su lugar ejecutar un Agent por contenedor, entonces cada contenedor se trata como un solo servidor. El precio es entonces (Precio por servidor APM) * (Número de contenedores).

**3. ¿Qué se clasifica como una tarea de APM Fargate para la facturación?**

Una tarea de Fargate es una colección de contenedores que están programados para ejecutarse en AWS Fargate como un motor de cómputo sin servidor. Datadog registra la cantidad de tareas que está monitoreando simultáneamente en Datadog a intervalos de cinco minutos. Para la facturación de APM, Datadog factura según el número promedio de tareas de Fargate que envían trazas a Datadog por hora durante todo el mes de su cuenta.

**4. ¿Qué sucede con su factura al escalar su entorno?**

Su factura de APM se calcula utilizando el percentil 99 superior de agentes activos que envían trazas cada hora de cada mes. Al final del mes, Datadog descarta el valor del 1% superior, lo que brinda protección contra la facturación por picos inesperados.

**5. ¿Se le cobra por los contenedores de pausa en Kubernetes?**

Kubernetes crea contenedores de pausa para adquirir la dirección IP del pod respectivo y configurar el espacio de nombres de red para todos los demás contenedores que se unen a ese pod. Datadog excluye todos los contenedores de pausa de su cuota y no cobra por ellos (requiere Agent 5.8+). Para Kubernetes, el precio de APM se basa en nodos, no en pods.

**6. ¿Cómo se relaciona la facturación de servidores con sus servicios?**

APM se factura sobre la base de [servidores][5] implementados con Agents que envían trazas y no de servicios. Además, por encima de la asignación mensual por servidor, APM se factura sobre la base del volumen de spans ingeridos y el recuento de spans indexados. Para estimar cuántos spans ingeridos e indexados envía cada uno de sus servicios, consulte la documentación sobre [ingestion][2] y [retention][13].

**7. ¿Qué sucede con sus filtros de App Analytics existentes?**

A partir del 20 de octubre de 2020, todos los filtros de App Analytics existentes se transfieren automáticamente a Retention Filters. Puede dejar que los filtros permanezcan sin cambios o modificarlos según sea necesario. Los filtros transferidos están marcados con una *i* que representa Legacy App Analytics Filters dentro de la página [retention filters][3].

**8. ¿Cómo estima su volumen de spans ingeridos o indexados?**

Datadog proporciona las métricas `datadog.estimated_usage.apm.ingested_bytes` y `datadog.estimated_usage.apm.ingested_spans` para monitorear el volumen de spans ingeridos e indexados. Hay más información disponible en la documentación de [Usage Metrics][14].

**9. ¿Continuous Profiler está disponible como un producto independiente?**

Sí Hágale saber a Datadog si le interesa comprar Continuous Profiler sin APM. Comuníquese con [Sales][8] o con su [Customer Success Manager][9].

**10. ¿Data Streams Monitoring está disponible como un producto independiente?**

Sí Hágale saber a Datadog si le interesa comprar Data Streams Monitoring sin APM. Comuníquese con [Sales][8] o con su [Customer Success Manager][9].


## Lecturas adicionales {#further-reading}

{{< whatsnext >}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}Visualizar y alertar sobre el uso de APM{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Estimar y controlar el uso de APM{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /es/tracing/
[2]: /es/tracing/trace_pipeline/ingestion_controls
[3]: /es/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /es/account_management/billing/pricing/#infrastructure-monitoring
[5]: /es/account_management/billing/pricing/#apm
[6]: /es/profiler/
[7]: https://www.datadoghq.com/pricing/
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
[10]: /es/account_management/billing/serverless/#serverless-functions
[11]: /es/account_management/billing/
[12]: /es/tracing/trace_collection/dd_libraries/
[13]: /es/tracing/trace_pipeline/trace_retention/
[14]: /es/tracing/trace_pipeline/metrics
[15]: /es/universal_service_monitoring/
[16]: https://www.datadoghq.com/pricing/?product=serverless-monitoring&tab=aws-fargate#products
[17]: /es/agent/iot/