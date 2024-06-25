---
further_reading:
- link: /agent/basic_agent_usage/
  tag: Documentación
  text: Uso básico del Agent
title: Instalar Datadog Agent 5
---

Esta guía cubre la instalación del Agent 5. Datadog recomienda instalar o actualizar al Agent 7 para obtener las últimas características. Para obtener información sobre la instalación de la última versión del Agent, sigue las [instrucciones de instalación del Agent 7][1]. Para obtener información sobre la actualización al Agent 7 desde una versión anterior, consulta [Actualización a Datadog Agent v7][2].

## macOS

### Instalar el Agent

#### Línea de comandos

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/Datadog/dd-Agent/master/packaging/osx/install.sh)"
{{< /code-block >}}

Para gestionar el Agent, utiliza el comando `datadog-agent`. Por defecto, el binario `datadog-agent` se encuentra en `/usr/local/bin`. Habilita o deshabilita integraciones en `/opt/datadog-agent/etc/conf.d`.

#### GUI

1. Descarga e instala el [paquete DMG][3].
1. Añade la siguiente línea a `/opt/datadog-agent/etc/datadog.conf`, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

Para gestionar el Agent, utiliza la aplicación Datadog Agent en la bandeja del sistema. Habilita o deshabilita integraciones en `/opt/datadog-agent/etc/conf.d`.

### Comportamiento de ejecución del Agent

Por defecto, Agent se ejecuta al iniciar sesión. Puedes desactivarlo utilizando la aplicación Datadog Agent en la bandeja del sistema. Si quieres ejecutar el Agent en el arranque, utiliza estos comandos:
{{< code-block lang="shell" >}}
sudo cp '/opt/datadog-agent/etc/com.datadoghq.agent.plist' /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

## Windows

### Instalar el Agent

#### GUI

Descarga y ejecuta el instalador de Datadog Agent :
- [Instalador de 64 bits][4].
- [Instalador de 32 bits][5]. Las instalaciones de 32 bits solo son compatibles hasta la versión 5.10.1 del Agent.

Los enlaces a todas las versiones disponibles del instalador de Windows están disponibles en [formato JSON][6].

#### Línea de comandos

1. Descarga el Agent:
   - Para instalaciones nuevas, descarga el [instalador de Datadog Agent][4].
   - Si estás actualizando desde una versión <5.12.0 de Datadog Agent, utiliza el [método de instalación EXE][7].
1. En un shell `cmd.exe` en el directorio donde descargaste el instalador, ejecuta el siguiente comando. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   Opcionalmente, añade los valores de `TAG` y `HOSTNAME`.

#### Implementación en Azure

Para instalar Agent en Azure, sigue la [documentación de Microsoft Azure][8].

### Nuevo procedimiento de actualización para 5.12

Si ya eres cliente y utilizas un Agent de Windows anterior a la versión 5.12, es posible que tengas que realizar pasos adicionales para actualizar tu dispositivo. En concreto, la última versión del Agent es una instalación "por máquina". Las versiones anteriores del Agent eran "por usuario" por defecto. También pueden ser necesarios pasos adicionales si estás implementando con Chef. Para obtener más información, consulta [Instalación de un Agent de Windows][9].

## Linux y Unix

{{< tabs >}}

{{% tab "Debian" %}}
### Instalación en un solo paso

El comando de un solo paso instala los paquetes APT para Datadog Agent y te pide tu contraseña. Si el Agent aún no está instalado en tu equipo y no quieres que se inicie automáticamente después de la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos

1. Configura APT para que pueda descargarse a través de HTTPS e instala `curl` y `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configura el repositorio de Debian Datadog en tu sistema y crea un conjunto de claves de archivo Datadog:
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
1. Si ejecutas Debian v8 o una versión anterior, copia el conjunto de claves en `/etc/apt/trusted.gpg.d`:
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Actualiza tu repositorio local de APT e instala el Agent:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Ejecuta el siguiente comando para copiar la configuración de ejemplo en su lugar. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Inicia el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Ubuntu" %}}
### Instalación en un solo paso

El comando de un solo paso instala los paquetes APT para Datadog Agent y te pide tu contraseña. Si el Agent aún no está instalado en tu equipo y no quieres que se inicie automáticamente después de la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos

1. Configura APT para que pueda descargarse a través de HTTPS e instala `curl` y `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configura el repositorio de Debian Datadog en tu sistema y crea un conjunto de claves de archivo Datadog:
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
1. Si ejecutas Debian v8 o una versión anterior, copia el conjunto de claves en `/etc/apt/trusted.gpg.d`:
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Actualiza tu repositorio local de APT e instala el Agent:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Ejecuta el siguiente comando para copiar la configuración de ejemplo en su lugar. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Inicia el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### Instalación en un solo paso

El comando de un solo paso instala los paquetes YUM para Datadog Agent y te pide tu contraseña. Si el Agent aún no está instalado en tu máquina y no quieres que se inicie automáticamente después de la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos

1. Configura el repositorio de YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con el siguiente contenido:
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

   **Nota**: En la arquitectura i386/i686, sustituye "x86_64" por "i386".

1. Actualiza el repositorio de YUM local e instala el Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copia la configuración de ejemplo en su lugar. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Reinicia el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```
{{% /tab %}}

{{% tab "CentOS y Red Hat" %}}
### Instalación en un solo paso

El comando de un solo paso instala los paquetes YUM para Datadog Agent y te pide tu contraseña. Si el Agent aún no está instalado en tu máquina y no quieres que se inicie automáticamente después de la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos

1. Configura el repositorio de YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con el siguiente contenido:
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

   **Nota**: En la arquitectura i386/i686, sustituye "x86_64" por "i386".

1. Actualiza tu repositorio de YUM local e instala el Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. Copia la configuración de ejemplo en su lugar. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Reinicia el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```
{{% /tab %}}

{{% tab "Fedora" %}}
### Instalación en un solo paso

El comando de un solo paso instala los paquetes YUM para Datadog Agent y te pide tu contraseña. Si el Agent aún no está instalado en tu máquina y no quieres que se inicie automáticamente después de la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos

1. Configura el repositorio de YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con el siguiente contenido:
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

   **Nota**: En la arquitectura i386/i686, sustituye "x86_64" por "i386".

1. Actualiza tu repositorio de YUM local e instala el Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copia la configuración de ejemplo en su lugar. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Reinicia el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```
{{% /tab %}}

{{% tab "Suse" %}}
### Instalación en un solo paso

El comando de un solo paso instala los paquetes YUM para Datadog Agent y te pide tu contraseña. Si el Agent aún no está instalado en tu máquina y no quieres que se inicie automáticamente después de la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Instalación en varios pasos

1. Configura el repositorio de YUM de Datadog creando `/etc/yum.repos.d/datadog.repo` con el siguiente contenido:
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

1. Actualiza tu repositorio zypper local e instala el Agent:
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. Copia la configuración de ejemplo en su lugar. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Reinicia el Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```
{{% /tab %}}

{{% tab "AIX" %}}
### Instalación en un solo paso

El comando de un solo paso instala la última versión del paquete BFF para Datadog Agent y te pide tu contraseña. Si el Agent aún no está instalado en tu máquina y no quieres que se inicie automáticamente después de la instalación, añade `DD_INSTALL_ONLY=true` al comando antes de ejecutarlo.

Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Actualización de una instalación anterior

Para instalar el Agent manteniendo tu configuración actual, ejecuta el siguiente comando:
```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

Para ver una lista completa de las variables de entorno del script de instalación disponibles, consulta [Uso básico del Agent de AIX][1].

### Instalación en varios pasos

1. Descarga el BFF preferido de las versiones de repositorios de [Datadog-unix-Agent][2]:
1. Instala el artefacto como raíz con `installp`:
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. Si no dispones de un archivo de configuración, copia la configuración de ejemplo. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Asegúrate de que Datadog Agent tiene los permisos correctos:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```
1. Detén el servicio del Agent:
   ```shell
   sudo stopsrc -s datadog-agent
   ```
1. Comprueba si el servicio del Agent se ha detenido:
   ```
   sudo lssrc -s datadog-agent
   ```
1. Reinicia el servicio del Agent:
   ```shell
   sudo startsrc -s datadog-agent
   ```

[1]: /es/agent/basic_agent_usage/aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
{{% /tab %}}

{{< /tabs >}}

## Nube y contenedores

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Instalar el Agent
### Instalación con DaemonSets

Si estás ejecutando Kubernetes >= 1.1.0, puedes aprovechar [DaemonSets][1] para implementar automáticamente Datadog Agent en todos tus nodos.

1. Crea un secreto que contenga tu clave de API. Este secreto se utiliza en el manifiesto para implementar Datadog Agent . Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key =" MY_API_KEY"
   ```

1. Crea el siguiente manifiesto denominado `dd-agent.yaml`:

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

1. Implementa el DaemonSet:
   ```shell
   kubectl create -f dd-agent.yaml
   ```

<div class="alert alert-info">Este manifiesto activa la función de auto-configuración de Autodiscovery. Para deshabilitar la función de auto-configuración, elimina la definición de la variable de entorno <code>SD_BACKEND</code>. Para saber cómo configurar Autodiscovery, consulta <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">Integraciones de Kubernetes Discovery</a>.</div>

### Ejecutar el Agent como contenedor Docker

Si no estás ejecutando Kubernetes 1.1.0 o una versión posterior, o si no quieres utilizar DaemonSets, ejecuta el Agent como contenedor Docker en cada nodo que quieras monitorizar. Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## Enviar métricas personalizadas

Si tienes previsto enviar [métricas personalizadas][2] utilizando DogStatsD:
1. Vincula el puerto StatsD del contenedor a la dirección IP del nodo añadiendo `hostPort` a la sección `ports` de tu manifiesto:
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. Configura tu biblioteca cliente para enviar paquetes UDP a la dirección IP del nodo. Si utilizas redes puente, la pasarela por defecto del contenedor de tu aplicación coincide con la dirección IP del nodo. También puedes utilizar la API descendente para exponer el nombre de host del nodo como una variable de entorno.

## Personaliza la configuración de tu Agent

Para personalizar la configuración de tu Agent, consulta la documentación en el repositorio de Agent 5 [docker-dd-Agent][3]. Para ajustar la configuración de Autodiscovery, consulta [Integraciones de Kubernetes Discovery][4]. Para desactivar Autodiscovery, elimina la variable de entorno `SD_BACKEND` de tu manifiesto.

Para obtener información sobre la recopilación de métricas, checks de servicios y eventos, consulta la documentación sobre la [integración de Kubernetes][5].

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /es/metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /es/containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /es/integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### Instalación en un solo paso

La instalación en un solo paso ejecuta un contenedor Docker que se integra a Datadog Agent para monitorizar tu host. La integración de Docker está habilitada por defecto, así como Autodiscovery en modo de auto-configuración. Para deshabilitar Autodiscovery, elimina la variable `SD_BACKEND` del comando de instalación en un solo paso.

#### Amazon Linux
Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Otros sistemas operativos
Ejecuta el siguiente comando, sustituyendo `MY_API_KEY` por tu clave de API de Datadog:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Resolución de problemas

Si el comando de instalación en un paso no funciona, es posible que tu sistema monte el directorio `cgroup` en un lugar inesperado o que no utilice CGroups para la gestión de la memoria. Los CGroups son necesarios para que el check de Docker funcione correctamente. Para habilitar los CGroups, consulta la documentación del repositorio de [docker-dd-Agent][1]. Si el check falla debido a la localización inesperada de un directorio `cgroup`:

1. Ejecuta `mount | grep "cgroup type tmpfs"` para recuperar la localización del directorio `cgroup`.
1. Sustituye la primera aparición de `/sys/fs/cgroup` en el comando de instalación en un solo paso por la localización del directorio `cgroup`.

### Envío de métricas personalizadas

Para enviar métricas personalizadas utilizando DogStatsD:
1. Añade la opción `-p 8125:8125/udp` al comando de instalación. Esto vincula el puerto StatsD del contenedor a la dirección IP del host.
1. Configura tu biblioteca cliente para enviar paquetes UDP a la dirección IP del host.

### Personaliza la configuración de tu Agent

Para personalizar la configuración de tu Agent, consulta la documentación en el repositorio de Agent 5 [docker-dd-Agent][2]. Para ajustar la configuración de Autodiscovery, consulta [Integraciones de Kubernetes Discovery][3]. Para deshabilitar Autodiscovery, elimina la variable de entorno `SD_BACKEND` del comando de instalación en un solo paso.

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/es/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
La ejecución de contenedores CoreOS Linux es compatible con el runtime de Docker. Para obtener instrucciones de instalación, consulta [Docker][1].

Para ejecutar CoreOS Tectonic en Kubernetes, consulta [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
Para obtener información sobre la instalación de Datadog con OpenShift, consulta el repositorio de [datadog-openshift][1].

[1]: https://github.com/DataDog/datadog-openshift

{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">La versión de BOSH de Datadog Agent solo funciona con células madre de Ubuntu y Red Hat.</a></div>

1. Carga la versión de Datadog Agent a tu director BOSH:

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. Configura Datadog como complemento en tu configuración de ejecución. Sustituye `MY_API_KEY` por tu clave de API de Datadog:

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

3. Añade el runtime a tu configuración de runtime:

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. Vuelve a implementar cualquier implementación existente:
   ```shell
   # BOSH cli v1
   bosh deployment myDeployment.yml
   bosh -n deploy

   # BOSH cli v2
   bosh -n -d myDeployment deploy myDeployment.yml
   ```

{{% /tab %}}

{{< /tabs >}}

## Gestión de la configuración

{{< tabs >}}
{{% tab "Ansible" %}}

<div class="alert alert-info">La colección Datadog Ansible es compatible con la mayoría de las distribuciones de Linux basadas en Debian, RHEL y SUSE, macOS y Windows. <br> requiere la versión 2.10 o posterior de Ansible.</div>

### Requisitos previos

#### Windows
Antes de poder utilizar la colección Ansible Datadog para gestionar hosts de Windows, debes instalar la colección `ansible.windows`:
```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE y SLES

