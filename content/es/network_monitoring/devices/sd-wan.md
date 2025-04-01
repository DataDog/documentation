---
description: Empezando con los dispositivos SD-WAN
further_reading:
- link: /network_monitoring/devices/supported_devices
  tag: doc
  text: Dispositivos NDM compatibles
- link: network_monitoring/devices/data/
  tag: Doc
  text: Datos de NDM recopilados
- link: https://www.datadoghq.com/architecture/network-observability-sd-wan-reference-architecture/
  tag: Centro de arquitectura
  text: 'Observabilidad de red: Arquitectura de referencia SD-WAN'
title: SD-WAN
---

## Monitorización SD-WAN

Además de los dispositivos SNMP, puedes monitorizar entornos inalámbricos y de red de área extensa definida por software (SD-WAN) de determinados proveedores. Recopila métricas de puntos de acceso inalámbricos y monitoriza el estado de los túneles SD-WAN y de los dispositivos de borde.

{{< img src="network_device_monitoring/getting_started/sd-wan-datadog-integration_no_numbers.png" alt="Arquitectura de referencia SD-WAN" style="width:90%;" >}}

SD-WAN es un tipo de tecnología de red que utiliza principios de redes definidas por software (SDN) para gestionar y optimizar el rendimiento de las redes de área extensa (WAN). A menudo se utiliza para interconectar oficinas remotas y centros de datos a través de diferentes transportes (MPLS, banda ancha, 5G, etc.). SD-WAN se beneficia del balanceo de cargas y la detección automática de fallos a través de estos transportes. Para obtener más información sobre las capacidades de observabilidad SD-WAN de Datadog, consulta la [arquitectura de referencia SD-WAN][1].

## Proveedores compatibles

Datadog admite los siguientes proveedores para la monitorización de redes SD-WAN:

  - [Meraki SD-WAN][2] 
  - [Cisco SD-WAN][3] 
  - [VmWare VeloCloud][4] (En vista previa)

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/architecture/network-observability-sd-wan-reference-architecture/
[2]: https://docs.datadoghq.com/es/integrations/meraki/
[3]: https://docs.datadoghq.com/es/integrations/cisco_sdwan/
[4]: https://docs.datadoghq.com/es/integrations/velocloud_sd_wan/