---
aliases:
- /es/account_management/billing/usage_details/
description: Monitoree su uso de Datadog en todos los productos con resúmenes del
  mes a la fecha, tendencias de uso, principales Custom Metrics y uso de logs por
  índice.
title: Detalles de uso
---
{{< callout url="" btn_hidden="true" header="Nuevo: Bill Overview" respect-site-support="false" >}}
La nueva experiencia de Bill Overview se encuentra ahora en disponibilidad limitada y comenzará a implementarse automáticamente en todas las organizaciones a partir de marzo de 2026. [Más información](/account_management/plan_and_usage/bill_overview/).
{{< /callout >}}

## Descripción general {#overview}

Los administradores pueden acceder a la página [Usage][1] colocando el cursor sobre su nombre de usuario en la parte inferior izquierda y luego navegar a:
`Plan & Usage`--> `Usage`.

La página Usage muestra el uso agrupado por categoría de producto. Puede navegar a una pestaña de producto para ver el uso específico de esa categoría de producto o a la pestaña "All" para ver el uso de todos los productos. Cada pestaña proporciona la siguiente información:

* Resumen del mes a la fecha
* Uso general (actual e histórico)

Ciertas pestañas de productos también contienen herramientas adicionales:

* Pestaña Custom Metrics: Top Custom Metrics
* Pestaña Log Management: Logs Usage by Index

## Resumen del mes a la fecha {#month-to-date-summary}

Esta sección resume su uso del mes a la fecha. En la pestaña "All", vea su uso del mes a la fecha de servidores de infraestructura, Containers, Custom Metrics, servidores de APM, logs y cualquier otra parte de la plataforma que haya utilizado durante el mes. 

{{< img src="account_management/billing/usage-details-v2-01.png" alt="Resumen de uso - Pestaña All" >}}

En las pestañas específicas de productos, vea su uso del mes a la fecha de los productos en esa categoría de producto.

{{< img src="account_management/billing/usage-details-v2-02.png" alt="Resumen de uso - Network" >}}

El uso del mes a la fecha que se muestra arriba es el uso "All", el cual incluye el uso no facturable, como las pruebas de productos. La mayoría de las cuentas pueden visualizar el uso "Billable", que solo muestra el uso que contribuye a su factura final. La vista "Billable" desglosa su uso por compromisos, asignaciones y uso bajo demanda.

{{< img src="account_management/billing/UsageTilesWithAllPills.png" alt="Resumen de uso - Billable" >}}
Para los usuarios de API, hay endpoints disponibles para acceder al uso ["All"][2] y al uso ["Billable"][3].

El uso del mes hasta la fecha de cada producto se calcula de la siguiente manera:

| Producto                   | Descripción                                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Infra. Hosts             | Muestra el percentil 99 de todos los hosts de infraestructura distintos durante todas las horas del mes actual.                         |
| Containers               | Muestra el nivel máximo de todos los Containers distintos durante todas las horas del mes actual.                                    |
| Hosts de APM                | Muestra el percentil 99 de todos los hosts de APM distintos durante todas las horas del mes actual.                                    |
| Hosts perfilados           | Muestra el percentil 99 de todos los hosts perfilados distintos durante todas las horas del mes actual.                               |
| Containers perfilados      | Muestra el promedio de todos los Containers perfilados distintos durante todas las horas del mes actual.                                  |
| Custom Metrics           | Muestra el número promedio de [Custom Metrics][4] distintas durante todas las horas del mes actual.                               |
| Custom Metrics ingeridas  | Muestra el número promedio de Custom Metrics INGERIDAS distintas durante todas las horas del mes actual.                           |
| Logs ingeridos            | Muestra la suma de todos los bytes de log ingeridos durante todas las horas del mes actual.                                                |
| Logs indexados             | Muestra la suma de todos los eventos de log indexados durante todas las horas del mes actual.                                                |
| Logs escaneados             | Muestra la suma de todos los bytes de log escaneados por Sensitive Data Scanner durante todas las horas del mes actual.                       |
| Spans ingeridos           | Muestra la suma de todos los spans ingeridos durante todas las horas del mes actual.                                                    |
| Spans indexados            | Muestra la suma de todos los spans de Indexed Spans indexados durante todas las horas del mes actual.                                             |
| Logs analizados (Security) | Muestra la suma de todos los bytes de log analizados ingeridos durante todas las horas del mes actual.                                       |
| Funciones Serverless     | Muestra el promedio del número de funciones que se ejecutan 1 o más veces cada hora en el mes actual.              |
| Invocaciones Serverless   | Muestra la suma de todas las invocaciones durante todas las horas del mes actual.                                                       |
| Tareas de Fargate            | Muestra la suma de todas las tareas de Fargate durante todas las horas del mes actual.                                                     |
| Network Hosts            | Muestra el percentil 99 de todos los Network Hosts distintos durante todas las horas del mes actual.                                |
| Flujos de red            | Muestra la suma de todos los flujos de red indexados durante todas las horas del mes actual.                                             |
| Dispositivos de red          | Muestra el percentil 99 de todos los dispositivos de red distintos durante todas las horas del mes actual.                              |
| Pruebas de API sintéticas      | Muestra la suma de todas las pruebas de API sintéticas durante todas las horas del mes actual.                                               |
| Pruebas de navegador sintéticas  | Muestra la suma de todas las pruebas de navegador sintéticas durante todas las horas del mes actual.                                           |
| Sesiones RUM             | Muestra la suma de todas las sesiones RUM distintas durante todas las horas del mes actual.                                             |
| Incident Management      | Muestra el número de usuarios activos únicos hasta la fecha en el mes seleccionado que interactuaron con el ciclo de vida y las líneas de tiempo de los incidentes.     |
| Dispositivos IoT              | Muestra el percentil 99 de todos los dispositivos IoT distintos durante todas las horas del mes actual.                                  |


