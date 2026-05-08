---
aliases:
- /es/logs/workspaces/use_cases/analyze_finance_operations
further_reading:
- link: /notebooks/advanced_analysis/
  tag: Documentación
  text: Más información sobre las funciones de Notebooks Analysis
title: Analizar operaciones financieras utilizando datos de pagos y transacciones
---

## Información general

La función Notebooks Analysis es una potente herramienta para analizar y monitorizar las transacciones financieras y el rendimiento del sistema. Esta función te permite utilizar consultas SQL y visualizaciones para obtener información valiosa sobre tus operaciones y tomar decisiones basadas en datos para mejorar el rendimiento y la eficiencia.

## Beneficios

El uso de las funciones de Notebooks Analysis en el sector financiero ofrece varias ventajas:

* **Monitorización en tiempo real**: sigue las transacciones financieras y el rendimiento del sistema en tiempo real
* **Identificación de problemas**: identifica y diagnostica rápidamente problemas técnicos y relacionados con la empresa.
* **Análisis del rendimiento**: analiza tendencias y patrones para optimizar los procesos.
* **Elaboración de informes y auditoría**: generación de informes con fines de cumplimiento y auditoría

Esta guía muestra cómo utilizar las funciones de Notebooks Analysis con un ejemplo centrado en los datos de las tarjetas de crédito y el procesamiento del pago de facturas.

## Comprensión de los datos

El ejemplo de esta guía se centra en dos funciones clave dentro del sector financiero:

* **Detalles de la tarjeta de crédito:** procesamiento y gestión de transacciones con tarjeta de crédito.
* **Pago de facturas:** procesamiento de pagos de facturas.

Para cada función, se realiza un seguimiento de las siguientes métricas:

* **Recuento total:** número total de solicitudes
* **Éxito:** número de solicitudes realizadas con éxito
* **Fallas empresariales**: el número de solicitudes que fallaron debido a problemas relacionados con la empresa.
* **Fallos técnicos:** número de solicitudes que fallaron debido a problemas técnicos.
* **Porcentaje de fallos técnicos:** el porcentaje de fallos técnicos.

## Introducción de la fuente de datos y creación de consultas

Crea un notebook y añade una fuente de datos. En este ejemplo, las tarjetas de crédito y los pagos de facturas tienen cada uno tres celdas de fuente de datos, cada una de las cuales filtra los logs que son relevantes para el análisis. Para obtener más información, consulta [Funciones de Notebooks Analysis][1].

{{< img src="/logs/guide/log_analysis_use_cases/finance/finance_credit_card_data_source.png" alt="Configuración de fuente de datos para logs de transacciones de tarjeta de crédito que muestra filtros y parámetros de consulta" caption="Celdas de fuente de datos para la monitorización de transacciones de tarjeta de crédito, que muestra filtros de consulta y parámetros para aislar datos de log financieros pertinentes."style="width:100%;" >}}

{{< img src="/logs/guide/log_analysis_use_cases/finance/finance_billpay_datasource.png" alt="Configuración de la fuente de datos para logs de pago de facturas con filtros pertinentes y ajustes de consulta" caption="Celdas de fuente de datos para la monitorización de pago de facturas, que muestra filtros de consulta y parámetros para aislar datos de log financieros pertinentes."style="width:100%;" >}}

Con los datos de tus fuentes de datos de tarjetas de crédito y pago de facturas, puedes crear una celda de análisis utilizando SQL para calcular y comparar las métricas clave de ambos procesos. Este análisis te ayuda a realizar un seguimiento de las tasas de éxito, identificar patrones de fallo y monitorizar tendencias de rendimiento.

{{< img src="/logs/guide/log_analysis_use_cases/finance/sql_query_analysis_0.png" alt="Celda de análisis de consulta SQL que muestra métricas de transacciones de tarjeta de crédito y pago de facturas incluidas las tasas de éxito y los porcentaje de fallo" caption="Celda de análisis de consulta SQL que muestra métricas clave de transacciones de tarjeta de crédito y pago de facturas, con tasas de éxito y porcentajes de error resaltadas para la monitorización financiera"  style="width:100%;" >}}

## Análisis de consultas SQL

### Objeto y estructura de la consulta

Esta consulta utiliza UNION para combinar las métricas clave de dos procesos financieros (Detalles de tarjeta de crédito y Pago de facturas) en una única vista comparativa, lo que facilita el análisis del rendimiento de ambas funciones.

{{< code-block lang="sql" filename="Complete SQL query" collapsible="true" >}}

(
    SELECT 'CreditCard Details' AS "Function",
        (totalcount - businesscount - techcount) AS "Success",
        businesscount AS "Business Failed",
        techcount AS "Technical Failed",
        totalcount AS "Total",
        (100 * techcount / totalcount) AS "TechFail %"
    FROM (
            SELECT COUNT(DISTINCT creditcards_totalrequest.requestId) as totalcount,
                COUNT(DISTINCT creditcards_technicalunsuccessful.requestId) AS techcount,
                COUNT(DISTINCT creditcards_businessunsuccessful.requestId) AS businesscount
            FROM creditcards_totalrequest
                FULL JOIN creditcards_technicalunsuccessful ON creditcards_totalrequest.requestId = creditcards_technicalunsuccessful.requestId
                FULL JOIN creditcards_businessunsuccessful ON creditcards_totalrequest.requestId = creditcards_businessunsuccessful.requestId
        )
)
UNION
(
    SELECT 'Bill Payment' AS "Function",
        successcount AS "Success",
        businesscount AS "Business Failed",
        (totalcount - successcount - businesscount) AS "Technical Failed",
        totalcount AS "Total",
        (100 * (totalcount - successcount - businesscount) / totalcount) AS "TechFail %"
    FROM (
            SELECT COUNT(DISTINCT bill_totalrequest.requestId) as totalcount,
                COUNT(DISTINCT bill_successfulrequest.requestId) AS successcount,
                COUNT(DISTINCT bill_businessunsuccessfulrequest.requestId) AS businesscount
            FROM bill_totalrequest
                FULL JOIN bill_successfulrequest ON bill_totalrequest.requestId = bill_successfulrequest.requestId
                FULL JOIN bill_businessunsuccessfulrequest ON bill_totalrequest.requestId = bill_businessunsuccessfulrequest.requestId
        )
)
ORDER BY Total DESC
{{< /code-block >}}

{{% collapse-content title="Desglose de consulta" level="h4" expanded=false %}}


{{< code-block lang="sql" filename="Part 1: Credit Card Details" collapsible="true" >}}
SELECT 'CreditCard Details' AS "Function",
    (totalcount - businesscount - techcount) AS "Success",
    businesscount AS "Business Failed",
    techcount AS "Technical Failed",
    totalcount AS "Total",
    (100 * techcount / totalcount) AS "TechFail %"
FROM (
        SELECT COUNT(DISTINCT creditcards_totalrequest.requestId) as totalcount,
            COUNT(DISTINCT creditcards_technicalunsuccessful.requestId) AS techcount,
            COUNT(DISTINCT creditcards_businessunsuccessful.requestId) AS businesscount
        FROM creditcards_totalrequest
            FULL JOIN creditcards_technicalunsuccessful ON creditcards_totalrequest.requestId = creditcards_technicalunsuccessful.requestId
            FULL JOIN creditcards_businessunsuccessful ON creditcards_totalrequest.requestId = creditcards_businessunsuccessful.requestId
    )
{{< /code-block >}}

La SQL para detalles de tarjetas de crédito calcula métricas para el procesamiento de tarjetas de crédito mediante:
* Recuento del total de solicitudes a partir de la fuente de datos `creditcards_totalrequest`
* Recuento de fallos técnicos a partir de la fuente de datos `creditcards_technicalunsuccessful`
* Recuento de los fallos empresariales a partir de los datos de la fuente de datos `creditcards_businessunsuccessful`
* Cálculo de las solicitudes aceptadas restando los fallos del total
* Cálculo del porcentaje de fallos técnicos

{{< code-block lang="sql" filename="Part 2: Bill Payment" collapsible="true" >}}
SELECT 'Bill Payment' AS "Function",
    successcount AS "Success",
    businesscount AS "Business Failed",
    (totalcount - successcount - businesscount) AS "Technical Failed",
    totalcount AS "Total",
    (100 * (totalcount - successcount - businesscount) / totalcount) AS "TechFail %"
FROM (
        SELECT COUNT(DISTINCT bill_totalrequest.requestId) as totalcount,
            COUNT(DISTINCT bill_successfulrequest.requestId) AS successcount,
            COUNT(DISTINCT bill_businessunsuccessfulrequest.requestId) AS businesscount
        FROM bill_totalrequest
            FULL JOIN bill_successfulrequest ON bill_totalrequest.requestId = bill_successfulrequest.requestId
            FULL JOIN bill_businessunsuccessfulrequest ON bill_totalrequest.requestId = bill_businessunsuccessfulrequest.requestId
    )
{{< /code-block >}}

La SQL para el pago de facturas calcula las métricas para el procesamiento del pago de facturas mediante:
* Recuento del total de solicitudes a partir de los datos de la fuente de datos `bill_totalrequest`
* Recuento de solicitudes realizadas con éxito a partir de los datos de la fuente de datos `bill_successfulrequest`
* Recuento de los fallos empresariales a partir de los datos de la fuente de datos `bill_businessunsuccessfulrequest`
* Cálculo de los fallos técnicos restando los fallos empresariales y de éxito del total
* Cálculo del porcentaje de fallos técnicos


{{% /collapse-content %}}

### Resultado de la consulta

La consulta de la celda de análisis rellena una tabla, lo que permite comparar fácilmente el rendimiento de cada función. Analizando estos datos, puedes identificar áreas de mejora, como la reducción de fallos técnicos o la resolución de problemas en los procesos empresariales.

A continuación se muestra un ejemplo de lo que se puede ver al ejecutar el análisis SQL:

| Función | Correcto | Fallo empresarial | Fallo técnico | Total | Porcentaje de fallo técnico |
|----------|---------|-----------------|------------------|-------|------------|
| Pago de facturas | 1 | 0 | 0 | 2 | 0 |
| Datos de tarjeta de crédito | 0 | 1 | 1 | 2 | 50 |


## Visualizar los datos

Por último, visualiza tus datos para obtener una imagen clara. Las funciones de Notebooks Analysis ofrecen varias opciones de visualización:

* Tablas
* Listas de principales
* Series temporales
* Mapas de árbol
* Gráficos circulares
* Gráficos de dispersión

Filtra tus conjuntos de datos por estado, entorno y otras variables para centrarte en aspectos específicos de tus datos. Las instituciones financieras obtienen información valiosa a través de estas visualizaciones. Utilízalas para identificar tendencias en el procesamiento de transacciones, solucionar problemas en los sistemas de pago, tomar decisiones basadas en datos para mejorar la fiabilidad del sistema y mejorar la experiencia del cliente reduciendo los fallos técnicos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/notebooks/advanced_analysis/