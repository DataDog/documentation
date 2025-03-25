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
- link: /security/guide/aws_fargate_config_guide
  tag: Documentación
  text: Guía de configuración de AWS Fargate para la seguridad de Datadog
- link: /security/cloud_security_management/guide/agent_variables/
  tag: Guía
  text: Variables de Agent de Cloud Security Management
title: Configuración de Cloud Security Management
---

## Información general

Para empezar con Cloud Security Management (CSM), revisa lo siguiente:

- [Información general](#overview)
- [Activar Agentless Scanning](#enable-agentless-scanning)
- [Desplegar el Agent para una cobertura adicional](#deploy-the-agent-for-additional-coverage)
- [Activar funciones adicionales](#enable-additional-features)
  - [AWS CloudTrail Logs](#aws-cloudtrail-logs)
  - [Análisis de IaC](#iac-scanning)
  - [Corrección de IaC](#iac-remediation)
  - [Desplegar a través de integraciones en la nube](#deploy-via-cloud-integrations)
- [Desactivar CSM](#disable-csm)
- [Referencias adicionales](#further-reading)

## Activar Agentless Scanning

La forma más sencilla de empezar con Cloud Security Management es [habilitar Agentless Scanning][1]. Agentless Scanning proporciona visibilidad de las vulnerabilidades que existen en tus hosts AWS, contenedores en ejecución, funciones Lambda y Amazon Machine Images (AMI) en ejecución, sin necesidad de instalar el Datadog Agent.

Para obtener más información sobre Agentless Scanning, consulta [Cloud Security Management Agentless Scanning][2].

## Desplegar el Agent para una cobertura adicional

Para obtener una cobertura más amplia y funcionalidades adicionales, despliega el Datadog Agent en tus hosts. En la tabla siguiente se describen las mejoras que ofrecen los despliegues basados en el Agent. Para obtener más información, consulta [Configuración de Cloud Security Management en el Agent][3].

<table>
  <thead>
    <tr>
      Característica
      <th>Agentless</th>
      <th>Agentless &#43; despliegue basado en el Agent</th>
      <th>Despliegue basado en el Agent</th>
    </tr>
  </thead>
  <tr>
    <td><strong><a href="/security/cloud_security_management/identity_risks">CSM Identity Risks</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td></td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/misconfigurations">CSM Misconfigurations</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;"><a href="/security/default_rules/?search=host+benchmarks">Referencias de hosts</a></td>
    <td></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/vulnerabilities">CSM Vulnerabilities</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Priorización de las vulnerabilidades</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />Con contexto de tiempo de ejecución</td>
    <td>{{< X >}}<br />Con contexto de tiempo de ejecución</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Frecuencia de actualización de las vulnerabilidades</td>
    <td>12 horas</td>
    <td>Tiempo real</td>
    <td>Tiempo real</td>
  </tr>
  <tr>
    <td><strong><a href="/security/threats">CSM Threats</a></strong></td>
    <td></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Detección de amenazas</td>
    <td></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td><strong><a href="/security/security_inbox">Bandeja de entrada de seguridad</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />Con información más precisa</td>
    <td>{{< X >}}<br />Con información más precisa</td>
  </tr>
</table>

## Activar funciones adicionales

### AWS CloudTrail Logs

Maximiza los beneficios de [CSM Identity Risks][6] con AWS CloudTrail Logs. Obtén información más detallada sobre el uso de los recursos en la nube, identificando a los usuarios y funciones con diferencias significativas entre los permisos proporcionados y aquellos utilizados. Para obtener más información, consulta [Configuración de AWS CloudTrail Logs para Cloud Security Management][4].

### Análisis de IaC

Integra el análisis de la infraestructura como código (IaC) con GitHub para detectar configuraciones erróneas en los recursos en la nube definidos por Terraform. Para obtener más información, consulta [Configuración del análisis de IaC para Cloud Security Management][10].

### Corrección de IaC

Utiliza la corrección de IaC con Terraform para crear solicitudes de extracción en GitHub, aplicando cambios en el código que corrijan las configuraciones erróneas y atenúen los riesgos relativos a la identidad. Para obtener más información, consulta [Configuración de la corrección de IaC para Cloud Security Management][5].

### Desplegar a través de integraciones en la nube

Monitoriza tu cobertura de seguridad del cumplimiento y protege tu infraestructura de nube contra ataques basados en IAM, habilitando el análisis de recursos AWS, Azure y GCP. Para obtener más información, consulta [Despliegue de Cloud Security Management a través de integraciones en la nube][7].

## Desactivar CSM

Para obtener información sobre cómo desactivar CSM, consulta lo siguiente:

- [Desactivar CSM Vulnerabilities][8]
- [Desactivar CSM Threats][9]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agentless_scanning
[2]: /es/security/cloud_security_management/agentless_scanning
[3]: /es/security/cloud_security_management/setup/agent
[4]: /es/security/cloud_security_management/setup/cloudtrail_logs
[5]: /es/security/cloud_security_management/setup/iac_remediation
[6]: /es/security/cloud_security_management/identity_risks
[7]: /es/security/cloud_security_management/setup/cloud_accounts
[8]: /es/security/cloud_security_management/troubleshooting/vulnerabilities/#disable-csm-vulnerabilities
[9]: /es/security/cloud_security_management/troubleshooting/threats/#disable-csm-threats
[10]: /es/security/cloud_security_management/setup/iac_scanning