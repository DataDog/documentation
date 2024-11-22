---
aliases:
- /es/integrations/azure_networkinterface
categories:
- azure
- nube
- la red
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Network Interface.
doc_link: https://docs.datadoghq.com/integrations/azure_network_interface/
draft: false
git_integration_title: azure_network_interface
has_logo: true
integration_id: azure-networkinterface
integration_title: Microsoft Azure Network Interface
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_network_interface
public_title: Integración de Datadog y Microsoft Azure Network Interface
short_description: Rastrea las métricas clave de Azure Network Interface.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Network Interface permite que una máquina virtual de Azure se comunique con Internet, Azure y recursos locales.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Network Interface.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_network_interface" >}}


### Eventos

La integración Azure Network Interface no incluye eventos.

### Checks de servicios

La integración Azure Network Interface no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_network_interface/azure_network_interface_metadata.csv
[3]: https://docs.datadoghq.com/es/help/