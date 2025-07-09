---
categories:
- automatización
- azure
- nube
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Automation.
doc_link: https://docs.datadoghq.com/integrations/azure_automation/
draft: false
git_integration_title: azure_automation
has_logo: true
integration_id: azure-automation
integration_title: Microsoft Azure Automation
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_automation
public_title: Integración de Datadog y Microsoft Azure Automation
short_description: Rastrea las métricas principales de Azure Automation.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure Automation ofrece un servicio de configuración y automatización basado en la nube que proporciona una gestión consistente en los entornos que son de Azure y que no son de Azure.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Automation.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-automation" >}}


### Eventos

La integración Azure Automation no incluye ningún evento.

### Checks de servicio

La integración Azure Automation no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_automation/azure_automation_metadata.csv
[3]: https://docs.datadoghq.com/es/help/