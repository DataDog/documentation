---
description: Investigue la Vista de Sistemas Autónomos de Network Path
further_reading:
- link: /network_monitoring/network_path/list_view
  tag: Documentación
  text: Aprenda más sobre la Vista de lista en Network Path
- link: /network_monitoring/network_path/path_view
  tag: Documentación
  text: Aprenda más sobre la Vista de ruta en Network Path
- link: /network_monitoring/network_path/glossary
  tag: Documentación
  text: Términos y conceptos de Network Path
- link: /network_monitoring/network_path/setup
  tag: Documentación
  text: Configuración de Network Path
title: Visualización de Sistemas Autónomos
---
## Resumen {#overview}

La Vista de Sistemas Autónomos (AS) proporciona visibilidad sobre los proveedores de red y los proveedores de servicios de internet (ISP) que transportan su tráfico a través de la capa de enrutamiento del Protocolo de Puerta de Enlace Fronteriza (BGP). Esta vista monitorea la latencia y las métricas de rendimiento para cada AS en sus rutas de red, ayudándole a identificar exactamente qué proveedores ascendentes están experimentando problemas cuando el rendimiento de su red se degrada.

Los problemas de enrutamiento de BGP y los problemas específicos de los proveedores son difíciles de diagnosticar porque están fuera de su control directo. La Vista de AS hace visibles estas capas invisibles, proporcionándole los datos para responder preguntas como "¿Es este un problema de peering?" o "¿Nuestro tráfico se trasladó a un proveedor de tránsito diferente?" sin rastrear rutas manualmente o analizar tablas de BGP.

Para comenzar, vaya al Network Path Explorer y haga clic en [**Sistemas Autónomos (AS)**][1].

## Dashboard {#dashboard}

El Dashboard presenta datos de rendimiento a través de varias perspectivas:

### Radio de explosión global {#global-blast-radius}

El mapa de radio de explosión global muestra la latencia promedio por país durante el período de tiempo seleccionado. Haga clic en cualquier país en el mapa para filtrar la [lista de Sistemas Autónomos](#autonomous-systems-table).

### Categorías de tráfico {#traffic-categories}
El panel de categorías de tráfico muestra si su tráfico fluye principalmente a través de proveedores de alojamiento o ISP tradicionales.

### Distribución de tráfico {#traffic-distribution}
El panel de distribución de tráfico desglosa qué porcentaje de sus rutas atraviesa cada región. 

### Necesita Atención {#need-attention}

La sección Necesita Atención marca automáticamente los AS con picos de latencia o anomalías de rendimiento, clasificándolos por severidad para que sepa dónde enfocar su investigación. Seleccione un AS de la lista para ver sus [detalles](#autonomous-system-details).

## Tabla de Sistemas Autónomos {#autonomous-systems-table}

La tabla detallada de AS proporciona datos operativos para la solución de problemas: qué prefijos anuncia cada AS, cuántas de sus rutas monitoreadas atraviesan ese AS y qué problemas específicos se han detectado (picos de latencia, cambios de enrutamiento o problemas de conectividad). Cuando un cliente informa de un rendimiento degradado, puede determinar rápidamente si el problema se origina en su infraestructura, un proveedor de tránsito específico o un ISP de última milla, información crítica para escalar al equipo o proveedor adecuado.

La tabla de AS muestra los Sistemas Autónomos por los que pasan sus rutas de red monitoreadas. Cada fila incluye:

ASN
: El Número de Sistema Autónomo.

Nombre
: El nombre del proveedor de servicios que opera el AS.

País
: Los países donde se observa tráfico para el AS.

Prefijos Monitoreados
: Los prefijos IP observados para el AS a través de sus rutas monitoreadas.

Pruebas Encontradas
: El número de pruebas que atraviesan el AS.

Problemas Detectados
: Problemas observados para el AS, como picos de latencia o pérdida de paquetes.

Utilice los controles de filtro sobre la lista para reducir los resultados por **Número de AS**, **País**, **Categoría** o **Problemas Detectados**.

## Detalles del Sistema Autónomo {#autonomous-system-details}

Haga clic en un Sistema Autónomo en la lista para abrir sus detalles. La vista de detalles incluye una pestaña de **Tráfico**, una pestaña de **Vecinos** y una lista de rutas.

### Tráfico {#traffic}

La pestaña de **Tráfico** muestra un diagrama relacional del tráfico que fluye desde fuentes **Upstream** a través del AS seleccionado hacia destinos **Downstream**. Pase el cursor sobre un nodo de tráfico para ver sus rutas agregadas y número de ocurrencias, y haga clic en cualquier AS para filtrar sus rutas en la [lista de rutas](#path-list).

### Vecinos {#neighbors}

La pestaña de **Vecinos** muestra una visualización completa de los Sistemas Autónomos upstream y downstream que son vecinos del AS que seleccionó. Haga clic en cualquier AS en el gráfico para filtrar sus rutas en la [lista de rutas](#path-list).

### Lista de rutas {#path-list}

La lista de rutas incluye rutas individuales a través del AS, con las columnas a continuación. Haga clic en cualquier fila de ruta en la lista para abrirla en la [Vista de Ruta][2].

Fuente
: La fuente de la ruta.

Destino
: El destino de la ruta.

Etiquetas
: Etiquetas asociadas con la ruta.

Alcance Promedio
: El porcentaje de sondas de traceroute que alcanzaron exitosamente el destino durante el período de tiempo seleccionado.

RTT Promedio
: El tiempo promedio de ida y vuelta para la ruta.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network-path/autonomous-systems
[2]: /es/network_monitoring/network_path/path_view/