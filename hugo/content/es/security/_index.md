---
algolia:
  tags:
  - security
  - datadog security
  - cloud siem
  - cloud security
  - application security
  - threat detection
aliases:
- /es/compliance_monitoring
- /es/cloud_siem
- /es/security_platform
- /es/security/security_monitoring
- /es/security_monitoring/explorer/
- /es/cloud_siem/explorer/
- /es/security_platform/explorer
- /es/security/explorer
- /es/security_platform/security_signal_management
- /es/security/security_signal_management
cascade:
  algolia:
    rank: 70
further_reading:
- link: /getting_started/cloud_siem
  tag: Documentación
  text: Comience a detectar amenazas con Cloud SIEM
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Comience a rastrear las configuraciones incorrectas con Cloud Security Misconfigurations
- link: /security/workload_protection/
  tag: Documentación
  text: Descubra amenazas a nivel de kernel con Workload Protection
- link: https://www.datadoghq.com/guided-tour/security/
  tag: Visita guiada
  text: Vea una visita guiada del producto
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para elevar su seguridad y detección de amenazas
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Lea sobre temas relacionados con la seguridad en el blog de Security Labs
    de Datadog
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: Blog
  text: Mejore la detección de amenazas en AWS con Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: Blog
  text: Mejores prácticas para asegurar aplicaciones de Kubernetes
- link: https://www.datadoghq.com/blog/securing-cloud-native-infrastructure-network-perimeter/
  tag: Blog
  text: Mejores prácticas para la seguridad del perímetro de red en entornos nativos
    de la nube
- link: https://www.datadoghq.com/blog/securing-data-in-cloud-native-infrastructure/
  tag: Blog
  text: Mejores prácticas para la seguridad de datos en infraestructura nativa de
    la nube
- link: https://www.datadoghq.com/blog/chaos-engineering-for-security/
  tag: Blog
  text: Experimentos de ingeniería del caos enfocados en la seguridad para la nube
- link: https://www.datadoghq.com/blog/datadogs-approach-devsecops/
  tag: Blog
  text: El enfoque de Datadog para DevSecOps
- link: https://www.datadoghq.com/blog/investigate-denial-of-service-attacks/
  tag: Blog
  text: Investigación de un ataque complejo de denegación de servicio
- link: https://www.datadoghq.com/blog/optimize-and-secure-azure-functions/
  tag: Blog
  text: Consejos para optimizar y proteger Azure Functions
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: Blog
  text: Cómo usamos Datadog para la detección como código
- link: https://www.datadoghq.com/blog/lateral-movement-entra-id-azure/
  tag: Blog
  text: Detecte el movimiento lateral en entornos híbridos de Azure
- link: https://www.datadoghq.com/blog/secrets-management/
  tag: Blog
  text: Identifique los secretos que hacen que su entorno en la nube sea más vulnerable
    a un ataque
- link: https://www.datadoghq.com/blog/cloud-security-roundup-infrastructure-identity/
  tag: Blog
  text: 'Resumen de investigación y guías de Cloud Security: Infraestructura y acceso'
- link: https://www.datadoghq.com/blog/cloud-security-roundup-devsecops-threat-detection-ai/
  tag: Blog
  text: 'Resumen de investigación y guías de Cloud Security: DevSecOps, detección
    de amenazas e IA'
- link: https://www.datadoghq.com/blog/key-security-metrics/
  tag: Blog
  text: Métricas clave para medir la postura de seguridad de su organización
- link: https://www.datadoghq.com/blog/datadogs-approach-sre-security/
  tag: Blog
  text: 'Seguridad y SRE: Cómo el enfoque combinado de Datadog busca abordar los desafíos
    de seguridad y confiabilidad'
- link: https://www.datadoghq.com/blog/cloud-security-roundup-2025
  tag: Blog
  text: 'Resumen de seguridad en la nube de 2025: Cómo los atacantes abusaron de identidades,
    cadenas de suministro e IA'
- link: https://www.datadoghq.com/blog/nodejs-vulnerability-apm
  tag: Blog
  text: Mitigación para la vulnerabilidad de denegación de servicio en Node.js que
    afecta a Datadog APM
- link: https://www.datadoghq.com/blog/devsecops-2026-study-learnings
  tag: Blog
  text: Aprendizajes clave del estudio State of DevSecOps 2026
- link: https://www.datadoghq.com/blog/datadog-observability-data-and-security
  tag: Blog
  text: Cómo utiliza Datadog los datos de observabilidad para proteger su plataforma
- link: https://www.datadoghq.com/blog/ai-powered-threat-analysis
  tag: Blog
  text: 'IA en investigaciones de seguridad en la nube: el papel de UEBA y telemetría
    mejorada'
- link: https://www.datadoghq.com/blog/ci-cd-threat-matrix/
  tag: Blog
  text: 'Seguridad de CI/CD: modelado de amenazas mediante una matriz de amenazas
    al estilo MITRE'
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: Blog
  text: 'Seguridad en CI/CD: Cómo proteger su ecosistema de GitHub'
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: Notas de la versión
  text: ¡Eche un vistazo a los últimos lanzamientos de Datadog Security! (Se requiere
    inicio de sesión en la aplicación).
title: Datadog Security
---
## Descripción general {#overview}

Aporte velocidad y escala a sus operaciones de seguridad de producción. Datadog Security ofrece detección de amenazas en tiempo real y auditorías de configuración continuas en aplicaciones, hosts, contenedores e infraestructura en la nube. Junto con la plataforma de observabilidad más amplia de Datadog, Datadog Security brinda una integración sin precedentes entre la seguridad y las operaciones, alineada con los objetivos compartidos de su organización.

Datadog Security incluye: 
- [Cloud SIEM](#cloud-siem)
- [Code Security](#code-security)
- [Cloud Security](#cloud-security)
- [App and API Protection](#app-and-api-protection)
- [AI Guard](#ai-guard)
- [Workload Protection](#workload-protection)
- [Sensitive Data Scanner](#sensitive-data-scanner)
 
Para obtener más información, eche un vistazo a la visita guiada del producto de 30 segundos [14].

## Cloud SIEM {#cloud-siem}

[Cloud SIEM][4] (Security Information and Event Management) detecta amenazas en tiempo real para su aplicación e infraestructura, como un ataque dirigido, una IP que se comunica con sus sistemas y coincide con una lista, o una configuración insegura. Cloud SIEM funciona con [Datadog Log Management][5]. Al combinar estas áreas, puede [automatizar la remediación de amenazas detectadas por Datadog Cloud SIEM][6] para acelerar su flujo de trabajo de respuesta a amenazas. Consulte la [visita guiada](https://www.datadoghq.com/guided-tour/security/cloud-siem/) dedicada para ver más.

{{< img src="security/security_monitoring/cloud_siem_overview_2025.png" alt="La página de inicio de Cloud SIEM que muestra la sección Security Overview con widgets para señales importantes, actores sospechosos, recursos afectados, threat intel y tendencias de señales." width="100%">}}

## Code Security {#code-security}

[Code Security][20] escanea su código propio y las bibliotecas de código abierto utilizadas en sus aplicaciones, tanto en sus repositorios como en los servicios en ejecución, proporcionando visibilidad de extremo a extremo desde el desarrollo hasta la producción. Abarca las siguientes capacidades:

- [Static Code Analysis (SAST)][27] para identificar problemas de seguridad y calidad en su código propio
- [Software Composition Analysis (SCA)][28] para identificar dependencias de código abierto tanto en sus repositorios como en sus servicios
- [Runtime Code Analysis (IAST)][29] para identificar vulnerabilidades en el código propio dentro de sus servicios
- [Secret Scanning][30] para identificar y validar secretos filtrados (en vista previa)

Con integraciones de IDE, comentarios en solicitudes de extracción y puertas de CI/CD, Code Security ayuda a los equipos a implementar DevSecOps en toda la organización:
- **Desarrolladores:** detección temprana de vulnerabilidades, mejoras en la calidad del código, desarrollo más rápido ya que los desarrolladores pasan menos tiempo depurando y aplicando parches.
- **Administradores de seguridad:** postura de seguridad mejorada, gestión de parches optimizada en respuesta a alertas tempranas de vulnerabilidad y monitoreo de cumplimiento.
- **Ingenieros de confiabilidad del sitio (SRE):** verificaciones de seguridad automatizadas en todo el flujo de trabajo de CI/CD, cumplimiento de seguridad y resiliencia del sistema. SAST reduce la carga manual para los SRE y garantiza que cada versión se pruebe exhaustivamente en busca de vulnerabilidades.  

{{< img src="code_security/gitlab_integration_light.png" alt="Un hallazgo de SAST dentro de un repositorio de GitLab" width="100%">}}

## Cloud Security {#cloud-security}

[Cloud Security][10] ofrece detección de amenazas en tiempo real y auditorías de configuración continuas en toda su infraestructura en la nube, todo en una vista unificada para una colaboración fluida y una remediación más rápida. Impulsados por datos de observabilidad, los equipos de seguridad pueden determinar el impacto de una amenaza rastreando el flujo del ataque e identificar al propietario del recurso donde se activó una vulnerabilidad.

Cloud Security incluye [Workload Protection][12], [Misconfigurations][11], [Identity Risks][15] y [Vulnerabilities][16]. Para obtener más información, consulte la visita guiada dedicada [13].

{{< img src="security/csm/csm_overview_3.png" alt="El Security Inbox en la descripción general de Cloud Security muestra una lista de problemas de seguridad priorizados." width="100%">}}

Para comenzar con Datadog Security, navegue a la página [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Setup{{< /ui >}}][9] en Datadog, que tiene información detallada para una o varias configuraciones, o siga las secciones de introducción a continuación para obtener más información sobre cada área de la plataforma.

##  App and API Protection {#app-and-api-protection}

Datadog [App and API Protection (AAP)][1] proporciona observabilidad sobre ataques a nivel de aplicación que tienen como objetivo explotar vulnerabilidades a nivel de código, como Server-Side-Request-Forgery (SSRF), inyección SQL, Log4Shell y Reflected Cross-Site-Scripting (XSS). AAP aprovecha [Datadog APM][2], el [Datadog Agent][3] y reglas de detección en la aplicación para detectar amenazas en su entorno de aplicaciones. Consulte la [visita guiada](https://www.datadoghq.com/guided-tour/security/application-security-management/) del producto para ver más.

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Un panel de señales de seguridad en Datadog, que muestra flujos de ataque y gráficos de llama." width="75%">}}

## AI Guard {#ai-guard}

[AI Guard][35] inspecciona, bloquea y gobierna el comportamiento de la IA en tiempo real. Se integra en línea con su aplicación o agente de IA para proteger contra la inyección de prompt, el jailbreaking y los ataques de exfiltración de datos confidenciales, utilizando Protección de Prompt, Protección de Herramientas y Protección de Datos Confidenciales. Estas protecciones funcionan para cualquier modelo de IA de destino, incluidos OpenAI, Anthropic, Bedrock, VertexAI y Azure.

{{< img src="security/ai_guard/ai_guard_detection_rules_1.png" alt="Explorador de reglas de detección de AI Guard" width="100%">}}

## Workload Protection {#workload-protection}

[Workload Protection][26] monitorea la actividad de archivos, red y procesos en todo su entorno para detectar amenazas en tiempo real a su infraestructura. Como parte de la plataforma Datadog, puede combinar la detección de amenazas en tiempo real de Workload Protection con métricas, logs, trazas y otra telemetría para ver el contexto completo que rodea a un posible ataque en sus cargas de trabajo.

- Bloquee amenazas de forma proactiva con [Automated response][31].
- Administre [detection rules] listas para usar y personalizadas [32].
- Configure [notifications] en tiempo real [33].
- Investigue y remedie [security signals][34].

## Sensitive Data Scanner {#sensitive-data-scanner}

[Sensitive Data Scanner][24] puede ayudar a prevenir fugas de datos sensibles y limitar los riesgos de incumplimiento al descubrir, clasificar y, opcionalmente, redactar datos sensibles. Puede buscar datos confidenciales en sus datos de telemetría, como registros de aplicaciones, spans de APM, eventos de RUM y eventos de Event Management. También puede buscar información confidencial dentro de sus recursos de almacenamiento en la nube. 

Después de [configurar Sensitive Data Scanner][25], utilice la página {{< ui >}}Findings{{< /ui >}} para ver los detalles de los hallazgos de datos sensibles que se han identificado, de modo que pueda clasificar, investigar y remediar los hallazgos.

{{< img src="sensitive_data_scanner/sds_summary_20250203.png" alt="La página de resumen que muestra una descripción general de los hallazgos sensibles desglosados por prioridad" style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/
[2]: /es/tracing/
[3]: /es/agent/
[4]: /es/security/cloud_siem
[5]: /es/logs/
[6]: https://www.datadoghq.com/blog/automated-vulnerability-remediation-datadog/
[9]: https://app.datadoghq.com/security/configuration
[10]: /es/security/cloud_security_management/
[11]: /es/security/cloud_security_management/misconfigurations/
[12]: /es/security/workload_protection/
[13]: https://www.datadoghq.com/guided-tour/security/cloud-security-management/
[14]: https://www.datadoghq.com/guided-tour/security/
[15]: /es/security/cloud_security_management/identity_risks/
[16]: /es/security/cloud_security_management/vulnerabilities/
[17]: /es/security/application_security/troubleshooting/#disabling-threat-management-and-protection
[18]: /es/security/application_security/troubleshooting/#disabling-software-composition-analysis
[19]: /es/security/application_security/troubleshooting/#disabling-code-security
[20]: /es/security/code_security/
[21]: /es/security/code_security/static_analysis/
[22]: /es/security/code_security/software_composition_analysis/
[23]: /es/security/code_security/iast/
[24]: /es/sensitive_data_scanner/
[25]: /es/sensitive_data_scanner/setup/
[26]: /es/security/workload_protection/
[27]: /es/security/code_security/static_analysis/
[28]: /es/security/code_security/software_composition_analysis/
[29]: /es/security/code_security/iast/
[30]: /es/security/code_security/secret_scanning/
[31]: /es/security/workload_protection/respond_and_report/
[32]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[33]: /es/security/notifications/
[34]: /es/security/workload_protection/security_signals
[35]: /es/security/ai_guard/