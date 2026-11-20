---
further_reading:
- link: agent/
  tag: Documentación
  text: El Datadog Agent
private: true
title: Instalar Datadog Agent 6
---
Esta guía cubre la instalación del Agent 6. Datadog recomienda instalar o actualizar al Agent 7 para obtener las funciones más recientes. Para obtener información sobre cómo instalar la versión más reciente del Agent, siga las [Instrucciones de instalación del Agent más reciente][1]. Para obtener información sobre cómo actualizar al Agent 7 desde una versión anterior, consulte [Actualizar a Datadog Agent v7][2].

## macOS {#macos}

- La versión 6 de Datadog Agent requiere macOS 10.12 o superior. 
- Agent 6.34 es la última versión compatible con macOS 10.12.
- Agent 6.38 es la última versión de Agent 6 para macOS. 

### Instale el Agent {#install-the-agent}

#### Línea de comandos {#command-line}

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:
{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="${site}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

El Agent se ejecuta al iniciar sesión. Puede desactivarlo desde la bandeja del sistema.

#### LaunchDaemon {#launchdaemon}

El Datadog Agent puede instalarse como un LaunchDaemon para todo el sistema especificando `DD_SYSTEMDAEMON_INSTALL=true` y `DD_SYSTEMDAEMON_USER_GROUP=username:groupname`. Reemplace `MY_API_KEY` con su clave de API de Datadog:

{{< code-block lang="shell" >}}
DD_SYSTEMDAEMON_INSTALL=true DD_SYSTEMDAEMON_USER_GROUP=username:groupname DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

El Agent se ejecuta al iniciar el sistema. Se debe proporcionar un usuario que no sea root válido y su grupo utilizando la variable `DD_SYSTEMDAEMON_USER_GROUP`. El proceso del Agent se ejecuta bajo este usuario y grupo.

La aplicación de la bandeja del sistema no es compatible con instalaciones de LaunchDaemon para todo el sistema.

#### GUI {#gui}

1. Descargue e instale el [paquete DMG][3].
1. Agregue la siguiente línea a `/opt/datadog-agent/etc/datadog.yaml`, reemplazando `MY_API_KEY` con su clave de API de Datadog:
   {{< code-block lang="shell" >}}
api_key: MY_API_KEY
site: datad0g.com
{{< /code-block >}}

### Administre el Agent {#manage-the-agent}

Para administrar el Agent, utilice:
- la aplicación Datadog Agent en la bandeja del sistema para una instalación de usuario único.
- `launchctl` para una instalación de LaunchDaemon en todo el sistema.
- el comando `datadog-agent`. El binario se encuentra en `/usr/local/bin`.

Habilite o deshabilite integraciones en `/opt/datadog-agent/etc/conf.d.`

## Windows {#windows}

A partir de la versión 6.11.0, los componentes principales y de APM/trace de Windows Agent se ejecutan bajo la cuenta `ddagentuser` y se crean durante la instalación, en lugar de ejecutarse bajo la cuenta `LOCAL_SYSTEM`. Si está actualizando desde una versión 6.x de Datadog Agent a la 6.11 o superior, revise la documentación del [usuario de Windows Agent][10] antes de realizar la actualización.

Los enlaces a todas las versiones disponibles del instalador de Windows están disponibles en [formato JSON][6].

### Instale el Agent {#install-the-agent-1}

#### Interactivo {#interactive}

1. Descargue y ejecute el [instalador del Datadog Agent][4].
1. Ejecute el instalador (como administrador) abriendo `datadog-agent-6-latest.amd64.msi`.
1. Siga las instrucciones, acepte el acuerdo de licencia e ingrese su clave de API de Datadog.
1. Ingrese su región de Datadog: {{< region-param key=dd_site code="true" >}}.
1. Opcionalmente, inicie el Datadog Agent Manager cuando se le solicite.

#### Desatendida {#unattended}

1. Descargue y ejecute el [instalador del Datadog Agent][4].
1. Ejecute uno de los siguientes comandos dentro del directorio donde descargó el instalador, reemplazando `MY_API_KEY` con su clave de API de Datadog:
   - Símbolo del sistema:
     {{< code-block lang="shell" >}}
start /wait msiexec /qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"
{{< /code-block >}}
   - Powershell:
     {{< code-block lang="powershell" >}}
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"'
{{< /code-block >}}

`HOSTNAME` y `TAGS` son valores opcionales. Consulte la [documentación del Windows Agent][5] para ver todas las opciones disponibles.

#### Implementación en Azure {#deployment-to-azure}

Para instalar el Agent en Azure, siga la [documentación de Microsoft Azure][8].

## Linux {#linux}

{{< tabs >}}

{{% tab "Debian" %}}
### Instalación en un solo paso {#one-step-install}

El comando de un solo paso instala los paquetes APT para el Datadog Agent y le solicita su contraseña.
- Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.
- Si tiene un archivo de configuración del Agent existente, los valores existentes se conservan durante la actualización.
- Puede configurar algunas de las opciones del Agent durante el proceso de instalación inicial. Para obtener más información, verifique las [opciones de configuración de install_script][101].

Para instalar el Agent, ejecute el siguiente comando, reemplazando `MY_API_KEY` con su clave de API de Datadog:

```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Instalación en varios pasos {#multi-step-install}

1. Configure APT para que pueda descargar a través de HTTPS e instalar `curl` y `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configure el repositorio de Debian de Datadog en su sistema y cree un llavero de archivo de Datadog:
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

1. Si utiliza Debian 8 o una versión anterior, copie el llavero a `/etc/apt/trusted.gpg.d`:
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Actualice su repositorio APT local e instale el Agent:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Opcionalmente, si está actualizando desde el Agent 5.17 o una versión superior, importe su configuración existente del Agent 5:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no está actualizando y no desea utilizar una configuración antigua, copie la configuración de ejemplo en la ubicación correspondiente e instale el Agent. Reemplace `MY_API_KEY` por su clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Configure la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/'
                    /etc/datadog-agent/datadog.yaml"
   ```
1. Asegúrese de que los permisos del usuario del Agent sean correctos:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Inicie el Agent:
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Ubuntu" %}}
### Instalación en un solo paso {#one-step-install-1}

El comando de un solo paso instala los paquetes APT para el Datadog Agent y le solicita su contraseña. Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos {#multi-step-install-1}

1. Configure APT para que pueda descargar a través de HTTPS e instalar `curl` y `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configure el repositorio de Debian de Datadog en su sistema y cree un llavero de archivo de Datadog:
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
1. Si utiliza Ubuntu 14 o una versión anterior, copie el llavero a `/etc/apt/trusted.gpg.d`:
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Actualice su repositorio APT local e instale el Agent:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Opcionalmente, si está actualizando desde el Agent 5.17 o una versión superior, importe su configuración existente del Agent 5:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no está actualizando y no desea utilizar una configuración antigua, copie la configuración de ejemplo en la ubicación correspondiente e instale el Agent. Reemplace `MY_API_KEY` por su clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Configure la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Asegúrese de que los permisos del usuario del Agent sean correctos:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Inicie el Agent: 
   - Ubuntu 16.04 y versiones superiores:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Ubuntu 14.04:
     ```shell
     sudo initctl start datadog-agent
     ```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### Instalación en un solo paso {#one-step-install-2}

El comando de un solo paso instala los paquetes YUM del Datadog Agent y le solicita su contraseña.
- Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.
- Si tiene un archivo de configuración del Agent existente, los valores existentes se conservan durante la actualización.
- Puede configurar algunas de las opciones del Agent durante el proceso de instalación inicial. Para obtener más información, verifique las [opciones de configuración de install_script][101].

1. Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:
   ```shell
   DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
   ```

1. Para instalaciones de Amazon Linux 2022 con la versión <= 6.39 del Agent, el Agent requiere el paquete `libxcrypt-compat`:
   ```shell
   dnf install -y libxcrypt-compat
   ```

### Instalación en varios pasos {#multi-step-install-2}

1. En un servidor x86_64, configure el repositorio YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con la siguiente configuración:
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

1. En un servidor arm64, configure el repositorio YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con la siguiente configuración:
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

1. Si está actualizando desde el Agent 5 o 6, elimine la clave GPG de RPM obsoleta:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Actualice su repositorio yum local e instale el Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Opcionalmente, si está actualizando desde el Agent 5.17 o una versión superior, importe su configuración existente del Agent 5:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no está actualizando y no desea utilizar una configuración antigua, copie la configuración de ejemplo en la ubicación correspondiente e instale el Agent. Reemplace `MY_API_KEY` por su clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Asegúrese de que los permisos del usuario del Agent sean correctos:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Inicie el Agent: 
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

{{% tab "CentOS y RedHat" %}}
### Instalación en un solo paso {#one-step-install-3}

El comando de un solo paso instala los paquetes YUM para el Datadog Agent y le solicita su contraseña.
- Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.
- Si tiene un archivo de configuración del Agent existente, los valores existentes se conservan durante la actualización.
- Puede configurar algunas de las opciones del Agent durante el proceso de instalación inicial. Para obtener más información, verifique las [opciones de configuración de install_script][101].

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Instalación en varios pasos {#multi-step-install-3}

1. Configure el repositorio YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con la siguiente configuración:
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

   **Nota**: La opción `repo_gpgcheck=0` es una solución alternativa para [un error en DNF][102].

1. Si está actualizando desde el Agent 5 o una versión anterior del Agent 6, elimine la clave GPG de RPM obsoleta:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Actualice su repositorio yum local e instale el Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Opcionalmente, si está actualizando desde el Agent 5.17 o una versión superior, importe su configuración existente del Agent 5:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no está actualizando y no desea utilizar una configuración antigua, copie la configuración de ejemplo en la ubicación correspondiente e instale el Agent. Reemplace `MY_API_KEY` por su clave de API de Datadog:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Asegúrese de que los permisos del usuario del Agent sean correctos:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Inicie el Agent: 
   - Centos o Red Hat 7 y superior:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Centos o Red Hat 6:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
[102]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}

{{% tab "Alma, Oracle y Rocky" %}}
### Instalación en un solo paso {#one-step-install-4}

El comando de un solo paso instala los paquetes YUM para el Datadog Agent y le solicita su contraseña.
- Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.
- Si tiene un archivo de configuración del Agent existente, los valores existentes se conservan durante la actualización.
- Puede configurar algunas de las opciones del Agent durante el proceso de instalación inicial. Para obtener más información, verifique las [opciones de configuración de install_script][101].

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Instalación en varios pasos {#multi-step-install-4}

1. Configure el repositorio YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con la siguiente configuración:
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

1. Si está actualizando desde el Agent 5 o una versión anterior del Agent 6, elimine la clave GPG de RPM obsoleta:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Actualice su repositorio yum local e instale el Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Opcionalmente, si está actualizando desde el Agent 5.17 o una versión superior, importe su configuración existente del Agent 5:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no está actualizando y no desea utilizar una configuración antigua, copie la configuración de ejemplo en la ubicación correspondiente e instale el Agent. Reemplace `MY_API_KEY` por su clave de API de Datadog:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Asegúrese de que los permisos del usuario del Agent sean correctos:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Reinicie el Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Fedora" %}}
### Instalación en un solo paso {#one-step-install-5}

El comando de un solo paso instala los paquetes YUM para el Datadog Agent y le solicita su contraseña.
- Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.
- Si tiene un archivo de configuración del Agent existente, los valores existentes se conservan durante la actualización.
- Puede configurar algunas de las opciones del Agent durante el proceso de instalación inicial. Para obtener más información, verifique las [opciones de configuración de install_script][101].

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos {#multi-step-install-5}

1. Configure el repositorio YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con la siguiente configuración:
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

1. Si está actualizando desde el Agent 5 o una versión anterior del Agent 6, elimine la clave GPG de RPM obsoleta:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Actualice su repositorio yum local e instale el Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Opcionalmente, si está actualizando desde el Agent 5.17 o una versión superior, importe su configuración existente del Agent 5:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no está actualizando y no desea utilizar una configuración antigua, copie la configuración de ejemplo en la ubicación correspondiente e instale el Agent. Reemplace `MY_API_KEY` por su clave de API de Datadog:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Asegúrese de que los permisos del usuario del Agent sean correctos:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Reinicie el Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Suse" %}}
### Instalación en un solo paso {#one-step-install-6}

El comando de un solo paso instala los paquetes YUM para el Datadog Agent y le solicita su contraseña.
- Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.
- Si tiene un archivo de configuración del Agent existente, los valores existentes se conservan durante la actualización.
- Puede configurar algunas de las opciones del Agent durante el proceso de instalación inicial. Para obtener más información, verifique las [opciones de configuración del script de instalación][101].

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Instalación en varios pasos {#multi-step-install-6}

1. Configure el repositorio YUM de Datadog creando `/etc/zypp/repos.d/datadog.repo` con la siguiente configuración:
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

1. Si está actualizando desde el Agent 5 o una versión anterior del Agent 6, elimine la clave GPG de RPM obsoleta:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Actualice su repositorio zypper local e instale el Agent:
   ```shell
   sudo zypper refresh
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   sudo zypper install datadog-agent
   ```

1. Opcionalmente, si está actualizando desde el Agent 5.17 o una versión superior, importe su configuración existente del Agent 5:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si no está actualizando y no desea utilizar una configuración antigua, copie la configuración de ejemplo en la ubicación correspondiente e instale el Agent. Reemplace `MY_API_KEY` con su clave de API de Datadog:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure la región de Datadog:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Asegúrese de que los permisos del usuario del Agent sean correctos:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Reinicie el Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{< /tabs >}}

## Nube y Containers {#cloud-and-containers}

{{< tabs >}}

{{% tab "Kubernetes" %}}

Ejecute el Datadog Agent directamente en su clúster de Kubernetes para comenzar a recopilar las métricas, trazas y logs de su clúster y sus aplicaciones. Puede implementar el Agent con un chart de Helm, [el Datadog Operator][101] o directamente con [un DaemonSet][102]. Para obtener más información sobre la instalación del Datadog Agent en diferentes distribuciones, consulte la [documentación de distribuciones de Kubernetes][103].

### Instalación del Datadog Agent {#installing-the-datadog-agent}

Para instalar el chart con un nombre de release personalizado `RELEASE_NAME`:

1. [Instale Helm][104].
1. Agregue el repositorio de Helm de Datadog:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   ```

1. Obtenga la versión más reciente de los charts recién agregados:
   ```shell
   helm repo update
   ```

1. Cree un archivo `values.yaml` vacío y sobrescriba cualquiera de los [valores predeterminados][105] si lo desea. Consulte el [repositorio de Datadog `helm-charts`][106] para ver ejemplos. 
1. Implemente el Datadog Agent, reemplazando `MY_API_KEY` con su clave de API de Datadog:
   **Con Helm v3+**:
   ```shell
   helm install RELEASE_NAME -f datadog-values.yaml --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   **Con Helm v1 o v2**:
   ```shell
   helm install -f datadog-values.yaml --name RELEASE_NAME --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   Este chart agrega el Datadog Agent a todos los nodos de su clúster mediante un DaemonSet. Poco después de la instalación, Datadog comienza a reportar datos de servidores y métricas en su cuenta.

### Habilitación de la recopilación de registros {#enabling-log-collection}

Para habilitar la recopilación de registros con Helm, actualice su archivo `datadog-values.yaml` con la siguiente configuración de recopilación de registros:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```    

Luego, actualice su chart de Helm de Datadog:

```shell
helm upgrade -f datadog-values.yaml RELEASE_NAME datadog/datadog
```

### Habilitación de la recopilación de trazas {#enabling-trace-collection}

Siga la [documentación de configuración de APM][107] dedicada para aprender cómo recopilar las trazas de su aplicación en un entorno de Kubernetes.

### Lecturas Adicionales {#further-reading}

Para obtener información sobre las funciones disponibles del Agent, consulte la [documentación de Kubernetes][108].

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
### Instalación en un solo paso {#one-step-install-7}

El comando de instalación de un solo paso ejecuta un contenedor de Docker firmado que incorpora el Datadog Agent para hacer un seguimiento de su servidor. La integración de Docker está habilitada de forma predeterminada, así como [Autodiscovery][101] en modo de configuración automática.

<div class="alert alert-info">No debe ejecutar más de un Datadog Agent por nodo. Ejecutar varios Agents puede resultar en un comportamiento inesperado.</a></div>

Para una instalación de un solo paso, ejecute el siguiente comando. Reemplace `MY_API_KEY` con su clave de API de Datadog:

En Amazon Linux v2:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" registry.datadoghq.com/agent:6
```

En otros sistemas operativos:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" registry.datadoghq.com/agent:6
```

#### Solución de problemas {#troubleshooting}

Si el comando de instalación de un solo paso no funciona, es posible que su sistema monte el directorio `cgroup` en un lugar inesperado o no utilice CGroups para la gestión de memoria. Los CGroups son necesarios para verificar Docker correctamente. Para habilitar los CGroups, consulte [la documentación de configuración][102]. 

Si los CGroups están habilitados, pero no se puede verificar Docker debido a una ubicación inesperada del directorio `cgroup`:
1. Ejecute `mount | grep "cgroup type tmpfs"` para recuperar la ubicación del directorio `cgroup`.
1. Reemplace la primera aparición de `/sys/fs/cgroup` en el comando de instalación de un solo paso con la ubicación del directorio `cgroup`.

### Envíe Custom Metrics con DogStatsD {#send-custom-metrics-with-dogstatsd}

De forma predeterminada, DogStatsD solo escucha en localhost. Para escuchar paquetes de DogStatsD desde otros contenedores:
1. Agregue `-e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` a los parámetros del contenedor. 
1. Vincule el puerto statsd del contenedor a la IP del servidor agregando la opción `-p 8125:8125/udp` a los parámetros del contenedor.
1. Configure su biblioteca cliente para enviar paquetes UDP a la IP del servidor.

### Personalice la configuración de su Agent {#customize-your-agent-configuration}

- Para obtener información sobre cómo configurar el Agent, consulte [Docker Agent para Docker, containerd y Podman][103].
- Para ajustar Autodiscovery, consulte [Docker Integrations Autodiscovery][104].

[101]: /es/containers/docker/integrations/?tabs=docker
[102]: /es/containers/docker/?tab=standard#setup
[103]: /es/containers/docker/?tab=standard
[104]: /es/containers/docker/integrations/?tab=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
La ejecución de CoreOS Container Linux es compatible con el tiempo de ejecución de Docker. Para obtener instrucciones de instalación, consulte [Docker][1].

Para ejecutar CoreOS Tectonic en Kubernetes, consulte [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
A partir de la versión 6.1, el Datadog Agent permite hacer un seguimiento de los clústeres de OpenShift Origin y Enterprise. Dependiendo de sus necesidades y las restricciones de seguridad de su clúster, se admiten tres escenarios de despliegue:

- [Operaciones de SCC restringidas][101]
- [Operaciones de SCC de red del servidor][102]
- [Datadog personalizado para todas las funciones][103]

Para instalar OpenShift, consulte las [instrucciones de instalación de Kubernetes](?tab=kubernetes#cloud-and-containers). La integración de Kubernetes apunta a OpenShift 3.7.0+ de forma predeterminada. Para versiones anteriores de OpenShift, debe completar pasos de instalación adicionales. Para obtener más información, consulte la documentación de [integración de OpenShift][104].

[101]: /es/integrations/openshift/?tab=helm#restricted-scc-operations
[102]: /es/integrations/openshift/?tab=helm#host
[103]: /es/integrations/openshift/?tab=helm#custom-datadog-scc-for-all-features
[104]: /es/integrations/openshift/?tab=helm#installation
{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">La versión BOSH del Datadog Agent solo funciona en stemcells de Ubuntu y Red Hat.</a></div>

1. Cargue la versión del Datadog Agent en su BOSH Director:

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. Configure Datadog como un complemento en su configuración de tiempo de ejecución. Reemplace `MY_API_KEY` con su clave de API de Datadog::

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

3. Agregue el tiempo de ejecución a su [configuración de tiempo de ejecución][101]:

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. Vuelva a implementar cualquier despliegue existente:
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

## Gestión de configuración {#configuration-management}

{{< tabs >}}
{{% tab "Ansible" %}}

La instalación del Agent con Ansible requiere la versión 2.10 de Ansible o superior.

<div class="alert alert-info">La colección de Datadog para Ansible es compatible con la mayoría de las distribuciones de Linux basadas en Debian, RHEL y SUSE, macOS y Windows.<br></div>

### Requisitos previos {#prerequisites}

#### Windows {#windows-1}
Antes de que pueda usar Datadog Ansible Collection para administrar hosts de Windows, debe instalar la colección `ansible.windows`:

```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE y SLES {#opensuse-and-sles}

Antes de que pueda usar Datadog Ansible Collection para administrar hosts de openSUSE/SLES, debe instalar la colección `community.general`:

```shell
ansible-galaxy collection install community.general
```

### Instalar Datadog {#install-datadog}

1. Instale la colección de Datadog para Ansible desde Ansible Galaxy en su servidor de Ansible:
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - La colección de Datadog para Ansible también está disponible a través del [Red Hat Automation Hub][101], donde está certificada oficialmente por Red Hat.
   - Se recomienda instalar la colección. Si es necesario, también puede instalar Datadog usando el [rol independiente][102].

2. Para implementar el Datadog Agent en los hosts, agregue el rol de Datadog y su clave de API a su playbook. Reemplace `MY_API_KEY` con su clave de API de Datadog:
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

   Para asegurarse de que el Agent pueda agrupar sus hosts, utilice únicamente los nombres de host de los nodos que el Datadog Agent esté rastreando. Puede verificar qué nombres de host está rastreando el Agent usando el siguiente comando:

   ```shell
   sudo datadog-agent status
   ```

## Verificaciones específicas del Agent {#specific-agent-checks}

Para usar una verificación o integración específica del Agent en uno de sus nodos, puede usar la variable `datadog_checks`. Aquí tiene un ejemplo para la verificación de procesos:

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

Puede encontrar más ejemplos del uso del rol del Agent en el repositorio de GitHub para el [rol independiente][103].

### Métricas y eventos {#metrics-and-events}

Para obtener métricas y eventos en Datadog después de que se ejecute Ansible, consulte la [página de GitHub][104] del proyecto de callback de Ansible.

[101]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[102]: /es/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[103]: https://github.com/DataDog/ansible-datadog/#role-variables
[104]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">A partir de la versión 2.9.0, el <code>datadog_agent</code> módulo admite nodos de Windows y Linux. Las versiones anteriores del módulo datadog_agent solo admiten nodos de Linux.</a></div>

## Requisitos: {#requirements}
- Requiere la versión >= 4.6 de Puppet Open Source o la versión >= 2016.4 de Puppet Enterprise

## Instale el Agent {#install-the-agent-2}

1. Instale el módulo `datadog_agent` desde [Puppet Forge][101] en su servidor Puppet:
   - Para instalaciones nuevas, ejecute el `module install command`:
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - Si el módulo ya está instalado, actualícelo:
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. Para implementar el Datadog Agent en los nodos, agregue esta clase parametrizada a sus manifiestos. Reemplace `MY_API_KEY` con su clave de API de Datadog:
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY",
         datadog_site => "datad0g.com",
         agent_major_version => 6,
      }
   }
   ```

   Para asegurarse de que el Agent pueda agrupar sus hosts, utilice únicamente los nombres de host de los nodos que el Datadog Agent esté rastreando. Puede verificar qué nombres de host está rastreando el Agent usando el siguiente comando:

   ```shell
   sudo datadog-agent status
   ```

3. Habilite la generación de informes a Datadog en su servidor Puppet:
   1. Agregue los siguientes parámetros a `/etc/puppet/puppet.conf`:
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```

   1. En su manifiesto, agregue la opción `puppet_run_reports` a su servidor Puppet. Por ejemplo:
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
1. Ejecute Puppet en su servidor Puppet para instalar todas las dependencias necesarias.
1. Reinicie su servidor Puppet para comenzar a recibir datos de Puppet en Datadog.

## Verificaciones específicas del Agent {#specific-agent-checks-1}

Para usar una verificación o integración específica del Agent en uno de sus nodos, consulte el [manifiesto de integración][102] correspondiente para obtener un ejemplo de código. Aquí tiene un ejemplo para la integración de elasticsearch:

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

Consulte el [repositorio de GitHub del módulo][103] para obtener más ejemplos y casos de uso avanzados.

[101]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[102]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations
[103]: https://github.com/DataDog/puppet-datadog-agent

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Requiere Chef versión 10.14.x o superior.</a></div>

1. Añada el cookbook de Datadog:
   - Si está utilizando [Berkshelf][101], añada el cookbook a su Berksfile:
      ```shell
      cookbook 'datadog', '~> 4.0'
      ```

   - Si no está utilizando Berkshelf, instale el cookbook en su repositorio usando Knife:
     ```shell
     knife cookbook site install datadog 
     ```

1. Establezca los atributos específicos de Datadog en un rol, entorno u otra receta. Reemplace `MY_API_KEY` con su clave de API de Datadog:
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"

   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"

   # Enable install for Agent version 6
   node.default['datadog']['agent_major_version'] = 6

   # Set the Datadog site
   node.default['datadog']['site'] = "datad0g.com"
   ```

1. Suba el cookbook actualizado a su servidor Chef:
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. Añada el cookbook al `run_list` o `role` de su nodo:
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. Espere a la siguiente ejecución programada del `chef-client`.


Para obtener más información y ejemplos, consulte el [repositorio de GitHub del Agent][102].

[101]: https://docs.chef.io/workstation/berkshelf/
[102]: https://github.com/DataDog/chef-datadog

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">La fórmula de Datadog para Saltstack solo es compatible con sistemas basados en Debian y RedHat.<br><br>
Las siguientes instrucciones añaden la fórmula de Datadog al <code>base</code> entorno de Salt. Para añadirla a otro entorno de Salt, reemplace las referencias a <code>base</code> con el nombre de su entorno de Salt.</div>

<!-- vale Datadog.inclusive = NO -->

### Instalar usando `gitfs_remotes` {#install-using-gitfs-remotes}
1. Instale la [fórmula de Datadog][101] en el entorno base de su nodo Salt Master, usando la opción `gitfs_remotes` en su archivo de configuración de Salt Master (por defecto `/etc/salt/master`):
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

1. Reinicie su servicio Salt Master:
   ```shell
   systemctl restart salt-master
   ```
   o 
   ```shell
   service salt-master restart
   ```

### Instalar clonando la fórmula de Datadog {#install-by-cloning-the-datadog-formula}

1. Clone la [fórmula de Datadog][101] en su nodo Salt Master:
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas
   git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Añada la fórmula clonada al entorno base en el `file_roots` de su archivo de configuración de Salt Master (por defecto `/etc/salt/master`):
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## Implemente el Agent en sus hosts {#deploy-the-agent-to-your-hosts}

1. Agregue la fórmula de Datadog a su archivo top (de forma predeterminada `/srv/salt/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Agregue un archivo `datadog.sls` pillar a su directorio pillar (de forma predeterminada `/srv/pillar/`) y agregue su clave de API. Reemplace `MY_API_KEY` con su clave de API de Datadog:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT6_VERSION>
   ```

1. Agregue el archivo `datadog.sls` pillar al archivo top pillar (de forma predeterminada `/srv/pillar/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Para usar una verificación o integración específica del Agent en uno de sus hosts, puede usar la variable checks. Aquí tiene un ejemplo para la integración directory:
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

Consulte el [repositorio de GitHub][101] de la fórmula para obtener información sobre la configuración de registros, ejemplos de verificaciones y casos de uso avanzados.
<!-- vale Datadog.inclusive = YES -->
[101]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Instalar desde el código fuente {#install-from-source}

Siga [las instrucciones en el repositorio de GitHub del Agent][11] para compilar los paquetes `.deb` y `.rpm` del Agent 6 en Linux con Docker.

De manera alternativa, puede compilar el binario del Agent para la versión 6 siguiendo las [instrucciones de introducción][12].

## Lecturas adicionales {#further-reading-1}

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