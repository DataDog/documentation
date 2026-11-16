---
aliases:
- /es/network_performance_monitoring/network_table
- /es/network_performance_monitoring/network_page
- /es/network_monitoring/performance/network_page
- /es/network_monitoring/performance/network_analytics
description: Explore los datos de su red entre cada fuente y destino en toda su pila.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Optimice las investigaciones de red con una experiencia mejorada de consulta
    y mapas
- link: /network_monitoring/devices
  tag: Documentación
  text: Network Device Monitoring
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guía
  text: Detección de disponibilidad de aplicaciones mediante Network Insights
title: Network Analytics
---
## Descripción general {#overview}

La página de Network Analytics proporciona información sobre el estado general de su red y muestra [consultas recomendadas](#recommended-queries) en la parte superior de la página. Estas consultas recomendadas le permiten ejecutar consultas comunes y ver instantáneas de métricas relevantes, para que pueda ver cambios en el rendimiento, la latencia, los errores de DNS y más. Hacer clic en una consulta recomendada completa automáticamente la barra de búsqueda, las agrupaciones y los gráficos de resumen para brindarle información relevante sobre su red.

{{< img src="network_performance_monitoring/network_analytics/cnm_network_analytics_3.png" alt="Página de inicio de Network Analytics en Cloud Network Monitoring" >}}

## Consultas {#queries}

Para refinar su búsqueda al tráfico entre puntos finales particulares, agregue y filtre sus conexiones de red **con etiquetas**. Las etiquetas de las integraciones de Datadog o [Unified Service Tagging][12] se pueden usar para agregar y filtrar automáticamente. Al utilizar el etiquetado en Network Monitoring, puede aprovechar cómo fluye el tráfico de red a través de las zonas de disponibilidad para un servicio en particular o para toda su infraestructura. Agrupar por las etiquetas `client` y `server` visualiza el flujo de red _entre_ esos dos conjuntos de etiquetas.

Además, Datadog proporciona una lista de etiquetas [predeterminadas](#default-tags) que puede usar para consultar y analizar de manera eficiente el tráfico de red más relevante para sus necesidades.

{{< img src="network_performance_monitoring/network_analytics/network_diagram_with_tags.png" alt="diagrama de red que muestra cómo se ven las solicitudes al agrupar por etiquetas" style="width:100%;">}}

Por ejemplo, si desea ver el tráfico de red entre su servicio de pedidos llamado `orders-app` y todas sus zonas de disponibilidad, use `client_service:orders-app` en la barra de búsqueda y agregue las etiquetas `client_service` y `server_availability-zone` en el menú desplegable {{< ui >}}Group By{{< /ui >}} para visualizar el flujo de tráfico entre estos dos conjuntos de etiquetas:

{{< img src="network_performance_monitoring/network_analytics/network_analytics_with_client_and_server_tag_2.png" alt="Página de Network Analytics que muestra cómo se ven las solicitudes al filtrar por servicio y agrupar por zona de disponibilidad" style="width:90%;">}}

La vista predeterminada agrega el cliente y el servidor mediante la etiqueta `service`. En consecuencia, cada fila de la tabla representa conexiones agregadas de servicio a servicio cuando se agregan durante un período de una hora. Seleccione {{< ui >}}Auto-grouped traffic{{< /ui >}} para ver el tráfico clasificado en varias etiquetas de uso común como `service`, `kube_service`, `short_image` y `container_name`.

**Nota**: Para obtener información sobre las rutas de tráfico `NA/Untagged`, consulte [Tráfico no resuelto](#unresolved-traffic).

### Comprender los roles de cliente y servidor en relación con la dirección del tráfico {#understanding-client-and-server-roles-in-relation-to-traffic-direction}

La página de Network Analytics muestra flujos de tráfico direccionales desde clientes en una zona hacia servidores en otra. Estos flujos no son simétricos y es posible que no muestren la misma cantidad de "bytes enviados" y "bytes recibidos" cuando se invierten.

En este contexto:

- Cliente se refiere al lado que inicia la conexión.
- Servidor es el lado que responde a esa conexión.

Datadog monitorea el tráfico según quién abrió la conexión. La dirección inversa (servidor a cliente) se muestra como un flujo separado y puede tener métricas de volumen diferentes, o ningún dato si no se inician conexiones en esa dirección.

Por ejemplo, si un cliente en `us-east-1d` se comunica con un servidor en `us-east-1c`, es posible que vea un tráfico significativo. Sin embargo, si no hay un servidor en `us-east-1d`, la fila inversa (`us-east-1c → us-east-1d`) puede mostrar pocos o ningún dato.

**Nota**: Las asimetrías en el tráfico también pueden ser resultado del comportamiento de la aplicación o de elementos de la infraestructura (por ejemplo, proxies o NAT), o de la falta de inicio de conexión en una dirección.

### Consultas recomendadas {#recommended-queries}

{{< img src="network_performance_monitoring/network_analytics/recommended_queries_3.png" alt="La página de Network Analytics en Datadog que muestra tres consultas recomendadas">}}

Las consultas recomendadas le permiten comenzar a investigar su red, ya sea que esté solucionando un problema específico u obteniendo una mejor comprensión general de su red. Las consultas recomendadas le ayudan a encontrar información de red relevante sin necesidad de buscar o agrupar el tráfico. Por ejemplo, la consulta recomendada `Find dependencies of service: web-store` completa la barra de búsqueda con la consulta `client_service: web-store` y muestra los principales servicios a los que el servicio web-store envía tráfico dentro de la red y, por lo tanto, sus dependencias descendentes.

Cualquier consulta recomendada disponible se proporciona en la parte superior de la página de Analytics, y hay tres consultas recomendadas en la parte superior de la [página de DNS][10]. Utilice estas consultas para acceder a datos de uso común y ver cualquier cambio en esos datos en la última hora.

Para ejecutar una consulta recomendada, haga clic en el mosaico. Al pasar el cursor sobre el mosaico se muestra una descripción y un resumen de los datos que devuelve la consulta.

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="La vista detallada de una consulta recomendada que muestra una descripción y la información de la consulta, con cuatro dimensiones de consulta mostradas: Buscar por, Ver clientes como, Ver servidores como y Visualizar como" style="width:70%;">}}

También puede consultar datos de tráfico de red desde un agente de IA con la herramienta [`analyze_cloud_network_monitoring`][18] en el Datadog MCP Server.

### Paneles de facetas {#facet-panels}

Utilice los paneles de facetas para explorar todas las etiquetas disponibles en sus flujos o filtrar el tráfico sin necesidad de recordar los nombres exactos de las etiquetas. Los paneles de facetas reflejan las etiquetas en su consulta de la barra de búsqueda. Utilice las pestañas {{< ui >}}Client{{< /ui >}} y {{< ui >}}Server{{< /ui >}} para cambiar entre los paneles de faceta.

#### Facetas personalizadas {#custom-facets}

Agregue y filtre sus datos de tráfico por cualquier etiqueta en la página de análisis de red. Una lista de etiquetas incluidas se encuentra en el lado izquierdo de la pantalla bajo las pestañas {{< ui >}}Client{{< /ui >}} y {{< ui >}}Server{{< /ui >}}, y en el menú desplegable {{< ui >}}Group By{{< /ui >}}.

Las etiquetas incluidas son `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip` y `port`, entre otras. Si desea agregar o filtrar tráfico por una etiqueta que aún no está en el menú, agréguela como una faceta personalizada:

1. Seleccione el botón {{< ui >}}\+ Add{{< /ui >}} en la parte superior derecha de los paneles de facetas.
2. Ingrese la etiqueta relevante sobre la cual desea crear una faceta personalizada.
3. Haga clic en {{< ui >}}Add{{< /ui >}}.

Después de crear la faceta personalizada, utilice esta etiqueta para filtrar y agregar tráfico en la página de análisis de red y en el mapa de red. Todas las facetas personalizadas se pueden ver en la sección inferior `Custom` de los paneles de facetas.

### Wildcard search {#wildcard-search}
Para realizar una búsqueda Wildcard de varios caracteres, utilice el símbolo `*` de la siguiente manera:

- `client_service:web*` coincide con todos los servicios de cliente que comienzan con web.
- `client_service:*web` coincide con todos los servicios de cliente que terminan en web.
- `client_service:*web*` coincide con todos los servicios de cliente que contienen la cadena web.

Las búsquedas Wildcard funcionan dentro de las facetas con esta sintaxis. Esta consulta devuelve todos los servicios de cliente que terminan con la cadena "mongo":

`client_service:*mongo`

Para obtener más información, consulte la documentación de [sintaxis de búsqueda][1].

### Etiquetas neutrales{#neutral-tags}

Las etiquetas neutrales son etiquetas que no son específicas de un cliente o servidor, sino que se aplican a todo un flujo. Puede buscar y filtrar tráfico con estas etiquetas neutrales. Por ejemplo, puede usar estas etiquetas para filtrar tráfico que esté cifrado con TLS.

Para obtener una lista completa de etiquetas neutrales y sus descripciones, consulte [Etiquetas neutrales][15] en la Referencia de etiquetas.

### Agrupar por {#group-by}

Los grupos le permiten agrupar sus datos por el valor de una etiqueta determinada. Por ejemplo, si selecciona una agrupación como **servidor**, los resultados se agrupan por servidores individuales. Además, es posible que tenga grandes fragmentos de datos que no estén etiquetados con la agrupación que le interesa. En estas situaciones, puede usar {{< ui >}}Auto-grouped traffic{{< /ui >}} para agrupar datos por las etiquetas que estén disponibles.

Si desea investigar conexiones de todos sus servidores en una sola agrupación, agregue las etiquetas `client_host` y `Auto-Grouped-Servers` en el menú desplegable {{< ui >}}Group By{{< /ui >}}.

{{< img src="network_performance_monitoring/network_analytics/cnm_auto-grouped_client.png" alt="Página de análisis de NPM con ordenamiento por servidor y agrupado por Tráfico autoagrupado" style="width:90%;">}}

La opción {{< ui >}}Auto-grouped traffic{{< /ui >}} puede ayudarle a identificar la fuente de sus etiquetas. Por ejemplo, pase el cursor sobre los iconos individuales para mostrar un tooltip que indique el origen de la etiqueta:

{{< img src="network_performance_monitoring/network_analytics/npm_icon_tooltip.png" alt="Pasar el cursor sobre el tooltip del icono para mostrar la fuente de la etiqueta." style="width:90%;">}}

## Gráficos de resumen {#summary-graphs}

Los gráficos de resumen son una vista condensada de su red, la cual puede modificar para mostrar volumen, rendimiento, conexiones o latencia según sea necesario. Muestre hasta tres gráficos de resumen a la vez y cambie el tipo de datos y visualización para adaptarlos a su organización. Para actualizar la fuente de datos de un gráfico, haga clic en el título del gráfico y realice una selección en el menú desplegable.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="La sección de gráficos de resumen de la página de Network Analytics, que muestra las opciones disponibles para filtrar los datos: Volumen enviado, Rendimiento enviado, Volumen recibido, Rendimiento recibido, Conexiones establecidas, Conexiones cerradas, Conexiones establecidas / Segundo, Conexiones cerradas / Segundo y Latencia TCP" style="width:80%;">}}

Para cambiar el tipo de visualización, haga clic en el icono de lápiz en la esquina superior derecha del gráfico. Seleccione entre las opciones disponibles, como se muestra en la captura de pantalla a continuación.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="Las opciones de visualización del gráfico de resumen, que muestran opciones para ajustar la escala del eje Y con Lineal, Log, Pow y Sqrt, y para ajustar el tipo de gráfico con Área, Línea, Barras, Toplist, Cambio y Gráfico circular" style="width:60%;">}}

Para ocultar un gráfico específico, haga clic en el icono {{< ui >}}hide graph{{< /ui >}} junto al icono de lápiz. Puede mostrar desde un solo gráfico hasta tres gráficos. Para agregar gráficos, haga clic en el icono de más `+` en el lado derecho del gráfico de resumen y seleccione el gráfico que desea agregar. También puede restablecer los gráficos a los predeterminados al agregar uno nuevo.

## Tabla {#table}

La tabla de red desglosa las métricas de Volumen, Rendimiento, Retransmisiones TCP, Tiempo de ida y vuelta (RTT) y varianza de RTT entre cada **fuente** y **destino** definido por su consulta.

{{< img src="network_performance_monitoring/network_analytics/network_table_3.png" alt="Tabla de datos de red que muestra las columnas de tráfico y rendimiento agrupadas automáticamente." >}}

Puede configurar las columnas de su tabla usando el icono de engranaje {{< ui >}}Customize{{< /ui >}} (⚙️) en la parte superior derecha de la tabla.

Configure el tráfico mostrado con el botón {{< ui >}}Filter Traffic{{< /ui >}} en la parte superior derecha de la página.

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggle.png" alt="Detalles del flujo" style="width:50%;">}}

El tráfico externo (a IPs públicas) y el tráfico del Datadog Agent se muestran de forma predeterminada. Para limitar su vista, puede optar por desactivar los interruptores {{< ui >}}Show Datadog Traffic{{< /ui >}} y {{< ui >}}Show External Traffic{{< /ui >}}.

### Tráfico no resuelto {#unresolved-traffic}

Las etiquetas de cliente y servidor no resueltas se marcan como `N/A`. Un cliente de tráfico o un punto de conexión de servidor puede estar sin resolver porque carece de metadatos identificables, como información de fuente o destino. Esto puede ocurrir cuando Datadog no puede resolver el tráfico a entidades conocidas como balanceadores de carga, servicios en la nube o direcciones IP específicas dentro de la infraestructura monitoreada. Por lo general, el tráfico sin resolver puede surgir debido a:

* Las IP de cliente o servidor, ya sea en el servidor o en el contenedor, no están etiquetadas con las etiquetas de cliente o servidor utilizadas para la agregación de tráfico.
* El punto de conexión está fuera de su red privada y, por lo tanto, no está etiquetado por el Datadog Agent.
* El punto de conexión es un firewall, una malla de servicios u otra entidad donde no se puede instalar un Datadog Agent.
* El destino no ha sido etiquetado con un servicio, o una IP no ha sido asignada a ningún servicio.

Monitorear el tráfico sin resolver es esencial para identificar puntos ciegos en la visibilidad de la red y garantizar que todo el tráfico relevante se contabilice en el análisis de rendimiento y seguridad.

Utilice el interruptor {{< ui >}}Show N/A (Unresolved Traffic){{< /ui >}} en la esquina superior derecha de la tabla de datos para filtrar las conexiones agregadas con clientes o servidores sin resolver (`N/A`).

### Cambiar a Network Path {#pivot-to-network-path}

Haga clic en el menú de tres puntos en la tabla de análisis para cambiar a [network path][11] y ver las rutas entre la fuente y el destino especificados en CNM.

{{< img src="network_performance_monitoring/network_analytics/view_network_path_3.png" alt="Hacer clic en el menú de tres puntos en la tabla de Analytics para mostrar el interruptor de Network Path" style="width:90%;">}}

## Vistas guardadas {#saved-views}

Organice y comparta vistas de datos de tráfico. Saved Views hacen que la depuración sea más rápida y fomentan la colaboración. Por ejemplo, puede crear una vista, guardarla para el futuro para consultas comunes y copiar su enlace para compartir datos de red con sus compañeros de equipo.

- Para guardar una vista: haga clic en el botón {{< ui >}}\+ Save{{< /ui >}} y asigne un nombre a la vista para registrar su consulta actual, la configuración de la tabla y las selecciones de métricas del gráfico.
- Para cargar una vista: haga clic en {{< ui >}}Views{{< /ui >}} en la parte superior izquierda para ver sus Saved Views y seleccione una vista de la lista.
- Para cambiar el nombre de una vista: pase el cursor sobre una vista en la lista de Saved Views y haga clic en el icono de engranaje para {{< ui >}}Edit name{{< /ui >}}.
- Para compartir una vista: pase el cursor sobre una vista en la lista de Saved Views y haga clic en el icono de enlace para {{< ui >}}Copy permalink{{< /ui >}}.

