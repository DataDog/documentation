---
title: Uso de recursos del Agent por APM
---


El Agent está limitado por la CPU y su uso está correlacionado con el número de tramos (spans) recibidos por segundo.

El Agent trata cargas útiles no procesadas en memoria, por lo que limitar el proceso del Agent debido a un límite de CPU insuficiente puede provocar un problema de falta de memoria.

## Detección fuera de la CPU

Para monitorizar el uso de la CPU y detectar próximos problemas fuera de la CPU, compara el [porcentaje máximo de CPU][1] configurado para el Agent con la métrica `datadog.trace_agent.cpu_percent`. La métrica `datadog.trace_agent.cpu_percent` es el uso de la CPU en términos de porcentaje de un núcleo. Por ejemplo, un valor de `50` es medio núcleo, o `200` son dos núcleos.

Consulta la lista completa de [métricas de APM del Agent][2].



## Recursos necesarios

Un buen indicador para calcular los límites de recursos adecuados para el Agent es el número de tramos recibidos por segundo, indicado en la métrica `datadog.trace_agent.receiver.spans_received`.
Según ese valor de métrica, sigue la siguiente tabla para elegir los límites adecuados de CPU y memoria:

| Tramos por segundo  | CPU (núcleo)   | Memoria (MB)  |
|----------|--------------|--------------|
| 2000       | 0.05         | 35           |
| 11 000      | 0.2          | 40           |
| 32 000      | 0.6          | 60           |
| 58 000      | 1            | 70           |
| 130 000     | 2            | 130          |

**Notas:**
- Los valores se basan en las referencias del Agent `7.39.0`.
- Las referencias se realizaron en una instancia de AWS `c5.2xlarge` (8 VCPU/ 16GiB RAM)

[1]: /es/tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[2]: /es/tracing/send_traces/agent-apm-metrics/