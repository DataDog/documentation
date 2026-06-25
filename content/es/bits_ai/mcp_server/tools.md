---
algolia:
  rank: 70
  tags:
  - mcp
  - mcp server
  - mcp tools
  - tools
description: Navega por todas las herramientas disponibles en el Servidor MCP de Datadog,
  organizadas por conjunto de herramientas, con ejemplos de indicaciones.
further_reading:
- link: bits_ai/mcp_server
  tag: Documentación
  text: Servidor MCP de Datadog
- link: bits_ai/mcp_server/setup
  tag: Documentación
  text: Configura el Servidor MCP de Datadog
title: Herramientas del Servidor MCP de Datadog
---
Las siguientes herramientas están disponibles en el Servidor MCP de Datadog. Cada entrada incluye el conjunto de herramientas requerido, permisos y ejemplos de indicaciones. Las herramientas están agrupadas por [conjuntos de herramientas][1], lo que te permite usar solo las herramientas que necesitas, ahorrando valioso espacio en la ventana de contexto.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Para habilitar herramientas específicas del producto, incluye el parámetro de consulta `toolsets` al final de la URL del endpoint que utilizas para conectarte al Servidor MCP de Datadog. Por ejemplo, según el [sitio de Datadog][2] que seleccionaste ({{< region-param key="dd_site_name" >}}), esta URL habilita _solo_ herramientas de Observabilidad APM y LLM:

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

[2]: /es/getting_started/site/
{{< /site-region >}}

Consulta [Configura el Servidor MCP de Datadog][1] para obtener más información sobre cómo conectarte al Servidor MCP y habilitar conjuntos de herramientas.

<div class="alert alert-info">Las herramientas del Servidor MCP de Datadog están en un desarrollo significativo y están sujetas a cambios. Utiliza <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">este formulario de retroalimentación</a> para compartir cualquier comentario, casos de uso o problemas encontrados con tus indicaciones y consultas.</div>

## Herramientas principales {#core-tools}

El conjunto de herramientas predeterminado para registros, métricas, trazas, tableros, monitores, incidentes, hosts, servicios, eventos y notebooks.

### `search_datadog_events` {#search-datadog-events}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Events` y `Timeseries`*\
Busca eventos como alertas de monitoreo, notificaciones de despliegue, cambios en la infraestructura, hallazgos de seguridad y cambios en el estado del servicio.

- Muéstrame todos los eventos de despliegue de las últimas 24 horas.
- Encuentra eventos relacionados con nuestro entorno de producción con estado de error.
- Obtén eventos etiquetados con `service:api` de la última hora.

**Nota**: Consulta la [Event Management API][15] para más detalles.

### `get_datadog_incident` {#get-datadog-incident}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Incidents Read`*\
Recupera información detallada sobre un incidente.

- Obtén detalles del incidente ABC123.
- ¿Cuál es el estado del incidente ABC123?
- Recupera toda la información sobre el incidente de Redis de ayer.

**Nota**: La herramienta está operativa, pero no incluye datos de la línea de tiempo del incidente.

### `get_datadog_metric` {#get-datadog-metric}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Cloud Cost Management Read` o `Metrics` o `Timeseries`*\
Consulta y analiza datos métricos históricos o en tiempo real, apoyando consultas y agregaciones personalizadas.

- Muéstrame las métricas de utilización de CPU para todos los hosts en las últimas 4 horas.
- Obtén métricas de latencia de Redis para el entorno de producción.
- ¿Cuánto cambiaron mis costos en la nube de enero a febrero?

### `get_datadog_metric_context` {#get-datadog-metric-context}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Cloud Cost Management Read` o `Metrics`*\
Recupera información detallada sobre una métrica, incluyendo metadatos, etiquetas disponibles y valores de etiquetas para filtrar y agrupar.

- ¿Qué etiquetas están disponibles para la métrica `system.cpu.user`?
- Muéstrame todos los valores posibles para la etiqueta `env` en `redis.info.latency_ms`.
- Obtén metadatos y dimensiones para la métrica `requests.count`.

### `search_datadog_monitors` {#search-datadog-monitors}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Monitors Read`*\
Recupera información sobre los monitores de Datadog, incluyendo sus estados, umbrales y condiciones de alerta.

- Lista todos los monitores que están actualmente alertando.
- Muéstrame los monitores relacionados con nuestro servicio de pagos.
- Encuentra monitores etiquetados con `team:infrastructure`.

### `get_datadog_trace` {#get-datadog-trace}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `APM Read`*\
Recupera una traza completa de Datadog APM utilizando un ID de traza.

- Obtén la traza completa para el ID 7d5d747be160e280504c099d984bcfe0.
- Muéstrame todos los tramos para la traza abc123 con información de tiempo.
- Recupera los detalles de la traza, incluyendo consultas a la base de datos para el ID xyz789.

**Nota**: Las trazas grandes con miles de tramos pueden ser truncadas (y se indicará como tal) sin una forma de recuperar todos los tramos.

### `search_datadog_dashboards` {#search-datadog-dashboards}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Dashboards Read` y `User Access Read`*\
Lista los tableros de Datadog disponibles y detalles clave.

- Muéstrame todos los tableros disponibles en nuestra cuenta.
- Lista de tableros relacionados con la monitorización de infraestructura.
- Encuentra tableros compartidos para el equipo de ingeniería.

**Nota**: Esta herramienta lista tableros relevantes pero proporciona detalles limitados sobre su contenido. Utiliza `get_datadog_dashboard` para recuperar definiciones completas de widgets.

### `get_datadog_notebook` {#get-datadog-notebook}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Notebooks Read`*\
Recupera información detallada sobre un notebook específico por ID, incluyendo nombre, estado y autor.

- Obtén detalles del notebook abc-123-def.
- Muéstrame el contenido del notebook de depuración de ayer.

### `search_datadog_notebooks` {#search-datadog-notebooks}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Notebooks Read`*\
Lista y busca notebooks de Datadog con filtrado por autor, etiquetas y contenido.

- Muéstrame todos los notebooks creados por el equipo de plataforma.
- Encuentra notebooks relacionados con la investigación de rendimiento.
- Lista notebooks etiquetados con `incident-response`.

### `search_datadog_hosts` {#search-datadog-hosts}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Hosts Read` y `Timeseries`*\
Lista y proporciona información sobre servidores monitoreados, soportando filtrado y búsqueda.

- Muéstrame todos los servidores en nuestro entorno de producción.
- Lista servidores no saludables que no han reportado en la última hora.
- Obtén todos los servidores etiquetados con `role:database`.

### `search_datadog_incidents` {#search-datadog-incidents}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Incidents Read`*\
Recupera una lista de incidentes de Datadog, incluyendo su estado, severidad y metadatos.

- Muéstrame todos los incidentes activos por severidad.
- Lista los incidentes resueltos de la última semana.
- Encuentra incidentes que impacten a los clientes.

### `search_datadog_metrics` {#search-datadog-metrics}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Metrics`*\
Lista las métricas disponibles, con opciones para filtrar y metadatos.

- Muéstrame todas las métricas de Redis disponibles.
- Lista las métricas relacionadas con la CPU para nuestra infraestructura.
- Encuentra métricas etiquetadas con `service:api`.

### `search_datadog_services` {#search-datadog-services}
*Conjunto de herramientas: **core***\
*Permisos Requeridos: `Service Catalog Read`*\
Lista servicios en el Software Catalog de Datadog con detalles e información del equipo.

- Muéstrame todos los servicios en nuestra arquitectura de microservicios.
- Lista servicios propiedad del equipo de plataforma.
- Encuentra servicios relacionados con el procesamiento de pagos.

### `search_datadog_service_dependencies` {#search-datadog-service-dependencies}
*Conjunto de herramientas: **core***\
*Permisos Requeridos: `APM Read` y `Service Catalog Read` y `Teams Read`*\
Recupera las dependencias de servicios (ascendentes/descendentes) y los servicios que pertenecen a un equipo.

- Muéstrame todos los servicios ascendentes que llaman al servicio de checkout.
- ¿De qué servicios aguas abajo depende la API de pagos?
- Enumera todos los servicios que pertenecen al equipo de plataforma.

### `search_datadog_spans` {#search-datadog-spans}
*Conjunto de herramientas: **core***\
*Permisos Requeridos: `APM Read`*\
Recupera tramos de trazas de APM con filtros como servicio, tiempo, recurso, etc.

- Muéstrame tramos con errores del servicio de checkout.
- Encuentra consultas lentas a la base de datos en los últimos 30 minutos.
- Obtén los tramos para las solicitudes de API fallidas a nuestro servicio de pagos.

### `analyze_datadog_logs` {#analyze-datadog-logs}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Logs Read Data` y `Logs Read Index Data` y `Timeseries`*\
Analiza los registros de Datadog utilizando consultas SQL para conteos, agregaciones y análisis numérico. Utiliza esto para análisis estadístico.

- Cuenta los registros de errores por servicio en la última hora.
- Muéstrame los 10 códigos de estado HTTP principales con sus conteos.
- ¿Qué servicios estaban registrando más durante ese período de tiempo?

### `search_datadog_logs` {#search-datadog-logs}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Logs Read Data` y `Logs Read Index Data`*\
Busca registros con filtros (tiempo, consulta, servicio, host, nivel de almacenamiento, etc.) y devuelve los detalles del registro. Renombrado de `get_logs`.

- Muéstrame los registros de errores del servicio nginx en la última hora.
- Encuentra registros que contengan 'tiempo de conexión agotado' de nuestro servicio de API.
- Obtén todos los registros de código de estado 500 de producción.

### `search_datadog_rum_events` {#search-datadog-rum-events}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `RUM Apps Read`*\
Busca eventos de RUM de Datadog utilizando sintaxis de consulta avanzada.

- Muestra errores de JavaScript y advertencias de consola en RUM.
- Encuentra páginas que están cargando lentamente (más de 3 segundos).
- Muestra interacciones recientes de usuarios en las páginas de detalles del producto.

### `create_datadog_notebook` {#create-datadog-notebook}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Notebooks Read` y `Notebooks Write`*\
Crea un nuevo notebook de Datadog.

- Crea un notebook para documentar la investigación sobre el aumento de latencia del servicio de checkout.
- Crea un nuevo notebook para nuestra revisión de rendimiento semanal.

### `edit_datadog_notebook` {#edit-datadog-notebook}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Notebooks Read` y `Notebooks Write`*\
Edita un notebook de Datadog existente.

- Agrega una sección al notebook abc-123-def con los últimos resultados del análisis de registros.
- Actualiza el notebook de respuesta a incidentes con los hallazgos de hoy.

## Alerting {#alerting}

Herramientas para validar monitores, buscar grupos de monitor y recuperar plantillas de monitor.

### `validate_datadog_monitor` {#validate-datadog-monitor}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Valida una definición de monitor para verificar su corrección antes de crearla o actualizarla.

- Valida esta definición de monitor antes de que la cree.
- Verifica si la sintaxis de mi consulta de monitor es correcta.

### `get_datadog_monitor_templates` {#get-datadog-monitor-templates}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Recupera las plantillas de monitor disponibles para ayudarte a crear monitores.

- Muéstrame las plantillas de monitor disponibles.
- ¿Qué plantillas puedo usar para crear un nuevo monitor?

### `search_datadog_monitor_groups` {#search-datadog-monitor-groups}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Busca grupos de monitor por nombre o criterios.

- Muéstrame todos los grupos de monitor en un estado de alerta.
- Encuentra grupos de monitor relacionados con el servicio de checkout.

### `search_datadog_slos` {#search-datadog-slos}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `SLOs Read`*\
Busca SLOs de Datadog por nombre, etiquetas o tipo. Soporta la sintaxis de consulta para filtrar por servicio, equipo u otros atributos.

- Busca SLOs relacionados con `service:checkout`.
- Lista todos los SLOs etiquetados con `team:backend`.
- Lista los SLOs para el servicio de pagos.

### `create_datadog_monitor` {#create-datadog-monitor}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Write`*\
Crea un monitor de Datadog en modo borrador. Los monitores creados con esta herramienta no envían notificaciones y están configurados con prioridad 5 (baja). Usa `validate_datadog_monitor` para verificar la definición antes de crear y `get_datadog_monitor_templates` para ejemplos de sintaxis de consulta. Después de la creación, publica el monitor en la interfaz de usuario de Datadog.

- Crea un monitor de alerta de métrica para el alto uso de CPU en el servicio web.
- Configura un monitor de alerta de registro para picos de errores en el servicio de pagos.
- Crea un monitor para rastrear la latencia p95 del punto de conexión de pago.

### `get_monitor_coverage` {#get-monitor-coverage}
*Conjunto de herramientas: **alertas***\
*Permisos requeridos: `Monitors Read`*\
Encuentra brechas y cobertura de monitoreo para servicios o hosts. Devuelve qué señales (como tasa de errores, latencia y tasa de solicitudes) están cubiertas por los monitores existentes y cuáles faltan. Usa con `create_datadog_monitor` para llenar brechas.

- Obtén cobertura de monitoreo para `service:checkout`.
- ¿Qué brechas de monitoreo existen para `host:web-01`?
- Encuentra servicios que carecen de monitores de tasa de errores.

## APM {#apm}

Herramientas para análisis de trazas [APM][50], búsqueda de tramos, información de Watchdog e investigación de rendimiento.

<div class="alert alert-info">El <code>apm</code> conjunto de herramientas está en vista previa. <a href="https://www.datadoghq.com/product-preview/apm-mcp-toolset/">Regístrate para acceder.</a></div>

### `apm_search_spans` {#apm-search-spans}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Busca tramos utilizando la sintaxis de consulta APM, con soporte para paginación y filtrado de etiquetas.

- Muéstrame los tramos con errores del servicio de checkout en la última hora.
- Encuentra consultas de base de datos lentas que tarden más de 2 segundos.
- Busca tramos con `service:payments` y `status:error`.

### `apm_explore_trace` {#apm-explore-trace}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Ejecuta consultas sobre datos de trazas para un análisis profundo y exploración de tramos específicos dentro de una traza.

- Explora los tramos en la traza `abc123` y muéstrame las llamadas a la base de datos.
- Analiza los tramos de error en esta traza.

### `apm_trace_summary` {#apm-trace-summary}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Genera un resumen impulsado por IA de una traza, proporcionando un análisis de alto nivel de lo que muestra la traza.

- Resume la traza `7d5d747be160e280504c099d984bcfe0`.
- Dame una visión general de lo que sucedió en esta traza.

### `apm_trace_comparison` {#apm-trace-comparison}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Compara dos trazas para identificar diferencias de rendimiento y cuellos de botella entre una traza rápida y una traza lenta.

- Compara estas dos trazas para averiguar por qué una es más lenta.
- ¿Qué cambió entre esta traza base y la traza lenta?

### `apm_analyze_trace_metrics` {#apm-analyze-trace-metrics}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Analiza las métricas de traza de APM a lo largo del tiempo para una operación específica, consultando datos métricos y proporcionando análisis generados por IA.

- Analiza las tendencias de latencia para la operación `web.request` en `service:api` durante las últimas 6 horas.
- Muéstrame las métricas de tasa de errores para mi servicio de base de datos.

### `apm_discover_span_tags` {#apm-discover-span-tags}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Descubre las claves de etiqueta disponibles en los tramos dentro de un rango de tiempo.

- ¿Qué etiquetas están disponibles en los tramos para `service:checkout`?
- Muéstrame las claves de etiqueta por las que puedo filtrar en APM.

### `apm_get_primary_tag_keys` {#apm-get-primary-tag-keys}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Recupera las claves de etiqueta principales configuradas para la organización.

- ¿Cuáles son las claves de etiqueta principales de mi organización?

