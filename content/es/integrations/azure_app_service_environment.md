---
aliases:
- /es/integrations/azure_appserviceenvironment
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure App Service Environment.
doc_link: https://docs.datadoghq.com/integrations/azure_app_service_environment/
draft: false
git_integration_title: azure_app_service_environment
has_logo: true
integration_id: azure-appserviceenvironment
integration_title: Microsoft Azure App Service Environment
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_app_service_environment
public_title: Integración de Datadog y Microsoft Azure App Service Environment
short_description: Rastrea las métricas principales de Azure App Service Environment.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure App Service Environment es una característica de Azure App Service que proporciona un entorno totalmente aislado y dedicado para ejecutar de forma segura aplicaciones de App Service a gran escala.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure App Service Environment.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-appserviceenvironment" }}


### Eventos

La integración Azure App Service Environment no incluye ningún evento.

### Checks de servicio

La integración Azure App Service Environment no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_environment/azure_app_service_environment_metadata.csv
[3]: https://docs.datadoghq.com/es/help/