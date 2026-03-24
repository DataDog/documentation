---
aliases:
- /es/agent/docker/tag
description: Configurar la extracción automática de etiquetas a partir de las etiquetas
  de contenedores de Docker y variables de entorno
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: Introducción a las etiquetas
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Uso de etiquetas con Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitar la recolección de datos a un subconjunto de contenedores
title: Extracción de etiquetas de Docker
---
## Resumen

El Agente de Datadog puede crear y asignar etiquetas a todas las métricas, trazas y registros emitidos por un contenedor basado en sus etiquetas o variables de entorno.

Si está ejecutando el Agente como un binario en un servidor, configure la extracción de etiquetas con las instrucciones de la pestaña [Agente](?tab=agent). Si está ejecutando el Agente como un contenedor, configure su extracción de etiquetas con las instrucciones de la pestaña [Agente contenedorizado](?tab=containerizedagent).

### Etiquetado listo para usar

El Agente puede autodetectar y adjuntar etiquetas a todos los datos emitidos por los contenedores. La lista de etiquetas adjuntas depende de la [configuración de cardinalidad del Agente][1]. La [Cardinalidad de Etiquetas][5] puede impactar la facturación, ya que diferentes configuraciones de cardinalidad afectan el número de métricas emitidas.


| Etiqueta                 | Cardinalidad  | Requisito                                 |
|----------------------|--------------|---------------------------------------------|
| `container_name`     | Alta         | N/A<br/> **Nota**: no incluido para el tiempo de ejecución de containerd.                                         |
| `container_id`       | Alta         | N/A                                         |
| `rancher_container`  | Alta         | Rancher environment                         |
| `mesos_task`         | Orquestador | Entorno Mesos                           |
| `docker_image`       | Bajo          | N/A<br/> **Nota**: no incluido para el tiempo de ejecución de containerd.                                         |
| `image_name`         | Bajo          | N/A                                         |
| `short_image`        | Bajo          | N/A                                         |
| `image_tag`          | Bajo          | N/A                                         |
| `swarm_service`      | Bajo          | Entorno Swarm                           |
| `swarm_namespace`    | Bajo          | Entorno Swarm                           |
| `rancher_stack`      | Bajo          | Entorno Rancher                         |
| `rancher_service`    | Bajo          | Entorno Rancher                         |
| `env`                | Bajo          | [Unified service tagging][2] enabled        |
| `version`            | Bajo          | [Unified service tagging][2] enabled        |
| `service`            | Bajo          | [Unified service tagging][2] enabled        |
| `marathon_app`       | Bajo          | Entorno Marathon                        |
| `chronos_job`        | Bajo          | Entorno Mesos                           |
| `chronos_job_owner`  | Bajo          | Entorno Mesos                           |
| `nomad_task`         | Bajo          | Entorno Nomad                           |
| `nomad_job`          | Bajo          | Entorno Nomad                           |
| `nomad_group`        | Bajo          | Entorno Nomad                           |
| `git.commit.sha`     | Bajo          | [org.opencontainers.image.revision][3] utilizado |
| `git.repository_url` | Bajo          | [org.opencontainers.image.source][3] utilizado   |

### Unified service tagging

Como mejor práctica en entornos contenedorizados, Datadog recomienda utilizar unified service tagging al asignar etiquetas. Unified service tagging vincula la telemetría de Datadog a través del uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender a configurar su entorno con unified service tagging, consulte la documentación dedicada a unified service tagging [unified service tagging documentation][2].

## Extraer etiquetas como etiquetas

A partir de la versión 6.0+ del Agente, el Agente puede recopilar etiquetas para un contenedor dado y usarlas como etiquetas para adjuntar a todos los datos emitidos por este contenedor.

{{< tabs >}}
{{% tab "Agente contenedorizado" %}}

Para extraer una etiqueta de contenedor dada `<LABEL_NAME>` y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Agente de Datadog:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<LABEL_NAME>":"<TAG_KEY>"}'
```

Por ejemplo, podría configurar:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

**Nota**: `<LABEL_NAME>` no es sensible a mayúsculas y minúsculas. Por ejemplo, si tiene etiquetas llamadas `foo` y `FOO`, y configura `DD_CONTAINER_LABELS_AS_TAGS='{"foo": "bar"}'`, tanto `foo` como `FOO` se asignan a `bar`.

**Nota**: `DD_CONTAINER_LABELS_AS_TAGS` es equivalente al antiguo `DD_DOCKER_LABELS_AS_TAGS`, y `DD_CONTAINER_ENV_AS_TAGS` a `DD_DOCKER_ENV_AS_TAGS`.

{{% /tab %}}
{{% tab "Agente" %}}

Para extraer una etiqueta de contenedor dada `<LABEL_NAME>` y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue el siguiente bloque de configuración en el [archivo de configuración del Agente `datadog.yaml`][1]:

```yaml
container_labels_as_tags:
  <LABEL_NAME>: <TAG_KEY>
```

Por ejemplo, podría configurar:

```yaml
container_labels_as_tags:
  com.docker.compose.service: service_name
```


[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Extraer variables de entorno como etiquetas

Datadog recopila automáticamente etiquetas comunes de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad y Rancher][4]. Para extraer aún más etiquetas, utilice las siguientes opciones:

| Variable de Entorno               | Descripción                             |
|------------------------------------|-----------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extraer etiquetas de contenedor                |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extraer variables de entorno del contenedor |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extraer etiquetas de pod                      |
| `DD_CHECKS_TAG_CARDINALITY`        | Agregar etiquetas a las métricas de verificación               |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Agregar etiquetas a métricas personalizadas              |

A partir de la versión 7.20+ del Datadog Agent, un agente contenedorizado puede autodetectar etiquetas a partir de las etiquetas de un contenedor. Este proceso permite que el Agente asocie etiquetas personalizadas a todos los datos emitidos por un contenedor sin modificar el archivo `datadog.yaml` del Agente.

Las etiquetas deben ser agregadas utilizando el siguiente formato:

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY_1>:<TAG_VALUE_1>", "<TAG_KEY_2>:<TAG_VALUE_2>"]'
```

Con el Agente v6.0+, el Agente puede recopilar variables de entorno para un contenedor dado y usarlas como etiquetas para adjuntar a todos los datos emitidos por este contenedor.

{{< tabs >}}
{{% tab "Agente contenedorizado" %}}

Para extraer una variable de entorno de contenedor dada `<ENVVAR_NAME>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Agente de Datadog:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENVVAR_NAME>": "<TAG_KEY>"}'
```

Por ejemplo, podría configurar:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"ENVIRONMENT":"env"}'
```

{{% /tab %}}
{{% tab "Agente" %}}

Para extraer una variable de entorno de contenedor dada `<ENVVAR_NAME>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue el siguiente bloque de configuración en el [archivo de configuración del Agente `datadog.yaml`][1]:

```yaml
container_env_as_tags:
  <ENVVAR_NAME>: <TAG_KEY>
```

Por ejemplo, podría configurar:

```yaml
container_env_as_tags:
  ENVIRONMENT: env
```

[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/docker/tag/#extract-environment-variables-as-tags
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: https://github.com/opencontainers/image-spec/blob/02efb9a75ee11e05937b535cc5f228f9343ab2f5/annotations.md#pre-defined-annotation-keys
[4]: /es/agent/docker/?tab=standard#tagging
[5]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality