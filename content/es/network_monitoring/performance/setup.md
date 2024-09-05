---
aliases:
- /es/network_performance_monitoring/installation/
description: Recopila tus datos de red con el Agent.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Network Performance Monitoring
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: Blog
  text: Datadog NPM con contenedores y redes con mallas de servicios
- link: /network_monitoring/devices
  tag: Documentación
  text: Monitorización de dispositivos de red
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog NPM ya es compatible con la red Consul
title: Configuración de Network Performance Monitoring
---

Datadog Network Performance Monitoring (NPM) te ofrece visibilidad del tráfico de red entre servicios, contenedores, zonas de disponibilidad y cualquier otra etiqueta (tag) en Datadog para que puedas:

- Localizar dependencias de servicios inesperadas o latentes.
- Optimizar la costosa comunicación entre regiones o nubes múltiples.
- Identificar las interrupciones en las regiones proveedoras de la nube y las herramientas de terceros.
- Solucionar problemas de detección de servicios defectuosos con métricas del servidor DNS.

Network Performance Monitoring requiere el [Datadog Agent v6.14 o posterior][1]. Dado que las métricas se recopilan automáticamente en versiones superiores del Agent, consulta la [sección de configuración de métricas][2] para configurar la monitorización DNS.

## Plataformas compatibles

### Sistemas operativos

#### Sistema operativo Linux

La recopilación de datos se realiza utilizando eBPF, por lo que Datadog requiere mínimamente plataformas que tengan versiones del kernel Linux subyacente 4.4.0 o posteriores o que tengan backports de las características de eBPF. NPM es compatible con las siguientes distribuciones de Linux:

- Ubuntu v16.04 o posterior
- Debian v9 o posterior
- Fedora v26 o posterior
- SUSE v15 o posterior
- Amazon AMI v2016.03 o posterior
- Amazon Linux v2
- CentOS/RHEL v7.6 o posterior

**Nota:** Existe una excepción al requisito del kernel v4.4.0 o posterior para [CentOS/RHEL v7.6 o posterior][3]. La función [DNS Resolution][4] no es compatible con CentOS/RHEL v7.6.

#### Sistema operativo Windows

La recopilación de datos se realiza mediante un controlador de dispositivo kernel de red. La compatibilidad está disponible a partir del Datadog Agent versión 7.27.1, para versiones de Windows 2012 R2 (y sistemas operativos de escritorio equivalentes, incluido Windows 10) y posteriores.

#### macOS

Datadog Network Performance Monitoring no es compatible con plataformas macOS.

### Contenedores

NPM te ayuda a visualizar la arquitectura y el rendimiento de tus entornos contenedorizados y orquestados, con compatibilidad para [Docker][5], [Kubernetes][6], [ECS][7] y otras tecnologías de contenedor. Las integraciones de contenedores de Datadog te permiten agregar tráfico por entidades significativas, como contenedores, tareas, pods, clústeres y despliegues, con etiquetas predefinidas como `container_name`, `task_name` y `kube_service`.

NPM no es compatible con Autopilot de Google Kubernetes Engine (GKE).

### Herramientas de enrutamiento en la red

#### Istio

Con NPM, puedes asignar la comunicación de red entre contenedores, pods y servicios a través de la malla de servicios Istio.

Datadog monitoriza todos los aspectos de tu entorno Istio para que también puedas:

- Evaluar el estado de Envoy y el plano de control de Istio con [logs][8].
- Desglosar el rendimiento de tu malla de servicios con [métricas][8] de solicitudes, ancho de banda y consumo de recursos.
- Examinar trazas (traces) distribuidas de aplicaciones que realizan transacciones a lo largo de la malla con [APM][9].

NPM es compatible con Istio v1.6.4 o posterior con el [Datadog Agent v7.24.1 o posterior][1].

Para obtener más información sobre la monitorización de tu entorno Istio con Datadog, [consulta el blog de Istio][10].

#### Cilium

Network Performance Monitoring es compatible con instalaciones **Cilium**, siempre que se cumplan los siguientes requisitos:
1) Cilium v1.6 y posteriores, y
2) Kernel v5.1.16 y posteriores, o v4.19.57 y posteriores para kernels 4.19.x

### Sistemas de aprovisionamiento

Network Performance Monitoring es compatible con el uso de los siguientes sistemas de aprovisionamiento:

- Daemonset / Helm v1.38.11 o posterior: Consulta el [Helm Chart de Datadog][11]
- Chef v12.7 o posterior: Consulta la [receta de Datadog Chef][12]
- Ansible v2.6 o posterior: Consulta el [rol Ansible de Datadog][13]

