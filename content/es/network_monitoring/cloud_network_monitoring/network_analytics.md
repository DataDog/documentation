---
aliases:
- /es/network_performance_monitoring/network_table
- /es/network_performance_monitoring/network_page
- /es/network_monitoring/performance/network_page
- /es/network_monitoring/performance/network_analytics
description: Explora los datos de tu red entre cada fuente y destino en toda tu pila.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Agiliza las investigaciones de red con una experiencia de consulta y mapa
    mejorada
- link: /network_monitoring/devices
  tag: Documentación
  text: Network Device Monitoring
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guía
  text: Detección de la Disponibilidad de Aplicaciones utilizando Perspectivas de
    Red
title: Network Analytics
---
## Resumen {#overview}

La página de Network Analytics proporciona información sobre la salud general de tu red y muestra [consultas recomendadas](#recommended-queries) en la parte superior de la página. Estas consultas recomendadas te permiten ejecutar consultas comunes y ver instantáneas de métricas relevantes, para que puedas observar cambios en el rendimiento, la latencia, los errores de DNS y más. Al hacer clic en una consulta recomendada, se completa automáticamente la barra de búsqueda, los agrupamientos y los gráficos de resumen para proporcionarte información relevante sobre tu red.

{{< img src="network_performance_monitoring/network_analytics/cnm_network_analytics_3.png" alt="Página principal de Network Analytics bajo Cloud Network Monitoring" >}}

## Consultas {#queries}

Para refinar tu búsqueda a tráfico entre puntos finales particulares, agrega y filtra tus conexiones de red **con etiquetas**. Las etiquetas de las integraciones de Datadog o [Etiquetado de Servicio Unificado][12] pueden ser utilizadas para agregar y filtrar automáticamente. Al utilizar etiquetas en el Monitoreo de Redes, puedes aprovechar cómo fluye el tráfico de red a través de zonas de disponibilidad para un servicio particular o para toda tu infraestructura. Agrupar por `client` y `server` etiquetas visualiza el flujo de red _entre_ esos dos conjuntos de etiquetas.

Además, Datadog proporciona una lista de etiquetas predeterminadas [listas para usar](#default-tags) que puedes utilizar para consultar y analizar de manera eficiente el tráfico de red más relevante para tus necesidades.

{{< img src="network_performance_monitoring/network_analytics/network_diagram_with_tags.png" alt="diagrama de red que muestra cómo se ven las solicitudes al agrupar por etiquetas" style="width:100%;">}}

Por ejemplo, si desea ver el tráfico de red entre su servicio de pedidos llamado `orders-app` y todas sus zonas de disponibilidad, use `client_service:orders-app` en la barra de búsqueda y agregue las etiquetas `client_service` y `server_availability-zone` en el menú desplegable **Agrupar por** para visualizar el flujo de tráfico entre estos dos conjuntos de etiquetas:

{{< img src="network_performance_monitoring/network_analytics/network_analytics_with_client_and_server_tag_2.png" alt="Página de Network Analytics que muestra cómo se ven las solicitudes al filtrar por servicio y agrupar por Availability Zone" style="width:90%;">}}

La vista predeterminada agrega el cliente y el servidor por la etiqueta `service`. En consecuencia, cada fila en la tabla representa conexiones agregadas de servicio a servicio cuando se agregan durante un período de tiempo de una hora. Seleccione **Tráfico autoagrupado** para ver el tráfico agrupado en varias etiquetas comúnmente utilizadas como `service`, `kube_service`, `short_image` y `container_name`.

**Nota**: Para información sobre `NA/Untagged` rutas de tráfico, consulte [Tráfico no resuelto](#unresolved-traffic).

### Entendiendo los roles de cliente y servidor en relación con la dirección del tráfico {#understanding-client-and-server-roles-in-relation-to-traffic-direction}

La página de Análisis de Red muestra flujos de tráfico direccionales desde clientes en una zona hacia servidores en otra. Estos flujos no son simétricos y pueden no mostrar "bytes enviados" y "bytes recibidos" iguales al ser revertidos.

En este contexto:

- Cliente se refiere al lado que inicia la conexión.
- Servidor es el lado que responde a esa conexión.

Datadog realiza el seguimiento del tráfico basado en quién abrió la conexión. La dirección inversa (servidor a cliente) se muestra como un flujo separado y puede tener métricas de volumen diferentes, o no tener datos en absoluto si no se inician conexiones en esa dirección.

Por ejemplo, si un cliente en `us-east-1d` habla con un servidor en `us-east-1c`, puede ver un tráfico significativo. Sin embargo, si no hay servidor en `us-east-1d`, la fila inversa (`us-east-1c → us-east-1d`) puede mostrar pocos o ningún dato.

**Nota**: Las asimetrías en el tráfico también pueden resultar del comportamiento de la aplicación o elementos de infraestructura (por ejemplo, proxies o NATs), o la falta de iniciación de conexión en una dirección.

### Consultas recomendadas {#recommended-queries}

{{< img src="network_performance_monitoring/network_analytics/recommended_queries_3.png" alt="La página de Network Analytics en Datadog mostrando tres consultas recomendadas">}}

Las consultas recomendadas te permiten comenzar a investigar en tu red, ya sea que estés solucionando un problema específico o obteniendo una mejor comprensión general de tu red. Las consultas recomendadas te ayudan a encontrar información relevante de la red sin necesidad de buscar o agrupar el tráfico. Por ejemplo, la consulta recomendada `Find dependencies of service: web-store` llena la barra de búsqueda con la consulta `client_service: web-store` y muestra los principales servicios a los que la tienda web de servicios está enviando tráfico dentro de la red, y por lo tanto, sus dependencias aguas abajo.

Cualquier consulta recomendada disponible se proporciona en la parte superior de la página de Análisis, y hay tres consultas recomendadas en la parte superior de la [página de DNS][10]. Utiliza estas consultas para acceder a datos comúnmente utilizados y ver cualquier cambio en esos datos en la última hora.

Para ejecutar una consulta recomendada, haz clic en el mosaico. Al pasar el cursor sobre el mosaico se muestra una descripción y un resumen de los datos que devuelve la consulta.

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="La vista detallada de una consulta recomendada muestra una descripción e información de la consulta, con cuatro dimensiones de consulta mostradas: Buscar, Ver clientes como, Ver servidores como, y Visualizar como." style="width:70%;">}}

### Paneles de facetas {#facet-panels}

Utiliza los paneles de facetas para explorar todas las etiquetas disponibles en tus flujos o filtrar tráfico sin necesidad de recordar los nombres exactos de las etiquetas. Los paneles de facetas reflejan las etiquetas en tu consulta de la barra de búsqueda. Utiliza las pestañas **Cliente** y **Servidor** para alternar entre los paneles de facetas.

#### Facetas personalizadas {#custom-facets}

Agrega y filtra tus datos de tráfico por cualquier etiqueta en la página de Network Analytics. Una lista de etiquetas incluidas se encuentra en el lado izquierdo de la pantalla bajo las pestañas **Cliente** y **Servidor**, y en el menú desplegable **Agrupar por**.

Las etiquetas incluidas son `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip`, y `port`, entre otras. Si deseas agregar o filtrar tráfico por una etiqueta que no está ya en el menú, agrégala como una faceta personalizada:

1. Selecciona el botón **+ Agregar** en la parte superior derecha de los paneles de facetas.
2. Ingresa la etiqueta relevante sobre la cual deseas crear una faceta personalizada.
3. Haz clic en **Agregar**.

Después de que se crea la faceta personalizada, utiliza esta etiqueta para filtrar y agregar tráfico en la página de análisis de red y en el mapa de red. Todas las facetas personalizadas se pueden ver en la sección inferior `Custom` de los paneles de facetas.

### Búsqueda con comodín {#wildcard-search}
Para realizar una búsqueda con comodín de múltiples caracteres, utiliza el símbolo `*` de la siguiente manera:

- `client_service:web*` coincide con todos los servicios de cliente que comienzan con web.
- `client_service:*web` coincide con todos los servicios de cliente que terminan con web.
- `client_service:*web*` coincide con todos los servicios de cliente que contienen la cadena web.

Las búsquedas con comodín funcionan dentro de las facetas con esta sintaxis. Esta consulta devuelve todos los servicios de cliente que terminan con la cadena "mongo":

`client_service:*mongo`

Para aprender más, consulta la documentación de [sintaxis de búsqueda][1].

### Etiquetas neutrales {#neutral-tags}

Las etiquetas neutrales son etiquetas que no son específicas de un cliente o servidor, y en su lugar se aplican a un flujo completo. Puedes buscar y filtrar tráfico con estas etiquetas neutrales. Por ejemplo, puedes usar estas etiquetas para filtrar tráfico que está cifrado con TLS.

Para una lista completa de etiquetas neutrales y sus descripciones, consulta [Etiquetas neutrales][15] en la Referencia de Etiquetas.

### Agrupar por {#group-by}

Los grupos te permiten agrupar tus datos por el valor de una etiqueta dada. Por ejemplo, si seleccionas un agrupamiento como **host**, los resultados se agrupan por hosts individuales. Además, puedes tener grandes bloques de datos que no están etiquetados por el agrupamiento que te interesa. En estas situaciones, puedes usar **Tráfico autoagrupado** para agrupar datos por las etiquetas que estén disponibles.

Si deseas investigar conexiones de todos tus hosts en un solo agrupamiento, agrega las etiquetas `client_host` y `Auto-Grouped-Servers` en el menú desplegable **Agrupar por**.

{{< img src="network_performance_monitoring/network_analytics/cnm_auto-grouped_client.png" alt="Página de análisis de NPM ordenando por host y agrupada por Tráfico autoagrupado." style="width:90%;">}}

La opción **Tráfico autoagrupado** puede ayudarte a identificar la fuente de tus etiquetas. Por ejemplo, pasa el cursor sobre los íconos individuales para mostrar un tooltip que indica el origen de la etiqueta:

{{< img src="network_performance_monitoring/network_analytics/npm_icon_tooltip.png" alt="Pasando el cursor sobre el ícono del tooltip para mostrar la fuente de la etiqueta." style="width:90%;">}}

## Gráficas de resumen {#summary-graphs}

Las gráficas de resumen son una vista condensada de tu red, que puedes modificar para mostrar volumen, rendimiento, conexiones o latencia según sea necesario. Muestra hasta tres visualizaciones de resumen a la vez y cambia los datos y el tipo de visualización para adaptarlos a tu organización. Para actualizar la fuente de datos del gráfico, haga clic en el título del gráfico y seleccione una opción del menú desplegable.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="La sección del gráfico resumen de la página de Network Analytics, que muestra las opciones disponibles para filtrar los datos: Volume Sent, Throughput Sent, Volume Received, Throughput Received, Established Connections, Closed Connections, Established Connections / Second, Closed Connections / Second y TCP Latency." style="width:80%;">}}

Para cambiar el tipo de gráfico, haga clic en el ícono de lápiz en la esquina superior derecha del gráfico. Selecciona entre las opciones disponibles, como se muestra en la captura de pantalla a continuación.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="Las opciones de visualización del gráfico resumen, que muestran opciones para ajustar la escala del eje Y con Linear, Log, Pow y Sqrt, y para ajustar el tipo de gráfico con Area, Line, Bars, Toplist, Change y Piechart." style="width:60%;">}}

Para ocultar un gráfico específico, haga clic en el ícono de **ocultar gráfico** junto al ícono de lápiz. Puede mostrar tan solo un gráfico o hasta tres gráficos. Para agregar gráficos, haga clic en el ícono de más `+` en el lado derecho del gráfico resumen y seleccione el gráfico a agregar. También puede restablecer los gráficos a los predeterminados al agregar un nuevo gráfico.

## Tabla {#table}

La tabla de red desglosa las métricas de Volumen, Rendimiento, Retransmisiones TCP, Tiempo de ida y vuelta (RTT) y varianza de RTT entre cada **fuente** y **destino** definidos por tu consulta.

{{< img src="network_performance_monitoring/network_analytics/network_table_3.png" alt="Tabla de datos de red que muestra columnas de tráfico y rendimiento agrupadas automáticamente." >}}

Puede configurar las columnas de su tabla utilizando el ícono de engranaje **Customize** (⚙️) en la parte superior derecha de la tabla.

Configure el tráfico mostrado con el botón `Filter Traffic` en la parte superior derecha de la página.

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggle.png" alt="Detalles del flujo" style="width:50%;">}}

El tráfico externo (hacia IPs públicas) y el tráfico del Agente de Datadog se muestran por defecto. Para reducir su vista, puede optar por desactivar los interruptores `Show Datadog Traffic` y `Show External Traffic`.

### Tráfico no resuelto {#unresolved-traffic}

Las etiquetas de cliente y servidor no resueltas se marcan como `N/A`. Un cliente o punto de conexión de servidor de tráfico puede no estar resuelto porque carece de metadatos identificables, como información de fuente o destino. Esto puede ocurrir cuando Datadog no puede resolver el tráfico a entidades conocidas como balanceadores de carga, servicios en la nube o direcciones IP específicas dentro de la infraestructura monitoreada. Típicamente, el tráfico no resuelto puede surgir debido a:

* Las IPs del cliente o servidor del host o contenedor no están etiquetadas con las etiquetas de cliente o servidor utilizadas para la agregación de tráfico.
* El punto final está fuera de su red privada y, en consecuencia, no está etiquetado por el Agente de Datadog.
* El punto de conexión es un firewall, una malla de servicios u otra entidad donde no se puede instalar un Agente de Datadog.
* El destino no ha sido etiquetado con un servicio, o una IP no ha sido mapeada a ningún servicio.

Monitorear el tráfico no resuelto es esencial para identificar puntos ciegos en la visibilidad de la red y asegurar que todo el tráfico relevante sea contabilizado en el análisis de rendimiento y seguridad.

Utilice el interruptor **Mostrar N/A (Tráfico No Resuelto)** en la esquina superior derecha de la tabla de datos para filtrar conexiones agregadas con clientes o servidores no resueltos (`N/A`).

### Pivot to Network Path {#pivot-to-network-path}

Haga clic en el menú de tres puntos en la tabla de análisis para pivotar a [Network Path][11] y ver las rutas entre el origen y el destino especificados en CNM.

{{< img src="network_performance_monitoring/network_analytics/view_network_path_3.png" alt="Haciendo clic en el menú de tres puntos en la tabla de análisis para mostrar el interruptor de Network Path." style="width:90%;">}}

## Saved Views {#saved-views}

Organice y comparta Saved Views de datos de tráfico. Saved Views hacen que la depuración sea más rápida y fomentan la colaboración. Por ejemplo, puedes crear una vista, guardarla para el futuro para consultas comunes y copiar su enlace para compartir datos de red con tus compañeros de equipo.

- Para guardar una vista: haga clic en el botón **+ Save** y asigne un nombre a la vista para registrar su consulta actual, la configuración de la tabla y las selecciones de métricas del gráfico.
- Para cargar una vista: haga clic en **Views** en la parte superior izquierda para ver sus Saved Views y seleccionar una vista de la lista.
- Para renombrar una vista: pase el cursor sobre una vista en la lista de Saved Views y haga clic en el ícono de engranaje para **Edit name**.
- Para compartir una vista: pase el cursor sobre una vista en la lista de Saved Views y haga clic en el ícono de enlace para **Copy permalink**.

Para aprender más, consulte la documentación de [Saved Views][5].

## Panel lateral {#sidepanel}

El panel lateral proporciona telemetría contextual para ayudarle a depurar dependencias de red. Utilice las pestañas Flows, Logs, Traces y Processes para determinar si un alto conteo de retransmisiones o latencia en el tráfico entre dos puntos de conexión se debe a:

- Un aumento en el volumen de tráfico desde un puerto o IP particular.
- Procesos pesados que consumen la CPU o memoria del punto de conexión de destino.
- Errores de aplicación en el código del punto de conexión del cliente.

{{< img src="network_performance_monitoring/network_analytics/cnm_sidepanel_2.png" alt="Panel lateral de CNM detallando el tráfico entre el tráfico del servicio del cliente." style="width:90%;">}}

### Etiquetas comunes {#common-tags}

La parte superior del panel lateral muestra etiquetas comunes de cliente y servidor compartidas por las conexiones más recientes de la dependencia inspeccionada. Utiliza etiquetas comunes para obtener contexto adicional sobre un punto de conexión defectuoso. Por ejemplo, al solucionar problemas de comunicación latente con un servicio particular, las etiquetas de destino comunes revelan lo siguiente:
- Contexto granular como el contenedor, tarea o host al que fluye el tráfico.
- Contexto más amplio como la zona de disponibilidad, cuenta del proveedor de la nube o implementación en la que se ejecuta el servicio.

### Rastros {#traces}

La pestaña **Traces** muestra los rastros de APM asociados con el flujo de red seleccionado. Utiliza esta pestaña para pivotar de un problema a nivel de red—como alta latencia o recuentos elevados de retransmisiones—hacia los rastros de la aplicación para los servicios involucrados.

Para más información, consulta [APM][17].

### Seguridad {#security}

La pestaña **Security** resalta las amenazas potenciales de red y hallazgos detectados por [Workload Protection][6] y [Cloud Security Misconfigurations][7]. Estas señales se generan cuando Datadog detecta actividad de red que coincide con una [regla de detección o cumplimiento][8], o si hay otras amenazas y configuraciones incorrectas relacionadas con el flujo de red seleccionado.

Para una referencia completa de las etiquetas predeterminadas disponibles para consultar y filtrar el tráfico de red, consulta [Referencia de Etiquetas][16].

## Network data {#network-data}

Las métricas de red se muestran a través de los gráficos y la tabla asociada. Todas las métricas enviadas y recibidas se muestran desde la perspectiva de la fuente:

* **Métricas enviadas**: miden el valor de algo desde la _fuente_ hasta el _destino_ desde la perspectiva de la fuente.
* **Métricas recibidas**: miden el valor de algo desde el _destino_ hasta la _fuente_ desde la perspectiva de la fuente.

Los valores mostrados pueden ser diferentes para `sent_metric(source to destination)` y `received_metric(destination to source)` si hay un gran número de paquetes perdidos. En este caso, si el `destination` envía muchos bytes al `source`, las conexiones agregadas que se originan en `destination` incluyen esos bytes, pero las conexiones agregadas que se originan en `source` no los ven como recibidos.

**Nota:** Los datos se recopilan cada 30 segundos, se agregan en intervalos de cinco minutos y se retienen durante 14 días.

### Metrics {#metrics}

#### Carga de red {#network-load}

Las siguientes métricas de carga de red están disponibles:

| Metric |  Descripción                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volume**      |  El número de bytes enviados o recibidos durante un período. Medido en bytes (o órdenes de magnitud de estos) de manera bidireccional.                           |
| **Rendimiento**  | La tasa de bytes enviados o recibidos durante un período. Medido en bytes por segundo, de manera bidireccional.                                                  |

#### TCP {#tcp}

TCP es un protocolo orientado a la conexión que garantiza la entrega ordenada de paquetes. 

Las siguientes métricas de TCP están disponibles: 

| Métrica | Descripción |
|---|---|
| **Conexiones Cerradas** | El número de conexiones TCP en un estado cerrado. Medido en conexiones por segundo desde el cliente. |
| **Conexiones Establecidas** | El número de conexiones TCP en un estado establecido. Medido en conexiones por segundo desde el cliente. |
| **Host Inalcanzable** | Indica cuando el servidor objetivo está fuera de línea o el tráfico está bloqueado por enrutadores o cortafuegos. Disponible en **Agent 7.68+**. |
| **Red Inalcanzable** | Indica problemas de red local en la máquina host del Agente. Disponible en **Agent 7.68+**. |
| **Cancelaciones de Conexión** | Rastrea las cancelaciones de conexiones TCP y los tiempos de espera de conexión en el espacio de usuario en entornos de lenguaje como `Go` y `Node.js`. Disponible en **Agent 7.70+**. |
| **Jitter TCP** | Medido como la varianza del tiempo de ida y vuelta suavizado de TCP. |
| **Latencia TCP** | Medido como el tiempo de ida y vuelta suavizado de TCP, es decir, el tiempo entre el envío de un marco TCP y su reconocimiento. |
| **Rechazos TCP**  | El número de conexiones TCP que fueron rechazadas por el servidor. Típicamente, esto indica un intento de conectarse a una IP/puerto que no está recibiendo conexiones, o una mala configuración de firewall/seguridad. |
| **Reinicios TCP**  | El número de conexiones TCP que fueron reiniciadas por el servidor.  |
| **Retransmisiones TCP** | Las retransmisiones TCP representan fallas detectadas que se retransmiten para asegurar la entrega. Medido en el conteo de retransmisiones desde el cliente. |
| **Tiempo de espera de TCP**  | El número de conexiones TCP que se agotaron desde la perspectiva del sistema operativo. Esto puede indicar problemas generales de conectividad y latencia.  |

Todas las métricas se miden desde el lado `client` de la conexión cuando está disponible, de lo contrario, desde el lado del servidor.

## Autodetección de servicios en la nube {#cloud-service-autodetection}

Si confía en servicios en la nube administrados como S3 o Kinesis, puede monitorear el rendimiento del tráfico hacia esos servicios desde sus aplicaciones internas. Limite su vista a una dependencia particular de AWS, Google Cloud o Azure para identificar la latencia, evaluar el rendimiento de la base de datos y visualizar su red de manera más completa.

{{< img src="network_performance_monitoring/network_analytics/cloud_service.png" alt="Panel lateral de una conexión de red, limitado por `server_service:aws.s3`" >}}

Por ejemplo, puede:

- Visualice el flujo de datos desde su clúster interno de Kubernetes hacia `server_service:aws.s3` en el [Mapa de Red][2].
- Diríjase a la [Página de Red](#table) para aislar qué pods están estableciendo más conexiones a ese servicio, y
- Valide que su solicitud sea exitosa analizando las métricas de rendimiento de S3, que están correlacionadas con el rendimiento del tráfico directamente en el panel lateral para una dependencia dada, bajo la pestaña *Métricas de Integración*.

CNM mapea automáticamente:

- Llamadas de red a S3 (que se pueden desglosar por `s3_bucket`), RDS (que se pueden desglosar por `rds_instance_type`), Kinesis, ELB, Elasticache y otros [servicios de AWS][3].
- Llamadas a la API a AppEngine, Google DNS, Gmail y otros [servicios de Google Cloud][4].

Para monitorear otros puntos de conexión donde no se puede instalar un agente (como API públicas), agruepe el destino por la etiqueta [`domain`](#domain-resolution). O, consulte la sección a continuación para la resolución de servicios en la nube.

### Resolución mejorada de servicios en la nube {#cloud-service-enhanced-resolution}

Con [resolución mejorada configurada][9] para AWS o Azure, CNM filtra y agrupa el tráfico de red utilizando recursos recopilados de estos proveedores de nube. Las etiquetas disponibles varían según el proveedor de nube y el recurso. Datadog aplica automáticamente las etiquetas que se enumeran a continuación, además de cualquier etiqueta definida por el usuario.

#### Amazon Web Services {#amazon-web-services}

{{< tabs >}}
{{% tab "Balanceadores de carga" %}}
- nombre
- balanceador de carga
- arn_balanceador_de_carga
- nombre_dns (formato balanceador_de_carga/dns:)
- región
- id_cuenta
- esquema
- etiquetas personalizadas (definidas por el usuario) aplicadas a los balanceadores de carga de AWS
{{% /tab %}}

{{% tab "Puertas de enlace NAT" %}}
- id_puerta_de_enlace
- tipo_de_puerta_de_enlace
- id_puerta_de_enlace_nat_aws
- ip_publica_puerta_de_enlace_nat_aws
- cuenta_aws
- zona_de_disponibilidad
- región
- etiquetas personalizadas (de usuario) aplicadas a las puertas de enlace NAT de AWS
{{% /tab %}}

{{% tab "Puerta de enlace de Internet de VPC" %}}
- id_puerta_de_enlace
- tipo_de_puerta_de_enlace
- aws_internet_gateway_id
- aws_account
- región
- etiquetas personalizadas (de usuario) aplicadas a las puertas de enlace de Internet de VPC
{{% /tab %}}

{{% tab "Punto de enlace de VPC" %}}
- id_puerta_de_enlace
- tipo_de_puerta_de_enlace
- aws_vpc_endpoint_id
- etiquetas personalizadas (de usuario) aplicadas a los puntos de enlace de Internet de VPC
{{% /tab %}}

{{< /tabs >}}

#### Azure {#azure}

{{< tabs >}}
{{% tab "Balanceadores de carga y puertas de enlace de aplicaciones" %}}
- nombre
- balanceador de carga
- cloud_provider
- región
- type
- resource_group
- tenant_name
- subscription_name
- subscription_id
- sku_name
- etiquetas personalizadas (definidas por el usuario) aplicadas a los balanceadores de carga Azure y puertas de enlace de aplicaciones
{{% /tab %}}
{{< /tabs >}}

## Resolución de dominio {#domain-resolution}

A partir de la versión 7.17+ del Agente, el Agente resuelve IPs a nombres de dominio legibles por humanos para el tráfico externo e interno. El dominio le permite monitorear los puntos finales del proveedor de la nube donde no se puede instalar un agente de Datadog, como los buckets de S3, los balanceadores de carga de aplicaciones y las API. Nombres de dominio no reconocibles, como los dominios DGA de servidores C&C, pueden señalar amenazas a la seguridad de la red. `domain` **se codifica como una etiqueta en Datadog**, por lo que puede usarlo en consultas de la barra de búsqueda y en el panel de facetas para agregar y filtrar tráfico.

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation_2.png" alt="Agregación de dominios" >}}

**Nota**: La resolución DNS es compatible para hosts donde el sistema de sondeo se está ejecutando en el espacio de nombres de red raíz, lo que generalmente es causado por ejecutar el sistema de sondeo en un contenedor sin usar la red del host.

## Traducción de Direcciones de Red (NAT) {#network-address-translation-nat}

NAT es una herramienta utilizada por Kubernetes y otros sistemas para enrutar tráfico entre contenedores. Al investigar una dependencia específica (por ejemplo, de servicio a servicio), puede usar la presencia o ausencia de IPs pre-NAT para distinguir entre servicios nativos de Kubernetes, que realizan su propio enrutamiento, y servicios que dependen de clientes externos para el enrutamiento. Esta función no incluye la resolución de puertas de enlace NAT.

Para ver las IPs pre-NAT y post-NAT, utilice el interruptor **Mostrar IPs pre-NAT** en la configuración de la tabla. Cuando esta configuración está desactivada, las IPs mostradas en las columnas **IP del Cliente** y **IP del Servidor** son por defecto IPs post-NAT. En casos donde tiene múltiples IPs pre-NAT para una IP post-NAT, se muestran las 5 IPs pre-NAT más comunes. `pre_nat.ip` es una etiqueta como cualquier otra en el producto, por lo que puede usarla para agregar y filtrar tráfico.

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="IPs pre-NAT" >}}

## ID de Red {#network-id}

Los usuarios de CNM pueden configurar sus redes para tener espacios de IPs superpuestos. Por ejemplo, puede querer desplegar en múltiples VPCs (nubes privadas virtuales) que tienen rangos de direcciones superpuestos y se comunican solo a través de balanceadores de carga o puertas de enlace en la nube.

Para clasificar correctamente los destinos de tráfico, CNM utiliza el concepto de un ID de red, que se representa como una etiqueta. Un ID de red es un identificador alfanumérico para un conjunto de direcciones IP que pueden comunicarse entre sí. Cuando se detecta un mapeo de dirección IP a varios servidores con diferentes IDs de red, se utiliza este identificador para determinar a qué servidor particular va o proviene el tráfico de red.

En AWS y Google Cloud, el ID de red se establece automáticamente en el ID de VPC. Para otros entornos, el ID de red puede configurarse manualmente, ya sea en `datadog.yaml` como se muestra a continuación, o agregando el `DD_NETWORK_ID` al proceso y a los contenedores principales del Agent.

```yaml
network:
   Id: <your-network-id>
```


## Lectura adicional {#further-reading}

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