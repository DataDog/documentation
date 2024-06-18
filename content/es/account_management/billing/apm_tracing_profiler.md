---
aliases:
- /es/account_management/billing/profiler/
- /es/account_management/billing/apm_distributed_tracing/
- /es/account_management/billing/apm_tracing_profiling/
title: Facturación de APM
---

APM está disponible en tres niveles: APM, APM Pro y APM Enterprise. APM te ofrece una amplia visibilidad de tus aplicaciones, con funciones de rastreo distribuido, correlación fluida entre trazas, logs y otros datos telemétricos, y dashboards de rendimiento inmediato para tu servicio. Con Continuous Profiler en APM Enterprise, puedes identificar los métodos más lentos y con mayor consumo de recursos, además de los niveles de servicio y de endpoint, así como cada traza distribuida. Con Data Streams Monitoring (DSM) en APM Pro y APM Enterprise, puedes realizar un seguimiento fácilmente del rendimiento de extremo a extremo de tus pipelines de flujos de datos y aplicaciones activadas por eventos que utilizan Kafka y RabbitMQ.


| Parámetro de facturación  | Precio                                      | Tramos ingeridos e indexados                                                                 | Facturación                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Host de APM][5]      | 31 $ por [host de APM][5] subyacente al mes | 1 millón de tramos indexados y 150 GB de tramos ingeridos incluidos al mes con cada host de APM.   | Datadog registra el número de [hosts APM][5] que monitorizas simultáneamente en el servicio APM de Datadog una vez por hora. En un plan de marca de agua elevada (HWMP), estas mediciones horarias se ordenan de mayor a menor al final del mes, y Datadog cobra en función de la novena medición más alta. El mes de febrero es una excepción y Datadog cobra en función de la octava medición más alta. [Obtener más información sobre los precios de APM][5]. |
| APM Pro (host de APM con Data Streams Monitoring) | 35 $ por cada [host de APM][5] subyacente. Incluye Data Streams Monitoring. | Igual que el host de APM | Datadog registra una vez por hora el número de hosts de APM individuales que hay en el servicio APM de Datadog, así como los hosts de DSM individuales que estás monitorizando de forma simultánea. Las mediciones por hora y la facturación de APM Pro se realizan del mismo modo que para los hosts de APM.  |
| APM Enterprise (host de APM con Data Streams Monitoring y [Continuous Profiler)][6] | 40 $ por cada [host de APM][5]. Incluye Data Streams Monitoring y [Continuous Profiler][6] con 4 contenedores perfilados por host al mes. | Igual que el host de APM | Datadog registra una vez por hora el número de hosts de APM individuales que hay en el servicio APM, así como los hosts de Continuous Profiler individuales que estás monitorizando de forma simultánea. Las mediciones por hora y la facturación de APM Enterprise se realizan del mismo modo que para los hosts de APM. |
| [Fargate][4]       | APM: 2 $ por tarea simultánea por mes <br> APM Pro: 2,30 $ por tarea simultánea por mes <br> APM Enterprise: 2,60 $ por tarea simultánea por mes              | 65 000 tramos indexados y 10 GB de tramos ingeridos incluidos en el precio.              | Datadog registra cada cinco minutos el número de instancias de las tareas que estás monitorizando en el servicio APM de Datadog. Datadog suma estas mediciones al final del mes y calcula el precio cobrado en función del promedio de horas durante el que tus aplicaciones se estuvieron ejecutando y monitorizando. [Más información sobre los precios de Fargate.][4]              |
| [Tramos indexados][5] | 1,70 $ por cada millón de tramos indexados al mes | Se cobra cuando el uso supera la cuota de tramos indexados incluida en cada host de APM | Un tramo (span) indexado es una solicitud individual a un servicio individual de tu pila. Datadog cobra en función del número total de tramos indexados con filtros de retención o tramos analizados heredados al servicio APM de Datadog APM al final del mes. [Obtener más información sobre los precios de APM][5].                                                                                          |
| [Tramos ingeridos][5] | 0,1 $ por cada GB de tramos ingeridos al mes | Se cobra cuando el uso supera la cuota de tramos ingeridos incluida en cada host de APM | Un tramo consumido es una solicitud individual a un servicio individual de tu pila. Datadog cobra en función del número total de gigabytes de tramos consumidos en Datadog al final de mes. [Obtener más información sobre los precios en APM][5].                                                                                          |

**Notas**:  
   - Si utilizas un servicio basado en contenedores, que no es Fargate, se te facturará por el host subyacente que implementa el Datadog Agent.
   - Un contenedor perfilado es un contenedor que ejecuta el servicio Continuous Profiler. Esto no incluye los contenedores que no están siendo perfilados. Por ejemplo, un servicio de contenedor DNS que NO está siendo perfilado y se ejecuta simultáneamente con tu contenedor de aplicación que SÍ está perfilado no cuenta para la asignación de cuatro contenedores perfilados.
   - [Universal Service Monitoring][15] está incluido en todos los niveles de APM (APM, APM Pro, APM Enterprise) sin coste adicional.

Para obtener más información, consulta la [página de precios][7].

## Monitorización de bases de datos

| Parámetro de facturación  | Consultas normalizadas                | Facturación                                          |
|--------------------|-----------------------------------|--------------------------------------------------|
| Host de base de datos      | Cada host de base de datos incluye 200 consultas normalizadas al mes. | Datadog registra el número de hosts de base de datos que estás monitorizando simultáneamente con la función de monitorización de base de datos una vez por hora. En un plan de marca de agua elevada (HWMP), estas mediciones horarias se ordenan de mayor a menor al final del mes, y Datadog cobra basándose en la novena medición más alta. El mes de febrero es una excepción y Datadog cobra basándose en la octava medición más alta. |
| Consultas normalizadas | Estas consultas se cobran cuando el umbral configurado supera la cuota de consultas normalizadas incluidas con cada host de base de datos. | Una _consulta normalizada_ representa un conjunto de consultas con una estructura similar, diferenciadas únicamente por los parámetros de consulta. El precio que cobra Datadog se calcula en función del número total de consultas normalizadas configuradas que se estén rastreando en un momento dado. |

Para obtener más información, consulta la [página de precios][7].

## Escenarios de despliegue

**Los siguientes casos de muestreo reflejan las tarifas de facturación anual con una retención predeterminada de tramos indexados de 15 días. Contacta con [ventas][8] o con tu gestor de [satisfacción al cliente][9] para informarte sobre los descuentos por volumen disponibles para tu cuenta.**

### Hosts de APM, tramos indexados y tramos ingeridos adicionales 

Uso de cinco hosts APM y envío de 30 millones de tramos indexados, con 900 GB de tramos totales consumidos.

| Unidad facturable  | Cantidad   | Precio                                                                                           | Fórmula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts de APM      | 5          | 31 $ por host                                                                                    | 5 × 31 $       | 155 $                  |
| Tramos indexados | 30 millones | 5 millones incluidos con 5 hosts de APM. 1,70 $ por millón para 25 millones de tramos indexados adicionales. | 25 × 1,70 $    | 42,50 $                |
| Tramos ingeridos | 900 GB          | 750 GB incluidos con 5 hosts de APM. 0,10 $ por GB para 150 GB adicionales de tramos ingeridos.                                                                                 | 150 × 0,10 $      | 15 $                  |
| Total          |            |                                                                                                 | 155 $ + 42,50 $ + 15 $ | **212,50 $ al mes** |

### Hosts de APM Pro, tramos indexados y tramos ingeridos adicionales 

Uso de cinco hosts APM Pro y envío de 30 millones de tramos indexados, con 900 GB de tramos totales consumidos.

| Unidad facturable  | Cantidad   | Precio                                                                                           | Fórmula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts de APM Pro      | 5          | 35 $ por host                                                                                    | 5 × 35 $       | 175 $                  |
| Tramos indexados | 30 millones | 5 millones incluidos con 5 hosts de APM. 1,70 $ por millón para 25 millones de tramos indexados adicionales. | 25 × 1,70 $    | 42,50 $                |
| Tramos ingeridos | 900 GB          | 750 GB incluidos con 5 hosts de APM. 0,10 $ por GB para 150 GB adicionales de tramos ingeridos.                                                                                 | 150 × 0,10 $      | 15 $                  |
| Total          |            |                                                                                                 | 175 $ + 42,50 $ + 15 $ | **232,50 $ al mes** |

### Hosts APM Enterprise con seis contenedores perfilados por cada host

Uso de cinco hosts APM Enterprise con seis aplicaciones ejecutándose en contenedores separados por cada host.

| Unidad facturable  | Cantidad   | Precio                                                                                           | Fórmula       | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| Hosts de APM Enterprise       | 5          | 40 $ por host                                                                                    | 5 × 40 $       | 200 $                  |
| Contenedores perfilados  | 6 por host | 2 $ por contenedor adicional por host. En este caso, hay 6 - 4 = 2 contenedores adicionales por cada host        | 2 × 2 $ × 5 hosts         | 20 $                   |
| Total          |            |                                                                                                 | 200 $ + 20 $      | **220 $ al mes**    |

