---
aliases:
- /es/network_monitoring/devices/netflow/
further_reading:
- link: https://www.datadoghq.com/architecture/hybrid-cloud-network-observability/
  tag: Centro de arquitectura
  text: Arquitectura de referencia para la observabilidad de red híbrida multinube
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Uso de perfiles con Network Device Monitoring
- link: /network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
  tag: Documentación
  text: Configuración de pruebas dinámicas para NetFlow
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: Blog
  text: Haga un seguimiento de los datos de tráfico de NetFlow con Datadog
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Haga un seguimiento y un diagnóstico de problemas de rendimiento de la red
    con capturas SNMP
- link: https://www.datadoghq.com/blog/understanding-netflow-duplication/
  tag: Blog
  text: 'Comprensión de la duplicación de NetFlow: por qué sucede y cómo deduplicarla'
title: NetFlow Monitoring
---
## Descripción general {#overview}

La vista de NetFlow en Network Device Monitoring proporciona visibilidad de los flujos de tráfico de red recopilados de dispositivos que exportan datos de flujo (por ejemplo, enrutadores, firewalls o interruptores). Puede analizar el volumen de tráfico, identificar a los principales emisores y comprender cómo se mueven los datos a través de su red.

La vista de NetFlow muestra métricas de tráfico agregadas por dispositivo e interfaz. Úsela para identificar qué dispositivos o interfaces están consumiendo la mayor cantidad de ancho de banda, generando la mayor cantidad de paquetes o contribuyendo a los picos de tráfico.

{{< img src="network_device_monitoring/netflow/netflow.png" alt="La página de NetFlow Monitoring que contiene una leyenda plegable para el volumen de tráfico, el estado del dispositivo, los flujos y más." style="width:100%;" >}}

## Navegación lateral {#side-navigation}

Utilice la navegación de la izquierda para explorar vistas adicionales de NetFlow:

- {{< ui >}}Traffic Volume{{< /ui >}}: Métricas generales de flujo por dispositivo e interfaz.
- {{< ui >}}Device Health{{< /ui >}}: Estado y utilización de los dispositivos monitoreados.
- {{< ui >}}Flows{{< /ui >}}: Registros detallados de flujos individuales.
- {{< ui >}}Conversations{{< /ui >}}: Pares de fuente-destino agregados.
- {{< ui >}}Autonomous Systems{{< /ui >}}: Datos de flujo agrupados por números de sistema autónomo (ASN).
- {{< ui >}}Geo IP{{< /ui >}}: Datos de flujo agrupados por fuente/destino geográfico.
- {{< ui >}}Source Ports / Destination Ports / Protocols / Flags{{< /ui >}}: Desglose del tráfico por metadatos de paquetes.

## Instalación {#installation}

Para usar NetFlow Monitoring con Network Device Monitoring, asegúrese de usar la versión 7.45 o más reciente del [Agent][1].

**Nota:** Configurar [la recopilación de métricas de Network Device Monitoring][2] no es un requisito para enviar datos de NetFlow, aunque se recomienda encarecidamente, ya que estos datos adicionales pueden utilizarse para enriquecer sus registros de flujo con información como el nombre, el modelo y el proveedor del dispositivo, así como el nombre de la interfaz de entrada/salida.

## Configuración {#configuration}

Para configurar sus dispositivos para enviar tráfico NetFlow, jFlow, sFlow o IPFIX al servidor NetFlow del Agent, sus dispositivos deben estar configurados para enviar tráfico a la dirección IP en la que está instalado el Datadog Agent, específicamente el `flow_type` y el `port`.

1. Edite su archivo de configuración del Agent [`datadog.yaml`][3] para habilitar NetFlow:

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9   # choices: netflow5, netflow9, ipfix, sflow5
        port: 2055            # devices need to be configured to the same port number
      - flow_type: netflow5
        port: 2056
      - flow_type: ipfix
        port: 4739
      - flow_type: sflow5
        port: 6343
    ## Set to true to enable reverse DNS enrichment of private source and destination IP addresses in NetFlow records
    reverse_dns_enrichment_enabled: false
```

2. Después de guardar sus cambios, [reinicie el Agent][4].

   **Nota**: Asegúrese de que sus [reglas de firewall][9] permitan el tráfico UDP entrante en los puertos configurados.

## Agregación {#aggregation}

El Datadog Agent agrega automáticamente los datos recibidos en NetFlow para limitar la cantidad de registros enviados a la plataforma mientras mantiene la mayor parte de la información. De forma predeterminada, los flujos que tienen los mismos identificadores, como `source`, `destination address`, `port` y `protocol`, se agregan juntos en intervalos de cinco minutos. Además, el Datadog Agent puede detectar puertos efímeros y eliminarlos. Como resultado, es posible que vea flujos con `port:*`.

## Enriquecimiento {#enrichment}

Sus datos de NetFlow son procesados por el backend de Datadog y enriquecidos con los metadatos disponibles de sus dispositivos e interfaces. El enriquecimiento se basa en la IP del exportador de NetFlow y los índices de las interfaces. Para eliminar posibles ambigüedades entre colisiones de IPs privadas reutilizadas, puede configurar un `namespace` diferente para cada archivo de configuración del Agent (con el ajuste `network_devices.namespace`).

Si la IP del exportador de NetFlow es una de las IPs del dispositivo, pero no la configurada en la integración de SNMP, Datadog intenta localizar el dispositivo al que pertenece la IP del exportador y enriquece sus datos de NetFlow con él, siempre y cuando la coincidencia sea única.

### Enriquecimiento de IP {#ip-enrichment}

Datadog admite los siguientes tipos de enriquecimiento de IP.

#### Enriquecimiento de IP personalizado {#custom-ip-enrichment}

Puede agregar enriquecimientos personalizados para asignar IP y CIDR a etiquetas personalizadas (por ejemplo, para categorizar servicios que se ejecutan en direcciones IP específicas). El enriquecimiento de IP personalizado permite a los ingenieros de red y a sus equipos interpretar y consultar los datos de NetFlow con nombres legibles por humanos.

Vaya a [{{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}NetFlow{{< /ui >}} > {{< ui >}}IP Enrichment{{< /ui >}}][10], luego haga clic en {{< ui >}}\+ Add Enrichment{{< /ui >}} para cargar un archivo CSV de asignaciones.

Para agregar una sola asignación manualmente, haga clic en la flecha hacia abajo junto a {{< ui >}}\+ Add Enrichment{{< /ui >}} y seleccione {{< ui >}}Single Entry{{< /ui >}}.

Para establecer el nombre de la aplicación para los flujos hacia o desde una dirección IP, agregue una etiqueta `application_name` a la asignación (por ejemplo, `application_name:client_device`). Las asignaciones de IP personalizadas tienen prioridad sobre todas las demás fuentes de nombres de aplicaciones. Para ver el orden completo, consulte la sección [Asignación de nombre de aplicación](#application-name-assignment).

#### Enriquecimiento de IP privada de DNS inverso {#reverse-dns-private-ip-enrichment}

El enriquecimiento de IP privada de DNS inverso agrega nombres de servidor a sus registros de NetFlow. Cuando lo habilita, el Agent realiza búsquedas de DNS inverso en las direcciones IP de origen y destino en rangos de direcciones privadas y agrega los nombres de servidor correspondientes a los registros de flujo.

El enriquecimiento de DNS inverso está deshabilitado de forma predeterminada. Para habilitarlo, configure `reverse_dns_enrichment_enabled: true` en `network_devices.netflow` en su archivo [`datadog.yaml`][3], luego [reinicie el Agent][4]. Para ver el ejemplo de configuración completo, consulte la sección [Configuración](#configuration).

Para filtrar flujos por nombre de servidor:

1. Vaya a la [página de NetFlow][5].
2. Haga clic en {{< ui >}}\+ Filter{{< /ui >}}.
3. Seleccione {{< ui >}}Source Reverse DNS Hostname{{< /ui >}} o {{< ui >}}Destination Reverse DNS Hostname{{< /ui >}}.

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="Menú de filtro mejorado para mostrar las facetas de destino y fuente de DNS inverso" width="100%" >}}

**Nota**: Las entradas de DNS inverso se almacenan en caché y están sujetas a limitación de velocidad para minimizar las consultas de DNS y reducir la carga en los servidores DNS. Para obtener más opciones de configuración, incluida la modificación del almacenamiento en caché predeterminado y la limitación de velocidad, consulte la sección `reverse_dns_enrichment` del [archivo de configuración de ejemplo del Agent][7].

#### Enriquecimiento de IP de proveedor de nube {#cloud-provider-ip-enrichment}

Datadog enriquece las IPs con el servicio y la región del proveedor de nube pública para direcciones IPv4, de modo que pueda filtrar los registros de flujo de un servicio y una región específicos.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="Menú de filtro de NetFlow que muestra el nombre del proveedor de nube, la región y el servicio" width="100%" >}}

### Enriquecimiento de puertos {#port-enrichment}

Datadog admite los siguientes tipos de enriquecimiento de puertos.

#### Enriquecimiento de puertos predeterminado {#default-port-enrichment}

Datadog enriquece los puertos en NetFlow con datos de IANA (Internet Assigned Numbers Authority) para resolver asignaciones de puertos conocidos (como Postgres en 5432 y HTTPS en 443).

#### Enriquecimiento de puertos personalizado {#custom-port-enrichment}

Puede agregar enriquecimientos personalizados para asignar puertos y protocolos a aplicaciones específicas (por ejemplo, si un servicio personalizado se ejecuta en un puerto específico). El enriquecimiento de puertos personalizado permite a los ingenieros de red y a sus equipos interpretar y consultar los datos de NetFlow con nombres legibles por humanos.

Vaya a [{{< ui >}}Network Devices{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}NetFlow{{< /ui >}} > {{< ui >}}Port Enrichment{{< /ui >}}][13], luego haga clic en {{< ui >}}\+ Add Enrichment{{< /ui >}} para cargar el archivo CSV que contiene sus enriquecimientos personalizados.

### Inspección profunda de paquetes {#deep-packet-inspection}

**Nota**: La inspección profunda de paquetes requiere la versión 7.86.0 o posterior del Agent.

Con la inspección profunda de paquetes (DPI), su dispositivo de red identifica la aplicación para cada flujo inspeccionando su tráfico, en lugar de que Datadog infiera la aplicación a partir del número de puerto. Datadog no inspecciona las cargas útiles de los paquetes. El Agent lee la aplicación que el dispositivo clasificó (usando Cisco NBAR2 o Palo Alto Networks App-ID) a partir de registros NetFlow v9 o IPFIX.

DPI no requiere que asigne manualmente direcciones IP o puertos a aplicaciones. Para usar DPI, configure tanto el Datadog Agent como su dispositivo de red.

#### Configure el Agent {#configure-the-agent}

En su archivo [`datadog.yaml`][3], establezca `enable_dpi: true` en cada receptor que reciba flujos de un dispositivo habilitado para DPI. DPI solo es compatible con los receptores `netflow9` y `ipfix`. DPI no es compatible con los receptores `netflow5` o `sflow5`.

```yaml
network_devices:
  netflow:
    enabled: true
    listeners:
      - flow_type: netflow9
        port: 2055
        enable_dpi: true
      - flow_type: ipfix
        port: 4739
        enable_dpi: true
```

Después de guardar sus cambios, [reinicie el Agent][4].

#### Configure Cisco NBAR2 {#configure-cisco-nbar2}

Cisco Next Generation Network-Based Application Recognition (NBAR2) es compatible con NetFlow v9 e IPFIX. Para exportar datos de aplicaciones NBAR2 desde un dispositivo Cisco:

1. Habilite el descubrimiento de protocolos NBAR2 en cada interfaz que desee clasificar:

   ```text
   configure terminal
   interface <INTERFACE>
    ip nbar protocol-discovery
   exit
   ```

2. Agregue el campo `match application name` a su registro de flujo. El dispositivo luego exporta un ID de aplicación con cada flujo:

   ```text
   configure terminal
   flow record <RECORD_NAME>
    match application name
   exit
   ```

3. Agregue la opción de tabla de aplicaciones a su exportador de flujo. El dispositivo envía periódicamente una tabla que asigna cada ID de aplicación a un nombre y descripción de aplicación:

   ```text
   configure terminal
   flow exporter <EXPORTER_NAME>
    option application-table timeout 60
   exit
   ```

   El valor de tiempo de espera está en segundos.

4. (Opcional) Para agregar más detalles de aplicación a sus flujos, agregue la opción de atributos de aplicación a su exportador de flujo:

   ```text
   configure terminal
   flow exporter <EXPORTER_NAME>
    option application-attributes
   exit
   ```

   Datadog luego enriquece los flujos con la categoría, subcategoría, grupo, clase de tráfico, relevancia comercial, conjunto de aplicaciones, familia de aplicaciones y si la aplicación utiliza P2P, tunelización o cifrado.

**Notas**:

- Los ID de aplicación son específicos para cada exportador porque dependen del paquete de protocolo NBAR y la versión del motor del dispositivo. El Agent mantiene una tabla de aplicaciones separada para cada exportador.
- El Agent mantiene cada entrada de la tabla de aplicaciones durante una hora después de que el exportador la envía por última vez. Para mantener los nombres de las aplicaciones en todos los flujos del exportador, establezca el tiempo de espera `option application-table` en menos de 3600 segundos.

#### Configure Palo Alto Networks App-ID {#configure-palo-alto-networks-app-id}

Palo Alto Networks App-ID es compatible con NetFlow v9. Los firewalls de Palo Alto Networks envían el nombre de la aplicación en cada registro de flujo, por lo que no se requiere una tabla de aplicaciones.

Para exportar datos de App-ID, habilite {{< ui >}}PAN-OS Field Types{{< /ui >}} en el perfil del servidor NetFlow del firewall. Para obtener más información, consulte la [documentación de monitoreo de NetFlow][12] de Palo Alto Networks.

### Asignación de nombre de aplicación {#application-name-assignment}

Datadog asigna un nombre de aplicación a cada punto de conexión de un flujo (la fuente y el destino, o el iniciador y el respondedor). Cada nombre proviene de la primera fuente en esta lista que tiene una coincidencia:

Asignaciones de 1. [enriquecimiento de IP personalizado](#custom-ip-enrichment)
Asignaciones de 2. [enriquecimiento de puertos personalizado](#custom-port-enrichment)
3. [Inspección profunda de paquetes (DPI)](#deep-packet-inspection), solo para el respondedor (el punto de conexión que recibe la conexión, generalmente el servidor)
Nombre de servidor de 4. [DNS inverso](#reverse-dns-private-ip-enrichment)
5. Dominio del sistema autónomo (AS) de GeoIP
6. [Enriquecimiento de puertos predeterminado](#default-port-enrichment) (asignaciones de puertos IANA)
7. `unknown`, si ninguna otra fuente coincide

DPI se aplica solo al respondedor. Para el iniciador, Datadog utiliza la siguiente fuente coincidente. Para obtener más información sobre iniciadores y respondedores, consulte la sección [Unión de conversaciones](#conversation-stitching).

Datadog también asigna un `application_name` al flujo en su conjunto, utilizando el mismo orden. En cada paso, Datadog verifica al respondedor antes que al iniciador.

## Detalles de IP {#ip-details}

En la vista **Conversaciones**, puede visualizar la dirección IP pública de la IP de destino. Pase el cursor sobre la IP para mostrar metadatos enriquecidos sobre la IP y un enlace a {{< ui >}}View Related Network Connections{{< /ui >}} donde puede inspeccionar la conectividad con más detalle.

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="Pase el cursor sobre una dirección IP para mostrar los detalles de la IP y visualizar conexiones de red relacionadas." width="100%" >}}

## Aplicaciones {#applications}

La sección {{< ui >}}Applications{{< /ui >}} de la [página de NetFlow][5] muestra qué aplicaciones generan la mayor cantidad de tráfico en su red. Úsela para identificar las aplicaciones que generan el uso de ancho de banda o causan problemas de rendimiento o congestión.

{{< img src="network_device_monitoring/netflow/netflow_top_applications.png" alt="La sección Applications de la página de NetFlow, que muestra un gráfico circular Top Applications y una tabla de aplicaciones con tasa de bits, tasa de paquetes y total de bytes" width="100%" >}}

Para filtrar los datos de NetFlow por aplicación, utilice los filtros {{< ui >}}Initiator Application{{< /ui >}} y {{< ui >}}Responder Application{{< /ui >}} en la vista {{< ui >}}Bidirectional{{< /ui >}}, o los filtros {{< ui >}}Source Application{{< /ui >}} y {{< ui >}}Destination Application{{< /ui >}} en la vista {{< ui >}}Unidirectional{{< /ui >}}.

Para ver las principales aplicaciones del tráfico que pasa por un solo dispositivo, abra la página del dispositivo y seleccione la pestaña {{< ui >}}Traffic{{< /ui >}}.

Datadog asigna nombres de aplicaciones desde varias fuentes de enriquecimiento y, luego, agrupa los flujos por nombre de aplicación para crear la sección {{< ui >}}Applications{{< /ui >}}. Para obtener la lista de fuentes y el orden en el que Datadog las verifica, consulte la sección [Asignación de nombres de aplicaciones](#application-name-assignment).

Para reducir la cantidad de flujos etiquetados como `unknown`, configure la [inspección profunda de paquetes](#deep-packet-inspection) en dispositivos compatibles de Cisco y Palo Alto Networks, o agregue enriquecimientos de [IP personalizada](#custom-ip-enrichment) y [puerto personalizado](#custom-port-enrichment).

## Diagrama de flujo {#flow-diagram}

Puede visualizar los flujos en NetFlow Monitoring haciendo clic en el menú {{< ui >}}Flows{{< /ui >}} y pasando el cursor sobre un flujo de la lista para ver información adicional sobre la IP de fuente, el nombre de la interfaz de entrada, el nombre del dispositivo y la IP de destino en las conexiones de red relacionadas.

{{< img src="network_device_monitoring/netflow/flows.png" alt="Pase el cursor sobre un flujo agregado desde un dispositivo que emite NetFlow para acceder a las conexiones de red relacionadas" width="100%" >}}

## Network Path para NetFlow {#network-path-for-netflow}

Las pruebas dinámicas para NetFlow pueden ejecutar automáticamente pruebas de Network Path desde el Agent que recopila el tráfico de NetFlow hacia las IP de destino observadas en los registros de NetFlow. Utilice las pruebas dinámicas para NetFlow para agregar contexto de Network Path salto a salto y latencia a sus destinos de NetFlow.

Las pruebas dinámicas para NetFlow son experimentales y requieren Agent `v7.81+`. Para configurar las pruebas dinámicas para NetFlow, consulte [Network Path setup][11].

## NetFlow Monitor {#netflow-monitor}

Haga clic en el icono {{< ui >}}Create Monitor{{< /ui >}} desde cualquiera de las vistas para crear un [NetFlow Monitor][6]. Al crear el monitor, considere los siguientes campos con respecto a la IP de fuente o la IP de destino desde la perspectiva del dispositivo. Estos campos proporcionan información sobre los patrones de tráfico de red y ayudan a optimizar el rendimiento y la seguridad.

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="Vista de flujos en NetFlow Monitoring con el enlace para crear NetFlow Monitor resaltado." width="100%" >}}

### Información de la interfaz {#interface-information}

Los siguientes campos representan detalles sobre las interfaces de entrada y salida.

| Nombre del campo | Descripción del campo |
|---|---|
| Alias de la interfaz de salida | Alias de la interfaz de salida. |
| Índice de la interfaz de salida | Índice de la interfaz de salida. |
| Nombre de la interfaz de salida | Nombre de la interfaz de salida. |
| Alias de la interfaz de entrada | Alias de la interfaz de entrada. |
| Índice de la interfaz de entrada | Índice de la interfaz de entrada. |
| Nombre de la interfaz de entrada | Nombre de la interfaz de entrada. |

### Información del dispositivo {#device-information}

Los siguientes campos representan detalles relacionados con el dispositivo que genera los registros de NetFlow.

| Nombre del campo | Descripción del campo |
|---|---|
| IP del dispositivo | Dirección IP utilizada para asignar a un dispositivo en NDM con fines de enriquecimiento. |
| IP del exportador | Dirección IP desde la cual se originan los paquetes de NetFlow. |
| Modelo del dispositivo | Modelo del dispositivo. |
| Nombre del dispositivo | Nombre del dispositivo. |
| Espacio de nombres del dispositivo | Espacio de nombres del dispositivo. |
| Proveedor del dispositivo | Proveedor del dispositivo. |

### Detalles del flujo {#flow-details}

Los siguientes campos representan las características del flujo de red.

| Nombre del campo | Descripción del campo |
|---|---|
| Dirección | Indica si el flujo es entrante o saliente. |
| Hora de inicio | Marca de tiempo del primer paquete de red entre las direcciones IP de fuente y destino. |
| Hora de finalización | Marca de tiempo del último paquete de red entre las direcciones IP de fuente y destino. |
| Tipo de Ethernet | Tipo de encapsulación de trama Ethernet (IPv4 o IPv6). |
| Tipo de flujo | Tipo de formato de datos de NetFlow (IPFIX, sFlow5, NetFlow5, NetFlow9 o Desconocido). |
| Protocolo IP | Protocolo utilizado para la comunicación (como ICMP, TCP o UDP). |
| IP del siguiente salto | Dirección IP del siguiente salto en la ruta de red. |
| Indicador TCP | Unión de todos los indicadores TCP observados durante la vida del flujo. |
| Bytes | Número total de bytes transferidos. |
| Paquetes | Número total de paquetes transferidos. |

Además de los campos, también puede utilizar facetas listas para usar para comenzar a analizar los patrones de tráfico basados en las direcciones IP de destino y fuente de NetFlow.

### Faceta de IP de destino de NetFlow {#netflow-destination-ip-facets}

| Nombre de la faceta | Descripción de la faceta |
|---|---|
| Dominio de AS de destino | El dominio asociado con el Sistema Autónomo (AS) al que pertenece la IP de destino. |
| Nombre de AS de destino | El nombre del Sistema Autónomo (AS) al que pertenece la IP de destino. |
| Número de AS de destino | El número asignado al Sistema Autónomo (AS) al que pertenece la IP de destino. |
| Ruta de AS de destino | La información de ruta asociada con el Sistema Autónomo (AS) al que pertenece la IP de destino. |
| Tipo de AS de destino | El tipo de Sistema Autónomo (AS) al que pertenece la IP de destino (como tránsito, cliente, par). |
| Nombre de la aplicación de destino | El nombre de la aplicación asociada con la IP de destino. |
| Nombre de la ciudad de destino | El nombre de la ciudad asociada con la IP de destino. |
| Nombre del proveedor de nube de destino | El nombre del proveedor de nube asociado con la IP de destino. |
| Región del proveedor de nube de destino | La región del proveedor de nube asociada con la IP de destino. |
| Servicio del proveedor de nube de destino | El servicio proporcionado por el proveedor de nube asociado con la IP de destino. |
| Código de continente de destino | El código que representa el continente asociado con la IP de destino. |
| Nombre del continente de destino | El nombre del continente asociado con la IP de destino. |
| Código ISO del país de destino | El código ISO que representa el país asociado con la IP de destino. |
| Nombre del país de destino | El nombre del país asociado con la IP de destino. |
| IP de destino | La dirección IP de destino. |
| Latitud de destino | La coordenada de latitud asociada con la IP de destino. |
| Longitud de destino | La coordenada de longitud asociada con la IP de destino. |
| MAC de destino | La dirección de Access Control al Medio (MAC) asociada con la IP de destino. |
| Máscara de destino | La máscara de subred asociada con la IP de destino. |
| Puerto de destino | El número de puerto de destino. |
| Nombre de host DNS inverso de destino | El nombre de host DNS asociado con la IP de destino. |
| Código ISO de la subdivisión de destino | El código ISO que representa la subdivisión (como estado o provincia) asociada con la IP de destino. |
| Nombre de la subdivisión de destino | El nombre de la subdivisión (como estado o provincia) asociada con la IP de destino. |
| Zona horaria de destino | La zona horaria asociada con la IP de destino. |

### Faceta de fuente de NetFlow {#netflow-source-ip-facets}

| Nombre de la faceta | Descripción de la faceta |
|---|---|
| Dominio del AS de fuente | El dominio asociado con el Sistema Autónomo (AS) al que pertenece la IP de origen. |
| Nombre del AS de fuente | El nombre del Sistema Autónomo (AS) al que pertenece la IP de fuente. |
| Número del AS de fuente | El número asignado al Sistema Autónomo (AS) al que pertenece la IP de origen. |
| Ruta del AS de fuente | La información de ruta asociada con el Sistema Autónomo (AS) al que pertenece la IP de fuente. |
| Tipo de AS de fuente | El tipo de Sistema Autónomo (AS) al que pertenece la IP de origen (como tránsito, cliente, par). |
| Nombre de la aplicación de fuente | El nombre de la aplicación asociada con la IP de origen. |
| Nombre de la ciudad de fuente | El nombre de la ciudad asociada con la IP de origen. |
| Nombre del proveedor de nube de fuente | El nombre del proveedor de nube asociado con la IP de origen. |
| Región del proveedor de nube de fuente | La región del proveedor de nube asociada con la IP de origen. |
| Servicio del proveedor de nube de fuente | El servicio proporcionado por el proveedor de nube asociado con la IP de origen. |
| Código de continente de fuente | El código que representa el continente asociado con la IP de origen. |
| Nombre de continente de fuente | El nombre del continente asociado con la IP de origen. |
| Código ISO de país de fuente | El código ISO que representa el país asociado con la IP de origen. |
| Nombre de país de fuente | El nombre del país asociado con la IP de origen. |
| IP de fuente | La dirección IP de fuente. |
| Latitud de fuente | La coordenada de latitud asociada con la IP de fuente. |
| Longitud de fuente | La coordenada de longitud asociada con la IP de fuente. |
| MAC de fuente | La dirección de Media Access Control (MAC) asociada con la IP de fuente. |
| Máscara de fuente | La máscara de subred asociada con la IP de fuente. |
| Puerto de fuente | El número de puerto de fuente. |
| Nombre de host DNS inverso de fuente | El nombre de host DNS asociado con la IP de fuente. |
| Código ISO de subdivisión de fuente | El código ISO que representa la subdivisión (como estado o provincia) asociada con la IP de fuente. |
| Nombre de subdivisión de fuente | El nombre de la subdivisión (como estado o provincia) asociada con la IP de fuente. |
| Zona horaria de fuente | La zona horaria asociada con la IP de fuente. |

## Unión de conversaciones {#conversation-stitching}

De forma predeterminada, los registros de NetFlow separan los flujos unidireccionales para cada dirección del tráfico entre dos puntos de conexión (A → B y B → A). La unión de conversaciones combina estos en un solo registro bidireccional, brindándole una vista completa del tráfico total intercambiado entre dos puntos de conexión (A ↔ B).

Con la unión de conversaciones, puede:

- Ver el tráfico total intercambiado entre dos puntos de conexión como una sola conversación en lugar de flujos direccionales separados
- Identifique a los iniciadores y respondedores reales para que los widgets de fuente y destino reflejen roles precisos
- Elimine el ruido donde los servidores aparecen incorrectamente como fuentes principales

Para alternar entre las vistas unidas (bidireccionales) y no unidas (unidireccionales), navegue a cualquier vista de NetFlow basada en puntos de conexión y use el interruptor {{< ui >}}Bidirectional{{< /ui >}} debajo del selector de tiempo.

{{< img src="network_device_monitoring/netflow/conversation_stitching.png" alt="Interruptor de unión de conversaciones en la vista de NetFlow" width="100%" >}}

## Tasa de muestreo {#sampling-rate}

La tasa de muestreo de NetFlow se tiene en cuenta en el cálculo de bytes y paquetes de forma predeterminada. Los valores mostrados para bytes y paquetes se calculan con la tasa de muestreo aplicada.
Además, puede consultar **Bytes (ajustados) (@adjusted_bytes)** y **Paquetes (ajustados) (@adjusted_packets)** en paneles y cuadernos para visualizarlos.

Para visualizar los bytes/paquetes sin procesar (muestreados) enviados por sus dispositivos, puede consultar **Bytes (muestreados) (@bytes)** y **Paquetes (muestreados) (@packets)** en paneles y cuadernos.

## Retención {#retention}

Los datos de NetFlow se conservan durante 30 días de forma predeterminada, con opciones de retención de 15, 30, 60 y 90 días.

<div class="alert alert-warning">Para conservar los datos de NetFlow durante períodos más largos, comuníquese con su representante de cuenta.</div>

## Limitar el volumen de flujo por intervalo de vaciado {#limit-flow-volume-per-flush-interval}

Para controlar el volumen de NetFlow y los costos asociados, configure el Agent para limitar la cantidad de registros de flujo enviados por intervalo de vaciado. El intervalo de vaciado es el período durante el cual los flujos se agregan antes de enviarse a Datadog.

Cuando este límite está habilitado, el Agent conserva solo los **flujos principales por recuento de bytes** hasta el máximo configurado y descarta los flujos de menor volumen para ese intervalo de vaciado.

### Configuración {#configuration-1}

**Nota**: Requiere la versión `7.75.1` del Agent o posterior.

Configure lo siguiente en su `datadog.yaml`:

```yaml
network_devices:
  netflow:
    enabled: true
    aggregator_max_flows_per_flush_interval: 10000
```

Con esta configuración, el Agent envía como máximo 10,000 registros de NetFlow por intervalo de vaciado (5 minutos de forma predeterminada). El Agent prioriza los flujos de mayor volumen y descarta el resto.

### Estimación del volumen diario {#estimating-daily-volume}

Su conteo máximo de flujos diario aproximado es:

`max_flows_per_flush_interval * (minutes_per_day / flush_interval_minutes)`

Por ejemplo, con `10,000` flujos por vaciado y un intervalo de vaciado de 5 minutos:

`10,000 * (1440 / 5) = 2,880,000 flows/day`

### Comportamiento esperado {#expected-behavior}

- **Se da prioridad a los emisores principales:** Esto es ideal para flujos de trabajo centrados en tráfico de alto volumen (por ejemplo, controladores de ancho de banda y enlaces ruidosos).
- **Visibilidad reducida para flujos de bajo volumen:** Es posible que los pares de fuente/destino con menor tráfico no aparezcan cuando se alcanza el límite.
- **Comportamiento por Agent:** El límite se aplica a cada Agent de forma independiente. Si varios Agent ven tráfico para las mismas conversaciones, estos no se agregan globalmente antes del truncamiento.

### Monitoreo del truncamiento {#monitoring-truncation}

Cuando la limitación de flujo está habilitada, el Agent emite métricas que puede utilizar para comprender cuántos datos se conservan frente a los que se descartan:

- `ndm.flow_truncation.flows_total`
- `ndm.flow_truncation.flows_kept`
- `ndm.flow_truncation.flows_dropped`
- `ndm.flow_truncation.keep_ratio`
- `ndm.flow_truncation.threshold_value`
- `ndm.flow_truncation.runtime_ms`

Utilice estas métricas para validar el límite elegido y para detectar cuándo ocurre el truncamiento con frecuencia (lo que puede indicar que debe ajustar el límite o el intervalo de vaciado).

## Solución de problemas {#troubleshooting}

### Pérdidas de paquetes NetFlow {#netflow-packet-drops}
Las pérdidas de paquetes NetFlow pueden ocurrir cuando hay una gran cantidad de paquetes NetFlow por segundo, generalmente superior a 50,000. Los siguientes pasos pueden ayudar a identificar y mitigar las pérdidas de paquetes NetFlow:

#### Identificación de pérdidas de paquetes {#identifying-packet-drops}

Utilice el comando `netstat -s` para ver si hay paquetes UDP perdidos:

```bash
    netstat -s
  ```

#### Mitigation steps
1. Increase the Number of NetFlow Listeners

  Increase the number of NetFlow listeners by using a configuration similar to the following:
  Datadog recommends setting the number of workers to match the number of CPU cores in your system:

```yaml
      netflow:
        enabled: true
        listeners:
          - flow_type: netflow9
            port: 2055
            workers: 4 # 4 CPUs
```

2. Aumentar la longitud de la cola UDP (solo Linux)

  Ajustar la longitud de la cola UDP de su sistema puede ayudar a acomodar el mayor volumen de paquetes NetFlow. Aumente el tamaño del búfer de recepción UDP a 25MB ejecutando los siguientes comandos:

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. Persistencia de la configuración (solo Linux)

  Para hacer que estos cambios sean permanentes, agregue las siguientes líneas a su archivo `/etc/sysctl.conf`:

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/network_monitoring/devices/snmp_metrics/
[3]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /es/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /es/monitors/types/netflow/
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[9]: /es/network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all
[10]: https://app.datadoghq.com/devices/settings/enrichment/ip
[11]: /es/network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
[12]: https://docs.paloaltonetworks.com/ngfw/administration/monitoring/netflow-monitoring/netflow-templates
[13]: https://app.datadoghq.com/devices/settings/enrichment/port