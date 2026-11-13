---
description: Configure los ajustes del Datadog Agent usando variables de entorno como
  alternativa a datadog.yaml, incluyendo convenciones de nomenclatura y el uso de
  systemd.
further_reading:
- link: /agent/docker/#environment-variables
  tag: Documentación
  text: Variables de entorno del Docker Agent
- link: /agent/docker/apm/#docker-apm-agent-environment-variables
  tag: Documentación
  text: Variables de entorno del APM Agent
- link: /logs/log_collection/#container-log-collection
  tag: Documentación
  text: Recopilación de registros de contenedores
- link: /agent/configuration/proxy/#environment-variables
  tag: Documentación
  text: Variables de entorno de proxy
title: Variables de entorno del Agent
---
<div class="alert alert-danger">
Para el Agent v5, consulte el <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">repositorio de GitHub del Docker Agent</a>.
</div>

## Descripción general {#overview}

Para el Agent v6, la mayoría de las opciones de configuración en el [archivo de configuración principal del Agent][1] (`datadog.yaml`) pueden establecerse a través de variables de entorno. Consulte los [archivos de configuración de ejemplo][15] en el repositorio de GitHub de Datadog Agent para obtener una referencia completamente comentada de todos los ajustes `datadog.yaml` disponibles.

## Recomendaciones {#recommendations}

Como mejor práctica, Datadog recomienda usar unified service tagging al asignar etiquetas. Unified service tagging vincula la telemetría de Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender cómo configurar su entorno con unified service tagging, consulte la [documentación de unified service tagging][2].

## Uso general {#general-use}

En general, utilice las siguientes reglas:

* Los nombres de las opciones deben estar en mayúsculas con el prefijo `DD_`: `hostname` -> `DD_HOSTNAME`

* Los valores de la lista deben estar separados por espacios (las reglas de inclusión admiten expresiones regulares y se definen como una lista de cadenas separadas por comas):
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

* El anidamiento de opciones de configuración con claves **definidas por el usuario** debe tener formato JSON:
   ```yaml
      container_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_CONTAINER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

### Prioridad de definición de propiedades {#property-definition-priority}

- Si una propiedad se define tanto en el archivo de configuración global (`datadog.yaml`) como en una variable de entorno, la variable de entorno tiene prioridad.
- Especificar una opción anidada con una variable de entorno anula _todas_ las opciones anidadas especificadas bajo la opción de configuración. La excepción a esta regla es la opción de configuración `proxy`. Consulte la [documentación del proxy del Agent][3] para obtener más detalles.

### Excepciones {#exceptions}

- No todas las opciones `datadog.yaml` están disponibles con variables de entorno. Consulte el esquema de configuración [core_schema.yaml][4] en el repositorio de GitHub del Datadog Agent. Los ajustes etiquetados como `no-env` en el esquema no admiten variables de entorno.

  Para versiones anteriores del Agent, la fuente de configuración cambió de ubicación:

  | Versión del Agent       | Fuente de configuración                                                          |
  | -------------------- | ------------------------------------------------------------------------------ |
  | De la 7.51 a la 7.83    | `*_settings.go` archivos en [pkg/config/setup en la rama 7.83.x][13]        |
  | 7.50 y anteriores     | [config.go en la rama 7.50.x][9]                                            |

- También podrían ser compatibles las variables de entorno específicas de cada componente que no aparecen en [core_schema.yaml][4]:

  | Componente              | Fuente de configuración                        | Agent 7.51-7.83                                                | Agent 7.50 y anteriores                              |
  | ----------------------- | -------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
  | Agent de traza APM          | [apm_config.yaml][6], [Variables de entorno del Agent APM de Docker][5] | `apm_settings.go` en [pkg/config/setup en la rama 7.83.x][13] | `apm.go` en [pkg/config en la rama 7.50.x][14]    |
  | Agent de procesos en vivo       | [process_config.yaml][7]                     | `process_settings.go` en [pkg/config/setup en la rama 7.83.x][13] | `process.go` en [pkg/config en la rama 7.50.x][14] |
  | Ingesta OTLP              | [core_schema.yaml (otlp_config)][4]          | `otlp_settings.go` en [pkg/config/setup en la rama 7.83.x][13] | `otlp.go` en [pkg/config en la rama 7.50.x][14]   |
  | Sonda del sistema             | [system-probe_schema.yaml][10]               | `system_probe_settings.go` en [pkg/config/setup en la rama 7.83.x][13] | `system_probe.go` en [pkg/config en la rama 7.50.x][14] |
  | Ejecutor de acciones privadas    | [private_action_runner.yaml][11]             | `privateactionrunner_settings.go` en [pkg/config/setup en la rama 7.83.x][13] | No disponible                                       |
  | Conmutación por error multirregión    | [multi_region_failover.yaml][12]             | `multi_region_failover_settings.go` en [pkg/config/setup en la rama 7.83.x][13] | No disponible                                       |

  Ejemplo de Agent de traza APM:

  ```yaml
     apm_config:
         enabled: true
         env: dev
     # DD_APM_ENABLED=true
     # DD_APM_ENV=dev
  ```

  Ejemplo de Agent de procesos en vivo:

  ```yaml
     process_config:
         process_collection:
             enabled: true
         process_dd_url: https://process.datadoghq.com
     # DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED=true
     # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
  ```

## Uso de variables de entorno en unidades de systemd {#using-environment-variables-in-systemd-units}

En los sistemas operativos que utilizan systemd para administrar servicios, las variables de entorno (globales, por ejemplo, `/etc/environment`, o basadas en sesiones, por ejemplo, `export VAR=value`) generalmente no están disponibles para los servicios a menos que se configuren para ello. Consulte la [página del manual de systemd Exec][8] para obtener más detalles.

A partir de Datadog Agent 7.45, el servicio Datadog Agent (unidad `datadog-agent.service`) puede cargar opcionalmente asignaciones de variables de entorno desde un archivo (`<ETC_DIR>/environment`).

1. Cree `/etc/datadog-agent/environment` si no existe.
2. Defina las asignaciones de variables de entorno separadas por saltos de línea. Ejemplo:
  ```
  GODEBUG=x509ignoreCN=0,x509sha1=1
  DD_HOSTNAME=myhost.local
  DD_TAGS=env:dev service:foo
  ```
3. Reinicie el servicio para que los cambios surtan efecto.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/agent/configuration/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/core_schema.yaml
[5]: https://docs.datadoghq.com/es/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/apm_config.yaml
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/process_config.yaml
[8]: https://www.freedesktop.org/software/systemd/man/systemd.exec.html#Environment
[9]: https://github.com/DataDog/datadog-agent/blob/7.50.x/pkg/config/config.go
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/system-probe_schema.yaml
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/multi_region_failover.yaml
[13]: https://github.com/DataDog/datadog-agent/tree/7.83.x/pkg/config/setup
[14]: https://github.com/DataDog/datadog-agent/tree/7.50.x/pkg/config
[15]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example