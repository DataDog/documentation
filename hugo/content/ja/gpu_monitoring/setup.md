---
further_reading:
- link: /gpu_monitoring/summary
  tag: ドキュメント
  text: GPU モニタリングの概要ページ
- link: /gpu_monitoring/explorer
  tag: ドキュメント
  text: GPU Monitoring エクスプローラー
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: ブログ
  text: Datadog GPU Monitoring を使った AI インフラストラクチャーの最適化とトラブルシューティング
title: GPU モニタリングの設定
---
このページでは、インフラストラクチャーで Datadog の GPU モニタリングをセットアップするための手順を説明します。以下の動作環境に合わせた構成手順に従ってください。

### 前提条件 {#prerequisites}

Datadog の GPU モニタリングの使用を開始するには、環境が以下の基準を満たしている必要があります。

- 監視対象の GPU アクセラレーションホストで Datadog Agent を実行していること。そうでない場合は、以下のガイドを参照してください。
  - [Kubernetes に Datadog Agent をインストールする][1]
  - [Docker に Datadog Agent をインストールする][7]
  - [非コンテナ化 Linux に Datadog Agent をインストールする][8]
- ホストに NVIDIA ドライバーがインストールされていること。Kubernetes を使用している場合は、Kubernetes 用の NVIDIA デバイスプラグインがインストールされていること ([直接][3]、または [NVIDIA GPU Operator][4] を経由)

#### 最小バージョン要件 {#minimum-version-requirements}

- **Datadog Agent**: v7.80
  - (推奨バージョン: [最新の Agent バージョン][2])。Datadog では、予期しないカーネルパニックを引き起こすバグを回避するため、v7.82.0 の使用を推奨していません。
- **オペレーティングシステム**: Linux
- **Linux カーネル**: 5.8 以上
- **NVIDIA ドライバー**: バージョン 450.51

Kubernetes を使用している場合は、以下の追加要件を満たす必要があります。

- [**Datadog Operator**][5]: バージョン 1.18、_または_ [**Datadog Helm チャート**][6]: バージョン 3.137.3
- **Kubernetes**: 1.22 (PodResources API が有効)

Container-Optimized OS (COS) ノードで Google Kubernetes Engine (GKE) を使用している場合は、以下の追加要件を満たす必要があります。

- [**Datadog Operator**][5]: バージョン 1.29、_または_ [**Datadog Helm チャート**][6]: バージョン 3.231.4
- このページの GKE の例に示されているように、GKE COS [プロバイダー][14]が設定されています。この設定により、GKE が COS ノードにインストールする NVIDIA ドライバーライブラリが Agent コンテナにマウントされます。

## GPU モニタリングの設定 {#setting-up-gpu-monitoring}

GPU モニタリングの構成に DCGM は必要ありません。Agent で GPU モニタリングメトリクスの収集をオプトインする必要があります。設定は、Kubernetes 以外/均一、Kubernetes クラスター、または混合クラスターといった環境によって異なります。

GPU モニタリングメトリクスの収集を有効にした後、より高度なインサイトを得るためにオプトインしていくつかのインテグレーションを有効にすることができます。
- クラウドコストおよびクラウドインスタンスタイプの情報については、Datadog UI で [AWS][9]、[Google Cloud][10]、[Azure][11]、または [Oracle][12] クラウドインテグレーションを有効にします。
- プロセスレベルのインサイトについては、Datadog の [Live Processes][13] を設定します。

### Kubernetes 環境以外または均一 Kubernetes クラスターでの GPU モニタリングの設定 {#set-up-gpu-monitoring-on-a-non-kubernetes-environment-or-uniform-kubernetes-cluster}

以下の手順は、次の環境で GPU モニタリングを設定するための基本的なステップです。
- **すべての**ノードに GPU デバイスが搭載されている Kubernetes クラスター内
- Docker や非コンテナ化 Linux などの Kubernetes 以外の環境内。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
1. 監視対象のすべての GPU ホストに [Datadog Agent の最新バージョン][2]が[インストールおよびデプロイ][1]されていることを確認します。
2. `DatadogAgent` リソースを以下のパラメーターで変更します。

   `gpu.enabled: true`
   : GPU モニタリングを有効にします。

   `gpu.privilegedMode: true`
   : _GKE で必須です_。`system-probe` で GPU モニタリングモジュールを有効にします。`gpu.patchCgroupPermissions` で必須です。

   `gpu.patchCgroupPermissions: true`
   : _GKE のみ_。Agent が GPU デバイスにアクセスできるようにする `system-probe` 内のコードパスを有効にします。

   `gpu.requiredRuntimeClassName:<runtime-name>`
   : _オプション_。GPU デバイスへのアクセスが必要な Pod のコンテナランタイム (例: `nvidia`、`nvidia-cdi`、`nvidia-legacy`) を指定します。NVIDIA GPU Operator によって定義されたデフォルトのランタイムであるため、デフォルト値は `nvidia` です。EKS、Oracle Cloud、および GKE 管理の GPU ドライバーを使用する GKE では、デフォルトのランタイムクラスですでに GPU デバイスへのアクセスが許可されているため、この値を空白の文字列に設定する必要があります。

   GKE ノードで Container-Optimized OS を使用する場合は、`DatadogAgent` メタデータに以下の[プロバイダー][3]アノテーションも追加してください。

   `agent.datadoghq.com/cluster-provider: gke-cos`
   : NVIDIA ドライバーライブラリを COS ホストから Agent コンテナにマウントします。

   GKE で実行する場合の `datadog-agent.yaml` の例:

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/cluster-provider: gke-cos # Only for GKE with Container-Optimized OS nodes
   spec:
     features:
       gpu:
         enabled: true
         privilegedMode: true # Required for GKE
         patchCgroupPermissions: true # Only for GKE
         requiredRuntimeClassName: "" # Only for AWS EKS, Oracle Cloud, or GKE-managed GPU drivers
   ```

3. 変更を適用し、Datadog Agent を再起動します。

[1]: /ja/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases
[3]: /ja/containers/datadog_operator/providers/#on-a-datadogagent

{{% /tab %}}

{{% tab "Helm" %}}
1. 監視対象のすべての GPU ホストに [Datadog Agent の最新バージョン][2]が[インストールおよびデプロイ][1]されていることを確認します。

2. `datadog-values.yaml` 構成ファイルを以下のパラメーターで変更します。

   `gpuMonitoring.enabled: true`
   : GPU モニタリングを有効にします。

   `gpuMonitoring.privilegedMode: true`
   : _GKE で必須です_。`system-probe` で GPU モニタリングモジュールを有効にします。`gpuMonitoring.configureCgroupPerms` で必須です。

   `gpuMonitoring.configureCgroupPerms: true`
   : _GKE のみ_。Agent が GPU デバイスにアクセスできるようにする `system-probe` 内のコードパスを有効にします。

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _オプション_。GPU デバイスへのアクセスが必要な Pod のコンテナランタイム (例: `nvidia`、`nvidia-cdi`、`nvidia-legacy`) を指定します。NVIDIA GPU Operator によって定義されたデフォルトのランタイムであるため、デフォルト値は `nvidia` です。EKS、Oracle Cloud、および GKE 管理の GPU ドライバーを使用する GKE では、デフォルトのランタイムクラスですでに GPU デバイスへのアクセスが許可されているため、この値を空白の文字列に設定する必要があります。

   `providers.gke.cos: true`
   : _Container-Optimized OS ノードを使用する GKE のみ_。NVIDIA ドライバーライブラリを COS ホストから Agent コンテナにマウントします。

   GKE で実行する場合の `datadog-values.yaml` の例:

   ```yaml
   datadog:
     gpuMonitoring:
       enabled: true
       privilegedMode: true        # Required for GKE
       configureCgroupPerms: true  # Only for GKE
       runtimeClassName: ""        # Only for AWS EKS, Oracle Cloud, or GKE-managed GPU drivers

   providers:
     gke:
       cos: true                   # Only for GKE with Container-Optimized OS nodes
   ```

3. Helm チャートをアップグレードし、Datadog Agent を再起動します。

[1]: /ja/containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Docker" %}}

Docker で GPU モニタリングを有効化するには、コンテナ Agent の起動時に次の構成を使用します。

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

`<DATADOG_API_KEY>` を [Datadog API キー][1]に置き換えます。

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Docker Compose" %}}

`docker-compose` を使用している場合は、下記を Datadog Agent サービスに追加します。

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
{{% tab "Linux (非コンテナ化)" %}}

GPU モニタリングには、**両方**の `datadog.yaml` および `system-probe.yaml` での構成が必要です。`datadog.yaml` のみを構成しても eBPF モジュールはロードされず、メトリクスは収集されません。

1. `/etc/datadog-agent/datadog.yaml` に以下を追加します。

    ```yaml
    gpu:
      enabled: true
    collect_gpu_tags: true
    enable_nvml_detection: true
    ```

2. `/etc/datadog-agent/system-probe.yaml` が存在しない場合は、例から作成します。

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. `/etc/datadog-agent/system-probe.yaml` に以下を追加します。

    ```yaml
    gpu_monitoring:
      enabled: true
    ```

4. Agent と system-probe の両方を再起動します。

    ```shell
    sudo systemctl restart datadog-agent
    sudo systemctl restart datadog-agent-sysprobe
    ```

{{% /tab %}}

{{< /tabs >}}

## 混合 Kubernetes クラスターでの GPU モニタリングのセットアップ {#set-up-gpu-monitoring-on-a-mixed-kubernetes-cluster}

混合 Kubernetes クラスターでは、GPU デバイスを持つノードと持たないノードが混在します。GPU ノードのランタイムクラス用と非 GPU ノード用の 2 種類の DaemonSet が必要です。この分割は、Kubernetes 用 NVIDIA デバイスプラグインのランタイムクラス要件によるものです。

推奨方法は、Datadog Operator バージョン 1.20 以上です。このバージョンでは、セットアップを容易にする機能が提供されます。互換性のために、Helm インストールおよび古い Datadog Operator バージョン向けの手順も提供されています。

{{< tabs >}}
{{% tab "Datadog Operator (1.20 以上)" %}}

混合クラスターで GPU モニタリングをセットアップするには、Operator の [Agent プロファイル][2]機能を使用します。これにより、GPU モニタリングは GPU を搭載したノードでのみ有効になります。

1. Datadog Agent Profile 機能を DatadogAgentInternal モードで有効にするように Datadog Operator を構成します。

   Datadog Operator が値のファイルなしで Helm を使用して直接デプロイされた場合、コマンドラインから構成を切り替えることができます。

   ```shell
   helm upgrade --set datadogAgentProfile.enabled=true --set datadogAgentInternal.enabled=true --set datadogCRDs.crds.datadogAgentProfiles=true --set datadogCRDs.crds.datadogAgentInternal=true <release-name> datadog/datadog-operator
   ```

   Datadog Operator が値のファイルを使用してデプロイされた場合、値のファイルに次の設定を追加することで構成を切り替えることができます。

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

   その後、`helm upgrade --install <release-name> datadog/datadog-operator -f datadog-operator.yaml` を使用して Datadog Operator を再デプロイします。

2. `DatadogAgent` リソースに `agent.datadoghq.com/update-metadata` アノテーションを追加することで、`DatadogAgent` リソースを変更します。

   クラスター内のすべてのノードで GKE Container-Optimized OS を使用している場合は、`agent.datadoghq.com/cluster-provider: gke-cos` [プロバイダー][5]アノテーションも追加してください。一部のノードでのみ Container-Optimized OS を使用している場合は、代わりに[それらのノードをターゲットとする Datadog Agent Profile][6] にアノテーションを設定してください。

   `datadog-agent.yaml` ファイルへの追加は、次のようになります。

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/update-metadata: "true"  # Required for the Datadog Agent Internal mode to work.
       agent.datadoghq.com/cluster-provider: gke-cos # Only when every node in the cluster uses Container-Optimized OS
   ```

3. `DatadogAgent` リソースに変更を適用します。これらの変更は、GPU ノードで実行されているかどうかに関係なく、すべての Datadog Agent に安全に適用できます。

4. GPU ノードをターゲットとし、それらのノードで GPU モニタリングを有効にする [Datadog Agent Profile][2] を作成します。

   次の例では、`profileNodeAffinity` セレクターはラベル [`nvidia.com/gpu.present=true`][3] を持つノードをターゲットにしています。これは、このラベルが NVIDIA GPU Operator が導入されたノードによく付与されているためです。必要に応じて別のラベルを使用することもできます。

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
           privilegedMode: true # Required for GKE
           patchCgroupPermissions: true # Only for GKE
   ```

5. この新しい [Datadog Agent Profile][2] を適用すると、Datadog Operator は新しい DaemonSet である `gpu-nodes-agent` を作成します。

[1]: /ja/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases
[5]: /ja/containers/datadog_operator/providers/#on-a-datadogagent
[6]: /ja/containers/datadog_operator/providers/#on-a-datadogagentprofile

{{% /tab %}}
{{% tab "Datadog Operator (1.18 または 1.19)" %}}
混合クラスターで GPU モニタリングをセットアップするには、Operator の [Agent プロファイル][2]機能を使用します。これにより、GPU モニタリングは GPU を搭載したノードでのみ有効になります。

1. 監視対象のすべての GPU ホストに [Datadog Agent の最新バージョン][4]が[インストールおよびデプロイ][1]されていることを確認します。

2. 次の変更を加えて `DatadogAgent` リソースを変更します。

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

2. `DatadogAgent` リソースに変更を適用します。これらの変更は、GPU ノードで実行されているかどうかに関係なく、すべての Datadog Agent に安全に適用できます。

3. GPU ノードをターゲットとし、それらのノードで GPU モニタリングを有効にする [Datadog Agent Profile][2] を作成します。

   次の例では、`profileNodeAffinity` セレクターはラベル [`nvidia.com/gpu.present=true`][3] を持つノードをターゲットにしています。これは、このラベルが NVIDIA GPU Operator が導入されたノードによく付与されているためです。必要に応じて別のラベルを使用することもできます。

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

4. この新しい Datadog Agent Profile を適用すると、Datadog Operator は新しい DaemonSet である `datadog-agent-with-profile-<namespace>-gpu-nodes` を作成します。

[1]: /ja/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Helm" %}}

Helm を使用して混在クラスターで GPU モニタリングをセットアップするには、2 つの Helm デプロイメントを作成します。一方のデプロイメントは GPU ノードをターゲットにし、もう一方は非 GPU ノードをターゲットにします。

1. 監視対象のすべての GPU ホストに [Datadog Agent の最新バージョン][3]が[インストールおよびデプロイ][1]されていることを確認します。

2. 非 GPU ノードをターゲットにするように `datadog-values.yaml` 構成ファイルを変更します。

   次の例では、ラベル `nvidia.com/gpu.present=true` を**持たない**ノードをターゲットにしています。これは、このラベルが NVIDIA GPU Operator を使用しているノードに一般的に存在するためです。必要に応じて、別のラベルを使用して GPU ノードを除外することもできます。

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

3. 値のファイルである `datadog-gpu-values.yaml` を作成します。このファイルを次のように構成します。
   - GPU ノードのみをターゲットにする
   - [既存の Datadog Cluster Agents に参加する][2]
   - 以下のパラメーターを使用して GPU モニタリングを有効にします。

   `gpuMonitoring.enabled: true`
   : GPU モニタリングを有効にします。

   `gpuMonitoring.privilegedMode: true`
   : _GKE で必須です_。`system-probe` で GPU モニタリングモジュールを有効にします。`gpuMonitoring.configureCgroupPerms` で必須です。

   `gpuMonitoring.configureCgroupPerms: true`
   : _GKE のみ_。Agent が GPU デバイスにアクセスできるようにする `system-probe` 内のコードパスを有効にします。

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _オプション_。GPU デバイスへのアクセスが必要な Pod のコンテナランタイム (例: `nvidia`、`nvidia-cdi`、`nvidia-legacy`) を指定します。NVIDIA GPU Operator によって定義されたデフォルトのランタイムであるため、デフォルト値は `nvidia` です。EKS、Oracle Cloud、および GKE 管理の GPU ドライバーを使用する GKE では、デフォルトのランタイムクラスですでに GPU デバイスへのアクセスが許可されているため、この値を空白の文字列に設定する必要があります。

   `providers.gke.cos: true`
   : _Container-Optimized OS ノードを使用する GKE のみ_。NVIDIA ドライバーライブラリを COS ホストから Agent コンテナにマウントします。

   `datadog-gpu-values.yaml` の例:

   ```
   # GPU-specific datadog-gpu-values.yaml (for GPU nodes)
   datadog:
     kubeStateMetricsEnabled: false # Disabled, as you're joining an existing Cluster Agent
     gpuMonitoring:
       enabled: true
       privilegedMode: true        # Required for GKE
       configureCgroupPerms: true  # Only for GKE
       runtimeClassName: ""        # Only for AWS EKS, Oracle Cloud, or GKE-managed GPU drivers

   providers:
     gke:
       cos: true                   # Only for GKE with Container-Optimized OS nodes

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

4. 変更した `datadog-values.yaml` を使用して Helm チャートをデプロイします。

   ```shell
   helm install -f datadog-values.yaml datadog datadog
   ```

5. GPU 固有のオーバーライドを使用して、Helm チャートを再度デプロイします。

   ```shell
   helm install -f datadog-values.yaml -f datadog-gpu-values.yaml datadog-gpu datadog
   ```
[1]: /ja/containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#how-to-join-a-cluster-agent-from-another-helm-chart-deployment-linux
[3]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases
[3]: https://github.com/NVIDIA/k8s-device-plugin
[4]: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html
[5]: https://github.com/DataDog/datadog-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[7]: /ja/containers/docker/
[8]: /ja/agent/supported_platforms/linux/
[9]: /ja/getting_started/integrations/aws/
[10]: /ja/getting_started/integrations/google_cloud/?tab=orglevel
[11]: /ja/getting_started/integrations/azure/?tab=createanappregistration
[12]: /ja/getting_started/integrations/oci/
[13]: /ja/infrastructure/process?tab=linuxwindows#installation
[14]: /ja/containers/datadog_operator/providers/