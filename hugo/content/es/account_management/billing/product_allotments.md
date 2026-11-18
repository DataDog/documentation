---
title: Asignaciones de productos
---
Las asignaciones proporcionan uso adicional que viene con las suscripciones a productos principales seleccionados. Otorgan una cierta cantidad de uso de un producto secundario como parte del uso comprometido y bajo demanda del producto principal de la cuenta.

Entre los productos que tienen esta estructura se incluyen los servidores de infraestructura y Containers, donde cada servidor viene con una asignación de Containers.

## Asignaciones dentro de los cálculos de facturación {#allotments-within-billing-calculations}

El uso total incurrido se clasifica en uso facturable y no facturable. El uso facturable es por lo que se puede cobrar a una cuenta, mientras que el uso no facturable no se cobra. El uso no facturable puede incluir el uso de prueba.

Para facturar el uso facturable, primero se resta el uso incluido. Las asignaciones se tienen en cuenta en el uso incluido, que luego se utiliza para calcular el uso bajo demanda a partir del uso facturable:

- `allotments + committed usage = included usage`
- `billable usage - included usage = on-demand usage`

Por ejemplo, una cuenta puede tener un uso total de Ingested Spans de 150 GB. De ese total, 140 GB corresponden a uso facturable. Si hay un compromiso previo de 50 GB y una asignación de 30 GB, estos 80 GB de uso se clasifican como uso incluido y se restan de los 140 GB de uso facturable. Los 60 GB de uso restantes se clasifican como uso bajo demanda.

- Para ver el uso total y el uso facturable, consulte las pestañas {{< ui >}}All{{< /ui >}} y {{< ui >}}Billable{{< /ui >}} dentro de la página [**Plan and Usage**][2] en Datadog. 
- Para ver los compromisos, consulte su contrato.

## Cálculo del uso incluido {#calculating-included-usage}
El uso total incluido se compone del **compromiso para el producto y la suma de las asignaciones por producto principal**. Consulte el contrato del usuario para conocer las cantidades de compromiso. Las siguientes variables determinan cómo se calcula el uso de la asignación:

- Opción bajo demanda
- Asignaciones por productos principales
- Función de agregación de uso

### Opción bajo demanda {#on-demand-option}

El uso de la asignación de un producto puede calcularse de acuerdo con la opción de medición bajo demanda de la organización. Las organizaciones pueden optar por una opción bajo demanda **mensual o por hora**. Consulte su contrato para obtener información sobre su opción de medición. 

De forma predeterminada, la opción bajo demanda se establece a nivel de suscripción y se aplica a todos los productos excepto a los siguientes, que admiten una única opción bajo demanda predeterminada: 

| Producto                                         | Opción predeterminada |
|-------------------------------------------------|----------------|
| Containers (Infrastructure, Profiled, Security) | Por hora         |
| Incident Management                             | Mensual        |
| Productos APM Fargate                            | Mensual        |
| APM Serverless                                  | Mensual        |
| Productos de Logs                                   | Mensual        |
| SNMP Traps                                      | Mensual        |

En la medición por hora, la asignación mensual se ajusta a una asignación por hora. Para productos sumados como los spans de APM, por ejemplo, la asignación mensual se anualiza y luego se divide por el número de horas en un año para obtener la asignación por hora. Para productos promediados como Custom Metrics, la asignación mensual permanece igual en cualquiera de las opciones bajo demanda, ya que el uso mensual total es el promedio del uso facturable de todas las horas del mes.

## Asignaciones por productos principales {#allotments-by-parent-products}

Para obtener una lista completa de las asignaciones predeterminadas por producto principal, consulte la tabla de asignaciones en la página de la [Calculadora de asignaciones][3]. Para asignaciones personalizadas o que no sean predeterminadas, revise su contrato para obtener más información.

