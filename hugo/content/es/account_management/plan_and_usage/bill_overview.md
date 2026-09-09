---
description: Visualice los costos de Datadog, las tendencias de uso y los costos proyectados
  a fin de mes en una sola página, con desgloses diarios, detalles a nivel de producto
  y filtrado multi-organización.
further_reading:
- link: account_management/plan_and_usage/cost_details/
  tag: Documentación
  text: Detalles de costos
- link: account_management/plan_and_usage/usage_details/
  tag: Documentación
  text: Detalles de uso
- link: account_management/billing/usage_attribution/
  tag: Documentación
  text: Atribución de uso
- link: cloud_cost_management/datadog_costs/
  tag: Documentación
  text: Costos de Datadog
title: Resumen de facturación
---
Visualice los costos de Datadog, las tendencias de uso y los costos proyectados a fin de mes en una sola página, con desgloses diarios, detalles a nivel de producto y filtrado multi-organización.

La [página **Resumen de facturación**][1] ofrece a los administradores una visualización única de los costos y el uso de Datadog. Se habilita automáticamente durante el despliegue gradual que comienza en marzo de 2026.

## Filtros globales {#global-filters}

Los siguientes filtros se aplican a la {{< ui >}}Bill Overview{{< /ui >}} página:

- {{< ui >}}Product Category{{< /ui >}}: Filtre todas las vistas por familia de productos más amplia, como Infraestructura, APM, Logs, Security o IA/ML.
- {{< ui >}}Billing Dimension{{< /ui >}}: Filtre por una dimensión de facturación o medición específica (por ejemplo, servidores de infraestructura, registros indexados o pruebas de navegador sintéticas).
- {{< ui >}}Sub-Org{{< /ui >}}: Filtre por una organización secundaria específica.
- {{< ui >}}Group by Sub-Org{{< /ui >}}: Cambie para agrupar los costos por suborganización.
- {{< ui >}}Time range{{< /ui >}}: Seleccione un período de facturación. Utilice las flechas hacia atrás y hacia adelante para navegar de un mes a otro.

## Resumen de costos {#cost-summary}

En la parte superior de la página, el resumen de costos muestra:

- {{< ui >}}Estimated cost to date{{< /ui >}}: Costo total estimado para los días transcurridos en el período de facturación actual
- {{< ui >}}Projected total{{< /ui >}}: Costo total estimado si los patrones de uso actuales continúan hasta fin de mes, con el cambio porcentual mes a mes

## Desglose diario de costos {#daily-cost-breakdown}

Debajo del resumen de costos, el {{< ui >}}Daily Cost Breakdown{{< /ui >}} gráfico de barras apiladas muestra los costos desglosados por dimensión de facturación para cada día del período seleccionado. Cada color en el gráfico representa una dimensión de facturación diferente. Haga clic en el icono de expandir para visualizar el gráfico en pantalla completa.

{{< img src="account_management/plan_and_usage/bill-overview-main-light.png" alt="Página de Resumen de facturación que muestra el encabezado de resumen de costos, el gráfico de barras apiladas de Desglose de costos diarios y la pestaña Tendencias" >}}

## Pestaña Tendencias {#trends-tab}

La {{< ui >}}Trends{{< /ui >}} pestaña muestra productos que vale la pena investigar según cuatro opciones de ordenamiento:

- {{< ui >}}Highest % Cost Change{{< /ui >}}
- {{< ui >}}Highest Cost Change ($){{< /ui >}}
- {{< ui >}}Highest Total Cost{{< /ui >}}
- {{< ui >}}Highest % Usage Change{{< /ui >}}

Seleccione una opción de ordenamiento para actualizar las tarjetas mostradas. Cada tarjeta de producto muestra:

- {{< ui >}}Total Cost{{< /ui >}} para el período
- {{< ui >}}Projected EOM{{< /ui >}} costo
- {{< ui >}}Month-over-month change{{< /ui >}}, mostrado como un distintivo de porcentaje
- {{< ui >}}Daily Cost{{< /ui >}} gráfico de barras que abarca el mes anterior y el actual
- {{< ui >}}Usage{{< /ui >}}, mostrado como unidades totales consumidas, en unidades naturales; por ejemplo, PB (petabytes) de datos escaneados, Custom Metrics; mostrado solo en las tarjetas relacionadas con el Costo total y el Uso

