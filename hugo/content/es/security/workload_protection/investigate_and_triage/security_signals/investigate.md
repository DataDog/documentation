---
description: Utilice el panel lateral de señales para reconstruir la historia del
  ataque, evaluar el impacto y leer los datos sin procesar de la señal.
disable_toc: false
title: Investigue Security Signals
---
Cuando selecciona una señal de Workload Protection en el [Signals Explorer][1], el panel lateral proporciona herramientas de investigación para reconstruir la historia del ataque, comprender el impacto y acceder a los datos sin procesar de la señal.

## Qué sucedió {#what-happened}

La sección {{< ui >}}What Happened{{< /ui >}} le ofrece un resumen de la señal actual:

- {{< ui >}}Attack chain{{< /ui >}}: Una descripción legible por humanos de la actividad detectada y cómo encaja en la historia de amenaza más amplia.
- {{< ui >}}Where{{< /ui >}}: El contexto de la infraestructura donde ocurrió la señal, incluyendo el proveedor de nube, cuenta, región, servidor, clúster de Kubernetes, espacio de nombres, pod, contenedor e imagen.
- {{< ui >}}Detection rule{{< /ui >}}: La regla de detección de backend que generó la señal, incluyendo su nombre, gravedad y expresión de regla.
- {{< ui >}}Agent rule{{< /ui >}}: La regla del Agent que coincidió con la actividad de tiempo de ejecución subyacente, incluyendo el nombre de la regla, el nombre del evento y las políticas de implementación.

## Gráfico de investigación {#investigation-graph}

La pestaña {{< ui >}}Investigation{{< /ui >}} muestra un gráfico interactivo que mapea los procesos, recursos y eventos de tiempo de ejecución involucrados en la señal. El gráfico de investigación le ayuda a ver cómo se desarrolló un ataque paso a paso.

{{< img src="security/workload_protection/investigate_and_triage/security_signals/signal_investigation_graph.png" alt="Gráfico de investigación que muestra una cadena de ataque desde el atacante hasta el contenedor comprometido, con procesos correlacionados y acciones sospechosas" width="100%">}}

Desde el gráfico, puede pivotar a otras fuentes de telemetría, como Code Security o Infrastructure Monitoring, para validar vulnerabilidades de código u obtener más información sobre el recurso específico.

### Eventos correlacionados {#correlated-events}

Utilice {{< ui >}}Correlated events{{< /ui >}} en el gráfico de investigación para expandir la vista más allá de la señal inicial. Utiliza [variables][2] para agrupar la actividad de tiempo de ejecución que pertenece al mismo linaje de proceso o cadena de explotación.

Cada evento detectado por Workload Protection está etiquetado con una clave de correlación que lo asocia con otros eventos en la misma cadena de ejecución. Este agrupamiento le ayuda a centrarse en el intento de compromiso más amplio en lugar de responder a alertas aisladas.

Workload Protection admite capas integradas de contexto de ejecución para escenarios comunes de tiempo de ejecución, que incluyen:

- **Contexto de cgroup genérico**: contexto de respaldo para eventos no relacionados.
- **Contexto de auid genérico**: agrupa eventos por sesión de usuario.
- **Contexto de servicio**: aísla la actividad en tiempo de ejecución dentro de los límites del servicio.
- **Contexto de shell interactivo**: correlaciona comandos de la misma sesión de shell.
- **Contexto de sesión de usuario de Kubernetes**: rastrea las acciones del usuario de Kubernetes con una correlación detallada.
- **IOC de malware**: agrupa eventos que coinciden con el mismo indicador de malware de [inteligencia de amenazas][5], como un hash de archivo o un dominio.

### Radio de explosión {#blast-radius}

Utilice {{< ui >}}Blast radius{{< /ui >}} en el gráfico de investigación para evaluar el impacto potencial de la amenaza detectada. La visualización de radio de explosión resalta los recursos, servicios y dependencias que podrían verse afectados si el compromiso se extiende más allá del punto de detección inicial.

Esto le ayuda a priorizar los esfuerzos de respuesta y a comprender qué cargas de trabajo, servidores o contenedores adyacentes requieren monitoreo o fortalecimiento adicional.

### Línea de tiempo de eventos {#events-timeline}

La {{< ui >}}Events timeline{{< /ui >}} presenta una narrativa cronológica de cada evento dentro de una historia de amenaza correlacionada. Combina eventos correlacionados, estados de triaje, respuestas y acciones recomendadas en una sola visualización. Úsela para volver sobre los movimientos de un atacante desde la explotación inicial hasta las acciones posteriores sin cambiar entre visualizaciones.

Cada evento en la línea de tiempo incluye detalles contextuales y enlaces a métricas, registros y trazas correlacionados.

## Contexto {#context}

La pestaña {{< ui >}}Context{{< /ui >}} resume los atributos clave del servidor donde se activó la señal y enlaza a métricas, procesos y otra información relacionada para ayudarle a evaluar el recurso afectado.

## Signal JSON {#signal-json}

La pestaña {{< ui >}}Signal JSON{{< /ui >}} muestra el contenido sin procesar de la señal. Signal JSON es la estructura de datos subyacente que impulsa el Signals Explorer, los dashboards y las consultas programáticas.

Utilice Signal JSON cuando necesite:

- Escriba consultas complejas para agrupar, contar o correlacionar señales en el [Signals Explorer][1] o en los [dashboards][3].
- Cree automatizaciones o integraciones que consuman datos de señales a través de la [Datadog API][4].
- Comparta la carga útil completa de la señal con colegas o herramientas externas durante una investigación.

<div class="alert alert-info">Signal JSON es más útil para usuarios avanzados que desean consultar señales mediante programación. Para la mayoría de las investigaciones, el gráfico de investigación, la línea de tiempo y las pestañas de contexto proporcionan la información que necesita.</div>

[1]: https://app.datadoghq.com/security/workload-protection/signals
[2]: /es/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions
[3]: /es/dashboards/
[4]: /es/api/latest/security-monitoring/
[5]: /es/security/workload_protection/detect_and_monitor/threat_intelligence