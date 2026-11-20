---
app_id: redpanda
app_uuid: 4c7855c5-6c2c-46c5-bfc3-1a7df1ac6b77
assets:
  dashboards:
    Redpanda Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: redpanda.application.uptime
      metadata_path: metadata.csv
      prefix: redpanda.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10232
    source_type_name: Redpanda
  logs:
    source: redpanda
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Redpanda
  sales_email: support@redpanda.com
  support_email: support@redpanda.com
categories:
- recopilación de logs
- colas de mensajes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redpanda/README.md
display_on_public_website: true
draft: false
git_integration_title: redpanda
integration_id: redpanda
integration_title: Redpanda
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: redpanda
public_title: Redpanda
short_description: Monitoriza el estado y el rendimiento general de tus clústeres
  Redpanda.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Message Queues
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza el estado y el rendimiento general de tus clústeres Redpanda.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Redpanda
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->

## Información general

Redpanda es una plataforma de streaming compatible con la API de Kafka para cargas de trabajo de críticas.

Conecta Datadog con [Redpanda][1] para ver métricas clave y añadir grupos de métricas adicionales en función de las necesidades específicas de cada usuario.

## Configuración

### Instalación

1. [Descarga e inicia el Datadog Agent][2].
2. Instala manualmente la integración Redpanda. Para obtener más detalles en función de tu entorno, consulta [Uso de integraciones de la comunidad][3].

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host, ejecuta `datadog-agent integration install -t datadog-redpanda==<INTEGRATION_VERSION>`.

{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

En entornos contenedorizados, la mejor manera de utilizar esta integración con el Docker Agent es crear el Agent con la integración Redpanda instalada. 

Para crear una versión actualizada del Agent:

1. Utiliza el siguiente archivo Docker:

```dockerfile
FROM gcr.io/datadoghq/agent:latest

ARG INTEGRATION_VERSION=2.0.0

RUN agent integration install -r -t datadog-redpanda==${INTEGRATION_VERSION}
```

2. Crea la imagen y envíala a tu registro privado Docker.

3. Actualiza la imagen del contenedor del Datadog Agent. Si utilizas un Helm chart, modifica la sección `agents.image` del archivo `values.yaml` para sustituir la imagen por defecto del Agent:

```yaml
agents:
  enabled: true
  image:
    tag: <NEW_TAG>
    repository: <YOUR_PRIVATE_REPOSITORY>/<AGENT_NAME>
```

4. Utiliza el nuevo archivo `values.yaml` para actualizar el Agent:

```shell
helm upgrade -f values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Recopilación de métricas

Para empezar a recopilar los datos de rendimiento de Redpanda:

1. Edita el archivo `redpanda.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1]. Para conocer todas las opciones de configuración disponibles, consulta el [redpanda.d/conf.yaml de ejemplo][2]:

2. [Reinicia el Agent][3].

##### Recopilación de logs

Por defecto, la recopilación de logs se encuentra deshabilitada en el Datadog Agent. La recopilación de logs está disponible para la versión 6.0 o posterior del Agent.

1. Para habilitar logs, añade lo siguiente a tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Asegúrate de que el usuario `dd-agent` es miembro del grupo `systemd-journal`. Si no lo es, ejecuta el siguiente comando como raíz:
   ```
   usermod -a -G systemd-journal dd-agent
   ```

3. Añade lo siguiente a tu archivo `redpanda.d/conf.yaml` para empezar a recopilar tus logs de Redpanda:

   ```yaml
    logs:
    - type: journald
      source: redpanda
    ```

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-extras/blob/master/redpanda/datadog_checks/redpanda/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

##### Recopilación de métricas

En entornos contenedorizados, Autodiscovery se configura por defecto una vez que el check de Redpanda se integra en la imagen del Datadog Agent.

Las métricas se recopilan automáticamente en el servidor de Datadog. Para obtener más información, consulta las [plantillas de la integración Autodiscovery][1].

##### Recopilación de logs

Por defecto, la recopilación de logs se encuentra deshabilitada en el Datadog Agent. La recopilación de logs está disponible para la versión 6.0 o posterior del Agent.

Para habilitar logs, consulta [Recopilación de log de Kubernetes][2].

| Parámetro      | Valor                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "redpanda", "service": "redpanda_cluster"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings/agent/latest
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `redpanda` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "redpanda" >}}


### Eventos

La integración Redpanda no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "redpanda" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].


[1]: https://redpanda.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/help/