### `apm_search_watchdog_stories` {#apm-search-watchdog-stories}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Busca historias de detección de anomalías de Watchdog para un servicio dentro de un rango de tiempo, proporcionando información impulsada por IA sobre latencia, tasa de errores y anomalías de tráfico.

- Muéstrame las anomalías de Watchdog para el servicio de checkout en las últimas 24 horas.
- ¿Se han detectado anomalías de latencia para mi servicio de API?

### `apm_get_watchdog_story` {#apm-get-watchdog-story}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Recupera información detallada sobre una historia específica de Watchdog por su ID.

- Obtén los detalles de la historia de Watchdog `abc123`.

### `apm_search_change_stories` {#apm-search-change-stories}
*Conjunto de herramientas: **apm***\
Busca historias de cambios (despliegues, banderas de características y cambios de infraestructura) para un servicio dentro de un rango de tiempo.

- Muéstrame los despliegues y cambios recientes para el servicio de pagos.
- ¿Qué cambios de infraestructura ocurrieron alrededor del momento de este aumento de latencia?

### `apm_latency_bottleneck_analysis` {#apm-latency-bottleneck-analysis}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Analiza los cuellos de botella de latencia a través de trazas en un período de anomalía calculando el tiempo propio.

- ¿Cuáles son los cuellos de botella de latencia para el servicio de checkout durante esta anomalía?
- Identifica qué tramos están contribuyendo más a la latencia.

### `apm_latency_tag_analysis` {#apm-latency-tag-analysis}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Compara las etiquetas de tramo entre un período de anomalía y un período base para identificar qué cambió.

- Compara las etiquetas entre la ventana de anomalía y la base para encontrar qué cambió.
- ¿Qué valores de etiqueta son diferentes durante este aumento de latencia?

### `apm_search_recommendations` {#apm-search-recommendations}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Busca recomendaciones de APM de Datadog.

- Muéstrame las recomendaciones de APM para mis servicios.
- ¿Hay alguna sugerencia de optimización para mi aplicación?

### `apm_get_recommendation` {#apm-get-recommendation}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Recupera los detalles completos de una recomendación de APM específica por ID.

- Obtén los detalles de la recomendación `abc123`.

### `apm_investigation_methodology` {#apm-investigation-methodology}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Proporciona orientación para investigar problemas de servicio de APM como latencia, errores y problemas de rendimiento.

- ¿Cómo debería investigar un aumento de latencia en mi servicio de API?
- Guíame a través de la depuración de un pico de errores en producción.

## Incidencias {#cases}

Herramientas para [Case Management][38], incluyendo la creación, búsqueda y actualización de incidencias; gestión de proyectos; y vinculación de problemas de Jira.

### `search_datadog_cases` {#search-datadog-cases}
*Conjunto de herramientas: **incidencias***\
*Permisos requeridos: `Cases Read`*\
Busca [Gestión de Casos][38] incidencias con filtros que incluyen estado, prioridad, proyecto y asignado. Soporta filtrado por rango de tiempo y paginación.

- Muéstrame todas las incidencias abiertas asignadas a mí.
- ¿Hay alguna incidencia P1 abierta en el proyecto de Revisiones de Seguridad?
- Muéstrame todas las incidencias abiertas esta semana relacionadas con el servicio de pago.

### `get_datadog_case` {#get-datadog-case}
*Conjunto de herramientas: **incidencias***\
*Permisos requeridos: `Cases Read`*\
Recupera información detallada sobre una incidencia específica por ID o clave, incluyendo título, estado, prioridad, asignado y marcas de tiempo. Opcionalmente incluye actividad de la línea de tiempo (comentarios y cambios de estado) y atributos personalizados.

- ¿Cuál es la última actualización sobre CASE-1234? Muéstrame la línea de tiempo completa.
- ¿Quién está trabajando en esta incidencia y qué progreso se ha hecho hasta ahora?
- Muestra los detalles y todos los comentarios para la incidencia de migración de base de datos.

### `create_datadog_case` {#create-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Write`*\
Crea una nueva incidencia de [Case Management][38] con un título, proyecto y campos opcionales como descripción, prioridad y asignado.

- Estoy viendo un pico de latencia en el servicio de pago. Crea una incidencia P2 para rastrear la investigación.
- Abre una incidencia de revisión de seguridad para la actividad de inicio de sesión sospechosa que encontramos en los registros.

### `update_datadog_case` {#update-datadog-case}
*Conjunto de herramientas: **incidencias***\
*Permisos requeridos: `Cases Write`*\
Actualiza los campos de una incidencia existente, como estado, prioridad, título, descripción, asignado, fecha de vencimiento y atributos personalizados. Solo se actualizan los campos que proporciones.

- Este problema ahora afecta al cliente. Escala el CASO-1234 a P1.
- Marca la incidencia de migración de base de datos como resuelta.
- Establece una fecha de vencimiento para el final de la semana en la incidencia CASE-1234.

### `add_comment_to_datadog_case` {#add-comment-to-datadog-case}
*Conjunto de herramientas: **incidencias***\
*Permisos requeridos: `Cases Write`*\
Agrega un comentario a la línea de tiempo de una incidencia. Los comentarios admiten formato markdown.

- Agrega una nota a la incidencia resumiendo lo que encontramos en los registros y trazas.
- Publica una actualización de que el hotfix ha sido implementado y estamos monitoreando.
- Documenta los hallazgos del análisis de la causa raíz en esta incidencia.

### `link_jira_issue_to_datadog_case` {#link-jira-issue-to-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Write`*

- Vincula el ticket de Jira para la migración de infraestructura a esta incidencia para que podamos rastrear ambos juntos.
- Conecta PROJ-456 a la incidencia de Datadog para que el equipo de ingeniería tenga visibilidad.

### `list_datadog_case_projects` {#list-datadog-case-projects}
*Conjunto de herramientas: **incidencias***\
*Permisos requeridos: `Cases Read`*\
Lista los proyectos disponibles de [Gestión de Casos][38] con filtrado opcional por nombre o clave.

- ¿Qué proyectos están disponibles en Gestión de Casos?
- ¿Hay un proyecto relacionado con la seguridad en Gestión de Casos?

### `get_datadog_case_project` {#get-datadog-case-project}
*Conjunto de herramientas: **incidencias***\
*Permisos requeridos: `Cases Read`*\
Recupera detalles de un proyecto de incidencia específico por ID.

- ¿De qué proyecto forma parte esta incidencia?

### `search_datadog_users` {#search-datadog-users}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `User Access Read`*\
Busca usuarios de Datadog por correo electrónico, nombre o identificador. Útil para encontrar a la persona adecuada a la que asignar una incidencia.

- Encuentra la cuenta de usuario de Datadog para jane.doe@example.com.

## Tableros {#dashboards}

Herramientas para recuperar, crear, actualizar y eliminar [tableros][46], además de referencia y validación del esquema de widgets.

### `get_datadog_dashboard` {#get-datadog-dashboard}
*Conjunto de herramientas: **núcleo**, **tableros***\
*Permisos requeridos: `Dashboards Read` y `User Access Read`*\
Recupera un [tablero][46] de Datadog por ID, devolviendo su título, descripción, etiquetas y widgets. Usa `search_datadog_dashboards` primero para encontrar los IDs de los tableros.

- Obtén los detalles completos del tablero `ps7-mn3-kwf`.
- Muéstrame los widgets y el diseño del tablero de visión general de la infraestructura.
- Recupera las variables de plantilla configuradas en este tablero.

### `upsert_datadog_dashboard` {#upsert-datadog-dashboard}
*Conjunto de herramientas: **núcleo**, **tableros***\
*Permisos requeridos: `Dashboards Read` y `Dashboards Write`*\
Crea o actualiza un [tablero][46] de Datadog. Para actualizar un tablero existente, proporciona el ID del tablero; omítelo para crear uno nuevo. Llama `get_widget_reference` para obtener esquemas de widgets antes de construir widgets.

