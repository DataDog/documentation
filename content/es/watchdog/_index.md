---
algolia:
  tags:
  - watchdog
aliases:
- /es/tracing/watchdog
cascade:
  algolia:
    rank: 70
description: Detectar automáticamente posibles problemas de aplicaciones e infraestructura
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Watchdog
  tag: Notas de versiones
  text: ¡Échales un vistazo a las últimas versiones de Watchdog de Datadog! (Es necesario
    iniciar sesión en la aplicación).
- link: https://www.datadoghq.com/blog/datadog-bits-generative-ai/
  tag: Blog
  text: Presentamos Bits AI, tu nuevo copiloto DevOps.
- link: /logs/
  tag: Documentación
  text: Recopilación de logs
- link: /tracing/
  tag: Documentación
  text: Recopilar trazas
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: Blog
  text: Análisis automatizado de causas originales con Watchdog RCA
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: Blog
  text: Conocer el alcance del impacto para el usuario con el análisis de impactos
    de Watchdog
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: Blog
  text: Solución de anomalías en el rendimiento de la carga de trabajo con Watchdog
    Insights para Live Processes
kind: Documentación
title: Datadog WatchdogTM
---
## Información general

Watchdog es el motor de inteligencia artificial de Datadog que te proporciona alertas automatizadas, información y análisis de las causas originales a partir de datos observables en toda la plataforma Datadog. Watchdog supervisa continuamente tu infraestructura y llama tu atención sobre las señales más importantes, ayudándote a detectar, solucionar y resolver problemas. 

Todas las funciones de Watchdog están integradas y no requieren configuración.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/781921620/rendition/1080p/file.mp4?loc=external&signature=8889419b739e3398d03a72edca4f96909144567e045d30deeb8f9345c43a682d" poster="/images/poster/watchdog.png" >}}

<br/>

### Alertas proactivas

Watchdog calcula de forma proactiva una referencia del comportamiento esperado en tus sistemas, aplicaciones e implementaciones. Esta referencia se utiliza para detectar comportamientos anómalos.

{{< whatsnext desc="">}}
 {{< nextlink href="/watchdog/alerts">}}<u>Watchdog Alerts</u>: Cómo ver e interpretar las alertas de Watchdog: Qué información proporciona cada alerta, qué cubren las alertas y dónde encontrar las alertas de Watchdog en Datadog.{{< /nextlink >}}
  {{< nextlink href="/watchdog/faulty_deployment_detection">}}<u>Detección de implementaciones con errores</u>: Cómo encuentra Watchdog implementaciones de código con errores .{{< /nextlink >}}
{{< /whatsnext >}}

Para personalizar los algoritmos de Watchdog:
  * [Algoritmo de anomalía][7]
  * [Algoritmo de predicción][8]
  * [Algoritmo de outlier][9]

### Asistencia para la investigación

Para ayudar con la investigación, Watchdog muestra informaciones basadas en el contexto en todos los exploradores, busca las causas originales y determina el impacto en el usuario.

{{< whatsnext desc="">}}
  {{< nextlink href="/watchdog/insights">}}<u>Watchdog Insights</u>: Watchdog Insights es un motor de recomendaciones que te ayuda a identificar y resolver problemas.{{< /nextlink >}}
  {{< nextlink href="/watchdog/rca">}}<u>Análisis de causas originales</u>: Cómo el análisis de causas originales (ACR) de Watchdog encuentra la causas originales de una anomalía, y cómo utilizar la información proporcionada.{{< /nextlink >}}
  {{< nextlink href="/watchdog/impact_analysis">}}<u>Análisis de impactos</u>: Cómo Watchdog identifica cuando una anomalía afecta negativamente a los usuarios.{{< /nextlink >}}
{{< /whatsnext >}}

## Python

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][1].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/watchdog/alerts
[3]: /es/watchdog/faulty_deployment_detection/
[4]: /es/watchdog/insights?tab=logmanagement
[5]: /es/watchdog/rca/
[6]: /es/watchdog/impact_analysis/
[7]: /es/monitors/types/anomaly/#anomaly-detection-algorithms
[8]: /es/monitors/types/forecasts/?tab=linear#algorithms
[9]: /es/monitors/types/outlier/?tab=dbscan#algorithms