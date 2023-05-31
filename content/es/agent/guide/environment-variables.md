---
further_reading:
- link: /agent/docker/#environment-variables
  tag: Documentación
  text: Variables de entorno del Docker Agent
- link: /agent/docker/apm/#docker-apm-agent-environment-variables
  tag: Documentación
  text: Variables de entorno del APM Agent
- link: /logs/log_collection/#container-log-collection
  tag: Documentación
  text: Recopilación de logs de contenedores
- link: /agent/proxy/#environment-variables
  tag: Documentación
  text: Variables de entorno del proxy
kind: guía
title: Variables de entorno del Agent
---

<div class="alert alert-warning">
En el Agent v5, consulta el <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">repositorio GitHub del Docker Agent</a>.
</div>

## Información general

En el Agent v6, la mayoría de las opciones de configuración del [archivo de configuración principal del Agent][1] (`datadog.yaml`) se pueden ajustar mediante variables de entorno.

## Recomendaciones

Datadog recomienda utilizar el etiquetado de servicios unificado al asignar etiquetas. Este sistema asocia toda la telemetría de Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para saber cómo configurar tu entorno con el etiquetado unificado, consulta la [documentación sobre el etiquetado de servicios unificado][2].

## Uso general

En general, puedes utilizar las siguientes reglas:

* Los nombres de las opciones deben ir en mayúsculas con el prefijo `DD_`: `hostname` -> `DD_HOSTNAME`

* Los valores de la lista deben estar separados por espacios. Las reglas de inclusión admiten expresiones regulares y se definen como una lista de cadenas separadas por comas:
   ```yaml
      container_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_CONTAINER_INCLUDE="image:cp-kafka image:k8szk"
   ```

* El anidamiento de opciones de configuración con claves **predefinidas** debe separarse con un guion bajo:
   ```yaml
      cluster_agent:
        cmd_port: 5005
      # DD_CLUSTER_AGENT_CMD_PORT=5005
   ```

* El anidamiento de opciones de configuración con claves **definidas por el usuario** debe tener un formato JSON:
   ```yaml
      container_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_CONTAINER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

**Nota**: Especificar una opción anidada con una variable de entorno anula _todas_ las opciones anidadas que se hayan definido en la opción "config". La excepción a esta regla es la opción "config" del proxy. Para obtener más información, consulta la [documentación sobre el proxy del Agent][3].

### Excepciones

- No todas las opciones de `datadog.yaml` están disponibles con variables de entorno. Consulta [config.go][4] en el repositorio GitHub del Datadog Agent. Las opciones con variables de entorno comienzan por `config.BindEnv*`.

- También pueden ser compatibles las variables de entorno específicas del componente que no aparezcan en [config.go][4].

  - **Agent de rastreo de APM**

      - [Variables de entorno del APM Agent en Docker][5]
      - [trace-agent env.go][6]
      - Por ejemplo:

          ```yaml
             apm_config:
                 enabled: true
                 env: dev
             # DD_APM_ENABLED=true
             # DD_APM_ENV=dev
          ```

  - **Agent del Live Process**

      - [process-agent config.go][7]
      - Por ejemplo:

          ```yaml
             process_config:
                 enabled: true
                 process_dd_url: https://process.datadoghq.com
             # DD_PROCESS_AGENT_ENABLED=true
             # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
          ```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/agent/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config.go
[5]: https://docs.datadoghq.com/es/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/trace/config/env_test.go
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/process/config/config.go