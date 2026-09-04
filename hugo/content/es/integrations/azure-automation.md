---
aliases:
- /es/integrations/azure_automation
app_id: azure-automation
categories:
- automatización
- azure
- nube
custom_kind: integración
description: Rastrea las métricas principales de Azure Automation.
media: []
title: Azure Automation
---
## Información general

Azure Automation ofrece un servicio de configuración y automatización basado en la nube que proporciona una gestión consistente en los entornos que son de Azure y que no son de Azure.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Automation.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.automation_automationaccounts.count** <br>(gauge) | Recuento de recursos de la cuenta de Azure Automation|
| **azure.automation_automationaccounts.total_job** <br>(count) | El número total de trabajos<br>_Se muestra como trabajo_ |
| **azure.automation_automationaccounts.total_update_deployment_machine_runs** <br>(count) | Total de ejecuciones de máquinas de despliegue de actualizaciones de software en una ejecución de despliegue de actualizaciones de software<br>_Se muestra como compilación_ |
| **azure.automation_automationaccounts.total_update_deployment_runs** <br>(count) | Total de ejecuciones de despliegue de actualización de software<br>_Se muestra como compilación_ |
| **azure.automation_automationaccounts_runbooks.count** <br>(gauge) | El recuento de recursos de Azure Automation Account Runbook|
| **azure.automation_automationaccounts_configurations.count** <br>(gauge) | Recuento de recursos de configuración de cuentas de Azure Automation|

### Eventos

La integración Azure Automation no incluye ningún evento.

### Checks de servicio

La integración Azure Automation no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).