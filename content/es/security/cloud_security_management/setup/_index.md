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
  text: Variables del Agent de Cloud Security
title: Configuración de Cloud Security
---

## Información general

Para empezar con Cloud Security, revisa lo siguiente:

- [Información general](#overview)
- [Activar Agentless Scanning](#enable-agentless-scanning)
- [Desplegar el Agent para una cobertura adicional](#deploy-the-agent-for-additional-coverage)
- [Activar funciones adicionales](#enable-additional-features)
  - [AWS CloudTrail Logs](#aws-cloudtrail-logs)
  - [Desplegar a través de integraciones en la nube](#deploy-via-cloud-integrations)
- [Desactivar Cloud Security](#disable-cloud-security)
- [Referencias adicionales](#further-reading)

## Activar Agentless Scanning

La forma más sencilla de empezar con Cloud Security es [habilitar Agentless Scanning][1]. Agentless Scanning proporciona visibilidad de las vulnerabilidades que existen en tus hosts de AWS, contenedores en ejecución, funciones de Lambda y Amazon Machine Images (AMI) en ejecución, sin necesidad de instalar el Datadog Agent.

Para obtener más información sobre Agentless Scanning, consulta [Cloud Security Agentless Scanning][2].

## Desplegar el Agent para una cobertura adicional

Para una cobertura más amplia y funcionalidades adicionales, despliega el Datadog Agent en tus hosts. La siguiente tabla resume las mejoras ofrecidas por los despliegues basados en el Agent. Para obtener más información, consulta [Configuración de Cloud Security en Agent][3].

<table>
  <thead>
    <tr>
      <th>Característica</th>
      <th>Sin Agent</th>
      <th>Sin Agent y despliegue basado en Agent</th>
      <th>Despliegue basado en Agent</th>
    </tr>
  </thead>
  <tr>
    <td><strong><a href="/security/cloud_security_management/identity_risks">Cloud Security Identity Risks</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td></td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/misconfigurations">Cloud Security Misconfigurations</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;"><a href="/security/default_rules/?search=host+benchmarks">Marcas de referencia de host</a></td>
    <td></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td><strong><a href="/security/cloud_security_management/vulnerabilities">Cloud Security Vulnerabilities</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Priorización de vulnerabilidad</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />Con contexto de tiempo de ejecución</td>
    <td>{{< X >}}<br />Con contexto de tiempo de ejecución</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Frecuencia de actualización de vulnerabilidad</td>
    <td>12 horas</td>
    <td>En tiempo real</td>
    <td>En tiempo real</td>
  </tr>
  <tr>
    <td><strong><a href="/security/security_inbox">Security Inbox</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />Con información más precisa</td>
    <td>{{< X >}}<br />Con información más precisa</td>
  </tr>
</table>

## Activar funciones adicionales

### AWS CloudTrail Logs

Maximiza los beneficios de [Cloud Security Identity Risks][6] con AWS CloudTrail Logs. Obtén información más detallada sobre el uso de los recursos en la nube, identificando a los usuarios y funciones con diferencias significativas entre los permisos proporcionados y aquellos utilizados. Para obtener más información, consulta [Configuración de AWS CloudTrail Logs para Cloud Security][4].

### Desplegar a través de integraciones en la nube

Monitoriza tu cobertura de seguridad del cumplimiento y protege tu infraestructura de nube contra ataques basados en IAM, habilitando el análisis de recursos AWS, Azure y GCP. Para obtener más información, consulta [Despliegue de Cloud Security a través de integraciones en la nube][7].

## Desactivar Cloud Security

Para obtener información sobre cómo desactivar Cloud Security, consulta lo siguiente:

- [Desactivar Cloud Security Vulnerabilities][8]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agentless_scanning/enable
[2]: /es/security/cloud_security_management/agentless_scanning
[3]: /es/security/cloud_security_management/setup/agent
[4]: /es/security/cloud_security_management/setup/cloudtrail_logs
[6]: /es/security/cloud_security_management/identity_risks
[7]: /es/security/cloud_security_management/setup/cloud_accounts
[8]: /es/security/cloud_security_management/troubleshooting/vulnerabilities/#disable-cloud-security-vulnerabilities
[9]: /es/security/workload_protection/troubleshooting/threats/#disable-csm-threats