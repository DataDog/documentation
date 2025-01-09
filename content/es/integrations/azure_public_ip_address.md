---
aliases:
- /es/integrations/azure_publicipaddress
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Public IP Address.
doc_link: https://docs.datadoghq.com/integrations/azure_public_ip_address/
draft: false
git_integration_title: azure_public_ip_address
has_logo: true
integration_id: azure-publicipaddress
integration_title: Microsoft Azure Public IP Address
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_public_ip_address
public_title: Integración de Datadog y Microsoft Azure Public IP Address
short_description: Rastrea las métricas principales de Azure Public IP Address.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Cuando se asigna una dirección IP pública de Azure a un recurso, habilita la comunicación entrante y la conectividad saliente desde Internet.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Public IP Address.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_public_ip_address" >}}


### Eventos

La integración Azure Public IP Address no incluye ningún evento.

### Checks de servicios

La integración Azure Public IP Address no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_public_ip_address/azure_public_ip_address_metadata.csv
[3]: https://docs.datadoghq.com/es/help/