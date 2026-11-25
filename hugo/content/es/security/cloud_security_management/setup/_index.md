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
  text: Tipos de implementación admitidos
- link: /security/guide/aws_fargate_config_guide
  tag: Documentación
  text: Guía de configuración de AWS Fargate para Datadog Security
- link: /security/cloud_security_management/guide/agent_variables/
  tag: Guía
  text: Variables del Cloud Security Agent
title: Configuración de Cloud Security
---
## Descripción general {#overview}

Para comenzar con Cloud Security, revise lo siguiente:

- [Habilite Agentless Scanning](#enable-agentless-scanning)
- [Implemente el Agent para obtener cobertura adicional](#deploy-the-agent-for-additional-coverage)
- [Habilite funciones adicionales](#enable-additional-features)
  - [Container Image Scanning en CI/CD](#container-image-scanning-in-cicd)
  - [Registros de AWS CloudTrail](#aws-cloudtrail-logs)
  - [Implemente mediante integraciones en la nube](#deploy-using-cloud-integrations)
- [Deshabilite Cloud Security](#disable-cloud-security)
- [Lecturas adicionales](#further-reading)

## Habilite Agentless Scanning {#enable-agentless-scanning}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El escaneo Agentless no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

La forma más sencilla de comenzar con Cloud Security es [habilitando Agentless Scanning][1]. Agentless Scanning proporciona la cobertura más amplia en su infraestructura de AWS, Azure y Google Cloud: escanea todos los servidores, contenedores en ejecución y otras cargas de trabajo compatibles sin requerir que instale nada en los recursos individuales.

Puede ejecutar escáneres de Agentless en su propia cuenta en la nube (alojados por usted) o dejar que Datadog los ejecute por usted (alojados por Datadog, en versión preliminar para AWS). Para comparar las opciones, consulte [Elija dónde se ejecutan los escáneres][10]. Para obtener más información sobre Agentless Scanning, consulte [Cloud Security Agentless Scanning][2].

## Implemente el Agent para obtener un contexto más profundo {#deploy-the-agent-for-deeper-context}

Agentless Scanning cubre toda su infraestructura en la nube, pero implementar el Datadog Agent en servidores críticos agrega un contexto de seguridad más profundo, como la priorización de vulnerabilidades en tiempo de ejecución, actualizaciones en tiempo real y evaluaciones de referencia de servidores. La siguiente tabla describe las mejoras que ofrecen las implementaciones basadas en Agent. Para obtener más información, consulte [Configuración de Cloud Security en el Agent][3].

<table>
  <thead>
    <tr>
      <th>Característica</th>
      <th>Agentless</th>
      <th>Agentless &#43; implementación basada en Agent</th>
      <th>Implementación basada en Agent</th>
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
    <td style="padding-left: 20px;"><a href="/security/default_rules/?search=host+benchmarks">Evaluaciones de referencia de servidores</a></td>
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
    <td style="padding-left: 20px;">Priorización de vulnerabilidades</td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />Con contexto de tiempo de ejecución</td>
    <td>{{< X >}}<br />Con contexto de tiempo de ejecución</td>
  </tr>
  <tr>
    <td style="padding-left: 20px;">Frecuencia de actualización de vulnerabilidades</td>
    <td>12 horas</td>
    <td>Tiempo real</td>
    <td>Tiempo real</td>
  </tr>
  <tr>
    <td><strong><a href="/security/security_inbox">Security Inbox</a></strong></td>
    <td>{{< X >}}</td>
    <td>{{< X >}}<br />Con información más precisa</td>
    <td>{{< X >}}<br />Con información más precisa</td>
  </tr>
</table>

## Habilite funciones adicionales {#enable-additional-features}

### Container Image Scanning en CI/CD {#container-image-scanning-in-cicd}

Escanee imágenes de contenedor en busca de vulnerabilidades durante sus canalizaciones de CI/CD, antes de implementar imágenes en producción. La CLI de Datadog Security se ejecuta directamente en sus trabajos de CI, brindándole control sobre cuándo y cómo se ejecutan los escaneos. Para obtener más información, consulte [Container Image Scanning en CI/CD][9].

### Registros de AWS CloudTrail {#aws-cloudtrail-logs}

Maximice los beneficios de [Cloud Security Identity Risks][6] con los registros de AWS CloudTrail. Obtenga información más detallada sobre el uso de recursos en la nube, identificando usuarios y roles con brechas significativas entre los permisos aprovisionados y los utilizados. Para obtener más información, consulte [Configuración de registros de AWS CloudTrail para Cloud Security][4].

### Implemente mediante integraciones en la nube {#deploy-using-cloud-integrations}

Supervise la cobertura de seguridad de su cumplimiento normativo y proteja su infraestructura en la nube contra ataques basados en IAM habilitando el análisis de recursos de AWS, Azure, Google Cloud y OCI. Para obtener más información, consulte [Implementación de Cloud Security mediante Cloud Integrations][7].

## Deshabilitar Cloud Security {#disable-cloud-security}

Para obtener información sobre cómo deshabilitar Cloud Security, consulte lo siguiente:

- [Deshabilitar Cloud Security Vulnerabilities][8]

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agentless_scanning/enable
[2]: /es/security/cloud_security_management/agentless_scanning
[3]: /es/security/cloud_security_management/setup/agent
[4]: /es/security/cloud_security_management/setup/cloudtrail_logs
[6]: /es/security/cloud_security_management/identity_risks
[7]: /es/security/cloud_security_management/setup/cloud_accounts
[8]: /es/security/cloud_security_management/troubleshooting/vulnerabilities/#disable-cloud-security-vulnerabilities
[9]: /es/security/cloud_security_management/setup/ci_cd
[10]: /es/security/cloud_security_management/setup/agentless_scanning#choose-where-scanners-run