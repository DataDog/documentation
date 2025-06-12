---
aliases:
- /es/integrations/azure_appserviceplan
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure App Service Plan.
doc_link: https://docs.datadoghq.com/integrations/azure_app_service_plan/
draft: false
git_integration_title: azure_app_service_plan
has_logo: true
integration_id: azure-appserviceplan
integration_title: Microsoft Azure App Service Plan
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_app_service_plan
public_title: Integración de Datadog y Microsoft Azure App Service Plan
short_description: Rastrea las métricas principales de Azure App Service Plan.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure App Service Plan define un conjunto de recursos informáticos para que se ejecute una aplicación web. Estos recursos informáticos son análogos a la granja de servidores del hospedaje web convencional.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure App Service Plan.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_app_service_plan" >}}


### Eventos

La integración Azure App Service Plan no incluye ningún evento.

### Checks de servicio

La integración Azure App Service Plan no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_plan/azure_app_service_plan_metadata.csv
[3]: https://docs.datadoghq.com/es/help/