---
description: Información general de la navegación por la interfaz de usuario de Datadog,
  características clave como dashboards, monitores, integraciones y capacidades básicas
  de la plataforma.
further_reading:
- link: https://learn.datadoghq.com/bundles/frontend-engineer-learning-path
  tag: Centro de aprendizaje
  text: Ruta de aprendizaje del ingeniero de frontend
- link: https://learn.datadoghq.com/bundles/backend-engineer-learning-path
  tag: Centro de aprendizaje
  text: Trayectoria de aprendizaje del ingeniero de backend
- link: https://learn.datadoghq.com/bundles/site-reliability-engineer-learning-path
  tag: Centro de aprendizaje
  text: Ruta de aprendizaje del ingeniero de fiabilidad del sitio
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participa en una sesión interactiva para construir una base sólida de Datadog
- link: https://www.datadoghq.com/blog/datadog-quick-nav-menu/
  tag: Blog
  text: Introducción al menú de navegación rápida de Datadog
title: Empezando en Datadog
---

{{< learning-center-callout header="Prueba Datadog Core Skills en el centro de aprendizaje" btn_title="Inscríbete ahora" btn_url="https://learn.datadoghq.com/bundles/core-skills-learning-path">}}
  Aprende sin coste alguno con capacidad real de computación en la nube y una cuenta de prueba de Datadog. Inicia estos laboratorios prácticos para ponerte al día con el etiquetado, las métricas, los monitores y los dashboards.
{{< /learning-center-callout >}}

## Información general

Esta página ofrece información general de alto nivel sobre las funciones disponibles en el [sitio de Datadog][1].

<div class="alert alert-info">
  La navegación del sitio de Datadog varía según el ancho de tu navegador. Puedes tener hasta tres tipos de navegación. Para cambiar el tipo de navegación, ajusta el ancho de tu navegador.
  <br><br>
  Puedes presionar <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> para buscar páginas y entidades, como dashboards y monitores, en todo Datadog.
</div>

## infraestructura

La [lista de infraestructura][2] sirve como vista central de todos tus recursos de infraestructura (hosts, contenedores, procesos, etc.) y sus metadatos asociados. 

**Capacidades clave:**

- Investiga el rendimiento de las infraestructuras.
- Ordena, filtra y visualiza hosts en función de etiquetas y métricas.
- Inspecciona los hosts para revisar sus etiquetas, rendimiento, estado, etc.

Ve a [**Infrastructure > Hosts**][3] (Infraestructura > Hosts) en la aplicación para empezar. Para obtener más información, lee la [documentación de la Lista de infraestructuras][2].

## Mapas de hosts y contenedores

{{< img src="getting_started/application/host_map_2025.png" alt="Información general del mapa de hosts agrupada por zona de disponibilidad." >}}

Los [mapas de hosts y contenedores][4] te ofrecen una visión general de todos tus hosts y contenedores, codificados por colores según métricas clave como el uso de la CPU, para que puedas detectar los problemas.

**Capacidades clave**:

- Ve toda tu infraestructura a la vez en un mapa visual.
- Codifica por colores según diversas métricas para detectar problemas de rendimiento, y filtra y agrupa por etiquetas y metadatos.
- Analiza en detalle hosts o contenedores individuales para solucionar problemas.

Ve a [**Infrastructure > Host Map**][5] (Infraestructura > Mapa de hosts) en la aplicación para empezar. Para obtener más información, lee la [documentación de Mapas de hosts y contenedores][4].

## Gestión de Logs

[Datadog Log Management][6] te permite enviar y procesar cada log producido por tus aplicaciones e infraestructura. Puedes observar tus logs en tiempo real utilizando [Live Tail][7], sin indexarlos.

**Capacidades clave**:

- Recopila automáticamente logs de todos los servicios, aplicaciones y plataformas.
- Ve y busca logs en tiempo real y filtra por elementos como servicio, host y tipo de error.
- Elige qué logs conservar y durante cuánto tiempo, reduciendo así los costes de almacenamiento.

Navega hasta [Logs][8] en la aplicación para empezar. Para obtener más información, consulta la [documentación de Log Management][6].

## APM

[Datadog Application Performance Monitoring][9] (APM o rastreo) te proporciona una visión profunda del rendimiento de tu aplicación junto con tus logs y la monitorización de la infraestructura.

**Capacidades clave**:

- Rastrea las solicitudes a una aplicación de extremo a extremo a través de un sistema distribuido.
- Ve los cuellos de botella de rendimiento visualizando el tiempo empleado en cada paso de la solicitud.
- Visualiza las dependencias de los servicios y los flujos de datos con el mapa de servicios.
- Correlaciona las trazas con los correspondientes logs, métricas y sesiones de usuario para obtener un contexto completo.

Navega hasta [APM][10] en la aplicación para empezar. Para obtener más información, lee la [documentación de APM][9].

## RUM y Session Replay

