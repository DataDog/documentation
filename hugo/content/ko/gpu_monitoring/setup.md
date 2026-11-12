---
further_reading:
- link: /gpu_monitoring/summary
  tag: 문서
  text: GPU Monitoring Summary 페이지
- link: /gpu_monitoring/explorer
  tag: 문서
  text: GPU Monitoring 탐색기
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: 블로그
  text: Datadog GPU Monitoring으로 AI 인프라 최적화 및 문제 해결
title: GPU Monitoring 설정하기
---
이 페이지에서는 인프라에 Datadog GPU Monitoring을 설정하는 방법을 안내합니다. 아래에서 운영 환경에 해당하는 구성 지침을 따르세요.

### 전제 조건 {#prerequisites}

Datadog의 GPU Monitoring을 사용하려면 환경이 다음 조건을 충족해야 합니다.

- 모니터링하려는 GPU 가속 호스트에서 Datadog Agent를 실행 중이어야 합니다. 그렇지 않은 경우 다음 가이드를 참조하세요.
  - [Kubernetes에 Datadog Agent 설치][1]
  - [Docker에 Datadog Agent 설치][7]
  - [컨테이너화되지 않은 Linux에 Datadog Agent 설치][8]
- 호스트에 NVIDIA 드라이버가 설치되어 있어야 합니다. Kubernetes를 사용하는 경우, Kubernetes용 NVIDIA 장치 플러그인이 [직접][3] 또는 [NVIDIA GPU Operator][4]를 통해 설치되어 있어야 합니다.

#### 최소 버전 요구 사항 {#minimum-version-requirements}

- **Datadog Agent**: v7.80
  - (권장 버전: [최신 Agent 버전][2]) Datadog은 예기치 않은 커널 패닉을 유발하는 버그가 있으므로 v7.82.0을 사용하지 않을 것을 권장합니다. 
- **운영 체제**: Linux
- **Linux 커널**: 5.8 이상
- **NVIDIA 드라이버**: 버전 450.51

Kubernetes를 사용하는 경우, 다음 추가 요구 사항을 충족해야 합니다.

- [**Datadog Operator**][5]: 버전 1.18, _또는_ [**Datadog Helm chart**][6]: 버전 3.137.3
- **Kubernetes**: PodResources API가 활성화된 버전 1.22

Google Kubernetes Engine을 사용하는 경우, 커널 및 권한 시스템의 제한으로 인해 Container-Optimized OS 노드는 지원되지 _않습니다_.

## GPU Monitoring 설정 {#setting-up-gpu-monitoring}

GPU Monitoring을 구성할 때 DCGM은 필요하지 않습니다. Agent에서 GPU Monitoring 메트릭 수집을 명시적으로 활성화해야 합니다. 설정 방법은 비 Kubernetes 환경, 균일한 Kubernetes 클러스터 또는 혼합 클러스터에 따라 다릅니다.

GPU Monitoring 메트릭 수집을 활성화한 후, 더욱 심층적인 인사이트를 얻기 위해 필요에 따라 여러 통합을 활성화할 수 있습니다.
- 클라우드 비용 및 클라우드 인스턴스 유형 정보를 확인하려면 Datadog UI에서 [AWS][9], [Google Cloud][10], [Azure][11] 또는 [Oracle][12] 클라우드 통합을 활성화하세요.
- 프로세스 수준의 인사이트를 얻으려면 Datadog의 [Live Processes][13]를 설정하세요.

### 비 Kubernetes 환경 또는 균일한 Kubernetes 클러스터에서 GPU Monitoring 설정하기 {#set-up-gpu-monitoring-on-a-non-kubernetes-environment-or-uniform-kubernetes-cluster}

다음 환경에서 GPU Monitoring을 설정하는 기본 단계는 다음과 같습니다.
- **모든** 노드에 GPU 장치가 있는 Kubernetes 클러스터
- Docker 또는 컨테이너화되지 않은 Linux와 같은 비 Kubernetes 환경

{{< tabs >}}
{{% tab "Datadog Operator" %}}
1. 모니터링하려는 모든 GPU 호스트에 [최신 버전의 Datadog Agent][2]가 [설치 및 배포][1]되어 있는지 확인합니다.
2. `DatadogAgent` 리소스를 다음 파라미터로 수정합니다.

   `gpu.enabled: true`
   : GPU Monitoring을 활성화합니다.

   `gpu.patchCgroupPermissions: true`
   : _GKE에서만 사용합니다_. Agent가 GPU 장치에 액세스할 수 있도록 지원하는 `system-probe`의 코드 경로를 활성화합니다.

   `gpu.requiredRuntimeClassName:<runtime-name>`
   : _선택 사항_. GPU 장치에 액세스해야 하는 포드의 컨테이너 런타임을 지정합니다(예: `nvidia`, `nvidia-cdi`, `nvidia-legacy`). 기본값은 `nvidia`이며, 이는 NVIDIA GPU Operator에서 정의한 기본 런타임입니다. EKS 및 Oracle Cloud에서는 기본 런타임 클래스가 이미 GPU 장치에 대한 액세스를 허용하므로 이 값을 빈 문자열로 설정해야 합니다.

   GKE에서 실행되는 예시 `datadog-agent.yaml`:

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

3. 변경 사항을 적용하고 Datadog Agent를 다시 시작합니다.

[1]: /ko/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Helm" %}}
1. 모니터링하려는 모든 GPU 호스트에 [최신 버전의 Datadog Agent][2]가 [설치 및 배포][1]되어 있는지 확인합니다.

2. `datadog-values.yaml` 구성 파일을 다음 파라미터로 수정합니다.

   `gpuMonitoring.enabled: true`
   : GPU Monitoring을 활성화합니다.

   `gpuMonitoring.configureCgroupPerms: true`
   : _GKE에서만 사용합니다_. Agent가 GPU 장치에 액세스할 수 있도록 지원하는 `system-probe`의 코드 경로를 활성화합니다.

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _선택 사항_. GPU 장치에 액세스해야 하는 포드의 컨테이너 런타임을 지정합니다(예: `nvidia`, `nvidia-cdi`, `nvidia-legacy`). 기본값은 `nvidia`이며, 이는 NVIDIA GPU Operator에서 정의한 기본 런타임입니다. EKS 및 Oracle Cloud에서는 기본 런타임 클래스가 이미 GPU 장치에 대한 액세스를 허용하므로 이 값을 빈 문자열로 설정해야 합니다.

   GKE에서 실행되는 예시 `datadog-values.yaml`:

   ```yaml
   datadog:
     gpuMonitoring:
       enabled: true
       configureCgroupPerms: true  # Only for GKE
       runtimeClassName: ""        # Only for Oracle Cloud and AWS EKS
   ```

3. Helm 차트를 업그레이드하고 Datadog Agent를 다시 시작합니다.

[1]: /ko/containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Docker" %}}

Docker에서 GPU Monitoring을 활성화하려면 컨테이너 Agent를 시작할 때 다음 구성을 사용합니다.

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

`<DATADOG_API_KEY>`를 [Datadog API 키][1]로 대체합니다.

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Docker Compose" %}}

`docker-compose`를 사용한다면 Datadog Agent 서비스에 다음을 추가합니다.

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
{{% tab "Linux(비컨테이너 환경)" %}}

GPU Monitoring을 사용하려면 `datadog.yaml` 및 `system-probe.yaml` **두 파일 모두**에 구성이 필요합니다. `datadog.yaml`만 구성하면 eBPF 모듈이 로드되지 않아 메트릭이 수집되지 않습니다.

1. 다음 내용을 `/etc/datadog-agent/datadog.yaml`에 추가합니다.

    ```yaml
    gpu:
      enabled: true
    collect_gpu_tags: true
    enable_nvml_detection: true
    ```

2. `/etc/datadog-agent/system-probe.yaml`이 없으면 다음 예시를 참고하여 생성합니다.

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. 다음 내용을 `/etc/datadog-agent/system-probe.yaml`에 추가합니다.

    ```yaml
    gpu_monitoring:
      enabled: true
    ```

4. Agent와 system-probe를 모두 다시 시작합니다.

    ```shell
    sudo systemctl restart datadog-agent
    sudo systemctl restart datadog-agent-sysprobe
    ```

{{% /tab %}}

{{< /tabs >}}

## 혼합 Kubernetes 클러스터에서 GPU Monitoring 설정 {#set-up-gpu-monitoring-on-a-mixed-kubernetes-cluster}

혼합 Kubernetes 클러스터에서는 일부 노드에만 GPU 장치가 있습니다. GPU 노드의 런타임 클래스를 위한 DaemonSet과 비 GPU 노드를 위한 DaemonSet, 총 두 개가 필요합니다. 이러한 구분은 Kubernetes용 NVIDIA 장치 플러그인의 런타임 클래스 요구 사항 때문입니다.

권장되는 방법은 Datadog Operator 버전 1.20 이상을 사용하는 것입니다. 이 버전은 설정을 간소화하는 기능을 제공합니다. 호환성을 위해 Helm 설치 및 이전 Datadog Operator 버전에 대한 지침도 제공합니다.

{{< tabs >}}
{{% tab "Datadog Operator(1.20 이상)" %}}

혼합 클러스터에서 GPU Monitoring을 설정하려면 Operator의 [Agent Profiles][2] 기능을 사용합니다. 이렇게 하면 GPU가 있는 노드에서만 GPU Monitoring을 활성화할 수 있습니다.

1. DatadogAgentInternal 모드에서 Datadog Agent Profile 기능을 활성화하도록 Datadog Operator를 구성합니다.

   Datadog Operator를 values 파일 없이 Helm으로 직접 배포한 경우 명령줄에서 설정을 전환할 수 있습니다.

   ```shell
   helm upgrade --set datadogAgentProfile.enabled=true --set datadogAgentInternal.enabled=true --set datadogCRDs.crds.datadogAgentProfiles=true --set datadogCRDs.crds.datadogAgentInternal=true <release-name> datadog/datadog-operator
   ```

   Datadog Operator를 values 파일과 함께 배포한 경우 values 파일에 다음 설정을 추가하여 구성을 전환할 수 있습니다.

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

   그런 다음 `helm upgrade --install <release-name> datadog/datadog-operator -f datadog-operator.yaml`을 사용하여 Datadog Operator를 다시 배포합니다.

2. `DatadogAgent` 리소스에 `agent.datadoghq.com/update-metadata` 주석을 추가하여 `DatadogAgent` 리소스를 수정합니다.

   `datadog-agent.yaml` 파일에 추가할 내용은 다음과 같습니다.

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/update-metadata: "true"  # Required for the Datadog Agent Internal mode to work.
   ```

3. `DatadogAgent` 리소스에 변경 사항을 적용합니다. 이러한 변경 사항은 GPU 노드에서 실행되는지 여부와 관계없이 모든 Datadog Agent에 안전하게 적용할 수 있습니다.

4. GPU 노드를 대상으로 하고 해당 노드에서 GPU Monitoring을 활성화하는 [Datadog Agent Profile][2]을 생성합니다.

   다음 예시에서는 NVIDIA GPU Operator가 설치된 노드에 일반적으로 [`nvidia.com/gpu.present=true`][3] 레이블이 있으므로 `profileNodeAffinity` 선택기로 해당 레이블이 있는 노드를 대상으로 지정합니다. 원하는 경우 다른 레이블을 사용할 수 있습니다.

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

5. 새 [Datadog Agent Profile][2]을 적용하면 Datadog Operator가 `gpu-nodes-agent`라는 새 DaemonSet을 생성합니다.

[1]: /ko/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{% tab "Datadog Operator (1.18 또는 1.19)" %}}
혼합 클러스터에서 GPU Monitoring을 설정하려면 Operator의 [Agent Profiles][2] 기능을 사용합니다. 이렇게 하면 GPU가 있는 노드에서만 GPU Monitoring을 활성화할 수 있습니다.

1. 모니터링하려는 모든 GPU 호스트에 [최신 버전의 Datadog Agent][4]가 [설치 및 배포][1]되어 있는지 확인합니다.

2. `DatadogAgent` 리소스를 다음과 같이 수정합니다.

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

2. `DatadogAgent` 리소스에 변경 사항을 적용합니다. 이러한 변경 사항은 GPU 노드에서 실행되는지 여부와 관계없이 모든 Datadog Agent에 안전하게 적용할 수 있습니다.

3. GPU 노드를 대상으로 하고 해당 노드에서 GPU Monitoring을 활성화하는 [Datadog Agent Profile][2]을 생성합니다.

   다음 예시에서는 NVIDIA GPU Operator가 설치된 노드에 일반적으로 [`nvidia.com/gpu.present=true`][3] 레이블이 있으므로 `profileNodeAffinity` 선택기로 해당 레이블이 있는 노드를 대상으로 지정합니다. 원하는 경우 다른 레이블을 사용할 수 있습니다.

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

4. 이 새로운 Datadog Agent Profile을 적용하면 Datadog Operator가 `datadog-agent-with-profile-<namespace>-gpu-nodes`라는 새 DaemonSet을 생성합니다.

[1]: /ko/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Helm" %}}

Helm을 사용하여 혼합 클러스터에서 GPU Monitoring을 설정하려면 두 개의 Helm 배포를 생성합니다. 한 배포는 GPU 노드를 대상으로 하고, 다른 배포는 비 GPU 노드를 대상으로 합니다.

1. 모니터링하려는 모든 GPU 호스트에 [최신 버전의 Datadog Agent][3]가 [설치 및 배포][1]되었는지 확인합니다.

2. 비 GPU 노드를 대상으로 하도록 `datadog-values.yaml` 구성 파일을 수정합니다.

   다음 예시에서는 NVIDIA GPU Operator가 설치된 노드에 일반적으로 `nvidia.com/gpu.present=true` 레이블이 있으므로 이 레이블이 **없는** 노드를 대상으로 지정합니다. 원하는 경우 다른 레이블을 사용하여 GPU 노드를 제외할 수 있습니다.

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

3. `datadog-gpu-values.yaml`이라는 values 파일을 생성합니다. 이 파일을 다음과 같이 구성합니다.
   - GPU 노드만 대상으로 지정
   - [기존 Datadog Cluster Agents에 연결][2]
   - 다음 파라미터를 사용하여 GPU Monitoring을 활성화합니다.

   `gpuMonitoring.enabled: true`
   : GPU Monitoring을 활성화합니다.

   `gpuMonitoring.configureCgroupPerms: true`
   : _GKE에서만 사용합니다_. Agent가 GPU 장치에 액세스할 수 있도록 지원하는 `system-probe`의 코드 경로를 활성화합니다.

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _선택 사항_. GPU 장치에 액세스해야 하는 포드의 컨테이너 런타임을 지정합니다(예: `nvidia`, `nvidia-cdi`, `nvidia-legacy`). 기본값은 `nvidia`이며, 이는 NVIDIA GPU Operator에서 정의한 기본 런타임입니다. EKS 및 Oracle Cloud에서는 기본 런타임 클래스가 이미 GPU 장치에 대한 액세스를 허용하므로 이 값을 빈 문자열로 설정해야 합니다.

   예시 `datadog-gpu-values.yaml`:

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

4. 수정된 `datadog-values.yaml`를 사용하여 Helm 차트를 배포합니다.

   ```shell
   helm install -f datadog-values.yaml datadog datadog
   ```

5. GPU 전용 재정의를 사용하여 Helm 차트를 다시 배포합니다.

   ```shell
   helm install -f datadog-values.yaml -f datadog-gpu-values.yaml datadog-gpu datadog
   ```
[1]: /ko/containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#how-to-join-a-cluster-agent-from-another-helm-chart-deployment-linux
[3]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases
[3]: https://github.com/NVIDIA/k8s-device-plugin
[4]: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html
[5]: https://github.com/DataDog/datadog-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[7]: /ko/containers/docker/
[8]: /ko/agent/supported_platforms/linux/
[9]: /ko/getting_started/integrations/aws/
[10]: /ko/getting_started/integrations/google_cloud/?tab=orglevel
[11]: /ko/getting_started/integrations/azure/?tab=createanappregistration
[12]: /ko/getting_started/integrations/oci/
[13]: /ko/infrastructure/process?tab=linuxwindows#installation