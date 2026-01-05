---
aliases:
- /es/network_performance_monitoring/installation/
- /es/network_monitoring/performance/setup
description: Recopila tus datos de red con el Agent.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: Blog
  text: Datadog CNM con contenedores y redes de mallas de servicio
- link: /network_monitoring/devices
  tag: Documentación
  text: Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog CNM admite ahora la conexión en red de Consul
- link: https://www.datadoghq.com/blog/cnm-kubernetes-egress/
  tag: Blog
  text: Cómo Datadog Cloud Network Monitoring te ayuda a pasar a una política de salida
    de red de denegación por defecto a escala
title: Configuración de Cloud Network Monitoring
---

Datadog Cloud Network Monitoring (CNM) te ofrece visibilidad de tu tráfico de red entre servicios, contenedores, zonas de disponibilidad y cualquier otra etiqueta (tag) en Datadog para que puedas:

- Localizar dependencias de servicios inesperadas o latentes.
- Optimizar la costosa comunicación entre regiones o nubes múltiples.
- Identificar las interrupciones en las regiones proveedoras de la nube y las herramientas de terceros.
- Solucionar problemas de detección de servicios defectuosos con métricas del servidor DNS.

Cloud Network Monitoring requiere el [Datadog Agent v6.14 o posterior][1]. Dado que las métricas se recopilan automáticamente en versiones posteriores del Agent, consulta la [sección de configuración de métricas][2] para configurar la monitorización de DNS.

## Plataformas compatibles

### Sistemas operativos

#### Sistema operativo Linux

La recopilación de datos se realiza utilizando eBPF, por lo que Datadog requiere mínimamente plataformas que tengan versiones 4.4.0 o posteriores del kernel de Linux subyacente o que tengan backports de las características de eBPF. NPM es compatible con las siguientes distribuciones de Linux:

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

Datadog Cloud Network Monitoring no es compatible con plataformas macOS.

### Contenedores

CNM te ayuda a visualizar la arquitectura y el rendimiento de tus entornos en contenedores y orquestados, con compatibilidad con [Docker][5], [Kubernetes][6], [ECS][7] y otras tecnologías de contenedor. Las integraciones de contenedores de Datadog te permiten agregar tráfico por entidades significativas, como contenedores, tareas, pods, clústeres y despliegues, con etiquetas predefinidas como `container_name`, `task_name` y `kube_service`.

### Herramientas de enrutamiento en la red

#### Istio

Con CNM, puedes asignar la comunicación de red entre contenedores, pods y servicios a través de la malla de servicios de Istio.

Datadog monitoriza todos los aspectos de tu entorno Istio para que también puedas:

- Evaluar el estado de Envoy y el plano de control de Istio con [logs][8].
- Desglosar el rendimiento de tu malla de servicios con [métricas][8] de solicitudes, ancho de banda y consumo de recursos.
- Examinar trazas (traces) distribuidas de aplicaciones que realizan transacciones a lo largo de la malla con [APM][9].

CNM admite Istio v1.6.4 o posterior con el [Datadog Agent v7.24.1 o posterior][1].

Para obtener más información sobre la monitorización de tu entorno Istio con Datadog, [consulta el blog de Istio][10].

#### Cilium

Cloud Network Monitoring es compatible con instalaciones **Cilium**, siempre que se cumplan los siguientes requisitos:
1) Cilium v1.6 y posteriores
2) Kernel v5.1.16 y posteriores, o v4.19.57 y posteriores para kernels 4.19.x

### Sistemas de aprovisionamiento

Cloud Network Monitoring admite el uso de los siguientes sistemas de aprovisionamiento:

- Daemonset / Helm v1.38.11 o posterior: Consulta el [Helm chart de Datadog][11]
- Chef v12.7 o posterior: Consulta la [receta de Datadog Chef][12]
- Ansible v2.6 o posterior: Consulta el [rol Ansible de Datadog][13]

## Configuración

Cloud Network Monitoring está diseñado para analizar el tráfico _entre_ endpoints de red y asignar dependencias de red. Datadog recomienda instalar CNM en un subconjunto significativo de tu infraestructura y en un **_mínimo de 2 hosts_** para maximizar el valor.

{{< tabs >}}
{{% tab "Agent (Linux)" %}}

Para habilitar Cloud Network Monitoring con el Datadog Agent, utiliza las siguientes configuraciones:

1. **Si utilizas una versión del Agent anterior a la v6.14**, activa primero la [recopilación de procesos en directo][1]; de lo contrario, omite este paso.

