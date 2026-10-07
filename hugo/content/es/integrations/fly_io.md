---
app_id: fly-io
app_uuid: 43885e54-474b-43a8-bb02-ecfc2037b674
assets:
  dashboards:
    'Fly.io Overview ': assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - fly_io.instance.up
      - fly_io.machine.cpus.count
      metadata_path: metadata.csv
      prefix: fly_io.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18060085
    source_type_name: Fly.io
  monitors:
    Fly.io App Suspended: assets/monitors/app_suspended.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- sistema operativo y sistema
- nube
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/fly_io/README.md
display_on_public_website: true
draft: false
git_integration_title: fly_io
integration_id: fly-io
integration_title: Fly.io
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: fly_io
public_title: Fly.io
short_description: Monitoriza tus aplicaciones y máquinas Fly.io.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Sistema operativo y sistema
  - Categoría::Nube
  - Categoría::Recopilación de logs
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Trazas
  - Tipo de datos enviados::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza tus aplicaciones y máquinas Fly.io.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Fly.io
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


<div class="alert alert-danger">
Esta integración está en beta pública. Ten cuidado si la activas en cargas de trabajo de producción.
</div>

## Información general

Este check monitoriza [Fly.io][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en una aplicación Fly.

### Instalación

El check Fly.io está incluido en el paquete del [Datadog Agent][2]. Recomendamos desplegar una aplicación Fly.io exclusiva para ejecutar el Datadog Agent. Este Agent puede ejecutar el check Fly.io que recopila [métricas de Prometheus][3], así como algunos datos adicionales de la [API de máquinas][4]. Además, puedes configurar el Agent para recibir [trazas (traces)(#Application-Traces) y métricas personalizadas de todas tus aplicaciones Fly.io dentro de la organización.

#### Desplegar el Agent como una aplicación Fly.io

1. Crea una nueva aplicación en Fly.io con la imagen definida como el [Datadog Agent][5] al iniciar o proporciona la imagen en el archivo `fly.toml`:

    ```
    [build]
        image = 'gcr.io/datadoghq/agent:7'
    ```

2. Configura un [secreto][6] para tu clave de API Datadog llamada `DD_API_KEY` y opcionalmente tu [sitio][7] como `DD_SITE`.

3. En el directorio de tu aplicación, crea un archivo `conf.yaml` para la integración Fly.io, [configura](#Configuration) la integración y móntala en el directorio `conf.d/fly_io.d/` del Agent como `conf.yaml`:

    ```
    instances:
    - empty_default_hostname: true
      headers:
          Authorization: Bearer <YOUR_FLY_TOKEN>
      machines_api_endpoint: http://_api.internal:4280
      org_slug: <YOUR_ORG_SLUG>
    ```

4. [Despliega][8] tu aplicación.

**Nota**: Para recopilar trazas y métricas personalizadas de tus aplicaciones, consulta [Trazas de aplicación](#Application-traces).

### Configuración

1. Edita el archivo `fly_io.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar tus datos de rendimiento de Fly.io. Para conocer todas las opciones de configuración disponibles, consulta el [fly_io.d/conf.yaml de ejemplo][9].

2. [Reinicia el Agent][10].

### Validación

[Ejecuta el subcomando de estado del Agent][11] y busca `fly_io` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "fly-io" >}}


### Eventos

La integración Fly.io no incluye eventos.

### Checks de servicio

La integración Fly.io no incluye checks de servicios.

### Trazas de aplicación

Sigue estos pasos para recopilar trazas de una aplicación en tu entorno Fly.io.

1. [Instrumenta][13] tu aplicación.
2. [Despliega](#deploying-the-agent-as-a-flyio-application) el Datadog Agent como una aplicación Fly.io.
3. Configura las variables de entorno necesarias en el `fly.toml` o el `Dockerfile` de tu aplicación y despliega la aplicación.

    Configura lo siguiente como variable de entorno para enviar métricas a la aplicación del Datadog Agent:
    ```
    [env]
        DD_AGENT_HOST="<YOUR_AGENT_APP_NAME>.internal"

    ```

    Configura la siguiente variable de entorno para asegurarte de que informas logs y métricas del mismo host:
    ```
    DD_TRACE_REPORT_HOSTNAME="true"
    ```

    Para utilizar el [etiquetado unificado de servicios][14], configura estas variables de entorno:
    ```
    DD_SERVICE="APP_NAME"
    DD_ENV="ENV_NAME"
    DD_VERSION="VERSION"
    ```

    Para correlacionar logs y trazas, sigue estos [pasos][15] y configura esta variable de entorno:
    ```
    DD_LOGS_INJECTION="true"
    ```

4. Configura las siguientes variables de entorno en tu `fly.toml` de la [aplicación del Datadog Agent](#Deploying-the-agent-as-a-Fly.io-application) y despliega la aplicación:

    ```
    [env]
        DD_APM_ENABLED = "true"
        DD_APM_NON_LOCAL_TRAFFIC = "true"
        DD_DOGSTATSD_NON_LOCAL_TRAFFIC = "true"
        DD_BIND_HOST = "fly-global-services"
    ```

**Nota**: Asegúrate de que la configuración de tus instancias Fly.io no expone públicamente los puertos para APM y DogStatsD, si están habilitados.

### Recopilación de logs

Utiliza el [shipper de logs fly][16] para recopilar logs de tus aplicaciones Fly.io.

1. Clona el [proyecto][16] del shipper de logs.

2. Modifica el archivo `vector-configs/vector.toml` para configurar la fuente de logs como `fly_io`:

    ```
    [transforms.log_json]
    type = "remap"
    inputs = ["nats"]
    source  = '''
    . = parse_json!(.message)
    .ddsource = 'fly-io'
    .host = .fly.app.instance
    .env = <YOUR_ENV_NAME>
    '''
    ```

Esta configuración analiza atributos de los logs específicos de fly. Para analizar completamente los atributos de todos los logs, define `ddsource` como una [integración de logs conocida][17] por cada aplicación utilizando [transformaciones vectoriales][18].

3. Configura [secretos][6] para [NATS][19]:
`ORG` y `ACCESS_TOKEN`

4. Configura [secretos][6] para [Datadog][20]: `DATADOG_API_KEY` y `DATADOG_SITE`.

5. [Despliega][11] la aplicación del shipper de logs.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][21].


[1]: https://fly.io/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://fly.io/docs/metrics-and-logs/metrics/#prometheus-on-fly-io
[4]: https://fly.io/docs/machines/api/
[5]: https://console.cloud.google.com/artifacts/docker/datadoghq/us/gcr.io/agent
[6]: https://fly.io/docs/flyctl/secrets/
[7]: https://docs.datadoghq.com/es/agent/troubleshooting/site/
[8]: https://fly.io/docs/flyctl/deploy/
[9]: https://github.com/DataDog/integrations-core/blob/master/fly_io/datadog_checks/fly_io/data/conf.yaml.example
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/fly_io/metadata.csv
[13]: https://docs.datadoghq.com/es/tracing/trace_collection/#instrumentation-types
[14]: https://docs.datadoghq.com/es/getting_started/tagging/unified_service_tagging/?tab=docker#configuration-1
[15]: https://docs.datadoghq.com/es/tracing/other_telemetry/connect_logs_and_traces/
[16]: https://github.com/superfly/fly-log-shipper
[17]: https://docs.datadoghq.com/es/logs/log_configuration/pipelines/?tab=source#integration-pipeline-library
[18]: https://vector.dev/docs/reference/configuration/transforms/lua/
[19]: https://github.com/superfly/fly-log-shipper?tab=readme-ov-file#nats-source-configuration
[20]: https://github.com/superfly/fly-log-shipper?tab=readme-ov-file#datadog
[21]: https://docs.datadoghq.com/es/help/
