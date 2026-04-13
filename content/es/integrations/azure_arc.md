---
app_id: azure-arc
app_uuid: 0afa2450-f495-4e18-bdd7-c1cd43e3aebf
assets:
  dashboards:
    azure_arc: assets/dashboards/azure_arc.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.arc_vm.count
      metadata_path: metadata.csv
      prefix: azure.arc_
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 801
    source_type_name: Azure Arc
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- azure
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_arc
integration_id: azure-arc
integration_title: Azure Arc
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_arc
public_title: Azure Arc
short_description: Realiza un seguimiento de métricas clave de Azure Arc.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Categoría::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Realiza un seguimiento de métricas clave de Azure Arc.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/azure-arc-integration/
  support: README.md#Support
  title: Azure Arc
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Arc es un puente que amplía la plataforma Azure para ayudarte a crear aplicaciones y servicios con una flexibilidad suficiente 
para ejecutarse en centros de datos, en el borde y en entornos de varias nubes.

Utiliza la integración Azure Arc para:

- Recopilar el estado de conectividad, las etiquetas (tags) y otros detalles de servidores Azure Arc y clústeres Kubernetes
- Para los servidores gestionados por Arc que también se monitorizan con el Datadog Agent, propaga las etiquetas Azure Arc al host en Datadog y sus métricas y logs asociados
- Para los servidores gestionados por Arc que también se monitorizan con AWS o la integración GCP, propaga las etiquetas Azure Arc al host en Datadog y sus métricas y logs asociados
- Obtén información y resúmenes inmediatos de los datos anteriores en el dashboard predefinido de Azure Arc.

También puedes utilizar la extensión Datadog para configurar y desplegar el Datadog Agent en servidores Arc. Para ver detalles sobre esta opción, consulta la página de la [extensión Datadog para máquinas virtuales][1].

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][2]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_arc" >}}


### Eventos

La integración Azure Arc no incluye eventos.

### Checks de servicio

La integración Azure Arc no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

[Monitoriza tu infraestructura híbrida de Azure Arc con Datadog][5]

[1]: https://docs.datadoghq.com/es/integrations/guide/powershell-command-to-install-azure-datadog-extension/#install-on-azure-arc
[2]: https://docs.datadoghq.com/es/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_arc/azure_arc_metadata.csv
[4]: https://docs.datadoghq.com/es/help/
[5]: https://www.datadoghq.com/blog/azure-arc-integration/