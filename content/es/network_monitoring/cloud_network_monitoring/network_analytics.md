---
aliases:
- /es/network_performance_monitoring/network_table
- /es/network_performance_monitoring/network_page
- /es/network_monitoring/performance/network_page
- /es/network_monitoring/performance/network_analytics
description: Explora tus datos de red entre cada fuente y destino en tu stack tecnológico.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Agilizar las investigaciones de red con una experiencia mejorada de consulta
    y mapas
- link: /network_monitoring/devices
  tag: Documentación
  text: Network Device Monitoring
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guía
  text: Detección de la disponibilidad de aplicaciones mediante información de red
title: Network Analytics
---

## Información general

La página Network Analytics proporciona información sobre el estado general de la red y muestra las [consultas recomendadas](#recommended-queries) en la parte superior de la página. Estas consultas recomendadas te permiten ejecutar consultas comunes y ver snapshots de métricas relevantes para que puedas ver cambios del rendimiento, latencia, errores DNS y más. Al hacer clic en una consulta recomendada se rellenan automáticamente la barra de búsqueda, los casos de Agrupar por y los gráficos de resumen para ofrecerte información relevante sobre tu red.

{{< img src="network_performance_monitoring/network_analytics/cnm_network_analytics_2.png" alt="Página de inicio de Network Analytics en Cloud Network Monitoring" >}}

## Consultas

Para refinar tu búsqueda y que recorra endpoints concretos, agrega y filtra tus conexiones de red **con etiquetas (tags)**. Las etiquetas de integraciones de Datadog o el [Etiquetado unificado de servicios][12] pueden utilizarse para agregar y filtrar automáticamente. Al utilizar el etiquetado en Network Monitoring, puedes aprovechar la forma en que fluye el tráfico de red a través de las zonas de disponibilidad para un servicio particular o para toda tu infraestructura. La agrupación por etiquetas `client` y `server` visualiza el flujo de red _entre_ esos dos conjuntos de etiquetas.

{{< img src="network_performance_monitoring/network_analytics/network_diagram_with_tags.png" alt="Diagrama de red que muestra cómo se ven las solicitudes cuando se agrupan por etiquetas" style="width:100%;">}}

Por ejemplo, si quieres ver el tráfico de red entre tu servicio de pedidos llamado `orders-app` y todas tus zonas de disponibilidad, utiliza `client_service:orders-app` en la barra de búsqueda, añade la etiqueta `service` en el menú desplegable **Ver clientes como** y luego utiliza la etiqueta `availability-zone` del menú desplegable **Ver servidores como** para visualizar el flujo de tráfico entre estos dos conjuntos de etiquetas:

{{< img src="network_performance_monitoring/network_analytics/network_analytics_with_client_and_server_tag.png" alt="Página de Network Analytics que muestra cómo se ven las solicitudes cuando se filtran servicios y se agrupa por zonas de disponibilidad" style="width:90%;">}}

Para obtener información sobre las rutas de tráfico de `NA/Untagged`, consulta [Tráfico no resuelto](#unresolved-traffic).

Además, el siguiente diagrama ilustra las solicitudes entrantes y salientes cuando se agrupan por las etiquetas `client` y `server`. El cliente es el lugar donde se ha originado la conexión y el servidor es el lugar donde ha terminado la conexión.

{{< img src="network_performance_monitoring/network_analytics/network_diagram2.png" alt="Diagrama de red que muestra solicitudes entrantes y salientes" style="width:100%;">}}

La siguiente captura de pantalla muestra la vista por defecto, que agrega el cliente y el servidor por la etiqueta `service`. En consecuencia, cada fila de la tabla representa conexiones agregadas de servicio-a-servicio cuando se agregan durante un periodo de tiempo de una hora. Selecciona "Tráfico autoagrupado" para ver el tráfico agrupado en varias etiquetas de uso común, como `service`, `kube_service`, `short_image` y `container_name`.

{{< img src="network_performance_monitoring/network_analytics/cnm_default_view_2.png" alt="Vista de CNM por defecto con menús desplegables que muestran clientes y servidores de vistas como tráfico autoagrupado" style="width:90%;">}}

El siguiente ejemplo muestra todas las conexiones agregadas desde direcciones IP que representan servicios en la región `us-east-1` para las zonas de disponibilidad:

{{< img src="network_performance_monitoring/network_analytics/cnm_flow_table_region_2.png" alt="Tabla de conexiones agregadas filtrada" style="width:90%;">}}

Puedes agregar más para aislar el tráfico en el que el cliente o el servidor coincide con un CIDR que utiliza `CIDR(network.client.ip, 10.0.0.0/8)` o `CIDR(network.server.ip, 10.0.0.0/8)`.

Además, define el periodo de tiempo durante el cual se agrega el tráfico utilizando el selector de tiempo situado en la parte superior derecha de la página:

{{< img src="network_performance_monitoring/network_analytics/npm_timeframe.png" alt="CNM de periodo de tiempo" style="width:30%;">}}

### Consultas recomendados

{{< img src="network_performance_monitoring/network_analytics/recommended_queries_2.png" alt="Página de Network Analytics en Datadog que muestra tres consultas recomendadas">}}

Las consultas recomendadas te permiten empezar a investigar tu red, tanto si lo haces para solucionar un problema específico como para obtener una mejor comprensión general de tu red. Las consultas recomendadas te ayudan a encontrar rápidamente información relevante sobre la red sin necesidad de buscar según ciertos atributos o de agrupar el tráfico. Por ejemplo, la consulta recomendada `Find dependencies of service: web-store` rellena la barra de búsqueda con la consulta `client_service: web-store` y muestra los principales servicios a los que la tienda de servicios web está enviando tráfico dentro de red y, por lo tanto, sus dependencias descendentes.

Todas las consultas recomendadas disponibles aparecen en la parte superior de la página Analytics y hay tres consultas recomendadas en la parte superior de la [página DNS][10]. Utiliza estas consultas para acceder a los datos más utilizados y ver los cambios que se han producido en ellos durante la última hora.

Para ejecutar una consulta recomendada, haz clic en el cuadro. Si pasas el ratón por encima del cuadro, aparecerá una descripción y un resumen de los datos devueltos por la consulta.

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="Vista detallada de una consulta recomendada que muestra una descripción e información sobre la consulta, con cuatro dimensiones de consulta: Buscar por, Ver clientes como, Ver servidores como y Visualizar como" style="width:80%;">}}

### Paneles de facetas

Puedes utilizar los paneles de facetas para navegar por todas los etiquetas disponibles en tus flujos o filtrar el tráfico cuando no recuerdes las etiquetas exactas que buscabas. Los paneles de facetas reflejan las etiquetas en tu consulta de la barra de búsqueda. Cambia entre los paneles de facetas con las pestañas **Cliente** y **Servidor** en la parte superior:

{{< img src="network_performance_monitoring/network_analytics/destination_panel2.png" alt="Panel de destino" style="width:20%;">}}

#### Facetas personalizadas

Agrega y filtra tus datos de tráfico utilizando cualquier etiqueta de la página de Network Analytics. Podrás encontrar una lista de etiquetas incluidas en la parte izquierda de la pantalla, en las etiquetas **Cliente** y **Servidor**, y en los menús desplegables **Ver clientes como** y **Ver servidores como**.

{{< img src="network_performance_monitoring/network_analytics/drop_down_cnm.png" alt="Menú desplegable de la página Network Analytics que muestra la lista de facetas" style="width:90%;">}}

Las etiquetas de la lista incluidas son `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip` y `port`, entre otras. Si quieres agregar o filtrar el tráfico utilizando una etiqueta que ya no está en el menú, añádela como una faceta personalizada:

1. Selecciona el botón **+ Add** (+ Añadir) en la parte superior derecha de los paneles de facetas.
2. Introduce la etiqueta pertinente de la que quieres crear una faceta personalizada.
3. Haz clic en **Add** (Añadir).

Una vez creada la faceta personalizada, utiliza la etiqueta para filtrar y agregar tráfico en la página de Network Analytics y en el mapa de red. Todas las facetas personalizadas se pueden ver en la sección inferior `Custom` de los paneles de facetas.

### Búqueda con comodines
Para realizar una búsqueda con un comodín de varios caracteres, utiliza el símbolo `*` como se indica a continuación:

- `client_service:web*` coincide con todos los servicios de clientes que empiezan con web.
- `client_service:web*` coincide con todos los servicios de clientes que terminan con web.
- `client_service:*web*` coincide con todos los servicios de clientes que contienen la cadena web.

Las búsquedas con comodines funcionan dentro de las facetas con esta sintaxis. Esta consulta devuelve todos los servicios de clientes que terminan con la cadena "mongo":

`client_service:*mongo`

Para obtener más información, consulta la documentación sobre [sintaxis de búsqueda][1].

### Agrupar por

Los grupos te permiten agrupar tus datos por un determinado valor de etiqueta. Por ejemplo, si seleccionas una agrupación como **host**, los resultados se agrupan por hosts individuales. También puedes elegir ver todos tus datos en un solo grupo utilizando la opción **Tráfico sin agrupar**. Además, es posible que tengas grandes cantidades de datos que no estén etiquetados por la agrupación que te interesa. En estas situaciones, puedes utilizar **Tráfico autoagrupado** para agrupar los datos por cualquier etiqueta que esté disponible.

Si quieres investigar las conexiones de todos tus hosts en una única agrupación, añade la etiqueta `host` en el desplegable **Ver clientes como** y añade `Ungrouped traffic` en el desplegable **Ver servidores como**. 

{{< img src="network_performance_monitoring/network_analytics/cnm_un-grouped.png" alt="Página de análisis NPM con clasificación por host y agrupación por Tráfico sin agrupar" style="width:90%;">}}

Si tienes tráfico que no está etiquetado por un grupo específico, puedes seleccionar **Tráfico autoagrupado** para agrupar los datos utilizando cualquier etiqueta disponible. Por ejemplo, para ver qué etiquetas están disponibles para un `service` específico, utiliza la etiqueta `service` del desplegable **Ver clientes como** y añade `Auto-grouped traffic` en el desplegable **Ver servidores como**:

{{< img src="network_performance_monitoring/network_analytics/cnm_auto-grouped.png" alt="Página de análisis NPM con clasificación por etiquetas de servicios" style="width:90%;">}}

La opción **Tráfico autoagrupado** puede ayudarte a identificar el origen de tus etiquetas. Por ejemplo, si pasas el ratón por encima de los iconos individuales, aparecerá un tooltip que indica el origen de la etiqueta:

{{< img src="network_performance_monitoring/network_analytics/npm_icon_tooltip.png" alt="Pasando el ratón por encima del icono tooltip para mostrar el origen de una etiqueta" style="width:90%;">}}

El uso conjunto de la barra de búsqueda y la función Agrupar por resulta útil para aislar aún más tu tráfico de red. Por ejemplo, para encontrar todo el tráfico de tu servicio `auth-dotnet` en todos los centros de datos, introduce `service:auth-dotnet` en la barra de búsqueda y selecciona `datacenter` en el desplegable **Ver clientes como**:

{{< img src="network_performance_monitoring/network_analytics/search_bar_with_groupby_2.png" alt="Uso de la opción Agrupar hoy con el campo de búsqueda" style="width:90%;">}}

### Etiquetas neutras

Las etiquetas neutras no son específicas de un cliente o servidor, sino que se aplican a todo un flujo. Puedes buscar y filtrar el tráfico con estas etiquetas neutras. Por ejemplo, puedes utilizar estas etiquetas para filtrar el tráfico cifrado mediante TLS.

{{< img src="network_performance_monitoring/network_analytics/cnm_using_neutral_tags.png" alt="Captura de pantalla que muestra cómo buscar etiquetas neutras, con un ejemplo de búsqueda de tráfico 'cifrado_tls" style="width:90%;">}}

La siguiente lista muestra etiquetas neutras disponibles para su uso:

| Etiqueta                     | Descripción                                                                                   |
|-------------------------|-----------------------------------------------------------------------------------------------|
| `is_agent_traffic`        | Indica si el tráfico ha sido generado por el Datadog Agent.                             |
| `tls_encrypted`           | Especifica si la conexión está cifrada mediante TLS.                                           |
| `tls_cipher_suite`        | Identifica el conjunto de cifrado TLS específico utilizado (por ejemplo, `tls_ecdhe_rsa_with_aes_128_gcm_sha256`).  |
| `tls_cipher_insecure`     | Identifica si el cifrado utilizado en la conexión se considera generalmente seguro o no.  |
| `tls_version`             | La versión de TLS negociada y utilizada por la conexión (`tls_1.2` o `tls_1.3`).            |
| `tls_client_version`      | Las versiones de TLS compatibles con el cliente (`tls_1.2` o `tls_1.3`).                      |
| `gateway_id`              | Identificador único del recurso de pasarela AWS.                                               |
| `gateway_type`            | Especifica el tipo de pasarela AWS (Internet, NAT o Transit).                             |
| `gateway_region`          | La región AWS en la que está desplegada la pasarela (por ejemplo, `us-east-1`).                            |
| `gateway_availability-zone` | La zona de Disponibilidad que aloja la pasarela (por ejemplo, `us-east-1a`).                               |
| `gateway_public_ip`       | La dirección IP pública asignada a la pasarela NAT.                                                |
| `tgw_attachment_id`       | Identificador único de la conexión de AWS Transit Gateway.                                     |
| `tgw_attachment_type`     | Tipo de conexión de AWS Transit Gateway (por ejemplo, VPC, VPN o Direct Connect).                  |
| `vpc_endpoint_id`         | Identificador único del endpoint de la VPC.                                                       |

## Gráficos de resumen

Los gráficos de resumen son una vista condensada de tu red, que puedes modificar para mostrar el volumen, el rendimiento, las conexiones o la latencia, según sea necesario. Visualiza hasta tres gráficos de resumen a la vez y cambia los datos y el tipo de visualización para adaptarlos a tu organización. Para actualizar la fuente de datos de un gráfico, haz clic en el título del gráfico y selecciona una opción del menú desplegable.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="Sección del gráfico de resumen de la página Network Analytics que muestra las opciones filtrado de datos disponibles: Volumen enviado, Rendimiento enviado, Volumen recibido, Rendimiento recibido, Conexiones establecidas, Conexiones finalizadas, Conexiones establecidas/segundo, Conexiones finalizadas/segundo y Latencia TCP" style="width:80%;">}}

Para cambiar el tipo de visualización, haz clic en el icono del lápiz situado en la esquina superior derecha del gráfico. Selecciona una de las opciones disponibles, como se muestra en la siguiente captura de pantalla.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="Opciones de visualización de un gráfico de resumen que muestra las opciones de ajuste Eje Y, Escala lineal, Log, Pow y Sqrt, y de ajuste Tipo con área, Barras, Lista principal, Cambios y Gráfico circular" style="width:80%;">}}

Para ocultar un gráfico concreto, haz clic en el icono de ocultar situado junto al icono del lápiz. Puedes visualizar un solo gráfico o hasta tres. Para añadir gráficos, haz clic en el icono más `+` a la derecha del gráfico de resumen y seleccione el gráfico que quieres añadir. También puedes restablecer los gráficos predeterminados al añadir un nuevo gráfico.

{{< img src="network_performance_monitoring/network_analytics/summary_graphs_reset_graphs.png" alt="La sección de gráficos d resumen que muestra las opciones Añadir gráficos y Restaurar gráficos" style="width:80%;">}}

## Datos de red

{{< img src="network_performance_monitoring/network_analytics/network_data2.png" alt="Datos de red" style="width:90%;" >}}

Tus métricas de red se visualizan a través de los gráficos y la tabla asociada. Todas las métricas enviadas y recibidas se muestran desde la perspectiva de la fuente:

* **Métricas enviadas**: miden el valor de algo desde la _fuente_ hasta el _destino_ desde la perspectiva de la fuente.
* **Métricas recibidas**: miden el valor de algo desde el _destino_ hasta la _fuente_ desde la perspectiva de la fuente.

Los valores mostrados pueden ser diferentes para `sent_metric(source to destination)` y `received_metric(destination to source)` si hay un gran número de pérdidas de paquetes. En este caso, si `destination` envía muchos bytes a la `source`, las conexiones agregadas que se originan en `destination` incluyen esos bytes, pero las conexiones agregadas que se originan en la `source` no los ven como recibidos.

**Nota:** Los datos se recopilan cada 30 segundos, se agregan en buckets de cinco minutos y se conservan durante 14 días.

### Métricas

#### Carga de red

Están disponibles las siguientes métricas de carga de red:

| Métrica          |  Descripción                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volumen**      | Número de bytes enviados o recibidos durante un periodo, medidos en bytes (u órdenes de magnitud de los mismos) bidireccionales.                           |
| **Rendimiento**  | La tasa de bytes enviados o recibidos durante un periodo, medidos en bytes por segundo, bidireccionales.                                                  |

#### TCP

TCP es un protocolo orientado a la conexión que garantiza la entrega en orden de los paquetes. 

Están disponibles las siguientes métricas TCP: 

| Métrica | Descripción |
|---|---|
| **Retransmisiones TCP** | Las retransmisiones TCP representan los fallos detectados que se retransmiten para garantizar la entrega, medidas como recuento de retransmisiones del cliente. |
| **Latencia TCP** | Medida como tiempo de ida y vuelta suavizado por TCP, es decir, el tiempo transcurrido entre el envío y el acuse de recibo de un marco TCP. |
| **Jitter TCP** | Medido como variación del tiempo de ida y vuelta suavizada por TCP. |
| **Tiempos de espera TCP**  | Número de conexiones TCP que han expirado desde la perspectiva del sistema operativo. Esto puede indicar problemas generales de conectividad y latencia.  |
| **Rechazos de TCP**  | Número de conexiones TCP rechazadas por el servidor. Normalmente esto indica un intento de conexión a una IP/puerto que no está recibiendo conexiones o una mala configuración de cortafuegos/seguridad. |
| **Reinicios de TCP**  | Número de conexiones TCP reiniciadas por el servidor.  |
| **Conexiones establecidas** | Número de conexiones TCP en estado establecido, medidas en conexiones por segundo del cliente. |
| **Conexiones finalizadas** | Número de conexiones TCP en estado finalizado, medidas en conexiones por segundo del cliente. |

Todas las métricas se instrumentan desde la perspectiva del lado del `client` de la conexión, cuando está disponible, o del servidor en caso contrario.

### Detección automática de servicios en la nube

Si dependes de servicios gestionados en la nube como S3 o Kinesis, puedes monitorizar el rendimiento del tráfico a esos servicios desde tus aplicaciones internas. Delimita tu vista a una dependencia particular de AWS, Google Cloud o Azure para localizar la latencia, evaluar el rendimiento de la base de datos y visualizar tu red de forma más completa.

{{< img src="network_performance_monitoring/network_analytics/cloud-service-hero-docs2.png" alt="Mapa de servicios en la nube" >}}

Por ejemplo puedes:

- Visualizar el flujo de datos desde tu clúster Kubernetes interno a `server_service:aws.s3` en el [Mapa de red][2].
- Cambiar a la [página de red](#table) para aislar los pods que están estableciendo el mayor número de conexiones a ese servicio.
- Validar que su solicitud tuvo éxito, analizando métricas del rendimiento de S3 que se correlacionan con el rendimiento del tráfico, directamente en el panel lateral de una dependencia determinada, en la pestaña *Métricas de integraciones*.

CNM asigna automáticamente:

- Llamadas de red a S3 (que pueden desglosarse por `s3_bucket`), RDS (que pueden desglosarse por `rds_instance_type`), Kinesis, ELB, Elasticache y otros [servicios AWS][3].
- Llamadas de API a AppEngine, Google DNS, Gmail y otros [servicios Google Cloud][4].

Para monitorizar otros endpoints en los que no se pueda instalar un Agent (como las API públicas), agrupa el destino en el Resumen de red utilizando la [etiqueta `domain`](#domain-resolution) o consulta la siguiente sección sobre la resolución de servicios en la nube.

### Resolución mejorada de servicios en la nube
Si dispones de la resolución mejorada [configurada][9] para AWS o Azure, CNM puede filtrar y agrupar el tráfico de red con varios recursos recopilados de estos proveedores de nube. En función del proveedor de nube y del recurso, dispones de diferentes conjuntos de etiquetas para realizar consultas. Datadog aplica las etiquetas definidas a continuación, además de las etiquetas definidas por el usuario.

 #### Amazon Web Services
 {{< tabs >}}
 {{% tab "Loadbalancers" %}}
 - nombre
 - balanceador de carga
 - balanceador_de_carga_arn
 - nombre-dns (formato loadbalancer/dns:)
 - región
 - id_de_cuenta
 - esquema
 - etiquetas personalizadas (definidas por el usuario) aplicadas a balanceadores de carga AWS
 {{% /tab %}}

 {{% tab "Pasarelas NAT" %}}
 - id_de_pasarela
 - tipo_de_pasarela
 - id_de_pasarela_nat_aws
 - id_pública_de_pasarela_nat_aws
 - cuenta_aws
 - zona de disponibilidad
 - región
 - etiquetas personalizadas (definidas por el usuario) aplicadas a pasarelas Nat AWS
 {{% /tab %}}

 {{% tab "VPC Internet Gateway" %}}
 - id_de_pasarela
 - tipo_de_pasarela
 - id_de_pasarela_internet_aws
 - cuenta_aws
 - región
 - etiquetas personalizadas (definidas por el usuario) aplicadas a pasarelas de Internet AWS
 {{% /tab %}}

{{% tab "VPC Endpoint" %}}
 - id_de_pasarela
 - tipo_de_pasarela
 - id_endpoint_vpc_aws
 - etiquetas personalizadas (definidas por el usuario) aplicadas a endpoints de Internet VPC
 {{% /tab %}}

 {{< /tabs >}}

#### Azure
##### Balanceadores de carga y pasarelas de aplicaciones
 - nombre
 - balanceador de carga
 - cloud_provider
 - región
 - tipo
 - grupo_de_recursos
 - nombre_de_arrendatario
 - nombre_de_suscripción
 - id_de_suscripción
 - nombre_de_sku
 - etiquetas personalizadas (definidas por el usuario) aplicadas a balanceadores de carga y pasarelas de aplicaciones Azure


### Resolución de dominio

A partir del Agent v7.17 y posteriores, el Agent resuelve las IP como nombres de dominio legibles por humanos para el tráfico externo e interno. El dominio te permite monitorizar endpoints de proveedores de nube en los que no se puede instalar un Datadog Agent, como buckets S3, balanceadores de carga de aplicaciones y API. Los nombres de dominio irreconocibles, como los dominios DGA de servidores C&C, pueden apuntar a amenazas de seguridad de la red. El `domain` **está codificado como etiqueta en Datadog**, por lo que puedes utilizarlo en las consultas de la barra de búsqueda y en el panel de facetas para agregar y filtrar el tráfico.

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation_3.png" alt="Agregado de dominios" >}}

**Nota**: La resolución DNS es compatible con hosts en los que la sonda del sistema se ejecuta en el espacio de nombres de la red raíz. Esto suele deberse a la ejecución de la sonda del sistema en un contenedor sin utilizar la red del host.

### Network Address Translation (NAT)

NAT es una herramienta utilizada por Kubernetes y otros sistemas para enrutar el tráfico entre contenedores. Cuando se investiga una dependencia específica (por ejemplo, servicio a servicio), se puede utilizar la presencia o ausencia de las IP pre-NAT para distinguir entre servicios nativos en Kubernetes, que se encargan de su propio enrutamiento, y servicios que dependen de clientes externos para el enrutamiento. Actualmente, esta función no incluye la resolución de pasarelas NAT.

Para ver las IP pre-NAT y post-NAT, utiliza el conmutador **Mostrar las IP pre-NAT** en la configuración de la tabla. Cuando esta opción está desactivada, las IP mostradas en las columnas **IP de cliente** y **IP de servidor** son por defecto IP post-NAT. En los casos en los que tengas varias IP pre-NAT para una IP post-NAT, se mostrarán las 5 IP pre-NAT más frecuentes. `pre_nat.ip` es una etiqueta como cualquier otra etiqueta del producto, por lo que puedes utilizarla para agregar y filtrar tráfico.

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="IP pre-NAT" >}}

### ID de red

Los usuarios de CNM pueden configurar sus redes para que tengan espacios de IP superpuestos. Por ejemplo, es posible que quieras desplegar en varias VPC (nubes privadas virtuales) que tienen rangos de direcciones superpuestas y sólo se comunican a través de balanceadores de carga o pasarelas de nube.

Para clasificar correctamente los destinos del tráfico, CNM utiliza el concepto de ID de red, que está representado como una etiqueta. Un ID de red es un identificador alfanumérico para un conjunto de direcciones IP que pueden comunicarse entre sí. Cuando se detecta la asignación de una dirección IP a varios hosts con diferentes ID de red, este identificador se utiliza para determinar el tráfico de red de ese host particular del que sale o llega.

En AWS y Google Cloud, el ID de red se define automáticamente en el ID de la VPC. Para otros entornos, el ID de red puede definirse manualmente, ya sea en `datadog.yaml`, como se muestra a continuación, o añadiendo el `DD_NETWORK_ID` al proceso o a los contenedores principales del Agent.

  ```yaml
  network:
     Id: <your-network-id>
  ```

### Vistas guardadas

Organiza y comparte vistas de los datos de tráfico. Las vistas guardadas agilizan la depuración y fortalecen la colaboración. Por ejemplo, puedes crear una vista, guardarla para futuras consultas frecuentes y copiar su enlace para compartir datos de red con tus compañeros de equipo.

{{< img src="network_performance_monitoring/network_analytics/cnm_saved_views.png" alt="Vistas de Cloud Network Monitoring guardadas" >}}

- Para guardar una vista: haz clic en el botón *+ Save* (+ Guardar) y colócale un nombre a la vista para registrar tus selecciones actuales de consultas, configuración de tablas y métricas de gráficos.
- Para cargar una vista: haz clic en *Views* (Vistas) en la parte superior izquierda para ver tus vistas guardadas y seleccionar una vista en la lista.
- Para cambiar el nombre de una vista: pasa el ratón por encima de una vista en la lista de vistas guardadas y haz clic en el icono del engranaje para *Editar el nombre*.
- Para compartir una vista: pasa el ratón por encima de una vista en la lista de vistas guardadas y haz clic en el icono del de enlace para *Copiar permalink*.

Para obtener más información, consulta la documentación [Vistas guardadas][5].


## Tabla

La tabla de red desglosa las métricas de _Volumen_, _Rendimiento_, _Retransmisiones TCP_, _Tiempo de ida y vuelta (RTT)_ y _Variación RTT_. entre cada _fuente_ y _destino_ definidos por tu consulta.

{{< img src="network_performance_monitoring/network_analytics/network_table2.png" alt="Tabla de datos" >}}

Puedes configurar las columnas de tu tabla utilizando el botón `Customize` (Personalizar) situado en la parte superior derecha de la tabla.

Configura el tráfico mostrado con el botón `Filter Traffic` (Filtrar tráfico).

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggles_v2.png" alt="Detalles del flujo" style="width:80%;">}}

El tráfico externo (a las IP públicas) y el tráfico del Datadog Agent se muestran por defecto. Para delimitar la vista, puedes desactivar los conmutadores `Show Datadog Traffic` (Mostrar tráfico de Datadog) y `Show External Traffic` (Mostrar tráfico externo).

### Tráfico no resuelto

Las etiquetas de clientes y servidores no resueltos se marcan como `N/A`. El tráfico de un cliente o el endpoint del servidor pueden quedar sin resolver porque:

* El cliente del host o contenedor o las API del servidor no se etiquetan con las etiquetas del cliente o del servidor utilizadas para el agregado de tráfico.
* El endpoint está fuera de tu red privada y, por lo tanto, no está etiquetado por el Datadog Agent.
* El endpoint es un cortafuegos, una malla de servicios u otra entidad en la que no se puede instalar un Datadog Agent.

Utiliza el conmutador **Show N/A (Unresolved Traffic)** (Mostrar N/A (Tráfico no resuelto)) en la esquina superior derecha de la tabla de datos para filtrar las conexiones agregadas con clientes o servidores no resueltos (`N/A`).

Selecciona cualquier fila de la tabla de datos para ver los logs, las trazas (traces) y los procesos asociados de una determinada conexión agregada **cliente** <=> **servidor**:

{{< img src="network_performance_monitoring/network_analytics/flow_details.png" alt="Detalles de conexiones agregadas" style="width:80%;">}}

### Cambiar a una ruta de red

Pasa el ratón por encima de una fila de la tabla de análisis para cambiar a una [ruta de red][11] y ver las rutas entre el origen y el destino especificadas en CNM.

{{< img src="network_performance_monitoring/network_analytics/view_network_path_2.png" alt="Ejemplo en el que se pasa el ratón por encima de una fila de la tabla Análisis para mostrar el conmutador Ruta de red" style="width:90%;">}}

## Panel lateral

El panel lateral proporciona telemetría contextual para ayudarte a depurar las dependencias de red. Utiliza las pestañas Flujos, Logs, Trazas, Procesos, para determinar si un elevado nivel de retransmisiones o de latencia en el tráfico entre dos endpoints se debe a:
- Picos en el volumen de tráfico desde un puerto o IP específico.
- Procesos pesados que consumen la CPU o la memoria del endpoint de destino.
- Errores de aplicación en el código del endpoint cliente.

{{< img src="network_performance_monitoring/network_analytics/npm_sidepanel2.png" alt="Detalles del flujo" style="width:80%;">}}

### Etiquetas frecuentes

La parte superior del panel lateral muestra las etiquetas de cliente y servidor frecuentes, compartidas por las conexiones más recientes de la dependencia inspeccionada. Utiliza las etiquetas frecuentes para obtener contexto adicional sobre un endpoint defectuoso. Por ejemplo, cuando se solucionan problemas de comunicación latente de un servicio particular, las etiquetas de destino muestran siguiente:
- Contexto granular como contenedor, tarea o host hacia los que fluye el tráfico.
- Contexto más amplio, como la zona de disponibilidad, la cuenta del proveedor de la nube o el despliegue en el que se ejecuta el servicio.

### Seguridad

La pestaña **Seguridad** destaca las posibles amenazas de red y los hallazgos detectados por [amenazas de Cloud Security Management][6] y [configuraciones erróneas de Cloud Security Management][7]. Estas señales se generan cuando Datadog detecta una actividad de red que coincide con una [regla de detección o cumplimiento][8] o si existen otras amenazas y configuraciones erróneas relacionadas con el flujo de red seleccionado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/search_syntax/
[2]: /es/network_monitoring/cloud_network_monitoring/network_map/
[3]: /es/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/
[4]: /es/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/
[5]: /es/logs/explorer/saved_views/
[6]: /es/security/threats/
[7]: /es/security/cloud_security_management/misconfigurations/
[8]: /es/security/detection_rules/
[9]: /es/network_monitoring/cloud_network_monitoring/setup/#enhanced-resolution
[10]: /es/network_monitoring/dns/#recommended-queries
[11]: /es/network_monitoring/network_path
[12]: /es/getting_started/tagging/unified_service_tagging/