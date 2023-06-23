---
aliases:
- /ja/security_platform/cloud_workload_security/getting_started
- /ja/security/cloud_workload_security/getting_started
description: セットアップとインストールの説明に従って、クラウドワークロードセキュリティを開始します。
further_reading:
- link: /getting_started/cloud_security_management
  tag: Documentation
  text: Cloud Security Management の概要
- link: https://www.datadoghq.com/blog/datadog-runtime-security/
  tag: ブログ
  text: Datadog クラウドランタイムセキュリティの詳細はこちら
- link: https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/
  tag: ブログ
  text: システムの Linux プロセスからセキュリティ脅威を検出する方法
- link: https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/
  tag: ブログ
  text: 'PwnKit の脆弱性: 概要、検出、対処法'
- link: https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/
  tag: ブログ
  text: 'Dirty Pipe の脆弱性: 概要、検出、対処法'
- link: https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/
  tag: ブログ
  text: Dirty Pipe の脆弱性を利用したコンテナからの脱却
- link: https://www.datadoghq.com/blog/dns-based-threat-detection/
  tag: ブログ
  text: DNS ベースの脅威検出でネットワーク層での攻撃をキャッチ
kind: documentation
title: クラウドワークロードセキュリティのセットアップ
---

Cloud Workload Security (CWS) は、環境全体のファイル、ネットワーク、プロセスアクティビティを監視し、インフラストラクチャーに対する脅威をリアルタイムで検出します。Datadog プラットフォームの一部として、CWS のリアルタイム脅威検出をメトリクス、ログ、トレース、その他のテレメトリーと組み合わせることで、ワークロードに対する潜在的な攻撃を取り巻く完全なコンテキストを確認することができます。

## 前提条件

* Datadog Agent 7.44 以降。
* データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.15.0 以降または eBPF 機能のバックポートを備えたプラットフォームを必要とします。CWS は以下の Linux ディストリビューションをサポートしています。
  * Ubuntu 18.04 以降
  * Debian 10 以降
  * Amazon Linux 2
  * Fedora 26 以降
  * SUSE 15 以降
  * CentOS/RHEL 7.6 以降
  * カスタムカーネルビルドはサポートされていません。
* Cilium や Calico などのカスタム Kubernetes ネットワークプラグインとの互換性については、[トラブルシューティングページ][3]をご参照ください。

## APM に Datadog Agent を構成する

一般的に、CWS のインストールは以下の手順で行います。

### リモート構成を有効にする

<div class="alert alert-info">CWS のリモート構成はベータ版です。フィードバックや質問がございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

[リモート構成][4]は、インフラストラクチャーにデプロイされた Datadog リソースの動作をリモートで構成することができる Datadog の機能です。CWS の場合、リモート構成を有効にすると、新しい Agent ルールや更新された Agent ルールがリリースされると自動的に受け取ることができます。

CWS でリモート構成を使用するには、新規または既存の API キーにリモート構成スコープを追加し、Datadog Agent の構成を更新します。詳しくは、[リモート構成の設定手順][5]を参照してください。

**注**: リモート構成を使わない場合、Agent ルールは、Datadog Agent に手動でデプロイする必要があります。

### CWS Agent の構成

#### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリの[アプリ内の説明][6]に従えば、デプロイ構成に合わせたステップバイステップの説明などによって、最高の体験を実現できます。

{{< tabs >}}
{{% tab "Kubernetes (helm)" %}}

1. まだインストールしていない場合は、[Datadog Agent][1] をインストールします。

2. `values.yaml` ファイルの `datadog` セクションに以下を追加します。

    ```yaml
    # values.yaml file
    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        runtime:
          enabled: true
    ```

3. Agent を再起動します。
4. **Cloud SIEM がチェックされている場合、オプションとなります** [こちらの手順][2]に従って、Kubernetes の監査ログを収集します。


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://docs.datadoghq.com/ja/integrations/kubernetes_audit_logs/
{{% /tab %}}

{{% tab "Kubernetes (operator)" %}}

1. まだインストールしていない場合は、[Datadog Agent][1] をインストールします。

2. `values.yaml` ファイルの `datadog` セクションに以下を追加します。

    ```yaml
    # values.yaml file
    spec:
      features:
        cws:
          enabled: true
    ```

    その他の構成オプションについては、[Datadog Operator ドキュメント][2]を参照してください。

3. Agent を再起動します。


[1]: https://docs.datadoghq.com/ja/containers/kubernetes/installation/?tab=operator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
{{% /tab %}}

{{% tab "Docker" %}}

Docker 環境でランタイムセキュリティ Agent と `system-probe` を起動するには、次のコマンドを使用します。

{{< code-block lang="shell" filename="docker-runtime-security.sh" >}}

docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=true \ # CWS ネットワークイベントの収集を可能にするため
  -e DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  gcr.io/datadoghq/agent:7

{{< /code-block >}}

{{% /tab %}}

