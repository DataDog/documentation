---
further_reading:
- link: agent/
  tag: Documentación
  text: El Datadog Agent
private: true
title: Instalar Datadog Agent 5
---
Esta guía cubre la instalación del Agent 5. Datadog recomienda instalar o actualizar al Agent 7 para obtener las funciones más recientes. Para obtener información sobre cómo instalar la versión más reciente del Agent, siga las [Instrucciones de instalación del Agent 7][1]. Para obtener información sobre cómo actualizar al Agent 7 desde una versión anterior, consulte [Actualizar a Datadog Agent v7][2].

## macOS {#macos}

### Instale el Agent {#install-the-agent}

#### Línea de comandos {#command-line}

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/osx/install.sh)"
{{< /code-block >}}

Para administrar el Agent, utilice el comando `datadog-agent`. De forma predeterminada, el binario `datadog-agent` se encuentra en `/usr/local/bin`. Habilite o deshabilite integraciones en `/opt/datadog-agent/etc/conf.d`.

#### GUI {#gui}

1. Descargue e instale el [paquete DMG][3].
1. Agregue la siguiente línea a `/opt/datadog-agent/etc/datadog.conf`, reemplazando `MY_API_KEY` por su clave de API de Datadog:
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

Para administrar el Agent, utilice la aplicación Datadog Agent en la bandeja del sistema. Habilite o deshabilite integraciones en `/opt/datadog-agent/etc/conf.d`.

### Comportamiento de ejecución del Agent {#agent-run-behavior}

De forma predeterminada, el Agent se ejecuta al iniciar sesión. Puede deshabilitarlo utilizando la aplicación Datadog Agent en la bandeja del sistema. Si desea ejecutar el Agent al arrancar el sistema, utilice estos comandos:
{{< code-block lang="shell" >}}
sudo cp '/opt/datadog-agent/etc/com.datadoghq.agent.plist' /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

### Desinstalar {#uninstall}

1. Detenga y cierre el Datadog Agent con el icono de hueso en la bandeja.
1. Arrastre la aplicación Datadog desde la carpeta de aplicaciones a la papelera.
1. Ejecute:

   ```shell
   sudo rm -rf /opt/datadog-agent
   sudo rm -rf /usr/local/bin/datadog-agent
   sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
   ```

Si ejecutó los comandos de instalación opcionales para que el Agent se ejecute al iniciar el sistema, ejecute lo siguiente para finalizar la desinstalación:

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## Windows {#windows}

### Instale el Agent {#install-the-agent-1}

#### GUI {#gui-1}

Descargue y ejecute el instalador del Datadog Agent:
- [instalador de 64 bits][4].
- [instalador de 32 bits][5]. Las instalaciones de 32 bits solo son compatibles hasta la versión 5.10.1 del Agent.

Los enlaces a todas las versiones disponibles del instalador de Windows están disponibles en [formato JSON][6].

#### Línea de comandos {#command-line-1}

1. Descargue el Agent:
   - Para instalaciones nuevas, descargue el [instalador del Datadog Agent][4].
   - Si está actualizando desde una versión <5.12.0 del Datadog Agent, utilice el [método de instalación EXE][7].
1. En un shell `cmd.exe` en el directorio donde descargó el instalador, ejecute el siguiente comando. Reemplace `MY_API_KEY` con su clave de API de Datadog:
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   Opcionalmente, agregue los valores `TAG` y `HOSTNAME`.

#### Implementación en Azure {#deployment-to-azure}

Para instalar el Agent en Azure, siga la [documentación de Microsoft Azure][8].

### Nuevo procedimiento de actualización para 5.12 {#new-upgrade-procedure-for-512}

Si usted es un cliente existente que ejecuta una versión del Agent de Windows anterior a la 5.12, es posible que se requieran pasos adicionales para actualizar su dispositivo. Específicamente, el Agent más reciente es una instalación "por máquina". Las versiones anteriores del Agent eran "por usuario" de forma predeterminada. También puede haber pasos adicionales requeridos si está realizando la implementación con Chef. Para obtener más información, consulte [Instalación del Agent de Windows][9].

### Desinstalar {#uninstall-1}

Existen dos métodos diferentes para desinstalar el Agent en Windows. Ambos métodos eliminan el Agent, pero no eliminan la carpeta de configuración `C:\ProgramData\Datadog` en el servidor.

**Nota**: Para el Agent con versión < v5.12.0, es importante desinstalar el Agent con la **cuenta original** utilizada para instalar el Agent; de lo contrario, es posible que no se elimine correctamente.

### Agregar o quitar programas {#add-or-remove-programs}

1. Presione **CTRL** y **Esc** o use la tecla de Windows para ejecutar la Búsqueda de Windows.
1. Busque `add` y haga clic en {{< ui >}}Add or remove programs{{< /ui >}}.
1. Busque `Datadog Agent` y haga clic en {{< ui >}}Uninstall{{< /ui >}}.

### PowerShell {#powershell}

**Nota:** Habilite WinRM para usar los comandos a continuación.

Utilice el siguiente comando de PowerShell para desinstalar el Agent sin reiniciar:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

## Linux y Unix {#linux-and-unix}

{{< tabs >}}

{{% tab "Debian" %}}
### Instalación en un solo paso {#one-step-install}

El comando de un solo paso instala los paquetes APT para el Datadog Agent y le solicita su contraseña. Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos {#multi-step-install}

1. Configure APT para que pueda descargar a través de HTTPS e instale `curl` y `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configure el repositorio de Debian de Datadog en su sistema y cree un anillo de claves para el archivo de paquetes de Datadog:
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
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

1. Ejecute el siguiente comando para copiar la configuración de ejemplo en su lugar. Reemplace `MY_API_KEY` con su clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Inicie el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Ubuntu" %}}
### Instalación en un solo paso {#one-step-install-1}

El comando de un solo paso instala los paquetes APT para el Datadog Agent y le solicita su contraseña. Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos {#multi-step-install-1}

1. Configure APT para que pueda descargar a través de HTTPS e instale `curl` y `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configure el repositorio de Debian de Datadog en su sistema y cree un anillo de claves para el archivo de paquetes de Datadog:
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
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

1. Ejecute el siguiente comando para copiar la configuración de ejemplo en su lugar. Reemplace `MY_API_KEY` con su clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Inicie el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

### Desinstalar {#uninstall-2}

Para desinstalar el Agent, ejecute el siguiente comando:

```shell
sudo apt-get remove datadog-agent -y
```

Este comando elimina el Agent, pero no elimina:

* El archivo de configuración `datadog.yaml`
* Archivos creados por el usuario en la carpeta de configuración `/etc/dd-agent`
* Archivos creados por el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de registro de Datadog

Si también desea eliminar estos elementos, ejecute este comando después de eliminar el Agent:

```shell
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### Instalación en un solo paso {#one-step-install-2}

El comando de un solo paso instala los paquetes YUM para el Datadog Agent y le solicita su contraseña. Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos {#multi-step-install-2}

1. Configure el repositorio YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con el siguiente contenido:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **Nota**: En la arquitectura i386/i686, reemplace "x86_64" con "i386".

1. Actualice su repositorio yum local e instale el Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copie la configuración de ejemplo en su lugar. Reemplace `MY_API_KEY` con su clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Reinicie el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```


### Desinstalar {#uninstall-3}

Para desinstalar el Agent, ejecute el siguiente comando:

```shell
sudo yum remove datadog-agent
```

Este comando elimina el Agent, pero no elimina:

* El archivo de configuración `datadog.yaml`
* Archivos creados por el usuario en la carpeta de configuración `/etc/dd-agent`
* Archivos creados por el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de registro de Datadog

Si también desea eliminar estos elementos, ejecute este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "CentOS y Red Hat" %}}
### Instalación en un solo paso {#one-step-install-3}