Haga clic en {{< ui >}}View Details{{< /ui >}} en cualquier tarjeta para abrir la [página de detalles del producto][2].

{{< img src="account_management/plan_and_usage/bill-overview-trends-light.png" alt="Pestaña Tendencias que muestra tarjetas de producto ordenadas por Mayor costo total" >}}

## Pestaña Lista de productos {#product-list-tab}

La {{< ui >}}Product List{{< /ui >}} pestaña muestra todas las dimensiones de facturación en una tabla con el costo y el uso lado a lado.

Haga clic en cualquier parte de una fila de producto para abrir la [página de detalles del producto][2]. Pase el cursor sobre el final de una fila para crear rápidamente un monitor de costos para esa dimensión de facturación.

#### Columnas de la tabla {#table-columns}

| Columna | Descripción |
|---|---|
| Dimensión de facturación | Nombre del producto o dimensión de facturación |
| Costo — Total | Costo facturado hasta la fecha para el período |
| Costo — Proy. EOM | Costo total proyectado a fin de mes |
| Costo — Cambio | Cambio en dólares y porcentaje frente al período anterior |
| Uso — Total | Uso total en unidades naturales |
| Uso — Cambio | Cambio en el uso frente al período de comparación |

Alterne entre las vistas {{< ui >}}Monthly{{< /ui >}} y {{< ui >}}Daily{{< /ui >}} usando los controles sobre la tabla. Descargue la tabla completa como un archivo `.csv` usando el botón {{< ui >}}Download as CSV{{< /ui >}}. La tabla está paginada y muestra 10 filas por página de forma predeterminada.

{{< img src="account_management/plan_and_usage/bill-overview-product-list-light.png" alt="Pestaña Lista de productos que muestra la tabla de dimensiones de facturación con las columnas de Costo y Uso" >}}

## Página de detalles del producto {#product-detail-page}

Haga clic en {{< ui >}}View Details{{< /ui >}} en una tarjeta de Tendencias o haga clic en cualquier fila de la tabla {{< ui >}}Product List{{< /ui >}} para abrir la página de detalles del producto para una sola dimensión de facturación.

{{< img src="account_management/plan_and_usage/bill-overview-detail-light-2.png" alt="Página de detalles del producto que muestra las secciones Resumen de costos y Resumen de uso, incluido el botón Descargar servidores facturables como CSV." >}}

### Resumen de costos {#cost-overview}

- {{< ui >}}Total Cost{{< /ui >}}: Costo total facturado hasta la fecha para el período seleccionado
- {{< ui >}}Projected Cost Change{{< /ui >}}: El cambio proyectado en dólares y porcentaje frente al período anterior
- {{< ui >}}Projected EOM{{< /ui >}}: Costo total estimado a fin de mes
- {{< ui >}}Daily Cost{{< /ui >}} gráfico de barras: costo diario del mes anterior y el actual, con el mes actual resaltado. Pase el cursor sobre cualquier barra para ver el costo de ese día. Active {{< ui >}}Show Usage Charges Only{{< /ui >}} para aislar los cargos bajo demanda.
- {{< ui >}}Drilldown in Cloud Cost{{< /ui >}}: haga clic para abrir Cloud Cost Management, prefiltrado según la dimensión de facturación seleccionada.

### Resumen de uso {#usage-overview}

- {{< ui >}}Total Usage{{< /ui >}}: total de unidades consumidas durante el período seleccionado
- {{< ui >}}Usage Change{{< /ui >}}: cambio en el uso frente al período anterior (cantidad y porcentaje)
- {{< ui >}}Usage breakdown by sub-dimension{{< /ui >}}: totales de uso individual para cada subdimensión. Por ejemplo, Sensitive Data Scanner lista por separado los eventos escaneados, los registros escaneados, las sesiones RUM escaneadas y los spans escaneados.
- {{< ui >}}Usage Types{{< /ui >}} gráfico de barras: uso diario apilado por subdimensión
- {{< ui >}}Allotment Usage{{< /ui >}}: barra de progreso que muestra el consumo frente a la asignación contratada; muestra \">100%\" cuando el uso supera la asignación
- {{< ui >}}Drilldown in Usage Attribution{{< /ui >}}: Haga clic para abrir {{< ui >}}Usage Attribution{{< /ui >}}, prefiltrado según la dimensión de facturación seleccionada.
- {{< ui >}}Download Billable Hosts as CSV{{< /ui >}}: para servidores de infraestructura, descargue como CSV los servidores individuales que conforman su total facturable.

