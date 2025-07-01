---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Diagnostic Extension.
doc_link: https://docs.datadoghq.com/integrations/azure_diagnostic_extension/
draft: false
git_integration_title: azure_diagnostic_extension
has_logo: true
integration_id: ''
integration_title: Azure Diagnostic Extension
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_diagnostic_extension
public_title: Integración de Datadog y Azure Diagnostic Extension
short_description: Rastrea las métricas clave de Azure Diagnostic Extension.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
<div class="alert alert-warning">Esta integración está obsoleta. Instala el Datadog Agent para obtener información similar a nivel de invitado y de proceso sobre tus máquinas virtuales de Azure, con mejor granularidad y latencia.

Las métricas que aparecen en esta página ya no se completan para las organizaciones Datadog recién creadas. Para los usuarios existentes, estas métricas se deshabilitaron el 1 de junio de 2023.

Ante cualquier duda, ponte en contacto con el <a href="https://docs.datadoghq.com/help/" target="_blank">equipo de asistencia de Datadog</a>.</div>

## Información general

Azure Diagnostic Extension ayuda a un usuario a monitorizar el estado de una máquina virtual que se ejecuta en Microsoft Azure.

La integración de Datadog con Azure puede recopilar métricas de Azure Diagnostic Extension, pero se [recomienda][1] que instales el Datadog Agent en tus máquinas virtuales:

- Si tu organización está en el sitio US3 de Datadog y has configurado el recurso Datadog en Azure, usa las instrucciones de la [Guía de configuración manual de la integración nativa de Azure][2].
- **Todos los sitios** pueden utilizar las instrucciones de la [Guía de configuración manual de la integración de Azure][3] o la [Guía de gestión programática de Azure][4].

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][5]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_diagnostic_extension" >}}


### Eventos

La integración Azure Diagnostic Extension no incluye eventos.

### Checks de servicios

La integración Azure Diagnostic Extension no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/es/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/es/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/es/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/es/integrations/azure/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_diagnostic_extension/azure_analysis_services_metadata.csv
[7]: https://docs.datadoghq.com/es/help/