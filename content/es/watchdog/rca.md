---
further_reading:
- link: /watchdog/faq/root-cause-not-showing/
  tag: Documentación
  text: No se muestra la causa raíz
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: Blog
  text: Análisis de causas raíz automatizado
title: RCA de Watchdog
---

## Información general

La función de análisis de las causas raíz (RCA) de Watchdog te ayuda a reducir el tiempo medio de respuesta (MTTR) al automatizar las investigaciones preliminares durante la clasificación de incidencias. El motor de IA de Watchdog identifica las interdependencias existentes entre las anomalías de rendimiento de la aplicación y los componentes relacionados para establecer relaciones causales entre los síntomas. Cada vez que Watchdog encuentra una anomalía de APM, inicia un análisis de causa raíz para tratar de ofrecer información más detallada sobre la causa o los efectos de la anomalía.

La función de RCA de Watchdog requiere el uso de [APM][1]. Para que Watchdog pueda aprovechar al máximo toda la telemetría relevante de Datadog para los servicios afectados, Datadog recomienda configurar un [etiquetado unificado][2].

La función de RCA de Watchdog tiene en cuenta las siguientes fuentes de datos en sus análisis:

* Métricas de tasa de error, latencia y tasa de aciertos de APM
* Seguimiento de implementaciones de APM
* Trazas de APM
* Métricas de infraestructura basadas en Agent, incluidos el uso de CPU, de memoria y de disco
* Métricas de comprobación de estado de instancias de AWS
* Anomalías en patrones de logs

## Componentes de un análisis de causa raíz de Watchdog

{{< img src="watchdog/rca/root_cause_cropped.png" alt="Análisis de causas raíz de Watchdog que muestra la causa raíz, el error crítico y su impacto">}}

Un análisis de las causas raíz de Watchdog incluye tres componentes: causa raíz, error crítico e impacto.

### Root cause (Causa raíz)

Una causa raíz es un cambio de estado que da lugar a problemas de rendimiento de la aplicación. Entre los posibles cambios de estado se incluyen una diferencia en la disponibilidad de la infraestructura, un pico de tráfico o una implementación de código.

Watchdog admite cuatro tipos de causas raíz:

* Cambios de versión, según lo capturado por el seguimiento de implementaciones de APM
* Incrementos de tráfico, según lo capturado por las métricas de tasa de aciertos en tus servicios instrumentados por APM
* Fallos de instancias AWS, según lo capturado por las métricas de integraciones de Amazon EC2
* Espacio en disco que se agota, según lo capturado por las métricas del Datadog Agent

Watchdog nunca clasifica como causa raíz de una incidencia la disminución del rendimiento de la aplicación, como por ejemplo una mayor latencia o nuevos errores. Datadog denomina **error crítico** al síntoma inicial de disminución del rendimiento de la aplicación, tal como se describe a continuación.

### Error crítico

La sección Error crítico indica dónde y cómo la causa raíz provoca primero (y más directamente) una disminución del rendimiento de la aplicación. Los errores críticos siempre incluyen un aumento de la tasa de error o la latencia.

### Impacto

La función de RCA de Watchdog también identifica los servicios afectados indirectamente por la causa raíz. Se espera que cualquier disminución del rendimiento indicada en Impacto se recupere una vez resuelto el error crítico. Para los usuarios de RUM, Watchdog también evalúa automáticamente qué rutas de vista y qué usuarios se vieron afectados por las anomalías de rendimiento.

{{< img src="watchdog/rca/views_impacted.png" alt="Captura de pantalla de detalles de la función de análisis de causas raíz de Watchdog que muestra la ventana emergente con las vistas afectadas">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/
[2]: /es/getting_started/tagging/unified_service_tagging