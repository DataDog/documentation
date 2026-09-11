---
aliases:
- /es/monitors/faq/why-am-i-getting-so-many-no-data-alerts/
- /es/monitors/faq/why-am-i-getting-so-many-no-data-alerts-for-my-metric-monitor/
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar tus notificaciones de monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
title: Ajuste de las alertas de Faltante de datos para los monitores de métrica
---

*Las alertas de "Faltante de datos" son una buena forma de recibir notificaciones cuando una integración/aplicación deja de enviar métricas a Datadog.
Cuando se utiliza un [Monitor de métrica][1] para una métrica que no siempre se notifica con la misma frecuencia o se notifica con una marca temporal ligeramente en el pasado, como una métrica de la [integración de AWS][2], es posible que recibas alertas Faltante de datos a pesar de ver estos valores en Datadog. Hay un par de opciones de configuración de monitor que se pueden editar para evaluar adecuadamente sobre este tipo de métricas:

{{< img src="monitors/guide/AWS_Monitor_Config.png" alt="Configuración de monitor de AWS" >}}

1. La imagen de arriba muestra que esta métrica: `aws.ec2.cpuutilization` llega con un ligero retraso.
Esto se debe a las limitaciones sobre cuán pronto esta métrica está disponible en CloudWatch.

{{< img src="monitors/guide/require_full_window.png" alt="Requiere un intervalo completo de datos" >}}

2. Opción Retraso de la evaluación.
Dado que los monitores realizan una evaluación cada minuto, está mirando hacia atrás en los últimos X minutos de datos. En el caso de las métricas completadas, como las procedentes de AWS, el monitor puede estar buscando en un intervalo en el que los datos no están en Datadog. Esto provoca falsas alertas de Faltante de datos. Configurar este campo te permite hacer que el monitor espere, 900 segundos, para que las métricas de AWS tengan 900 segundos para estar disponibles dentro de Datadog antes de que el monitor comience la evaluación.

3. Esta opción es [Requerir una ventana completa de datos][3] (o la posibilidad de no requerirla).
Esta opción es normalmente recomendada para métricas que están siendo informadas por el Datadog Agent y las que están llegando con la marca temporal actual. En el caso de métricas ligeramente completadas, esta opción puede provocar eventos de Faltante de datos o que el monitor omita el periodo de evaluación actual debido a que los valores no están presentes en el momento en que evalúa el monitor. Por esta razón, todas las métricas dispersas o métricas que no informan con la misma frecuencia deben mantener la opción por defecto "No [Requerir un intervalo completo de datos][3]".

Por último, a la hora de crear monitores eficaces, es importante comprender estas limitaciones. Los [retrasos de la métrica de nube][4] son diferentes para cada proveedor de nube. Para recibir métricas con un retraso significativamente menor, instala Datadog Agent en tus hosts de nube cuando sea posible. Consulta la documentación sobre [instalación del Datadog Agent en tus instancias en la nube][5].

Ponte en contacto con [nosotros][6] si tienes algún problema.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/metric/
[2]: /es/integrations/amazon_web_services/
[3]: /es/monitors/types/metric/?tab=threshold#advanced-alert-conditions
[4]: /es/integrations/guide/cloud-metric-delay/
[5]: /es/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[6]: /es/help/