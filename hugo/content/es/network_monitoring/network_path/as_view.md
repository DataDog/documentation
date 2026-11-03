---
description: Investigue la visualización de Sistemas Autónomos de Network Path
further_reading:
- link: /network_monitoring/network_path/list_view
  tag: Documentación
  text: Obtenga más información sobre la visualización de lista en Network Path
- link: /network_monitoring/network_path/path_view
  tag: Documentación
  text: Obtenga más información sobre la visualización de ruta en Network Path
- link: /network_monitoring/network_path/glossary
  tag: Documentación
  text: Términos y conceptos de Network Path
- link: /network_monitoring/network_path/setup
  tag: Documentación
  text: Configuración de Network Path
title: Visualización de Sistemas Autónomos
---
## Descripción general {#overview}

La vista de Sistemas Autónomos (SA) proporciona visibilidad de los proveedores de red y proveedores de servicios de internet (ISP) que transportan su tráfico a través de la capa de enrutamiento del Protocolo de puerta de enlace fronteriza (BGP). Esta visualización monitorea la latencia y las métricas de rendimiento para cada AS en sus rutas de red, ayudándole a identificar exactamente qué proveedores ascendentes están experimentando problemas cuando el rendimiento de su red disminuye.

Los problemas de enrutamiento BGP y los problemas específicos del proveedor son difíciles de diagnosticar porque se encuentran fuera de su control directo. La visualización de SA hace visibles estas capas invisibles, brindándole los datos para responder preguntas como "¿Es este un problema de peering?" o "¿Nuestro tráfico cambió a un proveedor de tránsito diferente?" sin rastrear rutas manualmente ni realizar el parseo de las tablas BGP.

Para comenzar, vaya al Explorador de Network Path y haga clic en [{{< ui >}}Autonomous Systems (AS){{< /ui >}}][1].

También puede verificar el estado del Sistema Autónomo desde un agente de IA con las herramientas [`list_autonomous_system_statuses`][4] y [`get_autonomous_system_status`][3] en Datadog MCP Server. Las herramientas comparan la latencia, la pérdida de paquetes y la visibilidad de cada SA con una línea base de 7 días.

## Dashboard {#dashboard}

El tablero presenta datos de rendimiento a través de varias perspectivas:

### Radio de impacto global {#global-blast-radius}

El mapa de radio de impacto global muestra la latencia promedio por país durante el período de tiempo seleccionado. Haga clic en cualquier país del mapa para filtrar la [lista de Sistemas Autónomos](#autonomous-systems-table).

### Categorías de tráfico {#traffic-categories}
El panel de categorías de tráfico muestra si su tráfico fluye principalmente a través de proveedores de alojamiento o ISP tradicionales.

### Distribución de tráfico {#traffic-distribution}
El panel de distribución de tráfico desglosa qué porcentaje de sus rutas atraviesa cada región. 

### Requiere atención {#need-attention}

La sección Requiere atención marca automáticamente los AS con picos de latencia o anomalías de rendimiento, clasificándolos por gravedad para que sepa dónde enfocar su investigación. Seleccione un AS de la lista para ver sus [detalles](#autonomous-system-details).

## Tabla de sistemas autónomos {#autonomous-systems-table}

La tabla detallada de AS proporciona datos operativos para la resolución de problemas: qué prefijos anuncia cada AS, cuántas de sus rutas monitoreadas atraviesan ese AS y qué problemas específicos se han detectado (picos de latencia, cambios de enrutamiento o problemas de conectividad). Cuando un cliente informa sobre un rendimiento degradado, puede determinar rápidamente si el problema se origina en su infraestructura, en un proveedor de tránsito específico o en un ISP de última milla; información fundamental para escalar al equipo o proveedor adecuado.

La tabla de AS muestra los sistemas autónomos por los que pasan sus rutas de red monitoreadas. Cada fila incluye:

ASN
: El número de sistema autónomo.

Nombre
: El nombre del proveedor de servicios que opera el AS.

País
: Los países donde se observa tráfico para el AS.

Prefijos monitoreados
: Los prefijos IP observados para el AS en sus rutas monitoreadas.

Pruebas encontradas
: La cantidad de pruebas que atraviesan el AS.

Problemas detectados
: Problemas observados para el AS, como picos de latencia o pérdida de paquetes.

Utilice los controles de filtro sobre la lista para limitar los resultados por **Número de AS**, **País**, **Categoría** o **Problemas detectados**.

## Detalles del sistema autónomo {#autonomous-system-details}

Haga clic en un sistema autónomo en la lista para abrir sus detalles. La visualización de detalles incluye una pestaña {{< ui >}}Traffic{{< /ui >}}, una pestaña {{< ui >}}Neighbors{{< /ui >}} y una lista de rutas.

### Tráfico {#traffic}

La pestaña {{< ui >}}Traffic{{< /ui >}} muestra un diagrama relacional del tráfico que fluye desde las fuentes {{< ui >}}Upstream{{< /ui >}} a través del AS seleccionado hasta los destinos {{< ui >}}Downstream{{< /ui >}}. Pase el cursor sobre un nodo de tráfico para ver sus rutas agregadas y el número de ocurrencias, y haga clic en cualquier AS para filtrar sus rutas en la [lista de rutas](#path-list).

### Vecinos {#neighbors}

La pestaña {{< ui >}}Neighbors{{< /ui >}} muestra una visualización completa de los sistemas autónomos ascendentes y descendentes que son vecinos del que seleccionó. Haga clic en cualquier AS en el gráfico para filtrar sus rutas en la [lista de rutas](#path-list).

### Lista de rutas {#path-list}

La lista de rutas incluye rutas individuales a través del AS, con las columnas a continuación. Haga clic en cualquier fila de ruta en la lista para abrirla en la [Visualización de ruta][2].

Fuente
: La fuente de la ruta.

Destino
: El destino de la ruta.

Etiquetas
: Etiquetas asociadas con la ruta.

Alcance promedio
: El porcentaje de sondeos de traceroute que llegaron con éxito al destino durante el período de tiempo seleccionado.

RTT promedio
: El tiempo de ida y vuelta promedio para la ruta.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network-path/autonomous-systems
[2]: /es/network_monitoring/network_path/path_view/
[3]: /es/mcp_server/tools/#get_autonomous_system_status
[4]: /es/mcp_server/tools/#list_autonomous_system_statuses