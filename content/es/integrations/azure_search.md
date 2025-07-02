---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Cognitive Search.
doc_link: https://docs.datadoghq.com/integrations/azure_search/
draft: false
git_integration_title: azure_search
has_logo: true
integration_id: azure-search
integration_title: Microsoft Azure Cognitive Search
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_search
public_title: Integración de Datadog y Microsoft Azure Cognitive Search
short_description: Rastrea las métricas clave de Azure Cognitive Search.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Cognitive Search es una solución en la nube de búsqueda como servicio que brinda a los desarrolladores API y herramientas para añadir una experiencia de búsqueda enriquecida sobre contenido privado y heterogéneo en aplicaciones web, móviles y empresariales.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Cognitive Search.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-ai-search" }}


### Eventos

La integración Azure Cognitive Search no incluye eventos.

### Checks de servicios

La integración Azure Cognitive Search no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_search/azure_search_metadata.csv
[3]: https://docs.datadoghq.com/es/help/