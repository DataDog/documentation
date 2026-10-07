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
description: Guía para la ubicación, estructura del archivo de configuración del Agente
  de Datadog y cómo configurar verificaciones e integraciones.
title: Archivos de configuración del Agente
---
## Archivo de configuración principal {#main-configuration-file}

La ubicación del archivo de configuración del Agente varía según el sistema operativo.

| Plataforma                             | Comando                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

Consulte el [archivo de muestra `config_template.yaml`][1] para todas las opciones de configuración disponibles.

## Directorio de configuración del Agente {#agent-configuration-directory}

Los archivos de configuración para las verificaciones e integraciones del Agente se almacenan en el directorio `conf.d`. La ubicación del directorio varía según el sistema operativo.

| Plataforma                             | Comando                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Fuente | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

**Nota**: Los archivos en este directorio con longitud cero son ignorados por el Agente. Esto permite aprovisionar sistemas que no admiten omitir salidas de plantillas vacías.

### Archivos de configuración de verificaciones {#check-configuration-files}

Un ejemplo para cada archivo de configuración de verificación del Agente se encuentra en el archivo `conf.yaml.example` en la carpeta correspondiente `<CHECK_NAME>.d/`. Renombra este archivo a `conf.yaml` para habilitar la verificación asociada. **Nota**: El Agente carga archivos YAML válidos contenidos en la carpeta: `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`. Esto permite que configuraciones complejas se dividan en múltiples archivos. Por ejemplo, una configuración para el `http_check` podría verse así:

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Un caso especial son los archivos YAML con el sufijo `.default`. Estos archivos son cargados por el Agente por defecto y ayudan a definir el conjunto básico de verificaciones que siempre están habilitadas (CPU, memoria, tiempo de actividad ...). Se ignoran si se encuentran otras configuraciones para esa verificación, por lo tanto, puedes ignorarlas con seguridad. Si deseas deshabilitar una de las verificaciones predeterminadas, elimina ese archivo. Para configurar estas verificaciones, se debe usar `conf.yaml.example` como base.

Los archivos de plantilla de Autodiscovery se almacenan en la carpeta de configuración con el archivo `auto_conf.yaml`. Por ejemplo, para la verificación de Redis, aquí está la configuración en `redisdb.d/`:

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Para la recolección de registros, el Agente no acepta múltiples archivos YAML que apunten a la misma fuente de registro para evitar que se envíen registros duplicados a Datadog. En el caso de que haya más de un archivo YAML que apunte a la misma fuente de registro, el Agente considera los archivos en orden alfabético y utiliza el primer archivo.

## Archivo de configuración JMX {#jmx-configuration-file}

Las verificaciones del Agente JMX tienen un archivo adicional `metrics.yaml` en su carpeta de configuración. Es una lista de todos los beans que el Agente de Datadog recopila por defecto. De esta manera, no es necesario listar todos los beans manualmente cuando configuras una verificación a través de [etiquetas de Docker o anotaciones de k8s][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /es/agent/kubernetes/integrations/#configuration