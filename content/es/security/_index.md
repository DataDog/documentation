---
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
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: Notas de la versión
  text: Consulta las últimas versiones de Datadog Security. (Es necesario iniciar
    sesión en la aplicación).
- link: https://www.datadoghq.com/guided-tour/security/
  tag: Visita guiada
  text: Ver una visita guiada del producto
- link: /getting_started/cloud_siem
  tag: Documentación
  text: Comenzar a detectar amenazas con Cloud SIEM
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentación
  text: Empezar a rastrear errores de configuración con Cloud Security Misconfigurations
- link: /security/workload_protection/
  tag: Documentación
  text: Descubrir amenazas a nivel de kernel con Workload Protection
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Lee sobre temas relacionados con la seguridad en el blog de los Security Labs
    de Datadog.
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participar en una sesión interactiva para mejorar tu seguridad y la detección
    de amenazas
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: Blog
  text: Mejorar la detección de amenazas en AWS con Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: Blog
  text: Prácticas recomendadas para proteger las aplicaciones Kubernetes
- link: https://www.datadoghq.com/blog/securing-cloud-native-infrastructure-network-perimeter/
  tag: Blog
  text: Prácticas recomendadas para la seguridad perimetral de la red en entornos
    nativos en la nube
- link: https://www.datadoghq.com/blog/securing-data-in-cloud-native-infrastructure/
  tag: Blog
  text: Prácticas recomendadas para la seguridad de los datos en infraestructuras
    nativas en la nube
- link: https://www.datadoghq.com/blog/chaos-engineering-for-security/
  tag: Blog
  text: Experimentos de ingeniería del caos centrados en la seguridad para la nube
- link: https://www.datadoghq.com/blog/datadogs-approach-devsecops/
  tag: Blog
  text: Enfoque de Datadog sobre el desarrollo, la seguridad y las operaciones (DevSecOps)
- link: https://www.datadoghq.com/blog/investigate-denial-of-service-attacks/
  tag: Blog
  text: Investigación de un ataque de denegación de servicio complejo
- link: https://www.datadoghq.com/blog/optimize-and-secure-azure-functions/
  tag: Blog
  text: Consejos para optimizar y proteger funciones de Azure
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: Blog
  text: Cómo utilizamos Datadog para la detección como código
- link: https://www.datadoghq.com/blog/lateral-movement-entra-id-azure/
  tag: Blog
  text: Detectar el movimiento lateral en entornos Azure híbridos
- link: https://www.datadoghq.com/blog/secrets-management/
  tag: Blog
  text: Identificar los secretos que hacen que tu entorno de nube sea más vulnerable
    a un ataque
- link: https://www.datadoghq.com/blog/cloud-security-roundup-infrastructure-identity/
  tag: Blog
  text: 'Resumen de guías e investigación sobre seguridad en la nube: Infraestructura
    y acceso'
- link: https://www.datadoghq.com/blog/cloud-security-roundup-devsecops-threat-detection-ai/
  tag: Blog
  text: 'Resumen de guías e investigación sobre seguridad en la nube: DevSecOps, detección
    de amenazas e IA'
- link: https://www.datadoghq.com/blog/key-security-metrics/
  tag: Blog
  text: Métricas clave para medir la seguridad de tu organización
- link: https://www.datadoghq.com/blog/datadogs-approach-sre-security/
  tag: Blog
  text: 'Seguridad y SRE: Enfoque combinado de Datadog para afrontar los retos de
    seguridad y fiabilidad'
title: Datadog Security
---

## Información general

Aporta velocidad y escala tus operaciones de seguridad de producción. Datadog Security ofrece una detección de amenazas en tiempo real y auditorías de configuración continuas en aplicaciones, hosts, contenedores e infraestructura en la nube. Junto con la mayor plataforma de observabilidad de Datadog, Datadog Security aporta una integración sin precedentes entre la seguridad y las operaciones, alineada con los objetivos compartidos de tu organización.

Datadog Security incluye: 
- [Cloud SIEM](#cloud-siem)
- [Code Security](#code-security)
- [Cloud Security](#cloud-security)
- [App and API Protection](#app-and-api-protection)
- [Workload Protection](#workload-protection)
- [Sensitive Data Scanner](#sensitive-data-scanner)

Para obtener más información, consulta la [visita guiada del producto de 30 segundos][14].

## Cloud SIEM

[Cloud SIEM][4] (Security Information and Event Management) detecta amenazas en tiempo real para tu aplicación y tu infraestructura, como un ataque dirigido, una IP que se comunica con tus sistemas y que coincide con una lista de información sobre amenazas o una configuración insegura. Cloud SIEM utiliza la tecnología de [Datadog Log Management][5]. Con estas áreas combinadas, puedes [automatizar la corrección de las amenazas detectadas por Datadog Cloud SIEM][6] para acelerar tu flujo de trabajo de respuesta a amenazas. Para obtener más información, consulta la [visita guiada](https://www.datadoghq.com/guided-tour/security/cloud-siem/).

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="Página principal de Cloud SIEM que muestra la sección de información general de seguridad con widgets para señales importantes, actores sospechosos, recursos afectados, información sobre amenazas y tendencias de señales" width="100%">}}

## Code Security

[Code Security][20] analiza tu código de origen y tus bibliotecas de código abierto utilizados en tus aplicaciones, tanto en tus repositorios como en tus servicios en ejecución, proporcionando visibilidad de extremo a extremo desde el desarrollo hasta la producción. Abarca las siguientes capacidades:

- [Static Code Analysis (SAST)][27] para identificar problemas de seguridad y calidad en el código de origen
- [Software Composition Analysis (SCA)][28] para identificar dependencias de código abierto tanto en tus repositorios como en tus servicios
- [Runtime Code Analysis (IAST)][29] para identificar vulnerabilidades en el código de origen dentro de tus servicios
- [Secret Scanning][30] para identificar y validar secretos filtrados (en Vista previa)

Code Security ayuda a los equipos a implementar DevSecOps en toda la organización:
- **Desarrolladores:** detección temprana de vulnerabilidades, mejoras en la calidad del código, desarrollo más rápido, ya que los desarrolladores pasan menos tiempo depurando y parcheando.
- **Administradores de seguridad:** postura de seguridad mejorada, gestión de parches mejorada en respuesta a alertas tempranas de vulnerabilidad y monitorización del cumplimiento.
- **Ingenieros de fiabilidad del sitio (SRE):** checks de seguridad automatizados en todo el flujo de trabajo de CI/CD, cumplimiento de la seguridad y resiliencia del sistema. SAST reduce la sobrecarga manual de los SRE y garantiza que cada versión se someta a tests exhaustivos para detectar vulnerabilidades.

## Cloud Security

[Cloud Security][10] ofrece una detección de amenazas en tiempo real y auditorías continuas de configuración en toda tu infraestructura de nube, todo ello en una vista unificada para una colaboración ininterrumpida y una corrección más rápida. Gracias a los datos de observabilidad, los equipos de seguridad pueden determinar el impacto de una amenaza rastreando el flujo completo del ataque e identificar al propietario del recurso en el que se activó una vulnerabilidad.

Cloud Security incluye [Workload Protection][12], [Misconfigurations][11], [Identity Risks][15] y [Vulnerabilities][16]. Para obtener más información, consulta la [visita guiada][13].

{{< img src="security/csm/csm_overview_3.png" alt="El buzón de seguridad en la información general de Cloud Security muestra una lista de los problemas de seguridad organizada por prioridades" width="100%">}}

Para empezar a utilizar Datadog Security, ve a la página [**Seguridad** > **Configuración**][9] en Datadog, que contiene información detallada para usuarios individuales o configuraciones múltiples, o, para obtener más información sobre cada área de la plataforma, consulta las siguientes secciones que te guían para empezar a utilizar las funciones.

##  App and API Protection

[App and API Protection (AAP)][1] de Datadog proporciona una observabilidad de los ataques a nivel de aplicación, cuyo objetivo es explotar vulnerabilidades a nivel de código, como Server-Side-Request-Forgery (SSRF), Inyección SQL, Log4Shell y Reflected Cross-Site-Scripting (XSS). AAP aprovecha [Datadog APM][2], el [Datadog Agent][3] y las reglas de detección en la aplicación para detectar amenazas en el entorno de tu aplicación. Para obtener más información, consulta la [visita guiada] del producto (https://www.datadoghq.com/guided-tour/security/application-security-management/).

Además de la detección de amenazas, Datadog proporciona la detección de vulnerabilidades de código y biblioteca de extremo a extremo, desde el desarrollo hasta la producción con [Code Security][20], que incluye las siguientes funciones:
- [Static Code Analysis (SAST)][21] para identificar problemas de seguridad y calidad en el código de origen
- [Software Composition Analysis (SCA)][22] para identificar dependencias de código abierto tanto en tus repositorios como en tus servicios
- [Runtime Code Analysis (IAST)][23] para detectar vulnerabilidades a nivel de código en tus servicios

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Panel de señales de seguridad en Datadog, que muestra flujos de ataque y gráficas de llamas" width="75%">}}

## Workload Protection

[Workload Protection][26] monitoriza la actividad de archivos, redes y procesos en todo tu entorno para detectar amenazas a tu infraestructura en tiempo real. Como parte de la plataforma Datadog, puedes combinar la detección de amenazas en tiempo real de la Protección de cargas de trabajo con métricas, logs, trazas (traces) y otros datos de telemetría para ver el contexto completo de un posible ataque a tus cargas de trabajo.

- Bloquea de forma proactiva las amenazas con [Active Protection][31].
- Gestiona [reglas de detección][32] predefinidas y personalizadas.
- Configura [notificaciones][33] en tiempo real.
- Investiga y corrige [señales de seguridad][34].

## Sensitive Data Scanner

[Sensitive Data Scanner][24] puede ayudar a prevenir fugas de datos confidenciales y limitar los riesgos de incumplimiento detectando, clasificando y, opcionalmente, redactando los datos confidenciales. Puede analizar en busca de datos confidenciales en tus datos de telemetría, como logs de aplicación, tramos (spans) APM, eventos RUM y eventos de Event Management. También puede analizar en busca de información confidencial en tus recursos de almacenamiento en la nube.

Después de configurar [Sensitive Data Scanner][25],, utiliza la página de resumen para ver detalles de los problemas identificados en datos confidenciales, para que puedas clasificarlos, investigarlos y solucionarlos.

{{< img src="sensitive_data_scanner/sds_summary_20250203.png" alt="Página de resumen que muestra información general de los problemas de confidencialidad desglosados por prioridad" style="width:100%;" >}}

## Referencias adicionales

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
[31]: /es/security/workload_protection/guide/active-protection
[32]: /es/security/workload_protection/workload_security_rules
[33]: /es/security/notifications/
[34]: /es/security/workload_protection/security_signals