---
algolia:
  tags:
  - csm
  - cloud security management
  - inbox
aliases:
- /es/security_platform/cloud_security_management/
cascade:
  algolia:
    subcategory: Cloud Security
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Comience a rastrear las configuraciones incorrectas con Cloud Security Misconfigurations
- link: /security/research_feed
  tag: Documentación
  text: Security Research Feed
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: Blog
  text: Mejore la detección de amenazas en AWS con Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: Blog
  text: Mejores prácticas para asegurar aplicaciones de Kubernetes
- link: https://www.datadoghq.com/blog/workload-security-evaluator/
  tag: Blog
  text: Ejecute pruebas de detección de Atomic Red Team en entornos de contenedores
    con Workload Security Evaluator de Datadog
- link: https://www.datadoghq.com/blog/security-labs-ruleset-launch/
  tag: Blog
  text: Solucione riesgos comunes de seguridad en la nube con el conjunto de reglas
    de Datadog Security Labs
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: Blog
  text: Mejores prácticas para la seguridad de aplicaciones en entornos nativos de
    la nube
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Construya una cobertura de seguridad suficiente para su entorno en la nube
- link: https://www.datadoghq.com/blog/cloud-security-study-learnings-2024/
  tag: Blog
  text: Aprendizajes clave del estudio State of Cloud Security 2024
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: Blog
  text: Cómo prioriza los riesgos de seguridad Datadog Security Inbox
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: Blog
  text: Cómo usamos Datadog para la detección como código
- link: https://www.datadoghq.com/blog/shared-responsibility-model/
  tag: Blog
  text: 'Simplificación del modelo de responsabilidad compartida: cómo cumplir con
    sus obligaciones de seguridad en la nube'
- link: https://www.datadoghq.com/blog/detect-bedrock-misconfigurations-cloud-security
  tag: Blog
  text: Detecte configuraciones incorrectas de Amazon Bedrock con Datadog Cloud Security
- link: https://www.datadoghq.com/blog/security-graph-attack-paths
  tag: Blog
  text: Rastree las rutas de exposición entre recursos con Datadog Cloud Security
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: Blog
  text: Escale el cumplimiento en marcos globales con Datadog Cloud Security
- link: https://www.datadoghq.com/blog/ec2-ami-risks
  tag: Blog
  text: 'Seguridad de AWS AMI: cómo las AMI mal configuradas y públicas expanden su
    superficie de ataque en la nube'
- link: https://www.datadoghq.com/blog/cloud-security-oci
  tag: Blog
  text: Proteja sus recursos de OCI con Datadog Cloud Security
title: Cloud Security
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Aprenda cómo Datadog Cloud SIEM y Cloud Security mejoran la detección e investigación de amenazas de su organización para entornos dinámicos a escala de nube. 
{{< /learning-center-callout >}}

Datadog Cloud Security ofrece visibilidad profunda, auditorías de configuración continuas, evaluaciones de riesgo de identidad, detección de vulnerabilidades y detección de amenazas en tiempo real en toda su infraestructura en la nube, todo en una plataforma unificada para una colaboración fluida y una remediación más rápida.

Los equipos de Security y DevOps pueden actuar sobre el contexto compartido de los datos de observabilidad y seguridad para priorizar y remediar problemas rápidamente.

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El escaneo Agentless no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Cloud Security aprovecha tanto el Datadog Agent como Agentless. Incluye una variedad de funciones que puede habilitar para administrar diferentes facetas de la seguridad de su organización:

- [{{< ui >}}Misconfigurations{{< /ui >}}][2]: Realiza un seguimiento de la higiene de seguridad y la postura de cumplimiento de su entorno de producción, automatiza la recopilación de evidencia de auditoría y le permite remediar configuraciones incorrectas que dejan a su organización vulnerable a ataques.
- [{{< ui >}}Identity Risks{{< /ui >}}][8]: Proporciona visibilidad detallada de los riesgos de AWS IAM, Azure y GCP de su organización, y le permite detectar y resolver riesgos de identidad de forma continua.
- [{{< ui >}}Vulnerabilities{{< /ui >}}][9]: Detecte, priorice y remedie de forma continua las vulnerabilidades explotables en sus imágenes de contenedor, imágenes de servidor y servidores que se ejecutan en su infraestructura.

Cloud Security también incluye acceso a las funciones de Datadog Security, que incluyen:
- [Detection Rules][18]
- [Notifications][6]
- [Automation Pipelines][19]
- [Security Inbox][14]
- [Audit Trail][20]
- [Security Research Feed][16]

{{< img src="security/csm/csm_overview_5.png" alt="Resumen de Cloud Security en Datadog" width="100%">}}

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Realice un seguimiento del estado de su organización {#track-your-organizations-health}

### Administre los dashboards de la página de inicio {#manage-homepage-dashboards}

Puede personalizar los dashboards a los que puede acceder directamente desde la página de inicio de Cloud Security, lo que incluye configurar un dashboard como su opción predeterminada para visualizar la página de inicio. Utilice los dashboards para priorizar los esfuerzos de remediación, programar informes, colocar datos de seguridad junto a datos de observabilidad y costos, e integrar aplicaciones y flujos de trabajo que puede iniciar directamente desde su vista de informes. 

En la [página de inicio de Cloud Security][4], en la sección {{< ui >}}Dashboards{{< /ui >}}, puede ir directamente a los dashboards de riesgos de identidad, configuraciones incorrectas o vulnerabilidades. También puede agregar dashboards existentes o crear uno para mantenerlo en la barra lateral de su página principal de Cloud Security para un acceso conveniente.

Además, puede hacer clic en el icono {{< ui >}}More Options{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="height:1em" >}} para administrar sus dashboards anclados, incluyendo establecer uno como su vista predeterminada en la página de inicio de Cloud Security. Haga clic en {{< ui >}}Cloud Security{{< /ui >}} en la barra de navegación de Datadog o en {{< ui >}}Summary{{< /ui >}} en la barra de navegación de Cloud Security para ir directamente a su dashboard anclado.

Para obtener más información, consulte [Dashboards][23].

### Rastree su puntuación de postura de seguridad {#track-your-security-posture-score}

Disponible para [Cloud Security Misconfigurations][2], la [puntuación de postura de seguridad][5] le ayuda a rastrear la salud general de su organización. La puntuación representa el porcentaje de su entorno que satisface todas sus reglas de cumplimiento de infraestructura y nube listas para usar activas.

Mejore la puntuación de su organización remediando las configuraciones incorrectas, ya sea resolviendo el problema subyacente o silenciando la configuración incorrecta.

{{< img src="security/csm/health_scores.png" alt="La puntuación de postura en la página de descripción general de Cloud Security rastrea la salud general de su organización" width="100%">}}

## Explore y remedie problemas {#explore-and-remediate-issues}

Para obtener una descripción general de sus hallazgos de seguridad, ordenados por importancia, en Cloud Security, Code Security, App and API Protection y Workload Protection, utilice [Security Inbox][14].

Para obtener más detalles, utilice [Findings][7] para revisar y remediar los hallazgos de seguridad de su organización relacionados con configuraciones incorrectas, vulnerabilidades y riesgos de identidad. Visualice la información detallada sobre un hallazgo, incluidas las pautas y los pasos de remediación. [Send real-time notifications][6] cuando se detecte una amenaza en su entorno y utilice etiquetas para identificar al propietario de un recurso afectado.

{{< img src="security/csm/findings_page_2.png" alt="Página de hallazgos de Cloud Security" width="100%">}}

## Investigue recursos {#investigate-resources}

- Utilice el [Security Graph][17] para modelar su entorno de nube como un gráfico de relaciones, de modo que pueda visualizar y consultar las conexiones entre sus recursos en la nube. Puede escribir consultas para buscar relaciones específicas entre recursos, como instancias de EC2 accesibles públicamente que pueden acceder a buckets de S3 que contienen datos confidenciales, para que pueda mitigar de forma proactiva esos riesgos de infraestructura.
  {{< img src="security/csm/security_graph.png" alt="Security Graph que muestra un ejemplo de instancia de EC2" width="100%">}}
- Utilice el [Resource Catalog][12] para visualizar las configuraciones incorrectas y amenazas específicas que se han reportado en los hosts y recursos de sus entornos. Para obtener más información, consulte la documentación del [Resource Catalog][13].
  {{< site-region region="gov,gov2" >}}
  <div class="alert alert-danger">Resource Catalog no es compatible con el <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
  {{< /site-region >}}
  {{< img src="infrastructure/resource_catalog/resource_catalog_infra_3.png" alt="Vista de mapa de Resource Catalog que muestra los servidores y recursos en la nube agrupados por categoría y configuraciones incorrectas." style="width:100%;" >}}
- Utilice el [Cloudcraft Security Map][21] para visualizar sus recursos y cualquier configuraciones incorrectas, vulnerabilidades, riesgos de identidad o dato confidencial asociado a ellos. Para obtener más información sobre estas capas de superposición, consulte la documentación de la [Cloudcraft overlay][22].

## Suscríbase a los informes de resumen semanal {#subscribe-to-weekly-digest-reports}

Reciba un resumen semanal de la actividad de Cloud Security de la última semana, incluidos los nuevos problemas de seguridad importantes descubiertos en los últimos siete días. Las suscripciones al informe de resumen semanal se gestionan por usuario. Para [suscribirse al informe de resumen semanal][11], debe tener el permiso `security_monitoring_signals_read`.

## Conozca las amenazas y vulnerabilidades emergentes {#learn-about-emerging-threats-and-vulnerabilities}

Utilice el [Security Research Feed][15] para mantenerse al día con los últimos desarrollos de seguridad, con contenido gestionado por los equipos de Investigación de seguridad e Ingeniería de detección de Datadog. Para obtener más información, consulte la documentación del [Security Research Feed][16].

## Próximos pasos {#next-steps}

Para comenzar con Cloud Security, navegue a la página [{{< ui >}}Cloud Security Setup{{< /ui >}}][3] en Datadog, que contiene pasos detallados sobre cómo configurar Cloud Security. Para obtener más información, consulte [Setting Up Cloud Security][10].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/workload_protection/
[2]: /es/security/cloud_security_management/misconfigurations/
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/security/csm
[5]: /es/glossary/#posture-score
[6]: /es/security/notifications/
[7]: https://app.datadoghq.com/security/compliance
[8]: /es/security/cloud_security_management/identity_risks/
[9]: /es/security/cloud_security_management/vulnerabilities/
[10]: /es/security/cloud_security_management/setup/
[11]: https://app.datadoghq.com/security/configuration/reports
[12]: https://app.datadoghq.com/infrastructure/catalog
[13]: /es/infrastructure/resource_catalog
[14]: /es/security/security_inbox
[15]: https://app.datadoghq.com/security/feed
[16]: /es/security/research_feed
[17]: /es/security/cloud_security_management/security_graph
[18]: /es/security/detection_rules/
[19]: /es/security/automation_pipelines/
[20]: /es/security/audit_trail/
[21]: https://app.datadoghq.com/security/map
[22]: /es/datadog_cloudcraft/overlays/#security
[23]: /es/dashboards/