- Crea un tablero que muestre el uso de CPU y memoria en todos los servidores.
- Agrega un widget de series temporales para la tasa de errores al tablero `abc-123-def`.
- Actualiza el título y la descripción de mi tablero de visión general del servicio.

### `delete_datadog_dashboard` {#delete-datadog-dashboard}
*Conjunto de herramientas: **tableros***\
*Permisos requeridos: `Dashboards Read` y `Dashboards Write`*\
Elimina permanentemente un [tablero][46] de Datadog por ID. Esta acción no se puede deshacer. Usa `search_datadog_dashboards` primero para encontrar los IDs de los tableros.

- Elimina el tablero `ps7-mn3-kwf`.
- Elimina el antiguo tablero del entorno de staging.

### `get_widget_reference` {#get-widget-reference}
*Conjunto de herramientas: **tableros***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read`*\
Devuelve esquemas e instrucciones de construcción para tipos de widgets de tablero. Las definiciones de widgets son objetos JSON; esta herramienta devuelve definiciones de tipo TypeScript que representan sus esquemas junto con instrucciones de construcción que cubren patrones de consulta, sintaxis de fórmulas y errores comunes. Llama a esto antes de generar widgets con `upsert_datadog_dashboard`.

- Obtén el esquema para un widget de series temporales.
- Muéstrame cómo construir un widget de toplist y un widget de tabla de consultas.
- ¿Cuál es el esquema para el widget de gráfico de dispersión?

### `validate_dashboard_widget` {#validate-dashboard-widget}
*Conjunto de herramientas: **tableros***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read`*\
Valida una definición de widget contra el esquema del tablero. Utiliza esto para verificar el JSON del widget antes de pasarlo a `upsert_datadog_dashboard`.

- Valida mi definición de widget de series temporales antes de crear el tablero.
- Verifica si el JSON de este widget de tabla de consultas es correcto.

