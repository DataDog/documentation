---
aliases:
- /es/agent/faq/how-do-i-uninstall-the-agent/
further_reading:
- link: /agent/
  tag: Documentación
  text: Más información sobre el Datadog Agent
kind: guía
title: Desinstalar el Agent
---

Elige tu plataforma para ver las instrucciones específicas para desinstalar el Agent:

## Debian y Ubuntu

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}
```shell
sudo apt-get remove datadog-agent -y
```

> Este comando elimina el Agent, pero no elimina:

* el archivo de configuración `datadog.yaml`,
* los archivos creados por el usuario en la carpeta de configuración`/etc/datadog-agent`,
* los archivos creados por el usuario en la carpeta `/opt/datadog-agent`,
* el usuario `dd-agent`.

> Si también deseas eliminar estos elementos, utiliza este comando en su lugar:

```shell
sudo apt-get remove --purge datadog-agent -y
```
{{% /tab %}}

{{% tab "Agent v5" %}}
```shell
sudo apt-get remove datadog-agent -y
```

Este comando elimina el Agent, pero no elimina:
* el archivo de configuración `datadog.yaml`,
* los archivos creados por el usuario en la carpeta de configuración `/etc/dd-agent`,
* los archivos creados por el usuario en la carpeta `/opt/datadog-agent`,
* el usuario `dd-agent`.
> Si también deseas eliminar estos elementos, utiliza este comando en su lugar:

```shell
sudo apt-get --purge remove datadog-agent -y
```
{{% /tab %}}
{{< /tabs >}}

## CentOS, RHEL, Fedora y Amazon Linux
{{< tabs >}}
{{% tab "Agent v6 y v7" %}}


```shell
sudo yum remove datadog-agent
```

> Este comando elimina el Agent, pero no elimina:
* el archivo de configuración `datadog.yaml`,
* los archivos creados por el usuario en la carpeta de configuración `/etc/datadog-agent`,
* los archivos creados por el usuario en la carpeta `/opt/datadog-agent`,
* el usuario `dd-agent`.

> Si también deseas eliminar estos elementos y tus archivos de logs de Datadog, ejecuta este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "Agent v5" %}}
```shell
sudo yum remove datadog-agent
```

> Este comando elimina el Agent, pero no elimina:

* el archivo de configuración `datadog.yaml`,
* los archivos creados por el usuario en la carpeta de configuración `/etc/dd-agent`,
* los archivos creados por el usuario en la carpeta `/opt/datadog-agent`,
* el usuario `dd-agent`.

> Si también deseas eliminar estos elementos y tus archivos de logs de Datadog, ejecuta este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}

## openSUSE y SLES
{{< tabs >}}
{{% tab "Agent v6 y v7" %}}
```shell
sudo zypper remove datadog-agent
```

> Este comando elimina el Agent, pero no elimina:
* el archivo de configuración `datadog.yaml`,
* los archivos creados por el usuario en la carpeta de configuración `/etc/datadog-agent`,
* los archivos creados por el usuario en la carpeta `/opt/datadog-agent`,
* el usuario `dd-agent`.

> Si también deseas eliminar estos elementos y tus archivos de logs de Datadog, ejecuta este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "Agent v5" %}}

```shell
sudo zypper remove datadog-agent
```

Este comando elimina el Agent, pero no elimina:
* el archivo de configuración `datadog.yaml`,
* los archivos creados por el usuario en la carpeta de configuración `/etc/dd-agent`,
* los archivos creados por el usuario en la carpeta `/opt/datadog-agent`,
* el usuario `dd-agent`.

Si también deseas eliminar estos elementos y tus archivos de logs de Datadog, ejecuta este comando después de eliminar el Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}
## macOS
{{< tabs >}}
{{% tab "Agent v6 y v7" %}}
**Instalación por un solo usuario**

Para eliminar el Agent y todos sus archivos de configuración:
1. Detén y cierra el Datadog Agent con el icono en forma de hueso en la bandeja.
2. Arrastra la aplicación de Datadog desde el directorio de aplicaciones a la papelera.
3. Ejecuta los siguientes comandos:
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    launchctl remove com.datadoghq.agent
    sudo rm -rf /var/log/datadog
    ```
4. Reinicia el equipo para que se apliquen los cambios.

**Instalación de LaunchDaemon en todo el sistema**

Para eliminar el Agent y todos sus archivos de configuración:
1. Arrastra la aplicación de Datadog desde el directorio de aplicaciones a la papelera.
2. Para eliminar los archivos que queden, ejecuta lo siguiente:
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    sudo launchctl disable system/com.datadoghq.agent && sudo launchctl bootout system/com.datadoghq.agent
    sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm -rf /var/log/datadog
    ```
3. Reinicia el equipo para que se apliquen los cambios.
{{% /tab %}}

{{% tab "Agent v5" %}}
1. Detén y cierra el Datadog Agent con el icono en forma de hueso en la bandeja.
2. Arrastra la aplicación de Datadog desde el directorio de aplicaciones a la papelera.
3. Ejecuta lo siguiente:

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/** #to remove broken symlinks
```

Si has ejecutado los comandos de instalación opcionales para que el Agent se ejecute en el arranque, ejecuta lo siguiente para finalizar la desinstalación:

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

> Este método elimina el Agent, así como todos sus archivos de configuración.
{{% /tab %}}
{{< /tabs >}}

## Windows

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

Existen dos métodos diferentes para desinstalar el Agent en Windows. Ambos eliminan el Agent, pero no eliminan la carpeta de configuración `C:\ProgramData\Datadog` en el host.

### Añadir o eliminar programas

1. Pulsa **CTRL** y **Esc** o utiliza la tecla de Windows para ejecutar Windows Search.
1. Busca `add` y haz clic en ****Add or remove programs** (Añadir o eliminar programas).
1. Busca `Datadog Agent` y haz clic en **Uninstall** (Desinstalar).

### PowerShell

**Nota:** Habilita WinRM para usar los comandos que se muestran a continuación.

Utiliza uno de los siguientes comandos de PowerShell para desinstalar el Agent sin tener que reiniciar:
```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber, 'REBOOT=ReallySuppress')
```

Para ello, utiliza `/norestart`:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

{{% /tab %}}

{{% tab "Agent v5" %}}

Existen dos métodos diferentes para desinstalar el Agent en Windows. Ambos eliminan el Agent, pero no eliminan la carpeta de configuración `C:\ProgramData\Datadog` en el host.

> **Nota**: En versiones anteriores a la 5.12.0 del Agent, es importante desinstalarlo a través de la **cuenta original** con la que se instaló, de lo contrario puede que no se elimine correctamente.

### Añadir o eliminar programas

1. Pulsa **CTRL** y **Esc** o utiliza la tecla de Windows para ejecutar Windows Search.
1. Busca `add` y haz clic en ****Add or remove programs** (Añadir o eliminar programas).
1. Busca `Datadog Agent` y haz clic en **Uninstall** (Desinstalar).

### PowerShell

**Nota:** Habilita WinRM para usar los comandos que se muestran abajo.

Utiliza el siguiente comando de PowerShell para desinstalar el Agent sin tener que reiniciar:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

{{% /tab %}}
{{< /tabs >}}