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
title: Monitorización de NetFlow
---

## Información general

Utiliza NetFlow Monitoring en Datadog para visualizar y monitorizar tus registros de flujo en tus dispositivos habilitados para NetFlow.

{{< img src="network_device_monitoring/netflow/home.png" alt="Página de NetFlow Monitoring con pestañas de fuentes principales, destinos, protocolos, puertos de origen, puertos de destino y tendencias de dispositivos" style="width:100%;" >}}

## Instalación

Para utilizar NetFlow Monitoring con Network Device Monitoring, asegúrate de que estás utilizando la versión 7.45 o posterior del [Agent][1].

**Nota:** Configurar la [recopilación de métricas de Network Device Monitoring][2] no es un requisito para enviar datos de NetFlow, pero es algo fuertemente recomendado, ya que estos datos adicionales pueden ser utilizados para enriquecer tus registros de flujos con información, como el nombre del dispositivo, el modelo y el vendedor, así como el nombre de la interfaz de entrada/salida.

## Configuración

Para configurar tus dispositivos para enviar tráfico de NetFlow, jFlow, sFlow o IPFIX al servidor NetFlow del Agent, tus dispositivos deben estar configurados para enviar tráfico a la dirección IP en la que está instalado el Datadog Agent, específicamente `flow_type` y `port`.

Edita tu archivo de configuración del Agent [`datadog.yaml`][3] para activar NetFlow:

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

Luego de guardar los cambios, [reinicia el Agent][4].

**Nota**: Asegúrate de que tus [reglas de firewall][9] permiten el tráfico UDP entrante en los puertos configurados.

## Agregación

El Datadog Agent añade automáticamente los datos recibidos a NetFlow para limitar el número de registros enviados a la plataforma, al mismo tiempo que conserva la mayor parte de la información. Por defecto, los registros de flujos que tienen los mismos identificadores, como `source`, `destination address`, `port` y `protocol`, se agregan juntos en intervalos de cinco minutos. Además, el Datadog Agent puede detectar puertos efímeros y eliminarlos. Como resultado, es posible que aparezcan flujos con `port:*`.

## Enriquecimiento

Tus datos de NetFlow son procesados por el backend de Datadog y son enriquecidos con los metadatos disponibles de tus dispositivos e interfaces. El enriquecimiento se basa en la IP del exportador de NetFlow y en los índices de la interfaz. Para desambiguar posibles colisiones entre las IP privadas reutilizadas, puedes configurar un `namespace` diferente para cada archivo de configuración del Agent (con el parámetro `network_devices.namespace`).

Si la IP del exportador de NetFlow es una de las direcciones IP del dispositivo, pero no la que está configurada en la integración SNMP, Datadog intenta localizar el dispositivo al que pertenece la IP del exportador y enriquece tus datos de NetFlow, siempre que la coincidencia sea única.

### Enriquecimiento de IP del proveedor de la nube

Datadog enriquece las IP con el servicio y la región del proveedor de la nube pública para las direcciones IPv4, de modo que puedas filtrar los registros de flujos de un servicio y una región específicos.

{{< img src="network_device_monitoring/netflow/netflow_cloud_provider_ip_enrichment.png" alt="Direcciones IP de NetFlow enriquecidas con el nombre, la región y el servicio del proveedor de la nube" width="80%" >}}

### Enriquecimiento de puertos

Datadog enriquece los puertos en NetFlow con datos de IANA (Internet Assigned Numbers Authority) para resolver asignaciones de puertos bien conocidos (como Postgres en 5432 y HTTPS en 443). Esto puede observarse cuando se buscan nombres de aplicaciones de origen o de destino en NetFlow.

{{< img src="network_device_monitoring/netflow/netflow_iana_port_mappings.png" alt="Página de NetFlow filtrada por @destination.application_name, que muestra nombres de puertos como HTTPS" width="80%" >}}

#### Enriquecimiento personalizado de puertos

También puedes añadir tus propios enriquecimientos personalizados para asignar puertos y protocolos a aplicaciones específicas (por ejemplo, si un servicio personalizado se ejecuta en un puerto específico). Esto permite a los ingenieros de redes y a tus equipos interpretar y consultar los datos de NetFlow con nombres legibles.

En la pestaña **Configuración** en NetFlow, haz clic en **Add Enrichment** (Añadir enriquecimiento) para cargar el archivo CSV que contiene tus enriquecimientos personalizados.

{{< img src="network_device_monitoring/netflow/new_enrichment.png" alt="Modal de Asignación de nuevo enriquecimiento en la pestaña de configuración de NetFlow" width="80%" >}}

### Enriquecimiento de IP privada con DNS inverso

Activa el enriquecimiento de IP privada con DNS inverso para realizar búsquedas de DNS de nombres de host asociados a direcciones IP de origen o destino. Cuando se activa, el Agent realiza búsquedas con DNS inverso en IP de origen y destino dentro de rangos de direcciones privadas, enriqueciendo los registros NetFlow con los nombres de host correspondientes.

Por [defecto][7], el enriquecimiento de IP con DNS inverso en tu archivo `datadog.yaml` está deshabilitado. Para habilitarlo, consulta la sección [Configuración](#configuration) de esta página.

Busca **DNS** en la agrupación de Flujo de la sección de facetas para encontrar los flujos asociados con el enriquecimiento de IP con DNS inverso:

{{< img src="network_device_monitoring/netflow/dns_ip_enrichment.png" alt="Captura de pantalla del destino DNS inverso y de las facetas de origen" width="100%" >}}

**Nota**: Las entradas de DNS inverso se almacenan en caché y están sujetas a limitaciones de frecuencia para minimizar las consultas DNS y reducir la carga de los servidores DNS. Para obtener más información sobre las opciones de configuración, incluyendo la modificación del almacenamiento en caché predeterminado y la limitación de frecuencia, consulta el [archivo de configuración completo][8].

## Visualización

Puedes acceder a los datos recopilados por NetFlow Monitoring en la página de [**NetFlow**][5]. Pasa el cursor sobre un flujo de la lista para obtener información adicional sobre hosts, pods y contenedores, y acceder a las conexiones de red relacionadas.

{{< img src="network_device_monitoring/netflow/information.png" alt="Pasa el cursor sobre un flujo agregado desde un dispositivo emisor de NetFlow para acceder a las conexiones relacionadas con la red" width="100%" >}}

Al crear un [monitor de NetFlow][6], debes tener en cuenta los siguientes campos, con respecto a la IP de origen o la IP de destino, desde la perspectiva del dispositivo. Estos campos proporcionan información sobre los patrones de tráfico de red y ayudan a optimizar el rendimiento y la seguridad.

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

Mediante la monitorización de estos campos clave y del uso de facetas para analizar eventos de NetFlow, las organizaciones pueden obtener visibilidad de su infraestructura de red, optimizar el rendimiento y mejorar la postura de seguridad.

{{< img src="monitors/monitor_types/netflow/monitor.png" alt="Crea un dashboard con datos de NetFlow" width="100%" >}}

Estos datos también están disponibles en dashboards y notebooks, lo que permite realizar consultas precisas y correlacionarlas con otras fuentes de datos. Al crear un dashboard con datos de NetFlow, selecciona **NetFlow** como fuente en la sección **Grafica tus datos**.

{{< img src="network_device_monitoring/netflow/dashboard.png" alt="Crea un dashboard con datos de NetFlow" width="100%" >}}

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