## Tendencias de uso {#usage-trends}

La sección [Usage Trends][5] contiene gráficos de uso del producto que muestran el uso sumado para todas las organizaciones en una cuenta. Los informes de uso se pueden descargar a través del botón {{< ui >}}Download as CSV{{< /ui >}}. Para cada organización, estos informes incluyen un desglose por horas del uso por producto. 

{{< img src="account_management/billing/UsageTrendsOverviewAndCSV.png" alt="Página de gráficos de Usage Trends en la aplicación de Datadog con la opción Download as CSV resaltada" style="width:100%; align:left" >}}

Para los productos con subtipos, cada categoría se distingue en el gráfico de ese producto. 

{{< img src="account_management/billing/UsageGraphsByProductTab.png" alt="Resumen de uso con la pestaña de infraestructura seleccionada y múltiples gráficos para subtipos de uso de infraestructura, como servidores de infraestructura, servidores con Agent y Containers" style="width:100%; align:left" >}}

Se pueden encontrar gráficos más detallados de los subtipos de productos en la pestaña de cada producto. Por ejemplo, hay un desglose por tipo de servidor disponible en la pestaña Infrastructure.

{{< img src="account_management/billing/UsageBreakdownByProductSubtype.png" alt="Sección de tendencias de uso de la pestaña Infrastructure con el gráfico Infra Hosts, que contiene servidores con Agent y servidores de AWS, y el gráfico Indexed Logs, que contiene Daily Indexed Live Logs y Cumulative Indexed Live Logs" style="width:100%; align:left" >}}
 
El uso acumulativo a lo largo del tiempo está disponible para productos basados en sumas.

{{< img src="account_management/billing/CumulativeUsageLine.png" alt="Gráficos para Spans ingeridos y Spans indexados, cada uno trazando datos para las sumas diarias y acumulativas de sus respectivos spans" style="width:100%; align:left" >}}

La selección de tiempo contiene opciones para ver gráficos de uso en intervalos diarios, semanales, mensuales o anuales.

{{< img src="account_management/billing/TimeGranularity.png" alt="Intervalos de tiempo en los gráficos de uso" style="width:100%; align:left" >}}

## Etiquetas de uso facturable bajo demanda y líneas de uso comprometido {#billable-on-demand-pills-and-committed-lines}

<div class="alert alert-danger">Esta función está en versión beta. Para solicitar acceso y confirmar que su organización cumple con los criterios de la función, comuníquese con su representante de cuenta o con el <a href="https://docs.datadoghq.com/help/">Soporte al cliente</a>.</div>

Las etiquetas moradas de uso bajo demanda resaltan la parte del uso facturable que corresponde al uso bajo demanda. Las etiquetas azules de uso comprometido y asignado resaltan la parte de su uso que está cubierta por compromisos y <a href="https://www.datadoghq.com/pricing/allotments/">asignaciones</a> de productos principales. La línea `Committed` discontinua muestra los compromisos por producto, sin ninguna asignación (como Custom Metrics o Containers).

Para mostrar las etiquetas de uso comprometido y asignado en una tarjeta, asegúrese de que el interruptor {{< ui >}}See included usage{{< /ui >}} esté activado:
1. En la tarjeta de uso total donde desea ver los datos de uso comprometido y asignado, haga clic en el icono de ojo ({{< ui >}}See included usage{{< /ui >}}).
1. El icono cambia a un ojo con una barra diagonal. Las etiquetas de uso comprometido y asignado aparecen en la tarjeta.

{{< img src="account_management/billing/UsageTilesWithPillsUsageTrendsWithCommittedLine.png" alt="Líneas de uso comprometido y etiquetas de uso facturable bajo demanda en los gráficos de tendencias." style="width:100%; align:left" >}}


## Top Custom Metrics {#top-custom-metrics}

En la pestaña Custom Metrics, la tabla Top Custom Metrics proporciona dos vistas: una del uso acumulado en lo que va del mes y otra del uso del día más reciente, por ejemplo, el uso en la fecha de la última actualización.

