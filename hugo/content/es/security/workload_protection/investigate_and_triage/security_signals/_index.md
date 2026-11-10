---
aliases:
- /es/security/threats/security_signals
- /es/security/workload_protection/security_signals
- /es/security_platform/cspm/signals_explorer
- /es/security/cspm/signals_explorer
- /es/security/misconfigurations/signals_explorer
- /es/security/cloud_security_management/misconfigurations/signals_explorer/
description: Busque, filtre y realice el triaje de las señales de seguridad que generan
  las reglas de detección de Workload Protection.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentación
  text: Explore las reglas de detección de Workload Protection
- link: /security/notifications/
  tag: Documentación
  text: Obtenga más información sobre las notificaciones de seguridad
title: Señales
---
Las señales de seguridad de [Workload Protection][1] se crean cuando Datadog detecta una amenaza basada en una regla de seguridad. Visualice, busque, filtre e investigue señales de seguridad en el [Explorador de señales][2], o configure [Notification Rules][3] para enviar señales a herramientas de terceros.

## Explorador de señales {#signals-explorer}

El [Explorador de señales][2] enumera las señales de seguridad de Workload Protection generadas por [reglas de detección][5]. Utilice la barra de búsqueda o el panel de facetas para filtrar señales por gravedad, estado de triaje, regla de detección, servidor, contenedor y otros atributos. Por ejemplo, para filtrar por estado de triaje, utilice `@workflow.triage.state:<status>`, donde `<status>` es el estado que desea (`open`, `under_review` o `archived`). También puede utilizar la faceta {{< ui >}}Signal State{{< /ui >}} en el panel de facetas.

Seleccione una señal para abrir el panel lateral. Desde allí, puede [investigar la amenaza][6] utilizando el gráfico de investigación, la línea de tiempo, el contexto y el JSON de la señal, o [tomar medidas][7] para realizar el triaje, escalar, automatizar o responder a la señal.

## Próximos pasos {#next-steps}

{{< whatsnext desc="Aprenda a investigar y responder a las señales de Workload Protection:" >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/investigate" >}}Investigue señales con el gráfico de investigación, la línea de tiempo y el JSON de la señal{{< /nextlink >}}
{{< nextlink href="/security/workload_protection/investigate_and_triage/security_signals/actions" >}}Realice el triaje y actúe sobre las señales: asigne, escale, automatice y aplique medidas{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/security/workload_protection/
[2]: https://app.datadoghq.com/security/workload-protection/signals
[3]: /es/security/notifications/rules/
[5]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[6]: /es/security/workload_protection/investigate_and_triage/security_signals/investigate
[7]: /es/security/workload_protection/investigate_and_triage/security_signals/actions