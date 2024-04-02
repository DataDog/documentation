---
further_reading:
- link: /security/cloud_security_management/
  tag: Documentación
  text: Cloud Security Management
- link: /infraestructura/catálogo_de_recursos/esquema/
  tag: Documentación
  text: Referencia del esquema de recursos en la nube
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: Blog
  text: Automatizar procesos integrales con flujos de trabajo de Datadog
- link: https://www.datadoghq.com/blog/csm-at-datadog/
  tag: Blog
  text: Cómo utilizamos Datadog CSM para mejorar la seguridad en nuestra infraestructura
    en la nube
- link: https://www.datadoghq.com/blog/detecting-leaked-credentials/
  tag: Blog
  text: Cómo detectamos y notificamos a los usuarios la filtración de credenciales
    de Datadog
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participar en una sesión interactiva para mejorar la seguridad y la detección
    de amenazas
- link: https://securitylabs.datadoghq.com/
  tag: Laboratorios de seguridad
  text: Investigación sobre seguridad, informes, consejos y vídeos de Datadog
kind: documentación
title: Empezando con Cloud Security Management
---

## Información general

[Datadog Cloud Security Management][1] (CSM) ofrece detección de amenazas en tiempo real y auditorías de configuración continuas en toda tu infraestructura en la nube. CSM incluye [Misconfigurations][2] y [Threats][3], funciones que se basan en datos de observabilidad.

Esta guía te mostrará las prácticas recomendadas para poner en marcha tu equipo con CSM.

## Fase 1: Despliegue

1. Instala el [Datadog Agent (versión 7.46 o superior)][4].
2. [Habilita CSM en tus recursos en la nube e infraestructura][5]:
    - **Amenazas de CSM**: Kubernetes Docker y host.
    - **Configuraciones erróneas de CSM**: AWS, Azure, GCP, Kubernetes e instrucciones Docker.
    - **Riesgos de identidad de CSM**: Habilita la recopilación de recursos AWS y el reenvío de logs de Cloudtrail.
    - **Vulnerabilidades de CSM**: Análisis de imágenes de contenedor e instrucciones de análisis de host en Kubernetes, instancias ECS EC2 e instalaciones basadas en host.
3. Consulta la [página de inicio de CSM][13] para obtener información general sobre los riesgos y amenazas de tu organización.
4. Echa un vistazo a las [más de 500 reglas de detección de Threats y Misconfigurations que vienen listas para utilizar][14].
5. Consulta las [señales de seguridad][15] y revisa los [hallazgos de CSM Misconfigurations][16].
6. Revisa y corrige los [riesgos de identidad][28] en la página [Riesgos de identidad][29].
7. Puedes ver las vulnerabilidades de los contenedores en la página [Imágenes de contenedor][25] y una lista consolidada de vulnerabilidades en la página [Vulnerabilidad de la infraestructura][30].
8. Configura [reglas de notificación][17] y recibe alertas mediante Slack, Jira, correo electrónico y más.

## Fase 2: Personalización

1. Configura [reglas de supresión de CSM Threats][18] para reducir el ruido.
2. Crea reglas de detección personalizadas para [CSM Misconfigurations][19] y [CSM Threats][20].

## Fase 3: Informes y dashboards

1. Evalúa el estado de tu organización con los [informes de cumplimiento][21].
2. Utiliza los dashboards que ya vienen preparados o [crea el tuyo][22] a fin de agilizar las investigaciones, la generación de informes y la monitorización.
3. Suscríbete a los informes semanales de [resumen de seguridad][31] para comenzar a investigar y corregir los problemas de seguridad más importantes que se han descubierto en los últimos siete días.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/
[2]: /es/security/cloud_security_management/misconfigurations/
[3]: /es/security/threats/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /es/security/cloud_security_management/setup
[13]: https://app.datadoghq.com/security/csm
[14]: /es/security/default_rules/#cat-cloud-security-management
[15]: /es/security/cloud_security_management/misconfigurations/signals_explorer/
[16]: /es/security/cloud_security_management/misconfigurations/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /es/security/cloud_security_management/guide/tuning-rules/
[19]: /es/security/cloud_security_management/misconfigurations/custom_rules
[20]: /es/security/threats/agent_expressions
[21]: /es/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[22]: /es/dashboards/#overview
[23]: /es/security/cloud_security_management/setup/csm_pro?tab=aws#configure-csm-for-container-vulnerabilities
[24]: /es/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-csm-for-vulnerabilities
[25]: https://app.datadoghq.com/containers/images
[26]: /es/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[27]: /es/integrations/amazon_cloudtrail/#send-logs-to-datadog
[28]: /es/security/cloud_security_management/identity_risks/
[29]: https://app.datadoghq.com/security/identities
[30]: https://app.datadoghq.com/security/infra-vulnerability
[31]: https://app.datadoghq.com/security/configuration/reports