La vista "Top 5000" proporciona la siguiente información sobre sus 5000 métricas personalizadas principales:
* Nombre de la métrica
* Promedio de métricas personalizadas por hora
* Máximo de métricas personalizadas por hora
* El porcentaje de contribución de la métrica al uso general de métricas personalizadas
* Busque una métrica entre sus 5000 métricas personalizadas principales
* Estos datos se pueden descargar como un archivo CSV.

La vista "All" proporciona la siguiente información sobre todas sus métricas personalizadas:
* Nombre de la métrica
* Promedio de métricas personalizadas por hora
* Máximo de métricas personalizadas por hora
* Busque una métrica entre todas sus métricas personalizadas
* Estos datos se pueden descargar como un archivo CSV, con un máximo de 300,000 métricas personalizadas. Puede descargar más de 300,000 métricas personalizadas mediante nuestro [punto de conexión de la API][6].


Para obtener más detalles sobre sus métricas, vaya a [Metrics Catalog][7] colocando el cursor sobre la fila de la métrica que le interesa y haciendo clic en el icono de medidor que aparece a la derecha.

{{< img src="account_management/billing/usage-metrics-05.png" alt="Descripción general de la tabla Top Custom Metrics" >}}

## Uso de logs por índice {#logs-usage-by-index}

En la pestaña Log Management, esta tabla muestra su uso de logs indexados por hora, día, mes y año, por nombre de índice y período de retención. También muestra el desglose entre logs en vivo y [logs rehidratados][8]. Se proporciona la siguiente información:

* Nombre del índice
* Período de retención en días
* Recuento de logs indexados
* El porcentaje de contribución del índice al uso general de logs indexados para el período de tiempo seleccionado

Estos datos se pueden descargar como un archivo CSV.

{{< img src="account_management/billing/usage-details-v3-03.png" alt="Uso de logs por índice" >}}

## Notificaciones de uso por primera vez {#first-time-usage-notifications}

<div class="alert alert-danger">Esta función está en versión beta. Para solicitar acceso y confirmar que su organización cumple con los criterios de la función, comuníquese con su representante de cuenta o con <a href="https://docs.datadoghq.com/help/">Customer Support</a>.</div>

La función de notificaciones de uso por primera vez envía notificaciones por correo electrónico cuando hay un uso facturable por primera vez para un producto nuevo que no está incluido en su contrato actual. Los correos electrónicos se envían aproximadamente 48 horas después de que el uso ocurre por primera vez durante un mes determinado.

Después de habilitar la función, se agrega una nueva pestaña {{< ui >}}Usage Notifications{{< /ui >}} a la página {{< ui >}}Plan and Usage{{< /ui >}} de la organización principal. En esta pestaña, hay una lista de todos los productos cubiertos por la funcionalidad. Desmarcar una casilla detiene las notificaciones para ese producto para todos los usuarios dentro de la cuenta. Si se detecta cualquier uso por primera vez fuera de su contrato activo más reciente, los usuarios no reciben una notificación para ningún producto desmarcado.

{{< img src="account_management/plan_and_usage/usage-notifications.png" alt="Página de notificaciones de uso por primera vez con una lista de productos que incluye elementos marcados y desmarcados" style="width:100%; align:left" >}}

Cualquier usuario con permisos de _Usage Notifications Read_ o _Write_ recibe correos electrónicos. Para la mayoría de las organizaciones, esto significa cualquier administrador.

Si su cuenta de Datadog es multiorganización, los usuarios de la organización principal que tengan permisos reciben notificaciones por correo electrónico sobre el uso en las organizaciones secundarias. Estos correos electrónicos indican qué organización secundaria generó el uso y el producto para el cual se generó el uso. Los usuarios de la organización secundaria con este permiso reciben correos electrónicos únicamente relacionados con su organización.

{{< img src="account_management/plan_and_usage/usage-notifications-email.png" alt="Correo electrónico de notificaciones de uso por primera vez con detalles sobre un ejemplo de uso por primera vez" style="width:100%; align:left" >}}

## Solución de problemas {#troubleshooting}

Para preguntas técnicas, comuníquese con el [soporte de Datadog][9].

Para preguntas sobre facturación, comuníquese con su gerente de [Customer Success][10].


[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://docs.datadoghq.com/es/api/latest/usage-metering/#get-usage-across-your-multi-org-account
[3]: https://docs.datadoghq.com/es/api/latest/usage-metering/#get-billable-usage-across-your-account
[4]: /es/metrics/custom_metrics/
[5]: https://app.datadoghq.com/billing/usage
[6]: https://docs.datadoghq.com/es/api/latest/usage-metering/#get-all-custom-metrics-by-hourly-average
[7]: https://docs.datadoghq.com/es/metrics/summary/#overview
[8]: https://docs.datadoghq.com/es/logs/archives/rehydrating/?tab=awss3#overview
[9]: /es/help/
[10]: mailto:success@datadoghq.com
[11]: /es/account_management/plan_and_usage/bill_overview/