2. Copia la configuración de ejemplo de sonda del sistema:

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Edita `/etc/datadog-agent/system-probe.yaml` para definir el indicador habilitado como `true`:

    ```yaml
    network_config:   # use system_probe_config for Agent's older than 7.24.1
      ## @param enabled - boolean - optional - default: false
      ## Set to true to enable Cloud Network Monitoring.
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

Si necesitas utilizar Cloud Network Monitoring en otros sistemas con SELinux activado, haz lo siguiente:

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

Para habilitar Cloud Network Monitoring para hosts de Windows:

1. Instala el [Datadog Agent][1] (versión 7.27.1 o posterior) con el componente del controlador de red habilitado.

   [OBSOLETO] _(versión 7.44 o inferior)_ Durante la instalación, pasa `ADDLOCAL="MainApplication,NPM"` al comando `msiexec`, o selecciona "Cloud Network Monitoring" cuando ejecutes la instalación del Agent a través de la GUI.

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
**Nota**: Cloud Network Monitoring solo monitoriza hosts de Windows y no contenedores de Windows.


[1]: /es/agent/basic_agent_usage/windows/?tab=commandline
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Helm" %}}

Para activar Cloud Network Monitoring con Kubernetes utilizando Helm, añade lo siguiente a tu archivo `values.yaml`.</br>
**Nota:** Se requiere Helm Chart v3.135.3+. Para obtener más información, consulta la [documentación de Helm Chart de Datadog][1].

  ```yaml
  datadog:
    ...
    networkMonitoring:
      enabled: true
  ```


Es posible que necesites uno de los siguientes pasos adicionales en función de tu entorno:

{{< collapse-content title="GKE Autopilot de Google" level="h4" >}}

Si tu clúster está ejecutando GKE Autopilot de Google, añade lo siguiente a tu archivo de valores:

```
providers:
  gke:
    autopilot: true
```

{{< /collapse-content >}}

{{< collapse-content title="Sistema operativo optimizado con contenedor (COS) de Google" level="h4" >}}

Si tu clúster ejecuta el sistema operativo optimizado con contenedor (COS) de Google, añade lo siguiente a tu archivo de valores:

```
providers:
  gke:
    cos: true
```


{{< /collapse-content >}}

{{< collapse-content title="Bottlerocket Linux" level="h4" >}}

Si tu clúster utiliza la distribución Bottlerocket Linux para sus nodos, añade lo siguiente a tu archivo de valores:

```
agents:
  containers:
    systemProbe:
      securityContext:
        seLinuxOptions:
          user: "system_u"
          role: "system_r"
          type: "spc_t"
          level: "s0"
```

{{< /collapse-content >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#enabling-npm-collection

{{% /tab %}}
{{% tab "Kubernetes without Helm" %}}

Si no utilizas Helm, puedes habilitar Cloud Network Monitoring con Kubernetes desde cero:

1. Descarga la plantilla [manifiesto de datadog-agent.yaml][1].
2. Sustituye `<DATADOG_API_KEY>` por tu [clave de API de Datadog][2].
3. (Opcional) **Configura tu sitio Datadog**. Si utilizas el sitio Datadog EU, configura la variable de entorno `DD_SITE` como `datadoghq.eu` en el manifiesto `datadog-agent.yaml`.
4. **Despliega el DaemonSet** con el comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

Si ya tienes el [Agent ejecutándose con un manifiesto][3]:

1. Para las versiones de Kubernetes inferiores a `1.30`, añade la anotación `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` en la plantilla `datadog-agent`:

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
    Para las versiones de Kubernetes `1.30+`, añade el siguiente `securityContext` en la plantilla `datadog-agent`:

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
            spec:
                serviceAccountName: datadog-agent
                securityContext:
                  appArmorProfile:
                    type: Unconfined
                containers:
                # (...)
    ```

