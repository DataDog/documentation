---
aliases:
- /es/network_monitoring/devices/netflow/
further_reading:
- link: /network_monitoring/devices/profiles
  tag: Documentación
  text: Uso de perfiles con Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-netflow-with-datadog/
  tag: Blog
  text: Monitorizar el tráfico de datos de NetFlow con Datadog
- link: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  tag: Blog
  text: Monitorizar y diagnosticar problemas de rendimiento de red con SNMP Traps
title: NetFlow Monitoring
---

## Información general

La vista de NetFlow en Network Device Monitoring proporciona visibilidad de los flujos de tráfico de red recopilados de dispositivos que exportan datos de flujo (por ejemplo, enrutadores, cortafuegos o conmutadores). Puedes analizar el volumen de tráfico, identificar a los principales interlocutores y comprender cómo se mueven los datos por la red.

La vista de NetFlow muestra las métricas de tráfico agregadas por dispositivo e interfaz. Utilízala para identificar qué dispositivos o interfaces consumen más ancho de banda, generan más paquetes o contribuyen a los picos de tráfico.

{{< img src="network_device_monitoring/netflow/netflow_home_2.png" alt="La page (página) de NetFlow Monitoring que contiene una leyenda contraíble para el volumen de tráfico, el estado del dispositivo, los flujos, etc." style="width:100%;" >}}

## Navegación lateral

Utiliza la navegación de la izquierda para explorar vistas adicionales de NetFlow:

- **Volumen de tráfico**: Métricas de flujo global por dispositivo e interfaz.
- **Estado de los dispositivos**: Estado y utilización de los dispositivos monitorizados.
- **Flujos**: Registros detallados de flujos individuales.
- **Conversaciones**: Pares agregados de origen-destino.
- **Sistemas autónomos**: Datos de flujo agrupados por Números de sistema autónomo (ASN).
- **IP geográfico**: Datos de flujo agrupados por origen/destino geográfico.
- **Puertos de origen / Puertos de destino / Protocolos / Marcas**: Desglose del tráfico por metadatos de paquetes.

## Instalación

Para utilizar NetFlow Monitoring con Network Device Monitoring, asegúrate de que estás utilizando la versión 7.45 o posterior del [Agent][1].

**Nota:** Configurar la [recopilación de métricas de Network Device Monitoring][2] no es un requisito para enviar datos de NetFlow, pero es algo fuertemente recomendado, ya que estos datos adicionales pueden ser utilizados para enriquecer tus registros de flujos con información, como el nombre del dispositivo, el modelo y el vendedor, así como el nombre de la interfaz de entrada/salida.

## Configuración

Para configurar tus dispositivos para enviar tráfico de NetFlow, jFlow, sFlow o IPFIX al servidor NetFlow del Agent, tus dispositivos deben estar configurados para enviar tráfico a la dirección IP en la que está instalado el Datadog Agent, específicamente `flow_type` y `port`.

1. Edita tu archivo de configuración del Agent [`datadog.yaml`][3] para activar NetFlow:

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

2. Luego de guardar los cambios, [reinicia el Agent][4].

   **Nota**: Asegúrate de que tus [reglas de firewall][9] permiten el tráfico UDP entrante en los puertos configurados.

## Agregación

El Datadog Agent añade automáticamente los datos recibidos a NetFlow para limitar el número de registros enviados a la plataforma, al mismo tiempo que conserva la mayor parte de la información. Por defecto, los registros de flujos que tienen los mismos identificadores, como `source`, `destination address`, `port` y `protocol`, se agregan juntos en intervalos de cinco minutos. Además, el Datadog Agent puede detectar puertos efímeros y eliminarlos. Como resultado, es posible que aparezcan flujos con `port:*`.

## Enriquecimiento

Tus datos de NetFlow son procesados por el backend de Datadog y son enriquecidos con los metadatos disponibles de tus dispositivos e interfaces. El enriquecimiento se basa en la IP del exportador de NetFlow y en los índices de la interfaz. Para desambiguar posibles colisiones entre las IP privadas reutilizadas, puedes configurar un `namespace` diferente para cada archivo de configuración del Agent (con el parámetro `network_devices.namespace`).

Si la IP del exportador de NetFlow es una de las direcciones IP del dispositivo, pero no la que está configurada en la integración SNMP, Datadog intenta localizar el dispositivo al que pertenece la IP del exportador y enriquece tus datos de NetFlow, siempre que la coincidencia sea única.

### Enriquecimiento de IP del proveedor de la nube

Datadog enriquece las IP con el servicio y la región del proveedor de la nube pública para las direcciones IPv4, de modo que puedas filtrar los registros de flujos de un servicio y una región específicos.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_enrichment_2.png" alt="Menú de Netflow Filter en el cual se muestra el nombre, la región y el servicio del proveedor en la nube" width="100%" >}}

