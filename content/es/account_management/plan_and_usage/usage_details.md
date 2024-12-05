---
aliases:
- /es/account_management/billing/usage_details/
title: Detalles de uso
---

## Información general

Los administradores pueden acceder a la página [Usage][1] (Uso) pasando el cursor por encima de su nombre de usuario en la parte inferior izquierda y, a continuación, haciendo clic en:
`Plan & Usage`--> `Usage`.

La página Usage muestra el uso que se hace de cada categoría de productos. Ve a la pestaña de un producto para ver el uso de esa categoría de productos en particular o selecciona la pestaña "All" (Todos) para ver el uso de todos los productos. Cada pestaña proporciona la siguiente información:

* Resumen de lo que va de mes
* Uso general (actual e histórico)

Algunas pestañas de productos contienen herramientas adicionales:

* Pestaña Custom Metrics (Métricas personalizadas): principales métricas personalizadas
* Pestaña Log Management (Gestión de logs): uso de logs por índice

## Resumen de lo que va de mes

En esta sección, se muestra un resumen de tu uso durante lo que va de mes. En la pestaña All (Todo), puedes ver cuánto has usado durante este mes los hosts de infraestructura, los contenedores, las métricas personalizadas, los hosts de APM, los logs y cualquier otro elemento de la plataforma.

{{< img src="account_management/billing/usage-details-v2-01.png" alt="Usage Summary - Pestaña All" >}}

En las pestañas específicas de cada producto, podrás ver el uso que has hecho de los productos de esa categoría en lo que va de mes.

{{< img src="account_management/billing/usage-details-v2-02.png" alt="Usage Summary - pestaña Network" >}}

El uso durante lo que va de mes que se muestra en la parte superior es el consumo total ("All"), incluso el no facturable, como las pruebas de productos. La mayoría de las cuentas pueden consultar el uso facturable ("Billable"), es decir, el uso que se reflejará en la factura final. La vista "Billable" desglosa el uso bajo demanda que supera tus compromisos y asignaciones.

{{< img src="account_management/billing/usage-details-v2-07.png" alt="Usage Summary - vista Billable" >}}
Los usuarios de la API disponen de endpoints para acceder a las vistas de uso ["All"][2] y ["Billable"][3].

El uso de cada producto durante lo que va de mes se calcula del siguiente modo:

| Producto                   | Descripción                                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Hosts de infra.             | Muestra el percentil 99 de los distintos hosts de infraestructura durante todas las horas del mes en curso.                         |
| Contenedores               | Muestra el límite máximo de los distintos contenedores durante todas las horas del mes en curso.                                    |
| Hosts de APM                | Muestra el percentil 99 de los distintos hosts de APM durante todas las horas del mes en curso.                                    |
| Hosts perfilados           | Muestra el percentil 99 de los distintos hosts perfilados durante todas las horas del mes en curso.                               |
| Contenedores perfilados      | Muestra el promedio de los distintos contenedores perfilados durante todas las horas del mes en curso.                                  |
| Métricas personalizadas           | Muestra el promedio de las distintas [métricas personalizadas][4] durante todas las horas del mes en curso.                               |
| Métricas personalizadas ingeridas  | Muestra el promedio de las distintas métricas personalizadas INGERIDAS durante todas las horas del mes en curso.                           |
| Logs ingeridos            | Muestra la suma de todos los bytes de logs ingeridos durante todas las horas del mes en curso.                                                |
| Logs indexados             | Muestra la suma de todos los eventos de logs indexados durante todas las horas del mes en curso.                                                |
| Logs escaneados             | Muestra la suma de todos los bytes de logs escaneados por Sensitive Data Scanner durante todas las horas del mes en curso.                       |
| Tramos ingeridos           | Muestra la suma de todos los tramos (spans) ingeridos durante todas las horas del mes en curso.                                                    |
| Tramos indexados            | Muestra la suma de todos los tramos (spans) indexados durante todas las horas del mes en curso.                                             |
| Logs analizados (Seguridad) | Muestra la suma de todos los bytes de logs analizados ingeridos durante todas las horas del mes en curso.                                       |
| Funciones serverless     | Muestra el promedio del número de funciones que se ejecutan una o más veces por hora durante el mes en curso.              |
| Invocaciones serverless   | Muestra la suma de todas las invocaciones realizadas durante todas las horas del mes en curso.                                                       |
| Tareas de Fargate            | Muestra la suma de todas las tareas de Fargate realizadas durante todas las horas del mes en curso.                                                     |
| Hosts de red            | Muestra el percentil 99 de los distintos hosts de red durante todas las horas del mes en curso.                                |
| Flujos de red            | Muestra la suma de todos los flujos de red indexados durante todas las horas del mes en curso.                                             |
| Dispositivos de red          | Muestra el percentil 99 de los distintos dispositivos de red durante todas las horas del mes en curso.                              |
| Tests de la API de Synthetic      | Muestra la suma de todos los tests de la API de Synthetic realizados durante todas las horas del mes en curso.                                               |
| Tests del navegador de Synthetic  | Muestra la suma de todos los tests del navegador de Synthetic realizados durante todas las horas del mes en curso.                                           |
| Sesiones RUM             | Muestra la suma de las distintas sesiones RUM durante todas las horas del mes en curso.                                             |
| Gestión de incidencias      | Muestra el número de usuarios activos individuales que interactuaron durante el mes seleccionado con el ciclo de vida y las cronologías de alguna incidencia.     |
| Dispositivos IoT              | Muestra el percentil 99 de los distintos dispositivos IoT durante todas las horas del mes en curso.                                  |


## Tendencias de uso

La sección [Usage Trends][5] (Tendencias de uso) contiene gráficos sobre el uso de los productos. En ellos, se muestra el uso total de todas las organizaciones de una cuenta. Para descargar los informes de uso, haz clic en el botón **Download as CSV** (Descargar como CSV). Estos informes incluyen un desglose horario del uso que se hace de cada producto en cada organización.

{{< img src="account_management/billing/UsageTrendsOverviewAndCSV.png" alt="Página de gráficos Usage Trends de la aplicación de Datadog, donde se resalta la opción para descargar como CSV" style="width:100%; align:left" >}}

En el caso de los productos con subtipos, las categorías aparecen diferenciadas en el gráfico de ese producto.

{{< img src="account_management/billing/UsageGraphsByProductTab.png" alt="Página Usage Summary con la pestaña Infrastructure seleccionada y varios gráficos de uso de subtipos de infraestructura, como los hosts de infraestructura, los hosts del Agent y los contenedores" style="width:100%; align:left" >}}

En la pestaña de cada producto, encontrarás gráficos más detallados sobre los subtipos de productos. Por ejemplo, en la pestaña Infrastructure, se ofrece un desglose según el tipo de host.

{{< img src="account_management/billing/UsageBreakdownByProductSubtype.png" alt="Sección Usage Trends de la pestaña Infrastructure con el gráfico de hosts de infraestructura, que contiene los hosts del Agent y los hosts de AWS; el gráfico de logs indexados, que contiene los logs diarios indexados en tiempo real y los logs acumulativos indexados en tiempo real" style="width:100%; align:left" >}}

Es posible consultar el uso acumulativo a lo largo del tiempo de los productos basados en sumas.

{{< img src="account_management/billing/CumulativeUsageLine.png" alt="Gráficos de tramos ingeridos y tramos indexados, cada uno de ellos con datos de las sumas diarias y acumulativas de sus respectivos tramos" style="width:100%; align:left" >}}

La opción de seleccionar el tiempo permite ver los gráficos de uso en intervalos de tiempo diarios, semanales, mensuales o anuales.

{{< img src="account_management/billing/TimeGranularity.png" alt="Intervalos de tiempo en los gráficos de uso" style="width:100%; align:left" >}}

La línea discontinua `Committed` muestra los compromisos por producto sin concesiones (como las métricas personalizadas o los contenedores).

{{< img src="account_management/billing/CommittedLine.png" alt="Línea de uso Committed en el gráfico de hosts de APM configurada con el valor 10" style="width:100%; align:left" >}}



## Principales métricas personalizadas

En la pestaña Custom Metrics (Métricas personalizadas), la tabla Top Custom Metrics (Principales métricas personalizadas) ofrece dos tipos de vistas para mostrar el uso realizado durante lo que va de mes y el uso del último día (por ejemplo, el uso realizado durante el día de la última actualización).

La vista "Top 5000" proporciona la siguiente información sobre tus 5000 métricas personalizadas principales:
* Nombre de la métrica
* Promedio de métricas personalizadas por hora
* Número máx. de métricas personalizadas por hora
* Porcentaje de contribución de la métrica al uso general de las métricas personalizadas
* Búsqueda de una métrica entre las 5000 métricas personalizadas principales
* Estos datos se pueden descargar como un archivo CSV.

La vista "All" proporciona la siguiente información sobre todas tus métricas personalizadas:
* Nombre de la métrica
* Promedio de métricas personalizadas por hora
* Número máx. de métricas personalizadas por hora
* Búsqueda de una métrica entre todas tus métricas personalizadas
* Estos datos pueden descargarse como un archivo CSV, con un máximo de 300 000 métricas personalizadas. Si quieres descargar más de 300 000 métricas personalizadas, puedes utilizar nuestro [endpoint de API][6].


Para obtener más información sobre tus métricas, accede a [Metrics Summary][7] (Resumen de métricas) pasando el ratón por encima de la fila de la métrica que te interese y haciendo clic en el icono del medidor que aparece a la derecha.

{{< img src="account_management/billing/usage-metrics-05.png" alt="Vista general de la tabla de las principales métricas personalizadas" >}}

## Uso de logs por índice

En la pestaña Log Management (Gestión de logs), la tabla Log usage by Index (Uso de logs por índice) muestra el uso que se hace de los logs indexados por hora, día, mes y año según el nombre del índice y periodo de retención. Además, muestra el desglose en logs activos y [logs rehidratados][8]. Esta pestaña ofrece la siguiente información:

* Nombre del índice
* Periodo de retención en días
* Count de logs indexados
* Porcentaje de contribución del índice al uso total de logs indexados durante el periodo de tiempo seleccionado

Estos datos se pueden descargar como un archivo CSV.

{{< img src="account_management/billing/usage-details-v3-03.png" alt="Uso de logs por índice" >}}

## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][9].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu [asesor de clientes][10].


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