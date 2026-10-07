---
further_reading:
- link: /network_monitoring/netflow/#visualization
  tag: Documentación
  text: Más información sobre NetFlow Monitoring
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/status/
  tag: Documentación
  text: Comprobar el estado de tu monitor
title: NetFlow Monitor
---

{{< callout btn_hidden="true" header="¡Únete a la vista previa!">}}
NetFlow Monitor está en vista previa. Para suscribirte y obtener acceso, ponte en contacto con tu representante de Datadog.
{{< /callout >}}

## Información general

Datadog [Network Device Monitoring][1] (NDM) proporciona una visibilidad de tus dispositivos on-premises y tus dispositivos de red virtuales, como enrutadores, conmutadores y cortafuegos. Como parte de NDM, [NetFlow Monitoring][2] te permite examinar, interpretar y analizar tus datos de flujo de tráfico de red a lo largo del tiempo e identificar los principales contribuyentes a la congestión de la red.

Luego de activar NetFlow Monitoring, puedes crear un NetFlow Monitor para que te avise cuando una métrica de flujo (como la del rendimiento de red de un par de origen y destino específico) cruza un umbral definido.

## Creación de un monitor

Para crear un NetFlow Monitor en Datadog, utiliza la navegación principal:  [**Monitors** --> **New Monitor** --> **NetFlow** (Monitores --> Nuevo monitor --> NetFlow)][3]. 

### Definir la consulta de búsqueda

A medida que defines la consulta de búsqueda, el gráfico superior se actualiza en tiempo real.

{{< img src="monitors/monitor_types/netflow/monitor.png" alt="Ejemplo de configuración de un monitor utilizando datos de NetFlow" style="width:100%;" >}}

1. Crea una consulta de búsqueda utilizando la misma lógica que la de los [widgets NetFlow][4] en tus dashboards. 
1. Selecciona si quieres alertar sobre bytes o paquetes para el tráfico.
1. Elige las etiquetas (tags) por las que quieres filtrar el tráfico alertado. Consulta la [lista completa de las facetas disponibles][4].

### Mediante fórmulas y funciones

Puedes crear monitores NetFlow utilizando fórmulas y funciones. Esto puede utilizarse, por ejemplo, para crear monitores del volumen de tráfico enviado por origen y dispositivo. 

{{< img src="monitors/monitor_types/netflow/formula.png" alt="Ejemplo de configuración de un monitor utilizando datos de NetFlow y una fórmula" style="width:100%;" >}}

Para obtener más información, consulta la documentación [Funciones][5].

### Definir condiciones de alerta

Configura monitores para que se activen si el valor de la consulta supera un umbral y personaliza las opciones avanzadas de alerta para los umbrales de recuperación y los retrasos de evaluación. Para obtener más información, consulta [Configurar monitores][6].

### Notificaciones

Para obtener instrucciones detalladas sobre las secciones **Dinos qué está pasando** y **Notificar a tu equipo**, consulta la página [Notificaciones][7].

## Monitorizar eventos de NetFlow

Para obtener más información sobre eventos para los que puedes crear monitores NetFlow, consulta la [documentación de NetFlow NetFlow Monitoring][4].

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/devices/
[2]: /es/network_monitoring/netflow/
[3]: https://app.datadoghq.com/monitors/create/netflow
[4]: /es/network_monitoring/netflow/#visualization
[5]: /es/dashboards/functions/
[6]: /es/monitors/configuration/
[7]: /es/monitors/notify/