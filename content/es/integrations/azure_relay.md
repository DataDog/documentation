---
categories:
- azure
- nube
- network
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Relay.
doc_link: https://docs.datadoghq.com/integrations/azure_relay/
draft: false
git_integration_title: azure_relay
has_logo: true
integration_id: azure-relay
integration_title: Microsoft Azure Relay
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_relay
public_title: Integración de Datadog y Microsoft Azure Relay
short_description: Rastrea las métricas principales de Azure Relay.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

El servicio Azure Relay te permite exponer de forma segura los servicios que se ejecutan en tu red corporativa a la nube pública sin abrir un puerto en tu firewall ni realizar cambios intrusivos en la infraestructura de tu red corporativa.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Relay.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-relay" >}}


### Eventos

La integración Azure Relay no incluye eventos.

### Checks de servicio

La integración de Azure Relay no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_relay/azure_relay_metadata.csv
[3]: https://docs.datadoghq.com/es/help/