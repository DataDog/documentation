---
description: Investigue los eventos de Workload Protection Agent, las señales de seguridad
  y los hallazgos en Datadog.
disable_toc: false
title: Investigue y clasifique
---
A medida que Workload Protection evalúa la actividad en tiempo de ejecución, genera eventos de Agent, señales y hallazgos. Utilice el Explorador de eventos de Agent para investigar la actividad en tiempo de ejecución, el Explorador de señales para investigar amenazas y el Explorador de hallazgos para revisar problemas de postura de seguridad en tiempo de ejecución.

Para saber cómo se produce cada uno, consulte [Cómo funciona Workload Protection][4].

## Agent events {#agent-events}

Los [Agent events][1] son la telemetría sin procesar generada por el Datadog Agent cuando la actividad en tiempo de ejecución coincide con una regla de Agent. Utilice el Explorador de eventos de Agent para investigar esta actividad.

## Señales {#signals}

Las [señales][2] se generan cuando los eventos de Agent coinciden con una regla de detección de backend. Utilice el Explorador de señales para investigar amenazas, clasificar señales y tomar medidas de respuesta.

{{< whatsnext desc="Explorar señales de Workload Protection:" >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/investigate" >}}Investigue señales{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/actions" >}}Clasifique y actúe sobre las señales{{< /nextlink >}}
{{< /whatsnext >}}

## Hallazgos {#findings}

Los [hallazgos][3] se generan cuando los eventos de Agent coinciden con una regla de hallazgo. Utilice el Explorador de hallazgos para revisar problemas de postura de seguridad en tiempo de ejecución.

[1]: /es/security/workload_protection/investigate_and_triage/agent_events
[2]: /es/security/workload_protection/investigate_and_triage/security_signals
[3]: /es/security/workload_protection/investigate_and_triage/security_findings
[4]: /es/security/workload_protection/#evaluating-activity