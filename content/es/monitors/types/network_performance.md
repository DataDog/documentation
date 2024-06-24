---
further_reading:
- link: /network_monitoring/performance/
  tag: Documentación
  text: Más información sobre Network Performance Monitoring
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado del monitor
kind: Documentación
title: Monitor de rendimiento de red
---

{{< callout btn_hidden="true" header="Join the Beta!">}}
El monitor de rendimiento de red está en frase beta privada. Contacta con tu representante de Datadog para registrarte y obtener acceso.
{{< /callout >}}

## Información general

Datadog [Network Performance Monitoring][1] (NPM) proporciona visibilidad de tu tráfico de red entre servicios, contenedores, zonas de disponibilidad y cualquier otra etiqueta en Datadog. Después de habilitar NPM, puedes crear un monitor NPM y recibir alertas si una métrica de red TCP cruza un umbral que hayas establecido. Por ejemplo, puedes monitorizar el rendimiento de red entre un cliente/servidor específico y recibir alertas si ese rendimiento supera un umbral. 

## Creación de un monitor

Para crear un monitor NPM en Datadog, utiliza la navegación principal:  [**Monitors** --> **New Monitor** --> **Network Performance**][2] (Monitores --> Nuevo monitor --> Rendimiento de red).

### Definir la consulta de búsqueda

{{< img src="monitors/monitor_types/network_performance/example_dns_failures.png" alt="Configuración de ejemplo con tráfico de cliente y servidor agrupado automáticamente, valores no disponibles ocultos, medidos como la suma de métricas de errores de DNS con un límite de 100" style="width:100%;" >}}

1. Crea una consulta de búsqueda utilizando la misma lógica que en una búsqueda de [NPM Analytics][3].
1. Selecciona las etiquetas por las que deseas agrupar el cliente y el servidor.
1. Elige si deseas mostrar u ocultar el tráfico no disponible.
1. Selecciona una métrica que desees medir en la lista desplegable. Por defecto, el monitor mide la suma de las métricas seleccionadas. Consulta qué métricas están disponibles para monitores NPM en las [definiciones de métrica](#metric-definitions).
1. Establece el límite de resultados que deseas incluir en la consulta.

### Mediante fórmulas y funciones

Puedes crear monitores NPM utilizando fórmulas y funciones. Esto puede utilizarse, por ejemplo, para crear monitores sobre el rendimiento entre un cliente y un servidor.

El siguiente ejemplo muestra el uso de una fórmula para calcular el porcentaje de retransmisiones de un cliente a un servidor.

{{< img src="monitors/monitor_types/network_performance/npm_formulas_functions.png" alt="Configuración de monitor NPM de ejemplo que muestra el porcentaje de retransmisiones desde un cliente al servidor" style="width:100%;" >}}

Para más información, consulta la documentación [Funciones][4].

## Definiciones de métrica

Las siguientes tablas enumeran las diferentes métricas NPM en las que puedes crear monitores.

### Volumen
| Nombre de la métrica    | Definición                 | 
| -------------- | -------------------------  | 
| Bytes recibidos | Bytes recibidos del cliente. |
| Bytes enviados     | Bytes enviados desde el cliente.     |
| Paquetes enviados   | Paquetes enviados desde el cliente.   |

### TCP
| Nombre de la métrica             | Definición                                    | 
| ----------------------  | --------------------------------------------- | 
| Retransmisiones             |Retransmisiones entre cliente/servidor.              |
| Conexiones establecidas | Establece conexiones entre cliente/servidor. |
| Conexiones cerradas      | Conexiones cerradas entre cliente/servidor.      |

### DNS
| Nombre de la métrica              | Definición                               |
| -----------------------  | ---------------------------------------  |
| Solicitudes DNS             | Número total de solicitudes DNS.             |
| Tiempos de espera de DNS             | Número total de tiempos de inactividad de DNS.             |
| Respuestas fallidas de DNS     | Número total de respuestas de DNS fallidas.             |
| Respuestas correctas de DNS | Número total de respuestas de DNS correctas.     |
| Latencia del fallo de DNS      | Latencia media de fallo de DNS. |
| Latencia de éxito de DNS      | Latencia media de éxito de DNS.              |
| Errores NXDOMAIN          | Número total de errores NXDOMAIN.              |
| Errores SERVFAIL          | Número total de errores SERVFAIL.          |
| Otros errores             | Número total de otros errores.           |

### Definir condiciones de alerta

Configura monitores para que se activen si el valor de la consulta supera un umbral y personaliza las opciones avanzadas de alerta para los umbrales de recuperación y los retrasos de las evaluaciones. Para obtener más información, consulta [Configurar monitores][5].

### Notificaciones
Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][6].

## Monitores comunes
Puedes empezar a crear monitores en NPM con los siguientes monitores comunes. Estos proporcionan un buen punto de partida para realizar un seguimiento de tu red y recibir alertas si tu red está experimentando un tráfico inusual y potencialmente experimentando un comportamiento inesperado de red.

### Monitor de rendimiento
El monitor de rendimiento te avisa si el rendimiento entre dos endpoints especificados en la consulta supera un umbral. La monitorización del rendimiento puede ayudar a determinar si tu red se está acercando a la capacidad dado tu ancho de banda de red. Saber esto puede darte tiempo suficiente para hacer ajustes a tu red y evitar cuellos de botella y otros efectos descendentes.

{{< img src="monitors/monitor_types/network_performance/common_monitors_throughput.png" alt="La configuración de ejemplo para un monitor de rendimiento, configura Consulta A para medir los Bytes enviados y añadir una fórmula de rendimiento" style="width:100%;" >}}

### Porcentaje de retransmisiones
Las retransmisiones se producen cuando los paquetes se dañan o se pierden e indican una falta de fiabilidad en la red. El monitor de porcentaje de retransmisiones te avisa si el porcentaje del total de paquetes enviados que resultan en retransmisiones supera un umbral.

{{< img src="monitors/monitor_types/network_performance/common_monitors_retransmits.png" alt="Configuración de ejemplo de un monitor de porcentaje de transmisión, configura la Consulta A para medir Retransmisiones, Consulta B para medir Paquetes enviados y añada una fórmula para calcular el porcentaje con (a/b)*100" style="width:100%;" >}}

### Fallos de DNS
El monitor de fallo de DNS realiza un seguimiento del rendimiento del servidor DNS para ayudar a identificar problemas de DNS del lado del servidor y del lado del cliente. Utiliza este monitor para alertarte si la suma de fallos de DNS supera un umbral.

{{< img src="monitors/monitor_types/network_performance/common_monitors_dns_failure.png" alt="Configuración de ejemplo para fallos de DNS, configura la Consulta A para medir los Fallos de DNS" style="width:100%;" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/performance/
[2]: https://app.datadoghq.com/monitors/create/network-performance
[3]: /es/network_monitoring/performance/network_analytics/
[4]: /es/dashboards/functions/
[5]: /es/monitors/configuration/
[6]: /es/monitors/notify/