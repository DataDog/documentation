---
aliases:
- /ja/network_performance_monitoring/installation/
- /ja/network_monitoring/performance/setup
description: Agent を使用したネットワークデータの収集
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: ブログ
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: ブログ
  text: コンテナとサービスメッシュネットワークを備えた Datadog CNM
- link: /network_monitoring/devices
  tag: よくあるご質問
  text: Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: ブログ
  text: Datadog CNM が Consul ネットワーキングに対応
- link: https://www.datadoghq.com/blog/cnm-kubernetes-egress/
  tag: ブログ
  text: Datadog Cloud Network Monitoring は、大規模環境でデフォルト拒否のネットワークエグレスポリシーへの移行をどのように支援するか
- link: /network_monitoring/cloud_network_monitoring/glossary
  tag: Doc
  text: CNM の用語と概念
title: Cloud Network Monitoring のセットアップ
---
Datadog Cloud Network Monitoring (CNM) は、Datadog 内のサービス、コンテナ、Availability Zone、およびその他のタグ間のネットワークトラフィックを可視化します。これにより、次のことが可能になります。

- 予期しない、または潜在的なサービスの依存関係を特定する。
- クロスリージョンやマルチクラウドなど、高コストの通信を最適化する。
- クラウドプロバイダーのリージョンやサードパーティツールの機能停止を特定する。
- DNS サーバーメトリクスに関するサービスディスカバリーの不具合のトラブルシューティング。

Cloud Network Monitoring には、[Datadog Agent v6.14 以降][1] が必要です。メトリクスは Agent の上位バージョンで自動的に収集されるため、DNS モニタリングを構成するには、[メトリクスセットアップセクション][2] を参照してください。

## サポート対象のプラットフォーム {#supported-platforms}

### オペレーティングシステム {#operating-systems}

#### Linux OS {#linux-os}

データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.4.0 以降または eBPF 機能のバックポートを備えたプラットフォームを必要とします。CNM は以下の Linux ディストリビューションをサポートしています。

- Ubuntu 16.04 以降
- Debian 9 以降
- Fedora 26 以降
- SUSE 15 以降
- Amazon AMI 2016.03 以降
- Amazon Linux 2
- CentOS/RHEL 7.6 以降

**注:** [CentOS/RHEL 7.6 以降][3] の要件は、カーネル 4.4.0 以降では適用外です。[DNS 解決][4] 機能は CentOS/RHEL 7.6 ではサポート対象外です。

#### Windows OS {#windows-os}

データ収集は、ネットワークカーネルデバイスドライバーを使用して行われます。Datadog Agent バージョン 7.27.1、Windows バージョン 2012 R2 (および Windows 10 を含む同等のデスクトップ OS) 以降でサポートされます。

#### macOS {#macos}

Datadog Cloud Network Monitoring は macOS プラットフォームをサポートしていません。

### コンテナ {#containers}

CNM は、[Docker][5]、[Kubernetes][6]、[ECS][7]、およびその他のコンテナ技術をサポートしており、コンテナ化されたオーケストレーション環境のアーキテクチャとパフォーマンスを可視化するのに役立ちます。Datadog のコンテナ統合を使用すると、コンテナ、タスク、ポッド、クラスター、デプロイなどの意味のある単位によってトラフィックを集約でき、`container_name`、`task_name`、`kube_service` などの標準的なタグが付けられます。

### ネットワークルーティングツール {#network-routing-tools}

#### Istio {#istio}

CNM では、コンテナ、ポッド、サービス間のネットワークコミュニケーションを、Istio のサービスメッシュでマッピングすることができます。

Datadog は、Istio 環境のあらゆる側面を監視するため、以下のことも実現できます。

- [ログ][8] を使用して、Envoy および Istio の Control Plane の健全性を評価する。
- リクエスト、帯域幅、リソース消費の [メトリクス][8] で、サービスメッシュのパフォーマンスを詳しく確認する。
- [APM][9] でメッシュを実行してアプリケーションの分散型トレースの詳細を確認する。

CNM は Istio v1.6.4 以降および [Datadog Agent v7.24.1 以降][1] でサポートされています。

Datadog を使用した Istio 環境の監視について、詳しくは [Istio ブログ][10] を参照してください。

#### Cilium {#cilium}

Cloud Network Monitoring は、次の要件が満たされている場合に **Cilium** インストールと互換性があります。
1) Cilium バージョン 1.6 以上、および
2) カーネルバージョン 5.1.16 以上、または 4.19.x カーネルの場合は 4.19.57 以上

### プロビジョニングシステム {#provisioning-systems}

Cloud Network Monitoring は次のプロビジョニングシステムの使用をサポートしています。

- Daemonset / Helm 1.38.11 以降: [Datadog Helm チャート][11] を参照してください
- Chef 12.7 以降: [Datadog Chef レシピ][12] を参照してください
- Ansible 2.6 以降: [Datadog Ansible ロール][13] を参照してください

## セットアップ {#setup}

Cloud Network Monitoring は、ネットワークエンドポイント_間_のトラフィックを分析し、ネットワークの依存関係をマッピングするように設計されています。Datadog は、インフラストラクチャーの意味のあるサブセットに CNM をインストールし、価値を最大化するために**_最低 2 ホスト_**を推奨します。

{{< tabs >}}
{{% tab "Agent (Linux)" %}}

Datadog Agent を使用して Cloud Network Monitoring を有効化するには、次の構成を使用します。

1. **v6.14 以前のバージョンの Agent を使用している場合**は、先に [ライブプロセスの収集][1] を有効にし、それ以外の場合はこのステップをスキップします。

2. 下記のシステムプローブの構成例をコピーします。

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. `/etc/datadog-agent/system-probe.yaml` を編集して、Enable フラグを `true` に設定します。

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

4. **v6.18 または 7.18 以前の Agent を実行している場合**は、システムプローブを手動で起動し、ブート時に有効化します (v6.18 および v7.18 以降では、Agent 起動時にシステムプローブが自動的に起動します)。

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **Note**: If the `systemctl` command is not available on your system, start it with following command instead: `sudo service datadog-agent-sysprobe start` and then set it up to start on boot before `datadog-agent` starts.

5. [Agent を再起動][2] します。

    ```shell
    sudo systemctl restart datadog-agent
    ```

    **Note**: If the `systemctl` command is not available on your system, run the following command instead: `sudo service datadog-agent restart`

### SELinux 対応のシステム {#selinux-enabled-systems}

SELinux が有効化されたシステムでは、システムプローブのバイナリで eBPF 機能を使用するための特殊なアクセス許可が必要です。

CentOS ベースのシステム向けの Datadog Agent RPM パッケージには、システムプローブバイナリに必要なアクセス許可を付与する [SELinux ポリシー][3] がバンドルされています。

SELinux を有効にしたその他のシステムで Cloud Network Monitoring を使用する場合は、次の手順に従ってください。

1. ベースとなる [SELinux ポリシー][3] を、お使いの SELinux 構成に合わせて修正します。
    お使いのシステムによっては、タイプや属性が存在しない (または名前が異なる) 場合があります。

2. ポリシーをモジュールにコンパイルします。ポリシーのファイル名が `system_probe_policy.te` の場合は、以下のようになります。

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. モジュールを SELinux システムに適用します。

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. システムプローブバイナリのタイプを、ポリシーで定義されたもののいずれかに変更します。Agent のインストールディレクトリが `/opt/datadog-agent` の場合は以下のようになります。

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [Agent を再起動][2] します。

**注**: これらの手順を実行するには、システムにいくつかの SELinux ユーティリティがインストールされている必要があります (`checkmodule`、`semodule`、`semodule_package`、`semanage` および `restorecon`)。これらはほとんどの標準ディストリビューション (Ubuntu、Debian、RHEL、CentOS、SUSE) で利用可能です。詳細なインストール方法については、ディストリビューションを確認してください。

お使いのディストリビューション内にこれらのユーティリティが存在しない場合は、現在のディストリビューションで利用可能なユーティリティを使って同じ手順を実行してください。


[1]: /ja/infrastructure/process/?tab=linuxwindows#installation
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Agent (Windows)" %}}

Windows でのデータ収集は、ネットワークデータ収集用のフィルタードライバーに依存します。

Windows ホストの Cloud Network Monitoring を有効にする場合:

1. [Datadog Agent][1] (バージョン 7.27.1 以上) をインストールし、ネットワークドライバーコンポーネントを有効にします。

   [非推奨] _(バージョン 7.44 以下)_ インストール時に `ADDLOCAL="MainApplication,NPM"` を `msiexec` コマンドに渡すか、Agent のインストールを GUI 経由で実行する際に "Cloud Network Monitoring" を選択します。

2. `C:\ProgramData\Datadog\system-probe.yaml` を編集して、Enable フラグを `true` に設定します。

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

3. [Agent を再起動][2] します。

    PowerShell (`powershell.exe`) の場合:
    ```shell
    restart-service -f datadogagent
    ```
    For Command Prompt (`cmd.exe`):
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```
**注**: Cloud Network Monitoring は Windows ホストのみを監視し、Windows コンテナは監視しません。


[1]: /ja/agent/basic_agent_usage/windows/?tab=commandline
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Helm" %}}

Kubernetes で Helm を使用して Cloud Network Monitoring を有効にするには、以下を `values.yaml` ファイルに追加してください。</br>
**注:** Helm Chart v3.135.3 以降が必要です。詳細については、[Datadog Helm Chart のドキュメント][1] を参照してください。

  ```yaml
  datadog:
    ...
    networkMonitoring:
      enabled: true
  ```

**オプション**: 非標準ポート (Agent v7.76.0 以降) で DNS トラフィックを監視するには、`dnsMonitoringPorts` オプションを追加してください。

  ```yaml
  datadog:
    networkMonitoring:
      enabled: true
      dnsMonitoringPorts:
        - 53
        - 5353
  ```

環境によって、以下の追加手順のいずれかが必要になる場合があります。

{{< collapse-content title="Google GKE Autopilot" level="h4" >}}

クラスターで Google の GKE Autopilot が動作している場合は、values ファイルに以下を追加してください。

```
providers:
  gke:
    autopilot: true
```

{{< /collapse-content >}}

{{< collapse-content title="Google Container-Optimized OS (COS)" level="h4" >}}

クラスターで Google Container-Optimized OS (COS) が動作している場合は、values ファイルに以下を追加してください。

```
providers:
  gke:
    cos: true
```


{{< /collapse-content >}}

{{< collapse-content title="Bottlerocket Linux" level="h4" >}}

クラスターがノードに Bottlerocket Linux ディストリビューションを使用している場合は、values ファイルに以下を追加してください。

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
{{% tab "Helm を使用しない Kubernetes" %}}

Helm を使用していない場合は、Kubernetes で Cloud Network Monitoring を新規で有効化することができます。

1. [datadog-agent.yaml マニフェスト][1] テンプレートをダウンロードします。
2. `<DATADOG_API_KEY>` をユーザーの [Datadog API キー][2] に置き換えます。
3. オプション - **Datadog サイトを設定**します。Datadog EU サイトを使用している場合は、`DD_SITE` 環境変数を `datadog-agent.yaml` マニフェストの `datadoghq.eu` に設定します。
次のコマンドで 4. **DaemonSet をデプロイ**します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

すでに [マニフェストを適用して Agent を稼働させている][3] 場合:

1. Kubernetes のバージョンが `1.30` 以下の場合は、`datadog-agent` テンプレートにアノテーション `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` を追加してください。

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

2. Agent DaemonSet で以下の環境変数を設定して、プロセス収集とシステムプローブを有効化します。Agent プロセスごとにコンテナを実行している場合は、以下の環境変数を Process Agent コンテナに追加します。それ以外の場合は、Agent コンテナに追加します。

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

3. 以下の追加ボリュームを `datadog-agent` コンテナにマウントします。

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

4. 新しいシステムプローブを Agent のサイドカーとして追加します。

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

5. 最後に、お使いのマニフェストに以下のボリュームを追加します。

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

[1]: /ja/resources/yaml/datadog-agent-npm.yaml
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ja/agent/kubernetes/

{{% /tab %}}
{{% tab "Operator" %}}

[Datadog Operator][1] は、Kubernetes および OpenShift 上で Datadog Agent をデプロイする作業を簡素化します。この機能により、カスタムリソースステータスを通じてデプロイ状況、健全性、エラーの報告を行い、高度な構成オプションで構成ミスのリスクを軽減します。

Datadog Operator で Cloud Network Monitoring を有効化するには、次の構成を使用します。

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

[1]: /ja/containers/datadog_operator 
{{% /tab %}}
{{% tab "Docker" %}}

Docker で Cloud Network Monitoring を有効化するには、コンテナ Agent の起動時に、次の構成を使用します。

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

`<DATADOG_API_KEY>` をユーザーの [Datadog API キー][1] に置き換えます。

`docker-compose` を使用している場合は、下記を Datadog Agent サービスに追加します。

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
Amazon ECS で CNM を設定するには、[Amazon ECS][1] ドキュメントページを参照してください。


[1]: /ja/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}

{{% tab "ECS Fargate" %}}

<div class="alert alert-info">ECS Fargate の CNM はプレビュー段階です。サインアップするには、Datadog の担当者にご連絡ください。</div>

ECS Fargate で Cloud Network Monitoring を有効化するには、次の手順を実行します。

**Agent のバージョン `7.58` 以上が必要です**。

- 新しい Fargate デプロイの場合、Fargate ホストで [プロセス収集][1] を有効化して、ECS 上の Fargate をモニターするように Datadog Agent を構成します。

- 既存のデプロイの場合、次の構成設定を含めるように `task.json` ファイルを更新します。

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
[1]: /ja/integrations/ecs_fargate/?tab=webui#process-collection 

{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us,us3,us5,eu" >}}
### エンハンスドレゾリューション {#enhanced-resolution}

オプションで、クラウドインテグレーションのリソース収集を有効にして、Cloud Network Monitoring でクラウド管理型エンティティを検出できるようにします。
- Azure ロードバランサーとアプリケーションゲートウェイを可視化するには、[Azure インテグレーション][101] をインストールします。
- [AWS インテグレーション][102] をインストールして、AWS ロードバランサーの可視性を確保します。**ENI と EC2 メトリクス収集を有効にする必要があります**

これらの機能に関する追加情報は、[クラウドサービスエンハンスドレゾリューション][103] を参照してください。

[101]: /ja/integrations/azure
[102]: /ja/integrations/amazon_web_services/#resource-collection
[103]: /ja/network_monitoring/cloud_network_monitoring/network_analytics/#cloud-service-enhanced-resolution

{{< /site-region >}}

### Failed Connections {#failed-connections}

Failed Connections を使用すると、[リセット、拒否、タイムアウト][14] を含む TCP 障害の収集と報告が可能になります。この機能は、Agent バージョン `7.59+` ではデフォルトで有効になっており、**カスタマイズ**メニューの [CNM Analytics][15] ページで**障害**のトグルをオンにするとアクセスできます。

**注**: インフラストラクチャー内の一部の Agent が `7.59` 以前のバージョンを実行している場合、障害が少なく報告される可能性があります。CNM では、_すべて_のホストで同じ Agent バージョンを維持することを推奨します。

{{< img src="network_performance_monitoring/setup/cnm_tcp_failures_toggle.png" alt="CNM カスタマイズメニューのスクリーンショット、障害トグルが強調表示されている" style="width:50%;">}}

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/network_monitoring/dns/#setup
[3]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[4]: /ja/network_monitoring/dns/
[5]: https://docs.datadoghq.com/ja/agent/docker/
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/
[7]: https://docs.datadoghq.com/ja/agent/amazon_ecs
[8]: https://docs.datadoghq.com/ja/integrations/istio/
[9]: https://docs.datadoghq.com/ja/tracing/setup_overview/proxy_setup/?tab=istio
[10]: https://www.datadoghq.com/blog/istio-datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[12]: https://github.com/DataDog/chef-datadog
[13]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe
[14]: /ja/network_monitoring/cloud_network_monitoring/network_analytics/?tab=loadbalancers#tcp
[15]: https://app.datadoghq.com/network