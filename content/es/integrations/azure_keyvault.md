---
app_id: azure-keyvault
app_uuid: 0b6dfab6-6e21-40be-9105-9028888759be
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.keyvault_vaults.service_api_hit
      metadata_path: metadata.csv
      prefix: azure.keyvault
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 295
    source_type_name: Azure Key Vault
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
git_integration_title: azure_keyvault
integration_id: azure-keyvault
integration_title: Azure Key Vault
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_keyvault
public_title: Azure Key Vault
short_description: Rastrea las métricas clave de Azure Key Vault.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea las métricas clave de Azure Key Vault.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/azure-key-vault-monitoring-events/
  support: README.md#Support
  title: Azure Key Vault
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Azure Key Vault se utiliza para salvaguardar y gestionar claves criptográficas y secretos utilizados por aplicaciones y servicios en la nube.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Key Vault.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure][1]. No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_keyvault" >}}


### Eventos

Datadog envía *eventos de caducidad de credenciales* para ayudarte a monitorizar con las próximas caducidades de registros de aplicaciones de Azure, claves de Key Vault, secretos de Key Vault y certificados de Key Vault. Para recibir eventos de claves, secretos y certificados de Key Vault, debes instalar la integración *Azure Key Vault*.

- **Los eventos de caducidad** se envían 60, 30, 14, 7 y 1 día(s) antes de la caducidad de la credencial, y una vez después de la caducidad.
- **Los eventos de permisos faltantes** se envían cada 15 días y enumeran las Key Vaults para las cuales Datadog carece de los permisos requeridos. Si no se realizan cambios en los permisos del Key Vault durante el ciclo anterior de 15 días, la notificación del evento no se vuelve a enviar.

Puedes consultar estos eventos en el [Explorador de eventos][3].

**Notas**: 

- Para recopilar los eventos de caducidad del registro de aplicaciones Azure, [habilita el acceso a la API Microsoft Graph][4].
- Si un certificado y su clave y secreto asociados caducan exactamente al mismo tiempo, se envía un único evento de caducidad para todos los recursos.

### Checks de servicio

La integración Azure Key Vault no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_key_vault/azure_key_vault_metadata.csv
[3]: https://app.datadoghq.com/event/explorer?query=status%3Awarn%20source%3Aazure
[4]: https://docs.datadoghq.com/es/integrations/guide/azure-graph-api-permissions/
[5]: https://docs.datadoghq.com/es/help/