## Configuración

Dado que la potencia y el enfoque de esta herramienta se centran en el análisis del tráfico entre endpoints de red y la asignación de dependencias red, recomendamos instalarla en un subconjunto significativo de tu infraestructura y en un **mínimo de 2 hosts** para maximizar su valor.

{{< tabs >}}
{{% tab "Agent (Linux)" %}}

Para habilitar Network Performance Monitoring con el Datadog Agent, utiliza las siguientes configuraciones:

1. **Si utilizas una versión del Agent anterior a v6.14 o posterior**, habilita primero [la recopilación de procesos en directo][1], de lo contrario, omite este paso.

2. Copia la configuración de ejemplo de sonda del sistema:

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Edita `/etc/datadog-agent/system-probe.yaml` para definir el indicador de habilitación como `true`:

    ```yaml
    network_config:   # use system_probe_config for Agent's older than 7.24.1
      ## @param enabled - boolean - optional - default: false
      ## Set to true to enable Network Performance Monitoring.
      #
      enabled: true
    ```

4. **Si estás ejecutando una versión del Agent anterior a v6.18 o v7.18**, inicia manualmente la sonda del sistema y habilítala para que se inicie al arrancar (a partir de v6.18 y v7.18, la sonda del sistema se inicia automáticamente al arrancar el Agent):

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **Nota**: Si el comando `systemctl` no está disponible en tu sistema, inícialo con el siguiente comando: `sudo service datadog-agent-sysprobe start` y luego configúralo para que se inicie al arrancar, antes de que se inicie `datadog-agent`.

5. [Reinicia el Agent][2].

    ```shell
    sudo systemctl restart datadog-agent
    ```

    **Nota**: Si el comando `systemctl` no está disponible en tu sistema, ejecuta el siguiente comando: `sudo service datadog-agent restart`.

### Sistemas habilitados por SELinux

En sistemas con SELinux habilitado, el binario de la sonda del sistema necesita permisos especiales para utilizar las funciones de eBPF.

El paquete RPM del Datadog Agent para sistemas basados en CentOS incluye una [política SELinux][3] para conceder estos permisos al binario de la sonda del sistema.

Si necesitas utilizar Network Performance Monitoring en otros sistemas con SELinux habilitado, haz lo siguiente:

1. Modifica la [política SELinux][3] de base para que coincida con tu configuración de SELinux.
   Dependiendo de tu sistema, algunos tipos o atributos pueden no existir (o pueden tener nombres diferentes).

2. Compila la política en un módulo; suponiendo que el archivo de tu política se llame `system_probe_policy.te`:

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. Aplica el módulo a tu sistema SELinux:

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. Cambia el tipo de binario de la sonda del sistema para utilizar el que está definido en la política; suponiendo que el directorio de instalación de tu Agent sea `/opt/datadog-agent`:

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [Reinicia el Agent][2].

**Nota**: Estas instrucciones requieren tener algunas funciones de SELinux instaladas en el sistema (`checkmodule`, `semodule`, `semodule_package`, `semanage` y `restorecon`), disponibles en la mayoría de las distribuciones estándar (Ubuntu, Debian, RHEL, CentOS, SUSE). Consulta tu distribución para ver más detalles sobre cómo instalarlas.

Si estas funciones no existen en tu distribución, sigue el mismo procedimiento pero en este caso utiliza las funciones proporcionadas por tu distribución.


[1]: /es/infrastructure/process/?tab=linuxwindows#installation
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Agent (Windows)" %}}

La recopilación de datos de Windows depende de un controlador de filtro para recopilar los datos de red.

Para habilitar Network Performance Monitoring en hosts de Windows:

1. Instala el [Datadog Agent][1] (versión 7.27.1 o posterior) con el componente del controlador de red habilitado.

   [OBSOLETO] (versión 7.44 o anterior) Durante la instalación, pasa `ADDLOCAL="MainApplication,NPM"` al comando `msiexec` o selecciona "Network Performance Monitoring" cuando ejecutes la instalación del Agent a través de la GUI.

1. Edita `C:\ProgramData\Datadog\system-probe.yaml` para definir el indicador habilitado como `true`:

    ```yaml
    network_config:
        enabled: true
    ```
3. [Reinicia el Agent][2].

    Para PowerShell (`powershell.exe`):
    ```shell
    restart-service -f datadogagent
    ```
    Para Command Prompt (`cmd.exe`):
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```
**Nota**: Network Performance Monitoring sólo monitoriza hosts de Windows y no contenedores de Windows.


[1]: /es/agent/basic_agent_usage/windows/?tab=commandline
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

Para habilitar Network Performance Monitoring con Kubernetes utilizando Helm, añade lo siguiente a tu archivo `values.yaml`.</br>
**Se requiere Helm chart v2.4.39 o posterior**. Para obtener más información, consulta la [documentación de Datadog Helm Chart][1].

  ```yaml
  datadog:
    networkMonitoring:
      enabled: true
  ```

**Nota**: Si recibes un error de permisos al configurar NPM en tu entorno Kubernetes: `Error: error enabling protocol classifier: permission denied`, añade lo siguiente a tu `values.yaml`. (Consulta esta [sección][5] en el Helm chart):

  ```yaml
  agents:
    podSecurity:
      apparmor:
        enabled: true
  ```

Si no utilizas Helm, puedes habilitar Network Performance Monitoring con Kubernetes desde cero:

1. Descarga la plantilla [datadog-agent.yaml manifest][2].
2. Sustituye `<DATADOG_API_KEY>` por tu [clave de API Datadog][3].
3. (Opcional) **Configura tu sitio Datadog**. Si utilizas el sitio Datadog EU, configura la variable de entorno `DD_SITE` como `datadoghq.eu` en el manifiesto `datadog-agent.yaml`.
4. **Despliega el DaemonSet** con el comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

Si el [Agent ya se ejecuta con un manifiesto][4]:

1. Añade la anotación `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` en la plantilla `datadog-agent`:

    ```yaml
    spec:
        selector:
            matchLabels:
                app: datadog-agent
        template:
            metadata:
                labels:
                    app: datadog-agent
                name: datadog-agent
                annotations:
                    container.apparmor.security.beta.kubernetes.io/system-probe: unconfined
    ```

2. Habilita el proceso de recopilación y la sonda del sistema con las siguientes variables de entorno en el DaemonSet del Agent. Si estás ejecutando un contenedor por cada proceso del Agent, añade las siguientes variables de entorno al Agent de proceso, de lo contrario, añádelas al contenedor del Agent.

    ```yaml
      # (...)
                      env:
                      # (...)
                          - name: DD_PROCESS_AGENT_ENABLED
                            value: 'true'
                          - name: DD_SYSTEM_PROBE_ENABLED
                            value: 'true'
                          - name: DD_SYSTEM_PROBE_EXTERNAL
                            value: 'true'
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
    ```

3. Monta los siguientes volúmenes adicionales en el contenedor `datadog-agent`:

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'gcr.io/datadoghq/agent:latest'
                      # (...)
                  volumeMounts:
                      - name: procdir
                        mountPath: /host/proc
                        readOnly: true
                      - name: cgroups
                        mountPath: /host/sys/fs/cgroup
                        readOnly: true
                      - name: debugfs
                        mountPath: /sys/kernel/debug
                      - name: sysprobe-socket-dir
                        mountPath: /var/run/sysprobe
    ```

4. Añade una nueva sonda del sistema como elemento adicional del Agent:

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'gcr.io/datadoghq/agent:latest'
                    # (...)
                    - name: system-probe
                      image: 'gcr.io/datadoghq/agent:latest'
                      imagePullPolicy: Always
                      securityContext:
                          capabilities:
                              add:
                                  - SYS_ADMIN
                                  - SYS_RESOURCE
                                  - SYS_PTRACE
                                  - NET_ADMIN
                                  - NET_BROADCAST
                                  - NET_RAW
                                  - IPC_LOCK
                                  - CHOWN
                      command:
                          - /opt/datadog-agent/embedded/bin/system-probe
                      env:
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
                      resources:
                          requests:
                              memory: 150Mi
                              cpu: 200m
                          limits:
                              memory: 150Mi
                              cpu: 200m
                      volumeMounts:
                          - name: procdir
                            mountPath: /host/proc
                            readOnly: true
                          - name: cgroups
                            mountPath: /host/sys/fs/cgroup
                            readOnly: true
                          - name: debugfs
                            mountPath: /sys/kernel/debug
                          - name: sysprobe-socket-dir
                            mountPath: /var/run/sysprobe
    ```

5. Por último, añada los siguientes volúmenes a tu manifiesto:

    ```yaml
                volumes:
                    - name: sysprobe-socket-dir
                      emptyDir: {}
                    - name: debugfs
                      hostPath:
                          path: /sys/kernel/debug
    ```


[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[2]: /resources/yaml/datadog-agent-npm.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/agent/kubernetes/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1519-L1523
{{% /tab %}}
{{% tab "Operator" %}}
<div class="alert alert-warning">El Datadog Operator está disponible de forma general en la versión `1.0.0` y concilia la versión `v2alpha1` del recurso personalizado del Datadog Agent. </div>

[El Datadog Operator][1] permite desplegar el Datadog Agent en Kubernetes y OpenShift e informa sobre la situación y los errores de despliegue en el estado de tu recurso personalizado. Además, sus opciones de configuración de nivel superior limitan el riesgo de configuraciones erróneas.

Para habilitar Network Performance Monitoring en Operator, utiliza la siguiente configuración:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: placeholder
  namespace: placeholder
spec:
  features:
    npm:
      enabled: true
```

