---
description: Establezca tarifas específicas para el cliente desde la página Customer
  Pricing para habilitar la visibilidad de costos para sus clientes en Datadog.
further_reading:
- link: /partners/multi_tenant_billing/
  tag: Documentación
  text: Medición y facturación de uso multiinquilino
- link: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: Documentación
  text: Visibilidad de costos para clientes que compran a través de un socio
- link: /account_management/plan_and_usage/partner_experience/
  tag: Documentación
  text: Experiencia de Plan & Usage para partners
- link: /account_management/plan_and_usage/bill_overview/
  tag: Documentación
  text: Resumen de facturación
title: Customer Pricing
---
La página [Customer Pricing][2] permite a los socios establecer tarifas específicas para cada cliente que habilitan la visibilidad de costos para sus clientes revendedores. Establecer tarifas es una configuración única por cliente, y puede actualizar las tarifas en cualquier momento. Para obtener información sobre la experiencia del cliente o para encontrar un recurso para compartir con sus clientes, consulte [Visibilidad de costos para clientes que compran mediante un socio][1].

## Requisitos previos {#prerequisites}

Para establecer tarifas específicas para el cliente, necesita:

- Una organización administradora de Datadog, la cual puede solicitar a través del programa [Multi-Tenant Usage Metering and Billing][3]. 
- El permiso Billing Edit (`billing_edit`). Los usuarios con solo Billing Read (`billing_read`) pueden visualizar las tarifas de cliente guardadas o publicadas, pero no pueden editarlas.

## Configure las tarifas específicas para el cliente {#set-up-customer-pricing}

1. Inicie sesión en su organización administradora de Datadog.
1. Navegue a [{{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Pricing{{< /ui >}}][2].
   {{< img src="account_management/plan_and_usage/customer-pricing-nav.png" alt="Pestaña Customer Pricing en la sección Plan & Usage." >}}
1. Seleccione un cliente del menú desplegable. Solo se enumeran los clientes con un contrato de reventa elegible.
   {{< img src="account_management/plan_and_usage/customer-pricing-select-customer.png" alt="Menú desplegable de selección de clientes que enumera a los clientes revendedores." >}}
1. Revise los productos contratados del cliente y los precios de venta correspondientes en la tabla.
1. Haga clic en {{< ui >}}Edit{{< /ui >}} e ingrese las tarifas específicas para el cliente para cada producto contratado. Puede editar las tarifas de forma masiva, individualmente o mediante una combinación de ambos.
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-bulk.png" alt="Controles de edición masiva de tarifas para los productos contratados de un cliente." >}}
   {{< img src="account_management/plan_and_usage/customer-pricing-edit-individual.png" alt="Campos de tarifa en borrador individuales para cada producto contratado." >}}
1. Establezca una regla de tarifas predeterminada para los productos que no están en el contrato del cliente. 
    - De forma predeterminada, las tarifas bajo demanda para productos no contratados se establecen en el precio de lista de Datadog. En su lugar, puede aplicar un porcentaje de margen al precio de venta y, opcionalmente, limitar las tarifas con margen al precio de lista de Datadog.
   {{< img src="account_management/plan_and_usage/customer-pricing-default-rule.png" alt="Configuración de la regla de precios predeterminada para productos no contratados." >}}
1. Haga clic en {{< ui >}}Save{{< /ui >}} para guardar un borrador. Los borradores solo son visibles dentro de su organización de administración de Datadog. 
1. Revise sus entradas y luego haga clic en {{< ui >}}Publish{{< /ui >}}.

Después de publicar, la visibilidad de costos se habilita para ese cliente en un plazo de 24 horas. El cliente puede entonces ver sus costos estimados e históricos en su organización de Datadog, según su uso y las tarifas que usted proporcione. Las tarifas publicadas son efectivas a partir del cambio más reciente en el contrato del cliente, ya sea un contrato nuevo o una modificación de los términos de uno existente.

## Actualizar tarifas {#update-pricing}

Para cambiar las tarifas de un cliente después de publicar, regrese a la página {{< ui >}}Customer Pricing{{< /ui >}}, edite los valores y vuelva a publicar. Las actualizaciones pueden tardar hasta 24 horas en ser visibles para el cliente.

## Limitaciones {#limitations}

Para aparecer en el menú desplegable de clientes, un cliente debe tener un contrato de reventa elegible. Customer Pricing no admite los siguientes tipos de contrato y organizaciones:

- **Contratos heredados de proveedor de servicios administrados (MSP)**, donde muchos clientes están cubiertos por un solo contrato.
- **Contratos de Cloud Marketplace sin un acuerdo de reducción de saldo**, para clientes que realizan compras a través de AWS, Google Cloud o Azure Marketplace.
- **Contratos en los que el cliente realiza la adquisición a través de dos socios de canal al mismo tiempo.** Por ejemplo, de Datadog al Socio 1, al Socio 2 y al cliente.
- **Organizaciones de GovCloud.**

Para obtener la lista completa de limitaciones, incluidas las advertencias sobre la disponibilidad de funciones y la precisión de los costos, consulte [Visibilidad de costos para clientes que compran mediante un socio][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[2]: https://app.datadoghq.com/billing/customer-pricing
[3]: /es/partners/multi_tenant_billing/#requesting-an-admin-org