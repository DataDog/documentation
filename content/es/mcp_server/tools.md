---
algolia:
  rank: 70
  tags:
  - mcp
  - mcp server
  - mcp tools
  - tools
aliases:
- /es/bits_ai/mcp_server/tools/
description: Explore todas las herramientas disponibles en el Servidor Datadog MCP,
  organizadas por conjunto de herramientas, con ejemplos de prompts.
further_reading:
- link: mcp_server
  tag: Documentación
  text: Servidor Datadog MCP
- link: mcp_server/setup
  tag: Documentación
  text: Configurar el Servidor Datadog MCP
title: Herramientas del Servidor Datadog MCP
---
Las siguientes herramientas están disponibles en el Servidor Datadog MCP. Cada entrada incluye el conjunto de herramientas requerido, los permisos y ejemplos de prompts. Las herramientas están agrupadas por [conjuntos de herramientas][1], lo que le permite usar solo las herramientas que necesita, ahorrando un valioso espacio en la ventana de contexto.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Para habilitar herramientas específicas del producto, incluya el parámetro de consulta `toolsets` al final de la URL del endpoint que utiliza para conectarse al Servidor Datadog MCP. Por ejemplo, según el [sitio de Datadog][2] seleccionado ({{< region-param key="dd_site_name" >}}), esta URL habilita _solo_ las herramientas de APM y Agent Observability:

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

También puede excluir herramientas específicas con el parámetro de consulta `omit_tools`.

[2]: /es/getting_started/site/
{{< /site-region >}}

Consulte [Configurar el Servidor Datadog MCP][1] para obtener más información sobre cómo conectarse al Servidor Datadog MCP, habilitar conjuntos de herramientas y omitir herramientas específicas.

<div class="alert alert-info">Las herramientas del Servidor Datadog MCP están en desarrollo significativo y están sujetas a cambios. Utilice <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">este formulario de comentarios</a> para compartir cualquier comentario, caso de uso o problema encontrado con sus prompts y consultas.</div>

## Herramientas principales {#core-tools}

El conjunto de herramientas predeterminado para registros, métricas, trazas, tableros, monitores, incidentes, hosts, servicios, eventos y notebooks.

### `search_datadog_events` {#search-datadog-events}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Events` y `Timeseries`*\
Busca eventos como alertas de monitoreo, notificaciones de implementación, cambios en la infraestructura, hallazgos de seguridad y cambios en el estado del servicio.

- Muestre todos los eventos de implementación de las últimas 24 horas.
- Encuentra eventos relacionados con nuestro entorno de producción con estado de error.
- Obtén eventos etiquetados con `service:api` de la última hora.

**Nota**: Consulte la [Event Management API][15] para obtener más detalles.

### `get_datadog_incident` {#get-datadog-incident}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Incidents Read`*\
Recupera información detallada sobre un incidente.

- Obtenga los detalles del incidente ABC123.
- ¿Cuál es el estado del incidente ABC123?
- Recupere la información completa sobre el incidente de Redis de ayer.

**Nota**: La herramienta está operativa, pero no incluye datos de la línea de tiempo del incidente.

### `get_datadog_metric` {#get-datadog-metric}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Cloud Cost Management Read` o `Metrics` o `Timeseries`*\
Consulta y analiza datos de métricas históricos o en tiempo real, admitiendo consultas y agregaciones personalizadas.

- Muestre las métricas de utilización de CPU para todos los hosts en las últimas 4 horas.
- Obtenga las métricas de latencia de Redis para el entorno de producción.
- ¿Cuánto cambiaron mis costos en la nube de enero a febrero?

### `get_datadog_metric_context` {#get-datadog-metric-context}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Cloud Cost Management Read` o `Metrics`*\
Recupera información detallada sobre una métrica, incluyendo metadatos, etiquetas disponibles y valores de etiqueta para filtrar y agrupar.

- ¿Qué etiquetas están disponibles para la métrica `system.cpu.user`?
- Muestre todos los valores posibles para la etiqueta `env` en `redis.info.latency_ms`.
- Obtén metadatos y dimensiones para la métrica `requests.count`.

### `search_datadog_monitors` {#search-datadog-monitors}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Monitors Read`*\
Recupera información sobre los monitores de Datadog, incluyendo sus estados, umbrales y condiciones de alerta.

- Enumera todos los monitores que están enviando alertas actualmente.
- Muéstrame los monitores relacionados con nuestro servicio de pago.
- Busque monitores etiquetados con `team:infrastructure`.

### `get_datadog_trace` {#get-datadog-trace}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `APM Read`*\
Obtiene una traza completa de Datadog APM usando un ID de traza.

- Obtenga la traza completa para el ID 7d5d747be160e280504c099d984bcfe0.
- Muéstrame todos los tramos para la traza abc123 con información de tiempo.
- Recupere los detalles de la traza, incluidas las consultas de base de datos para el ID xyz789.

**Nota**: Las trazas grandes con miles de tramos pueden truncarse (y se indicarán como tales) sin forma de recuperar todos los tramos.

### `search_datadog_dashboards` {#search-datadog-dashboards}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Dashboards Read` y `User Access Read`*\
Enumera los tableros de Datadog disponibles y los detalles clave.

- Muéstrame todos los tableros disponibles en nuestra cuenta.
- Enumera los tableros relacionados con el monitoreo de infraestructura.
- Busca tableros compartidos para el equipo de ingeniería.

**Nota**: Esta herramienta enumera los tableros relevantes pero proporciona detalles limitados sobre su contenido. Use `get_datadog_dashboard` para recuperar las definiciones completas de los widgets.

### `get_datadog_notebook` {#get-datadog-notebook}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Notebooks Read`*\
Recupera información detallada sobre un notebook específico por ID, incluyendo nombre, estado y autor.

- Obtenga los detalles del notebook abc-123-def.
- Muestre el contenido del notebook de depuración de ayer.

### `search_datadog_notebooks` {#search-datadog-notebooks}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Notebooks Read`*\
Enumera y busca notebooks de Datadog con filtrado por autor, etiquetas y contenido.

- Muestre todos los notebooks creados por el equipo de plataforma.
- Busque notebooks relacionados con la investigación de rendimiento.
- Enumere los notebooks etiquetados con `incident-response`.

### `search_datadog_hosts` {#search-datadog-hosts}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Hosts Read` y `Timeseries`*\
Enumera y proporciona información sobre los hosts monitoreados, permitiendo filtrar y buscar.

- Muestre todos los hosts en nuestro entorno de producción.
- Enumere los hosts en mal estado que no han reportado en la última hora.
- Obtenga todos los hosts etiquetados con `role:database`.

### `search_datadog_incidents` {#search-datadog-incidents}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Incidents Read`*\
Recupera una lista de incidentes de Datadog, incluyendo su estado, gravedad y metadatos.

- Muestre todos los incidentes activos por gravedad.
- Enumere los incidentes resueltos de la última semana.
- Busque incidentes que afecten a los clientes.

### `search_datadog_metrics` {#search-datadog-metrics}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Metrics`*\
Enumera las métricas disponibles, con opciones de filtrado y metadatos.

- Muestre todas las métricas de Redis disponibles.
- Enumere las métricas relacionadas con la CPU para nuestra infraestructura.
- Busque métricas etiquetadas con `service:api`.

### `search_datadog_services` {#search-datadog-services}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Service Catalog Read`*\
Enumera los servicios en el Catálogo de Datadog con detalles e información del equipo.

- Muestre todos los servicios en nuestra microservices architecture.
- Enumere los servicios propiedad del equipo de plataforma.
- Encuentre servicios relacionados con el procesamiento de pagos.

### `search_datadog_service_dependencies` {#search-datadog-service-dependencies}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `APM Read` y `Service Catalog Read` y `Teams Read`*\
Recupera las dependencias de servicio (ascendentes/descendentes) y los servicios propiedad de un equipo.

- Muestre todos los servicios ascendentes que llaman al servicio de pago.
- ¿De qué servicios descendentes depende la API de pago?
- Enumere todos los servicios que pertenecen al equipo de plataforma.

### `search_datadog_spans` {#search-datadog-spans}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `APM Read`*\
Recupera tramos de trazas de APM con filtros como servicio, tiempo, recurso, etcétera.

- Muéstreme los tramos con errores del servicio de pago.
- Encuentra consultas de base de datos lentas en los últimos 30 minutos.
- Obtén los tramos de las solicitudes de API fallidas a nuestro servicio de pago.

### `analyze_datadog_logs` {#analyze-datadog-logs}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Logs Read Data` y `Logs Read Index Data` y `Timeseries`*\
Analiza los Datadog Logs usando consultas SQL para conteos, agregaciones y análisis numérico. Usa esto para análisis estadístico.

- Cuenta los registros de error por servicio en la última hora.
- Muéstreme los 10 códigos de estado HTTP principales con sus conteos.
- ¿Qué servicios registraban la mayor cantidad de actividad durante ese período de tiempo?

### `search_datadog_logs` {#search-datadog-logs}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Logs Read Data` y `Logs Read Index Data`*\
Busca registros con filtros (tiempo, consulta, servicio, host, nivel de almacenamiento, etcétera) y devuelve los detalles del registro. Renombrado desde `get_logs`.

- Muéstreme los registros de error del servicio nginx en la última hora.
- Encuentre registros que contengan 'connection timeout' de nuestro servicio de API.
- Obtenga todos los registros de código de estado 500 de producción.

### `search_datadog_rum_events` {#search-datadog-rum-events}
*Conjunto de herramientas: **core**, **RUM***\
*Permisos requeridos: `RUM Apps Read`*\
Busque eventos de RUM de Datadog usando sintaxis de consulta avanzada.

- Muestra errores de JavaScript y advertencias de consola en RUM.
- Encuentra páginas que se cargan lentamente (más de 3 segundos).
- Muestra interacciones recientes de usuarios en páginas de detalles de productos.

### `aggregate_rum_events` {#aggregate-rum-events}
*Conjunto de herramientas: **core**, **RUM***\
*Permisos requeridos: `RUM Apps Read`*\
Agrega eventos de RUM para calcular conteos, sumas, promedios, mínimos, máximos, cardinalidad y percentiles, con soporte para agrupación. Úselo para análisis estadístico y datos de tendencias, no para inspeccionar eventos individuales.

- Cuente los errores de JavaScript por página en las últimas 24 horas.
- Muéstreme el tiempo de carga p95 agrupado por país para mi aplicación principal de RUM.
- ¿Cuántas sesiones tuvieron un fallo de Core Web Vitals esta semana?

### `create_datadog_notebook` {#create-datadog-notebook}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Notebooks Read` y `Notebooks Write`*\
Crea un nuevo notebook de Datadog.

- Cree un notebook para documentar la investigación sobre el pico de latencia del servicio de pago.
- Cree un nuevo notebook para nuestra revisión de rendimiento semanal.

### `edit_datadog_notebook` {#edit-datadog-notebook}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Notebooks Read` y `Notebooks Write`*\
Edite un notebook de Datadog existente.

- Agregue una sección al notebook abc-123-def con los resultados del análisis de registros más recientes.
- Actualice el notebook de respuesta a incidentes con los hallazgos de hoy.

## Alerting {#alerting}

Herramientas para validar monitores, buscar grupos de monitores y recuperar plantillas de monitores.

### `validate_datadog_monitor` {#validate-datadog-monitor}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Valida la definición de un monitor para verificar su exactitud antes de crearlo o actualizarlo.

- Valide esta definición de monitor antes de que la cree.
- Verifique si la sintaxis de mi consulta de monitor es correcta.

### `get_datadog_monitor_templates` {#get-datadog-monitor-templates}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Recupera las plantillas de monitor disponibles para ayudarte a crear monitores.

- Muéstrame las plantillas de monitor disponibles.
- ¿Qué plantillas puedo usar para crear un nuevo monitor?

### `search_datadog_monitor_groups` {#search-datadog-monitor-groups}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Busca grupos de monitores por nombre o criterios.

- Muéstrame todos los grupos de monitores en estado de alerta.
- Encuentra grupos de monitores relacionados con el servicio de pago.

### `search_datadog_slos` {#search-datadog-slos}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `SLOs Read`*\
Busque SLO de Datadog por nombre, etiquetas o tipo. Admite sintaxis de consulta para filtrar por servicio, equipo u otros atributos.

- Busque SLO relacionados con `service:checkout`.
- Enumere todos los SLO etiquetados con `team:backend`.
- Enumere los SLO para el servicio de pago.

### `create_datadog_monitor` {#create-datadog-monitor}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Write`*\
Crea un monitor de Datadog en modo borrador. Los monitores creados con esta herramienta no envían notificaciones y se establecen en prioridad 5 (baja). Úselo `validate_datadog_monitor` para verificar la definición antes de crear y `get_datadog_monitor_templates` para ver ejemplos de sintaxis de consulta. Después de la creación, publique el monitor en la interfaz de usuario de Datadog.

- Cree un monitor de alerta para el uso elevado de CPU en el servicio web.
- Configure un monitor de alerta de registro para picos de errores en el servicio de pagos.
- Cree un monitor para rastrear la latencia p95 para el punto final de pago.

### `get_monitor_coverage` {#get-monitor-coverage}
*Conjunto de herramientas: **alertas***\
*Permisos requeridos: `Monitors Read`*\
Encuentra brechas de monitoreo y cobertura para servicios o hosts. Devuelve qué señales (como tasa de error, latencia y tasa de solicitudes) están cubiertas por los monitores existentes y cuáles faltan. Úselo con `create_datadog_monitor` para llenar los vacíos.

- Obtenga cobertura de monitoreo para `service:checkout`.
- ¿Qué vacíos de monitoreo existen para `host:web-01`?
- Encuentre servicios a los que les faltan monitores de tasa de error.

## APM {#apm}

Herramientas para el análisis profundo de trazas [APM][50], búsqueda de tramos, perspectivas de Watchdog e investigación de rendimiento.

<div class="alert alert-info">El <code>apm</code> El conjunto de herramientas está en vista previa. <a href="https://www.datadoghq.com/product-preview/apm-mcp-toolset/">Regístrese para obtener acceso.</a></div>

### `apm_search_spans` {#apm-search-spans}
*Conjunto de herramientas: **APM***\
*Permisos requeridos: `APM Read`*\
Busque tramos utilizando la sintaxis de consulta de APM, con soporte para paginación y filtrado de etiquetas.

- Muéstreme los tramos con errores del servicio de pago en la última hora.
- Encuentre consultas de base de datos lentas que tardan más de 2 segundos.
- Busque tramos con `service:payments` y `status:error`.

### `apm_query_trace` {#apm-query-trace}
*Conjunto de herramientas: **APM***\
*Permisos requeridos: `APM Read`*\
Consulta los datos de tramos de una traza para filtrar, agregar o clasificar tramos, como encontrar los tramos con mayor tiempo propio o rastrear un error hasta su servicio de origen.

- Encuentre los 5 tramos principales por tiempo propio en la traza `abc123`.
- Muéstreme todos los mensajes de error y sus servicios de origen en la traza `abc123`.
- ¿Qué llamadas a la base de datos en esta traza tardaron más de 500ms?

### `apm_discover_span_tags` {#apm-discover-span-tags}
*Conjunto de herramientas: **APM***\
*Permisos requeridos: `APM Read`*\
Descubre las claves de etiqueta disponibles en los tramos dentro de un rango de tiempo.

- ¿Qué etiquetas están disponibles en los tramos para `service:checkout`?
- Muéstreme las claves de etiqueta por las que puedo filtrar en APM.

### `apm_get_primary_tag_keys` {#apm-get-primary-tag-keys}
*Conjunto de herramientas: **APM***\
*Permisos requeridos: `APM Read`*\
Recupera las claves de etiqueta principales configuradas para la organización.

- ¿Cuáles son las claves de etiqueta principales de mi organización?

### `apm_search_watchdog_stories` {#apm-search-watchdog-stories}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Busca historias de detección de anomalías de Watchdog para un servicio dentro de un rango de tiempo, proporcionando información basada en IA sobre anomalías de latencia, tasa de error y tráfico.

- Muéstrame las anomalías de Watchdog para el servicio de checkout en las últimas 24 horas.
- ¿Se han detectado anomalías de latencia para mi servicio de API?

### `apm_get_watchdog_story` {#apm-get-watchdog-story}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Recupera información detallada sobre una historia específica de Watchdog mediante su ID.

- Obtenga los detalles de la historia de Watchdog `abc123`.

### `apm_latency_bottleneck_summary` {#apm-latency-bottleneck-summary}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Analiza los cuellos de botella de latencia en las trazas durante un período de anomalía utilizando cálculos de tiempo propio. Identifica qué combinaciones de servicio y recurso consumen la mayor cantidad de tiempo propio, detecta patrones de llamadas en cascada y revela las causas raíz de los picos de latencia.

- Resuma los cuellos de botella de latencia para el servicio de checkout entre las 2pm y las 3pm de hoy.
- ¿Qué está consumiendo la mayor cantidad de tiempo propio en el servicio de pagos durante este pico de latencia?
- Identifique qué endpoints son los principales cuellos de botella para `service:api` entre las 10:00 y las 10:30.

### `get_change_stories` {#get-change-stories}
*Conjunto de herramientas: **apm***\
Recupera historias de cambios de la API de seguimiento de cambios para servicios de APM. Utilice esto para identificar qué cambió (implementaciones, feature flags, actualizaciones de configuración y eventos de infraestructura) durante un rango de tiempo y correlacionar los cambios con problemas de rendimiento o incidentes.

- Muéstrame las implementaciones y cambios recientes para el servicio de pagos.
- ¿Qué cambios de infraestructura ocurrieron alrededor del momento de este pico de latencia?
- Encuentre cambios en feature flag y configuración para el servicio de checkout en la última hora.

### `semantic_search_change_stories` {#semantic-search-change-stories}
*Conjunto de herramientas: **apm***\
Busca historias de cambios utilizando lenguaje natural y búsqueda semántica basada en IA. Utilice esto para encontrar feature flag o cambios en implementaciones relacionados con un comportamiento, un problema reportado por el usuario o una parte del producto que esté investigando.

- ¿Qué cambió recientemente que podría afectar la carga del tablero para los usuarios de prueba?
- ¿Qué feature flags podrían afectar la autenticación en la página de configuración de facturación?
- Encuentre cambios relacionados con la falta de datos de telemetría en la última semana.

### `apm_search_recommendations` {#apm-search-recommendations}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Busca recomendaciones de APM de Datadog.

- Muéstreme las recomendaciones de APM para mis servicios.
- ¿Hay alguna sugerencia de optimización para mi aplicación?

### `apm_get_recommendation` {#apm-get-recommendation}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Recupera los detalles completos de una recomendación de APM específica por ID.

- Obtenga los detalles de la recomendación `abc123`.

## Audit Trail {#audit-trail}

Herramientas para [Audit Trail][71], que incluyen la búsqueda y recuperación de eventos de Audit Trail y la creación de consultas de búsqueda de Audit Trail.

### `search_audit_events` {#search-audit-events}
*Conjunto de herramientas: **audit-trail***\
*Permisos requeridos: `Audit Trail Read`*\
Busca eventos de Audit Trail utilizando la sintaxis de consulta de Datadog con soporte para paginación. Úselo cuando necesite encontrar y filtrar eventos por atributos específicos. Devuelve eventos de Audit Trail sin metadatos ni valores de activos anteriores o nuevos, a menos que se solicite.

- ¿Quién eliminó el monitor `abc123`?
- ¿Ha habido intentos fallidos de inicio de sesión en Datadog durante la última semana?
- Busque en Audit Trail para ver si hubo notificaciones de filtración de clave de API este mes.

### `list_audit_events` {#list-audit-events}
*Conjunto de herramientas: **audit-trail***\
*Permisos requeridos: `Audit Trail Read`*\
Enumere los eventos de Audit Trail durante un intervalo de tiempo con soporte para paginación y una consulta opcional. Úselo para escanear eventos recientes de Audit Trail. Devuelve eventos de Audit Trail sin metadatos ni valores de activos anteriores o nuevos, a menos que se solicite.

- Muéstreme los eventos de Audit Trail de la última hora.

### `build_audit_trail_query` {#build-audit-trail-query}
*Conjunto de herramientas: **audit-trail***\
*Permisos requeridos: `Audit Trail Read`*\
Traduce una descripción en lenguaje natural a una cadena de consulta de Audit Trail. Si no está seguro de la sintaxis de consulta al buscar eventos de Audit Trail, utilice esta herramienta primero con una descripción de los eventos que desea recuperar, luego pase la consulta devuelta y las marcas de tiempo directamente a `search_audit_events`.

- Proporcione una consulta de Audit Trail para ver quién creó nuevos monitores en las últimas 2 semanas.
- Cree una consulta de Audit Trail para mostrar cuándo se eliminó el dashboard `abc123`.
- Genere una consulta de Audit Trail para verificar qué acciones se ejecutaron a través del servidor Datadog MCP.

## Casos {#cases}

Herramientas para [Case Management][38], que incluyen la creación, búsqueda y actualización de casos; la gestión de proyectos; y la vinculación de incidencias de Jira.

### `search_datadog_cases` {#search-datadog-cases}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Read`*\
Busca casos en [Case Management][38] con filtros que incluyen estado, prioridad, proyecto y responsable. Admite filtrado por rango de tiempo y paginación.

- Muéstrame todos los casos abiertos asignados a mí.
- ¿Hay algún caso P1 abierto en el proyecto de Revisiones de Seguridad?
- Muéstrame todos los casos abiertos esta semana relacionados con el servicio de pago.

### `get_datadog_case` {#get-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Read`*\
Recupera información detallada sobre un caso específico por ID o clave, incluyendo título, estado, prioridad, responsable y marcas de tiempo. Opcionalmente incluye la actividad de la línea de tiempo (comentarios y cambios de estado) y atributos personalizados.

- ¿Cuál es la última actualización sobre CASE-1234? Muéstrame la línea de tiempo completa.
- ¿Quién está trabajando en este caso y qué progreso se ha hecho hasta ahora?
- Muestre los detalles y todos los comentarios para el caso de migración de base de datos.

### `create_datadog_case` {#create-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Write`*\
Crea un nuevo caso de [Case Management][38] con un título, proyecto y campos opcionales como descripción, prioridad y responsable.

- Estoy viendo un pico de latencia en el servicio de checkout. Cree un caso P2 para realizar el seguimiento de la investigación.
- Abra un caso de revisión de seguridad para la actividad de inicio de sesión sospechosa que encontramos en los registros.

### `update_datadog_case` {#update-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Write`*\
Actualiza los campos de un caso existente, como el estado, la prioridad, el título, la descripción, el responsable, la fecha de entrega y los atributos personalizados. Solo se actualizan los campos que proporciones.

- Este problema ahora afecta al cliente. Escale CASE-1234 a P1.
- Marque el caso de migración de base de datos como resuelto.
- Establezca una fecha de entrega para el final de la semana en CASE-1234.

### `add_comment_to_datadog_case` {#add-comment-to-datadog-case}
*Conjunto de herramientas: **cases***\
*Permisos requeridos: `Cases Write`*\
Agrega un comentario a la línea de tiempo de un caso. Los comentarios admiten formato markdown.

- Agregue una nota al caso resumiendo lo que encontramos en los registros y trazas.
- Publique una actualización indicando que el hotfix ha sido implementado y que lo estamos monitoreando.
- Documente los hallazgos del análisis de causa raíz en este caso.

### `link_jira_issue_to_datadog_case` {#link-jira-issue-to-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Write`*

- Vincule el ticket de Jira para la migración de infraestructura a este caso para que podamos rastrear ambos juntos.
- Conecte PROJ-456 al caso de Datadog para que el equipo de ingeniería tenga visibilidad.

### `list_datadog_case_projects` {#list-datadog-case-projects}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Read`*\
Enumera los proyectos disponibles en [Case Management][38] con filtrado opcional por nombre o clave.

- ¿Qué proyectos están disponibles en Case Management?
- ¿Hay algún proyecto relacionado con seguridad en Case Management?

### `get_datadog_case_project` {#get-datadog-case-project}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Read`*\
Recupera los detalles de un proyecto de caso específico por ID.

- ¿De qué proyecto forma parte este caso?

### `search_datadog_users` {#search-datadog-users}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `User Access Read`*\
Busca usuarios de Datadog por correo electrónico, nombre o identificador. Útil para encontrar a la persona adecuada a quien asignar un caso.

- Encuentre la cuenta de usuario de Datadog para jane.doe@example.com.

## Cloud Cost Management {#cloud-cost-management}

Herramientas para [Cloud Cost Management][64], incluida la lista de recomendaciones de ahorro de costos clasificadas por el ahorro diario potencial estimado.

### `cost_recommendations` {#cost-recommendations}
*Conjunto de herramientas: **costo***\
*Permisos requeridos: `Cloud Cost Management Read`*\
Enumera las recomendaciones de ahorro de costos de Cloud Cost Management de una organización, clasificadas por el ahorro diario potencial estimado (primero las más altas). Admite filtrado por facetas por proveedor de nube, tipo de recomendación, estado, umbral de ahorro y etiquetas de recursos, junto con paginación y un resumen del recuento total y el ahorro diario potencial total.

#### Ejemplos de consultas: {#examples-of-queries}

- ¿Cuáles son mis principales recomendaciones de ahorro de costos en la nube?
- ¿Cuánto podría ahorrar por día y cuántas recomendaciones abiertas tengo?
- ¿Cuál de nuestras optimizaciones de clúster de Kubernetes ya tiene el equipo en marcha?

## Ejecución de código {#code-execution}

Una única herramienta que ejecuta TypeScript creado por el agente en un entorno aislado administrado por Datadog con acceso directo a las API de Datadog, para la investigación de múltiples señales y la exploración de datos ad-hoc en una sola llamada.

<div class="alert alert-info">El <code>code-exec</code> conjunto de herramientas está en vista previa. <a href="https://www.datadoghq.com/product-preview/mcp-codexec/">Regístrese</a> para la vista previa o contacte a <a href="/help">soporte de Datadog</a> para solicitar acceso.</div>

El código ejecutado por este conjunto de herramientas se ejecuta contra sus APIs de Datadog utilizando su propia identidad de usuario. El entorno aislado aplica sus [permisos de rol][56] existentes a cada llamada de API, por lo que un agente solo puede leer o modificar datos a los que usted ya puede acceder en Datadog.

### `execute_code` {#execute-code}
*Conjunto de herramientas: **code-exec***\
*Permisos requeridos: Cualquier permiso de rol específico del producto necesario para acceder a los recursos subyacentes de Datadog con los que interactúa el código ejecutado (por ejemplo, `Logs Read` para leer registros).*\
Ejecuta TypeScript creado por un agente de IA en un entorno aislado gestionado por Datadog. El código recibe un espacio de nombres `dd.*` con asistentes para consultar registros, métricas, trazas, servicios, eventos de cambio, incidentes, monitores, tableros y otras APIs de Datadog, y devuelve un valor estructurado al agente. Esto puede reducir la cantidad de viajes de ida y vuelta necesarios para investigaciones de señales múltiples y exploración de datos ad-hoc.

- Para el servicio `checkout-api` en las últimas dos horas, extraiga los registros de errores, las métricas de latencia y las implementaciones recientes, y dígame qué implementación coincide con el pico de errores.
- Compare los conteos de tramos de error, las alertas de monitores y los cambios de configuración para el servicio `payments` durante el último día, e identifique cualquier cosa que se haya movido al mismo tiempo.
- Para `auth-service`, correlacione los patrones de error principales en los registros con las métricas de CPU y memoria de la última hora para ver si los errores siguen la presión de los recursos.

## Dashboards {#dashboards}

Herramientas para recuperar, crear, actualizar y eliminar [Dashboards][46], además de referencia y validación del esquema de widgets.

### `get_datadog_dashboard` {#get-datadog-dashboard}
*Conjunto de herramientas: **core**, **dashboards***\
*Permisos requeridos: `Dashboards Read` y `User Access Read`*\
Recupera un [Dashboard][46] de Datadog por ID, devolviendo su título, descripción, etiquetas y widgets. Use `search_datadog_dashboards` primero para encontrar los IDs de dashboard.

- Obtenga los detalles completos del dashboard `ps7-mn3-kwf`.
- Muéstreme los widgets y el diseño del dashboard de descripción general de la infraestructura.
- Recupere las variables de plantilla configuradas en este dashboard.

### `upsert_datadog_dashboard` {#upsert-datadog-dashboard}
*Conjunto de herramientas: **core**, **dashboards***\
*Permisos requeridos: `Dashboards Read` y `Dashboards Write`*\
Crea o actualiza un [dashboard][46] de Datadog. Para actualizar un [dashboard] existente, proporcione el ID del dashboard; omítalo para crear uno nuevo. Llame a `get_widget_reference` para obtener esquemas de widgets antes de crear widgets.

- Cree un dashboard que muestre el uso de CPU y memoria en todos los hosts.
- Agregue un widget de series temporales para la tasa de error al dashboard `abc-123-def`.
- Actualice el título y la descripción de mi dashboard de resumen de servicio.

### `delete_datadog_dashboard` {#delete-datadog-dashboard}
*Conjunto de herramientas: **dashboards***\
*Permisos requeridos: `Dashboards Read` y `Dashboards Write`*\
Elimina permanentemente un [dashboard][46] de Datadog por ID. Esta acción no se puede deshacer. Use `search_datadog_dashboards` primero para encontrar los IDs de dashboard.

- Elimine el dashboard `ps7-mn3-kwf`.
- Elimine el dashboard del entorno de ensayo antiguo.

### `get_widget_reference` {#get-widget-reference}
*Conjunto de herramientas: **dashboards***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read`*\
Devuelve esquemas e instrucciones de creación para tipos de widgets de dashboard. Las definiciones de widgets son objetos JSON; esta herramienta devuelve definiciones de tipo TypeScript que representan sus esquemas junto con instrucciones de creación que cubren patrones de consulta, sintaxis de fórmulas y errores comunes. Llame a esto antes de generar widgets con `upsert_datadog_dashboard`.

- Obtenga el esquema para un widget de series temporales.
- Muéstreme cómo crear un widget de lista superior y una tabla de consulta.
- ¿Cuál es el esquema para el widget de gráfico de dispersión?

### `validate_dashboard_widget` {#validate-dashboard-widget}
*Conjunto de herramientas: **tableros***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read`*\
Valida una definición de widget contra el esquema del tablero. Usa esto para verificar el JSON del widget antes de pasarlo a `upsert_datadog_dashboard`.

- Valida mi definición de widget de series temporales antes de crear el tablero.
- Verifica si este JSON de widget de tabla es correcto.

### `ask_widget_expert` {#ask-widget-expert}
*Conjunto de herramientas: **tableros***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read`*\
Haga una pregunta a un experto en widgets de Datadog sobre la configuración de widgets, esquemas, sintaxis de consultas, uso de campos, depuración o dificultades. Ideal para preguntas específicas: consultas de esquemas, aclaraciones de campos, depuración de una definición de widget existente o comprensión de cómo funciona un tipo de widget específico.

- ¿Qué response_format debo usar para una lista superior?
- ¿Cuál es el esquema para el widget de gráfico de dispersión?
- Ayúdeme a depurar por qué este widget muestra valores fraccionarios cuando debería ser un conteo.
- ¿Cómo configuro un widget de series temporales para mostrar tanto barras como líneas?

## Data Observability {#data-observability}

Herramientas para [Data Observability][70], que incluyen búsqueda en el catálogo de datos, análisis de linaje, monitoreo de la calidad de los datos y recomendaciones de costo y rendimiento para almacenes de datos y trabajos de Spark.

### `search_data_entities` {#search-data-entities}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read` o `APM Read`*\
Busca entidades de datos en el catálogo de datos por nombre, búsqueda de texto completo o filtros (plataforma, esquema, base de datos, cuenta).

- Encuentra tablas llamadas \"orders\" en Snowflake.
- Enumere todos los modelos dbt que comiencen con `stg_`.
- ¿Qué esquemas existen en mi proyecto de BigQuery?

### `get_data_catalog_schema` {#get-data-catalog-schema}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read` o `APM Read`*\
Devuelve el esquema de tipo de entidad para cada plataforma con datos en el catálogo: tipos de entidad, jerarquía de contención, atributos filtrables y métricas predeterminadas.

- ¿Qué plataformas están conectadas a Data Observability?
- ¿Qué tipos de entidad existen para Databricks?
- ¿Qué métricas están disponibles para una entidad de tabla?

### `get_data_entity_details` {#get-data-entity-details}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read` o `APM Read`*\
Obtiene los detalles completos y atributos (propietario, etiquetas, atributos personalizados, plataforma, esquema, base de datos, cuenta) para una o más entidades de datos por ID.

- Obtenga los atributos completos de esta entidad de tabla.
- ¿Quién es el propietario de este conjunto de datos?

