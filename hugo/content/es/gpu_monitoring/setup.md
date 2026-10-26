---
further_reading:
- link: /gpu_monitoring/summary
  tag: Documentación
  text: Página de resumen de GPU Monitoring
- link: /gpu_monitoring/explorer
  tag: Documentación
  text: Explorador de GPU Monitoring
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimice y solucione problemas de infraestructura de IA con Datadog GPU Monitoring
title: Configure el seguimiento de GPU
---
Esta página proporciona instrucciones sobre cómo configurar GPU Monitoring de Datadog en su infraestructura. Siga las instrucciones de configuración que correspondan a su entorno operativo a continuación.

### Requisitos previos {#prerequisites}

Para comenzar a utilizar GPU Monitoring de Datadog, su entorno debe cumplir con los siguientes criterios:

- Está ejecutando el Datadog Agent en los servidores acelerados por GPU de los que desea hacer un seguimiento. Si no es así, consulte las siguientes guías:
  - [Instale el Datadog Agent en Kubernetes][1]
  - [Instale el Datadog Agent en Docker][7]
  - [Instale el Datadog Agent en Linux sin contenedores][8]
- Los controladores de NVIDIA están instalados en los servidores. Si utiliza Kubernetes, el plugin de dispositivo NVIDIA para Kubernetes está instalado ([directamente][3] o a través de [NVIDIA GPU Operator][4])

#### Requisitos de versión mínima {#minimum-version-requirements}

- **Datadog Agent**: v7.80
  - (Versión preferida: la [versión más reciente del Agent][2]). Datadog recomienda no utilizar la v7.82.0 para evitar un error que provoca pánicos de kernel inesperados. 
- **Sistema operativo**: Linux
- **Kernel de Linux**: 5.8 o superior
- **Controlador de NVIDIA**: versión 450.51

Si utiliza Kubernetes, se deben cumplir los siguientes requisitos adicionales:

- [**Datadog Operator**][5]: versión 1.18, _o_ [**chart de Helm de Datadog**][6]: versión 3.137.3
- **Kubernetes**: 1.22 con la API de PodResources activa

Si utiliza Google Kubernetes Engine, los nodos con Container-Optimized OS _no_ son compatibles debido a limitaciones en el kernel y en el sistema de permisos.

## Configuración de GPU Monitoring {#setting-up-gpu-monitoring}

La configuración de GPU Monitoring no requiere DCGM. Debe habilitar la recopilación de métricas de GPU Monitoring en el Agent. La configuración depende de su entorno: sin Kubernetes/uniforme, clúster de Kubernetes o clúster mixto.

Después de habilitar la recopilación de métricas de GPU Monitoring, puede habilitar varias integraciones para obtener información más avanzada:
- Para obtener información sobre costos en la nube y tipos de instancias en la nube: habilite las integraciones en la nube de [AWS][9], [Google Cloud][10], [Azure][11] o [Oracle][12] en su interfaz de usuario de Datadog.
- Para obtener información a nivel de proceso, configure [Live Processes][13] de Datadog.

### Configure GPU Monitoring en un entorno que no sea Kubernetes o en un clúster de Kubernetes uniforme {#set-up-gpu-monitoring-on-a-non-kubernetes-environment-or-uniform-kubernetes-cluster}

Las siguientes instrucciones son los pasos básicos para configurar GPU Monitoring en los siguientes entornos:
- En un clúster de Kubernetes donde **todos** los nodos tienen dispositivos GPU
- En un entorno que no sea Kubernetes, como Docker o Linux sin contenedores.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
1. Asegúrese de que la [versión más reciente del Datadog Agent][2] esté [instalada y desplegada][1] en cada servidor GPU del que desee hacer un seguimiento.
2. Modifique su recurso `DatadogAgent` con los siguientes parámetros:

   `gpu.enabled: true`
   : Habilita GPU Monitoring.

   `gpu.patchCgroupPermissions: true`
   : _Solo para GKE_. Habilita una ruta de código en `system-probe` que ayuda al Agent a acceder a dispositivos GPU.

   `gpu.requiredRuntimeClassName:<runtime-name>`
   : _Opcional_. Especifica el entorno de ejecución del contenedor para los pods que necesitan acceso a dispositivos GPU, por ejemplo: `nvidia`, `nvidia-cdi`, `nvidia-legacy`. El valor predeterminado es `nvidia`, ya que ese es el entorno de ejecución predeterminado definido por el NVIDIA GPU Operator. En EKS y Oracle Cloud, este valor debe establecerse como una cadena vacía, ya que la clase de entorno de ejecución predeterminada ya permite el acceso a dispositivos GPU.

   Ejemplo `datadog-agent.yaml`, ejecutándose en GKE:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     features:
       gpu:
         enabled: true
         patchCgroupPermissions: true # Only for GKE
         requiredRuntimeClassName: "" # Only for AWS EKS or Oracle Cloud
   ```

3. Aplique sus cambios y reinicie el Datadog Agent.

[1]: /es/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Helm" %}}
1. Asegúrese de que la [versión más reciente del Datadog Agent][2] esté [instalada y desplegada][1] en cada servidor GPU del que desee hacer un seguimiento.

2. Modifique su archivo de configuración `datadog-values.yaml` con los siguientes parámetros:

   `gpuMonitoring.enabled: true`
   : Habilita GPU Monitoring.

   `gpuMonitoring.configureCgroupPerms: true`
   : _Solo para GKE_. Habilita una ruta de código en `system-probe` que ayuda al Agent a acceder a dispositivos GPU.

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _Opcional_. Especifica el entorno de ejecución del contenedor para los pods que necesitan acceso a dispositivos GPU, por ejemplo: `nvidia`, `nvidia-cdi`, `nvidia-legacy`. El valor predeterminado es `nvidia`, ya que ese es el entorno de ejecución predeterminado definido por el NVIDIA GPU Operator. En EKS y Oracle Cloud, este valor debe establecerse como una cadena vacía, ya que la clase de entorno de ejecución predeterminada ya permite el acceso a dispositivos GPU.

   Ejemplo `datadog-values.yaml`, ejecutándose en GKE:

   ```yaml
   datadog:
     gpuMonitoring:
       enabled: true
       configureCgroupPerms: true  # Only for GKE
       runtimeClassName: ""        # Only for Oracle Cloud and AWS EKS
   ```

3. Actualice su chart de Helm y reinicie el Datadog Agent.

[1]: /es/containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Docker" %}}

Para habilitar GPU Monitoring en Docker, utilice la siguiente configuración al iniciar el contenedor del Agent:

```shell
docker run \
--pid host \
--gpus all \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_GPU_ENABLED=true \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
registry.datadoghq.com/agent:latest
```

Reemplace `<DATADOG_API_KEY>` con su [clave de Datadog API][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Docker Compose" %}}

Si utiliza `docker-compose`, agregue lo siguiente al servicio del Datadog Agent.

```yaml
version: '3'
services:
  datadog:
    image: "registry.datadoghq.com/agent:latest"
    environment:
      - DD_GPU_ENABLED=true
      - DD_API_KEY=<DATADOG_API_KEY>
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    deploy:
      resources:
        reservations:
          devices:
          - driver: nvidia
            count: all
            capabilities: [gpu]
```

{{% /tab %}}
{{% tab "Linux (sin contenedores)" %}}

GPU Monitoring requiere configuración en **ambos** `datadog.yaml` y `system-probe.yaml`. Configurar solo `datadog.yaml` no carga el módulo eBPF y resulta en que no se recopilen métricas.

1. Agregue lo siguiente a `/etc/datadog-agent/datadog.yaml`:

    ```yaml
    gpu:
      enabled: true
    collect_gpu_tags: true
    enable_nvml_detection: true
    ```

2. Si `/etc/datadog-agent/system-probe.yaml` no existe, créelo a partir del ejemplo:

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Agregue lo siguiente a `/etc/datadog-agent/system-probe.yaml`:

    ```yaml
    gpu_monitoring:
      enabled: true
    ```

4. Reinicie tanto el Agent como el system-probe:

    ```shell
    sudo systemctl restart datadog-agent
    sudo systemctl restart datadog-agent-sysprobe
    ```

{{% /tab %}}

{{< /tabs >}}

## Configure GPU Monitoring en un clúster de Kubernetes mixto {#set-up-gpu-monitoring-on-a-mixed-kubernetes-cluster}

En un clúster de Kubernetes mixto, algunos nodos tienen dispositivos GPU mientras que otros no. Se requieren dos DaemonSets separados: uno para la clase de entorno de ejecución en nodos con GPU y otro para nodos sin GPU. Esta división se debe a los requisitos de la clase de entorno de ejecución para el plugin de dispositivo NVIDIA para Kubernetes.

El método recomendado es el Datadog Operator, versión 1.20 o superior. Esta versión proporciona funciones que facilitan la configuración. Para mayor compatibilidad, también se proporcionan instrucciones para instalaciones de Helm y versiones anteriores del Datadog Operator.

{{< tabs >}}
{{% tab "Datadog Operator (1.20 o superior)" %}}

Para configurar GPU Monitoring en un clúster mixto, utilice la función [Agent Profiles][2] del Operator. Esto habilita GPU Monitoring de forma selectiva solo en los nodos con GPU.

1. Configure el Datadog Operator para habilitar la función Datadog Agent Profile en el modo DatadogAgentInternal.

   Si el Datadog Operator se implementó directamente con Helm sin un archivo de valores, la configuración se puede activar o desactivar desde la línea de comandos:

   ```shell
   helm upgrade --set datadogAgentProfile.enabled=true --set datadogAgentInternal.enabled=true --set datadogCRDs.crds.datadogAgentProfiles=true --set datadogCRDs.crds.datadogAgentInternal=true <release-name> datadog/datadog-operator
   ```

   Si el Datadog Operator se implementó con un archivo de valores, la configuración se puede activar o desactivar agregando los siguientes ajustes al archivo de valores:

   ```yaml
   datadogAgentProfile:
     enabled: true

   datadogAgentInternal:
     enabled: true

    datadogCRDs:
      crds:
        datadogAgentProfiles: true
        datadogAgentInternal: true
   ```

   Luego, vuelva a implementar el Datadog Operator con: `helm upgrade --install <release-name> datadog/datadog-operator -f datadog-operator.yaml`.

2. Modifique su recurso `DatadogAgent` agregando la anotación `agent.datadoghq.com/update-metadata` al recurso `DatadogAgent`.

   Las adiciones al archivo `datadog-agent.yaml` deberían verse así:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/update-metadata: "true"  # Required for the Datadog Agent Internal mode to work.
   ```

3. Aplique sus cambios al recurso `DatadogAgent`. Estos cambios se pueden aplicar de forma segura a todos los Datadog Agents, independientemente de si se ejecutan en nodos con GPU.

4. Cree un [Datadog Agent Profile][2] que apunte a nodos de GPU y habilite GPU Monitoring en esos nodos.

   En el siguiente ejemplo, el selector `profileNodeAffinity` apunta a nodos con la etiqueta [`nvidia.com/gpu.present=true`][3], debido a que esta etiqueta suele estar presente en nodos con el NVIDIA GPU Operator. Puede usar otra etiqueta si lo desea.

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgentProfile
   metadata:
     name: gpu-nodes
   spec:
     profileAffinity:
       profileNodeAffinity:
         - key: nvidia.com/gpu.present
           operator: In
           values:
             - "true"
     config:
       features:
         gpu:
           enabled: true
           patchCgroupPermissions: true # Only for GKE
   ```

5. Después de aplicar este nuevo [Datadog Agent Profile][2], el Datadog Operator crea un nuevo DaemonSet, `gpu-nodes-agent`.

[1]: /es/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{% tab "Datadog Operator (1.18 o 1.19)" %}}
Para configurar GPU Monitoring en un clúster mixto, utilice la función [Agent Profiles][2] del Operator. Esto habilita GPU Monitoring de forma selectiva solo en los nodos con GPU.

1. Asegúrese de que la [versión más reciente del Datadog Agent][4] esté [instalada y desplegada][1] en cada servidor de GPU del que desee hacer un seguimiento.

2. Modifique su recurso `DatadogAgent` con los siguientes cambios:

   ```yaml
   spec:
     features:
       oomKill:
         # Only enable this feature if there is nothing else that requires the system-probe container in all Agent pods
         # Examples of system-probe features are npm, cws, usm
         enabled: true

   override:
     nodeAgent:
       volumes:
         - name: nvidia-devices
           hostPath:
             path: /dev/null
         - name: pod-resources
           hostPath:
             path: /var/lib/kubelet/pod-resources
       containers:
         agent:
           env:
             - name: NVIDIA_VISIBLE_DEVICES
               value: "all"
           volumeMounts:
             - name: nvidia-devices
               mountPath: /dev/nvidia-visible-devices
             - name: pod-resources
               mountPath: /var/lib/kubelet/pod-resources
         system-probe:
           env:
             - name: NVIDIA_VISIBLE_DEVICES
               value: "all"
           volumeMounts:
             - name: nvidia-devices
               mountPath: /dev/nvidia-visible-devices
             - name: pod-resources
               mountPath: /var/lib/kubelet/pod-resources
   ```

2. Aplique sus cambios al recurso `DatadogAgent`. Estos cambios se pueden aplicar de forma segura a todos los Datadog Agents, independientemente de si se ejecutan en nodos con GPU.

3. Cree un [Datadog Agent Profile][2] que apunte a nodos de GPU y habilite GPU Monitoring en esos nodos.

   En el siguiente ejemplo, el selector `profileNodeAffinity` apunta a nodos con la etiqueta [`nvidia.com/gpu.present=true`][3], debido a que esta etiqueta suele estar presente en nodos con el NVIDIA GPU Operator. Puede usar otra etiqueta si lo desea.

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgentProfile
   metadata:
     name: gpu-nodes
   spec:
     profileAffinity:
       profileNodeAffinity:
         - key: nvidia.com/gpu.present
           operator: In
           values:
             - "true"
     config:
       override:
         nodeAgent:
           runtimeClassName: nvidia  # Only if not in AWS EKS or Oracle Cloud
           containers:
             # Change system-probe environment variables only for advanced
             # eBPF metrics, or if running in GKE
             system-probe:
               env:
                 - name: DD_GPU_MONITORING_ENABLED
                   value: "true"
                 # cgroup permission patching only for GKE
                 - name: DD_GPU_MONITORING_CONFIGURE_CGROUP_PERMS
                   value: "true"
             agent:
               env:
                 - name: DD_GPU_ENABLED
                   value: "true"
                 # Only for advanced eBPF metrics
                 - name: DD_GPU_MONITORING_ENABLED
                   value: "true"
   ```

4. Después de aplicar este nuevo Datadog Agent Profile, el Datadog Operator crea un nuevo DaemonSet, `datadog-agent-with-profile-<namespace>-gpu-nodes`.

[1]: /es/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Helm" %}}

Para configurar GPU Monitoring en un clúster mixto con Helm, cree dos implementaciones de Helm. Una implementación apunta a nodos de GPU y la otra apunta a nodos sin GPU.

1. Asegúrese de que la [versión más reciente del Datadog Agent][3] esté [instalada y desplegada][1] en cada servidor con GPU del que desee hacer un seguimiento.

2. Modifique su archivo de configuración `datadog-values.yaml` para apuntar a nodos sin GPU.

   El siguiente ejemplo apunta a nodos que **no** tienen la etiqueta `nvidia.com/gpu.present=true`, debido a que esta etiqueta suele estar presente en nodos con el NVIDIA GPU Operator. Si lo desea, puede usar otra etiqueta para excluir los nodos de GPU.

   ```yaml
   agents:
     affinity:
       nodeAffinity:
         requiredDuringSchedulingIgnoredDuringExecution:
           nodeSelectorTerms:
           - matchExpressions:
             - key: nvidia.com/gpu.present
               operator: NotIn
               values:
                 - "true"
   ```

3. Cree un archivo de valores, `datadog-gpu-values.yaml`. Configure este archivo para:
   - Apuntar solo a nodos de GPU
   - [Unirse a Datadog Cluster Agents existentes][2]
   - Habilitar GPU Monitoring con los siguientes parámetros:

   `gpuMonitoring.enabled: true`
   : Habilita GPU Monitoring.

   `gpuMonitoring.configureCgroupPerms: true`
   : _Solo para GKE_. Habilita una ruta de código en `system-probe` que ayuda al Agent a acceder a dispositivos GPU.

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _Opcional_. Especifica el entorno de ejecución del contenedor para los pods que necesitan acceso a dispositivos GPU, por ejemplo: `nvidia`, `nvidia-cdi`, `nvidia-legacy`. El valor predeterminado es `nvidia`, ya que ese es el entorno de ejecución predeterminado definido por el NVIDIA GPU Operator. En EKS y Oracle Cloud, este valor debe establecerse como una cadena vacía, ya que la clase de entorno de ejecución predeterminada ya permite el acceso a dispositivos GPU.

   Ejemplo `datadog-gpu-values.yaml`:

   ```
   # GPU-specific datadog-gpu-values.yaml (for GPU nodes)
   datadog:
     kubeStateMetricsEnabled: false # Disabled, as you're joining an existing Cluster Agent
     gpuMonitoring:
       enabled: true
       configureCgroupPerms: true  # Only for GKE
       runtimeClassName: ""        # Only for Oracle Cloud and AWS EKS

   agents:
     affinity:
       nodeAffinity:
         requiredDuringSchedulingIgnoredDuringExecution:
           nodeSelectorTerms:
           - matchExpressions:
             - key: nvidia.com/gpu.present
               operator: In
               values:
                 - "true"

   # Join with existing Cluster Agent
   existingClusterAgent:
     join: true

   # Disabled datadogMetrics deployment, since it should have been already deployed with the other chart release.
   datadog-crds:
     crds:
       datadogMetrics: false
   ```

4. Implemente el chart de Helm con su `datadog-values.yaml` modificado.

   ```shell
   helm install -f datadog-values.yaml datadog datadog
   ```

5. Implemente nuevamente el chart de Helm con valores de reemplazo específicos para GPU.

   ```shell
   helm install -f datadog-values.yaml -f datadog-gpu-values.yaml datadog-gpu datadog
   ```
[1]: /es/containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#how-to-join-a-cluster-agent-from-another-helm-chart-deployment-linux
[3]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases
[3]: https://github.com/NVIDIA/k8s-device-plugin
[4]: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html
[5]: https://github.com/DataDog/datadog-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[7]: /es/containers/docker/
[8]: /es/agent/supported_platforms/linux/
[9]: /es/getting_started/integrations/aws/
[10]: /es/getting_started/integrations/google_cloud/?tab=orglevel
[11]: /es/getting_started/integrations/azure/?tab=createanappregistration
[12]: /es/getting_started/integrations/oci/
[13]: /es/infrastructure/process?tab=linuxwindows#installation