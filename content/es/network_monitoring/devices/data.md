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

Network Device Monitoring envía métricas especificados en el espacio de nombres `snmp.*`. Las métricas recopiladas están determinadas por el `[configured profile]`.
Si las métricas que quieres no están en la siguiente lista, busca el OID y su nombre en la [base de datos de referencia global de OID][1] para añadir a tus perfiles.

{{< get-metrics-from-git "snmp" >}}


[1]: http://oidref.com