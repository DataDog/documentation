---
app_id: mergify-oauth
app_uuid: 3b53fe32-b47e-4a29-881f-b90397a11589
assets:
  dashboards:
    Mergify Merge Queue Overview: assets/dashboards/mergify_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - mergify.merge_queue_length
      - mergify.time_to_merge.median
      - mergify.time_to_merge.mean
      - mergify.queue_checks_outcome
      - mergify.queue_freeze.duration
      metadata_path: metadata.csv
      prefix: mergify.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10350
    source_type_name: Mergify OAuth
  oauth: assets/oauth_clients.json
author:
  homepage: https://mergify.com
  name: Mergify
  sales_email: hello@mergify.com
  support_email: support@mergify.com
categories:
- herramientas de desarrollo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mergify_oauth/README.md
display_on_public_website: true
draft: false
git_integration_title: mergify_oauth
integration_id: mergify-oauth
integration_title: Mergify
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mergify_oauth
public_title: Mergify
short_description: Monitorizar tus estadísticas de la cola de fusión de Mergify
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Categoría::Herramientas de desarrollo
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar tus estadísticas de la cola de fusión de Mergify
  media:
  - caption: 'Mergify: dashboard'
    image_url: images/dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Mergify
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Esta integración monitoriza el largo de la cola de fusión para cada repositorio en [Mergify][1] y rastrea la disponibilidad global de Mergify. Al enviar métricas a tu cuenta de Datadog, puedes configurar monitores para alertas de anomalías y analizar el rendimiento de la cola de fusión. Puedes estar atento a la disponibilidad del servicio de Mergify y optimizar el flujo de trabajo de desarrollo mediante esta integración de Datadog.

## Configuración

- **En Datadog**: ve a **Integrations** (Integraciones), selecciona el cuadro de Mergify y haz clic en **Install Integration** (Instalar integración).
- Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar la autorización de esta integración. Serás redirigido al [dashboard de Mergify][2].
- **En el dashboard de Mergify**: inicia sesión, selecciona la organización para la que deseas configurar la **Integración de Datadog** y haz clic en ****Connect the integration** (Conectar la integración).

Tus estadísticas de Mergify aparecen ahora en Datadog.

## Desinstalación

1. Ve al [dashboard de Fusionar][2], inicia sesión y navega a **Integrations** (Integraciones).
2. Haz clic en el botón **Disconnect** (Desconectar)** en el cuadro de **Datadog**.

Una vez desinstalada esta integración, se revocan todas las autorizaciones anteriores.

Nota: Asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de integración en la [página Claves de API][3] de Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mergify_oauth" >}}


Para la métrica `mergify.queue_checks_outcome`, las etiquetas `outcome_type` disponibles son:

- `PR_DEQUEUED`: número de PRs que se han eliminado manualmente de la cola.
- `PR_AHEAD_DEQUEUED`: el número de PRs que han sido eliminadas de la cola porque una PR anterior fue eliminada de la cola.
- `PR_AHEAD_FAILED_TO_MERGE`: el número de PRs que se han eliminado de la cola porque una PR anterior no se ha fusionado.
- `PR_WITH_HIGHER_PRIORITY_QUEUED`: número de PRs que se han retirado de la cola porque se ha puesto en cola una PR de mayor prioridad.
- `PR_QUEUED_TWICE`: número de PRs que se han retirado de la cola porque se han puesto en cola dos veces.
- `SPECULATIVE_CHECK_NUMBER_REDUCED`: número de PRs que se han eliminado de la cola porque se ha modificado el número de checks especulativos en la configuración.
- `CHECKS_TIMEOUT`: número de PRs que se han eliminado de la cola porque se ha agotado el tiempo de espera de checks especulativos.
- `CHECKS_FAILED`: el número de PRs que se han eliminado de la cola porque han fallado los checks especulativos
- `QUEUE_RULE_MISSING`: el número de PRs que se han eliminado de la cola porque la regla de cola que se utilizó para poner en cola la PR se ha eliminado de la configuración.
- `UNEXPECTED_QUEUE_CHANGE`: el número de PR que se han eliminado de la cola porque un usuario ha realizado una operación en la solicitud pull en cola.
- `PR_FROZEN_NO_CASCADING`: número de PRs que se han retirado de la cola porque se han congelado por una congelación sin efecto en cascada.
- `TARGET_BRANCH_CHANGED`: el número de PRs que se han eliminado de la cola porque se ha cambiado la rama de destino de la PR.
- `TARGET_BRANCH_MISSING`: el número de PRs que han sido eliminadas de la cola porque la rama de destino de la PR ya no existe.
- `PR_UNEXPECTEDLY_FAILED_TO_MERGE`: número de PRs que se han eliminado de la cola porque no se han fusionado de forma inesperada.
- `BATCH_MAX_FAILURE_RESOLUTION_ATTEMPTS`: número de PRs que se han eliminado de la cola porque se ha alcanzado el número máximo de intentos de resolución de fallos por lotes.

### Checks de servicio

Mergify no incluye ningún check de servicio.

### Eventos

Mergify no incluye ningún evento.

## Asistencia

¿Necesitas ayuda? Ponte en contacto con el [soporte de Mergify][1].

[1]: https://mergify.com
[2]: https://dashboard.mergify.com
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Mergify
[4]: https://github.com/DataDog/integrations-extras/blob/master/mergify/metadata.csv