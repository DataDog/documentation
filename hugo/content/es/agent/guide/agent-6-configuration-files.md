---
disable_toc: false
private: true
title: Archivos de configuración de Agent 6
---
## Archivo de configuración principal de Agent {#agent-main-configuration-file}

Los archivos de configuración para las verificaciones e integraciones del Agent se almacenan en el directorio `conf.d`.

El archivo de configuración de Agent v6 utiliza **YAML** para admitir mejor las configuraciones complejas y proporcionar una experiencia de configuración coherente, ya que Checks también utiliza archivos de configuración YAML. Por lo tanto, `datadog.conf` (v5) se deja de usar en favor de `datadog.yaml` (v6).

La ubicación del directorio `conf.d` varía según el sistema operativo.

| Plataforma                             | Comando                              |
|:-------------------------------------|:-------------------------------------|
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

## Directorio de configuración del Agent {#agent-configuration-directory}

Las versiones anteriores de Datadog Agent almacenaban los archivos de configuración en `/dd-agent/conf.d/`. A partir de la versión 6.0, los archivos de configuración se almacenan en el directorio `conf.d`. La ubicación del directorio varía según el sistema operativo.

| Plataforma                             | Comando                        |
|:-------------------------------------|:-------------------------------|
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Fuente                               | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

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

Para preservar la compatibilidad con versiones anteriores, el Agent sigue detectando archivos de configuración en el formato `/etc/dd-agent/conf.d/<CHECK_NAME>.yaml`, pero se recomienda encarecidamente migrar al nuevo diseño.

## El archivo de configuración de JMX {#jmx-configuration-file}

Las verificaciones del Agent de JMX tienen un archivo `metrics.yaml` adicional en su carpeta de configuración. Es una lista de todos los beans que el Datadog Agent recopila de forma predeterminada. De esta manera, no necesita listar todos los beans manualmente cuando configura una verificación a través de [etiquetas de Docker o anotaciones de k8s][2].

[2]: /es/agent/kubernetes/integrations/#configuration