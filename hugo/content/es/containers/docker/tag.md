---
aliases:
- /es/agent/docker/tag
further_reading:
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas (tags)
- link: /getting_started/tagging/using_tags/
  tag: Documentación
  text: Cómo usar tags con Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
title: Extracción de etiquetas (tags) del Docker
---

## Información general

El Datadog Agent puede crear y asignar etiquetas a todas las métricas, trazas y logs emitidos por un contenedor en base a sus etiquetas o variables de entorno.

Si estás ejecutando el Agent como un binario en un host, configura tus extracciones de etiquetas con las instrucciones de la pestaña [Agent](?tab=agent). Si estás ejecutando el Agent como un contenedor, configura tu extracción de etiquetas con las instrucciones de la pestaña [Agent contenedorizado](?tab=containerizedagent).

### Etiquetado predefinido

El Agent puede usar Autodiscovery y asociar etiquetas a todos los datos emitidos por contenedores. La lista de etiquetas asociadas depende de la [configuración de cardinalidad] del Agent[1].

| Etiqueta (tag)                 | Cardinalidad  | Requisito                                 |
|----------------------|--------------|---------------------------------------------|
| `container_name`     | Alta         | N/D<br/> **Nota**: No incluido en el tiempo de ejecución del contenedor.                                         |
| `container_id`       | Alta         | N/D                                         |
| `rancher_container`  | Alta         | Entorno de Rancher                         |
| `mesos_task`         | Orquestador | Entorno de Mesos                           |
| `docker_image`       | Baja          | N/D<br/> **Nota**: no incluido en el tiempo de ejecución del contenedor.                                         |
| `image_name`         | Baja          | N/D                                         |
| `short_image`        | Baja          | N/D                                         |
| `image_tag`          | Baja          | N/D                                         |
| `swarm_service`      | Baja          | Entorno de Swarm                           |
| `swarm_namespace`    | Baja          | Entorno de Swarm                           |
| `rancher_stack`      | Baja          | Entorno de Rancher                         |
| `rancher_service`    | Baja          | Entorno de Rancher                         |
| `env`                | Baja          | [Etiquetado de servicios unificado][2] activado        |
| `version`            | Baja          | [Etiquetado de servicios unificado][2] activado        |
| `service`            | Baja          | [Etiquetado de servicios unificado][2] activado        |
| `marathon_app`       | Baja          | Entorno de Marathon                        |
| `chronos_job`        | Baja          | Entorno de Mesos                           |
| `chronos_job_owner`  | Baja          | Entorno de Mesos                           |
| `nomad_task`         | Baja          | Entorno de Nomad                           |
| `nomad_job`          | Baja          | Entorno de Nomad                           |
| `nomad_group`        | Baja          | Entorno de Nomad                           |
| `git.commit.sha`     | Baja          | [org.opencontainers.image.revision][3] utilizado |
| `git.repository_url` | Baja          | [org.opencontainers.image.source][3] utilizado   |

### Etiquetado de servicios unificados

La práctica recomendada por Datadog en entornos contenedorizados es usar el etiquetado de servicios unificado para asignar etiquetas. El etiquetado de servicios unificado asocia toda la telemetría de Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender cómo configurar tu entorno usando el etiquetado unificado, consulta la [documentación de etiquetado de servicios unificado] específica[2].

## Extrae labels como etiquetas

A partir de la versión de Agent v6.0+, el Agent puede recopilar labels para un contenedor cualquiera y usarlas como etiquetas para asociarlas a todos los datos emitidos por este contenedor.

{{< tabs >}}
{{% tab "Containerized Agent" %}}

Para extraer una label de contenedor `<LABEL_NAME>` dada y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la variable de entorno a continuación al Datadog Agent:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<LABEL_NAME>": "<TAG_KEY>"}'
```

Por ejemplo, podrías configurar:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

**Nota**: `<LABEL_NAME>` no distingue entre minúsculas y mayúsculas. Por ejemplo, si tienes labels que se llaman `foo` y `FOO`, y configuras `DD_CONTAINER_LABELS_AS_TAGS='{"foo": "bar"}'`, tanto `foo` como `FOO` se asignan a `bar`.

**Nota**: `DD_CONTAINER_LABELS_AS_TAGS` es equivalente al antiguo `DD_DOCKER_LABELS_AS_TAGS`, y `DD_CONTAINER_ENV_AS_TAGS` es equivalente al antiguo `DD_DOCKER_ENV_AS_TAGS`.

{{% /tab %}}
{{% tab "Agent" %}}

Para extraer una label de contenedor `<LABEL_NAME>` dada y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade el bloque de configuración a continuación en el [Archivo de configuración `datadog.yaml` del Agent][1]:

```yaml
container_labels_as_tags:
  <LABEL_NAME>: <TAG_KEY>
```

Po ejemplo, podrías configurar:

```yaml
container_labels_as_tags:
  com.docker.compose.service: service_name
```


[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Extrae variables de entorno como etiquetas

Datadog recopila etiquetas automáticamente de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad y Rancher][4]. Para extraer aún más etiquetas, usa las opciones presentadas a continuación:

| Variable de entorno               | Descripción                             |
|------------------------------------|-----------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extrae labels de contenedor                |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extrae variables de entorno de contendedor |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extrae etiquetas del pod                      |
| `DD_CHECKS_TAG_CARDINALITY`        | Añade etiquetas a las métricas de los checks               |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Añade etiquetas a las métricas personalizadas              |

A partir de la versión del Agent v7.20+, un Agent contenedorizado puede usar Autodiscover en etiquetas de labels de contenedores. Este proceso permite al Agent asociar etiquetas personalizadas a todos los datos emitidos por un contenedor sin modificar el archivo `datadog.yaml` del Agent.

Las etiquetas deberían ser añadidas usando el formato mostrado a continuación:

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY_1>:<TAG_VALUE_1>", "<TAG_KEY_2>:<TAG_VALUE_2>"]'
```

Con Agent v6.0+, el Agent puede recopilar variables de entorno para un contenedor cualquiera y usarlas como etiquetas para asociarlas a todos los datos emitidos por ese contenedor.

{{< tabs >}}
{{% tab "Containerized Agent" %}}

Para extraer una variable de entorno de contenedor `<ENVVAR_NAME>` dada y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la variable de entorno mostrada a continuación al Datadog Agent:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENVVAR_NAME>": "<TAG_KEY>"}'
```

Por ejemplo, podrías configurar:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"ENVIRONMENT":"env"}'
```

{{% /tab %}}
{{% tab "Agent" %}}

Para extraer una variable de entorno de contenedor `<ENVVAR_NAME>` dada y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade el bloque de configuración mostrado a continuación al [Archivo de configuración `datadog.yaml` del Agent][1]:

```yaml
container_env_as_tags:
  <ENVVAR_NAME>: <TAG_KEY>
```

Por ejemplo, podrías configurar:

```yaml
container_env_as_tags:
  ENVIRONMENT: env
```

[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/docker/tag/#extract-environment-variables-as-tags
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: https://github.com/opencontainers/image-spec/blob/02efb9a75ee11e05937b535cc5f228f9343ab2f5/annotations.md#pre-defined-annotation-keys
[4]: /es/agent/docker/?tab=standard#tagging