[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Docker" %}}

Para habilitar Network Performance Monitoring en Docker, utiliza la siguiente configuración al iniciar el Agent contenedor:

```shell
docker run --cgroupns host \
--pid host \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_SYSTEM_PROBE_NETWORK_ENABLED=true \
-e DD_PROCESS_AGENT_ENABLED=true \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
-v /sys/kernel/debug:/sys/kernel/debug \
--security-opt apparmor:unconfined \
--cap-add=SYS_ADMIN \
--cap-add=SYS_RESOURCE \
--cap-add=SYS_PTRACE \
--cap-add=NET_ADMIN \
--cap-add=NET_BROADCAST \
--cap-add=NET_RAW \
--cap-add=IPC_LOCK \
--cap-add=CHOWN \
gcr.io/datadoghq/agent:latest
```

Sustituye `<DATADOG_API_KEY>` por tu [clave de API Datadog][1].

Si utilizas `docker-compose`, añade lo siguiente al servicio del Datadog Agent.

```
version: '3'
services:
  datadog:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_SYSTEM_PROBE_NETWORK_ENABLED=true
      - DD_PROCESS_AGENT_ENABLED=true
      - DD_API_KEY=<DATADOG_API_KEY>
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /sys/kernel/debug:/sys/kernel/debug
    cap_add:
      - SYS_ADMIN
      - SYS_RESOURCE
      - SYS_PTRACE
      - NET_ADMIN
      - NET_BROADCAST
      - NET_RAW
      - IPC_LOCK
      - CHOWN
    security_opt:
      - apparmor:unconfined
```

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "ECS" %}}
Para configurar en Amazon ECS, consulta la página de documentación de [Amazon ECS][1].


[1]: /es/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us,us3,us5,eu" >}}
### Resolución mejorada

Opcionalmente, habilita la recopilación de recursos para integraciones en la nube para permitir a Network Performance Monitoring detectar entidades gestionadas por la nube.
- Instala la [integración Azure][101] para obtener visibilidad de los balanceadores de carga y las pasarelas de aplicaciones de Azure.
- Instala la [integración AWS][102] para obtener visibilidad del balanceador de carga AWS. **Debes habilitar la recopilación de métricas ENI y EC2**.

Para obtener más información sobre estas funciones, consulta la [resolución mejorada de servicios en la nube][103].

### Conexiones fallidas (beta privada)

<div class="alert alert-warning">Las conexiones fallidas están en beta privada. Para empezar a ver <a href="/network_monitoring/performance/network_analytics/?tab=loadbalancers#tcp">métricas de conexiones fallidas</a>, ponte en contacto con tu representante de Datadog y solicita acceso.</div>

Para permitir que el Agent empiece a recopilar datos sobre conexiones fallidas, añade el siguiente indicador a tu archivo `/etc/datadog-agent/system-probe.yaml` (`C:\ProgramData\Datadog\system-probe.yaml` para Windows).

```yaml
network_config:   # utilizar la configuración de la sonda del sistema para versiones del Agent anteriores a v7.24.1
  ## @param habilitado - booleano - opcional - por defecto: falso
  ## Configurar como verdadero para habilitar Network Performance Monitoring.
  #
  enabled: true
  enable_tcp_failed_connections: true

```

[101]: /es/integrations/azure
[102]: /es/integrations/amazon_web_services/#resource-collection
[103]: /es/network_monitoring/performance/network_analytics/#cloud-service-enhanced-resolution

{{< /site-region >}}

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/network_monitoring/dns/#setup
[3]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[4]: /es/network_monitoring/dns/
[5]: https://docs.datadoghq.com/es/agent/docker/
[6]: https://docs.datadoghq.com/es/agent/kubernetes/
[7]: https://docs.datadoghq.com/es/agent/amazon_ecs
[8]: https://docs.datadoghq.com/es/integrations/istio/
[9]: https://docs.datadoghq.com/es/tracing/setup_overview/proxy_setup/?tab=istio
[10]: https://www.datadoghq.com/blog/istio-datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[12]: https://github.com/DataDog/chef-datadog
[13]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe