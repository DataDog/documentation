---
aliases:
- /es/security_monitoring/
- /es/security_platform/cloud_siem/security_home/
- /es/security_platform/cloud_siem/
- /es/security/cloud_siem/security_home/
further_reading:
- link: https://www.datadoghq.com/blog/track-issues-datadog-case-management/
  tag: Blog
  text: Supervisa, clasifica y asigna problemas con Datadog Case Management
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: Blog
  text: Automatiza tareas de seguridad habituales y protégete frente a las amenazas
    con Datadog Workflows y Cloud SIEM
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Mejora el control, la gestión y la transparencia en todos tus equipos con
    Datadog Audit Trail
- link: https://www.datadoghq.com/blog/aws-threat-emulation-detection-validation-datadog/
  tag: Blog
  text: Emulación de amenazas de AWS y validación de la detección con Stratus Red
    Team y Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitorizar 1Password con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Crear una cobertura de seguridad suficiente para tu entorno en la nube
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Monitorización de logs DNS para la red y los análisis de seguridad
- link: https://www.datadoghq.com/blog/akamai-zero-trust-application-security/
  tag: Blog
  text: Monitoriza Akamai Zero Trust y Application Security con Datadog Cloud SIEM
title: Cloud SIEM
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Descubre cómo Datadog Cloud SIEM y Cloud Security Management mejoran la detección de amenazas de tu organización e investigación de entornos dinámicos a escala en la nube.
{{< /learning-center-callout >}}

## Información general

Datadog Cloud SIEM (Security Information y Event Management) unifica los equipos de desarrollo, operaciones y seguridad en una sola plataforma. Utiliza un único dashboard para visualizar el contenido de DevOps, las métricas empresariales y la información de seguridad. Cloud SIEM detecta en tiempo real las amenazas a tus aplicaciones y tu infraestructura, como ataques dirigidos, comunicaciones desde direcciones IP incluidas en la lista de amenazas y configuraciones inseguras. Notifica estos problemas de seguridad a tu equipo por correo electrónico, Slack, Jira, PagerDuty o webhooks.

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="Página principal de Cloud SIEM que muestra la sección de información general de seguridad con widgets para señales importantes, actores sospechosos, recursos afectados, información sobre amenazas y tendencias de señales" >}}

Las amenazas aparecen en Datadog como señales de seguridad y se pueden correlacionar y clasificar en el [Security Signals Explorer][1]. Las señales de seguridad son generadas por Datadog Cloud SIEM con [Reglas de detección][2]. Las Reglas de detección detectan amenazas a través de diferentes fuentes y están disponibles para su uso inmediato. Puedes clonar cualquiera de las reglas de detección proporcionadas para cambiar la configuración. También puedes añadir una [nueva regla][3] desde cero para adaptarla a tu caso de uso específico.

## Para empezar

{{< whatsnext desc="See the following documents to get started with Cloud SIEM:" >}}
  {{< nextlink href="/getting_started/cloud_siem/">}}Empezando con la Guía de Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/">}}Configurar AWS para Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/">}}Configurar Google Cloud para Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security/cloud_siem/guide/azure-config-guide-for-cloud-siem/">}}Configurar Azure para Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/integrations/">}}Buscar integraciones específicas para configurar la recopilación de logs en ellas{{< /nextlink >}}
  {{< nextlink href="/security/default_rules#cat-cloud-siem-log-detection">}}Comenzar a usar reglas de detección predefinidas de Cloud SIEM{{< /nextlink >}}
  {{< nextlink href="/security/detection_rules">}}Crear tus propias reglas de detección personalizadas{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/investigate_security_signals
[2]: /es/security/default_rules#cat-cloud-siem
[3]: /es/security/detection_rules