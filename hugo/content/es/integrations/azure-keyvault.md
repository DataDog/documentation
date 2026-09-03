---
aliases:
- /es/integrations/azure_key_vault
app_id: azure-keyvault
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas clave de Azure Key Vault.
further_reading:
- link: https://www.datadoghq.com/blog/azure-key-vault-monitoring-events/
  tag: blog
  text: Monitorizar eventos de caducidad de Azure Key Vault
media: []
title: Azure Key Vault
---
## Información general

Azure Key Vault se utiliza para salvaguardar y gestionar claves criptográficas y secretos utilizados por aplicaciones y servicios en la nube.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Key Vault.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración con Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No se requiere ningún paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.keyvault_vaults.service_api_hit** <br>(count) | Número total de accesos a la API de servicios<br>_Se muestra como solicitud_ |
| **azure.keyvault_vaults.service_api_latency** <br>(gauge) | Latencia global de las solicitudes de API de servicio<br>_Se muestra en milisegundos_ |
| **azure.keyvault_vaults.service_api_result** <br>(count) | Número total de resultados de la API de servicio<br>_Se muestra como respuesta_ |
| **azure.keyvault_vaults.saturation_shoebox** <br>(gauge) | Capacidad de la bóveda utilizada<br>_Se muestra en porcentaje_ |
| **azure.keyvault_vaults.availability** <br>(gauge) | Disponibilidad de las solicitudes de bóveda<br>_Se muestra en porcentaje_ |
| **azure.keyvault_vaults.count** <br>(gauge) | Recuento de todos los recursos de Azure Key Vault|
| **azure.keyvault_managedhsms.availability** <br>(gauge) | Disponibilidad de las solicitudes de servicio<br>_Se muestra en porcentaje_ |
| **azure.keyvault_managedhsms.service_api_hit** <br>(count) | Número total de accesos a la API de servicios<br>_Se muestra como solicitud_ |
| **azure.keyvault_managedhsms.service_api_latency** <br>(gauge) | Latencia global de las solicitudes de la API de servicio<br>_Se muestra en milisegundos_ |

### Eventos

Datadog envía *eventos de caducidad de credenciales* para ayudarte a monitorizar con las próximas caducidades de registros de aplicaciones de Azure, claves de Key Vault, secretos de Key Vault y certificados de Key Vault. Para recibir eventos de claves, secretos y certificados de Key Vault, debes instalar la integración *Azure Key Vault*.

- **Los eventos de caducidad** se envían 60, 30, 14, 7 y 1 día(s) antes de la caducidad de la credencial, y una vez después de la caducidad.
- **Los eventos de permisos faltantes** se envían cada 15 días y enumeran las Key Vaults para las cuales Datadog carece de los permisos requeridos. Si no se realizan cambios en los permisos del Key Vault durante el ciclo anterior de 15 días, la notificación del evento no se vuelve a enviar.

Puedes consultar estos eventos en el [Event Explorer](https://app.datadoghq.com/event/explorer?query=status%3Awarn%20source%3Aazure).

**Notas**:

- Para recopilar eventos de caducidad de registro de aplicaciones Azure, [habilita el acceso a la API de Microsoft Graph](https://docs.datadoghq.com/integrations/guide/azure-graph-api-permissions/).
- Si un certificado y su clave y secreto asociados caducan exactamente al mismo tiempo, se envía un único evento de caducidad para todos los recursos.

### Checks de servicio

La integración Azure Key Vault no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}