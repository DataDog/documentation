---
aliases:
- /es/code_analysis/
disable_toc: false
further_reading:
- link: https://learn.datadoghq.com/courses/code-security-SAST
  tag: Centro de aprendizaje
  text: Escriba código seguro con Datadog Code Security
- link: https://www.datadoghq.com/blog/secure-your-github-ecosystem/
  tag: Blog
  text: 'Seguridad en CI/CD: Cómo proteger su ecosistema de GitHub'
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Presentamos Bits Code para Code Security
- link: https://www.datadoghq.com/blog/remediate-faster-code-security
  tag: Blog
  text: Remedie vulnerabilidades transitivas más rápido con Datadog Software Composition
    Analysis
- link: https://www.datadoghq.com/blog/audit-reports-datadog-sheets
  tag: Blog
  text: Genere informes de vulnerabilidad y cumplimiento listos para auditorías con
    Datadog Sheets
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Resuelva problemas más rápido con la integración de GitLab Source Code en
    Datadog
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Detecte y bloquee credenciales expuestas con Datadog Secret Scanning
- link: https://www.datadoghq.com/blog/code-security-ai-capabilities
  tag: Blog
  text: Proteja su código a escala con la gestión de vulnerabilidades impulsada por
    IA
- link: https://www.datadoghq.com/blog/monitor-mcp-servers/
  tag: Blog
  text: Identifique riesgos de seguridad comunes en servidores MCP
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives/
  tag: Blog
  text: Uso de LLMs para filtrar falsos positivos del análisis estático de código
title: Code Security
---
Code Security escanea su código propio y las bibliotecas de código abierto utilizadas en sus aplicaciones, tanto en sus repositorios como en los servicios en ejecución, proporcionando visibilidad de extremo a extremo desde el desarrollo hasta la producción. Abarca las siguientes capacidades:

