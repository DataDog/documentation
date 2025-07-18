---
aliases:
- /es/agent/faq/agent-configuration-files
kind: guía
title: Archivos de configuración del Agent
---

## Archivo de configuración principal del Agent

El archivo de configuración del Agent v6 usa **YAML** para adaptarse mejor a configuraciones complejas y para garantizar la coherencia en el proceso de configuración, ya que los checks también utilizan archivos de configuración YAML. Por este motivo, `datadog.yaml` (v6) pasa a sustituir a `datadog.conf` (v5).

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Plataforma                             | Comando                              |
|:-------------------------------------|:-------------------------------------|
| AIX                                  | `/etc/datadog-agent/datadog.yaml`    |
| Linux                                | `/etc/datadog-agent/datadog.yaml`    |
| macOS                                | `~/.datadog-agent/datadog.yaml`      |
| Windows Server 2008, Vista y versiones más recientes | `%ProgramData%\Datadog\datadog.yaml` |

{{% /tab %}}
{{% tab "Agent v5" %}}

| Plataforma                             | Comando                                                                    |
|:-------------------------------------|:---------------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/datadog.conf`                                               |
| macOS                                | `~/.datadog-agent/datadog.conf`                                            |                                       |
| Windows Server 2008, Vista y versiones más recientes | `%ProgramData%\Datadog\datadog.conf`                                       |
| Windows Server 2003, XP o versiones anteriores     | `\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf` |

{{% /tab %}}
{{< /tabs >}}

Consulta el [archivo de ejemplo `config_template.yaml`][2] para ver todas las opciones de configuración disponibles.

## Directorio de configuración del Agent

En versiones anteriores, el Datadog Agent almacenaba los archivos de configuración en `/dd-agent/conf.d/`. Con la versión 6.0, estos archivos pasan a guardarse en `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Plataforma                             | Comando                        |
|:-------------------------------------|:-------------------------------|
| AIX                                  | `/etc/datadog-agent/conf.d/`   |
| Linux                                | `/etc/datadog-agent/conf.d/`   |
| CentOS                               | `/etc/datadog-agent/conf.d/`   |
| Debian                               | `/etc/datadog-agent/conf.d/`   |
| Fedora                               | `/etc/datadog-agent/conf.d/`   |
| macOS                                | `~/.datadog-agent/conf.d/`     |
| RedHat                               | `/etc/datadog-agent/conf.d/`   |
| Origen                               | `/etc/datadog-agent/conf.d/`   |
| SUSE                                 | `/etc/datadog-agent/conf.d/`   |
| Ubuntu                               | `/etc/datadog-agent/conf.d/`   |
| Windows Server 2008, Vista y versiones más recientes | `%ProgramData%\Datadog\conf.d` |
| Windows Server 2003, XP o versiones anteriores     | *plataforma no compatible*         |

### Archivos de configuración de checks para el Agent 6

En el archivo `conf.yaml.example`, en la carpeta `<CHECK_NAME>.d/` correspondiente, encontrarás un ejemplo de todos los archivos de configuración de checks del Agent. Cambia el nombre a `conf.yaml` para activar el check relacionado. **Nota**: El Agent carga los archivos YAML válidos incluidos en la carpeta: `/etc/datadog-agent/conf.d/<CHECK_NAME>.d/`. Con este paso, las configuraciones complejas se dividen en varios archivos. Por ejemplo, una configuración para el `http_check` tendría este aspecto:

```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

El caso de los archivos YAML con sufijo `.default` es especial. El Agent los carga de forma predeterminada, y sirven para ayudar a determinar el conjunto principal de checks que se activan siempre (CPU, memoria, tiempo de actividad…). Es seguro omitirlos porque, de hecho, se omiten si se encuentra otra configuración para un check determinado. Si quieres desactivar alguno de los checks predeterminados, basta con eliminar el archivo correspondiente. Para configurar estos checks, debería utilizarse `conf.yaml.example` como base.

Las plantillas de Autodiscovery se almacenan en la carpeta de configuración con el archivo `auto_conf.yaml`. Por ejemplo, en el caso del check de Redis, esta es la configuración en `redisdb.d/`:

```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Para la recopilación de logs, si hay varios archivos YAML que dirijan a una misma fuente de logs, el Agent no los acepta para evitar que se envíen duplicados a Datadog. Si se da este caso, el Agent ordena los archivos de alfabéticamente y utiliza el primero de la lista.

Para preservar la compatibilidad con versiones anteriores, el Agent sigue aceptando los archivos de configuración en formato `/etc/dd-agent/conf.d/<CHECK_NAME>.yaml`. Sin embargo, recomendamos encarecidamente usar el nuevo formato.

{{% /tab %}}
{{% tab "Agent v5" %}}

| Plataforma                             | Comando                                                              |
|:-------------------------------------|:---------------------------------------------------------------------|
| Linux                                | `/etc/dd-agent/conf.d/`                                              |
| CentOS                               | `/etc/dd-agent/conf.d/`                                              |
| Debian                               | `/etc/dd-agent/conf.d/`                                              |
| Fedora                               | `/etc/dd-agent/conf.d/`                                              |
| macOS                                | `~/.datadog-agent/conf.d/`                                           |
| RedHat                               | `/etc/dd-agent/conf.d/`                                              |
| Origen                               | `/etc/dd-agent/conf.d/`                                              |
| SUSE                                 | `/etc/dd-agent/conf.d/`                                              |
| Ubuntu                               | `/etc/dd-agent/conf.d/`                                              |
| Windows Server 2008, Vista y versiones más recientes | `%ProgramData%\Datadog\conf.d`                                       |
| Windows Server 2003, XP o versiones anteriores     | `\\Documents and Settings\All Users\Application Data\Datadog\conf.d` |

{{% /tab %}}
{{< /tabs >}}

## Archivo de configuración de JMX

Los checks de JMX del Agent incluyen un archivo `metrics.yaml` adicional en la carpeta de configuración. Se trata de una lista de beans que el Datadog Agent recopila de forma predeterminada. Así, no tendrás que detallarlos manualmente cuando configures el check a través de las [etiquetas de Docker o las anotaciones de k8s][1].

[1]: /es/agent/kubernetes/integrations/#configuration
[2]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml