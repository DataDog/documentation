---
aliases:
- /es/integrations/azure_express_route
app_id: azure-expressroute
categories:
- azure
- nube
- red
custom_kind: integración
description: Rastreo de las métricas clave de Azure Express Route.
media: []
title: Azure Express Route
---
## Información general

Utiliza el servicio Azure ExpressRoute para extender tus redes locales a la nube de Microsoft a través de una conexión privada facilitada por un proveedor de conectividad.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure ExpressRoute.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.network_expressroutecircuits.arp_availability** <br>(gauge) | Disponibilidad ARP desde MSEE hacia todos los pares<br>_Se muestra como porcentaje_ |
| **azure.network_expressroutecircuits.bgp_availability** <br>(gauge) | Disponibilidad BGP desde MSEE hacia todos los pares<br>_Se muestra como porcentaje_ |
| **azure.network_expressroutecircuits.bits_in_per_second** <br>(gauge) | Bits que entran a Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutecircuits.bits_out_per_second** <br>(gauge) | Bits de salida de Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutecircuits.global_reach_bits_in_per_second** <br>(gauge) | Bits que entran a Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutecircuits.global_reach_bits_out_per_second** <br>(gauge) | Bits de salida de Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutecircuits.qos_drop_bits_in_per_second** <br>(gauge) | Bits de entrada de datos perdidos por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutecircuits.qos_drop_bits_out_per_second** <br>(gauge) | Bits de salida de datos perdidos por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutecircuits.count** <br>(gauge) | Recuento de la integración de Azure ExpressRoute Circuits|
| **azure.network_expressroutecircuits_peerings.bits_in_per_second** <br>(gauge) | Bits que entran a Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutecircuits_peerings.bits_out_per_second** <br>(gauge) | Bits de salida de Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutecircuits_peerings.count** <br>(gauge) | Recuento de la integración de Azure ExpressRoute Circuits Peerings|
| **azure.network_expressroutegateways.er_gateway_connection_bits_in_per_second** <br>(gauge) | Bits que entran a Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutegateways.er_gateway_connection_bits_out_per_second** <br>(gauge) | Bits de salida de Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressroutegateways.express_route_gateway_count_of_routes_advertised_to_peer** <br>(gauge) | Recuento de rutas anunciadas al par por ExpressRouteGateway<br>_Se muestra como ruta_ |
| **azure.network_expressroutegateways.express_route_gateway_count_of_routes_learned_from_peer** <br>(gauge) | Recuento de rutas aprendidas de pares por ExpressRouteGateway<br>_Se muestra como ruta_ |
| **azure.network_expressroutegateways.express_route_gateway_cpu_utilization** <br>(gauge) | Utilización de la CPU de ExpressRoute Gateway<br>_Se muestra en porcentaje_ |
| **azure.network_expressroutegateways.express_route_gateway_frequency_of_routes_changed** <br>(gauge) | Frecuencia de cambio de rutas en ExpressRoute Gateway<br>_Se muestra como ruta_ |
| **azure.network_expressroutegateways.express_route_gateway_number_of_vm_in_vnet** <br>(gauge) | Número de máquinas virtuales en la red virtual|
| **azure.network_expressroutegateways.express_route_gateway_packets_per_second** <br>(gauge) | Recuento de paquetes de ExpressRoute Gateway<br>_Se muestra como paquete_ |
| **azure.network_expressroutegateways.count** <br>(gauge) | Recuento de la integración de Azure ExpressRouteGateways|
| **azure.network_expressrouteports.admin_state** <br>(gauge) | Estado de administración del puerto|
| **azure.network_expressrouteports.line_protocol** <br>(gauge) | Estado del protocolo de línea del puerto|
| **azure.network_expressrouteports.port_bits_in_per_second** <br>(gauge) | Bits que entran a Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressrouteports.port_bits_out_per_second** <br>(gauge) | Bits de salida de Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_expressrouteports.rx_light_level** <br>(count) | Nivel de luz Rx en dBm|
| **azure.network_expressrouteports.tx_light_level** <br>(count) | Nivel de luz Tx en dBm|
| **azure.network_expressrouteports.count** <br>(gauge) | Recuento de la integración de Azure ExpressRoutePorts|

### Eventos

La integración Azure ExpressRoute no incluye eventos.

### Checks de servicio

La integración Azure ExpressRoute no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).