---
description: Aprenda cómo las reglas del Agent determinan qué actividad de tiempo
  de ejecución recopila y envía el Datadog Agent a Datadog como Agent events.
disable_toc: false
title: Agent Rules
---
Las reglas del Agent determinan qué actividad de tiempo de ejecución recopila y envía el Datadog Agent a Datadog como Agent events. Estos eventos proporcionan la telemetría que Workload Protection utiliza para la detección de amenazas y la evaluación de la postura de seguridad en tiempo de ejecución. Las reglas de detección y las reglas de hallazgos en el backend de Datadog analizan esos eventos para generar señales y hallazgos de seguridad. Los Agent events capturan la actividad de tiempo de ejecución de bajo nivel de las cargas de trabajo y proporcionan los datos sin procesar de alta fidelidad necesarios para comprender lo que realmente sucede en un sistema, en lugar de depender únicamente de la configuración estática o de escaneos periódicos.

Para reducir el ruido, el volumen de datos y el impacto en el rendimiento, el Agent filtra la actividad benigna o de bajo riesgo antes de enviar eventos a Datadog. Las Agent rules utilizan Datadog Security Language (SECL) para definir este filtrado. Las políticas implementan Agent rules a través de Remote Configuration, archivos de configuración del Agent o Terraform.

## Agent rules preconfiguradas {#ootb-rules}

Workload Protection incluye Agent rules preconfiguradas (OOTB), llamadas default rules, que Datadog administra. Para verlas, consulte [Agent Rules][1] en Datadog. Los ingenieros de seguridad de Datadog mantienen estas reglas. Ellos agregan reglas para comportamientos de malware emergentes, técnicas de ataque en evolución y otras actividades relevantes para la seguridad.

Puede implementar default rules de forma selectiva en entornos o cargas de trabajo, clonarlas para personalizar sus expresiones, refinar su lógica de filtrado o agregar acciones. Para conocer las opciones de implementación, consulte [Policy Management][2].

Las Agent rules pueden recopilar telemetría contextual o hacer coincidir actividades de alta confianza y ejecutar Agent actions. Las backend detection rules analizan Agent events y generan security signals.

## Escriba custom Agent rules en SECL {#write-custom-agent-rules-in-secl}

Las Workload Protection Agent rules utilizan un lenguaje de expresión personalizado llamado SecL para especificar qué eventos observar, hacer coincidir y enviar a Datadog según el contexto de tiempo de ejecución. Para obtener más información, consulte la [guía de SecL][5].

Para crear una Agent rule y una threat detection rule juntas, utilice el Assisted rule creator o el manual flow. Consulte [Create the custom Agent and detection rules together][3] en la documentación de [Detection Rules][4].


## Deploy Agent rules with policies {#deploy-agent-rules-with-policies}

Las Agent rules se empaquetan e implementan en policies. Administre policies de forma centralizada en Datadog o mediante Terraform, e impleméntelas en el Agent con Remote Configuration o modificando manualmente los Agent configuration files. Para obtener más información, consulte [Policy Management][2].
## Utilice variables y acciones {#use-variables-and-actions}

Las variables y acciones extienden las Agent rules más allá de la coincidencia de eventos. Las acciones pueden recopilar telemetría adicional, como hashes de archivos, responder a amenazas u operar con variables SECL. Las variables SECL permiten la construcción de lógica de detección avanzada y con estado basada en máquinas de estado. Para obtener más información, consulte [Variables y acciones][6].

[1]: https://app.datadoghq.com/security/workload-protection/agent-rules?ruleQuery=defaultRule%3Atrue
[2]: /es/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[3]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together
[4]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[5]: /es/security/workload_protection/detect_and_monitor/agent_rules/secl_guide
[6]: /es/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions