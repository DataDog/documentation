---
aliases:
- /es/network_performance_monitoring/installation/
- /es/network_monitoring/performance/setup
description: Recopile sus datos de red con el Agent.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: Blog
  text: Datadog CNM con Containers y redes de malla de servicios
- link: /network_monitoring/devices
  tag: Documentación
  text: Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog CNM ahora es compatible con redes Consul
- link: https://www.datadoghq.com/blog/cnm-kubernetes-egress/
  tag: Blog
  text: Cómo Datadog Cloud Network Monitoring le ayuda a adoptar a escala una política
    de salida de red que deniega el tráfico por defecto
- link: /network_monitoring/cloud_network_monitoring/glossary
  tag: Doc
  text: Términos y conceptos de CNM
title: Configuración de Cloud Network Monitoring
---
Datadog Cloud Network Monitoring (CNM) le brinda visibilidad del tráfico de su red entre servicios, Containers, zonas de disponibilidad y cualquier otra etiqueta en Datadog para que pueda:

- Identifique dependencias de servicio inesperadas o latentes.
- Optimice la costosa comunicación entre regiones o entre nubes.
- Identifique interrupciones en regiones de proveedores de nube y herramientas de terceros.
- Solucione problemas de detección de servicios defectuosa con métricas del servidor DNS.

Cloud Network Monitoring requiere [Datadog Agent v6.14+][1]. Debido a que las métricas se recopilan automáticamente en versiones superiores del Agent, consulte la [sección de configuración de métricas][2] para configurar DNS Monitoring.

## Plataformas compatibles {#supported-platforms}

### Sistemas operativos {#operating-systems}

#### SO Linux {#linux-os}

La recopilación de datos se realiza mediante eBPF, por lo que Datadog requiere como mínimo plataformas con versiones del kernel de Linux 4.4.0+ o con funciones de eBPF incorporadas de forma retroactiva. CNM es compatible con las siguientes distribuciones de Linux:

- Ubuntu 16.04+
- Debian 9+
- Fedora 26+
- SUSE 15+
- Amazon AMI 2016.03+
- Amazon Linux 2
- CentOS/Red Hat Enterprise Linux (RHEL) 7.6+

**Nota:** Existe una excepción al requisito de kernel 4.4.0+ para [CentOS/RHEL 7.6+][3]. La función [DNS Resolution][4] no es compatible con CentOS/RHEL 7.6.

#### SO Windows {#windows-os}

La recopilación de datos se realiza mediante un controlador de dispositivo de kernel de red. El soporte está disponible a partir de la versión 7.27.1 del Datadog Agent, para versiones de Windows 2012 R2 (y sistemas operativos de escritorio equivalentes, incluido Windows 10) en adelante.

#### macOS {#macos}

Datadog Cloud Network Monitoring no es compatible con plataformas macOS.

### Containers {#containers}

CNM le ayuda a visualizar la arquitectura y el rendimiento de sus entornos orquestados y en contenedores, con soporte para [Docker][5], [Kubernetes][6], [ECS][7] y otras tecnologías de contenedores. Las integraciones de contenedores de Datadog le permiten agregar tráfico por entidades significativas (como Containers, tareas, pods, clústeres y despliegues) con etiquetas listas para usar como `container_name`, `task_name` y `kube_service`.

### Herramientas de enrutamiento de red {#network-routing-tools}

#### Istio {#istio}

Con CNM, puede mapear la comunicación de red entre Containers, pods y servicios a través de la malla de servicios de Istio.

Datadog monitorea cada aspecto de su entorno de Istio, por lo que también puede:

- Evaluar el estado de Envoy y del plano de control de Istio con [logs][8].
- Desglosar el rendimiento de su malla de servicios con [métricas][8] de solicitudes, ancho de banda y consumo de recursos.
- Examinar trazas distribuidas para aplicaciones que realizan transacciones a través de la malla con [APM][9].

CNM es compatible con Istio v1.6.4+ con [Datadog Agent v7.24.1+][1].

Para obtener más información sobre cómo monitorear su entorno de Istio con Datadog, [consulte el blog de Istio][10].

#### Cilium {#cilium}

Cloud Network Monitoring es compatible con instalaciones de **Cilium**, siempre que se cumplan los siguientes requisitos:
1) Cilium versión 1.6 o superior y
2) Versión del kernel 5.1.16 o superior, o 4.19.57 o superior para kernels 4.19.x

### Sistemas de aprovisionamiento {#provisioning-systems}

Cloud Network Monitoring admite el uso de los siguientes sistemas de aprovisionamiento:

- Daemonset / Helm 1.38.11+: Consulte el [chart de Helm de Datadog][11]
- Chef 12.7+: Consulte la [receta de Chef de Datadog][12]
- Ansible 2.6+: Consulte el [rol de Ansible de Datadog][13]

## Configuración {#setup}

Cloud Network Monitoring está diseñado para analizar el tráfico _entre_ puntos finales de red y mapear las dependencias de red. Datadog recomienda instalar CNM en un subconjunto significativo de su infraestructura y en un **_mínimo de 2 hosts_** para maximizar el valor.

{{< tabs >}}
{{% tab "Agent (Linux)" %}}

Para habilitar Cloud Network Monitoring con el Datadog Agent, utilice las siguientes configuraciones:

1. **Si está utilizando un Agent anterior a la v6.14**, habilite primero la [recopilación de procesos en vivo][1]; de lo contrario, omita este paso.

2. Copie la configuración de ejemplo de system-probe:

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Edite `/etc/datadog-agent/system-probe.yaml` para establecer el indicador de habilitación en `true`:

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

4. **Si está ejecutando un Agent anterior a la v6.18 o 7.18**, inicie manualmente el system-probe y habilítelo para que se inicie al arrancar (desde la v6.18 y v7.18, el system-probe se inicia automáticamente cuando se inicia el Agent):

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **Note**: If the `systemctl` command is not available on your system, start it with following command instead: `sudo service datadog-agent-sysprobe start` and then set it up to start on boot before `datadog-agent` starts.

5. [Reinicie el Agent][2].

    ```shell
    sudo systemctl restart datadog-agent
    ```

    **Note**: If the `systemctl` command is not available on your system, run the following command instead: `sudo service datadog-agent restart`

### Sistemas con SELinux habilitado {#selinux-enabled-systems}

En sistemas con SELinux habilitado, el binario system-probe necesita permisos especiales para usar las funciones de eBPF.

En CentOS/RHEL 7, el paquete RPM del Datadog Agent incluye y carga una [política de SELinux][3] para otorgar estos permisos al binario system-probe. En RHEL 8 y versiones posteriores, la política de SELinux predeterminada ejecuta el Agent y el system-probe en el dominio `unconfined_service_t`, por lo que la política incluida no es necesaria.

Si necesita usar Cloud Network Monitoring en otros sistemas con SELinux habilitado, haga lo siguiente:

1. Modifique la [política de SELinux][3] base para que coincida con su configuración de SELinux.
    Dependiendo de su sistema, es posible que algunos tipos o atributos no existan (o tengan nombres diferentes).

2. Compile la política en un módulo; suponiendo que su archivo de política se llame `system_probe_policy.te`:

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. Aplique el módulo a su sistema SELinux:

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. Cambie el tipo de binario de system-probe para usar el definido en la política; suponiendo que su directorio de instalación del Agent es `/opt/datadog-agent`:

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [Reinicie el Agent][2].

**Nota**: estas instrucciones requieren tener instaladas algunas utilidades de SELinux en el sistema (`checkmodule`, `semodule`, `semodule_package`, `semanage` y `restorecon`) que están disponibles en la mayoría de las distribuciones estándar (Ubuntu, Debian, RHEL, CentOS, SUSE). Consulte su distribución para obtener detalles sobre cómo instalarlas.

Si estas utilidades no existen en su distribución, siga el mismo procedimiento pero utilizando las utilidades proporcionadas por su distribución en su lugar.

#### Limpieza de SELinux después de actualizaciones en el mismo sistema desde RHEL 7 {#selinux-cleanup-after-in-place-upgrades-from-rhel-7}

Una actualización en el mismo sistema actualiza el sistema operativo de RHEL 7 a RHEL 8 o posterior sin una nueva instalación (por ejemplo, con Leapp). Después de esta actualización, los contextos de archivo `system_probe_t` de RHEL 7 pueden permanecer en los binarios del Agent. Estos contextos impiden que systemd ejecute el Agent y system-probe en el dominio `unconfined_service_t`. Cuando SELinux está en modo enforcing, deniega las acciones que el Agent y system-probe necesitan.

Para solucionar las denegaciones, elimine los contextos de archivo `system_probe_t` y el módulo de política, restaure las etiquetas predeterminadas y reinicie el Agent:

```shell
sudo semanage fcontext -d -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
sudo semanage fcontext -d -t system_probe_t /opt/datadog-agent/bin/agent/agent
sudo restorecon -v /opt/datadog-agent/embedded/bin/system-probe /opt/datadog-agent/bin/agent/agent
sudo semodule -r system_probe_policy
sudo systemctl restart datadog-agent
```

Después del reinicio, systemd ejecuta el Agent y system-probe en el dominio `unconfined_service_t`.


[1]: /es/infrastructure/process/?tab=linuxwindows#installation
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Agent (Windows)" %}}

La recopilación de datos para Windows depende de un controlador de filtro para recopilar datos de red.

Para habilitar Cloud Network Monitoring para hosts de Windows:

1. Instale el [Datadog Agent][1] (versión 7.27.1 o superior) con el componente del controlador de red habilitado.

   [OBSOLETO] _(versión 7.44 o inferior)_ Durante la instalación, pase `ADDLOCAL="MainApplication,NPM"` al comando `msiexec` o seleccione "Cloud Network Monitoring" al ejecutar la instalación del Agent a través de la interfaz gráfica.

2. Edite `C:\ProgramData\Datadog\system-probe.yaml` para establecer el indicador enabled en `true`:

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

3. [Reinicie el Agent][2].

    Para PowerShell (`powershell.exe`):
    ```shell
    restart-service -f datadogagent
    ```
    For Command Prompt (`cmd.exe`):
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```
**Nota**: Cloud Network Monitoring solo monitorea hosts de Windows, no contenedores de Windows.


[1]: /es/agent/basic_agent_usage/windows/?tab=commandline
[2]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Helm" %}}

Para habilitar Cloud Network Monitoring con Kubernetes usando Helm, agregue lo siguiente a su archivo `values.yaml`.</br>
**Nota:** Se requiere Helm chart v3.135.3+. Para obtener más información, consulte la [documentación del Datadog Helm Chart][1].

  ```yaml
  datadog:
    ...
    networkMonitoring:
      enabled: true
  ```

**Opcional**: Para monitorear el tráfico DNS en puertos no estándar (Agent v7.76.0+), agregue la opción `dnsMonitoringPorts`:

  ```yaml
  datadog:
    networkMonitoring:
      enabled: true
      dnsMonitoringPorts:
        - 53
        - 5353
  ```

Es posible que requiera uno de los siguientes pasos adicionales dependiendo de su entorno:

{{< collapse-content title="Google GKE Autopilot" level="h3" >}}

Si su clúster está ejecutando Google GKE Autopilot, añada lo siguiente a su archivo de valores:

```
providers:
  gke:
    autopilot: true
```

{{< /collapse-content >}}

{{< collapse-content title="Google Container-Optimized OS (COS)" level="h3" >}}

Si su clúster está ejecutando Google Container-Optimized OS (COS), añada lo siguiente a su archivo de valores:

```
providers:
  gke:
    cos: true
```


{{< /collapse-content >}}

{{< collapse-content title="Bottlerocket Linux" level="h3" >}}

Si su clúster está utilizando la distribución Bottlerocket Linux para sus nodos, añada lo siguiente a su archivo de valores:

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
2. Reemplace `<DATADOG_API_KEY>` con su [Datadog API key][2].
3. Opcional: **Establezca su sitio de Datadog**. Si está utilizando el sitio de Datadog EU, establezca la variable de entorno `DD_SITE` en `datadoghq.eu` en el manifiesto `datadog-agent.yaml`.
4. **Implemente el DaemonSet** con el comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

Si ya tiene el [Agent ejecutándose con un manifiesto][3]:

1. Para versiones de Kubernetes anteriores a `1.30`, añada la anotación `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` en la plantilla `datadog-agent`:

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

2. Habilite la recopilación de procesos y la sonda del sistema con las siguientes variables de entorno en el DaemonSet del Agent. Si está ejecutando un contenedor por proceso del Agent, añada las siguientes variables de entorno al contenedor del Process Agent; de lo contrario, añádalas al contenedor del Agent.

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

4. Añada un nuevo system-probe como sidecar al Agent:

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

5. Por último, añada los siguientes volúmenes a su manifiesto:

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
{{% tab "Operador" %}}

[El Datadog Operator][1] simplifica la implementación del Datadog Agent en Kubernetes y OpenShift. Proporciona estado de implementación, estado de salud e informes de errores a través del estado de su Custom Resource, al tiempo que reduce el riesgo de una configuración incorrecta con opciones de configuración de nivel superior.

Para habilitar Cloud Network Monitoring en el Datadog Operator, utilice la siguiente configuración:

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

Para habilitar Cloud Network Monitoring en Docker, utilice la siguiente configuración al iniciar el contenedor del Agent:

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

Reemplace `<DATADOG_API_KEY>` con su [clave de Datadog API][1].

Si utiliza `docker-compose`, agregue lo siguiente al servicio del Datadog Agent.

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

<div class="alert alert-info">ECS Fargate para CNM está en versión preliminar (Preview). Comuníquese con su representante de Datadog para registrarse.</div>

Para habilitar Cloud Network Monitoring en ECS Fargate, utilice las siguientes instrucciones:

**Requiere la versión `7.58` del Agent o superior**.

- Para una nueva implementación de Fargate, configure el Datadog Agent para supervisar Fargate en ECS habilitando la [recopilación de procesos][1] en sus hosts de Fargate.

- Para implementaciones existentes, actualice su archivo `task.json` para incluir los siguientes ajustes de configuración:

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

{{< site-region region="us,us3,us5,eu,uk1" >}}
### Resolución mejorada {#enhanced-resolution}

Opcionalmente, habilite la recopilación de recursos para integraciones en la nube para permitir que Cloud Network Monitoring descubra entidades gestionadas en la nube.
- Instale la [integración de Azure][101] para obtener visibilidad de los balanceadores de carga y las puertas de enlace de aplicaciones de Azure.
- Instale la [integración de AWS][102] para obtener visibilidad del balanceador de carga de AWS. **debe habilitar la recopilación de métricas de ENI y EC2**

Para obtener información adicional sobre estas capacidades, consulte [Resolución mejorada de servicios en la nube][103].

[101]: /es/integrations/azure
[102]: /es/integrations/amazon_web_services/#resource-collection
[103]: /es/network_monitoring/cloud_network_monitoring/network_analytics/#cloud-service-enhanced-resolution

{{< /site-region >}}

### Conexiones fallidas {#failed-connections}

Failed Connections permite recopilar y notificar fallas de TCP, incluidos [restablecimientos, rechazos y tiempos de espera][14]. Esta función está habilitada de forma predeterminada en la versión `7.59+` del Agent y se puede acceder a ella desde la página [CNM Analytics][15] del menú {{< ui >}}Customize{{< /ui >}} al activar el interruptor {{< ui >}}Failures{{< /ui >}}.

**Nota**: Si algunos de los Agents de su infraestructura ejecutan una versión anterior a `7.59`, es posible que las fallas se reporten de manera incompleta. CNM recomienda mantener la misma versión de Agent en _todos_ los hosts.

{{< img src="network_performance_monitoring/setup/cnm_tcp_failures_toggle.png" alt="Captura de pantalla del menú de personalización de CNM, con el interruptor Failures resaltado" style="width:50%;">}}

## Lecturas adicionales {#further-reading}
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