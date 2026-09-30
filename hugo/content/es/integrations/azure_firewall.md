---
app_id: azure_firewall
categories:
- azure
- nube
- red
custom_kind: integración
description: Rastrea las métricas clave de Azure Firewall.
title: Microsoft Azure Firewall
---
## Información general

Azure Firewall es una seguridad de red nativa de la nube que se utiliza para proteger tus recursos de Azure Virtual Network.

Utiliza la integración de Azure con Datadog para recopilar métricas de Firewall.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.network_azurefirewalls.application_rule_hit** <br>(count) | El número de veces que las reglas de aplicación fueron activadas<br>_Se muestra como acierto_ |
| **azure.network_azurefirewalls.count** <br>(count) | El número de firewalls de Azure|
| **azure.network_azurefirewalls.data_processed** <br>(gauge) | La cantidad total de datos procesados por un firewall<br>_Se muestra como byte_ |
| **azure.network_azurefirewalls.firewall_health** <br>(gauge) | Indica el estado general de un firewall<br>_Se muestra como porcentaje_ |
| **azure.network_azurefirewalls.network_rule_hit** <br>(count) | El número de veces que las reglas de la red fueron activadas<br>_Se muestra como acierto_ |
| **azure.network_azurefirewalls.snat_port_utilization** <br>(gauge) | El porcentaje de puertos SNAT de salida actualmente en uso<br>_Se muestra como porcentaje_ |
| **azure.network_azurefirewalls.throughput** <br>(gauge) | El rendimiento procesado por un firewall<br>_Se muestra como acierto_ |

### Eventos

La integración Azure Firewall no incluye eventos.

### Checks de servicio

La integración de Azure Firewall no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).