### `get_data_entity_hierarchy` {#get-data-entity-hierarchy}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read` o `APM Read`*\
Obtiene la jerarquía de contención (ancestros y descendientes) para una o más entidades; por ejemplo, a qué base de datos o esquema pertenece una tabla, o qué tablas hay en un esquema.

- ¿A qué base de datos pertenece esta tabla?
- ¿Qué columnas hay en esta tabla?
- Muestre la jerarquía completa alrededor de esta entidad.

### `get_data_entity_lineage` {#get-data-entity-lineage}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read` o `APM Read`*\
Obtiene el subgrafo de linaje alcanzable en vivo (nodos y bordes) desde una o más entidades ancla, ascendente, descendente o ambos.

- ¿Qué entidades se encuentran en el linaje descendente de esta tabla?
- Muéstreme el linaje ascendente de esta columna.
- ¿Qué se rompería si elimino esta tabla?

### `summarize_data_entity_lineage` {#summarize-data-entity-lineage}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read` o `APM Read`*\
Devuelve estadísticas de linaje agregado (recuentos de nodos/bordes, desgloses por tipo, distribución de profundidad) para un gráfico de linaje grande o desconocido, sin la carga útil completa. Úselo antes de `get_data_entity_lineage` en gráficos de tamaño desconocido.

- ¿Cuántas cosas dependen de esta tabla, desglosadas por tipo?
- ¿Qué tan profundo llega el linaje desde esta tabla?

### `rank_data_entities_by_lineage_degree` {#rank-data-entities-by-lineage-degree}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read` o `APM Read`*\
Clasifica las entidades por conectividad de linaje transitivo (ascendente, descendente o ambas), utilizando una instantánea preconstruida.

- ¿Qué tablas en mi almacén tienen la mayor cantidad de dependencias?
- ¿Qué tablas de ingesta sin procesar tienen las cadenas descendentes más profundas?

### `get_warehouse_query_history` {#get-warehouse-query-history}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Logs Read Data` y `Logs Read Index Data`*\
Obtiene las consultas recientes que afectaron a entidades específicas, en orden cronológico inverso, incluyendo el texto SQL, el estado de ejecución y el tipo de consulta.

- ¿Quién ha estado consultando esta tabla recientemente?
- ¿Qué operaciones de escritura han ocurrido en esta tabla en la última semana?

**Nota**: El campo `sql` en los resultados es SQL sin procesar, creado por el usuario desde el almacén de datos y debe tratarse como datos no confiables.

### `get_popular_warehouse_tables_by_query_frequency` {#get-popular-warehouse-tables-by-query-frequency}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Logs Read Data` y `Logs Read Index Data` y `APM Read`*\
Clasifica las tablas por actividad de consulta, agrupadas por quién las consulta: usuarios humanos, herramientas de BI, orquestadores, herramientas de ETL o cuentas de servicio internas.

- ¿Qué tablas son las más consultadas por las herramientas de BI?
- ¿Qué tablas reciben la mayor cantidad de tráfico de analistas humanos?

### `suggest_data_observability_monitor_filters` {#suggest-data-observability-monitor-filters}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read`*\
Analiza un conjunto de entidades para encontrar atributos comunes y patrones de nomenclatura, y sugiere expresiones de filtro de monitoreo que agrupen subconjuntos de esas entidades.

- ¿Qué tienen en común mis tablas de mayor prioridad?
- Sugiera un filtro que cubra todas mis tablas de preparación.

### `rank_data_observability_monitor_candidates` {#rank-data-observability-monitor-candidates}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `APM Read`*\
Clasifica las tablas por prioridad de monitoreo, combinando el impacto del linaje y la actividad de consulta en una única puntuación composite. Este es el punto de entrada principal para "¿qué debo monitorear?" preguntas.

- ¿Para qué tablas debo configurar primero los monitores de calidad de datos?

### `get_data_observability_monitor` {#get-data-observability-monitor}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read` y `Timeseries` y `APM Read`*\
Recupera series temporales de métricas de calidad de datos para un ID de monitor determinado, incluidos los límites de detección de anomalías cuando están habilitados.

- Muéstreme el historial de métricas para el monitor `12345`.
- ¿Cuáles son los límites de detección de anomalías para este monitor de frescura?

### `get_data_observability_monitor_coverage` {#get-data-observability-monitor-coverage}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `Monitors Read`*\
Obtiene todos los monitores de calidad de datos para la organización y resuelve el filtro de cada monitor para las entidades que cubre. Úselo para ver qué tablas no tienen ningún monitoreo.

- ¿Cuáles de mis tablas no están cubiertas por ningún monitor de calidad de datos?

### `get_data_observability_monitor_group_statuses` {#get-data-observability-monitor-group-statuses}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `APM Read`*\
Consulta el estado actual de alerta y advertencia de los grupos de monitoreo de calidad de datos.

- ¿Qué tablas están fallando actualmente en sus comprobaciones de calidad de datos?

### `get_entity_tags` / `update_entity_tags` {#get-entity-tags-update-entity-tags}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `APM Read` o `Monitors Read` (obtener); `Data Observability Catalog Write` (actualizar)*\
Obtiene o establece etiquetas personalizadas definidas por el usuario en entidades de datos.

- ¿Qué etiquetas tiene esta tabla?
- Etiquete esta tabla con `owner:data-platform-team`.

### `get_entity_descriptions` / `update_entity_description` {#get-entity-descriptions-update-entity-description}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `APM Read` o `Monitors Read` (obtener); `Data Observability Catalog Write` (actualizar)*\
Obtiene o establece descripciones personalizadas definidas por el usuario en entidades de datos.

- ¿Cuál es la descripción de esta tabla?
- Establezca una descripción que explique para qué se utiliza esta tabla.

### `get_spark_job_health` {#get-spark-job-health}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `APM Read`*\
Recupera métricas de salud detalladas (duración, tiempo de CPU del ejecutor, mezcla, derrame, etapas más críticas) para una sola ejecución de trabajo de Spark o Databricks.

- ¿Por qué este trabajo de Spark se ejecutó lentamente?
- Muéstrame las peores etapas para la ejecución más reciente de este trabajo.

### `get_spark_sql_plan` {#get-spark-sql-plan}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `APM Read`*\
Recupera el plan de ejecución física de Spark SQL para una etapa, incluyendo estrategias de unión, información de mezcla y métricas por nodo.

- Muéstrame el plan de ejecución para esta etapa de Spark.

### `list_data_observability_recommendations` {#list-data-observability-recommendations}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `APM Read`*\
Enumera las recomendaciones de optimización de costos y rendimiento para trabajos y consultas de datos (Spark, Databricks, Snowflake, BigQuery), con ahorros estimados de costo y duración. Devuelve resúmenes ligeros con paginación de cursor.

- ¿Qué recomendaciones de ahorro de costos tengo para mis trabajos de Databricks?
- ¿Hay alguna recomendación para reducir la asimetría de datos en mis trabajos de Spark?

### `get_data_observability_recommendation` {#get-data-observability-recommendation}
*Conjunto de herramientas: **data-observability***\
*Permisos requeridos: `APM Read`*\
Recupera los detalles completos de una recomendación específica de Data Observability por ID, incluyendo su cuerpo estructurado que describe el problema, la evidencia y el cambio propuesto.

- Obtenga los detalles de la recomendación `abc123`.

## Database Monitoring {#database-monitoring}

Herramientas para interactuar con [Database Monitoring][26].

### `find_datadog_database_instances` {#find-datadog-database-instances}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Descubre y clasifica instancias de bases de datos para la investigación de DBM. Llame a esto antes que otras herramientas de DBM que requieran un parámetro `database_instance`. Acepta una traza de APM o un ID de tramo, etiquetas, o ambos para encontrar instancias coincidentes, luego evalúa y clasifica su estado de salud.

- Encuentre instancias de base de datos correlacionadas con la traza `abc123` de hace una hora.
- ¿Qué instancias de PostgreSQL coinciden con `cluster_name:payments-prod`?
- Clasifique las instancias de base de datos para el servicio `checkout-api` por estado de salud.

### `get_datadog_database_calling_services` {#get-datadog-database-calling-services}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Identifica servicios y recursos de APM ascendentes que llaman a consultas de base de datos. Correlaciona la actividad de la base de datos con las trazas de la aplicación para el análisis de causa raíz a través del límite entre APM y la base de datos.

- ¿Qué servicios están llamando a las consultas más lentas en `db-prod-1`?
- Encuentra el origen principal de la firma de consulta `abc123def`.
- Muéstrame los recursos de APM que generan carga en la base de datos de pagos.

### `get_datadog_database_explain_plans` {#get-datadog-database-explain-plans}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera los planes de explicación de PostgreSQL para una firma de consulta dentro de un marco de tiempo. Devuelve estructuras de plan simplificadas con árboles de operadores, uso de índices y costos estimados, ordenados por costo.

- Obtenga los planes de explicación para la firma de consulta `abc123def` en `db-prod-1`.
- Muéstreme los planes de ejecución más costosos para esta consulta lenta.
- ¿Qué variaciones de plan tiene la firma de consulta `xyz789` durante el último día?

### `get_datadog_database_health_signals` {#get-datadog-database-health-signals}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Ejecuta comprobaciones de estado para detectar posibles problemas de PostgreSQL, como saturación de CPU, reinicios, latencia de consultas y bloqueos. Compara un marco de tiempo de regresión con un período de referencia.

- Ejecute comprobaciones de estado en `db-prod-1` para la última hora en comparación con la hora anterior.
- Verifique el estado de la base de datos alrededor del marco de tiempo del incidente.
- ¿Qué señales explican la regresión en la base de datos de pagos?

### `get_datadog_database_query_performance` {#get-datadog-database-query-performance}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Analiza el rendimiento de una consulta específica de PostgreSQL. Devuelve el rendimiento, la latencia promedio, el tiempo de ejecución, las filas por ejecución, la tasa de aciertos de caché, las estadísticas de E/S, la actividad de conexión, los eventos de espera y la duración de la transacción, con estadísticas generales y análisis por intervalos de tiempo.

- Analice el rendimiento de la firma de consulta `abc123def` durante la última hora.
- ¿Por qué esta consulta es lenta en la instancia de producción de PostgreSQL?
- Muéstreme los eventos de espera y la tasa de aciertos de caché para la firma de consulta `xyz789`.

### `get_datadog_database_query_statement` {#get-datadog-database-query-statement}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera el texto de la sentencia SQL para una firma de consulta determinada. Utilice esto para asignar hashes de firma de nuevo al SQL concreto para investigación y generación de informes.

- Obtenga el SQL para la firma de consulta `abc123def`.
- Muéstreme la sentencia detrás de este hash de consulta en `db-prod-1`.
- ¿A qué consulta corresponde la firma `xyz789`?

### `get_datadog_database_recommendations` {#get-datadog-database-recommendations}
*Conjunto de herramientas: **Database Monitoring***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera recomendaciones de base de datos en tiempo real para una base de datos, consulta, tabla, host o índice. Devuelve las recomendaciones coincidentes con estado, gravedad y un bloque de alcance normalizado que resalta las instancias afectadas, firmas de consulta, tablas, índices, servicios, planes e identificadores de infraestructura.

- Muéstreme recomendaciones de base de datos abiertas para `db-prod-1`.
- Liste recomendaciones de índices faltantes en la base de datos de pagos.
- Obtenga recomendaciones de alta gravedad para la firma de consulta `abc123def`.

### `get_datadog_database_schemas` {#get-datadog-database-schemas}
*Conjunto de herramientas: **Database Monitoring***\
*Permisos requeridos: `Database Monitoring Read`*\
Obtiene definiciones de esquema (columnas, índices, claves foráneas, particiones) para uno o más objetos de base de datos. Acepta nombres de tabla con calificadores opcionales de esquema, base de datos e instancia.

- Muéstreme el esquema para la tabla `orders`.
- Obtenga columnas e índices para `public.users` en `db-prod-1`.
- Obtenga claves foráneas para la tabla `payments`.

### `optimize_datadog_database_query` {#optimize-datadog-database-query}
*Conjunto de herramientas: **Database Monitoring***\
*Permisos requeridos: `Database Monitoring Read`*\
Analiza una consulta de PostgreSQL en busca de oportunidades de optimización utilizando reglas deterministas. Devuelve reescrituras de consultas, detección de antipatrones (`SELECT *`, `OFFSET` sin `ORDER BY`, `ORDER BY` sin `LIMIT`), sugerencias de índices faltantes y análisis de impacto de transacciones inactivas. Acepta texto SQL o una firma de consulta.

- Optimice la firma de consulta `abc123def` en la base de datos de pagos.
- Revise este SQL en busca de índices faltantes y antipatrones.
- Sugiera reescrituras para la consulta más lenta en `db-prod-1`.

### `search_datadog_database_plans` {#search-datadog-database-plans}
*Conjunto de herramientas: **Database Monitoring***\
*Permisos requeridos: `Database Monitoring Read`*\
Busque planes de ejecución de consultas en [Database Monitoring][26], los cuales muestran cómo el motor de base de datos ejecuta las consultas, incluyendo el uso de índices, estrategias de unión y estimaciones de costo. Utilice esto para analizar el rendimiento de las consultas e identificar oportunidades de optimización.

- Muéstreme los planes de ejecución para las consultas lentas en `host:db-prod-1` de la última hora.
- Busque planes de consulta con `@db.plan.type:explain_analyze` para la base de datos de producción.
- Obtenga los planes de ejecución para las consultas por `@db.user:app_user` con una duración mayor a 1 segundo.

### `search_datadog_database_samples` {#search-datadog-database-samples}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Busca muestras de consultas en [Database Monitoring][26], las cuales representan ejecuciones de consultas individuales con métricas de rendimiento. Utilice esto para analizar patrones de actividad de la base de datos, identificar consultas lentas e investigar problemas de rendimiento de la base de datos.

- Muéstrame muestras de consultas con `@duration:>1000000000` (duración mayor a 1 segundo) de `db:mydb`.
- Encuentra consultas lentas en `host:db-prod-1` filtradas por `@db.user:app_user`.
- Obtenga muestras de consultas recientes para `@db.query_signature:abc123def` y analiza los patrones de rendimiento.

## DDSQL {#ddsql}

Herramientas para consultar datos de Datadog mediante [DDSQL][41], un dialecto de SQL con soporte para recursos de infraestructura, registros, métricas, RUM, tramos y otras fuentes de datos de Datadog.

### `ddsql_get_spec` {#ddsql-get-spec}
*Conjunto de herramientas: **ddsql***\
Obtiene una especificación compacta de las capacidades de DDSQL, incluyendo funciones SQL compatibles, palabras clave de SQL y las diferencias específicas de DDSQL respecto al PostgreSQL estándar. Utilice esta herramienta antes de redactar consultas para comprender la sintaxis admitida.

- ¿Qué funciones SQL son compatibles en DDSQL?
- Muéstrame las reglas de sintaxis de consultas de DDSQL y las diferencias con PostgreSQL.
- ¿Qué funciones de agregación puedo usar en DDSQL?

### `ddsql_schema_search_tables` {#ddsql-schema-search-tables}
*Conjunto de herramientas: **ddsql***\
Busca conjuntos de datos de DDSQL y devuelve tablas (fuentes de datos públicas y tablas de referencia) y las métricas disponibles.

- ¿Qué tablas están disponibles para consultar en DDSQL?
- Busca tablas de DDSQL relacionadas con Kubernetes.
- Muéstrame las métricas disponibles que puedo consultar con DDSQL.

### `ddsql_schema_get_table_columns` {#ddsql-schema-get-table-columns}
*Conjunto de herramientas: **ddsql***\
Obtiene columnas SQL estáticas para una tabla de DDSQL a partir de los metadatos del esquema.

- ¿Qué columnas están disponibles en la tabla `aws.ec2_instance`?
- Muéstrame el esquema de la tabla `k8s.pods`.

### `ddsql_schema_search_unstructured_fields` {#ddsql-schema-search-unstructured-fields}
*Conjunto de herramientas: **ddsql***\
Busca y clasifica campos para fuentes de DDSQL no estructuradas, como registros, RUM y tramos, ordenados por frecuencia. Utiliza esta herramienta para el descubrimiento de esquemas en fuentes buscables antes de recurrir a `ddsql_schema_get_table_columns`.

- ¿Qué campos están disponibles en los registros de DDSQL?
- Encuentra campos relacionados con `service` en mis datos de RUM.
- Muéstrame los campos más comunes en mis datos de tramos.

