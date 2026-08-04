---
aliases:
- /es/integrations/azure_virtual_network
app_id: azure-virtual-network
categories:
- azure
- nube
- red
custom_kind: integración
description: Azure Virtual Networks permite comunicaciones de red seguras entre muchos
  tipos de recursos de Azure
media: []
title: Azure Virtual Network
---
## Información general

Azure Virtual Network es el componente fundamental de tu red privada en Azure. Virtual Network permite que muchos tipos de recursos de Azure, como Azure Virtual Machines, se comuniquen de forma segura entre sí, con Internet y con las redes locales. Usa Datadog para monitorizar el espacio de direcciones disponible y evitar quedarte sin espacio en momentos críticos.

Obtén métricas de Azure Virtual Network para:

- Monitorizar la cantidad de direcciones asignadas y no asignadas para tus redes virtuales.
- Rastrear el número de interconexiones de red totales y conectadas.
- Rastrear el número de direcciones disponibles frente a las asignadas dentro de tus subredes.
- Evitar quedarte sin espacio de direcciones en momentos críticos.

**Las métricas de esta integración no están disponibles en Azure Monitor**. Datadog las genera consultando las API de metadatos de Azure y convirtiendo las respuestas en puntos de datos de series temporales. Se proporcionan en Datadog como métricas estándar de la integración de Azure.

## Configuración

**Nota**: Azure no admite el uso de subredes de gateway y devuelve un valor de (-1) tanto para el espacio de direcciones disponible como para el asignado. Asegúrate de tener esto en cuenta al analizar el uso agregado en las redes virtuales que contienen subredes de gateway.

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No hay más pasos de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.network_virtualnetworks.connected_peerings** <br>(gauge) | Pares conectados en la red virtual|
| **azure.network_virtualnetworks.subnets.assigned_addresses** <br>(gauge) | Direcciones asignadas en la subred|
| **azure.network_virtualnetworks.subnets.available_addresses** <br>(gauge) | Direcciones disponibles en la subred|
| **azure.network_virtualnetworks.total_addresses** <br>(gauge) | Total de direcciones en la red virtual|
| **azure.network_virtualnetworks.total_peerings** <br>(gauge) | Total de emparejamientos en la red virtual|
| **azure.network_virtualnetworks.total_subnets** <br>(gauge) | Número total de subredes en la red virtual|

### Eventos

La integración Azure Virtual Network no incluye eventos.

### Checks de servicio

La integración Azure Virtual Network no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).