---
aliases:
- /es/network_performance_monitoring/devices/data/
disable_toc: true
title: Referencia de métricas SNMP
---

## Eventos

Network Device Monitoring no incluye ningún eventos.

## Checks de servicio

{{< get-service-checks-from-git "snmp" >}}

## Métricas

Network Device Monitoring envía las métricas especificadas en el espacio de nombres `snmp.*`. Las métricas recopiladas vienen determinadas por el [perfil configurado][2].
Si las métricas que buscas no se encuentran en la siguiente lista, busca el OID y su nombre en la [base de datos de referencia global de OID][1] para añadirlos a tus perfiles.

{{< get-metrics-from-git "snmp" >}}


[1]: http://oidref.com
[2]: /es/network_monitoring/devices/profiles