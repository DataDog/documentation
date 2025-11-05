---
algolia:
  tags:
  - cspm
aliases:
- /es/security_platform/cspm/
- /es/security/cspm/#glossary
- /es/security/cspm/
- /es/security/misconfigurations/
title: Cloud Security Misconfigurations
---

Cloud Security Misconfigurations facilita la evaluación y visualización de la postura de seguridad actual e histórica de tus recursos en la nube, automatiza la recopilación de pruebas de auditoría y corrige los errores de configuración que hacen que tu organización sea vulnerable a los ataques. Al poner en evidencia continuamente las debilidades de seguridad resultantes de errores de configuración, los equipos pueden mitigar los riesgos y al mismo tiempo garantizar el cumplimiento de las normas del sector.

## Detección de errores de configuración en tus recursos en la nube

Refuerza tu postura de seguridad y logra un cumplimiento continuo mediante la detección, la priorización y la corrección de configuraciones erróneas en todos tus recursos en la nube utilizando [reglas de cumplimiento predefinidas] de Datadog (#maintain-compliance-with-industry-frameworks-and-benchmarks).

Ve una descripción general de alto nivel de tu postura de seguridad en la [página de descripción general][1]. Examina los detalles de los errores de configuración y analiza las configuraciones históricas con la [página de Resultados de Misconfigurations][2].

Cloud Security Misconfigurations evalúa los recursos en incrementos de entre 15 minutos y 4 horas (dependiendo del tipo). Datadog genera nuevos errores de configuración en cuanto se completa un análisis y almacena un historial completo de todos los errores de configuración de los últimos 15 meses para que estén disponibles en caso de investigación o auditoría.

{{< img src="security/cspm/misconfigurations_explorer_4.png" alt="Página de resultados de Cloud Security Misconfigurations" width="100%">}}

## Observar un cumplimiento de los marcos y referencia del sector

Cloud Security Misconfigurations viene con más de 1000 reglas de cumplimiento predefinidas cuyo mantenimiento está en manos de un equipo de expertos en seguridad. Las reglas se corresponden con los controles y requisitos de las reglas de cumplimiento y las referencias del sector, como los marcos de cumplimiento PCI y SOC2.

[Consulta los informes de cumplimiento][3] para ver cómo te va con cada control de un marco de cumplimiento. Los informes incluyen detalles como los recursos con el mayor número de errores de configuración, un desglose completo del número de recursos con errores de configuración aprobados/fallidos y las tres fallas más graves de las reglas.

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_5.png" alt="Marcos de conformidad de Cloud Security Misconfigurations" width="100%">}}

## Gestión de reglas de detección predefinidas y personalizadas

Las [reglas de detección predefinidas][4] ponen de manifiesto los riesgos más importantes para que puedas tomar medidas inmediatas y corregirlos. Datadog desarrolla continuamente nuevas reglas predeterminadas que se importan automáticamente a tu cuenta. [Personaliza las reglas][5] definiendo cómo cada regla analiza tu entorno, [crea reglas personalizadas][6] y [configura notificaciones en tiempo real para errores de configuración](#set-up-real-time-notifications).

{{< img src="security/cspm/detection_rules.png" alt="Reglas de detección de Cloud Security Misconfigurations" width="100%">}}

## Configuración de notificaciones en tiempo real

[Envía notificaciones en tiempo real][7] cuando se detecte un nuevo error de configuración en tu entorno, para que tus equipos puedan tomar medidas para mitigar el riesgo. Es posible enviar notificaciones a través de [Slack, correo electrónico, PagerDuty, webhooks, y más][8].

Utiliza variables de plantilla y Markdown para [personalizar los mensajes de notificación][9]. Edita, deshabilita y elimina las reglas notificación existentes o crea nuevas reglas y define una lógica personalizada para cuando se active un notificación en función de la gravedad y el tipo de regla.

## Revisión y corrección de los errores de configuración

Investiga los detalles utilizando la [página de Resultados de Misconfigurations][10]. Ve información detallada sobre un recurso, como su configuración, las reglas de cumplimiento aplicadas al recurso y las etiquetas (tags) que proporcionan contexto adicional sobre quién es el propietario del recurso y su localización dentro de tu entorno. Si un error de configuración no se ajusta a tu caso de uso empresarial o es un riesgo aceptado, puedes [silenciar el error de configuración][13] hasta un periodo de tiempo indefinido.

También puedes [crear una incidencia en Jira][15] y asignarla a un equipo, utilizar las correcciones de Terraform para generar una solicitud pull en GitHub con cambios en el código que corrijan el error de configuración subyacente y aprovechar [Workflow Automation][14] para crear flujos (flows) de trabajo automatizados (con o sin participación humana).

## Para empezar

{{< learning-center-callout header="Try Detect, Prioritize, and Remediate Cloud Security Risks with Datadog Cloud Security in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/csm-misconfigurations">}}
  El Centro de Aprendizaje Datadog está lleno de cursos prácticos para ayuda aprender sobre este tema. Inscríbase sin coste alguno para aprender a proteger su nube entornos con los errores de configuración de Cloud Security.
{{< /learning-center-callout >}}

{{< whatsnext >}}
  {{< nextlink href="/security/cloud_security_management/setup">}}Completar los ajustes y configuración{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Comenzar con Cloud Security{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}Permisos de roles de Datadog para Cloud Security Misconfigurations{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-cloud">}}Reglas de detección en la nube predefinidas para Cloud Security Misconfigurations{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-infra">}}Reglas de detección de infraestructura predefinidas para Cloud Security Misconfigurations{{< /nextlink >}}
  {{< nextlink href="/security/cloud_security_management/misconfigurations/findings">}} Obtén más información sobre Misconfigurations{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}} Monitoriza la postura de seguridad y conformidad de tu entorno de Azure{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/">}} Mejora la postura de conformidad y seguridad de tu entorno de Google Cloud{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/csm
[2]: https://app.datadoghq.com/security/compliance
[3]: /es/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[4]: /es/security/default_rules/#cat-posture-management-cloud
[5]: /es/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks#view-your-compliance-posture
[6]: /es/security/cloud_security_management/misconfigurations/custom_rules
[7]: /es/security/notifications/
[8]: /es/security/notifications/#notification-channels
[9]: /es/security/notifications/#detection-rule-notifications
[10]: /es/security/cloud_security_management/misconfigurations/findings
[11]: /es/security/default_rules/#cat-posture-management-infra
[12]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
[13]: /es/security/cloud_security_management/mute_issues
[14]: /es/security/cloud_security_management/review_remediate/workflows/
[15]: /es/security/cloud_security_management/review_remediate/jira?tab=csmmisconfigurations