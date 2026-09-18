---
description: Administre la cartera de clientes del socio (clientes, contratos y facturas)
  desde una Admin Org.
title: Contratos de cliente
---
<div class="alert alert-info">
Contratos de cliente está en vista previa.
</div>

## Descripción general {#overview}

Contratos de cliente ofrece al socio un único lugar para administrar clientes, contratos y facturas de su cartera de clientes con Datadog. Los socios pueden consultar esta información directamente, en lugar de depender del equipo de cuenta del socio para consultas rutinarias.

Vaya a {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}} en el Admin Org; consulte [Solicitar un Admin Org][2] si aún no tiene uno configurado.

{{< img src="partners/multi_tenant_billing/customer_contracts.png" alt="Pestaña Contratos de cliente en Plan & Usage dentro de un Admin Org, que enumera clientes y contratos." style="width:100%;" >}}

**Nota**: Se requiere el permiso de Lectura de facturación para visualizar Contratos de cliente.

## Qué incluye {#whats-included}

- Todos los clientes conectados a una Admin Org, y sus contratos actuales e históricos, con recordatorios de renovación para los contratos próximos a vencer o que ya hayan pasado su fecha de renovación.
- MRR del contrato (CMRR), MRR de uso (UMRR), estado de influencia y fechas de inicio y fin del contrato, junto con las tarifas por producto y los PDF de los formularios de pedido.
- Para contratos de drawdown, el saldo restante, el exceso proyectado y la fecha de agotamiento proyectada en comparación con la fecha de finalización del contrato.
- Para contratos de MSP, qué clientes pertenecen a cada contrato.
- Visibilidad de descuentos y márgenes por contrato.
- Si [Customer Pricing][1] está habilitado para cada cliente, si aún no está configurado o si necesita una actualización después de un cambio de contrato.
- Contactos clave por cliente: el CSM de Datadog, el AE de Datadog, el equipo de cuenta del socio y el contacto de facturación que recibe las facturas.

{{< img src="partners/multi_tenant_billing/customer_contracts_detail.png" alt="Panel de detalles de Contratos de cliente que muestra la descripción general del gasto, el agotamiento de drawdown, la información del contrato y los contactos de un cliente." style="width:100%;" >}}

Las facturas se enumeran por cliente con fechas de emisión y vencimiento, monto y estado de pago, y se consolidan en conteos de vencidos y totales en la página principal de Contratos de cliente:

{{< img src="partners/multi_tenant_billing/customer_contracts_invoices.png" alt="Pestaña de facturas de Contratos de cliente que enumera los números de factura, fechas, montos y estado para un cliente." style="width:100%;" >}}

## Related docs {#related-docs}

- [Solicitar un Admin Org][2]

[1]: /es/account_management/plan_and_usage/partner_experience/customer_pricing/
[2]: /es/partners/multi_tenant_billing/#requesting-an-admin-org