---
aliases:
- /es/security_platform/cloud_workload_security/
- /es/security/cloud_workload_security/
- /es/security/cloud_workload_security/agent_expressions
- /es/security/cloud_workload_security/backend/
- /es/security/threats/security_profiles
- /es/security/threats/runtime_anomaly_detection
- /es/security/threats/
- /es/security/threats/agent
- /es/security/workload_protection/agent
cascade:
- _target:
    path: /security/workload_protection/backend_linux
  aliases:
  - /security/threats/backend_linux
- _target:
    path: /security/workload_protection/backend_windows
  aliases:
  - /security/threats/backend_windows
- _target:
    path: /security/workload_protection/linux_expressions
  aliases:
  - /security/threats/linux_expressions
- _target:
    path: /security/workload_protection/windows_expressions
  aliases:
  - /security/threats/windows_expressions
description: Detecte y responda a amenazas en tiempo de ejecución en sus servidores,
  contenedores y cargas de trabajo sin servidor con Datadog Workload Protection.
further_reading:
- link: https://www.datadoghq.com/blog/workload-protection-investigation/
  tag: Blog
  text: Convierta señales fragmentadas de tiempo de ejecución en historias de ataque
    coherentes con Datadog Workload Protection
- link: https://www.datadoghq.com/blog/workload-protection-findings
  tag: Blog
  text: Identifique y remedie problemas de postura en tiempo de ejecución con los
    hallazgos de Workload Protection
- link: https://learn.datadoghq.com/courses/workload-protection-detect-compromises
  tag: Centro de aprendizaje
  text: Detecte compromisos de servidores y contenedores con Workload Protection
- link: https://learn.datadoghq.com/courses/workload-protection-enable-manage
  tag: Centro de aprendizaje
  text: Habilite y administre Workload Protection
title: Workload Protection
---
Datadog Workload Protection proporciona visibilidad y defensa en tiempo real para su infraestructura mediante el monitoreo continuo de la actividad de archivos, red y procesos en sus entornos. Detecta amenazas a medida que ocurren, generando señales de seguridad y hallazgos. Úselos para identificar, investigar y detener comportamientos maliciosos antes de que afecten sus cargas de trabajo.

Workload Protection es parte de la plataforma Datadog Security. Las señales se correlacionan con escaneos de configuración incorrecta, evaluaciones de vulnerabilidad y hallazgos de seguridad de código, para que pueda vincular ataques en tiempo de ejecución con debilidades preexistentes. Debido a que se ejecuta en la plataforma Datadog, también se conecta con las métricas, trazas y registros de su infraestructura. Ese contexto le ayuda a comprender el alcance de una amenaza y reconstruir la historia del ataque.

## Más allá de la detección de amenazas en tiempo de ejecución {#beyond-runtime-threat-detection}

Workload Protection no se limita a la detección de amenazas en tiempo de ejecución. Muchas organizaciones lo utilizan en una variedad de casos de uso operativos y de seguridad:

- **Validación de Compliance:** Workload Protection le ayuda a validar el cumplimiento de marcos regulatorios como PCI, FedRAMP y SOC 2 mediante el monitoreo continuo de la actividad en tiempo de ejecución en busca de violaciones de políticas, configuraciones riesgosas y cambios no autorizados.

- **Postura de seguridad en tiempo de ejecución:** Workload Protection mejora su postura de seguridad al identificar prácticas inseguras en tiempo de ejecución y desviaciones de configuración sensibles, ayudándole a detectar debilidades antes de que puedan ser explotadas.

- **Infrastructure Monitoring:** Workload Protection rastrea cualquier tipo de comportamiento en tiempo de ejecución, ya sea relacionado con la seguridad o no. Desde la depuración de cargas de trabajo personalizadas hasta el monitoreo de procesos a nivel de sistema y sesiones de usuario remoto, ofrece visibilidad en tiempo real sobre cómo operan sus entornos.

{{< img src="security/workload_protection/k8s_remote_access.png" alt="Desglose de sesiones de usuario remoto de Kubernetes" width="100%">}}

## Cómo funciona {#how-it-works}

Workload Protection evalúa la actividad que recopila en dos lugares: en el Datadog Agent y en Datadog.

### Ahorro de recursos por diseño {#saving-resources-by-design}

Las reglas de detección de Workload Protection son complejas y correlacionan varios puntos de datos a través del tiempo y los procesos. Esta complejidad resultaría en demandas considerables de recursos de cómputo en el servidor del Agent si todas las reglas se evaluaran allí.

Datadog resuelve este problema manteniendo el Agent ligero con reglas eficientes que filtran la actividad no relevante para la seguridad de sus cargas de trabajo y procesando la actividad restante mediante reglas de detección de amenazas y hallazgos en el backend de Datadog. Las reglas del Agent están organizadas en [policies][14], que usted implementa con {{< tooltip glossary="Remote Configuration" case="title" >}} o manualmente. Usted puede administrar reglas y políticas en Datadog, en archivos de configuración del Agent o con el proveedor de Terraform de Datadog.

{{< img src="security/workload_protection/workload_protection_detection_architecture.png" alt="Descripción general de la arquitectura de Workload Protection" width="100%">}}

### Recopilación de actividad en tiempo de ejecución {#collecting-runtime-activity}

El Datadog Agent recopila actividad en tiempo de ejecución de sus cargas de trabajo. El mecanismo de recopilación depende de la plataforma:

- **Linux**: el Agent de eBPF, que ofrece la mayor compatibilidad de funciones.
- **AWS Fargate**: el rastreador cws-instrumentation. Fargate no proporciona acceso a eBPF, por lo que este Agent utiliza ptrace en su lugar. Cubre las principales funciones de Workload Protection, incluyendo el monitoreo de integridad de archivos y el monitoreo de ejecución de procesos.
- **Windows**: un controlador de Windows.

En Linux y Windows, Workload Protection cubre más de 40 tipos de eventos, que abarcan la actividad de procesos, sistemas de archivos, kernel y red. Para conocer las distribuciones, versiones y entornos de nube que admite cada Agent, consulte [Setup][1].

### Evaluación de actividad {#evaluating-activity}

Las reglas del Agent realizan un filtrado ligero para que se ejecuten de manera eficiente en cada servidor. Datadog evalúa las correlaciones más complejas a través del tiempo y los procesos:

1. Las [reglas del Agent][6] evalúan la actividad del sistema en el servidor del Agent.
2. Cuando la actividad coincide con una expresión de regla del Agent, el Agent genera un [agent event][7] y lo envía a Datadog.
3. Datadog evalúa los agent events frente a [detection rules][8] y [finding rules][9].
4. Si una regla de detección coincide, se genera una señal y se muestra en [Signals][10]. Si un atributo de agent event coincide con un [threat intelligence indicator][13], también se muestra el indicador correspondiente.
5. Si una finding rule coincide, se genera un hallazgo y se muestra en [Findings][11].
6. Se activan todas las [notification rules][12] que coincidan con la gravedad, el tipo de regla, las etiquetas y los atributos de la señal.

Workload Protection se entrega con más de 350 Agent rules y 200 detection rules, que cubren la mayoría de las tácticas y técnicas de MITRE ATT&CK. También puede escribir las suyas propias, incluidas máquinas de estado en el Agent que alertan solo sobre indicadores de compromiso complejos.

### Responder a amenazas {#responding-to-threats}

Las acciones de respuesta se ejecutan en el Agent. El Agent puede terminar un proceso o contenedor, o bloquear el tráfico de red mediante un filtro basado en eBPF. Puede activar estas acciones de dos maneras:

- **Automated response** adjunta una acción a una Agent rule, de modo que el Agent actúa tan pronto como la regla coincide.
- **Manual response** le permite actuar a partir de una señal después de que se genera.

Ambas dependen de que la enforcement esté habilitada en el Agent. Consulte [Respond to Threats][4].

También puede responder desde Datadog en lugar del Agent. Active un [workflow][15] a partir de una señal, o integre señales con sus canalizaciones de respuesta existentes. Consulte [Signal actions][16].

## Próximos pasos {#next-steps}

### Configuración {#setup}

Comience con la guía de [Setup][1]. Cubre los entornos compatibles, cómo implementar el Agent y cómo experimentar con las funciones de Workload Protection utilizando los playground scripts.

### Detectar y hacer un seguimiento {#detect-and-monitor}

Lea las páginas de [Detect and Monitor][2] para comprender cómo los agent events se traducen en señales y hallazgos de Workload Protection. Estas páginas le ayudan a explorar las detecciones integradas (OOTB) y a crear su propia lógica de detección.

### Investigar y clasificar {#investigate-and-triage}

Consulte las páginas de [Investigate and Triage][3] para descubrir los exploradores y las vistas en la aplicación disponibles en Workload Protection. Estas páginas le ayudan a aprovechar al máximo los eventos, señales y hallazgos generados por la plataforma.

### Responder a amenazas {#respond-to-threats}

La página [Respond to Threats][4] explica cómo configurar la respuesta automatizada y manual. Cubre los requisitos de Agent enforcement, las acciones de respuesta disponibles y cómo interpretar sus resultados.

### Coverage {#coverage}

Utilice [Coverage][5] para obtener una vista unificada y en tiempo real de la postura de Workload Protection en servidores, contenedores y cargas de trabajo sin servidor. Identifique problemas de implementación de políticas, activos sin protección y brechas de detección antes de que se conviertan en riesgos explotables.

### Guides {#guides}

{{< whatsnext desc="Ejemplos basados en casos de uso para ayudarle a descubrir y aprender sobre Workload Protection:" >}}
{{< nextlink href="/security/workload_protection/guide/tuning-rules" >}}Mejores prácticas para ajustar las señales de seguridad de Workload Protection{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/security/workload_protection/setup
[2]: /es/security/workload_protection/detect_and_monitor
[3]: /es/security/workload_protection/investigate_and_triage
[4]: /es/security/workload_protection/respond_and_report
[5]: /es/security/workload_protection/inventory
[6]: /es/security/workload_protection/detect_and_monitor/agent_rules
[7]: /es/security/workload_protection/investigate_and_triage/agent_events
[8]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[9]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[10]: /es/security/workload_protection/investigate_and_triage/security_signals
[11]: /es/security/workload_protection/investigate_and_triage/security_findings
[12]: /es/security/notifications/rules
[13]: /es/security/workload_protection/detect_and_monitor/threat_intelligence
[14]: /es/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[15]: /es/actions/workflows/
[16]: /es/security/workload_protection/investigate_and_triage/security_signals/actions