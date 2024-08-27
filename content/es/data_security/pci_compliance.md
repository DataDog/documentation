---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/
  tag: Blog
  text: Datadog presenta los servicios Log Management y APM de Datadog que cumplen
    con el PCI
title: Cumplimiento del estándar PCI DSS
---

{{% site-region region="us3,us5,eu,ap1,gov" %}}
<div class="alert alert-warning">
La conformidad con el PCI DSS para APM y Log Management sólo está disponible para las organizaciones de Datadog en el <a href="/getting_started/site/">sitio US1</a>.
</div>
{{% /región del sitio %}}

{{% site-region region="us" %}}
<div class="alert alert-warning">
El cumplimiento con el PCI DSS para APM y Log Management sólo está disponible para organizaciones de Datadog en el <a href="/getting_started/site/">sitio US1</a>.
</div>

## Información general

El Estándar de Seguridad de Datos de la Industria de Tarjetas de Pago (PCI DSS) impone rigurosos requisitos de seguridad de datos y monitorización a todos los comerciantes, proveedores de servicios e instituciones financieras. Para cumplir estos requisitos, las organizaciones han tenido que separar en diferentes aplicaciones los datos regulados por el PCI, de los no regulados, para su monitorización.

Datadog ofrece Log Management and Application Performance Monitoring (APM) conformes con el PCI, en el [sitio US1][1], para que puedas recopilar en un único lugar todos tus logs, estén o no regulados por el PCI. Consulta [Configurar una organización de Datadog que cumpla el PCI](#set-up-a-pci-compliant-datadog-organization) para saber cómo empezar.

## Establecer una organización de Datadog que cumpla el estándar PCI

{{< tabs >}}

{{% tab "Log Management" %}}

<div class="alert alert-danger">
<a href="https://docs.datadoghq.com/account_management/audit_trail/#setup">Audit Trail</a> debe estar activado y permanecer activado para cumplir el estándar PCI DSS.
</div>

Para crear una organización de Datadog que cumpla el estándar PCI, sigue estos pasos:

{{% pci-logs %}}

{{% /tab %}}

{{% tab "APM" %}}

<div class="alert alert-danger">
<a href="https://docs.datadoghq.com/account_management/audit_trail/#setup">Audit Trail</a> debe estar activado y permanecer activado para cumplir el estándar PCI DSS.
</div>

Para crear una organización de Datadog que cumpla el estándar PCI, sigue estos pasos:

{{% pci-apm %}}

{{% /tab %}}

{{< /tabs >}}

[1]: /es/getting_started/site/

{{% /site-region %}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}