{{% tab "Daemonset" %}}

`daemonset.yaml` ファイルの `security-agent` と `system-probe` の `env` セクションに、以下の設定を追加します。

```bash
  # ソース: datadog/templates/daemonset.yaml
  apiVersion:app/1
  kind: DaemonSet
  [...]
  spec:
  [...]
  spec:
      [...]
        containers:
        [...]
          - name: agent
            [...]
            env:
              - name: DD_REMOTE_CONFIGURATION_ENABLED
                value: "true"
              - name: system-probe
                [...]
                env:
                  - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
                    value: "true"
                  - name: DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED
                    value: "true" [...]
```

{{% /tab %}}

{{% tab "ホスト (その他)" %}}

パッケージベースのデプロイの場合、Datadog パッケージをデプロイする必要があります。パッケージマネージャーでパッケージをインストールし、`datadog.yaml`、`security-agent.yaml`、`system-probe.yaml` ファイルを更新します。

デフォルトでは、ランタイムセキュリティは無効になっています。有効にするには、`security-agent.yaml` と `system-probe.yaml` ファイルの両方を更新する必要があります。

```bash
# /etc/datadog-agent/datadog.yaml ファイル
remote_configuration:
  ## @param 有効 - ブール値 - オプション - デフォルト: false
  ## リモート構成を有効にする場合は true に設定します。
  enabled: true
```

```bash
# /etc/datadog-agent/security-agent.yaml ファイル
runtime_security_config:
  ## @param 有効 - ブール値 - オプション - デフォルト: false
  ## Cloud Workload Security を完全に有効にする場合は true に設定します。
  enabled: true
```

```bash
# /etc/datadog-agent/system-probe.yaml ファイル
runtime_security_config:
  ## @param 有効 - ブール値 - オプション - デフォルト: false
  ## Cloud Workload Security を完全に有効にする場合は true に設定します。
  enabled: true

  remote_configuration:
    ## @param 有効 - ブール値 - オプション - デフォルト: false
    enabled: true
```

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
{{% /tab %}}

{{% tab "Amazon Elastic Beanstalk" %}}

複数の Docker コンテナを持つ Amazon Elastic Beanstalk 環境で、Runtime Security Agent と `system-probe` を起動するには、次のデプロイを使用します。

```json
{
    "AWSEBDockerrunVersion": 2,
    "volumes": [
        {
            "name": "docker_sock",
            "host": {
                "sourcePath": "/var/run/docker.sock"
            }
        },
        {
            "name": "proc",
            "host": {
                "sourcePath": "/proc/"
            }
        },
        {
            "name": "cgroup",
            "host": {
                "sourcePath": "/cgroup/"
            }
        },
        {
            "name": "debug",
            "host": {
                "sourcePath": "/sys/kernel/debug"
            }
        },
        {
           "name": "os_release",
           "host": {
                "sourcePath": "/etc/os-release"
        }
        },
        {
           "name": "etc_passwd",
           "host": {
             "sourcePath": "/etc/passwd"
           }
        },
        {
           "name": "etc_group",
           "host": {
             "sourcePath": "/etc/group"
           }
        }
    ],
    "containerDefinitions": [
        {
            "image": "gcr.io/datadoghq/agent:7",
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<YOUR_DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "<YOUR_DD_SITE>"
                },
                {
                    "name": "DD_TAGS",
                    "value": "<SIMPLE_TAG>, <KEY:VALUE_TAG>"
                },
                {
                   "name": "DD_RUNTIME_SECURITY_CONFIG_ENABLED",
                   "value": "true"
                },
                {
                    "name": "DD_REMOTE_CONFIGURATION_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED",
                    "value": "true"
                }
            ],
            "memory": 256,
            "dockerSecurityOptions": ["apparmor:unconfined"],
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
            },
            "mountPoints": [
                {
                    "sourceVolume": "docker_sock",
                    "containerPath": "/var/run/docker.sock",
                    "readOnly": false
                },
                {
                    "sourceVolume": "proc",
                    "containerPath": "/host/proc",
                    "readOnly": true
                },
                {
                    "sourceVolume": "cgroup",
                    "containerPath": "/host/sys/fs/cgroup",
                    "readOnly": true
                },
                {
                    "containerPath": "/sys/kernel/debug",
                    "sourceVolume": "debug"
                },
                {
                    "sourceVolume": "os_release",
                    "containerPath": "/host/etc/os-release",
                    "readOnly": false
                },
                {
                    "sourceVolume": "etc_passwd",
                    "containerPath": "/etc/passwd",
                    "readOnly": false
                },
                {
                    "sourceVolume": "etc_group",
                    "containerPath": "/etc/group",
                    "readOnly": false
                }
            ]
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[3]: /ja/security/cloud_security_management/troubleshooting
[4]: /ja/agent/remote_config
[5]: /ja/agent/remote_config/?tab=environmentvariable#enabling-remote-configuration
[6]: https://app.datadoghq.com/security/setup