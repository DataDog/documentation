---
app_id: sonatype-nexus
app_uuid: 6cec5ac3-a686-4408-936d-26f19fa6763a
assets:
  dashboards:
    Sonatype Nexus Instance Health: assets/dashboards/sonatype_nexus_instance_health.json
    Sonatype Nexus Metrics: assets/dashboards/sonatype_nexus_metrics.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check:
      - sonatype_nexus.analytics.available_cpus
      - sonatype_nexus.status.available_cpus_health
      metadata_path: metadata.csv
      prefix: sonatype_nexus.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 34928997
    source_type_name: sonatype_nexus
  monitors:
    High Number of Failed Unique User Authentication Detected: assets/monitors/high_number_of_failed_unique_user_authentication_detected.json
    High Percentage of JVM Heap Memory Usage Detected: assets/monitors/high_percentage_of_jvm_heap_memory_usage_detected.json
    Unhealthy Available CPUs Detected: assets/monitors/unhealthy_available_cpus_detected.json
    Unhealthy Blob Stores Detected: assets/monitors/unhealthy_blob_stores_detected.json
    Unhealthy Thread Deadlock Detected: assets/monitors/unhealthy_thread_deadlock_detected.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sonatype_nexus/README.md
display_on_public_website: true
draft: false
git_integration_title: sonatype_nexus
integration_id: sonatype-nexus
integration_title: Sonatype Nexus
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: sonatype_nexus
public_title: Sonatype Nexus
short_description: Obtén información sobre análisis y datos de salud de las instancias
  Sonatype Nexus.
supported_os:
- linux
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Obtén información sobre análisis y datos de salud de las instancias
    Sonatype Nexus.
  media:
  - caption: Salud de las instancias Sonatype Nexus
    image_url: images/sonatype_nexus_instance_health.png
    media_type: imagen
  - caption: Métricas de Sonatype Nexus
    image_url: images/sonatype_nexus_metrics_1.png
    media_type: imagen
  - caption: Métricas de Sonatype Nexus
    image_url: images/sonatype_nexus_metrics_2.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Sonatype Nexus
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Información general

Sonatype Nexus es una popular solución de gestión de repositorios diseñada para gestionar componentes y dependencias de software a lo largo de todo el ciclo de vida de desarrollo del software. Es compatible con una amplia gama de lenguajes y formatos de desarrollo, lo que lo convierte en un punto central para DevOps y pipelines de integración/entrega continua (CI/CD).

La integración Sonatype Nexus recopila métricas de análisis y del estado de salud de las instancias Sonatype Nexus, y las envía a Datadog para su análisis exhaustivo.

## Configuración

### Instalación

El check de Sonatype Nexus está incluido en el paquete del [Datadog Agent ][1]. No es necesaria ninguna instalación adicional.

### Obtener credenciales de API de Sonatype Nexus

1. `Username` y `Password` de la cuenta de **Administrador** o de un usuario con el privilegio **nx-metrics-all**.

2. `Server URL` de la instancia del repositorio (por ejemplo, https://123.123.123.123:8081)

### Conectar tu cuenta de Sonatype Nexus al Agent

1. Copia el archivo `conf.yaml.example`.

   ```sh
   cp /etc/datadog-agent/conf.d/sonatype_nexus.d/conf.yaml.example /etc/datadog-agent/conf.d/sonatype_nexus.d/conf.yaml
   ```

2. Edita el archivo `/etc/datadog-agent/conf.d/sonatype_nexus.d/conf.yaml`. Añade las siguientes configuraciones.

    ```yaml
    instances:

        ## @param username - string - required
        ## Username of Sonatype Nexus instance
        #
      - username: <SONATYPE_NEXUS_USERNAME>

        ## @param password - string - required
        ## Password of Sonatype Nexus instance
        #
        password: <SONATYPE_NEXUS_PASSWORD>

        ## @param server_url - string - required
        ## Sonatype Nexus server url
        #
        server_url: <SONATYPE_NEXUS_SERVER_URL>

        ## @param min_collection_interval - number - required
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        #
        min_collection_interval: 600
    ```
* Ejemplo de `conf.yaml` cuando se configuran múltiples instancias Sonatype Nexus:

    ```yaml
    instances:
      - min_collection_interval: 1800
        username: <SONATYPE_NEXUS_USERNAME>
        password: <SONATYPE_NEXUS_PASSWORD>
        server_url: <SONATYPE_NEXUS_SERVER_URL>
      - min_collection_interval: 1800
        username: <SONATYPE_NEXUS_USERNAME>
        password: <SONATYPE_NEXUS_PASSWORD>
        server_url: <SONATYPE_NEXUS_SERVER_URL>
    ```

3. [Reinicia el Agent][2].

### Validación

- [Ejecuta el subcomando de estado del Agent][3] y busca `sonatype_nexus` en la sección Checks.

## Datos recopilados

### Logs
La integración Sonatype Nexus no incluye logs.

### Métricas

La integración Sonatype Nexus recopila y envía análisis y métricas del estado de salud de las instancias a Datadog.

{{< get-metrics-from-git "sonatype_nexus" >}}

### Eventos

La integración Sonatype Nexus reenvía el evento de `sonatype_nexus.authentication_validation` a Datadog.

### Checks de servicio

Para ver una lista de los checks de servicio proporcionados por esta integración, consulta [service_checks.json][4].

## Ayuda

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/sonatype_nexus/assets/service_checks.json
[5]: https://docs.datadoghq.com/es/help/