Para obtener más información, consulte la documentación de [Saved Views][5].

## Panel lateral {#sidepanel}

El panel lateral proporciona telemetría contextual para ayudarle a depurar las dependencias de red. Utilice las pestañas {{< ui >}}Flows{{< /ui >}}, {{< ui >}}Logs{{< /ui >}}, {{< ui >}}Traces{{< /ui >}} y {{< ui >}}Processes{{< /ui >}} para determinar si un número elevado de retransmisiones o la latencia en el tráfico entre dos puntos de conexión se debe a:

- Un pico en el volumen de tráfico desde un puerto o IP en particular.
- Procesos pesados que consumen la CPU o la memoria del punto de conexión de destino.
- Errores de aplicación en el código del punto de conexión del cliente.

{{< img src="network_performance_monitoring/network_analytics/cnm_sidepanel_2.png" alt="Panel lateral de CNM que detalla el tráfico entre el tráfico del servicio del cliente." style="width:90%;">}}

### Etiquetas comunes {#common-tags}

La parte superior del panel lateral muestra las etiquetas comunes de cliente y servidor compartidas por las conexiones más recientes de la dependencia inspeccionada. Utilice las etiquetas comunes para obtener contexto adicional sobre un punto de conexión defectuoso. Por ejemplo, al solucionar problemas de comunicación latente con un servicio en particular, las etiquetas de destino comunes muestran lo siguiente:
- Contexto granular, como el contenedor, la tarea o el servidor hacia el cual fluye el tráfico.
- Contexto más amplio, como la zona de disponibilidad, la cuenta del proveedor de la nube o la implementación en la que se ejecuta el servicio.

### Trazas {#traces}

La pestaña {{< ui >}}Traces{{< /ui >}} muestra los seguimientos de APM asociados con el flujo de red seleccionado. Utilice esta pestaña para pasar de un problema a nivel de red (como una latencia alta o un número elevado de retransmisiones) a los seguimientos de la aplicación para los servicios involucrados.

Para obtener más información, consulte [APM][17].

### Security {#security}

La pestaña {{< ui >}}Security{{< /ui >}} destaca posibles amenazas de red y hallazgos detectados por [Workload Protection][6] y [Cloud Security Misconfigurations][7]. Estas señales se generan cuando Datadog detecta actividad de red que coincide con una [regla de detección o cumplimiento][8], o si existen otras amenazas y configuraciones incorrectas relacionadas con el flujo de red seleccionado.

Para obtener una referencia completa de las etiquetas predeterminadas disponibles para consultar y filtrar el tráfico de red, consulte [Tags Reference][16].

## Datos de red {#network-data}

Las métricas de red se muestran a través de los gráficos y la tabla asociada. Todas las métricas enviadas y recibidas se muestran desde la perspectiva de la fuente:

* **Métricas enviadas**: miden el valor de algo desde el _fuente_ hasta el _destino_ desde la perspectiva de la fuente.
* **Métricas recibidas**: miden el valor de algo desde el _destino_ hasta la _fuente_ desde la perspectiva de la fuente.

Los valores mostrados podrían ser diferentes para `sent_metric(source to destination)` y `received_metric(destination to source)` si hay una gran cantidad de pérdida de paquetes. En este caso, si el `destination` envía muchos bytes al `source`, las conexiones agregadas que se originan en `destination` incluyen esos bytes, pero las conexiones agregadas que se originan en `source` no los ven como recibidos.

**Nota:** Los datos se recopilan cada 30 segundos, se agregan en intervalos de cinco minutos y se conservan durante 14 días.

### Métricas {#metrics}

#### Carga de red {#network-load}

Las siguientes métricas de carga de red están disponibles:

| Métrica          |  Descripción                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volumen**      | La cantidad de bytes enviados o recibidos durante un período. Medido en bytes (o sus órdenes de magnitud) de forma bidireccional.                           |
| **Rendimiento**  | La tasa de bytes enviados o recibidos durante un período. Medido en bytes por segundo, de forma bidireccional.                                                  |

#### TCP {#tcp}

TCP es un protocolo orientado a conexión que garantiza la entrega de paquetes en orden. 

Las siguientes métricas de TCP están disponibles: 

| Métrica | Descripción |
|---|---|
| **Conexiones cerradas** | La cantidad de conexiones TCP en estado cerrado. Medido en conexiones por segundo desde el cliente. |
| **Conexiones establecidas** | El número de conexiones TCP en un estado establecido. Medido en conexiones por segundo desde el cliente. |
| **Servidor inalcanzable** | Indica cuando el servidor de destino está fuera de línea o el tráfico está bloqueado por enrutadores o firewalls. Disponible en **Agent 7.68+**. |
| **Red inalcanzable** | Indica problemas locales de red en la máquina del servidor del Agent. Disponible en **Agent 7.68+**. |
| **Cancelaciones de conexión** | Rastrea las cancelaciones de conexiones TCP y los tiempos de espera de conexión del espacio de usuario en tiempos de ejecución de lenguaje como `Go` y `Node.js`. Disponible en **Agent 7.70+**. |
| **Jitter TCP** | Medido como la varianza del tiempo de ida y vuelta suavizado de TCP. |
| **Latencia TCP** | Medida como el tiempo de ida y vuelta suavizado de TCP, es decir, el tiempo entre que se envía y se reconoce una trama TCP. |
| **Rechazos TCP**  | El número de conexiones TCP que fueron rechazadas por el servidor. Por lo general, esto indica un intento de conexión a una IP/puerto que no está recibiendo conexiones, o una configuración incorrecta del firewall o de seguridad. |
| **Restablecimientos TCP**  | El número de conexiones TCP que fueron restablecidas por el servidor.  |
| **Retransmisiones TCP** | Las retransmisiones TCP representan fallas detectadas que se retransmiten para asegurar la entrega. Medido en conteo de retransmisiones desde el cliente. |
| **Tiempos de espera TCP**  | El número de conexiones TCP que agotaron el tiempo de espera desde la perspectiva del sistema operativo. Esto puede indicar problemas generales de conectividad y latencia.  |

Todas las métricas se miden desde el lado `client` de la conexión cuando está disponible, de lo contrario, desde el lado del servidor.

## Detección automática de servicios en la nube {#cloud-service-autodetection}

Si depende de servicios en la nube administrados como S3 o Kinesis, puede hacer un seguimiento del rendimiento del tráfico hacia esos servicios desde sus aplicaciones internas. Delimite el contexto de lo que visualiza a una dependencia específica de AWS, Google Cloud o Azure para identificar la latencia, evaluar el rendimiento de la base de datos y visualizar su red de manera más completa.

{{< img src="network_performance_monitoring/network_analytics/cloud_service.png" alt="Panel lateral de una conexión de red, delimitado por `server_service:aws.s3`" >}}

Por ejemplo, puede:

- Visualizar el flujo de datos desde su clúster de Kubernetes interno hacia `server_service:aws.s3` en el [Network Map][2].
- Acceda a la [Network Page](#table) para aislar qué pods están estableciendo la mayor cantidad de conexiones a ese servicio, y
- Validar que su solicitud sea exitosa analizando las métricas de rendimiento de S3, las cuales están correlacionadas con el rendimiento del tráfico directamente en el panel lateral para una dependencia determinada, bajo la pestaña *Métricas de integración*.

CNM asigna automáticamente:

- Llamadas de red a S3 (que pueden desglosarse por `s3_bucket`), RDS (que pueden desglosarse por `rds_instance_type`), Kinesis, ELB, Elasticache y otros [servicios de AWS][3].
- Llamadas de API a AppEngine, Google DNS, Gmail y otros [servicios de Google Cloud][4].

Para monitorear otros puntos finales donde no se puede instalar un Agent (como APIs públicas), agrupe el destino por la etiqueta [`domain` ](#domain-resolution). O bien, consulte la sección a continuación para la resolución de servicios en la nube.

### Resolución mejorada de servicios en la nube {#cloud-service-enhanced-resolution}

Con la [resolución mejorada configurada][9] para AWS o Azure, CNM filtra y agrupa el tráfico de red utilizando recursos recopilados de estos proveedores de nube. Las etiquetas disponibles varían según el proveedor de nube y el recurso. Datadog aplica automáticamente las etiquetas enumeradas a continuación, además de cualquier etiqueta definida por el usuario.

#### Amazon Web Services {#amazon-web-services}

{{< tabs >}}
{{% tab "Balanceadores de carga" %}}
- Nombre
- balanceador de carga
- load_balancer_arn
- dns_name (formato loadbalancer/dns:)
- región
- id_de_cuenta
- esquema
- etiquetas personalizadas (definidas por el usuario) aplicadas a balanceadores de carga de AWS
{{% /tab %}}

{{% tab "NAT Gateways" %}}
- gateway_id
- gateway_type
- aws_nat_gateway_id
- aws_nat_gateway_public_ip
- cuenta de AWS
- zona de disponibilidad
- región
- etiquetas personalizadas (de usuario) aplicadas a NAT Gateways de AWS
{{% /tab %}}

{{% tab "VPC Internet Gateway" %}}
- gateway_id
- gateway_type
- aws_internet_gateway_id
- cuenta de AWS
- región
- etiquetas personalizadas (de usuario) aplicadas a VPC Internet Gateways
{{% /tab %}}

{{% tab "Punto de conexión VPC" %}}
- gateway_id
- gateway_type
- aws_vpc_endpoint_id
- etiquetas personalizadas (de usuario) aplicadas a puntos de conexión VPC Internet
{{% /tab %}}

{{< /tabs >}}

#### Azure {#azure}

{{< tabs >}}
{{% tab "Balanceadores de carga y Application Gateways" %}}
- Nombre
- balanceador de carga
- cloud_provider
- región
- type
- resource_group
- tenant_name
- subscription_name
- subscription_id
- sku_name
- etiquetas personalizadas (definidas por el usuario) aplicadas a Azure Loadbalancers y Application Gateways
{{% /tab %}}
{{< /tabs >}}

## Resolución de dominio {#domain-resolution}

A partir del Agent 7.17+, el Agent resuelve las IP en nombres de dominio legibles por humanos para el tráfico externo e interno. Domain le permite hacer un seguimiento de puntos de conexión de proveedores de nube donde no se puede instalar un Datadog Agent, como buckets de S3, balanceadores de carga de aplicaciones y API. Los nombres de dominio irreconocibles, como los dominios DGA de servidores de comando y control (C&C), pueden indicar amenazas a la seguridad de la red. `domain` **se codifica como una etiqueta en Datadog**, por lo que puede usarla en consultas de la barra de búsqueda y en el panel de faceta para agregar y filtrar el tráfico.

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation_2.png" alt="Agregación de dominio" >}}

**Nota**: La resolución de DNS es compatible con servidores donde la sonda del sistema se ejecuta en el espacio de nombres de red raíz, lo cual generalmente es causado por ejecutar system-probe en un contenedor sin usar la red del servidor.

## Traducción de direcciones de red (NAT) {#network-address-translation-nat}

NAT es una herramienta utilizada por Kubernetes y otros sistemas para enrutar el tráfico entre contenedores. Al investigar una dependencia específica (por ejemplo, de servicio a servicio), puede utilizar la presencia o ausencia de direcciones IP pre-NAT para distinguir entre los servicios nativos de Kubernetes, que realizan su propio enrutamiento, y los servicios que dependen de clientes externos para el enrutamiento. Esta función no incluye la resolución de puertas de enlace NAT.

Para ver las direcciones IP pre-NAT y post-NAT, utilice el interruptor {{< ui >}}Show pre-NAT IPs{{< /ui >}} en la configuración de la tabla. Cuando esta configuración está desactivada, las direcciones IP que se muestran en las columnas {{< ui >}}Client IP{{< /ui >}} y {{< ui >}}Server IP{{< /ui >}} son, de forma predeterminada, direcciones IP post-NAT. En los casos en los que tenga varias direcciones IP pre-NAT para una dirección IP post-NAT, se mostrarán las 5 direcciones IP pre-NAT más comunes. `pre_nat.ip` es una etiqueta como cualquier otra en el producto, por lo que puede utilizarla para agregar y filtrar tráfico.

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="direcciones IP pre-NAT" >}}

## ID de Red {#network-id}

Los usuarios de CNM pueden configurar sus redes para que tengan espacios de IP superpuestos. Por ejemplo, es posible que desee implementar en múltiples VPC (nubes privadas virtuales) que tienen rangos de direcciones superpuestos y se comunican solo a través de balanceadores de carga o puertas de enlace en la nube.

Para clasificar correctamente los destinos del tráfico, CNM utiliza el concepto de un ID de red, el cual se representa como una etiqueta. Un ID de red es un identificador alfanumérico para un conjunto de direcciones IP que pueden comunicarse entre sí. Cuando se detecta una dirección IP que se asigna a varios servidores con diferentes ID de red, este identificador se utiliza para determinar el servidor particular hacia el cual se dirige el tráfico de red o desde el cual proviene.

En AWS y Google Cloud, el ID de red se establece automáticamente como el ID de VPC. Para otros entornos, el ID de red puede establecerse manualmente, ya sea en `datadog.yaml` como se muestra a continuación, o añadiendo `DD_NETWORK_ID` a los contenedores del proceso y del Agent principal.

```yaml
network:
   Id: <your-network-id>
```


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/search_syntax/
[2]: /es/network_monitoring/cloud_network_monitoring/network_map/
[3]: /es/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/
[4]: /es/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/
[5]: /es/logs/explorer/saved_views/
[6]: /es/security/workload_protection/
[7]: /es/security/cloud_security_management/misconfigurations/
[8]: /es/security/detection_rules/
[9]: /es/network_monitoring/cloud_network_monitoring/setup/#enhanced-resolution
[10]: /es/network_monitoring/dns/#recommended-queries
[11]: /es/network_monitoring/network_path
[12]: /es/getting_started/tagging/unified_service_tagging/
[15]: /es/network_monitoring/cloud_network_monitoring/tags_reference/#neutral-tags
[16]: /es/network_monitoring/cloud_network_monitoring/tags_reference/
[17]: /es/tracing/
[18]: /es/mcp_server/tools/#analyze_cloud_network_monitoring