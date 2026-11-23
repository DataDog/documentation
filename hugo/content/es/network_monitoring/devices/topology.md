---
aliases:
- /es/network_monitoring/devices/network_topology_map
- /es/network_monitoring/devices/device_topology_map
code_lang: topology
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: Blog
  text: Visualice las relaciones en su red local con el Mapa de Topología de Dispositivos
- link: /network_monitoring/devices/data
  tag: Documentación
  text: Datos recopilados con Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Hacer un seguimiento de SNMP con Datadog
title: Mapa de Topología de Dispositivos
type: multi-code-lang
---
## Descripción general {#overview}

El [Mapa de Topología de Dispositivos][2] utiliza diagramas de [Cloudcraft][7] para proporcionar una representación visual interactiva de las conexiones físicas de su red. El mapa descubre y muestra automáticamente los dispositivos, sus interfaces y las relaciones entre ellos. Esta visualización le ayuda a identificar problemas en sus dispositivos de red, comprender sus impactos ascendentes y descendentes, solucionar problemas de conectividad y obtener información sobre cómo fluye el tráfico a través de su infraestructura.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_new_4.mp4" alt="Un usuario agrega etiquetas de equipo, servicio y proveedor al mapa de topología de dispositivos de red, luego selecciona un dispositivo para abrir la vista de dispositivo de NDM." video="true" >}}

## Configuración {#setup}

La versión 7.52 y posteriores del Datadog Agent recopilan automáticamente datos de Topología. No es necesaria ninguna instalación adicional.

### Requisitos previos {#prerequisites}

1. Los dispositivos tienen habilitado LLDP (Link Layer Discovery Protocol) y/o CDP (Cisco Discovery Protocol) con SNMP. Utilice el mismo protocolo en los dispositivos conectados para que puedan descubrirse entre sí. Generalmente se prefiere LLDP, ya que es una opción más común.
2. Datadog Agent versión 7.52 o posterior está instalado.

## Opciones de navegación {#navigation-options}

En el Mapa de topología de red, están disponibles las siguientes opciones de navegación:

### Agrupar por {#group-by}

En {{< ui >}}Group By{{< /ui >}}, utilice etiquetas como `location` y `vendor` para seleccionar cómo desea visualizar sus dispositivos:

{{< img src="/network_device_monitoring/network_topology_map/device-topology-group_by_2.png" alt="Un control de Agrupar por que muestra etiquetas de ubicación y proveedor." style="width:90%;" >}}

### Filtrar dispositivos {#filter-devices}

Seleccione el menú desplegable {{< ui >}}\+ Filter{{< /ui >}} para refinar qué dispositivos se muestran en el Mapa de Topología de Dispositivos.

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_3.png" alt="El Mapa de Topología de Dispositivos con el menú desplegable de filtros abierto." style="width:90%;" >}}

**Nota:** La configuración {{< ui >}}Filter Devices{{< /ui >}} determina qué dispositivos aparecen en el Mapa de Topología de Dispositivos para todas las consultas, incluidas aquellas que filtran por una faceta de dispositivo en la barra de búsqueda.

### Recursos {#resources}

Utilice el menú desplegable {{< ui >}}Resource{{< /ui >}} para filtrar el diagrama por tipos de dispositivos específicos, como firewalls, puntos de acceso y enrutadores.

{{< img src="/network_device_monitoring/network_topology_map/resources_dropdown.png" alt="El Mapa de Topología de Dispositivos con el menú desplegable Recursos abierto y Dispositivo no monitoreado desmarcado." style="width:30%;" >}}

De forma predeterminada, la opción {{< ui >}}Unmonitored Device{{< /ui >}} está desmarcada, lo que oculta los dispositivos que no son monitoreados directamente por Network Device Monitoring pero que se descubren a través de LLDP/CDP desde dispositivos monitoreados adyacentes. Marque esta opción para mostrar estos dispositivos no monitoreados en el diagrama.

## Investigación de dispositivos {#investigating-devices}

Además de mostrar una descripción general de las conexiones físicas de su red, el Mapa de topología de dispositivos le permite investigar dispositivos individuales para comprender sus conexiones, flujos y estado general. Pase el cursor sobre un dispositivo para ver su estado y métricas clave, o haga clic en un dispositivo para abrir la vista de dispositivo NDM con detalles como su dirección IP, etiquetas, rendimiento, CPU y memoria.

Mientras investiga un dispositivo, haga clic en el menú desplegable {{< ui >}}Open Device Page{{< /ui >}} en la parte superior derecha de la vista del dispositivo para navegar a [NetFlow Monitoring][1] u otras páginas relacionadas para una investigación más profunda.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_7.png" alt="El Mapa de topología de dispositivos de red con un dispositivo seleccionado, que muestra información en la vista de dispositivo de NDM." style="width:100%;" >}}

### Dependencias {#dependencies}

La sección {{< ui >}}Dependencies{{< /ui >}} en la vista de dispositivo de NDM muestra de un vistazo la cantidad de dispositivos de red, puntos de conexión y túneles VPN conectados físicamente, junto con un gráfico visual de los dispositivos vecinos.

{{< img src="/network_device_monitoring/network_topology_map/topology_dependencies_2.png" alt="La vista de dispositivo de NDM que muestra la sección de Dependencias con un gráfico de dispositivos conectados." style="width:100%;" >}}

Haga clic en {{< ui >}}View dependencies{{< /ui >}} para abrir la página completa del dispositivo. En la pestaña {{< ui >}}Dependencies{{< /ui >}}, seleccione las opciones {{< ui >}}VPN tunnels{{< /ui >}}, {{< ui >}}Network devices{{< /ui >}} o {{< ui >}}Endpoints{{< /ui >}} para cambiar entre las vistas de dependencia.

<div class="alert alert-info">
Las dependencias de VPN requieren que <a href="/network_monitoring/devices/vpn_monitoring/">VPN Monitoring</a> esté configurado. Las dependencias de puntos de conexión requieren que <a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring (EUDM)</a> esté configurado.
</div>

#### Túneles VPN {#vpn-tunnels}

La vista {{< ui >}}VPN tunnels{{< /ui >}} muestra un gráfico de topología junto a una tabla de VPN conectadas que muestra las IP de los pares, el protocolo, la interfaz y las subredes de destino.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_VPN_tunnels.png" alt="La pestaña Dependencias en la página del dispositivo NDM con la pestaña Túneles VPN seleccionada, que muestra un gráfico de topología y una tabla de VPN conectadas." style="width:100%;" >}}

#### Dispositivos de red {#network-devices}

La vista {{< ui >}}Network devices{{< /ui >}} muestra un gráfico de topología junto a una tabla de dispositivos conectados que muestra su estado, nombre de dispositivo, dirección IP, monitores, interfaz local e interfaz remota.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_network_devices.png" alt="La pestaña Dependencias en la página de dispositivo NDM con la pestaña Dispositivos de red seleccionada, que muestra un gráfico de topología con once dispositivos conectados, codificados por colores según su estado, y una tabla con más detalles sobre los dispositivos conectados." style="width:100%;" >}}

#### Puntos de conexión {#endpoints}

La vista {{< ui >}}Endpoints{{< /ui >}} muestra un gráfico de topología junto a una tabla de dispositivos de usuario final y sus estados. Seleccione un punto de conexión en el gráfico para visualizar más detalles y acceder a él en [EUDM][12].

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_endpoints.png" alt="La pestaña Dependencias en la página de dispositivo NDM, con la pestaña Puntos de conexión seleccionada, muestra un gráfico de topología con cinco dispositivos de usuario final conectados, de los cuales la vista de detalles de uno está abierta, además de una tabla con más información sobre los dispositivos conectados." style="width:100%;" >}}

### Métricas {#metrics}

Haga clic en la pestaña {{< ui >}}Metrics{{< /ui >}} en la vista de dispositivo NDM para ver las métricas clave del dispositivo, incluyendo el uso de CPU, el uso de memoria y el rendimiento. Las estadísticas de resumen se muestran en la parte superior y cada métrica se presenta como un gráfico a lo largo del tiempo. Haga clic en {{< ui >}}View all metrics{{< /ui >}} para explorar la lista completa de métricas recopiladas.

{{< img src="/network_device_monitoring/network_topology_map/metrics_3.png" alt="La vista de dispositivo NDM con la pestaña Métricas abierta, que muestra gráficos de CPU, memoria y rendimiento." style="width:100%;" >}}

### Tráfico {#traffic}

Haga clic en la pestaña {{< ui >}}Traffic{{< /ui >}} para visualizar el rendimiento total, entrante y saliente del dispositivo. Un gráfico de tráfico muestra la actividad a lo largo del tiempo, y la tabla {{< ui >}}Top Conversations{{< /ui >}} lista los flujos de fuente a destino de mayor volumen con tasa de bits, tasa de paquetes y bytes totales. Haga clic en {{< ui >}}View traffic{{< /ui >}} para investigar más a fondo en la página de resumen del dispositivo y en [NetFlow Monitoring][1].

{{< img src="/network_device_monitoring/network_topology_map/traffic_2.png" alt="La vista de dispositivo NDM con la pestaña Tráfico abierta, que muestra estadísticas de rendimiento, un gráfico de tráfico y una tabla de conversaciones principales." style="width:100%;" >}}

### Events {#events}

Haga clic en la pestaña {{< ui >}}Events{{< /ui >}} para visualizar los mensajes de Syslog y los traps SNMP en una vista única y combinada. Utilice filtros para limitar los resultados por tipo de evento. Los picos en el volumen de eventos se resaltan visualmente, lo que le ayuda a identificar e investigar errores.

{{< img src="/network_device_monitoring/network_topology_map/events.png" alt="La vista del dispositivo NDM con la pestaña Eventos abierta, que muestra mensajes de Syslog y traps SNMP." style="width:100%;" >}}

### Visualizar detalles del flujo {#view-flow-details}

Para explorar las fuentes, los destinos y el volumen de tráfico de un dispositivo, haga clic en el menú desplegable {{< ui >}}Open Device Page{{< /ui >}} y seleccione {{< ui >}}NetFlow Monitoring{{< /ui >}}. Los datos se filtran automáticamente según el `@device.ip` del dispositivo. Para obtener más información, consulte [NetFlow Monitoring][1].

{{< img src="/network_device_monitoring/network_topology_map/netflow_tab_4.png" alt="La vista del dispositivo NDM con el menú desplegable Página de dispositivo abierto que muestra la opción NetFlow Monitoring." style="width:100%;" >}}

### Configuración del dispositivo {#device-settings}

Haga clic en el icono {{< ui >}}Device Settings{{< /ui >}} en la vista del dispositivo NDM para abrir el panel de Configuración del dispositivo. La pestaña {{< ui >}}Information{{< /ui >}} muestra detalles generales (nombre, espacio de nombres y descripción), detalles de red (dirección IP, subred y geolocalización) y detalles de hardware (modelo, proveedor, SO y versión). La pestaña {{< ui >}}Tags{{< /ui >}} le permite visualizar y administrar las etiquetas asociadas con el dispositivo.

{{< img src="/network_device_monitoring/network_topology_map/device_settings.png" alt="El panel de Configuración del dispositivo para un dispositivo NDM, que muestra la pestaña de Información con detalles generales, de red y de hardware." style="width:90%;" >}}

### Detalles del enlace {#link-details}

Haga clic en un enlace entre dispositivos para explorar los detalles de la conexión, incluidos el volumen de tráfico, la utilización del ancho de banda, los errores y los descartes, con opciones para visualizar los datos en [Device Overview][10] o [NetFlow Monitoring][11].

{{< img src="/network_device_monitoring/network_topology_map/link_details.mp4" alt="Un usuario haciendo clic en un enlace entre dispositivos para visualizar detalles adicionales del enlace." video="true" >}}

### Leyenda de iconos {#icon-legend}

Los dispositivos SNMP se asignan a un icono representativo según su tipo de dispositivo en cada nodo de dispositivo, tal como se define en sus [perfiles de dispositivo][4].

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
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="Icono de punto de acceso" style="width:10%; border:none;" popup="false">}}</td>
    <td>Punto de acceso</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="Icono de firewall" style="width:10%; border:none;" popup="false">}}</td>
    <td>Firewall</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="Icono de router" style="width:10%; border:none;" popup="false">}}</td>
    <td>Router</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="Icono de servidor" style="width:10%; border:none;" popup="false">}}</td>
    <td>Server</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="Icono de switch" style="width:10%; border:none;" popup="false">}}</td>
    <td>Switch</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="Icono de dispositivo" style="width:10%; border:none;" popup="false">}}</td>
    <td>Dispositivo</td>
  </tr>
</table>

## Solución de problemas {#troubleshooting}

Si experimenta problemas al usar el Mapa de topología de red, utilice las siguientes pautas de solución de problemas. Si necesita más asistencia, comuníquese con [soporte de Datadog][5].

### Mensaje de mapa vacío {#empty-map-message}

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="El mensaje de no se encontraron dispositivos que se muestra cuando NDM no está configurado o debido al filtrado." style="width:80%;" >}}

No hay dispositivos porque NDM no está configurado.

### No se encontraron conexiones / No hay dispositivos conectados para mostrar {#no-connections-found-no-connected-devices-to-show}

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="El mensaje de no se encontraron dispositivos que se muestra cuando NDM no está configurado o debido al filtrado." style="width:80%;" >}}

- Active la selección {{< ui >}}Unmonitored Device{{< /ui >}} para mostrar los dispositivos no monitoreados.
- Use la etiqueta de categorización para ayudar a comprender su vista de mapa con jerarquía de información.

### Dispositivos/conexiones faltantes {#missing-devicesconnections}

Los datos del Mapa de topología de dispositivos se basan en la información de LLDP (Protocolo de descubrimiento de capa de enlace) y CDP (Protocolo de descubrimiento de Cisco) recopilada con SNMP. Si a su mapa le faltan dispositivos y/o conexiones, verifique lo siguiente:

- El Datadog Agent versión 7.52 o posterior está instalado.
- Los dispositivos tienen LLDP y/o CDP habilitados con SNMP.

Verifique que sus dispositivos estén exponiendo datos de LLDP y CDP con los siguientes comandos:

Para datos de LLDP:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
Para datos de CDP
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### Conexiones o enlaces faltantes {#missing-connections-or-links}

Si su dispositivo está exponiendo datos de topología con LLDP o CDP pero faltan algunas de las conexiones, verifique que la selección {{< ui >}}Unmonitored Device{{< /ui >}} esté desactivada.

### Dispositivos no monitoreados que aparecen en el mapa {#unmonitored-devices-showing-on-map}

El Mapa de topología de dispositivos muestra todos los dispositivos descubiertos con LLDP o CDP. Estos pueden ser dispositivos nuevos que aún no se monitorean con SNMP o dispositivos existentes que no fueron [resueltos](#device-resolution) al dispositivo monitoreado equivalente.
Puede usar la selección {{< ui >}}Unmonitored Device{{< /ui >}} para ocultar estos nodos.

### Dispositivo duplicado en el mapa {#device-duplicated-on-map}

El Mapa de topología de dispositivos muestra todos los dispositivos descubiertos con LLDP y/o CDP. En algunos casos, estos dispositivos ya están monitoreados con SNMP pero no pueden ser [resueltos](#device-resolution) al dispositivo monitoreado equivalente. En este caso, el dispositivo se muestra dos veces: un nodo que representa al dispositivo monitoreado y un nodo que representa al dispositivo descubierto por LLDP/CDP.
Utilice la selección {{< ui >}}Unmonitored Device{{< /ui >}} para ocultar los nodos no monitoreados.

### Nodos sin borde o negros en el mapa {#borderless-or-black-nodes-on-the-map}

Los nodos sin borde o negros en el Mapa de topología de dispositivos pueden representar dispositivos descubiertos con LLDP o CDP que no están configurados para ser monitoreados con NDM, o dispositivos descubiertos con LLDP o CDP que no pueden ser resueltos al [dispositivo monitoreado](#device-resolution) equivalente.

## Resolución de dispositivos {#device-resolution}

El Mapa de topología de dispositivos proporciona una descripción general de los dispositivos monitoreados con NDM y sus conexiones físicas. Los datos de los enlaces de topología se basan en información de LLDP (Link Layer Discovery Protocol) o CDP (Cisco Discovery Protocol) recopilada con SNMP.
Las conexiones descubiertas con LLDP o CDP pueden corresponder a dispositivos ya monitoreados con SNMP. La resolución de dispositivos consiste en hacer coincidir el dispositivo descubierto con el dispositivo monitoreado.

### Fallos en la resolución de dispositivos {#device-resolution-failures}

La resolución de dispositivos puede fallar si el dispositivo no está monitoreado con NDM, o si los datos de LLDP o CDP son insuficientes para hacer coincidir el dispositivo descubierto con el dispositivo monitoreado.

## Próximos pasos {#next-steps}

NDM proporciona múltiples herramientas de visualización para hacer un seguimiento de su infraestructura:

- **[Mapa geográfico de dispositivos][9]**: Visualice la distribución geográfica de los dispositivos en las ubicaciones para identificar problemas regionales y brechas de cobertura.
- **[Descripción general del dispositivo][10]**: Acceda a métricas detalladas y datos de rendimiento para dispositivos individuales.
- **[NetFlow Monitoring][1]**: Analice los flujos de tráfico y la utilización del ancho de banda en toda su red.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/netflow/
[2]: https://app.datadoghq.com/devices/maps/topology 
[3]: /es/network_monitoring/devices/snmp_metrics/?tab=snmpv2#autodiscovery
[4]: /es/network_monitoring/devices/profiles/
[5]: /es/help
[6]: /es/network_monitoring/devices/snmp_metrics/?tab=snmpv2#ping
[7]: /es/datadog_cloudcraft/
[8]: /es/network_monitoring/devices/topology
[9]: /es/network_monitoring/devices/geomap
[10]: https://app.datadoghq.com/devices
[11]: https://app.datadoghq.com/devices/netflow
[12]: /es/infrastructure/end_user_device_monitoring/