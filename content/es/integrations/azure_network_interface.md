---
aliases:
- /es/integrations/azure_networkinterface
categories:
- azure
- nube
- network
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

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure Network Interface permite que una máquina virtual de Azure se comunique con Internet, Azure y recursos locales.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Network Interface.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_network_interface" >}}


### Eventos

La integración Azure Network Interface no incluye eventos.

### Checks de servicio

La integración Azure Network Interface no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_network_interface/azure_network_interface_metadata.csv
[3]: https://docs.datadoghq.com/es/help/