### Host de APM, Fargate y tramos indexados

Uso de cinco hosts APM, envío de 20 millones de tramos indexados e implementación de APM en un promedio de 20 tareas Fargate a lo largo del mes.

| Unidad facturable  | Cantidad   | Precio                                                                                           | Fórmula             | Subtotal              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| Hosts de APM      | 5          | 31 $ por host                                                                                    | 5 × 31 $             | 155 $                  |
| Tareas de Fargate  | 20         | 2 $ por tarea                                                                                     | 20 × 2 $             | 40 $                   |
| Tramos indexados | 20 millones | 5 millones incluidos con 5 hosts de APM. 1,3 millones incluidos con 20 tareas de Fargate. 1,70 $ por millón por 13,7 millones de tramos indexados adicionales | 13,7 × 1,70 $          | 23,29 $                |
| Total          |            |                                                                                                 | 155 $ + 40 $ + 23,29 $ | **218,29 $ al mes** |

### Hosts de APM Enterprise, servicios, contenedores y tramos indexados

APM Enterprise para el servicio 1 que se ejecuta en el contenedor 1 y el servicio servicio 2 que se ejecuta en el contenedor 2. Ambos contenedores se ejecutan en un host y envían 20 millones de tramos indexados en App Analytics. 

| Unidad facturable  | Cantidad   | Precio                                                                                          | Fórmula      | Subtotal             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| Hosts de APM Enterprise      | 1          | 40 $ por host                                                                                   | 1 × 40 $      | 40 $                  |
| Contenedores perfilados  | 2 | 0 $, ya que los contenedores perfilados están incluidos en la cuota de 4 por host de APM.
| Tramos indexados | 20 millones | 1 millón incluido con 1 host de APM. 1,70 $ por millón para 19 millones de tramos indexados adicionales. | 19 × 1,70 $   | 32,30 $               |
| Total          |            |                                                                                                | 40 $ + 32,30 $ | **72,30 $ al mes** |

### Hosts de APM con escalado dinámico, contenedores, Fargate y sin tramos indexados

La aplicación 1 se ejecuta utilizando entre 20 y 40 contenedores implementados en entre 4 y 8 instancias host; la aplicación 2 se ejecuta utilizando entre 10 y 30 tareas de Fargate Además, se supone que el percentil 99 de uso de instancias EC2 es 7, y el promedio de tareas de Fargate durante el mes es 28.

| Unidad facturable | Cantidad | Precio        | Fórmula    | Subtotal           |
|---------------|----------|--------------|------------|--------------------|
| Hosts de APM     | 7        | 31 $ por host | 7 × 31 $    | 217 $               |
| Tareas de Fargate | 28       | 2 $ por tarea  | 28 × 2 $    | 56 $                |
| Total         |          |              | 217 $ + 56 $ | **273 $ al mes** |

**Nota**: El count de contenedores no se tiene en cuenta si el Agent se despliega en instancias EC2.

### Hosts de APM Enterprise con nodos Kubernetes y tramos indexados

APM Enterprise para aplicaciones con un Datadog Agent que se ejecutan en 20 nodos trabajadores en Kubernetes, envío de 20 millones de tramos indexados. Cada uno de estos 10 nodos trabajadores tiene ocho pods, con un contenedor por pod. Cada uno de los otros 10 nodos tiene dos pods, con un contenedor por pod. 

| Unidad facturable     | Cantidad   | Precio                                                                       | Fórmula   | Subtotal           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Hosts de APM Enterprise (Nodos) | 20         | 40 $ por host                                                                | 20 × 40 $ | 800 $               |
| Contenedores perfilados  | 100 tras la agregación | 2 $ por contenedor adicional. En este caso, con 20 hosts estarían incluidos hasta 80 contenedores pero hay 20 contenedores extra en dos hosts: 100-80 = 20 contenedores adicionales        | 2 $ × 20 hosts        | 40 $                    |
| Tramos indexados    | 20 millones | 20 millones incluidos con 20 hosts de APM (nodos). Sin tramos indexados adicionales. | 0 × 1,70 $ | 0                  |
| Total             |            |                                                                             | 800 $ + 40 $ | **840 $ al mes** |

En el caso de Kubernetes, APM y Continuous Profiler, se factura por nodo, no por pod.

### Funciones lambda y tramos indexados

Una aplicación serverless basada en AWS-Lambda que se invoca 10 millones de veces en un mes mientras envía 10 millones de tramos indexados.