Si el uso facturable de un producto principal por parte de una organización excede su compromiso, esta recibe una asignación adicional del uso del producto principal bajo demanda y solo se le factura por el producto principal. Después de que se agota esa asignación adicional, cualquier uso adicional del producto secundario puede facturarse a una tarifa bajo demanda. Para cualquiera de las opciones bajo demanda, las asignaciones generalmente no se transfieren a las horas siguientes. Si una organización tiene un remanente al final de su período de medición por hora o mensual, este no es aplicable en el período siguiente (consulte la nota a continuación para conocer un cambio próximo).

Por ejemplo, si una organización con una opción mensual bajo demanda se compromete a 5 servidores APM Pro, tiene una asignación predeterminada de Ingested Spans de `5 APM Pro Hosts * 150 GB Ingested Spans per host = 750 GB` para el mes. Si utilizan 6 servidores APM y 800 GB de Ingested Spans, se les factura por el uso adicional de servidores, pero no por el uso adicional de _spans_, ya que su asignación de Ingested Spans aumenta a 900 GB. El remanente de 100 GB no es aplicable al mes siguiente.

**Nota**: A partir de agosto de 2026, algunas cuentas comenzarán a ver un cambio en la forma en que se tratan las asignaciones. Los cambios descritos a continuación se aplican a las cuentas de forma gradual. Aparecerá un banner en Plan and Usage, en Bill Overview, cuando este cambio entre en vigor. Los usuarios también pueden comunicarse con su representante de cuenta para comprender la aplicación de su asignación actual.

Las asignaciones para productos cuyo uso es acumulativo durante el mes (por ejemplo, Ingested Spans o Indexed Spans) se aplican a todo el período de facturación en lugar de hora por hora, por lo que la asignación no utilizada puede transferirse a otras horas dentro del mismo período de facturación. Esto puede reducir el costo bajo demanda.

En el siguiente ejemplo, las 50 unidades de asignación que quedaron sin usar en las dos primeras horas se transfieren para cubrir la tercera hora, que tiene más actividad, por lo que no se factura ningún uso bajo demanda:

| Hora | Uso | Asignación por hora | Costo bajo demanda facturado |
| --- | --- | --- | --- |
| Hora 1 | 60 | 100 | 0 (40 agregados al fondo mensual) |
| Hora 2 | 90 | 100 | 0 (10 agregados al fondo mensual) |
| Hora 3 | 150 | 100 | 0 (cubierto con las 50 unidades acumuladas anteriormente) |
| **Total** | **300** | **300** | **0** |

Para los productos medidos según un conteo concurrente, un pico o un promedio (como servidores, Containers y Custom Metrics), la asignación se aplica en cada momento en lugar de como un presupuesto mensual. No hay una cantidad no utilizada para trasladar entre horas, por lo que el comportamiento para estos productos no cambia.

Este cambio no se aplica al uso facturado a través de un mercado externo (por ejemplo, AWS, Azure o Google Cloud), donde las asignaciones continúan aplicándose por hora.

Hasta que una cuenta pase al nuevo sistema, las asignaciones seguirán aplicándose por hora, como se describió anteriormente. En todos los casos, las asignaciones no se trasladan entre períodos de facturación: cualquier remanente al final del período de medición no es aplicable en el siguiente período.

## Función de agregación de uso {#usage-aggregation-function}
Las funciones de agregación se utilizan para convertir el uso facturable por hora en un valor de uso mensual que puede utilizarse para la facturación. Cada producto puede tener hasta dos funciones de agregación de uso (una para cada posible opción bajo demanda). Las funciones de agregación disponibles incluyen suma, promedio, máximo y high watermark plan (HWMP). 

- **Suma:** Esta es la suma del volumen total de uso durante todas las horas del mes. El uso se calcula cada hora a medida que el uso incluido se compara con el uso facturable de cada instancia distinta de uso del producto. Al final del mes, se suma el uso bajo demanda de todas las horas del mes.
- **Promedio:** En una opción mensual bajo demanda, este es el uso promedio durante todas las horas del mes. El uso bajo demanda para el mes se deriva restando el uso total incluido del uso promedio para el mes.

    En una opción bajo demanda por hora, el uso se mide cada hora, luego el uso total incluido se resta del uso medido cada hora para obtener el uso bajo demanda para cada hora. Al final del mes, el promedio se calcula sumando el uso bajo demanda durante todas las horas y dividiendo por el número de horas en el mes.
