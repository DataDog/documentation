---
title: Asignaciones de productos
---

Las asignaciones ofrecen un uso adicional incluido con las suscripciones que sirve para seleccionar productos principales. Conceden una determinada cantidad de uso de un producto secundario como parte del uso comprometido y bajo demanda del producto principal.

Ejemplos de productos con esta estructura son los hosts y los contenedores de infraestructura, donde cada host viene con una asignación de contenedor.

## Asignaciones con cálculos de facturación

El uso total generado se clasifica en uso facturable y no facturable. El uso facturable es el que se puede cobrar a una cuenta, mientras que el uso no facturable no se cobra. El uso no facturable puede incluir las pruebas de uso gratuitas.

Para facturar el uso facturable, primero se resta el uso incluido. Las asignaciones se tienen en cuenta en el uso incluido, que luego se utiliza para calcular el uso bajo demanda a partir del uso facturable:

- `allotments + committed usage = included usage`
- `billable usage - included usage = on-demand usage`

Por ejemplo, una cuenta puede tener un uso de tramos (spans) ingeridos total de 150 GB. De esta cantidad, 140 GB son de uso facturable. Si existe un compromiso previo de 50 GB y una asignación de 30 GB, estos 80 GB de uso se clasifican como uso incluido y se restan de los 140 GB de uso facturable. Los 60 GB restantes se clasifican como uso bajo demanda.

- Para ver el uso total y el uso facturable, consulta las pestañas **Todo** y **Facturable** en la página [**Plan y uso**][2] en Datadog.
- Para ver los compromisos, consulta t contrato.

## Cálculo del uso incluido
El uso total incluido está compuesto por el **compromiso con el producto y la suma de las asignaciones por producto principal**. Consulta el contrato del usuario para conocer las cantidades comprometidas. Las siguientes variables determinan cómo se calcula el uso de las asignaciones:

- Opción bajo demanda
- Asignaciones por productos principales
- Función de agregación de uso

### Opción bajo demanda

El uso asignado de un producto puede calcularse en función de la opción de medición bajo demanda de la organización. Las organizaciones pueden optar por una opción bajo demanda **mensual o por hora**. Consulta tu contrato para obtener información sobre tu opción de medición.

Por defecto, la opción bajo demanda se define en el nivel de la suscripción y se aplica a todos los productos excepto a los siguientes, que admiten una única opción bajo demanda por defecto: 

| Producto                                         | Opción por defecto |
|-------------------------------------------------|----------------|
| Contenedores (infraestructura, perfilado, seguridad) | Por hora         |
| Gestión de incidencias                             | Mensual        |
| Productos APM Fargate                            | Mensual        |
| APM serverless                                  | Mensual        |
| Productos de logs                                   | Mensual        |
| Trampas de SNMP                                      | Mensual        |

En la medición por hora, la asignación mensual se ajusta a una asignación por hora. Para productos sumados como los tramos APM, por ejemplo, la asignación mensual se anualiza y luego se divide por el número de horas de un año para obtener la asignación por hora. En el caso de productos promediados como las métricas personalizadas, la asignación mensual se mantiene igual en cualquiera de las opciones bajo demanda, ya que el uso mensual total es el promedio del uso facturable de todas las horas del mes.

## Asignaciones por productos principales

Para ver la lista completa de asignaciones por producto principal por defecto consulta la tabla en la página [Calculadora de asignaciones][3]. Para ver asignaciones personalizadas o no predeterminadas, consulta tu contrato para obtener más información.

Si el uso facturable del producto principal de una organización supera su compromiso, recibe una asignación adicional del uso del producto principal bajo demanda y solo se le factura por el producto principal. Una vez agotada esa asignación adicional, cualquier uso adicional del producto secundario puede facturarse según la tarifa bajo demanda. En cualquiera de las opciones bajo demanda, las asignaciones no se trasladan a las horas siguientes. Si una organización tiene un remanente al final de su periodo de medición mensual o por hora, no se aplica en el siguiente periodo.

Por ejemplo, si una organización con una opción mensual bajo demanda se compromete a 5 hosts APM Pro, obtiene una asignación por defecto de tramos ingeridos de `5 APM Pro Hosts * 150 GB Ingested Spans per host = 750 GB` para el mes. Si utiliza 6 hosts APM y 800 GB de tramos ingeridos, se le facturará el uso adicional de hosts pero no el uso adicional de _tramos_, ya que su asignación de tramos ingeridos aumenta a 900 GB. Los 100 GB restantes no se aplican al mes siguiente.