### `ddsql_run_query` {#ddsql-run-query}
*Conjunto de herramientas: **ddsql***\
Ejecuta una consulta de DDSQL y devuelve los resultados. Admite el uso de sintaxis SQL para consultar recursos de infraestructura, registros, métricas, RUM, tramos y otras fuentes de datos de Datadog. Consulta la [Referencia de DDSQL][42] para obtener detalles sobre la sintaxis.

- ¿Cuántas instancias EC2 se están ejecutando en cada región de AWS?
- Muéstrame los 10 servicios principales por recuento de registros de errores en la última hora.
- Consulta el uso promedio de CPU agrupado por host durante las últimas 24 horas.

### `ddsql_create_link` {#ddsql-create-link}
*Conjunto de herramientas: **ddsql***\
Genera un enlace de la interfaz de usuario de Datadog al [Editor de DDSQL][41] con una consulta determinada precargada.

- Genera un enlace al DDSQL Editor para esta consulta.
- Crea un enlace compartible al DDSQL Editor con mi consulta de infraestructura.

## Error Tracking {#error-tracking}

Herramientas para interactuar con el [Error Tracking][49] de Datadog.

### `search_datadog_error_tracking_issues` {#search-datadog-error-tracking-issues}
*Conjunto de herramientas: **error-tracking***\
*Permisos requeridos: `Error Tracking Read`*\
Busca problemas de Error Tracking en todas las fuentes de datos (RUM, registros, trazas).

- Muéstrame todos los problemas de Error Tracking en el servicio de pago de la última hora.
- ¿Cuáles son los errores más comunes en mi aplicación durante la última semana?
- Encuentra problemas de Error Tracking en el entorno de producción con `service:api`.

### `get_datadog_error_tracking_issue` {#get-datadog-error-tracking-issue}
*Conjunto de herramientas: **error-tracking***\
*Permisos requeridos: `Cases Read` y `Error Tracking Read`*\
Recupera información detallada sobre un problema de Error Tracking específico de Datadog.

- Ayúdame a resolver el problema de Error Tracking `550e8400-e29b-41d4-a716-446655440000`.
- ¿Cuál es el impacto del problema de Error Tracking `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f`?
- Crea un caso de prueba para reproducir el problema de Error Tracking `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`.

### `analyze_datadog_error_tracking_errors` {#analyze-datadog-error-tracking-errors}
*Conjunto de herramientas: **error-tracking***\
*Permisos requeridos: `Error Tracking Read` y `Timeseries`*\
Analiza errores de Error Tracking de Datadog mediante consultas SQL para conteo, agregaciones y análisis numérico. Opera sobre muestras de errores individuales, no sobre problemas (grupos de errores).

- Cuenta los errores por servicio en la última hora.
- Muéstrame los principales tipos de error en el servicio de pago durante la última semana.
- Desglosa los errores por versión para identificar qué implementación introdujo un problema.

### `update_datadog_error_tracking_issue` {#update-datadog-error-tracking-issue}
*Conjunto de herramientas: **error-tracking***\
*Permisos requeridos: `Cases Read`, `Cases Write`, `Error Tracking Read` y `Error Tracking Write`*\
Actualiza el estado o el responsable de un problema de Error Tracking en Datadog.

- Marcar el problema de Error Tracking `550e8400-e29b-41d4-a716-446655440000` como resuelto.
- Asignarme el problema de Error Tracking `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f`.
- Establecer el estado del problema de Error Tracking `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f` como ignorado.

### `manage_datadog_error_tracking_issue_comments` {#manage-datadog-error-tracking-issue-comments}
*Conjunto de herramientas: **error-tracking***\
*Permisos requeridos: `Cases Read`, `Cases Write`, `Error Tracking Read` y `Error Tracking Write`*\
Agrega, actualiza o elimina un comentario en un problema de Error Tracking de Datadog.

- Agrega un comentario al problema de Error Tracking `550e8400-e29b-41d4-a716-446655440000` que diga "Investigando esto ahora".
- Actualiza el comentario que acabamos de agregar para que diga "Corregido en la versión 2.3.1".
- Elimina el comentario que acabamos de agregar de ese problema.

## Experimentos {#experiments}

Herramientas para gestionar y analizar [Experiments][62], incluyendo la creación y conclusión de experimentos, la ejecución de diagnósticos y la investigación de movimientos de métricas.

<div class="alert alert-info">El <code>experiments</code> conjunto de herramientas no está habilitado de forma predeterminada. Consulta <a href="/mcp_server/setup">Configurar el servidor Datadog MCP</a> para obtener instrucciones sobre cómo habilitar los conjuntos de herramientas.</div>

### `list_experiments` {#list-experiments}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Read`*\
Enumera los experimentos de la organización, con búsqueda opcional por nombre, límite y desplazamiento para la paginación.

- Muéstrame todos los experimentos en ejecución.
- Busca experimentos con "checkout" en el nombre.

### `get_experiment` {#get-experiment}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Read`*\
Obtiene un experimento individual por ID, incluyendo el estado, la bandera de función vinculada, el tipo de sujeto, la métrica principal, las fechas de asignación y la decisión.

- Obtén los detalles del experimento `abc123`.
- ¿Cuál es el estado actual y la bandera vinculada para el experimento `abc123`?

### `create_experiment` {#create-experiment}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Write`*\
Crea un nuevo experimento con un nombre, hipótesis, tipo de sujeto y métrica principal.

- Crea un experimento llamado "New Checkout Flow" para probar si el rediseño mejora la tasa de conversión.

### `link_feature_flag_to_experiment` {#link-feature-flag-to-experiment}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Write`*\
Vincula un feature flag a un experimento.

- Vincular feature flag `new-checkout-flow` al experimento `abc123`.

### `start_experiment` {#start-experiment}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Write`*\
Inicia un experimento. Requiere un Feature Flag vinculado con una asignación activa, un tipo de sujeto y una métrica principal.

- Iniciar experimento `abc123`.

### `conclude_experiment` {#conclude-experiment}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Write`*\
Concluye un experimento en ejecución con una decisión permanente de variante ganadora.

- Concluir experimento `abc123` con la variante de tratamiento como ganadora.

### `cancel_experiment` {#cancel-experiment}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Write`*\
Cancela un experimento en ejecución con un motivo obligatorio.

- Cancelar el experimento `abc123` porque se detectó un problema de SRM.

### `get_experiment_diagnostics` {#get-experiment-diagnostics}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Read`*\
Devuelve un resumen de salud de un experimento antes de interpretar los resultados: estado de discrepancia en la proporción de la muestra (SRM), total de sujetos, recuentos y fracciones de exposición por variante, y estado de salud por métrica, incluidas las métricas poco fiables y sin datos. Llame a esto antes de `get_experiment_results`; si `srm.has_warning` es verdadero, las comparaciones a nivel de variante no son seguras de interpretar.

- Ejecute diagnósticos en el experimento `abc123` antes de revisar los resultados.
- ¿Existe una discrepancia en la proporción de la muestra en el experimento `abc123`?

### `get_experiment_results` {#get-experiment-results}
*Conjunto de herramientas: **experimentos***\
*Permisos requeridos: `Product Analytics Experiments Read`*\
Devuelve los resultados calculados por variante y por métrica. El campo `verdict` (`better`, `worse`, `inconclusive` o `unreliable`) es definitivo; no vuelva a calcular la significancia a partir de valores p sin procesar o intervalos de confianza.

- Muéstreme los resultados del experimento `abc123`.
- ¿Cuál es el veredicto sobre la métrica principal para el experimento `abc123`?

### `explore_experiment_results` {#explore-experiment-results}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Read`, `Product Analytics Metrics Read`*\
Segmenta los resultados por una propiedad de asignación (tipo de dispositivo, país, nivel de plan, etcétera) o a lo largo del tiempo. Úselo después de `get_experiment_results` para un análisis más profundo.

- Desglose los resultados del experimento `abc123` por tipo de dispositivo.
- ¿Cómo fue la tendencia del incremento para el experimento `abc123` durante las últimas dos semanas?

### `list_experiment_segmentation_properties` {#list-experiment-segmentation-properties}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Read`, `Product Analytics Metrics Read`*\
Enumera las propiedades de asignación por las que se puede dividir un experimento. Llame a esto antes de `explore_experiment_results` para obtener identificadores de propiedad válidos; no los adivine.

- ¿Qué propiedades de segmentación puedo usar para desglosar el experimento `abc123`?

### `get_experiment_segmentation_property_values` {#get-experiment-segmentation-property-values}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Read`, `Product Analytics Metrics Read`*\
Devuelve los valores concretos para una propiedad de segmentación (por ejemplo, `["mobile", "desktop", "tablet"]` para el tipo de dispositivo). Úselo antes de filtrar en `explore_experiment_results` para evitar cadenas de filtro no válidas.

- ¿Qué valores están disponibles para la propiedad de tipo de dispositivo en el experimento `abc123`?

### `get_metric_definition` {#get-metric-definition}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Metrics Read`*\
Devuelve la definición de una métrica de experimento: la consulta de eventos subyacente, la fuente de datos y la herramienta Datadog MCP recomendada para investigar por qué cambió la métrica. Para métricas provenientes de `datadog`, la respuesta incluye un campo `recommended_tool_call` con los parámetros estructurados necesarios para consultar los datos de eventos sin procesar. No son para métricas de infraestructura de Datadog o APM; utilice `get_datadog_metric` para ellas.

- ¿Cuál es la consulta de eventos detrás de la métrica principal para el experimento `abc123`?
- ¿Qué herramienta Datadog MCP debo usar para investigar por qué cambió esta métrica?

### `diagnose_experiment_run_failure` {#diagnose-experiment-run-failure}
*Conjunto de herramientas: **experiments***\
*Permisos requeridos: `Product Analytics Experiments Read`*\
Diagnostica por qué falló la ejecución más reciente (o una específica) de la pipeline de análisis de un experimento. Devuelve la tarea de causa raíz, una explicación categorizada del fallo y los siguientes pasos prácticos. Utilice `get_experiment_diagnostics` para problemas de calidad de resultados y SRM en su lugar.

- ¿Por qué falló la ejecución de análisis más reciente para el experimento `abc123`?
- Diagnostique el fallo de la pipeline para el experimento `abc123`.

## Feature Flags {#feature-flags}

Herramientas para administrar [Feature Flags][51], incluyendo la creación, el listado y la actualización de Feature Flags y sus entornos.

### `list_datadog_feature_flags` {#list-datadog-feature-flags}
*Conjunto de herramientas: **feature-flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Enumera los Feature Flags con soporte de paginación.

- Muéstreme todos los Feature Flags en mi organización.
- Enumere los Feature Flags para el checkout service.

### `get_datadog_feature_flag` {#get-datadog-feature-flag}
*Conjunto de herramientas: **feature-flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Obtiene detalles sobre un Feature Flag específico.

- Obtenga los detalles del Feature Flag `dark-mode-enabled`.
- ¿Cuáles son los ajustes actuales para el Feature Flag `new-checkout-flow`?

### `create_datadog_feature_flag` {#create-datadog-feature-flag}
*Conjunto de herramientas: **feature-flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Write`*\
Crea un nuevo Feature Flag.

- Cree un Feature Flag llamado `enable-new-dashboard` para un despliegue gradual.
- Configure un nuevo Feature Flag booleano para la beta feature.

### `list_datadog_feature_flag_environments` {#list-datadog-feature-flag-environments}
*Conjunto de herramientas: **feature-flags***\
*Permisos requeridos: `Feature Flag Environment Read`*\
Enumera los entornos configurados para los Feature Flags.

- Muéstreme los entornos de Feature Flags disponibles.
- ¿A qué entornos puedo dirigir los Feature Flags?

### `list_datadog_feature_flag_allocations` {#list-datadog-feature-flag-allocations}
*Conjunto de herramientas: **feature-flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Enumera las asignaciones para un Feature Flag en un entorno específico.

- Muéstreme las reglas de asignación para el Feature Flag `new-checkout-flow` en producción.

### `update_datadog_feature_flag_environment` {#update-datadog-feature-flag-environment}
*Conjunto de herramientas: **feature-flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Write`*\
Actualiza una configuración de Feature Flag en un entorno específico.

- Habilite la clave de etiqueta `dark-mode` en el entorno de pruebas.
- Implemente la clave de etiqueta `new-checkout-flow` al 50% de los usuarios en producción.

### `check_datadog_flag_implementation` {#check-datadog-flag-implementation}
*Conjunto de herramientas: **feature-flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Comprueba si una clave de etiqueta está implementada en el código.

- Verifique que la clave de etiqueta `enable-new-dashboard` esté implementada en mi base de código.

### `sync_datadog_feature_flag_allocations` {#sync-datadog-feature-flag-allocations}
*Conjunto de herramientas: **feature-flags***\
*Permisos requeridos: `Feature Flag Write`*\
Sincroniza las asignaciones de claves de etiqueta para un entorno específico.

- Sincronice las asignaciones para la clave de etiqueta `new-checkout-flow` en producción.

## Kubernetes {#kubernetes}

Herramientas para buscar y describir recursos de [Kubernetes][55] y recuperar manifiestos en todos los clústeres.

### `search_datadog_k8s_resources` {#search-datadog-k8s-resources}
*Conjunto de herramientas: **kubernetes***\
*Permisos requeridos: `Hosts Read` y `Teams Read`*\
Busca recursos de [Kubernetes][55] en todos los clústeres. Use esta herramienta en lugar de `kubectl` para determinar el estado de los recursos de Kubernetes como implementaciones, pods, nodos, etc. Esta herramienta no requiere acceso al clúster local, funciona en todos los clústeres y devuelve datos enriquecidos con etiquetas. Puede incluir claves de etiqueta específicas en cada resultado e incluir nombres de recursos principales para investigar las relaciones entre los recursos (por ejemplo, la implementación a la que pertenece un pod).

- Muéstreme todos los pods en el espacio de nombres `production` con estado `CrashLoopBackOff`.
- Encuentre implementaciones con despliegues en curso en el clúster `general2`.
- Enumere todos los nodos en mi clúster ordenados por uso de CPU.
- Agrupe las implementaciones por `service` y `env` para ver cómo se distribuyen mis servicios en los entornos.

### `describe_datadog_k8s_resource` {#describe-datadog-k8s-resource}
*Conjunto de herramientas: **kubernetes***\
*Permisos requeridos: `Hosts Read`*\
Obtiene información detallada sobre un recurso específico de [Kubernetes][55], incluidos detalles específicos del recurso como solicitudes y límites de CPU y memoria, y opcionalmente etiquetas, labels, annotations, historial de manifiestos, recursos principales y un enlace directo al [Explorer de Kubernetes][55]. Utilice esta herramienta en lugar de `kubectl describe`. Identifique un recurso por su UID de una búsqueda anterior o proporcionando identificadores de recurso (clúster, espacio de nombres y nombre del recurso). Para el manifiesto sin procesar completo, use `get_datadog_k8s_manifest`.

- Describa el pod `my-app` en el clúster `prod`, espacio de nombres `default`.
- Obtenga detalles para el despliegue `api-server` en el espacio de nombres `default`, clúster `staging`.
- Muéstreme las etiquetas y anotaciones para este recurso de Kubernetes.

### `get_datadog_k8s_manifest` {#get-datadog-k8s-manifest}
*Conjunto de herramientas: **Kubernetes***\
*Permisos requeridos: `Hosts Read`*\
Recupera el manifiesto YAML para un recurso específico de [Kubernetes][55]. Utilice esta herramienta en lugar de `kubectl get -o yaml`. Admite la extracción de subárboles específicos con una expresión JSONPath `kubectl` y un modo conciso que omite `status` y `managedFields` para reducir el tamaño de la respuesta.

- Obtenga el manifiesto para el pod `my-app` en el clúster `prod`, espacio de nombres `default`.
- Muéstreme los puertos del container para el despliegue `api-server` en el espacio de nombres `default`, clúster `staging`.
- Obtenga las Container Images del manifiesto del pod `my-app`.

## networks {#networks}

Herramientas para el análisis de Cloud Network Monitoring [31] y Network Device Monitoring [32].

### `analyze_cloud_network_monitoring` {#analyze-cloud-network-monitoring}
*Conjunto de herramientas: **networks***\
*Permisos requeridos: `Network Connections Read`*\
Investiga problemas a nivel de red utilizando datos de [Cloud Network Monitoring][31], analizando los datos de flujo de red para detectar anomalías como tasas de retransmisión elevadas.

- Analice el tráfico de red entre mis servidores web y el clúster de base de datos.
- ¿Existen problemas de retransmisión entre `service:api` y `service:payments`?
- Investigue los datos de flujo de red en busca de anomalías en el entorno de producción.

