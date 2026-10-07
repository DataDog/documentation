---
app_id: traefik
app_uuid: 3e412d36-f638-4cb0-9068-294aac7a84e2
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: traefik.total_status_code_count
      metadata_path: metadata.csv
      prefix: traefik.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10047
    source_type_name: Traefik
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/traefik/README.md
display_on_public_website: true
draft: true
git_integration_title: traefik
integration_id: traefik
integration_title: Traefik
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: traefik
public_title: Traefik
short_description: recopila métricas de traefik
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: recopila métricas de traefik
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Traefik
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Envía métricas, logs y trazas (traces) de [Traefik][1] a Datadog para monitorizar tus servicios de Traefik.

## Configuración

El check de Traefik no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para Agent v7.21+/v6.21+, sigue las instrucciones a continuación para instalar el check de Traefik en tu host. Consulta [Uso de integraciones de la comunidad][3] para instalar con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-traefik==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

{{< tabs >}}
{{% tab "v2" %}}

#### Acerca de v2
Para obtener información sobre los cambios de la v1 a la v2, consulta la [Guía de migración de Traefik][1]. Para obtener información sobre la última versión, consulta la [documentación de Traefik][2].

#### Recopilación de métricas

Sigue la [documentación de Traefik][3] para enviar [métricas de Traefik][4] a Datadog.

#### APM

**Disponible para el Agent >6.0**

Por defecto, [los logs de Traefik][5] se envían a stdout. Esto no debe cambiarse para la versión en contenedores, porque el Datadog Agent puede recopilar logs directamente desde el contenedor `stdout`/`stderr`.

1. Para configurar [Traefik para loguear en un archivo][5], añade lo siguiente en el archivo de configuración de Traefik:

   ```conf
   [traefikLog]
     filePath = "/path/to/traefik.log"
     format   = "json"
    ```

    El [formato común de Apache Access][6] se utiliza por defecto y es compatible con esta integración.

2. La recopilación de logs está desactivada por defecto en el Datadog Agent . Habilítala en tu archivo `datadog.yaml` con:

   ```yaml
   logs_enabled: true
   ```

3. Añade este bloque de configuración a tu archivo `traefik.d/conf.yaml` en la raíz de tu [directorio de configuración del Agent][7] para empezar a recopilar tus logs de Traefik:

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

      Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

4. [Reiniciar el Agent][8]

#### Recopilación de trazas

1. [Activa APM][9] para Datadog, si es necesario.
2. Sigue la [documentación de Traefik][10] para enviar [trazas (traces)][11] a Datadog.

[1]: https://doc.traefik.io/traefik/v2.0/migration/v1-to-v2/
[2]: https://doc.traefik.io/traefik/
[3]: https://doc.traefik.io/traefik/observability/metrics/datadog/
[4]: https://doc.traefik.io/traefik/observability/metrics/overview/
[5]: https://doc.traefik.io/traefik/observability/logs/#filepath
[6]: https://doc.traefik.io/traefik/observability/logs/#format
[7]: https://docs.datadoghq.com/es/agent/faq/agent-configuration-files/#agent-configuration-directory
[8]: https://docs.datadoghq.com/es/agent/faq/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/es/getting_started/tracing/#enable-apm
[10]: https://doc.traefik.io/traefik/observability/tracing/datadog/
[11]: https://doc.traefik.io/traefik/observability/tracing/overview/
{{% /tab %}}
{{% tab "v1" %}}

#### Acerca de v1

Consulta la [documentación de Traefik][1] para obtener información sobre v1. Para obtener información sobre los cambios de v1 a v2, consulta la [guía de migración de Traefik][2].

#### Recopilación de métricas

1. Para recopilar [métricas][2] de Traefik, abre el archivo `traefik.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][3].

2. Añade esta configuración a tu archivo `traefik.d/conf.yaml` para empezar a recopilar tus [métricas][2]:

    ```yaml
    init_config:

    instances:
      - host: 10.1.2.3
        port: "8080"
        path: "/health"
        scheme: "http"
    ```

    Opciones de configuración:

    - host: endpoint de Traefik para consultar. **Obligatorio**
    - puerto: oyente de API del endpoint de Traefik. Valor por defecto `8080`. _Opcional_
    - ruta: ruta del endpoint del check de estado de Traefik. Por defecto `/health`. _Opcional_
    - esquema: esquema del endpoint del check de estado de Traefik. Por defecto `http`. _Opcional_

3. [Reinicia el Agent][4] para empezar a enviar métricas de Traefik a Datadog.

Consulta el [traefik.d/conf.yaml de ejemplo][5] para conocer todas las opciones disponibles de configuración.

#### APM

**Disponible para el Agent >6.0**

Por defecto, [los logs de Traefik][6] se envían a stdout. Esto no debe cambiarse para la versión en contenedores, porque el Datadog Agent puede recopilar logs directamente desde el contenedor `stdout`/`stderr`.

1. Para configurar [Traefik para loguear en un archivo][6], añade lo siguiente en el archivo de configuración de Traefik:

    ```conf
    [traefikLog]
      filePath = "/path/to/traefik.log"
      format   = "json"
    ```

    El [formato común de Apache Access][7] se utiliza por defecto y es compatible con esta integración.

2. La recopilación de logs está desactivada por defecto en el Datadog Agent . Habilítala en tu archivo `datadog.yaml` con:

   ```yaml
   logs_enabled: true
   ```

3. Añade este bloque de configuración a tu archivo `traefik.d/conf.yaml` en la raíz de tu [directorio de configuración del Agent][3] para empezar a recopilar tus logs de Traefik:

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

      Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno.

4. [Reiniciar el Agent][4]

#### Recopilación de trazas

**Disponible para Traefik v1.7+**

1. [Activa APM][9] para Datadog, si es necesario.
2. Sigue la [documentación de Traefik][9] para enviar trazas a Datadog.

[1]: https://doc.traefik.io/traefik/v1.7/
[2]: https://github.com/DataDog/integrations-extras/blob/master/traefik/metadata.csv
[3]: https://docs.datadoghq.com/es/agent/faq/agent-configuration-files/#agent-configuration-directory
[4]: https://docs.datadoghq.com/es/agent/faq/agent-commands/#start-stop-restart-the-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/traefik/datadog_checks/traefik/data/conf.yaml.example
[6]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#traefik-logs
[7]: https://doc.traefik.io/traefik/v1.7/configuration/logs/#clf-common-log-format
[8]: https://docs.datadoghq.com/es/getting_started/tracing/#enable-apm
[9]: https://doc.traefik.io/traefik/v1.7/configuration/tracing/#datadog
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent][5] y busca `traefik` en la sección Checks.

## Compatibilidad

El check es compatible con las principales plataformas.

**Métricas**

Para v2, consulta la lista de [métricas de Traefik][6] enviadas a Datadog.

Para la v1, consulta la lista de [métricas][7] proporcionadas por la integración.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "traefik" >}}


### Eventos

El check de Traefik no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "traefik" >}}


## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].


[1]: https://traefik.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[6]: https://doc.traefik.io/traefik/observability/metrics/overview/
[7]: https://docs.datadoghq.com/es/integrations/traefik/#metrics
[8]: https://docs.datadoghq.com/es/help
