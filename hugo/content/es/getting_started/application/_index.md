---
description: Descripción general de la navegación de la interfaz de usuario de Datadog,
  características clave que incluyen tableros, monitores, integraciones y capacidades
  principales de la plataforma.
further_reading:
- link: https://learn.datadoghq.com/bundles/frontend-engineer-learning-path
  tag: Centro de aprendizaje
  text: Ruta de aprendizaje para ingenieros frontend
- link: https://learn.datadoghq.com/bundles/backend-engineer-learning-path
  tag: Centro de aprendizaje
  text: Ruta de aprendizaje para ingenieros backend
- link: https://learn.datadoghq.com/bundles/site-reliability-engineer-learning-path
  tag: Centro de aprendizaje
  text: Ruta de aprendizaje para ingenieros de confiabilidad de sitios (SRE)
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para construir una base sólida de Datadog
- link: https://www.datadoghq.com/blog/datadog-quick-nav-menu/
  tag: Blog
  text: Introducción al menú de navegación rápida de Datadog
title: Primeros pasos en Datadog
---
{{< learning-center-callout header="Pruebe las habilidades principales de Datadog en el Centro de aprendizaje" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/bundles/core-skills-learning-path">}}
  Aprenda sin costo en capacidad de cómputo en la nube real y una cuenta de prueba de Datadog. Inicie estos laboratorios prácticos para ponerse al día con el etiquetado, las métricas, los monitores y los tableros.
{{< /learning-center-callout >}}

## Descripción general {#overview}

Esta página proporciona una descripción general de alto nivel de las capacidades disponibles en el [sitio de Datadog][1].

<div class="alert alert-info">
  La navegación del sitio de Datadog varía según el ancho de su navegador. Puede tener hasta tres tipos de navegación. Para cambiar el tipo de navegación, ajuste el ancho de su navegador.
  <br><br>
  Puede presionar <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> para buscar páginas y entidades, como tableros y monitores, en todo Datadog.
</div>

## Infraestructura {#infrastructure}

La [lista de infraestructura][2] sirve como una vista central de todos sus recursos de infraestructura (servidores, contenedores, procesos, etc.) y sus metadatos asociados. 

**Capacidades clave:**

- Investigue el rendimiento de la infraestructura.
- Organice, filtre y visualice servidores según etiquetas y métricas.
- Inspeccione los servidores para revisar sus etiquetas, rendimiento, estado y más.

Navegue a [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Hosts{{< /ui >}}][3] en la aplicación para comenzar. Para obtener más información, lea la [documentación de la Lista de infraestructura][2].

## Mapas de servidores y contenedores {#host-and-container-maps}

{{< img src="getting_started/application/host_map_2025.png" alt="Descripción general del mapa de servidores agrupados por zona de disponibilidad." >}}

Los [Mapas de servidores y contenedores][4] le brindan una descripción general visual de todos sus servidores y contenedores, codificándolos por colores según métricas clave como el uso de CPU para que pueda detectar problemas.

**Capacidades clave**:

- Visualice toda su infraestructura a la vez como un mapa visual.
- Codifique por colores mediante una variedad de métricas para ayudarle a detectar problemas de rendimiento, y filtre y agrupe por etiquetas y metadatos.
- Profundice en servidores o contenedores individuales para solucionar problemas.

Navegue a [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Host Map{{< /ui >}}][5] en la aplicación para comenzar. Para obtener más información, lea la [documentación de Mapas de servidores y contenedores][4].

## Log Management {#log-management}

[Datadog Log Management][6] le permite enviar y procesar cada registro producido por sus aplicaciones e infraestructura. Puede observar sus registros en tiempo real utilizando [Live Tail][7], sin indexarlos.

**Capacidades clave**:

- Recopile automáticamente registros de todos los servicios, aplicaciones y plataformas.
- Visualice y busque registros en tiempo real y filtre por elementos como servicio, servidor y tipo de error.
- Elija qué registros conservar y por cuánto tiempo, reduciendo los costos de almacenamiento.

Navegue a [{{< ui >}}Logs{{< /ui >}}][8] en la aplicación para comenzar. Para obtener más información, lea la [documentación de Log Management][6].

## APM {#apm}

[Datadog Application Performance Monitoring][9] (APM o trazas) le brinda una visión profunda del rendimiento de su aplicación junto con sus registros y seguimiento de infraestructura.

**Capacidades clave**:

- Rastree las solicitudes a una aplicación de principio a fin a través de un sistema distribuido.
- Vea los cuellos de botella de rendimiento visualizando el tiempo dedicado a cada paso de la solicitud.
- Visualice las dependencias del servicio y los flujos de datos con el Service Map.
- Correlacione las trazas con los registros, métricas y sesiones de usuario correspondientes para obtener contexto de pila completa.

Navegue a [{{< ui >}}APM{{< /ui >}}][10] en la aplicación para comenzar. Para obtener más información, lea la [documentación de APM][9].

## RUM y Session Replay {#rum-session-replay}

[Real User Monitoring][11] (RUM) de Datadog le permite visualizar y analizar las actividades y experiencias de los usuarios en tiempo real en aplicaciones web y móviles. Con [Session Replay][12], puede capturar y visualizar las sesiones de los usuarios para comprender mejor su comportamiento.

**Capacidades clave**:
- Haga un seguimiento del rendimiento en navegadores web y plataformas móviles (iOS, Android, React Native, Flutter y más) con Core Web Vitals y Mobile Vitals.
- Haga un seguimiento y solucione errores con agrupación automatizada, informes de fallos e identificación de confirmaciones sospechosas.
- Detecte señales de frustración del usuario, como clics de enojo y clics de error, para identificar problemas de UX.
- Haga un seguimiento del rendimiento y la adopción de los indicadores de funciones (feature flags).
- Correlacione problemas de frontend con trazas de backend, registros y métricas de infraestructura para obtener visibilidad de toda la pila.

Navegue a [{{< ui >}}RUM explorer{{< /ui >}}][13] en la aplicación para comenzar. Para obtener más información, lea la [documentación de RUM][11].

## Synthetic Monitoring {#synthetic-monitoring}

Datadog [Synthetic Monitoring][14] le permite crear y ejecutar pruebas de API, navegador, móviles y de Network Path que hacen un seguimiento de forma proactiva de solicitudes y acciones simuladas desde todo el mundo. Estas pruebas hacen un seguimiento de sus aplicaciones y APIs para detectar problemas de rendimiento y tiempo de inactividad antes de que afecten a los usuarios.

**Capacidades clave**:

- Pruebe puntos de conexión de API y recorridos de usuario críticos para el negocio.
- Detecte errores, identifique regresiones y automatice reversiones para evitar que los problemas surjan en producción.
- Encuentre y alerte sobre problemas de rendimiento para usuarios en diversas ubicaciones.

Navegue a [{{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}][15] en la aplicación para comenzar. Para obtener más información, lea la [documentación de Synthetic Monitoring][14].

## Integrations {#integrations}

Utilice las integraciones de Datadog {{< translate key="integration_count" >}} [integrations][16] para reunir todas las métricas y registros de su infraestructura y obtener información sobre todo su sistema de observabilidad.

{{< img src="getting_started/application/integrations-2025.png" alt="Integrations" >}}

**Capacidades clave**:

- Las integraciones disponibles cubren tecnologías en la nube, respuesta a incidentes, capas de datos, seguridad, IA y más.
- Una vez configuradas las integraciones, todos los datos se tratan de la misma manera en todo Datadog, ya sea que residan en un centro de datos o en un servicio en línea.
- Cree su propia integración utilizando la [documentación para desarrolladores][17].

Navegue a [{{< ui >}}Integrations{{< /ui >}}][18] en la aplicación para comenzar, o explore la lista de integraciones en la [documentación][19].

## Dashboards {#dashboards}

Los [Dashboards][20] contienen gráficos con métricas de rendimiento en tiempo real, lo que unifica su vista de datos a través de métricas, registros, trazas y más.

**Capacidades clave**:

- Comience con Dashboards preconfigurados o cree los suyos propios para responder a sus preguntas específicas.
- Personalice los Dashboards con widgets de arrastrar y soltar, consultas personalizadas y diseños flexibles.
- Combine varios tipos de datos (incluyendo métricas, registros, APM y RUM) en un solo lugar y visualice los datos en tiempo real.
- Anote sus gráficos con comentarios o eventos para proporcionar contexto a su equipo.

Navegue a [{{< ui >}}Dashboard List{{< /ui >}}][21] en la aplicación para comenzar. Para obtener más información, lea la [documentación de Dashboards][20].

## Monitores {#monitors}

Los [Monitores][22] proporcionan alertas y notificaciones basadas en umbrales de métricas, disponibilidad de integración, puntos finales de red y más.

- Cree monitores utilizando cualquier métrica que se reporte a Datadog.
- Cree lógica de alertas compleja utilizando múltiples condiciones de activación.
- Envíe alertas a Slack, correo electrónico, PagerDuty y más, añadiendo `@` en los mensajes de alerta para dirigir las notificaciones a las personas adecuadas.
- Programe tiempos de inactividad para suprimir las notificaciones de apagados del sistema, mantenimiento sin conexión y más.

Navegue a [{{< ui >}}Monitors List{{< /ui >}}][23] en la aplicación para comenzar. Para obtener más información, lea la [documentación de Monitors][22].

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: /es/infrastructure/list/
[3]: https://app.datadoghq.com/infrastructure
[4]: /es/infrastructure/hostmap/
[5]: https://app.datadoghq.com/infrastructure/map
[6]: /es/logs/
[7]: /es/logs/explorer/live_tail/
[8]: https://app.datadoghq.com/logs
[9]: /es/tracing/
[10]: https://app.datadoghq.com/apm/home
[11]: /es/real_user_monitoring/
[12]: /es/session_replay/
[13]: https://app.datadoghq.com/rum/sessions
[14]: /es/synthetics/
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://www.datadoghq.com/product/platform/integrations/
[17]: /es/extend/integrations/
[18]: https://app.datadoghq.com/integrations
[19]: /es/integrations/
[20]: /es/dashboards/
[21]: https://app.datadoghq.com/dashboard/lists
[22]: /es/monitors/
[23]: https://app.datadoghq.com/monitors/manage