Antes de poder utilizar la colección Ansible Datadog para gestionar los hosts openSUSE/SLES hosts, debes instalar la colección `community.general`:

```shell
ansible-galaxy collection install community.general
```

### Instala Datadog

1. Instala la colección Datadog Ansible desde Ansible Galaxy en tu servidor Ansible:
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - La colección Datadog Ansible también está disponible a través de [Red Hat Automation Hub][1] donde está oficialmente certificada por Red Hat.
   - Recomendamos instalar la colección. Si es necesario, también puedes instalar Datadog utilizando el [rol autónomo][2].

2. Para implementar Datadog Agent en hosts, añade el rol de Datadog y tu clave de API a tu cuaderno de estrategias. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
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

   Para asegurarte de que el Agent puede agrupar tus hosts, utiliza únicamente nombres de host de nodos que Datadog Agent esté rastreando. Puedes comprobar cuáles nombres de host está rastreando Agent, utilizando el siguiente comando:

   ```shell
   service datadog-agent info
   ```

## Checks específicos de Agent

Para utilizar un check o una integración específicos de Agent en uno de tus nodos, puedes utilizar la variable `datadog_checks`. He aquí un ejemplo de check de proceso:
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

Puedes encontrar más ejemplos de uso del rol de Agent en el repositorio de Github para el [rol autónomo][3].

### Métricas y eventos

Para obtener métricas y eventos en Datadog tras la ejecución de Ansible, consulta la [página de Github][4] del proyecto de callbacks Ansible.

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /es/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">El módulo <code>datadog_agent</code> solo es compatible con nodos Linux. <br> requiere Puppet Agent versión 2.7 o posterior.</a></div>

1. Instala el módulo `datadog_agent` desde [Puppet Forge][1] en tu servidor Puppet:
   - Para instalaciones nuevas, ejecuta el `module install command`:
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - Si el módulo ya está instalado, actualízalo:
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. Para implementar Datadog Agent en nodos, añade esta clase parametrizada a tus manifiestos. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY"
      }
   }
   ```

   Para asegurarte de que Agent puede agrupar tus hosts, utiliza únicamente nombres de host de nodos que Datadog Agent esté rastreando. Puedes comprobar qué nombres de host está rastreando Agent, utilizando el siguiente comando:

   ```shell
   service datadog-agent info
   ```

3. Habilita los informes a Datadog en tu servidor Puppet:
   1. Añade los siguientes parámetros a `/etc/puppet/puppet.conf`:
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```
   1. En tu manifiesto, añade la opción `puppet_run_reports` a tu servidor Puppet. Por ejemplo:
      ```puppet
      node "puppet" {
         class { "datadog_agent":
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Ejecuta Puppet en tu servidor Puppet para instalar todas las dependencias necesarias.
1. Reinicia tu servidor Puppet para empezar a recibir datos de Puppet en Datadog.

## Checks específicos de Agent

Para utilizar un check o una integración específicos de Agent en uno de tus nodos, consulta el [manifiesto de integración][2] correspondiente para ver un ejemplo de código. He aquí un ejemplo de integración de Elasticsearch:

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

<div class="alert alert-info">Requiere Chef v10.14.x o posterior.</a></div>

1. Añade el cookbook de Datadog:
   - Si utilizas [Berkshelf][1], añade el cookbook a tu Berksfile:
      ```shell
      cookbook 'datadog'
      ```

   - Si no estás utilizando Berkshelf, instala el cookbook en tu repositorio utilizando Knife:
     ```shell
     knife cookbook site install datadog 
     ```

1. Establece atributos específicos de Datadog en un rol, un entorno u otra receta. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"
   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"
   ```

1. Carga el cookbook actualizado en tu servidor de Chef:
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. Añade el cookbook a la `run_list` o al `role` de tu nodo:
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. Espera a la siguiente ejecución programada de `chef-client`.

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">La fórmula Saltstack Datadog solo es compatible con sistemas basados en Debian y RedHat.<br><br>
Las siguientes instrucciones añaden la fórmula Datadog al entorno de base Salt. Para añadirla a otro entorno Salt, sustituye las referencias a <code>base</code> por el nombre de tu entorno Salt.</div>

<!-- vale Datadog.inclusive = NO -->

### Instalar utilizando `gitfs_remotes`
1. Instala la [fórmula Datadog][1] en el entorno de base de tu nodo Salt Master utilizando la opción `gitfs_remotes` en tu archivo de configuración Salt Master (por defecto `/etc/salt/master`):
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

1. Reinicia tu servicio Salt Master:
   ```shell
   systemctl restart salt-master
   ```
   o 
   ```shell
   service salt-master restart
   ```

### Instálalo clonando la fórmula Datadog 

1. Clona la [fórmula Datadog][1] en tu nodo Salt Master:
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Añade la fórmula clonada al entorno de base en el `file_roots` de tu archivo de configuración de Salt Master (por defecto `/etc/salt/master`):
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## Implementa el Agent en tus hosts

1. Añade la fórmula Datadog a tu archivo superior (por defecto `/srv/salt/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Añade un archivo pillar `datadog.sls` a tu directorio pillar (por defecto `/srv/pillar/`) y añade tu clave de API. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
   ```

1. Añade el archivo pillar `datadog.sls` al archivo pillar superior (por defecto `/srv/pillar/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Para utilizar un check o una integración específicos de Agent en uno de tus hosts, puedes utilizar la variable checks. He aquí un ejemplo de integración de un directorio:
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

Consulta la fórmula [repositorio de Github][1] para la configuración de logs, ejemplos de check y casos de uso avanzados.
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Instalar desde el origen

<div class="alert alert-info">Datadog Agent requiere Python 2.7 y <code>sysstat</code> en Linux.</div>

Utiliza el script de instalación de origen en un solo paso. Sustituye `MY_API_KEY` por tu clave de API de Datadog:
```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

El script instala el Agent en su propio sandbox aislado ubicado en `~/.datadog-agent`.

Para que la instalación sea permanente, configura tu daemon `init` para que ejecute `$sandbox_dir/bin/agent` con `$sandbox_dir` en el directorio de trabajo actual. El directorio sandbox es portátil y puede ejecutarse desde cualquier ubicación de tu sistema de archivos. El directorio sandbox está configurado por defecto en `~/.datadog-agent`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /es/agent/versions/upgrade_to_agent_v7/
[3]: https://s3.amazonaws.com/dd-agent/datadog-agent-5.11.3-1.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[5]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-32bit-cli.msi
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /es/integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
