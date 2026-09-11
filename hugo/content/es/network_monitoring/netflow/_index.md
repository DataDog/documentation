---
aliases:
- /es/network_monitoring/devices/netflow/
further_reading:
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Uso de perfiles con Network Device Monitoring
- link: /network_monitoring/network_path/setup/#dynamic-tests-for-netflow-experimental
  tag: Documentación
  text: Configuración de pruebas dinámicas para NetFlow
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: Blog
  text: Monitoree los datos de tráfico de NetFlow con Datadog
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Monitoree y diagnostique problemas de rendimiento de la red con capturas SNMP
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

### Enriquecimiento de IP de proveedor de nube {#cloud-provider-ip-enrichment}

Datadog enriquece las IPs con el servicio y la región del proveedor de nube pública para direcciones IPv4, de modo que pueda filtrar los registros de flujo de un servicio y una región específicos.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="Menú de filtro de NetFlow que muestra el nombre del proveedor de nube, la región y el servicio" width="100%" >}}

### Enriquecimiento de puertos {#port-enrichment}

Datadog enriquece los puertos en NetFlow con datos de IANA (Internet Assigned Numbers Authority) para resolver asignaciones de puertos conocidos (como Postgres en 5432 y HTTPS en 443). 

### Enriquecimiento de puertos personalizados {#custom-port-enrichment}

También puede agregar sus propios enriquecimientos personalizados para asignar puertos y protocolos a aplicaciones específicas (por ejemplo, si un servicio personalizado se ejecuta en un puerto específico). Esto facilita que los ingenieros de red y sus equipos interpreten y consulten los datos de NetFlow con nombres legibles por humanos.

Desde la pestaña {{< ui >}}Configuration{{< /ui >}} en NetFlow, haga clic en {{< ui >}}+ Add Enrichment{{< /ui >}} para cargar el archivo CSV que contiene sus enriquecimientos personalizados.

{{< img src="network_device_monitoring/netflow/new_enrichment_2.png" alt="El modal de Nueva asignación de enriquecimiento en la pestaña de configuración de NetFlow" width="100%" >}}

### Enriquecimiento de IP personalizado {#custom-ip-enrichment}

También puede agregar sus propios enriquecimientos personalizados para asignar IP y CIDR a etiquetas personalizadas (por ejemplo, para categorizar servicios que se ejecutan en direcciones IP específicas). Esto facilita que los ingenieros de red y sus equipos interpreten y consulten los datos de NetFlow con nombres legibles por humanos.

Desde la [{{< ui >}}Enrichment{{< /ui >}} página de configuración][10], haga clic en {{< ui >}}+ Add Enrichment{{< /ui >}} para agregar asignaciones manualmente o cargar un archivo CSV para agregar asignaciones de forma masiva.

### Enriquecimiento de IP privada de DNS inverso {#reverse-dns-private-ip-enrichment}

Habilite el enriquecimiento de IP privada de DNS inverso para realizar búsquedas de DNS de nombres de host asociados con direcciones IP de fuente o destino. Cuando está habilitado, el Agent realiza búsquedas de DNS inverso en las IP de fuente y destino dentro de rangos de direcciones privadas, enriqueciendo los registros de NetFlow con los nombres de host correspondientes.

De forma predeterminada, el enriquecimiento de IP de DNS inverso en su [`datadog.yaml` archivo][7] está deshabilitado. Para habilitarlo, consulte la sección [Configuración](#configuration) de esta página.

Busque DNS en el menú {{< ui >}}+ Filter{{< /ui >}} para localizar flujos asociados con el enriquecimiento de IP de DNS inverso:

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="Menú de filtro mejorado para mostrar las facetas de destino y fuente de DNS inverso" width="100%" >}}

**Nota**: Las entradas de DNS inverso se almacenan en caché y están sujetas a limitación de velocidad para minimizar las consultas de DNS y reducir la carga en los servidores DNS. Para obtener más opciones de configuración, incluida la modificación del almacenamiento en caché predeterminado y la limitación de velocidad, consulte la sección `reverse_dns_enrichment` del [archivo de configuración de ejemplo del Agent][7].

## Detalles de IP {#ip-details}

En la vista **Conversaciones**, puede ver la dirección IP pública de la IP de destino. Pase el cursor sobre la IP para mostrar metadatos enriquecidos sobre la IP y un enlace a {{< ui >}}View Related Network Connections{{< /ui >}} donde puede inspeccionar la conectividad con más detalle.

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="Pase el cursor sobre una dirección IP para mostrar los detalles de la IP y visualizar conexiones de red relacionadas." width="100%" >}}

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
| MAC de fuente | La dirección de Control de Acceso al Medio (MAC) asociada con la IP de fuente. |
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