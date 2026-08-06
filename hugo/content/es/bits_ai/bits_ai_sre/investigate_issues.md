---
aliases:
- /es/bits_ai/bits_ai_sre/investigate_alerts/
description: Utiliza Bits AI SRE para investigar automáticamente las alertas de monitor
  (noun) y proporcionar un análisis de la causa raíz para una resolución más rápida
  de incident (incidente).
title: Investigar los problemas
---

## Inicia una investigación de SRE en Bits AI

Puedes iniciar una investigación de SRE en Bits AI desde varios puntos de entrada:

- Alertas de monitor (noun), que puedes activar de dos maneras:
  - [**Manual**](#manual-monitor-alerts): Parte desde una alerta de monitor (noun) individual
  - [**Automática**](#enable-automatic-investigations): Configura monitores para que inicien automáticamente una investigación de Bits cada vez que entren en estado de alerta
- [Gráficos de latencia de APM en pages (páginas) de servicio](#apm-latency-graphs-on-service-pages)
- [Historias de Watchdog de latencias de APM](#apm-latency-watchdog-stories)
- [Solicitud general](#general-prompt)

### Iniciar una investigación manualmente

#### Alertas de monitor (noun) {#manual-monitor-alerts}

Puedes invocar Bits en un evento individual de alerta o advertencia de monitor (noun) desde varios puntos de entrada:

##### Opción 1: Lista de monitor (noun) de SRE de Bits AI {#monitor-list}
1. Ve a [**Bits AI SRE** > **Monitors** > **Supported**][5] (SRE de Bits AI > Monitors (noun) > Admitidos).
1. Haz clic en **Investigate Recent Alerts** (Investigar alertas recientes) y selecciona una alerta.

##### Opción 2: Page (página) de estado de monitor (noun)
Ve a la page (página) de estado de monitor (noun) de un [Monitor (noun) compatible con SRE de Bits AI](#supported-monitors) y haz clic en **Investigate with Bits AI SRE** (Investigar con SRE de Bits AI) en la esquina superior derecha.

##### Opción 3: Panel lateral de eventos de monitor (noun)
En el panel lateral de eventos de monitor (noun) de un [Monitor (noun) compatible con SRE de Bits AI](#supported-monitors), haz clic en **Investigate with Bits AI SRE** (Investigar con SRE de Bits AI).

##### Opción 4: Slack
Para utilizar la integración de Slack, [conecta su espacio de trabajo de Slack a SRE de Bits AI][8].

En Slack, responde a una notificación de monitor (noun) con `@Datadog Investigate this alert`.

#### Latencia de APM

{{< callout url="http://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
Las investigaciones de SRE de Bits AI iniciadas a partir de los gráficos de latencia de APM y las historias de Watchdog de APM están en vista previa. Haz clic en <strong>Solicitar acceso</strong> para unirte al programa de Vista previa.
{{< /callout >}}

##### Gráficos de latencia de APM en las pages (páginas) de servicios

1. En Datadog, ve a [APM][1] y abre la page (página) del servicio o recurso que desees investigar. Junto al gráfico de latencia, haz clic en **Investigate** (Investigar).
1. Haz clic y arrastra el cursor sobre la visualización del gráfico de puntos para hacer una selección rectangular sobre una región que muestre una latencia inusual para inicializar el análisis. Aparecen los diagnósticos iniciales del problema de latencia, incluido el efecto observado en el usuario, las tags (etiquetas) anómalas que contribuyen al problema y los cambios recientes. Para obtener más información, consulta [APM Investigator][2].
1. Haz clic en **Investigate with Bits AI SRE** (Investigar con SRE de Bits AI) para realizar una investigación más profunda.

##### Historias de Watchdog de latencias de APM

En una historia de latencia de Watchdog APM, haz clic en **Investigate with Bits AI SRE** (Investigar con SRE de Bits AI).

#### Solicitud general

{{< callout url="http://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
El inicio de investigaciones de SRE de Bits AI a partir de las indicaciones del chat está en vista previa. Haz clic en <strong>Solicitar acceso</strong> para unirte al programa de vista previa.
{{< /callout >}}

Haz clic en [Nueva investigación][16] y describe el problema que desees solucionar. Incluye tanto contexto relevante como sea posible:
- Síntomas observados (por ejemplo, errores, latencia), incluido cualquier enlace a la telemetría de Datadog que lo indique.
- Tags (etiquetas) relevantes como servicio, aplicación o entorno que aíslen el problema
- Una ventana de tiempo (en forma predeterminada son más de 4 horas)

Cuanto más específica sea la indicación, más precisa y útil será la investigación.

Buenos ejemplos:
- Investiga las solicitudes al servicio de búsqueda en producción. Algunas solicitudes devuelven resultados vacíos cuando no deberían. El problema comenzó alrededor de las 10:00 UTC.
- Investiga qué está causando estos errores: https://app.datadoghq.com/logs?query=service%3Asearch-service%20status%3Aerror Empezaron a aparecer hace unos 5 minutos.

Mal ejemplo:
- La aplicación va lenta. ¿Cuál es el problema?

También puedes activar una investigación desde Slack.  Menciona Datadog en un mensaje: `@Datadog Investigate high CPU in ai-gateway in prod over the last 30 minutes`. Si se invoca en un subproceso de Slack, SRE de Bits AI utiliza automáticamente todo el subproceso como el contexto de la investigación.

### Activar investigaciones automáticas

Además de las investigaciones manuales, puedes configurar Bits para que se ejecute automáticamente cuando un monitor (noun) pase al estado de alerta:

#### En la lista de monitors (noun) de SRE de Bits AI
1. Ve a [**Bits AI SRE** > **Monitors** > **Supported**][5] (SRE de Bits AI > Monitors (noun) > Admitidos).
1. Activa **Auto-Investigate** (Investigación automática) para un solo monitor (noun) o edita varios monitors (noun) seleccionándolos y haciendo clic en **Auto-Investigate All** (Investigación automática de todos).

#### Para un solo monitor (noun)
1. Abre la page (página) del estado del monitor (noun) y haz clic en **Edit** (Editar).
1. Desplázate a **Configure notifications & automations** (Configurar notificaciones y automatizaciones) y activa **Investigate with Bits AI SRE** (Investigar con SRE de Bits AI).

<div class="alert alert-info"><ul><li>No se admite la activación de investigaciones automáticas mediante la API de Datadog ni Terraform.</li><li>Una investigación se inicia cuando un monitor (noun) pasa al estado de alerta.</li><li>Las transiciones al estado de advertencia o sin datos, las <a href="/monitors/notify/#renotify">renovaciones</a> y las notificaciones de test no activan investigaciones automáticas.
</li></ul></div>

### Monitors (noun) compatibles

Bits puede ejecutar investigaciones en los siguientes tipos de monitor (noun):
  - Métrica
  - Anomalía
  - Predicción
  - Integración
  - Valor atípico
  - Logs
  - APM (`APM Metrics` tipo solamente; `trace (traza) Analytics` no es compatible)
  - Tests de la API de Synthetic Monitoring y del navegador (Vista previa)

{{< callout url="http://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
El inicio de investigaciones de SRE de Bits AI desde tests de Synthetic Monitoring está ahora en Vista previa. Haz clic en <strong>Solicitar acceso</strong> para unirte al programa Vista previa.
{{< /callout >}}

## Cómo investiga SRE de Bits AI
Cuando SRE de Bits AI investiga un problema, opera en un bucle continuo de observación, razonamiento y acción. Comienza formando hipótesis sobre la posible causa raíz y, a continuación, utiliza sus herramientas para consultar los datos de telemetría con el fin de validar o invalidar dichas hipótesis. Cada step (UI) / paso (generic) se basa en conclusiones anteriores. A medida que surgen nuevas pruebas, SRE de Bits AI actualiza sus conocimientos, refina su razonamiento y encadena steps (UI) / pasos (generic) de investigación adicionales, adaptando y corrigiendo el curso hasta que converja en la causa raíz más probable.

Al final de una investigación, SRE de Bits AI presenta una conclusión clara y respaldada por pruebas o marca la investigación como no concluyente cuando los datos disponibles son insuficientes para respaldar una conclusión defendible.

{{< img src="bits_ai/bits_ai_sre_investigation_hypotheses.png" alt="Diagrama de flujo en el que se muestran las hipótesis generadas y probadas por SRE de Bits AI" style="width:100%;" >}}

### Fuentes de datos compatibles
Bits utiliza las siguientes sources (fuentes) de datos durante las investigaciones:

#### Productos Datadog
- Métricas
- Traces (trazas) de APM
- Logs
- Dashboards
- Eventos
- [Rastreo de cambios][4]
- [Código source (fuente)][17] (solo GitHub)
- Watchdog
- Real User Monitoring
- Network Path
- Database Monitoring
- Continuous Profiler

<div class="alert alert-tip"><b>Añadir ámbito de servicio:</b> Para los monitors (noun) asociados a un servicio, añade una tag (etiqueta) de servicio al monitor (noun) o filtra o agrupa la consulta de monitor (noun) por servicio. Esto ayuda a  SRE de Bits AI a correlacionar los datos con mayor precisión.</div>

#### Integraciones de terceros
- Grafana
- Dynatrace
- Sentry
- Splunk
- ServiceNow
- Confluence

{{< callout url="http://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
Un subconjunto de integraciones de terceros están en Vista previa. Haz clic en <strong>Solicitar acceso</strong> para unirte al programa de Vista previa.
{{< /callout >}}

Para conocer las prácticas recomendadas a fin de maximizar la eficacia de las investigaciones, consulta [Sources (fuentes) de conocimiento][9].

### Modos de visualización de la investigación
Hay dos modos de visualización: Trace (traza) e investigación del Agent.

Mientras se lleva a cabo una investigación, Bits captura cada step (UI) / paso (generic) que toma, incluida la manera en que evalúa las pruebas y toma decisiones, en la vista **Agent Trace** (Trace del Agent). Esto proporciona un registro detallado y en tiempo real del proceso de razonamiento del agente.

Una vez finalizada la investigación, puedes cambiar a la vista **Investigation** (Investigación) para explorar una visualización estructurada en forma de árbol de la ruta de investigación, lo que facilita la comprensión de los resultados y las conclusiones de un vistazo.


## Informes

La pestaña Informes te permite rastrear el número de investigaciones realizadas a lo largo del tiempo por monitor (noun), usuario, servicio y equipo. También puedes rastrear el tiempo medio hasta la conclusión para evaluar el efecto de SRE de Bits AI en la eficiencia de tu servicio de guardia.

[1]: https://app.datadoghq.com/apm/home
[2]: /es/tracing/guide/latency_investigator/
[3]: /es/bits_ai/bits_ai_sre/configure/#configure-knowledge-base-integrations
[4]: /es/change_tracking
[5]: https://app.datadoghq.com/bits-ai/monitors/supported
[6]: https://app.datadoghq.com/monitors/manage
[8]: /es/bits_ai/bits_ai_sre/configure#slack
[9]: /es/bits_ai/bits_ai_sre/knowledge_sources/
[10]: /es/incident_response/on-call/pages/#page-from-notifications
[14]: /es/incident_response/case_management/notifications_integrations/#third-party-tickets
[15]: /es/account_management/rbac/permissions/#bits-ai
[16]: https://app.datadoghq.com/bits-ai/investigations/new
[17]: /es/source_code/#tag-your-apm-telemetry-with-git-information