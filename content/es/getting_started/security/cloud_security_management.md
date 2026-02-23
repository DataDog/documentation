---
aliases:
- /es/getting_started/cloud_security_management
description: Despliega Cloud Security de Datadog para una visibilidad unificada en
  toda tu infraestructura. Configura la detección de amenazas, configuraciones erróneas,
  riesgos de identidad y vulnerabilidades.
further_reading:
- link: /security/cloud_security_management/
  tag: Documentación
  text: Cloud Security
- link: /infraestructura/catálogo_de_recursos/esquema/
  tag: Documentación
  text: Referencia del esquema de recursos en la nube
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatizar procesos integrales con flujos de trabajo de Datadog
- link: https://www.datadoghq.com/blog/detecting-leaked-credentials/
  tag: Blog
  text: Cómo detectamos y notificamos a los usuarios la filtración de credenciales
    de Datadog
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participar en una sesión interactiva para mejorar tu seguridad y la detección
    de amenazas
- link: https://securitylabs.datadoghq.com/
  tag: Laboratorios de seguridad
  text: Investigaciones, informes, consejos y vídeos de Datadog sobre seguridad
title: Empezando con Cloud Security
---

## Información general

[Cloud Security de Datadog][1] ofrece una gran visibilidad, auditorías de configuración continuas, evaluaciones de riesgos de identidad, detección de vulnerabilidades y detección de amenazas en tiempo real en toda tu infraestructura en la nube, todo ello en una plataforma unificada para una colaboración fluida y una corrección más rápida.

Con Cloud Security, Security y DevOps, los equipos pueden actuar en el contexto compartido de la observabilidad y los datos de seguridad para priorizar y corregir rápidamente los problemas. En esta guía, se explican las prácticas recomendadas para poner en marcha tu equipo con Cloud Security.

## Fase 1: Despliegue

1. Con [Agentless][34] y/o el [Agent de Datadog (versión 7.46 o superior)][4], [activa Cloud Security para tus recursos e infraestructura en la nube][5]:
    - **[Amenazas][3]**: Kubernetes, Docker e instalaciones basadas en host.
    - **[Configuraciones erróneas][2]**: Instrucciones de AWS, Azure, GCP, Kubernetes y Docker.
    - **[Riesgos de identidad][28]**: Activa la recopilación de recursos de AWS y el reenvío de logs de Cloudtrail.
    - **[Vulnerabilidades][6]**: Instrucciones de análisis de imágenes de contenedores y análisis de hosts para AWS, Azure, Kubernetes, instancias de ECS EC2 e instalaciones basadas en hosts.
1. Echa un vistazo a la [página de inicio de Cloud Security][13] para obtener información general de los riesgos y amenazas de tu organización.
1. Echa un vistazo a las [más de 500 reglas de detección de Threats y Misconfigurations que vienen listas para utilizar][14].
1. Revisa [Conclusiones sobre los errores de configuración de Cloud Security][16].
1. Revisa y corrige los riesgos de identidad en la page (página) [Riesgos de identidad][29].
1. Puedes ver las vulnerabilidades de los contenedores en la página [Imágenes de contenedor][25] y una lista consolidada de vulnerabilidades en la página [Vulnerabilidad de la infraestructura][30].
1. Configura [reglas de notificación][17] y recibe alertas mediante Slack, Jira, correo electrónico y más.

## Fase 2: Personalización

1. Configura [Reglas de supresión de Workload Protection][18] para reducir el ruido.
2. Crea reglas de detección personalizadas para [Errores de configuración de Cloud Security][19] y [Workload Protection][20].

## Fase 3: Informes y dashboards

1. Evalúa el estado de tu organización con los [informes de cumplimiento][21].
2. Utiliza los dashboards que ya vienen preparados o [crea el tuyo][22] a fin de agilizar las investigaciones, la generación de informes y la monitorización.
3. Suscríbete a los informes semanales de [resumen de seguridad][31] para comenzar a investigar y corregir los problemas de seguridad más importantes que se han descubierto en los últimos siete días.

## Desactivar Cloud Security

Para obtener información sobre cómo desactivar Cloud Security, consulta lo siguiente:

- [Desactivar vulnerabilidades de Cloud Security][32]
- [Desactivar Workload Protection][33]

## Referencias adicionales

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
[20]: /es/security/workload_protection/agent_expressions
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