### `search_ndm_devices` {#search-ndm-devices}
*Conjunto de herramientas: **networks***\
*Permisos requeridos: `NDM Read`*\
Busca dispositivos de red (enrutadores, conmutadores, firewalls) monitoreados por Datadog Network Device Monitoring [32].

- Muéstreme todos los dispositivos de red en el centro de datos `us-east-1`.
- Encuentre los firewalls que reportan errores.
- Enumere todos los conmutadores monitoreados y sus estados.

### `get_ndm_device` {#get-ndm-device}
*Conjunto de herramientas: **networks***\
*Permisos requeridos: `NDM Read`*\
Recupera información detallada sobre un dispositivo de red específico mediante su ID de dispositivo.

- Obtenga los detalles del dispositivo de red `device:abc123`.
- Muéstreme la configuración y el estado de este enrutador.

### `search_ndm_interfaces` {#search-ndm-interfaces}
*Conjunto de herramientas: **networks***\
*Permisos requeridos: `NDM Read`*\
Recupera todas las interfaces de red de un dispositivo específico.

- Muéstreme todas las interfaces del dispositivo `device:abc123`.
- Enumere los estados de las interfaces de mi enrutador principal.

## Incorporación {#onboarding}

Herramientas de incorporación con Agent para la configuración y el ajuste guiados de Datadog.

### `browser_onboarding` {#browser-onboarding}
*Conjunto de herramientas: **incorporación***\
*Permisos requeridos: `RUM Apps Read`*\
Lo guía a través de la incorporación de Browser RUM a Datadog.

- Ayúdeme a configurar el monitoreo de Browser RUM para mi aplicación web.

### `devices_onboarding` {#devices-onboarding}
*Conjunto de herramientas: **incorporación***\
*Permisos requeridos: `RUM Apps Read`*\
Lo guía a través de la incorporación de dispositivos al monitoreo de Datadog.

- Ayúdeme a configurar el monitoreo de dispositivos en Datadog.

### `kubernetes_onboarding` {#kubernetes-onboarding}
*Conjunto de herramientas: **incorporación***\
*Permisos requeridos: Ninguno*\
Lo guía a través de la incorporación de clústeres de Kubernetes a Datadog.

- Ayúdeme a configurar el monitoreo de Datadog para mi clúster de Kubernetes.

### `llm_observability_onboarding` {#llm-observability-onboarding}
*Conjunto de herramientas: **incorporación***\
Lo guía a través de la incorporación de Agent Observability en Datadog.

- Ayúdeme a configurar Agent Observability para mi aplicación de IA.

### `test_optimization_onboarding` {#test-optimization-onboarding}
*Conjunto de herramientas: **incorporación***\
*Permisos requeridos: Ninguno*\
Lo guía a través de la incorporación de Test Optimization en Datadog.

- Ayúdeme a configurar Test Optimization para mi pipeline de CI.

### `serverless_onboarding` {#serverless-onboarding}
*Conjunto de herramientas: **incorporación***\
*Permisos requeridos: Ninguno*\
Lo guía a través de la incorporación de aplicaciones sin servidor a Datadog, incluyendo funciones de AWS Lambda y GCP Cloud Run y funciones de Cloud Run (Gen 2).

- Ayúdeme a monitorear mis funciones de AWS Lambda con Datadog.
- Ayúdeme a monitorear mis servicios de GCP Cloud Run con Datadog.
- Ayúdeme a monitorear mis funciones de GCP Cloud Run con Datadog.

### `source_map_uploads` {#source-map-uploads}
*Conjunto de herramientas: **incorporación***\
Lo guía a través de la carga de mapas del código fuente para el mapeo de errores de RUM.

- Ayúdeme a cargar mapas del código fuente para que mis errores de RUM muestren el código fuente original.

## Product Analytics {#product-analytics}

Herramientas para consultar datos de [Product Analytics][68], incluyendo búsqueda de vocabulario de la organización, búsqueda semántica, agregaciones, recorridos, rutas y retención.

<div class="alert alert-info">El <code>product-analytics</code> conjunto de herramientas no está habilitado de forma predeterminada. Consulta <a href="/mcp_server/setup">Configurar el servidor Datadog MCP</a> para obtener instrucciones sobre cómo habilitar los conjuntos de herramientas.</div>

### `search_product_analytics_events` {#search-product-analytics-events}
*Conjunto de herramientas: **product-analytics***\
*Permisos requeridos: `RUM Apps Read`*\
Encuentra vistas y acciones de Product Analytics que coincidan con una descripción en lenguaje natural mediante búsqueda semántica, incluyendo acciones etiquetadas seleccionadas por la organización.

- Encuentra la vista y la acción para agregar un artículo al carrito.
- ¿Cuál es el evento para completar el checkout?

### `search_product_analytics_org_entities` {#search-product-analytics-org-entities}
*Conjunto de herramientas: **product-analytics***\
*Permisos requeridos: `RUM Apps Read`*\
Busca entidades de Product Analytics específicas de la organización por nombre o palabra clave (feature flags, context attribute keys, saved charts y segmentos).

- Encuentre el segmento para "power users".
- ¿Qué feature flags están disponibles para filtrar los datos de Product Analytics?

**Nota**: Utilice la expresión de filtro de segmento devuelta por esta herramienta textualmente en lugar de construir una manualmente.

### `get_product_analytics_saved_chart` {#get-product-analytics-saved-chart}
*Conjunto de herramientas: **product-analytics***\
*Permisos requeridos: `RUM Apps Read` y `Product Analytics Saved Widgets Read`*\
Recupera la definición completa de un gráfico de Product Analytics guardado por ID, incluidos sus parámetros de consulta, filtros e intervalo de tiempo. Utilice `search_product_analytics_org_entities` primero para encontrar el ID del gráfico.

- Cargue el gráfico guardado `abc-123-def` y muéstreme sus parámetros de consulta.
- Reproduzca el gráfico guardado de "retención semanal" con un rango de tiempo actualizado.

### `aggregate_product_analytics_events` {#aggregate-product-analytics-events}
*Conjunto de herramientas: **product-analytics***\
*Permisos requeridos: `RUM Apps Read`*\
Agrega datos de eventos de Product Analytics como un escalar o series temporales, admitiendo cálculos de conteo, cardinalidad, promedio, suma, mínimo, máximo y percentil con agrupación opcional.

- ¿Cuántas sesiones tuvimos hoy?
- Muéstreme los usuarios activos diarios durante los últimos 30 días.

### `run_product_analytics_journey` {#run-product-analytics-journey}
*Conjunto de herramientas: **Product Analytics***\
*Permisos requeridos: `RUM Apps Read`*\
Ejecuta consultas de embudo, series temporales, escalares, listas y abandono a través de un recorrido de usuario de varios pasos, rastreado a nivel de usuario, sesión o cuenta.

- ¿Cuál es la tasa de conversión desde ver un producto hasta completar el checkout?
- Muéstreme los usuarios que abandonaron entre agregar al carrito y el checkout.

### `run_product_analytics_pathway` {#run-product-analytics-pathway}
*Conjunto de herramientas: **Product Analytics***\
*Permisos requeridos: `RUM Apps Read`*\
Ejecuta un análisis de Sankey (ruta) que muestra cómo navegan los usuarios entre vistas, comenzando desde una vista de origen o conduciendo a una vista de destino.

- ¿Cuáles son las rutas más comunes que toman los usuarios después de llegar a la página de inicio?
- Muéstrame las rutas que conducen a la página de pago.

### `run_product_analytics_retention` {#run-product-analytics-retention}
*Conjunto de herramientas: **Product Analytics***\
*Permisos requeridos: `RUM Apps Read`*\
Ejecuta consultas de retención en los datos de Product Analytics como una cuadrícula de cohorte, curva de retención, series temporales o valor escalar, rastreados a nivel de usuario o cuenta.

- Muéstrame la cuadrícula de retención semanal para los usuarios que se registraron en el último trimestre.
- ¿Cuál es la tasa de retención del día 7 para los usuarios que se unieron en enero?

## Perfilado {#profiling}
Herramientas de solo lectura para descubrir, explorar y analizar datos de [Continuous Profiler][62] en servicios, entornos de ejecución y trazas.

### `get_profiling_profile_types` {#get-profiling-profile-types}
*Conjunto de herramientas: **profiling***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve los tipos y familias de perfil disponibles para un contexto de consulta determinado (cadena de consulta y rango de tiempo) o un contexto de traza/span. Usa esto primero para descubrir qué se puede consultar.

- Muéstrame qué tipos de perfil están disponibles para `service:checkout-api` en la última hora.
- ¿Qué familias de perfil están disponibles para la traza `7d5d747be160e280504c099d984bcfe0`?
- Enumera los tipos de perfil disponibles en mi entorno de producción.

### `get_profiling_services` {#get-profiling-services}
*Conjunto de herramientas: **profiling***\
*Permisos requeridos: `Continuous Profiler Read`*\
Enumera los servicios perfilados y sus familias de perfilado en el ámbito. Los resultados no están ordenados y no implican importancia ni nivel de actividad.

- Enumere todos los servicios con profiling habilitado en producción.
- Muéstreme qué servicios tienen datos de profiling de JVM.
- ¿Qué servicios están perfilados en el entorno del equipo de pagos?

### `get_profiling_runtime_ids` {#get-profiling-runtime-ids}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve los ID de tiempo de ejecución perfilados individuales (procesos o contenedores) en el ámbito. El valor predeterminado es el top 1 por CPU; el parámetro de límite controla cuántos.

- Muéstrame los 10 principales ID de tiempo de ejecución por CPU para `service:checkout-api`.
- Obtenga el runtime con mayor uso de CPU para mi servicio Go.
- Enumere los ID de tiempo de ejecución perfilados para el servicio de pagos en la última hora.

### `get_profiling_service_insights` {#get-profiling-service-insights}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve información sobre el servicio precalculada, que incluye un resumen de alto nivel, señales contextuales (métodos, paquetes, procesos afectados) y los siguientes pasos recomendados.

- Muéstrame información de perfilado para `service:checkout-api`.
- ¿Qué problemas de rendimiento están marcados en el servicio de pagos?
- Obtenga recomendaciones de profiling para mi servicio Java.

### `explore_profiling_flame_graph` {#explore-profiling-flame-graph}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve las N principales trazas de pila por contribución de valor para un tipo de perfil determinado. Admite filtrado por frame, endpoint o attribute regex. Servicio único. Acepta `service:family` o un traceContext.

- Muéstreme el CPU flame graph para `service:checkout-api` durante la última hora.
- Encuentre los principales puntos críticos de asignación para el servicio de pagos.
- Explore el flame graph para la traza `7d5d747be160e280504c099d984bcfe0`.

### `explore_profiling_call_graph` {#explore-profiling-call-graph}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve una vista de gráfico de llamadas (bordes de llamador a llamado) de funciones activas para un tipo de perfil determinado. El valor predeterminado es de 20 nodos principales, un límite del 5% y 5 bordes por nodo. Servicio único.

- Muéstreme el gráfico de llamadas para funciones de CPU activas en `service:checkout-api`.
- ¿Qué funciones llaman a las rutas más lentas en mi servicio de Go?
- Obtenga el allocation call graph para el servicio de pagos.

### `explore_profiling_timeline` {#explore-profiling-timeline}
*Conjunto de herramientas: **profiling***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve una línea de tiempo de grupos de carriles (hilos, recolección de basura, etcétera) con actividad de CPU y E/S. Admite un modo de ruta crítica (solo Go; requiere traceContext) para identificar cuellos de botella de latencia dentro de un tramo.

- Muéstreme la línea de tiempo de hilos para `service:checkout-api` durante los últimos 15 minutos.
- Encuentre la ruta crítica para la traza `abc123` en mi servicio de Go.
- Explore la recolección de basura y la actividad de CPU alrededor del pico de latencia.

### `get_profiling_timeseries` {#get-profiling-timeseries}
*Conjunto de herramientas: **profiling***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve datos de perfilado agregados como series temporales (métricas de tasa). Ideal para tendencias, comparación entre servicios y detección de regresiones. Admite groupBy en campos de frame, contexts y tags.

- Muéstreme las series temporales del CPU profile para `service:checkout-api` durante las últimas 24 horas.
- Compara las tasas de asignación en mis servicios de Java agrupadas por versión.
- Detecte regresiones de perfil durante la última semana agrupadas por despliegue.

### `get_profiling_tag_names` {#get-profiling-tag-names}
*Conjunto de herramientas: **profiling***\
*Permisos requeridos: `Continuous Profiler Read`*\
Descubre nombres de etiquetas disponibles (como service, host, env, version, family, runtime-id, kube_*) para filtrar datos de perfilado. Devuelve hasta 50 resultados, ordenados por relevancia.

- ¿Qué nombres de etiquetas están disponibles para filtrar datos de perfilado en producción?
- Enumere los nombres de etiquetas de perfilado para `service:checkout-api`.

### `get_profiling_tag_values` {#get-profiling-tag-values}
*Conjunto de herramientas: **profiling***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve valores para una etiqueta de perfilado específica (por ejemplo, todos los valores de la etiqueta de servicio). Devuelve hasta 50 resultados, ordenados por frecuencia.

- ¿De qué versiones del servicio de pagos tenemos datos de perfilado en la última hora?
- ¿Cuáles son los dos centros de datos con más datos de perfilado disponibles para `service:checkout-api`?

### `get_profiling_fields` {#get-profiling-fields}
*Conjunto de herramientas: **profiling***\
*Permisos requeridos: `Continuous Profiler Read`*\
Descubre campos de faceta de marco y contexto (como `@stack.function` y `@labels.trace_endpoint`) utilizables en los parámetros `get_profiling_timeseries` groupBy y filter. Delimitado por sampleType.

- ¿Con qué campos de marco puedo agrupar los perfiles de CPU?
- Muéstreme los campos de faceta disponibles para perfiles de asignación.
- Enumere los campos de contexto por los que puedo filtrar series temporales para `service:checkout-api`.

### `get_profiling_field_values` {#get-profiling-field-values}
*Conjunto de herramientas: **profiling***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve valores para un marco o campo de contexto específico descubierto con `get_profiling_fields`. Ordenado por frecuencia.

- Muéstreme los valores principales para `@stack.function` en mis perfiles de CPU.
- Obtenga los valores de punto final principales de `@labels.trace_endpoint`.
- Liste los valores para el campo de paquete en perfiles de asignación.

## Reference Tables {#reference-tables}

Herramientas para administrar [Reference Tables][45], que incluyen listar tablas, leer filas, insertar o actualizar filas, y crear tablas sincronizadas desde archivos de almacenamiento en la nube o como tablas vacías que usted completa directamente.

### `list_reference_tables` {#list-reference-tables}
*Conjunto de herramientas: **reference-tables***\
Lista y busca [Reference Tables][45] en la organización, con filtrado opcional por nombre y ordenamiento.

- Liste todas las Reference Tables en mi organización.
- Encuentre Reference Tables con `customer` en el nombre.
- Muéstreme las Reference Tables ordenadas por hora de última actualización.

### `list_reference_table_rows` {#list-reference-table-rows}
*Conjunto de herramientas: **reference-tables***\
Enumere todas las filas en una Reference Table con filtrado y paginación opcionales. Use `list_reference_tables` primero para encontrar el ID y el esquema de la Reference Table.

- Enumere todas las filas en la Reference Table `ip_allowlist`.
- Muéstreme las primeras 50 filas de la Reference Table `customer_tiers`.

### `get_reference_table_rows` {#get-reference-table-rows}
*Conjunto de herramientas: **reference-tables***\
Recupera filas específicas de una Reference Table mediante sus valores de clave primaria. Use `list_reference_tables` primero para encontrar el ID y el esquema de la Reference Table.

- Obtenga las filas con las claves primarias `user001` y `user002` de la Reference Table de usuarios.
- Busque la entrada para el ID de cuenta `acct-123` en la Reference Table de cuentas.

### `append_reference_table_rows` {#append-reference-table-rows}
*Conjunto de herramientas: **reference-tables***\
Agrega nuevas filas a una Reference Table existente. Esta operación solo agrega filas y no modifica ni elimina datos existentes. Cada fila debe incluir todos los campos obligatorios del esquema de la Reference Table, incluido el campo de clave primaria. Si es posible que las filas ya existan, use `upsert_reference_table_rows` en su lugar.

- Agregue una nueva fila para el usuario `user003` con el nombre `Carol` y la edad `28` a la Reference Table de usuarios.
- Agregue estas cinco nuevas entradas de cuenta a la Reference Table de cuentas.

### `upsert_reference_table_rows` {#upsert-reference-table-rows}
*Conjunto de herramientas: **reference-tables***\
Inserta nuevas filas o actualiza filas existentes en una Reference Table. Si ya existe una fila con la misma clave principal, sus valores se sobrescriben. Use esto en lugar de `append_reference_table_rows` cuando las filas ya puedan existir.

- Actualice el nivel de la cuenta `acct-123` en la Reference Table `customer_tiers`.
- Agregue o actualice estas diez entradas de servicio en la Reference Table `service_catalog`.

### `create_reference_table` {#create-reference-table}
*Conjunto de herramientas: **reference-tables***\
Crea una nueva Reference Table. Admite dos modos: `LOCAL_FILE` crea una Reference Table vacía que puede completar con `append_reference_table_rows` o `upsert_reference_table_rows`. Los modos respaldados por la nube (`S3`, `GCS`, `AZURE`) se sincronizan desde un archivo CSV en Amazon S3, Google Cloud Storage o Azure Blob Storage. Solo se admiten los tipos de campo `INT32` y `STRING`.

- Cree una tabla de referencia vacía llamada `service_catalog` con campos para el nombre del servicio, el equipo propietario y el nivel.
- Cree una tabla de referencia llamada `ip_allowlist` a partir del archivo `allowlist.csv` en mi bucket de S3 `my-data-bucket`.
- Configure una nueva Reference Table respaldada por GCS llamada `customer_tiers` con la sincronización automática habilitada.

## Remote Actions {#remote-actions}

<div class="alert alert-info">El <code>remote-actions</code> El conjunto de herramientas está en versión preliminar. <a href="https://www.datadoghq.com/product-preview/datadog-agent-mcp/">Regístrese para obtener acceso.</a></div>

Herramientas para ejecutar diagnósticos de solo lectura en hosts instrumentados con el Datadog Agent. Los comandos llegan al host a través del Private Action Runner (PAR) utilizando un [intérprete de shell restringido][63]. Todos los comandos se ejecutan como funciones integradas seguras de Go sin acceso de escritura, sin ejecución de binarios externos y sin salida de red. La lista de comandos permitidos se controla por versión del Agent desde el backend de Datadog.

### `datadog_remote_action_restricted_shell_run_command` {#datadog-remote-action-restricted-shell-run-command}
*Conjunto de herramientas: **remote-actions***\
*Permisos requeridos: `Connections Resolve` y `Private Action Runner Contribute`*\
Ejecuta un comando de shell de solo lectura en un host especificado. Los comandos admitidos incluyen: `cat`, `ls`, `head`, `tail`, `find`, `grep`, `sed`, `cut`, `sort`, `uniq`, `wc`, `ping`, `ss` y `ip`. Admite tuberías, bucles, condicionales, asignación de variables y globbing.

- Muéstreme las últimas 100 líneas del registro del Datadog Agent en el host `prod-web-01`.
- Busque todas las entradas ERROR en `/var/log/app/` en el host `db-replica-3` de la última hora.
- Obtenga el contenido de `/etc/datadog-agent/datadog.yaml` en el host `prod-worker-07`.

## RUM {#rum}

Herramientas para [Real User Monitoring][58], que incluyen la resolución de aplicaciones, el resumen del rendimiento, la presentación de información agregada para vistas, la exploración de métricas, la inspección de la configuración de aplicaciones, la gestión de filtros de retención y la gestión de métricas RUM personalizadas.

### `search_rum_applications` {#search-rum-applications}
*Conjunto de herramientas: **rum***\
*Permisos requeridos: `RUM Apps Read`*\
Enumere sus aplicaciones RUM y resuelva el `application_id` para usar en llamadas posteriores a herramientas RUM.

- Busque la aplicación RUM llamada "checkout-web" y devuelva su ID de aplicación.
- Enumere todas mis aplicaciones RUM.

### `get_rum_summary` {#get-rum-summary}
*Conjunto de herramientas: **rum***\
*Permisos requeridos: `RUM Apps Read` y `Timeseries`*\
Devuelve un resumen de las métricas vitales para una aplicación RUM, con diferencias periodo a periodo.

- Resuma el rendimiento de la aplicación RUM "checkout-web" durante las últimas 24 horas.
- ¿Cómo cambiaron las Core Web Vitals en mi aplicación RUM principal semana tras semana?

### `get_rum_insight` {#get-rum-insight}
*Toolset: **rum***\
*Permisos requeridos: `RUM Apps Read`*\
Devuelve información agregada para las vistas RUM: cascada, tareas largas, distribuciones vitales y análisis de etiquetas.

- Para la vista `/checkout` en la aplicación "shop", muéstreme la cascada de recursos agregada de la última hora.
- Desglose la distribución de INP por tipo de dispositivo para la página de inicio.

### `search_rum_metrics` {#search-rum-metrics}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Apps Read`*\
Explora métricas RUM para una aplicación, incluyendo métricas predeterminadas y métricas personalizadas.

- Enumere las métricas RUM personalizadas definidas en la aplicación \"checkout-web\".
- Muéstreme las métricas RUM disponibles relacionadas con el tiempo de carga de página en mi aplicación principal.

### `upsert_rum_metric` {#upsert-rum-metric}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Apps Read` y `RUM Generate Metrics`*\
Crea o actualiza una métrica RUM personalizada. Verifica los campos inmutables antes de actualizar una métrica existente. Esta operación es idempotente.

- Cree una métrica de distribución `rum.view.lcp_by_country` que rastree el p95 LCP para eventos de vista, agrupados por país.
- Actualice el filtro en `rum.error.checkout_errors` para excluir el tráfico de prueba Synthetic.

### `delete_rum_metric` {#delete-rum-metric}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Apps Read` y `RUM Generate Metrics`*\
Elimina permanentemente una métrica RUM personalizada por ID. Esta operación es idempotente.

- Elimine la métrica RUM personalizada `rum.view.my_custom_metric`.
- Elimine la métrica RUM `rum.view.legacy_page_views` de mi organización.

### `search_rum_retention_filters` {#search-rum-retention-filters}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Retention Filters Read`*\
Enumera los filtros de retención configurados en una aplicación de RUM. Solo lectura; disponible para clientes de [RUM without Limits][59].

- Enumere los filtros de retención configurados en la aplicación \"checkout-web\".
- ¿Qué filtros de retención tengo en mi aplicación principal de RUM?

### `append_new_rum_retention_filter` {#append-new-rum-retention-filter}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Retention Filters Write` o `Product Analytics Apps Write`*\
Crea un filtro de retención de RUM, añadido al final del orden de evaluación. Los filtros de retención controlan qué eventos de RUM se indexan y retienen, lo cual afecta la facturación. Confirme el cambio antes de aplicarlo.

- Cree un filtro de retención en \"checkout-web\" que retenga el 100% de los eventos de error.
- Agregue un filtro a mi aplicación principal de RUM que mantenga todas las sesiones que coincidan con `@view.url_path:/checkout`.

### `update_rum_retention_filter` {#update-rum-retention-filter}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Retention Filters Write` o `Product Analytics Apps Write`*\
Actualiza los atributos de un filtro de retención de RUM existente, como su nombre, tipo de evento, consulta, tasa de muestreo o estado de habilitación. Confirme el cambio antes de aplicarlo.

- Aumente la tasa de muestreo del filtro de retención \"checkout errors\" al 100%.
- Deshabilite el filtro de retención \"long tasks\" en mi aplicación RUM principal.

### `reorder_rum_retention_filters` {#reorder-rum-retention-filters}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Retention Filters Write` o `Product Analytics Apps Write`*\
Establece el orden de evaluación completo de los filtros de retención de una aplicación RUM. Los filtros se evalúan de arriba hacia abajo y cada evento se detiene en la primera coincidencia, por lo que el orden determina qué tasa de muestreo se aplica. Confirme el nuevo orden antes de aplicar.

- Mueva el filtro de retención \"checkout errors\" por encima del filtro general en \"checkout-web\".
- Reordene mis filtros de retención para que los filtros específicos se evalúen antes que los generales.

### `delete_rum_retention_filter` {#delete-rum-retention-filter}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Retention Filters Write` o `Product Analytics Apps Write`*\
Elimina permanentemente un filtro de retención de RUM por ID. Confirme la eliminación antes de aplicar. Esta operación es idempotente.

- Elimine el filtro de retención \"legacy sessions\" de \"checkout-web\".
- Elimine el filtro de retención con ID `abc-123-def` de mi aplicación RUM principal.

## Seguridad {#security}

Herramientas para el escaneo, análisis, búsqueda y clasificación de seguridad de código [security signals][53], investigación de indicadores de [IoC Explorer][67], gestión de [detection rules][60] y [suppressions][61], y análisis de [security findings][54].

### `datadog_secrets_scan` {#datadog-secrets-scan}
*Conjunto de herramientas: **seguridad***\
Escanea el código en busca de secretos y credenciales codificados, detectando claves de AWS, claves de API, contraseñas, tokens, claves privadas y credenciales de base de datos.

- Escanea mi código en busca de secretos codificados.
- Compruebe si hay claves de API o contraseñas incluidas en este archivo.

### `get_datadog_security_signals_schema` {#get-datadog-security-signals-schema}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Devuelve los campos disponibles y sus tipos para las señales de seguridad. Los tipos de señal se asignan a valores de `@workflow.rule.type` tales como `Log Detection`, `Application Security` y `Workload Security`.

- ¿Qué campos puedo usar para filtrar las señales de seguridad?
- Muéstreme los campos disponibles para las señales de Cloud SIEM.
- ¿Qué valores de enumeración son válidos para el campo de tipo de regla de señal?

### `search_datadog_security_signals` {#search-datadog-security-signals}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Busca y recupera señales de seguridad de Datadog Security Monitoring, incluyendo señales de Cloud SIEM, señales de App & API Protection y señales de Workload Protection.

- Muéstreme las señales de seguridad de las últimas 24 horas.
- Encuentre señales de seguridad de alta severidad relacionadas con mi entorno de producción.
- Liste las señales de Cloud SIEM activadas por intentos de inicio de sesión sospechosos.

### `analyze_datadog_security_signals` {#analyze-datadog-security-signals}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read` y `Timeseries`*\
Analiza señales de seguridad usando consultas SQL para agregaciones, agrupaciones y análisis de tendencias. Úselo para conteos, top-N y desgloses a lo largo del tiempo. Para listar o recuperar señales específicas, utilice `search_datadog_security_signals` o `get_datadog_security_signal`.

- Muéstreme las 10 principales reglas de SIEM por conteo de señales en los últimos 7 días.
- Cuente las señales de seguridad altas y críticas agrupadas por severidad.
- ¿Cuántas señales de App & API Protection se activaron por servicio ayer?

### `get_datadog_security_signal` {#get-datadog-security-signal}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Recupera los detalles completos de una sola señal de seguridad por ID, incluyendo atributos, información de la regla, estado de triaje, etiquetas y correlaciones de casos.

- Obtenga los detalles completos de la señal de seguridad `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`.
- Muéstreme la regla, el estado de triaje y los casos vinculados para esta señal.

### `update_datadog_security_signals_triage` {#update-datadog-security-signals-triage}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Write`*\
Actualiza el estado de clasificación o el responsable de una o más señales de seguridad de forma masiva (hasta 500 señales). Acepta una lista de IDs de señal o una consulta de filtro que coincida con todas las señales a actualizar.

- Archive todas las señales de la regla "Brute Force Login" en las últimas 24 horas.
- Establezca todas las señales abiertas para `service:checkout` como en revisión y asígnelas a mí.
- Marque la señal `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu` como archivada con el motivo "testing".

### `search_datadog_security_ioc_indicators` {#search-datadog-security-ioc-indicators}
*Herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Enumere los indicadores de [IoC Explorer][67] (IP, dominios, URL, hashes de archivos) que coincidan con las fuentes de inteligencia de amenazas. Empareje con `get_datadog_security_ioc_indicator` para obtener detalles completos y `update_datadog_security_ioc_indicator_triage` para marcar como revisado.

- Muéstreme los indicadores de IP maliciosos con la puntuación más alta.
- Enumere los indicadores de IoC en la categoría `residential_proxy` con una puntuación media o superior.
- Muéstreme los indicadores de amenazas que aún no se han revisado.

### `get_datadog_security_ioc_indicator` {#get-datadog-security-ioc-indicator}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Recupere los detalles completos de un indicador de [IoC Explorer][67] por valor (puntuación, categoría, información de AS, GeoIP, fuentes de registro, recuentos de señales).

- Obtenga los detalles del indicador de amenazas `192.0.2.1`.
- Muéstreme todo lo que sabemos sobre `malicious.example.com`.

### `update_datadog_security_ioc_indicator_triage` {#update-datadog-security-ioc-indicator-triage}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Write`*\
Establezca el estado de triaje de un indicador de [IoC Explorer][67].

- Marque el indicador `192.0.2.1` como revisado.
- Vuelva a establecer `evil-domain.example.com` como no revisado.

### `get_datadog_security_ioc_schema` {#get-datadog-security-ioc-schema}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Descubra los campos filtrables y sus valores para [IoC Explorer][67]. Omita `filter` para enumerar los campos disponibles; proporcione `filter` para obtener `[{value, count}]` para ese campo. Utilice `query` para limitar los conteos a un subconjunto de indicadores.

- ¿Qué campos están disponibles para los filtros de indicadores de IoC?
- Muéstreme los tipos de indicadores disponibles y cuántos existen de cada uno.
- Obtenga los valores para el filtro `categories` limitado a indicadores de puntuación alta.

### `get_datadog_security_detection_rules_schema` {#get-datadog-security-detection-rules-schema}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Rules Read`*\
Devuelve la referencia de creación y el esquema para las reglas de detección. Cubre los tipos de reglas admitidos, los métodos de detección, la sintaxis de consulta, las convenciones de etiquetas y las facetas de búsqueda válidas. Utilice esto antes de crear o consultar reglas de detección. Tipos de reglas admitidos actualmente: detección de registros, seguridad de API y AppSec.

- ¿Qué campos y opciones están disponibles al crear una regla de detección de umbral?
- Muéstreme el esquema para las reglas de detección de secuencia.
- ¿Qué convenciones de etiquetas y sintaxis de consulta utiliza la API de reglas de detección?

### `get_datadog_security_detection_rules` {#get-datadog-security-detection-rules}
*Conjunto de herramientas: **security***\
*Permisos requeridos: `Security Monitoring Rules Read`*\
Recupera las reglas de detección de seguridad. Admite dos modos: proporciona `rule_id` para obtener la definición completa de una sola regla por ID, u omite `rule_id` para listar las reglas (opcionalmente filtradas con `query` y limitadas por token con `max_tokens`). Los dos modos son mutuamente excluyentes.

- Lista todas las reglas de detección de Cloud SIEM habilitadas.
- Muéstrame las reglas de detección etiquetadas con `source:cloudtrail`.
- Obtén la definición completa de la regla de detección `abc-123-def`.
- ¿Qué umbrales y campos de agrupación utiliza esta regla de detección?

### `create_datadog_security_detection_rule` {#create-datadog-security-detection-rule}
*Conjunto de herramientas: **security***\
*Permisos requeridos: `Security Monitoring Rules Write`*\
Crea una nueva regla de detección. Llama primero a `get_datadog_security_detection_rules_schema` para obtener la gramática de la carga útil y, a continuación, proporciona una carga útil de regla completa. Si la operación tiene éxito, devuelve la regla completa, incluido su ID asignado por el servidor.

- Crea una regla de detección de umbral que se active cuando ocurran más de 10 inicios de sesión fallidos desde la misma IP en 5 minutos.
- Crea una nueva regla de detección de registros para CloudTrail que alerte sobre la escalada de privilegios de IAM.
- Crea una regla de detección para `source:nginx` que genere una señal cuando la tasa de error supere las 100 por minuto.

### `update_datadog_security_detection_rule` {#update-datadog-security-detection-rule}
*Conjunto de herramientas: **security***\
*Permisos requeridos: `Security Monitoring Rules Write`*\
Actualiza una regla de detección personalizada existente reemplazándola por completo. Llama primero a `get_datadog_security_detection_rules` para obtener el cuerpo de la regla actual, modifica los campos que necesites y envía el objeto actualizado completo. No se pueden actualizar las reglas predeterminadas proporcionadas por Datadog.

- Habilita la regla de detección `abc-123-def`.
- Deshabilita la regla de detección de fuerza bruta.
- Actualiza el umbral de mi regla de detección de fuerza bruta de 10 a 20 inicios de sesión fallidos.
- Agrega un nuevo caso a la regla de detección `abc-123-def` que se active con gravedad crítica.
- Cambia el campo de agrupación de esta regla de `@usr.ip` a `@network.client.ip`.

### `delete_datadog_security_detection_rules` {#delete-datadog-security-detection-rules}
*Conjunto de herramientas: **security***\
*Permisos requeridos: `Security Monitoring Rules Write`*\
Elimina una o más reglas de detección personalizadas por ID. Solo se pueden eliminar las reglas personalizadas (no predeterminadas). Las reglas predeterminadas devuelven 403. Cada regla se autoriza individualmente; los errores aparecen en `failed_rules` sin abortar el lote.

- Eliminar la regla de detección `abc-123-def`.
- Eliminar estas tres reglas de detección de prueba que creé anteriormente.

### `get_datadog_security_suppressions` {#get-datadog-security-suppressions}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Suppressions Read`*\
Recupera supresiones de monitoreo de seguridad. Admite tres modos: listar todas las supresiones, obtener una sola supresión por ID u obtener supresiones que afecten a una regla de detección específica. Las supresiones evitan que las reglas de detección generen señales para condiciones coincidentes.

- Listar todas las supresiones activas.
- Muéstrame las supresiones para la regla de detección `abc-123-def`.
- Obtener los detalles completos de la supresión `sup-456-xyz`.

### `create_datadog_security_suppression` {#create-datadog-security-suppression}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Suppressions Write`*\
Crea una nueva regla de supresión que evita que una regla de detección genere señales para condiciones específicas. Se debe proporcionar al menos uno de `suppression_query` o `data_exclusion_query`.

- Suprimir señales de la regla de fuerza bruta para la IP `10.0.0.1`.
- Crear una supresión para la regla de detección de anomalía que ignore el entorno `staging`.
- Suprima las señales de la regla `abc-123-def` donde `@usr.email` coincida con nuestras cuentas de prueba.

### `update_datadog_security_suppression` {#update-datadog-security-suppression}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Suppressions Write`*\
Actualiza una regla de supresión existente. Solo cambia los campos proporcionados. Proporcionar `version` habilita el control de concurrencia optimista para evitar sobrescribir ediciones simultáneas.

- Actualice la supresión de la regla de fuerza bruta para excluir también `10.0.0.2`.
- Cambie la fecha de vencimiento de la supresión `sup-456-xyz` al próximo trimestre.
- Deshabilite la supresión de la regla de detección de anomalía sin eliminarla.

### `delete_datadog_security_suppression` {#delete-datadog-security-suppression}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Suppressions Write`*\
Elimina una regla de supresión.

- Elimine la supresión `sup-456-xyz`.
- Elimine la supresión que silenciaba la regla de detección de fuerza bruta.

### `get_datadog_security_findings_schema` {#get-datadog-security-findings-schema}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read`*\
Devuelve el esquema (campos disponibles y sus tipos) para los hallazgos de seguridad. Llame a esto primero antes de usar `analyze_datadog_security_findings` para descubrir los campos consultables. Admite el filtrado por tipo de hallazgo y el control del tamaño de la respuesta.

- ¿Qué campos están disponibles para los hallazgos de seguridad?
- Muéstrame el esquema para los hallazgos de vulnerabilidad de biblioteca.
- Obtén el esquema completo, incluidas las descripciones para los hallazgos de configuración incorrecta.

### `analyze_datadog_security_findings` {#analyze-datadog-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read` y `Timeseries`*\
Herramienta principal para analizar hallazgos de seguridad mediante consultas SQL. Consulta datos en tiempo real de las últimas 24 horas con agregaciones, filtrado y agrupación SQL flexibles. Llame primero a `get_datadog_security_findings_schema` para descubrir los campos disponibles, luego use esta herramienta para consultar.

- Muéstrame las 10 reglas principales con los hallazgos más críticos.
- Cuente los hallazgos abiertos agrupados por gravedad y tipo de hallazgo.
- Encuentre vulnerabilidades de biblioteca con exploits disponibles, agrupadas por recurso.

### `search_datadog_security_findings` {#search-datadog-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read`*\
Herramienta de respaldo para recuperar detalles completos de hallazgos de seguridad. Prefiera `analyze_datadog_security_findings` para la mayoría de las tareas de análisis. Utilice esta herramienta solo cuando necesite objetos de hallazgo completos o cuando las consultas SQL sean insuficientes.

- Obtenga detalles completos de los hallazgos críticos en mi entorno de AWS.
- Recupere objetos de hallazgo completos para una regla específica.
- Liste todos los hallazgos de riesgo de identidad abiertos con metadatos completos.

### `get_datadog_security_findings_ticket_suggestions` {#get-datadog-security-findings-ticket-suggestions}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read`, `Cases Read`*\
Devuelve sugerencias de proyecto clasificadas para la creación de tickets de hallazgos de seguridad. Muestre los proyecto disponibles de Case Management, Jira, Linear y ServiceNow con datos de uso de 30 días. Llame a esto antes de `create_datadog_security_findings_ticket` para descubrir qué proyecto usar.

- ¿Qué proyecto de Jira puedo usar para crear tickets para hallazgos de seguridad?
- Muéstreme los proyecto de ServiceNow disponibles para la creación de tickets.
- ¿A qué proyecto de Linear puedo enviar hallazgos?
- ¿Qué proyecto de Case Management es el más utilizado para hallazgos?

### `create_datadog_security_findings_ticket` {#create-datadog-security-findings-ticket}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Write`, `Cases Read`, `Cases Write`*\
Cree un caso de Case Management, un issue de Jira, un issue de Linear o un ticket de ServiceNow para hallazgos de seguridad. Requiere IDs de hallazgo específicos y un ID de proyecto. Utilice `get_datadog_security_findings_ticket_suggestions` primero para descubrir los proyecto disponibles.

- Cree un ticket de Jira para estos hallazgos críticos en el proyecto SECURITY.
- Abra un caso de Case Management para los hallazgos de esta regla.
- Cree un issue de Linear para estos hallazgos de alta severidad.
- Cree un ticket de ServiceNow para estas vulnerabilidades de biblioteca.

### `detach_datadog_security_findings_ticket` {#detach-datadog-security-findings-ticket}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Write`, `Cases Write`*\
Desvincule los hallazgos de seguridad de su caso o ticket vinculado. Dado que los tickets de Jira y ServiceNow están vinculados a través de Case Management, desvincular el caso también desvincula cualquier ticket relacionado.

- Desvincule estos hallazgos de su ticket de Jira vinculado.
- Elimine la asociación de caso para estos hallazgos.

### `mute_datadog_security_findings` {#mute-datadog-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Write`*\
Silencie o reactive hallazgos de seguridad para suprimirlos de alertas y paneles. Requiere un motivo de silencio (`PENDING_FIX`, `FALSE_POSITIVE`, `ACCEPTED_RISK` o `OTHER`) y admite una descripción y una fecha de vencimiento opcionales.

- Silencie estos hallazgos como falsos positivos.
- Silencie esta configuración incorrecta como riesgo aceptado con una fecha de vencimiento de 90 días.
- Reactive los hallazgos que se marcaron previamente como pendientes de corrección.

### `assign_datadog_security_findings` {#assign-datadog-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Write`*\
Asigne o desasigne hallazgos de seguridad a un usuario. La asignación se propaga a cualquier caso vinculado. Omita el ID del asignado para desasignar.

- Asigne estos hallazgos críticos al líder del equipo de seguridad.
- Desasigne los hallazgos que ya no sean relevantes.
- Asígneme todos los hallazgos de esta regla.

### `list_datadog_security_findings_automation_rules` {#list-datadog-security-findings-automation-rules}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Pipelines Read`*\
Enumere las reglas de automatización de hallazgos de seguridad de un tipo determinado (`mute`, `due_date`, `ticket_creation` o `severity_modifier`).

- Enumere todas las reglas de automatización de silencio para hallazgos de seguridad.
- Muéstreme las reglas de creación de tickets.
- ¿Qué reglas de automatización de fechas límite están configuradas?

### `create_datadog_security_findings_automation_rule` {#create-datadog-security-findings-automation-rule}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Pipelines Write` y `Security Monitoring Findings Read`*\
Cree una regla de automatización de hallazgos de seguridad. Elija un `rule_type`: `mute` (suprimir hallazgos), `due_date` (establecer fechas límite de remediación), `severity_modifier` (ajustar la gravedad del hallazgo) o `ticket_creation` (crear automáticamente tickets de Jira o de Case Management).

- Cree una regla para silenciar automáticamente los hallazgos de configuración incorrecta de falsos positivos en el entorno de pruebas.
- Establezca fechas límite de remediación de 30 días para vulnerabilidades de bibliotecas de alta gravedad.
- Cree automáticamente tickets de Jira para hallazgos críticos en el proyecto SECURITY.

### `update_datadog_security_findings_automation_rule` {#update-datadog-security-findings-automation-rule}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Pipelines Write`*\
Actualice una regla de automatización existente. Admite actualizaciones parciales, por lo que solo se cambian los campos proporcionados. Úsela para habilitar o deshabilitar reglas, cambiarles el nombre, ajustar filtros o modificar parámetros de acción.

- Habilite la regla de automatización que silencia los hallazgos del entorno de pruebas.
- Cambie la regla de fecha de vencimiento para dar a los hallazgos críticos 14 días en lugar de 30.
- Actualice la regla de creación de tickets para apuntar a un proyecto de Jira diferente.

### `delete_datadog_security_findings_automation_rule` {#delete-datadog-security-findings-automation-rule}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Pipelines Write`*\
Elimine permanentemente una regla de automatización de hallazgos de seguridad por ID.

- Elimine la regla de modificador de gravedad `abc-123-def`.
- Elimine la regla de silencio que ya no es necesaria.

### `reorder_datadog_security_findings_automation_rules` {#reorder-datadog-security-findings-automation-rules}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Pipelines Write`*\
Mueva una regla de automatización hacia arriba o hacia abajo en la lista. Las reglas se aplican en orden, por lo que la posición de una regla establece su prioridad.

- Mueva la regla de silencio `abc-123-def` a la parte superior de la lista.
- Reduzca la prioridad de esta regla de fecha de vencimiento en dos posiciones.

### `get_datadog_security_trace_passlist` {#get-datadog-security-trace-passlist}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Read`*\
Devuelve todas las entradas de filtro de exclusión (lista de permitidos) de WAF para que la organización revise las supresiones existentes.

- Enumere todas las entradas de la lista de permitidos de App & API Protection.
- Muéstreme los filtros de exclusión de WAF activos.
- Verifique las supresiones de la lista de permitidos existentes antes de agregar una nueva.

### `upsert_datadog_security_trace_passlist` {#upsert-datadog-security-trace-passlist}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Write`*\
Crea o actualiza una entrada de filtro de exclusión (lista de permitidos) de WAF para suprimir reglas ruidosas en un servicio o punto final específico.

- Agregue una entrada de lista de permitidos de WAF para el servicio "checkout-service" en el punto final "/api/pay" para ignorar la regla "sqli-detection".
- Actualice el filtro de exclusión para suprimir la regla "xss-rule" para el servicio "auth-api".
- Cree una entrada de lista de permitidos de AppSec que coincida con el ID de regla "lfi-attack" en "/v1/users".

### `delete_datadog_security_trace_passlist` {#delete-datadog-security-trace-passlist}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Write`*\
Elimine una entrada de filtro de exclusión (lista de permitidos) de WAF existente.

- Elimine el filtro de exclusión de WAF "passlist-abc-123".
- Elimine la entrada de la lista de permitidos que coincide con la regla "sqli-detection" en "/api/pay".

### `get_datadog_security_aap_denylist` {#get-datadog-security-aap-denylist}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Read`*\
Enumere las IP, los usuarios y los agentes de usuario bloqueados (entradas de la lista de denegados), con filtrado opcional.

- Enumera todas las entidades bloqueadas en la lista de denegados de AppSec.
- Muéstreme las direcciones IP bloqueadas de ayer.
- Compruebe si la IP "198.51.100.42" está en la lista de denegados de seguridad.

### `upsert_datadog_security_aap_denylist` {#upsert-datadog-security-aap-denylist}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Write`*\
Agrega o actualiza un bloqueo de lista de denegación para una IP, usuario o agente de usuario con una fecha de vencimiento.

- Bloquee la IP "198.51.100.42" en la lista de denegación durante 24 horas.
- Agregue al usuario "attacker_user_99" a la lista de denegación de entidades bloqueadas.
- Cree una entrada en la lista de denegación para el agente de usuario "MaliciousScanner/1.0" con una fecha de vencimiento establecida para la próxima semana.

### `unblock_datadog_security_aap_denylist` {#unblock-datadog-security-aap-denylist}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Write`*\
Desbloquea una entidad previamente incluida en la lista de denegación estableciendo su expiración en el pasado.

- Desbloquee la IP "198.51.100.42" de la lista de denegación.
- Elimine al usuario "attacker_user_99" de la lista de entidades bloqueadas.

### `get_datadog_security_aap_custom_rules` {#get-datadog-security-aap-custom-rules}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Read`*\
Recupera una regla WAF personalizada de App & API Protection (AAP) por ID o lista reglas personalizadas. Admite filtrado por categoría, estado, servicio y entorno.

- Listar reglas de WAF personalizadas que se aplican al servicio \"checkout-service\" en producción.
- Obtenga la regla personalizada de AAP "rule-xyz-123".

### `upsert_datadog_security_aap_custom_rule` {#upsert-datadog-security-aap-custom-rule}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Write`*\
Crea o actualiza una regla de WAF personalizada de AAP en la categoría de intento de ataque o lógica de negocio. Las reglas nuevas no pueden bloquear tráfico: cree la regla en modo de monitoreo, luego actualícela al modo de bloqueo después de confirmar sus coincidencias.

- Cree una regla WAF de monitoreo personalizada para solicitudes a la ruta "/admin".
- Actualice la regla personalizada de AAP "rule-xyz-123" para bloquear el tráfico coincidente.
- Deshabilite la regla personalizada "rule-xyz-123" sin eliminarla.

### `delete_datadog_security_aap_custom_rule` {#delete-datadog-security-aap-custom-rule}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Write`*\
Elimine permanentemente una regla WAF personalizada de AAP por ID.

- Elimine la regla WAF personalizada "rule-xyz-123".
- Elimine la regla personalizada de AAP que monitorea las solicitudes a "/admin".

### `get_datadog_security_aap_blocking_config` {#get-datadog-security-aap-blocking-config}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Application Security Management Protect Read`*\
Recupera la configuración de aplicación de bloqueo y lista de denegación de AAP para toda la organización.

- ¿Está habilitado el bloqueo de AAP para la organización?
- ¿Se aplica la lista de denegación de AAP?
- Muéstrame la configuración de bloqueo de AAP.

## Session Replay {#session-replay}

Herramientas para buscar grabaciones de Session Replay[69] y resumir la actividad de la sesión.

### `search_replays` {#search-replays}
*Conjunto de herramientas: **session-replay***\
*Permisos requeridos: `RUM Apps Read`*\
Busca grabaciones de Session Replay y devuelve las sesiones coincidentes. Admite el filtrado por identidad de usuario, dispositivo, recuento de errores o cualquier faceta de RUM, y la búsqueda de recorridos para sesiones que siguieron una secuencia específica de vistas o acciones.

- Encuentra reproducciones de sesiones con más de 2 errores en las últimas 24 horas.
- Muéstrame reproducciones de usuarios que siguieron el recorrido de pago pero no lo completaron.

### `get_replay_summary` {#get-replay-summary}
*Conjunto de herramientas: **session-replay***\
*Permisos requeridos: `RUM Apps Read` y `RUM Session Replay Read`*\
Genera una narración cronológica impulsada por IA de lo que hizo un usuario durante una reproducción de sesión específica (páginas visitadas, acciones realizadas y momentos clave), organizada en capítulos. Normalmente se invoca después de `search_replays` para profundizar en una sesión de interés.

- Resume lo que sucedió en la sesión `abc-123-def`.
- Dame una narración paso a paso de la reproducción para el usuario que informó un error de pago.

## Entrega de software {#software-delivery}

Herramientas para interactuar con la Entrega de software ([CI Visibility][48], [Test Optimization][24], [Code Coverage][65] y [DORA metrics][66]).

### `search_datadog_ci_pipeline_events` {#search-datadog-ci-pipeline-events}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `CI Visibility Read`*\
Busca eventos de CI con filtros y devuelve detalles sobre ellos.

- Muéstrame todas las pipelines para mi commit `58b1488`.
- Muéstrame la falla de pipeline más reciente en la rama `my-branch`.
- Proponga una solución para el trabajo `integration-test` que falla cada vez en mi rama `my-branch`.