## Función de agregación de uso
Las funciones de agregación se utilizan para convertir el uso facturable por hora en un valor de uso mensual que puede utilizarse para la facturación. Cada producto puede tener hasta dos funciones de agregación de uso (una por cada opción bajo demanda posible). Las funciones de agregación disponibles incluyen suma, promedio, máximo y plan de marca de agua alta (HWMP).

- **Suma:** Es la suma del volumen de uso total de todas las horas del mes. El uso se calcula cada hora a medida que el uso incluido se compara con el uso facturable de cada instancia distinta de uso del producto. Al final del mes, el uso bajo demanda se suma para cada hora del mes.
- **Promedio:** En una opción mensual bajo demanda, es el uso promedio de todas las horas del mes. El uso bajo demanda del mes se obtiene restando el uso total incluido del uso promedio del mes.

    En una opción de uso bajo demanda por hora, el uso se mide cada hora y luego el uso total incluido se resta del uso medido cada hora para obtener el uso bajo demanda de cada hora. Al final del mes, el promedio se calcula sumando el uso bajo demanda de todas las horas y dividiéndolo por el número de horas del mes.
- **Máximo:** Es el uso máximo en todos los intervalos en un periodo de tiempo determinado, normalmente mensual.
- **Plan de marca de agua alta (HWMP):** El recuento facturable de hosts se calcula al final del mes utilizando el recuento máximo del 99% inferior de uso de esas horas. Datadog excluye el 1% superior para reducir el impacto de los picos de uso en tu factura.

