---
aliases:
- /es/security/workload_protection/workload_security_rules
- /es/security/threats/workload_security_rules
- /es/security/cloud_workload_security/workload_security_rules
- /es/security_platform/cloud_workload_security/workload_security_rules
description: Comprenda las reglas de Agent, las reglas de detección, las reglas de
  hallazgos, la inteligencia de amenazas y los paquetes de contenido que utiliza Workload
  Protection para detectar amenazas.
disable_toc: false
title: Detecte y haga un seguimiento
---
Workload Protection evalúa la actividad de su carga de trabajo frente a varios tipos de reglas. En conjunto, detectan amenazas, evalúan su postura de seguridad en tiempo de ejecución y proporcionan capacidades de auditoría granulares. Las reglas de Agent seleccionan qué actividad llega a Datadog. Las reglas de detección y las reglas de hallazgos analizan esa actividad. La inteligencia de amenazas la enriquece con contexto de reputación, y Content Packs agrupan reglas opcionales para stacks de software específicos y vectores de amenazas.

Para saber cómo encajan estas reglas en la canalización de detección, consulte [Cómo funciona Workload Protection][19].

## Reglas de Agent {#agent-rules}

[Las reglas de Agent][1] definen qué actividad del sistema se envía al backend de Datadog para un análisis posterior:
- [Guía SECL][15] para escribir reglas de Agent personalizadas con el lenguaje de expresiones SECL
- [Gestión de políticas][9] para implementar reglas de Agent personalizadas y predeterminadas
- [Variables y acciones][16] para detecciones con estado y recopilación de telemetría adicional
- [Expresiones de Linux][17] y [Expresiones de Windows][18] para el conjunto completo de campos SECL consultables

## Reglas de detección y de hallazgos {#detection-and-finding-rules}

[Reglas de detección y de hallazgos][3] describen la lógica de backend utilizada para analizar [Agent events][2] y generar [señales][5] o [hallazgos][6]:
- [Reglas de detección][11] para la detección de amenazas y la respuesta a incidentes
- [Reglas de hallazgos][12] para la postura de tiempo de ejecución y el endurecimiento
- [Sintaxis del backend de Linux][13] y [Sintaxis del backend de Windows][14] para el conjunto completo de campos de eventos consultables

## Inteligencia de amenazas {#threat-intelligence}

Workload Protection utiliza bases de datos de inteligencia de amenazas para enriquecer sus [Agent events][2] y detectar malware y entidades maliciosas conocidas. La página de [Threat Intelligence][7] le ayuda a:
- Explore las bases de datos de inteligencia de amenazas que se proporcionan listas para usar (OOTB) con Workload Protection
- Importe su propia base de datos de inteligencia de amenazas y configúrela para que funcione con Workload Protection

## Content Packs {#content-packs}

Workload Protection proporciona [Content Packs][10] específicos, diseñados por Datadog para stacks de software concretos, vectores de amenazas y vulnerabilidades emergentes. La página de [Content Packs][10] le ayuda a:
- Explore y habilite [Content Packs] para casos de uso clave en la seguridad de la carga de trabajo
- Implemente detecciones opcionales solo en las cargas de trabajo donde se apliquen
- Manténgase al día con las amenazas emergentes a través de actualizaciones de reglas administradas por Datadog

[1]: /es/security/workload_protection/detect_and_monitor/agent_rules
[2]: /es/security/workload_protection/investigate_and_triage/agent_events
[3]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules
[5]: /es/security/workload_protection/investigate_and_triage/security_signals
[6]: /es/security/workload_protection/investigate_and_triage/security_findings
[7]: /es/security/workload_protection/detect_and_monitor/threat_intelligence
[9]: /es/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[10]: /es/security/workload_protection/detect_and_monitor/content_packs
[11]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[12]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[13]: /es/security/workload_protection/backend_linux
[14]: /es/security/workload_protection/backend_windows
[15]: /es/security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[16]: /es/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[17]: /es/security/workload_protection/linux_expressions
[18]: /es/security/workload_protection/windows_expressions
[19]: /es/security/workload_protection/#evaluating-activity