El comando de un solo paso instala los paquetes YUM para el Datadog Agent y le solicita su contraseña. Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API para Datadog API:

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos {#multi-step-install-3}

1. Configure el repositorio YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con el siguiente contenido:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **Nota**: En la arquitectura i386/i686, reemplace "x86_64" con "i386".

1. Actualice su repositorio YUM local e instale el Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. Copie la configuración de ejemplo en la ubicación correspondiente. Reemplace `MY_API_KEY` por su clave de API para Datadog API:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Reinicie el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Desinstalar {#uninstall-4}

Para desinstalar el Agent, ejecute el siguiente comando:

```shell
sudo yum remove datadog-agent
```

Este comando elimina el Agent, pero no elimina:

* El archivo de configuración `datadog.yaml`
* Archivos creados por el usuario en la carpeta de configuración `/etc/dd-agent`
* Archivos creados por el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de registro de Datadog

Si también desea eliminar estos elementos, ejecute este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Fedora" %}}
### Instalación en un solo paso {#one-step-install-4}

El comando de un solo paso instala los paquetes YUM para el Datadog Agent y le solicita su contraseña. Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API para Datadog API:

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos {#multi-step-install-4}

1. Configure el repositorio YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con el siguiente contenido:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **Nota**: En la arquitectura i386/i686, reemplace "x86_64" con "i386".

1. Actualice su repositorio YUM local e instale el Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copie la configuración de ejemplo en la ubicación correspondiente. Reemplace `MY_API_KEY` por su clave de API para Datadog API:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Reinicie el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Desinstalar {#uninstall-5}

Para desinstalar el Agent, ejecute el siguiente comando:

```shell
sudo yum remove datadog-agent
```

Este comando elimina el Agent, pero no elimina:

* El archivo de configuración `datadog.yaml`
* Archivos creados por el usuario en la carpeta de configuración `/etc/dd-agent`
* Archivos creados por el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de registro de Datadog

Si también desea eliminar estos elementos, ejecute este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Suse" %}}
### Instalación en un solo paso {#one-step-install-5}

El comando de un solo paso instala los paquetes YUM para el Datadog Agent y le solicita su contraseña. Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API para Datadog API:

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos {#multi-step-install-5}

1. Configure el repositorio YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con el siguiente contenido:
   ```conf
   [datadog]
   name=Datadog, Inc.
   enabled=1
   baseurl=https://yum.datadoghq.com/suse/rpm/x86_64
   type=rpm-md
   gpgcheck=1
   repo_gpgcheck=0
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

1. Actualice su repositorio local de zypper e instale el Agent:
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. Copie la configuración de ejemplo en la ubicación correspondiente. Reemplace `MY_API_KEY` por su clave de API para Datadog API:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Reinicie el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Desinstalar {#uninstall-6}

Para desinstalar el Agent, ejecute el siguiente comando:

```shell
sudo zypper remove datadog-agent
```

Este comando elimina el Agent, pero no elimina:
* El archivo de configuración `datadog.yaml`
* Archivos creados por el usuario en la carpeta de configuración `/etc/dd-agent`
* Archivos creados por el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de registro de Datadog

Si también desea eliminar estos elementos, ejecute este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```


{{% /tab %}}

{{% tab "AIX" %}}
**Nota**: Esta pestaña cubre el Datadog UNIX Agent heredado. Datadog recomienda instalar o actualizar a [Agent 7 en AIX][3] para obtener las funciones más recientes y soporte continuo. Consulte [Plataformas compatibles][4] para conocer las versiones de AIX que admite Agent 7.

### Instalación en un solo paso {#one-step-install-6}

El comando de un solo paso instala el paquete BFF más reciente para Datadog Agent y le solicita su contraseña si es necesario. Si el Agent aún no está instalado en su máquina y no desea que se inicie automáticamente después de la instalación, anteponga `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API para Datadog API:

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Actualizar desde una instalación anterior {#upgrade-from-a-previous-installation}

Para instalar el Agent manteniendo su configuración existente, ejecute el siguiente comando:

```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

Para obtener más información, consulte [Datadog UNIX Agent para AIX][1].

### Instalación en varios pasos {#multi-step-install-6}

1. Descargue el BFF preferido desde las versiones del repositorio [datadog-unix-agent][2]:
1. Instale el artefacto como root con `installp`:
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. Si no tiene un archivo de configuración existente, copie la configuración de ejemplo en la ubicación correspondiente. Reemplace `MY_API_KEY` por su clave de API para Datadog API:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Asegúrese de que Datadog Agent tenga los permisos correctos:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```
1. Detenga el servicio del Agent:
   ```shell
   sudo stopsrc -s datadog-agent
   ```
1. Verifique que el servicio del Agent se haya detenido:
   ```
   sudo lssrc -s datadog-agent
   ```
1. Reinicie el servicio del Agent:
   ```shell
   sudo startsrc -s datadog-agent
   ```

### Desinstalar {#uninstall-7}

Para desinstalar el Agent, ejecute el siguiente comando:

Para eliminar un Agent instalado, ejecute el siguiente comando `installp`:

```shell
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

Nota: Los registros de desinstalación del Agent se pueden encontrar en el archivo `dd-aix-install.log`. Para deshabilitar este registro, elimine el parámetro `-e` en el comando de desinstalación.

[1]: /es/agent/guide/install-unix-agent-aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
[3]: /es/agent/supported_platforms/aix/
[4]: /es/agent/supported_platforms/?tab=aix
{{% /tab %}}

{{< /tabs >}}

## Nube y Containers {#cloud-and-containers}

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Instale el Agent {#install-the-agent-2}
### Instale con DaemonSets {#install-with-daemonsets}

Si está ejecutando Kubernetes >= 1.1.0, puede aprovechar [DaemonSets][1] para implementar automáticamente el Datadog Agent en todos sus nodos

1. Cree un secreto que contenga su clave de API. Este secreto se utiliza en el manifiesto para implementar el Datadog Agent. Reemplace `MY_API_KEY` por su clave de API para Datadog API:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key =" MY_API_KEY"
   ```

1. Cree el siguiente manifiesto llamado `dd-agent.yaml`:

   ```yaml
   apiVersion: extensions/v1beta1
   kind: DaemonSet
   metadata:
   name: dd-agent
   spec:
   template:
      metadata:
         labels:
         app: dd-agent
         name: dd-agent
      spec:
         containers:
         - image: gcr.io/datadoghq/docker-dd-agent:latest
         imagePullPolicy: Always
         name: dd-agent
         ports:
            - containerPort: 8125
               name: dogstatsdport
               protocol: UDP
         env:
            - name: DD_API_KEY
               valueFrom:
               secretKeyRef:
                  name: datadog-secret
                  key: api-key
            - name: KUBERNETES
               value: "yes"
            - name: SD_BACKEND
               value: docker
            # Uncomment this variable if the agent has issues reaching kubelet
            # - name: KUBERNETES_KUBELET_HOST
            #   valueFrom:
            #     fieldRef:
            #       fieldPath: status.hostIP  # Kubernetes >= 1.7
            #       # or
            #       # fieldPath: spec.nodeName  # Kubernetes < 1.7
         resources:
            requests:
               memory: "256Mi"
               cpu: "200m"
            limits:
               memory: "256Mi"
               cpu: "200m"
         volumeMounts:
            - name: dockersocket
               mountPath: /var/run/docker.sock
            - name: procdir
               mountPath: /host/proc
               readOnly: true
            - name: cgroups
               mountPath: /host/sys/fs/cgroup
               readOnly: true
         livenessProbe:
            exec:
               command:
               - ./probe.sh
            initialDelaySeconds: 15
            periodSeconds: 5
         volumes:
         - hostPath:
               path: /var/run/docker.sock
            name: dockersocket
         - hostPath:
               path: /proc
            name: procdir
         - hostPath:
               path: /sys/fs/cgroup
            name: cgroups
   ```

1. Implemente el DaemonSet:
   ```shell
   kubectl create -f dd-agent.yaml
   ```

<div class="alert alert-info">Este manifiesto habilita la función de configuración automática de Autodiscovery. Para deshabilitar la configuración automática, elimine la <code>SD_BACKEND</code> definición de la variable de entorno. Para aprender a configurar Autodiscovery, consulte <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">Kubernetes Integrations Autodiscovery</a>.</div>

### Ejecute el Agent como un contenedor de Docker {#run-the-agent-as-a-docker-container}

Si no está ejecutando Kubernetes 1.1.0 o una versión posterior, o no desea utilizar DaemonSets, ejecute el Agent como un contenedor de Docker en cada nodo al que desee hacer un seguimiento. Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## Enviar Custom Metrics {#send-custom-metrics}

Si planea enviar [Custom Metrics][2] usando DogStatsD:
1. Vincule el puerto StatsD del contenedor a la dirección IP del nodo agregando un `hostPort` a la sección `ports` de su manifiesto:
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. Configure su biblioteca cliente para enviar paquetes UDP a la IP del nodo. Si utiliza redes de puente (bridge), la puerta de enlace predeterminada de su contenedor de aplicación coincide con la IP del nodo. También puede usar la API descendente (downward API) para exponer el nombre de host del nodo como una variable de entorno.

## Personalice la configuración de su Agent {#customize-your-agent-configuration}

Para personalizar la configuración de su Agent, consulte la documentación en el repositorio [docker-dd-agent][3] del Agent 5. Para ajustar la configuración de Autodiscovery, consulte [Kubernetes Integrations Autodiscovery][4]. Para deshabilitar Autodiscovery, elimine la variable de entorno `SD_BACKEND` de su manifiesto.

Para obtener información sobre la recopilación de métricas, comprobaciones de servicio y eventos, consulte la documentación de la [integración de Kubernetes][5].

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /es/metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /es/containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /es/integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### Instalación en un solo paso {#one-step-install-7}

La instalación en un solo paso ejecuta un contenedor de Docker que integra el Datadog Agent para hacer un seguimiento de su servidor. La integración de Docker está habilitada de forma predeterminada, al igual que Autodiscovery en modo de configuración automática. Para deshabilitar Autodiscovery, elimine la variable `SD_BACKEND` del comando de instalación en un solo paso.

#### Amazon Linux {#amazon-linux}
Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Otros sistemas operativos {#other-operating-systems}
Ejecute el siguiente comando, reemplazando `MY_API_KEY` por su clave de API de Datadog:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Solución de problemas {#troubleshooting}

Si el comando de instalación en un solo paso no funciona, es posible que su sistema monte el directorio `cgroup` en un lugar inesperado o que no utilice CGroups para la gestión de memoria. Los CGroups son necesarios para verificar Docker correctamente. Para habilitar CGroups, consulte la documentación en el repositorio [docker-dd-agent][1]. Si la verificación falla debido a una ubicación inesperada del directorio `cgroup`:

1. Ejecute `mount | grep "cgroup type tmpfs"` para recuperar la ubicación del directorio `cgroup`.
1. Reemplace la primera aparición de `/sys/fs/cgroup` en el comando de instalación de un solo paso con la ubicación del directorio `cgroup`.

### Enviar Custom Metrics {#send-custom-metrics-1}

Para enviar Custom Metrics mediante DogStatsD:
1. Agregue la opción `-p 8125:8125/udp` al comando de instalación. Esto vincula el puerto StatsD del contenedor a la dirección IP del servidor.
1. Configure su biblioteca cliente para enviar paquetes UDP a la dirección IP del servidor.

### Personalice la configuración de su Agent {#customize-your-agent-configuration-1}

Para personalizar la configuración de su Agent, consulte la documentación en el repositorio [docker-dd-agent][2] del Agent 5. Para ajustar la configuración de Autodiscovery, consulte [Docker Integrations Autodiscovery][3]. Para deshabilitar Autodiscovery, elimine la variable de entorno `SD_BACKEND` del comando de instalación de un solo paso.

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/es/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
La ejecución de CoreOS Container Linux es compatible con el tiempo de ejecución de Docker. Para obtener instrucciones de instalación, consulte [Docker][1].

Para ejecutar CoreOS Tectonic en Kubernetes, consulte [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
Para obtener información sobre la instalación de Datadog con OpenShift, consulte el repositorio [datadog-openshift][1].

[1]: https://github.com/DataDog/datadog-openshift

{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">La versión BOSH de Datadog Agent solo funciona en stemcells de Ubuntu y Red Hat.</a></div>

1. Suba la versión de Datadog Agent a su BOSH Director:

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

3. Agregue el tiempo de ejecución a su configuración de tiempo de ejecución:

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

{{% /tab %}}

{{< /tabs >}}

## Gestión de configuración {#configuration-management}

{{< tabs >}}
{{% tab "Ansible" %}}

<div class="alert alert-info">La colección de Ansible de Datadog es compatible con la mayoría de las distribuciones de Linux basadas en Debian, RHEL y SUSE, macOS y Windows.<br>Requiere la versión 2.10 o superior de Ansible.</div>

### Requisitos previos {#prerequisites}

#### Windows {#windows-1}
Antes de que pueda usar la colección de Ansible de Datadog para gestionar servidores Windows, debe instalar la colección `ansible.windows`:

```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE y SLES {#opensuse-and-sles}

Antes de que pueda usar la colección de Ansible de Datadog para gestionar servidores openSUSE/SLES, debe instalar la colección `community.general`:

```shell
ansible-galaxy collection install community.general
```

### Instalar Datadog {#install-datadog}

1. Instale la colección de Ansible de Datadog desde Ansible Galaxy en su servidor de Ansible:
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - La colección de Ansible de Datadog también está disponible a través del [Red Hat Automation Hub][1], donde está certificada oficialmente por Red Hat.
   - Se recomienda instalar la colección. Si es necesario, también puede instalar Datadog usando el [rol independiente][2].

2. Para implementar el Datadog Agent en servidores, agregue el rol de Datadog y su clave de API a su playbook. Reemplace `MY_API_KEY` por su clave de API de Datadog:
   ```yaml
   - hosts: servers
   tasks:
      - name: Import the Datadog Agent role from the Datadog collection
         import_role:
         name: datadog.dd.agent
   vars:
      datadog_api_key: "MY_API_KEY"
      datadog_agent_major_version: 5
   ```

   Para asegurarse de que el Agent pueda agrupar sus servidores, utilice únicamente nombres de host de nodos de los que el Datadog Agent hace un seguimiento. Puede verificar qué nombres de host está rastreando el Agent utilizando el siguiente comando:

   ```shell
   service datadog-agent info
   ```

## Comprobaciones específicas del Agent {#specific-agent-checks}

Para utilizar una comprobación o integración específica del Agent en uno de sus nodos, puede utilizar la variable `datadog_checks`. Aquí tiene un ejemplo de comprobación de procesos:

```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "MY_API_KEY"
    datadog_agent_major_version: 5
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

Puede encontrar más ejemplos del uso del rol del Agent en el repositorio de GitHub para el [rol independiente][3].

### Métricas y eventos {#metrics-and-events}

Para obtener métricas y eventos en Datadog después de que se ejecute Ansible, consulte la [página de GitHub][4] del proyecto de devolución de llamada de Ansible.

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /es/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">El <code>datadog_agent</code> El módulo solo es compatible con nodos Linux.<br>Requiere Puppet Agent versión 2.7 o superior.</a></div>

1. Instale el módulo `datadog_agent` desde [Puppet Forge][1] en su servidor Puppet:
   - Para instalaciones nuevas, ejecute `module install command`:
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - Si el módulo ya está instalado, actualícelo:
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. Para implementar el Datadog Agent en nodos, agregue esta clase parametrizada a sus manifiestos. Reemplace `MY_API_KEY` por su clave de API de Datadog:
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY"
      }
   }
   ```

   Para asegurarse de que el Agent pueda agrupar sus servidores, utilice únicamente nombres de host de nodos de los que el Datadog Agent hace un seguimiento. Puede verificar qué nombres de host está rastreando el Agent utilizando el siguiente comando:

   ```shell
   service datadog-agent info
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
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Ejecute Puppet en su servidor Puppet para instalar todas las dependencias necesarias.
1. Reinicie su servidor Puppet para comenzar a recibir datos de Puppet en Datadog.

## Verificaciones específicas del Agent {#specific-agent-checks-1}

Para usar una verificación específica del Agent o una integración en uno de sus nodos, consulte el [manifiesto de integración][2] correspondiente para obtener un ejemplo de código. Aquí tiene un ejemplo para la integración de Elasticsearch:

```puppet
node "elastic-node1.mydomain.com" {
    class { "datadog_agent":
        api_key => ""
    }
    include "datadog_agent::integrations::elasticsearch"
}
```

[1]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[2]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Requiere Chef versión 10.14.x o superior.</a></div>

1. Agregue el cookbook de Datadog:
   - Si está usando [Berkshelf][1], agregue el cookbook a su Berksfile:
      ```shell
      cookbook 'datadog'
      ```

   - Si no está usando Berkshelf, instale el cookbook en su repositorio usando Knife:
     ```shell
     knife cookbook site install datadog 
     ```

1. Establezca los atributos específicos de Datadog en un rol, entorno u otra receta. Reemplace `MY_API_KEY` por su clave de API de la Datadog API:
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"
   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"
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

1. Agregue el cookbook al `run_list` o `role` de su nodo:
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. Espere a la siguiente ejecución programada de `chef-client`.

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">La fórmula de Datadog para Saltstack solo es compatible con sistemas basados en Debian y RedHat.<br><br>
Las siguientes instrucciones agregan la fórmula de Datadog al entorno base de Salt. Para agregarla a otro entorno de Salt, reemplace las referencias a <code>base</code> con el nombre de su entorno de Salt.</div>

<!-- vale Datadog.inclusive = NO -->

### Instale usando `gitfs_remotes` {#install-using-gitfs-remotes}
1. Instale la [fórmula de Datadog][1] en el entorno base de su nodo Salt Master, usando la opción `gitfs_remotes` en su archivo de configuración de Salt Master (por defecto `/etc/salt/master`):
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

1. Reinicie su servicio de Salt Master:
   ```shell
   systemctl restart salt-master
   ```
   o 
   ```shell
   service salt-master restart
   ```

### Instale clonando la fórmula de Datadog {#install-by-cloning-the-datadog-formula}

1. Clone la [fórmula de Datadog][1] en su nodo Salt Master:
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Agregue la fórmula clonada al entorno base en el `file_roots` de su archivo de configuración de Salt Master (de forma predeterminada `/etc/salt/master`):
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

1. Agregue un archivo pillar `datadog.sls` a su directorio pillar (de forma predeterminada `/srv/pillar/`) y agregue su clave de API. Reemplace `MY_API_KEY` por su clave de API de la Datadog API:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
   ```

1. Agregue el archivo pillar `datadog.sls` al archivo pillar top (de forma predeterminada `/srv/pillar/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Para usar una verificación o integración específica del Agent en uno de sus hosts, puede usar la variable checks. Aquí hay un ejemplo para la integración directory:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
     checks:
       directory:
         config:
           instances:
             - directory: "/srv/pillar"
               name: "pillars"
   ```         

Consulte el [repositorio de GitHub][1] de la fórmula para obtener información sobre la configuración de logs, ejemplos de verificación y casos de uso avanzados.
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Instale desde el código fuente {#install-from-source}

<div class="alert alert-info">El Datadog Agent requiere Python 2.7 y <code>sysstat</code> en Linux.</div>

Utilice el script de instalación desde el código fuente de un solo paso. Reemplace `MY_API_KEY` por su clave de API de la Datadog API:

```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

El script instala el Agent en su propio sandbox autónomo ubicado en `~/.datadog-agent`.

Para hacer que la instalación sea permanente, configure su demonio `init` para ejecutar `$sandbox_dir/bin/agent` con `$sandbox_dir` establecido en el directorio de trabajo actual. El directorio del sandbox es portátil y puede ejecutarse desde cualquier ubicación en su sistema de archivos. El directorio del sandbox está configurado en `~/.datadog-agent` de forma predeterminada.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /es/agent/versions/upgrade_to_agent_v7/
[3]: https://install.datadoghq.com/datadog-agent-5.11.3-1.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[5]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-32bit-cli.msi
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /es/integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation