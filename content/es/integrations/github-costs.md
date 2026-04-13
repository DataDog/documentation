---
aliases:
- /es/integrations/github_costs
app_id: github-costs
categories:
- cost management
- colaboración
- herramientas de desarrollo
- control de fuentes
custom_kind: integración
description: Integra GitHub Costs con los costes de nube de Datadog para optimizar
  e informar sobre los costes del uso de repositorios y empresas.
integration_version: 1.0.0
media:
- caption: Dashboard de GitHub Costs
  image_url: images/dashboard-redacted.png
  media_type: imagen
- caption: Explorador de GitHub Costs
  image_url: images/explorer-redacted.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: GitHub Costs
---
## Información general

La integración de GitHub Costs en Datadog proporciona una vista exhaustiva de los gastos de GitHub, desde Actions hasta Storage y Copilot, en toda la organización. Con esta integración, puedes ver los costes de GitHub junto con otros costes en [Cloud Cost Management](https://app.datadoghq.com/cost), filtrar los datos de costes por repositorio y optimizar los gastos de nube en toda la empresa.

## Configuración

Para leer la información de facturación de la empresa desde GitHub, Datadog requiere un token de acceso personal (Classic) de un usuario administrador de empresa con los contextos `manage_billing:enterprise` y `repo`, como se indica en la [documentación de GitHub](https://docs.github.com/en/enterprise-cloud@latest/rest/enterprise-admin/billing?apiVersion=2022-11-28). También debes proporcionar el nombre de tu empresa, que se encuentra en la [página de configuración de la empresa](https://github.com/settings/enterprises).

### Instalación

1. Ve al [cuadro de Github Costs](https://app.datadoghq.com/integrations/github-costs) de Datadog.
1. Haz clic en **Add New** (Añadir nuevo).
1. Introduce un nombre de cuenta, tu token de acceso personal y el nombre de tu empresa (en formato `enterprise-name` ), así como las etiquetas (tags) correspondientes.
1. Haz clic en el botón de marca de verificación para guardar esta cuenta.

### Validación

Una vez configurada la integración, los datos suelen aparecer en [Cloud Cost Management](https://app.datadoghq.com/cost) bajo el nombre del proveedor "GitHub Costs" en un plazo aproximado de 24 horas. Para obtener una lista de los datos recopilados, consulta [Integraciones SaaS Cost](https://docs.datadoghq.com/cloud_cost_management/saas_costs/?tab=githubcosts#data-collected).

## Datos recopilados

### Cloud Cost Management

La integración de GitHub Costs calcula los costes basándose en precios de lista y datos de uso, e incluye valores de descuento cuando están disponibles. No tiene en cuenta las tarifas negociadas.

### Métricas

GitHub Costs no incluye métricas.

### Recopilación de logs

GitHub Costs no incluye logs.

### Eventos

GitHub Costs no incluye eventos.

### Checks de servicio

GitHub Costs no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).