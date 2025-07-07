---
aliases: []
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Realiza un seguimiento de métricas clave de Azure Arc.
doc_link: https://docs.datadoghq.com/integrations/azure_arc/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-arc-integration/
  tag: Blog
  text: Monitorizar tu infraestructura híbrida Azure Arc con Datadog
git_integration_title: azure_arc
has_logo: true
integration_id: azure-arc
integration_title: Microsoft Azure Arc
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_arc
public_title: Integración Datadog-Microsoft Azure Arc
short_description: Realiza un seguimiento de métricas clave de Azure Arc.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
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

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure][2]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-arc" >}}


### Eventos

La integración Azure Arc no incluye eventos.

### Checks de servicio

La integración Azure Arc no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/guide/powershell-command-to-install-azure-datadog-extension/#install-on-azure-arc
[2]: https://docs.datadoghq.com/es/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_arc/azure_arc_metadata.csv
[4]: https://docs.datadoghq.com/es/help/