### `ask_widget_expert` {#ask-widget-expert}
*Conjunto de herramientas: **tableros***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read`*\
Hazle una pregunta a un experto en widgets de Datadog sobre la configuración de widgets, esquemas, sintaxis de consultas, uso de campos, depuración o errores comunes. Mejor para preguntas específicas: búsquedas de esquemas, aclaraciones de campos, depuración de una definición de widget existente o comprensión de cómo funciona un tipo específico de widget.

- ¿Qué formato de respuesta debo usar para un toplist?
- ¿Cuál es el esquema para el widget de gráfico de dispersión?
- Ayúdame a depurar por qué este widget está mostrando valores fraccionarios cuando debería ser un conteo.
- ¿Cómo configuro un widget de series temporales para mostrar tanto barras como líneas?

## Database Monitoring {#database-monitoring}

Herramientas para interactuar con [Database Monitoring][26].

### `find_datadog_database_instances` {#find-datadog-database-instances}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Descubre y clasifica las instancias de base de datos para la investigación de DBM. Llama a esto antes de otras herramientas de DBM que requieran un parámetro `database_instance`. Acepta una traza o ID de tramo de APM, etiquetas, o ambos para encontrar instancias coincidentes, luego evalúa y clasifica su salud.

- Encuentra instancias de base de datos correlacionadas con la traza `abc123` de hace una hora.
- ¿Qué instancias de PostgreSQL coinciden con `cluster_name:payments-prod`?
- Clasifica las instancias de base de datos para el servicio `checkout-api` por salud.

### `get_datadog_database_calling_services` {#get-datadog-database-calling-services}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Identifica los servicios y recursos de APM aguas arriba que realizan consultas a la base de datos. Correlaciona la actividad de la base de datos con las trazas de la aplicación para el análisis de la causa raíz a través de la frontera entre APM y la base de datos.

- ¿Qué servicios están llamando a las consultas más lentas en `db-prod-1`?
- Encuentra el principal servicio que llama a la firma de consulta `abc123def`.
- Muéstrame los recursos de APM que generan carga en la base de datos de pagos.

### `get_datadog_database_explain_plans` {#get-datadog-database-explain-plans}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera los planes de ejecución de PostgreSQL para una firma de consulta dentro de un marco de tiempo. Devuelve estructuras de plan simplificadas con árboles de operadores, uso de índices y costos estimados, ordenados por costo.

- Obtén planes de ejecución para la firma de consulta `abc123def` en `db-prod-1`.
- Muéstrame los planes de ejecución más costosos para esta consulta lenta.
- ¿Qué variaciones de plan tiene la firma de consulta `xyz789` en el último día?

### `get_datadog_database_health_signals` {#get-datadog-database-health-signals}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Ejecuta verificaciones de salud para detectar posibles problemas de PostgreSQL, como saturación de CPU, reinicios, latencia de consultas y bloqueos. Compara un marco de tiempo de regresión contra un período base.

- Ejecuta verificaciones de salud en `db-prod-1` durante la última hora en comparación con la hora anterior.
- Verifica la salud de la base de datos alrededor del marco de tiempo del incidente.
- ¿Qué señales explican la regresión en la base de datos de pagos?

### `get_datadog_database_query_performance` {#get-datadog-database-query-performance}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Analiza el rendimiento de una consulta específica de PostgreSQL. Devuelve el rendimiento, la latencia promedio, el tiempo de ejecución, las filas por ejecución, la tasa de aciertos en caché, las estadísticas de E/S, la actividad de conexión, los eventos de espera y la duración de la transacción, con estadísticas generales y análisis por intervalos de tiempo.

- Analiza el rendimiento de la firma de consulta `abc123def` durante la última hora.
- ¿Por qué es lenta esta consulta en la instancia de PostgreSQL de producción?
- Muestra los eventos de espera y la tasa de aciertos en caché para la firma de consulta `xyz789`.

### `get_datadog_database_query_statement` {#get-datadog-database-query-statement}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera el texto de la declaración SQL para una firma de consulta dada. Utiliza esto para mapear los hashes de firma de vuelta al SQL concreto para investigación e informes.

- Obtén el SQL para la firma de consulta `abc123def`.
- Muéstrame la declaración detrás de este hash de consulta en `db-prod-1`.
- ¿A qué consulta corresponde la firma `xyz789`?

### `get_datadog_database_recommendations` {#get-datadog-database-recommendations}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera recomendaciones de base de datos en vivo para una base de datos, consulta, tabla, servidor o índice. Devuelve las recomendaciones coincidentes con estado, severidad y un bloque de contexto normalizado que resalta las instancias afectadas, firmas de consulta, tablas, índices, servicios, planes e identificadores de infraestructura.

- Muestra recomendaciones de base de datos abiertas para `db-prod-1`.
- Lista las recomendaciones de índice faltantes en la base de datos de pagos.
- Obtén recomendaciones de alta severidad para la firma de consulta `abc123def`.

### `get_datadog_database_schemas` {#get-datadog-database-schemas}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Obtiene definiciones de esquema (columnas, índices, claves foráneas, particiones) para uno o más objetos de base de datos. Acepta nombres de tablas con esquemas, bases de datos y calificadores de instancia opcionales.

- Muéstrame el esquema de la tabla `orders`.
- Obtén columnas e índices para `public.users` en `db-prod-1`.
- Obtiene claves foráneas para la tabla `payments`.

### `optimize_datadog_database_query` {#optimize-datadog-database-query}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Analiza una consulta de PostgreSQL en busca de oportunidades de optimización utilizando reglas determinísticas. Devuelve reescrituras de consultas, detección de anti-patrones (`SELECT *`, `OFFSET` sin `ORDER BY`, `ORDER BY` sin `LIMIT`), sugerencias de índices faltantes y análisis del impacto de inactividad en transacciones. Acepta texto SQL o una firma de consulta.

- Optimiza la firma de consulta `abc123def` en la base de datos de pagos.
- Verifica este SQL en busca de índices faltantes y anti-patrones.
- Sugiere reescrituras para la consulta más lenta en `db-prod-1`.

### `search_datadog_database_plans` {#search-datadog-database-plans}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Busca [Database Monitoring][26] planes de ejecución de consultas, que muestran cómo el motor de base de datos ejecuta consultas, incluyendo el uso de índices, estrategias de unión y estimaciones de costos. Utiliza esto para analizar el rendimiento de las consultas e identificar oportunidades de optimización.

- Muéstrame los planes de ejecución para consultas lentas en `host:db-prod-1` de la última hora.
- Encuentra planes de consulta con `@db.plan.type:explain_analyze` para la base de datos de producción.
- Obtén planes de ejecución para consultas por `@db.user:app_user` con una duración mayor a 1 segundo.

### `search_datadog_database_samples` {#search-datadog-database-samples}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Busca [Database Monitoring][26] muestras de consultas, que representan ejecuciones individuales de consultas con métricas de rendimiento. Utiliza esto para analizar patrones de actividad de la base de datos, identificar consultas lentas e investigar problemas de rendimiento de la base de datos.

- Muéstrame muestras de consultas con `@duration:>1000000000` (duración mayor a 1 segundo) de `db:mydb`.
- Encuentra consultas lentas en `host:db-prod-1` filtradas por `@db.user:app_user`.
- Obtén muestras de consultas recientes para `@db.query_signature:abc123def` y analiza patrones de rendimiento.

## DDSQL {#ddsql}

Herramientas para consultar datos de Datadog usando [DDSQL][41], un dialecto SQL con soporte para recursos de infraestructura, registros, métricas, RUM, spans y otras fuentes de datos de Datadog.

### `ddsql_get_spec` {#ddsql-get-spec}
*Conjunto de herramientas: **ddsql***\
Obtiene una especificación compacta de capacidades de DDSQL, incluyendo funciones SQL soportadas, palabras clave SQL y diferencias específicas de DDSQL con respecto a PostgreSQL estándar. Llama a esta herramienta antes de componer consultas para entender la sintaxis soportada.

- ¿Qué funciones SQL son soportadas en DDSQL?
- Muéstrame las reglas de sintaxis de consultas de DDSQL y las diferencias con PostgreSQL.
- ¿Qué funciones de agregación puedo usar en DDSQL?

### `ddsql_schema_search_tables` {#ddsql-schema-search-tables}
*Conjunto de herramientas: **ddsql***\
Busca conjuntos de datos de DDSQL y devuelve tablas (fuentes de datos públicas y tablas de referencia) y métricas disponibles.

- ¿Qué tablas están disponibles para consultar en DDSQL?
- Busca tablas de DDSQL relacionadas con Kubernetes.
- Muéstrame las métricas disponibles que puedo consultar con DDSQL.

### `ddsql_schema_get_table_columns` {#ddsql-schema-get-table-columns}
*Conjunto de herramientas: **ddsql***\
Obtiene columnas SQL estáticas para una tabla de DDSQL a partir de metadatos de esquema.

- ¿Qué columnas están disponibles en la tabla `aws.ec2_instance`?
- Muéstrame el esquema de la tabla `k8s.pods`.

### `ddsql_schema_search_unstructured_fields` {#ddsql-schema-search-unstructured-fields}
*Conjunto de herramientas: **ddsql***\
Busca y clasifica campos para fuentes DDSQL no estructuradas, como registros, RUM y spans, ordenados por frecuencia. Utiliza esta herramienta para el descubrimiento de esquemas en fuentes buscables antes de recurrir a `ddsql_schema_get_table_columns`.

- ¿Qué campos están disponibles en los registros de DDSQL?
- Encuentra campos relacionados con `service` en mis datos de RUM.
- Muéstrame los campos más comunes en mis datos de spans.

### `ddsql_run_query` {#ddsql-run-query}
*Conjunto de herramientas: **ddsql***\
Ejecuta una consulta DDSQL y devuelve resultados. Soporta el uso de sintaxis SQL para consultar recursos de infraestructura, registros, métricas, RUM, spans y otras fuentes de datos de Datadog. Consulta la [referencia de DDSQL][42] para detalles de sintaxis.

- ¿Cuántas instancias de EC2 están en ejecución en cada región de AWS?
- Muéstrame los 10 principales servicios por conteo de registros de errores en la última hora.
- Consulta el uso promedio de CPU agrupado por servidor durante las últimas 24 horas.

### `ddsql_create_link` {#ddsql-create-link}
*Conjunto de herramientas: **ddsql***\
Genera un enlace de interfaz de usuario de Datadog al [Editor de DDSQL][41] con una consulta dada pre-poblada.

- Genera un enlace del Editor de DDSQL para esta consulta.
- Crea un enlace compartible al Editor de DDSQL con mi consulta de infraestructura.

## Error Tracking {#error-tracking}

Herramientas para interactuar con Datadog [Error Tracking][49].

### `search_datadog_error_tracking_issues` {#search-datadog-error-tracking-issues}
*Conjunto de herramientas: **Error Tracking***\
*Permisos Requeridos: `Error Tracking Read`*\
Busca problemas de Error Tracking a través de fuentes de datos (RUM, registros, trazas).

- Muéstrame todos los problemas de Error Tracking en el servicio de checkout de las últimas 24 horas.
- ¿Cuáles son los errores más comunes en mi aplicación durante la última semana?
- Encuentra problemas de Error Tracking en el entorno de producción con `service:api`.

### `get_datadog_error_tracking_issue` {#get-datadog-error-tracking-issue}
*Conjunto de herramientas: **Error Tracking***\
*Permisos Requeridos: `Cases Read` y `Error Tracking Read`*\
Recupera información detallada sobre un problema específico de Error Tracking de Datadog.

- Ayúdame a resolver el problema de Error Tracking `550e8400-e29b-41d4-a716-446655440000`.
- ¿Cuál es el impacto del problema de Error Tracking `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f`?
- Crea un caso de prueba para reproducir el problema de Error Tracking `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`.

## Feature Flags {#feature-flags}

Herramientas para gestionar Feature Flags, incluyendo crear, listar y actualizar flags y sus entornos.

### `list_datadog_feature_flags` {#list-datadog-feature-flags}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Lista las Feature Flags con soporte de paginación.

- Muéstrame todas las Feature Flags en mi organización.
- Lista las Feature Flags para el servicio de checkout.

### `get_datadog_feature_flag` {#get-datadog-feature-flag}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Recupera detalles sobre una Feature Flag específica.

- Obtén detalles para la Feature Flag `dark-mode-enabled`.
- ¿Cuáles son los ajustes actuales para la Feature Flag `new-checkout-flow`?

### `create_datadog_feature_flag` {#create-datadog-feature-flag}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Write`*\
Crea una nueva Feature Flag.

- Crea una Feature Flag llamada `enable-new-dashboard` para un despliegue gradual.
- Configura una nueva Feature Flag booleana para la función beta.

### `list_datadog_feature_flag_environments` {#list-datadog-feature-flag-environments}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read`*\
Lista los entornos configurados para las Feature Flags.

- Muéstrame los entornos de Feature Flag disponibles.
- ¿A qué entornos puedo seleccionar para aplicar las Feature Flags?

### `list_datadog_feature_flag_allocations` {#list-datadog-feature-flag-allocations}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Lista las asignaciones para una Feature Flag en un entorno específico.

- Muéstrame las reglas de asignación para la Feature Flag `new-checkout-flow` en producción.

### `update_datadog_feature_flag_environment` {#update-datadog-feature-flag-environment}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Write`*\
Actualiza la configuración de una Feature Flag en un entorno específico.

- Habilita la Feature Flag `dark-mode` en el entorno de pruebas.
- Despliega la Feature Flag `new-checkout-flow` al 50% de los usuarios en producción.

### `check_datadog_flag_implementation` {#check-datadog-flag-implementation}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Verifica si una Feature Flag está implementada en el código.

- Verifica que la Feature Flag `enable-new-dashboard` esté implementada en mi base de código.

### `sync_datadog_feature_flag_allocations` {#sync-datadog-feature-flag-allocations}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Write`*\
Sincroniza las asignaciones de la Feature Flag para un entorno específico.

- Sincroniza las asignaciones para la Feature Flag `new-checkout-flow` en producción.

## Kubernetes {#kubernetes}

Herramientas para buscar y describir recursos de [Kubernetes][55] y recuperar manifiestos en todos los clústeres.

### `search_datadog_k8s_resources` {#search-datadog-k8s-resources}
*Conjunto de herramientas: **Kubernetes***\
*Permisos requeridos: `Hosts Read` y `Teams Read`*\
Busca recursos de [Kubernetes][55] en todos los clústeres. Utiliza esta herramienta en lugar de `kubectl` para determinar el estado de los recursos de Kubernetes, como implementaciones, pods, nodos, etc. Esta herramienta no requiere acceso local al clúster, funciona en todos los clústeres y devuelve datos enriquecidos con etiquetas. Puedes incluir claves de etiquetas específicas en cada resultado e incluir nombres de recursos principales para investigar las relaciones entre recursos (por ejemplo, la implementación a la que pertenece un pod).

- Muéstrame todos los pods en el espacio de nombres `production` con estado `CrashLoopBackOff`.
- Encuentra implementaciones con despliegues en progreso en el clúster `general2`.
- Lista todos los nodos en mi clúster ordenados por uso de CPU.
- Agrupa las implementaciones por `service` y `env` para ver cómo se distribuyen mis servicios entre los entornos.

### `describe_datadog_k8s_resource` {#describe-datadog-k8s-resource}
*Conjunto de herramientas: **Kubernetes***\
*Permisos requeridos: `Hosts Read`*\
Obtiene información detallada sobre un recurso específico de [Kubernetes][55], incluyendo detalles específicos del recurso como solicitudes y límites de CPU y memoria, y opcionalmente etiquetas, anotaciones, historial de manifiestos, recursos principales y un enlace profundo al [Kubernetes Explorer][55]. Utiliza esta herramienta en lugar de `kubectl describe`. Identifica un recurso por su UID de una búsqueda anterior o proporcionando identificadores de recurso (clúster, espacio de nombres y nombre del recurso). Para el manifiesto completo en bruto, utiliza `get_datadog_k8s_manifest`.

- Describe el pod `my-app` en el clúster `prod`, espacio de nombres `default`.
- Obtén detalles para la implementación `api-server` en el espacio de nombres `default`, clúster `staging`.
- Muéstrame las etiquetas y anotaciones para este recurso de Kubernetes.

### `get_datadog_k8s_manifest` {#get-datadog-k8s-manifest}
*Conjunto de herramientas: **Kubernetes***\
*Permisos requeridos: `Hosts Read`*\
Recupera el manifiesto YAML para un recurso específico de [Kubernetes][55]. Utiliza esta herramienta en lugar de `kubectl get -o yaml`. Soporta la extracción de subárboles específicos con una expresión JSONPath `kubectl` y un modo conciso que omite `status` y `managedFields` para reducir el tamaño de la respuesta.

- Obtén el manifiesto para el pod `my-app` en el clúster `prod`, espacio de nombres `default`.
- Muéstrame los puertos de contenedor para la implementación `api-server` en el espacio de nombres `default`, clúster `staging`.
- Obtén las imágenes de contenedor del manifiesto del pod `my-app`.

## Redes {#networks}

Herramientas para el análisis de [Cloud Network Monitoring][31] y [Network Device Monitoring][32].

### `analyze_cloud_network_monitoring` {#analyze-cloud-network-monitoring}
*Conjunto de herramientas: **redes***\
*Permisos requeridos: `Network Connections Read`*\
Investiga problemas a nivel de red utilizando datos de [Cloud Network Monitoring][31], analizando datos de flujo de red para detectar anomalías como tasas de retransmisión elevadas.

- Analiza el tráfico de red entre mis servidores web y el clúster de base de datos.
- ¿Hay problemas de retransmisión entre `service:api` y `service:payments`?
- Investiga los datos de flujo de red en busca de anomalías en el entorno de producción.

### `search_ndm_devices` {#search-ndm-devices}
*Conjunto de herramientas: **redes***\
*Permisos requeridos: `NDM Read`*\
Busca dispositivos de red (enrutadores, conmutadores, cortafuegos) monitoreados por Datadog [Network Device Monitoring][32].

- Muéstrame todos los dispositivos de red en el `us-east-1` centro de datos.
- Encuentra cortafuegos que están reportando errores.
- Lista todos los conmutadores monitoreados y sus estados.

### `get_ndm_device` {#get-ndm-device}
*Conjunto de herramientas: **redes***\
*Permisos requeridos: `NDM Read`*\
Recupera información detallada sobre un dispositivo de red específico mediante su ID de dispositivo.

- Obtén detalles del dispositivo de red `device:abc123`.
- Muéstrame la configuración y el estado de este enrutador.

### `search_ndm_interfaces` {#search-ndm-interfaces}
*Conjunto de herramientas: **redes***\
*Permisos requeridos: `NDM Read`*\
Recupera todas las interfaces de red para un dispositivo específico.

- Muéstrame todas las interfaces en el dispositivo `device:abc123`.
- Lista los estados de las interfaces para mi enrutador central.

## Integración {#onboarding}

Herramientas de integración para la configuración y puesta en marcha guiada de Datadog.

### `browser_onboarding` {#browser-onboarding}
*Conjunto de herramientas: **integración***\
*Permisos requeridos: `RUM Apps Read`*\
Te guía a través de la integración de Browser RUM con Datadog.

- Ayúdame a configurar la monitorización de Browser RUM para mi aplicación web.

### `devices_onboarding` {#devices-onboarding}
*Conjunto de herramientas: **integración***\
*Permisos requeridos: `RUM Apps Read`*\
Te guía a través de la integración de dispositivos con la monitorización de Datadog.

- Ayúdame a configurar la monitorización de dispositivos en Datadog.

### `kubernetes_onboarding` {#kubernetes-onboarding}
*Conjunto de herramientas: **integración***\
*Permisos requeridos: Ninguno*\
Te guía a través de la integración de clústeres de Kubernetes con Datadog.

- Ayúdame a configurar la monitorización de Datadog para mi clúster de Kubernetes.

### `llm_observability_onboarding` {#llm-observability-onboarding}
*Conjunto de herramientas: **integración***\
Te guía a través de la integración de Agent Observability en Datadog.

- Ayúdame a configurar Agent Observability para mi aplicación de IA.

### `test_optimization_onboarding` {#test-optimization-onboarding}
*Conjunto de herramientas: **integración***\
*Permisos requeridos: Ninguno*\
Te guía a través de la integración de Test Optimization en Datadog.

- Ayúdame a configurar Test Optimization en mi canalización de CI.

### `serverless_onboarding` {#serverless-onboarding}
*Conjunto de herramientas: **integración***\
*Permisos requeridos: Ninguno*\
Te guía a través de la integración de aplicaciones sin servidor a Datadog, incluyendo funciones de AWS Lambda y GCP Cloud Run y funciones de Cloud Run (Gen 2).

- Ayúdame a monitorear mis funciones de AWS Lambda con Datadog.
- Ayúdame a monitorear mis servicios de GCP Cloud Run con Datadog.
- Ayúdame a monitorear mis funciones de GCP Cloud Run con Datadog.

### `source_map_uploads` {#source-map-uploads}
*Conjunto de herramientas: **integración***\
Te guía a través de la carga de mapas del código fuente para el mapeo de errores RUM.

- Ayúdame a cargar mapas del código fuente para que mis errores RUM muestren el código fuente original.

## Tablas de referencia {#reference-tables}

Herramientas para gestionar [Tablas de referencia][45], incluyendo listar tablas, leer filas, agregar filas y crear tablas desde el almacenamiento en la nube.

