---
aliases:
- /es/network_performance_monitoring/installation/
- /es/network_monitoring/performance/setup
description: Recopila los datos de tu red con el Agente.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: Blog
  text: Datadog Cloud Network Monitoring con contenedores y redes con service mesh
- link: /network_monitoring/devices
  tag: Documentación
  text: Monitoreo de Dispositivos de Red
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog CNM ahora soporta la red de Consul
- link: https://www.datadoghq.com/blog/cnm-kubernetes-egress/
  tag: Blog
  text: Cómo Datadog Cloud Network Monitoring te ayuda a implementar una política
    de egreso de red de denegación por defecto a gran escala
- link: /network_monitoring/cloud_network_monitoring/glossary
  tag: Doc
  text: Términos y Conceptos de CNM
title: Configuración de Cloud Network Monitoring
---
Datadog Cloud Network Monitoring (CNM) te brinda visibilidad sobre el tráfico de tu red entre servicios, contenedores, Availability Zones y cualquier otra etiqueta en Datadog para que puedas:

- Identificar dependencias de servicio inesperadas o latentes.
- Optimizar la comunicación costosa entre regiones o en múltiples nubes.
- Identificar interrupciones en las regiones de proveedores de nube y herramientas de terceros.
- Solucionar problemas de descubrimiento de servicios defectuosos con métricas del servidor DNS.

Cloud Network Monitoring requiere [Datadog Agent v6.14+][1]. Debido a que las métricas se recopilan automáticamente en versiones superiores del Agente, consulta la [sección de configuración de métricas][2] para configurar el Monitoreo de DNS.

## Plataformas soportadas {#supported-platforms}

### Sistemas operativos {#operating-systems}

#### Sistema operativo Linux {#linux-os}

La recolección de datos se realiza utilizando eBPF, por lo que Datadog requiere mínimamente plataformas que tengan versiones del núcleo de Linux de 4.4.0+ o que tengan características de eBPF retroportadas. CNM admite las siguientes distribuciones de Linux:

- Ubuntu 16.04+
- Debian 9+
- Fedora 26+
- SUSE 15+
- Amazon AMI 2016.03+
- Amazon Linux 2
- CentOS/RHEL 7.6+

**Nota:** Hay una excepción al requisito del núcleo 4.4.0+ para [CentOS/RHEL 7.6+][3]. La función de [Resolución de DNS][4] no es compatible con CentOS/RHEL 7.6.

#### Sistema operativo Windows {#windows-os}

La recolección de datos se realiza utilizando un controlador de dispositivo del núcleo de red. El soporte está disponible a partir de la versión 7.27.1 del Agente de Datadog, para versiones de Windows 2012 R2 (y sistemas operativos de escritorio equivalentes, incluyendo Windows 10) y superiores.

#### macOS {#macos}

Datadog Cloud Network Monitoring no es compatible con plataformas macOS.

### Contenedores {#containers}

CNM te ayuda a visualizar la arquitectura y el rendimiento de tus entornos contenedorizados y orquestados, con soporte para [Docker][5], [Kubernetes][6], [ECS][7] y otras tecnologías de contenedores. Las integraciones de contenedores de Datadog te permiten agregar tráfico por entidades significativas, como contenedores, tareas, pods, clústeres y despliegues, con etiquetas listas para usar como `container_name`, `task_name` y `kube_service`.

### Herramientas de enrutamiento de red {#network-routing-tools}

#### Istio {#istio}

Con CNM, puedes mapear la comunicación de red entre contenedores, pods y servicios a través de la malla de servicios de Istio.

Datadog monitorea cada aspecto de tu entorno de Istio, por lo que también puedes:

- Evaluar la salud de Envoy y el plano de control de Istio con [logs][8].
- Desglosar el rendimiento de tu malla de servicios con solicitudes, ancho de banda y consumo de recursos [métricas][8].
- Examinar trazas distribuidas para aplicaciones que transaccionan a través de la malla con [APM][9].

CNM es compatible con Istio v1.6.4+ con [Datadog Agent v7.24.1+][1].

Para aprender más sobre cómo monitorear tu entorno de Istio con Datadog, [consulta el blog de Istio][10].

#### Cilium {#cilium}

Cloud Network Monitoring es compatible con instalaciones de **Cilium**, siempre que se cumplan los siguientes requisitos:
1) Versión de Cilium 1.6 y superior, y
2) Versión del núcleo 5.1.16 y superior, o 4.19.57 y superior para núcleos 4.19.x

### Sistemas de aprovisionamiento {#provisioning-systems}

Cloud Network Monitoring admite el uso de los siguientes sistemas de aprovisionamiento:

- Daemonset / Helm 1.38.11+: Consulta el [gráfico de Helm de Datadog][11]
- Chef 12.7+: Consulta el [Datadog Chef recipe][12]
- Ansible 2.6+: Consulta el [Datadog Ansible role][13]

## Configuración {#setup}

Cloud Network Monitoring está diseñado para analizar el tráfico _entre_ puntos de conexión de red y mapear las dependencias de red. Datadog recomienda instalar CNM en un subconjunto significativo de su infraestructura y un **_mínimo de 2 hosts_** para maximizar el valor.

{{< tabs >}}
{{% tab "Agente (Linux)" %}}

Para habilitar CNM con el Agente de Datadog, use las siguientes configuraciones:

1. **Si está utilizando un Agente anterior a la v6.14**, habilite [live process collection][1] primero, de lo contrario, omita este paso.

2. Copie la configuración de ejemplo del sistema-probe:

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Edite `/etc/datadog-agent/system-probe.yaml` para establecer la bandera de habilitación en `true`:

    ```yaml
    network_config:   # use system_probe_config for Agent's older than 7.24.1
      ## @param enabled - boolean - optional - default: false
      ## Set to true to enable Cloud Network Monitoring.
      #
      enabled: true
    ```

    **Optional**: To monitor DNS traffic on non-standard ports (Agent v7.76.0+), add the `dns_monitoring_ports` option:

    ```yaml
    network_config:
      enabled: true
      dns_monitoring_ports:
        - 53
        - 5353
    ```

4. **Si está ejecutando un Agente anterior a la v6.18 o 7.18**, inicie manualmente el sistema-probe y habilítelo para que se inicie al arrancar (desde la v6.18 y v7.18 el sistema-probe se inicia automáticamente cuando se inicia el Agente):

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **Note**: If the `systemctl` command is not available on your system, start it with following command instead: `sudo service datadog-agent-sysprobe start` and then set it up to start on boot before `datadog-agent` starts.

5. [Restart the Agent][2].

    ```shell
    sudo systemctl restart datadog-agent
    ```

    **Note**: If the `systemctl` command is not available on your system, run the following command instead: `sudo service datadog-agent restart`

### Sistemas habilitados para SELinux {#selinux-enabled-systems}

En sistemas con SELinux habilitado, el binario del sistema-probe necesita permisos especiales para usar características de eBPF.

El paquete RPM del Agente de Datadog para sistemas basados en CentOS incluye una [política de SELinux][3] para otorgar estos permisos al binario del sistema-probe.

Si necesita usar CNM en otros sistemas con SELinux habilitado, haga lo siguiente:

1. Modifique la [política base de SELinux][3] para que coincida con su configuración de SELinux.
    Dependiendo de su sistema, algunos tipos o atributos pueden no existir (o tener nombres diferentes).

2. Compile la política en un módulo; asumiendo que su archivo de política se llama `system_probe_policy.te`:

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. Aplique el módulo a su sistema SELinux:

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. Cambie el tipo de binario del sistema-probe para usar el definido en la política; asumiendo que su directorio de instalación del Agente es `/opt/datadog-agent`:

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [Restart the Agent][2].

**Nota**: estas instrucciones requieren tener algunas utilidades de SELinux instaladas en el sistema (`checkmodule`, `semodule`, `semodule_package`, `semanage` y `restorecon`) que están disponibles en la mayoría de las distribuciones estándar (Ubuntu, Debian, RHEL, CentOS, SUSE). Consulta tu distribución para obtener detalles sobre cómo instalarlas.

Si estas utilidades no existen en tu distribución, sigue el mismo procedimiento pero usando las utilidades proporcionadas por tu distribución en su lugar.


[1]: /es/infrastructure/process/?tab=linuxwindows#installation
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Agente (Windows)" %}}

La recolección de datos para Windows se basa en un controlador de filtro para recopilar datos de red.

Para habilitar Cloud Network Monitoring para hosts de Windows:

1. Instala el [Agente de Datadog][1] (versión 7.27.1 o superior) con el componente del controlador de red habilitado.

   [OBSOLETO] _(versión 7.44 o inferior)_ Durante la instalación pasa `ADDLOCAL="MainApplication,NPM"` al comando `msiexec`, o selecciona "Cloud Network Monitoring" al ejecutar la instalación del Agente a través de la GUI.

2. Edita `C:\ProgramData\Datadog\system-probe.yaml` para establecer la opción habilitada en `true`:

    ```yaml
    network_config:
        enabled: true
    ```

    **Optional**: To monitor DNS traffic on non-standard ports (Agent v7.76.0+), add the `dns_monitoring_ports` option:

    ```yaml
    network_config:
        enabled: true
        dns_monitoring_ports:
            - 53
            - 5353
    ```

3. [Reinicia el Agente][2].

    Para PowerShell (`powershell.exe`):
    ```shell
    restart-service -f datadogagent
    ```
    For Command Prompt (`cmd.exe`):
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```
**Nota**: Cloud Network Monitoring monitorea solo hosts de Windows, y no contenedores de Windows.


[1]: /es/agent/basic_agent_usage/windows/?tab=commandline
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Helm" %}}

Para habilitar Cloud Network Monitoring con Kubernetes usando Helm, agrega lo siguiente a tu archivo `values.yaml`.</br>
**Nota:** Se requiere el Helm chart v3.135.3+. Para más información, consulte la [documentación del gráfico de Helm de Datadog][1].

  ```yaml
  datadog:
    ...
    networkMonitoring:
      enabled: true
  ```

**Opcional**: Para monitorear el tráfico DNS en puertos no estándar (Agente v7.76.0+), agregue la opción `dnsMonitoringPorts`:

  ```yaml
  datadog:
    networkMonitoring:
      enabled: true
      dnsMonitoringPorts:
        - 53
        - 5353
  ```

Puede requerir uno de los siguientes pasos adicionales dependiendo de su entorno:

{{< collapse-content title="Google GKE Autopilot" level="h4" >}}

Si su clúster está ejecutando el GKE Autopilot de Google, agregue lo siguiente a su archivo de valores:

```
providers:
  gke:
    autopilot: true
```

{{< /collapse-content >}}

{{< collapse-content title="Google Container-Optimized OS (COS)" level="h4" >}}

Si su clúster está ejecutando Google Container-Optimized OS (COS), agregue lo siguiente a su archivo de valores:

```
providers:
  gke:
    cos: true
```


{{< /collapse-content >}}

{{< collapse-content title="Bottlerocket Linux" level="h4" >}}

Si su clúster está utilizando la distribución Bottlerocket Linux para sus nodos, agregue lo siguiente a su archivo de valores:

```
agents:
  containers:
    systemProbe:
      securityContext:
        seLinuxOptions:
          user: "system_u"
          role: "system_r"
          type: "super_t"
          level: "s0"
```

{{< /collapse-content >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#enabling-npm-collection

{{% /tab %}}
{{% tab "Kubernetes sin Helm" %}}

Si no está utilizando Helm, puede habilitar Cloud Network Monitoring con Kubernetes desde cero:

1. Descargue la plantilla del [manifiesto datadog-agent.yaml][1].
2. Reemplace `<DATADOG_API_KEY>` con su [clave de API de Datadog][2].
3. Opcional - **Establezca su sitio de Datadog**. Si está utilizando el sitio de Datadog de la UE, establezca la variable de entorno `DD_SITE` en `datadoghq.eu` en el manifiesto `datadog-agent.yaml`.
4. **Despliegue el DaemonSet** con el comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

Si ya tiene el [Agente ejecutándose con un manifiesto][3]:

1. Para versiones de Kubernetes anteriores a `1.30`, agregue la anotación `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` en la plantilla `datadog-agent`:

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
    For Kubernetes versions `1.30+`, add the following `securityContext` on the `datadog-agent` template:

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

2. Habilite la recopilación de procesos y el system probe con las siguientes variables de entorno en el DaemonSet del Agente. Si está ejecutando un contenedor por proceso del Agent, agregue las siguientes variables de entorno al contenedor del Process Agent; de lo contrario, agréguelas al contenedor del Agent.

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

3. Monte los siguientes volúmenes adicionales en el contenedor `datadog-agent`:

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'registry.datadoghq.com/agent:latest'
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

4. Agregue un nuevo system probe como sidecar al Agente:

    ```yaml
     # (...)
            spec:
                serviceAccountName: datadog-agent
                containers:
                    - name: datadog-agent
                      image: 'registry.datadoghq.com/agent:latest'
                    # (...)
                    - name: system-probe
                      image: 'registry.datadoghq.com/agent:latest'
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

