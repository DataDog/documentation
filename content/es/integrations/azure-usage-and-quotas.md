---
aliases:
- /es/integrations/azure_usage_and_quotas
app_id: azure-usage-and-quotas
categories:
- azure
- nube
- gestión de costes
- red
custom_kind: integración
description: Azure Usage and Quotas te permite rastrear tus usos y límites actuales.
media: []
title: Azure Usage and Quotas
---
## Información general

Azure establece límites preconfigurados para los recursos de tu suscripción. Para evitar errores de aprovisionamiento inesperados, ten en cuenta estos límites al diseñar y escalar tu entorno de Azure. Obtén métricas de Azure Usage and Quotas para:

- Visualizar la utilización de los recursos de computación, red y almacenamiento en comparación con tu cuota.
- Comprender y evitar que los errores de aprovisionamiento alcancen los límites de cuota.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.usage.limit** <br>(gauge) | Límite de tu Azure Quota.|
| **azure.usage.current_value** <br>(gauge) | Uso actual frente a la cuota de Azure definida.|
| **azure.usage.percentage** <br>(gauge) | Porcentaje actual de cuota utilizada.<br>_Mostrado como porcentaje_ |
| **azure.usage.remaining_api_calls** <br>(gauge) | Llamadas a la API restantes para un proveedor de recursos asignado a una región.|

### Eventos

La integración Azure Quota no incluye eventos.

### Checks de servicio

La integración de Azure Quota no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).