---
app_id: druid
app_uuid: 15b15f01-b342-4001-89ac-9e92fc4f3234
assets:
  dashboards:
    Druid Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: druid.service.health
      metadata_path: metadata.csv
      prefix: druid.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10074
    source_type_name: Druid
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/druid/README.md
display_on_public_website: true
draft: false
git_integration_title: druid
integration_id: druid
integration_title: Druid
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: druida
public_title: Druid
short_description: Realiza el seguimiento de métricas relacionadas con las consultas,
  la ingesta y la coordinación.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Realiza el seguimiento de métricas relacionadas con las consultas,
    la ingesta y la coordinación.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Druid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Dashboard de Druid][1]

## Información general

El Datadog Agent recopila métricas de Druid utilizando [DogStatsD][2]. DogStatsD recopila métricas sobre consultas, ingesta y datos de coordinación de Druid. Para obtener más información, consulta la [documentación de métricas de Druid][3].

Además de recopilar métricas, el Agent también envía un check de servicio relacionado con el estado de Druid.

## Configuración

### Requisito previo

Druid v0.16 o posterior es necesario para que esta integración funcione correctamente.

### Instalación

Los dos pasos siguientes son necesarios para que la integración Druid funcione correctamente. Antes de empezar, debes [instalar el Datadog Agent][4].

#### Paso 1: Configurar Druid para recopilar métricas de estado y checks de servicio

Configura el check de Druid, incluido en el paquete del [Datadog Agent][5], para recopilar métricas de estado y checks de servicio.

1. Edita el archivo `druid.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tus checks de servicio de Druid. Para conocer todas las opciones de configuración disponibles, consulta el [druid.d/conf.yaml de ejemplo][6].
2. [Reinicia el Agent][7].

#### Paso 2: Conectar Druid a DogStatsD (incluido en el Datadog Agent) utilizando la extensión `statsd-emitter` para recopilar métricas

Paso en el que se configura la extensión `statsd-emitter` para recopilar la mayor parte de las [métricas de Druid][3].

1. Instala la extensión [`statsd-emitter`][8] de Druid.

   ```shell
   $ java \
     -cp "lib/*" \
     -Ddruid.extensions.directory="./extensions" \
     -Ddruid.extensions.hadoopDependenciesDir="hadoop-dependencies" \
     org.apache.druid.cli.Main tools pull-deps \
     --no-default-hadoop \
     -c "org.apache.druid.extensions.contrib:statsd-emitter:0.15.0-incubating"
   ```

   Puedes encontrar más información sobre este paso en la [guía oficial para la carga de extensiones de Druid][9].

2. Actualiza las propiedades java de Druid añadiendo las siguientes configuraciones:

   ```conf
   # Add `statsd-emitter` to the extensions list to be loaded
   druid.extensions.loadList=[..., "statsd-emitter"]

   # By default druid emission period is 1 minute (PT1M).
   # We recommend using 15 seconds instead:
   druid.monitoring.emissionPeriod=PT15S

   # Use `statsd-emitter` extension as metric emitter
   druid.emitter=statsd

   # Configure `statsd-emitter` endpoint
   druid.emitter.statsd.hostname=127.0.0.1
   druid.emitter.statsd.port:8125

   # Configure `statsd-emitter` to use dogstatsd format. Must be set to true, otherwise tags are not reported correctly to Datadog.
   druid.emitter.statsd.dogstatsd=true
   druid.emitter.statsd.dogstatsdServiceAsTag=true
   ```

3. Reinicia Druid para empezar a enviar tus métricas de Druid al Agent a través de DogStatsD.

#### Checks de servicio de integraciones

Utiliza la configuración predeterminada de tu archivo `druid.d/conf.yaml` para activar la recopilación de tus checks de servicio de Druid. Consulta el [druid.d/conf.yaml de ejemplo][6] para conocer todas las opciones de configuración disponibles.

#### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs está desactivada por defecto en el Datadog Agent, actívala en tu archivo datadog.yaml:

   ```yaml
   logs_enabled: true
   ```

2. Deselecciona y edita este bloque de configuración en la parte inferior de tu `druid.d/conf.yaml`:

   ```yaml
   logs:
     - type: file
       path: '<PATH_TO_DRUID_DIR>/var/sv/*.log'
       source: druid
       service: '<SERVICE_NAME>'
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-\d{2}\-\d{2}
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

3. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando de estado del Agent][10] y busca `druid` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "druid" >}}


### Eventos

El check de Druid no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "druid" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][13].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/druid/images/druid_dashboard_overview.png
[2]: https://docs.datadoghq.com/es/developers/dogstatsd/
[3]: https://druid.apache.org/docs/latest/operations/metrics.html
[4]: https://docs.datadoghq.com/es/agent/
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: https://github.com/DataDog/integrations-core/blob/master/druid/datadog_checks/druid/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://druid.apache.org/docs/latest/development/extensions-contrib/statsd.html
[9]: https://druid.apache.org/docs/latest/operations/including-extensions.html
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/druid/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/druid/assets/service_checks.json
[13]: https://docs.datadoghq.com/es/help/