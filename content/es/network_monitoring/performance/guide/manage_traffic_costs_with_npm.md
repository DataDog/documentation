---
aliases:
- /es/network_performance_monitoring/guide/manage_traffic_costs_with_npm/
title: Gestiona los costos del tráfico en la nube con NPM
---
El tráfico es costoso, especialmente en la nube. Los proveedores de la nube cobran precios diferentes por el tráfico, según si fluye dentro de una zona de disponibilidad (AZ), entre AZ, entre regiones concretas o hacia la Internet abierta. El tráfico transregional y de salida no solo es el más costoso, sino también el más vulnerable a errores, latencia y amenazas a la seguridad. 

Network Performance Monitoring (NPM) te permite rastrear todos los patrones de tráfico descritos anteriormente mediante la asignación de dependencias entre cualquier etiqueta (tag) en Datadog, incluido el servicio, el dontenedor, la zona de disponibilidad, la región, el centro de datos, etc. Esta información sobre tus dependencias y el volumen de tráfico que producen (que es, en última instancia, por lo que cobran los proveedores de la nube) puede utilizarse para monitorizar y optimizar tus costos relacionados con el tráfico. 

## La historia de Datadog

Cuando Datadog migró a Kubernetes, la migración de servicios sin estado fue (como era de esperar) mucho más rápida y sencilla que migrar servicios con estado (por ejemplo, Kafka), los servicios sin estado fueron los primeros. El resultado fue un nuevo tráfico de terabytes entre las AZ entre los servicios con estado (todo en una misma AZ) y sin estado (todo en una AZ) y sin estado (repartidos entre las demás AZ), lo que hizo que la factura de la nube aumentara drástica e inesperadamente. Datadog utilizó su propio producto NPM para identificar la causa raíz: una estrategia migración inferior a la óptima y, en consecuencia, una comunicación de red ineficiente y costosa. La fragmentación de servicios con estado condujo en última instancia a importantes reducciones en los costos de tráfico del proveedor de la nube.

## Medidas para gestionar los costos del tráfico 

1. Para encontrar problemas similares en tu propio entorno, puedes empezar por delimitar tu vista al tráfico entre regiones, 
   zonas de disponibilidad,
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/availability_zone.png" alt="Flujos de grupos por disponibilidad">}}
    y centros de datos:
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/datacenter.png" alt="Flujos de grupos por centro de datos">}}
   Un aumento de tu factura del tráfico está casi siempre ligado a un aumento de uno de estos tipos de tráfico. En muchos casos, es posible que desees agrupar el tráfico por términos asimétricos de búsqueda. Es decir, quieres ver el origen del tráfico en términos de una etiqueta (tag) y también ver el destino en términos de otra etiqueta. Puedes utilizar este tipo de consulta asimétrica para identificar dependencias costosas entre tus centros de datos locales y las regiones de la nube, 
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/aws_account.png" alt="Identificar dependencias entre centros de datos y regiones de la nube">}}
   así como entre nubes. Una vista especialmente útil consiste en agrupar el origen del tráfico por servicio y el destino por zonas de disponibilidad.

2. A partir de aquí, aísle los servicios que tengan el mayor volumen de tráfico en varias AZ. Puedes utilizar filtros dentro de las barras de búsqueda para restringir tu consulta. Por ejemplo, puedes mostrar solo servicios que se originan dentro de una zona de disponibilidad y están enviando tráfico a cualquier otra zona de disponibilidad.
   {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/service_availability_zone.png" alt="Destacar todos los servicios que se comunicarion entre las AZ">}}
   La consulta anterior destaca cualquier servicio que se comunique desde `us-east4-a` a cualquier otro lugar. Como la tabla ya está ordenada por volumen, las primeras filas muestran los servicios con más charlas que contribuyen a la mayor parte del tráfico entre AZ. Si deseas inspeccionar los efectos entre infraestructuras de uno de estos culpables, puedes filtrar la **Fuente** a ese servicio concreto y ver tu tráfico a cualquier otra zona de disponibilidad.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/single_service.png" alt="Buscar un único servicio.">}}

3. De mismo modo, puedes utilizar la etiqueta (tag) de equipo para identificar los equipos de ingeniería que generan la mayor parte, por ejemplo, del tráfico interregional. 
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/team_region.png" alt="Utilizar la etiqueta (tag) de equipo.">}}
o monitorizar la producción de tu propio equipo específicamente.
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/region_region.png" alt="Utilizar la etiqueta (tag) de la región.">}}

4. Para monitorar los costos del tráfico externo, delimitar tus endpoints de destino a IP públicas utilizando la faceta **Tipo de IP**.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/scope_destination_points.png" alt="Utilizar el tipo de faceta.">}}
   A continuación, agrupa tu destino por `domain` para desglosar el volumen del tráfico externo en función de tu destino. Aunque no puedas instalar un Datadog Agent en servidores públicos, Datadog puede resolver IP que representan endpoints externos y en la nube a nombres de dominio legibles por humanos. 
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/dns_resolution.png" alt="Agrupar por DNS.">}}
    El ejemplo de consulta anterior filtra el tráfico a Amazon S3, los equilibradores de carga elásticos, las API y los dominios externos `.com` utilizando entradas de subcadenas de comodines (por ejemplo: `dns:*s3*`).  
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/wildcard.png" alt="Buscar comodines">}}

## Visualización de los costos del tráfico 

Puedes visualizar el tráfico entre zonas o entre zonas utilizando el mapa de red para localizar rápidamente los cuellos de botella. En Datadog, esta vista se utiliza para validar que las zonas de disponibilidad de la UE y EE. UU. no se comunican, para garantizar el cumplimiento del GDPR y la protección de los datos de los clientes. 
Tráfico entre zonas de disponibilidad:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/cross-az-traffic.png" alt="Tráfico entre AZ">}}
Tráfico servicio a servicio entre zonas de disponiblidad:
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/inter-az-servicio-to-servicio-traffic.png" alt="Tráfico servicio a servicio entre AZ">}}
Los bordes gruesos entre los nodos del mapa, que representan zonas de disponibilidad, indican un alto volumen de tráfico que fluye entre ellos, que es lo que contribuye a tus costos.

Puedes editar tus preferencias utilizando el botón **Filtrar tráfico**. En entornos más grandes, Datadog recomienda limitar el ámbito a las fuentes de tráfico más significativas moviendo los controles deslizantes para incluir solo las dependencias de mayor volumen.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/filter-traffic.png" alt="Limita tu tráfico">}}

## Crear gráficas de costos de tráfico 

Datadog recomienda rastrear las métricas del volumen de tráfico a lo largo del tiempo en dashboards y notebooks. Puedes representar gráficamente el tráfico entre dos endpoints cualesquiera utilizando las mismas consultas que realizarías en la página de red. Para ello, crea un **Widget de serie temporal** y selecciona la fuente **Tráfico de red** en el menú desplegable.  

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/timeseries.png" alt="Crear una serie temporal">}}

A continuación, comparte estos resultados y cualquier problema con tus compañeros de equipo utilizando dashboards y notebooks. 

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/red-traffic.png" alt="Ver tu tráfico de red">}}