### `list_reference_tables` {#list-reference-tables}
*Conjunto de herramientas: **tablas-de-referencia***\
Lista y busca [Tablas de referencia][45] en la organización, con filtrado opcional por nombre y ordenamiento.

- Lista todas las tablas de referencia en mi organización.
- Encuentra tablas de referencia con `customer` en el nombre.
- Muéstrame las tablas de referencia ordenadas por la última fecha de actualización.

### `get_reference_table_rows` {#get-reference-table-rows}
*Conjunto de herramientas: **tablas-de-referencia***\
Recupera filas específicas de una tabla de referencia por sus valores de clave primaria. Usa `list_reference_tables` primero para encontrar el ID de la tabla y el esquema.

- Obtén las filas con claves primarias `user001` y `user002` de la tabla de referencia de usuarios.
- Busca la entrada para el ID de cuenta `acct-123` en la tabla de cuentas.

### `append_reference_table_rows` {#append-reference-table-rows}
*Conjunto de herramientas: **tablas de referencia***\
Agrega nuevas filas a una tabla de referencia existente. Esta operación solo agrega filas y no modifica ni elimina datos existentes. Cada fila debe incluir todos los campos requeridos del esquema de la tabla, incluyendo el campo de clave primaria.

- Agrega una nueva fila para el usuario `user003` con nombre `Carol` y edad `28` a la tabla de usuarios.
- Agrega estas cinco nuevas entradas de cuenta a la tabla de referencia de cuentas.

### `create_reference_table` {#create-reference-table}
*Conjunto de herramientas: **tablas de referencia***\
Crea una nueva tabla de referencia respaldada por un archivo CSV en Amazon S3, Google Cloud Storage o Azure Blob Storage. Solo se admiten los tipos de campo `INT32` y `STRING`.

- Crea una tabla de referencia llamada `ip_allowlist` a partir del archivo `allowlist.csv` en mi bucket S3 `my-data-bucket`.
- Configura una nueva tabla de referencia respaldada por GCS llamada `customer_tiers` con sincronización automática habilitada.

## Seguridad {#security}

Herramientas para escaneo de seguridad de código y búsqueda de [señales de seguridad][53] y [hallazgos de seguridad][54].

### `datadog_secrets_scan` {#datadog-secrets-scan}
*Conjunto de herramientas: **seguridad***\
Escanea el código en busca de secretos y credenciales codificados, detectando claves de AWS, claves de API, contraseñas, tokens, claves privadas y credenciales de base de datos.

- Escanea mi código en busca de secretos codificados.
- Verifica si hay claves de API o contraseñas comprometidas en este archivo.

### `search_datadog_security_signals` {#search-datadog-security-signals}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Busca y recupera señales de seguridad de Datadog Security Monitoring, incluyendo señales de Cloud SIEM, señales de App & API Protection, y señales de Workload Protection.

- Muéstrame las señales de seguridad de las últimas 24 horas.
- Encuentra señales de seguridad de alta severidad relacionadas con mi entorno de producción.
- Lista las señales de Cloud SIEM activadas por intentos de inicio de sesión sospechosos.

### `analyze_datadog_security_signals` {#analyze-datadog-security-signals}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read` y `Timeseries`*\
Analiza señales de seguridad utilizando consultas SQL para agregaciones, agrupaciones y análisis de tendencias. Utiliza esto para conteos, top-N y desgloses a lo largo del tiempo. Para listar o recuperar señales específicas, utiliza `search_datadog_security_signals` o `get_datadog_security_signal`.

- Muéstrame las 10 principales reglas de SIEM por conteo de señales en los últimos 7 días.
- Cuenta las señales de seguridad altas y críticas agrupadas por severidad.
- ¿Cuántas señales de App & API Protection se activaron por servicio ayer?

### `get_datadog_security_signal` {#get-datadog-security-signal}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Recupera los detalles completos de una señal de seguridad individual por ID, incluyendo atributos, información de reglas, estado de triage, etiquetas y correlaciones de casos.

- Obtén los detalles completos de la señal de seguridad `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`.
- Muéstrame la regla, el estado de triaje y las incidencias vinculadas para esta señal.

### `security_findings_schema` {#security-findings-schema}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read`*\
Devuelve el esquema (campos disponibles y sus tipos) para hallazgos de seguridad. Llama a esto primero antes de usar `analyze_security_findings` para descubrir los campos consultables. Soporta filtrado por tipo de hallazgo y control del tamaño de la respuesta.

- ¿Qué campos están disponibles para hallazgos de seguridad?
- Muéstrame el esquema para hallazgos de vulnerabilidad de biblioteca.
- Obtén el esquema completo incluyendo descripciones para hallazgos de mala configuración.

### `analyze_security_findings` {#analyze-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read` y `Timeseries`*\
Herramienta principal para analizar hallazgos de seguridad utilizando consultas SQL. Consulta datos en vivo de las últimas 24 horas con agregaciones SQL flexibles, filtrado y agrupamiento. Llama a `security_findings_schema` primero para descubrir los campos disponibles, luego usa esta herramienta para consultar.

- Muéstrame las 10 reglas con los hallazgos más críticos.
- Cuenta los hallazgos abiertos agrupados por severidad y tipo de hallazgo.
- Encuentra vulnerabilidades de bibliotecas con exploits disponibles, agrupadas por recurso.

### `search_security_findings` {#search-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read`*\
Herramienta de respaldo para recuperar detalles completos de hallazgos de seguridad. Prefiere `analyze_security_findings` para la mayoría de las tareas de análisis. Usa esta herramienta solo cuando necesites objetos de hallazgo completos o cuando las consultas SQL sean insuficientes.

- Obtén detalles completos para hallazgos críticos en mi entorno de AWS.
- Recupera objetos de hallazgo completos para una regla específica.
- Lista todos los hallazgos de riesgo de identidad abiertos con metadatos completos.

## Entrega de Software {#software-delivery}

Herramientas para interactuar con la Entrega de Software ([CI Visibility][48] y [Test Optimization][24]).

### `search_datadog_ci_pipeline_events` {#search-datadog-ci-pipeline-events}
*Conjunto de herramientas: **entrega de software***\
*Permisos requeridos: `CI Visibility Read`*\
Busca eventos de CI con filtros y devuelve detalles sobre ellos.

- Muéstrame todas las canalizaciones para mi commit `58b1488`.
- Muéstrame la última falla de la canalización en la rama `my-branch`.
- Propón una solución para el trabajo `integration-test` que falla cada vez en mi rama `my-branch`.

### `aggregate_datadog_ci_pipeline_events` {#aggregate-datadog-ci-pipeline-events}
*Conjunto de herramientas: **entrega de software***\
*Permisos requeridos: `CI Visibility Read`*\
Agrega eventos de canalización de CI para producir estadísticas, métricas y análisis agrupados.

- ¿Cuál es la duración promedio del trabajo en los últimos 7 días?
- ¿Cuántas canalizaciones fallidas ha habido en las últimas 2 semanas?
- Muéstrame el percentil 95 de la duración de la canalización agrupada por nombre de canalización.

### `get_datadog_flaky_tests` {#get-datadog-flaky-tests}
*Conjunto de herramientas: **entrega de software***\
*Permisos requeridos: `Test Optimization Read`*\
Busca en Datadog [Test Optimization][24] pruebas inestables y devuelve detalles de clasificación (tasa de fallos, categoría, propietarios, historial, impacto en CI), con paginación y ordenamiento.

- Encuentra pruebas inestables activas para el servicio de pago propiedad de `@team-abc`, ordenadas por tasa de fallos.
- Muestra pruebas inestables en la rama `main` para el repositorio `github.com/org/repo`, comenzando por las más recientes.
- Lista las pruebas inestables en la categoría `timeout` con alta tasa de fallos (50%+) para que pueda priorizar las correcciones.

### `aggregate_datadog_test_events` {#aggregate-datadog-test-events}
*Conjunto de herramientas: **entrega de software***\
*Permisos requeridos: `Test Optimization Read`*\
Agrega eventos de Test Optimization de Datadog para cuantificar la confiabilidad y las tendencias de rendimiento con funciones de agregación, métricas opcionales, facetas para agrupar y niveles configurables de prueba.

