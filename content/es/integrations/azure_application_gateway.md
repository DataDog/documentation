---
aliases:
- /es/integrations/azure_applicationgateway
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Application Gateway.
doc_link: https://docs.datadoghq.com/integrations/azure_application_gateway/
draft: false
git_integration_title: azure_application_gateway
has_logo: true
integration_id: azure-applicationgateway
integration_title: Microsoft Azure Application Gateway
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_application_gateway
public_title: Integración de Datadog y Microsoft Azure Application Gateway
short_description: Rastrea las métricas principales de Azure Application Gateway.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure Application Gateway es un equilibrador de carga de tráfico web que te permite gestionar el tráfico a tus aplicaciones web.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Application Gateway.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-applicationgateway" }}


### Eventos

La integración Azure Application Gateway no incluye ningún evento.

### Checks de servicio

La integración Azure Application Gateway no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_application_gateway/azure_application_gateway_metadata.csv
[3]: https://docs.datadoghq.com/es/help/