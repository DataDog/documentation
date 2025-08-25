---
categories:
- azure
- nube
- network
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Virtual Network.
doc_link: https://docs.datadoghq.com/integrations/azure_virtual_networks/
draft: false
git_integration_title: azure_virtual_networks
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Virtual Network
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_virtual_networks
public_title: Integración de Datadog y Microsoft Azure Virtual Network
short_description: Rastrea las métricas clave de Azure Virtual Network.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Virtual Network es el componente fundamental de tu red privada en Azure. Virtual Network permite que muchos tipos de recursos de Azure, como Azure Virtual Machines, se comuniquen de forma segura entre sí, con Internet y con las redes locales. Usa Datadog para monitorizar el espacio de direcciones disponible y evitar quedarte sin espacio en momentos críticos.

Obtén métricas de Azure Virtual Network para:

* Monitorizar la cantidad de direcciones asignadas y no asignadas para tus redes virtuales.
* Rastrear el número de interconexiones de red totales y conectadas.
* Rastrear el número de direcciones disponibles frente a las asignadas dentro de tus subredes.
* Evitar quedarte sin espacio de direcciones en momentos críticos.

**Las métricas de esta integración no están disponibles en Azure Monitor**. Datadog las genera consultando las API de metadatos de Azure y convirtiendo las respuestas en puntos de datos de series temporales. Se proporcionan en Datadog como métricas estándar de la integración de Azure.

## Configuración

**Nota**: Azure no admite el uso de subredes de gateway y devuelve un valor de (-1) tanto para el espacio de direcciones disponible como para el asignado. Asegúrate de tener esto en cuenta al analizar el uso agregado en las redes virtuales que contienen subredes de gateway.

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados
### Métricas
{{< get-metrics-from-git "azure-virtual-network" >}}


### Eventos
La integración Azure Virtual Network no incluye eventos.

### Checks de servicios
La integración Azure Virtual Network no incluye checks de servicios.

## Solucionar problemas
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_virtual_networks/azure_virtual_networks_metadata.csv
[3]: https://docs.datadoghq.com/es/help/
