---
description: Administre la cartera de negocios del socio (clientes, contratos y facturas)
  desde una organización de administración.
title: Contratos de cliente
---
<div class="alert alert-info">
Contratos de cliente está en versión preliminar.
</div>

## Descripción general {#overview}

Contratos de cliente ofrece al socio un lugar único para administrar clientes, contratos y facturas de su cartera de negocios con Datadog. Los socios pueden consultar esta información directamente, en lugar de depender del equipo de cuenta del socio para consultas rutinarias.

Vaya a {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Customer Contracts{{< /ui >}} en la organización de administración; consulte [Solicitar una organización de administración][2] si aún no se ha configurado una.

{{< img src="partners/multi_tenant_billing/customer_contracts.png" alt="Pestaña Contratos de cliente en Plan y uso dentro de una organización de administración, donde se enumeran los clientes y contratos." style="width:100%;" >}}

**Nota**: Se requiere el permiso de lectura de facturación para visualizar Contratos de cliente.

## ¿Qué incluye?{#whats-included}

- Todos los clientes conectados a la organización de administración, así como sus contratos actuales e históricos, con recordatorios de renovación para los contratos próximos a vencer o que ya pasaron su fecha de renovación.
- MRR del contrato (CMRR), MRR de uso (UMRR), estado de influencia y fechas de inicio y fin del contrato, junto con las tarifas por producto y los archivos PDF de los formularios de pedido.
- Para contratos de drawdown, el saldo restante, el exceso proyectado y la fecha de agotamiento proyectada en comparación con la fecha de finalización del contrato.
- Para contratos de MSP, qué clientes pertenecen a cada contrato.
- Visibilidad de descuentos y márgenes por contrato.
- Si Customer Pricing está habilitado para cada cliente, si aún no está configurado o si requiere una actualización después de un cambio de contrato.
- Contactos clave por cliente: el CSM de Datadog, el AE de Datadog, el equipo de cuenta del socio y el contacto de facturación que recibe las facturas.

{{< img src="partners/multi_tenant_billing/customer_contracts_detail.png" alt="Panel de detalles de Contratos de cliente que muestra el resumen de gastos, el agotamiento de drawdown, la información del contrato y los contactos de un cliente." style="width:100%;" >}}

Las facturas se enumeran por cliente con fechas de emisión y vencimiento, monto y estado de pago, y se consolidan en recuentos de vencidos y totales en la página principal de Contratos de cliente:

{{< img src="partners/multi_tenant_billing/customer_contracts_invoices.png" alt="Pestaña de facturas de Contratos de cliente que enumera los números de factura, fechas, montos y estado de un cliente." style="width:100%;" >}}

## Related docs {#related-docs}

- [Solicitar una organización de administración][2]

[2]: /es/partners/multi_tenant_billing/#requesting-an-admin-org