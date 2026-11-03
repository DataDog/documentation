---
description: Visualice su cartera de contratos de cliente final desde su organización
  de administración de Datadog, incluidos los ingresos recurrentes, las fechas de
  renovación, los saldos de reducción, las facturas y el estado de visibilidad de
  costos.
further_reading:
- link: /account_management/plan_and_usage/partner_experience/customer_pricing/
  tag: Documentación
  text: Customer Pricing
- link: /account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
  tag: Documentación
  text: Visibilidad de costos para clientes que compran a través de un socio
- link: /account_management/plan_and_usage/partner_experience/
  tag: Documentación
  text: Experiencia de Plan & Usage para partners
title: Customer Contracts
---
La página [Customer Contracts][1] ofrece a los socios de Datadog una visualización única de su cartera de contratos de cliente final, incluidos los ingresos recurrentes, las fechas de renovación, las facturas y el estado de visibilidad de costos. Los mosaicos de resumen en la parte superior de la página muestran cuántos contratos están próximos a renovarse, cuántos clientes necesitan que se ingresen las tarifas antes de que puedan usar las funciones de visibilidad de costos, y la cantidad y el monto total de las facturas vencidas.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Customer Contracts no está disponible para el <a href="/getting_started/site">sitio de Datadog</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< img src="account_management/plan_and_usage/customer-contracts-overview.png" alt="Página de Customer Contracts que muestra mosaicos de resumen para renovaciones, visibilidad de costos y facturas vencidas sobre una tabla de clientes." >}}

**Nota**: Los datos en esta página se actualizan cada 30 minutos.

## Requisitos previos {#prerequisites}

Para usar Customer Contracts, necesita:

- Una organización de administración de Datadog. Si no tiene una, comuníquese con su equipo de socios de Datadog.
- El permiso Billing Read (`billing_read`) en su organización de administración. Los usuarios con este permiso pueden visualizar toda la información en la página. Para obtener información sobre la administración de permisos, consulte [Role Based Access Control][4].

## Acceda a Customer Contracts {#access-customer-contracts}

1. Inicie sesión en su organización administradora de Datadog.
2. Navegue a [{{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}}][1].

## Tabla de clientes {#customer-table}

La tabla de clientes enumera a cada cliente bajo su organización de administración. Seleccione un cliente para abrir su panel de detalles de contrato.

