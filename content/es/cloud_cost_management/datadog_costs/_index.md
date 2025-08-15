---
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentación
  text: Comprender mejor tu factura de AWS
- link: /cloud_cost_management/setup/azure
  tag: Documentación
  text: Comprender mejor tu factura de AWS
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentación
  text: Comprender mejor tu factura de Google Cloud
- link: /cloud_cost_management/setup/saas_costs
  tag: Documentación
  text: Más información sobre integraciones de costes de SaaS
- link: /cloud_cost_management/setup/custom
  tag: Documentación
  text: Comprender mejor tus costes personalizados
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analizar de forma rápida y exhaustiva los costes de la nube y de SaaS en tus
    servicios
- link: https://www.datadoghq.com/blog/datadog-costs/
  tag: Blog
  text: Comprende y gestiona tus gastos en Datadog con los datos de costes de Datadog
    en Cloud Cost Management
is_beta: true
private: true
title: Costes de Datadog
---

{{< callout url="https://www.datadoghq.com/product-preview/daily-datadog-costs/" btn_hidden="false" header="Únete a la Vista previa">}}
Los costes diarios de Datadog en Cloud Cost Management están en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.

<p>Sólo los clientes con un contrato directo a través de Datadog o un contrato de detracción del Marketplace son elegibles para la Vista previa.</p>
{{< /callout >}}

## Información general

Los costes diarios de Datadog te ofrecen una visibilidad de tus gastos diarios de Datadog en dashboards, notebooks, [monitores de costes][2] y Cloud Cost Explorer, junto con los del proveedor de la nube y los [costes de SaaS][3] de toda tu organización.

Puedes ver los costes diarios de Datadog en [Cloud Cost Management][1] y acceder a [funciones adicionales de costes de Datadog][7] como el [Resumen de costes][9] y la [Devolución de costes][10] en la [página **Uso y costes**][4].

Los costes de Datadog no suponen ningún coste adicional y están disponible tanto para clientes de CCM como para los que no lo son.

## Permisos

Para ver los costes en Cloud Cost Management, debes tener el permiso `cloud_cost_management_read`, que está activado para los usuarios con el rol de sólo lectura en Datadog.

Para ver los costes en la [página **Uso y costes**][4], consulta la [documentación Detalles del coste][7].

## Visualizar y desglosar los costes

Los costes en Cloud Cost Management pueden no coincidir con los costes estimados del mes hasta la fecha (MTD) en la [página **Plan y uso**][4], ya que los costes de Plan y uso son acumulativos y se prorratean mensualmente. Sólo Cloud Cost Management proporciona un cálculo diario.

Los datos de costes de Datadog están disponibles a nivel de la empresa matriz o de la suborganización. Para las suborganizaciones, también es necesario activar [Resumen de costes (suborganización)][5].

Los datos de costes de Datadog de los últimos 15 meses están disponibles y pueden utilizarse en dashboards y notebooks bajo la fuente de datos **Cloud Cost**. Crea dashboards para monitorizar costes diarios, identificar tendencias y optimizar el uso de recursos.

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="Costes de Datadog como opción de fuente de datos de Costes de nube en un dashboard" style="width:100%;" >}}

Puedes utilizar etiquetas (tags) para desglosar y asignar los datos de tus costes de Datadog.

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| Organización | Nombre de la organización matriz o suborganización. |
| nombre_dimensión / dimensión | `dimension_name` es el nombre del producto individual que se está facturando (por ejemplo, `Indexed Logs (15 Day Retention)`). </br></br> `dimension` es la versión en mayúsculas y minúsculas del nombre del producto, optimizada para su uso programático y fácil búsqueda (por ejemplo, `logs_indexed_15day`). |
| nombre_producto / producto_datadog | `product_name` es el nombre de agrupación de alto nivel de productos Datadog (por ejemplo, `Logs`). </br></br> `datadog_product` es la versión en mayúsculas y minúsculas del nombre de agrupación de productos, optimizada para su uso programático y fácil búsqueda (por ejemplo, `logs`). |
| `<Usage Attribution tags>` | Puedes añadir hasta tres claves de etiqueta, configuradas en [Asignación de uso][8], con sus valores asociados (por ejemplo, `team` o `service`). |
| tipo_coste | El tipo de gasto cubierto por este elemento (por ejemplo, `usage` o `adjustment`). |
| categoría_precios | Tipo específico de gasto cubierto por este ítem (por ejemplo, `committed` o `on-demand`). |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/
[2]: /es/cloud_cost_management/monitors
[3]: /es/cloud_cost_management/setup/saas_costs
[4]: https://app.datadoghq.com/billing/usage
[5]: /es/account_management/plan_and_usage/cost_details/#cost-summary-sub-organization
[6]: /es/account_management/rbac/
[7]: /es/account_management/plan_and_usage/cost_details/
[8]: /es/account_management/billing/usage_attribution/
[9]: /es/account_management/plan_and_usage/cost_details/#cost-summary
[10]: /es/account_management/plan_and_usage/cost_details/#cost-chargebacks