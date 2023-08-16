---
dependencies:
- https://github.com/DataDog/ansible-datadog/blob/main/README.md
kind: documentación
title: Ansible
---
El rol de Datadog en Ansible instala y configura el Datadog Agent y sus integraciones. La versión `4` del rol instala Datadog Agent v7 por defecto.

## Configuración

### Requisitos

- Requiere Ansible 2.6 o una versión posterior.
- Es compatible con la mayoría de distribuciones de Linux basadas en Debian y RHEL, con macOS y con Windows.
- Para usar Ansible 2.10 o una versión posterior en Windows, necesitas instalar la recopilación `ansible.windows`:

  ```shell
  ansible-galaxy collection install ansible.windows
  ```

### Instalación

Instala el [rol de Datadog][1] desde Ansible Galaxy en tu servidor Ansible:

```shell
ansible-galaxy install datadog.datadog
```

Para desplegar el Datadog Agent en hosts, añade el rol de Datadog y tu clave de API a tu cuaderno de estrategias:

```text
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

#### Variables del rol

| Variable                                   | Descripción                                                                                                                                                                                                                                                                                                                                                        |
|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog_api_key`                          | Tu clave de API de Datadog.                                                                                                                                                                                                                                                                                                                                              |
| `datadog_site`                             | El sitio de ingesta de Datadog al que enviar los datos del Agent. Se establece por defecto como `datadoghq.com`, así que configúralo como `datadoghq.eu` para enviar los datos al sitio de la UE. Esta opción solo está disponible en versiones del Agent posteriores a la 6.6.0.                                                                                                                                                                   |
| `datadog_agent_flavor`                     | Sobreescribe el paquete de Debian / RedHat predeterminado en las instalaciones IoT de la RPI. Se establece por defecto como "datadog-agent", así que usa "datadog-iot-agent" en la RPI.                                                                                                                                                                                                                          |
| `datadog_agent_version`                    | La versión anclada del Agent que hay que instalar (es opcional, pero recomendable). Ejemplo: `7.16.0`. El parámetro `datadog_agent_major_version` no es necesario si se usa `datadog_agent_version`. **Nota**: No es posible cambiar a versiones anteriores en plataformas de Windows.                                                                                                                |
| `datadog_agent_major_version`              | La versión principal del Agent que hay que instalar. Los valores posibles son 5, 6 y 7 (por defecto). Si se define `datadog_agent_version`, tiene prioridad. De lo contrario, se instala la última versión principal especificada. El parámetro `datadog_agent_major_version` no es necesario si se usa `datadog_agent_version`.                                                          |
| `datadog_checks`                           | Configuración YAML para aplicar los checks del Agent en: <br> - `/etc/datadog-agent/conf.d/<check_name>.d/conf.yaml` en el Agent v6 y v7, <br> - `/etc/dd-agent/conf.d` en el Agent v5.                                                                                                                                                                                     |
| `datadog_disable_untracked_checks`         | Configúrala como `true` para eliminar todos los checks que no estén presentes en `datadog_checks` y `datadog_additional_checks`.                                                                                                                                                                                                                                                                |
| `datadog_additional_checks`                | Lista de checks adicionales que no se eliminan si se configura `datadog_disable_untracked_checks` como `true`.                                                                                                                                                                                                                                                             |
| `datadog_disable_default_checks`           | Configúrala como `true` para eliminar todos los checks predeterminados.                                                                                                                                                                                                                                                                                                                        |
| `datadog_config`                           | Define la configuración del Datadog Agent. El rol escribe la configuración en la [ubicación correcta según el sistema operativo](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file). Para ver una lista completa de opciones de configuración, consulta la [plantilla `datadog.yaml` en el repositorio de GitHub datadog-agent](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml). |
| `datadog_config_ex`                        | (Opcional) Secciones INI adicionales para `/etc/dd-agent/datadog.conf` (solo para el Agent v5).                                                                                                                                                                                                                                                                               |
| `datadog_apt_repo`                         | Sobreescribe el repositorio `apt` predeterminado de Datadog. Asegúrate de usar la opción `signed-by` si los metadatos del repositorio se firman usando las claves de firma de Datadog: `deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://yourrepo`.                                                                                                                          |
| `datadog_apt_cache_valid_time`             | Sobreescribe el tiempo de expiración predeterminado de la caché de APT (1 hora, por defecto).                                                                                                                                                                                                                                                                                               |
| `datadog_apt_key_url_new`                  | Sobreescribe la ubicación desde la que se obtiene la clave `apt` de Datadog (la variable obsoleta `datadog_apt_key_url` hace referencia a una clave expirada que se ha eliminado del rol). La URL prevista debe estar formada por un conjunto de claves GPG que contenga las claves `382E94DE` y `F14F620E`.                                                                                                        |
| `datadog_yum_repo`                         | Sobreescribe el repositorio `yum` predeterminado de Datadog.                                                                                                                                                                                                                                                                                                                     |
| `datadog_yum_repo_gpgcheck`                | Sobreescribe el valor `repo_gpgcheck` predeterminado (vacío). Si está vacío, el valor se configura de forma dinámica como `yes` cuando no se usa el valor personalizado `datadog_yum_repo` y el sistema no es RHEL/CentOS 8.1 (debido a [un error](https://bugzilla.redhat.com/show_bug.cgi?id=1792506) en el parámetro dnf); en caso contrario, se configura como `no`. **Nota**: La verificación de la firma de los metadatos del repositorio siempre está desactivada en el Agent v5. |
| `datadog_yum_gpgcheck`                     | Sobreescribe el valor `gpgcheck` predeterminado (`yes`), así que usa `no` para desactivar la verificación de la firma del paquete GPG.                                                                                                                                                                                                                                                           |
| `datadog_yum_gpgkey`                       | **Eliminada en la versión 4.18.0** Sobreescribe la URL predeterminada por la clave `yum` de Datadog que se usa para verificar los paquetes del Agent v5 y v6 (hasta la versión 6.13). (ID de clave: `4172A230`).                                                                                                                                                                                                                                        |
| `datadog_yum_gpgkey_e09422b3`              | Sobreescribe la URL predeterminada por la clave `yum` de Datadog que se usa para verificar los paquetes del Agent v6.14 (y versiones posteriores). (ID de clave: `E09422B3`).                                                                                                                                                                                                                                                        |
| `datadog_yum_gpgkey_e09422b3_sha256sum`    | Sobreescribe la suma de comprobación predeterminada de la clave `datadog_yum_gpgkey_e09422b3`.                                                                                                                                                                                                                                                                                            |
| `datadog_zypper_repo`                      | Sobreescribe el repositorio `zypper` predeterminado de Datadog.                                                                                                                                                                                                                                                                                                                  |
| `datadog_zypper_repo_gpgcheck`             | Sobreescribe el valor `repo_gpgcheck` predeterminado (vacío). Si está vacío, el valor se configura de forma dinámica como `yes` cuando no se usa el valor personalizado `datadog_zypper_repo`; en caso contrario, se configura como `no`. **Nota**: La verificación de la firma de los metadatos del repositorio siempre está desactivada en el Agent v5.                                                                                                             |
| `datadog_zypper_gpgcheck`                  | Sobreescribe el valor `gpgcheck` predeterminado (`yes`), así que usa `no` para desactivar la verificación de la firma del paquete GPG.                                                                                                                                                                                                                                                           |
| `datadog_zypper_gpgkey`                    | **Eliminada en la versión 4.18.0** Sobreescribe la URL predeterminada por la clave `zypper` de Datadog que se usa para verificar los paquetes del Agent v5 y v6 (hasta la versión 6.13). (ID de clave: `4172A230`).                                                                                                                                                                                                                                     |
| `datadog_zypper_gpgkey_sha256sum`          | **Eliminada en la versión 4.18.0** Sobreescribe la suma de comprobación predeterminada de la clave `datadog_zypper_gpgkey`.                                                                                                                                                                                                                                                                                                  |
| `datadog_zypper_gpgkey_e09422b3`           | Sobreescribe la URL predeterminada por la clave `zypper` de Datadog que se usa para verificar los paquetes del Agent v6.14 (y versiones posteriores). (ID de clave: `E09422B3`).                                                                                                                                                                                                                                                     |
| `datadog_zypper_gpgkey_e09422b3_sha256sum` | Sobreescribe la suma de comprobación predeterminada de la clave `datadog_zypper_gpgkey_e09422b3`.                                                                                                                                                                                                                                                                                         |
| `datadog_agent_allow_downgrade`            | Configúrala como `yes` para permitir cambios a versiones anteriores del Agent en plataformas basadas en APT (pero ten cuidado; consulta `defaults/main.yml` para más detalles). **Nota**: En CentOS, esto solo funciona con Ansible 2.4 y versiones posteriores.                                                                                                                                                                                      |
| `datadog_enabled`                          | Configúrala como `false` para evitar que se inicie el servicio `datadog-agent` (se establece por defecto como `true`).                                                                                                                                                                                                                                                                              |
| `datadog_additional_groups`                | Una lista, o una cadena que contiene una lista de grupos adicionales separados entre sí por comas, para el `datadog_user` (solo en Linux).                                                                                                                                                                                                                                             |
| `datadog_windows_ddagentuser_name`         | El nombre del usuario de Windows que hay que crear/usar, en formato `<domain>\<user>` (solo en Windows).                                                                                                                                                                                                                                                                            |
| `datadog_windows_ddagentuser_password`     | La contraseña usada para crear el usuario o registrar el servicio (solo en Windows).                                                                                                                                                                                                                                                                                   |
| `datadog_apply_windows_614_fix`            | Define si se debe o no descargar y aplicar el archivo mencionado en `datadog_windows_614_fix_script_url` (solo en Windows). Consulta https://dtdg.co/win-614-fix para obtener más información. Puedes configurarla como `false` siempre que tus hosts no estén usando el Datadog Agent 6.14.\*.                                                                                                               |
| `datadog_macos_user`                       | El nombre del usuario con el que hay que ejecutar el Agent. Tiene que ser un usuario existente, no se creará de forma automática. Se establece por defecto como `ansible_user` (solo en macOS).                                                                                                                                                                                                                        |
| `datadog_macos_download_url`               | Sobreescribe la URL para descargar el instalador DMG (solo en macOS).                                                                                                                                                                                                                                                                                                  |

### Integraciones

Para descargar una integración (check) de Datadog, añade una entrada en la sección `datadog_checks`. La clave de primer nivel es el nombre del check, mientras que el valor es la carga útil del YAML que hay que escribir en el archivo de configuración. A continuación, te mostramos algunos ejemplos.

#### Check del proceso

Para definir dos instancias del check `process`, usa la configuración de abajo. Esto creará los archivos de configuración correspondientes:

* Agent v6 y v7: `/etc/datadog-agent/conf.d/process.d/conf.yaml`
* Agent v5: `/etc/dd-agent/conf.d/process.yaml`

```yml
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']
          - name: syslog
            search_string: ['rsyslog']
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
```

#### Check personalizado

Para configurar un check personalizado, usa la configuración de abajo. Esto creará los archivos de configuración correspondientes.

- Agent v6 y v7: `/etc/datadog-agent/conf.d/my_custom_check.d/conf.yaml`
- Agent v5: `/etc/dd-agent/conf.d/my_custom_check.yaml`

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
```

##### Checks personalizados de Python

Para transferir un check de Python al cuaderno de estrategias, usa la configuración de abajo.

Esta configuración requiere que la [estrategia y el rol][12] de Datadog sean parte de un cuaderno de estrategias más grande, en el que el valor transferido sea la ruta de archivo relativa a la tarea real en [Linux][13] o [Windows][14].

Esto solo está disponible para el Agent v6 (y posteriores).  

La clave debería ser el nombre del archivo creado en el directorio de checks `checks.d/{{ item }}.py`:

```yml
    datadog_checks:
      my_custom_check:
        init_config:
        instances:
          - some_data: true
    datadog_custom_checks:
      my_custom_check: '../../../custom_checks/my_custom_check.py'
```

#### Autodiscovery

Cuando se usa Autodiscovery, no se realiza ningún previo o posterior procesamiento en el YAML. Esto quiere decir que todas las secciones del YAML se añaden al archivo de configuración final, incluidos los `autodiscovery identifiers`.

En el siguiente ejemplo, se configura el check de PostgreSQL mediante **Autodiscovery**:

```yml
    datadog_checks:
      postgres:
        ad_identifiers:
          - db-master
          - db-slave
        init_config:
        instances:
          - host: %%host%%
            port: %%port%%
            username: username
            password: password
```

Para más información sobre [Autodiscovery][3], consulta la documentación de Datadog.

### Rastreo

Para activar la recopilación de trazas con el Agent v6 o v7, usa la siguiente configuración:

```yaml
datadog_config:
  apm_config:
    enabled: true
```

Para activar la recopilación de trazas con el Agent v5, usa la siguiente configuración:

```yaml
datadog_config:
  apm_enabled: "true" # has to be a string
```

### Live Processes

Para activar la recopilación de [Live Processes][6] con el Agent v6 o v7, usa la siguiente configuración:

```yml
datadog_config:
  process_config:
    enabled: "true" # type: string
```

Los posibles valores para `enabled` son: `"true"`, `"false"` (solo en la recopilación de contenedores) o `"disabled"` (que desactiva los Live Processes por completo).

#### Variables

Estas son las variables disponibles para los Live Processes:

* `scrub_args`: Permite borrar los argumentos sensibles de una línea de comandos del proceso (se establece por defecto como `true`).
* `custom_sensitive_words`: Expande la lista predeterminada de palabras sensibles que utiliza el limpiador de líneas de comandos.

#### Sondeo del sistema

El sondeo del sistema se configura en la variable `system_probe_config`. Cualquier variable anidada bajo ella se incluye en `system-probe.yaml`, en la sección `system_probe_config`.

La herramienta [Network Performance Monitoring][7] (NPM) se configura en la variable `network_config`. Cualquier variable anidada bajo ella se incluye en `system-probe.yaml`, en la sección `network_config`.

La herramienta [Cloud Workload Security][8] se configura en la variable `runtime_security_config`. Cualquier variable anidada bajo ella se incluye en `system-probe.yaml` y `security-agent.yaml`, en la sección `runtime_security_config`.

La herramienta [Universal Service Monitoring][17] (USM) se configura en la variable `service_monitoring_config`. Cualquier variable anidada bajo ella se incluye en `system-probe.yaml`, en la sección `service_monitoring_config`.

**Nota para usuarios de Windows**: Windows admite NPM con el Agent v6.27/v7.27 (y posteriores). Esta herramienta se distribuye como un componente opcional que solo se instala si `network_config.enabled` está configurado como true en el momento de instalar o actualizar el Agent. Por este motivo, las instalaciones existentes podrían requerir la desinstalación y reinstalación del Agent para instalar el componente NPM, a no ser que se actualice el Agent al mismo tiempo.

#### Ejemplo de configuración

```yml
datadog_config:
  process_config:
    enabled: "true" # type: string
    scrub_args: true
    custom_sensitive_words: ['consul_token','dd_api_key']
system_probe_config:
  sysprobe_socket: /opt/datadog-agent/run/sysprobe.sock
network_config:
  enabled: true
service_monitoring_config:
  enabled: true
runtime_security_config:
  enabled: true
```

**Nota**: Esta configuración funciona con el Agent 6.24.1/v7.24.1 (y posteriores). Si utilizas una versión anterior del Agent, consulta la documentación acerca de [Network Performance Monitoring][9] para descubrir cómo habilitar el system-probe.

En Linux, una vez que completes esta modificación, sigue los pasos que aparecen a continuación si instalaste una versión del Agent anterior a las versiones 6.18.0 o 7.18.0:

1. Inicia el system-probe: `sudo service datadog-agent-sysprobe start` **Nota**: Si el contenedor de servicio no está disponible en tu sistema, ejecuta el siguiente comando: `sudo initctl start datadog-agent-sysprobe`.
2. [Reinicia el Agent][10]: `sudo service datadog-agent restart`.
3. Habilita el system-probe para que se inicie durante el arranque: `sudo service enable datadog-agent-sysprobe`.

Para llevar a cabo una configuración manual, consulta la documentación acerca de [NPM][9].

#### versión 5 del Agent

Para activar la recopilación de [Live Processes][6] con Agent v5, usa la siguiente configuración:

```yml
datadog_config:
  process_agent_enabled: true
datadog_config_ex:
  process.config:
    scrub_args: true
    custom_sensitive_words: "<FIRST_WORD>,<SECOND_WORD>"
```

## Versiones

Por defecto, la versión principal actual del rol de Datadog de Ansible instala el Agent v7. Las variables `datadog_agent_version` y `datadog_agent_major_version` están disponibles para controlar la versión del Agent instalada.

En las versiones de este rol posteriores a la v4, cuando se usa `datadog_agent_version` para anclar una versión específica del Agent, el rol genera nombres de versiones según el SO para cumplir con las normas de nomenclatura de los sistemas operativos compatibles. Ejemplo:

- `1:7.16.0-1` para sistemas basados en Debian y SUSE
- `7.16.0-1` para sistemas basados en RedHat
- `7.16.0-1` para macOS
- `7.16.0` para Windows

Esto hace posible dirigirse a hosts con distintos sistemas operativos en una sola ejecución de Ansible. Ejemplo:

| Versión del Agent                            | Instala     | Sistema                |
|-------------------------------------|--------------|-----------------------|
| `datadog_agent_version: 7.16.0`     | `1:7.16.0-1` | Basado en Debian y SUSE |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | Basado en RedHat          |
| `datadog_agent_version: 7.16.0`     | `7.16.0-1`   | macOS                 |
| `datadog_agent_version: 7.16.0`     | `7.16.0`     | Windows               |
| `datadog_agent_version: 1:7.16.0-1` | `1:7.16.0-1` | Basado en Debian y SUSE |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0-1`   | Basado en RedHat          |
| `datadog_agent_version: 1:7.16.0-1` | `7.16.0`     | Windows               |

**Nota**: Si no se proporciona la versión, el rol usa `1` como epoch y `1` como número de versión.

**Agent v5 (versión antigua)**:

El rol de Datadog de Ansible es compatible con el Datadog Agent v5 únicamente en Linux. Para instalar el Agent v5, usa `datadog_agent_major_version: 5` para usar la última versión del Agent v5 o cambia `datadog_agent_version` a una versión específica del Agent v5. **Nota**: La variable `datadog_agent5` está obsoleta y, por tanto, se ha eliminado.

### Repositorios

#### Linux

Cuando las variables `datadog_apt_repo`, `datadog_yum_repo` y `datadog_zypper_repo` no están definidas, se usan los repositorios oficiales de Datadog para la versión principal que se define en `datadog_agent_major_version`:

| Núm. | Repositorio apt predeterminado                    | Repositorio yum predeterminado             | Repositorio zypper predeterminado               |
|---|-------------------------------------------|------------------------------------|-----------------------------------------|
| 5 | deb https://apt.datadoghq.com stable main | https://yum.datadoghq.com/rpm      | https://yum.datadoghq.com/suse/rpm      |
| 6 | deb https://apt.datadoghq.com stable 6    | https://yum.datadoghq.com/stable/6 | https://yum.datadoghq.com/suse/stable/6 |
| 7 | deb https://apt.datadoghq.com stable 7    | https://yum.datadoghq.com/stable/7 | https://yum.datadoghq.com/suse/stable/7 |

Para sobreescribir este comportamiento predeterminado, cambia las variables por algo que no sea una cadena vacía.

Si antes usabas las variables del Agent v5, usa las variables **nuevas** de abajo con el parámetro `datadog_agent_major_version` establecido como `5` o con `datadog_agent_version` anclado a una versión específica del Agent v5.

| Anteriores                          | Nuevas                   |
|------------------------------|-----------------------|
| `datadog_agent5_apt_repo`    | `datadog_apt_repo`    |
| `datadog_agent5_yum_repo`    | `datadog_yum_repo`    |
| `datadog_agent5_zypper_repo` | `datadog_zypper_repo` |

Desde la versión 4.9.0, la variable `use_apt_backup_keyserver` ya no existe, ya que las claves APT se obtienen a partir de https://keys.datadoghq.com.

#### Windows

Cuando la variable `datadog_windows_download_url` no está definida, se usa el paquete MSI oficial de Windows correspondiente a `datadog_agent_major_version`:

| Versión del Agent | URL predeterminada del paquete MSI de Windows                                                  |
|---------------|----------------------------------------------------------------------------------|
| 6             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi |
| 7             | https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi |

Para sobreescribir este comportamiento predeterminado, cambia esta variable por algo que no sea una cadena vacía.

#### macOS

Cuando la variable `datadog_macos_download_url` no está definida, se usa el paquete DMG oficial de macOS correspondiente a `datadog_agent_major_version`:

| Versión del Agent | URL predeterminada del paquete DMG de macOS                                |
|---------------|--------------------------------------------------------------|
| 6             | https://s3.amazonaws.com/dd-agent/datadog-agent-6-latest.dmg |
| 7             | https://s3.amazonaws.com/dd-agent/datadog-agent-7-latest.dmg |

Para sobreescribir el comportamiento por defecto, cambia esta variable a un valor distinto de una cadena vacía.

### Actualización

Para pasar del Agent v6 al v7, usa `datadog_agent_major_version: 7` para instalar la última versión o configura `datadog_agent_version` como una versión específica del Agent v7. Aplica una lógica parecida para pasar del Agent v5 al v6.

#### Integrations (Integraciones)

**Disponible para el Agent v6.8 (y posteriores)**

Usa el recurso `datadog_integration` para instalar una versión específica de una integración de Datadog. Ten en cuenta que el Agent ya viene con todas las integraciones instaladas. Este comando es útil para actualizar una integración concreta sin actualizar el Agent por completo. Para más información, consulta [Gestión de integraciones][4].

Acciones disponibles:

- `install`: Instala una versión específica de la integración.
- `remove`: Elimina una integración.

##### Datadog Marketplace

Las integraciones del [Datadog Marketplace][15] se pueden instalar con el recurso `datadog_integration`. **Nota**: Las integraciones del Marketplace se consideran "de terceros" y, por lo tanto, necesitan el parámetro `third_party: true`. Observa el siguiente ejemplo:

##### Sintaxis

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
```

Para instalar integraciones de terceros, establece `third_party` como true:

```yml
  datadog_integration:
    <INTEGRATION_NAME>:
      action: <ACTION>
      version: <VERSION_TO_INSTALL>
      third_party: true
```

##### Ejemplo

Este ejemplo instala la versión `1.11.0` de la integración de ElasticSearch y elimina la integración de `postgres`.

```yml
 datadog_integration:
   datadog-elastic:
     action: install
     version: 1.11.0
   datadog-postgres:
     action: remove
```

Para ver las versiones disponibles de las integraciones de Datadog, consulta el archivo `CHANGELOG.md` en el [repositorio integrations-core][5].

### Cambiar a versiones anteriores

Para cambiar a una versión anterior del Agent:

1. Define `datadog_agent_version` como una versión específica. Ejemplo: `5.32.5`.
2. Configura `datadog_agent_allow_downgrade` como `yes`.

**Notas:**

- No es posible cambiar a versiones anteriores en plataformas con Windows.

## Cuadernos de estrategias

A continuación, encontrarás algunos ejemplos de cuadernos de estrategias que pueden ser útiles cuando uses el rol de Datadog de Ansible.

El siguiente ejemplo envía datos al sitio de Datadog de EE. UU. (por defecto), activa logs, NPM y configura algunos checks.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
    datadog_agent_version: "7.16.0"
    datadog_config:
      tags:
        - "<KEY>:<VALUE>"
        - "<KEY>:<VALUE>"
      log_level: INFO
      apm_config:
        enabled: true
      logs_enabled: true  # available with Agent v6 and v7
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd' ]
          - name: syslog
            search_string: ['rsyslog' ]
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
      ssh_check:
        init_config:
        instances:
          - host: localhost
            port: 22
            username: root
            password: <YOUR_PASSWORD>
            sftp_check: True
            private_key_file:
            add_missing_keys: True
      nginx:
        init_config:
        instances:
          - nginx_status_url: http://example.com/nginx_status/
            tags:
              - "source:nginx"
              - "instance:foo"
          - nginx_status_url: http://example2.com:1234/nginx_status/
            tags:
              - "source:nginx"
              - "<KEY>:<VALUE>"

        #Log collection is available on Agent 6 and 7
        logs:
          - type: file
            path: /var/log/access.log
            service: myapp
            source: nginx
            sourcecategory: http_web_access
          - type: file
            path: /var/log/error.log
            service: nginx
            source: nginx
            sourcecategory: http_web_access
    # datadog_integration is available on Agent 6.8+
    datadog_integration:
      datadog-elastic:
        action: install
        version: 1.11.0
      datadog-postgres:
        action: remove
    network_config:
      enabled: true
```

### Agent v6

Este ejemplo instala el Agent v6 más reciente:

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_agent_major_version: 6
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### Configurar el sitio

Si usas un sitio distinto al predeterminado, `datadoghq.com`, ajusta la variable `datadog_site` a la URL correcta (p. ej., `datadoghq.eu`,  `us3.datadoghq.com`).

Este ejemplo envía datos al sitio de la UE.

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_site: "datadoghq.eu"
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### Windows

En Windows, elimina la opción `become: yes` para que el rol no falle. A continuación, se muestran dos métodos para hacer que los cuadernos de estrategias de ejemplo funcionen con hosts que usan Windows:

#### Archivo de inventario

Se recomienda usar el archivo de inventario. Configura la opción `ansible_become` como `no` en el archivo de inventario de cada host que use Windows:

```ini
[servers]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2
windows1 ansible_host=127.0.0.3 ansible_become=no
windows2 ansible_host=127.0.0.4 ansible_become=no
```

Para evitar repetir la misma configuración en todos los hosts que usen Windows, agrúpalos y configura la variable en nivel de grupo:

```ini
[linux]
linux1 ansible_host=127.0.0.1
linux2 ansible_host=127.0.0.2

[windows]
windows1 ansible_host=127.0.0.3
windows2 ansible_host=127.0.0.4

[windows:vars]
ansible_become=no
```

#### Archivo del cuaderno de estrategias

Alternativamente, si tu cuaderno de estrategias **solo funciona en hosts con Windows**, usa lo siguiente en el archivo del cuaderno de estrategias:

```yml
- hosts: servers
  roles:
    - { role: datadog.datadog }
  vars:
    ...
```

**Nota**: Esta configuración no funciona en los hosts con Linux. Úsala solo si el cuaderno de estrategias es específico para hosts con Windows. De lo contrario, decántate por el [método del archivo de inventario](#inventory-file).

### Desinstalación

En Windows, es posible desinstalar el Agent usando el siguiente código en tu rol de Ansible:

```yml
- name: Check If Datadog Agent is installed
  win_shell: |
    (get-wmiobject win32_product -Filter "Name LIKE '%datadog%'").IdentifyingNumber
  register: agent_installed_result
- name: Set Datadog Agent installed fact
  set_fact:
    agent_installed: "{{ agent_installed_result.stdout | trim }}"
- name: Uninstall the Datadog Agent
  win_package:
    product_id: "{{ agent_installed }}"
    state: absent
  when: agent_installed != ""
```

Sin embargo, si deseas tener un mayor control sobre los parámetros de desinstalación, puedes usar el código que aparece a continuación.
En este ejemplo, se añade la marca '/norestart' y se especifica una ubicación personalizada para los logs de desinstalación:

```yml
- name: Check If Datadog Agent is installed
  win_stat:
  path: 'c:\Program Files\Datadog\Datadog Agent\bin\agent.exe'
  register: stat_file
- name: Uninstall the Datadog Agent
  win_shell: start-process msiexec -Wait -ArgumentList ('/log', 'C:\\uninst.log', '/norestart', '/q', '/x', (Get-WmiObject -Class Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
  when: stat_file.stat.exists == True
```

## Solucionar problemas

### Debian Stretch

**Nota:** Esta información es aplicable a las versiones del rol anteriores a la v4.9.0. El rol dejó de usar el módulo `apt_key`en la v4.9.0.

En Debian Stretch, el módulo `apt_key` que usa el rol requiere una dependencia de sistema adicional para funcionar correctamente. Puesto que el módulo no proporciona la dependencia (`dirmngr`), añade la siguiente configuración a tus cuadernos de estrategia para usar este rol:

```yml
---
- hosts: all
  pre_tasks:
    - name: Debian Stretch requires the dirmngr package to use apt_key
      become: yes
      apt:
        name: dirmngr
        state: present
  roles:
    - { role: datadog.datadog, become: yes }
  vars:
    datadog_api_key: "<YOUR_DD_API_KEY>"
```

### CentOS 6/7 con el intérprete de Python 3 y Ansible 2.10.x o una versión anterior

El módulo `yum` de Python, que se usa en este rol para instalar el Agent en hosts basados en CentOS, solo está disponible en Python 2 si se usa Ansible 2.10.x o una versión anterior. En estos casos, habría que utilizar el gestor de paquetes `dnf`.

Sin embargo, `dnf` y el módulo `dnf` de Python no se instalan por defecto en hosts basados en CentOS si la versión es anterior a CentOS 8. En ese caso, no es posible instalar el Agent cuando se usa un intérprete de Python 3.

El rol falla prematuramente cuando se detecta esta situación como indicativo de que se necesita Ansible 2.11 (o una versión posterior) o un intérprete de Python 2 para instalar el Agent en una versión de CentOS/RHEL anterior a la 8.

Para evitar esta detección de fallo prematuro (por ejemplo, si `dnf` y el paquete `python3-dnf` están disponibles en tu host), establece la variable `datadog_ignore_old_centos_python3_error` como `true`.

### Windows

Debido a un error crítico en las versiones del Agent `6.14.0` y `6.14.1` para Windows, la instalación de estas versiones está bloqueada (a partir de la versión `3.3.0` de este rol).

**NOTA:** Ansible falla en Windows si `datadog_agent_version` es `6.14.0` o `6.14.1`. Usa `6.14.2` o una versión posterior.

Si vas a pasar de la versión **6.14.0 a la 6.14.1 en Windows**, sigue estos pasos:

1. Actualiza el rol de Ansible actual `datadog.datadog` a la versión más reciente (`>=3.3.0`).
2. Define `datadog_agent_version` como `6.14.2` o una versión posterior (por defecto, la más reciente).

Para más detalles, consulta [Critical Bug in Uninstaller for Datadog Agent 6.14.0 and 6.14.1 on Windows][11] (Error crítico en el desinstalador del Datadog Agent 6.14.0 y 6.14.1 para Windows).

### Error en Ubuntu 20.04 debido a service_facts

Ejecutar el módulo `service_facts` en Ubuntu 20.04 produce el siguiente error:

```
localhost | FAILED! => {
    "changed": false,
    "msg": "Malformed output discovered from systemd list-unit-files: accounts-daemon.service                    enabled         enabled      "
}
```

Para solucionarlo, [actualiza Ansible a `v2.9.8` o a una versión posterior][16].

[1]: https://galaxy.ansible.com/Datadog/datadog
[2]: https://github.com/DataDog/ansible-datadog
[3]: https://docs.datadoghq.com/es/agent/autodiscovery
[4]: https://docs.datadoghq.com/es/agent/guide/integration-management/
[5]: https://github.com/DataDog/integrations-core
[6]: https://docs.datadoghq.com/es/infrastructure/process/
[7]: https://docs.datadoghq.com/es/network_performance_monitoring/
[8]: https://docs.datadoghq.com/es/security_platform/cloud_workload_security/getting_started/
[9]: https://docs.datadoghq.com/es/network_performance_monitoring/installation/?tab=agent#setup
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
[11]: https://app.datadoghq.com/help/agent_fix
[12]: https://docs.ansible.com/ansible/latest/reference_appendices/playbooks_keywords.html#playbook-keywords
[13]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-linux.yml
[14]: https://github.com/DataDog/ansible-datadog/blob/main/tasks/agent-win.yml
[15]: https://www.datadoghq.com/blog/datadog-marketplace/
[16]: https://github.com/ansible/ansible/blob/stable-2.9/changelogs/CHANGELOG-v2.9.rst#id61
[17]: https://docs.datadoghq.com/es/tracing/universal_service_monitoring/?tab=configurationfiles#enabling-universal-service-monitoring