---
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analizar de forma rápida y exhaustiva los costes de la nube y SaaS en tus
    servicios
- link: https://www.datadoghq.com/blog/datadog-costs/
  tag: Blog
  text: Comprende y gestiona tus gastos en Datadog con los datos de costes de Datadog
    en Cloud Cost Management
title: Costes de Datadog
---

## Información general

Los costos diarios de Datadog te ofrecen visibilidad del gasto diario de Datadog a través de dashboards, notebooks, [monitores de costos][1], Cloud Cost Explorer,y [presupuestos][11], junto con el proveedor de la nube de toda tu organización y los [costas de SaaS][2].

Puedes visualizar los costos diarios de Datadog en [Cloud Cost Management][3](CCM) y acceder a funciones adicionales de costos de Datadog como [Resumen de costos][5] y [Devolución de costos][6] en la [page (página) **Plan and Usage** (Plan y consumo)][7].

Datadog Costs no supone **ningún cargo adicional** y está disponible para los clientes de CCM y para los que no lo son y tienen un contrato directo a través de Datadog o un contrato de retiro del Mercado Externo.

## Permisos necesarios

Datadog Costs requiere permisos diferentes según se trate de activar la función o de visualizar los datos:

### Para activar Datadog Costs (participación)
Para activar Datadog Costs para tu organización, debes tener los siguientes permisos:

| Permiso | Descripción | Funciones disponibles |
|------------|-------------|-----------------|
| `billing_read` | Acceso de lectura a la información de facturación. | - Datadog Admin |
| `usage_read` | Acceso de lectura a los datos de consumo. | - Datadog Admin |
| `cloud_cost_management_read` | Acceso de lectura a Cloud Cost Management. | - Datadog Admin<br>- Datadog solo lectura (predeterminado) |

### Para visualizar Datadog Costs en Cloud Cost Management
Después de activar Datadog Costs, los usuarios necesitan los siguientes permisos para visualizar los datos:

| Permiso | Descripción | Funciones disponibles |
|------------|-------------|-----------------|
| `cloud_cost_management_read` | Acceso de lectura a Cloud Cost Management. **Requerido para visualizar los datos de Datadog Costs en Cloud Cost Management.** | • Datadog Admin<br>• Datadog solo lectura (predeterminado) |

## Activar Datadog Costs

Para activar Datadog Costs, ve a la [page (página) **Plan & Usage** (Plan y consumo)][7] y haz clic en **Get Started** (Empezar con) en el modal para "Visualizar Datadog Costs en Cloud Cost Management". También puedes ponerte en contacto con tu representante de cuenta o con [Asistencia técnica de Datadog][8].

Tras registrarte en Datadog Costs, aparecerá un mensaje de confirmación y los datos de costos empezarán a aparecer en CCM Explorer en un plazo de 2 a 3 horas.

## Disponibilidad de datos para las suborganizaciones

Los datos de costos diarios de Datadog están disponibles para las suborganizaciones con la función [Resumen de costos de suborganizaciones][10] activada. Para solicitar acceso, ponte en contacto con tu representante de cuenta o con [Asistencia técnica de Datadog][8].

## Visualizar y desglosar los costes

Es posible que los costos de Cloud Cost Management no coincidan con los costos estimados del mes hasta la fecha (MTD) en la [page (página) **Plan & Usage** (Plan y consumo)][7] porque los costos de plan y consumo son acumulativos y se prorratean mensualmente. Solo Cloud Cost Management proporciona cálculos de costos diarios.

Los datos de costos de Datadog tienen un retraso previsto de 48 horas y están disponibles para los últimos 15 meses. Los gastos del mes anterior de Datadog se finalizan alrededor del día 16 de cada mes. Antes de que se finalicen los costos, la opción **Usage Charges Only: Enabled** (Solo cargos por consumo: Activado) representa solo los gastos estimados en función del consumo. Cuando se finalizan los gastos, la opción **Usage Charges Only: Disabled** (Solo gastos por consumo: Desactivado) también incluye cualquier registro de ajuste. Estos ajustes se aplican al mes anterior y reflejan los importes de costos finalizados.

Los datos de costos pueden utilizarse en dashboards y notebooks con la source (fuente) de datos de **Cloud Cost**. Crea dashboards para monitorizar costos diarios, identificar tendencias y optimizar el uso de recursos.

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="Costes de Datadog como opción de fuente de datos de Costes de nube en un dashboard" style="width:100%;" >}}

Puedes utilizar etiquetas (tags) para desglosar y asignar los datos de tus costes de Datadog.

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| Organización | Nombre de la organización matriz o suborganización. |
| nombre_dimensión / dimensión | `dimension_name` es el nombre del producto individual que se está facturando (por ejemplo, `Indexed Logs (15 Day Retention)`). </br></br> `dimension` es la versión en mayúsculas y minúsculas del nombre del producto, optimizada para su uso programático y fácil búsqueda (por ejemplo, `logs_indexed_15day`). |
| nombre_producto / producto_datadog | `product_name` es el nombre de agrupación de alto nivel de productos Datadog (por ejemplo, `Logs`). </br></br> `datadog_product` es la versión en mayúsculas y minúsculas del nombre de agrupación de productos, optimizada para su uso programático y fácil búsqueda (por ejemplo, `logs`). |
| `<Usage Attribution tags>` | Puedes añadir hasta tres claves de tags (etiquetas), configuradas en [Atribución de consumo][9], con sus valores asociados (por ejemplo, `team` o `service`). |
| tipo_coste | El tipo de gasto cubierto por este elemento (por ejemplo, `usage` o `adjustment`). |
| categoría_precios | Tipo específico de gasto cubierto por este ítem (por ejemplo, `committed` o `on-demand`). |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/cost_changes/monitors
[2]: /es/cloud_cost_management/setup/saas_costs
[3]: /es/cloud_cost_management/
[4]: /es/account_management/plan_and_usage/cost_details/
[5]: /es/account_management/plan_and_usage/cost_details/#cost-summary
[6]: /es/account_management/plan_and_usage/cost_details/#cost-chargebacks
[7]: https://app.datadoghq.com/billing/usage
[8]: /es/help/
[9]: /es/account_management/billing/usage_attribution/
[10]: /es/account_management/plan_and_usage/cost_details/#cost-summary-sub-organization
[11]: /es/cloud_cost_management/planning/budgets?tab=basic