Consulta [Uso de funciones de agregación para asignaciones](#usage-aggregation-functions-for-allotments) para conocer los detalles de cada producto.

## Cálculo del uso bajo demanda

El uso bajo demanda se refiere al uso acumulado más allá de la suma del uso comprometido y asignado. Para calcular el uso bajo demanda, resta el **uso incluido** (es decir, los usos comprometido y asignado) del **uso facturable**.

La opción bajo demanda determina la frecuencia de cálculo del uso bajo demanda. En el caso de la opción bajo demanda mensual, el uso bajo demanda se calcula al final de cada mes. En el caso de la opción bajo demanda por hora, el uso bajo demanda se calcula cada hora y el uso bajo demanda total que se factura al final del mes es la suma del uso bajo demanda por hora de todas las horas del mes. El uso bajo demanda se factura a una tarifa bajo demanda. Consulta [Precios de Datadog][1].

### Ejemplo
**Una organización con una opción bajo demanda mensual** se compromete a 5 hosts APM Pro y a 0 tramos ingeridos. Tendrá un uso total incluido de `(5 APM Pro hosts * 150 GB Ingested Spans per host) + 0 commitment = 750 GB Ingested Spans of total included usage`. Si tienen 1000 GB de uso de tramos ingeridos, los 250 GB adicionales se clasifican como uso bajo demanda.

**Una organización con una opción bajo demanda por hora** se compromete a 5 hosts APM Pro y a 0 tramos ingeridos. Dado que su uso bajo demanda se calcula cada hora, su asignación mensual se anualiza y se divide por el número de horas de un año: `(365 * 24 / 12) = 730`. Por lo tanto, su asignación de tramos ingeridos por hora es `(5 APM Hosts * (150 GB Ingested Spans / Host) /  (730 hours))  = 1.027 GB Ingested Spans per hour`.

Si se utilizó 1,1 GB durante la hora 1, 0,9 GB durante la hora 2 y 1,2 GB durante la hora 3, su uso bajo demanda del mes es la diferencia entre el uso facturable y el uso asignado, sumada a todas las horas de uso del mes: `((1.1 - 1.027 = 0.073) + (0.9 - 1.027 = 0) + (1.2 - 1.027 = 0.173)) = 0.246 GB on-demand usage for Ingested Spans`.

## Cálculo del uso facturable

El uso facturable se refiere a cualquier uso sin procesar que pueda aparecer en la factura de un usuario, excluyendo las pruebas gratuitas de la organización y del producto. Consulta la página [Plan y uso][2] en Datadog para ver tu uso facturable. Las siguientes variables determinan cómo se calcula el uso facturable:

- Opción bajo demanda
- Función de agregación de uso

### Opción bajo demanda
En la medición mensual, el uso bajo demanda se calcula al final del mes comparando el uso facturable con el uso incluido. En la medición por hora, el uso bajo demanda se calcula cada hora en lugar de a final del mes. A continuación, se agrega a todas las horas de uso del mes y luego se aplica el compromiso para obtener un valor final de uso bajo demanda facturable.

### Agregación de uso
Consulta [Función de agregación de uso](#usage-aggregation-function).

### Ejemplos

#### Opción bajo demanda mensual

Una organización tiene un compromiso mensual de 10 hosts APM Pro y 100 GB de tramos ingeridos al mes durante un periodo de tres meses. Su uso es el siguiente (con los valores derivados en *cursiva*): 

| Mes | Compromiso de hosts APM | Uso de hosts APM | Asignación de tramos ingeridos | Uso incluido de tramos ingeridos | Uso facturable de tramos ingeridos | Uso bajo demande de tramos ingeridos |
|-----|--------|--------|-----------|-----------|---------|---|
| 1  | 10  | 5   | *1500 GB*   | *1600 GB*   | 2000 GB | *400 GB*  |
| 2  | 10  | 15 | *2250 GB*  | *2350 GB* | 2000 GB  | *0 GB*      |
| 3 | 10   | 10   | *1500 GB*  | *1600 GB*  | 1600 GB | *0 GB*  |

Para una opción bajo demanda mensual, la [asignación por defecto](#allotments-table) de tramos ingeridos para cada host APM Pro es de 150 GB.

En el **Mes 1**, la organización se comprometió a 10 hosts APM pero solo utilizó 5. Su asignación de tramos ingeridos fue el máximo de su compromiso de hosts y uso de hosts multiplicado por la asignación por defecto: `maximum(5, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. Su uso incluido de tramos ingeridos fue la suma de su compromiso y asignación: `1500 GB + 100 GB = 1600 GB`. Su uso bajo demanda de tramos ingeridos fue el máximo de 0 y la diferencia entre su uso facturable y asignación: `maximum(0, 2000 – 1600) = 400 GB`.

En el **Mes 2**, la organización se comprometió a 10 hosts APM pero utilizó 15. Su asignación de tramos ingeridos fue el máximo de su compromiso de hosts y uso de hosts multiplicado por la asignación por defecto: `maximum(15, 10) * 150 GB = 2250 GB allotment of Ingested Spans`. Su uso incluido de tramos ingeridos fue la suma de su compromiso y asignación: `2250 GB + 100 GB = 2350 GB`. El uso bajo demanda de tramos ingeridos fue el máximo de 0 y la diferencia entre su uso facturable y asignación: `maximum(0, 2000 – 2350) = 0 GB`.

En el **Mes 3**, la organización se comprometió a 10 hosts APM y utilizó los 10. Su asignación de tramos ingeridos fue el máximo de su compromiso de hosts y uso de hosts multiplicado por la asignación por defecto: `maximum(10, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. Su uso incluido de tramos ingeridos fue la suma de su compromiso y asignación: `1500 GB + 100 GB = 1600 GB`. Su uso bajo demanda de tramos ingeridos fue el máximo de 0 y la diferencia entre su uso facturable y asignación: `maximum(0, 1600 – 1600) = 0 GB`.

#### Opción bajo demanda por hora

Una organización tiene un compromiso mensual de 10 hosts APM Pro y 0,3 GB de tramos ingeridos al mes durante un periodo de un mes. Su uso es el siguiente 

| Marca de tiempo    | Compromiso de hosts APM | Uso de hosts APM | Asignación de tramos ingeridos | Uso de tramos ingeridos | Uso de tramos ingeridos bajo demanda |
|--------------|---------------------|----------------|--------------------------|----------------------|--------------------------------|
| Hora 1 | 10    | 5      | 2,054 GB     | 2,500 GB    | 0,446 GB           |
| Hora 2 | 10    | 15     | 3,082 GB     | 3,000 GB    | 0 GB               |
| Hora 3 | 10    | 10     | 2,054 GB     | 2,054 GB    | 0 GB               |

Para un usuario con una opción bajo demanda por hora, la [asignación por defecto](#allotments-table) de tramos ingeridos para cada host APM Pro es de 0,2054 GB.

En la **Hora 1**, la organización se comprometió a 10 hosts APM pero solo utilizó 5. Su asignación por hora de tramos ingeridos fue el máximo de su compromiso de hosts y uso de hosts multiplicado por la asignación por defecto: `maximum(5, 10) * 0.2054 GB = 2.054 GB / hour`. Su uso bajo demanda para la hora es el máximo de 0 y la diferencia entre su uso facturable y su uso asignado: `maximum(0, 2.500 – 2.054) = 0.446 GB`.

En la **Hora 2**, la organización se comprometió a 10 hosts APM pero utilizó 15. Su asignación de tramos ingeridos por hora fue el máximo de su compromiso de hosts y uso de hosts multiplicado por la asignación por defecto: `maximum(15,10) * 0.2054 GB = 3.081 GB / hour`. Su uso bajo demanda para la hora es el máximo de 0 y la diferencia entre su uso facturable y su uso asignado: `maximum(0, 3.000 – 3.081) = 0 GB`.

En la **Hora 3**, la organización se comprometió a 10 hosts APM y utilizó los 10. Su asignación de tramos ingeridos por hora fue el máximo de su compromiso de hosts y uso de hosts multiplicado por la asignación por defecto: `maximum(10,10) * 0.2054 GB = 2.054 GB / hour`. Su uso bajo demanda para la hora es el máximo de 0 y la diferencia entre su uso facturable y su uso asignado: `maximum(0, 2.054 – 2.054) = 0 GB`.

Dado que la función de agregación de uso por defecto de tramos ingeridos es la suma, el uso se suma en todas las horas del mes para obtener el uso total bajo demanda del mes. Si esta organización solo tuvo 3 horas de uso de tramos ingeridos durante el mes, su uso mensual total sería 0: `4452 + 0 + 0 = 0.446 GB`.

Además, la organización tiene un compromiso mensual de 0,3 GB de tramos ingeridos. Por lo tanto, su uso mensual bajo demanda es el máximo de 0 y la diferencia entre su uso mensual y su compromiso: `maximum(0, 0.446 – 0.3) = 0.146 GB`.

## Funciones de agregación de uso para asignaciones

| Asignación             | Posibles productos principales                                      | Función de agregación de uso mensual por defecto | Función de agregación de uso por hora por defecto |
|-----------------------|---------------------------------------------------------------|--------------------------------------------|-------------------------------------------|
| Métricas personalizadas | Hosts de infraestructura Pro, Hosts de infraestructura Pro Plus, Hosts de infraestructura Enterprise, Internet de las cosas (IoT), Monitorización de cargas de trabajo serverless - Funciones, Monitorización de cargas de trabajo serverless - Aplicaciones, Invocaciones serverless, Funciones serverless  | Promedio | Promedio |
| Métricas personalizadas ingeridas | Hosts de infraestructura Pro, Hosts de infraestructura Pro Plus, Hosts de infraestructura Enterprise, Internet de las cosas (IoT), Monitorización de cargas de trabajo serverless - Funciones, Monitorización de cargas de trabajo serverless - Aplicaciones | Promedio | Promedio |
| Eventos personalizados | Hosts de infraestructura Pro, Hosts de infraestructura Pro Plus, Hosts de infraestructura Enterprise | Suma | Suma |
| Contenedores de Cloud Security    | Cloud Security       |      N/A     | Suma    |
| Contenedores CWS      | Cloud Workload Security (CWS)              |       N/A     | Suma      |
| Contenedores de infraestructura    | Hosts de infraestructura Pro, Hosts de infraestructura Pro Plus, Hosts de infraestructura Enterprise |   N/A   | Suma  |
| Contenedores perfilados | APM Enterprise, Continuous Profiler    |   N/A        | Suma   |
| Hosts perfilados        | APM Enterprise       | HWMP   | Suma     |
| Tramos indexados de CI    | CI Visibility         | Suma     | Suma   |      
| Tramos indexados de tests    | Test Optimization         | Suma   | Suma   |               
| Tramos indexados de APM | APM, APM Pro, APM Enterprise, APM serverless, </br> Legacy - Invocaciones serverless, </br> Legacy - Funciones serverless, Fargate Task (APM Pro), </br> Fargate Task (APM Enterprise) | Suma | Suma |
| Tramos ingeridos de APM | APM, APM Pro, APM Enterprise </br> APM serverless, Legacy - Invocaciones serverless </br> Legacy - Funciones serverless </br> Fargate Task (APM Pro) Fargate Task (APM Enterprise) | Suma | Suma | 
| Consultas normalizadas de DBM | Database Monitoring (DBM) | Promedio | Promedio |
| Data Streams Monitoring | APM Pro, APM Enterprise | HWMP | Suma |
| Ejecuciones del flujos de trabajo CSPM | Cloud Security | Suma | Suma |
| Fargate Task (Continuous Profiler) | Fargate Task (APM Enterprise) | Promedio | N/A |

[1]: https://www.datadoghq.com/pricing/list/
[2]: https://app.datadoghq.com/billing/usage
[3]: https://www.datadoghq.com/pricing/allotments/