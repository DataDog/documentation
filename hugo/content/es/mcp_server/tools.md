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
description: Navega por todas las herramientas disponibles en el Servidor MCP de Datadog,
  organizadas por conjunto de herramientas, con ejemplos de indicaciones.
further_reading:
- link: mcp_server
  tag: Documentación
  text: Servidor MCP de Datadog
- link: mcp_server/setup
  tag: Documentación
  text: Configura el Servidor MCP de Datadog
title: Herramientas del Servidor MCP de Datadog
---
Las siguientes herramientas están disponibles en el Servidor MCP de Datadog. Cada entrada incluye el conjunto de herramientas requerido, permisos y ejemplos de indicaciones. Las herramientas están agrupadas por [conjuntos de herramientas][1], lo que te permite usar solo las herramientas que necesitas, ahorrando valioso espacio en la ventana de contexto.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Para habilitar herramientas específicas del producto, incluye el parámetro de consulta `toolsets` al final de la URL del endpoint que utilizas para conectarte al Servidor MCP de Datadog. Por ejemplo, según el [sitio de Datadog][2] que seleccionaste ({{< region-param key="dd_site_name" >}}), esta URL habilita _solo_ herramientas de APM y Observabilidad del Agente:

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

También puedes excluir herramientas específicas con el parámetro de consulta `omit_tools`.

[2]: /es/getting_started/site/
{{< /site-region >}}

Consulta [Configura el Servidor MCP de Datadog][1] para obtener más información sobre cómo conectarte al Servidor MCP, habilitar conjuntos de herramientas y omitir herramientas específicas.

<div class="alert alert-info">Las herramientas del Servidor MCP de Datadog están en un desarrollo significativo y están sujetas a cambios. Utiliza <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">este formulario de retroalimentación</a> para compartir cualquier comentario, casos de uso o problemas encontrados con tus indicaciones y consultas.</div>

## Herramientas principales {#core-tools}

El conjunto de herramientas predeterminado para registros, métricas, trazas, tableros, seguimientos, incidentes, servidores, servicios, eventos y notebooks.

### `search_datadog_events` {#search-datadog-events}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Events` y `Timeseries`*\
Busca eventos como alertas de seguimiento, notificaciones de despliegue, cambios en la infraestructura, hallazgos de seguridad y cambios en el estado del servicio.

- Muéstrame todos los eventos de despliegue de las últimas 24 horas.
- Encuentra eventos relacionados con nuestro entorno de producción con estado de error.
- Obtén eventos etiquetados con `service:api` de la última hora.

**Nota**: Consulta la [API de Gestión de Eventos][15] para más detalles.

### `get_datadog_incident` {#get-datadog-incident}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Incidents Read`*\
Recupera información detallada sobre un incidente.

- Obtén detalles del incidente ABC123.
- ¿Cuál es el estado del incidente ABC123?
- Recupera toda la información sobre el incidente de Redis de ayer.

**Nota**: La herramienta está operativa, pero no incluye datos de la línea de tiempo del incidente.

### `get_datadog_metric` {#get-datadog-metric}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Cloud Cost Management Read` o `Metrics` o `Timeseries`*\
Consulta y analiza datos métricos históricos o en tiempo real, apoyando consultas personalizadas y agregaciones.

- Muéstrame las métricas de utilización de CPU para todos los hosts en las últimas 4 horas.
- Obtén métricas de latencia de Redis para el entorno de producción.
- ¿Cuánto cambiaron mis costos en la nube de enero a febrero?

### `get_datadog_metric_context` {#get-datadog-metric-context}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Cloud Cost Management Read` o `Metrics`*\
Recupera información detallada sobre una métrica, incluyendo metadatos, etiquetas disponibles y valores de etiquetas para filtrar y agrupar.

- ¿Qué etiquetas están disponibles para la métrica `system.cpu.user`?
- Muéstrame todos los valores posibles para la etiqueta `env` en `redis.info.latency_ms`.
- Obtén metadatos y dimensiones para la métrica `requests.count`.

### `search_datadog_monitors` {#search-datadog-monitors}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Monitors Read`*\
Recupera información sobre los monitores de Datadog, incluyendo sus estados, umbrales y condiciones de alerta.

- Lista todos los monitores que están actualmente alertando.
- Muéstrame los monitores relacionados con nuestro servicio de pagos.
- Encuentra monitores etiquetados con `team:infrastructure`.

### `get_datadog_trace` {#get-datadog-trace}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `APM Read`*\
Obtiene una traza completa de Datadog APM usando un ID de traza.

- Obtén la traza completa para el ID 7d5d747be160e280504c099d984bcfe0.
- Muéstrame todos los tramos para la traza abc123 con información de tiempo.
- Recupera detalles de la traza incluyendo consultas a la base de datos para el ID xyz789.

**Nota**: Las trazas grandes con miles de tramos pueden ser truncadas (y se indicará como tal) sin una forma de recuperar todos los tramos.

### `search_datadog_dashboards` {#search-datadog-dashboards}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Dashboards Read` y `User Access Read`*\
Lista de tableros de Datadog disponibles y detalles clave.

- Muéstrame todos los tableros disponibles en nuestra cuenta.
- Lista de tableros relacionados con la monitorización de infraestructura.
- Encuentra tableros compartidos para el equipo de ingeniería.

**Nota**: Esta herramienta enumera tableros relevantes, pero proporciona detalles limitados sobre su contenido. Usa `get_datadog_dashboard` para recuperar definiciones completas de widgets.

### `get_datadog_notebook` {#get-datadog-notebook}
*Conjunto de herramientas: **core***\
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
- Lista los notebooks etiquetados con `incident-response`.

### `search_datadog_hosts` {#search-datadog-hosts}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Hosts Read` y `Timeseries`*\
Lista y proporciona información sobre los servidores monitoreados, soportando filtrado y búsqueda.

- Muéstrame todos los servidores en nuestro entorno de producción.
- Lista los servidores no saludables que no han reportado en la última hora.
- Obtén todos los servidores etiquetados con `role:database`.

### `search_datadog_incidents` {#search-datadog-incidents}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Incidents Read`*\
Recupera una lista de incidentes de Datadog, incluyendo su estado, severidad y metadatos.

- Muéstrame todos los incidentes activos por severidad.
- Lista los incidentes resueltos de la última semana.
- Encuentra incidentes que impactan a los clientes.

### `search_datadog_metrics` {#search-datadog-metrics}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Metrics`*\
Lista las métricas disponibles, con opciones para filtrar y metadatos.

- Muéstrame todas las métricas de Redis disponibles.
- Lista las métricas relacionadas con la CPU para nuestra infraestructura.
- Encuentra métricas etiquetadas con `service:api`.

### `search_datadog_services` {#search-datadog-services}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `Service Catalog Read`*\
Lista los servicios en el Catálogo de Datadog con detalles e información del equipo.

- Muéstrame todos los servicios en nuestra arquitectura de microservicios.
- Lista los servicios propiedad del equipo de plataforma.
- Encuentra servicios relacionados con el procesamiento de pagos.

### `search_datadog_service_dependencies` {#search-datadog-service-dependencies}
*Conjunto de herramientas: **core***\
*Permisos requeridos: `APM Read` y `Service Catalog Read` y `Teams Read`*\
Recupera las dependencias de servicio (ascendentes/descendentes) y los servicios propiedad de un equipo.

- Muéstreme todos los servicios ascendentes que llaman al servicio de checkout.
- ¿De qué servicios descendentes depende la API de pagos?
- Liste todos los servicios que pertenecen al equipo de plataforma.

### `search_datadog_spans` {#search-datadog-spans}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `APM Read`*\
Recupera los tramos de las trazas de APM con filtros como servicio, tiempo, recurso, etc.

- Muéstreme los tramos con errores del servicio de checkout.
- Encuentra consultas lentas a la base de datos en los últimos 30 minutos.
- Obtén tramos para solicitudes de API fallidas a nuestro servicio de pago.

### `analyze_datadog_logs` {#analyze-datadog-logs}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Logs Read Data` y `Logs Read Index Data` y `Timeseries`*\
Analiza los registros de Datadog utilizando consultas SQL para conteo, agregaciones y análisis numérico. Utiliza esto para análisis estadístico.

- Cuenta los registros de errores por servicio en la última hora.
- Muéstrame los 10 códigos de estado HTTP principales con sus conteos.
- ¿Qué servicios estaban registrando más durante ese período de tiempo?

### `search_datadog_logs` {#search-datadog-logs}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Logs Read Data` y `Logs Read Index Data`*\
Busca registros con filtros (tiempo, consulta, servicio, host, nivel de almacenamiento, etc.) y devuelve los detalles del registro. Renombrado de `get_logs`.

- Muéstrame los registros de errores del servicio nginx en la última hora.
- Encuentra registros que contengan 'tiempo de conexión agotado' de nuestro servicio de API.
- Obtén todos los registros de código de estado 500 de producción.

### `search_datadog_rum_events` {#search-datadog-rum-events}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `RUM Apps Read`*\
Busca eventos de RUM de Datadog utilizando sintaxis de consulta avanzada.

- Muestra errores de JavaScript y advertencias de consola en RUM.
- Encuentra páginas que se están cargando lentamente (más de 3 segundos).
- Muestra interacciones recientes de usuarios en las páginas de detalles del producto.

### `create_datadog_notebook` {#create-datadog-notebook}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Notebooks Read` y `Notebooks Write`*\
Crea un nuevo notebook de Datadog.

- Cree un notebook para documentar la investigación sobre el aumento de latencia del servicio de checkout.
- Crea un nuevo notebook para nuestra revisión de rendimiento semanal.

### `edit_datadog_notebook` {#edit-datadog-notebook}
*Conjunto de herramientas: **núcleo***\
*Permisos requeridos: `Notebooks Read` y `Notebooks Write`*\
Edite un notebook existente de Datadog.

- Agregue una sección al notebook abc-123-def con los últimos resultados del análisis de registros.
- Actualice el notebook de respuesta a incidentes con los hallazgos de hoy.

## Alerting {#alerting}

Herramientas para validar monitores, buscar grupos de monitores y recuperar plantillas de monitores.

### `validate_datadog_monitor` {#validate-datadog-monitor}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Valide una definición de monitor para verificar su corrección antes de crearla o actualizarla.

- Valide esta definición de monitor antes de que la cree.
- Verifique si la sintaxis de mi consulta de monitor es correcta.

### `get_datadog_monitor_templates` {#get-datadog-monitor-templates}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Recupera las plantillas de monitor disponibles para ayudarte a crear monitores.

- Muéstreme las plantillas de monitor disponibles.
- ¿Qué plantillas puedo usar para crear un nuevo monitor?

### `search_datadog_monitor_groups` {#search-datadog-monitor-groups}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Busque grupos de monitoreo por nombre o criterios.

- Muéstreme todos los grupos de monitoreo en un estado de alerta.
- Encuentre grupos de monitoreo relacionados con el servicio de checkout.

### `search_datadog_slos` {#search-datadog-slos}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `SLOs Read`*\
Las búsquedas de SLOs de Datadog se realizan por nombre, etiquetas o tipo. Soporta la sintaxis de consulta para filtrar por servicio, equipo u otros atributos.

- Busca SLOs relacionados con `service:checkout`.
- Lista todos los SLOs etiquetados con `team:backend`.
- Lista SLOs para el servicio de pagos.

### `create_datadog_monitor` {#create-datadog-monitor}
*Conjunto de herramientas: **alerta***\
*Permisos requeridos: `Monitors Write`*\
Cree un monitor de Datadog en modo borrador. Los monitores creados con esta herramienta no envían notificaciones y están configurados en prioridad 5 (baja). Utilice `validate_datadog_monitor` para verificar la definición antes de crear y `get_datadog_monitor_templates` para ejemplos de sintaxis de consulta. Después de la creación, publique el monitor en la interfaz de usuario de Datadog.

- Cree un monitor de alerta de métrica para el alto uso de CPU en el servicio web.
- Configure un monitor de alerta de registro para picos de errores en el servicio de pagos.
- Cree un monitor para rastrear la latencia p95 para el punto de conexión de checkout.

### `get_monitor_coverage` {#get-monitor-coverage}
*Conjunto de herramientas: **Alerting***\
*Permisos requeridos: `Monitors Read`*\
Encuentre brechas y cobertura de monitoreo para servicios o hosts. Devuelve qué señales (como tasa de errores, latencia y tasa de solicitudes) están cubiertas por monitores existentes y cuáles están faltando. Utilice `create_datadog_monitor` para llenar brechas.

- Obtenga cobertura de monitoreo para `service:checkout`.
- ¿Qué brechas de monitoreo existen para `host:web-01`?
- Encuentre servicios que carecen de monitores de tasa de errores.

## APM {#apm}

Herramientas para análisis de trazas [APM][50], búsqueda de spans, información de Watchdog e investigación de rendimiento.

<div class="alert alert-info">El <code>apm</code> El conjunto de herramientas está en vista previa. <a href="https://www.datadoghq.com/product-preview/apm-mcp-toolset/">Regístrese para acceder.</a></div>

### `apm_search_spans` {#apm-search-spans}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Busque tramos utilizando la sintaxis de consulta APM, con soporte para paginación y filtrado de etiquetas.

- Muéstreme tramos con errores del servicio de checkout en la última hora.
- Encuentre consultas lentas a la base de datos que tomen más de 2 segundos.
- Busque tramos con `service:payments` y `status:error`.

### `apm_query_trace` {#apm-query-trace}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Consulta los datos de tramo de una traza para filtrar, agregar o clasificar tramos, como encontrar los tramos con mayor tiempo propio o rastrear un error hasta su servicio de origen.

- Encuentre los 5 tramos principales por tiempo propio en la traza `abc123`.
- Muestre todos los mensajes de error y sus servicios de origen en la traza `abc123`.
- ¿Qué llamadas a la base de datos en esta traza tomaron más de 500 ms?

### `apm_discover_span_tags` {#apm-discover-span-tags}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Descubra las claves de etiqueta disponibles en los tramos dentro de un rango de tiempo.

- ¿Qué etiquetas están disponibles en los tramos para `service:checkout`?
- Muéstreme las claves de etiqueta por las que puedo filtrar en APM.

### `apm_get_primary_tag_keys` {#apm-get-primary-tag-keys}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Recupera las claves de etiqueta primarias configuradas para la organización.

- ¿Cuáles son las claves principales de etiqueta de mi organización?

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

### `apm_latency_bottleneck_summary` {#apm-latency-bottleneck-summary}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Analiza los cuellos de botella de latencia a través de trazas en un período de anomalía utilizando cálculos de tiempo propio. Identifica qué combinaciones de servicios y recursos consumen más tiempo propio, detecta patrones de llamadas en cascada y revela las causas raíz de los picos de latencia.

- Resume los cuellos de botella de latencia para el servicio de checkout entre las 2 p.m. y las 3 p.m. de hoy.
- ¿Qué está consumiendo más tiempo propio en el servicio de pagos durante este pico de latencia?
- Identifica cuáles son los puntos de conexión que son los principales cuellos de botella para `service:api` entre las 10:00 y las 10:30.

### `get_change_stories` {#get-change-stories}
*Conjunto de herramientas: **apm***\
Recupera historias de cambios de la API de Seguimiento de Cambios para servicios APM. Utiliza esto para identificar qué cambió (despliegues, banderas de características, actualizaciones de configuración y eventos de infraestructura) durante un rango de tiempo y correlacionar cambios con problemas de rendimiento o incidentes.

- Muéstrame los despliegues y cambios recientes para el servicio de pagos.
- ¿Qué cambios de infraestructura ocurrieron alrededor del momento de este pico de latencia?
- Encuentra cambios en banderas de características y configuraciones para el servicio de checkout en la última hora.

### `semantic_search_change_stories` {#semantic-search-change-stories}
*Conjunto de herramientas: **apm***\
Busca historias de cambios utilizando lenguaje natural y búsqueda semántica impulsada por IA. Utilice esto para encontrar cambios en banderas de características o despliegues relacionados con un comportamiento, un problema reportado por un usuario, o una parte del producto que está investigando.

- ¿Qué cambió recientemente que podría afectar la carga del tablero para usuarios en prueba?
- ¿Qué banderas podrían impactar la autenticación en la página de configuración de facturación?
- Encuentra cambios relacionados con datos de telemetría faltantes en la última semana.

### `apm_search_recommendations` {#apm-search-recommendations}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Busca recomendaciones de APM de Datadog.

- Muéstrame recomendaciones de APM para mis servicios.
- ¿Hay alguna sugerencia de optimización para mi aplicación?

### `apm_get_recommendation` {#apm-get-recommendation}
*Conjunto de herramientas: **apm***\
*Permisos requeridos: `APM Read`*\
Recupera detalles completos de una recomendación específica de APM por ID.

- Obtén los detalles de la recomendación `abc123`.

## Casos {#cases}

Herramientas para [Case Management][38], incluyendo la creación, búsqueda y actualización de casos; gestión de proyectos; y vinculación de problemas de Jira.

### `search_datadog_cases` {#search-datadog-cases}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Read`*\
Busca casos de [Case Management][38] con filtros que incluyen estado, prioridad, proyecto y asignado. Soporta filtrado por rango de tiempo y paginación.

- Muéstrame todos los casos abiertos asignados a mí.
- ¿Hay algún caso P1 abierto en el proyecto Security Reviews?
- Muéstrame todos los casos abiertos esta semana relacionados con el servicio de pago.

### `get_datadog_case` {#get-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Read`*\
Recupera información detallada sobre un caso específico por ID o clave, incluyendo título, estado, prioridad, asignado y marcas de tiempo. Opcionalmente incluye actividad de la línea de tiempo (comentarios y cambios de estado) y atributos personalizados.

- ¿Cuál es la última actualización sobre CASE-1234? Muéstrame la línea de tiempo completa.
- ¿Quién está trabajando en este caso y qué progreso se ha hecho hasta ahora?
- Muestra los detalles y todos los comentarios para el caso de migración de base de datos.

### `create_datadog_case` {#create-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Write`*\
Crea un nuevo caso de [Case Management][38] con un título, proyecto y campos opcionales como descripción, prioridad y asignado.

- Estoy viendo un aumento de latencia en el servicio de checkout. Crea un caso P2 para rastrear la investigación.
- Abre un caso de Security Review para la actividad de inicio de sesión sospechosa que encontramos en los registros.

### `update_datadog_case` {#update-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Write`*\
Actualiza los campos de un caso existente, como estado, prioridad, título, descripción, asignado, fecha de vencimiento y atributos personalizados. Solo se actualizan los campos que proporciones.

- Este problema ahora afecta al cliente. Escala el caso CASE-1234 a P1.
- Marca el caso de migración de base de datos como resuelto.
- Establece una fecha de vencimiento para el final de la semana en el caso CASE-1234.

### `add_comment_to_datadog_case` {#add-comment-to-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Write`*\
Agrega un comentario a la línea de tiempo de un caso. Los comentarios admiten formato markdown.

- Agrega una nota al caso resumiendo lo que encontramos en los registros y trazas.
- Publica una actualización de que el hotfix ha sido implementado y estamos haciendo seguimiento.
- Documenta los hallazgos del análisis de la causa raíz en este caso.

### `link_jira_issue_to_datadog_case` {#link-jira-issue-to-datadog-case}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Write`*

- Vincula el ticket de Jira para la migración de infraestructura a este caso para que podamos rastrear ambos juntos.
- Conecta PROJ-456 al caso de Datadog para que el equipo de ingeniería tenga visibilidad.

### `list_datadog_case_projects` {#list-datadog-case-projects}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Read`*\
Lista los proyectos disponibles de [Case Management][38] con filtrado opcional por nombre o clave.

- ¿Qué proyectos están disponibles en Case Management?
- ¿Hay un proyecto relacionado con la seguridad en Case Management?

### `get_datadog_case_project` {#get-datadog-case-project}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `Cases Read`*\
Recupera detalles de un proyecto de Case Management específico por ID.

- ¿De qué proyecto forma parte este caso?

### `search_datadog_users` {#search-datadog-users}
*Conjunto de herramientas: **casos***\
*Permisos requeridos: `User Access Read`*\
Busca usuarios de Datadog por correo electrónico, nombre o identificador. Útil para encontrar a la persona adecuada a la que asignar un caso.

- Encuentra la cuenta de usuario de Datadog para jane.doe@example.com.

## Ejecución de código {#code-execution}

Una única herramienta que ejecuta TypeScript escrito por agentes en un entorno controlado por Datadog con acceso directo a las APIs de Datadog, para investigaciones de múltiples señales y exploración de datos ad-hoc en una sola llamada.

<div class="alert alert-info">El <code>code-exec</code> El conjunto de herramientas está en vista previa. <a href="https://www.datadoghq.com/product-preview/mcp-codexec/">Regístrese</a> para la vista previa o contacte a <a href="/help">Datadog support</a> para solicitar acceso.</div>

El código ejecutado por este conjunto de herramientas se ejecuta contra sus APIs de Datadog utilizando su propia identidad de usuario. El entorno aplica sus [permisos de rol existentes][56] a cada llamada a la API, por lo que un agente solo puede leer o modificar datos a los que ya puede acceder en Datadog.

### `execute_code` {#execute-code}
*Conjunto de herramientas: **ejecución-de-código***\
*Permisos requeridos: Cualquier permiso de rol específico del producto necesario para acceder a los recursos subyacentes de Datadog con los que interactúa el código ejecutado (por ejemplo, `Logs Read` para leer registros).*\
Ejecuta TypeScript escrito por agentes de IA en un sandbox gestionado por Datadog. El código recibe un `dd.*` espacio de nombres con herramientas para consultar registros, métricas, trazas, servicios, eventos de cambio, incidentes, monitores, Dashboards y otras APIs de Datadog, y devuelve un valor estructurado al agente. Esto puede reducir la cantidad de viajes de ida y vuelta necesarios para investigaciones de múltiples señales y exploración de datos ad-hoc.

- Para el `checkout-api` servicio en las últimas dos horas, extraiga registros de errores, métricas de latencia y despliegues recientes y indíqueme qué despliegue coincide con el pico de errores.
- Compare los conteos de tramos de error, alertas de Monitors y cambios de configuración para el `payments` servicio durante el último día, e identifique cualquier elemento que se haya movido al mismo tiempo.
- Para `auth-service`, correlacione los principales patrones de error en los registros con las métricas de CPU y memoria de la última hora para determinar si los errores se deben a la presión de recursos.

## Dashboards {#dashboards}

Herramientas para recuperar, crear, actualizar y eliminar [dashboards][46], además de referencia y validación del esquema de widgets.

### `get_datadog_dashboard` {#get-datadog-dashboard}
*Conjunto de herramientas: **core**, **Dashboards***\
*Permisos requeridos: `Dashboards Read` y `User Access Read`*\
Recupera un [dashboard][46] de Datadog por ID, devolviendo su título, descripción, etiquetas y widgets. Utilice `search_datadog_dashboards` primero para encontrar los IDs de los Dashboards.

- Obtenga los detalles completos del Dashboard `ps7-mn3-kwf`.
- Muéstreme los widgets y el diseño del Dashboard de visión general de infraestructura.
- Recupere las variables de plantilla configuradas en este Dashboard.

### `upsert_datadog_dashboard` {#upsert-datadog-dashboard}
*Conjunto de herramientas: **core**, **Dashboards***\
*Permisos requeridos: `Dashboards Read` y `Dashboards Write`*\
Crea o actualiza un [dashboard][46] de Datadog. Para actualizar un Dashboard existente, proporcione el ID del Dashboard; omítalo para crear uno nuevo. Llame a `get_widget_reference` para los esquemas de widgets antes de construir widgets.

- Cree un Dashboard que muestre el uso de CPU y memoria en todos los hosts.
- Agregue un widget de series temporales para la tasa de errores al Dashboard `abc-123-def`.
- Actualice el título y la descripción de mi Dashboard de visión general de servicio.

### `delete_datadog_dashboard` {#delete-datadog-dashboard}
*Conjunto de herramientas: **Dashboards***\
*Permisos requeridos: `Dashboards Read` y `Dashboards Write`*\
Elimine permanentemente un [dashboard][46] de Datadog por ID. Esta acción no se puede deshacer. Utilice `search_datadog_dashboards` primero para encontrar los IDs de los Dashboards.

- Elimine el Dashboard `ps7-mn3-kwf`.
- Elimine el antiguo Dashboard del entorno de staging.

### `get_widget_reference` {#get-widget-reference}
*Conjunto de herramientas: **Dashboards***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read`*\
Devuelve esquemas e instrucciones de construcción para los tipos de widgets de Dashboard. Las definiciones de widgets son objetos JSON; esta herramienta devuelve definiciones de tipo TypeScript que representan sus esquemas junto con instrucciones de construcción que cubren patrones de consulta, sintaxis de fórmulas y errores comunes. Llame a esto antes de generar widgets con `upsert_datadog_dashboard`.

- Obtenga el esquema para un widget de series temporales.
- Muéstreme cómo construir un widget de lista de los mejores y un widget de tabla de consulta.
- ¿Cuál es el esquema para el widget de diagrama de dispersión?

### `validate_dashboard_widget` {#validate-dashboard-widget}
*Conjunto de herramientas: **tableros***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read`*\
Valida una definición de widget contra el esquema del tablero. Utiliza esto para verificar el JSON del widget antes de pasarlo a `upsert_datadog_dashboard`.

- Valida mi definición de widget de series temporales antes de crear el tablero.
- Verifica si el JSON de este widget de tabla de consulta es correcto.

### `ask_widget_expert` {#ask-widget-expert}
*Conjunto de herramientas: **tableros***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read`*\
Hazle una pregunta a un experto en widgets de Datadog sobre la configuración de widgets, esquemas, sintaxis de consultas, uso de campos, depuración o problemas comunes. Mejor para preguntas específicas: búsquedas de esquemas, aclaraciones de campos, depuración de una definición de widget existente o comprensión de cómo funciona un tipo específico de widget.

- ¿Qué formato de respuesta debo usar para una lista de los mejores?
- ¿Cuál es el esquema para el widget de diagrama de dispersión?
- Ayúdeme a depurar por qué este widget muestra valores fraccionarios cuando debería ser un conteo.
- ¿Cómo se configura una serie temporal para mostrar tanto barras como líneas?

## DBM {#database-monitoring}

Herramientas para interactuar con [DBM][26].

### `find_datadog_database_instances` {#find-datadog-database-instances}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Descubre y clasifica instancias de base de datos para la investigación de DBM. Llama a esto antes de otras herramientas de DBM que requieran un parámetro `database_instance`. Acepta un ID de traza o un ID de tramo de APM, etiquetas, o ambos para encontrar instancias coincidentes, luego evalúa y clasifica su salud.

- Encuentre instancias de base de datos correlacionadas con la traza `abc123` de hace una hora.
- ¿Qué instancias de PostgreSQL coinciden con `cluster_name:payments-prod`?
- Clasifique instancias de base de datos para el servicio `checkout-api` según su salud.

### `get_datadog_database_calling_services` {#get-datadog-database-calling-services}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Identifica los servicios y recursos de APM ascendentes que realizan consultas a la base de datos. Correlaciona la actividad de la base de datos con las trazas de la aplicación para el análisis de causa raíz a través de la frontera entre APM y la base de datos.

- ¿Qué servicios están llamando a las consultas más lentas en `db-prod-1`?
- Encuentre al principal llamador de la firma de consulta `abc123def`.
- Muéstreme los recursos de APM que generan carga en la base de datos de pagos.

### `get_datadog_database_explain_plans` {#get-datadog-database-explain-plans}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera planes de explicación de PostgreSQL para una firma de consulta dentro de un marco de tiempo. Devuelve estructuras de plan simplificadas con árboles de operadores, uso de índices y costos estimados, ordenados por costo.

- Obtenga planes de explicación para la firma de consulta `abc123def` en `db-prod-1`.
- Muéstreme los planes de ejecución más costosos para esta consulta lenta.
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
Analiza el rendimiento de una consulta específica de PostgreSQL. Devuelve el rendimiento, la latencia promedio, el tiempo de ejecución, las filas por ejecución, la tasa de aciertos en caché, las estadísticas de I/O, la actividad de conexión, los eventos de espera y la duración de la transacción, con estadísticas generales y análisis por intervalos de tiempo.

- Analiza el rendimiento de la firma de consulta `abc123def` durante la última hora.
- ¿Por qué es lenta esta consulta en la instancia de PostgreSQL de producción?
- Muestra los eventos de espera y la tasa de aciertos en caché para la firma de consulta `xyz789`.

### `get_datadog_database_query_statement` {#get-datadog-database-query-statement}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera el texto de la declaración SQL para una firma de consulta dada. Utilice esto para mapear los hashes de firma de vuelta al SQL concreto para investigación e informes.

- Obtenga el SQL para la firma de consulta `abc123def`.
- Muéstrame la declaración detrás de este hash de consulta en `db-prod-1`.
- ¿A qué consulta corresponde la firma `xyz789`?

### `get_datadog_database_recommendations` {#get-datadog-database-recommendations}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera recomendaciones de base de datos en vivo para una base de datos, consulta, tabla, host o índice. Devuelve las recomendaciones coincidentes con estado, severidad y un bloque de contexto normalizado que resalta instancias afectadas, firmas de consulta, tablas, índices, servicios, planes e identificadores de infraestructura.

- Muestre las recomendaciones de base de datos abiertas para `db-prod-1`.
- Enumere las recomendaciones de índice faltantes en la base de datos de pagos.
- Obtenga recomendaciones de alta severidad para la firma de consulta `abc123def`.

### `get_datadog_database_schemas` {#get-datadog-database-schemas}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Recupera definiciones de esquema (columnas, índices, claves foráneas, particiones) para uno o más objetos de base de datos. Acepta nombres de tabla con calificadores opcionales de esquema, base de datos e instancia.

- Muéstrame el esquema de la tabla `orders`.
- Obtenga columnas e índices para `public.users` en `db-prod-1`.
- Obtenga claves foráneas para la `payments` tabla.

### `optimize_datadog_database_query` {#optimize-datadog-database-query}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Analiza una consulta de PostgreSQL en busca de oportunidades de optimización utilizando reglas determinísticas. Devuelve reescrituras de consultas, detección de anti-patrones (`SELECT *`, `OFFSET` sin `ORDER BY`, `ORDER BY` sin `LIMIT`), sugerencias de índices faltantes y análisis del impacto de inactividad en transacciones. Acepta texto SQL o una firma de consulta.

- Optimice la firma de consulta `abc123def` en la base de datos de pagos.
- Verifique este SQL en busca de índices faltantes y anti-patrones.
- Sugiera reescrituras para la consulta más lenta en `db-prod-1`.

### `search_datadog_database_plans` {#search-datadog-database-plans}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Busca planes de ejecución de consultas [Monitoreo de Base de Datos][26], que muestran cómo el motor de base de datos ejecuta consultas, incluyendo el uso de índices, estrategias de unión y estimaciones de costos. Utilice esto para analizar el rendimiento de las consultas e identificar oportunidades de optimización.

- Muéstreme los planes de ejecución para consultas lentas en `host:db-prod-1` de la última hora.
- Encuentre planes de consulta con `@db.plan.type:explain_analyze` para la base de datos de producción.
- Obtenga planes de ejecución para consultas por `@db.user:app_user` con una duración mayor a 1 segundo.

### `search_datadog_database_samples` {#search-datadog-database-samples}
*Conjunto de herramientas: **dbm***\
*Permisos requeridos: `Database Monitoring Read`*\
Busca [Monitoreo de Base de Datos][26] muestras de consultas, que representan ejecuciones individuales de consultas con métricas de rendimiento. Utilice esto para analizar patrones de actividad en la base de datos, identificar consultas lentas e investigar problemas de rendimiento de la base de datos.

- Muéstreme muestras de consultas con `@duration:>1000000000` (duración mayor a 1 segundo) de `db:mydb`.
- Encuentre consultas lentas en `host:db-prod-1` filtradas por `@db.user:app_user`.
- Obtenga muestras recientes de consultas para `@db.query_signature:abc123def` y analice patrones de rendimiento.

## DDSQL {#ddsql}

Herramientas para consultar datos de Datadog usando [DDSQL][41], un dialecto SQL con soporte para recursos de infraestructura, registros, métricas, RUM, spans y otras fuentes de datos de Datadog.

### `ddsql_get_spec` {#ddsql-get-spec}
*Conjunto de herramientas: **ddsql***\
Obtiene una especificación compacta de capacidades de DDSQL, incluyendo funciones SQL soportadas, palabras clave SQL y diferencias específicas de DDSQL con respecto a PostgreSQL estándar. Llame a esta herramienta antes de componer consultas para entender la sintaxis soportada.

- ¿Qué funciones SQL son soportadas en DDSQL?
- Muéstreme las reglas de sintaxis de consultas de DDSQL y las diferencias con PostgreSQL.
- ¿Qué funciones de agregación puedo usar en DDSQL?

### `ddsql_schema_search_tables` {#ddsql-schema-search-tables}
*Conjunto de herramientas: **ddsql***\
Busca conjuntos de datos de DDSQL y devuelve tablas (fuentes de datos públicas y tablas de referencia) y métricas disponibles.

- ¿Qué tablas están disponibles para consultar en DDSQL?
- Busque tablas de DDSQL relacionadas con Kubernetes.
- Muéstreme las métricas disponibles que puedo consultar con DDSQL.

### `ddsql_schema_get_table_columns` {#ddsql-schema-get-table-columns}
*Conjunto de herramientas: **ddsql***\
Obtiene columnas SQL estáticas para una tabla de DDSQL a partir de los metadatos del esquema.

- ¿Qué columnas están disponibles en la tabla `aws.ec2_instance`?
- Muéstreme el esquema de la tabla `k8s.pods`.

### `ddsql_schema_search_unstructured_fields` {#ddsql-schema-search-unstructured-fields}
*Conjunto de herramientas: **ddsql***\
Busque y clasifique campos para fuentes no estructuradas de DDSQL, como registros, RUM y spans, ordenados por frecuencia. Utilice esta herramienta para el descubrimiento de esquemas en fuentes buscables antes de recurrir a `ddsql_schema_get_table_columns`.

- ¿Qué campos están disponibles en los registros de DDSQL?
- Encuentre campos relacionados con `service` en mis datos de RUM.
- Muéstreme los campos más comunes en mis datos de span.

### `ddsql_run_query` {#ddsql-run-query}
*Conjunto de herramientas: **ddsql***\
Ejecuta una consulta DDSQL y devuelve los resultados. Soporta el uso de sintaxis SQL para consultar recursos de infraestructura, registros, métricas, RUM, spans y otras fuentes de datos de Datadog. Consulte el [DDSQL Reference][42] para detalles de sintaxis.

- ¿Cuántas instancias de EC2 están en ejecución en cada región de AWS?
- Muéstreme los 10 principales servicios por conteo de registros de error en la última hora.
- Consulta el uso promedio de CPU agrupado por host en las últimas 24 horas.

### `ddsql_create_link` {#ddsql-create-link}
*Conjunto de herramientas: **ddsql***\
Genera un enlace de interfaz de usuario de Datadog al [Editor de DDSQL][41] con una consulta dada pre-poblada.

- Genere un enlace al [DDSQL Editor] para esta consulta.
- Cree un enlace compartible al [DDSQL Editor] con mi consulta de infraestructura.

## Error Tracking {#error-tracking}

Herramientas para interactuar con Datadog [Error Tracking][49].

### `search_datadog_error_tracking_issues` {#search-datadog-error-tracking-issues}
*Conjunto de herramientas: **Error Tracking***\
*Permisos requeridos: `Error Tracking Read`*\
Busca incidencias de Error Tracking a través de fuentes de datos (RUM, registros, trazas).

- Muéstrame todas las incidencias de Error Tracking en el servicio de pago de las últimas 24 horas.
- ¿Cuáles son los errores más comunes en mi aplicación durante la última semana?
- Encuentra incidencias de Error Tracking en el entorno de producción con `service:api`.

### `get_datadog_error_tracking_issue` {#get-datadog-error-tracking-issue}
*Conjunto de herramientas: **Error Tracking***\
*Permisos requeridos: `Cases Read` y `Error Tracking Read`*\
Recupera información detallada sobre una incidencia específica de Error Tracking de Datadog.

- Ayúdame a resolver la incidencia de Error Tracking `550e8400-e29b-41d4-a716-446655440000`.
- ¿Cuál es el impacto de la incidencia de Error Tracking `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f`?
- Crea un caso de prueba para reproducir la incidencia de Error Tracking `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`.

### `analyze_datadog_error_tracking_errors` {#analyze-datadog-error-tracking-errors}
*Conjunto de herramientas: **seguimiento de errores***\
*Permisos requeridos: `Error Tracking Read` y `Timeseries`*\
Analiza los errores de Error Tracking de Datadog utilizando consultas SQL para conteo, agregaciones y análisis numérico. Opera sobre muestras individuales de errores, no sobre incidencias (grupos de errores).

- Cuenta los errores por servicio en la última hora.
- Muéstrame los principales tipos de errores en el servicio de pago durante la última semana.
- Desglosa los errores por versión para identificar qué despliegue introdujo una incidencia.

### `update_datadog_error_tracking_issue` {#update-datadog-error-tracking-issue}
*Conjunto de herramientas: **seguimiento de errores***\
*Permisos requeridos: `Cases Read`, `Cases Write`, `Error Tracking Read` y `Error Tracking Write`*\
Actualiza el estado o el asignado de una incidencia de Error Tracking en Datadog.

- Marca la incidencia de Error Tracking `550e8400-e29b-41d4-a716-446655440000` como resuelta.
- Asigna la incidencia de Error Tracking `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f` a mí.
- Establece el estado de la incidencia de Error Tracking `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f` como ignorada.

## Feature Flags {#feature-flags}

Herramientas para gestionar [Feature Flags][51], incluyendo la creación, listado y actualización de Feature Flags y sus entornos.

### `list_datadog_feature_flags` {#list-datadog-feature-flags}
*Conjunto de herramientas: **banderas-de-características***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Lista las Feature Flags con soporte de paginación.

- Muéstrame todas las Feature Flags en mi organización.
- Lista las Feature Flags para el servicio de pago.

### `get_datadog_feature_flag` {#get-datadog-feature-flag}
*Conjunto de herramientas: **banderas de características***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Recupera detalles sobre una Feature Flag específica.

- Obtén detalles para la Feature Flag `dark-mode-enabled`.
- ¿Cuáles son las configuraciones actuales para la Feature Flag `new-checkout-flow`?

### `create_datadog_feature_flag` {#create-datadog-feature-flag}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Write`*\
Crea una nueva Feature Flag.

- Crea una Feature Flag llamada `enable-new-dashboard` para un despliegue gradual.
- Configura una nueva Feature Flag booleana para la característica beta.

### `list_datadog_feature_flag_environments` {#list-datadog-feature-flag-environments}
*Conjunto de herramientas: **flags de características***\
*Permisos requeridos: `Feature Flag Environment Read`*\
Lista los entornos configurados para Feature Flags.

- Muéstrame los entornos de Feature Flags disponibles.
- ¿A qué entornos puedo dirigir las Feature Flags?

### `list_datadog_feature_flag_allocations` {#list-datadog-feature-flag-allocations}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Lista las asignaciones para una Feature Flag en un entorno específico.

- Muéstrame las reglas de asignación para el flag `new-checkout-flow` en producción.

### `update_datadog_feature_flag_environment` {#update-datadog-feature-flag-environment}
*Conjunto de herramientas: **Feature Flags***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Write`*\
Actualiza la configuración de un flag de características en un entorno específico.

- Habilita la Feature Flag `dark-mode` en el entorno de pruebas.
- Despliega la Feature Flag `new-checkout-flow` al 50% de los usuarios en producción.

### `check_datadog_flag_implementation` {#check-datadog-flag-implementation}
*Conjunto de herramientas: **flags de características***\
*Permisos requeridos: `Feature Flag Environment Read` y `Feature Flag Read`*\
Verifica si una Feature Flag está implementada en el código.

- Verifica que la Feature Flag `enable-new-dashboard` esté implementada en mi base de código.

### `sync_datadog_feature_flag_allocations` {#sync-datadog-feature-flag-allocations}
*Conjunto de herramientas: **flags de características***\
*Permisos requeridos: `Feature Flag Write`*\
Sincroniza las asignaciones de flags de características para un entorno específico.

- Sincroniza las asignaciones para el flag `new-checkout-flow` en producción.

## Kubernetes {#kubernetes}

Herramientas para buscar y describir recursos de [Kubernetes][55] y recuperar manifiestos en todos los clústeres.

### `search_datadog_k8s_resources` {#search-datadog-k8s-resources}
*Conjunto de herramientas: **Kubernetes***\
*Permisos requeridos: `Hosts Read` y `Teams Read`*\
Busca recursos de [Kubernetes][55] en todos los clústeres. Utiliza esta herramienta en lugar de `kubectl` para determinar el estado de los recursos de Kubernetes, como implementaciones, pods, nodos, etc. Esta herramienta no requiere acceso al clúster local, funciona en todos los clústeres y devuelve datos enriquecidos con etiquetas. Puedes incluir claves de etiqueta específicas en cada resultado e incluir nombres de recursos padres para investigar relaciones entre recursos (por ejemplo, la implementación a la que pertenece un pod).

- Muéstrame todos los pods en el espacio de nombres `production` con estado `CrashLoopBackOff`.
- Encuentra despliegues con rollout en curso en el clúster `general2`.
- Lista todos los nodos en mi clúster ordenados por uso de CPU.
- Agrupa los despliegues por `service` y `env` para ver cómo se distribuyen mis servicios entre los entornos.

### `describe_datadog_k8s_resource` {#describe-datadog-k8s-resource}
*Conjunto de herramientas: **kubernetes***\
*Permisos requeridos: `Hosts Read`*\
Obtiene información detallada sobre un recurso específico de [Kubernetes][55], incluyendo detalles específicos del recurso como solicitudes y límites de CPU y memoria, y opcionalmente etiquetas, anotaciones, historial de manifiestos, recursos padres y un enlace profundo al [Kubernetes Explorer][55]. Utiliza esta herramienta en lugar de `kubectl describe`. Identifica un recurso por su UID de una búsqueda anterior o proporcionando identificadores de recurso (clúster, espacio de nombres y nombre del recurso). Para el manifiesto completo en bruto, utiliza `get_datadog_k8s_manifest`.

- Describe el pod `my-app` en el clúster `prod`, espacio de nombres `default`.
- Obtén detalles para el despliegue `api-server` en el espacio de nombres `default`, clúster `staging`.
- Muéstrame las etiquetas y anotaciones para este recurso de Kubernetes.

### `get_datadog_k8s_manifest` {#get-datadog-k8s-manifest}
*Conjunto de herramientas: **kubernetes***\
*Permisos requeridos: `Hosts Read`*\
Recupera el manifiesto YAML para un recurso específico de [Kubernetes][55]. Utiliza esta herramienta en lugar de `kubectl get -o yaml`. Soporta la extracción de subárboles específicos con una expresión `kubectl` JSONPath y un modo conciso que omite `status` y `managedFields` para reducir el tamaño de la respuesta.

- Obtén el manifiesto para el pod `my-app` en el clúster `prod`, espacio de nombres `default`.
- Muéstrame los puertos de contenedor para el despliegue `api-server` en el espacio de nombres `default`, clúster `staging`.
- Obtén las imágenes de contenedor del manifiesto del pod `my-app`.

## Redes {#networks}

Herramientas para el análisis de [Cloud Network Monitoring][31] y [Network Device Monitoring][32].

### `analyze_cloud_network_monitoring` {#analyze-cloud-network-monitoring}
*Conjunto de herramientas: **redes***\
*Permisos requeridos: `Network Connections Read`*\
Investiga problemas a nivel de red utilizando datos de [Cloud Network Monitoring][31], analizando datos de flujo de red para detectar anomalías como tasas de retransmisión elevadas.

- Analiza el tráfico de red entre mis servidores web y el clúster de bases de datos.
- ¿Existen problemas de retransmisión entre `service:api` y `service:payments`?
- Investiga los datos de flujo de red en busca de anomalías en el entorno de producción.

### `search_ndm_devices` {#search-ndm-devices}
*Conjunto de herramientas: **redes***\
*Permisos requeridos: `NDM Read`*\
Busca dispositivos de red (enrutadores, conmutadores, cortafuegos) monitoreados por Datadog [Network Device Monitoring][32].

- Muéstrame todos los dispositivos de red en el centro de datos `us-east-1`.
- Encuentra cortafuegos que están reportando errores.
- Lista todos los conmutadores monitoreados y sus estados.

### `get_ndm_device` {#get-ndm-device}
*Conjunto de herramientas: **redes***\
*Permisos requeridos: `NDM Read`*\
Recupera información detallada sobre un dispositivo de red específico por su ID de dispositivo.

- Obtén detalles del dispositivo de red `device:abc123`.
- Muéstrame la configuración y el estado de este enrutador.

### `search_ndm_interfaces` {#search-ndm-interfaces}
*Conjunto de herramientas: **redes***\
*Permisos requeridos: `NDM Read`*\
Recupera todas las interfaces de red para un dispositivo específico.

- Muéstrame todas las interfaces en el dispositivo `device:abc123`.
- Lista los estados de las interfaces de mi enrutador principal.

## Integración {#onboarding}

Herramientas de incorporación para la configuración y puesta en marcha guiada de Datadog.

### `browser_onboarding` {#browser-onboarding}
*Conjunto de herramientas: **integración***\
*Permisos requeridos: `RUM Apps Read`*\
Te guía a través de la incorporación de Browser RUM a Datadog.

- Ayúdame a configurar la monitorización de Browser RUM para mi aplicación web.

### `devices_onboarding` {#devices-onboarding}
*Conjunto de herramientas: **incorporación***\
*Permisos requeridos: `RUM Apps Read`*\
Te guía a través de la incorporación de dispositivos a la monitorización de Datadog.

- Ayúdame a configurar la monitorización de dispositivos en Datadog.

### `kubernetes_onboarding` {#kubernetes-onboarding}
*Conjunto de herramientas: **integración***\
*Permisos requeridos: Ninguno*\
Te guía a través de la incorporación de clústeres de Kubernetes a Datadog.

- Ayúdame a configurar la monitorización de Datadog para mi clúster de Kubernetes.

### `llm_observability_onboarding` {#llm-observability-onboarding}
*Conjunto de herramientas: **incorporación***\
Te guía a través de la incorporación de la Observabilidad del Agente en Datadog.

- Ayúdame a configurar la Observabilidad del Agente para mi aplicación de IA.

### `test_optimization_onboarding` {#test-optimization-onboarding}
*Conjunto de herramientas: **incorporación***\
*Permisos requeridos: Ninguno*\
Te guía a través de la incorporación de la Optimización de Pruebas en Datadog.

- Ayúdame a configurar la Optimización de Pruebas para mi pipeline de CI.

### `serverless_onboarding` {#serverless-onboarding}
*Conjunto de herramientas: **incorporación***\
*Permisos requeridos: Ninguno*\
Te guía a través de la incorporación de aplicaciones sin servidor a Datadog, incluyendo funciones de AWS Lambda y servicios de GCP Cloud Run y funciones de Cloud Run (Gen 2).

- Ayúdame a monitorear mis funciones de AWS Lambda con Datadog.
- Ayúdame a monitorear mis servicios de GCP Cloud Run con Datadog.
- Ayúdame a monitorear mis funciones de GCP Cloud Run con Datadog.

### `source_map_uploads` {#source-map-uploads}
*Conjunto de herramientas: **incorporación***\
Te guía a través de la carga de mapas del código fuente para el mapeo de errores de RUM.

- Ayúdame a cargar mapas del código fuente para que mis errores de RUM muestren el código fuente original.

## Perfilado {#profiling}
Herramientas de solo lectura para descubrir, explorar y analizar datos de [Continuous Profiler][62] a través de servicios, entornos de ejecución y trazas.

### `get_profiling_profile_types` {#get-profiling-profile-types}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve los tipos de perfil y familias disponibles para un contexto de consulta determinado (cadena de consulta y rango de tiempo) o para un contexto de traza o tramo. Utiliza esto primero para descubrir qué es consultable.

- Muéstrame qué tipos de perfil están disponibles para `service:checkout-api` en la última hora.
- ¿Qué familias de perfil están disponibles para la traza `7d5d747be160e280504c099d984bcfe0`?
- Lista los tipos de perfil disponibles en mi entorno de producción.

### `get_profiling_services` {#get-profiling-services}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Lista los servicios perfilados y sus familias de perfil en contexto. Los resultados no están ordenados y no implican importancia o nivel de actividad.

- Lista todos los servicios con perfilado habilitado en producción.
- Muéstrame qué servicios tienen datos de perfilado de JVM.
- ¿Qué servicios están perfilados en el entorno del equipo de pagos?

### `get_profiling_runtime_ids` {#get-profiling-runtime-ids}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve los identificadores de tiempo de ejecución perfilados individuales (procesos o contenedores) en contexto. Por defecto, se establece en el top-1 por CPU; el parámetro de límite controla cuántos.

- Muéstrame los 10 principales identificadores de tiempo de ejecución por CPU para `service:checkout-api`.
- Obtén el tiempo de ejecución con mayor CPU para mi servicio de Go.
- Lista los identificadores de tiempo de ejecución perfilados para el servicio de pagos en la última hora.

### `get_profiling_service_insights` {#get-profiling-service-insights}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve información de servicio precomputada, incluyendo un resumen de alto nivel, señales contextuales (métodos afectados, paquetes, procesos) y pasos recomendados a seguir.

- Muéstrame las percepciones de perfilado para `service:checkout-api`.
- ¿Qué problemas de rendimiento están señalados en el servicio de pagos?
- Obtén recomendaciones de perfilado para mi servicio de Java.

### `explore_profiling_flame_graph` {#explore-profiling-flame-graph}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve las trazas de pila top-N por contribución de valor para un tipo de perfil determinado. Soporta filtrado por marco, punto de conexión o expresión regular de atributo. Servicio único. Acepta ya sea `service:family` o un traceContext.

- Muéstrame el gráfico de llamas de la CPU para `service:checkout-api` en la última hora.
- Encuentra los principales puntos críticos de asignación para el servicio de pagos.
- Explora el gráfico de llamas para la traza `7d5d747be160e280504c099d984bcfe0`.

### `explore_profiling_call_graph` {#explore-profiling-call-graph}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve una vista del gráfico de llamadas (bordes de llamador a llamado) de funciones críticas para un tipo de perfil dado. Por defecto, muestra los 20 nodos principales, un corte del 5% y 5 bordes por nodo. Servicio único.

- Muéstrame el gráfico de llamadas para funciones críticas de CPU en `service:checkout-api`.
- ¿Qué funciones llaman a los caminos más lentos en mi servicio de Go?
- Obtén el gráfico de llamadas de asignación para el servicio de pagos.

### `explore_profiling_timeline` {#explore-profiling-timeline}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve una línea de tiempo de grupos de carriles (hilos, recolección de basura, etc.) con actividad de CPU y E/S. Soporta un modo de camino crítico (solo Go; requiere traceContext) para identificar cuellos de botella de latencia dentro de un tramo.

- Muéstrame la línea de tiempo de hilos para `service:checkout-api` en los últimos 15 minutos.
- Encuentra la ruta crítica para la traza `abc123` en mi servicio de Go.
- Explora la recolección de basura y la actividad de la CPU alrededor del pico de latencia.

### `get_profiling_timeseries` {#get-profiling-timeseries}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve datos de perfilado agregados como series temporales (métricas de tasa). Mejor para tendencias, comparación entre servicios y detección de regresiones. Soporta groupBy en campos de marco, contextos y etiquetas.

- Muéstrame las series temporales del perfil de CPU para `service:checkout-api` en las últimas 24 horas.
- Compara las tasas de asignación entre mis servicios de Java agrupados por versión.
- Detecta regresiones de perfil en la última semana agrupadas por despliegue.

### `get_profiling_tag_names` {#get-profiling-tag-names}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Descubre los nombres de etiquetas disponibles (como servicio, host, env, versión, familia, runtime-id, kube_*) para filtrar datos de perfilado. Devuelve hasta 50 resultados, ordenados por relevancia.

- ¿Qué nombres de etiquetas están disponibles para filtrar datos de perfilado en producción?
- Lista los nombres de etiquetas de perfilado para `service:checkout-api`.

### `get_profiling_tag_values` {#get-profiling-tag-values}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve valores para una etiqueta de perfilado específica (por ejemplo, todos los valores de la etiqueta de servicio). Devuelve hasta 50 resultados, ordenados por frecuencia.

- ¿Qué versiones del servicio de pagos tenemos datos de perfilado en la última hora?
- ¿Cuáles son los dos centros de datos con más datos de perfilado disponibles para `service:checkout-api`?

### `get_profiling_fields` {#get-profiling-fields}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Descubre campos de facetas de marco y contexto (como `@stack.function` y `@labels.trace_endpoint`) utilizables en `get_profiling_timeseries` parámetros groupBy y filter. Limitado por sampleType.

- ¿Qué campos de marco puedo agrupar para perfiles de CPU?
- Muéstrame los campos de facetas disponibles para perfiles de asignación.
- Lista los campos de contexto por los que puedo filtrar series temporales para `service:checkout-api`.

### `get_profiling_field_values` {#get-profiling-field-values}
*Conjunto de herramientas: **perfilado***\
*Permisos requeridos: `Continuous Profiler Read`*\
Devuelve valores para un marco específico o campo de contexto descubierto con `get_profiling_fields`. Ordenado por frecuencia.

- Muéstrame los valores principales para `@stack.function` en mis perfiles de CPU.
- Obtén los valores principales de los puntos de conexión de `@labels.trace_endpoint`.
- Lista los valores para el campo de paquete en los perfiles de asignación.

## Tablas de referencia {#reference-tables}

Herramientas para gestionar [tablas de referencia][45], incluyendo listar tablas, leer filas, agregar filas y crear tablas desde el almacenamiento en la nube.

### `list_reference_tables` {#list-reference-tables}
*Conjunto de herramientas: **tablas de referencia***\
Lista y busca [tablas de referencia][45] en la organización, con filtrado opcional por nombre y ordenamiento.

- Lista todas las tablas de referencia en mi organización.
- Encuentra tablas de referencia con `customer` en el nombre.
- Muéstrame las tablas de referencia ordenadas por la última fecha de actualización.

### `get_reference_table_rows` {#get-reference-table-rows}
*Conjunto de herramientas: **tablas de referencia***\
Recupera filas específicas de una tabla de referencia por sus valores de clave primaria. Usa `list_reference_tables` primero para encontrar el ID de la tabla y el esquema.

- Obtén las filas con las claves primarias `user001` y `user002` de la tabla de referencia de usuarios.
- Busca la entrada para el ID de cuenta `acct-123` en la tabla de cuentas.

### `append_reference_table_rows` {#append-reference-table-rows}
*Conjunto de herramientas: **tablas de referencia***\
Agrega nuevas filas a una tabla de referencia existente. Esta operación solo agrega filas y no modifica ni elimina datos existentes. Cada fila debe incluir todos los campos requeridos del esquema de la tabla, incluyendo el campo de clave primaria.

- Agrega una nueva fila para el usuario `user003` con nombre `Carol` y edad `28` a la tabla de usuarios.
- Agrega estas cinco nuevas entradas de cuenta a la tabla de referencia de cuentas.

### `create_reference_table` {#create-reference-table}
*Conjunto de herramientas: **tablas de referencia***\
Crea una nueva tabla de referencia respaldada por un archivo CSV en Amazon S3, Google Cloud Storage o Azure Blob Storage. Solo se admiten los tipos de campo `INT32` y `STRING`.

- Crea una tabla de referencia llamada `ip_allowlist` desde el archivo `allowlist.csv` en mi bucket S3 `my-data-bucket`.
- Configura una nueva tabla de referencia respaldada por GCS llamada `customer_tiers` con sincronización automática habilitada.

## Acciones Remotas {#remote-actions}

<div class="alert alert-info">El <code>remote-actions</code> el conjunto de herramientas está en vista previa. <a href="https://www.datadoghq.com/product-preview/datadog-agent-mcp/">Regístrese para obtener acceso.</a></div>

Herramientas para ejecutar diagnósticos de solo lectura en hosts instrumentados con el Agente de Datadog. Los comandos llegan al host a través del Ejecutador de Acción Privada (PAR) utilizando un [intérprete de shell restringido][63]. Todos los comandos se ejecutan como funciones seguras de Go sin acceso de escritura, sin ejecución de binarios externos y sin salida de red. La lista de comandos permitidos se controla por versión del Agente desde el backend de Datadog.

### `datadog_remote_action_restricted_shell_run_command` {#datadog-remote-action-restricted-shell-run-command}
*Conjunto de herramientas: **acciones remotas***\
*Permisos requeridos: `Connections Resolve` y `Private Action Runner Contribute`*\
Ejecuta un comando de shell de solo lectura en un host especificado. Los comandos soportados incluyen: `cat`, `ls`, `head`, `tail`, `find`, `grep`, `sed`, `cut`, `sort`, `uniq`, `wc`, `ping`, `ss` y `ip`. Soporta tuberías, bucles, condicionales, asignación de variables y globbing.

- Muéstrame las últimas 100 líneas del registro del Agente de Datadog en el host `prod-web-01`.
- Encuentra todas las entradas de ERROR en `/var/log/app/` en el host `db-replica-3` de la última hora.
- Obtén el contenido de `/etc/datadog-agent/datadog.yaml` en el host `prod-worker-07`.

## RUM {#rum}

Herramientas para [Real User Monitoring][58], incluyendo la resolución de aplicaciones, el resumen del rendimiento, la presentación de información agregada para vistas, la exploración de métricas y la inspección de la configuración de la aplicación.

<div class="alert alert-info">El <code>rum</code> el conjunto de herramientas está en Vista Previa. Contacte a <a href="/help">soporte de Datadog</a> para solicitar acceso.</div>

### `search_rum_applications` {#search-rum-applications}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Apps Read`*\
Lista sus aplicaciones RUM y resuelve el `application_id` a utilizar para las llamadas posteriores a la herramienta RUM.

