---
description: Hacer un seguimiento del costo y el uso facturable en todas las organizaciones
  de clientes conectadas desde una Organización de administración.
title: Visibilidad de costos y uso
---
## Descripción general {#overview}

Una organización de cliente se conecta a la Organización de administración del socio (Admin Org) automáticamente cuando su contrato incluye la asociación y está activa. Después de conectarse, los datos de uso y costo de un cliente se vuelven visibles desde la Organización de administración, en todos los sitios de Datadog que utiliza el cliente. La conexión se elimina automáticamente 30 días después de que vence el contrato, lo que le otorga al socio un período de gracia para mantener la visibilidad mientras se renueva el contrato.

**Note**: El uso de Trial Org no se incluye aquí hasta que su organización de cliente se conecte de esta manera; consulte [Trial Org Provisioning][4].

## Visualizar datos de costo y uso {#view-cost-and-usage-data}

Vaya a {{< ui >}}Plan & Usage{{< /ui >}} > {{< ui >}}Usage & Cost{{< /ui >}} en el Admin Org para ver los datos de costo y uso facturable estimados, históricos y proyectados en todas las organizaciones de clientes conectadas, agrupados y filtrados por cliente, producto o cuenta. Consulte [Plan and Usage Experience for Partners][1] para obtener más detalles.

Los datos de costo y uso también están disponibles mediante programación a través de los siguientes puntos de conexión de la [Usage Metering API][2]:

| API | What it's for | Note |
|---|---|---|
| [Get Estimated Cost Across Your Account][6] | Costo estimado para el mes actual y el anterior | Requires `include_connected_accounts=true` |
| [Get Historical Cost Across Your Account][7] | Costo histórico para meses anteriores | Requires `include_connected_accounts=true` |
| [Get Projected Cost Across Your Account][8] | Costo proyectado a fin de mes para el mes actual | Requires `include_connected_accounts=true` |
| [Get Billable Usage Across Your Account][9] | Resúmenes de uso facturable | Requires `include_connected_accounts=true` |
| [Get Usage Across Your Account][10] | Datos de resumen de uso en toda la cuenta | Requires `include_connected_accounts=true` |
| [Get Hourly Usage by Product Family][11] | Uso por hora desglosado por familia de productos | Requires `filter[include_connected_accounts]=true` |

## Related docs {#related-docs}

- [Centralized Usage Metrics][3]: Métricas de uso acumuladas de cada organización de cliente conectada.
- [Trial Org Provisioning][4]: Aprovisionar organizaciones de prueba para clientes potenciales.

[1]: /es/account_management/plan_and_usage/partner_experience/
[2]: /es/api/latest/usage-metering/
[3]: /es/partners/multi_tenant_billing/centralized-usage-metrics/
[4]: /es/partners/multi_tenant_billing/trial-org-provisioning/
[6]: /es/api/latest/usage-metering/#get-estimated-cost-across-your-account
[7]: /es/api/latest/usage-metering/#get-historical-cost-across-your-account
[8]: /es/api/latest/usage-metering/#get-projected-cost-across-your-account
[9]: /es/api/latest/usage-metering/#get-billable-usage-across-your-account
[10]: /es/api/latest/usage-metering/#get-usage-across-your-account
[11]: /es/api/latest/usage-metering/#get-hourly-usage-by-product-family