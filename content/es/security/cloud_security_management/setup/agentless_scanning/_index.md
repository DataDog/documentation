---
further_reading:
- link: /security/cloud_security_management/setup
  tag: Documentación
  text: Configuración de Cloud Security Management
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Agentless Scanning de Cloud Security Management
title: Activación de de Agentless Scanning
---

Agentless Scanning proporciona visibilidad de las vulnerabilidades que existen dentro de tu infraestructura de nube, sin necesidad de instalar el Datadog Agent. Para obtener más información sobre las capacidades y el funcionamiento de Agentless Scanning, consulta la documentación de [Agentless Scanning][12].

## Requisitos previos

Antes de configurar Agentless Scanning, asegúrate de que se cumplen los siguientes requisitos previos:

- **Configuración remota**: La [configuración remota][3] es necesaria para permitir que Datadog envíe información a los analizadores Agentless, como qué recursos de la nube analizar.
- Permisos en la nube**: La instancia de Agentless Scanning requiere permisos específicos para analizar funciones de hosts. Estos permisos se aplican automáticamente como parte del proceso de instalación.<br><br>
  {{< collapse-content title="Permisos de análisis de hosts y contenedores AWS" level="h5" >}}
  <ul>
    <li><code>ec2:DescribeVolumes</code></li>
    <li><code>ec2:CreateTags</code></li>
    <li><code>ec2:CreateSnapshot</code></li>
    <li><code>ec2:DeleteSnapshot</code></li>
    <li><code>ec2:DescribeSnapshots</code></li>
    <li><code>ec2:DescribeSnapshotAttribute</code></li>
    <li><code>ebs:ListSnapshotBlocks</code></li>
    <li><code>ebs:ListChangedBlocks</code></li>
    <li><code>ebs:GetSnapshotBlock</code></li>
  </ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Permisos de análisis de AWS Lambda" level="h5" >}}
  <ul><li><code>lambda:GetFunction</code></li></ul>
  {{< /collapse-content >}}

  {{< collapse-content title="Permisos de análisis de hosts" level="h5" >}}
  <ul>
    <li><code>Microsoft.Compute/virtualMachines/read</code></li>
    <li><code>Microsoft.Compute/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/read</code></li>
    <li><code>Microsoft.compu/virtualMachineScaleSets/instanceView/read</code></li>
    <li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read</code></li>
    <li><code>Microsoft.compu/virtualMachineScaleSets/virtualMachines/instanceView/read</code></li>
    <li><code>Microsoft.Compute/disks/read</code></li>
    <li><code>Microsoft.Compute/disks/beginGetAccess/action</code></li>
    <li><code>Microsoft.Compute/disks/endGetAccess/action</code></li>
  </ul>
  {{< /collapse-content >}}

## Configuración

<div class="alert alert-warning">La ejecución de analizadores Agentless incurre en costes adicionales. Para optimizar estos costes sin dejar de garantizar la fiabilidad de los análisis de 12 horas, Datadog recomienda configurar <a href="/security/cloud_security_management/setup/agentless_scanning/terraform/">Agentless Scanning con Terraform</a> como plantilla predeterminada.</div>

Para activar Agentless Scanning, utiliza uno de los siguientes flujos de trabajo:

### Inicio rápido

Diseñado para nuevos usuarios, el [flujo de trabajo de inicio rápido][5] ofrece un proceso de configuración eficaz para la gestión de la seguridad en la nube, lo que permite la monitorización inmediata de recursos de AWS. Utiliza AWS CloudFormation para automatizar la configuración.

### Terraform

El [módulo de análisis Agentless Terraform Datadog][6] proporciona una configuración sencilla y reutilizable para instalar el analizador Agentless de Datadog. Para obtener más información, consulta [Configuración del analizador Agentless mediante Terraform][7].

### AWS CloudFormation

Utiliza la plantilla AWS CloudFormation para crear un stack tecnológico de CloudFormation. La plantilla incluye los permisos de IAM necesarios para desplegar y gestionar analizadores Agentless. Para obtener más información, consulta [Configuración de Agentless Scanning con AWS CloudFormation][11].

### Azure Resource Manager

Utiliza la plantilla Azure Resource Manager para desplegar el analizador Agentless. La plantilla incluye las definiciones de funciones necesarias para desplegar y gestionar analizadores Agentless. Para obtener más información, consulta [Configuración de Agentless Scanning con Azure Resource Manager][13].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/agentless_scanning
[2]: /es/integrations/amazon_web_services/
[3]: /es/agent/remote_config/?tab=configurationyamlfile#setup
[4]: https://app.datadoghq.com/security/csm/intro
[5]: /es/security/cloud_security_management/setup/agentless_scanning/quick_start
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: /es/security/cloud_security_management/setup/agentless_scanning/terraform
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: /es/security/cloud_security_management/setup/agentless_scanning/cloudformation
[12]: /es/security/cloud_security_management/agentless_scanning
[13]: /es/security/cloud_security_management/setup/agentless_scanning/azure_resource_manager