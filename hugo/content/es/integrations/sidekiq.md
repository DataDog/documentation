---
app_id: sidekiq
app_uuid: c42a2d39-16db-4256-a6fb-287602ec4661
assets:
  dashboards:
    Sidekiq Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sidekiq.jobs.count
      metadata_path: metadata.csv
      prefix: sidekiq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10093
    source_type_name: Sidekiq
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sidekiq/README.md
display_on_public_website: true
draft: false
git_integration_title: sidekiq
integration_id: sidekiq
integration_title: Sidekiq
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: sidekiq
public_title: Sidekiq
short_description: Rastrea métricas sobre tus trabajos, colas y lotes de Sidekiq.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea métricas sobre tus trabajos, colas y lotes de Sidekiq.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sidekiq
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Esta integración monitoriza [Sidekiq][1] a través de [DogStatsD][2]. Recopila métricas a través de el [cliente DogStatsD Ruby de Datadog][3].

**Nota** Solo los usuarios de Sidekiq Pro (>= 3.6) o Enterprise (>= 1.1.0) pueden recopilar métricas.

## Configuración

### Instalación

La integración de Sidekiq viene en el paquete del [Datadog Agent][4].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Instala el [gem][3] `dogstatsd-ruby`:

   ```
    gem install dogstatsd-ruby
   ```

2. Habilita la recopilación de métricas de Sidekiq Pro incluyendo esto en tu inicializador; para un despliegue en contenedores, actualiza `localhost` a tu dirección del contenedor del Agent:

   ```ruby
        require 'datadog/statsd' # gem 'dogstatsd-ruby'

        Sidekiq::Pro.dogstatsd = ->{ Datadog::Statsd.new('localhost', 8125, namespace:'sidekiq') }

        Sidekiq.configure_server do |config|
          config.server_middleware do |chain|
            require 'sidekiq/middleware/server/statsd'
            chain.add Sidekiq::Middleware::Server::Statsd
          end
        end
   ```

    Si utilizas Sidekiq Enterprise y deseas recopilar métricas históricas, incluye también esta línea:

   ```ruby
          Sidekiq.configure_server do |config|
            # history is captured every 30 seconds by default
            config.retain_history(30)
          end
   ```

    Consulta la documentación de Sidekiq [Pro][5] y [Enterprise][6] para obtener más información y la documentación de [DogStatsD Ruby][3] para obtener más opciones de configuración.

3. Actualiza el [archivo de configuración principal del Datadog Agent][7] `datadog.yaml` añadiendo las siguientes configuraciones:

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: sidekiq
       prefix: "sidekiq."
       mappings:
         - match: 'sidekiq\.sidekiq\.(.*)'
           match_type: "regex"
           name: "sidekiq.$1"
         - match: 'sidekiq\.jobs\.(.*)\.perform'
           name: "sidekiq.jobs.perform"
           match_type: "regex"
           tags:
             worker: "$1"
         - match: 'sidekiq\.jobs\.(.*)\.(count|success|failure)'
           name: "sidekiq.jobs.worker.$2"
           match_type: "regex"
           tags:
             worker: "$1"
    ```

    Estos parámetros también pueden establecerse añadiendo la variable de entorno `DD_DOGSTATSD_MAPPER_PROFILES` al Datadog Agent.

4. [Reinicia el Agent][8].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "sidekiq" >}}


La integración de Sidekiq también permite métricas personalizadas, consulta [Métricas históricas de Sidekiq Enterprise][10].

### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Habilítalo en el archivo `datadog.yaml` con:

    ```yaml
      logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `sidekiq.d/conf.yaml` para empezar a recopilar tus logs de Sidekiq:

    ```yaml
      logs:
        - type: file
          path:  /var/log/sidekiq.log
          source: sidekiq
          service: <SERVICE>
    ```

     Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Si no encuentras tus logs, consulta [registro de Sidekiq][11].

3. [Reinicia el Agent][8].

### Checks de servicio

Sidekiq no incluye ningún check de servicio.

### Eventos

Sidekiq no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][12].

[1]: https://sidekiq.org/
[2]: https://docs.datadoghq.com/es/developers/dogstatsd/
[3]: https://github.com/DataDog/dogstatsd-ruby
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/mperham/sidekiq/wiki/Pro-Metrics
[6]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics
[7]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://github.com/DataDog/integrations-core/blob/master/sidekiq/metadata.csv
[10]: https://github.com/mperham/sidekiq/wiki/Ent-Historical-Metrics#custom
[11]: https://github.com/mperham/sidekiq/wiki/Logging#log-file
[12]: https://docs.datadoghq.com/es/help/