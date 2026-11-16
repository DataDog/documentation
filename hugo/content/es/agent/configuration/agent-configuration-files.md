---
algolia:
  category: guide
  rank: 80
  subcategory: Agent Configuration Files
  tags:
  - agent config
  - agent configuration
  - agent directory
aliases:
- /es/agent/faq/agent-configuration-files
- /es/agent/guide/agent-configuration-files
description: Guía sobre las ubicaciones y la estructura del archivo de configuración
  del Datadog Agent, y cómo configurar verificaciones e integraciones.
title: Archivos de configuración del Agent
---
## Archivo de configuración principal {#main-configuration-file}

La ubicación del archivo de configuración del Agent difiere según el sistema operativo.

| Plataforma | Comando                               | Configuración de ejemplo                            |
|:---------|:--------------------------------------|:------------------------------------------|
| AIX      | `/etc/datadog-agent/datadog.yaml`     | [`datadog.yaml.example`][3]               |
| Linux    | `/etc/datadog-agent/datadog.yaml`     | [`datadog-agent_linux.yaml.example`][4]   |
| macOS    | `/opt/datadog-agent/etc/datadog.yaml` | [`datadog-agent_darwin.yaml.example`][5]  |
| Windows  | `%ProgramData%\Datadog\datadog.yaml`  | [`datadog-agent_windows.yaml.example`][6] |

## Directorio de configuración del Agent {#agent-configuration-directory}

Los archivos de configuración para las verificaciones e integraciones del Agent se almacenan en el directorio `conf.d`. La ubicación del directorio varía según el sistema operativo.

| Plataforma                             | Comando                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `/opt/datadog-agent/etc/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Fuente                               | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

**Nota**: Los archivos en este directorio con longitud cero son ignorados por el Agent. Esto permite el aprovisionamiento de sistemas que no admiten omitir salidas de plantilla vacías.

### Archivos de configuración de verificación {#check-configuration-files}

Se puede encontrar un ejemplo para cada archivo de configuración de verificación del Agent en el archivo `conf.yaml.example` en la carpeta `<CHECK_NAME>.d/` correspondiente. Cambie el nombre de este archivo a `conf.yaml` para habilitar la verificación asociada. **Nota**: El Agent carga los archivos YAML válidos contenidos en la carpeta: `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`. Esto permite dividir configuraciones complejas en varios archivos. Por ejemplo, una configuración para `http_check` podría verse así:

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Un caso especial son los archivos YAML con el sufijo `.default`. Estos archivos son cargados por el Agent de forma predeterminada y ayudan a definir el conjunto principal de verificaciones que siempre están habilitadas (CPU, memoria, tiempo de actividad...). Se ignoran si se encuentra cualquier otra configuración para esa verificación, por lo tanto, puede ignorarlos de forma segura. Si desea deshabilitar una de las verificaciones predeterminadas, elimine ese archivo. Para configurar estas verificaciones, se debe usar `conf.yaml.example` como base.

Los archivos de plantilla de Autodiscovery se almacenan en la carpeta de configuración con el archivo `auto_conf.yaml`. Por ejemplo, para la verificación de Redis, aquí está la configuración en `redisdb.d/`:

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Para la recolección de registros, el Agent no acepta múltiples archivos YAML que apunten a la misma fuente de registros para evitar que se envíen registros duplicados a Datadog. En el caso de que haya más de un archivo YAML que apunte a la misma fuente de registros, el Agent considera los archivos en orden alfabético y utiliza el primer archivo.

## El archivo de configuración de JMX {#jmx-configuration-file}

Las verificaciones del Agent de JMX tienen un archivo `metrics.yaml` adicional en su carpeta de configuración. Es una lista de todos los beans que el Datadog Agent recopila de forma predeterminada. De esta manera, no necesita listar todos los beans manualmente cuando configura una verificación a través de [etiquetas de Docker o anotaciones de k8s][2].

[2]: /es/agent/kubernetes/integrations/#configuration
[3]: https://github.com/DataDog/datadog-unix-agent/blob/master/docs/datadog.yaml.example
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[5]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_darwin.yaml.example
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example