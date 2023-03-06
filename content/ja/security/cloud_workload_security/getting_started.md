---
aliases:
- /ja/security_platform/cloud_workload_security/getting_started
description: セットアップとインストールの説明に従って、クラウドワークロードセキュリティを開始します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-runtime-security/
  tag: GitHub
  text: Datadog クラウドランタイムセキュリティの詳細はこちら
- link: https://www.datadoghq.com/blog/linux-security-threat-detection-datadog/
  tag: GitHub
  text: システムの Linux プロセスからセキュリティ脅威を検出する方法
- link: https://www.datadoghq.com/blog/pwnkit-vulnerability-overview-and-remediation/
  tag: GitHub
  text: 'PwnKit の脆弱性: 概要、検出、対処法'
- link: https://www.datadoghq.com/blog/dirty-pipe-vulnerability-overview-and-remediation/
  tag: GitHub
  text: 'Dirty Pipe の脆弱性: 概要、検出、対処法'
- link: https://www.datadoghq.com/blog/engineering/dirty-pipe-container-escape-poc/
  tag: GitHub
  text: Dirty Pipe の脆弱性を利用したコンテナからの脱却
- link: https://www.datadoghq.com/blog/dns-based-threat-detection/
  tag: GitHub
  text: DNS ベースの脅威検出でネットワーク層での攻撃をキャッチ
kind: documentation
title: クラウドワークロードセキュリティの概要
---

## 概要

Datadog Agent がクラウドワークロードセキュリティに使用するモニタリングには、4 つのタイプがあります。

1. **プロセス実行監視**により、ホストやコンテナ上の悪意のあるアクティビティのプロセス実行をリアルタイムで監視します。
2. **ファイル整合性監視**により、ホストやコンテナ上の主要なファイルやディレクトリの変更をリアルタイムに監視します。
3. **DNS アクティビティ監視**により、ホストやコンテナ上の悪意あるアクティビティをネットワークトラフィックでリアルタイムに監視します。
4. **カーネルアクティビティ監視**により、プロセスのハイジャックやコンテナのブレイクアウトなど、カーネル層への攻撃をリアルタイムに監視します。

## 要件

* Datadog Agent >= 7.27.0
* データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.15.0 以降または eBPF 機能のバックポートを備えたプラットフォームを必要とします。CWS は以下の Linux ディストリビューションをサポートしています。
  * Ubuntu 18.04+
  * Debian 10+
  * Amazon Linux 2
  * Fedora 26 以上
  * SUSE 15 以降
  * CentOS/RHEL 7.6 以降
  * カスタムカーネルビルドはサポートされていません。
* Cilium や Calico などのカスタム Kubernetes ネットワークプラグインとの互換性については、[トラブルシューティングページ][3]をご参照ください。

## APM に Datadog Agent を構成する

{{< tabs >}}
{{% tab "Kubernetes" %}}

1. まだインストールしていない場合は、[Datadog Agent][1] (バージョン 7.27+) をインストールします。

2. `values.yaml` ファイルの `datadog` セクションに以下を追加します。

    ```yaml
    # values.yaml file
    datadog:

    # Add this to enable Cloud Workload Security
      securityAgent:
        runtime:
          enabled: true

    # Add this to enable the collection of CWS network events, only for Datadog Agent version 7.36
          network:
            enabled: true
    ```

3. Agent を再起動します。
4. **Cloud SIEM がチェックされている場合、オプションとなります** [こちらの手順][2]に従って、Kubernetes の監査ログを収集します。


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://docs.datadoghq.com/ja/integrations/kubernetes_audit_logs/
{{< /tabs >}}

{{% tab "Docker" %}}

Docker 環境でランタイムセキュリティ Agent と `system-probe` を起動するには、次のコマンドを使用します。

{{< code-block lang="bash" filename="docker-runtime-security.sh" >}}

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
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  gcr.io/datadoghq/agent:7

{{< /code-block >}}

{{< /tabs >}}

{{% tab "Debian" %}}

パッケージベースのデプロイメントでは、Datadog パッケージをデプロイする必要があります。`dkpg -i datadog-agent_7....deb` を実行します。

デフォルトでは、ランタイムセキュリティは無効になっています。有効にするには、`security-agent.yaml` と `system-probe.yaml` ファイルの両方を適合させる必要があります。これらの構成を有効にするには、以下のコマンドを実行します。

{{< code-block lang="bash" filename="debian-runtime-security.sh" >}}

echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml

systemctl restart datadog-agent

{{< /code-block >}}

[Datadog Agent][1] バージョン 7.36 のみ、CWS ネットワークイベントの収集を有効にするには

```shell
echo "runtime_security_config.network.enabled: true" >> /etc/datadog-agent/system-probe.yaml
```

変更を適用したら、セキュリティ Agent と system-probe の両方を再起動します。

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
{{< /tabs >}}

{{% tab "Fedora/CentOS" %}}

パッケージベースのデプロイメントでは、Datadog パッケージをデプロイする必要があります。`yum/dnf install datadog-agent_7....rpm` を実行します。

デフォルトでは、ランタイムセキュリティは無効になっています。有効にするには、`security-agent.yaml` と `system-probe.yaml` ファイルの両方を適合させる必要があります。これらの構成を有効にするには、以下のコマンドを実行します。

{{< code-block lang="bash" filename="fedora-centos-runtime-security.sh" >}}

echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml

systemctl restart datadog-agent

{{< /code-block >}}

[Datadog Agent][1] バージョン 7.36 のみ、CWS ネットワークイベントの収集を有効にするには

```shell
echo "runtime_security_config.network.enabled: true" >> /etc/datadog-agent/system-probe.yaml
```

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
{{< /tabs >}}

{{% tab "ホスト (その他)" %}}

パッケージベースのデプロイでは、Datadog パッケージをデプロイする必要があります。パッケージマネージャーでパッケージをインストールします。

デフォルトでは、ランタイムセキュリティは無効になっています。有効にするには、`security-agent.yaml` と `system-probe.yaml` ファイルの両方を適合させる必要があります。これらの構成を有効にするには、以下のコマンドを実行します。

{{< code-block lang="bash" filename="host-runtime-security.sh" >}}

echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/security-agent.yaml
echo "runtime_security_config.enabled: true" >> /etc/datadog-agent/system-probe.yaml

systemctl restart datadog-agent

{{< /code-block >}}

[Datadog Agent][1] バージョン 7.36 のみ、CWS ネットワークイベントの収集を有効にするには

```shell
echo "runtime_security_config.network.enabled: true" >> /etc/datadog-agent/system-probe.yaml
```

[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
{{< /tabs >}}

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