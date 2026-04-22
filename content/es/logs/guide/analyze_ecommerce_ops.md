---
aliases:
- /es/logs/workspaces/use_cases/analyze_ecommerce_ops
further_reading:
- link: /notebooks/advanced_analysis/
  tag: Documentación
  text: Más información sobre las funciones de Notebooks Analysis
title: Analizar las operaciones de comercio electrónico utilizando datos sobre pagos
  y comentarios de los clientes
---

## Información general

Las funciones de Notebooks Analysis permiten a las empresas de comercio electrónico obtener información valiosa sobre sus tiendas en línea mediante el análisis de los datos de las transacciones, el comportamiento de los clientes y el rendimiento del sistema. Esta guía muestra cómo utilizar las funciones de Notebooks Analysis para monitorizar tu plataforma de comercio electrónico, detectar problemas y optimizar la experiencia de compra.

## Beneficios

Utilizar las funciones de Notebooks Analysis para monitorizar el comercio electrónico ofrece varias ventajas:

* **Visibilidad de las transacciones en tiempo real**: realiza un seguimiento de las ventas, los abandonos de carritos y los procesos de pago a medida que se producen.
* **Conocimiento de la experiencia del cliente**: identifica los puntos débiles en el viaje del cliente
* **Análisis del impacto en los ingresos**: cuantifica el impacto financiero de los problemas técnicos
* **Optimización del rendimiento**: localiza y soluciona los cuellos de botella que afectan a las tasas de conversión.

Esta guía muestra cómo utilizar las funciones de Notebooks Analysis con un ejemplo centrado en los fallos de pago y las reseñas de los clientes.

## Comprensión de los datos
Sigue este ejemplo para comprender cómo correlacionar los **errores de procesamiento de pagos** de tu servicio `web-store` con las **valoraciones y reseñas negativas de los clientes** del servicio `shopist-customer-feedback`. También demuestra cómo cuantificar el **impacto en los ingresos** de las malas valoraciones causadas por experiencias de pago fallidas.

El ejemplo se centra en dos aspectos críticos de las operaciones de comercio electrónico:

* **Procesamiento de pagos**: logs de la gateway de pago indicando transacciones exitosas y fallidas.
* **Comentarios de los clientes**: valoraciones y comentarios enviados después de los intentos de compra

## Introducción de la fuente de datos y creación de consultas

Crea un notebook y añade fuentes de datos para las transacciones de pago y las opiniones de los clientes. Para obtener más información, consulta [Funciones de Notebooks Analysis][1].

### 1. Comentarios de clientes con malas reseñas

Esta celda de fuente de datos contiene logs de opiniones de clientes con reseñas negativas recopiladas por el servicio de reseñas, centrándose en los clientes que informaron de problemas.

{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/customer_feedback_bad_ratings.png" alt="Configuración de la fuente de datos para logs de comentarios de clientes que muestran el filtro de reseñas negativas" caption="Celda de fuente de datos para comentarios de cliente, filtrado para mostrar solo reseñas negativas que identifican experiencias negativas." style="width:100%;" >}}

### 2. Errores de pago en la tienda web

Esta celda de fuente de datos muestra los logs de errores de pago de la plataforma de comercio electrónico, incluido el ID del comerciante y el valor del carrito para ayudar a identificar los fallos de alto impacto.

{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/webstore_payment_errs.png" alt="Configuración de fuente de datos para logs de errores de pago con valor del carrito e información del comerciante" caption="Celda de fuente de datos para errores de pagos, que muestra los detalles de transacción incluido el valor de carrito e información del comerciante." style="width:100%;" >}}

## Análisis de consultas SQL

### Objeto y estructura de la consulta

Esta consulta correlaciona los errores de pago con los comentarios de los clientes, clasificando las transacciones por valor para comprender la relación entre los problemas técnicos, la satisfacción del cliente y el impacto en los ingresos.

{{< code-block lang="sql" filename="Complete SQL query" collapsible="true" >}}
SELECT
    wpe.timestamp,
    wpe.Merchant,
    wpe.cart_value,
    wpe.display_id,
    CASE
        WHEN wpe.cart_value > 50 THEN 'high value'
        ELSE 'low value'
    END AS tier
FROM
    webstore_payment_errs wpe
JOIN
    customer_feedback_bad_ratings cfbr ON wpe.display_id = cfbr.display_id
WHERE
    cfbr.status = 'info'
ORDER BY
    cart_value DESC
{{< /code-block >}}

{{% collapse-content title="Desglose de la consulta" level="h4" expanded=false %}}

Esta consulta SQL realiza varias funciones importantes:

1. **Correlación de datos**: une los logs de errores de pago con los logs de comentarios de los clientes utilizando el `display_id` para conectar la misma transacción.
2. **Segmentación por valor**: categoriza las transacciones en "alto valor" (>50 $) o "bajo valor" para priorizar los problemas.
3. **Identificación de comerciantes**: incluye la información del comerciante para identificar patrones por vendedor
4. **Seguimiento cronológico**: las marcas de tiempo ayudan a identificar cuándo se produjeron los problemas
5. **Priorización**: resultados de pedidos por valor del carrito para destacar primero el mayor impacto en los ingresos.

La consulta se centra en los errores de pago que también recibieron malas reseñas, proporcionando una visión de los problemas técnicos que afectaron directamente a la satisfacción del cliente.
{{% /collapse-content %}}

### Resultado de la consulta

La consulta de la celda de análisis rellena una tabla que muestra los errores de pago que dieron lugar a comentarios negativos de los clientes, clasificados por nivel de valor. Al analizar estos datos, puedes priorizar las correcciones en función del impacto en los ingresos y mejorar tanto la fiabilidad técnica como la satisfacción del cliente.

{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/analysis_join_bad_ratings_with_payment_errors.png" alt="Resultados de la consulta SQL que muestra errores de pago con comentarios de cliente asociados, información del comerciante y categorización del valor" caption="Resultados de análisis que muestra errores de pago correlacionados y comentarios de cliente, con las transacciones categorizadas por nivel de valor según prioridad." style="width:100%;" >}}

## Visualizar los datos

Las funciones Notebooks Analysis ofrecen potentes capacidades de visualización para transformar los datos de comercio electrónico en información práctica:

* **Gráficos de series temporales**: seguimiento de errores de pago y malas reseñas a lo largo del tiempo para identificar patrones o picos.
* **Comparación del rendimiento de los vendedores**: compara las tasas de éxito de los distintos vendedores de tu plataforma.
* **Distribución por niveles de valor**: visualiza qué proporción de los problemas que afectan a las transacciones son de alto valor frente a cuales son de bajo valor.
* **Mapas de distribución geográfica**: ve dónde se producen geográficamente los problemas de pago

{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/visualization_most_bad_ratings.png" alt="Visualización de datos de comercio electrónico que muestra errores de pago por comerciante y nivel de valor" caption="Gráfico de mapa de árbol que muestra la distribución de errores de pago por comerciante y nivel de valor, que destaca qué vendedores tienen más problemas de transacciones de alto valor." style="width:100%;" >}}

## Análisis avanzado de consultas SQL

Las tablas de referencia de las funciones de Notebooks Analysis permiten importar datos contextuales adicionales para enriquecer el análisis. En el caso de las operaciones de comercio electrónico, las tablas de referencia pueden proporcionar un contexto empresarial esencial que no está disponible únicamente en los logs.

En este ejemplo, utilizaremos una tabla de referencia que contiene detalles del comerciante para mejorar nuestro análisis de errores de pago:

### 1. Crear una tabla de referencia
Carga un archivo CSV con información sobre el comerciante o consúltalo desde otra fuente de datos.
{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/merch_details.png" alt="Tabla de referencia que muestra detalles del comerciante, incluidos ID de comerciante, nombre, información de contacto y estado de nivel para el análisis de comercio electrónico" style="width:100%;" >}}

### 2. Vincular los datos de log 
Utiliza el ID del comerciante como clave común para conectar los datos de log con los detalles del comerciante. En el ejemplo, el análisis combina los logs de error de pago con los datos de referencia del comerciante para proporcionar contexto empresarial para la resolución de problemas.
{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/combined_salesforce.png" alt="Unión de la consulta SQL con datos de log, mediante la tabla de referencia para brindar contexto empresarial para los errores de pago"  style="width:100%;" >}}

### 3. Consultas de campos calculados
Añade contexto empresarial como nivel de comerciante, detalles del contrato o contactos de asistencia. La siguiente consulta [Campo calculado][2] calcula la suma de los ingresos perdidos por transacciones fallidas, agrupados por nivel de comerciante para identificar los segmentos de alto impacto:
{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/sum_lost_revenue.png" alt="Consulta SQL que calcula la ganancia total perdida desde las transacciones fallidas por nivel de comerciante" style="width:100%;" >}}

### 4. Visualizar los resultados
Crea gráficos para visualizar la pérdida de ingresos por nivel de comercio para una evaluación más clara del impacto en el negocio. El siguiente gráfico circular muestra la distribución de los ingresos perdidos entre los distintos niveles de comerciantes, destacando qué segmentos contribuyen en mayor medida a la pérdida de ingresos y requieren atención inmediata. Este gráfico facilita a las partes interesadas la rápida identificación de las categorías de comerciantes que están experimentando el mayor impacto financiero por transacciones fallidas.
{{< img src="/logs/guide/log_analysis_use_cases/analyze_ecommerce_ops/visualize_total_loss_revenue.png" alt="Visualización de las ganancias totales perdidas de transacciones fallidas por nivel de comerciante" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/notebooks/advanced_analysis/
[2]: /es/notebooks/advanced_analysis/#calculated-fields-queries