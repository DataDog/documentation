---
aliases:
- /es/agent/faq/agent-v6-changes
further_reading:
- link: /agent/versions/upgrade_to_agent_v6/
  tag: Documentación
  text: Actualizar al Datadog Agent a la versión 6
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: Documentación
  text: ¿Cómo determina Datadog el nombre de host del Agent?

title: Cambios en el Agent v6
---

## Información general

En comparación con versiones anteriores del Agent, el Datadog Agent v6 presenta muchos cambios. En las siguientes secciones se detalla qué ha cambiado y qué ha quedado obsoleto.

## Funciones

Las siguientes funciones del Agent v5 **no están disponibles** en el Agent v6:

* [Cómo usar el Agent como proxy][1]
* [Emisores personalizados][2]
* [Dogstream][3]
* [go-metro][4]
* Compatibilidad con Graphite

## Configuración

Las versiones anteriores del Agent almacenaban los archivos de configuración en `/etc/dd-agent`. A partir de la v6.0 del Agent, estos archivos pasan a guardarse en `/etc/datadog-agent`.

{{< tabs >}}
{{% tab "Agent" %}}

El [archivo de configuración principal del Agent][1] ha pasado de tener el formato **INI** al formato **YAML** para ofrecer compatibilidad con configuraciones complejas y una experiencia uniforme en el Agent y los checks.

Agent v5 `datadog.conf` --> Agent v6 `datadog.yaml`

Para realizar la transición entre rutas de configuración y formatos del Agent, utiliza el siguiente comando del Agent:
```bash
sudo -u dd-agent -- datadog-agent import
```

Este comando parsea un archivo `datadog.conf` existente y convierte parámetros compatibles al nuevo formato en `datadog.yaml`. Además, copia archivos de configuración para los checks activados. Para obtener más información, consulta [Actualizar el Datadog Agent a la versión 6][2].

#### Opciones

Las siguientes opciones de configuración del Agent han cambiado o han desaparecido en la versión 6 del Agent. Las eliminadas se han reemplazado por otras opciones o estaban relacionadas con funciones con un funcionamiento distinto al de las versiones anteriores.

##### Modificadas

| Nombre anterior               | Nuevo nombre                 | Notas                                                                                             |
|-----------------------------|------------------------------|---------------------------------------------------------------------------------------------------|
| `proxy_host`                | `proxy`                      | Los parámetros de proxy se expresan como una lista de URIs. Consulta la documentación dedicada al [proxy][3] para obtener más información. |
| `collect_instance_metadata` | `enable_metadata_collection` | Activa la recopilación de metadatos.                                                                      |
| `collector_log_file`        | `log_file`                   |                                                                                                   |
| `syslog_host`               | `syslog_uri`                 | La configuración de Syslog se expresa como un URI.                                               |
|                             | `syslog_pem`                 | Certificado del cliente de configuración de Syslog para la validación del cliente TLS.                                |
|                             | `syslog_key`                 | Clave privada del cliente de configuración de Syslog para la validación del cliente TLS.                                |

##### Eliminadas

| Nombre                         | Notas                                                                                                                 |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `proxy_port`                 | Reemplazada por `proxy`, consulta la documentación dedicada al [proxy][3] para obtener más información.                                                  |
| `proxy_user`                 | Reemplazada por `proxy`, consulta la documentación dedicada al [proxy][3] para obtener más información.                                                  |
| `proxy_password`             | Reemplazada por `proxy`, consulta la documentación dedicada al [proxy][3] para obtener más información.                                                  |
| `proxy_forbid_method_switch` | Obsoleta                                                                                                              |
| `use_mount`                  | Obsoleta a nivel del Agent y trasladada al [check de disco][4].                                                       |
| `device_blacklist_re`        | Obsoleta a nivel del Agent. Se ha trasladado al [check de disco][4] como `device_blacklist`.                                 |
| `use_curl_http_client`       | Obsoleta                                                                                                              |
| `exclude_process_args`       | Función obsoleta                                                                                                    |
| `check_timings`              | Reemplazada por estadísticas internas                                                                                          |
| `non_local_traffic`          | Reemplazada por `dogstatsd_non_local_traffic` para Dogstatsd y `apm_config.apm_non_local_traffic` para el Trace Agent. |
| `dogstatsd_target`           |                                                                                                                       |
| `dogstreams`                 | Función obsoleta, utiliza el [Logs Agent][5] en su lugar.                                                                  |
| `custom_emitters`            |                                                                                                                       |
| `forwarder_log_file`         | Reemplazada por `log_file`                                                                                              |
| `dogstatsd_log_file`         | Reemplazada por `log_file`                                                                                              |
| `jmxfetch_log_file`          | Reemplazada por `log_file`                                                                                              |
| `syslog_port`                | Reemplazada por `syslog_uri`                                                                                            |
| `check_freq`                 |                                                                                                                       |
| `collect_orchestrator_tags`  | Implementada en recopiladores de metadatos                                                                                    |
| `utf8_decoding`              |                                                                                                                       |
| `developer_mode`             |                                                                                                                       |
| `use_forwarder`              |                                                                                                                       |
| `autorestart`                |                                                                                                                       |
| `dogstream_log`              | Función obsoleta, utiliza el [Logs Agent][5] en su lugar.                                                                  |
| `use_curl_http_client`       |                                                                                                                       |
| `collect_security_groups`    | Obsoleta, función disponible con la [integración de AWS][6].                                                         |

[1]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /es/agent/guide/upgrade-to-agent-v6/
[3]: /es/agent/proxy/
[4]: /es/integrations/disk/
[5]: /es/logs/
[6]: /es/integrations/amazon_web_services/
{{% /tab %}}
{{% tab "Checks" %}}

El Agent v6 carga cualquier archivo YAML en: `<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.d/`, lo cual permite dividir configuraciones complejas en varios archivos.

Por ejemplo, los archivos de configuración para el `http_check` podrían ser:
```text
/etc/datadog-agent/conf.d/http_check.d/
├── backend.yaml
└── frontend.yaml
```

El Agent no carga archivos de configuración desde ningún subdirectorio de la carpeta `<CHECK_NAME>.d`. Por ejemplo, la siguiente configuración **NO** se carga:
```text
/etc/datadog-agent/conf.d/http_check.d/prod.d/
├── backend.yaml
```

Los archivos de plantillas de [Autodiscovery][1] (`auto_conf.yaml`) se almacenan también en la carpeta de configuración. Este es un ejemplo de la carpeta de configuración del check `redisdb`:
```text
/etc/datadog-agent/conf.d/redisdb.d/
├── auto_conf.yaml
└── conf.yaml.example
```

Los archivos YAML de una carpeta `<CHECK_NAME>.d` pueden tener cualquier nombre, siempre y cuando tengan la extensión `.yaml` o `.yml`. El nombre estándar es `conf.yaml`.

Para mantener la compatibilidad con versiones anteriores, el Agent sigue aceptando los archivos de configuración con el formato:`<AGENT_DIRECTORY>/conf.d/<CHECK_NAME>.yaml`. Sin embargo, recomendamos encarecidamente usar el nuevo formato.

#### Opciones de configuración

El Agent v6 es compatible con las siguientes opciones en la sección `instance` de un check:

| Opción                    | Descripción                                                                                                               |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `min_collection_interval` | Establecer un intervalo de ejecución distinto en segundos, para checks que deberían ejecutarse con menos frecuencia de la predeterminada, intervalo de 15 segundos. |
| `empty_default_hostname`  | Enviar métricas, eventos y checks de servicio sin nombre de host cuando se configura como `true`.                                           |
| `tags`                    | Enviar etiquetas personalizadas además de las enviadas por el check.                                                               |


[1]: /es/getting_started/agent/autodiscovery/
{{% /tab %}}
{{% tab "Variables de entorno" %}}

La mayoría de las variables de entorno utilizadas en el Agent v6 son**diferentes** de las versiones anteriores. Consulta la lista de [variables de entorno para el Agent v6][1].

**Nota**: `DD_TAGS` es la misma etiqueta, pero en el Agent v6 el formato está separado por espacios, mientras que en las versiones anteriores se utilizaban comas. Por ejemplo, en la versión 6 sería: `DD_TAGS="simple-tag-0 tag-key-1:tag-value-1"`

#### Proxies

Desde la v6.4.0 en adelante, se pueden anular los parámetros de proxy del Agent con las siguientes variables de entorno:

| Variable de ent.        | Descripción                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | URL que se utilizará como proxy para las solicitudes `http`.                    |
| `DD_PROXY_HTTPS`    | URL que se utilizará como proxy para las solicitudes `https`.                   |
| `DD_PROXY_NO_PROXY` | Una lista separada por espacios de URLs para las que no se debe utilizar ningún proxy. |

Las variables de entorno estándar (`HTTP_PROXY`, `HTTPS_PROXY` y `NO_PROXY`) son compatibles en el Agent v6, aunque se recomienda utilizar las variables `DD_PROXY_*`. Las variables `DD_PROXY_*` tienen prioridad sobre las demás variables de proxy.

El orden de prioridad de las opciones de proxy del Agent v6 es diferente al de las versiones anteriores:

* El Agent v6 utiliza primero las variables de entorno y después el archivo de configuración.
* El Agent v6 sustituye los valores del archivo de configuración con los del entorno. Por ejemplo, si `proxy.http` y `proxy.https` están definidos en el archivo de configuración, pero solo se ha definido `DD_PROXY_HTTPS` en el entorno, el Agent utiliza el valor `https` del entorno y el valor `http` del archivo de configuración.

[1]: /es/agent/docker/#environment-variables
{{% /tab %}}
{{% tab "Nombre de host" %}}

Existen diferencias a la hora de determinar la resolución de los nombres de host entre el Agent v5 y el Agent v6. Para más información, consulta [¿Cómo determina Datadog el nombre de host del Agent?][1].

[1]: /es/agent/faq/how-datadog-agent-determines-the-hostname/#agent-versions
{{% /tab %}}
{{< /tabs >}}

## Logs

Los [archivos de logs del Agent][5] siguen estando en `/var/log/datadog/` (Linux) y `C:\ProgramData\Datadog\logs` (Windows).

Las versiones anteriores logueaban en varios archivos (`collector.log`, `forwarder.log`, `dogstatsd.log`, etc.). El Agent v6 loguea en un único archivo de logs: `agent.log`.

## Interfaz

La interfaz de línea de comandos del Agent v6 está basada en subcomandos. Para consultar la lista de subcomandos disponibles, ejecuta:
```shell
<AGENT_BINARY> --help
```

Para ejecutar un subcomando, debe invocarse el archivo binario del Agent:
```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

Algunas opciones tienen marcas y opciones detalladas en el subcomando `--help`. For example, use help with the `check`:
```shell
<AGENT_BINARY> check --help
```

Para obtener una lista completa de los comandos disponibles, consulta [Comandos del Agent][6].

### Cambios en el sistema operativo

{{< tabs >}}
{{% tab "Linux" %}}

Los principales cambios del Agent v6 en Linux son:

* Solo los _comandos del ciclo de vida_ (`start`/`stop`/`restart`/`status`) del Agent deberían ejecutarse con `sudo service`/`sudo initctl`/`sudo systemctl`.
* Los demás comandos deben invocarse en el archivo binario del Agent, que se encuentra de forma predeterminada en la `PATH` (ruta) (`/usr/bin`) como `datadog-agent`. El comando `dd-agent` ya no está disponible.
* El subcomando `info` ha pasado a llamarse `status`.
* El Agent v6 no incluye un script de inicialización SysV (que antes se encontraba en `/etc/init.d/datadog-agent`).

#### Comandos del ciclo de vida del servicio

Los comandos del ciclo de vida no han cambiado si en tu sistema está disponible el comando del contenedor `service`.
Por ejemplo, en Ubuntu, los _comandos del ciclo de vida_ son:

| Comando                              | Descripción                            |
|--------------------------------------|----------------------------------------|
| `sudo service datadog-agent start`   | Ejecutar el Agent como servicio.          |
| `sudo service datadog-agent stop`    | Detener el servicio del Agent.                |
| `sudo service datadog-agent restart` | Reiniciar el servicio del Agent.             |
| `sudo service datadog-agent status`  | Imprimir el estado del servicio del Agent. |

Si el comando del contenedor `service` no está disponible en tu sistema, utiliza:

* En sistemas basados en `upstart`: `sudo start/stop/restart/status datadog-agent`
* Para sistemas basados en `systemd`: `sudo systemctl start/stop/restart/status datadog-agent`

Si no sabes con seguridad qué sistema de inicio utiliza tu distribución de forma predeterminada, consulta la siguiente tabla:

| distribución \ sistema de inicio      | upstart                   | systemd                   | sysvinit                                  | Notas                         |
|---------------------------------|---------------------------|---------------------------|-------------------------------------------|-------------------------------|
| Amazon Linux (<= 2017.09)       | <i class="icon-check-bold"></i> |                           |                                           |                               |
| Amazon Linux 2 (>= 2017.12)     |                           | <i class="icon-check-bold"></i> |                                           |                               |
| CentOS/RHEL 6                   | <i class="icon-check-bold"></i> |                           |                                           |                               |
| CentOS/RHEL 7                   |                           | <i class="icon-check-bold"></i> |                                           |                               |
| Debian 7 (wheezy)               |                           |                           | <i class="icon-check-bold"></i> (Agent v6.6.0 y posteriores) |                               |
| Debian 8 (jessie) y 9 (stretch) |                           | <i class="icon-check-bold"></i> |                                           |                               |
| SUSE 11                         |                           |                           |                                           | No compatible sin `systemd` |
| SUSE 12                         |                           | <i class="icon-check-bold"></i> |                                           |                               |
| Ubuntu < 15.04                  | <i class="icon-check-bold"></i> |                           |                                           |                               |
| Ubuntu >= 15.04                 |                           | <i class="icon-check-bold"></i> |                                           |                               |

#### Comandos del Agent

A partir de la versión 6 del Agent, el propio archivo binario del Agent incluye otras funciones como subcomandos, y no deben invocarse con `service`/`systemctl`/`initctl`. A continuación te mostramos algunos ejemplos:

| Comando del Agent v5                                  | Comando del Agent v6                                       | Notas                          |
|---------------------------------------------------|--------------------------------------------------------|--------------------------------|
| `sudo service datadog-agent info`                 | `sudo datadog-agent status`                            | Página de estado de un Agent en ejecución |
| `sudo service datadog-agent flare`                | `sudo datadog-agent flare`                             | Enviar un flare                     |
| `sudo service datadog-agent`                      | `sudo datadog-agent --help`                            | Mostrar el uso del Agent            |
| `sudo -u dd-agent -- dd-agent check <CHECK_NAME>` | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` | Ejecutar un check                    |

{{% /tab %}}
{{% tab "Windows" %}}

Los principales cambios del Agent v6 en Windows son:

* La GUI del Datadog Agent Manager para Windows del Agent v5 se ha sustituido por un administrador multiplataforma basado en el navegador. Para obtener más información, consulta [Datadog Agent Manager para Windows][1].
* El archivo ejecutable principal es `agent.exe` (anteriormente `ddagent.exe`).
* Los comandos deben ejecutarse con la línea de comandos`"%ProgramFiles%\datadog\datadog agent\embedded\agent.exe" <COMMAND>` desde un símbolo del sistema de **Administrador**.
* El servicio Windows se inicia como "Automático-Inicio retrasado". Se inicia automáticamente durante el arranque, aunque después de todos los demás servicios. Esto provoca un pequeño retraso en el informe de métricas después de reiniciar.
* La GUI de Windows y el icono de la bandeja del sistema de Windows se implementan por separado. Consulta [Datadog Agent Manager para Windows][1] para obtener más información.

[1]: /es/agent/guide/datadog-agent-manager-windows/
{{% /tab %}}
{{% tab "MacOS" %}}

Los principales cambios del Agent v6 en MacOS son:

* Los _comandos del ciclo de vida_ (anteriormente`datadog-agent start`/`stop`/`restart`/`status`) se han reemplazado por comandos `launchctl` en el servicio `com.datadoghq.agent` y deben ejecutarse cuando el usuario haya iniciado sesión. Para ejecutar estos comandos, también puedes utilizar la aplicación systray del Datadog Agent.
* Los demás comandos pueden seguir ejecutándose con el archivo binario `datadog-agent` que se encuentra en la `PATH` (ruta) (`/usr/local/bin/`) de forma predeterminada.
* El comando `info` ha pasado a llamarse `status`.
* La GUI de configuración es una aplicación basada en web, a la que es posible acceder ejecutando el comando `datadog-agent launch-gui` o utilizando la aplicación systray.

**Cambios de ejemplo**:

| Comando del Agent v5                   | Comando del Agent v6                                     | Descripción                    |
|------------------------------------|------------------------------------------------------|--------------------------------|
| `datadog-agent start`              | `launchctl start com.datadoghq.agent` o a través de la aplicación systray | Ejecutar el Agent como servicio   |
| `datadog-agent stop`               | `launchctl stop com.datadoghq.agent` o a través de la aplicación systray  | Detener el servicio del Agent         |
| `datadog-agent restart`            | _ejecutar `stop` y luego `start`_ o a través de la aplicación systray             | Reiniciar el servicio del Agent      |
| `datadog-agent status`             | `launchctl list com.datadoghq.agent` o a través de la aplicación systray  | Imprimir el estado del servicio del Agent |
| `datadog-agent info`               | `datadog-agent status` o con la GUI web                    | Página de estado de un Agent en ejecución |
| `datadog-agent flare`              | `datadog-agent flare` o con la GUI web                     | Enviar un flare                     |
| _no aplica_                  | `datadog-agent --help`                               | Mostrar el uso de comandos          |
| `datadog-agent check <CHECK_NAME>` | `datadog-agent check <CHECK_NAME>`                   | Ejecutar un check (no ha cambiado)        |

{{% /tab %}}
{{< /tabs >}}

## Agents de recopilación

{{< tabs >}}
{{% tab "APM Agent" %}}

De forma predeterminada, el APM Agent se incluye con el Agent v6 para paquetes de Linux, MacOS y Windows.

En Linux, el APM Agent está activado de forma predeterminada. Para activarlo en otras plataformas o desactivarlo en Linux, actualiza la clave `apm_config` en tu `datadog.yaml`:
```yaml
apm_config:
  enabled: true
```

En el caso de la imagen de Docker, el APM Agent se encuentra desactivado de forma predeterminada. Para activarlo, configura `DD_APM_ENABLED` como `true`. Por defecto, escucha todas las interfaces. Si quieres escuchar tráfico no local en cualquier otra plataforma, configura `DD_APM_NON_LOCAL_TRAFFIC` como `true`. Para obtener más información, consulta la documentación sobre [Rastreo de Aplicaciones de Docker][1].

[1]: /es/agent/docker/apm/
{{% /tab %}}
{{% tab "Process Agent" %}}

El Process Agent se incluye de forma predeterminada con el Agent v6 solo para los paquetes Linux.

De forma predeterminada, el Process Agent no está activado. Para activarlo, actualiza tu archivo `datadog.yaml` con lo siguiente:
```yaml
process_config:
  enabled: "true"
```

El valor `enabled` es una cadena con las siguientes opciones:

* `"true"`: Activar el Process Agent para recopilar procesos y contenedores.
* `"false"`: Solo recopilar contenedores si está disponible (predeterminado).
* `"disabled"`: No ejecutar el Process Agent.

{{% /tab %}}
{{< /tabs >}}

## Checks

{{< tabs >}}
{{% tab "Docker" %}}

En el Agent v6, son compatibles las versiones de Docker 1.12.1 en adelante.

El check de Docker se reescribió en Go para aprovechar la arquitectura interna del Agent, debido a lo cual la versión de Python (`docker_daemon`) ha quedado obsoleta.

El nuevo check se llama `docker`. El [comando de importación del Agent](?tab=agent#configuration) importa parámetros desde la configuración `docker_daemon.yaml` legacy. Todas las funciones se portan, excepto:

* `url`, `api_version` y `tags*` han quedado obsoletos. Se recomienda utilizar las [variables de entorno de Docker estándar][1].
* `ecs_tags`, `performance_tags` y `container_tags` han quedado obsoletos. Todas las etiquetas pertinentes se recopilan de forma predeterminada.
* No es compatible el uso de `collect_container_count` para activar la métrica `docker.container.count`. Utiliza `docker.containers.running` y `.stopped`.

Algunas opciones se han movido de `docker_daemon.yaml` al archivo `datadog.yaml` principal:

* `collect_labels_as_tags` se renombró como `docker_labels_as_tags` y es compatible con etiquetas de alta cardinalidad. Consulta [Asignar etiquetas (tags) y Extracción de etiquetas (tags)][2] para obtener detalles.
* `exclude` y `include` se han renombrado como `ac_include` y `ac_exclude`. Para que el filtrado sea uniforme en todos los componentes del Agent, ya no se filtran etiquetas arbitrarias. El filtrado de etiquetas solo es compatible para `image` (nombre de la imagen) y`name` (nombre del contenedor). El filtrado de Regexp sigue disponible. Consulta la [Gestión de detección de contenedores][3] para obtener más información.
* La opción `docker_root` se ha dividido en dos opciones: `container_cgroup_root` y `container_proc_root`.
* Se ha añadido `exclude_pause_container` para excluir contenedores pausados en Kubernetes y Openshift (valor predeterminado: `true`).

[1]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[2]: /es/agent/docker/tag/
[3]: /es/agent/guide/autodiscovery-management/
{{% /tab %}}
{{% tab "Kubernetes" %}}

En el Agent v6, son compatibles las versiones de Kubernetes 1.3 en adelante.

La integración de Kubernetes ofrece información al combinar:

* Las métricas de checks de [kubelet][1] desde el kubelet.
* Los eventos de check [kubernetes_apiserver][2] y los checks de servicio del servidor de la API.

El [comando de importación del Agent](?tab=agent#configuration) (v6.2 y posteriores) importa parámetros desde la configuración `kubernetes.yaml` legacy. Las siguientes opciones han quedado obsoletas:

* Credenciales del servidor de la API (`api_server_url`, `apiserver_client_crt`, `apiserver_client_key`, `apiserver_ca_cert`): En su lugar, proporciona un archivo `kubeconfig` al Agent con `kubernetes_kubeconfig_path`.
* `use_histogram`: Contacta con el [equipo de asistencia de Datadog][3] para saber cuál es la mejor alternativa en tu caso.
* `namespaces` y `namespace_name_regexp`: El Agent v6 recopila métricas de todos los espacios de nombres disponibles.

La lógica actualizada activa la recopilación de métricas de Prometheus compatible con la versión 1.7.6 de Kubernetes y posteriores. Si ejecutas una versión anterior o quieres revertir la lógica de recopilación de cAdvisor, configura `cadvisor_port` como `4194` (el puerto donde tu kubelet expone cAdvisor).

El check [kubernetes_state][4] funciona con el Agent v5 o el Agent v6.

#### Etiquetado

El Agent v5 recopilaba automáticamente todas las etiquetas (labels) del pod como etiquetas (tags), mientras que el Agent v6 necesita una lista de permitidas. Para ello se utiliza la opción `kubernetes_pod_labels_as_tags` en `datadog.yaml`. Consulta [Asignar etiquetas (tags) y Extracción de etiquetas (tags)][5] para más información.

Las siguientes opciones y etiquetas (tags) están obsoletas:

* `label_to_tag_prefix` se ha reemplazado por `kubernetes_pod_labels_as_tags`.
* Las etiquetas `container_alias` no se recopilan.
* `kube_replicate_controller` solo se añade si el pod se crea mediante un controlador de replicación. En lugar de ello, utiliza la etiqueta de creador correspondiente (`kube_deployment`, `kube_daemon_set`, etc.).

[1]: /es/integrations/kubelet/
[2]: /es/integrations/kube_apiserver_metrics/
[3]: /es/help/
[4]: /es/agent/kubernetes/
[5]: /es/agent/kubernetes/tag/#extract-node-labels-as-tags
{{% /tab %}}
{{% tab "JMX" %}}

El Agent v6 incluye JMXFetch, con los siguientes cambios:

#### Jmxterm

El Agent v6 no incluye el JAR `jmxterm`. Para descargarlo y utilizarlo, consulta el [proyecto upstream][1].

#### Comandos de solución de problemas

La sintaxis de los comandos de solución de problemas ha cambiado. Se trata de comandos disponibles desde la versión 6.2.0; para versiones anteriores, consulta [Solucionar problemas del Agent para JMX][2]:

| Comando                                                | Descripción                                                                                                                                                     |
|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sudo -u dd-agent datadog-agent jmx list matching`     | Mostrar una lista de atributos que coinciden con al menos una de tus configuraciones de instancias.                                                                                        |
| `sudo -u dd-agent datadog-agent jmx list limited`      | Mostrar una lista de atributos que coinciden con una de tus configuraciones de instancias, pero no se recopilan porque se superaría el número de métricas que es posible recopilar. |
| `sudo -u dd-agent datadog-agent jmx list collected`    | Mostrar una lista de atributos que recopila tu configuración de instancias actual.                                                                                     |
| `sudo -u dd-agent datadog-agent jmx list not-matching` | Mostrar una lista de atributos que no coinciden con ninguna de tus configuraciones de instancias.                                                                                           |
| `sudo -u dd-agent datadog-agent jmx list everything`   | Mostrar todos los atributos disponibles que tienen un tipo compatible con JMXFetch.                                                                                            |
| `sudo -u dd-agent datadog-agent jmx collect`           | Iniciar la recopilación de métricas basadas en tu configuración actual y mostrarlas en la consola.                                                            |

**Nota**: De forma predeterminada, estos comandos se ejecutan en todos los checks de JMX configurados. Para especificar un check, utiliza el indicador `--checks`. Por ejemplo:
`sudo datadog-agent jmx list collected --checks tomcat`

[1]: https://github.com/jiaqi/jmxterm
[2]: /es/integrations/faq/troubleshooting-jmx-integrations/#agent-troubleshooting
{{% /tab %}}
{{% tab "Sistema" %}}

_Solo afecta a Agents de Windows_

En el Agent v5 para Windows, las métricas `system.mem.pagefile.*` muestran unidades incoherentes (con una diferencia de 10^6).

Este problema se ha solucionado en el Agent v6 para Windows, aunque se mantiene la discrepancia del Agent v5 por cuestiones de compatibilidad con versiones anteriores. Por tanto, los valores indicados (y los monitores asociados) son distintos al pasar del Agent v5 al Agent v6.

{{% /tab %}}
{{< /tabs >}}

## Autodiscovery

El sistema del [Autodiscovery][7] se ha modificado para el Agent v6. Además, los tiempos de ejecución y los orquestadores de contenedores se han desvinculado para ser más flexibles, lo cual incluye el traslado de `docker_images` a `ad_identifiers` en las plantillas.

{{< tabs >}}
{{% tab "Kubernetes" %}}

Al utilizar Kubernetes, Autodiscovery obtiene información del kubelet en lugar del daemon de Docker, lo cual permite que Autodiscovery funcione sin acceso al socket de Docker. Además, el comportamiento predeterminado es obtener plantillas de Autodiscovery desde anotaciones de pod. Puedes activar el proveedor de configuración `docker` para utilizar etiquetas de contenedor y reemplazar el agente de escucha de `kubelet` por el de Docker si necesitas el Autodiscovery en contenedores que se ejecutan fuera de pods.

Al especificar [plantillas de Autodiscovery][1] en anotaciones del pod, el prefijo del nombre de anotación es `ad.datadoghq.com/`. El anterior prefijo de anotación (`service-discovery.datadoghq.com/`) sigue siendo compatible con el Agent v6, pero se ha previsto que deje de serlo en futuras versiones.

[1]: /es/agent/kubernetes/integrations/
{{% /tab %}}
{{% tab "Docker" %}}

Las [plantillas de Autodiscovery][1] en etiquetas de Docker funcionan con el mismo prefijo del nombre `com.datadoghq.ad.*`.

La etiqueta de anulación de identificador se ha renombrado de `com.datadoghq.sd.check.id` a `com.datadoghq.ad.check.id` por cuestiones de coherencia. El nombre anterior sigue siendo compatible con el Agent v6, pero se ha previsto que deje de serlo en futuras versiones.

[1]: /es/agent/docker/integrations/
{{% /tab %}}
{{< /tabs >}}

## Módulos de Python

En el Agent v6, todo el código de Python relacionado con checks se importa desde el [espacio de nombres][8] `datadog_checks`. La mayoría de las bibliotecas de Python incluidas con el Agent v5 también forman parte del Agent v6. Estos son los cambios introducidos:

* `util.py` y sus funciones asociadas se han eliminado del Agent v6.
* `util.headers(...)` todavía se incluye con el Agent v6, pero se implementa en C y Go y se transfiere al check.

**Nota**: Todas las integraciones oficiales se actualizaron para eliminar módulos obsoletos, por lo que estos cambios solo afectan a checks personalizados.

Se ha eliminado del Agent v6 buena parte del directorio `utils`, pero la mayoría del contenido eliminado no estaba relacionado directamente con checks. Por ejemplo, se ha eliminado el módulo flare y reimplementado en Go, aunque es raro que alguien lo haya utilizado en un check personalizado. Para obtener más información, consulta la [guía del desarrollador de checks personalizados][9].

{{< tabs >}}
{{% tab "Integraciones" %}}

Aunque el Agent v6 es plenamente compatible con los checks de Python, algunas de las integraciones oficiales del Agent v5 han sido eliminadas o han quedado obsoletas:

* agent_metrics - eliminada
* docker_daemon - reemplazada por el [check de Docker](?tab=docker#checks)
* kubernetes - reemplazada por [checks de kubernetes](?tab=kubernetes#checks)

{{% /tab %}}
{{% tab "API de checks" %}}

La clase base para checks de Python (`AgentCheck`) se importa de `datadog_checks.base.checks`. Se han eliminado o cambiado varias cosas en la API de clase. Además, cada instancia de checks es su propia instancia de la clase. Por tanto, no es posible compartir el estado entre ellas.

No se han implementado los siguientes métodos de la clase `AgentCheck`:

* `service_metadata`
* `get_service_metadata`
* `generate_historate_func`
* `generate_histogram_func`
* `stop`

La firma de la función de los emisores de métricas ha cambiado:

```python
# Previous versions
gauge(self, metric, value, tags=None, hostname=None, device_name=None, timestamp=None)

# Agent v6
gauge(self, name, value, tags=None, hostname=None, device_name=None)
```

Los siguientes métodos se han eliminado permanentemente de `AgentCheck`:

* `_roll_up_instance_metadata`
* `instance_count`
* `is_check_enabled`
* `read_config`
* `set_check_version`
* `set_manifest_path`
* `_get_statistic_name_from_method`
* `_collect_internal_stats`
* `_get_internal_profiling_stats`
* `_set_internal_profiling_stats`
* `get_library_versions`
* `get_library_info`
* `from_yaml`
* `get_service_checks`
* `has_warnings`
* `get_metrics`
* `has_events`
* `get_events`

**Nota**: Todas las integraciones oficiales se han actualizado para eliminar métodos obsoletos, por lo que estos cambios solo afectan a checks personalizados.

{{% /tab %}}
{{% tab "Checks personalizados" %}}

#### Prioridad

En el Agent v6, los [checks oficiales][1] tienen prioridad sobre los checks personalizados (checks en `<AGENT_DIRECTORY>/checks.d`). Los checks personalizados que tienen el mismo nombre que los checks oficiales se ignoran.

Para corregir tu configuración de checks personalizados con el Agent v6, renombra los checks personalizados afectados con un nombre nuevo y sin usar, además de renombrar los archivos de configuración `.yaml` relacionados como corresponda.

#### Dependencias

Si utilizas checks personalizados, existe la posibilidad de que tu código dependa de código de Python que ya no se incluye con el Agent v6. Los siguientes paquetes han dejado de incluirse con el Agent:

- backports.ssl-match-hostname
- datadog
- decorator
- future
- futures
- google-apputils
- pycurl
- pyOpenSSL
- python-consul
- python-dateutil
- python-etcd
- python-gflags
- pytz
- PyYAML
- rancher-metadata
- tornado
- uptime
- websocket-client

Si tu código depende de cualquiera de estos paquetes, ejecuta lo siguiente para instalar los que falten:

```bash
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

Del mismo modo, puede que añadieras un paquete PIP para cumplir un requisito de un check personalizado cuando usabas el Agent v5. Si el paquete PIP que añadiste tenía dependencias internas con paquetes ya incluidos con el Agent v5 (consulta la lista anterior), esas dependencias faltarán después de actualizar al Agent v6. Instala las dependencias que faltan tal como se describe anteriormente.

[1]: https://github.com/DataDog/integrations-core
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/proxy/#using-the-agent-as-a-proxy
[2]: https://github.com/DataDog/dd-agent/wiki/Using-custom-emitters
[3]: /es/agent/guide/dogstream/
[4]: /es/integrations/go-metro/
[5]: /es/agent/guide/agent-log-files/
[6]: /es/agent/guide/agent-commands/
[7]: /es/getting_started/agent/autodiscovery/
[8]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base
[9]: https://github.com/DataDog/datadog-agent/tree/main/docs/dev/checks
