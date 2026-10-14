---
description: Explica cómo los partners de Datadog pueden usar la página Plan & Usage
  para visualizar datos de costos y uso en todas las organizaciones de clientes desde
  una organización Datadog Admin.
further_reading:
- link: https://docs.datadoghq.com/account_management/plan_and_usage/
  tag: Documentación
  text: Plan & Usage
- link: https://docs.datadoghq.com/account_management/plan_and_usage/cost_details/
  tag: Documentación
  text: Detalles de costos
- link: https://docs.datadoghq.com/account_management/plan_and_usage/usage_details/
  tag: Documentación
  text: Detalles de uso
- link: https://docs.datadoghq.com/api/latest/usage-metering/
  tag: Documentación
  text: Usage Metering API
- link: https://docs.datadoghq.com/account_management/plan_and_usage/partner_experience/customer_pricing/
  tag: Documentación
  text: Customer Pricing
title: Experiencia de Plan & Usage para partners
---
Los partners de Datadog ven una versión personalizada de la página Plan & Usage diseñada para administrar múltiples organizaciones de clientes. Esta página describe la experiencia de Plan & Usage disponible para los partners que ven la interfaz de usuario desde una **organización Datadog Admin**.

## Requisitos previos {#prerequisites}

Para acceder a la experiencia de Plan & Usage para partners, su organización debe ser una organización Datadog Admin, que es la organización de nivel superior que Datadog proporciona a los partners para administrar sus cuentas de clientes. Si su organización se configuró a través del Programa de partners de Datadog y usted administra organizaciones de clientes bajo ella, está utilizando una organización Datadog Admin. Para verificarlo, verifique que tiene varios contratos con Datadog y que puede visualizar datos consolidados de costos y uso en todos ellos en Plan & Usage.

**Nota**: Si usted es un *cliente* de un partner de Datadog (en lugar del propio partner), tiene la experiencia estándar de Plan & Usage. Dependiendo de su acuerdo de precios con su partner, es posible que solo vea datos de uso y no datos de costos. Consulte [Plan & Usage][1] para obtener más detalles.

Los partners deben tener el rol de **Datadog Admin**, o un rol personalizado con los permisos `billing_read` y `usage_read`, para visualizar los datos de Plan & Usage. Estos son los mismos permisos requeridos para los clientes directos.

## Descripción general {#overview}

Los partners que acceden a Plan & Usage desde su organización Datadog Admin ven datos de costos y uso en todas sus organizaciones de clientes. Solo la pestaña **Usage & Cost** está disponible en la vista de partner; las pestañas Plan, Billing History y Usage Notifications no se muestran.

### Detalles de costos {#cost-details}

Visualice datos de costos estimados, históricos y proyectados para todas las organizaciones de clientes en un solo lugar. Los partners pueden ver un total de todos los clientes, o agrupar y filtrar por organización de cliente, producto y cuenta. Consulte [Cost Details][2] para obtener la documentación completa.

{{< img src="account_management/plan_and_usage/partner-cost-details.png" alt="Página de Cost Summary para una organización Datadog Admin que muestra los costos estimados y proyectados en todas las organizaciones de clientes con un gráfico de desglose de costos acumulados y una tabla de costos por cliente." >}}

### Detalles de uso {#usage-details}

Visualice los datos de uso de todas las organizaciones de clientes en un solo lugar. Los partners pueden ver un total de todos los clientes, o agrupar y filtrar por organización de cliente, producto y cuenta. Consulte [Detalles de uso][3] para obtener la documentación completa.

{{< img src="account_management/plan_and_usage/partner-usage-details-v2.png" alt="Página de Resumen de uso para una organización Datadog Admin que muestra los datos de uso en todas las organizaciones de clientes." >}}

## Funciones solo para socios {#partner-only-features}

Las siguientes funciones están disponibles solo para partners que visualizan Plan & Usage desde una organización Datadog Admin.

### Costos para clientes {#customer-pricing}

Establezca tarifas específicas para cada cliente para que sus clientes revendedores puedan ver sus costos estimados de Datadog en su propia organización. Consulte [Customer Pricing][12] para conocer los pasos de configuración.

## Disponibilidad de las funciones {#feature-availability}

La siguiente tabla enumera cada función de Plan & Usage y su disponibilidad para clientes directos y partners que la visualizan desde una organización Datadog Admin.

| Feature | Direct Customers | Partners | Notes |
|---|---|---|---|
| Resumen de costos | {{< X >}} | {{< X >}} |  |
| Costos proyectados | {{< X >}} | {{< X >}} |  |
| Resumen de uso | {{< X >}} | {{< X >}} |  |
| Puntos de conexión de API de costo y uso | {{< X >}} | {{< X >}} | See [Supported API puntos de conexión](#supported-api-endpoints) for the full list |
| [Precio para clientes][12] | | {{< X >}} | Solo socios. Permite la visibilidad de costos para los clientes del revendedor |
| Cost attribution | {{< X >}} |  | Individual customer organizations can access cost attribution from their own [Plan & Usage][1] page |
| Usage attribution | {{< X >}} |  | Individual customer organizations can access usage attribution from their own [Plan & Usage][1] page |
| Product-specific usage tables (for example, custom metrics, logs usage by index) | {{< X >}} |  | Las organizaciones de clientes individuales pueden ver estas tablas desde su propia página de [Usage Details][3] |
| Datadog costs in Cloud Cost Management | {{< X >}} |  | Individual customer organizations can access [Datadog Costs](/cloud_cost_management/datadog_costs/) from their own Cloud Cost Management page |
| Plan and Billing History tabs | {{< X >}} |  | Individual customer organizations can access Plan and Billing History tabs from their own [Plan & Usage][1] page |
| [Bill Overview][4] | {{< X >}} |  | Not available at the Datadog Admin organization level |
| Usage Notifications tab | {{< X >}} |  | Individual customer organizations can configure Usage Notifications from their own [Plan & Usage][1] page |

## Supported API puntos de conexión {#supported-api-endpoints}

Los partners también pueden acceder a los datos de costos y uso de forma programática a través de los siguientes puntos de conexión de [Usage Metering API][5]:

| Punto de conexión                                     | Descripción                                              |
|----------------------------------------------|----------------------------------------------------------|
| [Get estimated cost across your account][6]  | Obtener datos de costo estimado para el mes actual       |
| [Get billable usage across your account][7]  | Obtener resúmenes de uso facturable                        |
| [Get hourly usage by product family][8]      | Obtener datos de uso por hora desglosados por familia de productos |
| [Get historical cost across your account][9] | Obtener datos de costo histórico para meses anteriores        |
| [Get projected cost across your account][10] | Obtener datos de costo proyectado a fin de mes                |
| [Get usage across your account][11]          | Obtener datos de resumen de uso en toda la cuenta          |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/plan_and_usage/
[2]: /es/account_management/plan_and_usage/cost_details/
[3]: /es/account_management/plan_and_usage/usage_details/
[4]: /es/account_management/plan_and_usage/bill_overview/
[5]: /es/api/latest/usage-metering/
[6]: /es/api/latest/usage-metering/#get-estimated-cost-across-your-account
[7]: /es/api/latest/usage-metering/#get-billable-usage-across-your-account
[8]: /es/api/latest/usage-metering/#get-hourly-usage-by-product-family
[9]: /es/api/latest/usage-metering/#get-historical-cost-across-your-account
[10]: /es/api/latest/usage-metering/#get-projected-cost-across-your-account
[11]: /es/api/latest/usage-metering/#get-usage-across-your-account
[12]: /es/account_management/plan_and_usage/partner_experience/customer_pricing/