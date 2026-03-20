---
description: Configura la Monitoreo de Servicio Universal con el Agente de Datadog
  en diferentes plataformas, incluyendo Kubernetes, Docker, ECS y entornos de Windows.
further_reading:
- link: /universal_service_monitoring/
  tag: Documentation
  text: Aprende sobre la Monitoreo de Servicio Universal
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Señales doradas en segundos con la Monitoreo de Servicio Universal
title: Configurando la Monitoreo de Servicio Universal
---
## Versiones soportadas y compatibilidad

Versión del Agente requerida
: La Monitoreo de Servicio Universal requiere que el Agente de Datadog instalado junto a tu servicio en contenedores sea al menos la versión 6.40 o 7.40. Como se indica a continuación, algunas características en Vista previa requieren versiones más altas.

Plataformas de Linux soportadas
: Núcleo de Linux 4.14 y superior<br/>
CentOS o RHEL 8.0 y superior

Plataformas de Windows soportadas
: Windows 2012 R2 y superior

Protocolos de capa de aplicación soportados
: HTTP<br/>
HTTPS (OpenSSL)

Limitaciones conocidas
: La Monitoreo de Servicio Universal requiere el uso de `system-probe`Datadog's, que no es compatible con Google Kubernetes Engine (GKE) Autopilot.

<div class="alert alert-info">
Protocolos adicionales y métodos de cifrado de tráfico están en <a href="/universal_service_monitoring/additional_protocols/">Vista previa</a>. Si tienes comentarios sobre qué plataformas y protocolos te gustaría ver soportados, <a href="/help/">contacta al Soporte</a>.
</div>

## Requisitos previos

- Si está en Linux:
    - Su servicio se está ejecutando en un contenedor.
    - **En Vista previa:** Para servicios que no están en contenedores, consulte las [instrucciones aquí](#additional-configuration).
- Si está en Windows:
    - Su servicio se está ejecutando en una máquina virtual.
- El Agente de Datadog está instalado junto a su servicio. Instalar una biblioteca de trazado _no_ es obligatorio.
- La `env` etiqueta para [Etiquetado de Servicio Unificado][1] se ha aplicado a su implementación. Las etiquetas `service` y `version` son opcionales.

## Cómo USM detecta nombres de servicio

<div class="alert alert-warning">
La Monitoreo de Servicio Universal detecta nombres de servicio a partir de variables de entorno que existen cuando un proceso se inicia. USM lee estos valores del sistema operativo: desde <code>/proc/PID/environ</code> en Linux, o a través de APIs del sistema en Windows.
</div>

USM reconoce las siguientes variables de entorno:
- `DD_SERVICE`: Establece explícitamente el nombre del servicio
- `DD_ENV`: Establece la etiqueta del entorno
- `DD_VERSION`: Establece la etiqueta de la versión
- `DD_TAGS`: Etiquetas adicionales; puede incluir la etiqueta `service:name`

### Limitación clave: variables de entorno de USM y establecidas programáticamente para APM

Si estableces variables de entorno programáticamente **dentro de tu código de aplicación** (como `System.setProperty("dd.service", "my-service")` en Java, o `Environment.SetEnvironmentVariable("DD_SERVICE", "my-service")` en .NET), estas variables de entorno **no** son detectadas por USM, aunque estos valores funcionan para la instrumentación de trazado de APM.

Esto sucede porque USM se ejecuta en el Agente de Datadog como un proceso separado y solo ve las variables de entorno que se establecieron cuando tu proceso comenzó. Por el contrario, las bibliotecas de instrumentación de APM se ejecutan dentro de tu proceso de aplicación y pueden leer los cambios en el entorno en tiempo de ejecución.

**Para asegurar la detección de USM, establece las variables de entorno antes de que la aplicación inicie**:

{{< tabs >}}
{{% tab "Docker" %}}

```yaml
environment:
  - DD_SERVICE=my-service
  - DD_ENV=production
```
{{% /tab %}}
{{% tab "Kubernetes" %}}

```yaml
env:
  - name: DD_SERVICE
    value: "my-service"
  - name: DD_ENV
    value: "production"
```
{{% /tab %}}
{{% tab "Shell" %}}

```bash
export DD_SERVICE=my-service
export DD_ENV=production
java -jar myapp.jar
```
{{% /tab %}}
{{< /tabs >}}

## Habilitando la Monitoreo Universal de Servicios

Habilita la Monitoreo Universal de Servicios en tu Agente utilizando uno de los siguientes métodos dependiendo de cómo se despliega tu servicio y cómo está configurado tu Agente:

{{< tabs >}}
{{% tab "Helm" %}}

Usando la versión del gráfico de Datadog >= 2.26.2, agrega lo siguiente a tu archivo de valores:

```
datadog:
  ...
  serviceMonitoring:
    enabled: true
```

Si tu clúster está ejecutando Google Container-Optimized OS (COS), agrega lo siguiente a tu archivo de valores también:

```
providers:
  gke:
    cos: true
```

Si tu clúster está utilizando la distribución de Linux Bottlerocket para sus nodos, agrega lo siguiente a tu archivo de valores:

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

{{% /tab %}}
{{% tab "Operador" %}}

Se requiere Datadog Operator v1.0.0 o superior.

Para habilitar la Monitoreo de Servicio Universal con el [Operador de Datadog][1], actualiza tu `datadog-agent.yaml` manifiesto. En el recurso `DatadogAgent`, establece `spec.features.usm.enabled` en `true`:

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
{{% tab "Kubernetes sin Helm" %}}

1. Agrega la anotación `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` en la plantilla `datadog-agent`:

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
2. Habilita la Monitoreo de Servicio Universal con las siguientes variables de entorno en el daemonset del Agente. Si estás ejecutando un contenedor por proceso del Agente, agrega las siguientes variables de entorno al contenedor `process-agent`. De lo contrario, agrégalas al contenedor `agent`.

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
         image: 'registry.datadoghq.com/agent:latest'
         ...
     volumeMounts:
       ...
       - name: sysprobe-socket-dir
       mountPath: /var/run/sysprobe
   ```

4. Agrega un nuevo contenedor `system-probe` como sidecar al Agente:

   ```yaml
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'registry.datadoghq.com/agent:latest'
         ...
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

5. Agrega los siguientes volúmenes a tu manifiesto:
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

    **Note**: If your cluster runs on Google Container-Optimized OS (COS), remove the `src` mount by removing the following from your container definition:
   ```yaml
    - name: src
      mountPath: /usr/src
      readOnly: true
   ```
    And removing the following from your manifest:
   ```yaml
    - hostPath:
        path: /usr/src
      name: src
   ```

6. Para soporte opcional de HTTPS, agrega lo siguiente al contenedor `system-probe`:

   ```yaml
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   Y agrega los siguientes volúmenes a tu manifiesto:
   ```yaml
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

Agrega lo siguiente a tu `docker run` comando:

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
registry.datadoghq.com/agent:latest
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Agrega lo siguiente a tu `docker-compose.yml` archivo:

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

Para soporte opcional de HTTPS, también agrega:

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

Como `Docker Swarm` aún no admite el cambio de `security_opt`, el sistema operativo
no debe tener una instancia de `apparmor` en ejecución.

Si el sistema operativo no tiene una instancia de `apparmor` en ejecución, utiliza el mismo archivo `docker-compose.yml` de la `Docker-Compose` [sección][1] junto al campo `security_opt`.

[1]: /es/universal_service_monitoring/setup/?tab=dockercompose#enabling-universal-service-monitoring

{{% /tab %}}
{{% tab "Archivos de configuración (Linux)" %}}

Si no estás utilizando Helm Charts o variables de entorno, establece lo siguiente en tu archivo `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "Variables de entorno (Linux)" %}}

Si configuras el `system-probe` con variables de entorno, como es común en instalaciones de Docker y ECS, pasa la siguiente variable de entorno a **tanto** el `process-agent` como el `system-probe`:

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

Agrega los siguientes atributos en tu playbook:

```yaml
service_monitoring_config:
  enabled: true
```

{{% /tab %}}

{{% tab "ECS" %}}

Para ECS, habilita USM y el sistema de sondeo con la siguiente definición de tarea en JSON. Despliega la definición de tarea como un [servicio daemon][1].

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

Si la imagen del sistema operativo es Ubuntu o Debian, agrega lo siguiente después de `environment`:

```yaml
"dockerSecurityOptions": [
  "apparmor:unconfined"
]
```

Para soporte opcional de HTTPS, también agrega:

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

Si utilizas balanceadores de carga con tus servicios, habilita integraciones adicionales en la nube para permitir que el Monitoreo de Servicio Universal descubra entidades gestionadas en la nube:

1. Instala la [Integración de AWS][2] para visibilidad en AWS Load Balancer.
2. Habilita la recolección de métricas de ENI y EC2.
3. Agregue las siguientes etiquetas a cada equilibrador de carga:
   ```conf
   ENV=<env>
   SERVICE=<service>
   ```

[1]: /es/containers/amazon_ecs/?tab=awscli#run-the-agent-as-a-daemon-service
[2]: /es/integrations/amazon_web_services/
{{% /tab %}}

{{% tab "Windows" %}}

**Para servicios que se ejecutan en IIS:**

1. Instale el [Agente de Datadog][1] (versión 6.41 o 7.41 y posteriores) con el componente del controlador de dispositivo del núcleo de red habilitado.
   Para la versión del Agente 7.44 o anterior, debe pasar `ADDLOCAL="MainApplication,NPM"` al comando `msiexec` durante la instalación, o seleccionar **Monitoreo de Red en la Nube** al ejecutar la instalación del Agente a través de la GUI.

2. Edite `C:\ProgramData\Datadog\system-probe.yaml` para establecer la bandera habilitada en `true`:

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
**Para servicios que no son de IIS:**

El descubrimiento de servicios que no son de IIS está habilitado por defecto a partir de la versión 7.57 del Agente. Las versiones anteriores del Agente pueden requerir el siguiente cambio de configuración en `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

<div class="alert alert-warning">
<strong>Limitación importante para servicios de Windows que no son de IIS:</strong> El Monitoreo de Servicios Universales en Windows utiliza el Seguimiento de Eventos para Windows (ETW) a través del proveedor <code>Microsoft-Windows-HttpService</code> para el monitoreo de tráfico HTTPS. Este proveedor de ETW solo está disponible para servicios basados en IIS. Los servicios que no son de IIS (como aplicaciones .NET personalizadas, servidores Node.js, servidores Java u otros servidores HTTP que se ejecutan en Windows) <strong>no admiten el monitoreo de HTTPS</strong> a través de USM. Solo se puede monitorear tráfico HTTP simple para servicios de Windows que no son de IIS.
</div>

### Soporte para servicios de IIS y no-IIS

| Tipo de servicio     | Monitoreo de tráfico HTTP | Monitoreo de tráfico HTTPS |
| ---  | ----------- | ----------- |
| Servicios de IIS     | Soportado | Soportado               |
| Servicios que no son de IIS | Soportado | **No soportado** |

   
[1]: /es/agent/basic_agent_usage/windows/?tab=commandline
{{% /tab %}}

{{< /tabs >}}

## Configuración adicional

Los siguientes sistemas o servicios requieren configuración adicional:

{{< collapse-content title="Servicios no contenedorizados en Linux" level="h4" >}}
<div class="alert alert-info">
La Monitoreo Universal de Servicios está disponible para monitorear servicios que se ejecutan en máquinas virtuales bare-metal en Linux.
</div>

Requiere la versión 7.42 o superior del Agente.

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Agregue la siguiente configuración a la `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  process_service_inference:
    enabled: true
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}

```conf
DD_SYSTEM_PROBE_PROCESS_SERVICE_INFERENCE_ENABLED=true
```
{{% /tab %}}

{{< /tabs >}}
{{< /collapse-content >}}

{{< collapse-content title="Monitoreo TLS de Go" level="h4" >}}
<div class="alert alert-info">
La Monitoreo Universal de Servicios está en Vista Previa para monitorear el tráfico cifrado TLS de servicios implementados en Golang.
</div>

<strong>Nota</strong>:
<br>
<ul role="list">
  <li>Los servidores HTTPS de Go pueden actualizar el protocolo HTTP1.1 a HTTP/2, que está soportado en Vista Previa. Comuníquese con su gerente de cuenta para más detalles.</li>
  <li>Requiere la versión 7.51 o superior del Agente.</li>
</ul>

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Agregue la siguiente configuración a la `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    go:
      enabled: true
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}

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

{{< collapse-content title="Monitoreo TLS de Node.js" level="h4" >}}

<div class="alert alert-info">
La Monitoreo Universal de Servicios está en Vista Previa para monitorear solicitudes HTTP, HTTP/2 y gRPC de servicios implementados en Node.js.
</div>

Requiere la versión 7.54 o superior del Agente.

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Agregue la siguiente configuración a la `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    nodejs:
      enabled: true
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}

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

{{< collapse-content title="Monitoreo de Istio" level="h4" >}}

La Monitoreo Universal de Servicios está disponible para monitorear servicios detrás de <a href="https://istio.io/latest/docs/tasks/security/authentication/mtls-migration/">Istio mTLS</a> y para capturar tráfico cifrado HTTPs, HTTP/2 y gRPC.

Requiere la versión 7.50 o superior del Agente.

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Agregue la siguiente configuración a la `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  tls:
    istio:
      enabled: true
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}

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

{{< collapse-content title="Monitoreo de HTTP/2" level="h4" >}}
La Monitoreo Universal de Servicios puede capturar tráfico HTTP/2 y gRPC.

<strong>Nota</strong>:
<br>
<ul role="list">
  <li>Requiere la versión 5.2 o posterior del núcleo de Linux.</li>
  <li>Requiere la versión 7.53 o superior del Agente.</li>
</ul>

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Agregue la siguiente configuración a la `system-probe.yaml`:

```yaml
service_monitoring_config:
  enable_http2_monitoring: true
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}

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

{{< collapse-content title="Monitoreo de Kafka (Vista previa)" level="h4" >}}

<div class="alert alert-info">
El monitoreo de Kafka está disponible en <strong>Vista previa</strong>.
</div>

<strong>Nota</strong>:
<br>
<ul role="list">
  <li>Los productores y consumidores requieren la versión 5.2 o posterior del núcleo de Linux.</li>
  <li>Los productores y consumidores deben interactuar con Kafka <strong>sin</strong> TLS.</li>
  <li>Requiere la versión 7.53 o superior del Agente.</li>
</ul>

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Agregue la siguiente configuración a la `system-probe.yaml`:

```yaml
service_monitoring_config:
  enabled: true
  enable_kafka_monitoring: true
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}

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


## Exclusión y reemplazo de rutas

Utilice `http_replace_rules` o `DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES` para configurar el Agente para eliminar puntos finales HTTP que coincidan con una expresión regular, o para convertir puntos finales coincidentes en un formato diferente.

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

Agregue la siguiente configuración a la `system-probe`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "<exclusion rule>"
      repl: ""
    - pattern: "<replacement rule>"
      repl: "<new format>"
```

Por ejemplo, la siguiente configuración elimina puntos finales que comienzan con `/api/`, como `/api/v1/users`. Sin embargo, no elimina `/api` o `/users/api`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/.*"
      repl: ""
```

La siguiente configuración reemplaza un punto final `/api/users` para coincidir con un nuevo formato de `/api/v1/users`:

```yaml
network_config:
  http_replace_rules:
    - pattern: "/api/users"
      repl: "/api/v1/users"
```

{{% /tab %}}
{{% tab "Variable de entorno" %}}
Agregue la siguiente entrada:

```conf
DD_SYSTEM_PROBE_NETWORK_HTTP_REPLACE_RULES=[{"pattern":"<drop regex>","repl":""},{"pattern":"<replace regex>","repl":"<replace pattern>"}]
```
{{% /tab %}}
{{% tab "Helm" %}}

El siguiente ejemplo elimina el punto final `/my-api` y reemplaza `/my-api-2` con `/new-version`.

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


<div class="alert alert-info"><strong>Soporte para protocolos adicionales y métodos de cifrado</strong><p>USM está en Vista previa para descubrir servicios en la nube y decodificar protocolos adicionales y métodos de cifrado de tráfico. Para más información y para solicitar acceso a la Vista previa, lea <a href="/universal_service_monitoring/additional_protocols/">Descubrimiento de Servicios en la Nube y Protocolos Adicionales</a>.</p></div>


## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging