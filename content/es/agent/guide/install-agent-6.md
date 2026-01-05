---
further_reading:
- link: agent/
  tag: Documentación
  text: El Datadog Agent
private: true
title: Instalar el Datadog Agent 6
---

Esta guía cubre la instalación del Agent 6. En Datadog se recomienda instalar o actualizar al Agent 7 para obtener las últimas funciones. Para obtener información sobre la instalación de la última versión del Agent, sigue las [Instrucciones de instalación de la última versión del Agent ][1]. Para obtener información sobre la actualización al Agent 7 desde una versión anterior, consulta [Actualización al Datadog Agent v7][2].

## macOS

- El Datadog Agent versión 6 requiere macOS 10.12 o superior. 
- El Agent 6.34 es la última versión compatible con macOS 10.12.
- El Agent 6.38 es la última versión del Agent 6 para macOS. 

### Instalación del Agent

#### Línea de comandos

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de la API de Datadog:
{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="${site}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

El Agent se ejecuta al iniciar sesión. Puedes desactivarlo desde la bandeja del sistema.

#### LaunchDaemon

El Datadog Agent puede instalarse como LaunchDaemon en todo el sistema especificando `DD_SYSTEMDAEMON_INSTALL=true` y `DD_SYSTEMDAEMON_USER_GROUP=username:groupname`. Sustituye `MY_API_KEY` por tu clave de la API de Datadog:

{{< code-block lang="shell" >}}
DD_SYSTEMDAEMON_INSTALL=true DD_SYSTEMDAEMON_USER_GROUP=username:groupname DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

El Agent se ejecuta al iniciarse el sistema. Se debe proporcionar un usuario no raíz válido y su grupo utilizando la variable `DD_SYSTEMDAEMON_USER_GROUP`. El proceso del Agent se ejecuta en este usuario y grupo.

La aplicación de la bandeja del sistema no es compatible con las instalaciones de LaunchDaemon en todo el sistema.

#### Interfaz gráfica de usuario (GUI)

1. Descarga e instala el [paquete de DMG][3].
1. Añade la siguiente línea a `/opt/datadog-agent/etc/datadog.yaml`, sustituyendo `MY_API_KEY` por tu clave de la API de Datadog:
   {{< code-block lang="shell" >}}
api_key: MY_API_KEY
sitio: datad0g.com
{{< /code-block >}}

### Administrar el Agent

Para administrar el Agent, utiliza:
- la aplicación del Datadog Agent en la bandeja del sistema para una instalación en un solo usuario.
- `launchctl` para instalar LaunchDaemon en todo el sistema.
- el comando `datadog-agent`. El binario está en `/usr/local/bin`.

Activar o desactivar integraciones en `/opt/datadog-agent/etc/conf.d.`

## Windows

A partir de la versión 6.11.0, el núcleo y los componentes de APM/trazas de Windows Agent se ejecutan en la cuenta `ddagentuser` y se crean en el momento de la instalación, en lugar de ejecutarse en la cuenta `LOCAL_SYSTEM`. Si estás actualizando desde una versión del Datadog Agent 6.x a 6.11 o superior, revisa la documentación del [usuario de Windows Agent][10] antes de realizar la actualización.

Los enlaces a todas las versiones disponibles del instalador de Windows están disponibles en el [formato JSON][6].

### Instalación del Agent

#### Interactivo

1. Descarga y ejecuta el [instalador del Datadog Agent][4].
1. Ejecuta el instalador (como administrador) abriendo `datadog-agent-6-latest.amd64.msi`.
1. Sigue las instrucciones, acepta el contrato de licencia e introduce tu clave de la API de Datadog.
1. Introduce tu región de Datadog: {{< region-param key=dd_site code="true" >}}.
1. Opcionalmente, inicia el administrador del Datadog Agent cuando se te solicite.

#### Sin vigilancia

1. Descarga y ejecuta el [instalador del Datadog Agent][4].
1. Ejecuta uno de los siguientes comandos en el directorio donde descargaste el instalador, sustituyendo `MY_API_KEY` por tu clave de la API de Datadog:
   - Aviso del comando:
     {{< code-block lang="shell" >}}
start /wait msiexec /qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"
{{< /code-block >}}
   - Powershell:
     {{< code-block lang="powershell" >}}
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"'
{{< /code-block >}}

`HOSTNAME` y `TAGS` son valores opcionales. Consulta la [documentación de Windows Agent][5] para conocer todas las opciones disponibles.

#### Implementación en Azure

Para instalar el Agent en Azure, consulta la [documentación de Microsoft Azure][8].

## Linux y Unix

{{< tabs >}}

{{% tab "Debian" %}}
### Instalación en un solo paso

El comando de un solo paso instala los paquetes de APT para el Datadog Agent y te pide la contraseña.
- Si el Agent aún no está instalado en tu equipo y no deseas que se inicie automáticamente tras la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.
- Si dispones de un archivo de configuración actual del Agent, los valores actuales se conservarán durante la actualización.
- Puedes configurar algunas de las opciones del Agent durante el proceso de instalación inicial. Para obtener más información, check las [opciones de configuración de install_script][101].

Para instalar el Agent, ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de la API de Datadog:
```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Instalación en varios pasos

1. Configura APT para que pueda descargarse a través de HTTPS e instala `curl` y `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configura el repositorio de Debian de Datadog en el sistema y crea un conjunto de claves de archivo de Datadog:
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```

1. Si ejecutas Debian v8 o una versión anterior, copia el conjunto de claves en `/etc/apt/trusted.gpg.d`:
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Actualiza tu repositorio local de APT e instala el Agent:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Opcionalmente, si actualizas desde el Agent 5.17 o superior, importa tu configuración actual del Agent 5:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no vas a actualizar y no deseas utilizar una configuración antigua, copia la configuración de ejemplo e instala el Agent. Sustituye `MY_API_KEY` por tu clave de la API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Configurar la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/'
                    /etc/datadog-agent/datadog.yaml"
   ```
1. Asegúrate de que los permisos del usuario del Agent sean correctos::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Inicia el Agent:
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Ubuntu" %}}
### Instalación en un solo paso

El comando de un solo paso instala los paquetes de APT para el Datadog Agent y te pide la contraseña. Si el Agent aún no está instalado en el equipo y no quieres que se inicie automáticamente después de la instalación, añade `DD_INSTALL_ONLY=true` al principio del comando antes de ejecutarlo.

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de la API de Datadog:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos

1. Configura APT para que pueda descargarse a través de HTTPS e instala `curl` y `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configura el repositorio de Debian de Datadog en el sistema y crea un conjunto de claves de archivo de Datadog:
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. Si ejecutas Ubuntu 14 o una versión anterior, copia el conjunto de claves en `/etc/apt/trusted.gpg.d`:
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Actualiza tu repositorio local de APT e instala el Agent:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Opcionalmente, si actualizas desde el Agent 5.17 o superior, importa tu configuración del Agent 5 actual:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no vas a actualizar y no deseas utilizar una configuración antigua, copia la configuración de ejemplo e instala el Agent. Sustituye `MY_API_KEY` por tu clave de la API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Configura la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Asegúrate de que los permisos del usuario del Agent sean correctos::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Inicia el Agent: 
   - Ubuntu 16.04 y superiores:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Ubuntu 14.04:
     ```shell
     sudo initctl start datadog-agent
     ```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### Instalación en un solo paso

El comando de un solo paso instala los paquetes de YUM para el Datadog Agent y te pide la contraseña.
- Si el Agent aún no está instalado en tu máquina y no deseas que se inicie automáticamente tras la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.
- Si dispones de un archivo de la configuración actual del Agent, los valores actuales se conservarán durante la actualización.
- Puedes configurar algunas de las opciones del Agent durante el proceso de la instalación inicial. Para obtener más información, check las [opciones de configuración de install_script][101].

1. Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de la API de Datadog:
   ```shell
   DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
   ```

1. For Amazon Linux 2022 installations on Agent version <= 6.39. The Agent requires the `libxcrypt-compat` package:
   ```shell
   dnf install -y libxcrypt-compat
   ```

### Multi-step install

1. On an x86_64 host, set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/stable/6/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. On an arm64 host, set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/stable/6/aarch64/ 
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. If upgrading from Agent 5 or 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Start the Agent: 
   - Amazon Linux 2.0:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Amazon Linux 1.0:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "CentOS and RedHat" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=0
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

   **Note**: The `repo_gpgcheck=0` option is a workaround for [a bug in DNF][102].

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Start the Agent: 
   - Centos or Red Hat 7 and higher:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Centos or Red Hat 6:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
[102]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}

{{% tab "Alma, Oracle, and Rocky" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Restart the Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Fedora" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Restart the Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Suse" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Instalación en varios pasos

1. Set up the Datadog YUM repo by creating `/etc/zypp/repos.d/datadog.repo` with the following configuration:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=hhttps://yum.datadoghq.com/suse/stable/6/x86_64
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local zypper repo and install the Agent:
   ```shell
   sudo zypper refresh
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   sudo zypper install datadog-agent
   ```

1. Opcionalmente, si actualizas desde el Agent 5.17 o superior, importa tu configuración actual del Agent 5:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no vas a actualizar y no deseas utilizar una configuración antigua, copia la configuración de ejemplo e instala el Agent. Sustituye `MY_API_KEY` por tu clave de la API de Datadog:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configurar la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Asegúrate de que los permisos del usuario del Agent sean correctos::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Restart the Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "AIX" %}}
### Instalación en un solo paso

The one-step command installs the latest BFF package for the Datadog Agent and prompts you for your password if necessary. Si el Agent aún no está instalado en tu equipo y no deseas que se inicie automáticamente tras la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de la API de Datadog:
```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

### Upgrade from a previous installation

To install the Agent while keeping your existing configuration, run the following command:
```shell
DD_UPGRADE=true DD_SITE="datad0g.com" ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

For a full list of the available installation script environment variables, see [Basic Agent Usage for AIX][101].

### Instalación en varios pasos

1. Download the preferred BFF from the [datadog-unix-agent][102] repo releases.

1. Install the artifact as root with `installp`:
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```

1. If you don't have an existing configuration file, copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configurar la región de Datadog:
   ```shell
   sudo sh -c "sed \'s/# site:.*/site: datad0g.com/\' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure that the Datadog Agent has the correct permissions:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```

1. Stop the Agent service:
   ```shell
   sudo stopsrc -s datadog-agent
   ```

1. Verify the Agent service has stopped:
   ```
   sudo lssrc -s datadog-agent
   ```

1. Restart the Agent service:
   ```shell
   sudo startsrc -s datadog-agent
   ```

[101]: /es/agent/basic_agent_usage/aix/#installation
[102]: https://github.com/DataDog/datadog-unix-agent/releases
{{% /tab %}}

{{< /tabs >}}

## Cloud and containers

{{< tabs >}}

{{% tab "Kubernetes" %}}

Run the Datadog Agent directly in your Kubernetes cluster to start collecting your cluster and applications metrics, traces, and logs. You can deploy the Agent with a Helm chart, [the Datadog Operator][101] or directly with [a DaemonSet][102]. For more information about installing the Datadog Agent on different distributions, see the [Kubernetes distributions documentation][103].

### Installing the Datadog Agent

To install the chart with a custom release name `RELEASE_NAME`:

1. [Install Helm][104].
1. Add the Datadog Helm repository:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   ```

1. Fetch the latest version of newly added charts:
   ```shell
   helm repo update
   ```

1. Create an empty `values.yaml` file, and override any of the [default values][105] if desired. See the [Datadog `helm-charts` repo][106] for examples. 
1. Deploy the Datadog Agent, replacing `MY_API_KEY` with your Datadog API key:
   **With Helm v3+**:
   ```shell
   helm install RELEASE_NAME -f datadog-values.yaml --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   **With Helm v1 or v2**:
   ```shell
   helm install -f datadog-values.yaml --name RELEASE_NAME --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   This chart adds the Datadog Agent to all nodes in your cluster using a DaemonSet. Soon after installation, Datadog begins to report hosts and metrics data in your account.

### Enabling log collection

To enable log collection with Helm, update your `datadog-values.yaml` file with the following log collection configuration:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```    

Then upgrade your Datadog Helm chart:
```shell
helm upgrade -f datadog-values.yaml RELEASE_NAME datadog/datadog
```

### Enabling trace collection

Follow the dedicated [APM setup documentation][107] to learn how to collect your application traces in a Kubernetes environment.

### Further Reading

For information on available Agent features, see the [Kubernetes documentation][108].

[101]: /es/containers/kubernetes/?tab=operator
[102]: /es/containers/kubernetes/?tab=daemonset
[103]: /es/containers/kubernetes/distributions/
[104]: https://v3.helm.sh/docs/intro/install/
[105]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[106]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[107]: https://dd-dev-local.datad0g.com/apm/service-setup?architecture=container-based&collection=Helm%20Chart%20%28Recommended%29&environment=kubernetes
[108]: /es/containers/kubernetes/
{{% /tab %}}

{{% tab "Docker" %}}
### Instalación en un solo paso

The one-step installation command runs a signed Docker container which embeds the Datadog Agent to monitor your host. The Docker integration is enabled by default, as well as [Autodiscovery][101] in automatic configuration mode.

<div class="alert alert-info">You must not run more than one Datadog Agent per node. Running multiple Agents may result in unexpected behavior.</a></div>

For a one-step install, run the following command. Replace `MY_API_KEY` with your Datadog API key:

On Amazon Linux v2:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" gcr.io/datadoghq/agent:6
```

On other operating systems:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" gcr.io/datadoghq/agent:6
```

#### Troubleshooting

If the one-step installation command does not work, it's possible that your system mounts the `cgroup` directory in an unexpected place or does not use CGroups for memory management. CGroups are required for the Docker check to succeed. To enable CGroups, see [the Setup documentation][102]. 

If CGroups are enabled, but the check is failing because of an unexpected `cgroup` directory location:
1. Run `mount | grep "cgroup type tmpfs"` to retrieve the location of the `cgroup` directory.
1. Replace the first occurrence of `/sys/fs/cgroup` in the one-step installation command with the location of the `cgroup` directory.

### Send custom metrics with DogStatsD

By default, DogStatsD only listens to localhost. To listen to DogStatsD packets from other containers:
1. Add `-e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` to the container's parameters. 
1. Bind the container's statsd port to the hosts's IP by adding the `-p 8125:8125/udp` option to the container's parameters.
1. Configure your client library to send UDP packets to the hosts's IP.

### Customize your Agent configuration

- For information on configuring the Agent, see [Docker Agent for Docker, containerd, and Podman][103].
- To tune Autodiscovery, see [Docker Integrations Autodiscovery][104].

[101]: /es/containers/docker/integrations/?tabs=docker
[102]: /es/containers/docker/?tab=standard#setup
[103]: /es/containers/docker/?tab=standard
[104]: /es/containers/docker/integrations/?tab=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
Running CoreOS Container Linux is supported with the Docker runtime. For installation instructions, see [Docker][1].

To run CoreOS Tectonic on Kubernetes, see [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
Starting with version 6.1, the Datadog Agent supports monitoring OpenShift Origin and Enterprise clusters. Depending on your needs and the security constraints of your cluster, three deployment scenarios are supported:

- [Restricted SCC operations][101]
- [Host network SCC operations][102]
- [Custom Datadog for all features][103]

To install OpenShift, see the [Kubernetes installation instructions](?tab=kubernetes#cloud-and-containers). The Kubernetes integration targets OpenShift 3.7.0+ by default. For older versions of OpenShift, you must complete additional installation steps. For more information, see the [OpenShift integration documentation][104].

[101]: /es/integrations/openshift/?tab=helm#restricted-scc-operations
[102]: /es/integrations/openshift/?tab=helm#host
[103]: /es/integrations/openshift/?tab=helm#custom-datadog-scc-for-all-features
[104]: /es/integrations/openshift/?tab=helm#installation
{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">The Datadog Agent BOSH release only works on Ubuntu and Red Hat stemcells.</a></div>

1. Upload the Datadog Agent release to your BOSH Director:

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. Configure Datadog as an addon in your runtime config. Replace `MY_API_KEY` with your Datadog API key::

   ```yaml
   # runtime.yml
   ---
   releases:
   - name: datadog-agent
      version: $UPLOADED_VERSION # e.g. 1.0.5140

   addons:
   - name: datadog
   jobs:
   - name: dd-agent
      release: datadog-agent
   properties:
      dd:
         use_dogstatsd: yes
         dogstatsd_port: 18125 # Many Cloud Foundry deployments have their own StatsD listening on port 8125
         api_key: MY_API_KEY
         tags: ["my-cloud-foundry-deployment"] # optional. Add any tags you wish
         # Optionally, enable any Agent Checks here
         # integrations:
         #   directory:
         #     init_config: {}
         #     instances:
         #       directory: "."
   ```

3. Add the runtime to your [runtime config][101]:

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. Redeploy any existing deployments:
   ```shell
   # BOSH cli v1
   bosh deployment myDeployment.yml
   bosh -n deploy

   # BOSH cli v2
   bosh -n -d myDeployment deploy myDeployment.yml
   ```

[101]: https://bosh.io/docs/runtime-config/   
{{% /tab %}}

{{< /tabs >}}

## Configuration management

{{< tabs >}}
{{% tab "Ansible" %}}

Installing the Agent with Ansible requires Ansible version 2.10 or higher.

<div class="alert alert-info">The Datadog Ansible collection supports most Debian, RHEL-based and SUSE-based Linux distributions, macOS, and Windows.<br></div>

### Prerequisites

#### Windows
Before you can use the Datadog Ansible Collection to manage Windows hosts, you must install the `ansible.windows` collection:
```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE and SLES

Before you can use the Datadog Ansible Collection to manage openSUSE/SLES hosts, you must install the `community.general` collection:

```shell
ansible-galaxy collection install community.general
```

### Install Datadog

1. Install the Datadog Ansible collection from Ansible Galaxy on your Ansible server:
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - The Datadog Ansible collection is also available through the [Red Hat Automation Hub][101] where it is officially certified by Red Hat.
   - Installing the collection is recommended. If needed, you can also install Datadog using the [standalone role][102].

2. To deploy the Datadog Agent on hosts, add the Datadog role and your API key to your playbook. Replace `MY_API_KEY` with your Datadog API key:
   ```yaml
   - hosts: servers
   tasks:
      - name: Import the Datadog Agent role from the Datadog collection
         import_role:
         name: datadog.dd.agent
   vars:
      datadog_api_key: "MY_API_KEY"
      datadog_agent_major_version: 6
      datadog_site: "datad0g.com"
   ```

   To ensure that the Agent can group your hosts together, only use node hostnames that the Datadog Agent is tracking. You can check what hostnames the Agent is tracking using the following command:

   ```shell
   sudo datadog-agent status
   ```

## Specific Agent checks

To use a specific Agent check or integration on one of your nodes, you can use the `datadog_checks` variable. Here is an example for the process check:
```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "MY_API_KEY"
    datadog_agent_major_version: 6
    datadog_site: "datad0g.com"
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

You can find more examples of the Agent role usage on the GitHub repo for the [standalone role][103].

### Metrics and events

To get metrics and events on Datadog after Ansible runs, see the Ansible callback project's [GitHub page][104].

[101]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[102]: /es/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[103]: https://github.com/DataDog/ansible-datadog/#role-variables
[104]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">Starting with version 2.9.0, the <code>datadog_agent</code> module supports both Windows and Linux nodes. Previous versions of the datadog_agent module only support Linux nodes.</a></div>

## Requirements:
- Requires Puppet Open Source version >= 4.6 or Puppet Enterprise version >= 2016.4

## Install the Agent

1. Install the `datadog_agent` module from the [Puppet Forge][101] on your Puppet server:
   - For fresh installs, run the `module install command`:
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - If the module is already installed, upgrade it:
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. To deploy the Datadog Agent on nodes, add this parametrized class to your manifests. Replace `MY_API_KEY` with your Datadog API key:
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY",
         datadog_site => "datad0g.com",
         agent_major_version => 6,
      }
   }
   ```

   To ensure that the Agent can group your hosts together, only use node hostnames that the Datadog Agent is tracking. You can check what hostnames the Agent is tracking using the following command:

   ```shell
   sudo datadog-agent status
   ```

3. Enable reporting to Datadog on your Puppet server:
   1. Add the following parameters to `/etc/puppet/puppet.conf`:
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```

   1. In your manifest, add the `puppet_run_reports` option to your Puppet server. For example:
      ```puppet
      node "puppet" {
         class { "datadog_agent":
            api_key => "MY_API_KEY",
            datadog_site => "datad0g.com",
            agent_major_version => 6,
            puppet_run_reports => true,
         }
      }
      ```
1. Run Puppet on your Puppet server to install all necessary dependencies.
1. Restart your Puppet server to begin receiving Puppet data in Datadog.

## Specific Agent checks

To use a specific Agent check or integration on one of your nodes, see the relevant [integration manifest][102] for a code sample. Here is an example for the elasticsearch integration:

```puppet
node "elastic-node1.mydomain.com" {
    class { "datadog_agent":
        api_key => "MY_API_KEY",
        datadog_site => "datad0g.com",
        agent_major_version => 6,
    }
    include "datadog_agent::integrations::elasticsearch"
}
```

Refer to the [GitHub repository of the module][103] for more examples and advanced use cases.

[101]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[102]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations
[103]: https://github.com/DataDog/puppet-datadog-agent

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Requires Chef version 10.14.x or higher.</a></div>

1. Add the Datadog cookbook:
   - If you are using [Berkshelf][101], add the cookbook to your Berksfile:
      ```shell
      cookbook 'datadog', '~> 4.0'
      ```

   - If you're not using Berkshelf, install the cookbook in to your repository using Knife:
     ```shell
     knife cookbook site install datadog 
     ```

1. Set the Datadog-specific attributes in either a role, environment, or another recipe. Replace `MY_API_KEY` with your Datadog API key:
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"

   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"

   # Enable install for Agent version 6
   node.default['datadog']['agent_major_version'] = 6

   # Set the Datadog site
   node.default['datadog']['site'] = "datad0g.com"
   ```

1. Upload the updated cookbook to your Chef server:
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. Add the cookbook to your node's `run_list` or `role`:
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. Wait for the next scheduled `chef-client` run.


For more information and examples, see the [Agent GitHub repository][102].

[101]: https://docs.chef.io/workstation/berkshelf/
[102]: https://github.com/DataDog/chef-datadog

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">The Datadog Saltstack formula only supports Debian-based and RedHat-based systems.<br><br>
The following instructions add the Datadog formula to the <code>base</code> Salt environment. To add it to another Salt environment, replace references to <code>base</code> with the name of your Salt environment.</div>

<!-- vale Datadog.inclusive = NO -->

### Install using `gitfs_remotes`
1. Install the [Datadog formula][101] in the base environment of your Salt Master node, using the `gitfs_remotes` option in your Salt Master configuration file (by default `/etc/salt/master`):
   ```yaml
   fileserver_backend:
   - roots # Active by default, necessary to be able to use the local salt files we define in the next steps
   - gitfs # Adds gitfs as a fileserver backend to be able to use gitfs_remotes

   gitfs_remotes:
   - https://github.com/DataDog/datadog-formula.git:
     - saltenv:
       - base:
       - ref: 3.0 # Pin here the version of the formula you want to use
   ```

1. Restart your Salt Master service:
   ```shell
   systemctl restart salt-master
   ```
   or 
   ```shell
   service salt-master restart
   ```

### Install by cloning the Datadog formula

1. Clone the [Datadog formula][101] on your Salt Master node:
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas
   git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Add the cloned formula to the base environment in the `file_roots` of your Salt Master configuration file (by default `/etc/salt/master`):
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## Deploy the Agent to your hosts

1. Add the Datadog formula to your top file (by default `/srv/salt/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Add a `datadog.sls` pillar file to your pillar directory (by default `/srv/pillar/`) and add your API key. Replace `MY_API_KEY` with your Datadog API key:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT6_VERSION>
   ```

1. Add the `datadog.sls` pillar file to the top pillar file (by default `/srv/pillar/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. To use a specific Agent check or integration on one of your hosts, you can use the checks variable. Here is an example for the directory integration:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT6_VERSION>
     checks:
       directory:
         config:
           instances:
             - directory: "/srv/pillar"
               name: "pillars"
   ```         

Refer to the formula [GitHub repository][101] for logs configuration, check examples, and advanced use cases.
<!-- vale Datadog.inclusive = YES -->
[101]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Install from source

Follow [the instructions in the Agent GitHub repository][11] to build the Agent 6 `.deb` and `.rpm` packages on Linux with Docker.

Alternatively, you can build the Agent binary for version 6 following the [Getting Started instructions][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /es/agent/versions/upgrade_to_agent_v7/
[3]: https://s3.amazonaws.com/dd-agent/datadogagent.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
[5]: /es/agent/basic_agent_usage/windows/
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /es/integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
[10]: /es/agent/guide/windows-agent-ddagent-user/
[11]: https://github.com/DataDog/datadog-agent/blob/main/docs/dev/agent_omnibus.md#building-inside-docker-linux-only-recommended
[12]: https://github.com/DataDog/datadog-agent#getting-started