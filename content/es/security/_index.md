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
  text: Comenzar a rastrear los errores de configuración con CSM Misconfigurations
- link: /security/threats/setup
  tag: Documentación
  text: Descubrir las amenazas a nivel del kernel con CSM Threats
- link: https://securitylabs.datadoghq.com/
  tag: Laboratorios de seguridad
  text: Lee sobre temas relacionados con la seguridad en el blog de los laboratorios
    de Datadog Security.
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
title: Datadog Security
---

## Información general

Aporta velocidad y escalado a tus operaciones de seguridad de producción. Datadog Security ofrece una detección de amenazas en tiempo real y auditorías de configuración continuas en aplicaciones, hosts, contenedores e infraestructuras en la nube. Junto con la mayor plataforma de observabilidad de Datadog, Datadog Security aporta una integración sin precedentes entre la seguridad y las operaciones, en consonancia con los objetivos compartidos de tu organización.

La seguridad de Datadog incluye [Application Security](#application-security-management), [Cloud SIEM](#cloud-siem) y [Cloud Security Management](#cloud-security-management). Para obtener más información, consulta la [Visita guiada de producto de 30 segundos][14].

## Seguridad de las aplicaciones

Datadog [Application Security][1] proporciona capacidad de observación de ataques a nivel de aplicación, cuyo objetivo es explotar vulnerabilidades a nivel de código, como la Falsificación de solicitudes del lado del servidor (SSRF), la Inyección SQL, Log4Shell y el Cross-Site-Scripting (XSS) reflejado. ASM aprovecha [Datadog APM][2], el [Datadog Agent][3] y las reglas de detección en la aplicación para detectar amenazas en tu entorno de aplicación. Para ver más, consulta la [Visita Guiada] del producto (https://www.datadoghq.com/guided-tour/security/application-security-management/).

{{< img src="/security/application_security/app-sec-landing-page.png" alt="Panel de señales de seguridad en Datadog, que muestra flujos (flows) de ataque y gráficos de llamas" width="75%">}}

## Cloud SIEM

[Cloud SIEM][4] (Seguridad de la información y Gestión de eventos) detecta amenazas en tiempo real para tu aplicación y tu infraestructura, como un ataque dirigido, una IP que se comunica con tus sistemas y que coincide con una lista de información sobre amenazas o una configuración insegura. Cloud SIEM utiliza la tecnología de [Datadog Log Management][5]. Con estas áreas combinadas, puedes [automatizar la corrección de las amenazas detectadas por Datadog Cloud SIEM][6] para acelerar tu flujo de trabajo de respuesta a amenazas. Para obtener más información, consulta la [Visita guiada](https://www.datadoghq.com/guided-tour/security/cloud-siem/).

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="Página principal de Cloud SIEM que muestra la sección de información general de seguridad con widgets para señales importantes, actores sospechosos, recursos afectados, información sobre amenazas y tendencias de señales" width="100%">}}

## Cloud Security Management

[Cloud Security Management (CSM)][10] ofrece una detección de amenazas en tiempo real y auditorías continuas de configuración en toda tu infraestructura de nube, todo ello en una vista unificada para una colaboración ininterrumpida y una corrección más rápida. Gracias a los datos de observabilidad, los equipos de seguridad pueden determinar el impacto de una amenaza rastreando el flujo completo del ataque e identificar al propietario del recurso en el que se ha activado una vulnerabilidad.

CSM incluye [Amenazas][12], [Configuraciones incorrectas][11], [Riesgos de identidad][15] y [Vulnerabilidades][16]. Para obtener más información, consulta la [Visita guiada][13].

{{< img src="security/csm/csm_overview_2.png" alt="Buzón de seguridad en la información general de Cloud Security Management, que muestra una lista de los problemas de seguridad organizada por prioridades" width="100%">}}

Para empezar a utilizar Datadog Security, ve a la página [**Seguridad** > **Configuración**][9] en Datadog, que contiene información detallada para usuarios individuales o configuraciones múltiples, o, para obtener más información sobre cada área de la plataforma, consulta las siguientes secciones que te guían para empezar a utilizar las funciones.

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
[12]: /es/security/threats/
[13]: https://www.datadoghq.com/guided-tour/security/cloud-security-management/
[14]: https://www.datadoghq.com/guided-tour/security/
[15]: /es/security/cloud_security_management/identity_risks/
[16]: /es/security/cloud_security_management/vulnerabilities/