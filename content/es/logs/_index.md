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
  text: Consulta las últimas versiones de Gestión de Registros de Datadog (se requiere
    inicio de sesión en la aplicación)
- link: /logs/log_collection/
  tag: Documentación
  text: Comienza a recopilar tus registros
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Centro de aprendizaje
  text: Introducción a la Gestión de Registros
- link: https://dtdg.co/fe
  tag: Establecer las bases
  text: Únete a una sesión interactiva para optimizar tu Gestión de Registros
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: Blog
  text: Acelera las investigaciones de incidentes con la Detección de Anomalías en
    Registros
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: Blog
  text: Monitorea tus dispositivos IoT a gran escala con la Gestión de Registros de
    Datadog
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
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Centro de arquitectura
  text: Una guía sobre Estrategias de Indexación en la Gestión de Registros con Datadog
- link: https://www.datadoghq.com/blog/archive-search/
  tag: Blog
  text: Busca tus registros históricos de manera más eficiente con la Búsqueda de
    Archivos de Datadog
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Detecta nombres humanos en registros con ML en el Escáner de Datos Sensibles
title: Gestión de Registros
---
{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}}
  Únete a una sesión de habilitación introductoria o intermedia para aprender cómo la Gestión de Registros de Datadog unifica registros, métricas y trazas en una sola vista, brindándote un contexto rico para analizar datos de registros.
{{< /learning-center-callout >}}

## Resumen

Registrar las partes importantes de las operaciones de tu sistema es crucial para mantener la salud de la infraestructura. La infraestructura moderna tiene la capacidad de generar miles de eventos de registro por minuto. En esta situación, necesitas elegir qué registros enviar a una solución de gestión de registros y cuáles archivar. Filtrar tus registros antes de enviarlos, sin embargo, puede llevar a brechas en la cobertura o a la eliminación accidental de datos valiosos.

La Gestión de Registros de Datadog, también conocida como registros de Datadog o logging, elimina estas limitaciones al desacoplar la ingestión de registros de la indexación. Esto te permite recopilar, procesar, archivar, explorar y monitorear todos tus registros de manera rentable, también conocido como Logging sin Límites\*.

Logging sin Límites\* permite una experiencia de solución de problemas simplificada en el [Explorador de Registros][1], lo que te empodera a ti y a tus equipos para evaluar y solucionar rápidamente los problemas de tu infraestructura. Proporciona un archivo intuitivo para apoyar a tus equipos de seguridad y TI durante auditorías y evaluaciones. Logging sin Límites* también potencia [Datadog Cloud SIEM][2], que detecta amenazas de seguridad en tu entorno, sin requerir que indexes registros.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Recopilar

Comienza [a ingerir registros][4] desde tus hosts, contenedores, proveedores de nube y otras fuentes para comenzar con la Gestión de Registros de Datadog.

## Configurar

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configura tus registros todo en un solo lugar" >}}

Una vez que tus registros son ingeridos, procesa y enriquece todos tus registros con pipelines y procesadores, proporciona control de tu presupuesto de gestión de registros con índices, genera métricas a partir de registros ingeridos, o gestiona tus registros dentro de archivos optimizados para almacenamiento con [Opciones de Configuración de Registros][5].

## Conectar

{{< img src="/logs/connect.png" alt="Correlaciona registros con métricas o trazas" style="width:80%;">}}

Aprovecha los pilares de la observabilidad conectando tus registros a métricas y trazas:

- [Conecta tus registros y trazas][6] para obtener visibilidad en tus aplicaciones.
- [Correlaciona tus registros y métricas][7] para obtener contexto de un problema y mapearlo a lo largo de tu servicio.

## Explorar

Comienza a explorar tus registros ingeridos en el [Explorador de Registros][1].

**Consejo**: Para abrir el Explorador de Registros desde la búsqueda global de Datadog, presiona <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busca `logs`.

{{< img src="/logs/explore.png" alt="Explora tus registros ingeridos" style="width:80%;">}}

- [Buscar][8]: Busca entre todos tus registros.
- [Live Tail][9]: Ve tus registros ingeridos en tiempo real en todos tus entornos.
- [Analítica][10]: Realiza análisis de registros sobre tus registros indexados.
- [Patrones][11]: Identifica patrones de registros agrupando tus registros indexados.
- [Vistas Guardadas][12]: Usa vistas guardadas para configurar automáticamente tu Explorador de Registros.


{{< learning-center-callout header="Prueba la Introducción a la Gestión de Registros en el Centro de Aprendizaje" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  Aprende sin costo sobre capacidad de computación en la nube real y una cuenta de prueba de Datadog. Inscríbete hoy para aprender más sobre recolección de registros, consultas, analítica, métricas, monitoreo, procesamiento, almacenamiento y control de acceso.
{{< /learning-center-callout >}}

## Lectura Adicional

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits es una marca registrada de Datadog, Inc.

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