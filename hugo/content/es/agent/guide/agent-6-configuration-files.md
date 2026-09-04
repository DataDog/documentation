---
disable_toc: false
private: true
title: Archivos de configuración del Agent 6
---

## Archivo de configuración principal del Agent

Los archivos de configuración para los checks e integraciones del Agent se almacenan en el directorio `conf.d`.

El archivo de configuración del Agent v6 utiliza **YAML** para adaptarse mejor a configuraciones complejas y garantizar la coherencia en el proceso de configuración, ya que los checks también utilizan archivos de configuración YAML. Por este motivo, `datadog.yaml` (v6) pasa a sustituir a `datadog.conf` (v5).

La localización del directorio `conf.d` difiere según el sistema operativo.

| Plataforma                             | Comando                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows                              | `%ProgramData%\Datadog\datadog.yaml` |

Consulta el [archivo `config_template.yaml` de ejemplo][1] para ver todas las opciones disponibles de configuración.

## Directorio de configuración del Agent

Las versiones anteriores del Datadog Agent almacenaban los archivos de configuración en `/dd-agent/conf.d/`. A partir de la versión 6.0, los archivos de configuración se almacenan en el directorio `conf.d`. La localización del directorio difiere en función del sistema operativo.

| Plataforma                             | Comando                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| Red Hat                               | `/etc/datadog-agent/conf.d/`   |
| Fuente                               | `/etc/datadog-agent/conf.d/`   |
| Suse                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows                              | `%ProgramData%\Datadog\conf.d` |

### Archivos de configuración de checks

En el archivo `conf.yaml.example`, en la carpeta `<CHECK_NAME>.d/` correspondiente, encontrarás un ejemplo de todos los archivos de configuración de checks del Agent. Cambia el nombre a `conf.yaml` para habilitar el check asociado. **Nota**: El Agent carga los archivos YAML válidos incluidos en la carpeta `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`. Con este paso, las configuraciones complejas se dividen en varios archivos. Este sería un ejemplo de configuración de `http_check`:

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

Un caso especial son los archivos YAML con el sufijo `.default`. El Agent carga estos archivos por defecto y ayuda a definir el conjunto básico de checks que siempre están activados (CPU, memoria, tiempo de actividad...). Se ignoran si se encuentra cualquier otra configuración para ese check, por lo tanto puedes ignorarlos sin problemas. Si deseas desactivar uno de los checks por defecto, elimina ese archivo. Para configurar estos checks, `conf.yaml.example` se debe utilizar como base.

Los archivos de plantilla de Autodiscovery se almacenan en la carpeta de configuración con el archivo `auto_conf.yaml`. Por ejemplo, en el caso del check de Redis, esta es la configuración de `redisdb.d/`:

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Para la recopilación de logs, si hay varios archivos YAML que apuntan a una misma fuente de logs, el Agent no los acepta para evitar que se envíen duplicados a Datadog. Si se da este caso, el Agent ordena los archivos de manera alfabética y utiliza el primero de la lista.

Para preservar la compatibilidad con versiones anteriores, el Agent sigue aceptando los archivos de configuración en formato `/etc/dd-agent/conf.d/<CHECK_NAME>.yaml`. Sin embargo, se recomienda utilizar el formato nuevo.

## Archivo de configuración de JMX

Los checks del JMX Agent tienen un archivo `metrics.yaml` adicional en su carpeta de configuración. Se trata de una lista de todos los beans que el Datadog Agent recopila por defecto. De esta forma, no es necesario hacer una lista de todos los beans manualmente cuando se configura un check a través de [etiquetas de Docker o anotaciones k8s][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /es/agent/kubernetes/integrations/#configuration