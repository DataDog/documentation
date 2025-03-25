---
disable_toc: false
further_reading:
- link: /security/default_rules/?category=cat-csm-threats#all
  tag: Documentación
  text: Explorar las reglas de detección de CSM Threats
- link: /security/threats/workload_security_rules
  tag: Documentación
  text: Más información sobre cómo gestionar las reglas de detección de CSM Threats
- link: /security/notifications/
  tag: Documentación
  text: Más información sobre las notificación de seguridad
- link: https://www.datadoghq.com/blog/datadog-csm-windows/
  tag: Blog
  text: Protección de tus cargas de trabajo en Windows con Datadog Cloud Security
    Management
title: Investigar eventos del Agent
---


En este tema, se explica cómo utilizar el Agent Events Explorer para consultar y revisar los eventos de detección de amenazas del Datadog Agent generados por las [reglas de detección predefinidas (OOTB)][12].

El Datadog Agent evalúa la actividad del sistema en el host del Agent. Cuando la actividad coincide con una expresión de regla del Agent, el Agent genera un evento de detección y lo pasa al backend de Datadog.

Si un evento coincide con una regla de detección del Agent *y* una regla de detección de amenazas del backend, se crea una señal y se muestra en [Señales][11] (`Agent detection rule + backend Threat detection rule = Signal`).

Con el [Agent Events Explorer][13], puedes investigar eventos del Agent por separado de las señales. Puedes revisar la ruta de host en la que se produjo el evento y ver los atributos de eventos, métricas y procesos. También puedes revisar la regla del Agent que generó el evento y ver las instrucciones de análisis y respuesta.

## Bloquear de forma proactiva las amenazas con Active Protection

Por defecto, todas las reglas de detección de amenazas de minería de criptomonedas predefinidas del Agent están habilitadas y activas para la monitorización contra amenazas.

[Active Protection][18] te permite bloquear y terminar proactivamente las amenazas de minería de criptomonedas identificadas por las reglas de detección de amenazas de Datadog Agent.

## Ver eventos del Agent

Para consultar eventos del Agent, ve al [Agent Event Explorer][13].

Los eventos del Agent se consultan y visualizan utilizando los controles estándar del explorador en el [Events Explorer][14] de Datadog.


## Investigar eventos del Agent

Para investigar por qué aparece un evento en el [Agent Events Explorer][13], selecciona un evento.

Los detalles de evento incluyen los atributos, [métricas][16] y [procesos][15]. Las **métricas** se enlazan con los pasos de instalación del dashboard de host y los pasos de instalación de los **procesos** se enlazan con el [dashboard de proceso][17] y el Agent de proceso.

En **Path** (Ruta), se muestra el último árbol de proceso. Esto te da la mejor visión general de lo que ocurrió al mostrarte todos los comandos que condujeron al comando que inició el evento. 

{{< img src="security/csm/agent_events_explorer_details.png" alt="Tu descripción de imagen" style="width:100%;" >}}

**Path** (Ruta) es a menudo el mejor lugar para comenzar tu investigación de un evento.

## Clasificación de eventos del Agent

Para clasificar un evento:

1. Selecciona el evento en la columna **AGENT RULE** (REGLA DEL AGENT) en el [Agent Events Explorer][13].
2. Selecciona **Click to copy** (Hacer clic para copiar).
3. Abre la [documentación de las reglas predefinidas][12].
4. En el campo de búsqueda, pega el nombre de la regla copiada.
5. Selecciona la regla en los resultados.
6. Revisa el **Objetivo** de la regla, **Estrategia**, y sigue los pasos en **Clasificación y respuesta**.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[11]: /es/security/threats/security_signals
[12]: /es/security/default_rules/#cat-cloud-security-management
[13]: https://app.datadoghq.com/security/agent-events
[14]: /es/service_management/events/explorer/
[15]: /es/infrastructure/process/
[16]: /es/metrics/
[17]: https://app.datadoghq.com/process
[18]: /es/security/cloud_security_management/guide/active-protection