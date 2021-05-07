---
title: ネットワークパフォーマンスのモニタリングのインストール
kind: documentation
description: Agent を使用したネットワークデータの収集
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: ブログ
    text: ネットワークパフォーマンスのモニタリング
  - link: /network_performance_monitoring/devices
    tag: ドキュメント
    text: ネットワークデバイスモニタリング
  - link: /dashboards/widgets/network
    tag: ドキュメント
    text: ネットワークウィジェット
---
ネットワークパフォーマンスのモニタリングには、[Datadog Agent v6.14 以降][1]が必要です。

サポート対象の**プラットフォーム**

- Ubuntu 16.04 以降
- Debian 9 以降
- Fedora 26 以上
- SUSE 15 以降
- Amazon AMI 2016.03 以降
- Amazon Linux 2
- [Windows Server 2016+][2] (公開ベータ版)

**Linux OS の場合:** データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.4.0 以降を備えたプラットフォームを必要とします。

**Windows OS の場合:** データ収集は、Windows Server 2016 以降の公開ベータ版で利用できます。

[CentOS/RHEL 7.6 以降][3]の要件は、カーネル 4.4.0 以降ではでは適用外のものがあります。[DNS 解決][4]機能は CentOS/RHEL 7.6 ではサポートされていません。

**Istio** v1.6.4 以降は、[Datadog Agent v7.24.1 以降][1]でサポートされています。

ネットワークパフォーマンスモニタリングは、次の要件が満たされている場合、**Cilium** インストールと互換性があります。
1) Cilium バージョン 1.6 以降、および
2) カーネルバージョン 5.1.16 以降、または 4.19.x カーネルの場合は 4.19.57 以降

**注**: Datadog では、macOS プラットフォームのネットワークパフォーマンスのモニタリングをサポートしていません。

次の**プロビジョニングシステム**はサポート対象です。

- Daemonset / Helm 1.38.11 以降: [Datadog Helm チャート][5]を参照してください
- Chef 12.7 以降: [Datadog Chef レシピ][6]を参照してください
- Ansible 2.6 以降: [Datadog Ansible ロール][7]を参照してください

## セットアップ

ネットワークパフォーマンスモニタリングを有効にするには、ご使用中のシステム設定に基づいて、[Agent の主要コンフィギュレーションファイル][8]で構成します。

このツールの狙いと強みが、ネットワークエンドポイント間のトラフィック分析とネットワークの依存関係のマッピングであるため、価値を最大化するために、インフラストラクチャーの重要なサブセット、そして**_少なくとも 2 つのホスト_**にインストールすることが推奨されます。

{{< tabs >}}
{{% tab "Agent" %}}

Datadog Agent を使用してネットワークパフォーマンスのモニタリングを有効化するには、次のコンフィギュレーションを使用します。

1. v6.14 より前のバージョンの Agent を使用されている場合は、先に[ライブプロセスの収集][1]を有効化し、このステップは飛ばします。

2. 下記のシステムプローブのコンフィギュレーションの例をコピーします。

    ```shell
    sudo -u dd-agent cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. `/etc/datadog-agent/system-probe.yaml` を編集し、有効フラグを `true` に設定します。

    ```yaml
    system_probe_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```

4. **v6.18 または 7.18 より古い Agent を実行している場合は**、システムプローブを手動で起動しブート時に有効化します (v6.18 および v7.18 以降では、Agent 起動時にシステムプローブが自動的に起動します)。

    ```shell
    sudo systemctl start datadog-agent-sysprobe
    sudo systemctl enable datadog-agent-sysprobe
    ```

    **注**: システムで `systemctl` コマンドを利用できない場合は、代わりに `sudo service datadog-agent-sysprobe start` のコマンドで実行し、`datadog-agent` が起動する前にブート時に実行開始されるよう設定します。

5. [Agent を再起動します][2]

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

5. [Agent を再起動します][2]

**注**: 上記の手順では、システムに複数の SELinux ユーティリティ (`checkmodule`、`semodule`、`semodule_package`、`semanage`、`restorecon`) をインストールする必要があります。これらは標準ディストリビューション (Ubuntu、Debian、RHEL、CentOS、SUSE) のほとんどで利用可能です。インストール方法について、詳しくはお使いのディストリビューションを確認してください。

お使いのディストリビューション内にこれらのユーティリティが存在しない場合は、現在のディストリビューションで利用可能なユーティリティを使って同じ手順を実行してください。

### Windows システム

Windows システムのデータ収集は、Windows Server バージョン 2016 以降の公開ベータ版で利用できます。
**注**: NPM は現在、Windows ホストのみを監視し、Windows コンテナは監視していません。DNS メトリクス収集は、Windows システムではサポートされていません。

Windows ホストのネットワークパフォーマンスモニタリングを有効にするには

1. Datadog Agent の[このカスタムビルド][4]をインストールします。
2. `C:\ProgramData\Datadog\system-probe.yaml` を編集し、有効フラグを `true` に設定します。

    ```yaml
    system_probe_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```
3. `C:\ProgramData\Datadog\datadog.yaml` を編集し、有効フラグを `true` に設定します。

    ```yaml
    process_config:
        ## @param enabled - boolean - optional - default: false
        ## Set to true to enable the System Probe.
        #
        enabled: true
    ```
4. [Agent を再起動します][2]。

   PowerShell (`powershell.exe`) の場合: 
    ```shell
    restart-service -f datadogagent
    ```
   コマンドプロンプト (`cmd.exe`) の場合:
    ```shell
    net /y stop datadogagent && net start datadogagent
    ```

[1]: /ja/infrastructure/process/?tab=linuxwindows#installation
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/selinux/system_probe_policy.te
[4]: https://s3.amazonaws.com/ddagent-windows-unstable/datadog-agent-7.23.2-beta1-1-x86_64.msi
{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes を使用してネットワークパフォーマンスのモニタリングを新規で有効化するには

1. [datadog-agent.yaml マニフェスト][1]をダウンロードします。
2. `<API_キー>` を、ご使用の [Datadog API キー][2]に置き換えます。
3. 任意 - **Datadog サイトを設定**。Datadog EU サイトをご利用中の場合、`datadog-agent.yaml` マニフェストで `DD_SITE` 環境変数を `datadoghq.eu` に設定します。
4. 次のコマンドで **DaemonSet をデプロイ**します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

すでに [マニフェストを適用して Agent を稼働させている][3]場合

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
                      image: 'datadog/agent:latest'
                    # (...)
                    - name: system-probe
                      image: 'datadog/agent:latest'
                      imagePullPolicy: Always
                      securityContext:
                          capabilities:
                              add:
                                  - SYS_ADMIN
                                  - SYS_RESOURCE
                                  - SYS_PTRACE
                                  - NET_ADMIN
                                  - IPC_LOCK
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


[1]: /resources/yaml/datadog-agent-npm.yaml
[2]: https://app.datadoghq.com/account/settings#api
[3]: /ja/agent/kubernetes/
{{% /tab %}}
{{% tab "Docker" %}}

Docker でネットワークパフォーマンスのモニタリングを有効化するには、コンテナ Agent を起動する際に、次のコンフィギュレーションを使用します。

```shell
$ DOCKER_CONTENT_TRUST=1 docker run -e DD_API_KEY="<DATADOG_API_キー>" \
-e DD_SYSTEM_PROBE_ENABLED=true \
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
--cap-add=IPC_LOCK \
datadog/agent
```

`<API_キー>` を、ご使用の [Datadog API キー][1]に置き換えます。

`docker-compose` を使用している場合は、下記を Datadog Agent サービスに書き加えます。

```
version: '3'
services:
  ..
  datadog:
    image: "datadog/agent:latest"
    environment:
       DD_SYSTEM_PROBE_ENABLED: 'true'
       DD_PROCESS_AGENT_ENABLED: 'true'
       DD_API_KEY: '<DATADOG_API_KEY>'
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
    - IPC_LOCK
    security_opt:
    - apparmor:unconfined
```

[1]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{% tab "ECS" %}}
AWS ECS での設定については、[AWS ECS][1] ドキュメントページを参照してください。


[1]: /ja/agent/amazon_ecs/#network-performance-monitoring-collection-linux-only
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/network_performance_monitoring/installation/?tab=agent#windows-systems
[3]: https://www.redhat.com/en/blog/introduction-ebpf-red-hat-enterprise-linux-7
[4]: /ja/network_performance_monitoring/network_page#dns-resolution
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md#enabling-system-probe-collection
[6]: https://github.com/DataDog/chef-datadog
[7]: https://github.com/DataDog/ansible-datadog/blob/master/README.md#system-probe
[8]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file