| Columna | Descripción |
|---|---|
| {{< ui >}}Customer{{< /ui >}} | Nombre del cliente final |
| {{< ui >}}CMRR{{< /ui >}} | Ingresos recurrentes mensuales del contrato |
| {{< ui >}}UMRR{{< /ui >}} | Ingresos recurrentes mensuales por uso, basados en el uso medido del cliente en lugar de su compromiso contractual |
| {{< ui >}}Overdue Balance{{< /ui >}} | Monto total de las facturas del cliente que han superado su fecha de vencimiento |
| {{< ui >}}Cost Visibility{{< /ui >}} | Si el cliente puede visualizar sus costos de Datadog. Verifique [estado de visibilidad de costos](#check-cost-visibility-status). |
| {{< ui >}}Contract Status{{< /ui >}} | Si el contrato está activo, acercándose a su fecha de renovación o vencido |

Utilice el cuadro de búsqueda para encontrar un cliente específico o filtre la tabla por {{< ui >}}Cost Visibility{{< /ui >}} o {{< ui >}}Contract Status{{< /ui >}}.

## Hacer un seguimiento de las renovaciones {#track-renewals}

La tabla de clientes muestra el estado del contrato para cada cliente, para que pueda visualizar qué contratos se acercan a su fecha de renovación y cuáles ya la han superado. Ordene o filtre por {{< ui >}}Contract Status{{< /ui >}} para llevar los contratos más urgentes a la parte superior.

{{< img src="account_management/plan_and_usage/customer-contracts-renewals.png" alt="Tabla de clientes ordenada por estado del contrato, que muestra los contratos vencidos y los que están por vencer." >}}

## Revisar detalles del contrato {#review-contract-details}

Seleccione un cliente para abrir su panel de detalles de contrato. La pestaña {{< ui >}}Current Contract{{< /ui >}} muestra:

- {{< ui >}}Spend Overview{{< /ui >}}: CMRR del mes pasado, UMRR del mes pasado y utilización del contrato.
- {{< ui >}}Contract Info{{< /ui >}}: estado de influencia (Influenciado o No influenciado), fecha de inicio del contrato y fecha de finalización del contrato.
- {{< ui >}}Drawdown Depletion{{< /ui >}}: el compromiso total, el gasto hasta la fecha, los fondos restantes, el total proyectado, el exceso proyectado y la fecha de agotamiento proyectada en comparación con la fecha de finalización del contrato. Esta sección aparece solo para contratos de reducción de fondos, donde el uso del cliente reduce un fondo comprometido durante el plazo del contrato.

{{< img src="account_management/plan_and_usage/customer-contracts-detail.png" alt="Panel de detalles del contrato para un cliente que muestra la descripción general del gasto, la barra de progreso de agotamiento de fondos y la barra lateral de información del contrato." >}}

Puede establecer las tarifas de un cliente desde la pestaña {{< ui >}}Custom Pricing Configuration{{< /ui >}} de este panel en lugar de ir a la página de [Precios del cliente][2].

## Hacer un seguimiento de las facturas {#monitor-invoices}

La pestaña {{< ui >}}Invoices{{< /ui >}} del panel de detalles del contrato enumera cada factura de ese cliente con su fecha de emisión, fecha de vencimiento, monto y estado de pago. Abra el PDF de cualquier factura desde esta pestaña. El saldo vencido de cada cliente también aparece en la tabla principal de clientes, y los mosaicos de resumen en la parte superior de la página muestran el recuento y el monto total de las facturas vencidas en toda su cartera.

**Nota**: El estado de pago refleja si usted ha pagado su factura de Datadog por el uso de ese cliente. No realiza un seguimiento de si el cliente final le ha pagado a usted.

{{< img src="account_management/plan_and_usage/customer-contracts-invoices.png" alt="Pestaña Facturas del panel de detalles del contrato que enumera las facturas con fecha de emisión, fecha de vencimiento, monto, estado de pago y un enlace para visualizar el PDF." >}}

## Verifique el estado de visibilidad de costos {#check-cost-visibility-status}

Sus clientes finales pueden visualizar sus propios costos estimados de Datadog del mes a la fecha e históricos en su organización de Datadog, calculados a partir de las tarifas que usted publica para ellos. La columna {{< ui >}}Cost Visibility{{< /ui >}} muestra la situación de cada cliente:

- {{< ui >}}Enabled{{< /ui >}}: el cliente puede visualizar sus costos de Datadog en su propia organización.
- {{< ui >}}Not configured{{< /ui >}}: aún no ha publicado tarifas para este cliente.
- {{< ui >}}Update needed{{< /ui >}}: el contrato del cliente cambió, por lo que sus tarifas publicadas necesitan una actualización.

El mosaico {{< ui >}}Cost Visibility Action Needed{{< /ui >}} en la parte superior de la página cuenta a los clientes en los estados {{< ui >}}Not configured{{< /ui >}} y {{< ui >}}Update needed{{< /ui >}}.

Para publicar o actualizar tarifas, consulte [Precios para clientes][2]. Para explicar la función a su cliente, comparta [Visibilidad de costos para clientes que compran a través de un socio][3].

{{< img src="account_management/plan_and_usage/customer-contracts-cost-visibility.png" alt="Tabla de clientes con la columna Visibilidad de costos resaltada, que muestra a los clientes marcados como Habilitado o Actualización necesaria." >}}

## Busque contactos de la cuenta {#find-account-contacts}

La sección {{< ui >}}Contacts{{< /ui >}} del panel de detalles del contrato enumera al Gerente de éxito del cliente (CSM) de Datadog, al Ejecutivo de cuenta (AE) de Datadog y al Gerente de ventas para socios para preguntas específicas de la cuenta, junto con el contacto de facturación que recibe las facturas del cliente.

{{< img src="account_management/plan_and_usage/customer-contracts-contacts.png" alt="Sección de contactos del panel de detalles del contrato que enumera al CSM de Datadog, al AE de Datadog, al contacto de facturación y al Gerente de ventas para socios." >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/customer-contracts
[2]: /es/account_management/plan_and_usage/partner_experience/customer_pricing/
[3]: /es/account_management/plan_and_usage/bill_overview/partner_purchased_cost_visibility/
[4]: /es/account_management/rbac/