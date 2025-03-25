---
further_reading:
- link: /security/cloud_security_management/setup/iac_scanning
  tag: Documentación
  text: Configuración del escaneo de IaC
title: Análisis de IaC
---

{{< callout url="https://www.datadoghq.com/product-preview/iac-security/" >}}
  El escaneo estático de infraestructura como código (IaC) está en fase de vista previa. Para solicitar acceso, rellena el formulario.
{{< /callout >}}

El escaneo estático de la infraestructura como código (IaC) se integra con sistemas de control de versiones, como GitHub, para detectar configuraciones erróneas en los recursos en la nube definidos por Terraform. Los resultados del escaneo se muestran en dos localizaciones principales: dentro de las solicitudes pull durante las modificaciones de código y en la página **Explorers** (Exploradores) dentro de Cloud Security Management.

<div class="alert alert-info">El escaneo estático de IaC admite GitHub para el control de versiones y Terraform para la infraestructura como código.</div>

{{< img src="security/csm/iac_scanning_explorer2.png" alt="Página Exploradores de CSM que muestra los errores de configuración detectados en los recursos en la nube" width="100%">}}

Al hacer clic en un resultado, el panel lateral revela detalles adicionales, incluida una breve descripción de la regla de IaC relacionada con el resultado y una vista previa del código infractor.

{{< img src="security/csm/iac_scanning_finding.png" alt="Panel lateral de resultados con el cifrado de volumen de EBS sin definir en el código de Terraform resaltado." width="100%">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}