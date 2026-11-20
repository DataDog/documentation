---
cascade:
  algolia:
    subcategory: Multi-Tenant Usage Metering and Billing
description: Administre de forma centralizada el uso, los costos y la facturación
  de los clientes finales a través de una organización de administración (Admin Org).
title: Medición y facturación de uso multiinquilino
---
## Descripción general {#overview}

Como proveedor de soluciones de Datadog, puede utilizar una **organización de administración de socios** (Admin Org) para ver y hacer un seguimiento de los costos y el uso en todas las organizaciones de los clientes, aprovisionar organizaciones de prueba y ver la facturación de toda la base de clientes. Una organización de administración es independiente de cualquier organización de cliente y es propiedad de Datadog; los socios son invitados a ella con un rol de socio.

<div class="alert alert-info">De forma predeterminada, una organización de administración otorga acceso de solo lectura a los datos de costos y uso de las organizaciones de clientes conectadas, y no se admite el uso personal o interno de Datadog en la organización de administración. La capacidad de vista previa a continuación agrega flujos de trabajo de precios compatibles.</div>

Una organización de cliente se conecta a una organización de administración automáticamente cuando su contrato de Datadog incluye la asociación y está activo. Después de conectarse, los datos de uso y costos de un cliente son visibles desde la organización de administración, en todos los sitios de Datadog (por ejemplo, AP1, EU1, US1, US3, US5), excepto en los sitios de GovCloud, que requieren su propia organización de administración por motivos normativos.

{{< img src="partners/multi_tenant_billing/admin_org_hierarchy.png" alt="Una organización de administración conectada a varias organizaciones de clientes." style="width:100%;" >}}

Consulte [Incorporación de un nuevo cliente][15] para ver cómo estas piezas encajan en el camino desde una oportunidad registrada hasta una organización de cliente conectada.

## Solicitud de una organización de administración (Admin Org) {#requesting-an-admin-org}

Antes de solicitar una organización de administración, el socio debe:

- Estar registrado en Datadog en el [Portal de socios de Datadog][1].
- Haber firmado el acuerdo para realizar transacciones con Datadog como proveedor de soluciones.
- Ser aprobado como socio de Datadog.

Los socios que aún no estén registrados pueden [Regístrese ahora][17] en el Portal de socios de Datadog.

{{< img src="partners/multi_tenant_billing/partner_portal_registration.png" alt="Página de registro del Portal de socios de Datadog." style="width:100%;" >}}

Los socios registrados pueden solicitar una organización de administración comunicándose con [partner-support@datadoghq.com][16]. Incluya en la solicitud si el socio también necesita que se habilite la capacidad de aprovisionamiento de organizaciones de prueba (Trial Org Provisioner) para la creación de organizaciones de prueba de autoservicio.

## Primeros pasos {#getting-started}

{{< whatsnext desc="Para comenzar con una organización de administración, consulte la siguiente documentación.">}}
  {{< nextlink href="/partners/multi_tenant_billing/customer-onboarding">}}<u>Incorporación de un nuevo cliente</u>: lleve a un cliente potencial desde una oportunidad registrada hasta una organización de cliente conectada.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/trial-org-provisioning">}}<u>Aprovisionamiento de organizaciones de prueba</u>: Aprovisione organizaciones de prueba para clientes potenciales directamente desde una organización de administración.{{< /nextlink >}}
  {{< nextlink href="/partners/multi_tenant_billing/troubleshooting">}}<u>Solución de problemas</u>: Resuelva problemas comunes con el aprovisionamiento de la organización de administración y la organización de prueba.{{< /nextlink >}}
{{< /whatsnext >}}

## Casos de uso {#use-cases}

Aquí hay algunas formas en las que una organización de administración puede ayudar:

| Caso de uso | Capacidad |
|---|---|
| Creación de organización de prueba de autoservicio para clientes potenciales. | [Aprovisionamiento de organizaciones de prueba][3]: Cree organizaciones de prueba directamente desde una organización de administración. |
| Haga un seguimiento del costo y el uso de todos los clientes en un solo lugar. | [Visibilidad de costos y uso][2]: Visualice datos estimados, históricos y proyectados de costos y uso facturable. |
| Realice un seguimiento de las métricas de uso en toda la cartera de negocios. | [Métricas de uso centralizadas][8]: Consolide las métricas de uso de los clientes en una organización de administración. |
| Permita que los clientes vean sus costos estimados según los precios del socio. | [Precios de cliente][9]: Configure los precios por cliente. |
| Administre la cartera de negocios en un solo lugar. | [Contratos de cliente][10]: Realice un seguimiento de clientes, contratos, facturas y renovaciones. |

## Solución de problemas {#troubleshooting}

Para obtener ayuda con problemas comunes de la organización de administración y la organización de prueba, consulte [Solución de problemas][7].

[1]: https://partners.datadoghq.com
[2]: /es/partners/multi_tenant_billing/cost-and-usage-visibility/
[3]: /es/partners/multi_tenant_billing/trial-org-provisioning/
[7]: /es/partners/multi_tenant_billing/troubleshooting/
[8]: /es/partners/multi_tenant_billing/centralized-usage-metrics/
[15]: /es/partners/multi_tenant_billing/customer-onboarding/
[16]: mailto:partner-support@datadoghq.com
[17]: https://partners.datadoghq.com/s/login/
[9]: /es/account_management/plan_and_usage/partner_experience/customer_pricing/
[10]: /es/account_management/plan_and_usage/partner_experience/customer_contracts/