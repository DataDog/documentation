---
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Agentless Scanning de Cloud Security Management
- link: /security/cloud_security_management/setup/agentless_scanning/terraform
  tag: Documentación
  text: Configuración de Agentless Scanning utilizando Terraform
title: Configuración del análisis Agentless mediante Azure Resource Manager
---

Si ya [configuraste Cloud Security Management][3] y quieres añadir una nueva suscripción de Azure o activar el [análisis Agentless][1] en una suscripción de Azure integrada existente, puedes utilizar [Terraform][2] o Azure Resource Manager. Este artículo proporciona instrucciones detalladas sobre el enfoque de Azure Resource Manager.

<div class="alert alert-warning">La ejecución de analizadores Agentless conlleva costes adicionales. Para optimizar estos costes sin dejar de garantizar la fiabilidad de los análisis de 12 horas, Datadog recomienda configurar el <a href="/security/cloud_security_management/setup/agentless_scanning/terraform/">análisis Agentless con Terraform</a> como plantilla predeterminada.</div>

## Activar la exploración sin Agent

{{< tabs >}}
{{% tab "Nueva suscripción Azure" %}}

### Configurar la integración Datadog Azure

Sigue las instrucciones para configurar la [integración Datadog Azure][1].

{{% csm-agentless-azure-resource-manager %}}

[1]: /es/integrations/guide/azure-manual-setup/?tab=azurecli
{{% /tab %}}

{{% tab "Suscripción Azure existente" %}}

{{% csm-agentless-azure-resource-manager %}}

{{% /tab %}}{{< /tabs >}}

## Excluir recursos de los análisis

{{% csm-agentless-exclude-resources %}}

## Desactivar el análisis Agentless

1. En la página de [configuración de Cloud Security Management][3], haz clic en **Cloud Integrations** > **Azure** (Integraciones en la nube > Azure).
1. Localiza el inquilino de tu suscripción, expande la lista de suscripciones e identifica la suscripción en la que quieres desactivar el análisis Agentless.
1. Haz clic en el botón **Edit** (Editar) ({{< img src="security/csm/setup/edit-button.png" inline="true" style="width:24px;">}}) y desactiva el **Análisis de vulnerabilidades**.
1. Haz clic en **Done** (Listo).

## Desinstalación con Azure Resource Manager

Para desinstalar el análisis Agentless, inicia sesión en tu suscripción Azure. Si creaste un grupo de recursos exclusivo para el analizador Agentless, elimina este grupo de recursos junto con las siguientes definiciones de roles de Azure:
  - Rol del analizador Agentless de Datadog
  - Rol delegado del analizador Agentless de Datadog

Si no utilizaste un grupo de recursos exclusivo, deberás eliminar manualmente los recursos del analizador, que pueden identificarse mediante las etiquetas (tags) `Datadog:true` y `DatadogAgentlessScanner:true`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/agentless_scanning
[2]: /es/security/cloud_security_management/setup/agentless_scanning/terraform
[3]: https://app.datadoghq.com/security/configuration/csm/setup