### Descargar servidores facturables como CSV {#download-billable-hosts-as-csv}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">La descarga de servidores facturables como CSV no es compatible con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Descargue un CSV de los servidores individuales que conforman su total facturable de servidores de infraestructura para un mes determinado. Úselo para conciliar el total que se muestra en la página de resumen de facturación, encontrar los servidores que generan la mayor parte de su recuento, atribuir el uso a los equipos mediante etiqueta o comparar meses para detectar cambios inesperados.

Para exportar la lista:

1. En el panel lateral, use el selector de mes en la parte superior derecha para elegir un mes. Solo puede exportar datos de meses calendario completos.
2. En {{< ui >}}Usage Overview{{< /ui >}}, haga clic en {{< ui >}}Download Billable Hosts as CSV{{< /ui >}}.

El CSV contiene una fila por servidor con las siguientes columnas:

| Columna | Descripción |
|---|---|
| `Org Name` | Nombre de la organización. |
| `Public ID` | El identificador público de la organización. |
| `Timestamp` | Para las organizaciones facturadas al percentil 99, la hora del mes en la que se midió el uso en el percentil 99. Para las organizaciones facturadas sobre una base de suma, el primer día del mes. |
| `Resource Type` | El tipo de recurso, por ejemplo `agent`, `aws` o `vsphere`. |
| `Resource Name` | El nombre o identificador del servidor, por ejemplo un nombre de servidor o ID de instancia. |
| `Usage Value` | Para las organizaciones facturadas al percentil 99, `1` por servidor. Para las organizaciones facturadas sobre una base de suma, las horas de servidor del servidor durante el mes, por ejemplo `720` para un servidor presente durante un mes completo de 30 días. |
| `Tags` | Un objeto JSON de las etiquetas clave-valor del servidor. Vacío (`{}`) cuando el servidor no tiene etiquetas. |

La suma de `Usage Value` en todas las filas coincide con el total de servidores de infraestructura que se muestra en la página de Resumen de facturación: un recuento de servidores para las organizaciones facturadas al percentil 99 y horas de servidor para las organizaciones facturadas sobre una base de suma.

## Volver al diseño anterior {#revert-to-the-previous-layout}

Si su organización está en el nuevo {{< ui >}}Bill Overview{{< /ui >}} y prefiere el diseño anterior, haga clic en {{< ui >}}Disable Preview{{< /ui >}} en el encabezado de la página. Este interruptor está disponible para todas las organizaciones y persiste durante su sesión.

{{< img src="account_management/plan_and_usage/toggle-back-header.png" alt="Encabezado de la página de Resumen de facturación que muestra el botón Deshabilitar vista previa" >}}

Para volver a {{< ui >}}Bill Overview{{< /ui >}}, haga clic en {{< ui >}}Enable Preview{{< /ui >}} en el encabezado.

## Permisos {#permissions}

Se requieren los siguientes permisos para acceder a cada sección de Resumen de facturación:

| Sección | Permiso requerido |
|---|---|
| Resumen de facturación (datos de costos) | `BILLING_READ` |
| Usage Tab | `USAGE_READ` |
| Detalles del plan | `BILLING_READ` |
| Historial de facturación | `BILLING_READ` |
| Atribución de uso | `USAGE_READ` + Plan Enterprise o Pro |
| Tendencias de costos de la suborganización | La organización principal debe tener `suborg_cost_trends` habilitado |

Para obtener información sobre la administración de permisos, consulte [Role Based Access Control][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/bill-overview
[2]: /es/account_management/plan_and_usage/bill_overview/#product-detail-page
[3]: /es/account_management/rbac/