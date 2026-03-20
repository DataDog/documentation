---
app_id: github-costs
app_uuid: fb5e121a-6cdc-4a2a-b85a-850134c50693
assets:
  dashboards:
    GitHub-Costs-Overview: assets/dashboards/GitHub-Costs-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38026450
    source_type_name: GitHub Costs
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- gestión de costes
- colaboración
- herramientas de desarrollo
- control de fuentes
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: github_costs
integration_id: github-costs
integration_title: GitHub Costs
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: github_costs
public_title: GitHub Costs
short_description: Integra GitHub Costs con Datadog Cloud Cost para optimizar e informar
  sobre los costes de uso de repositorios y empresas.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Categoría::Gestión de costes
  - Category::Collaboration
  - Categoría::Herramientas de desarrollo
  - Category::Source Control
  configuration: README.md#Setup
  description: Integra GitHub Costs con Datadog Cloud Cost para optimizar e informar
    sobre los costes de uso de repositorios y empresas.
  media:
  - caption: Dashboard de GitHub Costs
    image_url: images/dashboard-redacted.png
    media_type: imagen
  - caption: Explorador de GitHub Costs
    image_url: images/explorer-redacted.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: GitHub Costs
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

La integración de GitHub Costs de Datadog proporciona una visión completa de los gastos de GitHub, desde Actions a Storage a Copilot, en toda la organización. Con esta integración, puedes ver los costes de GitHub junto con otros costes en [Cloud Cost Management][1], filtrar los datos de costes por repositorio y optimizar el gasto en la nube en toda la empresa.

## Configuración

Para leer la información de facturación de la empresa desde GitHub, Datadog requiere un token de acceso personal (clásico) con los contextos `manage_billing:enterprise` y `repo`, como se indica en la [documentación de GitHub][2]. También es necesario proporcionar el nombre de la empresa, que se puede encontrar en la [página de parámetros de la empresa][3].


### Instalación

1. Ve al [cuadro de Github Costs][4] en Datadog.
2. Haz clic en **Add New** (Añadir nuevo).
3. Introduce un nombre de cuenta, tu token de acceso personal y el nombre de tu empresa (en formato `enterprise-name`), así como las etiquetas (tags) correspondientes.
4. Haz clic en el botón de marca de verificación para guardar esta cuenta.

### Validación

Una vez configurada la integración, los datos suelen aparecer en [Cloud Cost Management][1] en "GitHub Costs" del nombre del proveedor en un plazo aproximado de 24 horas. Para ver una lista de los datos recopilados, consulta [Integraciones de costes SaaS][5].

## Datos recopilados

### Cloud Cost Management

La integración de costes de GitHub calcula los costes basándose en precios de lista y datos de uso, e incluye valores de descuento cuando están disponibles. No tiene en cuenta las tarifas negociadas.

### Métricas

GitHub Costs no incluye métricas.

### Recopilación de logs

GitHub Costs no incluye logs.

### Eventos

GitHub Costs no incluye eventos.

### Checks de servicio

GitHub Costs no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][6].

[1]: https://app.datadoghq.com/cost
[2]: https://docs.github.com/en/enterprise-cloud@latest/rest/enterprise-admin/billing?apiVersion=2022-11-28
[3]: https://github.com/settings/enterprises
[4]: https://app.datadoghq.com/integrations/github-costs
[5]: https://docs.datadoghq.com/es/cloud_cost_management/saas_costs/?tab=githubcosts#data-collected
[6]: https://docs.datadoghq.com/es/help/