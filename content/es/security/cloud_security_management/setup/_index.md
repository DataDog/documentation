---
aliases:
- /es/security_platform/cloud_workload_security/getting_started
- /es/security/cloud_workload_security/getting_started
- /es/security/cloud_workload_security/setup
- /es/security/threats/setup
- /es/security_platform/cspm/getting_started
- /es/security/cspm/getting_started
- /es/security/cspm/setup
- /es/security/misconfigurations/setup
- /es/security/vulnerabilities/setup
- /es/security/infrastructure_vulnerabilities/setup/
- /es/security/cloud_security_management/setup/csm_enterprise
- /es/security/cloud_security_management/setup/csm_cloud_workload_security
- /es/security/cloud_security_management/setup/csm_pro
further_reading:
- link: /security/cloud_security_management/setup/supported_deployment_types
  tag: Documentación
  text: Tipos de despliegue compatibles
- link: /security/cloud_security_management/guide/agent_variables/
  tag: Guía
  text: Variables de Agent de Cloud Security Management
title: Configuración de Cloud Security Management
---

Datadog proporciona un flujo de trabajo guiado para configurar [Cloud Security Management (CSM)][6]. El primer paso consiste en seleccionar las funciones que deseas activar. A continuación, sigue las instrucciones para configurar las funciones seleccionadas.

<div class="alert alert-info">Las siguientes instrucciones se aplican únicamente a los nuevos usuarios de CSM. Si ya eres usuario y deseas activar otras funciones de CSM, consulta <a href="/security/cloud_security_management/setup/#enable-additional-features">Activar funciones adicionales</a>.</div>

1. En la página [Intro to Cloud Security Management][10] (Introducción a Cloud Security Management), haz clic en **Get Started with Cloud Security Management** (Empezando con Cloud Security Management).
1. En la página [Features][11] (Funciones), selecciona las funciones que deseas activar.
1. Haz clic en **Start Using Cloud Security Management** (Comenzar a usar Cloud Security Management) y confirma tus elecciones.

{{< img src="security/csm/setup/features_selection_new_user.png" alt="Página de funciones de CSM" width="100%">}} 

Después de confirmar tus elecciones, aparece la página [Setup][3] (Configuración). Las instrucciones de la página se personalizan para que coincidan con las funciones seleccionadas. Por ejemplo, si activas **Compliance Scanning** (Escaneo de cumplimiento), solo se muestran las secciones **Cloud accounts** (Cuentas en la nube) y **Hosts and containers** (Hots y contenedores).

La siguiente tabla muestra qué secciones aparecen en la página Configuración para cada función.

<table>
  <thead>
    <tr>
      <th style="width: 50%;">Función</th>
      <th style="width: 50%;">Página de configuración</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Errores de configuración</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloud_accounts">Cuentas en la nube</a></li>
          <li><a href="/security/cloud_security_management/setup/agent">Hosts y contenedores</a></li>
          <li><a href="/security/cloud_security_management/setup/cloud_accounts/?tab=aws#set-up-cloudtrail-logs-forwarding">Logs de CloudTrail</a></li>
          <li><a href="/security/cloud_security_management/setup/source_code_integrations">Integraciones de código fuente</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Threat Detection</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/agent">Hosts y contenedores</a></li>
          <li><a href="/security/guide/aws_fargate_config_guide/?tab=amazonecs#cloud-security-management">Recursos serverless</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Identity Risks (CIEM)</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloud_accounts/?tab=aws#set-up-cloudtrail-logs-forwarding">Logs de CloudTrail</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Host Vulnerability Management</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloud_accounts">Cuentas en la nube</a></li>
          <li><a href="/security/cloud_security_management/setup/agent">Hosts y contenedores</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Container Vulnerability Management</td>
      <td>
        <ul style="font-size: 16px;">
          <li><a href="/security/cloud_security_management/setup/cloud_accounts">Cuentas en la nube</a></li>
          <li><a href="/security/cloud_security_management/setup/agent">Hosts y contenedores</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<div class="alert alert-info">Para obtener instrucciones sobre la configuración de Agentless Scanning, consulta <a href="/security/cloud_security_management/setup/agentless_scanning">Configuración de CSM Agentless Scanning</a>.</div>

## Activar funciones adicionales

Puedes activar funciones adicionales de CSM en cualquier momento volviendo a la página [Funciones][11] y haciendo clic en **Enable** (Activar) para las funciones que desees añadir. Esta página también sirve como página de estado que indica qué funciones están habilitadas, qué funciones están habilitadas pero aún no configuradas y qué funciones no están habilitadas.

{{< img src="security/csm/setup/features_page.png" alt="Página de funciones de CSM" width="100%">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agent
[2]: /es/security/cloud_security_management/setup/cloud_accounts
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: /es/security/cloud_security_management/setup/agentless_scanning
[5]: https://app.datadoghq.com/security/csm
[6]: /es/security/cloud_security_management/
[7]: /es/security/guide/aws_fargate_config_guide/
[9]: https://app.datadoghq.com/security/getting-started
[10]: https://app.datadoghq.com/security/csm/intro
[11]: https://app.datadoghq.com/security/configuration/csm/features
[12]: /es/security/cloud_security_management/setup/threat_detection
[13]: /es/security/cloud_security_management/setup/identity_risks_ciem
[14]: /es/security/cloud_security_management/setup/host_vulnerability_management
[15]: /es/security/cloud_security_management/setup/container_vulnerability_management