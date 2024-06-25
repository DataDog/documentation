---
further_reading:
- link: /getting_started/agent/
  tag: Documentación
  text: Empezando con el Agent
title: IoT Agent
---

## Información general

El Datadog IoT Agent es una versión del Agent optimizada para monitorizar los dispositivos IoT y las aplicaciones integradas. Los clientes lo usan para monitorizar una amplia gama de dispositivos, desde pantallas digitales a equipos de seguridad que ejecutan algoritmos de detección de imágenes.

## Funcionalidades

El IoT Agent incluye los siguientes checks de sistema. La configuración de los dispositivos IoT es idéntica a la de otros tipos de hosts.

- [Sistema][1] (abarca CPU, E/S, carga, memoria, intercambios y tiempo de actividad)
- [Disco][2]
- [Red][3]
- [Systemd][4]
- [NTP][5]

El IoT Agent también es compatible con:

- La recopilación de métricas personalizadas mediante un servidor [DogStatsD][6] integrado
- La recopilación de logs mediante [archivos de cola][7], [TCP/UDP][8] y [journald][9]

El IoT Agent no incluye el intérprete de Python ni otras integraciones que suelen venir en el paquete del Agent estándar. Tampoco admite el rastreo de APM, la monitorización de procesos en tiempo real ni la monitorización del rendimiento de la red.

## Configuración

### Requisitos

El IoT Agent está disponible en forma de paquetes DEB y RPM para dispositivos Linux que se ejecutan en arquitecturas x64, arm64 (ARMv8) y ARMv7.

#### Recursos

Los dispositivos IoT, normalmente, están más limitados en cuanto a recursos que los hosts de infraestructuras en la nube. El IoT Agent está pensado para ocupar la mínima superficie posible y consumir un ancho de banda mínimo.

Los requisitos exactos de un recurso varían en función del uso que hace de ellos el IoT Agent. En pruebas internas del IoT Agent (v7.20), Datadog descubrió lo siguiente:

- CPU: 0,5 % (en una máquina virtual con dos VCPU Intel Xeon)
- Memoria: 36 MB
- Ancho de banda de red: 237 bp/s (subida) / 79 bp/s (bajada)
- Disco: 63 MB

### Instalación

#### Automática

Para descargar e instalar automáticamente el IoT Agent correcto para tu sistema operativo y la arquitectura de tu conjunto de chips, usa el siguiente comando:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" DD_AGENT_FLAVOR=datadog-iot-agent bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

#### Manual

{{< tabs >}}
{{% tab "DEB" %}}

Para instalar el IoT Agent en sistemas operativos basados en Debian, ejecuta los siguientes comandos:

1. Actualiza `apt` e instala `apt-transport-https` para que se descargue a través de HTTPS, y `curl` y `gnupg` para obtener las siguientes claves de firma:
    ```bash
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Configura el repositorio Debian de Datadog en tu sistema e importa las claves apt de Datadog:
    ```bash
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Si ejecutas Ubuntu 14 o una versión anterior, o Debian 8 o una versión anterior, copia el conjunto de claves en `/etc/apt/trusted.gpg.d`:

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. Actualiza `apt` e instala el IoT Agent:
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-iot-agent datadog-signing-keys
    ```

5. Copia la configuración de ejemplo y especifica tu clave de API:
    ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. Define tu sitio Datadog como {{< region-param key="dd_site" code="true" >}}. El valor predeterminado es `datadoghq.com`.
    ```shell
    sudo sh -c "sed 's/# site:.*/site: <YOUR_DD_SITE>/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml
    ```

7. Inicia el IoT Agent:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

{{% /tab %}}
{{% tab "RPM" %}}

Para instalar de forma manual el IoT Agent en sistemas operativos basados en RPM, ejecuta los siguientes comandos:

1. Configura el repositorio Yum de Datadog en tu sistema creando `/etc/yum.repos.d/datadog.repo` con estos contenidos:
    ```
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/7/<HOST_ARCHITECTURE>
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

    **Nota**: Debido a un [error en dnf][1], utiliza `repo_gpgcheck=0` en lugar de `repo_gpgcheck=1` con RHEL/CentOS 8.1.

    El parámetro `baseurl` depende del sistema operativo de tu host: 
    - x86_64: `https://yum.datadoghq.com/stable/7/x86_64/`
    - arm64: `https://yum.datadoghq.com/stable/7/aarch64/`
    - ARMv7: `https://yum.datadoghq.com/stable/7/armv7hl/`

2. Actualiza el repositorio Yum local e instala el Agent:
    ```shell
    sudo yum makecache
    sudo yum install datadog-iot-agent
    ```

3. Copia la configuración de ejemplo y especifica tu clave de API:
    ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Define tu sitio Datadog como {{< region-param key="dd_site" code="true" >}}. El valor predeterminado es `datadoghq.com`.
    ```shell
    sudo sh -c "sed 's/# site:.*/site: <YOUR_DD_SITE>/' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml
    ```

5. Inicia el IoT Agent:
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}
{{< /tabs >}}

## Interfaz de línea de comandos (CLI)

El IoT Agent es compatible con los mismos [comandos de CLI][10] que el Agent estándar.

## Desinstalar

```shell
sudo apt-get remove datadog-iot-agent -y
```

Este comando borra el Agent, pero no elimina:

* el archivo de configuración `datadog.yaml`;
* los archivos que ha creado el usuario en la carpeta de configuración `/etc/datadog-agent`;
* los archivos que ha creado el usuario en la carpeta `/opt/datadog-agent`;
* el usuario `dd-agent`.

Si también quieres eliminar esos elementos, usa este comando:

```shell
sudo apt-get remove --purge datadog-iot-agent -y
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/system
[2]: /es/integrations/disk
[3]: /es/integrations/network
[4]: /es/integrations/systemd
[5]: /es/integrations/ntp
[6]: /es/developers/dogstatsd
[7]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[8]: /es/agent/logs/?tab=tcpudp#custom-log-collection
[9]: /es/agent/logs/?tab=journald#custom-log-collection
[10]: /es/agent/basic_agent_usage/#cli