### Enriquecimiento de puertos

Datadog enriquece los puertos en NetFlow con datos de la IANA (Internet Assigned Numbers Authority) para resolver asignaciones de puertos bien conocidos (como Postgres en 5432 y HTTPS en 443). 

#### Enriquecimiento personalizado de puertos

También puedes añadir tus propios enriquecimientos personalizados para asignar puertos y protocolos a aplicaciones específicas (por ejemplo, si un servicio personalizado se ejecuta en un puerto específico). Esto permite a los ingenieros de redes y a tus equipos interpretar y consultar los datos de NetFlow con nombres legibles.

En la pestaña **Configuration** (Configuración) de NetFlow, haz clic en **+ Add Enrichment** (+ Añadir enriquecimiento) para cargar el archivo CSV que contiene tus enriquecimientos personalizados.

{{< img src="network_device_monitoring/netflow/new_enrichment_2.png" alt="El modal de Nueva asignación de enriquecimiento en la pestaña de la configuración de Netflow" width="100%" >}}

### Enriquecimiento de IP privada con DNS inverso

Activa el enriquecimiento de IP privada con DNS inverso para realizar búsquedas de DNS de nombres de host asociados a direcciones IP de origen o destino. Cuando se activa, el Agent realiza búsquedas con DNS inverso en IP de origen y destino dentro de rangos de direcciones privadas, enriqueciendo los registros NetFlow con los nombres de host correspondientes.

Por [defecto][7], el enriquecimiento de IP con DNS inverso en tu archivo `datadog.yaml` está deshabilitado. Para habilitarlo, consulta la sección [Configuración](#configuration) de esta página.

Busca **DNS** en el menú **+ Filter** (+ Filtro) para localizar los flujos asociados al enriquecimiento del IP de DNS inverso:

{{< img src="network_device_monitoring/netflow/dns_ip_enrichmen_2.png" alt="Filtrar el menú mejorado para mostrar las facetas de destino y de origen de DNS inverso" width="100%" >}}

**Nota**: Las entradas de DNS inverso se almacenan en caché y están sujetas a limitaciones de frecuencia para minimizar las consultas DNS y reducir la carga de los servidores DNS. Para obtener más información sobre las opciones de configuración, incluyendo la modificación del almacenamiento en caché predeterminado y la limitación de frecuencia, consulta el [archivo de configuración completo][8].

## Datos de IP

En la vista **Conversations** (Conversaciones), puedes ver la dirección IP pública de la IP de destino. Pasa el ratón sobre la IP para mostrar metadatos enriquecidos sobre la IP y un enlace a **View Related Network Connections** (Ver conexiones de red relacionadas) donde puedes inspeccionar la conectividad con más detalles.

{{< img src="network_device_monitoring/netflow/NetFlow_IP_pill.png" alt="Pase el ratón sobre la dirección IP para mostrar los datos de la IP y ver conexiones de red relacionadas" width="100%" >}}

## Diagrama de flujo

Puedes visualizar los flujos en NetFlow Monitoring haciendo clic en el menú **Flows** (Flujos) y pasando el ratón por encima de un flujo de la lista para ver información adicional sobre IP de origen, nombre de la interfaz de ingreso, nombre del dispositivo e IP de destino en todas las conexiones de red relacionadas.

{{< img src="network_device_monitoring/netflow/flows.png" alt="Pasar el ratón sobre un flujo agregado desde un dispositivo que emite netflow para acceder a conexiones de red relacionadas" width="100%" >}}

## Monitor (noun) de NetFlow

Haz clic en el icono **Create Monitor** (Crear monitor (noun)) desde cualquiera de las vistas para crear un [Monitor (noun) de NetFlow][6]. Cuando crees el monitor (noun), ten en cuenta los siguientes campos con respecto a la IP de origen o IP de destino desde la perspectiva del dispositivo. Estos campos proporcionan información sobre los patrones de tráfico de la red y ayudan a optimizar el rendimiento y la seguridad.

{{< img src="network_device_monitoring/netflow/create_monitor.png" alt="Vista de flujos en NetFlow que monitoriza con el vínculo para crear monitores resaltado." width="100%" >}}

### Información sobre la interfaz

Los siguientes campos representan información detallada de las interfaces de entrada y salida.

| Nombre del campo | Descripción del campo |
|---|---|
| Alias de interfaz de salida | Alias de la interfaz de salida. |
| Índice de interfaz de salida | Índice de la interfaz de salida. |
| Nombre de interfaz de salida | Nombre de la interfaz de salida. |
| Alias de interfaz de entrada | Alias de la interfaz de entrada. |
| Índice de interfaz de entrada | Índice de la interfaz de entrada. |
| Nombre de interfaz de entrada | Nombre de la interfaz de entrada. |

### Información sobre el dispositivo

Los siguientes campos representan información detallada relacionada con el dispositivo que genera registros NetFlow.

| Nombre del campo | Descripción del campo |
|---|---|
| IP del dispositivo | Dirección IP utilizada para asignar a un dispositivo en NDM con fines de enriquecimiento. |
| IP del exportador | Dirección IP desde la que se originan los paquetes de NetFlow. |
| Modelo de dispositivo | Modelo del dispositivo. |
| Nombre de dispositivo | Nombre del dispositivo. |
| Espacio de nombres de dispositivo | Espacio de nombres del dispositivo. |
| Vendedor de dispositivo | Vendedor del dispositivo. |

### Detalles del flujo

Los siguientes campos representan características del flujo de red.

| Nombre del campo | Descripción del campo |
|---|---|
| Dirección | Indica si el flujo es entrante o saliente. |
| Hora de inicio | Marca de tiempo del primer paquete de red entre las direcciones IP de origen y de destino. |
| Hora de finalización | Marca de tiempo del último paquete de red entre las direcciones IP de origen y de destino. |
| Tipo de Ether | Tipo de encapsulación de marco Ethernet (IPv4 o IPv6). |
| Tipo de flujo | Tipo de formato de datos de NetFlow (IPFIX, sFlow5, NetFlow5, NetFlow9 o desconocido). |
| Protocolo IP | Protocolo utilizado para la comunicación (como ICMP, TCP o UDP). |
| IP del siguiente salto | Dirección IP del siguiente salto en la ruta de red. |
| Marcador TCP | Unión de todos los marcadores TCP observados durante la duración del flujo. |
| Bytes | Número total de bytes transferidos. |
| Paquetes | Número total de paquetes transferidos. |

Además de los campos, también puedes utilizar facetas predefinidas para empezar a analizar patrones de tráfico basados en las direcciones IP de origen y de destino de NetFlow.

### Facetas IP de destino de NetFlow

| Nombre de la faceta | Descripción de la faceta |
|---|---|
| Dominio del AS de destino | El dominio asociado al Autonomous System (AS) al que pertenece la IP de destino. |
| Nombre del AS de destino | El nombre del Autonomous System (AS) al que pertenece la IP de destino. |
| Número del AS de destino | El número asignado al Autonomous System (AS) al que pertenece la IP de destino. |
| Ruta del AS de destino | La información de ruta asociada al Autonomous System (AS) al que pertenece la IP de destino. |
| Tipo del AS de destino | El tipo de Autonomous System (AS) al que pertenece la IP de destino (como tránsito, cliente, par). |
| Nombre de la aplicación de destino | El nombre de la aplicación asociada a la IP de destino. |
| Nombre de la ciudad de destino | El nombre de la ciudad asociada a la IP de destino. |
| Nombre del proveedor de la nube de destino | El nombre del proveedor de la nube asociado a la IP de destino. |
| Región del proveedor de la nube de destino | La región del proveedor de la nube asociada a la IP de destino. |
| Servicio del proveedor de la nube de destino | El servicio proporcionado por el proveedor de la nube asociado a la IP de destino. |
| Código del continente de destino | Código que representa el continente asociado a la IP de destino. |
| Nombre del continente de destino | El nombre del continente asociado a la IP de destino. |
| Código ISO del país de destino | El código ISO que representa el país asociado a la IP de destino. |
| Nombre del país de destino | El nombre del país asociado a la IP de destino. |
| IP de destino | La dirección IP de destino. |
| Latitud del destino | La coordenada de latitud asociada a la IP de destino. |
| Longitud del destino | La coordenada de longitud asociada a la IP de destino. |
| MAC de destino | La dirección MAC (Media Access Control) asociada a la IP de destino. |
| Máscara de destino | La máscara de subred asociada a la IP de destino. |
| Puerto de destino | El número del puerto de destino. |
| Nombre de host DNS inverso de destino | El nombre de host DNS asociado a la IP de destino. |
| Código ISO de subdivisión del destino | El código ISO que representa la subdivisión (como estado o provincia) asociada a la IP de destino. |
| Nombre de la subdivisión de destino | El nombre de la subdivisión (como estado o provincia) asociada a la IP de destino. |
| Zona horaria de destino | La zona horaria asociada a la IP de destino. |

### Facetas IP de origen de NetFlow

| Nombre de la faceta | Descripción de la faceta |
|---|---|
| Dominio del AS del origen | El dominio asociado al Autonomous System (AS) al que pertenece la IP de origen. |
| Nombre del AS del origen | El nombre del Autonomous System (AS) al que pertenece la IP de origen. |
| Número del AS del origen | El número asignado al Autonomous System (AS) al que pertenece la IP de origen. |
| Ruta del AS de origen | La información de ruta asociada con el Autonomous System (AS) al que pertenece la IP de origen. |
| Tipo de AS de origen | El tipo de Autonomous System (AS) al que pertenece la IP de origen (como tránsito, cliente, par). |
| Nombre de la aplicación de origen | El nombre de la aplicación asociada a la IP de origen. |
| Nombre de la ciudad de origen | El nombre de la ciudad asociada a la IP de origen. |
| Nombre del proveedor de la nube de origen | El nombre del proveedor de la nube asociado a la IP de origen. |
| Región del proveedor de la nube de origen | La región del proveedor de la nube asociada a la IP de origen. |
| Servicio del proveedor de la nube de origen | El servicio proporcionado por el proveedor de la nube asociada a la IP de origen. |
| Código del continente de origen | El código que representa el continente asociado a la IP de origen. |
| Nombre del continente de origen | El nombre del continente asociado a la IP de origen. |
| Código ISO del país de origen | El código ISO que representa el país asociado a la IP de origen. |
| Nombre del país de origen | El nombre del país asociado a la IP de origen. |
| IP de origen | La dirección IP de origen. |
| Latitud de origen | La coordenada de latitud asociada a la IP de origen. |
| Longitud de origen | La coordenada de longitud asociada a la IP de origen. |
| MAC de origen | La dirección de MAC (Media Access Control) asociada a la IP de origen. |
| Máscara de origen | La máscara de subred asociada a la IP de origen. |
| Puerto de origen | El número del puerto de origen. |
| Nombre de host DNS inverso de origen | El nombre de host DNS asociado a la IP de origen. |
| Código ISO de la subdivisión de origen | El código ISO que representa la subdivisión (como estado o provincia) asociada a la IP de origen. |
| Nombre de la subdivisión de origen | El nombre de la subdivisión (como estado o provincia) asociada a la IP de origen. |
| Zona horaria de origen | La zona horaria asociada a la IP de origen. |

## Frecuencia de muestreo

La frecuencia de muestreo de NetFlow se tiene en cuenta en el cálculo de bytes y paquetes por defecto. Los valores mostrados para los bytes y los paquetes se calculan con la frecuencia de muestreo aplicada.
Además, puedes consultar y visualizar **Bytes (ajustados) (@adjusted_bytes)** y **Paquetes (ajustados) (@adjusted_packets)** en los dashboards y los notebooks.

Para visualizar los bytes/paquetes sin procesar (muestreados) enviados por tus dispositivos, puedes consultar **Bytes (muestreados) (@bytes)** y **Paquetes (muestreados) (@packets)** en dashboards y notebooks.

## Conservación

Los datos de NetFlow se conservan durante 30 días por defecto, con opciones de conservación de 15, 30, 60 y 90 días.

<div class="alert alert-warning">Para conservar los datos de NetFlow durante más tiempo, ponte en contacto con el representante de tu cuenta.</div>

## Solucionar problemas

### Pérdida de paquetes de NetFlow
Las pérdidas de paquetes de NetFlow pueden producirse cuando hay un número elevado de paquetes de NetFlow por segundo, generalmente superior a 50.000. Los siguientes pasos pueden ayudarte a identificar y mitigar las pérdidas de paquetes de NetFlow:

#### Identificar las pérdidas de paquetes

Utiliza el comando `netstat -s` para ver si hay algún paquete UDP perdido:

```bash
    netstat -s
  ```

#### Medidas de mitigación
1. Aumentar el número de agentes de escucha de NetFlow

  Aumente el número de agentes de escucha de NetFlow utilizando una configuración similar a la siguiente:
  Datadog recomienda ajustar el número de workers al número de núcleos de CPU del sistema:

```yaml
      netflow:
        enabled: true
        listeners:
          - flow_type: netflow9
            port: 2055
            workers: 4 # 4 CPUs
```

2. Aumentar la longitud de la cola UDP (sólo Linux)

  Ajustar la longitud de la cola UDP de tu sistema puede ayudar a acomodar el mayor volumen de paquetes de NetFlow. Aumenta el tamaño del buffer de recepción UDP a 25 MB ejecutando los siguientes comandos:

```bash
    sudo sysctl -w net.core.rmem_max=26214400
    sudo sysctl -w net.core.rmem_default=26214400
```

3. Persistencia de la configuración (sólo Linux)

  Para que estos cambios sean permanentes, añade las siguientes líneas a tu archivo `/etc/sysctl.conf`:

```bash
    net.core.rmem_max=26214400
    net.core.rmem_default=26214400
```

## Referencias adicionales

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