| Unidad facturable                  | Cantidad   | Precio                                                                       | Fórmula   | Subtotal           |
|--------------------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Invocaciones de funciones lambda    | 10 millones | [5 $ al mes][10]                                                           | 10 × 5 $  | 50 $               |
| Tramos indexados                  | 10 millones | 150 000 tramos indexados incluidos con cada millón de invocaciones lambda. 1,70 $ por cada millón de tramos indexados adicionales | 8,5 × 1,70 $ | 14,45 $               |
| Total                          |            |                                                                             | 50 $ + 14,45 $ | **64,45 $ al mes** |

## FAQ

**1. ¿Cómo se define un host de APM a efectos de facturación?**

Un [host][4] es una instancia de sistema operativo físico o virtual. Datadog registra una vez por hora el número de hosts que estás monitorizando de forma simultánea en el servicio Datadog Infrastructure. En cuanto a la facturación de APM, cada hora se hace el cálculo del número de hosts en los que está [instalado el APM][12] y que envían trazas. Al final del mes, se te factura en función del percentil 99 de uso de los [hosts de APM][5].

**2. ¿Cómo se calcula el importe de facturación cuando se despliega un Agent por contenedor?**

Para desplegar contenedores, lo recomendable es configurar _un Agent por host subyacente_. No obstante, si decides ejecutar un Agent por contenedor, cada contenedor se tratará como un host individual. El precio se determinará mediante el siguiente cálculo: (precio por host de APM) × (número de contenedores).

**3. ¿Cómo se define una tarea de Fargate de la APM a efectos de facturación?**

Una tarea de Fargate es una recopilación de contenedores programados para ejecutarse en AWS Fargate como motor informático serverless. Datadog registra a intervalos de cinco minutos el número de tareas que estás monitorizando de manera simultánea en Datadog. Para la facturación de APM, Datadog cobra en función del número medio de tareas de Fargate que envían trazas a Datadog por hora en un mes determinado de tu cuenta.

**4. ¿Cómo se calcula la factura si se cambia el tamaño del entorno?**

El importe que se cobra por el APM se calcula utilizando el percentil 99 superior de los Agents activos que envían trazas cada hora de cada mes. Al final del mes, Datadog no tiene en cuenta el valor del 1 % más alto, lo que ofrece una protección frente a la facturación de picos inesperados.

**5. ¿Se cobran los contenedores pause en Kubernetes?

Kubernetes crea contenedores pause para adquirir la dirección IP del pod correspondiente y configurar el espacio de nombres de red del resto de contenedores que se unan a ese pod. Datadog no incluye ningún contenedor pause en tu cuota y no te cobra por ellos (es necesario el Agent 5.8 o posterior). En el caso de Kubernetes, la APM se factura por nodo, y no por pod.

**6. ¿El número de hosts que se factura tiene en cuenta mis servicios?**

APM se factura en base a los [hosts][5] implementados con agentes que envían trazas y no servicios. Además, según la asignación mensual por host, APM se factura en base al volumen de tramos consumidos y al recuento de tramos indexados. Para calcular cuántos tramos consumidos e indexados envía cada uno de sus servicios, consulta la documentación sobre [consumo][2] y [retención][13].

**7. ¿Qué ocurre con los filtros existentes de App Analytics?**

A partir del 20 de octubre de 2020, todos los filtros de App Analytics existentes se convertirán automáticamente en filtros de retención. Puedes optar por mantener los filtros sin cambios o modificarlos según tus necesidades. Los filtros afectados por esta transición aparecen marcados con una *i* para indicar que proceden de App Analytics en la página de [filtros de retención][3].

**8. ¿Cómo se calcula el volumen de tramos ingeridos o indexados?**

Datadog proporciona las métricas `datadog.estimated_usage.apm.ingested_bytes` y `datadog.estimated_usage.apm.ingested_spans` para monitorizar el volumen de tramos ingeridos e indexados. Para obtener más información, consulta la documentación [Métricas de uso][14].

**9. El Continuous Profiler, ¿está disponible como producto independiente?**

Sí. Si te interesa contratar el Continuous Profiler sin APM, informa a Datadog. Contacta con [Ventas][8] o con tu [gestor de satisfacción al cliente][9].

**10. ¿Está Data Streams Monitoring disponible como producto independiente?**

Sí. Si te interesa contratar el Data Streams Monitoring sin APM, informa a Datadog. Contacta con [Ventas][8] o con tu [asesor de clientes][9].


## Leer más

{{< whatsnext >}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}Consultar y configurar alertas sobre el uso de APM{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}Calcular y controlar el uso de APM{{< /nextlink >}}
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