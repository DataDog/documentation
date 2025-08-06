---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Recovery Service Vault.
doc_link: https://docs.datadoghq.com/integrations/azure_recovery_service_vault/
draft: false
git_integration_title: azure_recovery_service_vault
has_logo: true
integration_id: ''
integration_title: Azure Recovery Service Vault
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_recovery_service_vault
public_title: Integración de Datadog y Azure Recovery Service Vault
short_description: Rastrea las métricas principales de Azure Recovery Service Vault.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

La integración Azure Recovery Service Vault te ayuda a monitorizar el estado de una bóveda de servicio de recuperación que se ejecuta en Microsoft Azure.

La integración de Azure con Datadog puede recopilar métricas de Azure Recovery Service Vault, pero se [recomienda][1] que instales el Datadog Agent en tus máquinas virtuales. Si tu organización se encuentra en el sitio US3 de Datadog y has configurado el recurso de Datadog en Azure, utiliza las instrucciones de la [Guía de configuración manual de la integración nativa de Azure][2]. Se pueden utilizar las instrucciones de la [Guía de configuración manual de la integración de Azure][3] o la [Guía de gestión programática de Azure][4] con **todos los sitios**.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][5]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_recovery_service_vault" >}}


### Eventos

La integración Azure Recovery Service Vault no incluye ningún evento.

### Checks de servicios

La integración Azure Recovery Service Vault no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].


[1]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[2]: https://docs.datadoghq.com/es/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: https://docs.datadoghq.com/es/integrations/guide/azure-manual-setup/#agent-installation
[4]: https://docs.datadoghq.com/es/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension
[5]: https://docs.datadoghq.com/es/integrations/azure/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_recovery_service_vault/azure_recovery_service_vault_metadata.csv
[7]: https://docs.datadoghq.com/es/help/
