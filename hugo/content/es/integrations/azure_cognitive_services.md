---
aliases:
- /es/integrations/azure_cognitiveservices
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Cognitive Services.
doc_link: https://docs.datadoghq.com/integrations/azure_cognitive_services/
draft: false
git_integration_title: azure_cognitive_services
has_logo: true
integration_id: azure-cognitiveservices
integration_title: Microsoft Azure Cognitive Services
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_cognitive_services
public_title: Integración de Datadog y Microsoft Azure Cognitive Services
short_description: Rastrea las métricas clave de Azure Cognitive Services.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure Cognitive Services son API, SDK y servicios disponibles para ayudar a los desarrolladores a crear aplicaciones inteligentes sin necesidad de tener habilidades o conocimientos directos de inteligencia artificial o ciencia de datos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Cognitive Services.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-cognitiveservices" }}


### Eventos

La integración Azure Cognitive Services no incluye eventos.

### Checks de servicio

La integración Azure Cognitive Services no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cognitive_services/azure_cognitive_services_metadata.csv
[3]: https://docs.datadoghq.com/es/help/