### `aggregate_datadog_ci_pipeline_events` {#aggregate-datadog-ci-pipeline-events}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `CI Visibility Read`*\
Agrupa eventos de CI pipeline para producir estadísticas, métricas y análisis agrupados.

- ¿Cuál es la duración promedio de los trabajos en los últimos 7 días?
- ¿Cuántas pipelines fallidas ha habido en las últimas 2 semanas?
- Muéstrame el percentil 95 de la duración de los pipelines agrupados por nombre de pipeline.

### `get_datadog_flaky_tests` {#get-datadog-flaky-tests}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Read`*\
Busca en Datadog [Test Optimization][24] pruebas inestables y devuelve detalles de clasificación (tasa de fallos, categoría, propietarios, historial, impacto en CI), con paginación y ordenamiento.

- Busca pruebas inestables activas para el servicio de checkout propiedad de `@team-abc`, ordenadas por tasa de fallos.
- Muéstrame las pruebas inestables en la rama `main` para el repositorio `github.com/org/repo`, de la más reciente a la más antigua.
- Enumera las pruebas inestables en la categoría `timeout` con una tasa de fallos alta (50%+) para que pueda priorizar las correcciones.

### `update_datadog_flaky_test_states` {#update-datadog-flaky-test-states}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Write`*\
Establezca el estado de una o más pruebas inestables en `quarantined` (suprimir fallas), `disabled` (omitir prueba), `fixed` (marcar como resuelto) o `active` (restaurar). Esta es una operación de escritura que requiere la aprobación explícita del usuario. Todos los cambios de estado son reversibles.

- Ponga en cuarentena todas las pruebas inestables activas en el repositorio `checkout-service`.
- Marque la prueba inestable `AuthServiceTest::testLogin` como corregida.
- Deshabilite las pruebas inestables propiedad de `@team-payments` con una tasa de fallos superior al 50%.

### `aggregate_datadog_test_events` {#aggregate-datadog-test-events}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Read`*\
Agrupa eventos de Datadog Test Optimization para cuantificar las tendencias de confiabilidad y rendimiento con funciones de agregación, métricas opcionales, facetas de group-by y niveles de test configurables.

- Cuente el número de pruebas fallidas durante la última semana, agrupadas por rama.
- Muéstreme la duración del percentil 95 para cada conjunto de pruebas para identificar las más lentas.
- Cuente todas las pruebas aprobadas y fallidas, agrupadas por propietarios del código.

### `search_datadog_test_events` {#search-datadog-test-events}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Read`*\
Busque eventos de pruebas [Test Optimization][24] con filtros y devuelva detalles sobre ellos.

- Muéstreme las ejecuciones de prueba fallidas en la rama `main` de las últimas 24 horas.
- Obtenga las ejecuciones de prueba para la confirmación `abc123` para ver qué pasó y qué falló.
- Muéstreme todas las ejecución de prueba inestables para el servicio de checkout.
- Encuentre las ejecuciones de prueba propiedad de `@team-name` que están fallando.

### `get_datadog_code_coverage_branch_summary` {#get-datadog-code-coverage-branch-summary}
*Conjunto de herramientas: software-delivery**software-delivery***\
*Permisos requeridos: `Code Coverage read`*\
Obtiene métricas resumidas de Code Coverage agregadas para una rama de repositorio, incluyendo la cobertura total, la cobertura de parches y los desgloses por servicio/propietario del código.

- ¿Cuál es el Code Coverage en la rama `main` para `github.com/my-org/my-repo`?
- Muéstrame el resumen de Code Coverage para la rama `release/1.x` de `github.com/my-org/my-repo`.

### `get_datadog_code_coverage_commit_summary` {#get-datadog-code-coverage-commit-summary}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Code Coverage read`*\
Obtiene métricas resumidas de cobertura de código agregadas para una confirmación de repositorio, incluyendo la cobertura total, la cobertura de parches y los desgloses por servicio/propietario del código.

- Muéstrame el Code Coverage para la confirmación `abc123abc123abc123abc123abc123abc123abcd` en `github.com/my-org/my-repo`.
- ¿Cuál es la cobertura de parches para la confirmación más reciente en mi rama?

### `get_datadog_code_coverage_pr_summary` {#get-datadog-code-coverage-pr-summary}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Code Coverage read`*\
Obtiene métricas resumidas de Code Coverage agregadas para una solicitud de extracción, incluyendo la cobertura total, la cobertura de parches y los desgloses por servicio o propietario del código.

- Muéstrame el Code Coverage para la PR #123 en `github.com/my-org/my-repo`.
- ¿Cuál es la cobertura de parches para la solicitud de extracción #456 en `github.com/my-org/my-repo`?

### `get_datadog_code_coverage_files` {#get-datadog-code-coverage-files}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Code Coverage read`*\
Obtiene los datos de líneas de Code Coverage por archivo para una confirmación de repositorio, rama o solicitud de extracción. Devuelve las líneas ejecutables, las líneas cubiertas y las líneas añadidas para cada archivo. Se debe proporcionar exactamente uno de `commit_sha`, `branch` o `pr_number`. Se puede proporcionar como máximo uno de `service`, `codeowner` o `flag` para filtrar los resultados.

- Muéstrame el Code Coverage por archivo para la PR #123 en `github.com/my-org/my-repo`.
- Obtén el Code Coverage de archivos modificados para la confirmación `abc123abc123abc123abc123abc123abc123abcd` en `github.com/my-org/my-repo`.
- Muestra el Code Coverage para la rama `main` de `github.com/my-org/my-repo`, filtrada por el propietario del código `@my-org/my-team`.`

### `get_datadog_test_optimization_settings` {#get-datadog-test-optimization-settings}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Read`*\
Recupera las funciones de Test Optimization que están habilitadas para un servicio, incluyendo Test Impact Analysis (ITR), Early Flake Detection (EFD), Auto Test Retries (ATR), Failed Test Replay, Code Coverage collection y PR Comments.

- ¿Qué funciones de Test Optimization están habilitadas para `auth-service`?
- Muéstrame la configuración de Test Optimization para mi servicio de pago.

### `get_datadog_flaky_tests_management_policies` {#get-datadog-flaky-tests-management-policies}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Read`*\
Recupera las políticas de Flaky Tests Management configuradas para un repositorio, incluyendo ventanas de cuarentena automática, reglas de rama, umbrales de tasa de fallos, políticas de desactivación y configuraciones de reintento.

- Muéstrame las políticas de Flaky Tests Management para `github.com/my-org/my-repo`.
- ¿Qué reglas de cuarentena automática están configuradas para el repositorio del checkout service?

### `search_dora_deployments` {#search-dora-deployments}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `DORA Metrics Read`*\
Busca eventos de despliegue DORA con filtros, u obtiene detalles completos de un solo despliegue por ID.

- Muéstrame los despliegues para el servicio `checkout` en los últimos 7 días.
- Obtén los detalles del despliegue DORA `abc123`.
- Encuentra los despliegues fallidos en el entorno de producción este mes.

### `aggregate_dora_deployments` {#aggregate-dora-deployments}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Timeseries`*\
Devuelve métricas DORA (frecuencia de despliegue, tiempo de entrega de cambios, tasa de fallos en cambios, tiempo de recuperación) para un servicio, equipo o repositorio, como valores escalares o series temporales. Úselo para preguntas sobre el rendimiento de la entrega de software durante un período de tiempo.

- ¿Cuál es la frecuencia de despliegue y la tasa de fallos en cambios para el servicio `checkout` en los últimos 30 días?
- Muéstrame la tendencia del tiempo de entrega de cambios para el servicio `payments` durante el último trimestre.
- Obtén las cuatro métricas DORA para el equipo `auth-service`.

## Synthetics {#synthetics}

Herramientas para interactuar con [pruebas Synthetic][47] de Datadog.

### `get_synthetics_tests` {#get-synthetics-tests}
*Conjunto de herramientas: **Synthetics***\
*Permisos requeridos: `Synthetics Read`*\
Busca pruebas Synthetic HTTP API de Datadog.

- Ayúdame a entender por qué está fallando la prueba Synthetic en el endpoint `/v1/my/tested/endpoint`.
- Hay una interrupción; busca todas las pruebas Synthetic que están fallando en el dominio `api.mycompany.com`.
- ¿Las pruebas Synthetic en mi sitio web `api.mycompany.com` siguen funcionando en la última hora?

### `edit_synthetics_tests` {#edit-synthetics-tests}
*Conjunto de herramientas: **Synthetics***\
*Permisos requeridos: `Synthetics Global Variable Read` y `Synthetics Read` y `Synthetics Write`*\
Edita pruebas Synthetic HTTP API de Datadog.

- Mejore las aserciones de la prueba Synthetic definida en mi endpoint `/v1/my/tested/endpoint`.
- Pause la prueba `aaa-bbb-ccc` y establezca las ubicaciones únicamente en Europa.
- Agregue la etiqueta de mi equipo a la prueba `aaa-bbb-ccc`.

### `synthetics_test_wizard` {#synthetics-test-wizard}
*Conjunto de herramientas: **Synthetics***\
*Permisos requeridos: `Synthetics Global Variable Read` y `Synthetics Read` y `Synthetics Write`*\
Obtenga una vista previa y cree pruebas Synthetic HTTP API de Datadog.

- Cree pruebas Synthetic en cada endpoint definido en este archivo de código.
- Cree una prueba Synthetic en `/path/to/endpoint`.
- Cree una prueba Synthetic que verifique si mi dominio `mycompany.com` permanece activo.

## Widgets {#widgets}

Herramientas para la visualización, validación y conversión de tipos de widgets de [tablero][46] y [notebook][57].

### `get_widget` {#get-widget}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Dashboards Read` o `Timeseries` o `Monitors Read` o `APM Read` o `RUM Apps Read`*\
Recupera y visualiza métricas, trazas, registros y otros datos de Datadog como gráficos interactivos. Admite tres modos: búsqueda de tablero, definición directa o resolución de URL.

- Muestra las series temporales de uso de CPU para `service:api` durante la última hora.
- Obtén los datos del widget para el widget `2228368921512806` en el tablero `abc-123-def`.
- Visualiza los datos de este enlace compartido de Datadog.

### `search_datadog_widgets` {#search-datadog-widgets}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read` o `Notebooks Write`*\
Busca y recupera información sobre widgets en los tableros de Datadog, incluyendo sus identificadores, títulos y consultas subyacentes.

- Encuentra todos los widgets de series temporales que consultan la métrica `system.cpu.user`.
- Busca widgets relacionados con tasas de error en todos los tableros.

### `swap_widget_type` {#swap-widget-type}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read` o `Notebooks Write`*\
Convierte una definición de widget de un tipo de visualización a otro mientras conserva las consultas. Admite tipos de widgets basados en solicitudes de fórmulas: series temporales, valor de consulta, lista principal, tabla de consulta, mapa de árbol, gráfico de rayos de sol, distribución, mapa de calor, mapa geográfico y flujo de lista.

- Convierte este widget de series temporales en una lista principal.
- Cambie el widget de tabla a una visualización de mapa de árbol.

### `validate_notebook_cell` {#validate-notebook-cell}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Timeseries`*\
Valida las definiciones de widget de celda de notebook, incluida la exactitud de SQL para celdas analysis_sql. Al validar una celda analysis_sql, incluya sus widgets de fuente de datos ascendentes para que el punto final pueda verificar las expresiones SQL contra sus esquemas.

- Valide estas definiciones de celda de notebook antes de guardar.
- Verifique si la celda de SQL de análisis hace referencia a columnas válidas del widget ascendente.

### `validate_notebook_cells` {#validate-notebook-cells}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Timeseries`*\
Valida múltiples definiciones de widget de celda de notebook en una sola llamada, incluida la exactitud de SQL para celdas analysis_sql.

- Valide todas las celdas en este notebook antes de publicar.
- Verifique estas tres celdas de análisis en busca de errores de SQL.

### `verify_widget_data` {#verify-widget-data}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Dashboards Read` o `Timeseries` o `Monitors Read` o `APM Read` o `RUM Apps Read`*\
Verifica si las definiciones de los widgets devuelven datos de la última hora. Llame después de agregar widgets a un tablero para confirmar que las consultas devuelvan datos reales. Devuelve un resultado por widget indicando si se encontraron datos, con una razón en caso contrario.

- Compruebe si estas definiciones de widget devuelven datos.
- Verifique que los widgets agregados al tablero muestren métricas reales.

### `visualize_tabular_data` {#visualize-tabular-data}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: No se requieren permisos específicos.*\
Representa datos tabulares como una visualización interactiva (sunburst, treemap o lista principal). Úselo después de agregar datos de consultas para visualizar relaciones jerárquicas o clasificaciones.

- Visualice estos datos de métricas agrupados como un gráfico sunburst.
- Muestre estos datos agregados como un desglose de mapa de árbol.

## Flujos de trabajo {#workflows}

Herramientas para [Workflow Automation][39], que incluyen listar, inspeccionar, ejecutar y configurar flujos de trabajo para el uso del agente.

### `list_datadog_workflows` {#list-datadog-workflows}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Read`*\
Lista y busca flujos de trabajo de [Workflow Automation][39]. Admite filtrado por nombre, etiquetas, propietario, identificador y tipo de activador (como `monitor`, `schedule`, `api` o `incident`). Los resultados se pueden ordenar por campos como `name` o `updatedAt`.

- Muéstreme todos los flujos de trabajo publicados etiquetados con `team:platform`.
- Enumere los flujos de trabajo que tienen configurado un activador de agente.
- Busque todos los flujos de trabajo relacionados con la respuesta a incidente que sean propiedad de Alice Smith.

### `get_datadog_workflow` {#get-datadog-workflow}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Read`*\
Recupera información detallada sobre un flujo de trabajo específico, incluidos sus activadores, pasos, conexiones y esquema de entrada.

- Obtenga los detalles completos del flujo de trabajo `00000000-0000-0000-0000-000000000000`.
- Muéstreme los parámetros de entrada y los pasos para el flujo de trabajo de reversión de implementación.
- ¿Qué activadores están configurados para este flujo de trabajo?

### `execute_datadog_workflow` {#execute-datadog-workflow}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Run`*\
Ejecute un flujo de trabajo publicado que tiene un activador de agente, con parámetros de entrada opcionales que coinciden con el esquema de entrada del flujo de trabajo.

- Ejecute el flujo de trabajo de escalamiento de incidente para el servicio `checkout-api` con gravedad `high`.
- Ejecute el flujo de trabajo de reversión de implementación para el servicio de pagos.
- Inicie el flujo de trabajo de notificación de guardia con el contexto de esta investigación.

**Nota**: El flujo de trabajo debe estar publicado y tener configurado un activador de agente. Utilice `update_datadog_workflow_with_agent_trigger` para agregar uno si es necesario.

### `get_datadog_workflow_instance` {#get-datadog-workflow-instance}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Read`*\
Recupera el estado y los detalles de una instancia de ejecución de flujo de trabajo, incluidos los resultados de los pasos y las salidas.

- ¿Cuál es el estado de la ejecución del flujo de trabajo que inicié?
- ¿Se completó correctamente el flujo de trabajo de escalamiento de incidente?
- Muéstreme los resultados detallados de la instancia de flujo de trabajo `00000000-0000-0000-0000-000000000000`.

### `update_datadog_workflow_with_agent_trigger` {#update-datadog-workflow-with-agent-trigger}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Write`*\
Agregue un activador de agente a un flujo de trabajo y publíquelo, permitiendo que el flujo de trabajo sea ejecutado por agentes de IA.

- Agregue un activador de agente al flujo de trabajo de reversión de implementación para que pueda ejecutarlo desde aquí.
- Configure el flujo de trabajo de respuesta a incidente para que pueda ser activado por un agente.

[1]: /es/mcp_server/setup#toolsets
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
[60]: /es/security/detection_rules/
[61]: /es/security/suppressions/
[62]: /es/getting_started/profiler/
[56]: /es/account_management/rbac/permissions/
[57]: /es/notebooks/
[58]: /es/real_user_monitoring/
[59]: /es/real_user_monitoring/rum_without_limits/
[62]: /es/experiments/
[63]: /es/agent/guide/rshell/
[64]: /es/cloud_cost_management/
[65]: /es/code_coverage/
[66]: /es/delivery_performance/dora_metrics/
[67]: /es/security/cloud_siem/triage_and_investigate/ioc_explorer/
[68]: /es/product_analytics/
[69]: /es/session_replay/
[70]: /es/data_observability/
[71]: /es/account_management/audit_trail/