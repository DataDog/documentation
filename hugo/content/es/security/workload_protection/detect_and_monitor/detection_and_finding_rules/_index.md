---
description: Compare las reglas de detección y las reglas de hallazgos del backend
  que Workload Protection utiliza para analizar Agent events.
disable_toc: false
title: Reglas de detección y de hallazgos
---
Después de que el Agent reenvía [Agent events][1] a Datadog, las reglas del backend analizan esa telemetría para producir resultados de Security. Workload Protection proporciona dos tipos de reglas de backend:

- **[Las reglas de detección][2]** detectan amenazas y generan [señales de seguridad][3] cuando la actividad sospechosa coincide con sus criterios. Estas revelan amenazas de seguridad reales en tiempo de ejecución; por ejemplo, un intento de shell inversa o de acceso a credenciales.
- **[Las reglas de hallazgos][4]** evalúan la postura de seguridad en tiempo de ejecución y generan [hallazgos][5] con recomendaciones para los recursos que no cumplen con una política. Estas rastrean malas prácticas y configuraciones incorrectas continuas en un servidor o contenedor; por ejemplo, el uso del administrador de paquetes en un contenedor de producción.

Ambos tipos de reglas consultan el mismo **esquema de eventos del backend**. Cada evento incluye todos los campos recopilados por el Agent, además de enriquecimiento adicional, como el contexto de la infraestructura y la inteligencia de amenazas. Cuando escribe una consulta de búsqueda para una regla de detección o de hallazgo, puede filtrar por cualquier campo en este esquema. Consulte la [sintaxis de backend de Linux][6] y la [sintaxis de backend de Windows][7] para obtener el conjunto completo de campos disponibles.

## Reglas de detección frente a reglas de hallazgos {#detection-rules-versus-finding-rules}

| | Reglas de detección | Reglas de hallazgos |
|---|---|---|
| **Resultado** | Señal de security | Hallazgo |
| **Representa** | Amenazas de seguridad en tiempo de ejecución reales | Problemas de postura y recomendaciones de seguridad |
| **Caso de uso** | Detección de amenazas y respuesta a incidentes | Postura y endurecimiento en tiempo de ejecución |

Por ejemplo, `Sudoers Policy File Modification Detection` marca las modificaciones en `/etc/sudoers` y los archivos en `/etc/sudoers.d/`. Modificar esos archivos es una mala práctica, pero puede ser parte de un proceso legítimo. Tratarlo como una regla de detección genera un ruido excesivo. Como regla de hallazgo, rastrea qué recursos tienen esta configuración sin activar una señal por cada escritura de archivo.

## Próximos pasos {#next-steps}

- Lea [Reglas de detección][2] para explorar reglas de detección de amenazas preconfiguradas (OOTB) y crear reglas de detección personalizadas.
- Lea [Reglas de hallazgos][4] para explorar reglas de postura preconfiguradas (OOTB) y crear reglas de hallazgos personalizadas.
- Explore la [sintaxis de backend de Linux][6] y la [sintaxis de backend de Windows][7] para ver todos los campos que puede usar en las consultas de reglas.

[1]: /es/security/workload_protection/investigate_and_triage/agent_events
[2]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[3]: /es/security/workload_protection/investigate_and_triage/security_signals
[4]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/finding_rules
[5]: /es/security/workload_protection/investigate_and_triage/security_findings
[6]: /es/security/workload_protection/backend_linux
[7]: /es/security/workload_protection/backend_windows