5. Finalmente, agregue los siguientes volúmenes a su manifiesto:

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

[1]: /es/resources/yaml/datadog-agent-npm.yaml
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /es/agent/kubernetes/

{{% /tab %}}
{{% tab "Operator" %}}

[Datadog Operator][1] simplifica el despliegue del Agente de Datadog en Kubernetes y OpenShift. Proporciona estado de despliegue, salud e informes de errores a través de su estado de Recurso Personalizado, mientras reduce el riesgo de mala configuración con opciones de configuración de nivel superior.

Para habilitar Cloud Network Monitoring en el Datadog Operator, use la siguiente configuración:

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

Para habilitar Cloud Network Monitoring en Docker, use la siguiente configuración al iniciar el contenedor del Agente:

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
registry.datadoghq.com/agent:latest
```

Reemplace `<DATADOG_API_KEY>` con su [clave de API de Datadog][1].

Si utiliza `docker-compose`, realice las siguientes adiciones al servicio del Agente de Datadog.

```shell
version: '3'
services:
  datadog:
    image: "registry.datadoghq.com/agent:latest"
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
Para configurar CNM en Amazon ECS, consulte la página de documentación de [Amazon ECS][1].


[1]: /es/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}

{{% tab "ECS Fargate" %}}

<div class="alert alert-info">ECS Fargate para CNM está en Vista Previa. Póngase en contacto con su representante de Datadog para registrarse.</div>

Para habilitar Cloud Network Monitoring en ECS Fargate, use las siguientes instrucciones:

**Requiere la versión del Agente `7.58` o superior**.

- Para un nuevo despliegue de Fargate, configura el Agente de Datadog para monitorear Fargate en ECS habilitando la [colección de procesos][1] en tus hosts de Fargate.

- Para despliegues existentes, actualiza tu archivo `task.json` para incluir la siguiente configuración:

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
### Resolución mejorada {#enhanced-resolution}

Opcionalmente, habilita la colección de recursos para integraciones en la nube para permitir que CNM descubra entidades gestionadas en la nube.
- Instala la [integración de Azure][101] para visibilidad en balanceadores de carga de Azure y puertas de enlace de aplicaciones.
- Instala la [integración de AWS][102] para visibilidad en el Balanceador de Carga de AWS. **debes habilitar la colección de métricas de ENI y EC2**

Para información adicional sobre estas capacidades, consulta [Resolución mejorada del servicio en la nube][103].

[101]: /es/integrations/azure
[102]: /es/integrations/amazon_web_services/#resource-collection
[103]: /es/network_monitoring/cloud_network_monitoring/network_analytics/#cloud-service-enhanced-resolution

{{< /site-region >}}

### Conexiones fallidas {#failed-connections}

Las Conexiones Fallidas permiten la colección e informe de fallos de TCP, incluyendo [reinicios, rechazos y tiempos de espera][14]. Esta función está habilitada por defecto en la versión `7.59+` del Agente, y es accesible en la página de [Analíticas CNM][15] en el menú **Personalizar** al activar el interruptor de **Fallos**.

**Nota**: Si algunos Agentes en su infraestructura están ejecutando una versión anterior a `7.59`, podría darse el caso de que los fallos se informen de manera insuficiente. CNM aconseja mantener la misma versión del Agente en _todos_ los hosts.

{{< img src="network_performance_monitoring/setup/cnm_tcp_failures_toggle.png" alt="Captura de pantalla del menú de personalización de CNM, destacando el interruptor de Fallos." style="width:50%;">}}

## Lectura adicional {#further-reading}
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