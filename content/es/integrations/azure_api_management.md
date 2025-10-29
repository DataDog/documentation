---
aliases:
- /es/integrations/azure_apimanagement
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure API Management.
doc_link: https://docs.datadoghq.com/integrations/azure_api_management/
draft: false
git_integration_title: azure_api_management
has_logo: true
integration_id: azure-apimanagement
integration_title: Microsoft Azure API Management
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_api_management
public_title: Integración de Datadog y Microsoft Azure API Management
short_description: Rastrea las métricas principales de Azure API Management.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure API Management es un servicio totalmente gestionado que permite a los clientes publicar, proteger, transformar, mantener y monitorizar las API.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure API Management.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-apimanagement" }}


### Eventos

La integración Azure API Management no incluye ningún evento.

### Checks de servicio

La integración Azure API Management no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_api_management/azure_api_management_metadata.csv
[3]: https://docs.datadoghq.com/es/help/