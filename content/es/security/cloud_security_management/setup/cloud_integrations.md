---
aliases:
- /es/security/cloud_security_management/setup/csm_enterprise/cloud_accounts
- /es/security/cloud_security_management/setup/csm_pro/cloud_accounts
- /es/security/cloud_security_management/setup/cloud_accounts
title: Despliegue Cloud Security con integraciones de la nube
---

Utiliza las siguientes instrucciones para activar Misconfigurations and Identity Risks (CIEM) en AWS, Azure y GCP.

## Activar la exploración de recursos

Para activar la exploración de recursos para tus cuentas en la nube, primero debes configurar la integración y luego activar Cloud Security para cada cuenta de AWS, suscripción de Azure y proyecto de Google Cloud.

{{< partial name="security-platform/CSW-billing-note.html" >}}

{{< tabs >}}
{{% tab "AWS" %}}

{{% csm-setup-aws %}}

{{% /tab %}}

{{% tab "Azure" %}}

{{% csm-setup-azure %}}

{{% /tab %}}

{{% tab "Google Cloud" %}}

{{% csm-setup-google-cloud %}}

{{% /tab %}}

{{< /tabs >}}

## Desactivar la exploración de recursos

<div class="alert alert-info">Puedes acceder a los resultados históricos de los últimos 15 meses incluso si la exploración de recursos está desactivada.</div>

{{< tabs >}}
{{% tab "AWS" %}}

1. En la page (página) [**Cloud Security Setup** (Configuración de Cloud Security)][1], haz clic en **Cloud Integrations** (Integraciones en la nube).
1. Amplía la sección **AWS**.
1. Para detener la recopilación de recursos para una cuenta, haz clic en el botón **Edit** (Editar) ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) y cambia la alternancia **Enable Resource Scanning** (Activar Exploración de recursos) a la posición desactivada.
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services

{{% /tab %}}
{{% tab "Azure" %}}

1. En la Page (página) [**Cloud Security Setup** (Configuración de Cloud Security)][1], haz clic en **Cloud Integrations** (integraciones en la nube).
1. Amplía la sección **Azure**.
1. Para detener la recopilación de recursos para una suscripción, cambia a alternancia **Resource Scanning** (Exploración de recursos) a la posición desactivada.
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/azure

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. En la page (página) [**Cloud Security Setup** (Configuración de Cloud Security)][1], haz clic en **Cloud Integrations** (Integraciones en la nube).
1. Amplía la sección **GCP**.
1. Para detener la recopilación de recursos para un proyecto, cambie la alternancia **Resource Scanning** (Exploración de recursos) a la posición desactivada.
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/google-cloud-platform

{{% /tab %}}{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup