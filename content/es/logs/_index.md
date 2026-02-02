---
title: Log Management
description: "Configura tu Datadog Agent para recopilar logs de tu host, contenedores y servicios."
disable_sidebar: true
aliases:
  - /guides/logs/
  - /en/logs
  - /logs/logging_without_limits
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Log%20Management"
    tag: "Release Notes"
    text: "Comprueba los últimos lanzamientos de Datadog Log Management (inicio de sesión en la aplicación obligatorio)"
  - link: "/logs/log_collection/"
    tag: "Documentation"
    text: "Empezar con la recopilación de tus logs"
  - link: "https://learn.datadoghq.com/courses/intro-to-log-management"
    tag: "Learning Center"
    text: "Introducción a la Log Management"
  - link: 'https://dtdg.co/fe'
    tag: 'Foundation Enablement'
    text: 'Participa en una sesión interactiva para optimizar tu Log Management'
  - link: "https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/"
    tag: "Blog"
    text: "Acelere las investigaciones de incidencias con la detección de anomalía de log"
  - link: "https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/"
    tag: "Blog"
    text: "Monitoriza tus dispositivos IoT a escala con Datadog Log Management"
  - link: "https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/"
    tag: "Blog"
    text: "Monitoriza tus logs de cortafuegos con Datadog"
  - link: "https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/"
    tag: "Blog"
    text: "Utiliza consultas con notación CIDR para filtrar tus logs de tráfico de red"
  - link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
    tag: "Blog"
    text: "Monitorizar 1Password con Datadog Cloud SIEM"
  - link: "https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/"
    tag: "Blog"
    text: "Filtra y correlaciona logs de forma dinámica mediante subconsultas"
  - link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
    tag: "Blog"
    text: "Monitoriza logs de DNS para red y análisis de seguridad"
  - link: "https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/"
    tag: "Architecture Center"
    text: "Guía de estrategias de indexación de la Log Management con Datadog"
  - link: "https://www.datadoghq.com/blog/archive-search/"
    tag: "Blog"
    text: "Busca en tus logs históricos de forma más eficiente con Datadog Archive Search"
cascade:
    algolia:
        rank: 70
algolia:
    tags: ['logs']
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}} Participa en una sesión de capacitación introductoria o intermedia para aprender cómo la Log Management de Datadog unifica logs, métricas, y trazas (traces) en una única vista, ofreciéndote un contexto enriquecido para el análisis de los datos de logs. {{< /learning-center-callout >}}

## Información general

Registrar las partes importantes de las operaciones de su sistema es crucial para mantener el estado de la infraestructura. La infraestructura moderna tiene la capacidad de generar miles de eventos de registro por minuto. En esta situación, debe elegir qué registros enviar a una solución de administración de registros y qué registros archivar. Sin embargo, filtrar sus registros antes de enviarlos puede provocar lagunas en la cobertura o la eliminación accidental de datos valiosos.

Datadog Log Management, también conocido como Datadog logs o registro, elimina estas limitaciones al desacoplar la ingestión de registros de la indexación. Esto le permite recopilar, procesar, archivar, explorar y monitorear todos sus registros de forma rentable sin limitaciones, también conocido como Registro sin límites\*.

Registrarse sin límites* permite una experiencia de solución de problemas optimizada en el [Log Explorer][1], que le permite a usted y a sus equipos evaluar y solucionar rápidamente sus problemas de infraestructura. Proporciona un archivo intuitivo para apoyar a sus equipos de seguridad y TI durante las auditorías y evaluaciones. Registro sin límites* también alimenta [Datadog Cloud SIEM][2], que detecta amenazas de seguridad en su entorno, sin necesidad de indexar los registros.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Recopilar

Comienza a [ingerir logs][4] desde tus hosts, contenedores, proveedores de nube y otras fuentes para comenzar con Datadog Log Management.

## Configurar

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configura tus logs todos en un solo lugar" >}}

Una vez ingestados tus logs, procesa y enriquece todos tus logs con pipelines y procesadores, proporciona control de tu presupuesto de Log Management con índices, genera métricas a partir de logs ingestados, o gestiona tus logs dentro de archivos de almacenamiento optimizados con [opciones de configuración][5] de logs.

## Connect

{{< img src="/logs/connect.png" alt="Correlaciona logs con métricas o traces (trazas)" style="width:80%;">}}

Aprovecha los pilares de la observabilidad conectando tus logs a métricas y trazas (traces):

- [Conecta tus logs y trazas][6] para obtener observabilidad en tus aplicaciones.
- [Correlaciona tus logs y métricas][7] para obtener el contexto de un problema y asignarlo a través de tu servicio.

## Explorar

Comienza a explorar tus logs ingeridos en el [Log Explorer][1].

**Consejo**: Para abrir el Explorador de registros de la búsqueda global de Datadog, pulse <kbd>Cmd</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> y busque `logs`.

{{< img src="/logs/explore.png" alt="Explora tus logs ingeridos" style="width:80%;">}}

- [Buscar][8]: Busca a través de todos tus logs.
- [Live Tail][9]: Vea sus logs ingeridos en tiempo real a través de todos sus entornos.
- [Analytics][10]: Realiza análisis de log de tus logs indexados.
- [Patrones][11]: Localiza los patrones de logs agrupando tus logs indexados.
- [Saved Views][12]: Utiliza vistas guardadas para configurar automáticamente tu Log Explorer.


{{< learning-center-callout header="Prueba Introducción a la Log Management en el Centro de Aprendizaje" btn_title="Inscríbete Ahora" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}} Aprende sin costo sobre la capacidad real de computación en la nube y una cuenta de prueba de Datadog. Inscríbase hoy mismo para obtener más información sobre la recopilación de registros, las consultas, los análisis, las métricas, la supervisión, el procesamiento, el almacenamiento y el control de acceso.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<br>
\*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: /logs/explorer/
[2]: /security/cloud_siem/
[4]: /logs/log_collection/
[5]: /logs/log_configuration/
[6]: /tracing/other_telemetry/connect_logs_and_traces/
[7]: /logs/guide/correlate-logs-with-metrics/
[8]: /logs/explorer/search_syntax/
[9]: /logs/live_tail/
[10]: /logs/explorer/analytics/
[11]: /logs/explorer/patterns/
[12]: /logs/explorer/saved_views/