- [Static Code Analysis (SAST)][1] para identificar problemas de seguridad y calidad en su código propio
- [Software Composition Analysis (SCA)][2] para identificar dependencias de código abierto tanto en sus repositorios como en sus servicios
- [Runtime Code Analysis (IAST)][3] para identificar vulnerabilidades en el código propio dentro de sus servicios
- [Secret Scanning][8] para identificar y validar secretos filtrados
- [Infrastructure as Code (IaC) Security][10] para identificar errores de configuración de seguridad en IaC almacenada en sus repositorios
- [Seguridad de la cadena de suministro](#supply-chain-security-preview) para evitar que paquetes maliciosos entren en su entorno de desarrollo y repositorios de código

Code Security ayuda a los equipos a implementar DevSecOps en toda la organización:
- **Desarrolladores:** detección temprana de vulnerabilidades, mejoras en la calidad del código, desarrollo más rápido ya que los desarrolladores pasan menos tiempo depurando y aplicando parches.
- **Administradores de seguridad:** postura de seguridad mejorada, gestión de parches optimizada en respuesta a alertas tempranas de vulnerabilidad y monitoreo de cumplimiento.
- **Ingenieros de confiabilidad del sitio (SRE):** verificaciones de seguridad automatizadas en todo el flujo de trabajo de CI/CD, cumplimiento de seguridad y resiliencia del sistema. SAST reduce la carga manual para los SRE y garantiza que cada versión se pruebe exhaustivamente en busca de vulnerabilidades.

Las siguientes capacidades de gestión de vulnerabilidades están disponibles en Code Security:
- [Integraciones de herramientas para desarrolladores][16] para marcar vulnerabilidades en el IDE y en los comentarios de las solicitudes de extracción (pull requests), y bloquear la fusión de vulnerabilidades en su base de código de producción
- [Integraciones de tickets][13] con Jira y Datadog Case Management, con sincronización bidireccional
- [Notifications][14]
- [Canalizaciones de automatización][15] para silenciar automáticamente vulnerabilidades y asignar fechas de entrega según la gravedad
- [Servidor MCP][17] para ejecutar escaneos de Code Security directamente desde asistentes de codificación de IA (en vista previa)

## Análisis estático de código (SAST) {#static-code-analysis-sast}
Análisis estático de código (SAST) analiza el código de preproducción para identificar problemas de seguridad y calidad. Puede integrar las mejores prácticas de seguridad y desarrollo a lo largo del ciclo de vida de desarrollo de software con:
- Integración con IDE para señalar infracciones en tiempo real con correcciones sugeridas deterministas
- Comentarios en línea en las solicitudes de extracción con correcciones sugeridas deterministas y escaneo incremental/consciente de diferencias
- Capacidad para abrir una solicitud de extracción para corregir una infracción directamente desde Datadog 

Los análisis pueden ejecutarse a través de sus canalizaciones de CI/CD o directamente en Datadog con análisis alojado.  
Consulte [Configuración de análisis de código estático][6] para comenzar.

El análisis de código estático también puede escanear sus solicitudes de extracción a escala para detectar y prevenir cambios de código malicioso. Esto permite a Datadog no solo verificar vulnerabilidades de código conocidas, sino también detectar intenciones potencialmente maliciosas en las solicitudes de extracción enviadas a las ramas predeterminadas de sus repositorios. [Solicite acceso a la vista previa][12].

## Software Composition Analysis {#software-composition-analysis}
Software Composition Analysis (SCA) analiza las bibliotecas de código abierto tanto en sus repositorios como en los servicios en ejecución. Puede realizar un seguimiento y gestionar las dependencias a lo largo del ciclo de vida de desarrollo de software con:
- Integración con IDE para señalar vulnerabilidades que afectan a las bibliotecas que se ejecutan en sus servicios
- Capacidad para abrir una solicitud de extracción para corregir una vulnerabilidad de biblioteca directamente desde Datadog
- Priorización de vulnerabilidades basada en el tiempo de ejecución con la puntuación de gravedad de Datadog

SCA admite la detección de dependencias tanto estática como en tiempo de ejecución.  
Para el escaneo estático, puede realizar el escaneo a través de sus canalizaciones de CI/CD o directamente a través de Datadog con escaneo alojado. Consulte [configuración estática][4] para comenzar.  
Para la detección de vulnerabilidades en tiempo de ejecución, puede habilitar fácilmente SCA en sus servicios instrumentados con Datadog APM. Consulte [configuración en tiempo de ejecución][5] para comenzar.

## Análisis de código en tiempo de ejecución (IAST) {#runtime-code-analysis-iast}
El análisis de código en tiempo de ejecución (IAST) identifica vulnerabilidades a nivel de código en sus servicios en ejecución. Se basa en la inspección del tráfico legítimo de la aplicación, a diferencia de las pruebas externas que a menudo requieren configuración adicional o programación periódica. IAST proporciona una vista actualizada de su superficie de ataque mediante:
- El monitoreo de las interacciones de su código con otros componentes de su stack (como bibliotecas e infraestructura)
- La cobertura del 100% del OWASP Top 10
- Priorización de vulnerabilidades basada en el tiempo de ejecución con la puntuación de gravedad de Datadog

Puede habilitar IAST en sus servicios instrumentados con Datadog APM. Consulte la [configuración de IAST][3] para comenzar.

## Secret Scanning {#secret-scanning}
Secret Scanning identifica y valida credenciales expuestas, claves de API y otros secretos confidenciales en su base de código. Puede evitar la filtración de secretos a lo largo de su ciclo de vida de desarrollo de software con:
- Hooks de preconfirmación para bloquear secretos antes de que se confirmen localmente y lleguen a su repositorio
- Controles de solicitud de extracción para evitar que los secretos filtrados lleguen a su rama predeterminada
- Validación de terceros para confirmar si un secreto detectado está activo y es explotable, lo que reduce el ruido de credenciales rotadas o no válidas
- [Análisis del historial de Git][22] para encontrar secretos que se eliminaron del código pero que aún pueden recuperarse de confirmaciones anteriores

Los análisis pueden ejecutarse a través de sus canalizaciones de CI/CD o directamente en Datadog con análisis alojado. Consulte la [configuración de Secret Scanning][9] para comenzar.

## Infrastructura como Code Security (IaC Security) {#infrastructure-as-code-security-iac-security}
IaC Security analiza la infraestructura como código para detectar configuraciones incorrectas antes de que se aprovisionen en su entorno de nube. Puede proteger su infraestructura y CI/CD con:
- Comentarios en línea en las solicitudes de extracción con correcciones sugeridas deterministas y escaneo incremental/consciente de diferencias
- Controles de solicitud de extracción para evitar que las configuraciones erróneas de alta gravedad lleguen a su entorno de producción
- Cientos de detecciones en Terraform, CloudFormation, Kubernetes, GitHub Actions y más

Con [Cloud Security Management (CSM)][18], puede ver las configuraciones erróneas en IaC Security directamente desde los hallazgos en tiempo de ejecución. Consulte la [configuración de IaC Security][17] para comenzar.

## Seguridad de la cadena de suministro (vista previa) {#supply-chain-security-preview}

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="¡Únase a la vista previa!">}}
Utilice este formulario para enviar su solicitud para unirse a la vista previa de seguridad de la cadena de suministro.
{{< /callout >}}

La seguridad de la cadena de suministro evita que los paquetes de código abierto maliciosos entren en sus entornos de desarrollo en el punto de instalación, antes de que lleguen a sus repositorios o canalizaciones de CI/CD.

A diferencia de SCA, que escanea las dependencias que ya están en su base de código, el firewall de la cadena de suministro (SCFW) de Datadog intercepta los comandos del administrador de paquetes (`npm`, `pip`, `poetry`) en tiempo real y bloquea los paquetes maliciosos o publicados recientemente antes de que se instalen.

La seguridad de la cadena de suministro evalúa cada instalación de paquete con respecto a la fuente de paquetes maliciosos de Datadog (impulsada por [GuardDog][21]), los avisos de vulnerabilidades conocidas y los umbrales de antigüedad configurables. Si un paquete coincide con una de estas verificaciones, SCFW bloquea inmediatamente la instalación y muestra un mensaje claro y procesable en las computadoras portátiles de los desarrolladores y en los [ejecutores de CI][20].

Además de proteger las máquinas individuales de los desarrolladores o las canalizaciones de CI, SCFW proporciona observabilidad de eventos para buscar, filtrar y auditar eventos de PERMITIR, ADVERTIR y BLOQUEAR en las máquinas de los desarrolladores y los sistemas de CI en una fuente de eventos unificada.

## Code Security MCP Server (Preview) {#code-security-mcp-server-preview}
El [Code Security MCP Server][19] es un servidor local Model Context Protocol (MCP) que integra SAST, detección de secretos, SCA, escaneo de IaC y generación de SBOM directamente en asistentes de codificación de IA como Cursor, Claude Desktop y VS Code. Lea la [documentación del MCP Server][17] para comenzar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/static_analysis/
[2]: /es/security/code_security/software_composition_analysis/
[3]: /es/security/code_security/iast/
[4]: /es/security/code_security/software_composition_analysis/setup_static/
[5]: /es/security/code_security/software_composition_analysis/setup_runtime/
[6]: /es/security/code_security/static_analysis/setup/
[7]: /es/security/code_security/iast/setup/
[8]: /es/security/code_security/secret_scanning/
[9]: /es/security/code_security/secret_scanning/#set-up-secret-scanning
[10]: /es/security/code_security/iac_security
[12]: https://www.datadoghq.com/product-preview/malicious-pr-protection/
[13]: /es/security/ticketing_integrations
[14]: /es/security/notifications/
[15]: /es/security/automation_pipelines/
[16]: /es/security/code_security/dev_tool_int/
[17]: /es/security/code_security/iac_security/setup/?tab=github
[18]: /es/security/cloud_security_management/
[19]: /es/security/code_security/dev_tool_int/mcp_server/
[20]: /es/security/code_security/dev_tool_int/scfw_github_action/
[21]: https://github.com/DataDog/guarddog
[22]: /es/security/code_security/secret_scanning/#detect-secrets-in-git-history