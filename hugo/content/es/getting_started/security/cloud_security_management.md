---
aliases:
- /es/getting_started/cloud_security_management
description: Implemente Datadog Cloud Security para obtener una visibilidad unificada
  en toda su infraestructura. Configure la detección de amenazas, las configuraciones
  incorrectas, los riesgos de identidad y las vulnerabilidades.
further_reading:
- link: /security/cloud_security_management/
  tag: Documentación
  text: Cloud Security
- link: /infrastructure/resource_catalog/schema/
  tag: Documentación
  text: Referencia del esquema de recursos en la nube
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatice procesos de extremo a extremo con Datadog Workflows
- link: https://www.datadoghq.com/blog/detecting-leaked-credentials/
  tag: Blog
  text: Cómo detectamos y notificamos a los usuarios sobre credenciales de Datadog
    filtradas
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para elevar su seguridad y detección de amenazas
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Investigación, informes, consejos y videos de seguridad de Datadog
- link: https://learn.datadoghq.com/courses/csm-misconfigurations
  tag: Centro de aprendizaje
  text: Encuentre y remedie recursos en la nube vulnerables con Cloud Security Misconfigurations.
title: Introducción a Cloud Security
---
## Descripción general {#overview}

[Datadog Cloud Security][1] ofrece visibilidad profunda, auditorías de configuración continuas, evaluaciones de riesgo de identidad, detección de vulnerabilidades y detección de amenazas en tiempo real en toda su infraestructura en la nube, todo en una plataforma unificada para una colaboración fluida y una remediación más rápida.

Con Cloud Security, los equipos de Security y DevOps pueden actuar sobre el contexto compartido de los datos de observabilidad y seguridad para priorizar y remediar problemas rápidamente. Esta guía le explica las mejores prácticas para que su equipo comience a utilizar Cloud Security.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Agentless Scanning no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Fase 1: Implementación {#phase-1-deployment}

1. Mediante [Agentless][34] y/o el [Datadog Agent (versión 7.46 o superior)][4], [habilite Cloud Security para sus recursos e infraestructura en la nube][5]:
    - **[Threats][3]**: instalaciones basadas en Kubernetes, Docker y servidores.
    - **[Misconfigurations][2]**: instrucciones para AWS, Azure, GCP, OCI, Kubernetes y Docker.
    - **[Identity Risks][28]**: habilite la recopilación de recursos de AWS y el reenvío de registros de Cloudtrail.
    - **[Vulnerabilities][6]**: instrucciones de escaneo de imágenes de contenedores y escaneo de servidores para AWS, Azure, Kubernetes, instancias ECS EC2 e instalaciones basadas en servidores.
1. Consulte la [página principal de Cloud Security][13] para obtener una visión general de los riesgos y amenazas de su organización.
1. Revise [500+ out-of-the-box Threats and Misconfigurations detection rules][14].
1. Revise [Cloud Security Misconfigurations findings][16].
1. Revise y remedie los riesgos de identidad en la página [{{< ui >}}Identity Risks{{< /ui >}}][29].
1. Revise las vulnerabilidades de los contenedores en la página [{{< ui >}}Container Images{{< /ui >}}][25] y una lista consolidada de vulnerabilidades en la página [{{< ui >}}Infrastructure Vulnerability{{< /ui >}}][30].
1. Configure [notification rules][17] y reciba alertas mediante Slack, Jira, correo electrónico y más.

## Fase 2: Personalización {#phase-2-customization}

1. Configure [Workload Protection suppression rules][18] para reducir el ruido.
2. Cree reglas de detección personalizadas para [Cloud Security Misconfigurations][19] y [Workload Protection][20].

## Fase 3: Informes y paneles {#phase-3-reports-and-dashboards}

1. Evalúe la postura de su organización revisando los [informes de cumplimiento][21].
2. Utilice paneles preconfigurados o [cree los suyos propios][22] para realizar investigaciones, informes y monitoreo más rápidos.
3. Suscríbase a los informes semanales de [security digest][31] para comenzar la investigación y remediación de los problemas de seguridad nuevos más importantes descubiertos en los últimos siete días. 

## Deshabilitar Cloud Security {#disable-cloud-security}

Para obtener información sobre cómo deshabilitar Cloud Security, consulte lo siguiente:

- [Disable Cloud Security Vulnerabilities][32]
- [Disable Workload Protection][33]

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/
[2]: /es/security/cloud_security_management/misconfigurations/
[3]: /es/security/threats/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /es/security/cloud_security_management/setup
[6]: /es/security/cloud_security_management/vulnerabilities/
[13]: https://app.datadoghq.com/security/csm
[14]: /es/security/default_rules/#cat-cloud-security-management
[16]: /es/security/cloud_security_management/misconfigurations/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /es/security/cloud_security_management/guide/tuning-rules/
[19]: /es/security/cloud_security_management/misconfigurations/custom_rules
[20]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-a-custom-detection-rule
[21]: /es/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[22]: /es/dashboards/#overview
[25]: https://app.datadoghq.com/containers/images
[26]: /es/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[27]: /es/integrations/amazon_cloudtrail/#send-logs-to-datadog
[28]: /es/security/cloud_security_management/identity_risks/
[29]: https://app.datadoghq.com/security/identities
[30]: https://app.datadoghq.com/security/infra-vulnerability
[31]: https://app.datadoghq.com/security/configuration/reports
[32]: /es/security/cloud_security_management/troubleshooting/vulnerabilities/#disable-cloud-security-vulnerabilities
[33]: /es/security/workload_protection/troubleshooting/threats/#disable-csm-threats
[34]: /es/security/cloud_security_management/setup/cloud_integrations