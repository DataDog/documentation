---
app_id: okta-workflows
app_uuid: e5e2a25d-aa66-41bc-9996-50f635dcc7a1
assets:
  dashboards:
    Okta Workflows: assets/dashboards/okta_workflows.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33274584
    source_type_name: Okta Workflows
  logs:
    source: okta-workflows
  monitors:
    High Number of Abandoned Outcome Events Detected: assets/monitors/high_number_of_abandoned_outcome_events_detected.json
    High Number of Denied Outcome Events Detected: assets/monitors/high_number_of_denied_outcome_events_detected.json
    High Number of Failure Outcome Events Detected: assets/monitors/high_number_of_failure_outcome_events_detected.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- automatización
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/okta_workflows/README.md
display_on_public_website: true
draft: false
git_integration_title: okta_workflows
integration_id: okta-workflows
integration_title: Okta Workflows
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: okta_workflows
public_title: Okta Workflows
short_description: Obtén información sobre los eventos de Okta Workflows.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Submitted Data Type::Logs
  - Offering::Integration
  - Category::Automation
  configuration: README.md#Setup
  description: Obtén información sobre los eventos de Okta Workflows.
  media:
  - caption: Okta Workflows
    image_url: images/okta_workflows_1.png
    media_type: imagen
  - caption: Okta Workflows
    image_url: images/okta_workflows_2.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Okta Workflows
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general
[Okta Workflows][1] es una plataforma de automatización sin código proporcionada por Okta, diseñada para simplificar y automatizar las tareas relacionadas con la identidad y procesos. Permite a las organizaciones crear flujos de trabajo personalizados que se integran perfectamente con las capacidades de gestión de identidad y acceso de Okta y las aplicaciones de terceros, mejorando la eficiencia operativa, la seguridad y la experiencia del usuario.

La integración de Okta Workflows recopila los logs de evento de flujos de trabajo de Okta y los envía a Datadog para su análisis exhaustivo.

## Configuración

### Generar credenciales de API en Okta Workflows
1. Ingresa a la [consola de administración de Okta][2] como **admin** (administrador) que tiene el rol [Read-only administrators][3] (Administradores de solo lectura).
2. Sigue los pasos de [esta guía][4] para generar un token de API.

### Obtener dominio de Okta Workflows
1. Inicia sesión en tu organización de Okta con tu cuenta de administrador.
2. Localiza el **Dominio** haciendo clic en tu nombre de usuario en la esquina superior derecha de la consola de administración. El dominio aparece en el menú desplegable. Tu dominio de Okta se parece a:
     - example.oktapreview.com
     - example.okta.com
     - example.okta-emea.com

### Conectar tu cuenta de Okta Workflows a Datadog
1. Añade tu token de API y tu dominio de Okta:

   | Parámetros           | Descripción                       |
   |--------------------- |-----------------------------------|
   | Token de API            | La clave de API de Okta Workflows    |
   | Dominio de Okta          | El dominio de Okta Workflows     |

2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

Los flujos de trabajo de la integración de Okta recopilan y reenvían los logs de evento de flujo de trabajo de Okta a Datadog.

### Métricas

La integración de Okta Workflows no recopila ninguna métrica.

### Eventos

La integración de Okta Workflows no incluye ningún evento.

## Ayuda

Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][3].

[1]: https://www.okta.com/products/workflows/
[2]: https://login.okta.com/
[3]: https://help.okta.com/en-us/content/topics/security/administrators-read-only-admin.htm
[4]: https://help.okta.com/en-us/content/topics/security/api.htm?cshid=ext-create-api-token#create-okta-api-token