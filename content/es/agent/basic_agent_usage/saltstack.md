---
dependencies:
- https://github.com/DataDog/datadog-formula/blob/main/README.md
title: SaltStack
---
La fórmula SaltStack de Datadog se utiliza para instalar el Datadog Agent y las integraciones basadas en el Agent (checks). Para obtener más información sobre las fórmulas SaltStack, consulta las [instrucciones de instalación y uso de fórmulas Salt][1].

## Configuración

### Requisitos

La fórmula SaltStack de Datadog solo admite instalaciones en sistemas basados en Debian y Red Hat.

### Instalación

En las instrucciones que se detallan a continuación, se indica cómo añadir la fórmula de Datadog al entorno Salt `base`. Si deseas incluirla en otro entorno Salt, sustituye las referencias `base` por el nombre de tu entorno Salt.

#### Opción 1

Instala la [fórmula de Datadog][6] en el entorno base de tu nodo Salt Master. Para ello, utiliza la opción `gitfs_remotes` en tu archivo de configuración Salt Master (por defecto `/etc/salt/master`):

```text
fileserver_backend:
  - roots # Active by default, necessary to be able to use the local salt files we define in the next steps
  - gitfs # Adds gitfs as a fileserver backend to be able to use gitfs_remotes

gitfs_remotes:
  - https://github.com/DataDog/datadog-formula.git:
    - saltenv:
      - base:
        - ref: 3.0 # Pin the version of the formula you want to use
```

A continuación, reinicia tu servicio Salt Master para que los cambios de configuración se apliquen:

```shell
systemctl restart salt-master
# OR
service salt-master restart
```

#### Opción 2

Si lo prefieres, puedes clonar la fórmula de Datadog en tu nodo Salt Master:

```shell
mkdir -p /srv/formulas && cd /srv/formulas
git clone https://github.com/DataDog/datadog-formula.git
```

Y, a continuación, añadirla al entorno base en la sección `file_roots` de tu archivo de configuración Salt Master (por defecto, `/etc/salt/master`):

```text
file_roots:
  base:
    - /srv/salt/
    - /srv/formulas/datadog-formula/
```

### Implementación

Para desplegar el Datadog Agent en tus hosts:

1. Añade la fórmula de Datadog a tu archivo "top" o principal (por defecto, `/srv/salt/top.sls`):

    ```text
    base:
      '*':
        - datadog
    ```

2. Crea el archivo `datadog.sls` en tu directorio "pillar" (por defecto, `/srv/pillar/`). Añade lo siguiente y actualiza tu [clave de API de Datadog][2]:

    ```
    datadog:
      config:
        api_key: <YOUR_DD_API_KEY>
      install_settings:
        agent_version: <AGENT7_VERSION>
    ```

3. Añade el archivo `datadog.sls` al archivo "pillar" principal (por defecto, `/srv/pillar/top.sls`):

    ```text
    base:
      '*':
        - datadog
    ```

### Configuración

La configuración de la fórmula debe redactarse en la clave `datadog` del archivo "pillar", que contiene tres partes: `config`, `install_settings` y `checks`.

#### Config

En la sección `config`, añade las opciones de configuración para redactar en el archivo de configuración del Agent de los Minions (`datadog.yaml` para el Agent v6 y v7; `datadog.conf` para el Agent v5).

Puedes configurar diferentes opciones en función de la versión del Agent que tengas instalada:

- Agent v6 y v7: admite todas las opciones compatibles con el archivo de configuración del Agent.
- Agent v5: solo admite la opción `api_key`.

En el siguiente ejemplo, se muestra cómo configurar tu clave de API de Datadog y el sitio de Datadog en `datadoghq.eu` (disponible para el Agent v6 y v7).

```text
  datadog:
    config:
      api_key: <YOUR_DD_API_KEY>
      site: datadoghq.eu
```

#### Install settings

En la sección `install_settings`, configura la opción de instalación del Agent:

- `agent_version`: la versión del Agent que se va a instalar (por defecto, es la última versión del Agent v7).

A continuación, se muestra un ejemplo de instalación del Agent v6.14.1:

```text
  datadog:
    install_settings:
      agent_version: 6.14.1
```

#### Checks

Para añadir una integración del Agent a tu host, utiliza la variable `checks` con el nombre del check como clave. Tienes dos opciones:

| Opción    | Descripción                                                                                                                                                             |
|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `config`  | Añadir las opciones de configuración para introducirlas en el archivo de configuración del check:<br>Agent v6 y v7:`<confd_path>/<check>.d/conf.yaml`<br>Agent v5: `<confd_path>/<check>.yaml` |
| `version` | En el Agent v6 y v7, la versión del check que se debe instalar (por defecto, es la versión incluida en el Agent).                                                                |
| `third_party` | En el Agent v6 y v7 (y únicamente en las versiones v6.21.0/v7.21.0 y posteriores), boleano que indica que la integración que hay que instalar es de terceros. Debe vincularse con la opción `version`.                                                                |

A continuación, se muestra un ejemplo para utilizar la versión v1.4.0 de la integración de [Directory][3] que monitoriza el directorio `/srv/pillar`:

```text
datadog:
  config:
    api_key: <YOUR_DD_API_KEY>
  install_settings:
    agent_version: <AGENT7_VERSION>
  checks:
    directory:
      config:
        instances:
          - directory: "/srv/pillar"
            name: "pillars"
      version: 1.4.0
```

A continuación, se muestra un ejemplo para utilizar la versión v1.0.0 de una integración de terceros de muestra denominada "third-party-integration":

```
datadog:
  config:
    api_key: <YOUR_DD_API_KEY>
  install_settings:
    agent_version: <AGENT7_VERSION>
  checks:
    third-party-integration:
      config:
        instances:
          - some_config: "some value"
      version: 1.0.0
      third_party: true
```

##### Logs

Para habilitar la recopilación de logs, establece `logs_enabled` como `true` en la configuración principal:
```text
datadog:
  config:
    logs_enabled: true
```

Para enviar logs a Datadog, utiliza la clave `logs` en un check (ya sea un check existente para configurar los logs de una integración o un check personalizado para configurar una recopilación de logs personalizada). En el siguiente ejemplo, se muestra un check personalizado denominado `system_logs`.

El contenido de la clave `config:` de este check se introduce en el archivo `/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml` (en este ejemplo: `/etc/datadog-agent/conf.d/system_logs.d/conf.yaml`).

Para introducir los logs que quieres recopilar, rellena la sección `config` del mismo modo que lo harías con el archivo `conf.yaml` de un archivo de configuración para la recopilación de logs personalizada. Si deseas obtener más información, consulta la sección sobre la [recopilación de logs personalizada](https://docs.datadoghq.com/agent/logs/?tab=tailfiles#custom-log-collection) en la documentación oficial.

Por ejemplo, para recopilar logs desde `/var/log/syslog` y `/var/log/auth.log`, la configuración sería:

```text
datadog:
[...]
  checks:
    system_logs:
      config:
        logs:
          - type: file
            path: "/var/log/syslog"
            service: "system"
          - type: file
            path: "/var/log/auth.log"
            service: "system"
```


## Estados

Las fórmulas Salt son estados Salt previamente redactados. En la fórmula de Datadog, se pueden encontrar los siguientes estados:

| Estado               | Descripción                                                                                             |
|---------------------|---------------------------------------------------------------------------------------------------------|
| `datadog`           | Instala, configura e inicia el servicio del Datadog Agent.                                             |
| `datadog.install`   | Configura el repositorio correspondiente e instala el Datadog Agent.                                             |
| `datadog.config`    | Configura el Datadog Agent y las integraciones utilizando los datos "pillar" (consulta este ejemplo: [pillar.example][4]).              |
| `datadog.service`   | Ejecuta el servicio del Datadog Agent, que busca cambios en los archivos de configuración del Agent y los checks. |
| `datadog.uninstall` | Detiene el servicio y desinstala el Datadog Agent.                                                     |

**NOTA**: Al utilizar `datadog.config` para configurar diferentes instancias de check en diferentes máquinas, [pillar_merge_lists][5] debe definirse como `True` en la configuración de Salt Master o en la de Salt Minion, si se ejecuta sin Master.

[1]: http://docs.saltstack.com/en/latest/topics/development/conventions/formulas.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/es/integrations/directory/
[4]: https://github.com/DataDog/datadog-formula/blob/master/pillar.example
[5]: https://docs.saltstack.com/en/latest/ref/configuration/master.html#pillar-merge-lists
[6]: https://github.com/DataDog/datadog-formula