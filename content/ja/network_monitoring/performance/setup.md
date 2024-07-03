---
aliases:
- /ja/network_performance_monitoring/installation/
description: Collect your Network Data with the Agent.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Network Performance Monitoring
- link: https://www.datadoghq.com/blog/monitor-containers-with-npm/
  tag: Blog
  text: Datadog NPM with containers and service-meshed networks
- link: /network_monitoring/devices
  tag: Documentation
  text: Network Device Monitoring
- link: https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/
  tag: Blog
  text: Datadog NPM now supports Consul networking
title: Network Performance Monitoring Setup
---

Datadog の ネットワークパフォーマンスモニタリング (NPM) は Datadog 内のサービス、コンテナ、アベイラビリティゾーン、およびその他あらゆるタグ間のネットワークトラフィックを可視化することができます。これは次のような場合に役立ちます。

- 予期しない、または潜在的なサービスの依存関係を特定。
- クロスリージョンやマルチクラウドなど、高コストの通信を最適化。
- クラウドプロバイダーのリージョンやサードパーティーツールの機能停止を特定。
- DNS サーバーメトリクスに関するサービスディスカバリーの不具合のトラブルシューティングを実施。

ネットワークパフォーマンスモニタリングには [Datadog Agent v6.14 以降][1]が必要です。メトリクスは Agent の上位バージョンで自動的に収集されるため、DNS モニタリングを構成するには[メトリクス設定セクション][2]を参照してください。

## サポート対象のプラットフォーム

### オペレーティングシステム

#### Linux OS

データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.4.0 以降または eBPF 機能のバックポートを備えたプラットフォームを必要とします。NPM は以下の Linux ディストリビューションをサポートしています。

- Ubuntu 16.04 以降
- Debian 9 以降
- Fedora 26 以上
- SUSE 15 以降
- Amazon AMI 2016.03 以降
- Amazon Linux 2
- CentOS/RHEL 7.6 以降

**注:** [CentOS/RHEL 7.6 以降][3]の要件は、kernel 4.4.0 以降では適用外です。[DNS 解決][4]機能は CentOS/RHEL 7.6 ではサポートされていません。

#### Windows OS

データ収集はネットワークカーネルデバイスドライバーを使用して行われます。Datadog Agent バージョン 7.27.1、Windows バージョン 2012 R2 (および Windows 10 を含む同等のデスクトップ OS) 以降でサポートされます。

#### macOS

Datadog ネットワークパフォーマンスモニタリングは macOS プラットフォームをサポートしていません。

### コンテナ

NPM は [Docker][5]、[Kubernetes][6]、[ECS][7] およびその他のコンテナ技術をサポートしており、コンテナ化およびオーケストレーションされた環境のアーキテクチャとパフォーマンスの可視化に役立ちます。Datadog のコンテナインテグレーションでは、コンテナ、タスク、ポッド、クラスター、デプロイなど目で見て分かりやすいエンティティごとに、システムに内蔵されたタグ (`container_name`、`task_name`、`kube_service` など) を使用してトラフィックを集約することができます。

NPM は Google Kubernetes Engine (GKE) Autopilot ではサポートされていません。

### ネットワークルーティングツール

#### Istio

NPM ではコンテナ、ポッド、サービス間のネットワークコミュニケーションを、Istio のサービスメッシュでマッピングすることができます。

Datadog は、Istio 環境のあらゆる側面を監視するため、以下のことも実現できます。

- [ログ][8]を使用して、Envoy および Istio の Control Plane の健全性を評価。
- リクエスト、帯域幅、リソース消費の[メトリクス][8]でサービスメッシュのパフォーマンスを詳しく確認。
- [APM][9] でメッシュを実行してアプリケーションの分散型トレースを調べます。

NPM は Istio v1.6.4 以降および [Datadog Agent v7.24.1 以降][1] でサポートされています。

Datadog を使用した Istio 環境の監視について、詳しくは [Istio ブログ][10]を参照してください。

#### Cilium

ネットワークパフォーマンスモニタリングは、次の要件が満たされている場合、**Cilium** インストールと互換性があります。
1) Cilium バージョン 1.6 以降、および
2) カーネルバージョン 5.1.16 以降、または 4.19.x カーネルの場合は 4.19.57 以降

### プロビジョニングシステム

ネットワークパフォーマンスモニタリングは次のプロビジョニングシステムの使用をサポートしています。

- Daemonset / Helm 1.38.11 以降: [Datadog Helm チャート][11]を参照してください
- Chef 12.7 以降: [Datadog Chef レシピ][12]を参照してください
- Ansible 2.6 以降: [Datadog Ansible ロール][13]を参照してください

## セットアップ

このツールの狙いと強みが、ネットワークエンドポイント間のトラフィック分析とネットワークの依存関係のマッピングであるため、価値を最大化するために、インフラストラクチャーの重要なサブセット、そして**_少なくとも 2 つのホスト_**にインストールすることが推奨されます。

{{< tabs >}}
{{% tab "Agent (Linux)" %}}

Datadog Agent を使用してネットワークパフォーマンスのモニタリングを有効化するには、次のコンフィギュレーションを使用します。

1. **v6.14+ 以降のバージョンの Agent を使用されている場合は**、先に[ライブプロセスの収集][1]を有効化し、このステップは飛ばします。

2. 下記のシステムプローブのコンフィギュレーションの例をコピーします。

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. `/etc/datadog-agent/system-probe.yaml` を編集し、有効フラグを `true` に設定します。

    ```yaml
    network_config:   # use system_probe_config for Agent's older than 7.24.1
      ## @param enabled - boolean - optional - default: false
      ## Set to true to enable Network Performance Monitoring.
      #
      enabled: true
    ```

4. **v6.18 または 7.18 より古い Agent を実行している場合は**、システムプローブを手動で起動しブート時に有効化します (v6.18 および v7.18 以降では、Agent 起動時にシステムプローブが自動的に起動します)。

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **注**: システムで `systemctl` コマンドを利用できない場合は、代わりに `sudo service datadog-agent-sysprobe start` のコマンドで実行し、`datadog-agent` が起動する前にブート時に実行開始されるよう設定します。

5. [Agent を再起動します][2]。

    ```shell
    sudo systemctl restart datadog-agent
    ```

    **注**: システムで `systemctl` コマンドを利用できない場合は、代わりに次のコマンドを実行します: `sudo service datadog-agent restart`。

### SELinux 対応のシステム

SELinux が有効化されたシステムでは、システムプローブのバイナリで eBPF 機能を使用するための特殊なアクセス許可が必要です。

CentOS ベースのシステム向けの Datadog Agent RPM パッケージには、システムプローブバイナリに必要なアクセス許可を付与する [SELinux ポリシー][3]がバンドルされています。

SELinux を有効にしたその他のシステムでネットワークパフォーマンスモニタリングを使用する場合は、次の手順に従ってください。

1. ベースとなる [SELinux ポリシー][3]を、お使いの SELinux コンフィギュレーションに合わせて修正します。
    お使いのシステムによっては、タイプや属性が存在しない (または名前が異なる) 場合があります。

2. ポリシーをモジュールにコンパイルします。ポリシーのファイル名が `system_probe_policy.te` の場合は以下のようになります。

    ```shell
    checkmodule -M -m -o system_probe_policy.mod system_probe_policy.te
    semodule_package -o system_probe_policy.pp -m system_probe_policy.mod
    ```

3. モジュールを SELinux システムに適用します。

    ```shell
    semodule -v -i system_probe_policy.pp
    ```

4. システムプローブバイナリのタイプを、ポリシーで定義されたもののいずれかに変更します。Agent のインストールディレクトリ名が `/opt/datadog-agent` の場合は以下のようになります。

    ```shell
    semanage fcontext -a -t system_probe_t /opt/datadog-agent/embedded/bin/system-probe
    restorecon -v /opt/datadog-agent/embedded/bin/system-probe
    ```

5. [Agent を再起動します][2]。

**注**: 上記の手順では、システムに複数の SELinux ユーティリティ (`checkmodule`、`semodule`、`semodule_package`、`semanage`、`restorecon`) をインストールする必要があります。これらは標準ディストリビューション (Ubuntu、Debian、RHEL、CentOS、SUSE) のほとんどで利用可能です。インストール方法について、詳しくはお使いのディストリビューションを確認してください。

お使いのディストリビューション内にこれらのユーティリティが存在しない場合は、現在のディストリビューションで利用可能なユーティリティを使って同じ手順を実行してください。


[1]: /ja/infrastructure/process/?tab=linuxwindows#installation
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
{{% /tab %}}
{{% tab "Agent (Windows)" %}}

Windows のデータ収集は、ネットワークデータ収集用のフィルタードライバに依存します。

Windows ホストのネットワークパフォーマンスモニタリングを有効にするには

1. [Datadog Agent][1]（バージョン 7.27.1 以降）をインストールし、ネットワークドライバコンポーネントを有効にします。

   [非推奨] _(バージョン 7.44 以下)_ インストール時に `ADDLOCAL="MainApplication,NPM"` を `msiexec` コマンドに渡すか、Agent のインストールを GUI で実行する際に "Network Performance Monitoring" を選択します。

1. `C:\ProgramData\Datadog\system-probe.yaml` を編集し、有効フラグを `true` に設定します。

    ```yaml
    network_config:
        enabled: true
    ```
3. [Agent を再起動します][2]。

   PowerShell (`powershell.exe`) の場合: 
    ```shell
    restart-service -f datadogagent
    ```
   コマンドプロンプト (`cmd.exe`) の場合:
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```
**注**: ネットワークパフォーマンスモニタリングは、Windows ホストのみを監視し、Windows コンテナは監視しません。


[1]: /ja/agent/basic_agent_usage/windows/?tab=commandline
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

To enable Network Performance Monitoring with Kubernetes using Helm, add the following to your `values.yaml` file.</br>
**Helm chart v2.4.39+ is required**. For more information, see the [Datadog Helm Chart documentation][1].

  ```yaml
  datadog:
    networkMonitoring:
      enabled: true
  ```

**Note**: If you receive a permissions error when configuring NPM on your Kubernetes environment: `Error: error enabling protocol classifier: permission denied`, add the following to your `values.yaml` (Reference this [section][5] in the Helm chart):

  ```yaml
  agents:
    podSecurity:
      apparmor:
        enabled: true
  ```

Helm をお使いでない場合は、Kubernetes を使用してネットワークパフォーマンスモニタリングを新規で有効化することができます。

1. [datadog-agent.yaml マニフェスト][2]テンプレートをダウンロードします。
2. `<DATADOG_API_KEY>` を、ご使用の [Datadog API キー][3]に置き換えます。
3. 任意 - **Datadog サイトを設定**。Datadog EU サイトをご利用中の場合、`datadog-agent.yaml` マニフェストで `DD_SITE` 環境変数を `datadoghq.eu` に設定します。
4. 次のコマンドで **DaemonSet をデプロイ**します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

すでに [マニフェストを適用して Agent を稼働させている][4]場合

1. `datadog-agent` テンプレートにアノテーション `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` を追加します。

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

2. Agent DaemonSet で次の環境変数を使用して、プロセス収集とシステムプローブを有効にします。Agent プロセスごとにコンテナを実行している場合は、次の環境変数を Process Agent コンテナに追加します。それ以外の場合は、環境変数を Agent コンテナに追加します。

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

3. 以下の追加ボリュームを `datadog-agent` コンテナにマウントします。

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

4. 新しいシステムプローブを Agent のサイドカーとして追加します。

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

5. 最後に、お使いのマニフェストに以下のボリュームを追加します。

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
[4]: /ja/agent/kubernetes/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L1519-L1523
{{% /tab %}}
{{% tab "Operator" %}}
<div class="alert alert-warning">Datadog Operator は `1.0.0` バージョンで一般公開されており、DatadogAgent Custom Resource のバージョン `v2alpha1` と照合しています。 </div>

[Datadog Operator][1] は Kubernetes や OpenShift にDatadog Agent をデプロイする方法です。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度なコンフィギュレーションオプションでコンフィギュレーションミスのリスクを抑えます。

Operator でネットワークパフォーマンスのモニタリングを有効化するには、次のコンフィギュレーションを使用します。

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

Docker でネットワークパフォーマンスのモニタリングを有効化するには、コンテナ Agent を起動する際に、次のコンフィギュレーションを使用します。

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

`<API_キー>` を、ご使用の [Datadog API キー][1]に置き換えます。

`docker-compose` を使用している場合は、下記を Datadog Agent サービスに書き加えます。

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
To set up on Amazon ECS, see the [Amazon ECS][1] documentation page.


[1]: /ja/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us,us3,us5,eu" >}}
### エンハンスドレゾリューション

オプションで、クラウドインテグレーションのリソース収集を有効にして、ネットワークパフォーマンスモニタリングでクラウド管理型エンティティを検出できるようにします。
- Install the [Azure integration][101] for visibility into Azure load balancers and application gateways.
- Install the [AWS Integration][102] for visibility into AWS Load Balancer. **you must enable ENI and EC2 metric collection**

For additional information around these capabilities, see [Cloud service enhanced resolution][103].

### Failed connections (private beta)

<div class="alert alert-warning">Failed Connections are in private beta. To start seeing <a href="/network_monitoring/performance/network_analytics/?tab=loadbalancers#tcp">failed connection metrics</a>, reach out to your Datadog representative and request access.</div>

To enable the Agent to start collecting data around failed connections, add the following flag to your `/etc/datadog-agent/system-probe.yaml` file (`C:\ProgramData\Datadog\system-probe.yaml` for Windows).

```yaml
network_config:   # use system_probe_config for Agent versions older than 7.24.1
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Network Performance Monitoring.
  #
  enabled: true
  enable_tcp_failed_connections: true

```

[101]: /ja/integrations/azure
[102]: /ja/integrations/amazon_web_services/#resource-collection
[103]: /ja/network_monitoring/performance/network_analytics/#cloud-service-enhanced-resolution

{{< /site-region >}}

## その他の参考資料
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