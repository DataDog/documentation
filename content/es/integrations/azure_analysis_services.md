---
aliases:
- /es/integrations/azure_analysisservices
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Analysis Services.
doc_link: https://docs.datadoghq.com/integrations/azure_analysis_services/
draft: false
git_integration_title: azure_analysis_services
has_logo: true
integration_id: azure-analysisservices
integration_title: Microsoft Azure Analysis Services
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_analysis_services
public_title: Integración de Datadog y Microsoft Azure Analysis Services
short_description: Rastrea las métricas clave de Azure Analysis Services.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Analysis Services es una plataforma como servicio (PaaS) totalmente gestionada que proporciona modelos de datos de nivel empresarial en la nube.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Analysis Services.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_analysis_services" >}}


### Eventos

La integración Azure Analysis Services no incluye eventos.

### Checks de servicio

La integración Azure Analysis Services no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_analysis_services/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/es/help/