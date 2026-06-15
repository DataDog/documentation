---
aliases:
- /es/security/cloud_security_management/setup/csm_enterprise/cloud_accounts
- /es/security/cloud_security_management/setup/csm_pro/cloud_accounts
- /es/security/cloud_security_management/setup/cloud_accounts
title: Despliega Cloud Security con integraciones de la nube
---

Utiliza las siguientes instrucciones para activar Misconfigurations and Identity Risks (CIEM) en AWS, Azure y GCP.

## Activar la exploración de recursos

Para activar el análisis de recursos para tus cuentas en la nube, primero debes configurar la integración y, a continuación, activar Cloud Security para cada cuenta de AWS, Azure y Google Cloud.

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

1. En la page (página) [**Cloud Security Setup**][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **AWS** (Integraciones en la nube > AWS).
2. Si es necesario, utiliza filtros para buscar la cuenta para la que deseas detener el análisis de recursos. Haz clic en la cuenta para abrir el panel lateral que contiene sus parámetros.
3. En la pestaña **Features** (Funciones), junto a **Posture Management** (Gestión de la postura), cambia el conmutador **Enable** (Activar) a la posición de desactivado.

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services

{{% /tab %}}
{{% tab "Azure" %}}

1. En la page (página) [**Cloud Security Setup**][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **Azure** (Integraciones en la nube > Azure).
1. Para detener el análisis de recursos para una cuenta, cambia el conmutador **Resource Scanning** (Análisis de recursos) a la posición de desactivado.
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/azure

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. En la page (página) [**Cloud Security Setup**][1] (Configuración de Cloud Security), haz clic en **Cloud Integrations** > **GCP** (Integraciones en la nube > GCP).
1. Para detener el análisis de recursos para una cuenta, cambia el conmutador **Resource Scanning** (Análisis de recursos) a la posición de desactivado.
1. Haz clic en **Done** (Listo).

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://app.datadoghq.com/integrations/google-cloud-platform

{{% /tab %}}
{{< /tabs >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup