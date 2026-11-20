---
aliases:
- /es/network_performance_monitoring/guide/manage_traffic_costs_with_npm/
- /es/network_monitoring/performance/guide/manage_traffic_costs_with_npm/
further_reading:
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Monitoriza tu arquitectura en la nube y las dependencias de tus aplicaciones
    con Datadog CNM
title: Gestiona los costos del tráfico en la nube con CNM
---
El tráfico de red puede ser costoso, especialmente en entornos de la nube. Los proveedores de la nube aplican diferentes tarifas según si el tráfico permanece dentro de una zona de disponibilidad (AZ), se mueve entre AZ, cruza regiones o sale a la internet pública. El tráfico transregional y de salida suelen ser los más caros, propensos a errores, latencia y riesgos de seguridad.

Cloud Network Monitoring (CNM) te permite rastrear todos los patrones de tráfico descritos anteriormente mediante la asignación de dependencias entre cualquier etiqueta (tag) en Datadog, incluidos servicio, contenedor, zona de disponibilidad, región, centro de datos, etc. Esta información sobre tus dependencias y el volumen de tráfico que producen (que es, en última instancia, por lo que cobran los proveedores de la nube) puede utilizarse para monitorizar y optimizar tus costos relacionados con el tráfico. 

## La historia de Datadog

Cuando Datadog migró a Kubernetes, el proceso de traslado de servicios sin estado fue, como era de esperar, más eficiente que la migración de servicios con estado como Kafka, por lo que los servicios sin estado se migraron en primer lugar. Esto dio lugar a terabytes de nuevo tráfico entre AZ entre servicios con estado (todos ubicados en una AZ) y servicios sin estado (distribuidos por otras AZ), lo que provocó un aumento significativo e inesperado de la facturación de la nube. Aprovechando el propio producto CNM de Datadog, Datadog identificó la causa raíz: una estrategia de migración ineficiente que conducía a una comunicación de red costosa e inferior a la óptima. En última instancia, la fragmentación de los servicios con estado ayudó a reducir en gran medida los costos de tráfico del proveedor de la nube.

## Medidas para gestionar los costos del tráfico

1. Para encontrar problemas similares en tu propio entorno, puedes empezar por analizar el tráfico entre regiones, zonas de disponibilidad y centros de datos utilizando las etiquetas (tags) [`client` y `server` ][1]:
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/availability_zone_2.png" alt="Agrupar flujos de tráfico por zona de disponibilidad y centro de datos">}}

    Un aumento en tu factura de tráfico casi siempre está ligado a un aumento en uno de estos tipos de tráfico. En muchos casos, es posible que desees agrupar el tráfico por términos de búsqueda asimétricos. Es decir, deseas ver el source (fuente) del tráfico en términos de una etiqueta (tag) y también ver el destino en términos de otra etiqueta (tag). Puedes utilizar este tipo de consulta asimétrica para identificar dependencias costosas entre sus centros de datos on-premise y las regiones de la nube, así como entre nubes. Una vista particularmente útil es agrupar el source (fuente) del tráfico por servicio y el destino por zonas de disponibilidad.

     {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/search_by_service_az.png" alt="Identificar dependencias entre centros de datos y regiones de la nube">}}

2. A partir de aquí, aísla los servicios que tengan el mayor volumen de tráfico en varias AZ. Puedes utilizar filtros en el panel de facetas, así como la barra de búsqueda, para limitar su consulta. Por ejemplo, puedes mostrar sólo los servicios que se originan dentro de una zona de disponibilidad y envían tráfico a otra zona de disponibilidad.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/service_availability_zone2.png" alt="Destacar todos los servicios que se comunicaron entre AZ">}}

    La consulta anterior destaca todos los servicios que se comunican de `us-east-1a` a `us-east-1c`. Dado que la tabla ya está ordenada por volumen, las primeras filas muestran los servicios más activos que contribuyen a la mayor parte del tráfico entre zonas de disponibilidad. Si deseas inspeccionar los efectos de infraestructura cruzada de uno de estos culpables, ordena por el nombre del servicio entre las zonas de disponibilidad.

    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/single_service_2.png" alt="Buscar un único servicio, ordenado por zona de disponibilidad.">}}

3. Del mismo modo, puedes utilizar la etiqueta (tag) de equipo para identificar, por ejemplo, equipos de ingeniería que generan más tráfico interregional.

   {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/team_region_2.png" alt="Utilizar la etiqueta (tag) de equipo para aislar el tráfico.">}}

4. Para monitorizar los costos del tráfico externo, delimitar tus endpoints de destino a IP públicas utilizando la faceta **Tipo de IP**.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/scope_destination_points_2.png" alt="Utilizar la faceta del tipo de IP." style="width: 40%;">}}

    A continuación, agrupa tu destino por `domain` para desglosar el volumen del tráfico externo en función de tu destino. Aunque no puedas instalar un Datadog Agent en servidores públicos, Datadog puede resolver IP que representan endpoints externos y en la nube a nombres de dominio legibles por humanos. 

    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/server_traffic_by_domain.png" alt="Filtrado del tráfico por servicio y dominio.">}}

## Visualización de los costos del tráfico

Puedes visualizar el tráfico entre AZ o entre AZ utilizando [Network Map][2] para localizar los cuellos de botella. Esta vista ilustra cómo validar que las zonas de disponibilidad de la UE y EE. UU. no se comunican, para garantizar el cumplimiento del GDPR y la protección de datos. 
Tráfico entre AZ:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/cross-az-traffic_2.png" alt="Tráfico entre AZ en Network Map">}}
Tráfico de servicio a servicio entre zonas de disponibilidad:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/inter-az-service-to-service-traffic.png" alt="Tráfico de servicio a servicio entre zonas de disponibilidad">}}

Puedes editar tus preferencias utilizando el botón **Filtrar tráfico**. En entornos más grandes, Datadog recomienda limitar el ámbito a las fuentes de tráfico más significativas moviendo los controles deslizantes para incluir solo las dependencias de mayor volumen.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/filter-traffic_2.png" alt="Filtra tu tráfico" style="width: 50%;">}}

## Crear gráficas de costos de tráfico

Datadog recomienda rastrear las métricas de volumen de tráfico a lo largo del tiempo en dashboards y notebooks. Puedes representar gráficamente el tráfico entre dos endpoints cualesquiera utilizando las mismas consultas que realizarías en la page (página) [Cloud Network][3]. Para ello, crea un **Widget de series temporales** y selecciona la source (fuente) **Red** en el menú desplegable.  

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_cnm/timeseries_2.png" alt="Crea un widget de series temporales con métricas de la red">}}

**Nota**: Cuando se intenta encontrar el nombre de host para hosts de red, se puede utilizar la métrica `datadog.npm.host_instance`. Si las últimas métricas de este host tienen más de 14 días, la métrica deberá actualizarse manualmente con esta consulta: `avg:datadog.npm.host_instance{*} by {host}`.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/cloud_network_monitoring/network_analytics/?tab=loadbalancers#queries
[2]: /es/network_monitoring/cloud_network_monitoring/network_map
[3]: https://app.datadoghq.com/network