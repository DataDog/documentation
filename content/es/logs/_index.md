---
aliases:
- /es/guides/logs/
- /es/en/logs
- /es/logs/logging_without_limits
cascade:
  algolia:
    rank: 70
description: Configurar tu Datadog Agent para recopilar logs de tu host, contenedores
  y servicios.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: Notas de la versión
  text: Comprueba los últimos lanzamientos de Datadog Log Management (inicio de sesión
    en la aplicación obligatorio)
- link: /logs/log_collection/
  tag: Documentación
  text: Empieza a recopilar tus logs
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Centro de aprendizaje
  text: Introducción a la Log Management
- link: https://dtdg.co/fe
  tag: Establecer las bases
  text: Participa en una sesión interactiva para optimizar tu Log Management
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: Blog
  text: Acelera las investigaciones de incidencias con la detección de anomalía de
    log
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: Blog
  text: Monitoriza tus dispositivos IoT a escala con Datadog Log Management
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: Blog
  text: Monitoriza tus logs de cortafuegos con Datadog
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utiliza consultas con notación CIDR para filtrar tus logs de tráfico de red
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitorizar 1Password con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: Blog
  text: Filtra y correlaciona logs de forma dinámica mediante subconsultas
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Monitoriza logs de DNS para red y análisis de seguridad
title: Gestión de logs
---

## Información general

Registrar las partes importantes de las operaciones de tu sistema es crucial para mantener el estado de la infraestructura. La infraestructura moderna tiene la capacidad de generar miles de eventos de log por minuto. En esta situación, debes elegir qué logs enviar a una solución de gestión de logs, y qué logs archivar. Sin embargo, filtrar los logs antes de enviarlos puede provocar lagunas en la cobertura o la eliminación accidental de datos valiosos.

Datadog Log Management, también denominado como logs de Datadog o logging, elimina estas limitaciones desacoplando la ingesta de logs desde la indexación. Esto te permite recopilar, procesar, archivar, explorar y monitorizar de forma rentable todos tus logs sin limitaciones, también conocido como Logging without Limits\*.

Logging without Limits\* permite agilizar la experiencia de solucionar problemas en el [Log Explorer][1], lo que te permite a ti y a tus equipos evaluar y solucionar rápidamente los problemas de infraestructura. Proporciona un archivado intuitivo para ayudar a tus equipos de seguridad y TI durante las auditorías y evaluaciones. Logging without Limits* también impulsa [Datadog Cloud SIEM][2], que detecta amenazas a la seguridad en tu entorno, sin necesidad de indexar logs.

**Nota**: Consulta [Cumplimiento de PCI DSS][3] para obtener información sobre la creación de una organización de Datadog que cumple con la PCI.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Recopilar

Comienza [por ingerir logs][4] desde tus hosts, contenedores, proveedores de nube y otras fuentes para comenzar con Datadog Log Management.

## Configurar

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configura tus logs todos en un solo lugar" >}}

Una vez ingestados tus logs, procesa y enriquece todos tus logs con pipelines y procesadores, proporciona control de tu presupuesto de Log Management con índices, genera métricas a partir de logs ingestados, o gestiona tus logs dentro de archivos de almacenamiento optimizados con [opciones de configuración de logs][5].

## Conectar

{{< img src="/logs/connect.png" alt="Correlaciona logs con métricas o traces (trazas)" style="width:80%;">}}

Aprovecha los pilares de la observabilidad conectando tus logs a métricas y trazas (traces):

- [Conecta tus logs y trazas][6] para obtener observabilidad en tus aplicaciones.
- [Correlaciona tus logs y métricas][7] para obtener el contexto de un problema y asignarlo a través de tu servicio.

## Explorar

Comienza a explorar tus logs ingeridos en el [Log Explorer][1].

{{< img src="/logs/explore.png" alt="Explora tus logs ingeridos" style="width:80%;">}}

- [Buscar][8]: busca a través de todos tus logs.
- [Cola en vivo][9]: ve tus logs ingeridos en tiempo real a través de todos tus entornos.
- [Análisis][10]: realiza análisis de log de tus logs indexados.
- [Patrones][11]: ubica los patrones de logs agrupando tus logs indexados.
- [Vistas guardadas][12]: utiliza las vistas guardadas para configurar automáticamente tu Log Explorer.


{{< learning-center-callout header="Prueba la introducción a Log Management en el Centro de aprendizaje" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  Aprende sin coste alguno sobre la capacidad real de computación en la nube y una cuenta de prueba de Datadog. Inscríbete hoy mismo para obtener más información sobre la recopilación, consulta, análisis, métricas, monitorización, procesamiento, almacenamiento y control de acceso de logs.
{{< /learning-center-callout >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /es/logs/explorer/
[2]: /es/security/cloud_siem/
[3]: /es/data_security/pci_compliance/
[4]: /es/logs/log_collection/
[5]: /es/logs/log_configuration/
[6]: /es/tracing/other_telemetry/connect_logs_and_traces/
[7]: /es/logs/guide/correlate-logs-with-metrics/
[8]: /es/logs/explorer/search_syntax/
[9]: /es/logs/live_tail/
[10]: /es/logs/explorer/analytics/
[11]: /es/logs/explorer/patterns/
[12]: /es/logs/explorer/saved_views/