- Cuenta el número de pruebas fallidas en la última semana, agrupadas por rama.
- Muéstrame la duración del percentil 95 para cada conjunto de pruebas para identificar los más lentos.
- Cuenta todas las pruebas aprobadas y fallidas, agrupadas por propietarios de código.

### `search_datadog_test_events` {#search-datadog-test-events}
*Conjunto de herramientas: **entrega de software***\
*Permisos requeridos: `Test Optimization Read`*\
Busca eventos de prueba [Test Optimization][24] con filtros y devuelve detalles sobre ellos.

- Muéstrame las pruebas fallidas en la rama `main` de las últimas 24 horas.
- Obtén ejecuciones de pruebas para el commit `abc123` para ver qué pasó y qué falló.
- Muéstrame todas las ejecuciones de prueba inestables para el servicio de pago.
- Encuentra pruebas propiedad de `@team-name` que están fallando.

### `get_datadog_code_coverage_branch_summary` {#get-datadog-code-coverage-branch-summary}
*Conjunto de herramientas: **entrega de software***\
*Permisos requeridos: `Code Coverage read`*\
Recupera métricas resumidas de cobertura de código agregadas para una rama de repositorio, incluyendo cobertura total, cobertura de parches y desgloses de servicio/propietario de código.

- ¿Cuál es la cobertura de código en la rama `main` para `github.com/my-org/my-repo`?
- Muéstrame el resumen de cobertura para la rama `release/1.x` de `github.com/my-org/my-repo`.

### `get_datadog_code_coverage_commit_summary` {#get-datadog-code-coverage-commit-summary}
*Conjunto de herramientas: **entrega de software***\
*Permisos requeridos: `Code Coverage read`*\
Recupera métricas resumidas de cobertura de código agregadas para un commit de repositorio, incluyendo cobertura total, cobertura de parches y desgloses de servicio/propietario de código.

- Muéstrame la cobertura de código para el commit `abc123abc123abc123abc123abc123abc123abcd` en `github.com/my-org/my-repo`.
- ¿Cuál es la cobertura de parches para el último commit en mi rama?

## Synthetics {#synthetics}

Herramientas para interactuar con Datadog [pruebas Synthetic][47].

### `get_synthetics_tests` {#get-synthetics-tests}
*Conjunto de herramientas: **Synthetics***\
*Permisos requeridos: `Synthetics Read`*\
Busca pruebas Synthetic de API HTTP de Datadog.

- Ayúdame a entender por qué la prueba Synthetic en el punto final `/v1/my/tested/endpoint` está fallando.
- Hay una interrupción; encuentra todas las pruebas Synthetic que están fallando en el dominio `api.mycompany.com`.
- ¿Las pruebas Synthetic en mi sitio web `api.mycompany.com` todavía están funcionando en la última hora?

### `edit_synthetics_tests` {#edit-synthetics-tests}
*Conjunto de herramientas: **Synthetics***\
*Permisos requeridos: `Synthetics Global Variable Read` y `Synthetics Read` y `Synthetics Write`*\
Edita pruebas de API HTTP Synthetic de Datadog.

- Mejora las afirmaciones de la prueba Synthetic definida en mi punto final `/v1/my/tested/endpoint`.
- Pausa la prueba `aaa-bbb-ccc` y configura las ubicaciones para que sean únicamente europeas.
- Agrega la etiqueta de mi equipo a la prueba `aaa-bbb-ccc`.

### `synthetics_test_wizard` {#synthetics-test-wizard}
*Conjunto de herramientas: **Synthetics***\
*Permisos requeridos: `Synthetics Global Variable Read` y `Synthetics Read` y `Synthetics Write`*\
Previsualiza y crea pruebas de API HTTP Synthetic de Datadog.

- Crea pruebas Synthetic en cada punto final definido en este archivo de código.
- Crea una prueba Synthetic en `/path/to/endpoint`.
- Crea una prueba Synthetic que verifique si mi dominio `mycompany.com` permanece activo.

## Flujos de trabajo {#workflows}

Herramientas para [Workflow Automation][39], incluyendo listar, inspeccionar, ejecutar y configurar flujos de trabajo para uso de agentes.

### `list_datadog_workflows` {#list-datadog-workflows}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Read`*\
Lista y busca flujos de trabajo de [Workflow Automation][39]. Soporta filtrado por nombre, etiquetas, propietario, identificador y tipo de activador (como `monitor`, `schedule`, `api` o `incident`). Los resultados pueden ser ordenados por campos como `name` o `updatedAt`.

- Muéstrame todos los flujos de trabajo publicados etiquetados con `team:platform`.
- Lista los flujos de trabajo que tienen un activador de agente configurado.
- Encuentra todos los flujos de trabajo relacionados con la respuesta a incidentes propiedad de Alice Smith.

### `get_datadog_workflow` {#get-datadog-workflow}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Read`*\
Recupera información detallada sobre un flujo de trabajo específico, incluyendo sus activadores, pasos, conexiones y esquema de entrada.

- Obtén los detalles completos para el flujo de trabajo `00000000-0000-0000-0000-000000000000`.
- Muéstrame los parámetros de entrada y los pasos para el flujo de trabajo de reversión de la implementación.
- ¿Qué disparadores están configurados para este flujo de trabajo?

### `execute_datadog_workflow` {#execute-datadog-workflow}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Run`*\
Ejecuta un flujo de trabajo publicado que tiene un disparador de agente, con parámetros de entrada opcionales que coinciden con el esquema de entrada del flujo de trabajo.

- Ejecuta el flujo de trabajo de escalación de incidentes para el servicio `checkout-api` con severidad `high`.
- Ejecuta el flujo de trabajo de reversión de implementación para el servicio de pagos.
- Activa el flujo de trabajo de notificación de guardia con el contexto de esta investigación.

**Nota**: El flujo de trabajo debe estar publicado y tener un disparador de agente configurado. Utiliza `update_datadog_workflow_with_agent_trigger` para agregar uno si es necesario.

### `get_datadog_workflow_instance` {#get-datadog-workflow-instance}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Read`*\
Recupera el estado y los detalles de una instancia de ejecución de flujo de trabajo, incluidos los resultados y salidas de los pasos.

- ¿Cuál es el estado de la ejecución del flujo de trabajo que activé?
- ¿Se completó con éxito el flujo de trabajo de escalación de incidentes?
- Muéstrame las salidas detalladas de la instancia de flujo de trabajo `00000000-0000-0000-0000-000000000000`.

### `update_datadog_workflow_with_agent_trigger` {#update-datadog-workflow-with-agent-trigger}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Write`*\
Agrega un disparador de agente a un flujo de trabajo y lo publica, permitiendo que agentes de IA lo ejecuten.

- Agrega un disparador de agente al flujo de trabajo de reversión de implementación para que pueda ejecutarlo desde aquí.
- Configura el flujo de trabajo de respuesta a incidentes para que pueda ser activado por un agente.

[1]: /es/bits_ai/mcp_server/setup#toolsets
[15]: /es/api/latest/events/
[24]: /es/tests/
[26]: /es/database_monitoring/
[31]: /es/network_monitoring/cloud_network_monitoring/
[32]: /es/network_monitoring/devices/
[38]: /es/service_management/case_management/
[39]: /es/actions/workflows/
[41]: /es/ddsql_editor/
[42]: /es/ddsql_reference/ddsql_default/
[45]: /es/reference_tables/
[46]: /es/dashboards/
[47]: /es/synthetics/
[48]: /es/continuous_integration/
[49]: /es/error_tracking/
[50]: /es/tracing/
[51]: /es/feature_flags/
[53]: /es/security/threats/security_signals/
[54]: /es/security/misconfigurations/findings/
[55]: /es/containers/monitoring/kubernetes_explorer/