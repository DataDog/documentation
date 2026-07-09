---
algolia:
  tags:
  - logs
aliases:
- /es/guides/logs/
- /es/en/logs
- /es/logs/logging_without_limits
cascade:
  algolia:
    rank: 70
description: Configura tu Agente de Datadog para recopilar registros de tu host, contenedores
  y servicios.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: Notas de la versión
  text: Consulta las últimas versiones de Log Management de Datadog (se requiere inicio
    de sesión en la aplicación)
- link: /logs/log_collection/
  tag: Documentación
  text: Comienza a recopilar tus registros
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Centro de Aprendizaje
  text: Introducción a Log Management
- link: https://dtdg.co/fe
  tag: Habilitación de Fundamentos
  text: Únete a una sesión interactiva para optimizar tu Log Management
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: Blog
  text: Acelera las investigaciones de incidentes con la Detección de Anomalías en
    Registros
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: Blog
  text: Monitorea tus dispositivos IoT a gran escala con Log Management de Datadog
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: Blog
  text: Monitorea los registros de tu firewall con Datadog
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utiliza consultas en notación CIDR para filtrar los registros de tráfico de
    tu red
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitorea 1Password con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: Blog
  text: Filtra y correlaciona registros dinámicamente utilizando Subconsultas
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Monitorea los registros DNS para análisis de red y seguridad
- link: https://www.datadoghq.com/blog/archive-search/
  tag: Blog
  text: Busca tus registros históricos de manera más eficiente con la Búsqueda de
    Archivos de Datadog
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Detecta nombres humanos en registros con ML en Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/monitoring-load-balancer-logs
  tag: Blog
  text: Monitorea los registros de tu aplicación y de tu balanceador de carga de red
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Centro de Arquitectura
  text: Una guía para las Estrategias de Indexación de Log Management con Datadog
title: Log Management
---
{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrate" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}}
  Únete a una sesión de habilitación introductoria o intermedia para aprender cómo Log Management de Datadog unifica registros, métricas y trazas en una sola vista, brindándote un contexto rico para analizar los datos de registro.
{{< /learning-center-callout >}}

## Descripción General {#overview}

Registrar las partes importantes de las operaciones de tu sistema es crucial para mantener la salud de la infraestructura. La infraestructura moderna tiene la capacidad de generar miles de eventos de registro por minuto. En esta situación, necesitas elegir qué registros enviar a una solución de Log Management y cuáles archivar. Filtrar tus registros antes de enviarlos, sin embargo, puede llevar a brechas en la cobertura o a la eliminación accidental de datos valiosos.

Datadog Log Management, también conocido como Datadog logs o logging, elimina estas limitaciones al desacoplar la ingestión de logs de la indexación. Esto te permite recopilar, procesar, archivar, explorar y monitorear todos tus registros de manera rentable y sin limitaciones, también conocido como Logging without Limits\*.

Logging without Limits\* permite una experiencia de solución de problemas simplificada en el [Log Explorer][1], que permite a ti y a tus equipos evaluar y solucionar rápidamente los problemas de tu infraestructura. Ofrece un sistema de archivado intuitivo para apoyar a tus equipos de seguridad y TI durante auditorías y evaluaciones. Logging without Limits* también potencia [Datadog Cloud SIEM][2], que detecta amenazas de seguridad en tu entorno, sin requerir que indexes registros.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Collect {#collect}

Comienza a [ingerir logs][4] desde tus servidores, contenedores, proveedores de nube y otras fuentes para comenzar con Log Management de Datadog.

## Configure {#configure}

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configura tus registros todo en un solo lugar" >}}

Una vez que se ingesten tus logs, procesa y enriquece todos tus logs con canalizaciones y procesadores, proporciona control de tu presupuesto de Log Management con índices, genera métricas a partir de los logs ingeridos, o gestiona tus logs dentro de archivos optimizados para almacenamiento con [opciones de configuración de logs][5].

## Conectar {#connect}

{{< img src="/logs/connect.png" alt="Correlaciona logs con métricas o trazas" style="width:80%;">}}

Aprovecha los pilares de la observabilidad conectando tus logs a métricas y trazas:

- [Connect your logs and traces][6] to gain observability into your applications.
- [Correlate your logs and metrics][7] to gain context of an issue and map it throughout your service.

## Explore {#explore}

Comienza a explorar tus registros ingeridos en el [Log Explorer][1].

**Tip**: To open the Log Explorer from Datadog's global search, press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> and search for `logs`.

{{< img src="/logs/explore.png" alt="Explora tus logs ingeridos" style="width:80%;">}}

- [Search][8]: Search through all of your logs.
- [Live Tail][9]: See your ingested logs in real time across all your environments.
- [Analytics][10]: Perform Log Analytics over your indexed logs.
- [Patterns][11]: Spot log patterns by clustering your indexed logs together.
- [Saved Views][12]: Use Saved Views to automatically configure your Log Explorer.


{{< learning-center-callout header="Prueba Introduction to Log Management en el Centro de Aprendizaje" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  Aprende sin costo en capacidad de computación en la nube real y una cuenta de prueba de Datadog. Inscríbete hoy para aprender más sobre la recolección de registros, las consultas, la analítica, las métricas, el monitoreo, el procesamiento, el almacenamiento y el control de acceso.
{{< /learning-center-callout >}}

## Further Reading {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/explorer/
[2]: /es/security/cloud_siem/
[4]: /es/logs/log_collection/
[5]: /es/logs/log_configuration/
[6]: /es/tracing/other_telemetry/connect_logs_and_traces/
[7]: /es/logs/guide/correlate-logs-with-metrics/
[8]: /es/logs/explorer/search_syntax/
[9]: /es/logs/live_tail/
[10]: /es/logs/explorer/analytics/
[11]: /es/logs/explorer/patterns/
[12]: /es/logs/explorer/saved_views/