Datadog [Real User Monitoring][11] (RUM) te permite visualizar y analizar en tiempo real las actividades y experiencias de los usuarios en aplicaciones web y móviles. Con [Session Replay][12], puedes capturar y visualizar sesiones de usuario para comprender mejor su comportamiento.

**Capacidades clave**:
- Monitoriza el rendimiento de los navegadores web y plataformas móviles (iOS, Android, React Native, Flutter, etc.) con Core Web Vitals y Mobile Vitals.
- Realiza un seguimiento de los errores y resuélvelos con agrupaciones automatizadas, informes de fallos e identificación de confirmaciones sospechosas.
- Detecta señales de frustración del usuario, como clics repetidos y clics de error, para identificar problemas de UX.
- Monitoriza el rendimiento y adopción de los indicadores de características.
- Correlaciona los problemas del frontend con las trazas de backend, logs y las métricas de infraestructura para obtener una visibilidad completa.

Navega hasta el [RUM Explorer][13] en la aplicación para empezar. Para obtener más información, lee la [documentación de RUM][11].

## Synthetic Monitoring

Datadog [Synthetic Monitoring][14] te permite crear y ejecutar tests de API, navegador, móvil y Network Path que monitorizan de forma proactiva solicitudes y acciones simuladas de todo el mundo. Estos tests monitorizan tus aplicaciones y APIs para detectar problemas de rendimiento y tiempos de inactividad antes de que afecten a los usuarios.

**Capacidades clave**:

- Testea endpoints de la API críticos para la empresa y recorridos del usuario.
- Detecta errores, identifica regresiones y automatiza las reversiones para evitar que surjan problemas en la producción.
- Detecta problemas de rendimiento de los usuarios en distintas ubicaciones y alerta sobre ellos.

Ve a [Synthetic Monitoring & Testing][15] (Synthetic Monitoring y Tests) en la aplicación para empezar. Para obtener más información, lee la [documentación de Synthetic Monitoring][14].

## Integraciones

Utiliza las {{< translate key="integration_count" >}} [integraciones][16] de Datadog para reunir todas las métricas y logs de tu infraestructura y obtener información sobre todo tu sistema de observabilidad.

{{< img src="getting_started/application/integrations-2025.png" alt="Integraciones" >}}

**Capacidades clave**:

- Las integraciones disponibles abarcan tecnologías en la nube, respuesta a incidentes, capas de datos, seguridad, IA y mucho más.
- Una vez configuradas las integraciones, todos los datos reciben el mismo tratamiento en Datadog, tanto si se encuentran en un centro de datos como en un servicio en línea.
- Construye tu propia integración utilizando la [documentación para desarrolladores][17].

Ve a [Integraciones][18] en la aplicación para empezar, o consulta la lista de integraciones en la [documentación][19].

## Dashboards

Los [dashboards][20] contienen gráficos con métricas de rendimiento en tiempo real, de manera que unifica tu visión de los datos a través de métricas, logs, trazas y más.

**Capacidades clave**:

- Empieza con los dashboards predefinidos o crea los tuyos propios para adaptarlos a tus preguntas específicas.
- Personaliza los dashboards con widgets de arrastrar y soltar, consultas personalizadas y diseños flexibles.
- Combina varios tipos de datos (incluidas métricas, logs, APM y RUM) en un solo lugar y visualiza los datos en tiempo real.
- Anota tus gráficos con comentarios o eventos para el contexto de tu equipo.

Navega hasta [Dashboard List][21] (Listas de dashboards) en la aplicación para empezar. Para obtener más información, lee la [Documentación sobre dashboards][20].

## Monitores

Los [monitores][22] proporcionan alertas y notificaciones basadas en umbrales de métricas, disponibilidad de integración, endpoints de red, etc.

- Crea monitores utilizando cualquier métrica que informe a Datadog.
- Construye lógicas de alerta complejas utilizando múltiples condiciones de activación.
- Envía alertas a Slack, correo electrónico, PagerDuty y más, añadiendo`@` en los mensajes de alerta para dirigir las notificaciones a las personas adecuadas.
- Programa un horario de tiempos de inactividad para suprimir las notificaciones de caídas del sistema, mantenimiento fuera de línea, etc.

Navega hasta la [Monitors List][23] (Lista de monitores) de la aplicación para empezar. Para obtener más información, consulta la [documentación de monitores][22].

## Referencias adicionales
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
[12]: /es/real_user_monitoring/session_replay/browser/
[13]: https://app.datadoghq.com/rum/sessions
[14]: /es/synthetics/
[15]: https://app.datadoghq.com/synthetics/tests
[16]: https://www.datadoghq.com/product/platform/integrations/
[17]: /es/developers/integrations/
[18]: https://app.datadoghq.com/integrations
[19]: /es/integrations/
[20]: /es/dashboards/
[21]: https://app.datadoghq.com/dashboard/lists
[22]: /es/monitors/
[23]: https://app.datadoghq.com/monitors/manage