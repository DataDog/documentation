---
aliases:
- /es/network_monitoring/devices/netflow/
further_reading:
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Uso de perfiles con Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: Blog
  text: Monitorear datos de tráfico NetFlow con Datadog
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Monitorear y diagnosticar problemas de rendimiento de red con SNMP Traps
title: NetFlow Monitoring
---
## Resumen {#overview}

La vista de NetFlow en Network Device Monitoring proporciona visibilidad sobre los flujos de tráfico de red recopilados de dispositivos que exportan datos de flujo (por ejemplo, enrutadores, cortafuegos o conmutadores). Puede analizar el volumen de tráfico, identificar los principales emisores y comprender cómo se mueve la información a través de su red.

La vista de NetFlow muestra métricas de tráfico agregadas por dispositivo e interfaz. Úselo para identificar qué dispositivos o interfaces están consumiendo más ancho de banda, generando más paquetes o contribuyendo a picos de tráfico.

{{< img src="network_device_monitoring/netflow/netflow.png" alt="La página NetFlow Monitoring contiene una leyenda colapsable para el volumen de tráfico, la salud del dispositivo, flujos y más." style="width:100%;" >}}

## Navegación lateral {#side-navigation}

Utilice la navegación de la izquierda para explorar vistas adicionales de NetFlow:

- **Volumen de tráfico**: Métricas de flujo generales por dispositivo e interfaz.
- **Salud del dispositivo**: Estado y utilización de los dispositivos monitoreados.
- **Flujos**: Registros de flujo individuales detallados.
- **Conversaciones**: Pares de origen-destino agregados.
- **Sistemas autónomos**: Datos de flujo agrupados por Números de Sistemas Autónomos (ASNs).
- **Geo IP**: Datos de flujo agrupados por origen/destino geográfico.
- **Puertos de origen / Puertos de destino / Protocolos / Banderas**: Desglose del tráfico por metadatos de paquetes.

## Instalación {#installation}

Para utilizar NetFlow Monitoring con Network Device Monitoring, asegúrese de estar utilizando la versión 7.45 o más reciente del [Agent][1].

**Nota:** Configurar [la recolección de métricas de Network Device Monitoring][2] no es un requisito para enviar datos de NetFlow, aunque se recomienda encarecidamente, ya que estos datos adicionales pueden utilizarse para enriquecer sus registros de flujo con información como el nombre del dispositivo, modelo y proveedor, así como el nombre de la interfaz de entrada/salida.

## Configuración {#configuration}

Para configurar sus dispositivos para enviar tráfico de NetFlow, jFlow, sFlow o IPFIX al servidor NetFlow del Agent, sus dispositivos deben estar configurados para enviar tráfico a la dirección IP en la que está instalado el Datadog Agent, específicamente a `flow_type` y `port`.

1. Edite su archivo de configuración del [`datadog.yaml`][3] Agent para habilitar NetFlow:

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

El Datadog Agent agrega automáticamente los datos recibidos en NetFlow para limitar el número de registros enviados a la plataforma mientras mantiene la mayor parte de la información. Por defecto, las grabaciones de flujo que tienen los mismos identificadores, como `source`, `destination address`, `port` y `protocol`, se agregan juntas en intervalos de cinco minutos. Además, el Datadog Agent puede detectar puertos efímeros y eliminarlos. Como resultado, puede ver Flujos con `port:*`.

## Enriquecimiento {#enrichment}

Sus datos de NetFlow son procesados por el backend de Datadog y enriquecidos con los metadatos disponibles de sus dispositivos e interfaces. El enriquecimiento se basa en la IP del exportador de NetFlow y los índices de interfaz. Para desambiguar posibles colisiones entre IPs privadas reutilizadas, puede configurar un `namespace` diferente para cada archivo de configuración del Agent (con la configuración `network_devices.namespace`).

Si la IP del exportador de NetFlow es una de las IPs del dispositivo, pero no la que está configurada en la integración SNMP, Datadog intenta localizar el dispositivo al que pertenece la IP del exportador y enriquece sus datos de NetFlow con ella siempre que la coincidencia sea única.

### Enriquecimiento de IP del proveedor de la nube {#cloud-provider-ip-enrichment}

Datadog enriquece las IPs con el servicio y la región del proveedor de nube pública para direcciones IPv4, de modo que pueda filtrar los registros de flujo de un servicio y región específicos.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="Menú de filtro de NetFlow que muestra el nombre del proveedor de nube, la región y el servicio" width="100%" >}}

### Enriquecimiento de puertos {#port-enrichment}

Datadog enriquece los puertos en NetFlow con datos de IANA (Autoridad de Números Asignados de Internet) para resolver asignaciones de puertos bien conocidos (como Postgres en 5432 y HTTPS en 443). 

### Enriquecimiento de puerto personalizado {#custom-port-enrichment}

También puede agregar sus propios enriquecimientos personalizados para mapear puertos y protocolos a aplicaciones específicas (por ejemplo, si un servicio personalizado se ejecuta en un puerto específico). Esto facilita a los ingenieros de red y sus equipos interpretar y consultar los datos de NetFlow con nombres legibles para humanos.

Desde la pestaña **Configuración** en NetFlow, haga clic en **+ Agregar Enriquecimiento** para subir el archivo CSV que contiene sus enriquecimientos personalizados.

{{< img src="network_device_monitoring/netflow/new_enrichment_2.png" alt="El modal de Mapeo de Nuevos Enriquecimientos en la pestaña de configuración de NetFlow" width="100%" >}}

### Enriquecimiento de IP personalizado {#custom-ip-enrichment}

También puede agregar sus propios enriquecimientos personalizados para mapear IPs y CIDRs a etiquetas personalizadas (por ejemplo, para categorizar servicios que se ejecutan en direcciones IP específicas). Esto facilita a los ingenieros de red y sus equipos interpretar y consultar los datos de NetFlow con nombres legibles para humanos.

Desde la página de configuración de [**Enriquecimiento**][10], haga clic en **+ Agregar Enriquecimiento** para agregar mapeos manualmente o subir un archivo CSV para agregar mapeos en bloque.

### Enriquecimiento de IP privada de DNS inverso {#reverse-dns-private-ip-enrichment}

Habilite el enriquecimiento de IP privada de DNS inverso para realizar búsquedas DNS de nombres de host asociados con direcciones IP de origen o destino. Cuando está habilitado, el Datadog Agent realiza búsquedas DNS inversas en las IPs de origen y destino dentro de rangos de direcciones privadas, enriqueciendo los registros de NetFlow con los nombres de host correspondientes.

Por [defecto][7], el enriquecimiento de IP de DNS inverso en su archivo `datadog.yaml` está deshabilitado. Para habilitar, consulte la sección [Configuración](#configuration) de esta página.

Busque **DNS** en el menú **+ Filtro** para localizar flujos asociados con el enriquecimiento de IP de DNS inverso:

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="Menú de filtro mejorado para mostrar las facetas de destino y origen de DNS inverso" width="100%" >}}

**Nota**: Las entradas de DNS inverso se almacenan en caché y están sujetas a limitaciones de tasa para minimizar las consultas DNS y reducir la carga en los servidores DNS. Para más opciones de configuración, incluyendo la modificación de la caché predeterminada y la limitación de tasa, consulte el [archivo de configuración completo][8].

## Detalles de IP {#ip-details}

En la vista de **Conversaciones**, puede ver la dirección IP pública de la IP de destino. Pase el cursor sobre la IP para mostrar metadatos enriquecidos sobre la IP y un enlace a **Ver Conexiones de Red Relacionadas** donde puede inspeccionar la conectividad con más detalle.

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="Pase el cursor sobre una dirección IP para mostrar los detalles de la IP y Ver Conexiones de Red Relacionadas" width="100%" >}}

## Diagrama de flujo {#flow-diagram}

Puede visualizar los flujos en NetFlow Monitoring haciendo clic en el menú **Flujos** y pasando el cursor sobre un flujo de la lista para ver información adicional sobre la IP de origen, el nombre de la interfaz de entrada, el nombre del dispositivo y la IP de destino a través de conexiones de red relacionadas.

{{< img src="network_device_monitoring/netflow/flows.png" alt="Pase el cursor sobre un flujo agregado de un dispositivo que emite NetFlow para acceder a conexiones de red relacionadas." width="100%" >}}

## Monitor de NetFlow {#netflow-monitor}

Haga clic en el ícono **Crear Monitor** desde cualquiera de las vistas para crear un [NetFlow monitor][6]. Al crear el monitor, considere los siguientes campos con respecto a la IP de origen o la IP de destino desde la perspectiva del dispositivo. Estos campos proporcionan información sobre los patrones de tráfico de red y ayudan a optimizar el rendimiento y la seguridad.

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="Vista de flujos en NetFlow Monitoring con el enlace para crear un NetFlow monitor resaltado." width="100%" >}}

### Información de interfaz {#interface-information}

Los siguientes campos representan detalles sobre las interfaces de entrada y salida.