2. Habilita el proceso de recopilación y la sonda del sistema con las siguientes variables de entorno en el DaemonSet del Agent. Si estás ejecutando un contenedor por cada proceso del Agent, añade las siguientes variables de entorno al Agent de proceso; de lo contrario, añádelas al contenedor del Agent.

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
                          - name: DD_AUTH_TOKEN_FILE_PATH
                            value: /etc/datadog-agent/auth/token
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
                      - name: auth-token
                        mountPath: /etc/datadog-agent/auth
                        readOnly: false # needs RW to write auth token
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
                          - name: DD_SYSTEM_PROBE_ENABLED
                            value: 'true'
                          - name: DD_SYSPROBE_SOCKET
                            value: /var/run/sysprobe/sysprobe.sock
                          - name: DD_AUTH_TOKEN_FILE_PATH
                            value: /etc/datadog-agent/auth/token
                      resources:
                          requests:
                              memory: 150Mi
                              cpu: 200m
                          limits:
                              memory: 300Mi
                              cpu: 400m
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
                          - name: auth-token
                            mountPath: /etc/datadog-agent/auth
                            readOnly: true
    ```

5. Por último, añada los siguientes volúmenes a tu manifiesto:

    ```yaml
                volumes:
                    - name: debugfs
                      hostPath:
                          path: /sys/kernel/debug
                    - name: sysprobe-socket-dir
                      emptyDir: { }
                    - name: auth-token
                      emptyDir: { }
    ```

[1]: /resources/yaml/datadog-agent-npm.yaml
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/agent/kubernetes/

{{% /tab %}}
{{% tab "Operator" %}}

El [Datadog Operator][1] simplifica el despliegue del Datadog Agent en Kubernetes y OpenShift. Proporciona informes sobre estados de despliegues, salud y errores a través de su estado Recurso personalizado, al tiempo que reduce el riesgo de configuraciones incorrectas proporcionando opciones de configuración más claras.

Para habilitar Cloud Network Monitoring en el Datadog Operator, utiliza la siguiente configuración:

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

[1]: /es/containers/datadog_operator 
{{% /tab %}}
{{% tab "Docker" %}}

Para habilitar Cloud Network Monitoring en Docker, utiliza la siguiente configuración al iniciar el Agent de contenedor:

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

```shell
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
Para configurar CNM en Amazon ECS, consulta la página de la documentación de [Amazon ECS][1].


[1]: /es/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}

{{% tab "ECS Fargate" %}}

<div class="alert alert-info">ECS Fargate para CNM está en Vista previa. Ponte en contacto con tu representante de Datadog para inscribirte.</div>

Para habilitar Cloud Network Monitoring en ECS Fargate, utiliza las siguientes instrucciones:

**Requiere la versión `7.58` o superior del Agent**.

- Para realizar un nuevo despliegue de Fargate, configura el Datadog Agent para monitorizar Fargate en ECS, habilitando la [recopilación de procesos][1] en tu host Fargate.

- Para los despliegues existentes, actualiza tu archivo `task.json` para incluir los siguientes parámetros de configuración:

```json
{
 "containerDefinitions": [
   (...)
     "environment": [
       (...)
       {
         "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
         "value": "true"
       },
       {
          "name": "DD_NETWORK_CONFIG_ENABLE_EBPFLESS",
          "value": "true"
       },
       {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
       }      
     ],
     "linuxParameters": {
      "capabilities": {
        "add": [
          "SYS_PTRACE"
        ]
      }
    },
 ],
}
```
[1]: /es/integrations/ecs_fargate/?tab=webui#process-collection 

{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us,us3,us5,eu" >}}
### Resolución mejorada

Opcionalmente, activa la recopilación de recursos para las integraciones de nube para permitir que Cloud Network Monitoring detecte las entidades gestionadas por la nube.
- Instala la [integración Azure][101] para obtener visibilidad de los balanceadores de carga y las pasarelas de aplicaciones de Azure.
- Instala la [integración AWS][102] para obtener visibilidad del balanceador de carga AWS. **Debes habilitar la recopilación de métricas ENI y EC2**.

Para obtener más información sobre estas funciones, consulta la [resolución mejorada de servicios en la nube][103].

[101]: /es/integrations/azure
[102]: /es/integrations/amazon_web_services/#resource-collection
[103]: /es/network_monitoring/cloud_network_monitoring/network_analytics/#cloud-service-enhanced-resolution

{{< /site-region >}}

### Failed connections 

Failed Connections permite recopilar e informar de fallos de TCP incluidos [reinicios, rechazos y tiempos de inactividad][14]. Esta función está activada por defecto en el Agent versión `7.59+` y es accesible en la página [CNM Analytics][15] en el menú **Customize** (Personalizar) activando el conmutador **Failure** (Fallos).

**Nota**: Si algunos Agents en tu infraestructura están ejecutando una versión anterior a `7.59`, podrías encontrarte con fallos que no son reportados. CNM aconseja mantener la misma versión de Agent en _todos_ los hosts.

{{< img src="network_performance_monitoring/setup/cnm_tcp_failures_toggle.png" alt="Captura de pantalla en el menú personalizado de CNM, con el conmutador Fallos resaltado" style="width:50%;">}}

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
[14]: /es/network_monitoring/cloud_network_monitoring/network_analytics/?tab=loadbalancers#tcp
[15]: https://app.datadoghq.com/network