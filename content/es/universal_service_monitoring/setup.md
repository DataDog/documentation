---
further_reading:
- link: /universal_service_monitoring/
  tag: Documentación
  text: Más información sobre Universal Service Monitoring
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Señales clave en segundos con Universal Service Monitoring
title: Configuración de Universal Service Monitoring
---


## Versiones admitidas y compatibilidad

Versión requerida del Agent 
: Universal Service Monitoring requiere que el Datadog Agent instalado junto a tu servicio en contenedores sea al menos la versión 6.40 o 7.40. Como se indica más adelante, algunas funciones beta requieren versiones posteriores.

Plataformas Linux compatibles
: Kernel Linux 4.14 y posterior<br/>
CentOS o RHEL 8.0 y posterior

Plataformas compatibles de Windows 
: IIS en Windows 2012 R2 y posterior

Protocolos de capa de aplicación admitidos
: HTTP<br/>
HTTPS (OpenSSL)

Limitaciones conocidas
: Universal Service Monitoring requiere el uso de `system-probe` de Datadog, que no es compatible con Google Kubernetes Engine (GKE) Autopilot.

<div class="alert alert-info">
En <a href="/universal_service_monitoring/additional_protocols/">la fase beta privada</a> se admiten protocolos y métodos de cifrado de tráfico adicionales. Si quieres compartir plataformas y protocolos que te gustaría que fueran compatibles, <a href="/help/">ponte en contacto con soporte</a>.
</div>

## Requisitos previos

- En Linux:
    - Tu servicio se ejecuta en un contenedor.
    - **Fase beta:** Para servicios no contenedorizados, consulta las [instrucciones aquí](#additional-configuration).
- En Windows IIS:
    - Tu servicio se ejecuta en una máquina virtual.
- Datadog Agent se instala junto con tu servicio. _No_ es necesario instalar una biblioteca de rastreo.
- La etiqueta `env` para el [etiquetado de servicios unificado][1] se ha aplicado a tu despliegue. Las etiquetas `service` y `version` son opcionales.

## Activación de Universal Service Monitoring

Activa Universal Service Monitoring en tu Agent utilizando uno de los siguientes métodos según cómo esté desplegado tu servicio y configurado tu Agent:

{{< tabs >}}
{{% tab "Helm" %}}

Si utilizas la tabla de Datadog en una versión >= 2.26.2, añade lo siguiente a tu archivo de valores:

```
datadog:
  ...
  serviceMonitoring:
    enabled: true
```

Si tu clúster está ejecutando Google Container-Optimized OS (COS), añade también lo siguiente a tu archivo de valores:

```
providers:
  gke:
    cos: true
```

{{% /tab %}}
{{% tab "Operator" %}}

Se requiere Datadog Operator v1.0.0 o posterior.

Para habilitar Universal Service Monitoring con el [Datadog Operator][1], actualiza tu manifiesto `datadog-agent.yaml`. En el recurso `DatadogAgent`, establece `spec.features.usm.enabled` en `true`:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
        apiSecret:
           secretName: datadog-secret
           keyName: api-key
        appSecret:
         secretName: datadog-secret
         keyName: app-key
     features:
       usm:
         enabled: true
   ```


[1]: https://github.com/DataDog/datadog-operator

{{% /tab %}}
{{% tab "Kubernetes without Helm" %}}

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
2. Habilita Universal Service Monitoring con las siguientes variables de entorno en el daemonset del Agent. Si estás ejecutando un contenedor por proceso de Agent, añade las siguientes variables de entorno al contenedor `process-agent`. De lo contrario, añádelas al contenedor `agent`.

   ```yaml
   ...
     env:
       ...
       - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
         value: 'true'
       - name: DD_SYSTEM_PROBE_EXTERNAL
         value: 'true'
       - name: DD_SYSPROBE_SOCKET
         value: /var/run/sysprobe/sysprobe.sock
   ```

3. Monta los siguientes volúmenes adicionales en el contenedor `datadog-agent`:
   ```yaml
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
     volumeMounts:
       ...
       - name: sysprobe-socket-dir
       mountPath: /var/run/sysprobe
   ```

4. Añade un nuevo contenedor `system-probe` como complemento del Agent:

   ```yaml
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
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
           - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
             value: 'true'
           - name: DD_SYSPROBE_SOCKET
             value: /var/run/sysprobe/sysprobe.sock
         resources: {}
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
           - name: modules
             mountPath: /lib/modules
             readOnly: true
           - name: src
             mountPath: /usr/src
             readOnly: true
           - name: runtime-compiler-output-dir
             mountPath: /var/tmp/datadog-agent/system-probe/build
           - name: kernel-headers-download-dir
             mountPath: /var/tmp/datadog-agent/system-probe/kernel-headers
             readOnly: false
           - name: apt-config-dir
             mountPath: /host/etc/apt
             readOnly: true
           - name: yum-repos-dir
             mountPath: /host/etc/yum.repos.d
             readOnly: true
           - name: opensuse-repos-dir
             mountPath: /host/etc/zypp
             readOnly: true
           - name: public-key-dir
             mountPath: /host/etc/pki
             readOnly: true
           - name: yum-vars-dir
             mountPath: /host/etc/yum/vars
             readOnly: true
           - name: dnf-vars-dir
             mountPath: /host/etc/dnf/vars
             readOnly: true
           - name: rhel-subscription-dir
             mountPath: /host/etc/rhsm
             readOnly: true
   ```

5. Añade los siguientes volúmenes a tu manifiesto:
   ```yaml
   volumes:
     - name: sysprobe-socket-dir
       emptyDir: {}
     - name: procdir
       hostPath:
         path: /proc
     - name: debugfs
       hostPath:
         path: /sys/kernel/debug
     - hostPath:
         path: /lib/modules
       name: modules
     - hostPath:
         path: /usr/src
       name: src
     - hostPath:
         path: /var/tmp/datadog-agent/system-probe/build
       name: runtime-compiler-output-dir
     - hostPath:
         path: /var/tmp/datadog-agent/system-probe/kernel-headers
       name: kernel-headers-download-dir
     - hostPath:
         path: /etc/apt
       name: apt-config-dir
     - hostPath:
         path: /etc/yum.repos.d
       name: yum-repos-dir
     - hostPath:
         path: /etc/zypp
       name: opensuse-repos-dir
     - hostPath:
         path: /etc/pki
       name: public-key-dir
     - hostPath:
         path: /etc/yum/vars
       name: yum-vars-dir
     - hostPath:
         path: /etc/dnf/vars
       name: dnf-vars-dir
     - hostPath:
         path: /etc/rhsm
       name: rhel-subscription-dir

   ```

    **Nota**: Si tu clúster se ejecuta en Google Container-Optimized OS (COS), elimina el montaje `src` al eliminar lo siguiente de tu definición de contenedor:
   ```yaml
    - name: src
      mountPath: /usr/src
      readOnly: true
   ```
    Y eliminar lo siguiente de tu manifiesto:
   ```yaml
    - hostPath:
        path: /usr/src
      name: src
   ```

6. Para una compatibilidad de HTTPS opcional, añade lo siguiente al contenedor `system-probe`:

   ```yaml
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   Y añade los siguientes volúmenes a tu manifiesto:
   ```yaml
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

Añade lo siguiente a tu comando `docker run`:

```shell
docker run --cgroupns host \
--pid host \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
-v /sys/kernel/debug:/sys/kernel/debug \
-v /lib/modules:/lib/modules:ro \
-v /usr/src:/usr/src:ro \
-v /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build \
-v /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers \
-v /etc/apt:/host/etc/apt:ro \
-v /etc/yum.repos.d:/host/etc/yum.repos.d:ro \
-v /etc/zypp:/host/etc/zypp:ro \
-v /etc/pki:/host/etc/pki:ro \
-v /etc/yum/vars:/host/etc/yum/vars:ro \
-v /etc/dnf/vars:/host/etc/dnf/vars:ro \
-v /etc/rhsm:/host/etc/rhsm:ro \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
-e HOST_ROOT=/host/root \
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

{{% /tab %}}
{{% tab "Docker Compose" %}}

Añade lo siguiente a tu archivo `docker-compose.yml`:

```yaml
services:
  ...
  datadog:
    ...
    environment:
     - DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED='true'
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock:ro
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
     - /sys/kernel/debug:/sys/kernel/debug
     - /lib/modules:/lib/modules
     - /usr/src:/usr/src
     - /var/tmp/datadog-agent/system-probe/build:/var/tmp/datadog-agent/system-probe/build
     - /var/tmp/datadog-agent/system-probe/kernel-headers:/var/tmp/datadog-agent/system-probe/kernel-headers
     - /etc/apt:/host/etc/apt
     - /etc/yum.repos.d:/host/etc/yum.repos.d
     - /etc/zypp:/host/etc/zypp
     - /etc/pki:/host/etc/pki
     - /etc/yum/vars:/host/etc/yum/vars
     - /etc/dnf/vars:/host/etc/dnf/vars
     - /etc/rhsm:/host/etc/rhsm
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

Para una compatibilidad HTTPS opcional, también añade:

```yaml
services:
  ...
  datadog:
    ...
    environment:
     - HOST_ROOT: '/host/root'
    volumes:
     - /:/host/root:ro
```

{{% /tab %}}
{{% tab "Docker Swarm" %}}

Como `Docker Swarm` todavía no admite el cambio de `security_opt`, el sistema operativo
no debe tener una instancia de `apparmor` en ejecución.

Si el sistema operativo no dispone de una instancia `apparmor` en ejecución, utiliza el mismo archivo `docker-compose.yml` de la [sección][1] `Docker-Compose` junto al campo `security_opt`.

[1]: /es/universal_service_monitoring/setup/?tab=dockercompose#enabling-universal-service-monitoring

{{% /tab %}}
{{% tab "Configuration files (Linux)" %}}

Si no estás utilizando Helm Charts o variables de entorno, establece lo siguiente en tu archivo `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "Environment variables (Linux)" %}}

Si configuras el `system-probe` con variables de entorno, como es común con Docker y las instalaciones de ECS, pasa la siguiente variable de entorno a **ambas** variables: el `process-agent` y `system-probe`:

```yaml
DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true
```

{{% /tab %}}
{{% tab "Chef" %}}

Establece los siguientes atributos en tus nodos:

```rb
node["datadog"]["system_probe"]["service_monitoring_enabled"] = true
```

{{% /tab %}}
{{% tab "Puppet" %}}

Establece `service_monitoring_enabled`:

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

Añade los siguientes atributos a tu cuaderno de estrategias:

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}

{{% tab "ECS" %}}

Para ECS, activa USM y System Probe con la siguiente definición de tarea JSON. Despliega la definición de tarea como [servicio daemon][1].

```json
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "image": "public.ecr.aws/datadog/agent:7",
      "cpu": 500,
      "memory": 1024,
      "essential": true,
      "mountPoints": [
        ...
        {
          "containerPath": "/sys/kernel/debug",
          "sourceVolume": "sys_kernel_debug"
        },
        {
          "containerPath": "/host/proc",
          "sourceVolume": "proc"
        },
        {
          "containerPath": "/var/run/docker.sock",
          "sourceVolume": "var_run_docker_sock"
        },
        {
          "containerPath": "/host/sys/fs/cgroup",
          "sourceVolume": "sys_fs_cgroup"
        },
        {
          "readOnly": true,
          "containerPath": "/var/lib/docker/containers",
          "sourceVolume": "var_lib_docker_containers"
        },
        {
          "containerPath": "/lib/modules",
          "sourceVolume": "lib_modules"
        },
        {
          "containerPath": "/usr/src",
          "sourceVolume": "usr_src"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/build",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_build"
        },
        {
          "containerPath": "/var/tmp/datadog-agent/system-probe/kernel-headers",
          "sourceVolume": "var_tmp_datadog_agent_system_probe_kernel_headers"
        },
        {
          "containerPath": "/host/etc/apt",
          "sourceVolume": "etc_apt"
        },
        {
          "containerPath": "/host/etc/yum.repos.d",
          "sourceVolume": "etc_yum_repos_d"
        },
        {
          "containerPath": "/host/etc/zypp",
          "sourceVolume": "etc_zypp"
        },
        {
          "containerPath": "/host/etc/pki",
          "sourceVolume": "etc_pki"
        },
        {
          "containerPath": "/host/etc/yum/vars",
          "sourceVolume": "etc_yum_vars"
        },
        {
          "containerPath": "/host/etc/dnf/vars",
          "sourceVolume": "etc_dnf_vars"
        },
        {
          "containerPath": "/host/etc/rhsm",
          "sourceVolume": "etc_rhsm"
        }
      ],
      "environment": [
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_DATADOG_API_KEY>"
        },
        ...
        {
          "name": "DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED",
          "value": "true"
        }
      ],
      "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
          ]
        }
      }
    }
  ],
  "requiresCompatibilities": [
    "EC2"
  ],
  "volumes": [
    ...
    {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "sys_kernel_debug"
    },
    {
      "host": {
        "sourcePath": "/proc/"
      },
      "name": "proc"
    },
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "var_run_docker_sock"
    },
    {
      "host": {
        "sourcePath": "/sys/fs/cgroup/"
      },
      "name": "sys_fs_cgroup"
    },
    {
      "host": {
        "sourcePath": "/var/lib/docker/containers/"
      },
      "name": "var_lib_docker_containers"
    },
    {
      "host": {
        "sourcePath": "/lib/modules"
      },
      "name": "lib_modules"
    },
    {
      "host": {
        "sourcePath": "/usr/src"
      },
      "name": "usr_src"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/build"
      },
      "name": "var_tmp_datadog_agent_system_probe_build"
    },
    {
      "host": {
        "sourcePath": "/var/tmp/datadog-agent/system-probe/kernel-headers"
      },
      "name": "var_tmp_datadog_agent_system_probe_kernel_headers"
    },
    {
      "host": {
        "sourcePath": "/etc/apt"
      },
      "name": "etc_apt"
    },
    {
      "host": {
        "sourcePath": "/etc/yum.repos.d"
      },
      "name": "etc_yum_repos_d"
    },
    {
      "host": {
        "sourcePath": "/etc/zypp"
      },
      "name": "etc_zypp"
    },
    {
      "host": {
        "sourcePath": "/etc/pki"
      },
      "name": "etc_pki"
    },
    {
      "host": {
        "sourcePath": "/etc/yum/vars"
      },
      "name": "etc_yum_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/dnf/vars"
      },
      "name": "etc_dnf_vars"
    },
    {
      "host": {
        "sourcePath": "/etc/rhsm"
      },
      "name": "etc_rhsm"
    }
  ],
  "family": "datadog-agent-task"
}
```

Si la imagen del sistema operativo es Ubuntu o Debian, añade lo siguiente después de `environment`:

```yaml
"dockerSecurityOptions": [
  "apparmor:unconfined"
]
```

Para una compatibilidad HTTPS opcional, también añade:

```yaml
"mountPoints": [
  ...
  {
    "containerPath": "/host/root",
    "sourceVolume": "host_root"
  },
  ...
]
...
"volumes": [
  ...
  {
    "host": {
      "sourcePath": "/"
    },
    "name": "host_root"
  },
  ...
]
```

Si utilizas equilibradores de carga con tus servicios, habilita las integraciones de nube adicionales para permitir que Universal Service Monitoring descubra entidades gestionadas por la nube:

1. Instala la [integración de AWS][2] para obtener visibilidad en AWS Load Balancer.
2. Activa la recopilación de métricas de ENI y EC2.
3. Añade las siguientes etiquetas a cada equilibrador de carga:
   ```conf
   ENV=<env>
   SERVICE=<service>
   ```

[1]: /es/containers/amazon_ecs/?tab=awscli#run-the-agent-as-a-daemon-service
[2]: /es/integrations/amazon_web_services/
{{% /tab %}}

{{% tab "Windows" %}}

**Para servicios que se ejecutan en IIS:**

1. Instala [Datadog Agent ][1] (versión 6.41 o 7.41 y posteriores) con el componente del controlador de dispositivos de kernel de red activado.
   Para el Agent versión 7.44 o anterior, debes pasar `ADDLOCAL="MainApplication,NPM"` al comando `msiexec` durante la instalación, o seleccionar **Network Performance Monitoring** al ejecutar la instalación del Agent a través de la GUI.

2. Edita `C:\ProgramData\Datadog\system-probe.yaml` para establecer el indicador habilitado en `true`:

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
[1]: /es/agent/basic_agent_usage/windows/?tab=commandline
{{% /tab %}}

{{< /tabs >}}

## Configuración adicional

Los siguientes sistemas o servicios requieren configuración adicional:

{{< collapse-content title="Servicios no contenerizados en Linux" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring está disponible en fase <strong>beta</strong> para monitorizar servicios que ejecutan instancias bare-metal en máquinas virtuales de Linux.
</div>

Requiere Agent versión 7.42 o posterior.

{{< tabs >}}
{{% tab "Configuration file" %}}

Añade la siguiente configuración a `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SYSTEM_PROBE_PROCESS_SERVICE_INFERENCE_ENABLED=true
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}} 

{{< collapse-content title="Monitorización de Go TLS" level="h4" >}}
<div class="alert alert-info">
Universal Service Monitoring está disponible en fase <strong>beta</strong> para monitorizar tráfico cifrado de TLS desde servicios implementados en Golang.
</div>

<strong>Nota</strong>:
<br>
<ul role="list">
  <li>Los servidores Go HTTPS pueden actualizar el protocolo HTTP1.1 a HTTP/2, que es compatible con la versión beta privada. Ponte en contacto con tu gestor de cuenta para obtener más información.</li>
  <li>Requiere Agent versión 7.51 o posterior.</li>
</ul>

{{< tabs >}}
{{% tab "Configuration file" %}}

Añade la siguiente configuración a `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    go:
      enabled: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_GO_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_GO_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}} 

{{< collapse-content title="Monitorización de NodeJS TLS" level="h4" >}}

<div class="alert alert-info">
Universal Service Monitoring está disponible en fase <strong>beta</strong> para monitorizar solicitudes HTTP, HTTP/2 y gRPC de servicios implementados en NodeJS.
</div>

Requiere Agent versión 7.54 o posterior.

{{< tabs >}}
{{% tab "Configuration file" %}}

Añade la siguiente configuración a `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    nodejs:
      enabled: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_NODEJS_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_NODEJS_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}} 

{{< collapse-content title="Monitorización de Istio" level="h4" >}}

Universal Service Monitoring está disponible para monitorizar servicios en <a href="https://istio.io/latest/docs/tasks/security/authentication/mtls-migration/">Istio mTLS</a> y capturar tráfico de HTTPs, HTTP/2 y gRPC cifrado.

Requiere Agent versión 7.50 o posterior.

{{< tabs >}}
{{% tab "Configuration file" %}}

Añade la siguiente configuración a `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    istio:
      enabled: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_TLS_ISTIO_ENABLED=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_TLS_ISTIO_ENABLED
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}} 

{{< collapse-content title="HTTP/2 monitoring" level="h4" >}}
Universal Service Monitoring puede capturar tráfico HTTP/2 y gRPC.

<strong>Nota</strong>:
<br>
<ul role="list">
  <li>Requiere Linux Kernel versión 5.2 o posterior.</li>
  <li>Requiere Agent versión 7.53 o posterior.</li>
</ul>

{{< tabs >}}
{{% tab "Configuration file" %}}

Añade la siguiente configuración a `system-probe.yaml`:

```yaml
service_monitoring_config:
  enable_http2_monitoring: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_HTTP2_MONITORING=true
```
{{% /tab %}}
{{% tab "Helm" %}}

```conf
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_ENABLE_HTTP2_MONITORING
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Monitorización de Kafka (fase beta privada)" level="h4" >}}

<div class="alert alert-info">
La monitorización de Kafka Monitoring está disponible en fase <strong>beta privada</strong>.
</div>

<strong>Nota</strong>:
<br>
<ul role="list">
  <li>Los productores y consumidores requieren la versión 5.2 o posterior del Linux Kernel.</li>
  <li>Los productores y consumidores deben interactuar con Kafka <strong>sin</strong> TLS.</li>
  <li>Requiere Agent versión 7.53 o posterior.</li>
</ul>

{{< tabs >}}
{{% tab "Configuration file" %}}

Añade la siguiente configuración a `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  enable_kafka_monitoring: true
```

{{% /tab %}}
{{% tab "Environment variable" %}}

```conf
DD_SERVICE_MONITORING_CONFIG_ENABLE_KAFKA_MONITORING=true
```
{{% /tab %}}

{{% tab "Helm" %}}

```conf
datadog:
  ...
  serviceMonitoring:
    enabled: true

agents:
  ...
  containers:
    systemProbe:
      env:
        - name: DD_SERVICE_MONITORING_CONFIG_ENABLE_KAFKA_MONITORING
          value: "true"
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}


## Exclusión y sustitución de rutas

Utiliza `http_replace_rules` o `DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES` para configurar el Agent para eliminar los endpoints HTTP que coincidan con una expresión regular, o para convertir los endpoints coincidentes a un formato diferente.

{{< tabs >}}
{{% tab "Configuration file" %}}

Añade la siguiente configuración a `system-probe`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "<exclusion rule>"
      repl: ""
    - pattern: "<replacement rule>"
      repl: "<new format>"
```

Por ejemplo, la siguiente configuración elimina los endpoints que empiezan por `/api/`, como `/api/v1/users`. Sin embargo, no elimina `/api` ni `/users/api`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/.*"
      repl: ""
```

La siguiente configuración sustituye un endpoint `/api/users` para que coincida con un nuevo formato de `/api/v1/users`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/users"
      repl: "/api/v1/users"
```

{{% /tab %}}
{{% tab "Environment variable" %}}
Añade la siguiente entrada:

```conf
DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES=[{"pattern":"<drop regex>","repl":""},{"pattern":"<replace regex>","repl":"<replace pattern>"}]
```
{{% /tab %}}
{{% tab "Helm" %}}

El siguiente ejemplo elimina el endpoint `/my-api` y sustituye `/my-api-2` por `/new-version`.

```yaml
agents:
  containers:
    systemProbe:
      env:
        - name: DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES
          value: '[{"pattern":"/my-api","repl":""},{"pattern":"/my-api-2","repl":"/new-version"}]'
```

{{% /tab %}}
{{< /tabs >}}


<div class="alert alert-info"><strong>Compatibilidad con protocolos y métodos de cifrado adicionales</strong><p>USM dispone de soporte beta para la detección de servicios en la nube y para decodificar protocolos adicionales y métodos de cifrado de tráfico. Para obtener más información y solicitar acceso a la versión beta privada, consulta </a>Detección de servicios en la nube y protocolos adicionales</a>.</p></div>


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging