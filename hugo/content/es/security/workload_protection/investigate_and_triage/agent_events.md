---
aliases:
- /es/security/threats/investigate_agent_events
- /es/security/workload_protection/investigate_agent_events
description: Busque y analice la actividad en tiempo de ejecución que el Datadog Agent
  envía a Datadog como eventos de Agent.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentación
  text: Explore las reglas de detección de Workload Protection
- link: /security/notifications/
  tag: Documentación
  text: Obtenga más información sobre las notificaciones de seguridad
title: Eventos de Agent
---
El Datadog Agent evalúa la actividad del sistema en el servidor del Agent. Cuando la actividad coincide con una expresión de regla del Agent, el Agent genera un evento y lo envía al backend de Datadog.

Con el [Explorador de eventos de Agent][13], puede investigar los eventos de Agent por separado de las señales. Revise qué sucedió, dónde ocurrió y qué regla del Agent coincidió utilizando el panel lateral del evento. También puede explorar el gráfico de investigación, el árbol de procesos y la carga útil JSON sin procesar, y visualizar las instrucciones de triaje y respuesta para la regla coincidente.

## Investigue eventos de Agent {#investigate-agent-events}

Para investigar un evento de Agent:

1. Vaya al [Explorador de eventos de Agent][13]. Los eventos de Agent se consultan y muestran mediante los controles estándar del explorador en el [Explorador de eventos][14] de Datadog.
2. Seleccione un evento de Agent. El panel lateral se abre con pestañas que le ayudan a investigar el evento.

### Descripción general {#overview}

La pestaña {{< ui >}}Overview{{< /ui >}} resume el evento y suele ser el mejor lugar para comenzar su investigación.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_overview.png" alt="Pestaña Overview del panel lateral de eventos de Agent que muestra las secciones What, Where, regla del Agent y gráfico de investigación" width="100%">}}

La pestaña Overview incluye las siguientes secciones:

- {{< ui >}}What{{< /ui >}}: Una descripción legible por humanos de la actividad detectada. Por ejemplo, *Un usuario ejecutó el comando clang en el servidor i-0d85f97942d947ca9*.
- {{< ui >}}Where{{< /ui >}}: El contexto de la infraestructura donde ocurrió el evento, incluyendo el proveedor de nube, la cuenta, la región, el servidor, el clúster de Kubernetes, el espacio de nombres, el pod, el contenedor y la imagen.
- {{< ui >}}Agent rule{{< /ui >}}: La regla del Agent que coincidió con el evento, incluyendo el nombre de la regla, el nombre del evento, las políticas de despliegue, la versión de la política y la expresión de la regla.
- {{< ui >}}Investigation graph{{< /ui >}}: Una vista previa del gráfico de investigación en la parte inferior de la pestaña Overview.
- {{< ui >}}Process tree{{< /ui >}}: El linaje completo del proceso desde el proceso de inicio del sistema hasta el proceso que activó el evento.

#### Gráfico de investigación {#investigation-graph}

El {{< ui >}}Investigation graph{{< /ui >}} es una visualización interactiva que mapea la infraestructura y los procesos involucrados en el evento. Proporciona una descripción general compacta de la cadena de ataque al resaltar las entidades y procesos más relevantes.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_investigation_graph.png" alt="Gráfico de investigación que muestra el servidor, el pod de Kubernetes, el contenedor, la imagen y la ruta de ejecución del proceso principal" width="100%">}}

El gráfico rastrea el evento desde el servidor a través de la infraestructura circundante —como el pod de Kubernetes, el conjunto de réplicas, el contenedor y la imagen del contenedor— y hacia la ruta de ejecución del proceso. Los procesos principales involucrados en el evento se muestran individualmente, mientras que los procesos menos relevantes se agregan en nodos agrupados (por ejemplo, **+7 procesos**) para mantener la vista enfocada en la actividad sospechosa.

Utilice el gráfico de investigación para comprender cómo la actividad detectada encaja en el contexto de ejecución más amplio sin revisar cada proceso en el servidor.

#### Árbol de procesos {#process-tree}

El {{< ui >}}Process tree{{< /ui >}} enumera el linaje completo del proceso desde el proceso de inicio del sistema hasta el proceso que activó el evento.

{{< img src="security/workload_protection/investigate_and_triage/agent_events/agent_event_process_tree.png" alt="Árbol de procesos que enumera la cadena completa de procesos desde systemd hasta el proceso que activó el evento" width="100%">}}

Para cada proceso en la cadena, el árbol de procesos muestra:

- {{< ui >}}Path{{< /ui >}}: La ruta del ejecutable y los argumentos de la línea de comandos.
- {{< ui >}}PID{{< /ui >}}: El ID del proceso.
- {{< ui >}}PPID{{< /ui >}}: El ID del proceso padre.
- {{< ui >}}User{{< /ui >}}: El contexto de usuario bajo el cual se ejecutó el proceso.

El árbol de procesos muestra la ascendencia completa del evento, comenzando desde `systemd` y continuando a través de procesos intermedios —como `containerd`, `runc` y procesos específicos de la carga de trabajo— hasta el comando que coincidió con la regla del Agent. Esto le ayuda a reconstruir la ruta de ejecución exacta que condujo a la detección.

### JSON {#json}

La pestaña {{< ui >}}JSON{{< /ui >}} muestra la carga útil del evento sin procesar con el conjunto completo de atributos del evento recopilados por el Agent. Utilice JSON cuando necesite la vista más detallada de los datos del evento, por ejemplo, para escribir consultas avanzadas en el [Agent Events Explorer][13] o compartir la carga útil completa del evento durante una investigación. Para filtrar cualquier campo, puede hacer clic en él desde el JSON.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[13]: https://app.datadoghq.com/security/agent-events
[14]: /es/events/explorer/