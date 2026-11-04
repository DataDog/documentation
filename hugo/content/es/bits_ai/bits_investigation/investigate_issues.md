---
aliases:
- /es/bits_ai/bits_ai_sre/investigate_alerts/
- /es/bits_ai/bits_investigation/investigate_alerts/
- /es/bits_ai/bits_ai_sre/investigate_issues/
description: Utilice Bits Investigation para investigar automáticamente las alertas
  de monitor y proporcionar un análisis de causa raíz para una resolución de incidentes
  más rápida.
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-sre-deeper-reasoning
  tag: Blog
  text: 'Conozca la nueva Bits Investigation: razonamiento más profundo, dos veces
    más rápido'
title: Investigue problemas
---
## Inicie una Bits Investigation {#start-a-bits-investigation}

Puede iniciar una Bits investigation desde varios puntos de entrada:

- Alertas de monitor, que puede activar de dos maneras:
  - [**Manual**](#manual-monitor-alerts): Inicie desde una alerta individual de monitor
  - [**Automático**](#enable-automatic-investigations): Configure los monitores para iniciar automáticamente una Bits investigation siempre que entren en un estado de alerta
- [Página de detalles de prueba Synthetic](#from-the-synthetic-test-details-page)
- [Real User Monitoring](#real-user-monitoring)
- [Prompt general](#general-prompt)

### Alertas de monitor {#manual-monitor-alerts}

Puede invocar Bits en una alerta individual de monitor o en un evento de advertencia desde varios puntos de entrada:

#### Opción 1: Lista de monitores de Bits Investigation {#monitor-list}
1. Vaya a [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Supported{{< /ui >}}][5].
1. Haga clic en {{< ui >}}Investigate Recent Alerts{{< /ui >}} y seleccione una alerta.

#### Opción 2: Página de estado del monitor {#option-2-monitor-status-page}
Navegue a la página de estado del monitor de un [monitor compatible con Bits Investigation](#supported-monitors) y haga clic en {{< ui >}}Investigate with Bits Investigation{{< /ui >}} en la esquina superior derecha.

#### Opción 3: Panel lateral de eventos del monitor {#option-3-monitor-event-side-panel}
En el panel lateral de eventos del monitor de un [monitor compatible con Bits Investigation](#supported-monitors), haga clic en {{< ui >}}Investigate with Bits Investigation{{< /ui >}}.

#### Opción 4: Slack {#option-4-slack}
Para usar la integración de Slack, [conecte su espacio de trabajo de Slack a Bits Investigation][8].

En Slack, responda a una notificación de monitor con `@Datadog Investigate this alert`.

### Pruebas Synthetic {#synthetic-tests}

Cuando un monitor de prueba Synthetic Browser o API se activa, puede iniciar una Bits investigation para identificar la causa raíz. Bits analiza los resultados y el historial de las pruebas Synthetic junto con trazas, registros y métricas. Presenta una causa raíz probable e identifica si el error refleja una regresión real o una configuración incorrecta.

#### Desde la página de detalles de la prueba Synthetic {#from-the-synthetic-test-details-page}

1. En la página [Synthetic Tests][18], abra la prueba Synthetic que desea investigar y vaya a la sección {{< ui >}}Timeline{{< /ui >}}.
1. Seleccione el evento {{< ui >}}Alert Triggered{{< /ui >}} para la ejecución de prueba fallida.
1. Haga clic en {{< ui >}}Investigate with Bits{{< /ui >}}.

La investigación se abre en una página nueva, y también puede verla desde la página de detalles de la prueba después de que se ejecute.

#### Desde un monitor sintético {#from-a-synthetic-monitor}

Los monitores sintéticos admiten los mismos puntos de entrada basados en monitores que otros tipos de monitores compatibles. Consulte [Alerts de monitor](#manual-monitor-alerts) para ver las opciones disponibles, o active {{< ui >}}Auto-Investigate{{< /ui >}} en un monitor sintético para iniciar investigaciones automáticamente. Para obtener más detalles, consulte [Habilitar investigaciones automáticas](#enable-automatic-investigations).

### Real User Monitoring {#real-user-monitoring}

Puede iniciar una Bits Investigation desde varios lugares en Real User Monitoring (RUM):

- Tarjetas de recomendación en la página de **Optimización** de RUM y en Operations Monitoring. Para obtener más detalles, consulte [Optimice el rendimiento con Bits AI][19].
- El botón **Anomalía · Investigar** en un gráfico vital de RUM. Para obtener detalles, consulte [Investigar regresiones y alertas con Bits AI][20].
- Monitores RUM, que admiten los mismos puntos de entrada basados en monitores que otros tipos de monitores compatibles, incluyendo [investigaciones automáticas](#enable-automatic-investigations). Para obtener detalles, consulte [Investigar regresiones y alertas con Bits][20].

### Prompt general {#general-prompt}

Haga clic en [New Investigation][16] y describa el problema que desea solucionar. Incluya tanto contexto relevante como sea posible:
- Síntomas observados (por ejemplo, errores, latencia), incluidos los enlaces a la telemetría de Datadog que indiquen esto
- Etiquetas relevantes como servicio, aplicación o entorno que aíslen el problema
- Un intervalo de tiempo (el predeterminado es las últimas 4 horas)

Cuanto más específico sea su prompt, más precisa y útil será la investigación.

Buenos ejemplos:
- Investigue las solicitudes a search-service en prod. Algunas solicitudes devuelven resultados vacíos cuando no deberían. El problema comenzó alrededor de las 10:00 UTC.
- Investigue qué está causando estos errores: https://app.datadoghq.com/logs?query=service%3Asearch-service%20status%3Aerror Comenzaron a aparecer hace unos 5 minutos.

Mal ejemplo:
- La aplicación es lenta. ¿Qué sucede?

También puede iniciar una investigación desde Slack.  Mencione a Datadog en un mensaje: `@Datadog Investigate high CPU in ai-gateway in prod over the last 30 minutes`. Si se invoca dentro de un hilo de Slack, Bits Investigation utiliza automáticamente todo el hilo como contexto de investigación.


### Habilitar investigaciones automáticas {#enable-automatic-investigations}

Además de las investigaciones manuales, puede configurar Bits para que se ejecute automáticamente cuando un monitor pase al estado de alerta:

#### Desde la lista de monitores de Bits Investigation {#from-the-bits-investigation-monitors-list}
1. Vaya a [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Supported{{< /ui >}}][5].
1. Active {{< ui >}}Auto-Investigate{{< /ui >}} para un solo monitor, o edite varios monitores de forma masiva seleccionándolos y haciendo clic en {{< ui >}}Auto-Investigate All{{< /ui >}}.

#### Para un solo monitor {#for-a-single-monitor}
1. Abra la página de estado del monitor y haga clic en {{< ui >}}Edit{{< /ui >}}.
1. Desplácese hasta {{< ui >}}Configure notifications & automations{{< /ui >}} y active {{< ui >}}Investigate with Bits Investigation{{< /ui >}}.

<div class="alert alert-info"><ul><li>No se admite la habilitación de investigaciones automáticas mediante la Datadog API o Terraform.</li><li>Una investigación se inicia cuando un monitor pasa al estado de alerta.</li><li>Las transiciones al estado de advertencia o sin datos, <a href="/monitors/notify/#renotify">las renotificaciones</a> y las notificaciones de prueba no activan investigaciones automáticas.
</li></ul></div>

### Monitores admitidos {#supported-monitors}

Bits puede ejecutar investigaciones en los siguientes tipos de monitores:
  - Métrica
  - Anomalía
  - Pronóstico
  - Integración
  - Valor anómalo
  - Logs
  - APM (solo tipo `APM Metrics`; `Trace Analytics` no es compatible)
  - Compuestos
  - SLOs
  - Pruebas de Synthetics API y Browser
  - RUM

## Cómo investiga Bits {#how-bits-investigates}
Cuando Bits investiga un problema, opera en un ciclo continuo de observación, razonamiento y acción. Comienza formando hipótesis sobre la posible causa raíz, luego utiliza sus herramientas para consultar datos de telemetría para validar o invalidar esas hipótesis. Cada paso se basa en hallazgos anteriores. A medida que surge nueva evidencia, Bits actualiza su comprensión, refina su razonamiento y encadena pasos de investigación adicionales, adaptándose y corrigiendo el rumbo hasta converger en la causa raíz más probable.

Al final de una investigación, Bits presenta una conclusión clara respaldada por evidencia o marca la investigación como no concluyente cuando los datos disponibles son insuficientes para respaldar una conclusión defendible.

{{< img src="bits_ai/bits_ai_sre_investigation_hypotheses.png" alt="Diagrama de flujo que muestra las hipótesis que Bits creó y probó" style="width:100%;" >}}

### Fuentes de datos admitidas {#supported-data-sources}
Bits utiliza las siguientes fuentes de datos durante las investigaciones:

#### Productos de Datadog {#datadog-products}
- Métricas
- Trazas de APM
- Logs
- Tableros
- Eventos
- [Change Tracking][4]
- [Código fuente][17] (solo GitHub)
- Watchdog
- Real User Monitoring
- Network Path
- Database Monitoring
- Continuous Profiler

<div class="alert alert-tip"><b>Agregar alcance de servicio:</b> Para los monitors asociados con un servicio, agregue una etiqueta de servicio al monitor, o filtre o agrupe la consulta del monitor por servicio. Esto ayuda a Bits a correlacionar los datos con mayor precisión.</div>

#### Integraciones de terceros {#third-party-integrations}
- Grafana
- Dynatrace
- Sentry
- Splunk
- ServiceNow
- Confluence

<div class="alert alert-info">
Las integraciones de terceros están en versión preliminar para todos los clientes.</div>

Para conocer las mejores prácticas sobre cómo maximizar la eficacia de las investigaciones, consulte [Fuentes de conocimiento][9].

### Modos de visualización de la investigación {#investigation-display-modes}
Existen dos modos de visualización: Pasos de la investigación y Árbol de hipótesis.

Mientras una investigación está en curso, Bits captura cada paso que realiza, incluida la forma en que evalúa la evidencia y toma decisiones, en el {{< ui >}}Investigation Steps{{< /ui >}} visualizar. Esto proporciona un registro detallado en tiempo real del proceso de razonamiento del agente.

Una vez que la investigación se completa, puede cambiar al {{< ui >}}Hypothesis Tree{{< /ui >}} visualizar para explorar una visualización estructurada basada en árbol de la ruta de investigación, lo que facilita la comprensión de los hallazgos y las conclusiones de un vistazo.


## Informes {#reports}

La pestaña {{< ui >}}Reports{{< /ui >}} le permite realizar un seguimiento del número de investigaciones ejecutadas a lo largo del tiempo por seguimiento, usuario, servicio y equipo. También puede realizar un seguimiento del tiempo medio hasta la conclusión para evaluar el impacto de Bits Investigation en su eficiencia de guardia.

[3]: /es/bits_ai/bits_investigation/configure/#configure-knowledge-base-integrations
[4]: /es/change_tracking
[5]: https://app.datadoghq.com/bits-ai/monitors/supported
[6]: https://app.datadoghq.com/monitors/manage
[8]: /es/bits_ai/bits_investigation/configure#slack
[9]: /es/bits_ai/bits_investigation/knowledge_sources/
[10]: /es/incident_response/on-call/pages/#page-from-notifications
[14]: /es/incident_response/work_management/notifications_integrations/#third-party-tickets
[15]: /es/account_management/rbac/permissions/#bits-ai
[16]: https://app.datadoghq.com/bits-ai/investigations/new
[17]: /es/source_code/#tag-your-apm-telemetry-with-git-information
[18]: https://app.datadoghq.com/synthetics/tests
[19]: /es/real_user_monitoring/bits_ai/optimize_performance/
[20]: /es/real_user_monitoring/bits_ai/investigate_regressions/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}