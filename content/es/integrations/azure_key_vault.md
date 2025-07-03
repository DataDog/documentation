---
aliases:
- /es/integrations/azure_keyvault
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Key Vault.
doc_link: https://docs.datadoghq.com/integrations/azure_key_vault/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-key-vault-monitoring-events/
  tag: Blog
  text: Monitorizar eventos de caducidad de Azure Key Vault
git_integration_title: azure_key_vault
has_logo: true
integration_id: azure-keyvault
integration_title: Microsoft Azure Key Vault
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_key_vault
public_title: Integración de Datadog y Microsoft Azure Key Vault
short_description: Rastrea las métricas clave de Azure Key Vault.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Key Vault se utiliza para salvaguardar y gestionar claves criptográficas y secretos utilizados por aplicaciones y servicios en la nube.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Key Vault.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-keyvault" }}


### Eventos

Datadog envía *eventos de caducidad de credenciales*, que ofrecen visibilidad sobre la caducidad de credenciales para los registros de aplicaciones de Azure, las claves de Key Vault, los secretos de Key Vault y los certificados de Key Vault. La integración de *Azure Key Vault* debe estar instalada para recibir eventos de claves de Key Vault, secretos de Key Vault y certificados de Key Vault.

- Los **eventos de caducidad** se envían 60, 30, 15 y 1 día antes de la caducidad de las credenciales y una vez después de la caducidad.
- Los **eventos de permisos faltantes** se envían cada 15 días. Un evento de permisos faltantes enumera las Key Vaults para las cuales Datadog no ha recibido permisos. Si no se han realizado cambios en relación con los permisos de Key Vault en el ciclo anterior de 15 días, la notificación del evento no se vuelve a enviar.

Puedes consultar estos eventos en el [Explorador de eventos][3].

**Notas**: 

- Para recopilar los eventos de caducidad del registro de aplicaciones Azure, [habilita el acceso a la API Microsoft Graph][4].
- Si un certificado y su clave y secreto asociados caducan exactamente al mismo tiempo, se envía un único evento de caducidad para todos los recursos.

### Checks de servicios

La integración Azure Key Vault no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_key_vault/azure_key_vault_metadata.csv
[3]: https://app.datadoghq.com/event/explorer?query=status%3Awarn%20source%3Aazure
[4]: https://docs.datadoghq.com/es/integrations/guide/azure-graph-api-permissions/
[5]: https://docs.datadoghq.com/es/help/