- **Máximo:** Este es el uso máximo durante todos los intervalos en un período de tiempo determinado, generalmente mensual.
- **Plan de marca de agua alta (HWMP):** La cantidad facturable de servidores se calcula al final del mes utilizando la cantidad máxima del 99 % inferior del uso durante esas horas. Datadog excluye el 1 % superior para reducir el impacto de los picos de uso en su factura. 

Consulte [Funciones de agregación de uso para asignaciones](#usage-aggregation-functions-for-allotments) para obtener detalles de productos individuales.

## Cálculo del uso bajo demanda {#calculating-on-demand-usage}

El uso bajo demanda se refiere al uso acumulado más allá de la suma del uso comprometido y asignado. Para calcular el uso bajo demanda, reste el **uso incluido** (es decir, el uso comprometido y el uso asignado) del **uso facturable**. 

La opción bajo demanda determina con qué frecuencia se calcula el uso bajo demanda. Para la opción bajo demanda mensual, el uso bajo demanda se calcula al final de cada mes. Para la opción bajo demanda por hora, el uso bajo demanda se calcula cada hora y el uso bajo demanda total a facturar al final del mes es el agregado del uso bajo demanda por hora a lo largo de todas las horas del mes. El uso bajo demanda se factura a una tarifa bajo demanda. Consulte [Precios de Datadog][1].

### Ejemplo {#example}
**Una organización con una opción de uso bajo demanda mensual** tiene un compromiso de 5 servidores APM Pro y cero Ingested Spans. Tendrá un uso total incluido de `(5 APM Pro hosts * 150 GB Ingested Spans per host) + 0 commitment = 750 GB Ingested Spans of total included usage`. Si tiene 1000 GB de uso de Ingested Spans, los 250 GB adicionales se clasifican como uso bajo demanda.

**Una organización con una opción de uso bajo demanda por hora** tiene un compromiso de 5 servidores APM Pro y cero Ingested Spans. Dado que su uso bajo demanda se calcula por hora, su asignación mensual se anualiza y luego se divide por el número de horas en un año: `(365 * 24 / 12) = 730`. Por lo tanto, su asignación por hora de Ingested Spans es `(5 APM Hosts * (150 GB Ingested Spans / Host) /  (730 hours))  = 1.027 GB Ingested Spans per hour`.

Si utilizaron 1,1 GB durante la hora 1, 0,9 GB durante la hora 2 y 1,2 GB durante la hora 3, su uso bajo demanda para el mes es la suma, para todas las horas de uso del mes, de la diferencia entre el uso facturable y el uso asignado: `((1.1 - 1.027 = 0.073) + (0.9 - 1.027 = 0) + (1.2 - 1.027 = 0.173)) = 0.246 GB on-demand usage for Ingested Spans`.

## Cálculo del uso facturable {#calculating-billable-usage}

El uso facturable se refiere a cualquier uso sin procesar que sea elegible para aparecer en la factura de un usuario, excluyendo el uso de prueba de la organización y del producto. Consulte la [página Plan and Usage][2] en Datadog para ver su uso facturable. Las siguientes variables determinan cómo se calcula el uso facturable:

- Opción bajo demanda
- Función de agregación del uso

### Opción bajo demanda {#on-demand-option-1}
En la medición mensual, el uso bajo demanda se calcula al final del mes comparando el uso facturable con el uso incluido. En la medición por hora, el uso bajo demanda se calcula cada hora en lugar de al final del mes. Luego se agrega a lo largo de todas las horas de uso del mes, y se aplica el compromiso para obtener el valor final de uso bajo demanda facturable.

### Agregación del uso {#usage-aggregation}
Consulte [Función de agregación del uso](#usage-aggregation-function).

### Ejemplos {#examples}

#### Opción bajo demanda mensual {#monthly-on-demand-option}

Una organización tiene un compromiso mensual de 10 servidores APM Pro y un compromiso de 100 GB de Ingested Spans por mes durante un período de tres meses. Su uso es el siguiente (con los valores derivados en *cursiva*): 

| Mes | Compromiso de servidores APM | Uso de servidores APM | Asignación para Ingested Spans | Uso incluido para Ingested Spans | Uso facturable para Ingested Spans | Uso bajo demanda para Ingested Spans |
|-----|--------|--------|-----------|-----------|---------|---|
| 1  | 10  | 5   | *1500 GB*   | *1600 GB*   | 2000 GB | *400 GB*  |
| 2  | 10  | 15 | *2250 GB*  | *2350 GB* | 2000 GB  | *0 GB*      |
| 3 | 10   | 10   | *1500 GB*  | *1600 GB*  | 1600 GB | *0 GB*  |

Para una opción bajo demanda mensual, la [asignación predeterminada](#allotments-table) de Ingested Spans para cada servidor de APM Pro es de 150 GB. 

En el **mes 1**, la organización tenía un compromiso de 10 servidores de APM, pero solo utilizó 5. Su asignación de Ingested Spans se calculó multiplicando la asignación predeterminada por el mayor valor entre la cantidad de servidores comprometidos y la cantidad utilizada: `maximum(5, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. Su uso incluido de Ingested Spans fue la suma de su compromiso y su asignación: `1500 GB + 100 GB = 1600 GB`. Su uso bajo demanda de Ingested Spans fue el mayor valor entre 0 y la diferencia entre su uso facturable y su asignación: `maximum(0, 2000 – 1600) = 400 GB`.

En el **mes 2**, la organización tenía un compromiso de 10 servidores de APM, pero utilizó 15. Su asignación de Ingested Spans se calculó multiplicando la asignación predeterminada por el mayor valor entre la cantidad de servidores comprometidos y la cantidad utilizada: `maximum(15, 10) * 150 GB = 2250 GB allotment of Ingested Spans`. Su uso incluido de Ingested Spans fue la suma de su compromiso y su asignación: `2250 GB + 100 GB = 2350 GB`. Su uso bajo demanda de Ingested Spans fue el mayor valor entre 0 y la diferencia entre su uso y su asignación: `maximum(0, 2000 – 2350) = 0 GB`.

En el **mes 3**, la organización tenía un compromiso de 10 servidores de APM y utilizó 10. Su asignación de Ingested Spans se calculó multiplicando la asignación predeterminada por el mayor valor entre la cantidad de servidores comprometidos y la cantidad utilizada: `maximum(10, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. Su uso incluido de Ingested Spans fue la suma de su compromiso y su asignación: `1500 GB + 100 GB = 1600 GB`. Su uso bajo demanda de Ingested Spans fue el mayor valor entre 0 y la diferencia entre su uso y su asignación: `maximum(0, 1600 – 1600) = 0 GB`.

#### Opción bajo demanda por hora {#hourly-on-demand-option}

Una organización tiene un compromiso mensual de 10 servidores APM Pro y de 0.3 GB de Ingested Spans durante un mes. Su uso es el siguiente: 

| Marca de tiempo    | Compromiso de servidores APM | Uso de servidores APM | Asignación de Ingested Spans | Uso de Ingested Spans | Uso de Ingested Spans bajo demanda |
|--------------|---------------------|----------------|--------------------------|----------------------|--------------------------------|
| Hora 1 | 10    | 5      | 2.054 GB     | 2.500 GB    | 0.446 GB           |
| Hora 2 | 10    | 15     | 3.082 GB     | 3.000 GB    | 0 GB               |
| Hora 3 | 10    | 10     | 2.054 GB     | 2.054 GB    | 0 GB               |

Para un usuario con una opción bajo demanda por hora, la [asignación predeterminada](#allotments-table) de Ingested Spans para cada servidor APM Pro es de 0.2054 GB.

En la **Hora 1**, la organización tenía un compromiso de 10 servidores APM, pero solo utilizó 5. Su asignación por hora de Ingested Spans fue el mayor valor entre su compromiso de servidores y su uso de servidores, multiplicado por la asignación predeterminada: `maximum(5, 10)  * 0.2054 GB = 2.054 GB / hour`. Su uso bajo demanda para la hora es el máximo entre 0 y la diferencia entre su uso facturable y su uso asignado: `maximum(0, 2.500 – 2.054) = 0.446 GB`.

En la **Hora 2**, la organización tenía un compromiso de 10 servidores APM, pero utilizó 15. Su asignación por hora de Ingested Spans fue el mayor valor entre su compromiso de servidores y su uso de servidores, multiplicado por la asignación predeterminada: `maximum(15,10) * 0.2054 GB = 3.081 GB / hour`. Su uso bajo demanda para la hora es el máximo entre 0 y la diferencia entre su uso facturable y su uso asignado: `maximum(0, 3.000 – 3.081) = 0 GB`.

En la **Hora 3**, la organización tenía un compromiso de 10 servidores APM y utilizó 10. Su asignación por hora de Ingested Spans fue el mayor valor entre su compromiso de servidores y su uso de servidores, multiplicado por la asignación predeterminada: `maximum(10,10) * 0.2054 GB = 2.054 GB / hour`. Su uso bajo demanda para la hora es el máximo entre 0 y la diferencia entre su uso facturable y su uso asignado: `maximum(0, 2.054 – 2.054) = 0 GB`.

Dado que la función de agregación de uso predeterminada para Ingested Spans es la suma, el uso se suma durante todas las horas del mes para obtener el uso total bajo demanda del mes. Si esta organización solo tuviera 3 horas de uso de Ingested Spans durante el mes, su uso mensual total sería 0: `4452 + 0 + 0 = 0.446 GB`. 

Además, la organización tiene un compromiso mensual de 0.3 GB de Ingested Spans. Por lo tanto, su uso mensual bajo demanda es el máximo entre 0 y la diferencia entre su uso mensual y su compromiso: `maximum(0, 0.446 – 0.3) = 0.146 GB`.

## Funciones de agregación de uso para asignaciones {#usage-aggregation-functions-for-allotments}

| Asignación             | Posibles productos principales                                      | Función de agregación de uso mensual predeterminada | Función de agregación de uso horario predeterminada |
|-----------------------|---------------------------------------------------------------|--------------------------------------------|-------------------------------------------|
| Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet of Things (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps, Serverless Invocations, Serverless Functions  | Promedio | Promedio |
| Ingested Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet of Things (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps | Promedio | Promedio |
| Custom Events | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts | Suma | Suma |
| Cloud Security Containers    | Cloud Security       |      N/A     | Suma    |
| CWS Containers      | Cloud Workload Security (CWS)              |       N/A     | Suma      |
| Infrastructure Containers    | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts |   N/A   | Suma  |
| Profiled Containers | APM Enterprise, Continuous Profiler    |   N/A        | Suma   |
| Profiled Hosts        | APM Enterprise       | HWMP   | Suma     |
| CI Indexed Spans    | CI Visibility         | Suma     | Suma   |      
| Test Indexed Spans    | Test Optimization         | Suma   | Suma   |               
| APM Indexed Spans | APM, APM Pro, APM Enterprise, Serverless APM, </br> Legacy - Serverless Invocations, </br> Legacy - Serverless Functions, Fargate Task (APM Pro), </br> Fargate Task (APM Enterprise) | Suma | Suma |
| APM Ingested Spans | APM, APM Pro, APM Enterprise </br> Serverless APM, Legacy - Serverless Invocations </br> Legacy - Serverless Functions </br> Fargate Task (APM Pro), Fargate Task (APM Enterprise) | Suma | Suma | 
| DBM Normalized Queries | Database Monitoring (DBM) | Promedio | Promedio |
| Data Streams Monitoring | APM Pro, APM Enterprise | HWMP | Suma |
| CSPM Workflow Runs | Cloud Security | Suma | Suma |
| Fargate Task (Continuous Profiler) | Fargate Task (APM Enterprise) | Promedio | N/A |

[1]: https://www.datadoghq.com/pricing/list/
[2]: https://app.datadoghq.com/billing/usage
[3]: https://www.datadoghq.com/pricing/allotments/