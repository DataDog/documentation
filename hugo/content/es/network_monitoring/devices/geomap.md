---
code_lang: geomap
code_lang_weight: 1
further_reading:
- link: https://www.datadoghq.com/blog/visualize-network-device-topology/
  tag: Blog
  texto: Visualiza las relaciones en toda tu red on-premise con el mapa de topología
    de dispositivos
- etiqueta: Documentation
  link: /network_monitoring/devices/data
  texto: Datos recopilados con Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: Blog
  texto: Monitorización de SNMP con Datadog
tipo: multi-code-lang
título: Device Geomap
---

## Información general

[Device Geomap][1] muestra la distribución geográfica de los dispositivos de red detectados a través de Network Device Monitoring (NDM). Utilizando la [visualización de puntos del widget de Geomap][11], traza los dispositivos en un mapa geográfico basado en sus ubicaciones configuradas, lo que te permite visualizar la cobertura del sitio, evaluar la conectividad y monitorizar el estado de la red regional. Utilízalo para identificar interrupciones de dispositivos, problemas de latencia o lagunas de cobertura en entornos distribuidos.

{{< img src="network_device_monitoring/geomap/device_geomap.png" alt="Pestaña de Network Device Geomap que muestra la ubicación de los dispositivos mapeados." style="width:100%;" >}}

### Requisitos previos

- [Network Device Monitoring][2] debe estar configurado en tus dispositivos.
- Los dispositivos deben etiquetarse utilizando el formato `geolocation:<value>`, donde `<value>` es el identificador de ubicación. 

## Configuración de ubicaciones

Los dispositivos aparecen en el Device Geomap cuando se etiquetan con `geolocation:<value>` y se asignan a coordenadas geográficas.

Por ejemplo:
| Geolocación   | Latitud | Longitud |
|---------------|----------|-----------|
| nyc-office    | 40.758896| -73.98513 |
| denver-office | 39.7433  | -104.9886 |
| boston-office | 42.3601  | -71.0589  |
| singapore     | 1.3521   | 103.8198  |

Configura las ubicaciones de los dispositivos siguiendo estos pasos:

1. Etiqueta dispositivos utilizando el formato `geolocation:<value>`, donde `<value>` es el identificador de ubicación. Consulta la documentación [etiquetado de dispositivos de red][4] para obtener más información.

   {{< img src="network_device_monitoring/geomap/device_side_panel.png" alt="Panel lateral de Network Device de un dispositivo, con la etiqueta `geolocation:boston-office` resaltadas." style="width:100%;" >}}

2. Desde la página de Device Geomap, haz clic en **Add locations** (Añadir ubicaciones) en la esquina superior derecha. Esto abre la página de [Configuración de ubicaciones de Geomap][3], que ofrece varias pestañas para gestionar las ubicaciones de los dispositivos:

   - **Todos**: muestra todos los dispositivos con etiquetas `geolocation`, independientemente de su estado de asignación.
   - **Necesita coordenadas**: muestra los dispositivos etiquetados con valores `geolocation` que no tienen configuradas las coordenadas de ubicación correspondientes.
   - **En el mapa**: enumera los dispositivos etiquetados con coordenadas configuradas que se muestran en el Geomap.
   - **Sin utilizar**: muestra las asignaciones de ubicación (coordenadas) que se han configurado pero que no están asociadas a ningún dispositivo etiquetado.

   {{< img src="network_device_monitoring/geomap/settings_on_map.png" alt="Página de ajustes de Device Geomap, con la pestaña Todos resaltada." style="width:100%;" >}}

3. En la página de configuración, haz clic en **+ Add mapping** (+ Añadir mapeo) e introduce el valor de la ubicación junto con sus coordenadas de latitud y longitud en notación de [grados decimales][10]. 

   {{< img src="network_device_monitoring/geomap/add_mapping.png" alt="Página de ajustes de Device Geomap, que muestra la pantalla Añadir mapeo con los campos para ubicación, latitud y longitud." style="width:80%;" >}}

4. Para importar ubicaciones de forma masiva, selecciona **Import from CSV** (Importar desde CSV) en el menú desplegable **+Add mapping** (+ Añadir asignación). El formulario CSV proporciona una plantilla que puedes descargar y utilizar.

   {{< img src="network_device_monitoring/geomap/mapping_csv.png" alt="Página de ajustes de Device Geomap, que muestra la opción Importar desde CSV." style="width:90%;" >}}

## Dispositivos de visualización

Una vez añadidos los dispositivos al mapa, puedes ampliarlo para hacer clic en un dispositivo individual o seleccionar un grupo de dispositivos para ver todos los dispositivos de esa ubicación. Al hacer clic en cualquier dispositivo, se abre un panel lateral con información detallada sobre el dispositivo, incluido el estado, las etiquetas y las métricas clave.

{{< img src="network_device_monitoring/geomap/geomap_device_cluster.mp4" alt="Un usuario que amplía el mapa, haciendo clic en un clúster de dispositivo y abriendo el panel lateral de un dispositivo que no se puede ubicar. " video=true >}}

## Solucionar problemas

Si experimentas problemas al utilizar Device Geomap, utiliza las siguientes directrices para la solución de problemas. Si necesitas más ayuda, ponte en contacto con el [soporte de Datadog][5].

### El dispositivo aparece en varios lugares

Cuando un dispositivo está etiquetado con varias etiquetas `geolocation`, solo aparece en una ubicación del mapa. Sin embargo, al hacer clic en cualquier grupo de dispositivos que contenga ese dispositivo, aparece en el panel lateral de todas las ubicaciones etiquetadas. 

### Falla la carga de CSV

Si tu archivo CSV no se carga a pesar de parecer correcto, comprueba lo siguiente:

- No faltan comas entre los campos
- No hay espacios adicionales ni caracteres especiales
- Formateo adecuado según la plantilla CSV (disponible para su descarga en el formulario **+ Add mapping > Import from CSV** (+ Añadir asignación > Importar desde CSV)).

### El dispositivo etiquetado no aparece en el mapa

Si un dispositivo no aparece en el mapa después de etiquetarlo:

1. Comprueba que la etiqueta de localización tiene las coordenadas configuradas en la página de [Configuración][3].
2. Espera unos minutos para que las actualizaciones de las etiquetas se reflejen en el mapa.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/maps/geomap
[2]: /es/network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices/settings/geomap
[4]: /es/network_monitoring/devices/setup#enrich-network-devices-with-tags
[5]: /es/help
[8]: /es/network_monitoring/devices/topology
[9]: /es/network_monitoring/devices/geomap
[10]: https://en.wikipedia.org/wiki/Decimal_degrees
[11]: /es/dashboards/widgets/geomap/?tab=points