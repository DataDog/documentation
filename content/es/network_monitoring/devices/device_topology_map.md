---
aliases:
- /es/network_monitoring/devices/network_topology_map
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: Blog
  text: Visualiza las relaciones en toda tu red on-premise con el mapa de topología
    de dispositivos.
- link: /network_monitoring/devices/data
  tag: Documentación
  text: Datos recopilados con la Monitorización de dispositivos de red
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Monitorización de SNMP con Datadog
title: Mapa topológico de dispositivos
---

## Información general

El [Mapa topológico de dispositivos de red][2] proporciona una visión general de las conexiones físicas de tu red, para que puedas identificar más fácilmente los problemas en tus dispositivos y comprender sus impactos en los flujos ascendentes y descendentes.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_search_3.mp4" alt="El mapa de topología de dispositivos de red, con vendor:cisco añadido en la barra de búsqueda y, luego, la casilla Filtrar nodos filtrada por nyc. Se selecciona un nodo y se marca la opción Inspeccionar, que muestra los nodos conectados. Luego se selecciona uno de los nodos conectados y se vuelve a marcar la opción Inspeccionar, la cual muestra los nodos conectados adicionales" video="true" >}}

## Ajustes

Datadog Agent versión 7.52 y posteriores recopila automáticamente los datos de topología. No es necesaria ninguna instalación adicional.

### Requisitos previos

1. Los dispositivos tienen LLDP (Link Layer Discovery Protocol) o CDP (Cisco Discovery Protocol) activado con SNMP. Utiliza el mismo protocolo en los dispositivos conectados para que puedan detectarse mutuamente. Generalmente se prefiere LLDP, ya que es una opción más común.
2. Datadog Agent versión 7.52 o posterior.

## Opciones de navegación

En el Mapa de topología de red, están disponibles las siguientes opciones de navegación:

### Vista

1. En **View By** (Ver por), utiliza las etiquetas (tags) para seleccionar cómo deseas visualizar los dispositivos:

{{< img src="/network_device_monitoring/network_topology_map/device-topology-grouped.png" alt="La opción de navegación, con la vista por dispositivos y etiquetas seleccionada, resaltada la vista por ubicación" style="width:80%;" >}}

### Color

2. En **Color by** (Color por), cambia cómo se colorean los nodos en el Mapa de topología de dispositivos basándose en:

- **Estado del dispositivo**: muestra los nodos en el Mapa topológico de dispositivos por nivel de alcance de SNMP.
- **Estado de ping**: muestra los nodos en el Mapa topológico de dispositivos por [estado de ping][6].

{{< img src="/network_device_monitoring/network_topology_map/device-topology-overview-intro.png" alt="La opción de navegación, con la vista por color seleccionada y la opción vista por estado de dispositivo resaltada" style="width:80%;" >}}

   A continuación, se presentan las definiciones de los nodos para cada estado de color:
  <div style="width:80%; margin: 0 auto;">

   | Color    | Descripción               |
   |----------|---------------------------|
   | Verde   | Dispositivo accesible.      |
   | Rojo   | Problema con el dispositivo, como no se puede acceder a través de SNMP.  |
   | Gris    | El dispositivo está monitorizado por NDM; sin embargo, no se han recibido datos. Por ejemplo, si el ping no se configuró y optó por `color by` **Ping State** (Estado del ping) en el Mapa de topología de dispositivos, los dispositivos se muestran en gris. |
   | Sin color | Dispositivos de sombra que no son directamente monitorizados por NDM, pero son detectables a través de LLDP/CDP desde un dispositivo conectado que NDM está monitorizando. Puedes activar/desactivar la [sección Ocultar _N_ dispositivos no monitorizados](#filter-devices) si deseas que estos dispositivos se muestren en el Mapa topológico de dispositivos.         |

   </div>

### Filtrar dispositivos

3. En **Filter Devices** (Filtrar dispositivos), podrás controlar de forma más detallada qué dispositivos se muestran en el Mapa de topología de dispositivos.

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_devices_hide.png" alt="La opción de navegación, con la opción de filtro Ver seleccionada, que marca Ocultar dispositivos no monitorizados" style="width:80%;" >}}

**Nota:** El ajuste **Filter Devices** (Filtrar dispositivos) afecta a los dispositivos que se muestran en el Mapa topológico de dispositivos para _todas_ las consultas que puedas realizar. Por ejemplo, si filtras por una faceta de dispositivo en la barra de búsqueda.

Ocultar _N_ dispositivos no monitorizados: desactivado por defecto.
: activar esta opción oculta los dispositivos en el Mapa topológico de dispositivos que no están directamente monitorizados por la Monitorización de dispositivos de red, pero que aun así los detecta LLDP/CDP, y se muestran en el mapa de dispositivos adyacentes que están monitorizados por la Monitorización de dispositivos de red.

Ocultar _N_ dispositivos desconectados: desactivado por defecto.
: activar esta opción oculta los dispositivos que no tienen conexiones de enlace. Los dispositivos pueden estar desconectados por razones como una configuración incorrecta, o que el dispositivo no es compatible con [LLDP/CDP](#troubleshooting).

### Leyenda del icono

Los dispositivos SNMP se emparejan con un icono representativo en función de su tipo de dispositivo en cada nodo de dispositivo, tal y como se define en sus [perfiles de dispositivo][4].

<table>
  <colgroup>
    <col style="width:20%">
    <col style="width:20%">
  </colgroup>
  <tr>
    <th>Icono</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="Access point icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Punto de acceso</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="Firewall icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Firewall</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="Router icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Enrutador</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="Server icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Servidor</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="Switch icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Cambio</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="Device icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Dispositivo</td>
  </tr>
</table>


## Investigación de dispositivos

Además de proporcionar una visión general de las conexiones físicas de tu red, puedes investigar los dispositivos individuales para comprender sus conexiones, flujos y estado general. Al pasar el ratón por encima de un dispositivo, se muestra su estado general y las principales métricas. También puedes hacer clic en un dispositivo para ver las siguientes opciones:

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_3.png" alt="El Mapa de topología de dispositivos de red con un dispositivo seleccionado, que muestra la información sobre el dispositivo, además de las opciones Inspeccionar, Ver detalles de dispositivo y Ver detalles del flujo" style="width:80%;" >}}

### Inspeccionar

Selecciona **Inspect** (Inspeccionar) para ver las conexiones de interfaz del dispositivo. Haz clic en cualquiera de las interfaces conectadas para seguir investigando.
Esta vista sólo muestra las interfaces físicas que están realmente conectadas a otro dispositivo. Esto significa que muestra un subconjunto del conjunto total de interfaces de un dispositivo de red.

{{< img src="/network_device_monitoring/network_topology_map/ndm_topology_interface_updated.png" alt="La vista Inspeccionar de un dispositivo individual, que muestra las conexiones de interfaz del dispositivo" style="width:80%;" >}}

### Ver detalles del dispositivo

Elige **View device details** (Ver detalles del dispositivo) para ver información como la dirección IP del dispositivo y las etiquetas, así como datos relacionados con el rendimiento, la CPU y la memoria.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_device_details_2.png" alt="La pestaña Ver detalles del dispositivo de un dispositivo individual" style="width:80%;" >}}

Desde esta vista, también puedes ver las interfaces conectadas del dispositivo en la pestaña **Connected Interfaces** (Interfaces conectadas).

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_devices_interface_2.png" alt="La pestaña Ver detalles de dispositivos de un dispositivo individual con la pestaña Interfaces seleccionada" style="width:80%;" >}}

### Ver detalles del flujo

Selecciona **View flow details** (Ver detalles del flujo) para abrir la pestaña NetFlow filtrada por el `@device.ip` del dispositivo para una exploración detallada de los orígenes, destinos y volumen del dispositivo. Consulta la página [Monitorización de NetFlow][1] para obtener más información.

## Solucionar problemas

Si experimentas problemas al utilizar el Mapa topológico de red, utiliza las siguientes directrices para solucionar problemas. Si necesitas más ayuda, ponte en contacto con el [soporte de Datadog][5].

### Cuadro de mensaje "Faltan datos de topología"

{{< img src="/network_device_monitoring/network_topology_map/missing_topology_map.png" alt="El mensaje Faltan datos de topología, que se muestra cuando el mapa renderizado no tiene enlaces" style="width:80%;" >}}

Este mensaje aparece cuando el mapa renderizado no tiene enlaces.

**Nota**: Dado que el conmutador "Ocultar _N_ dispositivos desconectados" está activado por defecto, este mensaje se muestra con un mapa vacío.

### Mensaje "Mapa vacío"

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="El mensaje No se encontraron dispositivos que se muestra cuando NDM no está configurado o por los filtros aplicados." style="width:80%;" >}}

No hay dispositivos porque NDM no está configurado.

### No se han encontrado conexiones/No hay dispositivos conectados para mostrar

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="El mensaje No se encontraron dispositivos que se muestra cuando NDM no está configurado o por los filtros aplicados." style="width:80%;" >}}

- Desactiva la opción "Hide _N_ Unconnected Devices" (Ocultar _N_ dispositivos desconectados) para mostrar los dispositivos aislados.
- Utiliza la etiqueta de categorización para ayudar a entender la vista de tu mapa con jerarquía de información.

### Mapa vacío/sin dispositivos monitorizados

- Asegúrate de que el conmutador "Hide _N_ Unconnected Devices" (Ocultar _N_ dispositivos desconectados) está desactivado.

### Dispositivos/conexiones faltantes

Los datos del Mapa de topología de dispositivos se basan en información LLDP (Link Layer Discovery Protocol) y CDP (Cisco Discovery Protocol) recopilada con SNMP. Si en tu mapa faltan dispositivos o conexiones, asegúrate de lo siguiente:

- Datadog Agent versión 7.52 o posterior está instalado.
- Los dispositivos tienen LLDP o CDP habilitados con SNMP.

Verifica que tus dispositivos están exponiendo datos LLDP y CDP con los siguientes comandos:

Para datos LLDP:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
Para datos CDP:
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### Conexiones o enlaces faltantes

Si tu dispositivo está exponiendo datos de topología con LLDP o CDP, pero faltan algunas de las conexiones, asegúrate de que el conmutador "Hide _N_ Unmonitored Devices" (Ocultar _N_ dispositivos no monitorizados) está desactivado.
Si estás utilizando etiquetas para filtrar nodos en el mapa, asegúrate de que el conmutador "Show one hop away on filter" (Mostrar a un salto en el filtro) está activado para ver los nodos conectados.

### Dispositivos no monitorizados mostrados en el mapa

El Mapa de topología de dispositivos muestra todos los dispositivos detectados con LLDP o CDP. Estos pueden ser nuevos dispositivos que ya no están monitorizados con SNMP o dispositivos existentes que no fueron [resueltos](#device-resolution) al dispositivo monitorizado equivalente.
Puedes utilizar el conmutador "Hide _N_ Unmonitored Devices" (Ocultar _N_ dispositivos no monitorizados) para ocultar estos nodos.

### Dispositivo duplicado en el mapa

El Mapa de topología de dispositivos muestra todos los dispositivos detectados con LLDP o CDP. En algunos casos, estos dispositivos ya están monitorizados con SNMP, pero no pueden ser [resueltos](#device-resolution) al dispositivo monitorizado equivalente. En este caso, el dispositivo se muestra dos veces: un nodo que representa el dispositivo monitorizado y un nodo que representa el dispositivo LLDP/CDP detectado.
Utiliza el conmutador "Hide _N_ Unmonitored Devices" (Ocultar _N_ dispositivos no monitorizados) para ocultar los nodos no monitorizados.

### Nodos sin bordes o negros en el mapa

Los nodos sin bordes o negros en el Mapa de topología de dispositivos pueden representar dispositivos detectados con LLDP o CDP que no están configurados para monitorizarse con NDM, o dispositivos detectados con LLDP o CDP que no pueden ser resueltos al [dispositivo monitorizado](#device-resolution) equivalente.

## Resolución del dispositivo

El Mapa de topología de dispositivos proporciona una visión general de los dispositivos monitorizados con NDM y sus conexiones físicas. Los datos de los enlaces topológicos se basan en la información LLDP (Link Layer Discovery Protocol) o CDP (Cisco Discovery Protocol) recopilada con SNMP.
Las conexiones detectadas con LLDP o CDP pueden corresponder a dispositivos ya monitorizados con SNMP. La resolución de dispositivos consiste en hacer coincidir el dispositivo detectado con el dispositivo monitorizado.

### Fallos en la resolución de dispositivos

La resolución del dispositivo puede fallar si el dispositivo no se monitoriza con NDM, o si los datos LLDP o CDP son insuficientes para hacer coincidir el dispositivo detectado con el dispositivo monitorizado.


## Para leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/network_monitoring/netflow/
[2]: https://app.datadoghq.com/devices?viewTab=topology
[3]: /es/network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
[4]: /es/network_monitoring/devices/profiles/
[5]: /es/help
[6]: /es/network_monitoring/devices/snmp_metrics/?tab=snmpv2#ping