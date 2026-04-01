---
aliases:
- /es/network_monitoring/devices/network_topology_map
- /es/network_monitoring/devices/device_topology_map
code_lang: topology
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: Blog
  text: Visualiza las relaciones en tu red local con el Mapa de Topología de Dispositivos
- link: /network_monitoring/devices/data
  tag: Documentation
  text: Datos recopilados con la Monitorización de Dispositivos de Red
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  text: Monitorea SNMP con Datadog
title: Mapa de Topología de Dispositivos
type: multi-code-lang
---
## Resumen

El [Mapa de Topología de Dispositivos de Red][2] utiliza diagramas de [Cloudcraft][7] para proporcionar una representación visual interactiva de las conexiones físicas de tu red. El mapa descubre automáticamente y muestra los dispositivos, sus interfaces y las relaciones entre ellos. Esta visualización te ayuda a identificar problemas en tus dispositivos de red, entender sus impactos ascendentes y descendentes, solucionar problemas de conectividad y obtener información sobre cómo fluye el tráfico a través de tu infraestructura.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_new_4.mp4" alt="Un usuario agrega etiquetas de equipo, servicio y proveedor al mapa de topología de dispositivos de red, luego selecciona un dispositivo para abrir la vista del dispositivo NDM." video="true" >}}

## Configuración

La versión 7.52 o posterior del Agente de Datadog recopila automáticamente datos de topología. No se requiere instalación adicional.

### Requisitos previos

1. Los dispositivos tienen habilitado LLDP (Protocolo de Descubrimiento de Capa de Enlace) y/o CDP (Protocolo de Descubrimiento de Cisco) con SNMP. Utiliza el mismo protocolo en los dispositivos conectados para que puedan descubrirse entre sí. LLDP es generalmente preferido ya que es una opción más común.
2. La versión 7.52 o posterior del Agente de Datadog está instalada.

## Opciones de navegación

En el Mapa de Topología de Red, están disponibles las siguientes opciones de navegación:

### Agrupar por

Bajo Agrupar Por, utiliza **etiquetas** como `location` y `vendor` para seleccionar cómo deseas visualizar tus dispositivos:

{{< img src="/network_device_monitoring/network_topology_map/device-topology-group_by_2.png" alt="Un control de Agrupar por que muestra etiquetas para ubicación y proveedor." style="width:90%;" >}}

### Filtrar dispositivos

Selecciona el desplegable **+ Filtrar** para refinar qué dispositivos se muestran en el Mapa de Topología de Dispositivos.

{{< img src="/network_device_monitoring/network_topology_map/device_topology_filter_3.png" alt="El Mapa de Topología de Dispositivos con el desplegable de filtro abierto." style="width:90%;" >}}

**Nota:** La configuración de **Filtrar Dispositivos** determina qué dispositivos aparecen en el Mapa de Topología de Dispositivos para todas las consultas, incluyendo aquellas que filtran por un aspecto de dispositivo en la barra de búsqueda.

### Recursos

Utiliza el desplegable **Recurso** para filtrar el diagrama por tipos específicos de dispositivos, como Cortafuegos, Puntos de Acceso y Routers.

{{< img src="/network_device_monitoring/network_topology_map/resources_dropdown.png" alt="El Mapa de Topología de Dispositivos con el desplegable de Recursos abierto, y Dispositivo No Monitoreado desmarcado." style="width:30%;" >}}

Por defecto, la opción **Dispositivo No Monitoreado** está desmarcada, lo que oculta dispositivos que no son monitoreados directamente por el Monitoreo de Dispositivos de Red, pero que son descubiertos a través de LLDP/CDP de dispositivos monitoreados adyacentes. Marca esta opción para mostrar estos dispositivos no monitoreados en el diagrama.

## Investigando dispositivos

Además de mostrar una visión general de las conexiones físicas de tu red, el Mapa de Topología de Dispositivos te permite investigar dispositivos individuales para entender sus conexiones, flujos y estado general. Pasa el cursor sobre un dispositivo para ver su estado y métricas clave, o haz clic en un dispositivo para abrir la vista del dispositivo NDM con detalles como su dirección IP, etiquetas, rendimiento, CPU y memoria.

Mientras investigas un dispositivo, haz clic en el desplegable **Abrir Página del Dispositivo** en la parte superior derecha de la vista del dispositivo para navegar a [Monitoreo de NetFlow][1] u otras páginas relacionadas para una investigación más profunda.

{{< img src="/network_device_monitoring/network_topology_map/network_topology_map_device_inspect_view_7.png" alt="El Mapa de Topología de Dispositivos de Red con un dispositivo seleccionado, mostrando información en la vista del dispositivo NDM." style="width:100%;" >}}

### Dependencias

La sección de **Dependencias** en la vista del dispositivo NDM muestra el número de dispositivos físicamente conectados y túneles VPN de un vistazo, junto con un gráfico visual de dispositivos vecinos.

{{< img src="/network_device_monitoring/network_topology_map/topology_dependencies.png" alt="La vista del dispositivo NDM que muestra la sección de Dependencias con un gráfico de dispositivos conectados." style="width:100%;" >}}

Haz clic en **Ver dependencias** para abrir la página completa del dispositivo. En la pestaña **Dependencias**, utiliza los filtros **Físico** o **VPN** para alternar entre conexiones físicas y túneles VPN (las dependencias VPN requieren que se configure [Monitoreo de VPN][12]). La vista física muestra un gráfico de topología junto a una tabla de dispositivos conectados que muestra su estado, nombre del dispositivo, dirección IP, monitores, interfaz local e interfaz remota.

{{< img src="/network_device_monitoring/network_topology_map/ndm_summary_dependencies.png" alt="La pestaña de Dependencias en la página del dispositivo NDM con el filtro Físico seleccionado, mostrando un gráfico de topología y una tabla de dispositivos conectados con estado, dirección IP y detalles de la interfaz." style="width:100%;" >}}

### Métricas

Haz clic en la pestaña **Métricas** en la vista del dispositivo NDM para ver métricas clave del dispositivo, incluyendo uso de CPU, uso de memoria y rendimiento. Las estadísticas resumidas se muestran en la parte superior, y cada métrica se presenta como un gráfico a lo largo del tiempo. Haz clic en **Ver todas las métricas** para explorar la lista completa de métricas recopiladas.

{{< img src="/network_device_monitoring/network_topology_map/metrics_3.png" alt="La vista del dispositivo NDM con la pestaña Métricas abierta, mostrando gráficos de CPU, memoria y rendimiento." style="width:100%;" >}}

### Tráfico

Haz clic en la pestaña **Tráfico** para ver el rendimiento total, entrante y saliente del dispositivo. Un gráfico de tráfico muestra la actividad a lo largo del tiempo, y la tabla **Principales Conversaciones** lista los flujos de origen a destino de mayor volumen con tasa de bits, tasa de paquetes y total de bytes. Haz clic en **Ver tráfico** para investigar más en la página de resumen del dispositivo, y en [Monitoreo de NetFlow][1].

{{< img src="/network_device_monitoring/network_topology_map/traffic_2.png" alt="La vista del dispositivo NDM con la pestaña Tráfico abierta, mostrando estadísticas de rendimiento, un gráfico de tráfico y una tabla de Principales Conversaciones." style="width:100%;" >}}

### Eventos

Haz clic en la pestaña **Eventos** para ver mensajes de Syslog y trampas SNMP en una vista combinada. Utiliza filtros para reducir los resultados por tipo de evento. Los picos en el volumen de eventos se destacan visualmente, ayudándote a identificar e investigar errores.

{{< img src="/network_device_monitoring/network_topology_map/events.png" alt="La vista del dispositivo NDM con la pestaña de Eventos abierta, mostrando mensajes de Syslog y trampas SNMP." style="width:100%;" >}}

### Ver detalles del flujo

Para explorar las fuentes, destinos y volumen del tráfico de un dispositivo, haz clic en el desplegable **Abrir Página del Dispositivo** y selecciona **Monitoreo de NetFlow**. Los datos se filtran automáticamente por el `@device.ip` del dispositivo. Para más información, consulta [Monitoreo de NetFlow][1].

{{< img src="/network_device_monitoring/network_topology_map/netflow_tab_4.png" alt="La vista del dispositivo NDM con el desplegable Abrir Página del Dispositivo mostrando la opción de Monitoreo de NetFlow." style="width:100%;" >}}

### Configuración del dispositivo

Haz clic en el ícono **Configuración del Dispositivo** en la vista del dispositivo NDM para abrir el panel de Configuración del Dispositivo. La pestaña **Información** muestra detalles generales (nombre, espacio de nombres y descripción), detalles de red (dirección IP, subred y geolocalización) y detalles de hardware (modelo, proveedor, sistema operativo y versión). La pestaña **Etiquetas** te permite ver y gestionar las etiquetas asociadas con el dispositivo.

{{< img src="/network_device_monitoring/network_topology_map/device_settings.png" alt="El panel de Configuración del Dispositivo para un dispositivo NDM, mostrando la pestaña de Información con detalles generales, de red y de hardware." style="width:90%;" >}}

### Detalles del enlace

Haz clic en un enlace entre dispositivos para explorar detalles de conexión, incluyendo volumen de tráfico, utilización de ancho de banda, errores y descartes, con opciones para ver los datos en [Resumen del Dispositivo][10] o [Monitoreo de NetFlow][11].

{{< img src="/network_device_monitoring/network_topology_map/link_details.mp4" alt="Un usuario haciendo clic en un enlace entre dispositivos para ver detalles adicionales del enlace." video="true" >}}

### Leyenda de íconos

Los dispositivos SNMP se emparejan con un ícono representativo basado en su tipo de dispositivo en cada nodo de dispositivo, según lo definido en sus [perfiles de dispositivo][4].

<table>
  <colgroup>
    <col style="width:20%">
    <col style="width:20%">
  </colgroup>
  <tr>
    <th>Ícono</th>
    <th>Descripción</th>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="Icono de punto de acceso" style="width:10%; border:none;" popup="false">}}</td>
    <td>Punto de acceso</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="Icono de cortafuegos" style="width:10%; border:none;" popup="false">}}</td>
    <td>Cortafuegos</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="Icono de enrutador" style="width:10%; border:none;" popup="false">}}</td>
    <td>Enrutador</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="Icono de servidor" style="width:10%; border:none;" popup="false">}}</td>
    <td>Servidor</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="Icono de conmutador" style="width:10%; border:none;" popup="false">}}</td>
    <td>Conmutador</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="Icono de dispositivo" style="width:10%; border:none;" popup="false">}}</td>
    <td>Dispositivo</td>
  </tr>
</table>

## Solución de problemas

Si experimenta problemas al usar el Mapa de Topología de Red, utilice las siguientes pautas de solución de problemas. Si necesita más ayuda, comuníquese con [soporte de Datadog][5].

### Mensaje de mapa vacío

{{< img src="/network_device_monitoring/network_topology_map/no_devices_found.png" alt="El mensaje de no se encontraron dispositivos que se muestra cuando NDM no está configurado o debido a filtrado." style="width:80%;" >}}

No hay dispositivos porque NDM no está configurado.

### No se encontraron conexiones / No hay dispositivos conectados para mostrar.

{{< img src="/network_device_monitoring/network_topology_map/no_connections_found.png" alt="El mensaje de no se encontraron dispositivos que se muestra cuando NDM no está configurado o debido a filtrado." style="width:80%;" >}}

- Activa la selección de **Dispositivo No Monitoreado** para mostrar los dispositivos no monitoreados.
- Utiliza la etiqueta de categorización para ayudar a entender tu vista del mapa con la jerarquía de información.

### Dispositivos/conexiones faltantes.

Los datos del Mapa de Topología de Dispositivos se basan en la información de LLDP (Protocolo de Descubrimiento de Capa de Enlace) y CDP (Protocolo de Descubrimiento de Cisco) recopilada con SNMP. Si tu mapa carece de dispositivos y/o conexiones, verifica lo siguiente:

- La versión 7.52 o posterior del Agente de Datadog está instalada.
- Los dispositivos tienen habilitados LLDP y/o CDP con SNMP.

Verifica que tus dispositivos estén exponiendo datos de LLDP y CDP con los siguientes comandos:

Para datos de LLDP:

```yaml
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.0.8802
```
Para datos de CDP:
```yaml:
sudo -u dd-agent datadog-agent snmp walk <DEVICE_IP> 1.3.6.1.4.1.9.9.23
```

### Conexiones o enlaces faltantes.

Si tu dispositivo está exponiendo datos de topología con LLDP o CDP pero algunas de las conexiones faltan, verifica que la selección de **Dispositivo No Monitoreado** esté desactivada.

### Dispositivos no monitoreados que se muestran en el mapa.

El Mapa de Topología de Dispositivos muestra todos los dispositivos descubiertos con LLDP o CDP. Estos pueden ser nuevos dispositivos que no están ya monitoreados con SNMP o dispositivos existentes que no fueron [resueltos](#device-resolution) al dispositivo monitoreado equivalente.
Puedes usar la selección de **Dispositivo No Monitoreado** para ocultar estos nodos.

### Dispositivo duplicado en el mapa

El Mapa de Topología de Dispositivos muestra todos los dispositivos descubiertos con LLDP y/o CDP. En algunos casos, estos dispositivos ya están siendo monitoreados con SNMP pero no pueden ser [resueltos](#device-resolution) al dispositivo monitoreado equivalente. En este caso, el dispositivo se muestra dos veces: un nodo representando el dispositivo monitoreado y un nodo representando el dispositivo descubierto por LLDP/CDP.
Utilice la selección de **Dispositivo No Monitoreado** para ocultar los nodos no monitoreados.

### Nodos sin borde o negros en el mapa

Los nodos sin borde o negros en el Mapa de Topología de Dispositivos pueden representar dispositivos descubiertos con LLDP o CDP que no están configurados para ser monitoreados con NDM, o dispositivos descubiertos con LLDP o CDP que no pueden ser resueltos al [dispositivo monitoreado](#device-resolution) equivalente.

## Resolución de dispositivos

El Mapa de Topología de Dispositivos proporciona una visión general de los dispositivos monitoreados con NDM y sus conexiones físicas. Los enlaces de topología se basan en la información de LLDP (Protocolo de Descubrimiento de Capa de Enlace) o CDP (Protocolo de Descubrimiento de Cisco) recopilada con SNMP.
Las conexiones descubiertas con LLDP o CDP pueden corresponder a dispositivos ya monitoreados con SNMP. La resolución de dispositivos consiste en emparejar el dispositivo descubierto con el dispositivo monitoreado.

### Fallos en la resolución de dispositivos

La resolución de dispositivos puede fallar si el dispositivo no está monitoreado con NDM, o si los datos de LLDP o CDP son insuficientes para emparejar el dispositivo descubierto con el dispositivo monitoreado.

## Próximos pasos

NDM proporciona múltiples herramientas de visualización para monitorear su infraestructura:

- **[Mapa Geográfico de Dispositivos][9]**: Vea la distribución geográfica de los dispositivos en diferentes ubicaciones para identificar problemas regionales y brechas de cobertura.
- **[Resumen de Dispositivos][10]**: Acceda a métricas detalladas y datos de rendimiento para dispositivos individuales.
- **[Monitoreo de NetFlow][1]**: Analice los flujos de tráfico y la utilización del ancho de banda en su red.

## Lectura Adicional

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
[12]: /es/network_monitoring/devices/vpn_monitoring/