- Encuentre la aplicación RUM llamada "checkout-web" y devuelva su ID de aplicación.
- Liste todas sus aplicaciones RUM.

### `get_rum_summary` {#get-rum-summary}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Apps Read` y `Timeseries`*\
Devuelve un resumen de métricas vitales para una aplicación RUM, con diferencias de período a período.

- Resuma el rendimiento de la aplicación RUM "checkout-web" durante las últimas 24 horas.
- ¿Cómo cambiaron los Core Web Vitals en su aplicación RUM principal de semana a semana?

### `get_rum_insight` {#get-rum-insight}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Apps Read`*\
Devuelve información agregada para Vistas RUM: cascada, tareas largas, distribuciones vitales y análisis de etiquetas.

- Para la vista `/checkout` en la aplicación "shop", muéstreme la cascada de recursos agregada durante la última hora.
- Desglose la distribución de INP por tipo de dispositivo para la página de inicio.

### `search_rum_metrics` {#search-rum-metrics}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Apps Read`*\
Explora las métricas de RUM para una aplicación, incluyendo métricas predeterminadas y métricas personalizadas.

- Liste las métricas personalizadas de RUM definidas en la aplicación "checkout-web".
- Muéstreme las métricas de RUM disponibles relacionadas con el tiempo de carga de página en mi aplicación principal.

### `search_rum_retention_filters` {#search-rum-retention-filters}
*Conjunto de herramientas: **RUM***\
*Permisos requeridos: `RUM Retention Filters Read`*\
Liste los filtros de retención configurados en una aplicación de RUM. Solo lectura; disponible para clientes de [RUM without Limits][59].

- Liste los filtros de retención configurados en la aplicación "checkout-web".
- ¿Qué filtros de retención tengo en mi aplicación principal de RUM?

## Seguridad {#security}

Herramientas para escaneo de seguridad de código, analizando, buscando y clasificando [señales de seguridad][53], gestionando [reglas de detección][60] y [supresiones][61], y analizando [hallazgos de seguridad][54].

### `datadog_secrets_scan` {#datadog-secrets-scan}
*Conjunto de herramientas: **seguridad***\
Escanea el código en busca de secretos y credenciales codificados, detectando claves de AWS, claves de API, contraseñas, tokens, claves privadas y credenciales de base de datos.

- Escanee mi código en busca de secretos codificados.
- Verifique si hay claves de API o contraseñas incluidas en este archivo.

### `get_datadog_security_signals_schema` {#get-datadog-security-signals-schema}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Devuelve los campos disponibles y sus tipos para señales de seguridad. Los tipos de señales se mapean a `@workflow.rule.type` valores como `Log Detection`, `Application Security` y `Workload Security`.

- ¿Qué campos puedo usar para filtrar señales de seguridad?
- Muéstreme los campos disponibles para señales de Cloud SIEM.
- ¿Qué valores de enumeración son válidos para el campo de tipo de regla de señal?

### `search_datadog_security_signals` {#search-datadog-security-signals}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Busque y recupere señales de seguridad de Datadog Security Monitoring, incluyendo señales de Cloud SIEM, señales de App & API Protection y señales de Workload Protection.

- Muéstreme señales de seguridad de las últimas 24 horas.
- Encuentre señales de seguridad de alta severidad relacionadas con mi entorno de producción.
- Liste señales de Cloud SIEM activadas por intentos de inicio de sesión sospechosos.

### `analyze_datadog_security_signals` {#analyze-datadog-security-signals}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read` y `Timeseries`*\
Analiza señales de seguridad utilizando consultas SQL para agregaciones, agrupaciones y análisis de tendencias. Utilícelo para conteos, top-N y desgloses a lo largo del tiempo. Para listar o recuperar señales específicas, utilice `search_datadog_security_signals` o `get_datadog_security_signal`.

- Muéstreme las 10 principales reglas de SIEM por conteo de señales en los últimos 7 días.
- Cuente señales de seguridad altas y críticas agrupadas por severidad.
- ¿Cuántas señales de App & API Protection se activaron por servicio ayer?

### `get_datadog_security_signal` {#get-datadog-security-signal}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Read`*\
Recupera los detalles completos de una única señal de seguridad por ID, incluyendo atributos, información de reglas, estado de triage, etiquetas y correlaciones de incidencias.

- Obtenga los detalles completos de la señal de seguridad `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`.
- Muéstreme la regla, el estado de triage y las incidencias vinculadas para esta señal.

### `update_datadog_security_signals_triage` {#update-datadog-security-signals-triage}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Signals Write`*\
Actualiza el estado de triage o el asignatario de una o más señales de seguridad en bloque (hasta 500 señales). Acepta una lista de IDs de señales o una consulta de filtro que coincida con todas las señales a actualizar.

- Archive todas las señales de la regla "Brute Force Login" en las últimas 24 horas.
- Establezca todas las señales abiertas para `service:checkout` como en revisión y asígnelas a mí.
- Marque la señal `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu` como archivada con la razón "testing".

### `get_datadog_security_detection_rules_schema` {#get-datadog-security-detection-rules-schema}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Rules Read`*\
Devuelve la referencia de autoría y el esquema para las reglas de detección. Cubre los tipos de reglas soportadas, métodos de detección, sintaxis de consulta, convenciones de etiquetas y facetas de búsqueda válidas. Utilícelo antes de autorizar o consultar reglas de detección. Tipos de reglas actualmente soportados: detección de registros, seguridad de API y AppSec.

- ¿Qué campos y opciones están disponibles al crear una regla de detección de umbral?
- Muéstreme el esquema para las reglas de detección de secuencias.
- ¿Qué convenciones de etiquetas y sintaxis de consulta utiliza la API de reglas de detección?

### `list_datadog_security_detection_rules` {#list-datadog-security-detection-rules}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Rules Read`*\
Liste las reglas de detección para la organización. Las reglas de detección definen las condiciones bajo las cuales se generan señales de seguridad. Acepta una consulta de texto libre opcional para filtrar resultados del lado del servidor. Utilícelo (`get_datadog_security_detection_rule`) para obtener la definición completa de una regla específica.

- Liste todas las reglas de detección de Cloud SIEM habilitadas.
- Muéstreme las reglas de detección etiquetadas con `source:cloudtrail`.
- ¿Qué reglas están configuradas para la detección de viajes imposibles?

### `get_datadog_security_detection_rule` {#get-datadog-security-detection-rule}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Rules Read`*\
Recupera la definición completa de una única regla de detección por ID, incluyendo consultas, casos, opciones, filtros y metadatos. Utilícelo (`list_datadog_security_detection_rules`) para encontrar los IDs de las reglas.

- Obtenga la definición completa de la regla de detección `abc-123-def`.
- Muéstreme las consultas y las incidencias para la regla que genera esta señal.
- ¿Qué umbrales y campos de agrupación utiliza esta regla de detección?

### `get_datadog_security_suppressions` {#get-datadog-security-suppressions}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Suppressions Read`*\
Recupera las supresiones de seguimiento de seguridad. Soporta tres modos: listar todas las supresiones, obtener una sola supresión por ID, o obtener supresiones que afectan a una regla de detección específica. Las supresiones evitan que las reglas de detección generen señales para condiciones coincidentes.

- Liste todas las supresiones activas.
- Muéstreme las supresiones para la regla de detección `abc-123-def`.
- Obtenga los detalles completos de la supresión `sup-456-xyz`.

### `create_datadog_security_suppression` {#create-datadog-security-suppression}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Suppressions Write`*\
Crea una nueva regla de supresión que evita que una regla de detección genere señales para condiciones específicas. Al menos uno de `suppression_query` o `data_exclusion_query` debe ser proporcionado.

- Suprima señales de la regla de fuerza bruta para la IP `10.0.0.1`.
- Cree una supresión para la regla de detección de anomalías que ignore el entorno `staging`.
- Suprima señales de la regla `abc-123-def` donde `@usr.email` coincide con nuestras cuentas de prueba.

### `update_datadog_security_suppression` {#update-datadog-security-suppression}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Suppressions Write`*\
Actualiza una regla de supresión existente. Solo cambia los campos proporcionados. Proporcionar `version` habilita el control de concurrencia optimista para evitar sobrescribir ediciones concurrentes.

- Actualice la supresión para la regla de fuerza bruta para también excluir `10.0.0.2`.
- Cambie la fecha de expiración de la supresión `sup-456-xyz` al próximo trimestre.
- Desactive la supresión para la regla de detección de anomalías sin eliminarla.

### `delete_datadog_security_suppression` {#delete-datadog-security-suppression}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Suppressions Write`*\
Elimina una regla de supresión.

- Elimina la supresión `sup-456-xyz`.
- Elimina la supresión que estaba silenciando la regla de detección de fuerza bruta.

### `get_datadog_security_findings_schema` {#get-datadog-security-findings-schema}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read`*\
Devuelve el esquema (campos disponibles y sus tipos) para hallazgos de seguridad. Llama a esto primero antes de usar `analyze_datadog_security_findings` para descubrir campos consultables. Soporta filtrado por tipo de hallazgo y controla el tamaño de la respuesta.

- ¿Qué campos están disponibles para los hallazgos de seguridad?
- Muéstrame el esquema para los hallazgos de vulnerabilidad de la biblioteca.
- Obtén el esquema completo incluyendo descripciones para los hallazgos de mala configuración.

### `analyze_datadog_security_findings` {#analyze-datadog-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read` y `Timeseries`*\
Herramienta principal para analizar hallazgos de seguridad utilizando consultas SQL. Consulta datos en vivo de las últimas 24 horas con agregaciones SQL flexibles, filtrado y agrupamiento. Llama a `get_datadog_security_findings_schema` primero para descubrir los campos disponibles, luego usa esta herramienta para consultar.

- Muéstrame las 10 reglas con los hallazgos más críticos.
- Cuenta los hallazgos abiertos agrupados por severidad y tipo de hallazgo.
- Encuentra vulnerabilidades de biblioteca con exploits disponibles, agrupados por recurso.

### `search_datadog_security_findings` {#search-datadog-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read`*\
Herramienta de respaldo para recuperar detalles completos de hallazgos de seguridad. Prefiere `analyze_datadog_security_findings` para la mayoría de las tareas de análisis. Utiliza esta herramienta solo cuando necesites encontrar objetos completos o cuando las consultas SQL sean insuficientes.

- Obtén detalles completos sobre hallazgos críticos en mi entorno de AWS.
- Recupera objetos de hallazgos completos para una regla específica.
- Lista todos los hallazgos de riesgo de identidad abiertos con metadatos completos.

### `get_datadog_security_findings_ticket_suggestions` {#get-datadog-security-findings-ticket-suggestions}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Read`, `Cases Read`*\
Devuelve sugerencias de proyectos clasificadas para la gestión de incidencias de hallazgos de seguridad. Muestra los proyectos disponibles de Case Management, Jira y ServiceNow con datos de uso de 30 días. Llama a esto antes de `create_datadog_security_findings_ticket` para descubrir qué proyecto utilizar.

- ¿Qué proyectos de Jira puedo usar para crear tickets para hallazgos de seguridad?
- Muéstrame los proyectos disponibles de ServiceNow para tickets.
- ¿Cuáles son los proyectos de Case Management más utilizados para hallazgos?

### `create_datadog_security_findings_ticket` {#create-datadog-security-findings-ticket}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Write`, `Cases Read`, `Cases Write`*\
Crea un caso de Case Management, una incidencia de Jira o un ticket de ServiceNow para hallazgos de seguridad. Requiere ID de hallazgos específicos y un ID de proyecto. Usa `get_datadog_security_findings_ticket_suggestions` primero para descubrir los proyectos disponibles.

- Crea un ticket de Jira para estos hallazgos críticos en el proyecto SECURITY.
- Abre un caso de Case Management para los hallazgos de esta regla.
- Crea un ticket de ServiceNow para estas vulnerabilidades de la biblioteca.

### `detach_datadog_security_findings_ticket` {#detach-datadog-security-findings-ticket}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Write`, `Cases Write`*\
Desvincula los hallazgos de seguridad de su caso o ticket asociado. Dado que los tickets de Jira y ServiceNow están vinculados a través de la gestión de casos, desvincular el caso también desvincula cualquier ticket posterior.

- Desvincula estos hallazgos de su ticket de Jira asociado.
- Elimina la asociación del caso para estos hallazgos.

### `mute_datadog_security_findings` {#mute-datadog-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Write`*\
Silencia o reanuda los hallazgos de seguridad para suprimirlos de alertas y tableros. Requiere un motivo de silencio (`PENDING_FIX`, `FALSE_POSITIVE`, `ACCEPTED_RISK` o `OTHER`) y admite una descripción opcional y una fecha de expiración.

- Silencia estos hallazgos como falsos positivos.
- Silencia esta mala configuración como riesgo aceptado con una expiración de 90 días.
- Reanuda los hallazgos que fueron marcados previamente como pendientes de solución.

### `assign_datadog_security_findings` {#assign-datadog-security-findings}
*Conjunto de herramientas: **seguridad***\
*Permisos requeridos: `Security Monitoring Findings Write`*\
Asigna o desasigna hallazgos de seguridad a un usuario. La asignación se propaga a cualquier caso vinculado. Omitir el ID del asignado para desasignar.

- Asigna estos hallazgos críticos al líder del equipo de seguridad.
- Desasigna hallazgos que ya no son relevantes.
- Asigna todos los hallazgos de esta regla a mí.

## Entrega de software {#software-delivery}

Herramientas para interactuar con Software Delivery ([CI Visibility][48] y [Test Optimization][24]).

### `search_datadog_ci_pipeline_events` {#search-datadog-ci-pipeline-events}
*Conjunto de herramientas: **entrega-de-software***\
*Permisos requeridos: `CI Visibility Read`*\
Busca eventos de CI con filtros y devuelve detalles sobre ellos.

- Muéstrame todos los pipelines para mi commit `58b1488`.
- Muéstrame la última falla del pipeline en la rama `my-branch`.
- Propón una solución para el trabajo `integration-test` que falla cada vez en mi rama `my-branch`.

### `aggregate_datadog_ci_pipeline_events` {#aggregate-datadog-ci-pipeline-events}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `CI Visibility Read`*\
Agrega eventos de pipeline de CI para producir estadísticas, métricas y análisis agrupados.

- ¿Cuál es la duración promedio de los trabajos en los últimos 7 días?
- ¿Cuántos pipelines fallidos ha habido en las últimas 2 semanas?
- Muéstrame el percentil 95 de la duración de los pipelines, agrupados por nombre de pipeline.

### `get_datadog_flaky_tests` {#get-datadog-flaky-tests}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Read`*\
Busca en Datadog [Test Optimization][24] pruebas inestables y devuelve detalles de triaje (tasa de fallos, categoría, propietarios, historial, impacto en CI), con paginación y ordenamiento.

- Encuentra pruebas inestables activas para el servicio de pago propiedad de `@team-abc`, ordenadas por tasa de fallos.
- Muestra pruebas inestables en la rama `main` para el repositorio `github.com/org/repo`, más recientes primero.
- Lista pruebas inestables en la categoría `timeout` con alta tasa de fallos (50%+) para que pueda priorizar las correcciones.

### `update_datadog_flaky_test_states` {#update-datadog-flaky-test-states}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Write`*\
Establece el estado de una o más pruebas inestables a `quarantined` (suprimir fallos), `disabled` (saltar prueba), `fixed` (marcar como resuelto) o `active` (restaurar). Esta es una operación de escritura que requiere aprobación explícita del usuario. Todos los cambios de estado son reversibles.

- Cuarentena todas las pruebas inestables activas en el repositorio `checkout-service`.
- Marca la prueba inestable `AuthServiceTest::testLogin` como corregida.
- Desactiva las pruebas inestables propiedad de `@team-payments` con una tasa de fallos superior al 50%.

### `aggregate_datadog_test_events` {#aggregate-datadog-test-events}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Read`*\
Agrega eventos de Test Optimization de Datadog para cuantificar la confiabilidad y las tendencias de rendimiento con funciones de agregación, métricas opcionales, facetas de agrupamiento y niveles de prueba configurables.

- Cuenta el número de pruebas fallidas en la última semana, agrupadas por rama.
- Muéstrame la duración del percentil 95 para cada conjunto de pruebas para identificar las más lentas.
- Cuenta todas las pruebas aprobadas y fallidas, agrupadas por propietarios de código.

### `search_datadog_test_events` {#search-datadog-test-events}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Read`*\
Busca eventos de prueba [Test Optimization][24] con filtros y devuelve detalles sobre ellos.

- Muéstrame las pruebas fallidas en la rama `main` de las últimas 24 horas.
- Obtén las ejecuciones de prueba para el commit `abc123` para ver cuáles pasaron y cuáles fallaron.
- Muéstrame todas las ejecuciones de prueba inestables para el servicio de checkout.
- Encuentra las pruebas a cargo de `@team-name` que están fallando.

### `get_datadog_code_coverage_branch_summary` {#get-datadog-code-coverage-branch-summary}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Code Coverage read`*\
Obtiene métricas agregadas del resumen de cobertura de código para una rama de repositorio, incluyendo cobertura total, cobertura de parches y desgloses de servicio/propietario de código.

- ¿Cuál es la cobertura de código en la rama `main` para `github.com/my-org/my-repo`?
- Muéstrame el resumen de cobertura para la rama `release/1.x` de `github.com/my-org/my-repo`.

### `get_datadog_code_coverage_commit_summary` {#get-datadog-code-coverage-commit-summary}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Code Coverage read`*\
Obtiene métricas agregadas del resumen de cobertura de código para un commit de repositorio, incluyendo cobertura total, cobertura de parches y desgloses de servicio/propietario de código.

- Muéstrame la cobertura de código para el commit `abc123abc123abc123abc123abc123abc123abcd` en `github.com/my-org/my-repo`.
- ¿Cuál es la cobertura de parches para el último commit en mi rama?

### `get_datadog_test_optimization_settings` {#get-datadog-test-optimization-settings}
*Conjunto de herramientas: **software-delivery***\
*Permisos requeridos: `Test Optimization Read`*\
Recupera las características de Test Optimization que están habilitadas para un servicio, incluyendo Test Impact Analysis (ITR), Early Flake Detection (EFD), Auto Test Retries (ATR), Failed Test Replay, Code Coverage collection y PR Comments.

- ¿Qué características de Test Optimization están habilitadas para el `auth-service`?
- Muéstrame la configuración de Test Optimization para mi servicio de checkout.

### `get_datadog_flaky_tests_management_policies` {#get-datadog-flaky-tests-management-policies}
*Conjunto de herramientas: **entrega de software***\
*Permisos Requeridos: `Test Optimization Read`*\
Recupera las políticas de Flaky Tests Management configuradas para un repositorio, incluyendo auto-quarantine windows, branch rules, failure rate thresholds, disable policies y retry settings.

- Muéstrame las políticas de Flaky Tests Management para `github.com/my-org/my-repo`.
- ¿Qué reglas de auto-cuarentena están configuradas para el repositorio del servicio de checkout?

### `search_dora_deployments` {#search-dora-deployments}
*Conjunto de herramientas: **entrega de software***\
*Permisos Requeridos: `DORA Metrics Read`*\
Busca eventos de despliegue DORA con filtros, o recupera detalles completos para un solo despliegue por ID.

- Muéstrame los despliegues para el servicio `checkout` en los últimos 7 días.
- Obtén detalles para el despliegue DORA `abc123`.
- Encuentra despliegues fallidos en el entorno de producción este mes.

### `aggregate_dora_deployments` {#aggregate-dora-deployments}
*Conjunto de herramientas: **entrega de software***\
*Permisos requeridos: `Timeseries`*\
Devuelve métricas DORA (frecuencia de despliegue, tiempo de entrega de cambios, tasa de fallos de cambios, tiempo de recuperación) para un servicio, equipo o repositorio, como valores escalares o series temporales. Utilice para preguntas sobre el rendimiento de entrega de software durante un período de tiempo.

- ¿Cuál es la frecuencia de despliegue y la tasa de fallos de cambios para el servicio `checkout` en los últimos 30 días?
- Muéstrame la tendencia del tiempo de entrega de cambios para el servicio `payments` en el último trimestre.
- Obtén las cuatro métricas DORA para el equipo `auth-service`.

## Synthetics {#synthetics}

Herramientas para interactuar con Datadog [Synthetic tests][47].

### `get_synthetics_tests` {#get-synthetics-tests}
*Conjunto de herramientas: **Synthetics***\
*Permisos requeridos: `Synthetics Read`*\
Busca Datadog Synthetic HTTP API tests.

- Ayúdame a entender por qué la prueba Synthetic en el punto de conexión `/v1/my/tested/endpoint` está fallando.
- Hay una interrupción; encuentre todos los Synthetic tests que están fallando en el dominio `api.mycompany.com`.
- ¿Los Synthetic tests en mi sitio web `api.mycompany.com` siguen funcionando en la última hora?

### `edit_synthetics_tests` {#edit-synthetics-tests}
*Conjunto de herramientas: **sintéticos***\
*Permisos requeridos: `Synthetics Global Variable Read` y `Synthetics Read` y `Synthetics Write`*\
Edita los Datadog Synthetic HTTP API tests.

- Mejora las afirmaciones de la prueba Synthetic definida en el punto de conexión `/v1/my/tested/endpoint`.
- Pausa la prueba `aaa-bbb-ccc` y establece las ubicaciones solo en ubicaciones europeas.
- Agrega la etiqueta de mi equipo a la prueba `aaa-bbb-ccc`.

### `synthetics_test_wizard` {#synthetics-test-wizard}
*Conjunto de herramientas: **sintéticos***\
*Permisos requeridos: `Synthetics Global Variable Read` y `Synthetics Read` y `Synthetics Write`*\
Previsualiza y crea Datadog Synthetic HTTP API Tests.

- Crea Datadog Synthetic tests en cada punto de conexión definido en este archivo de código.
- Crea una prueba Synthetic en `/path/to/endpoint`.
- Crea una prueba Synthetic que verifique si mi dominio `mycompany.com` permanece activo.

## Widgets {#widgets}

Herramientas para la visualización, validación y conversión de tipo de widgets de [Dashboard][46] y [notebook][57].

### `get_widget` {#get-widget}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Dashboards Read` o `Timeseries` o `Monitors Read` o `APM Read` o `RUM Apps Read`*\
Recupera y visualiza métricas, trazas, registros y otros datos de Datadog como gráficos interactivos. Soporta tres modos: búsqueda de panel, definición directa o resolución de URL.

- Muestra la serie temporal de uso de CPU para `service:api` en la última hora.
- Obtén los datos del widget `2228368921512806` en el Dashboard `abc-123-def`.
- Visualiza los datos de este enlace de compartición de Datadog.

### `get_widget_reference_compressed` {#get-widget-reference-compressed}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read` o `Notebooks Write`*\
Devuelve esquemas de TypeScript comprimidos e instrucciones de construcción para tipos de widgets. Llama antes de generar el JSON del widget. Al construir widgets de grupo, incluye tanto `group` como cualquier tipo de widget hijo previsto en una sola llamada para evitar duplicados.

- Obtén el esquema comprimido para un widget de series temporales.
- Muestra las instrucciones de construcción para widgets de lista principal y tabla de consulta.

### `search_datadog_widgets` {#search-datadog-widgets}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read` o `Notebooks Write`*\
Busca y recupera información sobre widgets en los Dashboards de Datadog, incluyendo sus IDs, títulos y consultas subyacentes.

- Encuentra todos los widgets de series temporales que consultan la métrica `system.cpu.user`.
- Busca widgets relacionados con las tasas de error en todos los Dashboards.

### `swap_widget_type` {#swap-widget-type}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Dashboards Read` o `Dashboards Write` o `Notebooks Read` o `Notebooks Write`*\
Convierte una definición de widget de un tipo de visualización a otro mientras preserva las consultas. Soporta tipos de widgets basados en solicitudes de fórmulas: series temporales, valor de consulta, lista principal, tabla de consulta, treemap, sunburst, distribución, mapa de calor, geomapa y lista de flujo.

- Convierte este widget de series temporales a una lista principal.
- Cambia el widget de tabla de consulta a una visualización de treemap.

### `validate_notebook_cell` {#validate-notebook-cell}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Timeseries`*\
Valida las definiciones de widgets de celdas de notebook, incluyendo la corrección SQL para celdas de análisis_sql. Al validar una celda de análisis_sql, incluya sus widgets de fuente de datos aguas arriba para que el punto de conexión pueda verificar las expresiones SQL contra sus esquemas.

- Valide estas definiciones de celdas de notebook antes de guardar.
- Verifique si la celda de análisis SQL hace referencia a columnas válidas del widget aguas arriba.

### `validate_notebook_cells` {#validate-notebook-cells}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Timeseries`*\
Valida múltiples definiciones de widgets de celdas de notebook en una sola llamada, incluyendo la corrección SQL para las celdas de análisis_sql.

- Valide todas las celdas en este notebook antes de publicar.
- Verifique estas tres celdas de análisis en busca de errores SQL.

### `verify_widget_data` {#verify-widget-data}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: `Dashboards Read` o `Timeseries` o `Monitors Read` o `APM Read` o `RUM Apps Read`*\
Verifica si las definiciones de widgets devuelven datos para la última hora. Llame después de agregar widgets a un dashboard para confirmar que las consultas devuelven datos reales. Devuelve un resultado por cada widget que indica si se encontraron datos, proporcionando un motivo en caso negativo.

- Verifique si estas definiciones de widgets devuelven datos.
- Verifique que los widgets agregados al dashboard muestren métricas reales.

### `visualize_tabular_data` {#visualize-tabular-data}
*Conjunto de herramientas: **widgets***\
*Permisos requeridos: No se requieren permisos específicos.*\
Representa datos tabulares como una visualización interactiva (sunburst, treemap o lista principal). Utilice después de agregar datos de consultas para visualizar relaciones jerárquicas o clasificaciones.

- Visualice estos datos métricos agrupados como un gráfico de sunburst.
- Muestre estos datos agregados como un desglose en treemap.

## Flujos de trabajo {#workflows}

Herramientas para [Workflow Automation][39], que incluyen listar, inspeccionar, ejecutar y configurar flujos de trabajo para uso de agentes.

### `list_datadog_workflows` {#list-datadog-workflows}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Read`*\
Lista y busca flujos de trabajo de [Workflow Automation][39]. Soporta filtrado por nombre, etiquetas, propietario, identificador y tipo de activador (como `monitor`, `schedule`, `api` o `incident`). Los resultados pueden ser ordenados por campos como `name` o `updatedAt`.

- Muéstreme todos los flujos de trabajo publicados etiquetados con `team:platform`.
- Liste los flujos de trabajo que tengan un disparador de agente configurado.
- Encuentre todos los flujos de trabajo relacionados con la respuesta a incidentes que sean propiedad de Alice Smith.

### `get_datadog_workflow` {#get-datadog-workflow}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Read`*\
Recupera información detallada sobre un flujo de trabajo específico, incluyendo sus disparadores, pasos, conexiones y esquema de entrada.

- Obtenga los detalles completos para el flujo de trabajo `00000000-0000-0000-0000-000000000000`.
- Muéstreme los parámetros de entrada y pasos para el flujo de trabajo de reversión de implementación.
- ¿Qué disparadores están configurados para este flujo de trabajo?

### `execute_datadog_workflow` {#execute-datadog-workflow}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Run`*\
Ejecute un flujo de trabajo publicado que tenga un disparador de agente, con parámetros de entrada opcionales que coincidan con el esquema de entrada del flujo de trabajo.

- Ejecute el flujo de trabajo de escalamiento de incidentes para el servicio `checkout-api` con severidad `high`.
- Ejecute el flujo de trabajo de reversión de implementación para el servicio de pagos.
- Dispare el flujo de trabajo de notificación On-Call con el contexto de esta investigación.

**Nota**: El flujo de trabajo debe estar publicado y tener un disparador de agente configurado. Utilice `update_datadog_workflow_with_agent_trigger` para agregar uno si es necesario.

### `get_datadog_workflow_instance` {#get-datadog-workflow-instance}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Read`*\
Recupera el estado y los detalles de una instancia de ejecución de flujo de trabajo, incluidos los resultados de los pasos y las salidas.

- ¿Cuál es el estado de la ejecución del flujo de trabajo que disparó?
- ¿Se completó con éxito el flujo de trabajo de escalamiento de incidentes?
- Muéstreme las salidas detalladas de la instancia de flujo de trabajo `00000000-0000-0000-0000-000000000000`.

### `update_datadog_workflow_with_agent_trigger` {#update-datadog-workflow-with-agent-trigger}
*Conjunto de herramientas: **flujos de trabajo***\
*Permisos requeridos: `Workflows Write`*\
Agrega un disparador de agente a un flujo de trabajo y lo publica, permitiendo que el flujo de trabajo sea ejecutado por agentes de IA.

- Agregue un disparador de agente al flujo de trabajo de reversión de implementación para que pueda ejecutarlo desde aquí.
- Configure el flujo de trabajo de respuesta a incidentes para que pueda ser activado por un agente.

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
[63]: /es/agent/guide/rshell/