| Nombre del Campo | Descripción del Campo |
|---|---|
| Alias de la Interfaz de Salida | Alias de la interfaz de salida. |
| Índice de la Interfaz de Salida | Índice de la interfaz de salida. |
| Nombre de la interfaz de salida | Nombre de la interfaz de salida. |
| Alias de la interfaz de entrada | Alias de la interfaz de entrada. |
| Índice de la interfaz de entrada | Índice de la interfaz de entrada. |
| Nombre de la interfaz de entrada | Nombre de la interfaz de entrada. |

### Información del dispositivo {#device-information}

Los siguientes campos representan detalles relacionados con el dispositivo que genera registros de NetFlow.

| Nombre del campo | Descripción del campo |
|---|---|
| IP del dispositivo | Dirección IP utilizada para mapear a un dispositivo en NDM con fines de enriquecimiento. |
| IP del exportador | Dirección IP desde la cual se originan los paquetes de NetFlow. |
| Modelo del dispositivo | Modelo del dispositivo. |
| Nombre del dispositivo | Nombre del dispositivo. |
| Espacio de nombres del dispositivo | Espacio de nombres del dispositivo. |
| Proveedor del dispositivo | Proveedor del dispositivo. |

### Detalles del flujo {#flow-details}

Los siguientes campos representan características del flujo de red.

| Nombre del campo | Descripción del campo |
|---|---|
| Dirección | Indica si el flujo es entrante o saliente. |
| Hora de Inicio | Marca de tiempo del primer paquete de red entre las direcciones IP de origen y destino. |
| Hora de Fin | Marca de tiempo del último paquete de red entre las direcciones IP de origen y destino. |
| Tipo de Éter | Tipo de encapsulación de tramas Ethernet (IPv4 o IPv6). |
| Tipo de Flujo | Tipo de formato de datos de NetFlow (IPFIX, sFlow5, NetFlow5, NetFlow9 o Desconocido). |
| Protocolo IP | Protocolo utilizado para la comunicación (como ICMP, TCP o UDP). |
| IP del siguiente salto | Dirección IP del siguiente salto en la ruta de la red. |
| Bandera TCP | Unión de todas las banderas TCP observadas durante la vida del flujo. |
| Bytes | Número total de bytes transferidos. |
| Paquetes | Número total de paquetes transferidos. |

Además de los campos, también puede utilizar facetas listas para usar para comenzar a analizar patrones de tráfico basados en las direcciones IP de destino y origen de NetFlow.

### Facetas de IP de destino de NetFlow {#netflow-destination-ip-facets}

| Nombre de la faceta | Descripción de la faceta |
|---|---|
| Dominio AS de destino | El dominio asociado con el Sistema Autónomo (AS) al que pertenece la IP de destino. |
| Nombre AS de destino | El nombre del Sistema Autónomo (AS) al que pertenece la IP de destino. |
| Número AS de destino | El número asignado al Sistema Autónomo (AS) al que pertenece la IP de destino. |
| Ruta AS de destino | La información de ruta asociada con el Sistema Autónomo (AS) al que pertenece la IP de destino. |
| Tipo de AS de destino | El tipo de Sistema Autónomo (AS) al que pertenece la IP de destino (como tránsito, cliente, par). |
| Nombre de la Aplicación de Destino | El nombre de la aplicación asociada con la IP de destino. |
| Nombre de la Ciudad de Destino | El nombre de la ciudad asociada con la IP de destino. |
| Nombre del Proveedor de Nube de Destino | El nombre del proveedor de nube asociado con la IP de destino. |
| Región del Proveedor de Nube de Destino | La región del proveedor de nube asociada con la IP de destino. |
| Servicio del Proveedor de Nube de Destino | El servicio proporcionado por el proveedor de nube asociado con la IP de destino. |
| Código del Continente de Destino | El código que representa el continente asociado con la IP de destino. |
| Nombre del Continente de Destino | El nombre del continente asociado con la IP de destino. |
| Código ISO del País de Destino | El código ISO que representa el país asociado con la IP de destino. |
| Nombre del País de Destino | El nombre del país asociado con la IP de destino. |
| Dirección IP de destino | La dirección IP de destino. |
| Latitud de destino | La coordenada de latitud asociada con la dirección IP de destino. |
| Longitud de destino | La coordenada de longitud asociada con la dirección IP de destino. |
| MAC de destino | La dirección de Control de Acceso de Medios (MAC) asociada con la dirección IP de destino. |
| Máscara de destino | La máscara de subred asociada con la dirección IP de destino. |
| Puerto de destino | El número de puerto de destino. |
| Nombre de host DNS inverso de destino | El nombre de host DNS asociado con la dirección IP de destino. |
| Código ISO de subdivisión de destino | El código ISO que representa la subdivisión (como estado o provincia) asociada con la dirección IP de destino. |
| Nombre de subdivisión de destino | El nombre de la subdivisión (como estado o provincia) asociada con la dirección IP de destino. |
| Zona horaria de destino | La zona horaria asociada con la dirección IP de destino. |

### Facetas de IP de origen de NetFlow {#netflow-source-ip-facets}

| Nombre de la faceta | Descripción de la faceta |
|---|---|
| Dominio AS de origen | El dominio asociado con el Sistema Autónomo (AS) al que pertenece la IP de origen. |
| Nombre AS de origen | El nombre del Sistema Autónomo (AS) al que pertenece la IP de origen. |
| Número AS de origen | El número asignado al Sistema Autónomo (AS) al que pertenece la IP de origen. |
| Ruta AS de origen | La información de ruta asociada con el Sistema Autónomo (AS) al que pertenece la IP de origen. |
| Tipo AS de origen | El tipo de Sistema Autónomo (AS) al que pertenece la IP de origen (como tránsito, cliente, par). |
| Nombre de la aplicación de origen | El nombre de la aplicación asociada con la IP de origen. |
| Nombre de la ciudad de origen | El nombre de la ciudad asociada con la IP de origen. |
| Nombre del proveedor de nube de origen | El nombre del proveedor de nube asociado con la IP de origen. |
| Región del proveedor de nube de origen | La región del proveedor de nube asociada con la IP de origen. |
| Servicio del proveedor de nube de origen | El servicio proporcionado por el proveedor de nube asociado con la IP de origen. |
| Código de continente de origen | El código que representa el continente asociado con la IP de origen. |
| Nombre del continente de origen | El nombre del continente asociado con la IP de origen. |
| Código ISO del país de origen | El código ISO que representa el país asociado con la IP de origen. |
| Nombre del país de origen | El nombre del país asociado con la IP de origen. |
| IP de origen | La dirección IP de origen. |
| Latitud de origen | La coordenada de latitud asociada con la IP de origen. |
| Longitud de origen | La coordenada de longitud asociada con la IP de origen. |
| MAC de origen | La dirección de Control de Acceso de Medios (MAC) asociada con la IP de origen. |
| Máscara de origen | La máscara de subred asociada con la IP de origen. |
| Puerto de origen | El número de puerto de origen. |
| Nombre de host DNS inverso de origen | El nombre de host DNS asociado con la IP de origen. |
| Código ISO de subdivisión de origen | El código ISO que representa la subdivisión (como estado o provincia) asociada con la IP de origen. |
| Nombre de subdivisión de origen | El nombre de la subdivisión (como estado o provincia) asociada con la IP de origen. |
| Zona horaria de origen | La zona horaria asociada con la IP de origen. |

## Unificación de conversaciones {#conversation-stitching}

Por defecto, NetFlow registra flujos unidireccionales separados para cada dirección de tráfico entre dos puntos de conexión (A → B y B → A). La unificación de conversaciones combina estos en un solo registro bidireccional, brindando una vista completa del tráfico total intercambiado entre dos puntos de conexión (A ↔ B).

Con la unificación de conversaciones, puede:

- Ver el tráfico total intercambiado entre dos puntos de conexión como una sola conversación en lugar de flujos direccionales separados
- Identificar verdaderos iniciadores y respondedores para que los widgets de fuente y destino reflejen roles precisos
- Eliminar ruido donde los servidores aparecen incorrectamente como principales fuentes

Para alternar entre vistas unificadas (bidireccionales) y no unificadas (unidireccionales), navegue a cualquier vista de NetFlow basada en puntos de conexión y utilice el interruptor **Bidireccional** bajo el selector de tiempo.

{{< img src="network_device_monitoring/netflow/conversation_stitching.png" alt="Interruptor de unificación de conversaciones en la vista de NetFlow" width="100%" >}}

## Tasa de muestreo {#sampling-rate}

La tasa de muestreo de NetFlow se toma en cuenta en el cálculo de bytes y paquetes por defecto. Los valores mostrados para bytes y paquetes se calculan con la tasa de muestreo aplicada.
Además, puede consultar **Bytes (Ajustados) (@adjusted_bytes)** y **Paquetes (Ajustados) (@adjusted_packets)** en tableros y notebooks para visualizarlos.

Para visualizar los bytes/paquetes crudos (muestreados) enviados por sus dispositivos, puede consultar **Bytes (Muestreados) (@bytes)** y **Paquetes (Muestreados) (@packets)** en tableros y notebooks.

## Retención {#retention}

Los datos de NetFlow se retienen durante 30 días por defecto, con opciones para retención de 15, 30, 60 y 90 días.

<div class="alert alert-warning">Para retener los datos de NetFlow por períodos de tiempo más largos, comuníquese con su representante de cuenta.</div>

## Limitar el volumen de flujo por intervalo de descarga {#limit-flow-volume-per-flush-interval}

Para controlar el volumen de NetFlow y los costos asociados, configure Agent para limitar el número de registros de flujo enviados por intervalo de descarga. El intervalo de descarga es el período durante el cual los flujos se agregan antes de ser enviados a Datadog.

Cuando este límite está habilitado, Agent retiene solo los **flujos principales por conteo de bytes** hasta el máximo configurado, y descarta flujos de menor volumen para ese intervalo de descarga.

### Configuración {#configuration-1}

**Nota**: Requiere la versión de Agent `7.75.1` o posterior.

Configure lo siguiente en su `datadog.yaml`:

```yaml
network_devices:
  netflow:
    enabled: true
    aggregator_max_flows_per_flush_interval: 10000
```

Con esta configuración, Agent envía como máximo 10,000 registros de NetFlow por intervalo de descarga (5 minutos por defecto). Agent prioriza los flujos de mayor volumen y descarta el resto.

### Estimando el volumen diario {#estimating-daily-volume}

Su conteo máximo aproximado de flujo diario es:

`max_flows_per_flush_interval * (minutes_per_day / flush_interval_minutes)`

Por ejemplo, con `10,000` flujos por descarga y un intervalo de descarga de 5 minutos:

`10,000 * (1440 / 5) = 2,880,000 flows/day`

### Comportamiento esperado {#expected-behavior}

- **Se priorizan los principales generadores de tráfico:** Esto es lo mejor para flujos de trabajo enfocados en tráfico de alto volumen (por ejemplo, impulsores de ancho de banda y enlaces ruidosos).
- **Visibilidad reducida para flujos de bajo volumen:** Los pares de origen/destino de menor tráfico pueden no aparecer cuando se alcanza el límite.
- **Comportamiento por Agent:** El límite se aplica a cada Agent de manera independiente. Si múltiples Agents ven tráfico para las mismas conversaciones, no se agregan globalmente antes de la truncación.

### Monitoreo de truncación {#monitoring-truncation}

Cuando se habilita la limitación de flujo, Agent emite métricas que puede usar para entender cuánto dato se está manteniendo frente a lo que se está descartando:

- `ndm.flow_truncation.flows_total`
- `ndm.flow_truncation.flows_kept`
- `ndm.flow_truncation.flows_dropped`
- `ndm.flow_truncation.keep_ratio`
- `ndm.flow_truncation.threshold_value`
- `ndm.flow_truncation.runtime_ms`

Utilice estas métricas para validar su límite elegido y para detectar cuándo la truncación está ocurriendo con frecuencia (lo que puede indicar que debe ajustar el límite o el intervalo de descarga).

## Solución de problemas {#troubleshooting}

### Caídas de paquetes de NetFlow {#netflow-packet-drops}
Las caídas de paquetes de NetFlow pueden ocurrir cuando hay un alto número de paquetes de NetFlow por segundo, típicamente mayor a 50,000. Los siguientes pasos pueden ayudar a identificar y mitigar las caídas de paquetes de NetFlow:

#### Identificación de caídas de paquetes {#identifying-packet-drops}

Utilice el comando `netstat -s` para ver si hay paquetes UDP descartados:

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

  Ajustar la longitud de la cola UDP de su sistema puede ayudar a acomodar el mayor volumen de paquetes NetFlow. Aumente el tamaño del búfer de recepción UDP a 25 MB ejecutando los siguientes comandos:

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. Persistiendo la configuración (solo Linux)

  Para hacer estos cambios permanentes, agregue las siguientes líneas a su archivo `/etc/sysctl.conf`:

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/network_monitoring/devices/snmp_metrics/
[3]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[4]: /es/agent/configuration/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://app.datadoghq.com/devices/netflow
[6]: /es/monitors/types/netflow/
[7]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4201
[8]: https://github.com/DataDog/datadog-agent/blob/f6ae461a7d22aaf398de5a94d9330694d69560d6/pkg/config/config_template.yaml#L4203-L4275
[9]: /es/network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all
[10]: https://app.datadoghq.com/devices/settings/enrichment/ip