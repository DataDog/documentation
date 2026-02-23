---
app_id: azure_recovery_service_vault
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas principales de Azure Recovery Service Vault.
title: Azure Recovery Service Vault
---
## Información general

La integración Azure Recovery Service Vault te ayuda a monitorizar el estado de una bóveda de servicio de recuperación que se ejecuta en Microsoft Azure.

La integración Datadog Azure puede recopilar métricas de Azure Recovery Service Vault, pero se [recomienda](https://www.datadoghq.com/blog/dont-fear-the-agent/) que instales el Datadog Agent en tus máquinas virtuales. Si tu organización se encuentra en el sitio US3 de Datadog y has configurado el recurso Datadog en Azure, utiliza las instrucciones de la [guía de configuración manual de la integración nativa Azure](https://docs.datadoghq.com/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent). **Todos los sitios** pueden utilizar las instrucciones de la [guía de configuración manual de la integración nativa Azure](https://docs.datadoghq.com/integrations/guide/azure-manual-setup/#agent-installation) o la [guía de gestión mediante programación de Azure](https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/#datadog-azure-vm-extension).

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.recoveryservices_vaults.backup_health_event** <br>(count) | Recuento de eventos de salud pertenecientes a la salud del trabajo de respaldo|
| **azure.recoveryservices_vaults.restore_health_event** <br>(count) | Recuento de eventos de salud pertenecientes a la restauración de la salud del trabajo|
| **azure.recoveryservices_vaults.count** <br>(gauge) | Recuento de almacenes seguros de servicios de recuperación|

### Eventos

La integración Azure Recovery Service Vault no incluye ningún evento.

### Checks de servicio

La integración Azure Recovery Service Vault no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).