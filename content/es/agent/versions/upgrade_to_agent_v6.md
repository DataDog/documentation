---
aliases:
- /es/agent/faq/upgrade-to-agent-v6
- /es/agent/guide/upgrade-to-agent-v6
title: Actualizar el Datadog Agent a la versión 6
---

<div class="alert alert-info">
La versión 7 del Agent ya está disponible. <a href="/agent/versions/upgrade_to_agent_v7">Actualiza a la última versión</a> para acceder a las nuevas funciones.
</div>

## Actualizar el Agent a la versión 6

Si ya has instalado el Agent v5, hay un script disponible para instalar el nuevo Agent o actualizar a la última versión automáticamente. Configurará por ti los repositorios de paquetes e instalará el paquete del Agent. Cuando actualices, la herramienta de importación también buscará si existe un `datadog.conf` de una versión anterior, y convertirá las configuraciones del Agent y de los checks conforme al nuevo formato de la versión 6. Selecciona tu plataforma a continuación para encontrar instrucciones específicas. Puedes descargar el [paquete DMG e instalarlo manualmente](#manual-upgrade) o utilizar el [script de instalación de una línea](#one-step-upgrade).

## Actualización en un paso

{{< tabs >}}
{{% tab "Linux" %}}

El instalador del Agent v6 puede convertir automáticamente las configuraciones de la versión 5 durante la actualización:

El siguiente comando funciona en Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu y SUSE:
: `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"`

**Nota:** El proceso de importación no moverá automáticamente los checks **personalizados** del Agent. Esto es así por diseño, ya que Datadog no puede garantizar una compatibilidad completa con versiones anteriores de forma predefinida.

{{% /tab %}}
{{% tab "Windows" %}}

No existe una instalación en un paso para plataformas Windows; consulta la sección [Actualización manual](#manual-upgrade).

{{% /tab %}}
{{% tab "MacOS" %}}

El instalador del Agent v6 puede convertir automáticamente las configuraciones de la versión 5 durante la actualización:

```shell
DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

**Nota:** El proceso de importación no moverá automáticamente los checks **personalizados** del Agent. Esto es así por diseño, ya que Datadog no puede garantizar una compatibilidad completa con versiones anteriores de forma predefinida.

{{% /tab %}}
{{< /tabs >}}

## Actualización manual

{{< tabs >}}
{{% tab "Linux" %}}

A continuación, encontrarás las instrucciones de actualización manual para:

- [Actualización a la versión 6 del Agent](#upgrade-to-agent-6)
- [Actualización en un paso](#one-step-upgrade)
- [Actualización manual](#manual-upgrade)
  - [Amazon Linux](#amazon-linux)
  - [CentOS](#centos)
  - [Debian](#debian)
  - [Fedora](#fedora)
  - [Red Hat](#red-hat)
  - [Ubuntu](#ubuntu)
  - [SUSE](#suse)

### Amazon Linux

1. Configura el repositorio Yum de Datadog en tu sistema creando `/etc/yum.repos.d/datadog.repo` con estos contenidos:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. Actualiza tu repositorio Yum local e instala el Agent:
    ```shell
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. Copia la configuración de ejemplo en su lugar y especifica tu clave de API:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Haz la transición de tus rutas y formatos de configuración del Agent de la versión 5 a la versión 6 del Agent con el comando `import`. El comando parseará un `datadog.conf` existente de la versión 5 y convertirá las opciones de configuración al nuevo formato del `datadog.yaml` de la versión 6. Además, copiará los archivos de configuración de los checks que se encuentren actualmente activados:
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. (Re)inicia el Agent:

    * Amazon Linux 2.0:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Amazon Linux 1.0:
    ```shell
    sudo initctl start datadog-agent
    ```

### CentOS

1. Configura el repositorio Yum de Datadog en tu sistema creando `/etc/yum.repos.d/datadog.repo` con estos contenidos:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

   **Nota**: Debido a un [error en dnf][1], utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` en CentOS 8.1.

2. Actualiza tu repositorio Yum local e instala el Agent:
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copia la configuración de ejemplo en su lugar y especifica tu clave de API:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Haz la transición de tus rutas y formatos de configuración del Agent de la versión 5 a la versión 6 del Agent con el comando `import`. El comando parseará un `datadog.conf` existente de la versión 5 y convertirá las opciones de configuración al nuevo formato del `datadog.yaml` de la versión 6. Además, copiará los archivos de configuración de los checks que se encuentren actualmente activados:
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Reinicia el Agent:

    * CentOS 7 y versiones posteriores:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * CentOS 6:
    ```shell
    sudo initctl restart datadog-agent
    ```

### Debian

1. Activa la compatibilidad HTTPS para APT, e instala `curl` y `gnupg`:
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Configura el repositorio de API de Datadog en tu sistema e importa las claves APT de Datadog:
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Si ejecutas Debian 8 o una versión anterior, copia el conjunto de claves en `/etc/apt/trusted.gpg.d`:

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. Actualiza la caché de APT local e instala el Agent:
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-agent datadog-signing-keys
    ```

5. Copia la configuración de ejemplo en su lugar y especifica tu clave de API:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. Haz la transición de tus rutas y formatos de configuración del Agent de la versión 5 a la versión 6 del Agent con el comando `import`. El comando parseará un `datadog.conf` existente de la versión 5 y convertirá las opciones de configuración al nuevo formato del `datadog.yaml` de la versión 6. Además, copiará los archivos de configuración de los checks que se encuentren actualmente activados:
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

7. Inicia el Agent:
    ```shell
    sudo service datadog-agent start
    ```

### Fedora

1. Configura el repositorio Yum de Datadog en tu sistema creando `/etc/yum.repos.d/datadog.repo` con estos contenidos:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. Actualiza tu repositorio Yum local e instala el Agent:
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copia la configuración de ejemplo en su lugar y especifica tu clave de API:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Haz la transición de tus rutas y formatos de configuración del Agent de la versión 5 a la versión 6 del Agent con el comando `import`. El comando parseará un `datadog.conf` existente de la versión 5 y convertirá las opciones de configuración al nuevo formato del `datadog.yaml` de la versión 6. Además, copiará los archivos de configuración de los checks que se encuentren actualmente activados:
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Reinicia el Agent
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

### Red Hat

1. Configura el repositorio Yum de Datadog en tu sistema creando `/etc/yum.repos.d/datadog.repo` con estos contenidos:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

   **Nota**: Debido a un [error en dnf][1], utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` en RHEL 8.1.

2. Actualiza tu repositorio Yum local e instala el Agent:
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copia la configuración de ejemplo en su lugar y especifica tu clave de API:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Haz la transición de tus rutas y formatos de configuración del Agent de la versión 5 a la versión 6 del Agent con el comando `import`. El comando parseará un `datadog.conf` existente de la versión 5 y convertirá las opciones de configuración al nuevo formato del `datadog.yaml` de la versión 6. Además, copiará los archivos de configuración de los checks que se encuentren actualmente activados:
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Reinicia el Agent:

    * Red Hat 7 y versiones posteriores:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Red Hat 6:
    ```shell
    sudo initctl restart datadog-agent
    ```

### Ubuntu

1. Activa la compatibilidad HTTPS para APT, e instala `curl` y `gnupg`:
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Configura el repositorio de API de Datadog en tu sistema e importa las claves APT de Datadog:
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Si ejecutas Ubuntu 14 o una versión anterior, copia el conjunto de claves en `/etc/apt/trusted.gpg.d`:

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. Actualiza la caché de APT local e instala el Agent:
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-agent datadog-signing-keys
    ```

5. Copia la configuración de ejemplo en su lugar y especifica tu clave de API:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. Haz la transición de tus rutas y formatos de configuración del Agent de la versión 5 a la versión 6 del Agent con el comando `import`. El comando parseará un `datadog.conf` existente de la versión 5 y convertirá las opciones de configuración al nuevo formato del `datadog.yaml` de la versión 6. Además, copiará los archivos de configuración de los checks que se encuentren actualmente activados:
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

7. Inicia el Agent:

    * Ubuntu 16.04 o versiones posteriores:
    ```shell
    sudo systemctl start datadog-agent
    ```

    * Ubuntu 14.04 o versiones anteriores:
    ```shell
    sudo initctl start datadog-agent
    ```

### SUSE

1. Configura el repositorio Yum de Datadog en tu sistema creando `/etc/zypp/repos.d/datadog.repo` con estos contenidos:
  ```ini
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=1
  gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  ```

2. Actualiza tu repositorio Zypper local e instala el Agent:
  ```shell
  sudo zypper refresh
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  sudo zypper install datadog-agent
  ```

3. Copia la configuración de ejemplo en su lugar y especifica tu clave de API:
  ```shell
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. Haz la transición de tus rutas y formatos de configuración del Agent de la versión 5 a la versión 6 del Agent con el comando `import`. El comando parseará un `datadog.conf` existente de la versión 5 y convertirá las opciones de configuración al nuevo formato del `datadog.yaml` de la versión 6. Además, copiará los archivos de configuración de los checks que se encuentren actualmente activados:
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Reinicia el Agent:
  ```shell
  sudo systemctl restart datadog-agent.service
  ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{% tab "Windows" %}}

Descarga la [última versión disponible][1] y ejecuta el paquete de instalación.

Haz la transición de tus rutas y formatos de configuración del Agent de la versión 5 a la versión 6 del Agent con el comando `import`. El comando parseará un `datadog.conf` existente de la versión 5 y convertirá las opciones de configuración al nuevo formato del `datadog.yaml` de la versión 6. Además, copiará los archivos de configuración de los checks que se encuentren actualmente activados:

`datadog-agent import <OLD_CONFIGURATION_DIRECTORY> <DESTINATION_DIRECTORY>`

Con:

* `<OLD_CONFIGURATION_DIRECTORY>` es el directorio que contiene el archivo `datadog.conf`
* `<DESTINATION_DIRECTORY>` es el directorio donde se escribe el  `datadog.yaml` importado (puedes usar el mismo directorio que `<OLD_CONFIGURATION_DIRECTORY>`).

**Nota**: `datadog.conf` se actualiza automáticamente a `datadog.yaml` al actualizar.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
{{% /tab %}}
{{% tab "MacOS" %}}

1. Descarga el paquete DMG de la última versión del Agent. Utiliza la última versión de macOS indicada en la [página de versiones][9] del repositorio.
2. Instala el paquete DMG.
3. Añade tu clave de API a `/opt/datadog-agent/etc/datadog.yaml`.
4. Haz la transición de tus rutas y formatos de configuración del Agent de la versión 5 a la versión 6 del Agent con el comando `import`. El comando parseará un `datadog.conf` existente de la versión 5 y convertirá las opciones de configuración al nuevo formato del `datadog.yaml` de la versión 6. Además, copiará los archivos de configuración de los checks que se encuentren actualmente activados:
    `datadog-agent import /opt/datadog-agent/etc/ /opt/datadog-agent/etc/`

A continuación, inicia la aplicación Datadog Agent (una vez iniciada, deberías verla en la bandeja del sistema) y gestiona el Agent desde ahí. La versión 6 del Agent incluye una GUI web para editar los archivos de configuración del Agent, entre otras cosas.

https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}